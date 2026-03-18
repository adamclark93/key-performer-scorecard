import '../styles/scorecard.css';

export default function PrivacyPolicy() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Nav */}
      <nav>
        <img src="/found-logo.png" alt="FOUND" style={{ height: 64 }} />
        <div className="nav-label">Performance Scorecard</div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 2rem 6rem' }}>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--dark-dim)', marginBottom: '3rem', fontSize: '0.85rem' }}>
          Last updated: March 2026
        </p>

        <Section title="1. Introduction">
          <p>FOUND understands that your privacy is important to you and that you care about how your information is used and shared. We respect and value the privacy of everyone who uses our services and will only collect and use information in ways that are useful to you and consistent with your rights and our obligations under the law.</p>
          <p>This policy applies to our use of any and all data collected by us in relation to your use of our scorecard and website. Please read this Privacy Policy carefully. Your use of our services constitutes acceptance of this policy.</p>
        </Section>

        <Section title="2. Who We Are">
          <p>FOUND is a coaching & development company. Our services are operated by FOUND Coaching based in Amsterdam, the Netherlands.</p>
          <p>For any privacy-related queries, you can contact us at: <a href="mailto:hello@foundperform.com" style={{ color: 'var(--red)' }}>hello@foundperform.com</a></p>
        </Section>

        <Section title="3. What Data We Collect">
          <p>Depending on how you use our services, we may collect the following data:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Job title and company name</li>
            <li>Scorecard responses and results</li>
            <li>IP address and browser information</li>
            <li>How you interact with our website and emails</li>
          </ul>
        </Section>

        <Section title="4. How We Use Your Data">
          <p>We use your data to:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Deliver your scorecard results and personalised insights</li>
            <li>Send you your results and follow-up recommendations by email</li>
            <li>Improve our diagnostics and services</li>
            <li>Contact you about relevant FOUND products, services, and events (with your consent)</li>
            <li>Respond to your enquiries</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>We will never sell your data to third parties. We will not send you unsolicited marketing without your consent, and you can unsubscribe at any time.</p>
        </Section>

        <Section title="5. Legal Basis for Processing">
          <p>Under GDPR, we process your personal data on the following bases:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Consent</strong> — where you have actively provided your data to receive results or communications</li>
            <li><strong>Legitimate interests</strong> — to improve our services and communicate with you about relevant offerings</li>
            <li><strong>Contractual necessity</strong> — where data processing is required to deliver a service you have requested</li>
          </ul>
        </Section>

        <Section title="6. How and Where We Store Your Data">
          <p>Your data is stored securely and in accordance with the EU General Data Protection Regulation (GDPR). We retain your data only for as long as necessary to fulfil the purposes described in this policy, or as required by law.</p>
          <p style={{ marginTop: '1rem' }}>Some data may be stored or processed outside the European Economic Area (EEA) via third-party tools. Where this is the case, we ensure appropriate safeguards are in place.</p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>We may share data with trusted third-party service providers who help us operate our services, including email delivery, analytics, and CRM platforms. These providers are contractually required to handle your data securely and in compliance with GDPR.</p>
          <p style={{ marginTop: '1rem' }}>We do not allow third parties to use your data for their own marketing purposes.</p>
        </Section>

        <Section title="8. Cookies">
          <p>Our website uses cookies to improve your experience and analyse site usage. You can control cookie settings through your browser. By continuing to use our site, you consent to our use of cookies in accordance with this policy.</p>
        </Section>

        <Section title="9. Your Rights">
          <p>Under GDPR, you have the following rights:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Access</strong> — to request a copy of the data we hold about you</li>
            <li><strong>Rectification</strong> — to request corrections to inaccurate data</li>
            <li><strong>Erasure</strong> — to request deletion of your data</li>
            <li><strong>Restriction</strong> — to request we limit how we use your data</li>
            <li><strong>Portability</strong> — to request your data in a portable format</li>
            <li><strong>Objection</strong> — to object to processing based on legitimate interests</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>To exercise any of these rights, contact us at <a href="mailto:hello@foundperform.com" style={{ color: 'var(--red)' }}>hello@foundperform.com</a>. We will respond within 30 days.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
          <p style={{ marginTop: '1rem' }}>
            <strong>FOUND Coaching</strong><br />
             Amsterdam, Netherlands<br />
            <a href="mailto:hello@foundperform.com" style={{ color: 'var(--red)' }}>hello@foundperform.com</a>
          </p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
      <h2 style={{
        fontFamily: 'MaisonNeue, sans-serif',
        fontSize: '1.1rem',
        fontWeight: 700,
        marginBottom: '1rem',
        color: 'var(--dark)'
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--dark-dim)' }}>
        {children}
      </div>
    </div>
  );
}
