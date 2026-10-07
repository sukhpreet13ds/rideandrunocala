import Stripe from 'stripe';

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    const err = new Error('Payments are not configured yet.');
    err.status = 503;
    throw err;
  }
  if (!globalThis.__stripe) globalThis.__stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  return globalThis.__stripe;
}
