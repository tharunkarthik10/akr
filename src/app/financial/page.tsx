"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function FinancialPage() {
  const financialFaqs = [
    {
      question: "What licenses does AKR Financial & Real Estate Service LLC hold?",
      answer: "AKR Financial & Real Estate Service LLC is registered under SHAMS, Sharjah (License No. 24286.01). We provide independent financial, loan structuring, investment advisory, and enterprise risk management services."
    },
    {
      question: "Which UAE banking partners does AKR Group work with?",
      answer: "We maintain 25+ years of strategic relationships across major UAE Tier-1 banks and international private banking institutions to secure preferred lending rates, fast-track approvals, and corporate facilities."
    },
    {
      question: "Can non-resident expats apply for loans or bank accounts through AKR Financial?",
      answer: "Yes. We specialize in non-resident mortgage structuring, international wealth accounts, and cross-border commercial credit for non-resident investors and global enterprise owners."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>AKR Financial — Strategic Wealth & Credit Advisory</h1>
        <p>SHAMS Sharjah Licensed Independent Financial Advisory</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* Category Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Card 1: Loans & Credit */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem' }}>💳</div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Loans & Credit Advisory
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Competitive interest rates and structured approval frameworks for Credit Lines, Personal Finance, and Mortgages.
              </p>
              <ul style={{ paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><Link href="/financial/credit-loan" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Credit Loans & Cards →</Link></li>
                <li><Link href="/financial/personal-loan" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Personal Loans →</Link></li>
                <li><Link href="/financial/mortgage-loan" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Mortgage Loans →</Link></li>
              </ul>
            </div>
          </div>

          {/* Card 2: Banking & Wealth */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>🏛️</div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Banking & Investments
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Institutional private banking, mutual fund portfolio optimization, and long-term child education wealth planning.
              </p>
              <ul style={{ paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><Link href="/financial/banking" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Banking Advisory →</Link></li>
                <li><Link href="/financial/mutual-funds" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Mutual Funds →</Link></li>
                <li><Link href="/financial/child-education" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight: 600 }}>Child Education Planning →</Link></li>
              </ul>
            </div>
          </div>

          {/* Card 3: Insurance Solutions */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem' }}>🛡️</div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Insurance & Risk Protection
              </h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                End-to-end protection for corporate assets, keyman life insurance, and comprehensive motor fleet policies across UAE.
              </p>
              <ul style={{ paddingLeft: '1.2rem', color: '#555', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li><Link href="/financial/insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight 600 }}>General Insurance →</Link></li>
                <li><Link href="/financial/life-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight 600 }}>Life Insurance →</Link></li>
                <li><Link href="/financial/motor-insurance" style={{ color: 'var(--primary-red)', textDecoration: 'none', fontWeight 600 }}>Motor Insurance →</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* FAQs */}
        <FAQAccordion 
          title="AKR Financial — Frequently Asked Questions"
          subtitle="Essential insights into UAE loan structuring, banking compliance, and wealth management."
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
