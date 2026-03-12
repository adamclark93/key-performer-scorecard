import { Resend } from "resend";

export default async function handler(req, res) {
  return res.status(200).json({
    hasKey: !!process.env.RESEND_API_KEY
  });
}