'use client';

import { useState } from 'react';

export default function ImageManager({ images, overrides }) {
  const [over, setOver] = useState(overrides);
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState(null);

  async function upload(path, file) {
    if (!file) return;
    setBusy(path);
    setMsg(null);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('original', path);
    const res = await fetch('/api/admin/media', { method: 'POST', body: fd });
    const data = await res.json().catch(() => ({}));
    setBusy('');
    if (res.ok) {
      setOver((o) => ({ ...o, [path]: data.url }));
      setMsg({ ok: true, text: 'Image replaced.' });
    } else setMsg({ ok: false, text: data.error || 'Upload failed' });
  }

  async function revert(path) {
    setBusy(path);
    const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ changes: { [`img:${path}`]: null } }) });
    setBusy('');
    if (res.ok) setOver((o) => { const n = { ...o }; delete n[path]; return n; });
  }

  return (
    <>
      {msg && <p className={msg.ok ? 'ok' : 'err'} style={{ marginBottom: 14 }}>{msg.text}</p>}
      <div className="adm-img-grid">
        {images.map((p) => (
          <div className="adm-img" key={p}>
            <div className="pic"><img src={over[p] || p} alt="" /></div>
            <div className="meta">
              <div>{p.replace('/assets/', '')} {over[p] && <span className="badge pink">replaced</span>}</div>
              <label className="btn ghost" style={{ textAlign: 'center', padding: '7px 10px', cursor: 'pointer' }}>
                {busy === p ? 'Working…' : 'Replace image'}
                <input type="file" accept="image/*" hidden disabled={busy === p} onChange={(e) => { upload(p, e.target.files[0]); e.target.value = ''; }} />
              </label>
              {over[p] && <button className="btn ghost" style={{ padding: '7px 10px' }} onClick={() => revert(p)} disabled={busy === p}>Revert to original</button>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
