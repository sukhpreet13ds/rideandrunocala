import { query } from './db';

/** Admin overrides: text keys -> value, and "img:<original path>" keys -> image url. */
export async function getOverrides() {
  const content = {};
  const images = {};
  try {
    const rows = await query('SELECT k, value FROM content');
    for (const r of rows) {
      if (r.k.startsWith('img:')) images[r.k.slice(4)] = r.value;
      else content[r.k] = r.value;
    }
  } catch (e) {
    console.warn('getOverrides failed, using defaults:', e.message);
  }
  return { content, images };
}
