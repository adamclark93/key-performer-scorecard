export function buildDay7Email(userData, result) {
  const name = userData?.firstName || "there";
  const score = result?.overall_pct ?? result?.overallPct ?? 0;

  return `
  <html>
  <body style="margin:0;background:#f1ece4;font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
  <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">

    <tr><td align="center" style="padding-bottom:30px;">
      <img src="https://scorecard.foundperform.com/found-logo.png" width="140" style="display:block;margin-bottom:10px;" />
      <div style="font-size:12px;letter-spacing:2px;color:#666;">KEY PERFORMER SCORECARD</div>
    </td></tr>

    <tr><td>
      <h1 style="font-size:28px;margin:0 0 20px 0;color:#111;">Hi ${name},</h1>
      <p style="font-size:16px;line-height:1.6;color:#333;">
        [PLACEHOLDER — Day 7 nurture email content goes here. Scored ${score}%.]
      </p>
    </td></tr>

  </table>
  </td></tr>
  </table>
  </body>
  </html>
  `;
}
