"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function MortgageLoanPage() {
  const faqs = [
    {
      question: "What is the maximum LTV (Loan-To-Value) ratio for UAE property mortgages?",
      answer: "First-time expat buyers can secure up to 80% LTV on properties under AED 5M (75% for properties above AED 5M). UAE Nationals qualify for up to 85% LTV. Non-resident international buyers can access up to 50% - 60% LTV."
    },
    {
      question: "What is the maximum mortgage tenure in the UAE?",
      answer: "The maximum loan tenure in the UAE is 25 years (or up to age 65 for salaried expats and age 70 for self-employed individuals)."
    },
    {
      question: "Can I refinance an existing property mortgage to get a lower rate or equity release?",
      answer: "Yes! Mortgage buyout and equity release programs allow property owners to refinance existing loans at lower fixed rates or release capital against paid-up property equity."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Mortgage Loan & Equity Release Advisory</h1>
        <p>Residential, Commercial & Non-Resident Mortgage Structuring</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Residential Home Loans</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Fixed and variable rate mortgages for primary residences, secondary holiday homes, and investment properties.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Equity Release & Buyouts</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Unlock liquidity from existing real estate equity or refinance high-rate mortgages with preferred bank rates.</p>
          </div>
        </div>

        <FAQAccordion title="Mortgage Loan FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Calculate Your Monthly Mortgage Repayments</h2>
          <p>Use our interactive mortgage calculator or speak with an accredited mortgage broker</p>
          <div className="guidance-actions">
            <Link href="/calculators/mortgage" style={{ textDecoration: 'none' }}><button className="btn-white">Open Mortgage Calculator</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
