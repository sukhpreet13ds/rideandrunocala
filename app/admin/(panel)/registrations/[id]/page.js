import Link from 'next/link';
import { notFound } from 'next/navigation';
import { query } from '@/lib/db';
import { usd, when, parseJson } from '@/lib/format';
import { ENTRY_TYPES } from '@/lib/settings-defaults';
import { WAIVER_LABELS, SIGNATURE_KEYS } from '@/lib/waiver-labels';

export default async function RegistrationDetail({ params }) {
  const { id } = await params;
  const [r] = await query('SELECT * FROM registrations WHERE id=?', [Number(id)]);
  if (!r) notFound();
  const tickets = parseJson(r.tickets);
  const form = parseJson(r.form_data);
  const entries = Object.entries(form).filter(([, v]) => v !== '' && v !== false && v !== null);

  return (
    <>
      <p><Link href="/admin/registrations">← All registrations</Link></p>
      <h2>{r.full_name} <span className={`badge ${r.status}`}>{r.status}</span></h2>
      <p className="adm-sub">Registration #{r.id} · {ENTRY_TYPES[r.entry_type] || r.entry_type} · {when(r.created_at)}</p>

      <div className="adm-grid2">
        <div className="adm-panel">
          <h3 style={{ marginTop: 0 }}>Contact &amp; order</h3>
          <dl>
            <dt>Name</dt><dd>{r.full_name}</dd>
            <dt>Email</dt><dd><a href={`mailto:${r.email}`}>{r.email}</a></dd>
            <dt>Phone</dt><dd>{r.phone || '—'}</dd>
            <dt>Breast cancer survivor</dt><dd>{r.survivor ? <span className="badge pink">Yes — Survivor Gold Medal</span> : 'No'}</dd>
            <dt>Entry type</dt><dd>{ENTRY_TYPES[r.entry_type] || r.entry_type}</dd>
            <dt>Tickets</dt>
            <dd>{tickets.lines.map((l) => <div key={l.id}>{l.qty} × {l.label} ({usd(l.unitCents)} each)</div>)}</dd>
            <dt>Total</dt><dd><strong>{usd(r.amount_cents)}</strong></dd>
            <dt>Paid at</dt><dd>{when(r.paid_at)}</dd>
            <dt>Stripe payment</dt>
            <dd>{r.stripe_payment_intent ? <a href={`https://dashboard.stripe.com/payments/${r.stripe_payment_intent}`} target="_blank" rel="noreferrer">{r.stripe_payment_intent}</a> : '—'}</dd>
          </dl>
        </div>
        <div className="adm-panel">
          <h3 style={{ marginTop: 0 }}>Signed waiver data</h3>
          <dl>
            {entries.map(([k, v]) => (
              <Fragment2 key={k} k={k} v={v} />
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

function Fragment2({ k, v }) {
  const label = WAIVER_LABELS[k] || k;
  const isSig = SIGNATURE_KEYS.includes(k);
  return (
    <>
      <dt>{label}</dt>
      <dd className={isSig ? 'sig' : ''}>{v === true ? 'Yes' : String(v)}</dd>
    </>
  );
}
