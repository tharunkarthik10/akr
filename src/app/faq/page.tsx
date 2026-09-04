"use client";

import React, { useState } from 'react';
import FAQAccordion from '@/components/FAQAccordion';

export default function GeneralFAQPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'property' | 'exclusive' | 'golden-visa' | 'financial'>('all');

  const propertyFaqs = [
    {
      question: "What upfront government and registration fees apply when buying Dubai property?",
      answer: "When purchasing property in Dubai, buyers typically pay a 4% Dubai Land Department (DLD) transfer fee, AED 4,000 + 5% VAT DLD Trustee Registration fee, and a Title Deed issuance fee of AED 580. For mortgaged transactions, mortgage registration is 0.25% of the loan amount + AED 290."
    },
    {
      question: "Can foreigners and non-residents buy freehold property in Dubai?",
      answer: "Yes. Non-resident individuals of any nationality can purchase 100% freehold properties in designated Dubai freehold zones (such as Downtown Dubai, Palm Jumeirah, Dubai Marina, Business Bay, Dubai Hills, and Creek Harbour)."
    },
    {
      question: "How are my payments protected when buying an Off-Plan property?",
      answer: "Dubai Law No. 8 of 2007 mandates that all off-plan developer funds must be deposited directly into a RERA-regulated Escrow Account associated specifically with that project. Funds are released to developers in stages only as verified construction milestones are achieved."
    }
  ];

  const exclusiveFaqs = [
    {
      question: "What defines an 'Exclusive Off-Market Property' at AKR Group UAE?",
      answer: "Exclusive properties are unlisted, confidential real estate assets—including triplex penthouses, private island estates, and trophy commercial buildings—offered directly by sovereign owners and elite developers without public advertising."
    },
    {
      question: "How does AKR Group maintain non-disclosure and privacy for UHNW buyers?",
      answer: "We mandate strict non-disclosure agreements (NDAs) and proof-of-funds verification prior to sharing private prospectus documentation, floor plans, or arranging confidential on-site viewings."
    }
  ];

  const goldenVisaFaqs = [
    {
      question: "What is the minimum property investment required for the UAE 10-Year Golden Visa?",
      answer: "The minimum required real estate investment threshold is AED 2,000,000 (approx. USD 545,000). You can qualify by owning one property or combining multiple properties totaling AED 2M or higher."
    },
    {
      question: "Are off-plan properties eligible for the UAE Real Estate Golden Visa?",
      answer: "Yes! Under updated UAE residency regulations, off-plan properties purchased from RERA-approved developers with an initial paid equity of AED 2,000,000 or more qualify for the 10-Year Golden Visa."
    },
    {
      question: "Does the UAE Real Estate Golden Visa sponsor my family members and domestic staff?",
      answer: "Yes, Golden Visa holders can sponsor their spouse, unmarried children of any age, and domestic helpers/drivers without restriction on the number of dependents."
    }
  ];

  const financialFaqs = [
    {
      question: "What licenses do AKR Group entities hold across the UAE?",
      answer: "AKR Realty LLC is a RERA & DLD-registered real estate brokerage in Dubai (License No. 57750). AKR Financial & Real Estate Service LLC is licensed under SHAMS, Sharjah (License No. 24286.01) for financial, real estate, and marketing advisory."
    },
    {
      question: "How does AKR assist with corporate banking and loan structuring?",
      answer: "We leverage 25+ years of senior banking relationships across top UAE and international banks to structure commercial mortgages, equity release, credit facilities, and wealth protection plans."
    }
  ];

  const getFilteredItems = () => {
    if (activeTab === 'property') return propertyFaqs;
    if (activeTab === 'exclusive') return exclusiveFaqs;
    if (activeTab === 'golden-visa') return goldenVisaFaqs;
    if (activeTab === 'financial') return financialFaqs;
    return [...propertyFaqs, ...exclusiveFaqs, ...goldenVisaFaqs, ...financialFaqs];
  };

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Header */}
      <section className="bg-gold-texture" style={{ padding: '4rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 155, 39, 0.2)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span className="section-tag inline-block" style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '1.5px', fontSize: '0.85rem' }}>
            HELP & KNOWLEDGE CENTER
          </span>
          <h1 className="font-serif" style={{ color: 'var(--primary-red)', fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem', fontWeight: 700 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto' }}>
            Comprehensive answers covering Real Estate acquisitions, Exclusive Off-Market properties, UAE Golden Visas, and Financial Advisory.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ maxWidth: '900px', margin: '2.5rem auto 0', padding: '0 1.5rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'property', label: 'Property' },
          { id: 'exclusive', label: 'Exclusive Property' },
          { id: 'golden-visa', label: 'Golden Visa' },
          { id: 'financial', label: 'Financial & Licensing' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '6px',
              border: activeTab === tab.id ? '1.5px solid var(--primary-red)' : '1px solid rgba(197, 155, 39, 0.3)',
              backgroundColor: activeTab === tab.id ? 'var(--primary-red)' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : '#333333',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* Accordion */}
      <section style={{ maxWidth: '1200px', margin: '1.5rem auto 0', padding: '0 1.5rem' }}>
        <FAQAccordion 
          items={getFilteredItems()}
        />
      </section>
    </div>
  );
}
