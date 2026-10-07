import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { WAIVER_LABELS } from '@/lib/waiver-labels';
import { parseJson } from '@/lib/format';

const csv = (rows) =>
  rows
    .map((r) => r.map((c) => {
      let s = String(c ?? '');
      if (/^[=+\-@]/.test(s)) s = "'" + s; // neutralise spreadsheet formulas
      return `"${s.replace(/"/g, '""')}"`;
    }).join(','))
    .join('\r\n');

export async function GET(req) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const sp = new URL(req.url).searchParams;
  const type = sp.get('type');
  const status = sp.get('status');
  const q = (sp.get('q') || '').trim();
  const where = [];
  const params = [];
  if (status) { where.push('status=?'); params.push(status); }
  if (q) { where.push('(full_name LIKE ? OR email LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }

  let out;
  if (type === 'registrations') {
    if (sp.get('entry')) { where.push('entry_type=?'); params.push(sp.get('entry')); }
    const rows = await query(`SELECT * FROM registrations ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id`, params);
    const formKeys = [...new Set(rows.flatMap((r) => Object.keys(parseJson(r.form_data))))];
    out = csv([
      ['ID', 'Status', 'Entry type', 'Name', 'Email', 'Phone', 'Survivor', 'Tickets', 'Amount (USD)', 'Stripe PI', 'Created', 'Paid', ...formKeys.map((k) => WAIVER_LABELS[k] || k)],
      ...rows.map((r) => {
        const f = parseJson(r.form_data);
        return [r.id, r.status, r.entry_type, r.full_name, r.email, r.phone, r.survivor ? 'Yes' : 'No',
          parseJson(r.tickets).lines.map((l) => `${l.qty}x ${l.label}`).join('; '), (r.amount_cents / 100).toFixed(2),
          r.stripe_payment_intent, r.created_at?.toISOString?.(), r.paid_at?.toISOString?.(), ...formKeys.map((k) => f[k] === true ? 'Yes' : f[k])];
      }),
    ]);
  } else if (type === 'donations') {
    const rows = await query(`SELECT * FROM donations ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id`, params);
    out = csv([
      ['ID', 'Status', 'Name', 'Email', 'Phone', 'Amount (USD)', 'Anonymous', 'Message', 'Stripe PI', 'Created', 'Paid'],
      ...rows.map((d) => [d.id, d.status, d.full_name, d.email, d.phone, (d.amount_cents / 100).toFixed(2), d.anonymous ? 'Yes' : 'No', d.message, d.stripe_payment_intent, d.created_at?.toISOString?.(), d.paid_at?.toISOString?.()]),
    ]);
  } else {
    return Response.json({ error: 'Unknown export' }, { status: 400 });
  }
  return new Response('﻿' + out, {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${type}.csv"` },
  });
}
