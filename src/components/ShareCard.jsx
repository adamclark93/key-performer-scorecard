import { forwardRef } from 'react';
import { quadrants } from '../models/scoring';

const ShareCard = forwardRef(function ShareCard({ result }, ref) {
  const { quadrant, overallPct } = result;
  const q = quadrants[quadrant];

  return (
    <div
      ref={ref}
      style={{
        width: 1200,
        height: 630,
        background: '#f1ece4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 6,
        background: q.color,
      }} />

      {/* Logo */}
      <img
        src="/found-logo.png"
        alt="FOUND"
        crossOrigin="anonymous"
        style={{ height: 60, marginBottom: 12 }}
      />
      <div style={{
        fontSize: 14, letterSpacing: 4, textTransform: 'uppercase',
        color: '#999', fontWeight: 700, marginBottom: 48,
      }}>
        Key Performer Scorecard
      </div>

      {/* Quadrant name */}
      <div style={{
        fontSize: 72, fontWeight: 700, color: q.color,
        lineHeight: 1, marginBottom: 16, letterSpacing: -1,
      }}>
        {q.label}
      </div>

      {/* Overall score */}
      <div style={{
        fontSize: 120, fontWeight: 700, color: q.color,
        lineHeight: 1, letterSpacing: -4,
      }}>
        {overallPct}%
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 32, fontSize: 14,
        color: '#999', letterSpacing: 2,
      }}>
        foundperform.com  ·  Take the scorecard
      </div>
    </div>
  );
});

export default ShareCard;
