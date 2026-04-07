import { jsPDF } from 'jspdf';
import { subDims } from '../models/questions';
import { quadrants, getDimRating, getWeakestSubDim, getStrongestSubDim } from '../models/scoring';
import {
  InstrumentSerif_Regular,
  InstrumentSerif_Italic,
  DMSans_Regular,
  DMSans_Bold,
  DMSans_Italic,
} from '../fonts/fontData';

// ── Register custom fonts ────────────────────────────
function registerFonts(doc) {
  doc.addFileToVFS('InstrumentSerif-Regular.ttf', InstrumentSerif_Regular);
  doc.addFont('InstrumentSerif-Regular.ttf', 'InstrumentSerif', 'normal');

  doc.addFileToVFS('InstrumentSerif-Italic.ttf', InstrumentSerif_Italic);
  doc.addFont('InstrumentSerif-Italic.ttf', 'InstrumentSerif', 'italic');

  doc.addFileToVFS('DMSans-Regular.ttf', DMSans_Regular);
  doc.addFont('DMSans-Regular.ttf', 'DMSans', 'normal');

  doc.addFileToVFS('DMSans-Bold.ttf', DMSans_Bold);
  doc.addFont('DMSans-Bold.ttf', 'DMSans', 'bold');

  doc.addFileToVFS('DMSans-Italic.ttf', DMSans_Italic);
  doc.addFont('DMSans-Italic.ttf', 'DMSans', 'italic');
}

// Font shorthand helpers
const SERIF = 'InstrumentSerif';
const SANS = 'DMSans';

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

// ── Design tokens (consistent across all pages) ─────
const LEFT = 22;
const RIGHT_MARGIN = 22;
const BRAND_RED = [255, 40, 70];
const DARK = [45, 45, 45];
const GREY = [100, 100, 100];
const LIGHT_GREY = [160, 160, 160];
const WARM_BG = [248, 246, 243];
const CALENDLY_URL = 'https://calendly.com/found-performance/keyperformer';

// ── Global page counter ──
let _pageNum = 0;
let _totalPages = 0;

// #19: Page numbers + footer
function addPageFooter(doc) {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  _pageNum++;
  doc.setFontSize(6.5);
  doc.setTextColor(180, 180, 180);
  doc.text('FOUND  ·  foundperform.com  ·  Key Performer Scorecard', pw / 2, ph - 10, { align: 'center' });
  doc.setFontSize(6);
  doc.text(`${_pageNum}`, pw - RIGHT_MARGIN, ph - 10, { align: 'right' });
}

// #20: Header drawn AFTER dark backgrounds (caller is responsible for order)
function addPageHeader(doc, logo, onDark = false) {
  const pw = doc.internal.pageSize.getWidth();
  if (logo) doc.addImage(logo, 'PNG', LEFT, 12, 30, 15);
  doc.setFontSize(6.5);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(onDark ? 120 : 150, onDark ? 120 : 150, onDark ? 120 : 150);
  doc.text('KEY PERFORMER SCORECARD', pw - RIGHT_MARGIN, 20, { align: 'right' });
}

// ── Dimension improvement content ────────────────────
const dimContent = {
  perspective: {
    what: [
      'Perspective measures how clearly you understand where you produce value and how ruthlessly you protect time for it. The constraint in most professional environments is not effort - it is attention.',
      'Research suggests a small fraction of activities drives the majority of outcomes. The challenge is that most professionals know this and do not live it.',
      'Research on attention residue suggests switching between tasks leaves a cognitive trace that degrades performance on the following task.',
      'As AI takes on more analytical and process-driven work, the premium on human judgement and strategic clarity is rising. Knowing exactly where your irreplaceable value sits, and protecting time for it, is no longer just good practice. It is the job.',
    ],
    keyQuestion: 'If a senior partner reviewed how you spent last week, not your outputs but your actual time, would they see someone operating at the top of their value chain?',
    tips: [
      'Do a five-day time audit before you change anything else. Categorise every hour as high-leverage, necessary, or low-value. Most professionals are surprised by what they find.',
      'Ask the most senior person who evaluates your work: "What is the highest-value thing I could be spending more time on?" Their answer will almost certainly differ from how you are currently allocating your week. That gap is the work.',
      'At the start of each day, write down your top priorities. At the end of the day, review whether they were completed. If not, identify exactly what displaced them. The pattern that emerges is more useful than any time management system.',
    ],
  },
  pace: {
    what: [
      'Pace captures the intrinsic drive you bring to your work and your ability to sustain it. It is not about hours. It is about whether you are seeking harder problems, building new capability, and maintaining the intensity that separates people building careers from people maintaining them.',
      'Research on motivation distinguishes between autonomous motivation, doing something because it genuinely matters to you, and controlled motivation, driven by external pressure alone. Professionals with high autonomous motivation consistently outperform over time and are more frequently identified as future leaders.',
      'Sustained Pace also requires deliberate recovery. Research on chronic stress and cognitive performance suggests that pressure without recovery does not build resilience. It produces gradual degradation. The professionals with the longest and strongest careers manage their energy as deliberately as their time.',
    ],
    keyQuestion: 'Are you building for the long game, or running at a pace that will be hard to sustain for the next five years?',
    tips: [
      'Identify the stretch opportunity you have been hesitant to raise your hand for and make a specific proposal for owning part of it. Leading the AI workstream, joining an employee resource group, taking on a cross-functional initiative. Ambition without a concrete ask is invisible.',
      'Build recovery into your structure as deliberately as you build your schedule. Research suggests pressure without recovery does not build resilience. It produces gradual degradation.',
      'Implement a shutdown routine. Take five minutes at the end of each workday to brain dump your to-dos, what got done, and when you will tackle the next priorities. Research suggests this reduces cognitive load in the evenings and meaningfully improves the quality of recovery.',
    ],
  },
  profile: {
    what: [
      'Profile has two dimensions that are equally important and routinely neglected. Internal profile is how visible and trusted you are with the people who make decisions about your career. External profile is how known and credible you are outside the organisation.',
      'Research on organisational networks suggests that professionals with strong internal visibility are promoted faster and given more consequential work earlier, independent of raw performance. The decisions that shape careers are made in conversations you are never part of. Internal profile determines whether your name comes up.',
      'External profile is built through genuine relationships, a clear point of view, and consistent presence in the right conversations over time. The professionals who build the strongest reputations combine warmth and competence. That combination is learnable.',
      'The leaders others genuinely trust are the ones who contain pressure rather than transmit it. The professionals others gravitate towards absorb anxiety and return clarity. This is a skill, not a personality type.',
    ],
    keyQuestion: 'Internally: would a Partner or MD name you among their most trusted people? Externally: does the market know who you are and what you stand for?',
    tips: [
      'Schedule fifteen minutes with one senior person outside your immediate team and use it to ask a genuine question about their work, not to present yours. Showing genuine interest in the other person builds trust faster than presenting your own credentials.',
      'Rate yourself honestly on the two dimensions that research suggests drive professional influence: warmth and competence. Most professionals in this industry over-index on one at the expense of the other. Identify which, then work on it deliberately.',
      'Block a fixed weekly slot for business development and external relationship activity. Research suggests that scheduling a specific time significantly increases follow-through compared to intention alone.',
    ],
  },
  performance: {
    what: [
      'Performance reflects whether you actually move outcomes. Not whether you complete tasks, but whether your involvement makes a material difference to what gets decided or delivered. In demanding environments it is measured by whether people seek you out when something difficult needs to happen.',
      'Research suggests what separates the best is not talent or experience but the quality of deliberate practice. Professionals who perform best in critical moments do not rise to the occasion. They fall to the level of their preparation.',
      'Emotion is also a direct performance variable. Research suggests that emotional processing is not separate from good decision-making. It is part of it. Reframing how you interpret stress and pressure determines whether it sharpens your thinking or degrades it.',
      'Confidence matters too. Research on feedback deprivation suggests that capable professionals systematically underestimate their own ability without regular external calibration. Frequent, specific feedback is the fix.',
    ],
    keyQuestion: 'At the last critical moment in your work, were you someone who shaped the outcome, or someone who was present for it?',
    tips: [
      'Before any important meeting or decision, run a pre-mortem. Assume it has gone badly and work backwards: what went wrong and why? Research suggests this surfaces blind spots and failure modes that forward planning misses, and leads to materially better outcomes.',
      'Build a brief pre-performance routine before anything important. Research suggests that reframing stress as a functional signal rather than a threat shifts your physiological response and preserves the cognitive capacity you need to perform.',
      'After every important meeting, ask one person you respect: "What is one thing I could have done better?" Specific, immediate feedback is the primary mechanism through which performance improves. Most professionals do not build this infrastructure and pay for it slowly.',
    ],
  },
  progress: {
    what: [
      'Progress captures your career momentum and how your organisation recognises your contribution. Title, compensation, and scope are the visible markers. But what Progress really measures is whether the people who matter see you as someone on an upward trajectory.',
      'Research on career advancement suggests that the professionals who progress fastest are not always the strongest technical performers. They are the ones whose contribution is most legible to decision-makers, and who manage that legibility actively rather than assuming it takes care of itself.',
      'The professionals who build the most durable careers eventually become multipliers. They create genuine value for others without depleting themselves, and attract the sponsorship that individual performance alone cannot generate.',
      'The leaders who build the strongest teams make honest challenge feel safe rather than costly. Teams with high psychological safety speak up more. They catch problems earlier, challenge assumptions faster, and make better decisions in the end.',
    ],
    keyQuestion: 'Has your recognition kept pace with your actual contribution? And are you thinking about the leader you are becoming, not just the role you are moving towards?',
    tips: [
      'Keep a live document of outcomes you have driven, scope that has grown, and recognition you have received. When a promotion conversation happens, precision beats generality every time.',
      'Ask your manager directly: "What is the specific gap between where I am and what the next level requires?" Most organisations under-communicate this. Make the conversation happen rather than waiting for it.',
      'Invest deliberately in one person more junior than you this quarter. Research on leadership suggests that being seen to develop others signals readiness for the next level more clearly than almost anything else.',
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

  // #2: Warm background strip
  doc.setFillColor(...WARM_BG);
  doc.rect(0, 30, pw, 104, 'F');

  // Header ON TOP of background (fix #20)
  addPageHeader(doc, logo);

  // Left column: result info
  let y = 44;
  doc.setFontSize(8);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...BRAND_RED);
  doc.text('YOUR RESULT', LEFT, y);

  y += 14;
  doc.setFontSize(40);
  doc.setFont(SERIF, 'normal');
  doc.setTextColor(...qColor);
  doc.text(q.label, LEFT, y);

  y += 10;
  doc.setFontSize(11);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(...GREY);
  doc.text(`Here is your breakdown, ${name}.`, LEFT, y);

  y += 8;
  doc.setFontSize(9.5);
  doc.setTextColor(...GREY);
  const summaryLines = doc.splitTextToSize(q.summary, contentW * 0.50);
  doc.text(summaryLines, LEFT, y);

  // Right column: overall score + quadrant grid
  const gridRight = pw - RIGHT_MARGIN;
  const cellW = 38;
  const cellH = 28;
  const gap = 2;
  const gridW = 2 * cellW + gap;
  const gridX = gridRight - gridW;

  doc.setFontSize(8);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...LIGHT_GREY);
  doc.text('YOUR OVERALL SCORE', gridX + gridW / 2, 44, { align: 'center' });
  doc.setFontSize(42);
  doc.setFont(SERIF, 'normal');
  doc.setTextColor(...qColor);
  doc.text(`${overallPct}%`, gridX + gridW / 2, 60, { align: 'center' });

  const gridY = 66;
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
      doc.setLineWidth(1.2);
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setDrawColor(215, 215, 215);
      doc.setLineWidth(0.3);
      doc.setFillColor(240, 238, 234);
    }
    doc.roundedRect(cx, cy, cellW, cellH, 2.5, 2.5, 'FD');

    doc.setFontSize(6.5);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(isActive ? qColor[0] : 170, isActive ? qColor[1] : 170, isActive ? qColor[2] : 170);
    doc.text(c.label.toUpperCase(), cx + 4, cy + 7);

    // #3: Filled circle instead of asterisk
    if (isActive) {
      doc.setFillColor(...qColor);
      doc.circle(cx + 6, cy + cellH - 7, 2, 'F');
      doc.setFontSize(6.5);
      doc.setTextColor(...qColor);
      doc.text('You', cx + 10, cy + cellH - 5);
    }
  });

  // Five Dimensions heading
  let dimY = gridY + 2 * cellH + gap + 24;
  doc.setFontSize(8);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...LIGHT_GREY);
  doc.text('YOUR FIVE DIMENSIONS', LEFT, dimY);

  // #4: Dimension rows with one-line description
  dimY += 8;
  const barWidth = contentW;
  Object.keys(subDims).forEach((key) => {
    const d = subDims[key];
    const score = subScores[key];
    const rating = getDimRating(score);
    const rColor = hexToRgb(rating.color);

    doc.setFontSize(10);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(...DARK);
    doc.text(d.name, LEFT, dimY);

    doc.setFontSize(8);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(...rColor);
    doc.text(`${rating.score}/5  ${rating.label}`, pw - RIGHT_MARGIN, dimY, { align: 'right' });

    // One-line description
    dimY += 4.5;
    doc.setFontSize(7);
    doc.setFont(SANS, 'normal');
    doc.setTextColor(140, 140, 140);
    doc.text(d.desc, LEFT, dimY);

    dimY += 4;
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(LEFT, dimY, barWidth, 2.5, 1.2, 1.2, 'F');
    doc.setFillColor(...rColor);
    const fillW = Math.max(4, (score / 100) * barWidth);
    doc.roundedRect(LEFT, dimY, fillW, 2.5, 1.2, 1.2, 'F');

    dimY += 9;
  });

  addPageFooter(doc);
}

// ── Page 2: Why is this report valuable? (full dark) ──
function drawWhyPage(doc, logo) {
  doc.addPage();
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const contentW = pw - LEFT - RIGHT_MARGIN;

  // Full dark background
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pw, ph, 'F');

  // Logo
  if (logo) doc.addImage(logo, 'PNG', LEFT, 16, 30, 15);

  // Title — large and dramatic
  let y = 55;
  doc.setFontSize(30);
  doc.setFont(SERIF, 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('Why is this report ', LEFT, y);
  const whyW = doc.getTextWidth('Why is this report ');
  doc.setTextColor(...BRAND_RED);
  doc.text('valuable?', LEFT + whyW, y);

  y += 18;
  doc.setFontSize(11);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('In every organisation there are four groups of people:', LEFT, y);

  // Three groups with generous spacing
  y += 16;
  const groups = [
    { title: 'Underperformers', desc: 'These individuals neither perform well nor show potential for growth. Something is getting in the way. The role, environment, or recognition has not kept pace with the person.' },
    { title: 'Emerging', desc: 'Your instincts and ambition are strong but your track record and visibility inside the organisation are lagging. The potential is clear. The evidence is not yet.' },
    { title: 'Workhorses', desc: 'These people are skilled at what they do but often go unrecognised and unrewarded. They deliver consistently but lack the visibility or positioning to turn output into advancement.' },
    { title: 'Key Performers', desc: 'They earn the best opportunities, attract sponsorship from senior leaders, and build momentum others cannot match. They are strategically visible and consistently improving.', highlight: true },
  ];

  groups.forEach((g) => {
    doc.setFontSize(14);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(g.highlight ? BRAND_RED[0] : 255, g.highlight ? BRAND_RED[1] : 255, g.highlight ? BRAND_RED[2] : 255);
    doc.text(g.title, LEFT, y);

    y += 7;
    doc.setFontSize(10);
    doc.setFont(SANS, 'normal');
    doc.setTextColor(170, 170, 170);
    const lines = doc.splitTextToSize(g.desc, contentW * 0.85);
    doc.text(lines, LEFT, y);
    y += lines.length * 4.5 + 10;
  });

  addPageFooter(doc);

  // ── Page 3: Five Dimensions overview (white, clean list with red dividers) ──
  doc.addPage();
  addPageHeader(doc, logo);

  let wy = 44;

  // Large heading
  doc.setFontSize(24);
  doc.setFont(SERIF, 'normal');
  doc.setTextColor(...DARK);
  doc.text('Five Dimensions of a', LEFT, wy);
  wy += 12;
  doc.setFontSize(24);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...BRAND_RED);
  doc.text('Key Performer', LEFT, wy);

  wy += 12;
  doc.setFontSize(11);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(70, 70, 70);
  const introText = 'Becoming a Key Performer is about 5 core dimensions that predict career success in high-performance environments. Each dimension captures a different aspect of how you show up at work.';
  const introLines = doc.splitTextToSize(introText, contentW);
  doc.text(introLines, LEFT, wy);
  wy += introLines.length * 5 + 12;

  // Five dimensions as a clean vertical list with red dividers
  const dims = Object.entries(subDims);
  dims.forEach(([key, d], i) => {
    // Dimension name in bold red
    doc.setFontSize(14);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(...BRAND_RED);
    doc.text(d.name, LEFT, wy);

    // Description
    wy += 7;
    doc.setFontSize(10);
    doc.setFont(SANS, 'normal');
    doc.setTextColor(70, 70, 70);
    const descLines = doc.splitTextToSize(d.desc, contentW);
    doc.text(descLines, LEFT, wy);
    wy += descLines.length * 4.5 + 6;

    // Red divider (except after last item)
    if (i < dims.length - 1) {
      doc.setDrawColor(...BRAND_RED);
      doc.setLineWidth(0.6);
      doc.line(LEFT, wy, pw - RIGHT_MARGIN, wy);
      wy += 10;
    }
  });

  addPageFooter(doc);
}

// ── Dimension spread: Page A (What it is) + Page B (How to improve) ──
function drawDimensionSpread(doc, logo, dimKey, score) {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const d = subDims[dimKey];
  const content = dimContent[dimKey];
  const rating = getDimRating(score);
  const rColor = hexToRgb(rating.color);
  const contentW = pw - LEFT - RIGHT_MARGIN;
  const dimIdx = Object.keys(subDims).indexOf(dimKey) + 1;

  // ═══════════════════════════════════════════════════
  // PAGE A — Score box + dimension name + What it means
  // ═══════════════════════════════════════════════════
  doc.addPage();
  addPageHeader(doc, logo);

  let y = 38;

  // Score box with thick coloured border (like KPI report)
  const boxSize = 32;
  doc.setDrawColor(...rColor);
  doc.setLineWidth(2.5);
  doc.setFillColor(255, 255, 255);
  doc.rect(LEFT, y, boxSize, boxSize, 'FD');

  doc.setFontSize(7);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...DARK);
  doc.text('YOUR SCORE:', LEFT + boxSize / 2, y + 8, { align: 'center' });

  doc.setFontSize(22);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...rColor);
  doc.text(`${rating.score}/5`, LEFT + boxSize / 2, y + 22, { align: 'center' });

  // "Improve your score for" eyebrow
  y += boxSize + 14;
  doc.setFontSize(14);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...DARK);
  doc.text('Improve your score for', LEFT, y);

  // Huge dimension name
  y += 16;
  doc.setFontSize(50);
  doc.setFont(SERIF, 'normal');
  doc.setTextColor(...BRAND_RED);
  doc.text(d.name, LEFT, y);

  // Body text — generous size with bold first sentences
  y += 16;
  const LINE_H = 5.5;
  const BODY = 11;
  const whatParagraphs = Array.isArray(content.what) ? content.what : [content.what];
  whatParagraphs.forEach((para) => {
    const dotIdx = para.indexOf('. ');
    const firstSentence = dotIdx > -1 ? para.slice(0, dotIdx + 1) : para;
    const rest = dotIdx > -1 ? ' ' + para.slice(dotIdx + 2) : '';

    doc.setFontSize(BODY);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(35, 35, 35);
    const boldLines = doc.splitTextToSize(firstSentence, contentW);
    doc.text(boldLines, LEFT, y);
    y += boldLines.length * LINE_H;

    if (rest.trim()) {
      doc.setFont(SANS, 'normal');
      doc.setTextColor(60, 60, 60);
      const restLines = doc.splitTextToSize(rest.trim(), contentW);
      doc.text(restLines, LEFT, y);
      y += restLines.length * LINE_H;
    }

    y += 4;
  });

  addPageFooter(doc);

  // ═══════════════════════════════════════════════════
  // PAGE B — Ask Yourself + How to improve (clean numbered list)
  // ═══════════════════════════════════════════════════
  doc.addPage();
  addPageHeader(doc, logo);

  y = 40;

  // Ask Yourself — prominent question
  doc.setFontSize(10);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...BRAND_RED);
  doc.text('ASK YOURSELF', LEFT, y);

  y += 10;
  doc.setFontSize(14);
  doc.setFont(SERIF, 'italic');
  doc.setTextColor(...DARK);
  const qLines = doc.splitTextToSize(content.keyQuestion, contentW);
  doc.text(qLines, LEFT, y);
  y += qLines.length * 6.5;

  // Red divider
  y += 8;
  doc.setDrawColor(...BRAND_RED);
  doc.setLineWidth(1);
  doc.line(LEFT, y, pw - RIGHT_MARGIN, y);

  // "Here are 3 key things to consider:" heading
  y += 16;
  doc.setFontSize(16);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(...DARK);
  doc.text('Here are ', LEFT, y);
  const hereW = doc.getTextWidth('Here are ');
  doc.setFontSize(20);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(...BRAND_RED);
  doc.text('3', LEFT + hereW, y);
  const threeW = doc.getTextWidth('3');
  doc.setFontSize(16);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(...DARK);
  doc.text(' key things to improve:', LEFT + hereW + threeW, y);

  // Numbered tips — red square number + bold title + description
  y += 14;
  const sqSize = 14; // red number square
  const tipTextX = LEFT + sqSize + 10;
  const tipTextW = contentW - sqSize - 12;

  content.tips.forEach((tip, i) => {
    // Red number square
    doc.setFillColor(...BRAND_RED);
    doc.rect(LEFT, y - 2, sqSize, sqSize, 'F');

    doc.setFontSize(12);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(`${i + 1}`, LEFT + sqSize / 2, y + 7, { align: 'center' });

    // Tip text — bold first sentence as title, rest as body
    const dotIdx = tip.indexOf('. ');
    const title = dotIdx > -1 ? tip.slice(0, dotIdx + 1) : tip;
    const body = dotIdx > -1 ? tip.slice(dotIdx + 2) : '';

    doc.setFontSize(11);
    doc.setFont(SANS, 'bold');
    doc.setTextColor(...DARK);
    const titleLines = doc.splitTextToSize(title, tipTextW);
    doc.text(titleLines, tipTextX, y);
    let tipY = y + titleLines.length * 5;

    if (body.trim()) {
      doc.setFontSize(10);
      doc.setFont(SANS, 'normal');
      doc.setTextColor(70, 70, 70);
      const bodyLines = doc.splitTextToSize(body.trim(), tipTextW);
      doc.text(bodyLines, tipTextX, tipY + 2);
      tipY += bodyLines.length * 4.5 + 2;
    }

    // Red divider between tips
    if (i < content.tips.length - 1) {
      tipY += 8;
      doc.setDrawColor(...BRAND_RED);
      doc.setLineWidth(0.5);
      doc.line(LEFT, tipY, pw - RIGHT_MARGIN, tipY);
      tipY += 8;
    }

    y = tipY + 6;
  });

  addPageFooter(doc);
}

// ── Final page: Full-page CTA ────────────────────────
function drawCtaPage(doc, logo) {
  doc.addPage();
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();

  // Full dark background
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pw, ph, 'F');

  // Logo
  if (logo) doc.addImage(logo, 'PNG', LEFT, 20, 30, 15);

  // #17: Better vertical centering — content block starts at ~32%
  let y = ph * 0.32;
  doc.setFontSize(38);
  doc.setFont(SERIF, 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('What to do next?', pw / 2, y, { align: 'center' });

  y += 22;
  doc.setFontSize(11);
  doc.setFont(SANS, 'normal');
  doc.setTextColor(200, 200, 210);
  const subLines1 = doc.splitTextToSize(
    'Understanding your constraints is the first step. If you are interested in finding out how you can get clear on what is next for you and help you get there, we\u2019d love to hear from you.',
    pw * 0.6,
  );
  doc.text(subLines1, pw / 2, y, { align: 'center' });

  y += subLines1.length * 5.5 + 10;
  doc.setFontSize(11);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(200, 200, 210);
  const subLines2 = doc.splitTextToSize(
    'We only work with 10 individuals a quarter to ensure we give the depth and quality for change.',
    pw * 0.6,
  );
  doc.text(subLines2, pw / 2, y, { align: 'center' });

  // Value props centred
  y += subLines2.length * 5.5 + 20;
  const props = [
    'One-to-one coaching tailored to your results',
    'Proven frameworks used by 500+ professionals',
  ];

  props.forEach((prop) => {
    doc.setFontSize(11);
    doc.setFont(SANS, 'normal');
    doc.setTextColor(220, 220, 230);
    doc.text(prop, pw / 2, y, { align: 'center' });
    y += 10;
  });

  // #16: CTA button with clickable link
  y += 16;
  const btnW = 110;
  const btnH = 16;
  const btnX = (pw - btnW) / 2;

  doc.setFillColor(...BRAND_RED);
  doc.roundedRect(btnX, y, btnW, btnH, 8, 8, 'F');

  doc.setFontSize(12);
  doc.setFont(SANS, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Book a Free Consultation', pw / 2, y + 10.5, { align: 'center' });

  // Add clickable link annotation
  doc.link(btnX, y, btnW, btnH, { url: CALENDLY_URL });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 120);
  doc.text('FOUND  ·  foundperform.com', pw / 2, ph - 16, { align: 'center' });
  _pageNum++;
}

// ── Build PDF doc (shared by download + email) ──────
async function buildPDFDoc(userData, result) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  registerFonts(doc);
  const logo = await loadLogo();
  _pageNum = 0; // reset counter

  // Page 1: Results overview
  drawResultsPage(doc, logo, userData, result);

  // Page 2: Why is this report valuable?
  drawWhyPage(doc, logo);

  // Pages 3–12: Two pages per dimension
  Object.keys(subDims).forEach((key) => {
    drawDimensionSpread(doc, logo, key, result.subScores[key]);
  });

  // Page 13: Full-page CTA
  drawCtaPage(doc, logo);

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
  return doc.output('datauristring').split(',')[1];
}
