"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  langCode: string;
  setLangCode: (code: string) => void;
  currency: string;
  currencySymbol: string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [langCode, setLangCode] = useState('EN');
  const [currency, setCurrency] = useState('AED');
  const [currencySymbol, setCurrencySymbol] = useState('AED');

  useEffect(() => {
    // Map language code to currency
    switch (langCode) {
      case 'EN':
      case 'AR':
        setCurrency('AED');
        setCurrencySymbol('AED');
        break;
      case 'TA':
        setCurrency('INR');
        setCurrencySymbol('₹');
        break;
      case 'DE':
        setCurrency('EUR');
        setCurrencySymbol('€');
        break;
      default:
        setCurrency('AED');
        setCurrencySymbol('AED');
    }
  }, [langCode]);

  return (
    <LanguageContext.Provider value={{ langCode, setLangCode, currency, currencySymbol }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
