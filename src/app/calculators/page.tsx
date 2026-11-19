"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ModernMortgageCalculator from '@/components/calculator/ModernMortgageCalculator';
import ModernXirrCalculator from '@/components/calculator/ModernXirrCalculator';
import ModernMutualFundCalculator from '@/components/calculator/ModernMutualFundCalculator';
import ModernChildEducationCalculator from '@/components/calculator/ModernChildEducationCalculator';
import ModernRetirementCalculator from '@/components/calculator/ModernRetirementCalculator';
import ModernOffPlanCalculator from '@/components/calculator/ModernOffPlanCalculator';
import ModernRentalYieldCalculator from '@/components/calculator/ModernRentalYieldCalculator';

export default function CalculatorsLandingPage() {
  const [activeTab, setActiveTab] = useState<string>("mortgage");
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });

  const scrollToCalculator = (tabKey: string) => {
    setActiveTab(tabKey);
    const element = document.getElementById("calculator-tools");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${leadForm.name || 'Valued Client'}! Your detailed report has been sent to ${leadForm.email || 'your email'}.`);
    setLeadModalOpen(false);
    setLeadForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="calc-landing-page">
      {/* 1. HERO SECTION */}
      <section className="calc-hero-section">
        <div className="calc-hero-bg">
          <img src="/banner.jpg" alt="Dubai Penthouse View" />
          <div className="calc-hero-gradient"></div>
        </div>

        <div className="calc-hero-content">
          <div className="calc-hero-text-block">
            <h1 className="calc-hero-eyebrow">Universal Strategic</h1>
            <h2 className="calc-hero-title">
              Real Estate Investment &amp;<br />
              Financial Planning Calculators
            </h2>
            <h3 className="calc-hero-sub-investors">
              for UAE Residents &amp; Global Investors
            </h3>
            <p className="calc-hero-description">
              Mortgage, ROI, rental yield ROI, off-plan, XIRR, insurance, mutual fund, education and retirement calculators — designed for UAE real estate and global investment planning.
            </p>
            <div className="calc-hero-btns">
              <button
                onClick={() => scrollToCalculator("mortgage")}
                className="btn-calc-explore"
              >
                Explore Calculators
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <Link href="/contact" className="btn-calc-consult">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Consult an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST RIBBON */}
      <section className="calc-trust-ribbon">
        <div className="calc-trust-grid">
          <div className="calc-trust-item">
            <svg className="calc-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div className="calc-trust-text">
              <div className="title">UAE Focused</div>
              <div className="sub">Insights &amp; Data</div>
            </div>
          </div>

          <div className="calc-trust-item">
            <svg className="calc-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <div className="calc-trust-text">
              <div className="title">Trusted by</div>
              <div className="sub">Investors</div>
            </div>
          </div>

          <div className="calc-trust-item">
            <svg className="calc-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <div className="calc-trust-text">
              <div className="title">Accurate</div>
              <div className="sub">Financial Models</div>
            </div>
          </div>

          <div className="calc-trust-item">
            <svg className="calc-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div className="calc-trust-text">
              <div className="title">Secure &amp;</div>
              <div className="sub">Confidential</div>
            </div>
          </div>

          <div className="calc-trust-item">
            <svg className="calc-trust-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <div className="calc-trust-text">
              <div className="title">Expert</div>
              <div className="sub">Financial Guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POWERFUL CALCULATORS SECTION */}
      <section className="calc-grid-section">
        <div className="calc-section-header">
          <h2 className="calc-section-title">Powerful Calculators for Smart Financial Decisions</h2>
          <p className="calc-section-subtitle">Plan better. Invest smarter. Build your financial future with confidence.</p>
        </div>

        <div className="calc-cards-grid">
          {/* Card 1: Mortgage */}
          <div
            onClick={() => scrollToCalculator("mortgage")}
            className={`calc-feature-card ${activeTab === 'mortgage' ? 'gold-highlight' : ''}`}
          >
            <span className="calc-card-pop-badge">Most Popular</span>
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h3 className="calc-card-name">Mortgage Calculator</h3>
            <p className="calc-card-desc">Calculate monthly mortgage payments, interest and total cost.</p>
            <div className={`calc-card-action-btn ${activeTab === 'mortgage' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 2: Off-Plan */}
          <div
            onClick={() => scrollToCalculator("offplan")}
            className={`calc-feature-card ${activeTab === 'offplan' ? 'gold-highlight' : ''}`}
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
              <path d="M10 6h4"></path>
              <path d="M10 10h4"></path>
              <path d="M10 14h4"></path>
              <path d="M10 18h4"></path>
            </svg>
            <h3 className="calc-card-name">Off-Plan Calculator</h3>
            <p className="calc-card-desc">Evaluate off-plan projects and calculate potential returns and risks.</p>
            <div className={`calc-card-action-btn ${activeTab === 'offplan' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 3: Rental Yield ROI */}
          <div
            onClick={() => scrollToCalculator("rental")}
            className={`calc-feature-card ${activeTab === 'rental' ? 'gold-highlight' : ''}`}
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" x2="5" y1="5" y2="19"></line>
              <circle cx="6.5" cy="6.5" r="2.5"></circle>
              <circle cx="17.5" cy="17.5" r="2.5"></circle>
            </svg>
            <h3 className="calc-card-name">Rental Yield ROI Calculator</h3>
            <p className="calc-card-desc">Calculate rental yield and ROI to analyze property income returns.</p>
            <div className={`calc-card-action-btn ${activeTab === 'rental' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 4: XIRR */}
          <div
            onClick={() => scrollToCalculator("roi")}
            className={`calc-feature-card ${activeTab === 'roi' ? 'gold-highlight' : ''}`}
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <h3 className="calc-card-name">XIRR Calculator</h3>
            <p className="calc-card-desc">Calculate extended internal rate of return for your investments.</p>
            <div className={`calc-card-action-btn ${activeTab === 'roi' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 5: Mutual Fund */}
          <div
            onClick={() => scrollToCalculator("mutual")}
            className={`calc-feature-card ${activeTab === 'mutual' ? 'gold-highlight' : ''}`}
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            <h3 className="calc-card-name">Mutual Fund Calculator</h3>
            <p className="calc-card-desc">Plan and project your mutual fund returns and corpus value over time.</p>
            <div className={`calc-card-action-btn ${activeTab === 'mutual' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 6: Child Education */}
          <div
            onClick={() => scrollToCalculator("education")}
            className={`calc-feature-card ${activeTab === 'education' ? 'gold-highlight' : ''}`}
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg>
            <h3 className="calc-card-name">Child Education Calculator</h3>
            <p className="calc-card-desc">Plan your child's education and estimate future expenses.</p>
            <div className={`calc-card-action-btn ${activeTab === 'education' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 7: Retirement */}
          <div
            onClick={() => scrollToCalculator("retirement")}
            className={`calc-feature-card ${activeTab === 'retirement' ? 'gold-highlight' : ''}`}
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12a10.06 10.06 10.06 0 0 0-20 0Z"></path>
              <path d="M12 12v8a2 2 0 0 0 4 0"></path>
              <path d="M12 2v1"></path>
            </svg>
            <h3 className="calc-card-name">Retirement Calculator</h3>
            <p className="calc-card-desc">Plan your retirement corpus and monthly income needs.</p>
            <div className={`calc-card-action-btn ${activeTab === 'retirement' ? 'gold-btn' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 8: Need Expert Guidance */}
          <div className="calc-guidance-card">
            <h3 className="calc-guidance-title">Need Expert Guidance?</h3>
            <p className="calc-guidance-desc">Talk to our financial experts for personalized advice.</p>
            <Link href="/contact" className="calc-guidance-btn">
              <span>Book Free Consultation</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CALCULATOR SECTION WITH TABS */}
      <section id="calculator-tools" className="calc-interactive-wrapper">
        <div className="calc-nav-tabs-bar">
          <button
            onClick={() => setActiveTab("mortgage")}
            className={`calc-tab-pill-btn ${activeTab === 'mortgage' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="16" height="20" x="4" y="2" rx="2"></rect>
              <line x1="8" x2="16" y1="6" y2="6"></line>
              <line x1="16" x2="16" y1="14" y2="18"></line>
              <path d="M16 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M8 18h.01"></path>
            </svg>
            Mortgage
          </button>

          <button
            onClick={() => setActiveTab("roi")}
            className={`calc-tab-pill-btn ${activeTab === 'roi' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            ROI (XIRR)
          </button>

          <button
            onClick={() => setActiveTab("mutual")}
            className={`calc-tab-pill-btn ${activeTab === 'mutual' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            Mutual Fund
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`calc-tab-pill-btn ${activeTab === 'education' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg>
            Child Education
          </button>

          <button
            onClick={() => setActiveTab("retirement")}
            className={`calc-tab-pill-btn ${activeTab === 'retirement' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12a10.06 10.06 10.06 0 0 0-20 0Z"></path>
              <path d="M12 12v8a2 2 0 0 0 4 0"></path>
              <path d="M12 2v1"></path>
            </svg>
            Retirement
          </button>

          <button
            onClick={() => setActiveTab("offplan")}
            className={`calc-tab-pill-btn ${activeTab === 'offplan' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
            </svg>
            Off-Plan
          </button>

          <button
            onClick={() => setActiveTab("rental")}
            className={`calc-tab-pill-btn ${activeTab === 'rental' ? 'active' : ''}`}
          >
            <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" x2="5" y1="5" y2="19"></line>
              <circle cx="6.5" cy="6.5" r="2.5"></circle>
              <circle cx="17.5" cy="17.5" r="2.5"></circle>
            </svg>
            Rental Yield
          </button>
        </div>

        {/* ACTIVE CALCULATOR PANEL */}
        <div className="calc-main-panel-card">
          {activeTab === "mortgage" && (
            <ModernMortgageCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
          {activeTab === "roi" && (
            <ModernXirrCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
          {activeTab === "mutual" && (
            <ModernMutualFundCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
          {activeTab === "education" && (
            <ModernChildEducationCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
          {activeTab === "retirement" && (
            <ModernRetirementCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
          {activeTab === "offplan" && (
            <ModernOffPlanCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
          {activeTab === "rental" && (
            <ModernRentalYieldCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
          )}
        </div>

        {/* 5. IMPORTANT DISCLAIMER */}
        <div className="calc-disclaimer-box">
          <div className="calc-disclaimer-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Important Disclaimer
          </div>
          <div className="calc-disclaimer-text">
            <p>
              <strong style={{ color: '#b8962c' }}>AKR Financial &amp; Real Estate Service LLC</strong> (Sharjah) and{' '}
              <strong style={{ color: '#b8962c' }}>AKR Realty LLC</strong> (Dubai) operate as independent, non-custodial advisory entities across the UAE, in line with applicable UAE Central Bank, Insurance Authority, and Real Estate Regulatory Agency (RERA) guidance.
            </p>
            <p>
              All calculator results are for <strong>illustrative and educational purposes only</strong> and do not constitute financial, investment, tax, or real estate advice. Results are indicative estimates based on the figures you enter and do not guarantee actual future performance. Interest rates, inflation rates, service charges, government fees, rental yields, and property appreciation may vary based on market conditions, lender or developer policies, and individual circumstances.
            </p>
            <p>
              For personalized, regulation-compliant advice, please consult one of our licensed advisors before making any financial or real estate decision.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM VALUE PROPS STRIP */}
      <section className="calc-bottom-value-props">
        <div className="calc-bottom-value-grid">
          <div className="calc-bottom-val-item">
            <svg className="calc-bottom-val-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
            <div className="calc-bottom-val-text">
              <div className="t1">Data-Driven</div>
              <div className="t2">Calculations</div>
            </div>
          </div>

          <div className="calc-bottom-val-item">
            <svg className="calc-bottom-val-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
            </svg>
            <div className="calc-bottom-val-text">
              <div className="t1">UAE Market</div>
              <div className="t2">Insights</div>
            </div>
          </div>

          <div className="calc-bottom-val-item">
            <svg className="calc-bottom-val-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div className="calc-bottom-val-text">
              <div className="t1">Global Investment</div>
              <div className="t2">Perspective</div>
            </div>
          </div>

          <div className="calc-bottom-val-item">
            <svg className="calc-bottom-val-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div className="calc-bottom-val-text">
              <div className="t1">100% Secure</div>
              <div className="t2">&amp; Private</div>
            </div>
          </div>

          <div className="calc-bottom-val-item">
            <svg className="calc-bottom-val-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <div className="calc-bottom-val-text">
              <div className="t1">Trusted by Thousands</div>
              <div className="t2">of Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE MODAL */}
      {leadModalOpen && (
        <div className="calc-modal-backdrop" onClick={() => setLeadModalOpen(false)}>
          <div className="calc-modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="calc-modal-title">Get Your Detailed Report</h3>
            <p className="calc-modal-desc">Enter your details to receive a comprehensive investment report via email.</p>
            <form onSubmit={handleLeadSubmit}>
              <div className="calc-form-group">
                <label className="calc-field-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="calc-field-input"
                  value={leadForm.name}
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                />
              </div>

              <div className="calc-form-group">
                <label className="calc-field-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="calc-field-input"
                  value={leadForm.email}
                  onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                />
              </div>

              <div className="calc-form-group">
                <label className="calc-field-label">Phone Number (with Country Code)</label>
                <input
                  type="tel"
                  placeholder="+971 XX XXX XXXX"
                  className="calc-field-input"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-calc-download-pdf">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                  Download Report
                </button>
                <button
                  type="button"
                  onClick={() => setLeadModalOpen(false)}
                  className="btn-calc-sub-action"
                  style={{ width: '120px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
