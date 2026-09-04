"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function LifeInsurancePage() {
  const faqs = [
    {
      question: "What is the difference between Term Life Insurance and Whole Life Insurance?",
      answer: "Term Life Insurance provides pure death benefit protection over a fixed period (e.g. 10 to 30 years) at lower premium costs. Whole Life Insurance combines lifelong coverage with a cash value investment growth component."
    },
    {
      question: "What is Keyman Insurance for businesses?",
      answer: "Keyman Insurance protects a business against financial losses resulting from the death or disability of crucial executives, founders, or key decision-makers."
    },
    {
      question: "Are life insurance proceeds tax-free in the UAE?",
      answer: "Yes. Life insurance payout benefits paid to designated beneficiaries are generally tax-free under UAE law."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Life Insurance & Wealth Protection</h1>
        <p>Family Financial Security, Keyman Protection & Critical Illness Coverage</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Term & Whole Life Coverage</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Guaranteed financial security for your family, mortgage protection, and wealth legacy planning.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Corporate Keyman Insurance</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Safeguard business continuity and partner equity in the event of unforeseen executive loss.</p>
          </div>
        </div>

        <FAQAccordion title="Life Insurance FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Protect Your Family & Business Legacy</h2>
          <p>Consult with our licensed insurance specialists for a tailored protection roadmap</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Schedule Life Insurance Review</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
