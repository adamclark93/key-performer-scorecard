import { saveLead } from '../lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { questions, subDims } from '../models/questions';
import { calculateScores, quadrants, getDimRating, getWeakestSubDim, getStrongestSubDim } from '../models/scoring';
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
                  <strong>Research Based Questions</strong>
                  <p>25 behaviourally anchored yes/no questions measure your Performance and Potential - the two dimensions that determine how likely you are to be a Key Performer.</p>
                </div>
              </li>
              <li>
                <span className="hiw-num">02</span>
                <div>
                  <strong>Detailed Performance Scores</strong>
                  <p>You will be placed in one of four quadrants: Key Performer, Workhorse, Emerging, or At Risk. Each comes with a breakdown across five dimensions.</p>
                </div>
              </li>
              <li>
                <span className="hiw-num">03</span>
                <div>
                  <strong>Personalised Report</strong>
                  <p>Your result includes context about what it means for your career and recommendations for what to do next.</p>
                </div>
              </li>
            </ul>
            <button className="btn-primary" onClick={onStart} style={{ marginTop: '2.5rem' }}>
             Discover Your Performance Score
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="hiw-image" style={{ background: '#fff', borderRadius: '8px', padding: '2rem' }}>
            <img src="/how-it-works.png" alt="How it works" />
          </div>
        </div>
      </div>

      <div className="social-proof">
        <h2 className="proof-heading">500+ professionals have worked with FOUND</h2>
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
  const [errors, setErrors] = useState({});

  function handleSubmit() {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = true;
    if (!form.email) newErrors.email = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit(form);
  }

  const jobLevels = ['Analyst / Associate', 'Manager', 'Senior Manager', 'Director', 'VP / SVP', 'C-Suite / Partner', 'Founder'];
  const industries = ['Private Equity', 'Venture Capital', 'Investment Banking', 'Consulting', 'Law', 'Asset Management', 'Corporate / In-house', 'Technology', 'Other'];

  return (
    <div id="screen-lead" className="screen active">
      <div className="lead-outer">
        <div className="lead-box">
          <h2>Enter your details to start</h2>
          <p>We will send your results and a personalised breakdown directly to your inbox.</p>
          <div className="field-row">
            <div className="field">
              <label>First Name</label>
              <input
                placeholder="Alex"
                value={form.firstName}
                onChange={e => { setForm({ ...form, firstName: e.target.value }); setErrors(err => ({ ...err, firstName: false })); }}
                style={errors.firstName ? { borderColor: '#ff2846' } : {}}
              />
              {errors.firstName && <div style={{ color: '#ff2846', fontSize: '.72rem', marginTop: '.3rem' }}>Please enter your first name</div>}
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                placeholder="Morgan"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="alex@company.com"
              value={form.email}
              onChange={e => { setForm({ ...form, email: e.target.value }); setErrors(err => ({ ...err, email: false })); }}
              style={errors.email ? { borderColor: '#ff2846' } : {}}
            />
            {errors.email && <div style={{ color: '#ff2846', fontSize: '.72rem', marginTop: '.3rem' }}>Please enter your email address</div>}
          </div>
          <div className="field">
            <label>Phone Number <span style={{ color: 'rgba(26,26,26,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <input
              type="tel"
              placeholder="+44 7700 000000"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
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
  const pct = Math.round(((currentQ) / questions.length) * 100);

  return (
    <div id="screen-quiz" className="screen active">
      <ProgressBar pct={pct} />
      <Nav />
      <div className="quiz-outer">
        <div className="quiz-inner">
          <div className="quiz-counter">{currentQ + 1} / {questions.length}</div>
          <div className="quiz-question">{q.text}</div>
          <div className="quiz-buttons">
            <button className="btn-yes" onClick={() => onAnswer(true)}>Yes</button>
            <button className="btn-no"  onClick={() => onAnswer(false)}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── QUADRANT GRID ──────────────────────────────────────
function QuadrantGrid({ quadrant }) {
  const cells = [
    { key: 'emerging',      label: 'Emerging',      col: 1, row: 1 },
    { key: 'key-performer', label: 'Key Performer',  col: 2, row: 1 },
    { key: 'at-risk',       label: 'At Risk',        col: 1, row: 2 },
    { key: 'specialist',    label: 'Workhorse',      col: 2, row: 2 },
  ];

  return (
    <div className="quadrant-wrap">
      <div className="quadrant-y-label">Potential</div>
      <div className="quadrant-grid-area">
        <div className="quadrant-grid">
          {cells.map(c => (
            <div
              key={c.key}
              className={`quadrant-cell ${c.key === quadrant ? 'active' : ''}`}
style={{ gridColumn: c.col, gridRow: c.row, ...(c.key === quadrant ? { '--active-color': quadrants[quadrant]?.color } : {}) }}
            >
              <span className="quadrant-cell-label">{c.label}</span>
              {c.key === quadrant && <span className="quadrant-dot">● You</span>}
            </div>
          ))}
        </div>
        <div className="quadrant-x-axis">
          <span className="quadrant-x-low">Low</span>
          <span className="quadrant-x-label">Performance</span>
          <span className="quadrant-x-high">High</span>
        </div>
      </div>
    </div>
  );
}

/// ── SUB-DIMENSION CARD ─────────────────────────────────
function SubDimCard({ dimKey, score }) {
  const d = subDims[dimKey];
  const barRef = useRef(null);
  const rating = getDimRating(score);

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
      <div className="subdim-card-name">{d.name}</div>
      <div className="subdim-card-desc">{d.desc}</div>
      <div className="subdim-bar-wrap">
        <div ref={barRef} className="subdim-bar" style={{ width: 0, background: rating.color }} />
      </div>
      <div className="subdim-card-score-row">
        <div className="subdim-card-score" style={{ color: rating.color }}>Score {rating.score}/5</div>
        <div className="subdim-card-rating" style={{ color: rating.color }}>{rating.label}</div>
      </div>
    </div>
  );
}

// ── RESULTS ────────────────────────────────────────────
function ResultsScreen({ userData, result }) {
  const { quadrant, overallPct, subScores } = result;
  const q = quadrants[quadrant];

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
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ fontSize: '.82rem', color: 'rgba(26,26,26,0.5)', marginBottom: '.8rem' }}>
                We have scored your answers across five dimensions giving you a score out of 5.
              </p>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#ff2846' }} />Low Strength</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#d97706' }} />Average Strength</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#16a34a' }} />High Strength</span>
              </div>
            </div>
          </div>
          <div className="results-hero-right">
            <QuadrantGrid quadrant={quadrant} />
            <div style={{ textAlign: 'center', marginTop: '1.5rem', width: '100%' }}>
              <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', marginBottom: '.4rem' }}>Your Overall Score</div>
              <div style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-.02em', color: q.color, lineHeight: 1 }}>{overallPct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. FIVE DIMENSIONS ── */}
      <div className="results-body">
        <div className="results-section-label">Your Five Dimensions</div>
        <div className="subdim-grid">
          {Object.keys(subDims).map(key => (
            <SubDimCard
              key={key}
              dimKey={key}
              score={subScores[key]}
            />
          ))}
        </div>
      </div>

      {/* ── 4. WHAT NOW ── */}
      <div className="what-now">
        <div className="what-now-inner">
          <div className="what-now-eyebrow">What Now?</div>
          <h2 className="what-now-headline">Understanding your constraints is the first step to becoming a Key Performer.</h2>
          <p className="what-now-sub">Being good is no longer enough to stand out. You now have a clearer picture of what might be holding you back but taking action is what matters.</p>
          <a className="btn-cta" href="https://calendly.com/found-performance/keyperformer">
            Discover How You Can Improve
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
      setScreen('results');
      saveLead(userData, finalResult, newAnswers);
      fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData, result: finalResult }),
      }).catch((err) => {
        console.error('Failed to send report email:', err);
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
