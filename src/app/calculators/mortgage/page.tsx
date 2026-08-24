"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';

export default function MortgageCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(250000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTenureMonths, setLoanTenureMonths] = useState(300);
  const [monthlyInsurance, setMonthlyInsurance] = useState(150);
  const [adminFees, setAdminFees] = useState(5000);

  // Derived state
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');

  // Dynamic boundaries based on currency (Relative to base AED bounds)
  const [bounds, setBounds] = useState({
    propMax: 20000000,
    propStep: 50000,
    insMax: 10000,
    insStep: 50,
    adminMax: 50000,
    adminStep: 500
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    // Mathematically convert all currency values
    setPropertyValue(Math.round(convertAmount(propertyValue, oldCode, newCode)));
    setDownPayment(Math.round(convertAmount(downPayment, oldCode, newCode)));
    setMonthlyInsurance(Math.round(convertAmount(monthlyInsurance, oldCode, newCode)));
    setAdminFees(Math.round(convertAmount(adminFees, oldCode, newCode)));

    // Scale boundaries
    setBounds({
      propMax: Math.round(convertAmount(20000000, 'AED', newCode)),
      propStep: Math.round(convertAmount(50000, 'AED', newCode)),
      insMax: Math.round(convertAmount(10000, 'AED', newCode)),
      insStep: Math.round(convertAmount(50, 'AED', newCode)),
      adminMax: Math.round(convertAmount(50000, 'AED', newCode)),
      adminStep: Math.round(convertAmount(500, 'AED', newCode)),
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [propertyValue, downPayment, interestRate, loanTenureMonths, monthlyInsurance, adminFees]);

  const calculateMortgage = () => {
    const principal = propertyValue - downPayment;
    
    // Monthly interest rate
    const r = (interestRate / 100) / 12;
    const n = loanTenureMonths;

    let monthlyEmi = 0;
    if (r > 0 && n > 0 && principal > 0) {
      monthlyEmi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0 && principal > 0) {
      monthlyEmi = principal / n;
    }

    const calculatedEmi = Math.round(monthlyEmi);
    setEmi(calculatedEmi);

    const totalEmiPayments = calculatedEmi * n;
    const calcTotalPayable = totalEmiPayments + adminFees;
    const calcTotalInterest = totalEmiPayments - principal;

    setTotalPayable(calcTotalPayable);
    setTotalInterest(Math.max(0, calcTotalInterest));

    let balance = principal;
    const yearlyData = [];
    
    for (let year = 1; year <= Math.ceil(n / 12); year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        if (balance <= 0) break;
        const interestPayment = balance * r;
        const principalPayment = monthlyEmi - interestPayment;
        
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      }

      if (year % 2 === 0 || year === 1) {
         yearlyData.push({
           name: `Year ${year}`,
           Interest: Math.round(yearlyInterest),
           Principal: Math.round(yearlyPrincipal)
         });
      }
    }
    
    setChartData(yearlyData);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US');
  };

  const downPaymentPercent = propertyValue > 0 ? ((downPayment / propertyValue) * 100).toFixed(1) : "0.0";
  const tenureYears = (loanTenureMonths / 12).toFixed(1);
  const monthlyOutflow = emi + monthlyInsurance;
  const loanAmount = propertyValue - downPayment;

  return (
    <div className="calc-page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        
        <div className="calc-box">
          <div className="calc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Advanced Mortgage Loan Calculator</h1>
              <p>Calculate your EMI with insurance and administrative charges</p>
            </div>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          <div className="calc-grid">
            
            {/* Inputs Column */}
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
                label="Down Payment"
                value={downPayment}
                min={0}
                max={propertyValue}
                step={bounds.propStep || 1}
                onChange={setDownPayment}
                isCurrency={true}
                hint={`${downPaymentPercent}% of property value`}
              />

              <FormattedSliderInput
                label="Interest Rate"
                value={interestRate}
                min={0}
                max={15}
                step={0.1}
                onChange={setInterestRate}
                isPercentage={true}
              />

              <FormattedSliderInput
                label="Loan Tenure (Months)"
                value={loanTenureMonths}
                min={12}
                max={360}
                step={12}
                onChange={setLoanTenureMonths}
                hint={`${tenureYears} years`}
              />

              <FormattedSliderInput
                label="Monthly Insurance"
                value={monthlyInsurance}
                min={0}
                max={bounds.insMax}
                step={bounds.insStep || 1}
                onChange={setMonthlyInsurance}
                isCurrency={true}
              />

              <FormattedSliderInput
                label="Administrative Fees"
                value={adminFees}
                min={0}
                max={bounds.adminMax}
                step={bounds.adminStep || 1}
                onChange={setAdminFees}
                isCurrency={true}
              />

            </div>

            {/* Results Column */}
            <div className="calc-results-col">
              
              <div className="calc-results-grid">
                
                <div className="calc-result-box main">
                  <span className="result-label">Monthly EMI</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(emi)}</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Loan Amount</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(loanAmount > 0 ? loanAmount : 0)}</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Total Interest</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(totalInterest)}</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Monthly Outflow</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(monthlyOutflow)}</span>
                  <span className="result-hint">EMI + Insurance</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Total Payable</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(totalPayable)}</span>
                </div>

              </div>

              <div className="calc-chart-container">
                <div className="calc-chart-header">
                  <div className="calc-chart-title">Payment Breakdown (Yearly)</div>
                  <div className="calc-chart-toggles">
                    <button 
                      className={`calc-chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
                      onClick={() => setChartType('bar')}
                    >
                      Bar
                    </button>
                    <button 
                      className={`calc-chart-toggle-btn ${chartType === 'area' ? 'active' : ''}`}
                      onClick={() => setChartType('area')}
                    >
                      Area
                    </button>
                    <button 
                      className={`calc-chart-toggle-btn ${chartType === 'line' ? 'active' : ''}`}
                      onClick={() => setChartType('line')}
                    >
                      Line
                    </button>
                  </div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                  <ResponsiveContainer>
                    {chartType === 'bar' ? (
                      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                        <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                        <Bar dataKey="Interest" stackId="a" fill="#8b0000" barSize={15} />
                        <Bar dataKey="Principal" stackId="a" fill="#c59b27" barSize={15} />
                      </BarChart>
                    ) : chartType === 'area' ? (
                      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                        <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                        <Area type="monotone" dataKey="Interest" stackId="1" stroke="#8b0000" fill="#8b0000" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="Principal" stackId="1" stroke="#c59b27" fill="#c59b27" fillOpacity={0.6} />
                      </AreaChart>
                    ) : (
                      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#8b0000'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#d4af37'}} axisLine={{stroke: '#e0e0e0'}} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '12px' }}/>
                        <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                        <Line type="monotone" dataKey="Interest" stroke="#8b0000" strokeWidth={2} dot={{ r: 3 }} />
                        <Line type="monotone" dataKey="Principal" stroke="#c59b27" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="calc-actions">
                <button className="btn-calc-primary" onClick={handlePrint}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Full PDF Report
                </button>
                <div className="calc-action-row">
                  <button className="btn-calc-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    Call Advisor
                  </button>
                  <button className="btn-calc-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Email Us
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="calc-disclaimer">
          <h4>Important Disclaimer</h4>
          <p>
            AKR Financial & Real Estate Service LLC (Sharjah) and AKR Realty LLC (Dubai) operate as independent, non-custodial advisory entities across the UAE, in line with applicable UAE Central Bank, Insurance Authority, and Real Estate Regulatory Agency (RERA) guidance.
          </p>
          <p>
            All calculator results are for illustrative and educational purposes only and do not constitute financial, investment, tax, or real estate advice. Results are indicative estimates based on the figures you enter and do not guarantee actual future performance. Interest rates, inflation rates, service charges, government fees, rental yields, and property appreciation may vary based on market conditions, lender or developer policies, and individual circumstances.
          </p>
          <p>
            For personalized, regulation-compliant advice, please consult one of our licensed advisors before making any financial or real estate decision.
          </p>
        </div>

      </div>
    </div>
  );
}
