"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function GoldenVisaPage() {
  const goldenVisaFaqs = [
    {
      question: "What is the minimum property investment required for the UAE 10-Year Golden Visa?",
      answer: "The minimum required real estate investment threshold is AED 2,000,000 (approx. USD 545,000). You can qualify by owning one property or combining multiple properties totaling AED 2M or higher."
    },
    {
      question: "Are off-plan properties eligible for the UAE Real Estate Golden Visa?",
      answer: "Yes! Under updated UAE residency regulations, off-plan properties purchased from RERA-approved developers with an initial paid equity of AED 2,000,000 or more (verified via official Oqood registration) qualify for the 10-Year Golden Visa."
    },
    {
      question: "Can I obtain a Golden Visa if my property is mortgaged?",
      answer: "Yes, mortgaged properties are eligible provided that the total property purchase value is AED 2,000,000 or more, and a No Objection Certificate (NOC) or bank statement confirming equity is submitted."
    },
    {
      question: "Does the UAE Real Estate Golden Visa sponsor my family members and domestic staff?",
      answer: "Yes, Golden Visa holders can sponsor their spouse, unmarried children of any age, and domestic helpers/drivers without restriction on the number of dependents."
    },
    {
      question: "Is there a requirement to stay in the UAE to keep the Golden Visa active?",
      answer: "No. Unlike standard UAE residency visas that expire if you remain outside the UAE for more than 6 months, Golden Visa holders can stay outside the UAE for any duration without invalidating their visa status."
    },
    {
      question: "How long does the complete Golden Visa application process take with AKR Group?",
      answer: "With AKR Realty's end-to-end guidance (including property valuation, DLD title deed verification, medical fitness check, and Emirates ID processing), the complete visa issuance typically takes between 7 to 14 business days."
    }
  ];

  const steps = [
    { num: "01", title: "Property Selection & Title Deed", desc: "Identify or combine qualifying freehold properties in Dubai totaling AED 2,000,000+." },
    { num: "02", title: "DLD & Valuation Certificate", desc: "Obtain official Dubai Land Department (DLD) property valuation and Golden Visa NOC clearance." },
    { num: "03", title: "Medical Check & VIP Processing", desc: "Complete VIP medical fitness test and biometric capture for 10-Year Emirates ID issuance." },
    { num: "04", title: "Family & Dependent Sponsorship", desc: "Extend 10-Year Golden Residency permits to spouse, children, and domestic staff." }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Hero Section */}
      <section className="properties-hero">
        <h1>UAE Real Estate Golden Visa Advisory</h1>
        <p>10-Year Long-Term UAE Residency for Investors & Families</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* Highlights Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '0.5rem' }}>🏛️</div>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>AED 2M Threshold</h3>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: '1.6' }}>Qualify with single or combined ready & off-plan properties registered with Dubai Land Department.</p>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>👨‍👩‍👧‍👦</div>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Full Family Coverage</h3>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: '1.6' }}>Sponsor spouse, sons & daughters (unmarried, any age), plus senior drivers & domestic staff.</p>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '0.5rem' }}>✈️</div>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Zero Travel Limit</h3>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: '1.6' }}>No minimum stay requirement inside the UAE; maintain full residency while traveling globally.</p>
          </div>

          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '8px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>📑</div>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>VIP Fast-Track</h3>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: '1.6' }}>AKR Realty manages property valuation, DLD clearance, medical screening, and Emirates ID issuance.</p>
          </div>
        </div>

        {/* Step by Step Process */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag inline-block">STREAMLINED ROADMAP</span>
            <h2 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '2rem', marginTop: '0.5rem', fontWeight: 700 }}>
              How to Acquire Your Golden Visa with AKR
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {steps.map((s, idx) => (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eaeaea', borderLeftWidth: '4px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-red)' }}>{s.num}</span>
                <h4 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.15rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{s.title}</h4>
                <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Visa FAQs */}
        <FAQAccordion 
          title="UAE Golden Visa — Frequently Asked Questions"
          subtitle="Detailed guidelines on eligibility thresholds, off-plan rules, mortgaged property conditions, and family residency."
          items={goldenVisaFaqs}
        />

        {/* Banner */}
        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Ready to Secure Your 10-Year UAE Residency?</h2>
          <p>Contact AKR Realty for end-to-end property valuation, DLD filing, and VIP Golden Visa processing</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button className="btn-white">
                Speak to Golden Visa Specialist
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
