import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    const { userData } = req.body;

    const response = await resend.emails.send({
      from: "Key Performer <onboarding@resend.dev>",
      to: userData.email,
      subject: "Quiz trigger test",
      html: "<p>The quiz successfully triggered the API.</p>"
    });

    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}