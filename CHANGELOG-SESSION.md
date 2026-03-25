# Session Changelog — 24 March 2026

## 1. Scoring Fix
- **Key Performer** now requires >=70% overall score (not just 50% on each axis)
- People like Ben (64%) and Will (64%) now correctly fall into **Emerging** instead of Key Performer

## 2. Mobile Optimisation
- Smaller nav logo on mobile
- Larger touch targets on Yes/No buttons
- Responsive overall score and headline sizing (CSS clamp)
- Capped quadrant grid width on mobile
- Reduced card padding on small screens
- `overflow-wrap` on text blocks to prevent overflow

## 3. PDF Report (generatePDF.js) — Major Overhaul
### Structure (8 pages)
- **Page 1:** Results overview — quadrant grid, overall score, 5 dimension bars with descriptions, KEY INSIGHT callout box (shows strongest/weakest dimensions)
- **Page 2:** "Why is this report Valuable?" — dark (#2d2d2d) top section with 3 groups (Emerging, Workhorses, Key Performers), white bottom section with 5 dimension summaries in 2-column layout with numbered red badges
- **Pages 3–7:** Individual dimension pages — each has: red "DIMENSION X OF 5" eyebrow, large dimension name + score inline, progress bar, "What it is" section with red underline, "Why it matters" paragraph, "ASK YOURSELF" callout box with red accent bar, "How to improve" with numbered red circle tips
- **Page 8:** Full-page dark CTA — "Ready to become a Key Performer?", 3 value props with red bullet badges, red "Book a Free Consultation" button, Calendly URL

### Design Details
- Brand colours: dark `#2d2d2d` (rgb 45,45,45), red `#ff2846`, cream `#F5F3EF`
- Logo: 30x15mm (correct 2:1 aspect ratio from 1562x781 source image)
- Removed CTA bars from individual pages (only on final page now)
- Large readable fonts: 26pt dimension titles, 12pt section headings, 10pt body text
- Each dimension page has enriched content: `what`, `why`, `keyQuestion`, and `tips`

### Content per Dimension
Each dimension in `dimContent` now has:
- `what` — explanation of the dimension
- `why` — why it matters for career success
- `keyQuestion` — a provocative self-reflection question
- `tips` — 3 actionable improvement steps

## 4. Email Integration (Resend)
- PDF uploaded to **Supabase Storage** (public `reports` bucket) instead of attached to email
- Email contains a real clickable "Download Your Report" button linking to the hosted PDF URL
- Button styled to match the red brand button in the email template
- Button centred in the "Your Score" section of the email HTML
- Supabase storage policies: INSERT (anon, upload) + SELECT (anon, getPublicUrl)

## 5. Results Page Button Placement
- Moved "Download Your Report" and "Share on LinkedIn" buttons below the 5 dimension cards
- Download button removed from results page (now delivered via email only)

## 6. LinkedIn Sharing
- "Share on LinkedIn" button opens modal with branded 1200x630 share card preview
- Users can download the card image and open LinkedIn's share dialog

## 7. Deployment
- Deployed to Vercel production: **https://scorecard.foundperform.com**
- All features verified on desktop and mobile viewports

---

## Key Files Modified
- `src/lib/generatePDF.js` — Complete PDF report generator (8 pages)
- `src/components/Scorecard.jsx` — Results page layout, button placement
- `src/models/scoring.js` — Key Performer threshold fix (>=70% overall)
- `src/styles/scorecard.css` — Mobile responsive styles
- `src/lib/shareUtils.js` — LinkedIn share card generation
- `src/components/ShareCard.jsx` — Share card component
- `api/send-report.js` — Email API with Supabase storage upload + Resend email
- Email HTML template — Added centred "Download Your Report" button

## Environment / Services
- **Supabase**: Database (leads) + Storage (reports bucket)
- **Resend**: Transactional email with HTML template
- **Vercel**: Hosting + serverless API functions
- **jsPDF**: Client-side PDF generation
