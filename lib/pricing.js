const clampQty = (n) => Math.max(0, Math.min(50, Math.floor(Number(n) || 0)));

/** Prices are configured in dollars; everything charged is computed server-side in cents. */
export function priceTickets(tickets, entryType, qty) {
  const main = tickets[entryType];
  if (!main) throw new Error('Invalid entry type');
  const q = { main: clampQty(qty?.main), child: clampQty(qty?.child), infant: clampQty(qty?.infant) };
  const lines = [
    { id: entryType, label: main.label, qty: q.main, unitCents: Math.round(main.price * 100) },
    { id: 'child', label: tickets.child.label, qty: q.child, unitCents: Math.round(tickets.child.price * 100) },
    { id: 'infant', label: tickets.infant.label, qty: q.infant, unitCents: Math.round(tickets.infant.price * 100) },
  ].filter((l) => l.qty > 0);
  const totalCents = lines.reduce((s, l) => s + l.qty * l.unitCents, 0);
  return { lines, totalCents, headcount: q.main + q.child + q.infant };
}

export const money = (cents) => `$${(cents / 100).toFixed(2)}`;
