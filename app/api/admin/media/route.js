import { query } from '@/lib/db';
import { bad, fail } from '@/lib/http';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

/** multipart: file + original (the /assets/... path it replaces). Returns { url }. */
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    const original = String(form.get('original') || '');
    if (!file || typeof file === 'string') return bad('No file');
    if (!ALLOWED.includes(file.type)) return bad('Only JPG, PNG, WebP, GIF or SVG images');
    if (file.size > 8 * 1024 * 1024) return bad('Image must be under 8 MB');
    if (!original.startsWith('/assets/')) return bad('Invalid target image');
    const buf = Buffer.from(await file.arrayBuffer());
    const res = await query('INSERT INTO media (name, mime, data) VALUES (?, ?, ?)', [file.name.slice(0, 250), file.type, buf]);
    const url = `/api/media/${res.insertId}`;
    await query('INSERT INTO content (k, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)', [`img:${original}`, url]);
    return Response.json({ url });
  } catch (e) {
    return fail(e, 'Upload failed');
  }
}
