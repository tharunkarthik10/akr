"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function MortgageInsurancePage() {
  const faqs = [
    {
      question: "Is mortgage protection insurance mandatory when taking a UAE bank loan?",
      answer: "Yes, UAE banks require mandatory property insurance and life protection insurance assigned to the bank to secure home loan facilities."
    },
    {
      question: "Can I assign my own external life insurance policy to a UAE mortgage lender?",
      answer: "Yes! Assigning an independent term life policy often saves up to 40% to 50% compared to bank-offered in-house group mortgage insurance schemes."
    },
    {
      question: "What is the difference between Mortgage Decreasing Term Insurance and Level Term Life Insurance?",
      answer: "Decreasing Term Insurance lowers the sum assured in tandem with your loan balance reduction over time, whereas Level Term Life Insurance keeps a fixed payout benefit regardless of loan balance."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Mortgage Insurance & Loan Protection</h1>
        <p>Decreasing Term Life Cover, Bank Policy Assignment & Property Liability Safeguards</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Mortgage Life Protection</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Decreasing and level term insurance policies that clear outstanding home loan liabilities upon death or total disability.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Bank Policy Assignment</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Save up to 50% on mortgage insurance costs by assigning cost-effective independent life policies to your lending bank.</p>
          </div>
        </div>

        <FAQAccordion title="Mortgage Insurance FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Optimize Your Mortgage Insurance Costs</h2>
          <p>Let our advisors evaluate your bank loan terms and lower your monthly mortgage protection costs</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Compare Mortgage Rates</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
