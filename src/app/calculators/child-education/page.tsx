"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';

export default function ChildEducationCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [currentCost, setCurrentCost] = useState(250000);
  const [currentAge, setCurrentAge] = useState(5);
  const [collegeAge, setCollegeAge] = useState(18);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const [bounds, setBounds] = useState({
    costMax: 2000000,
    costStep: 10000
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    setCurrentCost(Math.round(convertAmount(currentCost, oldCode, newCode)));
    setBounds({
      costMax: Math.round(convertAmount(2000000, 'AED', newCode)),
      costStep: Math.round(convertAmount(10000, 'AED', newCode))
    });
  };

  const yearsToCollege = Math.max(1, collegeAge - currentAge);
  
  // Future Value = Current Cost * (1 + inflation/100) ^ yearsToCollege
  const futureCost = currentCost * Math.pow(1 + inflationRate / 100, yearsToCollege);
  
  // Required Monthly Investment (SIP) to reach futureCost
  // FV = P * ({[1 + r]^n - 1} / r) * (1 + r)
  // P = FV / (({[1 + r]^n - 1} / r) * (1 + r))
  const months = yearsToCollege * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlyInvestment = futureCost / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  const chartData = [
    { name: 'Current Cost', Amount: currentCost },
    { name: 'Future Inflated Cost', Amount: futureCost }
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
              <h1>Child Education Calculator</h1>
              <p>Plan ahead for your child's higher education expenses considering inflation.</p>
            </div>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          <div className="calc-grid">
            <div className="calc-inputs-col">
              <FormattedSliderInput
                label="Current Cost of Education"
                value={currentCost}
                min={0}
                max={bounds.costMax}
                step={bounds.costStep || 1000}
                onChange={setCurrentCost}
                isCurrency={true}
              />
              <FormattedSliderInput
                label="Child's Current Age"
                value={currentAge}
                min={0}
                max={17}
                step={1}
                onChange={setCurrentAge}
              />
              <FormattedSliderInput
                label="Age Starting College"
                value={collegeAge}
                min={16}
                max={25}
                step={1}
                onChange={(v) => setCollegeAge(Math.max(v, currentAge + 1))}
              />
              <FormattedSliderInput
                label="Expected Inflation Rate (%)"
                value={inflationRate}
                min={1}
                max={15}
                step={0.5}
                onChange={setInflationRate}
                isPercentage={true}
              />
              <FormattedSliderInput
                label="Expected Return on Investment (%)"
                value={expectedReturn}
                min={1}
                max={20}
                step={0.5}
                onChange={setExpectedReturn}
                isPercentage={true}
              />
            </div>

            <div className="calc-results-col">
              <div className="calc-results-grid">
                <div className="calc-result-box main">
                  <span className="result-label">Monthly Investment Required</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(monthlyInvestment)}</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Future Cost of Education</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(futureCost)}</span>
                  <span className="result-hint">In {yearsToCollege} years</span>
                </div>
              </div>

              <div className="calc-chart-container">
                <div className="calc-chart-header">
                  <div className="calc-chart-title">Impact of Inflation</div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{fontSize: 12, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                      <Bar dataKey="Amount" fill="#8b0000" barSize={50} radius={[4, 4, 0, 0]} />
                    </BarChart>
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
