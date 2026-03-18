export const subDims = {
  perspective: { name: 'Perspective', axis: 'potential',   desc: 'How clearly you understand where you create value and how you allocate effort.' },
  pace:        { name: 'Pace',        axis: 'potential',   desc: 'The energy and intrinsic motivation you bring to your work.' },
  profile:     { name: 'Profile',     axis: 'performance', desc: 'How visible and trusted you are inside your organisation.' },
  performance: { name: 'Performance', axis: 'performance', desc: 'Whether you actually move outcomes and drive results.' },
  progress:    { name: 'Progress',    axis: 'performance', desc: 'Career momentum and how the organisation recognises your contribution.' },
};

export const questions = [
  // ── Opening Reflection ──
  { dim: 'perspective', text: 'Do you feel like you are overlooked despite having a lot of value to offer?' },

  // ── Role & Career Context ──
  { dim: 'progress',    text: 'Do you manage a team of three or more people?' },
  { dim: 'progress',    text: 'Have you been promoted in the last two years?' },
  { dim: 'progress',    text: 'Has your responsibility grown beyond your original job description?' },
  { dim: 'performance', text: 'Are you responsible for outcomes that materially affect the business?' },

  // ── Reputation & Visibility ──
  { dim: 'profile',     text: 'Do senior leaders know who you are and what you do?' },
  { dim: 'profile',     text: 'Are you known in your business for a specific expertise?' },
  { dim: 'profile',     text: 'Do senior leaders ask for your opinion before making decisions?' },
  { dim: 'profile',     text: 'Do people outside your team come to you for advice or mentorship?' },
  { dim: 'profile',     text: 'Have you built relationships with leaders outside your direct team?' },

  // ── Career Momentum ──
  { dim: 'progress',    text: 'Has your manager described you as a top performer?' },
  { dim: 'progress',    text: 'Do you believe you are on track for promotion in the next 12 months?' },

  // ── Organisational Impact ──
  { dim: 'performance', text: 'Would a project noticeably slow down if you stepped away for a week?' },
  { dim: 'performance', text: 'Do others depend on your judgement to move work forward?' },
  { dim: 'performance', text: 'Do leaders rely on you to solve difficult problems?' },
  { dim: 'performance', text: 'Do people listen when you speak in important meetings?' },

  // ── Performance Reality ──
  { dim: 'perspective', text: 'My output last month reflected what I am genuinely capable of.' },
  { dim: 'perspective', text: 'I am performing closer to my ceiling than my floor right now.' },
  { dim: 'perspective', text: 'I finish most days having completed the one task that mattered most.' },

  // ── Headroom & Recognition ──
  { dim: 'pace',        text: 'Do you feel capable of more than your current role allows you to show?' },
  { dim: 'pace',        text: 'Do you feel ready to operate at the next level today?' },
  { dim: 'pace',        text: 'Do you feel your work is recognised by the right people?' },
  { dim: 'pace',        text: 'Could you maintain your current workload for the next 3 months?' },

  // ── Replaceability ──
  { dim: 'performance', text: 'Could someone step into your role tomorrow without disruption?', invert: true },

  // ── Intrinsic Motivation ──
  { dim: 'pace',        text: 'I chose this career. If the money were equal I would still pick this over something easier.' },
];
