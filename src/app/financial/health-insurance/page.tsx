"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function HealthInsurancePage() {
  const faqs = [
    {
      question: "Is health insurance mandatory for all residents and dependents in Dubai?",
      answer: "Yes, Dubai Health Authority (DHA) and Abu Dhabi Department of Health (DOH) regulations legally require every resident, employee, and dependent to maintain compliant health insurance coverage."
    },
    {
      question: "What is included in comprehensive private health insurance plans in the UAE?",
      answer: "Comprehensive plans offer worldwide or regional inpatient hospital care, outpatient consultations, prescribed medicines, maternity benefits, dental care, optical protection, and emergency evacuation."
    },
    {
      question: "Can pre-existing medical conditions be covered under individual or family health plans?",
      answer: "Yes. Depending on the underwriting scheme and policy terms, pre-existing conditions can be covered either immediately or after standard waiting periods."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Health & Medical Insurance Advisory</h1>
        <p>Comprehensive DHA/DOH Compliant Medical Coverage for Families, Expats & Enterprise Workforce</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Individual & Family Health Plans</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Tier-1 hospital network access, outpatient care, emergency coverage, and international medical protection for UAE residents.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Group & Corporate Health Insurance</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>DHA and DOH compliant corporate group medical solutions tailored to SMEs, enterprise workforces, and executive leadership.</p>
          </div>
        </div>

        <FAQAccordion title="Health Insurance FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Find the Right Health Insurance Plan</h2>
          <p>Get instant medical insurance quotes for your family or corporate workforce from top-rated UAE insurers</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Request Health Quote</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
