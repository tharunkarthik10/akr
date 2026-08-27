"use client";
import React, { useState, useEffect } from 'react';

export default function MortgageCalculator() {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [loanPeriod, setLoanPeriod] = useState(15);
  const [interestRate, setInterestRate] = useState(5.0);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanPeriod * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments || 0);
    } else if (principal > 0) {
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment || 0);
    } else {
      setMonthlyPayment(0);
    }
  }, [propertyValue, downPayment, loanPeriod, interestRate]);

  const totalCost = (monthlyPayment * loanPeriod * 12).toFixed(0);

  return (
    <section className="interactive-calc-section">
      <div className="container">
        <div className="calc-grid-new">
          {/* Left Side Content */}
          <div className="calc-content-new">
            <h2 className="calc-main-title font-serif">Expert <span className="text-gold font-serif">Mortgage</span><br/>Solutions</h2>
            <p className="calc-text-new">
              AKR Group connects you with premier banking institutions offering competitive rates and flexible terms tailored to your unique financial situation.
            </p>
            <p className="calc-subtitle-bold font-bold mt-4 mb-2">Our mortgage specialists provide:</p>
            <ul className="calc-bullets-new">
              <li>Industry-leading mortgage rates</li>
              <li>Customized repayment plans</li>
              <li>Expedited approval processes</li>
              <li>Expert property financing guidance</li>
            </ul>
            <div className="calc-action-buttons mt-8">
              <button className="btn-hero-secondary">Learn More</button>
              <button className="btn-hero-secondary">Speak to Our Team</button>
            </div>
          </div>

          {/* Right Side Calculator Card */}
          <div className="calc-dark-card">
            <div className="text-center mb-6">
              <h3 className="font-sans font-bold text-2xl text-gray-900" style={{ letterSpacing: '1px', marginTop: '-3px' }}>MORTGAGE CALCULATOR</h3>
            </div>
            <div className="calc-controls">
              {/* Property Value */}
              <div className="slider-group">
                <div className="slider-labels flex flex-col sm:flex-row justify-between mb-2 items-start sm:items-center">
                  <span className="text-gray-700 text-sm mb-1 sm:mb-0">Property Value (AED)</span>
                  <input 
                    type="text" 
                    value={propertyValue.toLocaleString()}
                    onChange={(e) => setPropertyValue(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
                    className="w-full sm:w-48 text-left sm:text-right text-gray-900 font-bold focus:outline-none"
                    style={{ border: 'none', outline: 'none', background: 'transparent', boxShadow: 'none', fontSize: '1.6rem' }}
                  />
                </div>
                <input 
                  type="range" 
                  min="200000" 
                  max="35000000" 
                  step="100000"
                  value={propertyValue} 
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits flex justify-between text-xs text-gray-500 mt-2">
                  <span>200K</span>
                  <span className="border-b border-gray-400 pb-1">1,000,000</span>
                  <span>35M</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="slider-group mt-6">
                <div className="slider-labels flex flex-col sm:flex-row justify-between mb-2 items-start sm:items-center">
                  <span className="text-gray-700 text-sm mb-1 sm:mb-0">Down Payment (AED)</span>
                  <input 
                    type="text" 
                    value={downPayment.toLocaleString()}
                    onChange={(e) => setDownPayment(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
                    className="w-full sm:w-48 text-left sm:text-right text-gray-900 font-bold focus:outline-none"
                    style={{ border: 'none', outline: 'none', background: 'transparent', boxShadow: 'none', fontSize: '1.6rem' }}
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={propertyValue} 
                  step="50000"
                  value={downPayment} 
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Loan Period */}
              <div className="slider-group mt-6">
                <div className="slider-labels flex flex-col sm:flex-row justify-between mb-2 items-start sm:items-center">
                  <span className="text-gray-700 text-sm mb-1 sm:mb-0">Loan Period (Years)</span>
                  <input 
                    type="text" 
                    value={loanPeriod.toLocaleString()}
                    onChange={(e) => setLoanPeriod(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
                    className="w-full sm:w-40 text-left sm:text-right text-gray-900 font-bold focus:outline-none"
                    style={{ border: 'none', outline: 'none', background: 'transparent', boxShadow: 'none', fontSize: '1.6rem' }}
                  />
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  value={loanPeriod} 
                  onChange={(e) => setLoanPeriod(Number(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="slider-group mt-6">
                <div className="slider-labels flex flex-col sm:flex-row justify-between mb-2 items-start sm:items-center">
                  <span className="text-gray-700 text-sm mb-1 sm:mb-0">Interest Rate (%)</span>
                  <input 
                    type="text" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
                    className="w-full sm:w-40 text-left sm:text-right text-gray-900 font-bold focus:outline-none"
                    style={{ border: 'none', outline: 'none', background: 'transparent', boxShadow: 'none', fontSize: '1.6rem' }}
                  />
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="0.1"
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-limits flex justify-between text-xs text-gray-500 mt-2">
                  <span>1%</span>
                  <span>10%</span>
                  <span>20%</span>
                </div>
              </div>

              <div className="text-center pt-6 mt-6 border-b border-gray-300 pb-2">
                <p className="text-gray-900 text-xl font-medium mb-1">Estimated Monthly Payment</p>
                <h2 className="text-5xl font-bold my-2" style={{ color: 'var(--accent-gold)' }}>
                  AED {Math.round(monthlyPayment).toLocaleString()}
                </h2>
                <p className="text-gray-900 text-lg mt-3 font-medium">Total Cost: AED {Number(totalCost).toLocaleString()}</p>
              </div>

              <button className="btn-gold-full -mt-5">Get Mortgage Consultation</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
