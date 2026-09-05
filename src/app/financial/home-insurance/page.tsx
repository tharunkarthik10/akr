"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function HomeInsurancePage() {
  const faqs = [
    {
      question: "Is home insurance mandatory for property owners and tenants in the UAE?",
      answer: "While building insurance is typically required by mortgage lenders, individual home contents and tenant liability insurance are optional but strongly recommended to protect personal belongings and fixtures."
    },
    {
      question: "What does Home Contents & Personal Property Insurance cover?",
      answer: "Home Contents insurance covers loss or damage to furniture, electronics, jewelry, artwork, and personal possessions caused by fire, water leakage, theft, or natural perils."
    },
    {
      question: "Does home insurance cover storm, flood, and water damage in Dubai?",
      answer: "Yes, standard comprehensive home insurance policies in the UAE include coverage for water damage, storm impact, flood damage, and structural emergency repairs."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>Home & Property Insurance Advisory</h1>
        <p>Villa & Apartment Structural Protection, Tenant Contents & Landlord Liability Coverage</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Homeowners & Villa Building Coverage</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Complete structural damage protection for luxury villas and residential properties against fire, storm, leakages, and accidental loss.</p>
          </div>
          <div style={{ backgroundColor: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 700 }}>Tenant Contents & Liability Insurance</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>Tailored policies covering high-value valuables, electronics, interior decor, and occupier liability for apartment and villa tenants.</p>
          </div>
        </div>

        <FAQAccordion title="Home Insurance FAQs" items={faqs} />

        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Protect Your Home & Personal Valuables</h2>
          <p>Consult with our financial architects for instant home insurance quotes tailored to your villa or apartment</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}><button className="btn-white">Get Home Insurance Quote</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
