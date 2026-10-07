import { getStripe } from '@/lib/stripe';
import { markRegistrationPaid, markDonationPaid } from '@/lib/orders';

export async function POST(req) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response('Webhook not configured', { status: 503 });
  let event;
  try {
    const raw = await req.text();
    event = getStripe().webhooks.constructEvent(raw, req.headers.get('stripe-signature'), secret);
  } catch (e) {
    return new Response(`Bad signature: ${e.message}`, { status: 400 });
  }
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const { kind, registration_id, donation_id } = pi.metadata || {};
    if (kind === 'registration') await markRegistrationPaid(Number(registration_id));
    if (kind === 'donation') await markDonationPaid(Number(donation_id));
  }
  return Response.json({ received: true });
}
