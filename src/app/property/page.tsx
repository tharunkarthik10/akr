"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { supabase } from '@/utils/supabase/client';

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

export default function PropertiesPage() {
  const { currencyCode, currencySymbol, convertAmount } = useCurrency();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'Approved') // ONLY SHOW APPROVED PROPERTIES
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getDisplayPrice = (priceStr: string, baseCurrency: string = 'AED') => {
    if (!priceStr) return '';
    // Extract numbers, e.g. "2,500,000" -> 2500000
    const rawNum = priceStr.toString().replace(/,/g, '');
    let baseValue = parseFloat(rawNum);
    if (isNaN(baseValue)) return priceStr;
    
    const convertedPrice = convertAmount(baseValue, baseCurrency, currencyCode);
    
    if (convertedPrice >= 1000000) {
      return `${currencySymbol} ${(convertedPrice / 1000000).toFixed(1)}M`;
    } else {
      return `${currencySymbol} ${convertedPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
  };

  const filteredProperties = properties.filter(p => {
    if (searchQuery && !p.title?.toLowerCase().includes(searchQuery.toLowerCase()) && !p.location?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== 'All' && p.type !== filterType) return false;
    if (filterStatus !== 'All' && p.property_status !== filterStatus) return false;
    return true;
  });

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

        {/* Filter Section */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 200px' }}>
            <input 
              type="text" 
              placeholder="Search by title or location..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid #eaeaea', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid #eaeaea', fontSize: '0.95rem', backgroundColor: '#fcfcfc' }}>
              <option value="All">Any Property Type</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Plot">Plot</option>
            </select>
          </div>

          <div style={{ flex: '1 1 150px' }}>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid #eaeaea', fontSize: '0.95rem', backgroundColor: '#fcfcfc' }}>
              <option value="All">Any Status</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Off-Plan">Off-Plan</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>
          
          {(searchQuery || filterType !== 'All' || filterStatus !== 'All') && (
            <div style={{ flex: '0 0 auto' }}>
              <button 
                onClick={() => { setSearchQuery(''); setFilterType('All'); setFilterStatus('All'); }}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary-red)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'underline' }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Property Grid */}
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
            Loading available properties...
          </div>
        ) : filteredProperties.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.2rem', color: '#666', backgroundColor: 'white', borderRadius: '8px' }}>
            No properties found matching your criteria.
          </div>
        ) : (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <div key={property.id} className="property-card" style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', border: '1px solid #eaeaea', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', height: '640px', maxWidth: '380px' }}>
                
                <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={property.images && property.images.length > 0 ? property.images[0] : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"} 
                    alt={property.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    className="hover-zoom"
                  />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ backgroundColor: 'white', color: '#111', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{property.type}</span>
                    {property.property_status && (
                      <span style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>{property.property_status}</span>
                    )}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="notranslate" style={{ color: 'var(--accent-gold)', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                    {getDisplayPrice(property.price, property.currency || 'AED')}
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', color: '#111', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {property.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <PinIcon />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{property.location}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', marginBottom: '1.5rem', color: '#444' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <div style={{ color: '#888', display: 'flex' }}><BedIcon /></div>
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <div style={{ color: '#888', display: 'flex' }}><BathIcon /></div>
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <div style={{ color: '#888', display: 'flex' }}><SqFtIcon /></div>
                      <span>{property.size} Sq Ft</span>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <Link href={`/property/${property.id}`} style={{ textDecoration: 'none', width: '100%' }}>
                      <button style={{ 
                        width: '100%', 
                        padding: '0.8rem', 
                        backgroundColor: 'transparent', 
                        border: '2px solid #111', 
                        color: '#111', 
                        borderRadius: '6px', 
                        fontSize: '1rem', 
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-red)'; e.currentTarget.style.borderColor = 'var(--primary-red)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111'; }}
                      >
                        Explore Property
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Investment Guidance Banner */}
        <div className="guidance-banner" style={{ marginTop: '3rem' }}>
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
