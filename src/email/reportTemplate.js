export function buildReportEmail(userData, result) {
  return `
    <html>
      <body>
        <h1>Your Key Performer Scorecard</h1>
        <p>Hi ${userData?.firstName || "there"}</p>
        <p>Your result is: ${result?.quadrant || "N/A"}</p>
      </body>
    </html>
  `;
}