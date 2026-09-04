"use client";

import React, { useState } from 'react';
import FAQAccordion from '@/components/FAQAccordion';

export default function RealtyFAQPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'property' | 'exclusive' | 'golden-visa'>('all');

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
    },
    {
      question: "What is the difference between Ready and Off-Plan property investments?",
      answer: "Ready properties allow immediate occupancy or rental income generation, requiring full payment or standard mortgage financing. Off-Plan properties offer lower entry prices and flexible post-handover payment plans spanning 3 to 7 years, delivering strong capital appreciation prior to completion."
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
    },
    {
      question: "What custom services are included for Exclusive Property clients?",
      answer: "Clients receive dedicated senior partner advisory, private jet/chopper viewing transfers, bespoke legal & tax structuring, asset management, and direct developer VIP allocation access."
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
    },
    {
      question: "Is there a requirement to stay in the UAE to keep the Golden Visa active?",
      answer: "No. Unlike standard UAE residency visas that expire if you remain outside the UAE for more than 6 months, Golden Visa holders can stay outside the UAE for any duration without invalidating their visa status."
    }
  ];

  const getFilteredItems = () => {
    if (activeTab === 'property') return propertyFaqs;
    if (activeTab === 'exclusive') return exclusiveFaqs;
    if (activeTab === 'golden-visa') return goldenVisaFaqs;
    return [...propertyFaqs, ...exclusiveFaqs, ...goldenVisaFaqs];
  };

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Hero Section */}
      <section className="properties-hero">
        <h1>AKR Realty — Knowledge & FAQs</h1>
        <p>Complete Regulatory, Legal, Off-Market & Residency Answers</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'property', label: 'Property Buying' },
            { id: 'exclusive', label: 'Exclusive Off-Market' },
            { id: 'golden-visa', label: 'Golden Visa' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '6px',
                border: activeTab === tab.id ? '1.5px solid var(--primary-red)' : '1px solid #eaeaea',
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
        </div>

        {/* Accordion Component */}
        <FAQAccordion 
          items={getFilteredItems()}
        />

      </div>
    </div>
  );
}
