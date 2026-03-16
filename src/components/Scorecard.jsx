import { useState, useEffect, useRef } from 'react';
import { questions, subDims } from '../models/questions';
import { calculateScores, quadrants, getWeakestSubDim, getStrongestSubDim } from '../models/scoring';
import '../styles/scorecard.css';

function ProgressBar({ pct }) {
  return (
    <div id="pbar-wrap">
      <div id="pbar" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Nav({ logoHeight = 80 }) {
  return (
    <nav>
      <img src="/found-logo.png" alt="FOUND" style={{ height: logoHeight }} />
      <div className="nav-label">Key Performer Scorecard</div>
    </nav>
  );
}

// ── INTRO ──────────────────────────────────────────────
function IntroScreen({ onStart }) {
  const testimonials = [
    {
      name: 'Samantha M.',
      role: 'Principal',
      company: 'The Carlyle Group',
      quote: 'The use of data and science, combined with her private equity background, made this feel different. Would strongly recommend.',
      img: '/samantha.jpg',
    },
    {
      name: 'Ollie Q.',
      role: 'Senior Vice President',
      company: 'Coller Capital',
      quote: 'Working with FOUND has been highly valuable, using the cognitive assessments to bring new insights of where we need to focus, individually and as a team.',
      img: '/ollie.jpg',
    },
    {
      name: 'Thomas C.',
      role: 'Associate',
      company: 'EQT',
      quote: 'Outstanding coach. Supportive, structured, and impactful. Thank you, Emily.',
      img: '/thomas.jpg',
    },
    {
      name: 'Sven H.',
      role: 'Head of HR',
      company: 'Three Hills',
      quote: 'The experience was exceptional. The program was customized to meet our specific needs and provided practical, real-world applications that our team could implement immediately.',
      img: '/sven.jpg',
    },
  ];

  return (
    <div id="screen-intro" className="screen active">

      <div className="intro-hero">
        <p className="intro-eyebrow">Instant results · Tailored report · Personalised insights</p>
        <h1>Are you a <em>key performer</em> in your business?</h1>
        <p className="intro-sub">Whether you like it or not, you are being put in a box. Take the Key Performer Scorecard and benchmark your ability to stand out in a business context. Instant access to your results.</p>
        <button className="btn-primary" onClick={onStart}>
          Take the Assessment
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="hiw-outer">
        <div className="how-it-works">
          <div className="hiw-content">
            <h2 className="hiw-title">How it works.</h2>
            <ul className="hiw-list">
              <li>
                <span className="hiw-num">01</span>
                <div>
                  <strong>Research-Based Questions.</strong>
                  <p>Our assessment features questions derived from research on the key traits for being considered a critical talent at work.</p>
                </div>
              </li>
              <li>
                <span className="hiw-num">02</span>
                <div>
                  <strong>Detailed scores</strong>
                  <p>You will be placed in one of four quadrants: Key Performer, Specialist, Emerging, or At Risk. See which performance metrics are your strengths and weaknesses. </p>
                </div>
              </li>
              <li>
                <span className="hiw-num">03</span>
                <div>
                  <strong>Personalised Report</strong>
                  <p>Your result includes context about what it means for your career and start improving your performacne in your field.</p>
                </div>
              </li>
            </ul>
            <button className="btn-primary" onClick={onStart} style={{ marginTop: '2.5rem' }}>
              Find Out Where You Stand
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="hiw-image">
            <img src="/how-it-works.png" alt="How it works" />
          </div>
        </div>
      </div>

      <div className="social-proof">
        <h2 className="proof-heading">500+ senior professionals have worked with FOUND</h2>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <img src={t.img} alt={t.name} className="testimonial-photo" />
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
              <div className="testimonial-company">{t.company}</div>
              <div className="testimonial-quote">"{t.quote}"</div>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={onStart}>
          Take the Assessment
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

    </div>
  );
}

// ── LEAD ───────────────────────────────────────────────
function LeadScreen({ onSubmit }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', jobLevel: '', industry: '' });

  function handleSubmit() {
    if (!form.firstName || !form.email) { alert('Please enter your name and email to continue.'); return; }
    onSubmit(form);
  }

  const jobLevels = ['Analyst / Associate', 'Manager', 'Senior Manager', 'Director', 'VP / SVP', 'C-Suite / Partner', 'Founder'];
  const industries = ['Private Equity', 'Venture Capital', 'Investment Banking', 'Consulting', 'Law', 'Asset Management', 'Corporate / In-house', 'Technology', ' Marketing/Sales', 'Other'];

  return (
    <div id="screen-lead" className="screen active">
      <div className="lead-outer">
        <div className="lead-box">
          <h2>Enter your details to start</h2>
          <p>We will send your results and a personalised breakdown directly to your inbox.</p>
          <div className="field-row">
            <div className="field"><label>First Name</label><input placeholder="Alex" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
            <div className="field"><label>Last Name</label><input placeholder="Morgan" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
          </div>
          <div className="field"><label>Email</label><input type="email" placeholder="alex@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div className="field"><label>Phone Number</label><input type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
          <div className="field-row">
            <div className="field">
              <label>Job Level</label>
              <select value={form.jobLevel} onChange={e => setForm({ ...form, jobLevel: e.target.value })}>
                <option value="">Select level</option>
                {jobLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Industry</label>
              <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
                <option value="">Select industry</option>
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>
            Start the Assessment
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p className="privacy">By continuing you agree to our <a href="/privacy" target="_blank" className="privacy-link">Privacy Policy</a>. We will send your results and may follow up with relevant insights. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

// ── QUIZ ───────────────────────────────────────────────
function QuizScreen({ currentQ, onAnswer }) {
  const q = questions[currentQ];
  const pct = (currentQ / questions.length) * 100;

  return (
    <div id="screen-quiz" className="screen active">
      <ProgressBar pct={pct} />
      <div className="quiz-header">
        <img src="/found-logo.png" alt="FOUND" style={{ height: 64 }} />
        <div className="q-meta">
          Question <span>{currentQ + 1}</span> of {questions.length}
        </div>
      </div>
      <div className="quiz-body">
        <div className="question-card">
          <div className="q-dim-label">{subDims[q.dim].name}</div>
          <div className="q-text">{q.text}</div>
          <div className="q-answers">
            <button className="q-btn yes" onClick={() => onAnswer(true)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Yes
            </button>
            <button className="q-btn no" onClick={() => onAnswer(false)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2×2 QUADRANT GRID ──────────────────────────────────
function QuadrantGrid({ quadrant }) {
  const cells = [
    { id: 'emerging',      label: 'Emerging',     color: '#8b5cf6' },
    { id: 'key-performer', label: 'Key Performer', color: '#16a34a' },
    { id: 'at-risk',       label: 'At Risk',       color: '#ff2846' },
    { id: 'specialist',    label: 'Specialist',    color: '#2563eb' },
  ];

  return (
    <div className="quadrant-wrap">
      <div className="quadrant-main">
        <div className="quadrant-y-axis">
          <span className="quadrant-y-high">High</span>
          <span className="quadrant-y-label">Potential</span>
          <span className="quadrant-y-low">Low</span>
        </div>
        <div className="quadrant-right">
          <div className="quadrant-grid">
            {cells.map(cell => {
              const isActive = cell.id === quadrant;
              return (
                <div
                  key={cell.id}
                  className="quadrant-cell"
                  style={isActive ? {
                    background: '#fff',
                    border: `2px solid ${cell.color}`,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.12)`,
                  } : {}}
                >
                  <div className="quadrant-cell-label" style={isActive ? { color: cell.color } : {}}>
                    {cell.label}
                  </div>
                  {isActive && (
                    <div className="quadrant-you">
                      <div className="quadrant-you-dot" style={{ background: cell.color }} />
                      <span style={{ color: cell.color, fontWeight: 700, fontSize: '.78rem' }}>You</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="quadrant-x-axis">
            <span className="quadrant-x-low">Low</span>
            <span className="quadrant-x-label">Performance</span>
            <span className="quadrant-x-high">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SUB-DIMENSION CARD ─────────────────────────────────
function SubDimCard({ dimKey, score, isWeakest, isStrongest }) {
  const d = subDims[dimKey];
  const barRef = useRef(null);
  const color = isWeakest ? '#ff2846' : isStrongest ? '#16a34a' : '#1a1a1a';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
        barRef.current.style.width = `${score}%`;
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="subdim-card">
      <div className="subdim-card-header">
        <div className="subdim-card-name" style={{ color }}>{d.name}</div>
        {isWeakest   && <span className="subdim-tag subdim-tag-weak">Biggest opportunity</span>}
        {isStrongest && <span className="subdim-tag subdim-tag-strong">Strongest signal</span>}
      </div>
      <div className="subdim-card-desc">{d.desc}</div>
      <div className="subdim-bar-wrap">
        <div ref={barRef} className="subdim-bar" style={{ width: 0, background: color }} />
      </div>
      <div className="subdim-card-score" style={{ color }}>Score {score}%</div>
    </div>
  );
}

// ── RESULTS ────────────────────────────────────────────
function ResultsScreen({ userData, result }) {
  const { quadrant, performancePct, potentialPct, subScores } = result;
  const q = quadrants[quadrant];
  const weakest   = getWeakestSubDim(subScores);
  const strongest = getStrongestSubDim(subScores);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText('https://found.pro/key-performer').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const name = userData.firstName ? `, ${userData.firstName}` : '';

  return (
    <div id="screen-results" className="screen active">
      <ProgressBar pct={100} />
      <Nav logoHeight={64} />

      {/* ── 1. QUADRANT REVEAL ── */}
      <div className="results-hero">
        <div className="results-hero-inner">
          <div className="results-hero-left">
            <div className="results-eyebrow">Your Result</div>
            <h2 className="results-quadrant-name" style={{ color: q.color }}>{q.label}</h2>
            {name && <p className="results-thanks-sub">Here is your breakdown{name}.</p>}
            <p className="results-explainer-text">{q.summary}</p>
            <div className="results-axis-scores">
              <div className="axis-score-item">
                <div className="axis-score-label">Performance</div>
                <div className="axis-score-value" style={{ color: '#2563eb' }}>{performancePct}%</div>
              </div>
              <div className="axis-score-divider" />
              <div className="axis-score-item">
                <div className="axis-score-label">Potential</div>
                <div className="axis-score-value" style={{ color: '#8b5cf6' }}>{potentialPct}%</div>
              </div>
            </div>
          </div>
          <div className="results-hero-right">
            <QuadrantGrid quadrant={quadrant} />
          </div>
        </div>
      </div>

      {/* ── 2. FIVE DIMENSIONS ── */}
      <div className="results-body">
        <div className="results-section-label">Your Five Dimensions</div>
        <div className="subdim-grid">
          {Object.keys(subDims).map(key => (
            <SubDimCard
              key={key}
              dimKey={key}
              score={subScores[key]}
              isWeakest={key === weakest}
              isStrongest={key === strongest}
            />
          ))}
        </div>
      </div>

     {/* ── 3. WHAT NOW ── */}
<div className="what-now">
  <div className="what-now-inner">
    <div className="what-now-eyebrow">What now?</div>

    <h2 className="what-now-headline">
      Becoming a key performer at work often means changing established habits, which is hard without the right system to help.
    </h2>

    <p className="what-now-copy">
      Which is why we created the Key Performer Programme. Join the waitlist to get early access to the next cohort.
    </p>

    <a className="btn-cta" href="https://found.pro/waitlist">
      Join Waitlist for Early Access
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  </div>
</div>

      <div className="results-footnote">FOUND · foundperform.com · Key Performer Scorecard</div>
    </div>
  );
}

// ── APP ────────────────────────────────────────────────
export default function Scorecard() {
  const [screen, setScreen]     = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState({
    perspective: [], pace: [], profile: [], performance: [], progress: [],
  });
  const [userData, setUserData] = useState({});
  const [result, setResult]     = useState(null);

  function handleStart() { setScreen('lead'); }

  function handleLeadSubmit(form) {
    setUserData(form);
    setCurrentQ(0);
    setAnswers({ perspective: [], pace: [], profile: [], performance: [], progress: [] });
    setScreen('quiz');
  }

  function handleAnswer(val) {
  const q = questions[currentQ];
  const next = currentQ + 1;

  const newAnswers = {
    ...answers,
    [q.dim]: [...(answers[q.dim] || []), val ? 1 : 0],
  };

  setAnswers(newAnswers);

  if (next >= questions.length) {
    const finalResult = calculateScores(newAnswers);

    setResult(finalResult);
    setScreen("results");

    fetch("/api/send-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userData,
        result: finalResult
      })
    }).catch((err) => {
      console.error("Failed to send report email:", err);
    });

  } else {
    setCurrentQ(next);
  }
}

  return (
    <>
      {screen === 'intro'   && (<><Nav /><IntroScreen onStart={handleStart} /></>)}
      {screen === 'lead'    && (<><Nav /><LeadScreen onSubmit={handleLeadSubmit} /></>)}
      {screen === 'quiz'    && <QuizScreen currentQ={currentQ} onAnswer={handleAnswer} />}
      {screen === 'results' && result && <ResultsScreen userData={userData} result={result} />}
    </>
  );
}
