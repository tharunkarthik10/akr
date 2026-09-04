"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function GeneralInsurancePage() {
  const faqs = [
    {
      question: "What types of general insurance policies does AKR Financial structure?",
      answer: "We structure Commercial Property Insurance, Business Interruption, Professional Indemnity, Group Health Insurance, Cyber Liability, and Marine & Transit coverage."
    },
    {
      question: "Is corporate employee health insurance mandatory in Dubai and the UAE?",
      answer: "Yes, Dubai Health Authority (DHA) and Abu Dhabi Department of Health (DOH) regulations mandate that all employers must provide compliant health insurance coverage for their employees."
    },
    {
      question: "How does AKR assist during corporate insurance claims?",
      answer: "Our dedicated claims management team provides full documentation support, loss adjuster liaison, and claims settlement advocacy."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>General & Commercial Insurance Advisory</h1>
        <p>Corporate Risk Protection, Property Loss & Employee Health Solutions</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Corporate Risk Protection</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Property, liability, cyber threat, and business interruption coverage tailored to enterprise operations.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Group Health & Medical</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>DHA-compliant group health plans for SME and large enterprise workforces across the UAE.</p>
          </div>
        </div>

        <FAQAccordion title="General Insurance FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Request a Corporate Insurance Audit</h2>
          <p>Get a comprehensive review of your existing corporate policies to optimize coverage and lower premiums</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Request Policy Quote</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
