export function buildReportEmail(userData, result) {
  const firstName = userData?.firstName?.trim() || "there";

  const quadrantMeta = {
    "key-performer": {
      label: "Key Performer",
      color: "#16a34a",
      summary:
        "You are showing the mix of output and upside that tends to place people in the critical talent pool. The opportunity now is protecting and compounding that edge."
    },
    specialist: {
      label: "Specialist",
      color: "#2563eb",
      summary:
        "You are clearly delivering, but your broader upside may not be landing as strongly as it could. This often happens when execution is visible, but future trajectory is less obvious."
    },
    emerging: {
      label: "Emerging",
      color: "#8b5cf6",
      summary:
        "There is clear promise here, but the full pattern of performance is not established yet. The opportunity now is to turn potential into a stronger, more visible track record."
    },
    "at-risk": {
      label: "At Risk",
      color: "#ff2846",
      summary:
        "Something in the current pattern suggests you may not be operating at your best right now. That usually points to constraints, not a lack of ability. The opportunity is to identify what is getting in the way and rebuild from there."
    }
  };

  const subDimMeta = {
    perspective: {
      name: "Perspective",
      desc: "How clearly you understand where you create value and how you allocate effort."
    },
    pace: {
      name: "Pace",
      desc: "The energy and intrinsic motivation you bring to your work."
    },
    profile: {
      name: "Profile",
      desc: "How visible and trusted you are inside your organisation."
    },
    performance: {
      name: "Performance",
      desc: "Whether you actually move outcomes and drive results."
    },
    progress: {
      name: "Progress",
      desc: "Career momentum and how the organisation recognises your contribution."
    }
  };

  const quadrant = quadrantMeta[result?.quadrant] || quadrantMeta.emerging;
  const subScores = result?.subScores || {};

  const strongestKey =
    Object.entries(subScores).sort((a, b) => b[1] - a[1])[0]?.[0] || "performance";
  const weakestKey =
    Object.entries(subScores).sort((a, b) => a[1] - b[1])[0]?.[0] || "progress";

  function getTag(key) {
    if (key === strongestKey) {
      return `
        <div style="
          display:inline-block;
          margin:8px 0 0;
          padding:4px 8px;
          border-radius:999px;
          font-size:10px;
          font-weight:700;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:#16a34a;
          background:rgba(22,163,74,0.08);
        ">
          Strongest signal
        </div>
      `;
    }

    if (key === weakestKey) {
      return `
        <div style="
          display:inline-block;
          margin:8px 0 0;
          padding:4px 8px;
          border-radius:999px;
          font-size:10px;
          font-weight:700;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:#ff2846;
          background:rgba(255,40,70,0.08);
        ">
          Biggest opportunity
        </div>
      `;
    }

    return "";
  }

  function getAccent(key) {
    if (key === strongestKey) return "#16a34a";
    if (key === weakestKey) return "#ff2846";
    return "#1a1a1a";
  }

  function renderDimensionCard(key, score) {
    const meta = subDimMeta[key];
    const accent = getAccent(key);

    return `
      <td style="padding:8px; vertical-align:top;" width="50%">
        <div style="
          background:#ffffff;
          border:1px solid rgba(26,26,26,0.08);
          border-radius:12px;
          padding:18px;
        ">
          <div style="
            font-size:15px;
            line-height:1.2;
            font-weight:700;
            color:${accent};
          ">
            ${meta?.name || key}
          </div>

          ${getTag(key)}

          <div style="
            margin-top:10px;
            font-size:13px;
            line-height:1.6;
            color:rgba(26,26,26,0.65);
          ">
            ${meta?.desc || ""}
          </div>

          <div style="
            margin-top:14px;
            height:4px;
            background:#e8e2d8;
            border-radius:999px;
            overflow:hidden;
          ">
            <div style="
              width:${score || 0}%;
              height:4px;
              background:${accent};
              border-radius:999px;
            "></div>
          </div>

          <div style="
            margin-top:10px;
            font-size:13px;
            line-height:1.2;
            font-weight:700;
            color:${accent};
          ">
            Score ${score || 0}%
          </div>
        </div>
      </td>
    `;
  }

  const dimensionEntries = Object.entries(subScores);
  const firstRow = dimensionEntries.slice(0, 2);
  const secondRow = dimensionEntries.slice(2, 4);
  const thirdRow = dimensionEntries.slice(4, 5);

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your Key Performer Scorecard Results</title>
    </head>
    <body style="margin:0; padding:0; background:#f1ece4; font-family:Arial, Helvetica, sans-serif; color:#1a1a1a;">
      <div style="background:#f1ece4; padding:32px 16px;">
        <div style="max-width:760px; margin:0 auto;">

          <div style="text-align:center; padding:8px 0 28px;">
            <div style="
              font-size:12px;
              letter-spacing:.18em;
              text-transform:uppercase;
              color:rgba(26,26,26,0.38);
              font-weight:700;
            ">
              FOUND
            </div>
            <div style="
              margin-top:10px;
              font-size:12px;
              letter-spacing:.18em;
              text-transform:uppercase;
              color:#ff2846;
              font-weight:700;
            ">
              Key Performer Scorecard
            </div>
          </div>

          <div style="
            background:#ffffff;
            border:1px solid rgba(26,26,26,0.08);
            border-radius:16px;
            padding:32px 28px;
          ">
            <div style="
              font-size:12px;
              letter-spacing:.18em;
              text-transform:uppercase;
              color:#ff2846;
              font-weight:700;
              margin-bottom:12px;
            ">
              Your result
            </div>

            <h1 style="
              margin:0 0 14px;
              font-size:42px;
              line-height:1;
              letter-spacing:-.03em;
              font-weight:700;
              color:${quadrant.color};
            ">
              ${quadrant.label}
            </h1>

            <p style="
              margin:0 0 14px;
              font-size:17px;
              line-height:1.7;
              color:rgba(26,26,26,0.74);
            ">
              Hi ${firstName},
            </p>

            <p style="
              margin:0 0 14px;
              font-size:17px;
              line-height:1.7;
              color:rgba(26,26,26,0.74);
            ">
              Thanks for completing the Key Performer Scorecard. Here is your result.
            </p>

            <p style="
              margin:0 0 24px;
              font-size:17px;
              line-height:1.7;
              color:rgba(26,26,26,0.74);
            ">
              ${quadrant.summary}
            </p>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
              <tr>
                <td width="50%" style="padding-right:10px; vertical-align:top;">
                  <div style="
                    font-size:11px;
                    letter-spacing:.14em;
                    text-transform:uppercase;
                    color:rgba(26,26,26,0.4);
                    font-weight:700;
                    margin-bottom:8px;
                  ">
                    Performance
                  </div>
                  <div style="
                    font-size:34px;
                    line-height:1;
                    font-weight:700;
                    color:#2563eb;
                  ">
                    ${result?.performancePct || 0}%
                  </div>
                </td>
                <td width="50%" style="padding-left:10px; vertical-align:top;">
                  <div style="
                    font-size:11px;
                    letter-spacing:.14em;
                    text-transform:uppercase;
                    color:rgba(26,26,26,0.4);
                    font-weight:700;
                    margin-bottom:8px;
                  ">
                    Potential
                  </div>
                  <div style="
                    font-size:34px;
                    line-height:1;
                    font-weight:700;
                    color:#8b5cf6;
                  ">
                    ${result?.potentialPct || 0}%
                  </div>
                </td>
              </tr>
            </table>

            <div style="
              font-size:12px;
              letter-spacing:.18em;
              text-transform:uppercase;
              color:rgba(26,26,26,0.34);
              font-weight:700;
              margin:8px 0 14px;
            ">
              Your five dimensions
            </div>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                ${firstRow.map(([key, score]) => renderDimensionCard(key, score)).join("")}
              </tr>
              <tr>
                ${secondRow.map(([key, score]) => renderDimensionCard(key, score)).join("")}
              </tr>
              <tr>
                ${thirdRow.map(([key, score]) => renderDimensionCard(key, score)).join("")}
                <td style="padding:8px;" width="50%"></td>
              </tr>
            </table>

            <div style="
              margin-top:28px;
              padding-top:24px;
              border-top:1px solid rgba(26,26,26,0.08);
            ">
              <div style="
                font-size:12px;
                letter-spacing:.18em;
                text-transform:uppercase;
                color:rgba(26,26,26,0.34);
                font-weight:700;
                margin-bottom:12px;
              ">
                What this means
              </div>

              <p style="
                margin:0 0 12px;
                font-size:16px;
                line-height:1.75;
                color:rgba(26,26,26,0.74);
              ">
                High performers tend to show two things at once: consistent delivery and clear signals of future potential.
              </p>

              <p style="
                margin:0 0 24px;
                font-size:16px;
                line-height:1.75;
                color:rgba(26,26,26,0.74);
              ">
                Your strongest signal is <strong>${subDimMeta[strongestKey]?.name || strongestKey}</strong>. Your biggest opportunity is <strong>${subDimMeta[weakestKey]?.name || weakestKey}</strong>. That combination tells you where to protect your edge and where to focus next.
              </p>

              <a href="https://found.pro/waitlist" style="
                display:inline-block;
                background:#ff2846;
                color:#ffffff;
                text-decoration:none;
                font-size:15px;
                font-weight:700;
                padding:14px 22px;
                border-radius:4px;
              ">
                Join the Key Performer Programme
              </a>
            </div>
          </div>

          <div style="
            text-align:center;
            padding:18px 8px 0;
            font-size:12px;
            line-height:1.6;
            color:rgba(26,26,26,0.35);
          ">
            FOUND · foundperform.com · Key Performer Scorecard
          </div>

        </div>
      </div>
    </body>
  </html>
  `;
}
