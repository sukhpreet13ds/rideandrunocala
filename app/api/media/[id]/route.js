import { query } from '@/lib/db';

export async function GET(_req, { params }) {
  const { id } = await params;
  const [m] = await query('SELECT mime, data FROM media WHERE id=?', [Number(id)]);
  if (!m) return new Response('Not found', { status: 404 });
  return new Response(m.data, {
    headers: { 'Content-Type': m.mime, 'Cache-Control': 'public, max-age=31536000, immutable', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox", 'X-Content-Type-Options': 'nosniff' },
  });
}
