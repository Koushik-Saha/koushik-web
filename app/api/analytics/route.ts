import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const NOTIFICATION_EMAIL = 'koushik.saha666@gmail.com';

export async function POST(req: Request) {
  const limited = await rateLimit('analytics', req);
  if (limited) return limited;

  try {
    const body = await req.json().catch(() => ({}));
    const { 
      type = 'visit',
      pageUrl,
      referrer,
      screenResolution,
      language,
      userAgent: clientUA,
      clickTarget,
      timezone,
      deviceMemory,
      hardwareConcurrency,
      gpu,
      theme,
      connectionSpeed
    } = body;

    // Extract Headers & Telemetry
    const clientIp = getClientIp(req);
    const ip = clientIp === 'unknown' ? 'Unknown IP' : clientIp;

    const decodeHeader = (val: string | null) => {
      if (!val) return '';
      try {
        return decodeURIComponent(val);
      } catch {
        return val;
      }
    };

    const userAgent = req.headers.get('user-agent') || clientUA || 'Unknown Browser';
    // Geolocation comes from Vercel's edge headers (not available on localhost)
    const city = decodeHeader(req.headers.get('x-vercel-ip-city'));
    const region = decodeHeader(req.headers.get('x-vercel-ip-country-region'));
    const country = decodeHeader(req.headers.get('x-vercel-ip-country'));
    const location = [city, region, country].filter(Boolean).join(', ') || 'Unknown Location';

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

    // 1. Session & Event DB logging
    let sessionId: string | undefined;
    try {
      const cookieStore = await cookies();
      sessionId = cookieStore.get('portfolio_session_id')?.value;

      let sessionExists = false;
      if (sessionId) {
        const session = await prisma.session.findUnique({
          where: { id: sessionId }
        });
        if (session) {
          sessionExists = true;
        }
      }

      if (!sessionId || !sessionExists) {
        const session = await prisma.session.create({
          data: {
            ip,
            location,
            screenResolution: screenResolution || 'Unknown',
            language: language || 'en-US',
            userAgent,
            timezone: timezone || null,
            deviceMemory: typeof deviceMemory === 'number' ? deviceMemory : null,
            hardwareConcurrency: typeof hardwareConcurrency === 'number' ? hardwareConcurrency : null,
            gpu: gpu || null,
            theme: theme || null,
            connectionSpeed: connectionSpeed || null
          }
        });
        sessionId = session.id;
        cookieStore.set('portfolio_session_id', sessionId, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
      }

      // Create event log
      await prisma.analyticsEvent.create({
        data: {
          sessionId,
          type,
          pageUrl: pageUrl || '/',
          clickTarget: type === 'click' ? clickTarget : null
        }
      });
    } catch (dbErr) {
      console.error('Database logging failed:', dbErr);
    }

    // 2. Terminal Logs
    if (type === 'click') {
      console.log('--- [PORTFOLIO CLICK EVENT] ---');
      console.log(`Time: ${timestamp}`);
      console.log(`Location: ${location} (${ip})`);
      console.log(`Clicked Element: ${clickTarget}`);
      console.log(`Page URL: ${pageUrl}`);
      console.log('--------------------------------');

      return NextResponse.json({ success: true, event: 'click' });
    }

    // Default: 'visit' event
    console.log('--- [NEW VISITOR ANALYTICS ALERT] ---');
    console.log(`Time: ${timestamp}`);
    console.log(`Location: ${location} (${ip})`);
    console.log(`Referrer: ${referrer || 'Direct Link / Bookmark'}`);
    console.log(`Page URL: ${pageUrl}`);
    console.log(`User Agent: ${userAgent}`);
    console.log('------------------------------------');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Analytics API Error:', err);
    return NextResponse.json(
      { error: 'Failed to record visitor telemetry' },
      { status: 500 }
    );
  }
}
