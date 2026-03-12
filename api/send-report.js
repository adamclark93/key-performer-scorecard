import { Resend } from "resend";
import { buildReportEmail } from "../src/email/reportTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userData, result } = req.body;

    if (!userData?.email) {
      return res.status(400).json({ error: "Missing email" });
    }

    const html = buildReportEmail(userData, result);

    const response = await resend.emails.send({
      from: "Key Performer <onboarding@resend.dev>",
      to: userData.email,
      subject: "Your Key Performer Scorecard Results",
      html,
    });

    return res.status(200).json({ success: true, response });

  } catch (error) {
    console.error("SEND REPORT ERROR:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}