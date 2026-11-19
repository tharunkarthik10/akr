"use client";

import React, { useState } from 'react';

interface Props {
  onShowLeadCapture: () => void;
}

export default function ModernXirrCalculator({ onShowLeadCapture }: Props) {
  const [investmentType, setInvestmentType] = useState<"Lump Sum" | "SIP">("Lump Sum");
  const [initialAmount, setInitialAmount] = useState<number>(500000);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [tenure, setTenure] = useState<number>(10);
  const [includeRealEstate, setIncludeRealEstate] = useState<boolean>(true);
  const [rentalYield, setRentalYield] = useState<number>(6);
  const [appreciation, setAppreciation] = useState<number>(5);

  // Effective return rate
  const effectiveRate = includeRealEstate ? (rentalYield + appreciation) : expectedReturn;
  let totalInvested = 0;
  let finalValue = 0;

  if (investmentType === "Lump Sum") {
    totalInvested = initialAmount;
    finalValue = initialAmount * Math.pow(1 + effectiveRate / 100, tenure);
  } else {
    // SIP
    totalInvested = monthlyAmount * 12 * tenure;
    const monthlyRate = effectiveRate / 100 / 12;
    const months = tenure * 12;
    finalValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const roundedFinal = Math.round(finalValue);
  const totalReturns = Math.max(0, roundedFinal - totalInvested);

  // Breakdown estimation
  const rentalReturns = includeRealEstate && totalReturns > 0
    ? Math.round(totalReturns * (rentalYield / effectiveRate))
    : 0;
  const appreciationReturns = includeRealEstate && totalReturns > 0
    ? Math.round(totalReturns * (appreciation / effectiveRate))
    : totalReturns;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 className="calc-exact-title">ROI &amp; Real Estate Calculator (XIRR)</h3>
        <p className="calc-exact-subtitle">Calculate returns for lump sum, SIP, and real estate investments</p>
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
              {investmentType === "Lump Sum" ? "Initial Investment (AED)" : "Monthly Investment (AED)"}
            </label>
            <input
              type="number"
              className="calc-field-input"
              value={investmentType === "Lump Sum" ? initialAmount : monthlyAmount}
              onChange={e => {
                const val = Number(e.target.value);
                if (investmentType === "Lump Sum") setInitialAmount(val);
                else setMonthlyAmount(val);
              }}
            />
          </div>

          {!includeRealEstate && (
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

          <div className="calc-form-group">
            <label className="calc-field-label">Investment Tenure (Years)</label>
            <input
              type="number"
              className="calc-field-input"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
            />
          </div>

          <div className="calc-form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.25rem', marginBottom: '1rem', borderTop: '1px solid #ebd7af', paddingTop: '1rem' }}>
            <input
              type="checkbox"
              id="includeRealEstate"
              checked={includeRealEstate}
              onChange={e => setIncludeRealEstate(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#8b0000', cursor: 'pointer' }}
            />
            <label htmlFor="includeRealEstate" className="calc-field-label" style={{ margin: 0, cursor: 'pointer' }}>
              Include Real Estate Returns
            </label>
          </div>

          {includeRealEstate && (
            <>
              <div className="calc-form-group">
                <label className="calc-field-label">Rental Yield (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="calc-field-input"
                  value={rentalYield}
                  onChange={e => setRentalYield(Number(e.target.value))}
                />
              </div>

              <div className="calc-form-group">
                <label className="calc-field-label">Capital Appreciation (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="calc-field-input"
                  value={appreciation}
                  onChange={e => setAppreciation(Number(e.target.value))}
                />
              </div>
            </>
          )}

          {/* Left Disclaimer Card */}
          <div className="calc-exact-disclaimer-box">
            <span style={{ fontWeight: 700, color: '#b8860b' }}>Disclaimer:</span>{' '}
            Real estate and market returns are estimates based on historical benchmarks. Actual returns depend on market cycles, property location, vacancy, and macroeconomic factors. Consult an advisor for formal financial guidance.
          </div>
        </div>

        {/* Right Results */}
        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Expected Final Value</div>
            <div className="calc-gold-hero-value">AED {roundedFinal.toLocaleString()}</div>
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.25)', paddingTop: '0.75rem' }}>
              <div className="calc-gold-hero-label">Annualized Return (XIRR)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                {effectiveRate.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="calc-secondary-metrics-grid">
            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Invested</div>
              <div className="calc-metric-box-value">AED {totalInvested.toLocaleString()}</div>
            </div>

            <div className="calc-metric-box">
              <div className="calc-metric-box-label">Total Returns</div>
              <div className="calc-metric-box-value" style={{ color: '#008000' }}>
                + AED {totalReturns.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="calc-breakdown-card" style={{ marginBottom: '1.5rem' }}>
            <h4 className="calc-breakdown-title">Investment Returns Breakdown</h4>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Initial Capital Invested</span>
              <span className="calc-breakdown-val">AED {totalInvested.toLocaleString()}</span>
            </div>
            {includeRealEstate ? (
              <>
                <div className="calc-breakdown-row">
                  <span className="calc-breakdown-label">Rental Income Yield ({rentalYield}%)</span>
                  <span className="calc-breakdown-val">AED {rentalReturns.toLocaleString()}</span>
                </div>
                <div className="calc-breakdown-row">
                  <span className="calc-breakdown-label">Capital Appreciation ({appreciation}%)</span>
                  <span className="calc-breakdown-val">AED {appreciationReturns.toLocaleString()}</span>
                </div>
              </>
            ) : (
              <div className="calc-breakdown-row">
                <span className="calc-breakdown-label">Compounded Return ({expectedReturn}%)</span>
                <span className="calc-breakdown-val">AED {totalReturns.toLocaleString()}</span>
              </div>
            )}
            <div className="calc-breakdown-row total">
              <span className="calc-breakdown-label">Total Wealth Generated</span>
              <span className="calc-breakdown-val">AED {totalReturns.toLocaleString()}</span>
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
