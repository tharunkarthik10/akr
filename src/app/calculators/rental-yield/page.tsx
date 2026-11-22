"use client";

import React, { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import FormattedSliderInput from '@/components/calculator/FormattedSliderInput';
import CurrencySelector from '@/components/calculator/CurrencySelector';
import CalculatorCTAs from '@/components/calculator/CalculatorCTAs';

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

              <CalculatorCTAs />

            </div>
          </div>
        </div>

        <div className="calc-disclaimer">
          <h4 style={{ fontWeight: 700 }}>Important Disclaimer</h4>
          <p style={{ fontWeight: 600 }}>
            <strong style={{ color: '#b8962c' }}>AKR Financial and Real Estate Service LLC</strong> (SHAMS, Sharjah, UAE) and{' '}
            <strong style={{ color: '#b8962c' }}>AKR Realty LLC</strong> (Al Garhoud, Dubai, UAE) operate within their licensed scopes under UAE regulatory guidelines. All calculator results are for strategic consultation, clear understanding, and educational purposes only—not formal financial or real estate advice. Please schedule a private consultation with our senior specialists for personalized guidance.
          </p>
        </div>

      </div>
    </div>
  );
}
