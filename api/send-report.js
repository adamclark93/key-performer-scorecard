import { Resend } from "resend";
import { buildReportEmail } from "../src/email/reportTemplate.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    const { userData, result, pdfUrl } = req.body;

    const html = buildReportEmail(userData, result, pdfUrl);

    const response = await resend.emails.send({
      from: "Team FOUND <hello@foundperform.com>",
      to: userData.email,
      subject: "Your Key Performer Scorecard Results",
      html: html,
    });

    return res.status(200).json({ success: true, response });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}