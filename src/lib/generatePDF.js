import { jsPDF } from 'jspdf';
import { subDims } from '../models/questions';
import { quadrants, getDimRating } from '../models/scoring';

// ── Helpers ──────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

async function loadLogo() {
  const res = await fetch('/found-logo.png');
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const LEFT = 20;
const RIGHT_MARGIN = 20;

function addPageFooter(doc) {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  doc.setFontSize(6.5);
  doc.setTextColor(180, 180, 180);
  doc.text('FOUND  ·  foundperform.com  ·  Key Performer Scorecard', pw / 2, ph - 10, { align: 'center' });
}

function addPageHeader(doc, logo) {
  const pw = doc.internal.pageSize.getWidth();
  if (logo) doc.addImage(logo, 'PNG', LEFT, 12, 32, 13);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text('KEY PERFORMER SCORECARD', pw - RIGHT_MARGIN, 20, { align: 'right' });
}

// ── Dimension improvement content ────────────────────
const dimContent = {
  perspective: {
    what: 'Perspective measures how clearly you understand where you create value and how you allocate your effort. Professionals with strong perspective know which tasks matter most and consistently prioritise the work that moves the needle.',
    tips: [
      'Start each week by identifying the single most important outcome you need to deliver — protect time for it above all else.',
      'Ask your manager or key stakeholders: "What is the one thing I could do that would have the most impact right now?" Compare their answer to where you are spending your time.',
      'At the end of each day, reflect on whether your output matched your capability. If not, identify the distraction or blocker and address it.',
    ],
  },
  pace: {
    what: 'Pace captures the energy and intrinsic motivation you bring to your work. It reflects whether you are actively seeking growth, taking on stretch assignments, and sustaining the intensity needed to progress.',
    tips: [
      'Volunteer for a project outside your day-to-day scope — this signals ambition and builds new capabilities at the same time.',
      'If you feel capable of more than your role allows, have an honest conversation with your manager about expanding your remit.',
      'Audit your energy: are you in a role and environment where you would still choose this career if the money were equal? If not, examine what needs to change.',
    ],
  },
  profile: {
    what: 'Profile measures how visible and trusted you are inside your organisation. It reflects whether the right people know who you are, what you do, and why it matters. Strong performers without profile often get passed over.',
    tips: [
      'Proactively invest time in building relationships with senior leaders outside your immediate team — even 15 minutes a month per person compounds.',
      'Develop a specific expertise or point of view that people associate with you. Become the go-to person for something concrete.',
      'Look for opportunities to share your work in visible forums: all-hands meetings, internal newsletters, cross-functional reviews.',
    ],
  },
  performance: {
    what: 'Performance reflects whether you actually move outcomes and drive results. It goes beyond doing your job — it measures whether people turn to you for difficult problems and whether your contribution is felt in key moments.',
    tips: [
      'Focus on outcomes, not activities. Reframe your work in terms of business impact: revenue influenced, problems solved, decisions improved.',
      'When you are in important meetings, make sure you contribute meaningfully. Prepare one clear point or question in advance.',
      'Build your ability to see the bigger picture when others are lost in details — strategic thinking is one of the strongest differentiators.',
    ],
  },
  progress: {
    what: 'Progress captures your career momentum and how your organisation recognises your contribution. It includes promotions, expanding responsibility, and whether the people who matter see you as a top performer.',
    tips: [
      'If you have not been promoted in the last two years, have a direct conversation about what the gap is and create a plan to close it.',
      'Seek explicit feedback from your manager: "Am I considered a top performer? What would I need to do to get there?"',
      'Track your wins and growing responsibilities. If your scope has grown beyond your original job description, make sure that is reflected in your title and recognition.',
    ],
  },
};

// ── Page 1: Results Overview ─────────────────────────
function drawResultsPage(doc, logo, userData, result) {
  const pw = doc.internal.pageSize.getWidth();
  const { quadrant, overallPct, subScores } = result;
  const q = quadrants[quadrant];
  const qColor = hexToRgb(q.color);
  const name = userData?.firstName || 'there';
  const contentW = pw - LEFT - RIGHT_MARGIN;

  // Header
  addPageHeader(doc, logo);

  // ── Left column: result info ──
  let y = 42;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 40, 70);
  doc.text('YOUR RESULT', LEFT, y);

  y += 10;
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...qColor);
  doc.text(q.label, LEFT, y);

  y += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Here is your breakdown, ${name}.`, LEFT, y);

  y += 8;
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  const summaryLines = doc.splitTextToSize(q.summary, contentW * 0.55);
  doc.text(summaryLines, LEFT, y);

  // ── Right column: overall score + quadrant grid ──
  const rightX = pw - RIGHT_MARGIN;
  const gridRight = rightX;
  const cellW = 35;
  const cellH = 26;
  const gap = 2;
  const gridW = 2 * cellW + gap;
  const gridX = gridRight - gridW;

  // Overall score above grid
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(150, 150, 150);
  doc.text('YOUR OVERALL SCORE', gridX + gridW / 2, 42, { align: 'center' });
  doc.setFontSize(32);
  doc.setTextColor(...qColor);
  doc.text(`${overallPct}%`, gridX + gridW / 2, 56, { align: 'center' });

  // 2x2 Quadrant grid
  const gridY = 62;
  const cells = [
    { key: 'emerging', label: 'Emerging', col: 0, row: 0 },
    { key: 'key-performer', label: 'Key Performer', col: 1, row: 0 },
    { key: 'at-risk', label: 'At Risk', col: 0, row: 1 },
    { key: 'specialist', label: 'Workhorse', col: 1, row: 1 },
  ];

  cells.forEach((c) => {
    const cx = gridX + c.col * (cellW + gap);
    const cy = gridY + c.row * (cellH + gap);
    const isActive = c.key === quadrant;

    if (isActive) {
      doc.setDrawColor(...qColor);
      doc.setLineWidth(1);
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setDrawColor(215, 215, 215);
      doc.setLineWidth(0.3);
      doc.setFillColor(245, 243, 239);
    }
    doc.roundedRect(cx, cy, cellW, cellH, 2, 2, 'FD');

    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isActive ? qColor[0] : 170, isActive ? qColor[1] : 170, isActive ? qColor[2] : 170);
    doc.text(c.label.toUpperCase(), cx + 3, cy + 7);

    if (isActive) {
      doc.setFontSize(6.5);
      doc.setTextColor(...qColor);
      doc.text('* You', cx + 3, cy + cellH - 5);
    }
  });

  // Axis labels
  doc.setFontSize(5);
  doc.setTextColor(170, 170, 170);
  doc.text('PERFORMANCE >', gridX + gridW / 2, gridY + 2 * cellH + gap + 6, { align: 'center' });

  // ── Divider ──
  const dividerY = gridY + 2 * cellH + gap + 14;
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.3);
  doc.line(LEFT, dividerY, pw - RIGHT_MARGIN, dividerY);

  // ── Five Dimensions heading ──
  let dimY = dividerY + 10;
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(160, 160, 160);
  doc.text('YOUR FIVE DIMENSIONS', LEFT, dimY);

  // ── Dimension rows (compact, no descriptions) ──
  dimY += 10;
  const barWidth = contentW;
  Object.keys(subDims).forEach((key) => {
    const d = subDims[key];
    const score = subScores[key];
    const rating = getDimRating(score);
    const rColor = hexToRgb(rating.color);

    // Name on left, score on right
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    doc.text(d.name, LEFT, dimY);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...rColor);
    doc.text(`${rating.score}/5  ·  ${rating.label}`, pw - RIGHT_MARGIN, dimY, { align: 'right' });

    // Bar
    dimY += 4;
    doc.setFillColor(235, 235, 235);
    doc.roundedRect(LEFT, dimY, barWidth, 3, 1.5, 1.5, 'F');
    doc.setFillColor(...rColor);
    const fillW = Math.max(3, (score / 100) * barWidth);
    doc.roundedRect(LEFT, dimY, fillW, 3, 1.5, 1.5, 'F');

    dimY += 11;
  });

  // ── CTA bar at bottom ──
  const ph = doc.internal.pageSize.getHeight();
  const ctaY = ph - 50;
  doc.setFillColor(26, 26, 26);
  doc.roundedRect(LEFT, ctaY, contentW, 30, 3, 3, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Understanding your constraints is the first step to becoming a Key Performer.', pw / 2, ctaY + 12, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Book a free consultation  ·  calendly.com/found-performance/keyperformer', pw / 2, ctaY + 22, { align: 'center' });

  addPageFooter(doc);
}

// ── Pages 2–6: One page per dimension ────────────────
function drawDimensionPage(doc, logo, dimKey, score) {
  doc.addPage();
  const pw = doc.internal.pageSize.getWidth();
  const d = subDims[dimKey];
  const content = dimContent[dimKey];
  const rating = getDimRating(score);
  const rColor = hexToRgb(rating.color);
  const contentW = pw - LEFT - RIGHT_MARGIN;

  addPageHeader(doc, logo);

  let y = 45;

  // Dimension name
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 26, 26);
  doc.text(d.name, LEFT, y);

  // Score badge
  y += 9;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...rColor);
  doc.text(`Score ${rating.score}/5  ·  ${rating.label}`, LEFT, y);

  // Bar
  y += 7;
  doc.setFillColor(235, 235, 235);
  doc.roundedRect(LEFT, y, contentW, 4, 2, 2, 'F');
  doc.setFillColor(...rColor);
  doc.roundedRect(LEFT, y, Math.max(4, (score / 100) * contentW), 4, 2, 2, 'F');

  // What it is
  y += 16;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 26, 26);
  doc.text('What it is', LEFT, y);

  y += 7;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const whatLines = doc.splitTextToSize(content.what, contentW);
  doc.text(whatLines, LEFT, y);
  y += whatLines.length * 4.5 + 10;

  // How to improve
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 26, 26);
  doc.text('How to improve', LEFT, y);

  y += 9;
  content.tips.forEach((tip, i) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 40, 70);
    doc.text(`${i + 1}.`, LEFT, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const tipLines = doc.splitTextToSize(tip, contentW - 12);
    doc.text(tipLines, LEFT + 10, y);
    y += tipLines.length * 4.5 + 7;
  });

  // CTA at bottom
  const ph = doc.internal.pageSize.getHeight();
  const ctaY = ph - 50;
  doc.setFillColor(26, 26, 26);
  doc.roundedRect(LEFT, ctaY, contentW, 30, 3, 3, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Want help improving this dimension?', pw / 2, ctaY + 12, { align: 'center' });

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Book a free 30-minute consultation  ·  calendly.com/found-performance/keyperformer', pw / 2, ctaY + 22, { align: 'center' });

  addPageFooter(doc);
}

// ── Build PDF doc (shared by download + email) ──────
async function buildPDFDoc(userData, result) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const logo = await loadLogo();

  drawResultsPage(doc, logo, userData, result);

  Object.keys(subDims).forEach((key) => {
    drawDimensionPage(doc, logo, key, result.subScores[key]);
  });

  return doc;
}

// ── Generate + trigger browser download ─────────────
export async function generatePDF(userData, result) {
  const doc = await buildPDFDoc(userData, result);
  doc.save('FOUND-Key-Performer-Scorecard.pdf');
}

// ── Generate + return base64 string (for email) ─────
export async function generatePDFBase64(userData, result) {
  const doc = await buildPDFDoc(userData, result);
  return doc.output('datauristring').split(',')[1]; // pure base64
}
