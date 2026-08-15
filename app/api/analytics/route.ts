import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const NOTIFICATION_EMAIL = 'koushik.saha666@gmail.com';

export async function POST(req: Request) {
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
      clientIp,
      clientCity,
      clientCountry,
      clientIsp,
      timezone,
      deviceMemory,
      hardwareConcurrency,
      gpu,
      theme,
      connectionSpeed
    } = body;

    // Extract Headers & Telemetry
    let ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '';
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
      ip = clientIp || ip || 'Unknown IP';
    }

    const decodeHeader = (val: string | null) => {
      if (!val) return '';
      try {
        return decodeURIComponent(val);
      } catch {
        return val;
      }
    };

    const userAgent = req.headers.get('user-agent') || clientUA || 'Unknown Browser';
    const city = decodeHeader(req.headers.get('x-vercel-ip-city') || req.headers.get('cf-ipcity')) || clientCity || '';
    const country = decodeHeader(req.headers.get('x-vercel-ip-country') || req.headers.get('cf-ipcountry')) || clientCountry || '';
    const location = [city, country].filter(Boolean).join(', ') || 'Unknown Location';

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
            connectionSpeed: connectionSpeed || null,
            isp: clientIsp || null
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
