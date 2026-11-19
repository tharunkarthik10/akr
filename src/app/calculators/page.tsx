"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function CalculatorsLandingPage() {
  const [activeTab, setActiveTab] = useState<string>("mortgage");
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [copied, setCopied] = useState(false);

  const scrollToCalculator = (tabKey: string) => {
    setActiveTab(tabKey);
    const element = document.getElementById("calculator-tools");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Universal Strategic Calculators | AKR Group UAE',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
            className="calc-feature-card"
          >
            <span className="calc-card-pop-badge">Most Popular</span>
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h3 className="calc-card-name">Mortgage Calculator</h3>
            <p className="calc-card-desc">Calculate monthly mortgage payments, interest and total cost.</p>
            <div className="calc-card-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 2: Off-Plan */}
          <div
            onClick={() => scrollToCalculator("offplan")}
            className="calc-feature-card gold-highlight"
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
            <div className="calc-card-action-btn gold-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 3: Rental Yield ROI */}
          <div
            onClick={() => scrollToCalculator("rental")}
            className="calc-feature-card"
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" x2="5" y1="5" y2="19"></line>
              <circle cx="6.5" cy="6.5" r="2.5"></circle>
              <circle cx="17.5" cy="17.5" r="2.5"></circle>
            </svg>
            <h3 className="calc-card-name">Rental Yield ROI Calculator</h3>
            <p className="calc-card-desc">Calculate rental yield and ROI to analyze property income returns.</p>
            <div className="calc-card-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 4: XIRR */}
          <div
            onClick={() => scrollToCalculator("roi")}
            className="calc-feature-card"
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            <h3 className="calc-card-name">XIRR Calculator</h3>
            <p className="calc-card-desc">Calculate extended internal rate of return for your investments.</p>
            <div className="calc-card-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 5: Mutual Fund */}
          <div
            onClick={() => scrollToCalculator("mutual")}
            className="calc-feature-card"
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            <h3 className="calc-card-name">Mutual Fund Calculator</h3>
            <p className="calc-card-desc">Plan and project your mutual fund returns and corpus value over time.</p>
            <div className="calc-card-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 6: Child Education */}
          <div
            onClick={() => scrollToCalculator("education")}
            className="calc-feature-card"
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg>
            <h3 className="calc-card-name">Child Education Calculator</h3>
            <p className="calc-card-desc">Plan your child's education and estimate future expenses.</p>
            <div className="calc-card-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>

          {/* Card 7: Retirement */}
          <div
            onClick={() => scrollToCalculator("retirement")}
            className="calc-feature-card"
          >
            <svg className="calc-card-top-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12a10.06 10.06 10.06 0 0 0-20 0Z"></path>
              <path d="M12 12v8a2 2 0 0 0 4 0"></path>
              <path d="M12 2v1"></path>
            </svg>
            <h3 className="calc-card-name">Retirement Calculator</h3>
            <p className="calc-card-desc">Plan your retirement corpus and monthly income needs.</p>
            <div className="calc-card-action-btn">
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
            <MortgageCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
          )}
          {activeTab === "roi" && (
            <XirrCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
          )}
          {activeTab === "mutual" && (
            <MutualFundCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
          )}
          {activeTab === "education" && (
            <ChildEducationCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
          )}
          {activeTab === "retirement" && (
            <RetirementCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
          )}
          {activeTab === "offplan" && (
            <OffPlanCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
          )}
          {activeTab === "rental" && (
            <RentalYieldCalcView onShowLeadCapture={() => setLeadModalOpen(true)} onShare={handleShare} />
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

      {copied && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#8b0000',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 10000,
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   INDIVIDUAL CALCULATOR VIEWS
   ========================================================================== */

function MortgageCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(250000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [tenure, setTenure] = useState(300);
  const [monthlyInsurance, setMonthlyInsurance] = useState(150);
  const [adminFees, setAdminFees] = useState(5000);

  const [chartType, setChartType] = useState<'bar' | 'area' | 'line'>('bar');

  const principal = Math.max(0, propertyValue - downPayment);
  const monthlyRate = interestRate / 100 / 12;

  let emi = 0;
  if (monthlyRate === 0) {
    emi = tenure > 0 ? principal / tenure : 0;
  } else if (principal > 0 && tenure > 0) {
    emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  }

  const roundedEmi = Math.round(emi);
  const totalEmiPayments = roundedEmi * tenure;
  const totalPayable = totalEmiPayments + adminFees;
  const totalInterest = Math.max(0, totalEmiPayments - principal);
  const monthlyOutflow = roundedEmi + monthlyInsurance;

  const chartData = Array.from({ length: Math.min(10, Math.ceil(tenure / 12)) }, (_, idx) => {
    const year = idx + 1;
    return {
      name: `Year ${year}`,
      Principal: Math.round(roundedEmi * 12 * 0.45 * (1 + idx * 0.05)),
      Interest: Math.round(roundedEmi * 12 * 0.55 * Math.max(0.4, 1 - idx * 0.05))
    };
  });

  const downPaymentPercent = propertyValue > 0 ? ((downPayment / propertyValue) * 100).toFixed(1) : "0.0";
  const tenureYears = (tenure / 12).toFixed(1);

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">Advanced Mortgage Loan Calculator</h4>
        <p className="calc-main-panel-subtitle">Calculate your EMI with insurance and administrative charges</p>
      </div>

      <div className="calc-panel-body-grid">
        {/* Left Inputs */}
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Property Value (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={propertyValue}
              onChange={e => setPropertyValue(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Down Payment (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={downPayment}
              onChange={e => setDownPayment(Number(e.target.value))}
            />
            <div className="calc-field-hint">{downPaymentPercent}% of property value</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              className="calc-field-input"
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Loan Tenure (Months)</label>
            <input
              type="number"
              className="calc-field-input"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
            />
            <div className="calc-field-hint">{tenureYears} years</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Monthly Insurance (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={monthlyInsurance}
              onChange={e => setMonthlyInsurance(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Administrative Fees (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={adminFees}
              onChange={e => setAdminFees(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Right Results */}
        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Monthly EMI</div>
            <div className="calc-gold-hero-value">AED {roundedEmi.toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Loan Amount</div>
              <div className="calc-metric-box-value">AED {principal.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Interest</div>
              <div className="calc-metric-box-value">AED {totalInterest.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Monthly Outflow</div>
              <div className="calc-metric-box-value">AED {monthlyOutflow.toLocaleString()}</div>
              <div className="calc-metric-box-hint">EMI + Insurance</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Payable</div>
              <div className="calc-metric-box-value">AED {totalPayable.toLocaleString()}</div>
            </div>
          </div>

          {/* Chart */}
          <div className="calc-chart-box">
            <div className="calc-chart-title-bar">
              <div className="calc-chart-title">Payment Breakdown (Yearly)</div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {(['bar', 'area', 'line'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    style={{
                      padding: '0.2rem 0.55rem',
                      fontSize: '0.72rem',
                      borderRadius: '4px',
                      border: '1px solid #d4af37',
                      background: chartType === type ? '#8b0000' : '#ffffff',
                      color: chartType === type ? '#ffffff' : '#8b0000',
                      cursor: 'pointer'
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                    <Bar dataKey="Interest" stackId="a" fill="#8b0000" />
                    <Bar dataKey="Principal" stackId="a" fill="#d4af37" />
                  </BarChart>
                ) : chartType === 'area' ? (
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                    <Area type="monotone" dataKey="Interest" stackId="1" stroke="#8b0000" fill="#8b0000" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="Principal" stackId="1" stroke="#d4af37" fill="#d4af37" fillOpacity={0.6} />
                  </AreaChart>
                ) : (
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                    <Line type="monotone" dataKey="Interest" stroke="#8b0000" strokeWidth={2} dot={{ r: 2 }} />
                    <Line type="monotone" dataKey="Principal" stroke="#d4af37" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="calc-bottom-action-btns">
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>

            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Advisor
              </Link>
              <button onClick={onShare} className="btn-calc-sub-action">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function XirrCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [investmentType, setInvestmentType] = useState<"lumpsum" | "sip">("lumpsum");
  const [initialAmount, setInitialAmount] = useState(500000);
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [tenure, setTenure] = useState(10);
  const [includeRealEstate, setIncludeRealEstate] = useState(true);
  const [rentalYield, setRentalYield] = useState(6);
  const [appreciation, setAppreciation] = useState(5);

  const totalReturnRate = includeRealEstate ? (rentalYield + appreciation) : expectedReturn;
  let finalValue = 0;
  let totalInvested = 0;

  if (investmentType === "lumpsum") {
    totalInvested = initialAmount;
    finalValue = initialAmount * Math.pow(1 + totalReturnRate / 100, tenure);
  } else {
    totalInvested = initialAmount + monthlyAmount * 12 * tenure;
    const monthlyRate = totalReturnRate / 100 / 12;
    const months = tenure * 12;
    const sipFuture = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    finalValue = initialAmount * Math.pow(1 + totalReturnRate / 100, tenure) + sipFuture;
  }

  const roundedFinal = Math.round(finalValue);
  const totalWealthGenerated = Math.max(0, roundedFinal - totalInvested);

  const chartData = Array.from({ length: tenure + 1 }, (_, i) => {
    const yr = i;
    const val = investmentType === "lumpsum"
      ? initialAmount * Math.pow(1 + totalReturnRate / 100, yr)
      : initialAmount * Math.pow(1 + totalReturnRate / 100, yr) + (yr > 0 ? (monthlyAmount * ((Math.pow(1 + (totalReturnRate / 100 / 12), yr * 12) - 1) / (totalReturnRate / 100 / 12))) : 0);
    return {
      name: `Yr ${yr}`,
      Invested: investmentType === "lumpsum" ? initialAmount : initialAmount + monthlyAmount * 12 * yr,
      Returns: Math.round(Math.max(0, val - (investmentType === "lumpsum" ? initialAmount : initialAmount + monthlyAmount * 12 * yr)))
    };
  });

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">ROI &amp; Real Estate Calculator (XIRR)</h4>
        <p className="calc-main-panel-subtitle">Calculate returns for lump sum, SIP, and real estate investments</p>
      </div>

      <div className="calc-panel-body-grid">
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Investment Type</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setInvestmentType('lumpsum')}
                style={{
                  flex: 1, padding: '0.55rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: investmentType === 'lumpsum' ? '#8b0000' : '#ffffff',
                  color: investmentType === 'lumpsum' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Lump Sum
              </button>
              <button
                type="button"
                onClick={() => setInvestmentType('sip')}
                style={{
                  flex: 1, padding: '0.55rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: investmentType === 'sip' ? '#8b0000' : '#ffffff',
                  color: investmentType === 'sip' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Systematic (SIP)
              </button>
            </div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Initial Investment (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={initialAmount}
              onChange={e => setInitialAmount(Number(e.target.value))}
            />
          </div>

          {investmentType === "sip" && (
            <div className="calc-form-group">
              <label className="calc-field-label">Monthly Investment (AED)</label>
              <input
                type="number"
                className="calc-field-input"
                value={monthlyAmount}
                onChange={e => setMonthlyAmount(Number(e.target.value))}
              />
            </div>
          )}

          <div className="calc-form-group">
            <label className="calc-field-label">Investment Tenure (Years)</label>
            <input
              type="number"
              className="calc-field-input"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <input
              type="checkbox"
              id="includeRe"
              checked={includeRealEstate}
              onChange={e => setIncludeRealEstate(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#8b0000', cursor: 'pointer' }}
            />
            <label htmlFor="includeRe" className="calc-field-label" style={{ margin: 0, cursor: 'pointer' }}>
              Include Real Estate Returns (Rental + Appreciation)
            </label>
          </div>

          {includeRealEstate ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
              <div>
                <label className="calc-field-label">Rental Yield (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="calc-field-input"
                  value={rentalYield}
                  onChange={e => setRentalYield(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="calc-field-label">Capital Appreciation (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="calc-field-input"
                  value={appreciation}
                  onChange={e => setAppreciation(Number(e.target.value))}
                />
              </div>
            </div>
          ) : (
            <div className="calc-form-group">
              <label className="calc-field-label">Expected Annual Return (%)</label>
              <input
                type="number"
                step="0.1"
                className="calc-field-input"
                value={expectedReturn}
                onChange={e => setExpectedReturn(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Expected Final Value</div>
            <div className="calc-gold-hero-value">AED {roundedFinal.toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Effective Annual XIRR</div>
              <div className="calc-metric-box-value">{totalReturnRate.toFixed(1)}%</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Invested</div>
              <div className="calc-metric-box-value">AED {totalInvested.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box" style={{ gridColumn: 'span 2' }}>
              <div className="calc-metric-box-label">Total Wealth Generated</div>
              <div className="calc-metric-box-value" style={{ color: '#008000' }}>+ AED {totalWealthGenerated.toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-chart-box">
            <div className="calc-chart-title">Projected Wealth Growth</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                  <Area type="monotone" dataKey="Invested" stackId="1" stroke="#b8962c" fill="#d4af37" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="Returns" stackId="1" stroke="#8b0000" fill="#8b0000" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="calc-bottom-action-btns">
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>
            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">Call Advisor</Link>
              <button onClick={onShare} className="btn-calc-sub-action">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MutualFundCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [investmentType, setInvestmentType] = useState<"lumpsum" | "sip">("sip");
  const [amount, setAmount] = useState(50000);
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [tenure, setTenure] = useState(10);
  const [expenseRatio, setExpenseRatio] = useState(1.5);

  const netReturnRate = Math.max(0.1, expectedReturn - expenseRatio);
  let grossFinal = 0;
  let netFinal = 0;
  let totalInvested = 0;

  if (investmentType === "lumpsum") {
    totalInvested = amount;
    grossFinal = amount * Math.pow(1 + expectedReturn / 100, tenure);
    netFinal = amount * Math.pow(1 + netReturnRate / 100, tenure);
  } else {
    totalInvested = monthlyAmount * 12 * tenure;
    const grRate = expectedReturn / 100 / 12;
    const nrRate = netReturnRate / 100 / 12;
    const m = tenure * 12;
    grossFinal = monthlyAmount * ((Math.pow(1 + grRate, m) - 1) / grRate) * (1 + grRate);
    netFinal = monthlyAmount * ((Math.pow(1 + nrRate, m) - 1) / nrRate) * (1 + nrRate);
  }

  const roundedNet = Math.round(netFinal);
  const roundedGross = Math.round(grossFinal);
  const totalNetGain = Math.max(0, roundedNet - totalInvested);
  const lostToExpense = Math.max(0, roundedGross - roundedNet);

  const chartData = Array.from({ length: tenure + 1 }, (_, i) => {
    const yr = i;
    const nr = netReturnRate / 100;
    const val = investmentType === "lumpsum"
      ? amount * Math.pow(1 + nr, yr)
      : (yr === 0 ? 0 : monthlyAmount * ((Math.pow(1 + nr / 12, yr * 12) - 1) / (nr / 12)));
    return {
      name: `Yr ${yr}`,
      Invested: investmentType === "lumpsum" ? amount : monthlyAmount * 12 * yr,
      Value: Math.round(val)
    };
  });

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">Mutual Fund Calculator</h4>
        <p className="calc-main-panel-subtitle">Calculate returns with expense ratio and compounding consideration</p>
      </div>

      <div className="calc-panel-body-grid">
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Investment Type</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setInvestmentType('sip')}
                style={{
                  flex: 1, padding: '0.55rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: investmentType === 'sip' ? '#8b0000' : '#ffffff',
                  color: investmentType === 'sip' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Monthly SIP
              </button>
              <button
                type="button"
                onClick={() => setInvestmentType('lumpsum')}
                style={{
                  flex: 1, padding: '0.55rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: investmentType === 'lumpsum' ? '#8b0000' : '#ffffff',
                  color: investmentType === 'lumpsum' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Lump Sum
              </button>
            </div>
          </div>

          {investmentType === "sip" ? (
            <div className="calc-form-group">
              <label className="calc-field-label">Monthly Investment (AED)</label>
              <input
                type="number"
                className="calc-field-input"
                value={monthlyAmount}
                onChange={e => setMonthlyAmount(Number(e.target.value))}
              />
            </div>
          ) : (
            <div className="calc-form-group">
              <label className="calc-field-label">Investment Amount (AED)</label>
              <input
                type="number"
                className="calc-field-input"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
              />
            </div>
          )}

          <div className="calc-form-group">
            <label className="calc-field-label">Expected Annual Return (%)</label>
            <input
              type="number"
              step="0.1"
              className="calc-field-input"
              value={expectedReturn}
              onChange={e => setExpectedReturn(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Expense Ratio (%)</label>
            <input
              type="number"
              step="0.1"
              className="calc-field-input"
              value={expenseRatio}
              onChange={e => setExpenseRatio(Number(e.target.value))}
            />
            <div className="calc-field-hint">Annual fund management charges</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Investment Tenure (Years)</label>
            <input
              type="number"
              className="calc-field-input"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Net Maturity Value</div>
            <div className="calc-gold-hero-value">AED {roundedNet.toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Invested</div>
              <div className="calc-metric-box-value">AED {totalInvested.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Net Gain</div>
              <div className="calc-metric-box-value" style={{ color: '#008000' }}>+ AED {totalNetGain.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box" style={{ gridColumn: 'span 2' }}>
              <div className="calc-metric-box-label">Lost to Expense Ratio</div>
              <div className="calc-metric-box-value" style={{ color: '#a80707' }}>AED {lostToExpense.toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-chart-box">
            <div className="calc-chart-title">Wealth Accumulation Over Time</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                  <Legend iconType="square" wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                  <Area type="monotone" dataKey="Invested" stroke="#b8962c" fill="#d4af37" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="Value" stroke="#8b0000" fill="#8b0000" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="calc-bottom-action-btns">
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>
            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">Call Advisor</Link>
              <button onClick={onShare} className="btn-calc-sub-action">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChildEducationCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [currentCost, setCurrentCost] = useState(100000);
  const [yearsToGoal, setYearsToGoal] = useState(15);
  const [inflationPreset, setInflationPreset] = useState<"uae" | "india" | "custom">("uae");
  const [customInflation, setCustomInflation] = useState(4);
  const [expectedReturn, setExpectedReturn] = useState(8);

  const activeInflation = inflationPreset === "uae" ? 4 : inflationPreset === "india" ? 7 : customInflation;
  const futureCost = currentCost * Math.pow(1 + activeInflation / 100, yearsToGoal);
  const months = yearsToGoal * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlySip = monthlyRate === 0
    ? futureCost / months
    : futureCost / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  const totalInvested = monthlySip * months;

  const chartData = Array.from({ length: yearsToGoal + 1 }, (_, i) => ({
    name: `Yr ${i}`,
    Cost: Math.round(currentCost * Math.pow(1 + activeInflation / 100, i))
  }));

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">Child Education Calculator</h4>
        <p className="calc-main-panel-subtitle">Plan for future university costs adjusted for inflation</p>
      </div>

      <div className="calc-panel-body-grid">
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Current Annual Education Cost (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={currentCost}
              onChange={e => setCurrentCost(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Years Until Goal</label>
            <input
              type="number"
              className="calc-field-input"
              value={yearsToGoal}
              onChange={e => setYearsToGoal(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Education Inflation Rate</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginTop: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setInflationPreset('uae')}
                style={{
                  padding: '0.45rem', fontSize: '0.75rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: inflationPreset === 'uae' ? '#8b0000' : '#ffffff',
                  color: inflationPreset === 'uae' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                UAE (4%)
              </button>
              <button
                type="button"
                onClick={() => setInflationPreset('india')}
                style={{
                  padding: '0.45rem', fontSize: '0.75rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: inflationPreset === 'india' ? '#8b0000' : '#ffffff',
                  color: inflationPreset === 'india' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                India (7%)
              </button>
              <button
                type="button"
                onClick={() => setInflationPreset('custom')}
                style={{
                  padding: '0.45rem', fontSize: '0.75rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: inflationPreset === 'custom' ? '#8b0000' : '#ffffff',
                  color: inflationPreset === 'custom' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Custom
              </button>
            </div>
            {inflationPreset === 'custom' && (
              <input
                type="number"
                step="0.1"
                className="calc-field-input"
                style={{ marginTop: '0.5rem' }}
                value={customInflation}
                onChange={e => setCustomInflation(Number(e.target.value))}
                placeholder="Custom Inflation %"
              />
            )}
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Expected Investment Return (%)</label>
            <input
              type="number"
              step="0.1"
              className="calc-field-input"
              value={expectedReturn}
              onChange={e => setExpectedReturn(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Future Education Cost</div>
            <div className="calc-gold-hero-value">AED {Math.round(futureCost).toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Required Monthly SIP</div>
              <div className="calc-metric-box-value">AED {Math.round(monthlySip).toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Invested</div>
              <div className="calc-metric-box-value">AED {Math.round(totalInvested).toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-chart-box">
            <div className="calc-chart-title">Cost Growth Over Time</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                  <Line type="monotone" dataKey="Cost" stroke="#8b0000" strokeWidth={2.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="calc-bottom-action-btns">
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>
            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">Call Advisor</Link>
              <button onClick={onShare} className="btn-calc-sub-action">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RetirementCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenseToday, setMonthlyExpenseToday] = useState(15000);
  const [inflationPreset, setInflationPreset] = useState<"uae" | "india" | "custom">("uae");
  const [customInflation, setCustomInflation] = useState(4);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [yearsInRetirement, setYearsInRetirement] = useState(20);

  const activeInflation = inflationPreset === "uae" ? 4 : inflationPreset === "india" ? 7 : customInflation;
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const futureMonthlyExpense = monthlyExpenseToday * Math.pow(1 + activeInflation / 100, yearsToRetire);
  const annualExpenseAtRetirement = futureMonthlyExpense * 12;

  const realReturnRate = Math.max(0.01, (expectedReturn - activeInflation) / 100);
  const corpusRequired = annualExpenseAtRetirement * ((1 - Math.pow(1 + realReturnRate, -yearsInRetirement)) / realReturnRate);

  const months = yearsToRetire * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlySip = months > 0 && monthlyRate > 0
    ? corpusRequired / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate))
    : 0;

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">Retirement Calculator</h4>
        <p className="calc-main-panel-subtitle">Estimate your retirement corpus adjusted for inflation</p>
      </div>

      <div className="calc-panel-body-grid">
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="calc-form-group">
              <label className="calc-field-label">Current Age</label>
              <input
                type="number"
                className="calc-field-input"
                value={currentAge}
                onChange={e => setCurrentAge(Number(e.target.value))}
              />
            </div>
            <div className="calc-form-group">
              <label className="calc-field-label">Retirement Age</label>
              <input
                type="number"
                className="calc-field-input"
                value={retirementAge}
                onChange={e => setRetirementAge(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Current Monthly Expenses (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={monthlyExpenseToday}
              onChange={e => setMonthlyExpenseToday(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Inflation Rate</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginTop: '0.35rem' }}>
              <button
                type="button"
                onClick={() => setInflationPreset('uae')}
                style={{
                  padding: '0.45rem', fontSize: '0.75rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: inflationPreset === 'uae' ? '#8b0000' : '#ffffff',
                  color: inflationPreset === 'uae' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                UAE (4%)
              </button>
              <button
                type="button"
                onClick={() => setInflationPreset('india')}
                style={{
                  padding: '0.45rem', fontSize: '0.75rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: inflationPreset === 'india' ? '#8b0000' : '#ffffff',
                  color: inflationPreset === 'india' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                India (7%)
              </button>
              <button
                type="button"
                onClick={() => setInflationPreset('custom')}
                style={{
                  padding: '0.45rem', fontSize: '0.75rem', borderRadius: '4px',
                  border: '1px solid #d4af37',
                  background: inflationPreset === 'custom' ? '#8b0000' : '#ffffff',
                  color: inflationPreset === 'custom' ? '#ffffff' : '#8b0000',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Custom
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="calc-form-group">
              <label className="calc-field-label">Expected Return (%)</label>
              <input
                type="number"
                step="0.1"
                className="calc-field-input"
                value={expectedReturn}
                onChange={e => setExpectedReturn(Number(e.target.value))}
              />
            </div>
            <div className="calc-form-group">
              <label className="calc-field-label">Years in Retirement</label>
              <input
                type="number"
                className="calc-field-input"
                value={yearsInRetirement}
                onChange={e => setYearsInRetirement(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Retirement Corpus Required</div>
            <div className="calc-gold-hero-value">AED {Math.round(corpusRequired).toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Monthly Expense at Retirement</div>
              <div className="calc-metric-box-value">AED {Math.round(futureMonthlyExpense).toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Required Monthly SIP</div>
              <div className="calc-metric-box-value">AED {Math.round(monthlySip).toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-bottom-action-btns" style={{ marginTop: '2rem' }}>
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>
            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">Call Advisor</Link>
              <button onClick={onShare} className="btn-calc-sub-action">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OffPlanCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [propertyValue, setPropertyValue] = useState(1500000);
  const [expectedAppreciation, setExpectedAppreciation] = useState(20);
  const [yearsToCompletion, setYearsToCompletion] = useState(3);
  const [annualMaintenanceCharge, setAnnualMaintenanceCharge] = useState(15000);
  const [govtCharges, setGovtCharges] = useState(4);
  const [otherCharges, setOtherCharges] = useState(10000);

  const futureValue = propertyValue * (1 + expectedAppreciation / 100);
  const grossGain = futureValue - propertyValue;
  const totalMaintenance = annualMaintenanceCharge * yearsToCompletion;
  const govtChargesAmount = propertyValue * (govtCharges / 100);
  const totalExpenses = totalMaintenance + govtChargesAmount + otherCharges;
  const netGain = grossGain - totalExpenses;
  const netReturnPct = propertyValue > 0 ? (netGain / propertyValue) * 100 : 0;

  const chartData = [
    { name: 'Purchase', Amount: propertyValue },
    { name: 'Estimated Handover', Amount: Math.round(futureValue) },
    { name: 'Expenses', Amount: Math.round(totalExpenses) },
    { name: 'Net Gain', Amount: Math.round(netGain) }
  ];

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">Off-Plan Investment Calculator</h4>
        <p className="calc-main-panel-subtitle">Estimate gross and net returns on off-plan property investments</p>
      </div>

      <div className="calc-panel-body-grid">
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Property Value (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={propertyValue}
              onChange={e => setPropertyValue(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Expected Appreciation on Handover (%)</label>
            <input
              type="number"
              step="0.5"
              className="calc-field-input"
              value={expectedAppreciation}
              onChange={e => setExpectedAppreciation(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Years to Completion / Handover</label>
            <input
              type="number"
              className="calc-field-input"
              value={yearsToCompletion}
              onChange={e => setYearsToCompletion(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Annual Maintenance / Service Charge (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={annualMaintenanceCharge}
              onChange={e => setAnnualMaintenanceCharge(Number(e.target.value))}
            />
            <div className="calc-field-hint">As charged by the developer / owners' association</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Government Charges (% of Property Value)</label>
            <input
              type="number"
              step="0.1"
              className="calc-field-input"
              value={govtCharges}
              onChange={e => setGovtCharges(Number(e.target.value))}
            />
            <div className="calc-field-hint">E.g. 4% DLD registration fee</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Other Charges (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={otherCharges}
              onChange={e => setOtherCharges(Number(e.target.value))}
            />
            <div className="calc-field-hint">Agency, admin, NOC or other one-off fees</div>
          </div>
        </div>

        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Net Return (After Expenses)</div>
            <div className="calc-gold-hero-value">AED {Math.round(netGain).toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Net Return %</div>
              <div className="calc-metric-box-value" style={{ color: '#008000' }}>{netReturnPct.toFixed(1)}%</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Handover Value</div>
              <div className="calc-metric-box-value">AED {Math.round(futureValue).toLocaleString()}</div>
            </div>

            <div className="calc-metric-box" style={{ gridColumn: 'span 2' }}>
              <div className="calc-metric-box-label">Total Estimated Expenses</div>
              <div className="calc-metric-box-value" style={{ color: '#a80707' }}>AED {Math.round(totalExpenses).toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-chart-box">
            <div className="calc-chart-title">Gross vs. Net Breakdown</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                  <Bar dataKey="Amount" fill="#8b0000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="calc-bottom-action-btns">
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>
            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">Call Advisor</Link>
              <button onClick={onShare} className="btn-calc-sub-action">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RentalYieldCalcView({ onShowLeadCapture, onShare }: { onShowLeadCapture: () => void; onShare: () => void }) {
  const [propertyValue, setPropertyValue] = useState(1200000);
  const [annualRent, setAnnualRent] = useState(84000);
  const [annualMaintenanceCharge, setAnnualMaintenanceCharge] = useState(12000);
  const [govtCharges, setGovtCharges] = useState(4);
  const [otherCharges, setOtherCharges] = useState(5000);

  const grossYield = propertyValue > 0 ? (annualRent / propertyValue) * 100 : 0;
  const govtChargesAmount = propertyValue * (govtCharges / 100);
  const totalExpenses = annualMaintenanceCharge + govtChargesAmount + otherCharges;
  const netIncome = annualRent - totalExpenses;
  const netYield = propertyValue > 0 ? (netIncome / propertyValue) * 100 : 0;

  const chartData = [
    { name: 'Gross Rent', Amount: annualRent },
    { name: 'Expenses', Amount: Math.round(totalExpenses) },
    { name: 'Net Income', Amount: Math.round(netIncome) }
  ];

  return (
    <div>
      <div className="calc-main-panel-header">
        <h4 className="calc-main-panel-title">Rental Yield Calculator</h4>
        <p className="calc-main-panel-subtitle">Estimate gross and net rental yield after annual expenses</p>
      </div>

      <div className="calc-panel-body-grid">
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Property Value (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={propertyValue}
              onChange={e => setPropertyValue(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Expected Annual Rent (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={annualRent}
              onChange={e => setAnnualRent(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Annual Maintenance / Service Charge (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={annualMaintenanceCharge}
              onChange={e => setAnnualMaintenanceCharge(Number(e.target.value))}
            />
            <div className="calc-field-hint">As charged by the developer / owners' association</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Government Charges (% of Property Value)</label>
            <input
              type="number"
              step="0.1"
              className="calc-field-input"
              value={govtCharges}
              onChange={e => setGovtCharges(Number(e.target.value))}
            />
            <div className="calc-field-hint">E.g. municipality / Ejari or government fees</div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Other Annual Charges (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={otherCharges}
              onChange={e => setOtherCharges(Number(e.target.value))}
            />
            <div className="calc-field-hint">Property management, insurance, or recurring costs</div>
          </div>
        </div>

        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Net Rental Yield</div>
            <div className="calc-gold-hero-value">{netYield.toFixed(2)}%</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Gross Rental Yield</div>
              <div className="calc-metric-box-value">{grossYield.toFixed(2)}%</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Net Annual Income</div>
              <div className="calc-metric-box-value" style={{ color: '#008000' }}>AED {Math.round(netIncome).toLocaleString()}</div>
            </div>

            <div className="calc-metric-box" style={{ gridColumn: 'span 2' }}>
              <div className="calc-metric-box-label">Total Annual Expenses</div>
              <div className="calc-metric-box-value" style={{ color: '#a80707' }}>AED {Math.round(totalExpenses).toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-chart-box">
            <div className="calc-chart-title">Gross vs. Net Breakdown</div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                  <Bar dataKey="Amount" fill="#8b0000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="calc-bottom-action-btns">
            <button onClick={onShowLeadCapture} className="btn-calc-download-pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>
            <div className="calc-sub-actions-row">
              <Link href="/contact" className="btn-calc-sub-action">Call Advisor</Link>
              <button onClick={onShare} className="btn-calc-sub-action">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
