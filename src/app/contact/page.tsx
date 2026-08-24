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
                  <h3>Phone</h3>
                  <p>+971 55 884 7365</p>
                  <span className="highlight">Available 24/7</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MailIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Email</h3>
                  <p>info@akrgroupuae.com</p>
                  <span className="highlight">Response within 24 hours</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MessageIcon />
                </div>
                <div className="contact-info-content">
                  <h3>WhatsApp</h3>
                  <p>+971 50 777 2751</p>
                  <span className="highlight">Instant messaging</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-wrapper">
                  <MapPinIcon />
                </div>
                <div className="contact-info-content">
                  <h3>Office</h3>
                  <p>Downtown Dubai</p>
                  <p>Dubai, United Arab Emirates</p>
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
            <div className="quick-actions" style={{ marginTop: '1.5rem' }}>
              <button className="btn-whatsapp">
                <MessageIcon /> Chat on WhatsApp
              </button>
              <button className="btn-call">
                <PhoneIcon /> Schedule Call
              </button>
              <button className="btn-email">
                <MailIcon /> Send Email
              </button>
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
              <p>AKR Realty LLC is a RERA-Dubai Land Department -registered and licensed real estate brokerage in Dubai-UAE ORN no:57750 & BRN NO:95660 All property transactions are subject to UAE laws and DLD regulations.</p>
            </div>

            <div className="regulated-item">
              <h3>AKR Financial & Real Estate LLC</h3>
              <p>AKR FINANCIAL AND REAL ESTATE SERVICE LLC - Registered and Licensed by SHAMS, SHARJAH -UAE License no:24286.01 Financial & Real Estate & Marketing advisory services are subject to UAE regulatory requirements and approvals where-ever applicable.</p>
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
