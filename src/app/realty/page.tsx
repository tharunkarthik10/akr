"use client";

import React from 'react';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';

export default function RealtyPage() {
  const realtyFaqs = [
    {
      question: "What licensing does AKR Realty LLC hold in the UAE?",
      answer: "AKR Realty LLC is fully registered and licensed by RERA (Real Estate Regulatory Agency) and the Dubai Land Department (DLD) under License no: 1578426, ORN no: 57750 and BRN no: 95660, located at No: 104 Sarah Building, Plot No-115-0, AL Garhoud, Dubai, United Arab Emirates. We operate in full compliance with UAE property laws."
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
      <section className="properties-hero" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', padding: '3.5rem 1.5rem 1.5rem 1.5rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-red)', marginBottom: '0.65rem' }}>
          AKR Realty LLC — Real Estate Architecture
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          RERA &amp; DLD Registered — Backed by Full UAE Regulatory Compliance.
        </p>
        <p style={{ fontSize: '1.15rem', color: '#4a4a4a', lineHeight: 1.7, maxWidth: '820px', margin: '0 auto 1.25rem auto' }}>
          From high-yield Dubai developments to private off-market estates and 10-year Golden Visa residency—we turn strategic property decisions into lasting family wealth.
        </p>
        <p style={{ fontSize: '1.2rem', color: 'var(--primary-red)', fontWeight: 700, marginBottom: '0.65rem' }}>
          Your Home. Your Investment. Your Legacy for Generations.
        </p>
        <p className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.04em' }}>
          Forward Together. For Life. For Legacy.
        </p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* Official Entity & Address Banner */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '12px', padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--primary-red)' }}>📍</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--primary-red)', fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                AKR REALTY LLC
              </div>
              <div style={{ color: '#2a2a2a', fontSize: '0.95rem', marginTop: '0.2rem', fontWeight: 500 }}>
                No: 104 Sarah Building , Plot No-115-0, AL Garhoud , Dubai , United Arab Emirates
              </div>
              <div style={{ color: 'var(--accent-gold)', fontSize: '0.82rem', marginTop: '0.25rem', fontWeight: 600 }}>
                RERA &amp; Dubai Land Department Registered | License no: 1578426 | ORN: 57750 | BRN: 95660
              </div>
            </div>
          </div>
          <div>
            <a href="tel:+971558847365" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-red)', color: '#ffffff', padding: '0.65rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              📞 Office Direct: +971 55 884 7365
            </a>
          </div>
        </div>
        
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
