import Link from 'next/link';
import MortgageCalculator from '@/components/MortgageCalculator';
import PopupPoster from '@/components/PopupPoster';

export default function Home() {
  return (
    <div>
      <PopupPoster />
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title font-serif">
              Trusted Premium Strategic<br/>
              Real Estate, Financial, Risk &amp; Brand<br/>
              Architects across the UAE
            </h1>
            <p className="hero-subtitle font-serif text-gold">
              Forward Together. For Life. For Legacy
            </p>
            <div className="hero-buttons">
              <Link href="/opportunities" className="btn-hero-secondary">Explore Opportunities</Link>
              <Link href="/contact" className="btn-hero-secondary">Speak To an Advisor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Multi-Sector Framework Section */}
      <section className="framework-section bg-gold-texture">
        <div className="container framework-grid">
          <div className="framework-left">
            <span className="section-tag">ABOUT AKR GROUP UAE</span>
            <h2 className="section-title font-serif">
              Multi-Sector Framework<br/>
              Built for the UAE Ecosystem
            </h2>
            <p className="framework-desc">
              AKR Group UAE — comprising AKR Realty LLC (Dubai) and AKR Financial & Real Estate Service LLC (Sharjah) — is a unified multi-sector platform seamlessly integrating premium real estate navigation with elite banking product consulting, independent investment & insurance consulting, and strategic enterprise marketing into a singular ecosystem.
            </p>
            <p className="framework-desc">
              Guided by absolute market vision and backed by a 25+ year heritage of collective on-the-ground field expertise, we engineer confidential, data-driven frameworks tailored exclusively for individual and institutional investors, sovereign business owners, and ultra-high-net-worth individuals.
            </p>
            <p className="framework-quote font-serif">
              Forward Together. For Life. For Legacy.
            </p>
          </div>
          <div className="framework-right">
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">25+</div>
                <div className="stat-label">LED BY 25+ YEARS OF EXPERTISE</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">4</div>
                <div className="stat-label">STRATEGIC VERTICALS</div>
              </div>
            </div>
            
            <div className="sector-list">
              <div className="sector-item">
                <div className="sector-icon">F</div>
                <div><strong>Finance</strong> — Structured financial planning & solutions</div>
              </div>
              <div className="sector-item">
                <div className="sector-icon">I</div>
                <div><strong>Insurance</strong> — Comprehensive risk & asset protection</div>
              </div>
              <div className="sector-item">
                <div className="sector-icon">R</div>
                <div><strong>Real Estate</strong> — Premium property advisory & investment</div>
              </div>
              <div className="sector-item">
                <div className="sector-icon">M</div>
                <div><strong>Marketing</strong> — Strategic growth & brand positioning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Premium Services Section */}
      <section className="services-section bg-gold-texture">
        <div className="container text-center">
          <span className="section-tag inline-block">WHAT WE OFFER</span>
          <h2 className="section-title text-center font-serif">Our Premium Services</h2>
          <p className="section-subtitle">Four integrated verticals, one singular ecosystem —— engineered for discerning investors across UAE.</p>
          
          <div className="services-grid">
            {/* 1. Financial Navigator */}
            <div className="service-card">
              <div className="service-image placeholder-img">
                <span>[ Finance Image ]</span>
              </div>
              <div className="service-content">
                <div className="service-tag">FINANCIAL NAVIGATOR</div>
                <h3 className="service-title font-serif">Strategic Banking &amp; Investment Solutions</h3>
                <p className="service-location">Sharjah — AKR Financial and Real Estate Service LLC</p>
                <p className="service-desc">Strategic consulting across Tier-1 corporate and personal banking facilities, mortgage structuring, capital frameworks, and independent investment portfolio optimization.</p>
                <ul className="service-bullets">
                  <li>Strategic Private Banking &amp; Credit Advisory</li>
                  <li>Corporate, Personal &amp; Mortgage Capital Structuring</li>
                </ul>
              </div>
            </div>

            {/* 2. Insurance Navigator */}
            <div className="service-card">
              <div className="service-image placeholder-img">
                <span>[ Insurance Image ]</span>
              </div>
              <div className="service-content">
                <div className="service-tag">INSURANCE NAVIGATOR</div>
                <h3 className="service-title font-serif">Strategic Insurance — Comprehensive Risk &amp; Assets Protection</h3>
                <p className="service-location">Sharjah — AKR Financial and Real Estate Service LLC</p>
                <p className="service-desc">Tailored institutional and personal risk management solutions protecting high-value property holdings, executive keyman liabilities, life security, and group corporate healthcare.</p>
                <ul className="service-bullets">
                  <li>Keyman, Corporate &amp; Real Estate Asset Protection</li>
                  <li>Bespoke Life, Health &amp; General Risk Policies</li>
                </ul>
              </div>
            </div>

            {/* 3. Real Estate Navigator */}
            <div className="service-card">
              <div className="service-image placeholder-img">
                <span>[ Real Estate Image ]</span>
              </div>
              <div className="service-content">
                <div className="service-tag">REAL ESTATE NAVIGATOR</div>
                <h3 className="service-title font-serif">Strategic Property Asset Navigation &amp; Portfolio Guidance</h3>
                <p className="service-location">Dubai — AKR Realty LLC</p>
                <p className="service-desc">Delivering premium asset navigation, off-market sourcing, and strategic asset matching tailored to your specific, targeted investment appetite and capital parameters.</p>
                <ul className="service-bullets">
                  <li>Premium Asset Navigation &amp; Off-Market Sourcing</li>
                  <li>Strategic Asset Matching for Investment Appetite</li>
                </ul>
              </div>
            </div>

            {/* 4. Marketing Navigator */}
            <div className="service-card">
              <div className="service-image placeholder-img">
                <span>[ Marketing Image ]</span>
              </div>
              <div className="service-content">
                <div className="service-tag">MARKETING NAVIGATOR</div>
                <h3 className="service-title font-serif">Strategic Marketing &amp; Advertising Solutions</h3>
                <p className="service-location">Sharjah — AKR Financial and Real Estate Service LLC</p>
                <p className="service-desc">Advanced enterprise visibility navigation, institutional corporate growth campaigns, premium events production, precision digital media, and authoritative brand activation.</p>
                <ul className="service-bullets">
                  <li>High-Impact Advertising Campaigns</li>
                  <li>Precision Digital Media &amp; Brand Activation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Developers Section */}
      <section className="developers-section bg-gold-texture">
        <div className="container text-center">
          <h2 className="calc-main-title text-center font-serif" style={{ textTransform: 'none', marginBottom: '0.5rem' }}>
            Our <span className="font-sans font-bold" style={{ color: 'var(--accent-gold)' }}>Developers</span>
          </h2>
          <p className="mx-auto" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center', color: 'var(--text-dark)' }}>
            We proudly partner with Top real estate developers who turn great ideas into amazing properties.
          </p>
        </div>
        
        {/* Marquee Wrapper */}
        <div className="developers-marquee-wrapper overflow-hidden relative w-full py-8">
          <div className="developers-marquee">
            {/* Group 1 */}
            <div className="dev-logo"><img src="/logo/Sobha-white-Logoneww-BfOU9Qpd.png" alt="Sobha" /></div>
            <div className="dev-logo"><img src="/logo/damac-logo-white-BOJvHnkb.webp" alt="Damac" /></div>
            <div className="dev-logo"><img src="/logo/omniyat-CuVZxA2k.png" alt="Omniyat" /></div>
            <div className="dev-logo"><img src="/logo/portofino-by-samana-logo-CDE2gjue.png" alt="Samana" /></div>
            <div className="dev-logo"><img src="/logo/sg-logo-light-DaWNYbcp.webp" alt="Select Group" /></div>
            <div className="dev-logo"><img src="/logo/download.png" alt="Logo 1" /></div>
            <div className="dev-logo"><img src="/logo/download (1).png" alt="Logo 2" /></div>
            <div className="dev-logo"><img src="/logo/download (2).png" alt="Logo 3" /></div>
            
            {/* Group 2 (Duplicate for infinite loop) */}
            <div className="dev-logo"><img src="/logo/Sobha-white-Logoneww-BfOU9Qpd.png" alt="Sobha" /></div>
            <div className="dev-logo"><img src="/logo/damac-logo-white-BOJvHnkb.webp" alt="Damac" /></div>
            <div className="dev-logo"><img src="/logo/omniyat-CuVZxA2k.png" alt="Omniyat" /></div>
            <div className="dev-logo"><img src="/logo/portofino-by-samana-logo-CDE2gjue.png" alt="Samana" /></div>
            <div className="dev-logo"><img src="/logo/sg-logo-light-DaWNYbcp.webp" alt="Select Group" /></div>
            <div className="dev-logo"><img src="/logo/download.png" alt="Logo 1" /></div>
            <div className="dev-logo"><img src="/logo/download (1).png" alt="Logo 2" /></div>
            <div className="dev-logo"><img src="/logo/download (2).png" alt="Logo 3" /></div>
            
            {/* Group 3 (Duplicate for infinite loop) */}
            <div className="dev-logo"><img src="/logo/Sobha-white-Logoneww-BfOU9Qpd.png" alt="Sobha" /></div>
            <div className="dev-logo"><img src="/logo/damac-logo-white-BOJvHnkb.webp" alt="Damac" /></div>
            <div className="dev-logo"><img src="/logo/omniyat-CuVZxA2k.png" alt="Omniyat" /></div>
            <div className="dev-logo"><img src="/logo/portofino-by-samana-logo-CDE2gjue.png" alt="Samana" /></div>
            <div className="dev-logo"><img src="/logo/sg-logo-light-DaWNYbcp.webp" alt="Select Group" /></div>
            <div className="dev-logo"><img src="/logo/download.png" alt="Logo 1" /></div>
            <div className="dev-logo"><img src="/logo/download (1).png" alt="Logo 2" /></div>
            <div className="dev-logo"><img src="/logo/download (2).png" alt="Logo 3" /></div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Mortgage Calculator Section */}
      <MortgageCalculator />
      {/* 5. Why AKR Group UAE */}
      <section className="why-akr-section bg-gold-texture">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag inline-block">OUR DISTINCTION</span>
            <h2 className="section-title text-center font-serif">Why <span className="font-sans font-bold text-gold">AKR Group UAE</span></h2>
            <p className="mx-auto max-w-800">
              A value proposition built for high-net-worth individuals, investors, and business leaders who demand more.
            </p>
          </div>
          
          <div className="why-grid">
            <div className="why-card">
              <div className="why-number font-serif">01</div>
              <div className="why-icon-box">I</div>
              <h3 className="why-card-title font-serif">Integrated Real Estate + Financial Advisory</h3>
              <p className="why-card-desc">A rare unified platform where property and finance expertise converge — eliminating the need for multiple advisors.</p>
            </div>
            
            <div className="why-card">
              <div className="why-number font-serif">02</div>
              <div className="why-icon-box">G</div>
              <h3 className="why-card-title font-serif">Guided by Vision - Led by 25+ Years of Expertise</h3>
              <p className="why-card-desc">Decades of deep market knowledge across real estate, banking, insurance, and strategic business advisory.</p>
            </div>

            <div className="why-card">
              <div className="why-number font-serif">03</div>
              <div className="why-icon-box">U</div>
              <h3 className="why-card-title font-serif">UAE Market Specialization</h3>
              <p className="why-card-desc">Rooted in the UAE ecosystem — Dubai, Sharjah, and beyond — with on-the-ground regulatory and market intelligence.</p>
            </div>

            <div className="why-card">
              <div className="why-number font-serif">04</div>
              <div className="why-icon-box">C</div>
              <h3 className="why-card-title font-serif">Confidential & Relationship-Driven</h3>
              <p className="why-card-desc">Every client engagement is handled with the utmost discretion, trust, and a long-term partnership mindset.</p>
            </div>

            <div className="why-card">
              <div className="why-number font-serif">05</div>
              <div className="why-icon-box">A</div>
              <h3 className="why-card-title font-serif">Access to Exclusive Opportunities</h3>
              <p className="why-card-desc">Off-market properties, priority investment pipelines, and curated financial products unavailable through standard channels.</p>
            </div>

            <div className="why-card">
              <div className="why-number font-serif">06</div>
              <div className="why-icon-box">C</div>
              <h3 className="why-card-title font-serif">Compliance-Focused Advisory</h3>
              <p className="why-card-desc">Fully aligned with RERA, DLD, Central Bank, and SHAMS regulations — protecting your interests at every step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Consulting Process */}
      <section className="process-section bg-gold-texture">
        <div className="container text-center">
          <span className="section-tag inline-block">HOW WE WORK</span>
          <h2 className="section-title text-center font-serif">Our Consulting Process</h2>
          
          <div className="process-steps">
            <div className="step-item">
              <div className="step-box">01</div>
              <h4 className="step-title font-serif">Private Consultation</h4>
              <p className="step-desc">Confidentially assessing your financial objectives, liquidity appetite, long-term goals, and enduring family vision—to build a strong generational legacy.</p>
            </div>
            <div className="step-item">
              <div className="step-box">02</div>
              <h4 className="step-title font-serif">Strategic Architecture</h4>
              <p className="step-desc">Designing tailored real estate, capital, and risk-protection plans—engineered to turn your vision into lasting wealth.</p>
            </div>
            <div className="step-item">
              <div className="step-box">03</div>
              <h4 className="step-title font-serif">Compliant Execution</h4>
              <p className="step-desc">Seamless execution across RERA, DLD, Tier-1 banks, and SHAMS frameworks—handling every detail with complete transparency and zero friction.</p>
            </div>
            <div className="step-item">
              <div className="step-box">04</div>
              <h4 className="step-title font-serif">Dedicated Portfolio Management</h4>
              <p className="step-desc">Trusted, long-term relationship management and continuous portfolio optimization—built to grow and protect your wealth across generations.</p>
            </div>
          </div>

          <div className="promise-card">
            <div className="promise-left text-left">
              <div className="promise-tag">OUR PROMISE</div>
              <h3 className="promise-title font-serif">
                &ldquo;One unified ecosystem. Unwavering trust. We don’t sell transactions—we architect wealth to build stronger, enduring legacies.&rdquo;
              </h3>
              <p className="promise-desc">
                Backed by 25+ years of India and UAE expertise across Dubai and Sharjah, we unite property, finance, risk, and brand strategy—delivering unbiased guidance, full compliance, and lifelong guardianship.
              </p>
            </div>
            <div className="promise-right">
              <ul className="promise-list">
                <li><span className="promise-num">01</span> <span className="promise-text">Private Consultation</span> <div className="promise-line"></div></li>
                <li><span className="promise-num">02</span> <span className="promise-text">Strategic Architecture</span> <div className="promise-line"></div></li>
                <li><span className="promise-num">03</span> <span className="promise-text">Compliant Execution</span> <div className="promise-line"></div></li>
                <li><span className="promise-num">04</span> <span className="promise-text">Dedicated Portfolio Management</span> <div className="promise-line"></div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Trust & Compliance */}
      <section className="compliance-section bg-gold-texture">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-tag inline-block">REGULATORY ALIGNMENT</span>
            <h2 className="section-title text-center font-serif">Trust & Compliance</h2>
          </div>

          <div className="compliance-grid-top">
            <div className="compliance-card">
              <div className="compliance-icon-shield">🛡️</div>
              <div className="compliance-content">
                <div className="compliance-tag">DUBAI REAL ESTATE</div>
                <h3 className="compliance-title font-serif">RERA & DLD Regulated</h3>
                <p className="compliance-desc">AKR Realty LLC operates in full compliance with the Real Estate Regulatory Agency and Dubai Land Department — the UAE's foremost property authorities.</p>
                <button className="btn-outline-gold text-gold-solid">LICENSE VERIFIED</button>
              </div>
            </div>
            <div className="compliance-card">
              <div className="compliance-icon-shield">🛡️</div>
              <div className="compliance-content">
                <div className="compliance-tag">SHARJAH ENTITY</div>
                <h3 className="compliance-title font-serif">SHAMS Licensed</h3>
                <p className="compliance-desc">Our Sharjah-based financial and insurance advisory arm is officially licensed under Sharjah Media City, providing non-custodial advisory services.</p>
                <button className="btn-outline-gold text-gold-solid mt-2">SHAMS APPROVED</button>
              </div>
            </div>
          </div>

          <div className="compliance-grid-bottom">
            <div className="compliance-item">
              <div className="check-icon">✓</div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-1">Transparent Advisory</h4>
                <p className="text-sm">All advisory practices are honest, ethical, and non-misleading — ensuring clients receive clear and accurate guidance at every stage.</p>
              </div>
            </div>
            <div className="compliance-item">
              <div className="check-icon">✓</div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-1">Data-Driven, Not Speculative</h4>
                <p className="text-sm">We never guarantee returns. Every insight is grounded in real market data, rigorous analysis, and expert professional judgment.</p>
              </div>
            </div>
            <div className="compliance-item">
              <div className="check-icon">✓</div>
              <div>
                <h4 className="font-serif font-bold text-lg mb-1">Client-First Approach</h4>
                <p className="text-sm">Your interests come first — always. Our advice is tailored, independent, and free from third-party sales pressure or conflicts of interest.</p>
              </div>
            </div>
            <div className="compliance-item">
              <div className="check-icon">✓</div>
              <div>
                <h4 className="font-serif text-red font-bold text-lg mb-1">Full Regulatory Alignment</h4>
                <p className="text-sm">Operating across Dubai and Sharjah with licenses and registrations maintained in good standing with all relevant UAE authorities.</p>
              </div>
            </div>
          </div>

          <div className="disclaimer-banner">
            <strong>Important Disclaimer:</strong> All calculators and estimates provided are for advisory purposes only and do not constitute financial advice. Results are indicative and <strong>subject to approval by relevant financial institutions</strong>. Past performance does not guarantee future results. This platform does not facilitate direct transactions between clients and property listings.
          </div>
        </div>
      </section>

      {/* 8. Final CTA Journey */}
      <section className="cta-section bg-gold-texture">
        <div className="container text-center">
          <span className="section-tag inline-block">BEGIN YOUR JOURNEY</span>
          <h2 className="cta-title font-serif">
            Step Forward Together<br/>
            with <span className="font-sans font-bold text-gold">AKR Group UAE</span>
          </h2>
          <p className="cta-desc mx-auto">
            Schedule a confidential one-on-one session with our senior specialists for custom solutions across real estate, finance, risk protection, and brand architecture.
          </p>
          <div className="cta-buttons" style={{ marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
            <Link href="/contact" className="btn-red" style={{ textDecoration: 'none', display: 'inline-block' }}>BOOK PRIVATE CONSULTATION</Link>
            <Link href="/contact" className="btn-outline-gold text-dark" style={{ textDecoration: 'none', display: 'inline-block' }}>CONTACT US</Link>
          </div>
          
          <div className="cta-tags text-gold-solid" style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', position: 'relative', clear: 'both' }}>
            <span>• RERA REGULATED</span>
            <span>• SHAMS LICENSED</span>
            <span>• GUIDED BY VISION - LED BY 25+ YEARS OF EXPERTISE</span>
            <span>• CONFIDENTIAL ADVISORY</span>
          </div>
        </div>
      </section>
    </div>
  );
}
