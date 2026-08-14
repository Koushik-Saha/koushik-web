import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const DESTINATION_EMAIL = 'koushik.saha666@gmail.com';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log('--- [CONTACT FORM MESSAGE RECEIVED] ---');
      console.log(`To: ${DESTINATION_EMAIL}`);
      console.log(`From Visitor: ${name} <${email}>`);
      console.log(`Subject: ${subject || 'Portfolio Direct Message'}`);
      console.log(`Message:\n${message}`);
      console.log('---------------------------------------');

      return NextResponse.json({
        success: true,
        message: 'Message received! (Demo mode: RESEND_API_KEY environment variable is not set yet).'
      });
    }

    const resend = new Resend(apiKey);

    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [DESTINATION_EMAIL],
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject || 'New Message'} from ${name}`,
      text: `You received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'None'}\n\nMessage:\n${message}\n\n--- You can reply directly to this email to respond to ${email}.`,
    });

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: 'Failed to send email message. Please try again later.' },
      { status: 500 }
    );
  }
}
