"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ModernChildEducationCalculator from '@/components/calculator/ModernChildEducationCalculator';

export default function ChildEducationPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you ${leadForm.name || 'Valued Client'}! Your detailed report has been sent to ${leadForm.email || 'your email'}.`);
    setLeadModalOpen(false);
    setLeadForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="calc-landing-page" style={{ paddingTop: '2.5rem', paddingBottom: '4.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/calculators" style={{ color: '#8b0000', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>←</span> Back to All Calculators
          </Link>
        </div>

        <div className="calc-main-panel-card">
          <ModernChildEducationCalculator onShowLeadCapture={() => setLeadModalOpen(true)} />
        </div>

        {leadModalOpen && (
          <div className="calc-modal-backdrop" onClick={() => setLeadModalOpen(false)}>
            <div className="calc-modal-box" onClick={e => e.stopPropagation()}>
              <h3 className="calc-modal-title">Get Your Detailed Report</h3>
              <p className="calc-modal-desc">Enter your details to receive a comprehensive investment report via email.</p>
              <form onSubmit={handleLeadSubmit}>
                <div className="calc-form-group">
                  <label className="calc-field-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="calc-field-input"
                    value={leadForm.name}
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  />
                </div>

                <div className="calc-form-group">
                  <label className="calc-field-label">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="calc-field-input"
                    value={leadForm.email}
                    onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                  />
                </div>

                <div className="calc-form-group">
                  <label className="calc-field-label">Phone Number (with Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+971 XX XXX XXXX"
                    className="calc-field-input"
                    value={leadForm.phone}
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-calc-download-pdf">
                    Download Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeadModalOpen(false)}
                    className="btn-calc-sub-action"
                    style={{ width: '120px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
