'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  ['/admin', 'Dashboard'],
  ['/admin/registrations', 'Registrations'],
  ['/admin/donations', 'Donations'],
  ['/admin/messages', 'Messages'],
  ['/admin/content', 'Website text'],
  ['/admin/images', 'Images'],
  ['/admin/settings', 'Prices & settings'],
];

export default function Sidebar({ username }) {
  const path = usePathname();
  const on = (href) => (href === '/admin' ? path === href : path.startsWith(href));
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }
  return (
    <aside className="adm-side">
      <h1>RIDE &amp; RUN <span>ADMIN</span></h1>
      {LINKS.map(([href, label]) => (
        <Link key={href} href={href} className={on(href) ? 'on' : ''}>{label}</Link>
      ))}
      <a href="/" target="_blank" rel="noreferrer">View website ↗</a>
      <div className="sp" />
      <div style={{ padding: '0 12px', fontSize: 12, color: '#94a3b8' }}>Signed in as {username}</div>
      <button onClick={logout}>Log out</button>
    </aside>
  );
}
