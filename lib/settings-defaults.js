export const DEFAULT_SETTINGS = {
  tickets: {
    poker_ride: { label: 'Poker Ride Ticket', price: 45 },
    walk_run_ruck: { label: 'Walk / Run / Ruck Ticket', price: 35 },
    general_admission: { label: 'General Admission Ticket', price: 25 },
    child: { label: 'Child (4-12)', price: 10 },
    infant: { label: 'Child (3 & Under)', price: 0 },
  },
  donation: { presets: [25, 50, 100, 250], defaultAmount: 100, minAmount: 1 },
  notice: { enabled: true, delaySeconds: 3.5 },
};

export const ENTRY_TYPES = {
  poker_ride: 'Poker Ride',
  walk_run_ruck: 'Walk / Run / Ruck',
  general_admission: 'General Admission',
};
