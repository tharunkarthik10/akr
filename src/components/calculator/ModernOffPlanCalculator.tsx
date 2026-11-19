"use client";

import React, { useState } from 'react';

interface Props {
  onShowLeadCapture: () => void;
}

export default function ModernOffPlanCalculator({ onShowLeadCapture }: Props) {
  const [propertyValue, setPropertyValue] = useState<number>(1500000);
  const [expectedAppreciation, setExpectedAppreciation] = useState<number>(20);
  const [yearsToCompletion, setYearsToCompletion] = useState<number>(3);
  const [annualMaintenanceCharge, setAnnualMaintenanceCharge] = useState<number>(15000);
  const [govtCharges, setGovtCharges] = useState<number>(4);
  const [otherCharges, setOtherCharges] = useState<number>(10000);

  // Calculations
  const estimatedFutureValue = propertyValue * Math.pow(1 + expectedAppreciation / 100, yearsToCompletion);
  const grossReturn = estimatedFutureValue - propertyValue;
  const maintenanceCharges = annualMaintenanceCharge * yearsToCompletion;
  const govtChargesAmount = propertyValue * (govtCharges / 100);
  const totalExpenses = maintenanceCharges + govtChargesAmount + otherCharges;
  const netReturn = grossReturn - totalExpenses;
  const netReturnPct = propertyValue > 0 ? (netReturn / propertyValue) * 100 : 0;

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 className="calc-exact-title">Off-Plan Investment Calculator</h3>
        <p className="calc-exact-subtitle">Estimate gross and net returns on off-plan property investments</p>
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
            <div className="calc-field-hint">
              As charged by the developer / owners' association — enter manually per project
            </div>
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
            <div className="calc-field-hint">
              E.g. DLD registration fee — enter the applicable rate manually
            </div>
          </div>

          <div className="calc-form-group">
            <label className="calc-field-label">Other Charges (AED)</label>
            <input
              type="number"
              className="calc-field-input"
              value={otherCharges}
              onChange={e => setOtherCharges(Number(e.target.value))}
            />
            <div className="calc-field-hint">
              Agency, admin, NOC or other one-off fees
            </div>
          </div>

          {/* Left Disclaimer Card */}
          <div className="calc-exact-disclaimer-box">
            <span style={{ fontWeight: 700, color: '#b8860b' }}>Disclaimer:</span>{' '}
            This illustration is for educational and understanding purposes only. Actual gross and net returns may vary based on differences in developer service charges, government fees, market conditions, and other additional costs not entered here. Please consult a licensed advisor before making an investment decision.
          </div>
        </div>

        {/* Right Results */}
        <div>
          <div className="calc-gold-hero-metric">
            <div className="calc-gold-hero-label">Net Return (After Expenses)</div>
            <div className="calc-gold-hero-value">AED {Math.round(netReturn).toLocaleString()}</div>
            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.25)', paddingTop: '0.75rem' }}>
              <div className="calc-gold-hero-label">Net Return %</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                {netReturnPct.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="calc-breakdown-card" style={{ marginBottom: '1.5rem' }}>
            <h4 className="calc-breakdown-title">Gross vs. Net Breakdown</h4>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Estimated Future Value</span>
              <span className="calc-breakdown-val">AED {Math.round(estimatedFutureValue).toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="calc-breakdown-label">Gross Return</span>
              <span className="calc-breakdown-val">AED {Math.round(grossReturn).toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row deduction">
              <span className="calc-breakdown-label">- Maintenance Charges</span>
              <span className="calc-breakdown-val">AED {Math.round(maintenanceCharges).toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row deduction">
              <span className="calc-breakdown-label">- Government Charges</span>
              <span className="calc-breakdown-val">AED {Math.round(govtChargesAmount).toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row deduction">
              <span className="calc-breakdown-label">- Other Charges</span>
              <span className="calc-breakdown-val">AED {Math.round(otherCharges).toLocaleString()}</span>
            </div>
            <div className="calc-breakdown-row total">
              <span className="calc-breakdown-label">Net Return</span>
              <span className="calc-breakdown-val">AED {Math.round(netReturn).toLocaleString()}</span>
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
