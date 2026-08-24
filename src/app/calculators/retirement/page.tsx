"use client";

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';

export default function RetirementCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(10000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const [bounds, setBounds] = useState({
    expMax: 100000,
    expStep: 1000
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    setMonthlyExpenses(Math.round(convertAmount(monthlyExpenses, oldCode, newCode)));
    setBounds({
      expMax: Math.round(convertAmount(100000, 'AED', newCode)),
      expStep: Math.round(convertAmount(1000, 'AED', newCode))
    });
  };

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  const yearsInRetirement = Math.max(1, lifeExpectancy - retirementAge);
  
  // Future Monthly Expenses (at retirement age)
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  
  // Annual expenses at retirement
  const annualExpensesAtRetirement = futureMonthlyExpenses * 12;

  // Assuming a conservative post-retirement return rate (e.g. 7%) vs inflation (e.g. 6%)
  // Real return rate = (1+r)/(1+i) - 1
  const postRetirementReturn = 7; 
  let realReturnRate = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100)) - 1;
  if (realReturnRate <= 0) realReturnRate = 0.001; // Avoid divide by zero

  // Corpus Required at Retirement (Present Value of Annuity for yearsInRetirement)
  // PV = PMT * (1 - (1+r)^-n) / r
  const corpusRequired = annualExpensesAtRetirement * (1 - Math.pow(1 + realReturnRate, -yearsInRetirement)) / realReturnRate;

  // Monthly Investment Required to build that corpus
  const monthsToRetire = yearsToRetirement * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlyInvestment = corpusRequired / (((Math.pow(1 + monthlyRate, monthsToRetire) - 1) / monthlyRate) * (1 + monthlyRate));

  // Build basic chart data (accumulation phase only for simplicity)
  const chartData = [];
  for (let i = 1; i <= yearsToRetirement; i+=2) {
    const m = i * 12;
    const tv = monthlyInvestment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
    chartData.push({
      Age: currentAge + i,
      Corpus: Math.round(tv)
    });
  }
  chartData.push({ Age: retirementAge, Corpus: Math.round(corpusRequired) });

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className="calc-page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="calc-box">
          <div className="calc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Retirement Calculator</h1>
              <p>Estimate the corpus required to maintain your lifestyle after retirement.</p>
            </div>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          <div className="calc-grid">
            <div className="calc-inputs-col">
              <FormattedSliderInput
                label="Current Age"
                value={currentAge}
                min={18}
                max={60}
                step={1}
                onChange={(v) => {
                  setCurrentAge(v);
                  if (v >= retirementAge) setRetirementAge(v + 1);
                }}
              />
              <FormattedSliderInput
                label="Retirement Age"
                value={retirementAge}
                min={40}
                max={75}
                step={1}
                onChange={(v) => {
                  setRetirementAge(Math.max(v, currentAge + 1));
                  if (v >= lifeExpectancy) setLifeExpectancy(v + 5);
                }}
              />
              <FormattedSliderInput
                label="Life Expectancy"
                value={lifeExpectancy}
                min={60}
                max={100}
                step={1}
                onChange={(v) => setLifeExpectancy(Math.max(v, retirementAge + 1))}
              />
              <FormattedSliderInput
                label="Current Monthly Expenses"
                value={monthlyExpenses}
                min={0}
                max={bounds.expMax}
                step={bounds.expStep || 1000}
                onChange={setMonthlyExpenses}
                isCurrency={true}
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
                  <span className="result-label">Retirement Corpus Required</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(corpusRequired)}</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Monthly Investment Needed</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(monthlyInvestment)}</span>
                </div>
                <div className="calc-result-box secondary">
                  <span className="result-label">Monthly Expenses at Retirement</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(futureMonthlyExpenses)}</span>
                </div>
              </div>

              <div className="calc-chart-container">
                <div className="calc-chart-header">
                  <div className="calc-chart-title">Wealth Accumulation Phase</div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="Age" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                      <Area type="monotone" dataKey="Corpus" stroke="#c59b27" fill="#c59b27" fillOpacity={0.6} />
                    </AreaChart>
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
