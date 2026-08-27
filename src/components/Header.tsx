"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { langCode, setLangCode } = useLanguage();
  const { setCurrencyCode } = useCurrency();
  const { user, signOut } = useAuth() as any;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLanguageChange = (code: string, googleCode: string) => {
    setLangCode(code);
    setDropdownOpen(false);

    // Map language to currency
    const langToCurrency: Record<string, string> = {
      'EN': 'AED',
      'TA': 'INR',
      'AR': 'AED',
      'RU': 'RUB',
      'DE': 'EUR',
      'FR': 'EUR',
      'SI': 'LKR'
    };
    if (langToCurrency[code]) {
      setCurrencyCode(langToCurrency[code]);
    }
    
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
            <div className="contact-icons-group">
              <a href="mailto:info@akrgroupuae.com" className="contact-item" style={{ textTransform: 'lowercase', textDecoration: 'none', color: 'inherit' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span className="hide-text-mobile">info@akrgroupuae.com</span>
              </a>
              <a href="tel:+971558847365" className="contact-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="hide-text-mobile">+971 55 884 7365</span>
              </a>
              <a href="https://wa.me/971558847365" target="_blank" rel="noopener noreferrer" className="contact-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-gold"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span className="hide-text-mobile">WhatsApp</span>
              </a>
            </div>
            <span className="divider hide-text-mobile" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>|</span>
            <Link href={user ? "/client" : "/login"} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {user ? (user.email?.split('@')[0] || 'Client') : 'Login'}
            </Link>
            {user && (
              <>
                <span className="divider" style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>|</span>
                <button 
                  onClick={() => signOut()} 
                  style={{ color: '#888', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600 }}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar (White) */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-header">
            <Link href="/" className="logo-section" onClick={closeMobileMenu}>
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
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-red)' }}>
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
          
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} key={user ? 'client' : 'public'}>
            {!user ? (
              // PUBLIC NAVIGATION (Logged Out)
              <>
                <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>Home</Link></li>
                <li><Link href="/realty" className={`nav-link ${pathname === '/realty' ? 'active' : ''}`} onClick={closeMobileMenu}>AKR Realty</Link></li>
                <li><Link href="/financial" className={`nav-link ${pathname === '/financial' ? 'active' : ''}`} onClick={closeMobileMenu}>AKR Financial</Link></li>
                <li><Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={closeMobileMenu}>About us</Link></li>
                <li
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setCalcDropdownOpen(true)}
                  onMouseLeave={() => setCalcDropdownOpen(false)}
                >
                  <span className={`nav-link ${pathname.startsWith('/calculators') ? 'active' : ''}`} style={{ cursor: 'pointer' }}>Calculator</span>
                  
                  {calcDropdownOpen && (
                    <div className="simple-dropdown-wrapper">
                      <div className="simple-dropdown">
                        <Link href="/calculators/mortgage" className="simple-dropdown-item" onClick={closeMobileMenu}>Mortgage Calculator</Link>
                        <Link href="/calculators/off-plan" className="simple-dropdown-item" onClick={closeMobileMenu}>Off-Plan Calculator</Link>
                        <Link href="/calculators/rental-yield" className="simple-dropdown-item" onClick={closeMobileMenu}>Rental Yield ROI Calculator</Link>
                        <Link href="/calculators/xirr" className="simple-dropdown-item" onClick={closeMobileMenu}>XIRR Calculator</Link>
                        <Link href="/calculators/mutual-fund" className="simple-dropdown-item" onClick={closeMobileMenu}>Mutual Fund Calculator</Link>
                        <Link href="/calculators/child-education" className="simple-dropdown-item" onClick={closeMobileMenu}>Child Education Calculator</Link>
                        <Link href="/calculators/retirement" className="simple-dropdown-item" onClick={closeMobileMenu}>Retirement Calculator</Link>
                      </div>
                    </div>
                  )}
                </li>
                <li><Link href="/property" className={`nav-link ${pathname === '/property' ? 'active' : ''}`} onClick={closeMobileMenu}>Property</Link></li>
                <li><Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} onClick={closeMobileMenu}>Contact</Link></li>
              </>
            ) : (
              // LOGGED IN NAVIGATION
              user.email?.toLowerCase() === 'tharunkarthikav21@gmail.com' ? (
                // ADMIN LINKS (Removed as they are in the dashboard tabs)
                <></>
              ) : (
                // CLIENT LINKS
                <>
                  <li><Link href="/client/properties" className={`nav-link ${pathname === '/client/properties' ? 'active' : ''}`} onClick={closeMobileMenu}>My Properties</Link></li>
                  <li><Link href="/client/post-property" className={`nav-link ${pathname === '/client/post-property' ? 'active' : ''}`} onClick={closeMobileMenu}>Post a Property</Link></li>
                  <li><Link href="/client/support" className={`nav-link ${pathname === '/client/support' ? 'active' : ''}`} onClick={closeMobileMenu}>Raise a Query</Link></li>
                </>
              )
            )}

            {/* Language Selector is always visible */}
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
