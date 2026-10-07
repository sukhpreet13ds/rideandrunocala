'use client';

import { useMemo, useState } from 'react';

const KIND_LABEL = { text: 'Text', link: 'Link', alt: 'Image description', placeholder: 'Form hint' };

export default function ContentEditor({ defaults, overrides }) {
  const [saved, setSaved] = useState(overrides);
  const [values, setValues] = useState(overrides);
  const [page, setPage] = useState('');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const current = (k) => values[k] ?? defaults[k].text;
  const isModified = (k) => current(k) !== defaults[k].text;
  const isDirty = (k) => (values[k] ?? null) !== (saved[k] ?? null);

  const pages = useMemo(() => [...new Set(Object.values(defaults).map((d) => d.page))], [defaults]);
  const grouped = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = {};
    for (const [k, d] of Object.entries(defaults)) {
      if (page && d.page !== page) continue;
      if (needle && !(`${d.text} ${current(k)} ${d.section}`).toLowerCase().includes(needle)) continue;
      ((out[d.page] ||= {})[d.section] ||= []).push(k);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaults, page, q, values]);

  const dirtyKeys = Object.keys(defaults).filter(isDirty);

  const edit = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const reset = (k) => setValues((s) => { const n = { ...s }; delete n[k]; return n; });

  async function save() {
    setBusy(true);
    setMsg(null);
    const changes = {};
    for (const k of dirtyKeys) changes[k] = values[k] === undefined || values[k] === defaults[k].text ? null : values[k];
    const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ changes }) });
    setBusy(false);
    if (res.ok) {
      const next = { ...values };
      for (const k of Object.keys(changes)) if (changes[k] === null) delete next[k];
      setValues(next);
      setSaved(next);
      setMsg({ ok: true, text: `Saved ${dirtyKeys.length} change${dirtyKeys.length === 1 ? '' : 's'}. The website is updated.` });
    } else {
      const d = await res.json().catch(() => ({}));
      setMsg({ ok: false, text: d.error || 'Save failed' });
    }
  }

  return (
    <>
      <div className="adm-filters">
        <input type="search" placeholder="Search text…" value={q} onChange={(e) => setQ(e.target.value)} style={{ minWidth: 260 }} />
        <select value={page} onChange={(e) => setPage(e.target.value)}>
          <option value="">All pages</option>
          {pages.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {Object.entries(grouped).map(([pg, sections]) => (
        <div className="adm-panel" key={pg}>
          <h3 style={{ marginTop: 0 }}>{pg}</h3>
          {Object.entries(sections).map(([sec, keys]) => (
            <details className="adm-group" key={sec} open={Boolean(q) || page !== ''}>
              <summary>{sec.replace(/-/g, ' ')} <span style={{ color: '#9ca3af', fontWeight: 400 }}>({keys.length})</span></summary>
              {keys.map((k) => {
                const d = defaults[k];
                const long = d.kind === 'text' && (current(k).length > 70 || current(k).includes('\n'));
                return (
                  <div className="adm-field" key={k}>
                    <div className="k">
                      <span>{KIND_LABEL[d.kind]}</span>
                      {isModified(k) && <span className="mod">● edited</span>}
                      {isDirty(k) && <span className="mod">(unsaved)</span>}
                      {isModified(k) && <button type="button" className="reset" onClick={() => reset(k)}>reset to original</button>}
                    </div>
                    {long ? (
                      <textarea rows={Math.min(10, Math.max(3, Math.ceil(current(k).length / 90)))} value={current(k)} onChange={(e) => edit(k, e.target.value)} />
                    ) : (
                      <input type="text" value={current(k)} onChange={(e) => edit(k, e.target.value)} />
                    )}
                  </div>
                );
              })}
            </details>
          ))}
        </div>
      ))}
      {Object.keys(grouped).length === 0 && <div className="adm-panel">No text matches your search.</div>}

      <div className="adm-savebar">
        <button className="btn" onClick={save} disabled={busy || dirtyKeys.length === 0}>{busy ? 'Saving…' : `Save ${dirtyKeys.length || ''} change${dirtyKeys.length === 1 ? '' : 's'}`}</button>
        {msg && <span className={msg.ok ? 'ok' : 'err'}>{msg.text}</span>}
      </div>
    </>
  );
}
