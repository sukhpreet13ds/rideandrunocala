import { query } from '@/lib/db';
import { usd, when } from '@/lib/format';

export default async function Donations({ searchParams }) {
  const sp = await searchParams;
  const status = sp.status ?? 'paid';
  const q = (sp.q ?? '').trim();
  const where = [];
  const params = [];
  if (status) { where.push('status=?'); params.push(status); }
  if (q) { where.push('(full_name LIKE ? OR email LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
  const rows = await query(`SELECT * FROM donations ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC LIMIT 500`, params);
  const total = rows.filter((r) => r.status === 'paid').reduce((s, r) => s + r.amount_cents, 0);
  const exportQs = new URLSearchParams({ type: 'donations', status, q }).toString();

  return (
    <>
      <h2>Donations</h2>
      <p className="adm-sub">{rows.length} shown · {usd(total)} paid in this view</p>
      <form className="adm-filters" method="get">
        <input type="search" name="q" defaultValue={q} placeholder="Search name or email" />
        <select name="status" defaultValue={status}>
          <option value="paid">Paid</option>
          <option value="pending">Unfinished</option>
          <option value="">All</option>
        </select>
        <button className="btn">Filter</button>
        <a className="btn ghost" href={`/api/admin/export?${exportQs}`}>Download CSV</a>
      </form>
      <div className="adm-table-wrap">
        <table>
          <thead><tr><th>#</th><th>Donor</th><th>Email</th><th>Phone</th><th>Amount</th><th>Message</th><th>Anonymous</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan="9">No donations found.</td></tr>}
            {rows.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td><td><strong>{d.full_name}</strong></td><td>{d.email}</td><td>{d.phone || '—'}</td>
                <td>{usd(d.amount_cents)}</td><td style={{ maxWidth: 280 }}>{d.message || '—'}</td>
                <td>{d.anonymous ? 'Yes' : 'No'}</td><td><span className={`badge ${d.status}`}>{d.status}</span></td><td>{when(d.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
