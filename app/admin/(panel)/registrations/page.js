import Link from 'next/link';
import { query } from '@/lib/db';
import { usd, when, parseJson } from '@/lib/format';
import { ENTRY_TYPES } from '@/lib/settings-defaults';

export default async function Registrations({ searchParams }) {
  const sp = await searchParams;
  const status = sp.status ?? 'paid';
  const type = sp.type ?? '';
  const q = (sp.q ?? '').trim();

  const where = [];
  const params = [];
  if (status) { where.push('status=?'); params.push(status); }
  if (type) { where.push('entry_type=?'); params.push(type); }
  if (q) { where.push('(full_name LIKE ? OR email LIKE ? OR phone LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  const rows = await query(`SELECT * FROM registrations ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC LIMIT 500`, params);
  const exportQs = new URLSearchParams({ type: 'registrations', status, entry: type, q }).toString();

  return (
    <>
      <h2>Registrations</h2>
      <p className="adm-sub">Everyone who completed the waiver and checkout. Click a name for the full signed form data.</p>
      <form className="adm-filters" method="get">
        <input type="search" name="q" defaultValue={q} placeholder="Search name, email, phone" />
        <select name="type" defaultValue={type}>
          <option value="">All entry types</option>
          {Object.entries(ENTRY_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select name="status" defaultValue={status}>
          <option value="paid">Paid</option>
          <option value="pending">Unfinished checkout</option>
          <option value="">All</option>
        </select>
        <button className="btn">Filter</button>
        <a className="btn ghost" href={`/api/admin/export?${exportQs}`}>Download CSV</a>
      </form>
      <div className="adm-table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Entry</th><th>Tickets</th><th>Survivor</th><th>Amount</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan="10">No registrations found.</td></tr>}
            {rows.map((r) => {
              const t = parseJson(r.tickets);
              return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td><Link href={`/admin/registrations/${r.id}`}><strong>{r.full_name}</strong></Link></td>
                  <td>{r.email}</td>
                  <td>{r.phone || '—'}</td>
                  <td>{ENTRY_TYPES[r.entry_type] || r.entry_type}</td>
                  <td>{t.lines.map((l) => `${l.qty}× ${l.label}`).join(', ')}</td>
                  <td>{r.survivor ? <span className="badge pink">Yes</span> : '—'}</td>
                  <td>{usd(r.amount_cents)}</td>
                  <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                  <td>{when(r.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
