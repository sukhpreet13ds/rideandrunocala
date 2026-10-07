import { query } from '@/lib/db';
import { saveSetting } from '@/lib/settings';
import DEFAULTS from '@/lib/content-defaults.json';
import { bad, fail } from '@/lib/http';

/**
 * PUT { changes: { key: value|null }, settings?: { tickets|donation|notice: {...} } }
 * value === null (or equal to the default) removes the override.
 */
export async function PUT(req) {
  try {
    const { changes = {}, settings } = await req.json();
    for (const [k, v] of Object.entries(changes)) {
      const isImage = k.startsWith('img:');
      if (!isImage && !(k in DEFAULTS)) return bad(`Unknown content key: ${k}`);
      if (v === null || v === undefined || (!isImage && v === DEFAULTS[k].text)) {
        await query('DELETE FROM content WHERE k=?', [k]);
      } else {
        await query('INSERT INTO content (k, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)', [k, String(v).slice(0, 20000)]);
      }
    }
    if (settings) {
      for (const key of ['tickets', 'donation', 'notice']) if (settings[key]) await saveSetting(key, settings[key]);
    }
    return Response.json({ ok: true });
  } catch (e) {
    return fail(e, 'Save failed');
  }
}
