"use client";

import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

interface Props {
  onShowLeadCapture: () => void;
}

export default function ModernChildEducationCalculator({ onShowLeadCapture }: Props) {
  const [currentCost, setCurrentCost] = useState<number>(100000);
  const [yearsToGoal, setYearsToGoal] = useState<number>(15);
  const [inflationPreset, setInflationPreset] = useState<"uae" | "india" | "custom">("uae");
  const [customInflation, setCustomInflation] = useState<number>(4);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);

  const activeInflation = inflationPreset === "uae" ? 4 : inflationPreset === "india" ? 7 : customInflation;
  const futureCost = currentCost * Math.pow(1 + activeInflation / 100, yearsToGoal);
  
  const months = Math.max(1, yearsToGoal * 12);
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlySip = monthlyRate === 0
    ? futureCost / months
    : futureCost / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  const totalInvested = Math.round(monthlySip * months);

  const chartData = Array.from({ length: yearsToGoal }, (_, i) => {
    const yr = i + 1;
    return {
      name: `Year ${yr}`,
      cost: Math.round(currentCost * Math.pow(1 + activeInflation / 100, yr))
    };
  });

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 className="calc-exact-title">Child Education Calculator</h3>
        <p className="calc-exact-subtitle">Plan for future education costs adjusted for inflation</p>
      </div>

      <div className="calc-panel-body-grid">
        {/* Left Inputs */}
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

          {/* Left Disclaimer Card */}
          <div className="calc-exact-disclaimer-box">
            <span style={{ fontWeight: 700, color: '#b8860b' }}>Disclaimer:</span>{' '}
            Inflation and return figures are indicative estimates for illustration purposes only, not official statistics. Actual education costs and investment returns may vary. Please consult a licensed advisor for personalized planning.
          </div>
        </div>

        {/* Right Results */}
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
              <div className="calc-metric-box-value">AED {totalInvested.toLocaleString()}</div>
            </div>
          </div>

          {/* Chart */}
          <div className="calc-breakdown-card" style={{ marginBottom: '1.5rem' }}>
            <h4 className="calc-breakdown-title">Cost Growth Over Time</h4>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e6dfcc" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b0000' }} tickLine={false} interval="preserveStartEnd" />
                  <YAxis tick={{ fontSize: 10, fill: '#b8962c' }} tickLine={false} domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #d4af37' }} />
                  <Line type="monotone" dataKey="cost" stroke="#c59b27" strokeWidth={2} dot={{ r: 3, fill: '#c59b27' }} />
                </LineChart>
              </ResponsiveContainer>
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
