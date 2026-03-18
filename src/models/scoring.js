import { questions, subDims } from './questions';

// ── QUADRANT DEFINITIONS ───────────────────────────────
// Performance axis (x): Profile + Performance + Progress
// Potential axis   (y): Perspective + Pace
// Threshold: 50% on each axis

export const quadrants = {
  'key-performer': {
    label: 'Key Performer',
    color: '#16a34a',
    summary: 'Operating at the level organisations compete to keep. You are visible, impactful, and moving forward. The risk is not capability - it is being stretched in the wrong direction.',
    cta: {
      label: 'Stay sharp. See how the best stay ahead.',
      button: 'Explore FOUND Pro',
      href: '#',
    },
  },
  specialist: {
    label: 'Workhorse',
    color: '#2563eb',
    summary: 'Your current performance is real, but you are optimising within a lane. Strong delivery without the profile or momentum to match will become a ceiling.',
    cta: {
      label: 'You are delivering. Now it is time to break through.',
      button: 'Join the Key Performer Programme',
      href: '#',
    },
  },
  emerging: {
    label: 'Emerging',
    color: '#8b5cf6',
    summary: 'Your instincts and ambition are strong but your track record and visibility inside the organisation are lagging. The potential is clear. The evidence is not yet.',
    cta: {
      label: 'You have the drive. Now build the track record.',
      button: 'Join the Key Performer Programme',
      href: '#',
    },
  },
  'at-risk': {
    label: 'At Risk',
    color: '#ff2846',
    summary: 'Something is getting in the way. High performers end up here too - usually when the role, the environment, or the recognition has not kept pace with the person.',
    cta: {
      label: 'Something is getting in the way. Let us find out what.',
      button: 'Book a Free Discovery Call with Emily',
      href: '#',
    },
  },
};

// ── DIM RATING ─────────────────────────────────────────
// Converts a dimension % score to a score out of 5 + strength label
// 5     = High Strength
// 3–4   = Average Strength
// 1–2   = Low Strength

export function getDimRating(pct) {
  const score = Math.max(1, Math.round((pct / 100) * 5));
  if (score === 5) return { score, label: 'High Strength',    color: '#16a34a' };
  if (score >= 3)  return { score, label: 'Average Strength', color: '#d97706' };
  return                  { score, label: 'Low Strength',     color: '#ff2846' };
}

// ── SCORING ────────────────────────────────────────────
// Count yes answers per dimension, convert to % of max possible.
// Max per dim = number of questions in that dim.

export function calculateScores(answers) {
  const subScores = {};
  for (const dim of Object.keys(subDims)) {
    const dimQuestions = questions.filter(q => q.dim === dim);
    const raw = (answers[dim] || []).reduce((sum, val, i) => {
      return sum + (dimQuestions[i]?.invert ? (val === 1 ? 0 : 1) : val);
    }, 0);
    const max = dimQuestions.length;
    subScores[dim] = max > 0 ? Math.round((raw / max) * 100) : 0;
  }

  // Performance axis = average of Profile, Performance, Progress
  const performancePct = Math.round(
    (subScores.profile + subScores.performance + subScores.progress) / 3
  );

  // Potential axis = average of Perspective, Pace
  const potentialPct = Math.round(
    (subScores.perspective + subScores.pace) / 2
  );

  // Overall % = average of all 5 dimension scores
  const overallPct = Math.round(
    Object.values(subScores).reduce((a, b) => a + b, 0) / Object.values(subScores).length
  );

  // Quadrant placement (threshold 50%)
  const highPerf = performancePct >= 50;
  const highPot  = potentialPct  >= 50;

  let quadrant;
  if      ( highPerf &&  highPot) quadrant = 'key-performer';
  else if (!highPerf &&  highPot) quadrant = 'emerging';
  else if ( highPerf && !highPot) quadrant = 'specialist';
  else                            quadrant = 'at-risk';

  return { quadrant, performancePct, potentialPct, overallPct, subScores };
}

// ── HELPERS ────────────────────────────────────────────
export function getWeakestSubDim(subScores) {
  return Object.entries(subScores).reduce((a, b) => b[1] < a[1] ? b : a)[0];
}

export function getStrongestSubDim(subScores) {
  return Object.entries(subScores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
}
