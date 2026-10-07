import { query } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import { getStripe } from '@/lib/stripe';
import { bad, fail, isEmail, clip } from '@/lib/http';

export async function POST(req) {
  try {
    const b = await req.json();
    const settings = await getSettings();
    const dollars = Number(b.amount);
    const min = settings.donation.minAmount || 1;
    if (!Number.isFinite(dollars) || dollars < min) return bad(`Minimum donation is $${min}`);
    if (dollars > 100_000) return bad('Please contact us to arrange large gifts');
    const cents = Math.round(dollars * 100);
    const name = clip(b.name);
    const email = clip(b.email, 254);
    if (!name) return bad('Name is required');
    if (!isEmail(email)) return bad('A valid email is required');

    getStripe(); // fail early (503) if payments aren't configured

    const res = await query(
      `INSERT INTO donations (full_name, email, phone, message, anonymous, amount_cents, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [name, email, clip(b.phone, 80) || null, clip(b.message, 1000) || null, b.anonymous ? 1 : 0, cents],
    );
    const id = res.insertId;
    const pi = await getStripe().paymentIntents.create({
      amount: cents,
      currency: 'usd',
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      description: `Donation #${id} – Celebration of Life Ride & Run`,
      metadata: { kind: 'donation', donation_id: String(id) },
    });
    await query('UPDATE donations SET stripe_payment_intent=? WHERE id=?', [pi.id, id]);
    return Response.json({ donationId: id, clientSecret: pi.client_secret, amountCents: cents });
  } catch (e) {
    return fail(e, 'Could not start donation');
  }
}
