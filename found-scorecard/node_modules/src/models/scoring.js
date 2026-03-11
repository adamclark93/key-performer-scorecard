export function getTier(s) {
  if (s >= 80) return { label: 'High Performer', cls: 'tier-high' };
  if (s >= 60) return { label: 'Strong',         cls: 'tier-strong' };
  if (s >= 40) return { label: 'Developing',     cls: 'tier-developing' };
  return               { label: 'At Risk',        cls: 'tier-low' };
}

export function getDimTier(s) {
  if (s >= 75) return { label: 'High Strength',   color: '#16a34a' };
  if (s >= 50) return { label: 'Average to High', color: '#2563eb' };
  if (s >= 25) return { label: 'Low to Average',  color: '#d97706' };
  return               { label: 'Needs Attention', color: '#ff2846' };
}

export function calculateScores(answers, dims) {
  const scores = {};
  let total = 0, count = 0;
  Object.keys(dims).forEach(d => {
    const arr = answers[d] || [];
    const s = arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) : 0;
    scores[d] = s;
    total += s;
    count++;
  });
  const overall = Math.round(total / count);
  return { scores, overall };
}

export function getTensionCopy(overall, scores, dims) {
  const lowestDim = Object.keys(scores).sort((a, b) => scores[a] - scores[b])[0];
  const lowestName = dims[lowestDim].name;
  let line, sub;
  if (overall >= 80) {
    line = "You're performing well — but there's a ceiling you haven't hit yet.";
    sub  = `Your ${lowestName} score suggests where your next level of performance is waiting. The gap between good and exceptional is smaller than you think — and more specific.`;
  } else if (overall >= 60) {
    line = "You have real capability. It's not being fully expressed.";
    sub  = `Your ${lowestName} score is where performance is being left on the table. This is fixable — and faster than most people expect when they know exactly what to address.`;
  } else if (overall >= 40) {
    line = "Something is getting in the way of what you're actually capable of.";
    sub  = `Your ${lowestName} score points to the most likely culprit. The good news: this is a performance problem, not a talent problem. It has a solution.`;
  } else {
    line = "Your performance isn't reflecting your potential right now.";
    sub  = `Your ${lowestName} score is the place to start. Something structural is limiting your output — and it won't fix itself without attention.`;
  }
  return { line, sub };
}
