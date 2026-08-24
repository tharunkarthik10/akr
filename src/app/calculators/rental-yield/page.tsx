"use client";

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';

export default function RentalYieldCalculatorPage() {
  const { currencySymbol, convertAmount } = useCurrency();

  const [propertyValue, setPropertyValue] = useState(1000000);
  const [annualRent, setAnnualRent] = useState(80000);
  const [serviceCharges, setServiceCharges] = useState(15000);

  // Dynamic boundaries based on currency (Relative to base AED bounds)
  const [bounds, setBounds] = useState({
    propMax: 20000000,
    propStep: 50000,
    rentMax: 2000000,
    rentStep: 5000,
    serviceMax: 500000,
    serviceStep: 1000
  });

  const handleCurrencyChange = (oldCode: string, newCode: string) => {
    // Mathematically convert all currency values
    setPropertyValue(Math.round(convertAmount(propertyValue, oldCode, newCode)));
    setAnnualRent(Math.round(convertAmount(annualRent, oldCode, newCode)));
    setServiceCharges(Math.round(convertAmount(serviceCharges, oldCode, newCode)));

    // Scale boundaries
    setBounds({
      propMax: Math.round(convertAmount(20000000, 'AED', newCode)),
      propStep: Math.round(convertAmount(50000, 'AED', newCode)),
      rentMax: Math.round(convertAmount(2000000, 'AED', newCode)),
      rentStep: Math.round(convertAmount(5000, 'AED', newCode)),
      serviceMax: Math.round(convertAmount(500000, 'AED', newCode)),
      serviceStep: Math.round(convertAmount(1000, 'AED', newCode)),
    });
  };

  // Derived state
  const grossYield = propertyValue > 0 ? (annualRent / propertyValue) * 100 : 0;
  const netIncome = annualRent - serviceCharges;
  const netYield = propertyValue > 0 ? (netIncome / propertyValue) * 100 : 0;

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US');
  };

  return (
    <div className="calc-page-wrapper">
      <div className="container" style={{ paddingTop: '2rem' }}>
        
        <div className="calc-box">
          <div className="calc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Rental Yield ROI Calculator</h1>
              <p>Calculate gross and net rental yield to analyze property income returns</p>
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
                label="Expected Annual Rent"
                value={annualRent}
                min={0}
                max={bounds.rentMax}
                step={bounds.rentStep || 1}
                onChange={setAnnualRent}
                isCurrency={true}
              />

              <FormattedSliderInput
                label="Annual Service Charges"
                value={serviceCharges}
                min={0}
                max={bounds.serviceMax}
                step={bounds.serviceStep || 1}
                onChange={setServiceCharges}
                isCurrency={true}
                hint="Maintenance, management fees, etc."
              />

            </div>

            {/* Results Column */}
            <div className="calc-results-col">
              
              <div className="calc-results-grid">
                
                <div className="calc-result-box main">
                  <span className="result-label">Net Rental Yield</span>
                  <span className="result-value notranslate">{netYield.toFixed(2)}%</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Gross Rental Yield</span>
                  <span className="result-value notranslate">{grossYield.toFixed(2)}%</span>
                </div>

                <div className="calc-result-box secondary">
                  <span className="result-label">Net Annual Income</span>
                  <span className="result-value notranslate">{currencySymbol} {formatCurrency(Math.max(0, netIncome))}</span>
                </div>

              </div>

              <div className="calc-actions" style={{ marginTop: '2rem' }}>
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
