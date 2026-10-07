import { query } from '@/lib/db';
import { sendMail, esc } from '@/lib/mail';
import { bad, fail, isEmail, clip } from '@/lib/http';

export async function POST(req) {
  try {
    const b = await req.json();
    const name = clip(b.full_name);
    const email = clip(b.email, 254);
    const message = clip(b.message, 5000);
    if (!name || !message) return bad('Name and message are required');
    if (!isEmail(email)) return bad('A valid email is required');
    await query('INSERT INTO contacts (full_name, email, message) VALUES (?, ?, ?)', [name, email, message]);
    await sendMail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: `Website message from ${name}`,
      html: `<p><strong>${esc(name)}</strong> (${esc(email)})</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    });
    return Response.json({ ok: true });
  } catch (e) {
    return fail(e, 'Could not send message');
  }
}
