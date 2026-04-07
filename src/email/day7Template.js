export function buildDay7Email(userData, result) {
  const name = userData?.firstName || "there";
  const bookingUrl = "https://calendly.com/foundperform/20min"; // TODO: confirm real URL

  return `
  <html>
  <body style="margin:0;background:#f1ece4;font-family:Arial, Helvetica, sans-serif;color:#111;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr><td align="center">
  <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:48px;">

    <tr><td align="center" style="padding-bottom:32px;">
      <img src="https://scorecard.foundperform.com/found-logo.png" width="140" style="display:block;margin-bottom:10px;" />
      <div style="font-size:11px;letter-spacing:2px;color:#888;">KEY PERFORMER SCORECARD</div>
    </td></tr>

    <tr><td style="font-size:16px;line-height:1.65;color:#222;">

      <p style="margin:0 0 20px;">Hi ${name},</p>

      <p style="margin:0 0 20px;">A week ago you took the Key Performer Scorecard.</p>

      <p style="margin:0 0 20px;">Taking action matters more than having talent. The people who reach the top quadrant aren't the most gifted — they're the ones who moved.</p>

      <p style="margin:0 0 8px;"><strong>90% of people will do nothing with their result.</strong></p>
      <p style="margin:0 0 28px;">That's what separates the Key Performers.</p>

      <p style="margin:0 0 16px;font-weight:bold;">Three things you can do this week:</p>

      <ol style="margin:0 0 28px;padding-left:20px;">
        <li style="margin:0 0 14px;"><strong>Name one thing you've been putting off</strong> because you're "not quite ready". Put it in the diary for Friday.</li>
        <li style="margin:0 0 14px;"><strong>Ask your manager or a senior colleague for one piece of specific feedback</strong> on a live piece of work — not "how am I doing", but "what would make this stronger".</li>
        <li style="margin:0 0 14px;"><strong>Ship it rough.</strong> A version your manager can react to beats a perfect version that never lands on their desk.</li>
      </ol>

      <p style="margin:0 0 16px;font-weight:bold;">And one thing to avoid:</p>

      <p style="margin:0 0 32px;"><strong>Don't procrastilearn.</strong> Another podcast, another article or coffee chat — it feels like progress but it's hiding. Act on what you already know.</p>

      <p style="margin:0 0 24px;">If you want help spotting where the biggest unlock is, Emily runs free 20-minute calls.</p>

      <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
        <tr><td style="background:#e63946;border-radius:6px;">
          <a href="${bookingUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;">Book a call with Emily →</a>
        </td></tr>
      </table>

      <p style="margin:0;color:#555;">— Team FOUND</p>

    </td></tr>

  </table>
  </td></tr>
  </table>
  </body>
  </html>
  `;
}
