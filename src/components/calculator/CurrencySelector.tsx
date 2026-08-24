"use client";

import React, { useState } from 'react';
import { useCurrency, AVAILABLE_CURRENCIES, CURRENCY_SYMBOLS } from '@/context/CurrencyContext';

interface CurrencySelectorProps {
  onCurrencyChange: (oldCode: string, newCode: string) => void;
}

export default function CurrencySelector({ onCurrencyChange }: CurrencySelectorProps) {
  const { currencyCode, setCurrencyCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const availableCurrencies = AVAILABLE_CURRENCIES;

  const handleSelect = (code: string) => {
    if (code !== currencyCode) {
      onCurrencyChange(currencyCode, code);
      setCurrencyCode(code);
    }
    setIsOpen(false);
  };

  return (
    <div className="currency-selector" style={{ position: 'relative' }}>
      <button 
        className="currency-dropdown-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'white',
          border: '1px solid rgba(139, 0, 0, 0.2)',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          color: 'var(--primary-red)',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          minWidth: '95px',
          justifyContent: 'space-between'
        }}
      >
        <span className="notranslate" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          {CURRENCY_SYMBOLS[currencyCode] !== currencyCode && (
            <span style={{ opacity: 0.8 }}>{CURRENCY_SYMBOLS[currencyCode]}</span>
          )}
          <span>{currencyCode}</span>
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.5rem',
          background: 'white',
          border: '1px solid rgba(139, 0, 0, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '6px',
          zIndex: 100,
          overflow: 'hidden'
        }}>
          {availableCurrencies.map(code => (
            <div 
              key={code}
              className="notranslate"
              onClick={() => handleSelect(code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                padding: '0.6rem 1rem',
                cursor: 'pointer',
                color: code === currencyCode ? 'var(--accent-gold)' : 'var(--primary-red)',
                background: code === currencyCode ? 'rgba(139, 0, 0, 0.05)' : 'transparent',
                fontWeight: code === currencyCode ? 700 : 500,
                borderBottom: '1px solid rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(139, 0, 0, 0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = code === currencyCode ? 'rgba(139, 0, 0, 0.05)' : 'transparent')}
            >
              {CURRENCY_SYMBOLS[code] !== code && (
                <span style={{ display: 'inline-flex', justifyContent: 'center', minWidth: '24px', marginRight: '8px', opacity: 0.8 }}>
                  {CURRENCY_SYMBOLS[code]}
                </span>
              )}
              <span>{code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
