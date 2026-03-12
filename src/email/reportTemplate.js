export function buildReportEmail(userData, result) {
  const name = userData?.firstName || "there";

  return `
  <html>
    <body style="margin:0;padding:0;background:#f1ece4;font-family:Arial,sans-serif;color:#1a1a1a;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
          <td align="center">

            <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;border:1px solid #e6e1d8;padding:40px;">

              <tr>
                <td style="text-align:center;padding-bottom:24px;">
                  <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#ff2846;font-weight:bold;">
                    FOUND
                  </div>
                  <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-top:6px;">
                    Key Performer Scorecard
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <h1 style="margin:0 0 16px;font-size:32px;line-height:1.2;">
                    Your Results
                  </h1>

                  <p style="font-size:16px;line-height:1.6;margin-bottom:20px;">
                    Hi ${name},
                  </p>

                  <p style="font-size:16px;line-height:1.6;margin-bottom:20px;">
                    Thanks for completing the Key Performer Scorecard.
                  </p>

                  <p style="font-size:16px;line-height:1.6;margin-bottom:28px;">
                    Your result category is:
                  </p>

                  <div style="
                    font-size:28px;
                    font-weight:bold;
                    color:#ff2846;
                    margin-bottom:28px;
                  ">
                    ${result?.quadrant || "Result"}
                  </div>

                  <p style="font-size:15px;line-height:1.7;margin-bottom:28px;">
                    This score reflects the balance between your current performance and future potential.
                  </p>

                  <a href="https://foundperform.com" 
                     style="
                       display:inline-block;
                       padding:14px 22px;
                       background:#ff2846;
                       color:#ffffff;
                       text-decoration:none;
                       border-radius:4px;
                       font-weight:bold;
                     ">
                     Learn more about the Key Performer Programme
                  </a>

                </td>
              </tr>

            </table>

            <table width="640" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td style="text-align:center;font-size:12px;color:#999;">
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