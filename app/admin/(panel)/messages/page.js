import { query } from '@/lib/db';
import { when } from '@/lib/format';

export default async function Messages() {
  const rows = await query('SELECT * FROM contacts ORDER BY id DESC LIMIT 300');
  return (
    <>
      <h2>Contact messages</h2>
      <p className="adm-sub">Sent from the “Contact Us” form on the website.</p>
      <div className="adm-table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Name</th><th>Email</th><th>Message</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan="4">No messages yet.</td></tr>}
            {rows.map((m) => (
              <tr key={m.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{when(m.created_at)}</td><td>{m.full_name}</td>
                <td><a href={`mailto:${m.email}`}>{m.email}</a></td><td style={{ whiteSpace: 'pre-wrap' }}>{m.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
