import { query } from './db';
import { DEFAULT_SETTINGS } from './settings-defaults';

export async function getSettings() {
  const out = structuredClone(DEFAULT_SETTINGS);
  try {
    const rows = await query('SELECT k, value FROM settings');
    for (const r of rows) {
      const v = typeof r.value === 'string' ? JSON.parse(r.value) : r.value;
      if (r.k in out && v && typeof v === 'object') {
        out[r.k] = Array.isArray(out[r.k]) ? v : { ...out[r.k], ...v };
      }
    }
  } catch (e) {
    console.warn('getSettings failed, using defaults:', e.message);
  }
  return out;
}

export async function saveSetting(key, value) {
  await query(
    'INSERT INTO settings (k, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
    [key, JSON.stringify(value)],
  );
}
