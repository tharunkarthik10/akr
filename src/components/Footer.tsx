import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="master-footer">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Column 1: Logo & Socials */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img 
                src="/logo/akrlogo.png" 
                alt="AKR Group UAE Logo" 
                style={{ height: '65px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
            <p className="brand-desc">
              Trusted Premium Strategic, Real Estate, Financial & Investment Architects across the UAE.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">ig</a>
              <a href="#" className="social-icon">yt</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/properties">Properties</Link></li>
              <li><Link href="/calculator">Mortgage Calculator</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4 className="footer-heading">OUR SERVICES</h4>
            <ul className="footer-links">
              <li><Link href="/services/real-estate">Real Estate Advisory</Link></li>
              <li><Link href="/services/financial">Financial Advisory</Link></li>
              <li><Link href="/services/insurance">Insurance Advisory</Link></li>
              <li><Link href="/services/investment">Investment Advisory</Link></li>
              <li><Link href="/services/marketing">Marketing Advisory</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">CONTACT US</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <div>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 600, display: 'block', fontSize: '0.75rem' }}>DUBAI OFFICE</span>
                  No: 104 Sarah Building, Plot No-115-0, AL Garhoud, Dubai, UAE
                </div>
              </li>
              <li style={{ marginTop: '0.35rem' }}>
                <span className="contact-icon">📍</span>
                <div>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 600, display: 'block', fontSize: '0.75rem' }}>SHARJAH OFFICE</span>
                  SHAMS, Sharjah, United Arab Emirates
                </div>
              </li>
              <li style={{ marginTop: '0.35rem' }}>
                <span className="contact-icon">📞</span>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#ccc', display: 'block' }}>Office Direct:</span>
                  <a href="tel:+971558847365" style={{ color: '#ffffff', textDecoration: 'none' }}>+971 55 884 7365</a>
                </div>
              </li>
              <li style={{ marginTop: '0.35rem' }}>
                <span className="contact-icon">📞</span>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#ccc', display: 'block' }}>AKR Financial:</span>
                  <a href="tel:+971585887864" style={{ color: '#ffffff', textDecoration: 'none' }}>+971 58 588 7864</a>
                </div>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                info@akrgroupuae.com
              </li>
              <li>
                <span className="contact-icon">🕒</span>
                Mon – Sat: 9:00 AM – 7:00 PM
              </li>
            </ul>
          </div>

          {/* Column 5: Compliance */}
          <div className="footer-col compliance-col">
            <h4 className="footer-heading">REGULATORY COMPLIANCE</h4>
            <div className="compliance-box">
              <div className="comp-title">RERA REGISTERED — DLD</div>
              <div className="comp-numbers">
                <div>
                  <div className="comp-label">BRN NO.</div>
                  <div className="comp-val">95660</div>
                </div>
                <div>
                  <div className="comp-label">ORN NO.</div>
                  <div className="comp-val">57750</div>
                </div>
              </div>
            </div>
            <div className="compliance-box mt-2">
              <div className="comp-title">SHAMS FREEZONE LICENCE</div>
              <div className="comp-text">Sharjah — Licence No. 24286.01</div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Legal Disclaimers */}
        <div className="footer-legal">
          <p><strong>AKR Realty LLC</strong> — No: 104 Sarah Building, Plot No-115-0, AL Garhoud, Dubai, United Arab Emirates. AKR Realty LLC is a RERA-Dubai Land Department registered and licensed real estate brokerage in Dubai-UAE (ORN: 57750 &amp; BRN: 95660). All property transactions are subject to UAE laws and DLD regulations.</p>
          <p><strong>AKR Financial and Real Estate Service LLC</strong> — SHAMS, Sharjah, United Arab Emirates. Registered and Licensed by SHAMS, Sharjah - UAE (License no: 24286.01). Financial &amp; Real Estate &amp; Marketing advisory services are subject to UAE regulatory requirements and approvals wherever applicable.</p>
          <p className="text-gold"><strong>Important Disclaimer:</strong> All calculators and estimates provided are for advisory purposes only and do not constitute financial advice. Results are indicative and subject to approval by relevant financial institutions. Past performance does not guarantee future results. This platform does not facilitate direct transactions between clients and property listers.</p>
        </div>

        <div className="footer-bottom">
          <div>© 2026 AKR Group UAE. All rights reserved.</div>
          <div className="bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
