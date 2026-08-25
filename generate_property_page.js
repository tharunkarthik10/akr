const fs = require('fs');

const code = `"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';
import { supabase } from '@/utils/supabase/client';

// --- Icons ---
const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
);
const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/>
  </svg>
);
const SqFtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { currencyCode, currencySymbol, convertAmount } = useCurrency();

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
        if (error) throw error;
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.2rem', minHeight: '100vh' }}>Loading property details...</div>;
  if (!property) return <div style={{ padding: '4rem', textAlign: 'center', fontSize: '1.2rem', minHeight: '100vh' }}>Property not found.</div>;

  // Price Conversion
  const basePriceAED = parseInt(property.price?.toString().replace(/[^0-9]/g, '')) || 0;
  const convertedPrice = convertAmount(basePriceAED, 'AED', currencyCode);
  const displayPrice = \`\${currencySymbol} \${convertedPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}\`;
  
  // Media Array
  const mediaList = [];
  if (property.video_url) mediaList.push({ type: 'video', url: property.video_url });
  if (property.images && Array.isArray(property.images)) {
    property.images.forEach((img: string) => mediaList.push({ type: 'image', url: img }));
  }
  if (mediaList.length === 0) mediaList.push({ type: 'image', url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" });
  const activeMedia = mediaList[currentSlide] || mediaList[0];

  // Helper parsers
  const parseJSON = (data: any) => {
    if (!data) return null;
    if (typeof data === 'object') return data;
    try { return JSON.parse(data); } catch { return null; }
  };

  const paymentPlan = parseJSON(property.payment_plan);
  const nearbyPlaces = parseJSON(property.nearby_places) || [];
  const propertyFeatures = parseJSON(property.property_features) || [];
  const floorPlans = parseJSON(property.floor_plans) || [];
  const amenitiesList = property.amenities ? (typeof property.amenities === 'string' ? property.amenities.split(',') : property.amenities) : [];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="property-detail-wrapper" style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Media Carousel */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: '#000' }}>
          {activeMedia.type === 'video' ? (
            <iframe width="100%" height="100%" src={activeMedia.url} frameBorder="0" allowFullScreen style={{ display: 'block' }}></iframe>
          ) : (
            <img src={activeMedia.url} alt="Property" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
          
          <button onClick={() => setCurrentSlide(p => (p === 0 ? mediaList.length - 1 : p - 1))} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button onClick={() => setCurrentSlide(p => (p === mediaList.length - 1 ? 0 : p + 1))} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 10 }}>
            {mediaList.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} style={{ width: '10px', height: '10px', borderRadius: '50%', padding: 0, border: 'none', backgroundColor: currentSlide === idx ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s', transform: currentSlide === idx ? 'scale(1.2)' : 'scale(1)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '70% 30%', gap: '3rem', marginTop: '2rem' }}>
        
        <div className="property-left-col">
          
          {/* Header */}
          <div style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
              <div style={{ flex: '1 1 auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>{property.property_status || 'Ready to Move'}</span>
                  {property.project_status && (
                    <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.15)', color: '#947a26', padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>{property.project_status}</span>
                  )}
                  <span style={{ backgroundColor: '#f0f0f0', color: '#555', padding: '0.4rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>{property.type}</span>
                </div>
                <h1 style={{ color: 'var(--text-dark)', fontSize: '3.2rem', marginBottom: '0.8rem', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-1px' }}>{property.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555', fontSize: '1.1rem' }}>
                  <PinIcon /> {property.location}
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 'max-content' }}>
                <div style={{ fontSize: '1rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.2rem', fontWeight: 600, letterSpacing: '1px' }}>Asking Price</div>
                <div className="notranslate" style={{ color: 'var(--accent-gold)', fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-1px' }}>{displayPrice}</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginTop: '3rem', padding: '2rem 3rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--accent-gold)' }}><BedIcon /></div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>{property.bedrooms || '-'}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Bedrooms</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--accent-gold)' }}><BathIcon /></div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>{property.bathrooms || '-'}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Bathrooms</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--accent-gold)' }}><SqFtIcon /></div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>{property.size || '-'}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Sq.Ft</div>
                  </div>
                </div>
                {property.handover_date && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: '1px solid #eee', paddingLeft: '3rem' }}>
                    <div style={{ color: 'var(--accent-gold)' }}><CalendarIcon /></div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>{formatDate(property.handover_date)}</div>
                      <div style={{ fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Handover</div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '3rem 0' }} />

          {/* Description & Lifestyle */}
          <div style={{ marginBottom: '4rem' }}>
            {property.short_description && (
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-red)', marginBottom: '1.5rem', lineHeight: 1.4, fontWeight: 500 }}>
                "{property.short_description}"
              </h3>
            )}
            
            <p style={{ lineHeight: '1.9', color: '#444', fontSize: '1.1rem', wordBreak: 'break-word', overflowWrap: 'anywhere', marginBottom: '2rem', whiteSpace: 'pre-line' }}>
              {property.description || '-'}
            </p>

            {property.lifestyle_overview && (
              <>
                <h3 style={{ color: 'var(--text-dark)', marginBottom: '1rem', fontSize: '1.3rem' }}>Lifestyle & Community</h3>
                <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.05rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ddd' }}>
                  {property.lifestyle_overview}
                </p>
              </>
            )}
          </div>

          {/* Features & Amenities */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ color: 'var(--text-dark)', marginBottom: '3rem', fontSize: '1.8rem', borderBottom: '2px solid var(--accent-gold)', display: 'inline-block', paddingBottom: '0.5rem', fontWeight: 800 }}>Amenities & Features</h2>
            
            {propertyFeatures.length > 0 && (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>Property Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {propertyFeatures.map((feature: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: '#222', fontWeight: 500 }}>
                      <div style={{ color: 'var(--primary-red)', display: 'flex' }}><CheckIcon /></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {amenitiesList.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>Community Amenities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  {amenitiesList.map((amenity: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: '#222', fontWeight: 500 }}>
                      <div style={{ color: 'var(--accent-gold)', display: 'flex' }}><CheckIcon /></div>
                      <span>{amenity.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {propertyFeatures.length === 0 && amenitiesList.length === 0 && (
              <p style={{ color: '#888', fontStyle: 'italic' }}>No specific amenities listed.</p>
            )}
          </div>

          {/* Payment Plan (Progress Bar Visual) */}
          {paymentPlan && (paymentPlan.down_payment || paymentPlan.during_construction || paymentPlan.on_handover) && (
            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: 'var(--text-dark)', marginBottom: '3rem', fontSize: '1.8rem', borderBottom: '2px solid var(--accent-gold)', display: 'inline-block', paddingBottom: '0.5rem', fontWeight: 800 }}>Payment Plan</h2>
              
              <div style={{ backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                {/* Visual Bar */}
                <div style={{ display: 'flex', height: '16px', borderRadius: '8px', overflow: 'hidden', marginBottom: '3rem' }}>
                  {paymentPlan.down_payment > 0 && <div style={{ width: \`\${paymentPlan.down_payment}%\`, backgroundColor: 'var(--primary-red)' }} title="Down Payment"></div>}
                  {paymentPlan.during_construction > 0 && <div style={{ width: \`\${paymentPlan.during_construction}%\`, backgroundColor: 'var(--accent-gold)' }} title="During Construction"></div>}
                  {paymentPlan.on_handover > 0 && <div style={{ width: \`\${paymentPlan.on_handover}%\`, backgroundColor: '#333' }} title="On Handover"></div>}
                </div>
                
                {/* Legend */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                  {paymentPlan.down_payment > 0 && (
                    <div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-red)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{paymentPlan.down_payment}%</div>
                      <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Down Payment</div>
                    </div>
                  )}
                  {paymentPlan.during_construction > 0 && (
                    <div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{paymentPlan.during_construction}%</div>
                      <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>During Construction</div>
                    </div>
                  )}
                  {paymentPlan.on_handover > 0 && (
                    <div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#333', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{paymentPlan.on_handover}%</div>
                      <div style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>On Handover</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Location & Nearby */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ color: 'var(--text-dark)', marginBottom: '2rem', fontSize: '1.8rem', borderBottom: '2px solid var(--accent-gold)', display: 'inline-block', paddingBottom: '0.5rem', fontWeight: 800 }}>Location & Connectivity</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {(property.googleMapLink || property.google_map_link) && (
                <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #eaeaea' }}>
                  <iframe 
                    src={property.google_map_link?.match(/src="([^"]+)"/)?.[1] || property.google_map_link || property.googleMapLink} 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}

              {nearbyPlaces.length > 0 && (
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary-red)', fontWeight: 700 }}>Nearby Landmarks</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {nearbyPlaces.map((place: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #eee', paddingBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600, color: '#333' }}>{place.place}</span>
                        <span style={{ color: 'var(--accent-gold)', fontSize: '0.95rem', fontWeight: 600 }}>{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Media & Documents */}
          {(floorPlans.length > 0 || property.brochure_url) && (
            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: 'var(--text-dark)', marginBottom: '2rem', fontSize: '1.8rem', borderBottom: '2px solid var(--accent-gold)', display: 'inline-block', paddingBottom: '0.5rem', fontWeight: 800 }}>Documents & Floor Plans</h2>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {property.brochure_url && (
                  <a href={property.brochure_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2rem', backgroundColor: 'white', border: '1px solid var(--accent-gold)', borderRadius: '8px', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(212,175,55,0.1)' }}>
                    <DownloadIcon />
                    Download Property Brochure (PDF)
                  </a>
                )}
                
                {floorPlans.map((fp: string, idx: number) => (
                  <a key={idx} href={fp} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 2rem', backgroundColor: '#fcfbf8', border: '1px solid #ddd', borderRadius: '8px', color: '#444', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s' }}>
                    <DownloadIcon />
                    View Floor Plan {floorPlans.length > 1 ? idx + 1 : ''}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Developer Profile */}
          {property.developer && (
            <div style={{ marginBottom: '2rem', padding: '3rem', backgroundColor: '#111', color: 'white', borderRadius: '16px', backgroundImage: 'linear-gradient(135deg, #111 0%, #2a0000 100%)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', fontWeight: 600 }}>Developed By</div>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', fontWeight: 800, letterSpacing: '-1px' }}>{property.developer}</h2>
              {property.developer_description && (
                <p style={{ color: '#ccc', lineHeight: '1.7', fontSize: '1.05rem', margin: 0 }}>
                  {property.developer_description}
                </p>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sticky CTA Box */}
        <div className="property-right-col" style={{ position: 'relative' }}>
          <div className="cta-sticky-box" style={{ 
            position: 'sticky', top: '140px', backgroundColor: 'white', padding: '2rem', borderRadius: '16px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)', borderTop: '5px solid var(--primary-red)'
          }}>
            <h3 style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 800 }}>Talk to an Advisor</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Register your interest for <strong>{property.title}</strong> and a dedicated real estate advisor will contact you shortly.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
              <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select style={{ width: '30%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', backgroundColor: 'white' }}>
                  <option>+971</option><option>+1</option><option>+44</option><option>+91</option>
                </select>
                <input type="tel" placeholder="Phone Number" style={{ width: '70%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
              </div>
              <textarea placeholder="I am interested in this property..." rows={3} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', resize: 'none' }}></textarea>
              <button style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(139,0,0,0.3)' }}>
                Request Callback
              </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: 600 }}>Or Call Us Directly</div>
              <a href="tel:+971558847365" style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 'bold', textDecoration: 'none' }}>+971 55 884 7365</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
`

fs.writeFileSync('src/app/property/[id]/page.tsx', code);
console.log("File written successfully!");
