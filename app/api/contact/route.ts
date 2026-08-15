import { NextResponse } from 'next/server';

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

    const mailtrapToken = process.env.MAILTRAP_TOKEN;

    if (!mailtrapToken) {
      console.log('--- [CONTACT FORM MESSAGE RECEIVED] ---');
      console.log(`To: ${DESTINATION_EMAIL}`);
      console.log(`From Visitor: ${name} <${email}>`);
      console.log(`Subject: ${subject || 'Portfolio Direct Message'}`);
      console.log(`Message:\n${message}`);
      console.log('---------------------------------------');

      return NextResponse.json({
        success: true,
        message: 'Message received! (Demo mode: MAILTRAP_TOKEN environment variable is not set yet).'
      });
    }

    const mailtrapRes = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mailtrapToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: { email: "contact@koushiksaha.dev", name: "Portfolio Contact Form" },
        to: [{ email: DESTINATION_EMAIL }],
        reply_to: { email: email, name: name },
        subject: `[Portfolio Inquiry] ${subject || 'New Message'} from ${name}`,
        text: `You received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'None'}\n\nMessage:\n${message}\n\n--- You can reply directly to this email to respond to ${email}.`,
      })
    });

    if (!mailtrapRes.ok) {
      const errText = await mailtrapRes.text();
      throw new Error(`Mailtrap API returned error: ${errText}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: 'Failed to send email message. Please try again later.' },
      { status: 500 }
    );
  }
}
