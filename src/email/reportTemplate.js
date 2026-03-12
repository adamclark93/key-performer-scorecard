export function buildReportEmail(userData, result) {

  const name = userData?.firstName || "there";
  const quadrant = result?.quadrant || "Result";

  return `
  <html>
  <body style="margin:0;background:#e7e0d6;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr>
  <td align="center">

  <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">

  <tr>
  <td align="center" style="padding-bottom:20px;">
  <div style="font-size:13px;letter-spacing:3px;color:#ff2846;font-weight:bold;">
  FOUND
  </div>
  <div style="font-size:12px;letter-spacing:2px;color:#777;margin-top:6px;">
  KEY PERFORMER SCORECARD
  </div>
  </td>
  </tr>

  <tr>
  <td>

  <h1 style="font-size:34px;margin:20px 0;color:#111;">
  Your Key Performer Scorecard Results
  </h1>

  <p style="font-size:16px;margin-bottom:20px;">
  Hi ${name},
  </p>

  <p style="font-size:16px;line-height:1.6;margin-bottom:20px;">
  Thanks for completing the Key Performer Scorecard.
  </p>

  </td>
  </tr>

  <tr>
  <td style="padding:25px;background:#f7f5f1;border-radius:8px;">

  <div style="font-size:12px;letter-spacing:2px;color:#999;margin-bottom:10px;">
  YOUR RESULT
  </div>

  <div style="font-size:32px;font-weight:bold;color:#ff2846;margin-bottom:14px;text-transform:capitalize;">
  ${quadrant}
  </div>

  <p style="font-size:15px;line-height:1.6;color:#333;">
  This score reflects the balance between your current performance and your future potential.
  </p>

  </td>
  </tr>

  <tr>
  <td style="padding-top:25px;">

  <h3 style="font-size:20px;margin-bottom:10px;">
  What high performers tend to show
  </h3>

  <ul style="font-size:15px;line-height:1.7;color:#333;padding-left:18px;">
  <li>consistent delivery</li>
  <li>clear signals of future potential</li>
  </ul>

  <p style="font-size:15px;line-height:1.7;margin-top:12px;">
  Your score suggests you are demonstrating patterns that typically place people in the high-potential talent pool.
  </p>

  </td>
  </tr>

  <tr>
  <td style="padding-top:25px;">

  <h3 style="font-size:20px;margin-bottom:10px;">
  What this score measures
  </h3>

  <p style="font-size:15px;line-height:1.7;color:#333;">
  The Key Performer Scorecard measures five drivers of professional momentum:
  </p>

  <p style="font-size:15px;color:#333;margin-top:8px;">
  Perspective • Pace • Profile • Performance • Progress
  </p>

  </td>
  </tr>

  <tr>
  <td style="padding-top:30px;text-align:center;">

  <p style="font-size:15px;line-height:1.6;color:#333;margin-bottom:20px;">
  If you'd like help interpreting your scorecard and identifying the one lever most likely to accelerate your trajectory, we offer a short diagnostic session.
  </p>

  <a href="https://foundperform.com" style="display:inline-block;padding:16px 28px;background:#ff2846;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;font-size:15px;">
  Book a Discovery Call
  </a>

  <p style="font-size:13px;color:#777;margin-top:16px;">
  Or join the waitlist for the next Key Performer cohort.
  </p>

  </td>
  </tr>

  </table>

  <table width="640" cellpadding="0" cellspacing="0" style="margin-top:18px;">
  <tr>
  <td align="center" style="font-size:12px;color:#777;">
  FOUND · Private Markets Performance Coaching
  </td>
  </tr>
  </table>

  </td>
  </tr>
  </table>

  </body>
  </html>
  `;
}