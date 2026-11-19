"use client";

import React from 'react';

// Reusable SVG Icons
const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 12 12 17 22 12"/>
    <polyline points="2 17 12 22 22 17"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "32"} height={props.height || "32"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width || "32"} height={props.height || "32"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/>
    <path d="M16 6h.01"/>
    <path d="M12 6h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
);

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <h1>About AKR Group UAE</h1>
          <p>Your Trusted Premium Strategic Real Estate, Financial, Risk &amp; Brand Architects across the UAE</p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="about-section-dark">
        <div className="about-container">
          <div className="founder-grid">
            
            {/* Founder Badge */}
            <div className="founder-badge">
              <div className="founder-badge-box">
                <h2>AKR</h2>
              </div>
              <h3>Founder, AKR Group UAE</h3>
              <p>CHAIRMAN & CEO</p>
              
              <div className="foundation-divider" style={{ marginTop: '2rem' }}>
                <div className="foundation-divider-icon"></div>
              </div>
            </div>

            {/* Founder Message */}
            <div className="founder-message">
              <div className="founder-quote-icon">
                <QuoteIcon />
              </div>
              <p>I founded AKR on a simple belief: that wealth is only truly valuable when it provides peace of mind for the people you love.</p>
              <p>In a world of cold transactions and complex paperwork, it is easy to forget the human story behind the wealth. At AKR, we choose to look past the balance sheets and focus on what truly matters: your peace of mind.</p>
              <p>We know that every investment represents a lifetime of your sacrifice, your hard work, and your dreams for your children. It is a promise made to those you love. That is why we don't just act as advisors; we act as the steady guardians of your family's future.</p>
              <p>When you trust us with your journey, we take it personally. We provide the honest guidance and the stable hands you need to ensure that what you build today becomes a legacy that lasts forever.</p>

              <div className="founder-highlight-quote">
                <p>" Forward Together. For Life. For Legacy."</p>
                <span>— FOUNDER, AKR GROUP UAE</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="about-section-light">
        <div className="about-container">
          <div className="who-we-are-card">
            
            <div className="who-we-are-text">
              <h2>Who We Are</h2>
              <h3>Architects of Wealth, Investment & Strategic Growth</h3>
              
              <p><strong>AKR Group UAE</strong> is a premier investment and growth platform, empowering individuals, families, and businesses with exceptional real estate, financial, and strategic solutions across the UAE.</p>
              
              <p>Through <strong>AKR Realty LLC, Dubai</strong> and <strong>AKR Financial & Real Estate Service LLC, Sharjah</strong>, we deliver sophisticated real estate strategies, wealth solutions, investment structuring, and financial intelligence built on trust, transparency, and excellence.</p>
              
              <p>Beyond investments, our <strong>Strategic Advertising & Marketing division</strong> creates powerful brand influence, market positioning, and growth opportunities for ambitious enterprises.</p>

              <p>We don't simply provide solutions—we <strong>architect wealth, engineer opportunities, and build enduring legacies</strong>. Combining market intelligence, strategic vision, and innovation, AKR Group UAE transforms aspirations into sustainable success.</p>

              <div className="who-we-are-slogan">Forward Together. For Life. For Legacy.</div>
            </div>

            <div className="who-we-are-image">
              {/* Image uses CSS background property (Dubai Skyline placeholder) */}
            </div>

          </div>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="about-section-dark">
        <div className="about-container">
          
          <div className="foundation-header">
            <h2>OUR FOUNDATION</h2>
            <div className="foundation-divider">
              <div className="foundation-divider-icon"></div>
            </div>
          </div>

          <div className="foundation-grid">
            
            {/* Mission */}
            <div className="foundation-card">
              <div className="foundation-card-header">
                <h3>OUR MISSION</h3>
              </div>
              <div className="foundation-icon">
                <LayersIcon />
              </div>
              <p>As <strong style={{color: 'var(--accent-gold)'}}>Architects</strong> of your financial future, we don't just manage assets; we design the structural integrity of your family's wealth.</p>
              <p>
                At <strong style={{color: 'var(--accent-gold)'}}>AKR</strong>, our mission is to ensure that every investment serves as a cornerstone for the <strong style={{color: 'var(--accent-gold)'}}>generations to follow</strong> —
                <br />
                <strong style={{color: 'var(--accent-gold)', display: 'inline-block', marginTop: '0.35rem', whiteSpace: 'nowrap'}}>Forward Together. For Life. For Legacy.</strong>
              </p>
              
              <div className="foundation-quote-box">
                <p>Every investment, a cornerstone. Every family, a legacy.</p>
              </div>
            </div>

            {/* Vision */}
            <div className="foundation-card">
              <div className="foundation-card-header">
                <h3>OUR VISION</h3>
              </div>
              <div className="foundation-icon">
                <EyeIcon />
              </div>
              <p>True wealth is not just what you earn; it is what you leave behind. As your <strong style={{color: 'var(--accent-gold)'}}>Investment Architects</strong>, we don't just build portfolios —</p>
              <p className="highlight">"we build foundations that stand for generations."</p>
              <p>At <strong style={{color: 'var(--accent-gold)'}}>AKR</strong>, we bridge the gap between today's ambition and tomorrow's heritage, ensuring your vision becomes a life well-lived and a legacy that never fades.</p>
              
              <div className="foundation-quote-box">
                <p>Forward Together. For Life. For Legacy.</p>
              </div>
            </div>

          </div>

          <div className="foundation-footer">
            <h3>" Forward Together. For Life. For Legacy. "</h3>
            <p style={{ fontWeight: 800, letterSpacing: '1px' }}>— THE AKR LEGACY VISION</p>
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-section-light" style={{ paddingBottom: '2rem' }}>
        <div className="about-container">
          <h2 className="section-title">Our Core Values</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-wrapper">
                <AwardIcon />
              </div>
              <h3>Excellence</h3>
              <p>We maintain the highest standards across everything we build, ensuring accuracy and reliability in every recommendation.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrapper">
                <UsersIcon />
              </div>
              <h3>Client-First</h3>
              <p>Your vision, goals and peace of mind come first. We build lasting partnerships rooted in discretion, trust, and proven results.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrapper">
                <TrendingUpIcon />
              </div>
              <h3>Innovation</h3>
              <p>We combine advanced financial analytics with real-time market intelligence to deliver clear, data-driven insights for smarter wealth decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="about-section-light" style={{ paddingTop: '2rem' }}>
        <div className="about-container">
          <div className="offer-card">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>What We Offer</h2>
            
            <div className="offer-grid">
              
              <div className="offer-item">
                <div className="offer-icon">
                  <BuildingIcon />
                </div>
                <div className="offer-content">
                  <h3>Real Estate Architecture</h3>
                  <p>Strategic guidance on prime, off-market, and ready-to-move residential and commercial properties—backed by market intelligence, yield modeling, and portfolio optimization across the UAE.</p>
                </div>
              </div>

              <div className="offer-item">
                <div className="offer-icon">
                  <TrendingUpIcon width="24" height="24" />
                </div>
                <div className="offer-content">
                  <h3>Investment Intelligence</h3>
                  <p>Precision financial modeling, XIRR return projections, and smart mortgage structuring—engineered to turn complex numbers into clear, confident investment decisions.</p>
                </div>
              </div>

              <div className="offer-item">
                <div className="offer-icon">
                  <TrendingUpIcon width="24" height="24" />
                </div>
                <div className="offer-content">
                  <h3>Private Wealth Architecture</h3>
                  <p>Tailored, strategic financial architecture designed to grow your capital, protect your assets, and secure your family’s legacy for generations.</p>
                </div>
              </div>

              <div className="offer-item">
                <div className="offer-icon">
                  <UsersIcon width="24" height="24" />
                </div>
                <div className="offer-content">
                  <h3>Private Mandate Consultation</h3>
                  <p>Dedicated, one-on-one advisory sessions where senior specialists listen first, structure custom wealth and property roadmaps, and stand beside you at every milestone—for your life and for your legacy.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* Licensed & Regulated Section */}
      <section className="about-section-light licensed-section">
        <div className="about-container">
          <h2 className="licensed-card-title">Licensed & Regulated</h2>
          
          <div className="licensed-item-card">
            <div className="licensed-item-icon">
              <BuildingIcon />
            </div>
            <div className="licensed-item-content">
              <div className="licensed-item-header">
                <h3>AKR Realty LLC</h3>
                <span className="licensed-pill">RERA - DLD</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.3rem' }}>
                📍 No: 104 Sarah Building, Plot No-115-0, AL Garhoud, Dubai, United Arab Emirates
              </p>
              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.6rem' }}>
                📞 Office Direct: <a href="tel:+971558847365" style={{ color: 'var(--primary-red)', fontWeight: 600, textDecoration: 'none' }}>+971 55 884 7365</a>
              </p>
              <p className="licensed-item-desc">A RERA & DLD-registered real estate brokerage in Dubai. Licensed to provide full property transaction and brokerage services in compliance with UAE laws and Dubai Land Department regulations.</p>
              
              <div className="licensed-numbers-grid">
                <div className="licensed-number-box">
                  <span>LICENSE NO.</span>
                  <strong>1578426</strong>
                </div>
                <div className="licensed-number-box">
                  <span>ORN NO.</span>
                  <strong>57750</strong>
                </div>
                <div className="licensed-number-box">
                  <span>BRN NO.</span>
                  <strong>95660</strong>
                </div>
              </div>
              
              <p className="licensed-disclaimer">All property transactions are subject to UAE laws and DLD regulations.</p>
            </div>
          </div>

          <div className="licensed-item-card">
            <div className="licensed-item-icon">
              <TrendingUpIcon />
            </div>
            <div className="licensed-item-content">
              <div className="licensed-item-header">
                <h3>AKR Financial and Real Estate Service LLC</h3>
                <span className="licensed-pill">SHAMS</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.3rem' }}>
                📍 SHAMS, Sharjah, United Arab Emirates
              </p>
              <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.6rem' }}>
                📞 AKR Financial: <a href="tel:+971585887864" style={{ color: 'var(--primary-red)', fontWeight: 600, textDecoration: 'none' }}>+971 58 588 7864</a>
              </p>
              <p className="licensed-item-desc">Registered under Sharjah Media City (SHAMS), Sharjah. Licensed to provide financial, real estate, and marketing advisory services subject to UAE regulatory requirements and approvals where applicable.</p>
              
              <div className="licensed-numbers-grid">
                <div className="licensed-number-box">
                  <span>LICENSE NO.</span>
                  <strong>24286.01</strong>
                </div>
              </div>
              
              <p className="licensed-disclaimer">Advisory services are subject to UAE regulatory requirements and approvals where applicable.</p>
            </div>
          </div>

          <div className="important-notice">
            <p style={{ marginBottom: '0.85rem' }}>
              <strong>Important Disclaimer :</strong> <strong>Note:1 -</strong> AKR Group UAE - AKR Financial and Real Estate Service LLC (SHAMS, Sharjah, UAE) and AKR Realty LLC (Al Garhoud, Dubai, UAE) operates strictly within the licensed regulatory scope of its respective entities. We do not facilitate direct online transactions or provide services beyond our authorized licenses. All insights and recommendations are provided for strategic consultation purposes and remain subject to UAE regulatory compliance.
            </p>
            <p>
              <strong>Note 2:- Important Disclaimer:</strong> All calculators, tools, and estimates provided are for strategic consultation, clear understanding, and educational purposes only, and do not constitute formal financial advice. Results are indicative and subject to approval by relevant financial institutions. Past performance does not guarantee future results. This platform does not facilitate direct online transactions between clients and property listers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
