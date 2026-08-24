"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [langCode, setLangCode] = useState('EN');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (code: string, googleCode: string) => {
    setLangCode(code);
    setDropdownOpen(false);
    
    // Trigger Google Translate
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = googleCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header className="header-container">
      {/* Top Bar (Dark Red) */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span className="license-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              RERA DLD LICENSED
            </span>
            <span className="license-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
              SHAMS FREEZONE LICENSED
            </span>
          </div>
          <div className="top-bar-right">
            <span className="contact-item" style={{ textTransform: 'lowercase' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              info@akrgroupuae.com
            </span>
            <span className="contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +971 55 884 7365
            </span>
            <span className="divider" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>|</span>
            <Link href="/login" className="login-link">Login</Link>
            <Link href="/dashboard" className="btn-dashboard">Dashboard</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar (White) */}
      <nav className="main-nav">
        <div className="nav-container">
          <Link href="/" className="logo-section">
            <img 
              src="/logo/akrlogo.png" 
              alt="AKR Group UAE Logo" 
              style={{ height: '55px', width: 'auto', objectFit: 'contain' }} 
            />
            <div className="logo-text ml-2">
              <div className="logo-title font-serif" style={{ color: 'var(--primary-red)', fontSize: '1.4rem', fontWeight: 'bold', lineHeight: '1.2' }}>AKR GROUP UAE</div>
              <div className="logo-subtitle" style={{ color: '#c59b27', fontSize: '0.65rem', letterSpacing: '1px', fontWeight: '600' }}>FINANCIAL & REAL ESTATE INVESTMENT ARCHITECTS</div>
            </div>
          </Link>
          
          <ul className="nav-links">
            <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link></li>
            <li><Link href="/realty" className={`nav-link ${pathname === '/realty' ? 'active' : ''}`}>AKR Realty</Link></li>
            <li><Link href="/financial" className={`nav-link ${pathname === '/financial' ? 'active' : ''}`}>AKR Financial</Link></li>
            <li><Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About us</Link></li>
            <li><Link href="/calculators" className={`nav-link ${pathname === '/calculators' ? 'active' : ''}`}>Calculator</Link></li>
            <li><Link href="/property" className={`nav-link ${pathname === '/property' ? 'active' : ''}`}>Property</Link></li>
            <li><Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
            <li 
              className="notranslate"
              translate="no"
              style={{ position: 'relative' }}
              onMouseEnter={() => setDropdownOpen(true)} 
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="nav-link" style={{ textTransform: 'uppercase', cursor: 'pointer', display: 'flex', gap: '4px', alignItems: 'center' }}>
                Language <span style={{ color: 'var(--accent-gold)' }}>[{langCode}]</span>
              </div>
              
              {dropdownOpen && (
                <div className="lang-dropdown-wrapper">
                  <div className="lang-dropdown">
                    <div className="lang-item" onClick={() => handleLanguageChange('EN', 'en')}>English</div>
                    <div className="lang-item" onClick={() => handleLanguageChange('TA', 'ta')}>தமிழ்</div>
                    <div className="lang-item" onClick={() => handleLanguageChange('AR', 'ar')}>العربية</div>
                    <div className="lang-item" onClick={() => handleLanguageChange('RU', 'ru')}>Русский</div>
                    <div className="lang-item" onClick={() => handleLanguageChange('DE', 'de')}>Deutsch</div>
                    <div className="lang-item" onClick={() => handleLanguageChange('FR', 'fr')}>Français</div>
                    <div className="lang-item" onClick={() => handleLanguageChange('SI', 'si')}>සිංහල</div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
