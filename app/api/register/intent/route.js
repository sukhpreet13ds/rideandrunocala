import { query } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import { priceTickets } from '@/lib/pricing';
import { getStripe } from '@/lib/stripe';
import { markRegistrationPaid } from '@/lib/orders';
import { bad, fail, isEmail, clip } from '@/lib/http';

const TYPES = ['poker_ride', 'walk_run_ruck', 'general_admission'];

export async function POST(req) {
  try {
    const body = await req.json();
    const { entryType, waiver, tickets: qty, survivor } = body;
    if (!TYPES.includes(entryType)) return bad('Invalid entry type');
    if (!waiver || typeof waiver !== 'object') return bad('Missing waiver information');
    if (JSON.stringify(waiver).length > 100_000) return bad('Form data too large');

    const name = clip(waiver.p1_print_name);
    const email = clip(waiver.p1_email, 254);
    const signature = clip(waiver.p1_signature || waiver.p5_signature);
    if (!name) return bad('Name is required');
    if (!isEmail(email)) return bad('A valid email is required');
    if (!signature) return bad('Signature is required');
    if (entryType === 'poker_ride' && !waiver.aea_guidelines_agreed) return bad('Safety guidelines must be accepted');

    const settings = await getSettings();
    const priced = priceTickets(settings.tickets, entryType, qty);
    if (priced.headcount < 1) return bad('Select at least one ticket');

    if (priced.totalCents > 0) getStripe(); // fail early (503) if payments aren't configured

    const phone = clip(waiver.phone_cell || waiver.phone_home || waiver.phone_work, 80) || null;
    const record = {
      ...waiver,
      _signed_at: new Date().toISOString(),
      _signed_ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      _stable_signer: entryType === 'poker_ride' ? 'Adrienne Skolnik' : null,
    };

    const res = await query(
      `INSERT INTO registrations (entry_type, full_name, email, phone, survivor, tickets, amount_cents, form_data, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [entryType, name, email, phone, survivor ? 1 : 0, JSON.stringify(priced), priced.totalCents, JSON.stringify(record)],
    );
    const id = res.insertId;

    if (priced.totalCents === 0) {
      await markRegistrationPaid(id);
      return Response.json({ registrationId: id, free: true, amountCents: 0 });
    }

    const pi = await getStripe().paymentIntents.create({
      amount: priced.totalCents,
      currency: 'usd',
      receipt_email: email,
      payment_method_types: ['card'],
      description: `Ride & Run registration #${id} (${entryType})`,
      metadata: { kind: 'registration', registration_id: String(id) },
    });
    await query('UPDATE registrations SET stripe_payment_intent=? WHERE id=?', [pi.id, id]);
    return Response.json({ registrationId: id, clientSecret: pi.client_secret, amountCents: priced.totalCents });
  } catch (e) {
    return fail(e, 'Could not start checkout');
  }
}
