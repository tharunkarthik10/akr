"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';
import CalculatorCTAs from '@/components/calculator/CalculatorCTAs';

export default function OffPlanCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [propertyValue, setPropertyValue] = useState(2000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [duringConstructionPct, setDuringConstructionPct] = useState(40);
  
  // Post handover is the remainder
  const postHandoverPct = Math.max(0, 100 - downPaymentPct - duringConstructionPct);

  const [handoverMonths, setHandoverMonths] = useState(24);

  const [bounds, setBounds] = useState({
    propMax: 20000000,
    propStep: 50000
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    setPropertyValue(Math.round(convertAmount(propertyValue, oldCode, newCode)));
    setBounds({
      propMax: Math.round(convertAmount(20000000, 'AED', newCode)),
      propStep: Math.round(convertAmount(50000, 'AED', newCode))
    });
  };

  // Derived state
  const downPayment = (propertyValue * downPaymentPct) / 100;
  const duringConstruction = (propertyValue * duringConstructionPct) / 100;
  const postHandover = (propertyValue * postHandoverPct) / 100;

  const dldFee = propertyValue * 0.04;
  const adminFees = convertAmount(5000, 'AED', bounds.propMax ? 'AED' : 'AED'); // Approx standard AED fees, simplified
  
  const totalUpfront = downPayment + dldFee + adminFees;

  const chartData = [
    { name: 'Upfront', Amount: totalUpfront },
    { name: 'Construction', Amount: duringConstruction },
    { name: 'Post-Handover', Amount: postHandover },
  ];

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className="calc-page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        
        <div className="calc-box">
          <div className="calc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Off-Plan Property Calculator</h1>
              <p>Analyze payment plans, DLD fees, and total capital required for off-plan investments.</p>
            </div>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          <div className="calc-grid">
            
            <div className="calc-inputs-col">
              
              <FormattedSliderInput
                label="Property Value"
                value={propertyValue}
                min={0}
                max={bounds.propMax}
                step={bounds.propStep || 1}
                onChange={setPropertyValue}
                isCurrency={true}
              />

              <FormattedSliderInput
                label="Down Payment (%)"
                value={downPaymentPct}
                min={5}
                max={90}
                step={1}
                onChange={(v) => {
                  setDownPaymentPct(v);
                  if (v + duringConstructionPct > 100) {
                    setDuringConstructionPct(100 - v);
                  }
                }}
                isPercentage={true}
              />

              <FormattedSliderInput
                label="During Construction (%)"
                value={duringConstructionPct}
                min={0}
                max={100 - downPaymentPct}
                step={1}
                onChange={setDuringConstructionPct}
                isPercentage={true}
                hint={`Post-Handover will be ${postHandoverPct}%`}
              />

              <FormattedSliderInput
                label="Months to Handover"
                value={handoverMonths}
                min={6}
                max={60}
                step={1}
                onChange={setHandoverMonths}
              />

            </div>

            <div className="calc-results-col">
              
              <div className="calc-results-grid">
                <div className="calc-result-box main">
                  <span className="result-label">Total Upfront Capital Required</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(totalUpfront)}</span>
                  <span className="result-hint">Includes 4% DLD & Admin Fees</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Construction Installments</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(duringConstruction)}</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Post-Handover Payments</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(postHandover)}</span>
                </div>
              </div>

              <div className="calc-chart-container">
                <div className="calc-chart-header">
                  <div className="calc-chart-title">Payment Milestone Breakdown</div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                      <Bar dataKey="Amount" fill="#c59b27" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="calc-actions">
                <button className="btn-calc-primary" onClick={handlePrint}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Full PDF Report
                </button>
                <div className="calc-action-row">
                  <button className="btn-calc-secondary">Call Advisor</button>
                  <button className="btn-calc-secondary">Email Us</button>
                </div>
              </div>

              <CalculatorCTAs />

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
