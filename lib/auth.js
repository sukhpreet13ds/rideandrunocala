import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { query } from './db';

export const COOKIE = 'admin_session';

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET is not set');
  return new TextEncoder().encode(s);
}

export async function createSession(username) {
  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secret());
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getAdmin() {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return { username: payload.sub };
  } catch {
    return null;
  }
}

/** Use at the top of every admin API route. Returns a Response if unauthorized. */
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

/** First login creates the admin from ADMIN_USERNAME / ADMIN_PASSWORD when the table is empty. */
export async function verifyLogin(username, password) {
  const count = (await query('SELECT COUNT(*) AS n FROM admins'))[0].n;
  if (count === 0 && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await query('INSERT INTO admins (username, password_hash) VALUES (?, ?)', [process.env.ADMIN_USERNAME, hash]);
  }
  const rows = await query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
  // compare against a dummy hash when the user doesn't exist to keep timing similar
  const hash = rows[0]?.password_hash || '$2b$12$C6UzMDM.H6dfI/f/IKcEeO5Yb0Zy5wq5b3qJp0C1u9lYb7r3Q1h7e';
  const ok = await bcrypt.compare(password, hash);
  return ok && rows[0] ? rows[0] : null;
}
