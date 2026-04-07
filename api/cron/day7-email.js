import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { buildDay7Email } from "../../src/email/day7Template.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL || "https://iklkdcrdvimwwlrhxrjz.supabase.co",
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const dryRun = req.query?.dryRun === "true";
  const testEmail = req.query?.testEmail || null;

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .is("day7_sent_at", null)
      .lte("created_at", sevenDaysAgo);

    if (error) throw error;

    const results = [];
    for (const lead of leads || []) {
      const userData = {
        firstName: lead.first_name,
        lastName: lead.last_name,
        email: lead.email,
      };
      const result = {
        overallPct: lead.overall_pct,
        quadrant: lead.quadrant,
      };

      if (dryRun) {
        results.push({ email: lead.email, status: "dry-run" });
        continue;
      }

      const recipient = testEmail || lead.email;

      try {
        await resend.emails.send({
          from: "Team FOUND <hello@foundperform.com>",
          to: recipient,
          subject: "One week in — how is it landing?",
          html: buildDay7Email(userData, result),
        });

        // Only mark sent in production mode
        if (!testEmail) {
          await supabase
            .from("leads")
            .update({ day7_sent_at: new Date().toISOString() })
            .eq("id", lead.id);
        }

        results.push({ originalEmail: lead.email, sentTo: recipient, status: "sent" });
      } catch (err) {
        results.push({ email: lead.email, status: "failed", error: err.message });
      }
    }

    return res.status(200).json({
      mode: dryRun ? "dryRun" : testEmail ? "testEmail" : "live",
      matched: leads?.length || 0,
      processed: results.length,
      results,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
