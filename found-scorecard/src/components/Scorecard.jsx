import { useState, useEffect, useRef } from 'react';
import { questions, dims } from '../models/questions';
import { getTier, getDimTier, calculateScores, getTensionCopy } from '../models/scoring';
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
      <div className="nav-label">Performance Scorecard</div>
    </nav>
  );
}

function IntroScreen({ onStart }) {
  const testimonials = [
    {
      name: 'Samantha M.',
      role: 'Principal',
      company: 'AlpInvest Carlyle',
      quote: 'The use of data and science, combined with her private equity background, made this feel different. Would strongly recommend!',
      img: '/samantha.jpg',
    },
    {
      name: 'Ollie Q.',
      role: 'Senior Vice President',
      company: 'Coller Capital',
      quote: 'Working with FOUND has been highly valuable, using the cognitive assessments to bring new insights of where we need to focus, individually and as a team. The coaching then gave us a structured process and practical ways to raise the bar.',
      img: '/ollie.jpg',
    },
    {
      name: 'Thomas C.',
      role: 'Associate',
      company: 'EQT',
      quote: 'Outstanding coach — supportive, structured, and impactful. Thank you, Emily!',
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
    <div id="screen-intro" className="screen active" style={{ textAlign: 'center' }}>
      <div className="intro-hero">
        <p className="intro-benefit-line">Instant results · Tailored report · Personalised insights</p>
        <h1>How well are you <em>actually</em> performing?</h1>
        <p className="intro-sub">Take the Performance Scorecard and benchmark your ability to perform in your industry. Instant access to your results.</p>
        <button className="btn-primary" onClick={onStart} style={{ marginTop: '1.5rem' }}>
          Discover Performance Score
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      <div className="hiw-outer">
        <div className="how-it-works">
          <div className="hiw-content">
            <h2 className="hiw-title">How it works.</h2>
            <ul className="hiw-list">
              <li><span className="hiw-arrow">→</span><div><strong>Research-Based Questions</strong><p>25 yes/no statements across 6 performance dimensions — built on validated cognitive and behavioural science.</p></div></li>
              <li><span className="hiw-arrow">→</span><div><strong>Detailed Performance Scores</strong><p>Receive an overall performance score across key indicators; Mental Performance, Emotional Intelligence, Energy Management, Resilience, Engagement, and Executional.</p></div></li>
              <li><span className="hiw-arrow">→</span><div><strong>Personalised Insight</strong><p>Your results pinpoint exactly where performance is being left on the table — and what to address first.</p></div></li>
            </ul>
            <button className="btn-primary" onClick={onStart} style={{ marginTop: '2.5rem' }}>
              Get Your Performance Score Now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="hiw-image">
            <img src="/how-it-works.png" alt="How it works" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
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
        <div style={{ marginTop: '3rem' }}>
          <button className="btn-primary" onClick={onStart}>
            Discover Performance Score
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadScreen({ onSubmit }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  function handleSubmit() {
    if (!form.firstName || !form.email) { alert('Please enter your name and email to continue.'); return; }
    onSubmit(form);
  }

  return (
    <div id="screen-lead" className="screen active">
      <div className="lead-outer">
        <div className="lead-box">
          <h2>Enter your details to start the scorecard</h2>
          <p>We'll send your results and personalised insights directly to your inbox.</p>
          <div className="field-row">
            <div className="field"><label>First Name</label><input placeholder="Alex" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} /></div>
            <div className="field"><label>Last Name</label><input placeholder="Morgan" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} /></div>
          </div>
          <div className="field"><label>Work Email</label><input type="email" placeholder="alex@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div className="field"><label>Phone Number</label><input type="tel" placeholder="+44 7700 000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
          <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', justifyContent: 'center', marginTop: '.5rem' }}>Discover Your Score Now →</button>
          <p className="privacy">By continuing you agree to our <a href="/privacy" target="_blank" className="privacy-link">Privacy Policy</a>. We'll send your results and may follow up with relevant insights. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ currentQ, onAnswer }) {
  const q = questions[currentQ];
  const pct = (currentQ / questions.length) * 100;
  return (
    <div id="screen-quiz" className="screen active">
      <ProgressBar pct={pct} />
      <div className="quiz-header">
        <img src="/found-logo.png" alt="FOUND" style={{ height: 64 }} />
        <div className="q-meta">Question <span>{currentQ + 1}</span> of {questions.length}</div>
      </div>
      <div className="quiz-body">
        <div className="question-card">
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

function DimCard({ dimKey, score, isLowest }) {
  const d = dims[dimKey];
  const t = getDimTier(score);
  const barRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
        barRef.current.style.width = `${score}%`;
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className={`dim-card ${isLowest ? 'dim-card-focus' : ''}`} style={{ borderLeftColor: t.color }}>
      <div className="dim-card-top">
        <div className="dim-name">{d.name}</div>
        <div className="dim-score-num" style={{ color: t.color }}>{score}%</div>
      </div>
      <div className="dim-desc">{d.desc}</div>
      <div className="dim-bar-wrap">
        <div ref={barRef} className="dim-bar" style={{ width: 0, background: t.color }} />
      </div>
      <div className="dim-footer">
        <span className="dim-label" style={{ color: t.color }}>{t.label}</span>
        {isLowest && <span className="dim-focus-tag">Focus here first</span>}
      </div>
    </div>
  );
}

function Donut({ overall }) {
  const r = 126;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circ - (circ * overall / 100));
      const start = performance.now();
      const duration = 1500;
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(ease * overall));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, 300);
    return () => clearTimeout(timer);
  }, [overall]);

  const size = 280;
  const cx = size / 2;

  return (
    <div className="donut-wrap">
      <svg className="donut-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle className="donut-bg" cx={cx} cy={cx} r={r} strokeWidth="10" />
        <circle className="donut-fill" cx={cx} cy={cx} r={r} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)' }} />
      </svg>
      <div className="donut-center">
        <div className="donut-pct">{display}%</div>
        <div className="donut-lbl">Overall</div>
      </div>
    </div>
  );
}

function ResultsScreen({ userData, scores, overall, isTeamLead, onRetake }) {
  const tier = getTier(overall);
  const { line, sub } = getTensionCopy(overall, scores, dims);
  const [copied, setCopied] = useState(false);

  const lowestDim = Object.keys(scores).sort((a, b) => scores[a] - scores[b])[0];

  function handleCopy() {
    navigator.clipboard.writeText('https://found.pro/scorecard').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const dimGroups = [
    { label: 'Ability',   keys: ['cognitive', 'emotional'] },
    { label: 'Capacity',  keys: ['physiology', 'resilience'] },
    { label: 'Execution', keys: ['engagement', 'appraisal'] },
  ];

  return (
    <div id="screen-results" className="screen active">
      <ProgressBar pct={100} />
      <Nav logoHeight={64} />

      {/* ── HERO ── */}
      <div className="results-hero">
        <div className="results-hero-inner">

          {/* LEFT */}
          <div className="results-hero-left">
            <div className="results-eyebrow">Your Results</div>
            <h2 className="results-thanks">
              Thank you for completing the FOUND Performance Scorecard{userData.firstName ? `, ${userData.firstName}` : ''}.
            </h2>
            <p className="results-explainer-text">
              We've scored your responses across 6 performance dimensions, each out of 100%. Your results reflect how consistently the habits, behaviours and conditions that drive high performance are present in your working life right now.
            </p>
            <p className="results-explainer-text">
              Above 80% is high performance. 60–80% is strong. 40–60% is developing. Below 40% signals areas that may be limiting your output.
            </p>
            <div className="results-legend">
              <div className="legend-item"><span className="legend-dot" style={{background:'#16a34a'}} />High Strength (75%+)</div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#2563eb'}} />Average to High (50–74%)</div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#d97706'}} />Low to Average (25–49%)</div>
              <div className="legend-item"><span className="legend-dot" style={{background:'#ff2846'}} />Needs Attention (0–24%)</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="results-hero-right">
            <Donut overall={overall} />
            <p className="results-sub">Based on 6 performance dimensions</p>
          </div>

        </div>
      </div>

      {/* ── DIMENSIONS ── */}
      <div className="results-body">
        {dimGroups.map(group => (
          <div key={group.label} className="dim-group">
            <div className="results-section-label">{group.label}</div>
            <div className="dim-grid">
              {group.keys.map(d => <DimCard key={d} dimKey={d} score={scores[d]} isLowest={d === lowestDim} />)}
            </div>
          </div>
        ))}
      </div>

      {/* ── WHAT NOW ── */}
      <div className="what-now">
        <div className="what-now-inner">
          <div className="what-now-left">
            <div className="what-now-eyebrow">What this means</div>
            <h2 className="what-now-line">{line}</h2>
            <p className="what-now-sub">{sub}</p>
          </div>
          <div className="what-now-right">
            <div className="what-now-cta-box">
              <div className="what-now-cta-label">Your next step</div>
              <p className="what-now-cta-desc">Book a free 30-minute discovery call with Emily to walk through your results and identify where to focus first.</p>
              <a className="btn-cta" href="#">
                {isTeamLead ? 'Book a Free Brain Capital Assessment' : 'Book a Free Discovery Call'}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <div className="share-section">
                <p className="share-label">Share your score</p>
                <button className="share-btn share-copy" onClick={handleCopy}>
                  {copied ? (
                    <><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Link copied!</>
                  ) : (
                    <><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M11 5V4a1 1 0 00-1-1H4a1 1 0 00-1 1v6a1 1 0 001 1h1" stroke="currentColor" strokeWidth="1.5"/></svg>Copy link to share</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="results-footnote">FOUND · found.pro · Cognitive Performance Diagnostics</div>
    </div>
  );
}

export default function Scorecard() {
  const [screen, setScreen] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [userData, setUserData] = useState({});
  const [results, setResults] = useState(null);

  function handleStartClick() { setScreen('lead'); }

  function handleLeadSubmit(form) {
    setUserData(form);
    setCurrentQ(0);
    setAnswers({});
    setScreen('quiz');
  }

  function handleAnswer(val) {
    const q = questions[currentQ];
    let newAnswers = { ...answers };
    if (q.routing) {
      setIsTeamLead(val);
    } else {
      newAnswers = { ...answers, [q.dim]: [...(answers[q.dim] || []), val ? 1 : 0] };
      setAnswers(newAnswers);
    }
    const next = currentQ + 1;
    if (next >= questions.length) {
      const { scores, overall } = calculateScores(newAnswers, dims);
      setResults({ scores, overall });
      setScreen('results');
    } else {
      setCurrentQ(next);
    }
  }

  function handleRetake() {
    setCurrentQ(0); setAnswers({}); setIsTeamLead(false); setResults(null); setScreen('intro');
  }

  return (
    <>
      {screen === 'intro' && (<><Nav /><IntroScreen onStart={handleStartClick} /></>)}
      {screen === 'lead' && (<><Nav /><LeadScreen onSubmit={handleLeadSubmit} /></>)}
      {screen === 'quiz' && (<QuizScreen currentQ={currentQ} onAnswer={handleAnswer} />)}
      {screen === 'results' && results && (
        <ResultsScreen userData={userData} scores={results.scores} overall={results.overall} isTeamLead={isTeamLead} onRetake={handleRetake} />
      )}
    </>
  );
}
