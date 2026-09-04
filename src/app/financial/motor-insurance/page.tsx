"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function MotorInsurancePage() {
  const faqs = [
    {
      question: "What is the difference between Comprehensive Motor Insurance and Third-Party Liability?",
      answer: "Third-Party Liability covers damage caused to other vehicles and property. Comprehensive Motor Insurance covers damage to your own vehicle, theft, fire, agency repairs, and third-party liabilities."
    },
    {
      question: "Can I get Agency Repair coverage for luxury and supercar vehicles?",
      answer: "Yes! We specialize in executive agency repair policies for luxury sedans, sports cars, and commercial fleets across the UAE."
    },
    {
      question: "How does No Claims Discount (NCD) reduce motor insurance premiums?",
      answer: "Maintaining a claim-free driving record earns an official NCD certificate from the UAE Insurance Authority, reducing annual renewal premiums by up to 20% to 30%."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Motor & Fleet Insurance Advisory</h1>
        <p>Comprehensive Auto Protection, Luxury Vehicle Agency Repair & Fleet Management</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Comprehensive Agency Repair</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Premium coverage including manufacturer agency repair, roadside assistance, and replacement vehicle benefit.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Commercial Fleet Coverage</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Discounted fleet policies for corporate logistics, car rental operators, and commercial transport fleets.</p>
          </div>
        </div>

        <FAQAccordion title="Motor Insurance FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Instant Motor Insurance Quotation</h2>
          <p>Provide your vehicle registration details to receive competitive instant quotes from top UAE insurers</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Get Instant Quote</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
