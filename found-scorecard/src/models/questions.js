export const questions = [
  // Q0 — routing
  {
    layer: 'About You',
    category: 'One quick question first',
    text: 'I manage a team of three or more people.',
    routing: true
  },
  // MENTAL PERFORMANCE
  { layer: 'Ability', category: 'Mental Performance', dim: 'cognitive', text: 'I block at least 90 minutes of uninterrupted focus work into my diary at least once a week.' },
  { layer: 'Ability', category: 'Mental Performance', dim: 'cognitive', text: 'I prepare a clear agenda or objective before every important meeting I lead.' },
  { layer: 'Ability', category: 'Mental Performance', dim: 'cognitive', text: 'I finish most days having completed the one task that mattered most.' },
  { layer: 'Ability', category: 'Mental Performance', dim: 'cognitive', text: 'I review my priorities at the start of each week rather than reacting to whatever arrives first.' },
  // EMOTIONAL INTELLIGENCE
  { layer: 'Ability', category: 'Emotional Intelligence', dim: 'emotional', text: "I have had at least one honest, direct conversation this week that I didn't avoid or delay." },
  { layer: 'Ability', category: 'Emotional Intelligence', dim: 'emotional', text: 'I have given someone specific, useful feedback in the last two weeks.' },
  { layer: 'Ability', category: 'Emotional Intelligence', dim: 'emotional', text: 'I check in with at least one person on my team or in my network each week — not about work.' },
  { layer: 'Ability', category: 'Emotional Intelligence', dim: 'emotional', text: 'After a tense meeting or call I take time to understand what happened before I respond.' },
  // ENERGY MANAGEMENT
  { layer: 'Capacity', category: 'Energy Management', dim: 'physiology', text: 'I averaged seven or more hours of sleep over the last seven days.' },
  { layer: 'Capacity', category: 'Energy Management', dim: 'physiology', text: 'I exercised intentionally at least three times in the last seven days.' },
  { layer: 'Capacity', category: 'Energy Management', dim: 'physiology', text: "I eat a proper meal at lunchtime at least four days a week — not at my desk, not skipped." },
  { layer: 'Capacity', category: 'Energy Management', dim: 'physiology', text: 'My energy levels on a Friday afternoon are broadly the same as Monday morning.' },
  // RESILIENCE
  { layer: 'Capacity', category: 'Resilience', dim: 'resilience', text: "I took at least one full day off in the last month where I didn't check messages." },
  { layer: 'Capacity', category: 'Resilience', dim: 'resilience', text: 'I have a regular practice — exercise, meditation, time in nature — that helps me reset.' },
  { layer: 'Capacity', category: 'Resilience', dim: 'resilience', text: 'I have at least two people outside of work I can speak openly with when things are hard.' },
  { layer: 'Capacity', category: 'Resilience', dim: 'resilience', text: 'When I make a mistake I process it and move on within 24 hours rather than carrying it.' },
  // ENGAGEMENT
  { layer: 'Execution', category: 'Engagement', dim: 'engagement', text: "The work I spend most of my time on aligns with what I'm actually best at." },
  { layer: 'Execution', category: 'Engagement', dim: 'engagement', text: "I chose this career — if the money were equal I'd still pick this over something easier." },
  { layer: 'Execution', category: 'Engagement', dim: 'engagement', text: 'I have made at least one proactive change to how I work in the last month.' },
  { layer: 'Execution', category: 'Engagement', dim: 'engagement', text: 'I look forward to at least four out of five working days.' },
  // EXECUTIONAL
  { layer: 'Execution', category: 'Executional', dim: 'appraisal', text: "My output last month reflected what I'm genuinely capable of." },
  { layer: 'Execution', category: 'Executional', dim: 'appraisal', text: "I currently have enough headspace to think strategically, not just react to what's in front of me." },
  { layer: 'Execution', category: 'Executional', dim: 'appraisal', text: "The volume of work I'm carrying right now is sustainable for the next six months." },
  { layer: 'Execution', category: 'Executional', dim: 'appraisal', text: 'I am performing closer to my ceiling than my floor right now.' },
];

export const dims = {
  cognitive:  { name: 'Mental Performance',    desc: 'Focus, clarity and the habits that protect your best thinking',     layer: 'Ability' },
  emotional:  { name: 'Emotional Intelligence', desc: 'Reading rooms, managing relationships under pressure',              layer: 'Ability' },
  physiology: { name: 'Energy Management',      desc: 'Sleep, movement and fuel for sustained performance',               layer: 'Capacity' },
  resilience: { name: 'Resilience',             desc: 'Recovery, perspective and psychological flexibility',              layer: 'Capacity' },
  engagement: { name: 'Engagement',             desc: 'Motivation, initiative and alignment with your work',              layer: 'Execution' },
  appraisal:  { name: 'Executional',            desc: 'Quality, headspace and sustainability of your current output',     layer: 'Execution' },
};