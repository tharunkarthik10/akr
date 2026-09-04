"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function ChildEducationPage() {
  const faqs = [
    {
      question: "Why is specialized Child Education Planning essential for expat parents?",
      answer: "Higher education inflation averages 6% to 8% annually. A structured education plan ensures adequate tuition, accommodation, and living fund accumulation for UK, US, European, or Australian universities without disrupting retirement savings."
    },
    {
      question: "What happens if the parent/breadwinner passes away before the fund matures?",
      answer: "Our education plans incorporate waiver-of-premium riders. In the event of parent death or total disability, future premiums are waived by the insurer, guaranteeing full target payout at university entry age."
    },
    {
      question: "At what age should I start a Child Education Plan?",
      answer: "Starting early (from birth or early childhood) maximizes the power of compound interest, dramatically reducing required monthly contributions."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Child Higher Education Planning</h1>
        <p>Guaranteed University Funds, Education Inflation Protection & Trustee Structuring</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Guaranteed University Corpus</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Targeted capital accumulation for undergraduate and postgraduate studies worldwide with inflation adjustments.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Payer Death & Waiver Rider</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Ensures full target education fund payout regardless of unforeseen family breadwinner loss.</p>
          </div>
        </div>

        <FAQAccordion title="Child Education Planning FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Project Future University Costs</h2>
          <p>Use our interactive child education calculator to compute target corpus requirements</p>
          <div className="guidance-actions">
            <Link href="/calculators/child-education" style={{ textDecoration: 'none' }}><button className="btn-white">Open Education Calculator</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
