import { verifyLogin, createSession } from '@/lib/auth';
import { bad, fail } from '@/lib/http';

const attempts = globalThis.__loginAttempts || (globalThis.__loginAttempts = new Map());

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const now = Date.now();
    const rec = (attempts.get(ip) || []).filter((t) => now - t < 15 * 60_000);
    if (rec.length >= 10) return bad('Too many attempts. Try again in a few minutes.', 429);

    const { username, password } = await req.json();
    const admin = await verifyLogin(String(username || ''), String(password || ''));
    if (!admin) {
      attempts.set(ip, [...rec, now]);
      return bad('Invalid username or password', 401);
    }
    attempts.delete(ip);
    await createSession(admin.username);
    return Response.json({ ok: true });
  } catch (e) {
    return fail(e, 'Login failed');
  }
}
