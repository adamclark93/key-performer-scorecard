export function buildReportEmail(userData, result) {

  const name = userData?.firstName || "there";

  return `
  <html>
  <body style="margin:0;background:#dcd4c9;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr>
  <td align="center">

  <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;padding:40px;">

  <tr>
  <td align="center" style="padding-bottom:10px;">
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

  <h1 style="font-size:36px;margin:20px 0;color:#111;">
  Your Results
  </h1>

  <p style="font-size:16px;margin-bottom:20px;">
  Hi ${name},
  </p>

  <p style="font-size:16px;line-height:1.6;margin-bottom:20px;">
  Thanks for completing the Key Performer Scorecard.
  </p>

  <p style="font-size:16px;margin-bottom:25px;">
  Your result category is:
  </p>

  <div style="font-size:34px;font-weight:bold;color:#ff2846;margin-bottom:25px;text-transform:lowercase;">
  ${result?.quadrant || "result"}
  </div>

  <p style="font-size:15px;line-height:1.7;margin-bottom:30px;color:#333;">
  This score reflects the balance between your current performance and future potential.
  </p>

  <a href="https://foundperform.com" style="display:inline-block;padding:16px 28px;background:#ff2846;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold;font-size:15px;">
  Learn more about the Key Performer Programme
  </a>

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