"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function RealtyPage() {
  const realtyFaqs = [
    {
      question: "What licensing does AKR Realty LLC hold in the UAE?",
      answer: "AKR Realty LLC is fully registered and licensed by RERA (Real Estate Regulatory Agency) and the Dubai Land Department (DLD) under License No. 57750 & BRN 95660. We operate in full compliance with UAE property laws."
    },
    {
      question: "What is the difference between General Property and Exclusive Off-Market Property?",
      answer: "General Property listings feature active public off-plan and ready developments across Dubai. Exclusive Properties represent off-market ultra-luxury penthouses, private islands, and bespoke estates reserved confidentially for high-net-worth investors."
    },
    {
      question: "How does property investment qualify me for a UAE Golden Visa?",
      answer: "Purchasing property valued at AED 2,000,000 or higher (ready or off-plan from approved developers) qualifies the buyer, their spouse, children, and domestic staff for a 10-Year Renewable UAE Residency Golden Visa."
    },
    {
      question: "Can non-resident foreigners purchase freehold property in Dubai?",
      answer: "Yes, non-residents of any nationality can purchase 100% freehold property in designated Dubai freehold zones without requiring a local sponsor or UAE residency."
    },
    {
      question: "What are the standard transfer fees when purchasing property in Dubai?",
      answer: "Standard transaction costs include the 4% Dubai Land Department (DLD) transfer fee, AED 4,000 + VAT DLD trustee registration fee, and property valuation/mortgage registration fees (if financed)."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Hero Header */}
      <section className="properties-hero">
        <h1>AKR Realty LLC — Premium Property Advisory</h1>
        <p>RERA & Dubai Land Department Licensed Real Estate Brokerage</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* 3 Main Pillars / Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Pillar 1: Property */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(128, 0, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                🏰
              </div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Property Listings
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Explore investment-grade ready and off-plan residential and commercial developments across Dubai&apos;s prime locations.
              </p>
            </div>
            <Link href="/property" className="btn-hero-secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Explore Properties →
            </Link>
          </div>

          {/* Pillar 2: Exclusive Property */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1.5px solid var(--accent-gold)', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(197, 155, 39, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                👑
              </div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                Exclusive Property
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Confidential off-market penthouses, beachfront estates, and private islands reserved for UHNW buyers and institutional funds.
              </p>
            </div>
            <Link href="/realty/exclusive-property" className="btn-hero-secondary" style={{ textDecoration: 'none', textAlign: 'center', backgroundColor: 'var(--primary-red)', color: '#FFF' }}>
              View Exclusive Assets →
            </Link>
          </div>

          {/* Pillar 3: Golden Visa */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(128, 0, 0, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                📜
              </div>
              <h3 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                UAE Golden Visa
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Secure 10-Year UAE Residency through property investments of AED 2M+. Complete legal, valuation, and visa processing support.
              </p>
            </div>
            <Link href="/realty/golden-visa" className="btn-hero-secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Golden Visa Guide →
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <FAQAccordion 
          title="AKR Realty — Frequently Asked Questions" 
          subtitle="Essential insights into Dubai property purchases, off-market investments, and legal regulations."
          items={realtyFaqs}
        />

      </div>
    </div>
  );
}
