import { saveLead, uploadPDF } from '../lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { questions, subDims } from '../models/questions';
import { calculateScores, quadrants, getDimRating, getWeakestSubDim, getStrongestSubDim } from '../models/scoring';
import { generatePDFBase64 } from '../lib/generatePDF';
import { downloadShareCard, shareToLinkedIn } from '../lib/shareUtils';
import ShareCard from './ShareCard';
import { trackEvent } from '../lib/analytics';
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
      company: 'AlpInvest Carlyle',
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
        <p className="intro-sub">Whether you like it or not, you are being put in a box. Take the Key Performer Scorecard and benchmark your ability to stand out in a business context.</p>
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
                  <p>You'll receive a report with your results, including context about what it means for your career and recommendations for what to do next.</p>
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

  const jobLevels = ['Analyst / Associate', 'Manager / Senior Manager', 'Vice President', 'Director/Principal', 'Partner', 'C-Suite', 'Founder'];
  const industries = ['Private Equity', 'Private Credit','Venture Capital', 'Asset Management','Investment Banking', 'Corporate Finance', 'Accounting & Audit', 'Other Financial Services', 'Strategy & Management Consulting', 'Legal', 'Technology & Software', 'Healthcare & Life Sciences','Other'];

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
function QuizScreen({ currentQ, onAnswer, onBack }) {
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
          <div className="quiz-buttons" key={currentQ}>
            <button className="btn-yes" onClick={() => onAnswer(true)}>Yes</button>
            <button className="btn-no"  onClick={() => onAnswer(false)}>No</button>
          </div>
          {currentQ > 0 && (
            <button className="btn-back" onClick={onBack}>Back</button>
          )}
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
              className={`quadrant-cell ${c.key === quadrant ? `active q-${quadrant}` : ''}`}
              style={{ gridColumn: c.col, gridRow: c.row }}
            >
              <span className="quadrant-cell-label">{c.label}</span>
              {c.key === quadrant && (
                <span
                  className="quadrant-dot"
                  style={{ color: quadrants[quadrant]?.color }}
                >
                  ● You
                </span>
              )}
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
  const shareCardRef = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePreview, setSharePreview] = useState(null);

  const name = userData.firstName ? `, ${userData.firstName}` : '';

  async function handleOpenShareModal() {
    trackEvent('share_modal_opened');
    setShowShareModal(true);
    // Generate preview after modal opens and card renders
    setTimeout(async () => {
      if (shareCardRef.current) {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(shareCardRef.current, {
          scale: 1,
          useCORS: true,
          backgroundColor: '#f1ece4',
        });
        setSharePreview(canvas.toDataURL('image/png'));
      }
    }, 100);
  }

  async function handleDownloadCard() {
    trackEvent('download_card');
    if (shareCardRef.current) {
      await downloadShareCard(shareCardRef.current);
    }
  }

  return (
    <div id="screen-results" className="screen active">
      <ProgressBar pct={100} />
      <Nav logoHeight={64} />

      {/* ── EMAIL NOTICE ── */}
      <div className="email-notice">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4.5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="1.5" y="3" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>
        <span>Your full report has been sent to <strong>{userData.email}</strong></span>
      </div>

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
                <span className="legend-item"><span className="legend-dot" style={{ background: '#ff2846' }} />Low</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#d97706' }} />Average</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }} />High Average</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#16a34a' }} />High</span>
              </div>
            </div>
          </div>
          <div className="results-hero-right">
            <QuadrantGrid quadrant={quadrant} />
            <div style={{ textAlign: 'center', marginTop: '1.5rem', width: '100%' }}>
              <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.35)', marginBottom: '.4rem' }}>Your Overall Score</div>
              <div className="overall-score" style={{ color: q.color }}>{overallPct}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="results-body">
        {/* ── 2. FIVE DIMENSIONS ── */}
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

        {/* ── 3. ACTIONS ── */}
        <div className="results-actions">
          <a
            className="btn-team-compare"
            href={`mailto:?subject=${encodeURIComponent('Take the Key Performer Scorecard')}&body=${encodeURIComponent(`I just took the Key Performer Scorecard and scored ${overallPct}% — ${quadrants[quadrant].label}.\n\nIt's a quick 25-question assessment that benchmarks how you show up at work across five dimensions.\n\nTake it here: https://scorecard.foundperform.com\n\nWould be great to compare results.`)}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 4H2v8h12V4zM2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            See How Your Team Compares
          </a>
          <button className="btn-share" onClick={handleOpenShareModal}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 9v4h8V9M8 2v7M5 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Share on LinkedIn
          </button>
        </div>
      </div>

      {/* ── 4. WHAT NOW ── */}
      <div className="what-now">
        <div className="what-now-inner">
          <div className="what-now-eyebrow">What Now?</div>
          <h2 className="what-now-headline">Understanding your constraints is the first step to becoming a Key Performer.</h2>
          <p className="what-now-sub">Being good is no longer enough to stand out. You now have a clearer picture of what might be holding you back but taking action is what matters.</p>
          <a className="btn-cta" href="https://calendly.com/found-performance/keyperformer" onClick={() => trackEvent('cta_calendly_clicked')}>
            Discover How You Can Improve
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      <div className="results-footnote">FOUND · foundperform.com · Key Performer Scorecard</div>

      {/* Hidden share card for rendering */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <ShareCard ref={shareCardRef} result={result} />
      </div>

      {/* Share modal */}
      {showShareModal && (
        <div className="share-modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <button className="share-modal-close" onClick={() => setShowShareModal(false)}>&times;</button>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Share Your Result</h3>
            <p style={{ fontSize: '.82rem', color: 'rgba(26,26,26,0.5)', lineHeight: 1.6 }}>
              Download your result card, then share it on LinkedIn.
            </p>
            <div className="share-modal-preview">
              {sharePreview ? (
                <img src={sharePreview} alt="Share card preview" />
              ) : (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(26,26,26,0.3)', fontSize: '.85rem' }}>
                  Generating preview...
                </div>
              )}
            </div>
            <div className="share-modal-actions">
              <button className="btn-download" onClick={handleDownloadCard}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M4 8l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download Card
              </button>
              <button className="btn-download" style={{ background: '#0a66c2' }} onClick={() => { trackEvent('share_linkedin'); shareToLinkedIn(); }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.4 13H3.2V6.4h2.2V13zM4.3 5.5c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3zM13 13h-2.2V9.8c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.7V13H6.2V6.4h2.1v.9c.3-.6 1-1.1 2.1-1.1 2.2 0 2.6 1.5 2.6 3.4V13z"/></svg>
                Open LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}
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

  function handleStart() {
    trackEvent('scorecard_started');
    setScreen('lead');
  }

  function handleLeadSubmit(form) {
    trackEvent('lead_submitted', { job_level: form.jobLevel, industry: form.industry });
    setUserData(form);
    setCurrentQ(0);
    setAnswers({ perspective: [], pace: [], profile: [], performance: [], progress: [] });
    setScreen('quiz');
    window.scrollTo(0, 0);
  }

  function handleBack() {
    if (currentQ <= 0) return;
    const prevQ = questions[currentQ - 1];
    const prevDimAnswers = [...(answers[prevQ.dim] || [])];
    prevDimAnswers.pop();
    setAnswers({ ...answers, [prevQ.dim]: prevDimAnswers });
    setCurrentQ(currentQ - 1);
  }

  function handleAnswer(val) {
    const q = questions[currentQ];
    const next = currentQ + 1;
    const newAnswers = {
      ...answers,
      [q.dim]: [...(answers[q.dim] || []), val ? 1 : 0],
    };
    setAnswers(newAnswers);
    if (currentQ === 0) trackEvent('quiz_started');
    trackEvent('question_answered', { question_number: currentQ + 1 });
    if (next >= questions.length) {
      trackEvent('quiz_completed');
      const finalResult = calculateScores(newAnswers);
      trackEvent('results_viewed', { quadrant: finalResult.quadrant, overall_pct: finalResult.overallPct });
      setResult(finalResult);
      setScreen('results');
      window.scrollTo(0, 0);
      saveLead(userData, finalResult, newAnswers);

      // Generate PDF, upload to storage, send download URL with email
      generatePDFBase64(userData, finalResult)
        .then(async (pdfBase64) => {
          const ts = Date.now();
          const slug = (userData.firstName || 'user').toLowerCase().replace(/\s+/g, '-');
          const fileName = `${slug}-${ts}.pdf`;
          const pdfUrl = await uploadPDF(pdfBase64, fileName);
          return fetch('/api/send-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userData, result: finalResult, pdfUrl }),
          });
        })
        .catch((err) => {
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
      {screen === 'quiz'    && <QuizScreen currentQ={currentQ} onAnswer={handleAnswer} onBack={handleBack} />}
      {screen === 'results' && result && <ResultsScreen userData={userData} result={result} />}
    </>
  );
}
