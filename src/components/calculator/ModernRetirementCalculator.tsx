"use client";

import React, { useState } from 'react';

interface Props {
  onShowLeadCapture: () => void;
}

export default function ModernRetirementCalculator({ onShowLeadCapture }: Props) {
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenseToday, setMonthlyExpenseToday] = useState<number>(15000);
  const [inflationPreset, setInflationPreset] = useState<"uae" | "india" | "custom">("uae");
  const [customInflation, setCustomInflation] = useState<number>(4);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [yearsInRetirement, setYearsInRetirement] = useState<number>(20);

  const activeInflation = inflationPreset === "uae" ? 4 : inflationPreset === "india" ? 7 : customInflation;
  const yearsToRetire = Math.max(1, retirementAge - currentAge);
  
  // Future monthly expense at retirement: PV * (1 + inflation)^n
  const futureMonthlyExpense = monthlyExpenseToday * Math.pow(1 + activeInflation / 100, yearsToRetire);
  const annualExpenseAtRetirement = futureMonthlyExpense * 12;

  // Real return rate adjusted for post-retirement inflation: (1 + r)/(1 + i) - 1
  const realReturnRate = Math.max(0.005, ((1 + expectedReturn / 100) / (1 + activeInflation / 100)) - 1);
  
  // Present value of annuity for retirement years:
  // Corpus = AnnualExpense * ((1 - (1 + realReturn)^(-n)) / realReturn)
  const corpusRequired = annualExpenseAtRetirement * ((1 - Math.pow(1 + realReturnRate, -yearsInRetirement)) / realReturnRate);

  // SIP required to build this corpus over yearsToRetire
  const months = yearsToRetire * 12;
  const monthlyReturnRate = expectedReturn / 100 / 12;
  const monthlySip = monthlyReturnRate === 0
    ? corpusRequired / months
    : corpusRequired / (((Math.pow(1 + monthlyReturnRate, months) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate));

  const totalInvestedUntilRetirement = Math.round(monthlySip * months);

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 className="calc-exact-title">Retirement Calculator</h3>
        <p className="calc-exact-subtitle">Estimate your retirement corpus adjusted for inflation</p>
      </div>

      <div className="calc-panel-body-grid">
        {/* Left Inputs */}
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
            <label className="calc-field-label">Retirement / General Inflation Rate</label>
            <div className="calc-select-wrapper">
              <select
                className="calc-field-input"
                value={inflationPreset}
                onChange={e => setInflationPreset(e.target.value as any)}
              >
                <option value="uae">UAE (approx. 4% p.a. estimate)</option>
                <option value="india">India (approx. 7% p.a. estimate)</option>
                <option value="custom">Enter Manually</option>
              </select>
            </div>
            {inflationPreset === "custom" ? (
              <input
                type="number"
                step="0.1"
                placeholder="Custom Inflation Rate %"
                className="calc-field-input"
                style={{ marginTop: '0.5rem' }}
                value={customInflation}
                onChange={e => setCustomInflation(Number(e.target.value))}
              />
            ) : (
              <div className="calc-field-hint">
                Using {activeInflation}% p.a. — indicative estimate, editable at any time
              </div>
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

          <div className="calc-form-group">
            <label className="calc-field-label">Years in Retirement</label>
            <input
              type="number"
              className="calc-field-input"
              value={yearsInRetirement}
              onChange={e => setYearsInRetirement(Number(e.target.value))}
            />
          </div>

          {/* Left Disclaimer Card */}
          <div className="calc-exact-disclaimer-box">
            <span style={{ fontWeight: 700, color: '#b8860b' }}>Disclaimer:</span>{' '}
            Inflation and return figures are indicative estimates for illustration purposes only, not official statistics. Actual retirement needs and investment returns may vary. Please consult a licensed advisor for personalized planning.
          </div>
        </div>

        {/* Right Results */}
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

          <div className="calc-metric-box" style={{ marginBottom: '1.5rem' }}>
            <div className="calc-metric-box-label">Total Invested Until Retirement</div>
            <div className="calc-metric-box-value">AED {totalInvestedUntilRetirement.toLocaleString()}</div>
          </div>

          {/* Actions */}
          <div className="calc-exact-actions" style={{ marginTop: '2rem' }}>
            <button onClick={onShowLeadCapture} className="btn-exact-download">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>

            <div className="calc-exact-sub-actions">
              <a href="tel:+971585887864" className="btn-exact-sub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Financial Advisor
              </a>
              <a href="mailto:info@akrgroupuae.ae" className="btn-exact-sub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
