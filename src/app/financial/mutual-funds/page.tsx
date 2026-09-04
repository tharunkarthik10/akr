"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function MutualFundsPage() {
  const faqs = [
    {
      question: "What types of mutual funds can I invest in through AKR Financial?",
      answer: "We structure diversified portfolios across Global Equity Funds, Fixed Income/Sukuk Funds, Emerging Market Funds, Dividend Funds, and ESG Sustainability Funds."
    },
    {
      question: "What is Systematic Investment Planning (SIP)?",
      answer: "SIP allows investors to allocate a fixed monthly dollar or AED amount into high-performing mutual funds, benefiting from dollar-cost averaging and long-term compounding growth."
    },
    {
      question: "How are investment returns taxed for UAE residents?",
      answer: "The UAE does not levy personal income tax or capital gains tax on mutual fund investment returns for individual investors."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Mutual Funds & Wealth Management</h1>
        <p>Global Asset Allocation, Systematic Investment Plans & Portfolio Diversification</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Systematic Investment Plans (SIP)</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Automated monthly investments starting from $250/month with compounding historical returns.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Global Equity & Sukuk Funds</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Institutional access to top-tier international fund managers across US, European, Asian, and GCC markets.</p>
          </div>
        </div>

        <FAQAccordion title="Mutual Fund Investment FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Calculate Mutual Fund SIP Returns</h2>
          <p>Use our interactive mutual fund calculator to project potential growth over 5 to 25 years</p>
          <div className="guidance-actions">
            <Link href="/calculators/mutual-fund" style={{ textDecoration: 'none' }}><button className="btn-white">Open Mutual Fund Calculator</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
