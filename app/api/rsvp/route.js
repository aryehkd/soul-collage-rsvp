// app/api/rsvp/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone = "", attendees = 1, notes = "", company = "" } =
      await request.json();

    // simple honeypot
    if (company) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    if (!name || !email) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const subject = `New Soul Collage RSVP — ${name} (${attendees})`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Attendees: ${attendees}`,
      `Notes: ${notes}`,
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n");

    await transporter.sendMail({
      to: process.env.RSVP_TO,
      from: process.env.RSVP_FROM || process.env.SMTP_USER,
      replyTo: email,
      subject,
      text,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("RSVP error:", err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}