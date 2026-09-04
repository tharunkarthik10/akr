"use client";

import React, { useState } from 'react';
import FAQAccordion from '@/components/FAQAccordion';

export default function FinancialFAQPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'loans' | 'banking' | 'insurance'>('all');

  const loanFaqs = [
    {
      question: "What is the maximum personal loan amount I can borrow in the UAE?",
      answer: "Under UAE Central Bank regulations, personal loans can be approved up to 20 times your gross monthly salary, up to a maximum limit of AED 4,000,000 for qualifying UAE Nationals and expats."
    },
    {
      question: "What is the maximum LTV ratio for UAE property mortgages?",
      answer: "First-time expat buyers can secure up to 80% LTV on properties under AED 5M (75% above AED 5M). UAE Nationals qualify for up to 85% LTV. Non-resident international buyers can access up to 50% - 60% LTV."
    },
    {
      question: "Can I consolidate existing debts into a single personal loan?",
      answer: "Yes! AKR Financial offers debt consolidation solutions to buy out high-interest credit cards and multiple smaller loans into a single lower-interest monthly installment."
    }
  ];

  const bankingFaqs = [
    {
      question: "What corporate banking account opening assistance does AKR Financial offer?",
      answer: "We facilitate corporate bank account setup for mainland, freezone, and offshore companies across Tier-1 UAE banks (including Emirates NBD, FAB, Mashreq, and RAKBANK) with full KYC compliance."
    },
    {
      question: "What licenses does AKR Financial & Real Estate Service LLC hold?",
      answer: "AKR Financial & Real Estate Service LLC is registered under SHAMS, Sharjah (License No. 24286.01). We provide independent financial, loan structuring, investment advisory, and enterprise risk management services."
    }
  ];

  const insuranceFaqs = [
    {
      question: "What is Keyman Insurance for businesses?",
      answer: "Keyman Insurance protects a business against financial losses resulting from the death or disability of crucial executives, founders, or key decision-makers."
    },
    {
      question: "Is corporate employee health insurance mandatory in Dubai and the UAE?",
      answer: "Yes, Dubai Health Authority (DHA) and Abu Dhabi Department of Health (DOH) regulations mandate that all employers must provide compliant health insurance coverage for their employees."
    }
  ];

  const getFilteredItems = () => {
    if (activeTab === 'loans') return loanFaqs;
    if (activeTab === 'banking') return bankingFaqs;
    if (activeTab === 'insurance') return insuranceFaqs;
    return [...loanFaqs, ...bankingFaqs, ...insuranceFaqs];
  };

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section className="properties-hero">
        <h1>AKR Financial — Knowledge & FAQ Hub</h1>
        <p>Complete Credit, Banking, Insurance & Investment Advisory Guidance</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'loans', label: 'Loans & Credit' },
            { id: 'banking', label: 'Banking & Wealth' },
            { id: 'insurance', label: 'Insurance' },
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

        <FAQAccordion items={getFilteredItems()} />
      </div>
    </div>
  );
}
