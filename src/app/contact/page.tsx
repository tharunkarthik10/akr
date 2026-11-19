"use client";

import React from 'react';

// Reusable SVG Icons
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

export default function Contact() {
  return (
    <div className="contact-page-bg">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with our expert advisors</p>
      </div>

      <div className="contact-grid">
        {/* Left Column */}
        <div className="contact-left">
          <div className="contact-card">
            <h2>Get in Touch</h2>
            <p className="contact-card-sub">We're here to help you with your investment journey</p>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <PhoneIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Office Direct</h3>
                  <p><a href="tel:+971558847365" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+971 55 884 7365</a></p>
                  <span className="highlight">Head Office &amp; Realty Inquiries</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <PhoneIcon />
                </div>
                <div className="contact-info-content">
                  <h3>AKR Financial Direct</h3>
                  <p><a href="tel:+971585887864" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+971 58 588 7864</a></p>
                  <span className="highlight">Banking, Loans &amp; Investments</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MailIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Email</h3>
                  <p><a href="mailto:info@akrgroupuae.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@akrgroupuae.com</a></p>
                  <span className="highlight">Response within 24 hours</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MessageIcon />
                </div>
                <div className="contact-info-content">
                  <h3>WhatsApp Primary</h3>
                  <p><a href="https://wa.me/971507772751" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+971 50 777 2751</a></p>
                  <span className="highlight">Primary Instant Messaging</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MessageIcon />
                </div>
                <div className="contact-info-content">
                  <h3>WhatsApp Secondary</h3>
                  <p><a href="https://wa.me/971558847365" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>+971 55 884 7365</a></p>
                  <span className="highlight">Secondary Instant Messaging</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MapPinIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Dubai Office — AKR Realty LLC</h3>
                  <p>No: 104 Sarah Building, Plot No-115-0, AL Garhoud</p>
                  <p>Dubai, United Arab Emirates</p>
                  <p style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>Direct Tel: <a href="tel:+971558847365" style={{ color: 'var(--primary-red)', fontWeight: 600, textDecoration: 'none' }}>+971 55 884 7365</a></p>
                  <span className="highlight" style={{ marginTop: '0.35rem', display: 'inline-block' }}>RERA / DLD Lic: 1578426 | ORN: 57750 | BRN: 95660</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MapPinIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Sharjah Office — AKR Financial and Real Estate Service LLC</h3>
                  <p>SHAMS (Sharjah Media City)</p>
                  <p>Sharjah, United Arab Emirates</p>
                  <p style={{ marginTop: '0.3rem', fontSize: '0.85rem' }}>Financial Tel: <a href="tel:+971585887864" style={{ color: 'var(--primary-red)', fontWeight: 600, textDecoration: 'none' }}>+971 58 588 7864</a></p>
                  <span className="highlight" style={{ marginTop: '0.35rem', display: 'inline-block' }}>SHAMS Freezone Lic: 24286.01</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <ClockIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Business Hours</h3>
                  <p>Sunday - Thursday</p>
                  <p>9:00 AM - 6:00 PM GST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a href="https://wa.me/971507772751" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ textDecoration: 'none' }}>
                <MessageIcon /> WhatsApp Primary (+971 50 777 2751)
              </a>
              <a href="https://wa.me/971558847365" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ textDecoration: 'none', backgroundColor: '#1e7b34' }}>
                <MessageIcon /> WhatsApp Secondary (+971 55 884 7365)
              </a>
              <a href="tel:+971558847365" className="btn-call" style={{ textDecoration: 'none' }}>
                <PhoneIcon /> Call Head Office (+971 55 884 7365)
              </a>
              <a href="mailto:info@akrgroupuae.com" className="btn-email" style={{ textDecoration: 'none' }}>
                <MailIcon /> Send Email (info@akrgroupuae.com)
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="contact-right">
          <div className="contact-card">
            <h2>Send us a Message</h2>
            <p className="contact-card-sub">Fill out the form below and our team will get back to you shortly</p>

            <form className="form-grid">
              <div className="form-group">
                <label>Full Name <span>*</span></label>
                <input type="text" className="form-control" placeholder="Enter your name" required />
              </div>

              <div className="form-group">
                <label>Email Address <span>*</span></label>
                <input type="email" className="form-control" placeholder="your@email.com" required />
              </div>

              <div className="form-group">
                <label>Phone Number <span>*</span></label>
                <input type="tel" className="form-control" placeholder="+971 XX XXX XXXX" required />
              </div>

              <div className="form-group">
                <label>Subject <span>*</span></label>
                <select className="form-control" required>
                  <option>General Inquiry</option>
                  <option>Property Investment</option>
                  <option>Financial Advisory</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group form-full">
                <label>Message <span>*</span></label>
                <textarea className="form-control" rows={4} placeholder="Tell us about your investment goals and how we can help..." required></textarea>
              </div>

              <div className="form-full">
                <div className="privacy-notice">
                  <p><strong>Privacy Notice:</strong> Your information is confidential and will only be used to respond to your inquiry. We comply with UAE data protection regulations.</p>
                </div>
              </div>

              <div className="form-full">
                <button type="submit" className="btn-submit">
                  <SendIcon /> Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="contact-card regulated-card">
            <h2>Licensed & Regulated</h2>
            
            <div className="regulated-item">
              <h3>AKR Realty LLC</h3>
              <p style={{ fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                📍 No: 104 Sarah Building, Plot No-115-0, AL Garhoud, Dubai, United Arab Emirates
              </p>
              <p style={{ fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                📞 Office Direct: <a href="tel:+971558847365" style={{ color: 'var(--accent-gold)', fontWeight: 600, textDecoration: 'none' }}>+971 55 884 7365</a>
              </p>
              <p>AKR Realty LLC is a RERA-Dubai Land Department registered and licensed real estate brokerage in Dubai-UAE (License no: 1578426, ORN no: 57750 &amp; BRN no: 95660). All property transactions are subject to UAE laws and DLD regulations.</p>
            </div>

            <div className="regulated-item">
              <h3>AKR Financial and Real Estate Service LLC</h3>
              <p style={{ fontWeight: 600, color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>
                📍 SHAMS, Sharjah, United Arab Emirates
              </p>
              <p style={{ fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                📞 AKR Financial Direct: <a href="tel:+971585887864" style={{ color: 'var(--accent-gold)', fontWeight: 600, textDecoration: 'none' }}>+971 58 588 7864</a>
              </p>
              <p>AKR Financial and Real Estate Service LLC — Registered and Licensed by SHAMS, SHARJAH - UAE License no: 24286.01. Financial, Real Estate & Marketing advisory services are subject to UAE regulatory requirements and approvals wherever applicable.</p>
            </div>

            <div className="regulated-disclaimer">
              <p>All services are provided in compliance with UAE regulations. Advisory services do not constitute financial transactions or brokerage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
