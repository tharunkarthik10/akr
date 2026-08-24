"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Hardcoded fallbacks in case the live API fails
export const FALLBACK_RATES: Record<string, number> = {
  'AED': 1,
  'USD': 0.272,
  'EUR': 0.245,
  'GBP': 0.208,
  'INR': 22.7,
  'RUB': 24.5,
  'LKR': 85.0
};

export const AVAILABLE_CURRENCIES = ['AED', 'USD', 'EUR', 'GBP', 'INR', 'RUB', 'LKR'];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  'AED': 'AED',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'INR': '₹',
  'RUB': '₽',
  'LKR': 'Rs'
};

type CurrencyContextType = {
  currencyCode: string;
  currencySymbol: string;
  setCurrencyCode: (code: string) => void;
  convertAmount: (amount: number, fromCode: string, toCode: string) => number;
  isLiveRates: boolean;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState('AED');
  const [exchangeRates, setExchangeRates] = useState(FALLBACK_RATES);
  const [isLiveRates, setIsLiveRates] = useState(false);

  useEffect(() => {
    // Fetch real-time market exchange rates on load
    fetch('https://api.exchangerate-api.com/v4/latest/AED')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          const liveRates = {
            'AED': data.rates.AED,
            'USD': data.rates.USD,
            'EUR': data.rates.EUR,
            'GBP': data.rates.GBP,
            'INR': data.rates.INR,
            'RUB': data.rates.RUB,
            'LKR': data.rates.LKR,
          };
          setExchangeRates(liveRates);
          setIsLiveRates(true);
          console.log("Successfully loaded live market exchange rates", liveRates);
        }
      })
      .catch(err => {
        console.warn("Failed to load live exchange rates. Using fallback estimates.", err);
      });
  }, []);

  const convertAmount = (amount: number, fromCode: string, toCode: string) => {
    if (fromCode === toCode) return amount;
    const fromRate = exchangeRates[fromCode];
    const toRate = exchangeRates[toCode];
    
    // Convert logic: (amount / fromRate) converts to base AED. Then * toRate converts to target.
    return amount * (toRate / fromRate);
  };

  const currencySymbol = CURRENCY_SYMBOLS[currencyCode] || currencyCode;

  return (
    <CurrencyContext.Provider value={{ currencyCode, currencySymbol, setCurrencyCode, convertAmount, isLiveRates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
