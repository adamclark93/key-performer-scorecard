export const subDims = {
  perspective: { name: 'Perspective', axis: 'potential',   desc: 'How clearly you understand where you create value and how you allocate effort.' },
  pace:        { name: 'Pace',        axis: 'potential',   desc: 'The energy and intrinsic motivation you bring to your work.' },
  profile:     { name: 'Profile',     axis: 'performance', desc: 'How visible and trusted you are inside your organisation.' },
  performance: { name: 'Performance', axis: 'performance', desc: 'Whether you actually move outcomes and drive results.' },
  progress:    { name: 'Progress',    axis: 'performance', desc: 'Career momentum and how the organisation recognises your contribution.' },
};

export const questions = [
  // ── Performance ──
  { dim: 'performance', text: 'Are you responsible for outcomes that materially affect the business?' },
  { dim: 'performance', text: 'Do leaders rely on you to solve difficult problems?' },
  { dim: 'performance', text: 'Do people listen when you speak in important meetings?' },
  { dim: 'performance', text: 'Could someone step into your role tomorrow without disruption?', invert: true },
  { dim: 'performance', text: 'Does the quality and speed of your work hold up when the stakes are highest?' },

  // ── Progress ──
  { dim: 'progress',    text: 'Do you manage a team of three or more people?' },
  { dim: 'progress',    text: 'Have you been promoted in the last two years?' },
  { dim: 'progress',    text: 'Has your responsibility grown beyond your original job description?' },
  { dim: 'progress',    text: 'Has your manager described you as a top performer in the last 12 months?' },
  { dim: 'progress',    text: 'Do you believe you are on track for promotion in the next 12 months?' },

  // ── Profile ──
  { dim: 'profile',     text: 'Do the most influential leaders in your organisation know who you are and what you do?' },
  { dim: 'profile',     text: 'Are you known in your business for a specific expertise?' },
  { dim: 'profile',     text: 'Do people outside your team come to you for advice or mentorship?' },
  { dim: 'profile',     text: 'Do you proactively invest time in relationships with senior leaders outside your direct reporting line?' },
  { dim: 'profile',     text: 'Are you well known in your market outside your own firm?' },

  // ── Pace ──
  { dim: 'pace',        text: 'Do you feel capable of more than your current role allows?' },
  { dim: 'pace',        text: 'Have you told your manager you are ready for greater responsibility in the last six months?' },
  { dim: 'pace',        text: 'Could you maintain your current workload for the next 3 months?' },
  { dim: 'pace',        text: 'I chose this career. If the money were equal I would still pick this over something easier.' },
  { dim: 'pace',        text: 'Are you currently leading a project that falls outside your day to day work?' },

  // ── Perspective ──
  { dim: 'perspective', text: 'My output last month reflected what I am genuinely capable of.' },
  { dim: 'perspective', text: 'I am performing closer to my ceiling than my floor right now.' },
  { dim: 'perspective', text: 'I finish most days having completed the one task that mattered most.' },
  { dim: 'perspective', text: 'Do you feel overlooked despite having a lot of value to offer?', invert: true },
  { dim: 'perspective', text: 'Do you feel your work is recognised by the right people?' },
];
