import { NextResponse } from 'next/server';
import { getClientIp } from '@/lib/rate-limit';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verifies a Cloudflare Turnstile token server-side. Returns a 403 response when
 * verification fails, or null when the request may proceed.
 *
 * If TURNSTILE_SECRET_KEY is not set, verification is skipped (demo mode, matching the
 * MAILTRAP_TOKEN / ANTHROPIC_API_KEY fallbacks) so local development keeps working.
 */
export async function verifyTurnstile(req: Request, token: unknown): Promise<NextResponse | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('TURNSTILE_SECRET_KEY is not set; skipping bot verification.');
    return null;
  }

  const reject = (error: string) => NextResponse.json({ error }, { status: 403 });

  if (typeof token !== 'string' || !token || token.length > 2048) {
    return reject('Bot verification is required. Please complete the verification and try again.');
  }

  try {
    const form = new URLSearchParams({ secret, response: token });
    const ip = getClientIp(req);
    if (ip !== 'unknown') form.set('remoteip', ip);

    const res = await fetch(VERIFY_URL, { method: 'POST', body: form });
    const outcome: { success?: boolean; 'error-codes'?: string[] } = await res.json();

    if (!outcome.success) {
      console.warn('Turnstile verification failed:', outcome['error-codes']);
      return reject('Bot verification failed or expired. Please try again.');
    }
    return null;
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return reject('Unable to verify you are human right now. Please try again.');
  }
}
