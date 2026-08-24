"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';

// Basic XIRR approximation
const calculateXIRR = (cashflows: {amount: number, date: Date}[]) => {
  if (cashflows.length < 2) return 0;
  
  let x0 = 0.1;
  let x1 = 0.0;
  let err = 1e+100;
  
  const minDate = Math.min(...cashflows.map(cf => cf.date.getTime()));
  
  const npv = (rate: number) => {
    return cashflows.reduce((acc, cf) => {
      const days = (cf.date.getTime() - minDate) / (1000 * 3600 * 24);
      return acc + cf.amount / Math.pow(1 + rate, days / 365);
    }, 0);
  };

  const derivative = (rate: number) => {
    return cashflows.reduce((acc, cf) => {
      const days = (cf.date.getTime() - minDate) / (1000 * 3600 * 24);
      const frac = days / 365;
      return acc - (cf.amount * frac) / Math.pow(1 + rate, frac + 1);
    }, 0);
  };

  for (let i = 0; i < 100; i++) {
    x1 = x0 - npv(x0) / derivative(x0);
    err = Math.abs(x1 - x0);
    if (err < 1e-5) break;
    x0 = x1;
  }
  
  return x0 * 100;
};

export default function XirrCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [finalValue, setFinalValue] = useState(1500000);
  const [years, setYears] = useState(5);

  const [bounds, setBounds] = useState({
    invMax: 10000000,
    invStep: 50000,
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    setInitialInvestment(Math.round(convertAmount(initialInvestment, oldCode, newCode)));
    setFinalValue(Math.round(convertAmount(finalValue, oldCode, newCode)));
    setBounds({
      invMax: Math.round(convertAmount(10000000, 'AED', newCode)),
      invStep: Math.round(convertAmount(50000, 'AED', newCode))
    });
  };

  // Build basic cashflow array for a simplified XIRR
  const startDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(startDate.getFullYear() + years);

  const cashflows = [
    { amount: -initialInvestment, date: startDate },
    { amount: finalValue, date: endDate }
  ];

  const xirrValue = calculateXIRR(cashflows);
  const totalProfit = finalValue - initialInvestment;
  const absoluteRoi = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;

  const chartData = [
    { year: 'Year 0', Value: initialInvestment },
    { year: `Year ${Math.round(years / 2)}`, Value: initialInvestment + (totalProfit / 2) },
    { year: `Year ${years}`, Value: finalValue }
  ];

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className="calc-page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="calc-box">
          <div className="calc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>XIRR Calculator</h1>
              <p>Calculate the Extended Internal Rate of Return for your real estate investments.</p>
            </div>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          <div className="calc-grid">
            <div className="calc-inputs-col">
              <FormattedSliderInput
                label="Initial Investment"
                value={initialInvestment}
                min={0}
                max={bounds.invMax}
                step={bounds.invStep || 1}
                onChange={setInitialInvestment}
                isCurrency={true}
              />
              <FormattedSliderInput
                label="Current / Expected Final Value"
                value={finalValue}
                min={0}
                max={bounds.invMax * 2}
                step={bounds.invStep || 1}
                onChange={setFinalValue}
                isCurrency={true}
              />
              <FormattedSliderInput
                label="Investment Period (Years)"
                value={years}
                min={1}
                max={30}
                step={1}
                onChange={setYears}
              />
            </div>

            <div className="calc-results-col">
              <div className="calc-results-grid">
                <div className="calc-result-box main">
                  <span className="result-label">XIRR (Annualized Return)</span>
                  <span className="result-value notranslate">{isFinite(xirrValue) ? xirrValue.toFixed(2) : 0}%</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Absolute ROI</span>
                  <span className="result-value notranslate">{absoluteRoi.toFixed(2)}%</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Total Profit</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(totalProfit)}</span>
                </div>
              </div>

              <div className="calc-chart-container">
                <div className="calc-chart-header">
                  <div className="calc-chart-title">Investment Growth Trajectory</div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="year" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                      <Line type="monotone" dataKey="Value" stroke="#8b0000" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
