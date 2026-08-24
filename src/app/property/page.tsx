"use client";

import React from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <path d="M2 4v16"/>
    <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
    <path d="M2 17h20"/>
    <path d="M6 8v9"/>
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
    <line x1="10" x2="8" y1="5" y2="7"/>
    <line x1="2" x2="22" y1="12" y2="12"/>
    <line x1="7" x2="7" y1="19" y2="21"/>
    <line x1="17" x2="17" y1="19" y2="21"/>
  </svg>
);

const SqFtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
  </svg>
);

const TrendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--accent-gold)'}}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/>
    <path d="M16 6h.01"/>
    <path d="M12 6h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
);

const propertiesData = [
  {
    id: 1,
    title: "Palm Jumeirah Villa",
    location: "Palm Jumeirah",
    price: "AED 25.0M",
    type: "Villa",
    beds: 6,
    baths: 7,
    sqft: "8500",
    roi: "5.8%",
    yield: "4.5%",
    desc: "Luxurious waterfront villa with private beach access and stunning views of Dubai skyline.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
  },
  {
    id: 2,
    title: "Emirates Hills Mansion",
    location: "Emirates Hills",
    price: "AED 35.0M",
    type: "Villa",
    beds: 7,
    baths: 9,
    sqft: "12000",
    roi: "6.2%",
    yield: "5%",
    desc: "Ultra-luxury mansion in Dubai's most prestigious community with golf course views.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09c15faa?w=800&q=80"
  },
  {
    id: 3,
    title: "Downtown Dubai Penthouse",
    location: "Downtown Dubai",
    price: "AED 18.5M",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    sqft: "5500",
    roi: "7.5%",
    yield: "6.2%",
    desc: "Premium penthouse with panoramic views of Burj Khalifa and Dubai Fountain.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
  },
  {
    id: 4,
    title: "Dubai Marina Apartment",
    location: "Dubai Marina",
    price: "AED 6.5M",
    type: "Apartment",
    beds: 3,
    baths: 4,
    sqft: "2200",
    roi: "8.2%",
    yield: "7%",
    desc: "Modern apartment with marina views and access to world-class amenities.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
  },
  {
    id: 5,
    title: "Arabian Ranches Villa",
    location: "Arabian Ranches",
    price: "AED 9.2M",
    type: "Villa",
    beds: 5,
    baths: 6,
    sqft: "6000",
    roi: "6.8%",
    yield: "5.5%",
    desc: "Family-oriented villa in gated community with golf course and polo club.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    id: 6,
    title: "Jumeirah Lake Towers Apt",
    location: "JLT",
    price: "AED 3.8M",
    type: "Apartment",
    beds: 2,
    baths: 2,
    sqft: "1400",
    roi: "9.5%",
    yield: "8%",
    desc: "Smart investment opportunity with high rental yields in established community.",
    img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&q=80"
  }
];

export default function PropertiesPage() {
  const { currencyCode, currencySymbol, convertAmount } = useCurrency();
  
  const getDisplayPrice = (priceStr: string) => {
    // Extract numbers, e.g. "AED 25.0M" -> 25000000
    // But since the mock data is "AED 25.0M", parseFloat("25.0") = 25 * 1,000,000
    const numMatch = priceStr.match(/[\d.]+/);
    if (!numMatch) return priceStr;
    const isMillion = priceStr.includes('M');
    let baseAED = parseFloat(numMatch[0]);
    if (isMillion) baseAED *= 1000000;
    
    const convertedPrice = convertAmount(baseAED, 'AED', currencyCode);
    
    // Format back to compact if it's large (e.g. M for millions)
    if (convertedPrice >= 1000000) {
      return `${currencySymbol} ${(convertedPrice / 1000000).toFixed(1)}M`;
    } else {
      return `${currencySymbol} ${convertedPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
  };

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '2rem' }}>
      
      {/* Hero Section */}
      <section className="properties-hero">
        <h1>Exclusive Properties</h1>
        <p>Investment-Grade Real Estate in Dubai</p>
      </section>

      <div className="properties-container">
        
        {/* Advisory Box */}
        <div className="advisory-box">
          <div className="advisory-header">
            <BuildingIcon />
            <h3>Advisory-Led Property Service</h3>
          </div>
          <p className="license-text">
            <strong>AKR Realty LLC</strong> - Licensed by RERA (Real Estate Regulatory Agency). License No: XXXXX
          </p>
          <p className="desc-text">
            All property listings are curated for investment advisory purposes. For detailed information, property viewings, or investment consultation, please contact our licensed advisors. <strong>Direct client-lister contact is not permitted as per regulatory requirements.</strong>
          </p>
        </div>

        {/* Property Grid */}
        <div className="property-grid">
          {propertiesData.map((property) => (
            <div key={property.id} className="property-card">
              
              <div className="property-img-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={property.img} 
                  alt={property.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="property-badge">{property.type}</span>
                <div className="property-price-overlay notranslate">
                  {getDisplayPrice(property.price)}
                </div>
              </div>

              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <div className="property-location">
                  <PinIcon />
                  <span>{property.location}</span>
                </div>

                <div className="property-stats-grid">
                  <div className="property-stat-item">
                    <BedIcon />
                    <span className="property-stat-val">{property.beds}</span>
                    <span className="property-stat-label">Beds</span>
                  </div>
                  <div className="property-stat-item">
                    <BathIcon />
                    <span className="property-stat-val">{property.baths}</span>
                    <span className="property-stat-label">Baths</span>
                  </div>
                  <div className="property-stat-item">
                    <SqFtIcon />
                    <span className="property-stat-val">{property.sqft}</span>
                    <span className="property-stat-label">Sq Ft</span>
                  </div>
                </div>

                <div className="property-roi-grid">
                  <div className="property-roi-box">
                    <span className="property-roi-label">Projected ROI</span>
                    <span className="property-roi-val">
                      <TrendingIcon />
                      ~ {property.roi}
                    </span>
                  </div>
                  <div className="property-roi-box">
                    <span className="property-roi-label">Rental Yield</span>
                    <span className="property-roi-val">{property.yield}</span>
                  </div>
                </div>

                <p className="property-desc">{property.desc}</p>

                <Link href={`/property/${property.id}`} style={{ textDecoration: 'none', width: '100%' }}>
                  <button className="property-btn" style={{ width: '100%' }}>
                    View Details
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Investment Guidance Banner */}
        <div className="guidance-banner">
          <h2>Looking for Investment Guidance?</h2>
          <p>Our expert advisors can help you identify the best real estate opportunities aligned with your investment goals</p>
          <div className="guidance-actions">
            <button className="btn-white">
              <PhoneIcon />
              Schedule Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
