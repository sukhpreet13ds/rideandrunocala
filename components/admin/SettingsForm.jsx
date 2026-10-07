'use client';

import { useState } from 'react';

const ROWS = [
  ['poker_ride', 'Poker Ride (adult)'],
  ['walk_run_ruck', 'Walk / Run / Ruck (adult)'],
  ['general_admission', 'General Admission (adult)'],
  ['child', 'Child (4–12)'],
  ['infant', 'Child (3 & under)'],
];

export default function SettingsForm({ initial }) {
  const [tickets, setTickets] = useState(initial.tickets);
  const [presets, setPresets] = useState(initial.donation.presets.join(', '));
  const [defaultAmount, setDefaultAmount] = useState(initial.donation.defaultAmount);
  const [minAmount, setMinAmount] = useState(initial.donation.minAmount);
  const [noticeOn, setNoticeOn] = useState(initial.notice.enabled);
  const [delay, setDelay] = useState(initial.notice.delaySeconds);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const setT = (k, f, v) => setTickets((t) => ({ ...t, [k]: { ...t[k], [f]: v } }));

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const parsed = presets.split(',').map((s) => Number(s.trim())).filter((n) => n > 0);
    const body = {
      settings: {
        tickets: Object.fromEntries(Object.entries(tickets).map(([k, v]) => [k, { label: v.label, price: Math.max(0, Number(v.price) || 0) }])),
        donation: { presets: parsed.length ? parsed : [25, 50, 100, 250], defaultAmount: Number(defaultAmount) || 100, minAmount: Math.max(1, Number(minAmount) || 1) },
        notice: { enabled: noticeOn, delaySeconds: Math.max(0, Number(delay) || 0) },
      },
    };
    const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setBusy(false);
    setMsg(res.ok ? { ok: true, text: 'Settings saved.' } : { ok: false, text: 'Save failed' });
  }

  return (
    <form onSubmit={save}>
      <div className="adm-panel">
        <h3 style={{ marginTop: 0 }}>Registration tickets</h3>
        <table>
          <thead><tr><th>Ticket</th><th>Label shown to buyers</th><th>Price (USD)</th></tr></thead>
          <tbody>
            {ROWS.map(([k, name]) => (
              <tr key={k}>
                <td>{name}</td>
                <td><input type="text" value={tickets[k].label} onChange={(e) => setT(k, 'label', e.target.value)} /></td>
                <td style={{ width: 130 }}><input type="number" min="0" step="0.01" value={tickets[k].price} onChange={(e) => setT(k, 'price', e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="adm-panel">
        <h3 style={{ marginTop: 0 }}>Donations</h3>
        <div className="adm-grid2">
          <label className="f">Preset amounts (comma separated)<input type="text" value={presets} onChange={(e) => setPresets(e.target.value)} /></label>
          <label className="f">Pre-selected amount<input type="number" min="1" value={defaultAmount} onChange={(e) => setDefaultAmount(e.target.value)} /></label>
          <label className="f">Minimum donation (USD)<input type="number" min="1" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} /></label>
        </div>
      </div>

      <div className="adm-panel">
        <h3 style={{ marginTop: 0 }}>Welcome pop-up</h3>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <input type="checkbox" checked={noticeOn} onChange={(e) => setNoticeOn(e.target.checked)} /> Show the welcome notice to visitors (edit its wording under “Website text → Pop-ups”)
        </label>
        <label className="f" style={{ maxWidth: 240 }}>Appears after (seconds)<input type="number" min="0" step="0.5" value={delay} onChange={(e) => setDelay(e.target.value)} /></label>
      </div>

      <div className="adm-savebar">
        <button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save settings'}</button>
        {msg && <span className={msg.ok ? 'ok' : 'err'}>{msg.text}</span>}
      </div>
    </form>
  );
}
