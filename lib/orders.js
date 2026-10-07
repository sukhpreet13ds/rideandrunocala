import { query } from './db';
import { sendMail, esc } from './mail';
import { money } from './pricing';
import { getStripe } from './stripe';

const adminTo = () => process.env.ADMIN_NOTIFY_EMAIL;

/** Marks a registration paid exactly once and sends the notifications. */
export async function markRegistrationPaid(id) {
  const res = await query(
    "UPDATE registrations SET status='paid', paid_at=NOW() WHERE id=? AND status='pending'",
    [id],
  );
  if (!res.affectedRows) return false;
  const [r] = await query('SELECT * FROM registrations WHERE id=?', [id]);
  const tickets = typeof r.tickets === 'string' ? JSON.parse(r.tickets) : r.tickets;
  const lines = tickets.lines.map((l) => `<li>${esc(l.qty)} × ${esc(l.label)} (${money(l.unitCents)})</li>`).join('');
  const base = process.env.NEXT_PUBLIC_SITE_URL || '';
  await sendMail({
    to: r.email,
    subject: 'Your Celebration of Life registration is confirmed',
    html: `<p>Hi ${esc(r.full_name)},</p><p>Thank you for registering for the Celebration of Life – Ride &amp; Run for Breast Cancer on October 31, 2026 at the Florida Horse Park.</p><ul>${lines}</ul><p><strong>Total paid: ${money(r.amount_cents)}</strong> · Confirmation #${r.id}</p><p>Please bring this email (saved or printed) with you for entry.</p>`,
  });
  await sendMail({
    to: adminTo(),
    subject: `New registration #${r.id}: ${r.full_name} (${r.entry_type})`,
    html: `<p><strong>${esc(r.full_name)}</strong> (${esc(r.email)}) registered for <strong>${esc(r.entry_type)}</strong>.</p><ul>${lines}</ul><p>Total: ${money(r.amount_cents)} · Survivor: ${r.survivor ? 'Yes' : 'No'}</p>${base ? `<p><a href="${base}/admin/registrations/${r.id}">View full details and signed waiver data</a></p>` : ''}`,
  });
  return true;
}

export async function markDonationPaid(id) {
  const res = await query("UPDATE donations SET status='paid', paid_at=NOW() WHERE id=? AND status='pending'", [id]);
  if (!res.affectedRows) return false;
  const [d] = await query('SELECT * FROM donations WHERE id=?', [id]);
  await sendMail({
    to: d.email,
    subject: 'Thank you for your donation',
    html: `<p>Hi ${esc(d.full_name)},</p><p>Thank you for your ${money(d.amount_cents)} donation to Celebration of Life – Ride &amp; Run for Breast Cancer. Every dollar fights breast cancer.</p><p>Donation #${d.id}</p>`,
  });
  await sendMail({
    to: adminTo(),
    subject: `New donation: ${money(d.amount_cents)} from ${d.full_name}`,
    html: `<p><strong>${esc(d.full_name)}</strong> (${esc(d.email)}) donated <strong>${money(d.amount_cents)}</strong>.</p>${d.message ? `<p>Message: ${esc(d.message)}</p>` : ''}`,
  });
  return true;
}

/** Verifies the PaymentIntent with Stripe and settles the matching row. Returns 'paid' | 'pending' | 'failed'. */
export async function settleIntent(table, id) {
  const [row] = await query(`SELECT * FROM ${table} WHERE id=?`, [id]);
  if (!row) return null;
  if (row.status === 'paid') return 'paid';
  if (!row.stripe_payment_intent) return 'pending';
  const pi = await getStripe().paymentIntents.retrieve(row.stripe_payment_intent);
  if (pi.status === 'succeeded' && pi.amount === row.amount_cents) {
    if (table === 'registrations') await markRegistrationPaid(id);
    else await markDonationPaid(id);
    return 'paid';
  }
  if (pi.status === 'canceled') return 'failed';
  return 'pending';
}
