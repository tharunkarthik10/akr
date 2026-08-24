"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useCurrency } from '@/context/CurrencyContext';

interface FormattedSliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  hint?: string;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export default function FormattedSliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  hint,
  isCurrency = false,
  isPercentage = false,
}: FormattedSliderInputProps) {
  const { currencySymbol } = useCurrency();
  
  // Format numeric value for text input (e.g. 1000000 -> "1,000,000")
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const [displayValue, setDisplayValue] = useState(formatNumber(value));

  // Sync internal display value when external value changes
  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/,/g, '');
    setDisplayValue(e.target.value); // Allow typing temporarily without snapping to commas immediately if mid-edit

    const numVal = parseFloat(rawVal);
    if (!isNaN(numVal)) {
      onChange(numVal);
    }
  };

  const handleBlur = () => {
    // Snap to valid range on blur
    let finalVal = value;
    if (finalVal < min) finalVal = min;
    if (finalVal > max) finalVal = max;
    
    onChange(finalVal);
    setDisplayValue(formatNumber(finalVal));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numVal = parseFloat(e.target.value);
    onChange(numVal);
  };

  return (
    <div className="calc-input-group">
      <div className="calc-input-header">
        <label>{label}</label>
        <div className="calc-input-value-display notranslate">
          {isCurrency && <span className="calc-symbol">{currencySymbol}</span>}
          <input
            type="text"
            className="calc-text-input-raw"
            value={displayValue}
            onChange={handleTextChange}
            onBlur={handleBlur}
          />
          {isPercentage && <span className="calc-symbol">%</span>}
        </div>
      </div>

      <input
        type="range"
        className="calc-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
      />
      
      {hint && <span className="calc-input-hint">{hint}</span>}
    </div>
  );
}
