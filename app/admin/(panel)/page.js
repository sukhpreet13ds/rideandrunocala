import Link from 'next/link';
import { query } from '@/lib/db';
import { usd, when } from '@/lib/format';
import { ENTRY_TYPES } from '@/lib/settings-defaults';

export default async function Dashboard() {
  const [reg] = await query("SELECT COUNT(*) n, COALESCE(SUM(amount_cents),0) total, SUM(survivor) survivors FROM registrations WHERE status='paid'");
  const [don] = await query("SELECT COUNT(*) n, COALESCE(SUM(amount_cents),0) total FROM donations WHERE status='paid'");
  const [msg] = await query('SELECT COUNT(*) n FROM contacts');
  const byType = await query("SELECT entry_type, COUNT(*) n, COALESCE(SUM(amount_cents),0) total FROM registrations WHERE status='paid' GROUP BY entry_type");
  const recent = await query("SELECT id, full_name, entry_type, amount_cents, created_at FROM registrations WHERE status='paid' ORDER BY id DESC LIMIT 6");
  const recentDon = await query("SELECT id, full_name, amount_cents, created_at FROM donations WHERE status='paid' ORDER BY id DESC LIMIT 6");

  return (
    <>
      <h2>Dashboard</h2>
      <p className="adm-sub">Paid registrations and donations at a glance.</p>
      <div className="adm-cards">
        <div className="adm-card"><div className="n">{reg.n}</div><div className="l">Paid registrations</div></div>
        <div className="adm-card"><div className="n">{usd(reg.total)}</div><div className="l">Registration revenue</div></div>
        <div className="adm-card"><div className="n">{don.n}</div><div className="l">Donations</div></div>
        <div className="adm-card"><div className="n">{usd(don.total)}</div><div className="l">Donation total</div></div>
        <div className="adm-card"><div className="n">{Number(reg.survivors || 0)}</div><div className="l">Survivor medals to prepare</div></div>
        <div className="adm-card"><div className="n">{msg.n}</div><div className="l"><Link href="/admin/messages">Contact messages</Link></div></div>
      </div>

      <div className="adm-grid2">
        <div className="adm-panel">
          <h3 style={{ marginTop: 0 }}>Registrations by type</h3>
          <table>
            <tbody>
              {byType.length === 0 && <tr><td>No paid registrations yet.</td></tr>}
              {byType.map((t) => (
                <tr key={t.entry_type}><td>{ENTRY_TYPES[t.entry_type] || t.entry_type}</td><td>{t.n}</td><td>{usd(t.total)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="adm-panel">
          <h3 style={{ marginTop: 0 }}>Latest registrations</h3>
          <table>
            <tbody>
              {recent.length === 0 && <tr><td>Nothing yet.</td></tr>}
              {recent.map((r) => (
                <tr key={r.id}><td><Link href={`/admin/registrations/${r.id}`}>{r.full_name}</Link></td><td>{ENTRY_TYPES[r.entry_type]}</td><td>{usd(r.amount_cents)}</td><td>{when(r.created_at)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="adm-panel">
        <h3 style={{ marginTop: 0 }}>Latest donations</h3>
        <table>
          <tbody>
            {recentDon.length === 0 && <tr><td>Nothing yet.</td></tr>}
            {recentDon.map((d) => (
              <tr key={d.id}><td>{d.full_name}</td><td>{usd(d.amount_cents)}</td><td>{when(d.created_at)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
