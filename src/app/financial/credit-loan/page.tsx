"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function CreditLoanPage() {
  const faqs = [
    {
      question: "What credit loan and line facilities are available through AKR Financial?",
      answer: "We structure commercial revolving credit lines, high-limit premium credit cards, and corporate working capital facilities through leading UAE financial institutions."
    },
    {
      question: "What are the eligibility criteria for business credit lines in the UAE?",
      answer: "Applicants require an active UAE trade license (mainland or freezone) with a minimum operating history of 6 to 12 months, 6-month corporate bank statements, and valid Emirates ID/passport copies."
    },
    {
      question: "Can expats apply for high-limit credit cards?",
      answer: "Yes, salaried expats with a minimum monthly salary of AED 10,000+ or self-employed business owners can qualify for premium credit cards offering airport lounge access, cashback, and zero foreign exchange transaction fees."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Credit Loan & Credit Line Advisory</h1>
        <p>Revolving Credit Lines, Commercial Credit & High-Limit Card Facilities</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Revolving Business Credit Lines</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Flexible revolving credit up to AED 5,000,000 for inventory, expansion, and cash flow liquidity.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Executive & VIP Credit Cards</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Exclusive credit card approvals featuring low interest rates, high credit limits, and travel rewards.</p>
          </div>
        </div>

        <FAQAccordion title="Credit Loan FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Apply for Credit Facilities</h2>
          <p>Get pre-approved for flexible business and personal credit lines with preferred interest rates</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Apply Now</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
