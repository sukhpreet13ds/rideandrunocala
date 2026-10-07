export function fail(e, fallback = 'Something went wrong') {
  console.error(e);
  const status = e.status || 500;
  return Response.json({ error: status === 500 ? fallback : e.message }, { status });
}
export function bad(message, status = 400) {
  return Response.json({ error: message }, { status });
}
export const isEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
export const clip = (s, n = 255) => String(s ?? '').trim().slice(0, n);
