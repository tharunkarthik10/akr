"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function PersonalLoanPage() {
  const faqs = [
    {
      question: "What is the maximum personal loan amount I can borrow in the UAE?",
      answer: "Under UAE Central Bank regulations, personal loans can be approved up to 20 times your gross monthly salary, up to a maximum limit of AED 4,000,000 for qualifying UAE Nationals and expats."
    },
    {
      question: "What interest rates apply to UAE personal loans?",
      answer: "Flat interest rates range between 2.55% to 4.50% (reducing rates approximately 4.75% to 8.25%), depending on employer listing status, salary level, and credit score."
    },
    {
      question: "Can I consolidate existing debts into a single personal loan?",
      answer: "Yes! AKR Financial offers debt consolidation solutions to buy out high-interest credit cards and multiple smaller loans into a single lower-interest monthly installment."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Personal Loan Advisory</h1>
        <p>Competitive Interest Rates & Tailored Personal Finance for UAE Expats & Nationals</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Salary Transfer Loans</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Lowest profit rates up to 20x monthly salary with flexible repayment terms up to 48 months.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Debt Consolidation Buyout</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Streamline multiple card balances into a single manageable installment, reducing interest burdens.</p>
          </div>
        </div>

        <FAQAccordion title="Personal Loan FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Check Personal Loan Eligibility</h2>
          <p>Contact our loan specialists to calculate your borrowing capacity and get pre-approved</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Calculate Eligibility</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
