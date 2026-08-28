"use client";

import React, { useState, useEffect } from 'react';
import FormattedSliderInput from './FormattedSliderInput';

interface InflationRateSelectorProps {
  value: number;
  onChange: (val: number) => void;
}

type Mode = 'UAE' | 'India' | 'Manual';

export default function InflationRateSelector({ value, onChange }: InflationRateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(() => {
    if (value === 4) return 'UAE';
    if (value === 7) return 'India';
    return 'Manual';
  });

  const handleSelect = (newMode: Mode) => {
    setMode(newMode);
    setIsOpen(false);
    
    if (newMode === 'UAE') {
      onChange(4);
    } else if (newMode === 'India') {
      onChange(7);
    }
  };

  const getModeLabel = (m: Mode) => {
    switch (m) {
      case 'UAE': return 'UAE (approx. 4% p.a. estimate)';
      case 'India': return 'India (approx. 7% p.a. estimate)';
      case 'Manual': return 'Enter Manually';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            background: '#fcfbf8', // standard calc input background
            border: '1px solid #e3cc96', // slightly darker gold border to match screenshot
            padding: '0.8rem 1rem',
            borderRadius: '4px', // slightly less rounded
            color: 'var(--primary-red)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '1rem',
            textAlign: 'left'
          }}
        >
          <span>{getModeLabel(mode)}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.2rem',
            background: '#f4f5f7',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            zIndex: 100,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {(['UAE', 'India', 'Manual'] as Mode[]).map((m) => (
              <div 
                key={m}
                onClick={() => handleSelect(m)}
                style={{
                  padding: '0.8rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#1a1a1a',
                  background: mode === m ? '#e9ecef' : 'transparent',
                  borderBottom: '1px solid #eaeaea',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  if (mode !== m) e.currentTarget.style.background = '#f0f2f5';
                }}
                onMouseLeave={(e) => {
                  if (mode !== m) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{getModeLabel(m)}</span>
                {mode === m && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {mode === 'Manual' && (
        <FormattedSliderInput
          label="Expected Inflation Rate (%)"
          value={value}
          min={1}
          max={15}
          step={0.5}
          onChange={onChange}
          isPercentage={true}
        />
      )}
    </div>
  );
}
