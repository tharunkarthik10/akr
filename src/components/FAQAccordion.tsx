"use client";

import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FAQAccordion({ items, title, subtitle, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`faq-accordion-container ${className}`} style={{ marginTop: '3rem', marginBottom: '3rem' }}>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-tag inline-block" style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '1.5px', fontSize: '0.85rem' }}>
            GOT QUESTIONS?
          </span>
          <h2 className="font-serif text-center" style={{ color: 'var(--primary-red)', fontSize: '2rem', marginTop: '0.5rem', fontWeight: 700 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: '#666', maxWidth: '650px', margin: '0.5rem auto 0', fontSize: '1rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: isOpen ? '1.5px solid var(--accent-gold)' : '1px solid rgba(197, 155, 39, 0.2)',
                boxShadow: isOpen ? '0 4px 16px rgba(139, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
                overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  backgroundColor: isOpen ? '#FCFBF8' : '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                }}
              >
                <span className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 600, color: isOpen ? 'var(--primary-red)' : '#2C2C2C', paddingRight: '1rem' }}>
                  {item.question}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'var(--primary-red)' : 'rgba(197, 155, 39, 0.15)',
                    color: isOpen ? '#FFFFFF' : 'var(--primary-red)',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    flexShrink: 0,
                    transition: 'all 0.25s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ▼
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    backgroundColor: '#FCFBF8',
                    borderTop: '1px solid rgba(197, 155, 39, 0.15)',
                    color: '#444',
                    lineHeight: '1.7',
                    fontSize: '0.98rem',
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
