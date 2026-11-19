"use client";

import React, { useState } from 'react';

interface Props {
  onShowLeadCapture: () => void;
}

export default function ModernMutualFundCalculator({ onShowLeadCapture }: Props) {
  const [investmentType, setInvestmentType] = useState<"Lump Sum" | "SIP">("Lump Sum");
  const [amount, setAmount] = useState<number>(100000);
  const [returnType, setReturnType] = useState<"Compound Returns" | "Simple Returns">("Compound Returns");
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [expenseRatio, setExpenseRatio] = useState<number>(1.5);
  const [tenure, setTenure] = useState<number>(10);

  // Calculations
  const netReturnRate = Math.max(0.1, expectedReturn - expenseRatio);
  let totalInvested = 0;
  let grossFinal = 0;
  let netFinal = 0;

  if (investmentType === "Lump Sum") {
    totalInvested = amount;
    if (returnType === "Compound Returns") {
      grossFinal = amount * Math.pow(1 + expectedReturn / 100, tenure);
      netFinal = amount * Math.pow(1 + netReturnRate / 100, tenure);
    } else {
      grossFinal = amount * (1 + (expectedReturn / 100) * tenure);
      netFinal = amount * (1 + (netReturnRate / 100) * tenure);
    }
  } else {
    // SIP
    totalInvested = amount * 12 * tenure;
    const monthlyGrossRate = expectedReturn / 100 / 12;
    const monthlyNetRate = netReturnRate / 100 / 12;
    const months = tenure * 12;
    grossFinal = amount * ((Math.pow(1 + monthlyGrossRate, months) - 1) / monthlyGrossRate) * (1 + monthlyGrossRate);
    netFinal = amount * ((Math.pow(1 + monthlyNetRate, months) - 1) / monthlyNetRate) * (1 + monthlyNetRate);
  }

  const roundedNetFinal = Math.round(netFinal);
  const roundedGrossFinal = Math.round(grossFinal);
  const netReturns = Math.max(0, roundedNetFinal - totalInvested);
  const grossReturns = Math.max(0, roundedGrossFinal - totalInvested);
  const totalExpenseCost = Math.max(0, roundedGrossFinal - roundedNetFinal);

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 className="calc-exact-title">Mutual Fund Calculator</h3>
        <p className="calc-exact-subtitle">Calculate returns with expense ratio consideration</p>
      </div>

      <div className="calc-panel-body-grid">
        {/* Left Inputs */}
        <div>
          <div className="calc-form-group">
            <label className="calc-field-label">Investment Type</label>
            <div className="calc-select-wrapper">
              <select
                className="calc-field-input"
                value={investmentType}
                onChange={e => setInvestmentType(e.target.value as any)}
              >
                <option value="Lump Sum">Lump Sum</option>
                <option value="SIP">Systematic Investment Plan (SIP)</option>
              </select>
            </div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">
              {investmentType === "Lump Sum" ? "Investment Amount (AED)" : "Monthly Investment Amount (AED)"}
            </label>
            <input
              type="number"
              className="calc-field-input"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Return Type</label>
            <div className="calc-select-wrapper">
              <select
                className="calc-field-input"
                value={returnType}
                onChange={e => setReturnType(e.target.value as any)}
              >
                <option value="Compound Returns">Compound Returns</option>
                <option value="Simple Returns">Simple Returns</option>
              </select>
            </div>
          </div>

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

          {/* Left Disclaimer Card */}
          <div className="calc-exact-disclaimer-box">
            <span style={{ fontWeight: 700, color: '#b8860b' }}>Risk Disclaimer:</span>{' '}
            Mutual fund investments are subject to market risks. Past performance does not guarantee future results. This calculator provides estimates only.
          </div>
        </div>

        {/* Right Results */}
        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Expected Final Value (After Expenses)</div>
            <div className="calc-gold-hero-value">AED {roundedNetFinal.toLocaleString()}</div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Invested</div>
              <div className="calc-metric-box-value">AED {totalInvested.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Net Returns</div>
              <div className="calc-metric-box-value">AED {netReturns.toLocaleString()}</div>
            </div>
          </div>

          <div className="calc-metric-box" style={{ marginBottom: '1.5rem' }}>
            <div className="calc-metric-box-label">Total Expense Cost</div>
            <div className="calc-metric-box-value">AED {totalExpenseCost.toLocaleString()}</div>
            <div className="calc-metric-box-hint">Impact of {expenseRatio}% expense ratio over {tenure} years</div>
          </div>

          {/* Investment Breakdown Card */}
          <div className="calc-breakdown-card">
            <h4 className="calc-breakdown-title">Investment Breakdown</h4>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Principal Amount</span>
              <span className="calc-breakdown-val">AED {totalInvested.toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Gross Returns</span>
              <span className="calc-breakdown-val">AED {grossReturns.toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row deduction">
              <span className="calc-breakdown-label">- Expense Charges</span>
              <span className="calc-breakdown-val">AED {totalExpenseCost.toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row total">
              <span className="calc-breakdown-label">Net Returns</span>
              <span className="calc-breakdown-val">AED {netReturns.toLocaleString()}</span>
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
              <a href="tel:+971585887864" className="btn-exact-sub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Financial Advisor
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
