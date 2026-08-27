"use client";

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';
import CalculatorCTAs from '@/components/calculator/CalculatorCTAs';

export default function MutualFundCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const [bounds, setBounds] = useState({
    sipMax: 100000,
    sipStep: 1000
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    setMonthlyInvestment(Math.round(convertAmount(monthlyInvestment, oldCode, newCode)));
    setBounds({
      sipMax: Math.round(convertAmount(100000, 'AED', newCode)),
      sipStep: Math.round(convertAmount(1000, 'AED', newCode))
    });
  };

  const months = years * 12;
  const monthlyRate = expectedReturnRate / 100 / 12;
  
  // SIP Future Value formula: P × ({[1 + i]^n - 1} / i) × (1 + i)
  const totalValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalInvested = monthlyInvestment * months;
  const estimatedReturns = totalValue - totalInvested;

  // Generate chart data by year
  const chartData = [];
  for (let i = 1; i <= years; i++) {
    const m = i * 12;
    const tv = monthlyInvestment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
    const ti = monthlyInvestment * m;
    chartData.push({
      year: `Year ${i}`,
      Invested: Math.round(ti),
      Returns: Math.round(tv - ti)
    });
  }

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className="calc-page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="calc-box">
          <div className="calc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Mutual Fund (SIP) Calculator</h1>
              <p>Estimate the future wealth accumulated through regular monthly investments.</p>
            </div>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          <div className="calc-grid">
            <div className="calc-inputs-col">
              <FormattedSliderInput
                label="Monthly Investment"
                value={monthlyInvestment}
                min={0}
                max={bounds.sipMax}
                step={bounds.sipStep || 100}
                onChange={setMonthlyInvestment}
                isCurrency={true}
              />
              <FormattedSliderInput
                label="Expected Return Rate (%)"
                value={expectedReturnRate}
                min={1}
                max={30}
                step={0.5}
                onChange={setExpectedReturnRate}
                isPercentage={true}
              />
              <FormattedSliderInput
                label="Time Period (Years)"
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={setYears}
              />
            </div>

            <div className="calc-results-col">
              <div className="calc-results-grid">
                <div className="calc-result-box main">
                  <span className="result-label">Total Value</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(totalValue)}</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Total Invested</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(totalInvested)}</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Estimated Returns</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(estimatedReturns)}</span>
                </div>
              </div>

              <div className="calc-chart-container">
                <div className="calc-chart-header">
                  <div className="calc-chart-title">Wealth Growth Trajectory</div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="year" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                      <Area type="monotone" dataKey="Returns" stackId="1" stroke="#d4af37" fill="#d4af37" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="Invested" stackId="1" stroke="#8b0000" fill="#8b0000" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
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
