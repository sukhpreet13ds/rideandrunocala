'use client';

import { createContext, useContext, useMemo } from 'react';
import DEFAULTS from './content-defaults.json';
import { DEFAULT_SETTINGS } from './settings-defaults';

const Ctx = createContext({ content: {}, images: {}, settings: DEFAULT_SETTINGS });

/** content = admin overrides (id -> text), images = overrides (original path -> url). */
export function SiteProvider({ content, images, settings, children }) {
  const value = useMemo(() => ({ content, images, settings }), [content, images, settings]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const { content, images, settings } = useContext(Ctx);
  const tx = (id) => content[id] ?? DEFAULTS[id]?.text ?? '';
  const img = (path) => images[path] || path;
  return { tx, img, settings };
}

/** Renders the (possibly admin-edited) text for a content key. No wrapper element. */
export function T({ id }) {
  const { tx } = useSite();
  return <>{tx(id)}</>;
}
