import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    const response = await resend.emails.send({
      from: "Key Performer <onboarding@resend.dev>",
      to: "clarky.adam@gmail.com",
      subject: "Test email from FOUND",
      html: "<p>This is a test email.</p>"
    });

    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}