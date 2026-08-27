"use client";
import React, { useState, useEffect } from 'react';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';

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
            <div className="calc-controls" style={{ padding: '0 1rem' }}>
              <FormattedSliderInput
                label="Property Value"
                value={propertyValue}
                min={200000}
                max={35000000}
                step={100000}
                onChange={setPropertyValue}
                isCurrency={true}
              />

              <div style={{ marginTop: '2rem' }}>
                <FormattedSliderInput
                  label="Down Payment"
                  value={downPayment}
                  min={0}
                  max={propertyValue}
                  step={50000}
                  onChange={setDownPayment}
                  isCurrency={true}
                />
              </div>

              <div style={{ marginTop: '2rem' }}>
                <FormattedSliderInput
                  label="Loan Period (Years)"
                  value={loanPeriod}
                  min={1}
                  max={30}
                  step={1}
                  onChange={setLoanPeriod}
                />
              </div>

              <div style={{ marginTop: '2rem' }}>
                <FormattedSliderInput
                  label="Interest Rate"
                  value={interestRate}
                  min={1}
                  max={20}
                  step={0.1}
                  onChange={setInterestRate}
                  isPercentage={true}
                />
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
