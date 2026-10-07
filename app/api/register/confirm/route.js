import { settleIntent } from '@/lib/orders';
import { bad, fail } from '@/lib/http';

export async function POST(req) {
  try {
    const { registrationId } = await req.json();
    const status = await settleIntent('registrations', Number(registrationId));
    if (!status) return bad('Not found', 404);
    return Response.json({ status });
  } catch (e) {
    return fail(e, 'Could not verify payment');
  }
}
