"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function FinancialPage() {
  const financialFaqs = [
    {
      question: "What licenses does AKR Financial & Real Estate Service LLC hold?",
      answer: (
        <div>
          <p style={{ marginBottom: '0.75rem' }}>
            AKR Financial and Real Estate Service LLC is registered at SHAMS, Sharjah, United Arab Emirates (License No. 24286.01):
          </p>
          <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyleType: 'disc' }}>
            <li>
              <strong>Finance &amp; Banking Architecture</strong> — Strategic banking consultation across Tier-1 mortgages, executive credit facilities, and structured capital planning—engineered to optimize liquidity, leverage, and long-term returns across the UAE.
            </li>
            <li>
              <strong>Insurance &amp; Asset Protection</strong> — Independent risk management, life, health, motor, mortgage loan, property protection frameworks designed to insulate your personal wealth, business continuity, and generational family assets.
            </li>
            <li>
              <strong>Marketing &amp; Advertising Brand Positioning</strong> — Strategic, high-impact advertising, personal branding for leaders, corporate brand building, and signature event production—from executive galas and cultural festivals to private gatherings that turn vision into lasting market authority.
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "Does AKR assist non-resident investors with UAE mortgage financing?",
      answer: "Yes. AKR provides guidance on non-resident mortgage options, eligibility requirements, documentation and financing opportunities through relevant banking partners, subject to bank approval."
    },
    {
      question: "Can AKR assist international investors with opening UAE bank accounts?",
      answer: "Yes. AKR provides guidance on banking requirements, account-opening procedures and documentation for eligible non-residents and international investors, subject to individual bank policies and regulatory requirements."
    },
    {
      question: "Does AKR assist international business owners with commercial financing?",
      answer: "Yes. AKR assists eligible entrepreneurs and international business owners in exploring business financing and commercial credit options through relevant financial institutions, subject to eligibility and lender approval."
    },
    {
      question: "Can AKR assist with residential and commercial mortgage solutions?",
      answer: "Yes. AKR provides guidance on residential and commercial mortgage options, refinancing, equity release and related financing solutions through banking partners, subject to applicable eligibility criteria."
    },
    {
      question: "Does AKR provide cross-border financial and investment guidance?",
      answer: "AKR provides financial guidance covering banking solutions, personal and business finance, mutual funds and investment planning, within its licensed business activities and applicable regulatory permissions."
    },
    {
      question: "Can non-resident investors access financial solutions through AKR?",
      answer: "Yes. AKR assists eligible non-resident investors in understanding available UAE banking, mortgage and financial solutions, based on their residency status, financial profile and applicable institutional requirements."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* Hero Header */}
      <section className="properties-hero" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', padding: '3.5rem 1.5rem 1.5rem 1.5rem' }}>
        <h1 className="font-serif" style={{ fontWeight: 700, color: 'var(--primary-red)', marginBottom: '0.65rem', lineHeight: 1.25 }}>
          <span style={{ fontSize: '2.5rem', display: 'block' }}>AKR Financial &amp; Real Estate Service LLC</span>
          <span style={{ fontSize: '1.45rem', display: 'block', fontWeight: 600, marginTop: '0.35rem', letterSpacing: '0.02em' }}>
            Trusted Premium Strategic Financial, Investment &amp; Marketing Architects
          </span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          SHAMS Sharjah Registered — Backed by Full UAE Regulatory Compliance.
        </p>
        <p style={{ fontSize: '1.15rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '820px', margin: '0 auto 1.25rem auto' }}>
          From structured mortgages and private banking advisory to comprehensive risk management and brand architecture—we turn strategic financial decisions into lasting family wealth.
        </p>
        <p style={{ fontSize: '1.2rem', color: 'var(--primary-red)', fontWeight: 700, marginBottom: '0.65rem' }}>
          Your Wealth. Your Protection. Your Legacy for Generations.
        </p>
        <p className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.04em' }}>
          Forward Together. For Life. For Legacy.
        </p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* Official Entity & Address Banner */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '12px', padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--primary-red)' }}>📍</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--primary-red)', fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                AKR Financial and Real Estate Service LLC
              </div>
              <div style={{ color: '#2a2a2a', fontSize: '0.95rem', marginTop: '0.2rem', fontWeight: 500 }}>
                SHAMS , Sharjah United Arab Emirates
              </div>
              <div style={{ color: 'var(--accent-gold)', fontSize: '0.82rem', marginTop: '0.25rem', fontWeight: 600 }}>
                Sharjah Media City (SHAMS) Freezone Licensed | License No: 24286.01
              </div>
            </div>
          </div>
          <div>
            <a href="tel:+971585887864" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-red)', color: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              📞 AKR Financial: +971 58 588 7864
            </a>
          </div>
        </div>

        {/* Category Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Card 1: Finance & Banking Architecture */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem' }}>🏛️</div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Finance &amp; Banking Architecture
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Strategic banking consultation across Tier-1 mortgages, executive credit facilities, and structured capital planning—engineered to optimize liquidity, leverage, and long-term returns across the UAE.
              </p>
              
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Strategic Consultations:
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><Link href="/financial/mortgage-loan" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Tier-1 Mortgage Loans &amp; Structuring →</Link></li>
                <li><Link href="/financial/personal-loan" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Personal Finance &amp; Restructuring →</Link></li>
                <li><Link href="/financial/banking" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Private &amp; Corporate Banking Advisory →</Link></li>
                <li><Link href="/financial/mutual-funds" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Mutual Fund Portfolio Optimization →</Link></li>
                <li><Link href="/financial/child-education" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Child Education Wealth Planning →</Link></li>
                <li><Link href="/calculators/retirement" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Retirement Wealth Planning →</Link></li>
              </ul>
            </div>
          </div>

          {/* Card 2: Insurance & Asset Protection */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem' }}>🛡️</div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Insurance &amp; Asset Protection
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Independent risk management, life, health, motor, mortgage loan, property protection frameworks designed to insulate your personal wealth, business continuity, and generational family assets.
              </p>
              
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Strategic Consultations:
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><Link href="/financial/insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>General Insurance →</Link></li>
                <li><Link href="/financial/life-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Life Insurance →</Link></li>
                <li><Link href="/financial/health-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Health Insurance →</Link></li>
                <li><Link href="/financial/home-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Home Insurance →</Link></li>
                <li><Link href="/financial/mortgage-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Mortgage Insurance →</Link></li>
                <li><Link href="/financial/motor-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Motor Insurance →</Link></li>
              </ul>
            </div>
          </div>

          {/* Card 3: Marketing & Advertising Brand Positioning */}
          <div id="marketing" style={{ scrollMarginTop: '100px', backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>📢</div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Marketing &amp; Advertising Brand Positioning
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Strategic, high-impact advertising, personal branding for leaders, corporate brand building, and signature event production—from executive galas and cultural festivals to private gatherings that turn vision into lasting market authority.
              </p>
              
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Strategic Consultations:
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>1. Advertising &amp; Marketing Campaigns</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>2. Direct / Online Advertising &amp; Marketing</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>3. Digital Media Marketing &amp; Management</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>4. Public Relations (PR)</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>5. Social Media &amp; Sales Promotion</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>6. Signature Events Production</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>7. Festival &amp; Social Events Management</span></li>
                <li><span style={{ color: 'var(--primary-red)', fontWeight: 600 }}>8. Marketing &amp; Selling Event Tickets</span></li>
              </ul>
            </div>
          </div>

        </div>

        {/* FAQs */}
        <FAQAccordion 
          title="FAQ – International Banking, Mortgages & Business Finance"
          subtitle="Essential insights into UAE banking, non-resident mortgages, commercial credit, and wealth solutions."
          items={financialFaqs}
        />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Speak to a Senior Financial Architect</h2>
          <p>Schedule a confidential consultation for customized credit structuring and portfolio guidance</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button className="btn-white">Schedule Consultation</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
