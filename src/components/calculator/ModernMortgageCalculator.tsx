"use client";

import React, { useState } from 'react';

interface Props {
  onShowLeadCapture: () => void;
}

export default function ModernMortgageCalculator({ onShowLeadCapture }: Props) {
  const [propertyValue, setPropertyValue] = useState<number>(1000000);
  const [downPayment, setDownPayment] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [tenure, setTenure] = useState<number>(300);
  const [monthlyInsurance, setMonthlyInsurance] = useState<number>(150);
  const [adminFees, setAdminFees] = useState<number>(5000);

  // Calculations
  const principal = Math.max(0, propertyValue - downPayment);
  const monthlyRate = (interestRate / 100) / 12;

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

  const downPaymentPercent = propertyValue > 0 ? ((downPayment / propertyValue) * 100).toFixed(1) : "0.0";
  const tenureYears = (tenure / 12).toFixed(1);

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 className="calc-exact-title">Advanced Mortgage Loan Calculator</h3>
        <p className="calc-exact-subtitle">Calculate your EMI with insurance and administrative charges</p>
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

          {/* Left Disclaimer Card */}
          <div className="calc-exact-disclaimer-box">
            <span style={{ fontWeight: 700, color: '#b8860b' }}>Disclaimer:</span>{' '}
            Mortgage estimates are indicative and subject to UAE Central Bank regulations, bank credit assessment, property valuation, and prevailing lending criteria. Please consult a licensed mortgage advisor for precise qualification.
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

          {/* Breakdown Card */}
          <div className="calc-breakdown-card" style={{ marginBottom: '1.5rem' }}>
            <h4 className="calc-breakdown-title">Mortgage Payment Breakdown</h4>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Net Loan Principal</span>
              <span className="calc-breakdown-val">AED {principal.toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Total Interest Paid</span>
              <span className="calc-breakdown-val">AED {totalInterest.toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Administrative Fees</span>
              <span className="calc-breakdown-val">AED {adminFees.toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row total">
              <span className="calc-breakdown-label">Total Amount Payable</span>
              <span className="calc-breakdown-val">AED {totalPayable.toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="calc-exact-actions">
            <button onClick={onShowLeadCapture} className="btn-exact-download">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              Download Full PDF Report
            </button>

            <div className="calc-exact-sub-actions">
              <a href="tel:+971558847365" className="btn-exact-sub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Advisor
              </a>
              <a href="mailto:info@akrgroupuae.com" className="btn-exact-sub">
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
