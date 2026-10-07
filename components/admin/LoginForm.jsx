'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: fd.get('username'), password: fd.get('password') }),
    });
    if (res.ok) {
      window.location.href = '/admin';
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error || 'Login failed');
    setBusy(false);
  }

  return (
    <form onSubmit={submit}>
      <h1>Ride &amp; Run Ocala — Admin</h1>
      <label className="f">Username<input type="text" name="username" autoComplete="username" required autoFocus /></label>
      <label className="f">Password<input type="password" name="password" autoComplete="current-password" required /></label>
      {error && <div className="err">{error}</div>}
      <button className="btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
