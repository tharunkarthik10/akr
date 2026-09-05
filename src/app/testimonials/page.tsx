"use client";

import React from 'react';
import Link from 'next/link';

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      quote: "AKR Group's dual expertise in Dubai real estate and Sharjah financial structuring gave us unprecedented clarity on our commercial property acquisitions. Their advisors are second to none.",
      author: "Rashid Al-Maktoum",
      role: "Managing Director, Sovereign Asset Management",
      sector: "Real Estate & Structuring",
      location: "Dubai, UAE",
      rating: 5,
    },
    {
      id: 2,
      quote: "As an international investor expanding into the UAE market, I needed transparent guidance across property advisory, tax efficiency, and yield calculations. AKR delivered on all fronts.",
      author: "Elena Rostova",
      role: "Private Investor",
      sector: "Wealth & Investment",
      location: "Abu Dhabi, UAE",
      rating: 5,
    },
    {
      id: 3,
      quote: "The strategic financial planning and mortgage optimization provided by AKR Financial saved our family business substantial interest costs over a 15-year tenure. Highly recommended.",
      author: "Vikram Sengupta",
      role: "Founder & CEO, Apex Logistics",
      sector: "Financial Solutions",
      location: "Sharjah, UAE",
      rating: 5,
    },
    {
      id: 4,
      quote: "Their comprehensive risk management and corporate insurance advisory gave our enterprise the stability needed during high-growth asset acquisitions in Downtown Dubai.",
      author: "Marcus Vance",
      role: "Chief Operating Officer, Vance Capital",
      sector: "Insurance & Risk Protection",
      location: "Dubai, UAE",
      rating: 5,
    },
    {
      id: 5,
      quote: "AKR's marketing and positioning team brought our luxury residential project into the spotlight, connecting us with UHNW buyers across Europe and the GCC region within weeks.",
      author: "Tariq Mansoor",
      role: "Real Estate Developer",
      sector: "Strategic Marketing",
      location: "Dubai, UAE",
      rating: 5,
    },
    {
      id: 6,
      quote: "Navigating RERA compliance and property yield analysis was effortless with AKR Realty. Professional, data-driven, and completely transparent from start to finish.",
      author: "Sarah Jenkins",
      role: "Portfolio Manager",
      sector: "Real Estate Advisory",
      location: "Dubai, UAE",
      rating: 5,
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Hero Banner */}
      <section className="properties-hero">
        <h1>Client Testimonials & Success Stories</h1>
        <p>Trusted by Sovereign Investors, HNWIs & Families Across the UAE</p>
      </section>

      <div className="properties-container" style={{ marginTop: '2rem' }}>
        
        {/* Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {testimonials.map((t) => (
            <div 
              key={t.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '2rem',
                border: '1px solid #eaeaea',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ backgroundColor: 'rgba(128, 0, 0, 0.08)', color: 'var(--primary-red)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                    {t.sector}
                  </span>
                  <div style={{ color: 'var(--accent-gold)', fontSize: '1rem' }}>
                    {'★'.repeat(t.rating)}
                  </div>
                </div>

                <p style={{ color: '#2C2C2C', fontStyle: 'italic', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div style={{ borderTop: '1px solid #F0ECE1', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h4 className="font-serif" style={{ color: 'var(--primary-red)', margin: 0, fontWeight: 700, fontSize: '1.05rem' }}>
                    {t.author}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                    {t.role}
                  </p>
                </div>
                <span style={{ color: '#888', fontSize: '0.8rem', fontWeight: 500 }}>
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call To Action Banner */}
        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
          <h2>Ready to Architect Your Growth & Legacy?</h2>
          <p>Connect with our licensed advisory specialists for confidential, data-driven solutions across UAE real estate & wealth management</p>
          <div className="guidance-actions">
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <button className="btn-white">
                Speak To an Advisor
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
