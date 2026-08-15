import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

const NOTIFICATION_EMAIL = 'koushik.saha666@gmail.com';

export async function GET(req: Request) {
  try {
    // 1. Authorize Cron call. Vercel passes Authorization: Bearer <CRON_SECRET> in production.
    const authHeader = req.headers.get('authorization');
    const isLocal = process.env.NODE_ENV === 'development';
    
    // In production, verify Vercel CRON secret
    if (!isLocal && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const mailtrapToken = process.env.MAILTRAP_TOKEN;
    if (!mailtrapToken) {
      return NextResponse.json({ error: 'Mailtrap configuration token missing' }, { status: 500 });
    }

    // 2. Fetch all sessions from the last 12 hours
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
    const sessions = await prisma.session.findMany({
      where: {
        createdAt: {
          gte: twelveHoursAgo
        }
      },
      include: {
        events: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (sessions.length === 0) {
      console.log('No new sessions in the last 12 hours. Skipping digest email.');
      return NextResponse.json({ success: true, message: 'No new sessions, email skipped.' });
    }

    // 3. Format the email body
    let emailText = `📊 Here is your Portfolio Visitor Analytics digest for the last 12 hours.\n\n`;
    emailText += `Summary: ${sessions.length} unique visitor session(s) recorded.\n`;
    emailText += `=========================================\n\n`;

    sessions.forEach((session, index) => {
      const timeString = new Date(session.createdAt).toLocaleString('en-US', { timeZone: 'America/Chicago' });
      
      let location = session.location;
      try {
        location = decodeURIComponent(location);
      } catch {}

      emailText += `${index + 1}. Session: [${timeString} CT]\n`;
      emailText += `   • IP Address: ${session.ip}\n`;
      emailText += `   • Location: ${location}\n`;
      if (session.isp) {
        emailText += `   • ISP: ${session.isp}\n`;
      }
      if (session.timezone) {
        emailText += `   • Timezone: ${session.timezone}\n`;
      }
      emailText += `   • Screen Size: ${session.screenResolution}\n`;
      emailText += `   • Language: ${session.language}\n`;
      if (session.deviceMemory || session.hardwareConcurrency) {
        emailText += `   • Hardware: ${session.deviceMemory ? `${session.deviceMemory}GB RAM` : ''} ${session.hardwareConcurrency ? `| ${session.hardwareConcurrency} CPU Cores` : ''}\n`;
      }
      if (session.gpu) {
        emailText += `   • GPU: ${session.gpu.split('/').pop()}\n`;
      }
      if (session.connectionSpeed) {
        emailText += `   • Network Type: ${session.connectionSpeed}\n`;
      }

      emailText += `   • Browser: ${session.userAgent}\n`;
      emailText += `   • Interaction Events:\n`;

      if (session.events.length === 0) {
        emailText += `     - No actions taken (bounce)\n`;
      } else {
        session.events.forEach((event) => {
          const typeLabel = event.type === 'visit' ? '📄 Page View' : '🖱️ Element Click';
          emailText += `     - [${typeLabel}] ${event.pageUrl}${event.clickTarget ? ` -> Clicked: ${event.clickTarget}` : ''}\n`;
        });
      }
      emailText += `\n-----------------------------------------\n\n`;
    });

    emailText += `--- Sent automatically by your Next.js Portfolio Analytics Cron job.`;

    // 4. Send email via Mailtrap
    const mailtrapRes = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mailtrapToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: { email: "analytics@koushiksaha.dev", name: "Portfolio Analytics Digest" },
        to: [{ email: NOTIFICATION_EMAIL }],
        subject: `📊 Portfolio Visitor Digest: ${sessions.length} New Session(s)`,
        text: emailText
      })
    });

    if (!mailtrapRes.ok) {
      const errText = await mailtrapRes.text();
      console.error('Mailtrap Digest email sending failed:', errText);
      return NextResponse.json({ error: 'Mailtrap dispatch failed', details: errText }, { status: 500 });
    }

    return NextResponse.json({ success: true, sent: true, count: sessions.length });
  } catch (err: any) {
    console.error('Analytics Digest Cron Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
