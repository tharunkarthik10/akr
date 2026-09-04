"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function BankingAdvisoryPage() {
  const faqs = [
    {
      question: "What corporate banking account opening assistance does AKR Financial offer?",
      answer: "We facilitate corporate bank account setup for mainland, freezone, and offshore companies across Tier-1 UAE banks (including Emirates NBD, FAB, Mashreq, and RAKBANK) with full KYC compliance."
    },
    {
      question: "What private banking services are available for HNWIs?",
      answer: "High-Net-Worth Individuals (HNWIs) gain access to dedicated relationship managers, multi-currency accounts, international treasury products, and customized wealth structuring."
    },
    {
      question: "How long does corporate bank account opening take in the UAE?",
      answer: "With AKR Financial's compliance pre-screening and relationship managers, corporate bank account approvals typically take 2 to 4 weeks depending on business activity and ownership complexity."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Banking Advisory & Account Structuring</h1>
        <p>Corporate & Private Banking Facilitation across Tier-1 UAE Banking Institutions</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Corporate Banking Accounts</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Fast-tracked account opening for mainland and freezone trade entities with dedicated bankers.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Private Banking & Treasury</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Bespoke treasury management, liquidity management, and international currency hedging facilities.</p>
          </div>
        </div>

        <FAQAccordion title="Banking Advisory FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Need Corporate Banking Facilitation?</h2>
          <p>Speak with our banking advisors to review your business KYC profile and initiate bank account setup</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Book Banking Consultation</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
