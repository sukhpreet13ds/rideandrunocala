# Ride & Run Ocala (Next.js)

- `npm run dev` / `npm run build` / `npm start`
- Copy `.env.example` to `.env.local` and fill in DB, admin, Stripe and (optional) SMTP values.
- Tables are created automatically on first request. The admin user is seeded from `ADMIN_USERNAME` / `ADMIN_PASSWORD` on the first login attempt.
- Admin panel: `/admin` (registrations, donations, messages, website text, images, prices).
- Stripe webhook endpoint: `/api/stripe/webhook` (event `payment_intent.succeeded`).
- Editable text lives in `lib/content-defaults.json`; admin edits are stored in the `content` table.
