"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

// --- Icons ---
const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="7" x2="7" y1="19" y2="21"/><line x1="17" x2="17" y1="19" y2="21"/>
  </svg>
);

const SqFtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="property-stat-icon">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// --- Mock Extended Data ---
const extendedPropertiesData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Palm Jumeirah Signature Villa",
    location: "Palm Jumeirah, Dubai",
    price: "AED 25,000,000",
    type: "Villa",
    beds: 6,
    baths: 7,
    sqft: "8,500",
    status: "Ready to Move",
    developer: "Nakheel Properties",
    desc: "Experience the epitome of luxury living in this custom-built Signature Villa on the prestigious Palm Jumeirah. Boasting unparalleled views of the Arabian Gulf and the Dubai Marina skyline, this property features private beach access, a temperature-controlled infinity pool, and meticulously landscaped gardens. Inside, the villa offers double-height ceilings, a state-of-the-art smart home system, a private cinema, and imported Italian marble finishes throughout. A true masterpiece designed for ultra-high-net-worth individuals seeking privacy and exclusivity.",
    videoUrl: "https://www.youtube.com/embed/6m6uT01b44w?autoplay=1&mute=1&loop=1",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", // Main
      "https://images.unsplash.com/photo-1600607687920-4e2a09c15faa?w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c1566903?w=600&q=80"
    ],
    amenities: [
      "Private Beach Access", "Infinity Pool", "Smart Home System", 
      "Private Cinema", "Maid & Driver Rooms", "Fully Fitted Kitchen", 
      "24/7 Gated Security", "Gymnasium"
    ],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14451.980315488424!2d55.1166661!3d25.1166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f152166a01041%3A0x60021b333b246a!2sPalm%20Jumeirah%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
  },
  // Default fallback for other IDs
  "default": {
    id: 0,
    title: "Luxury Property in Dubai",
    location: "Premium Location, Dubai",
    price: "Price on Request",
    type: "Property",
    beds: 4,
    baths: 4,
    sqft: "5,000",
    status: "Off-Plan",
    developer: "Premium Developer",
    desc: "A stunning architectural masterpiece offering the highest standards of luxury living in Dubai. This property features world-class amenities, premium finishes, and breathtaking views.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    images: Array(7).fill("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"),
    amenities: ["Swimming Pool", "Gym", "Security", "Parking"],
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786539269224!2d55.27078281500908!3d25.197197983896583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
  }
};

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const property = extendedPropertiesData[id] || extendedPropertiesData["1"]; // Use ID 1 as mock if not found

  const { currencyCode, currencySymbol, convertAmount } = useCurrency();
  
  // Base price in AED (extracting numbers from string for mock data, or using baseAED property if added)
  const basePriceAED = parseInt(property.price.replace(/[^0-9]/g, '')) || 25000000;
  const convertedPrice = convertAmount(basePriceAED, 'AED', currencyCode);
  const displayPrice = `${currencySymbol} ${convertedPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Build a combined array of all media items. First item is the video, followed by the images.
  const mediaList = [
    { type: 'video', url: property.videoUrl },
    ...property.images.map((img: string) => ({ type: 'image', url: img }))
  ];

  const activeMedia = mediaList[currentSlide];

  return (
    <div className="property-detail-wrapper" style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Media Carousel Section */}
      <section className="media-carousel-section" style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backgroundColor: '#000' }}>
          
          {/* Main Media Display */}
          {activeMedia.type === 'video' ? (
            <iframe 
              width="100%" 
              height="100%" 
              src={activeMedia.url} 
              title="Property Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ display: 'block' }}
            ></iframe>
          ) : (
            <img 
              src={activeMedia.url} 
              alt="Property" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          )}

          {/* Navigation Arrows */}
          <button 
            onClick={() => setCurrentSlide(prev => (prev === 0 ? mediaList.length - 1 : prev - 1))}
            style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            onClick={() => setCurrentSlide(prev => (prev === mediaList.length - 1 ? 0 : prev + 1))}
            style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Indicator Dots */}
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 10 }}>
            {mediaList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: '10px', height: '10px', borderRadius: '50%', padding: 0, border: 'none',
                  backgroundColor: currentSlide === idx ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  transform: currentSlide === idx ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>

          {/* Media Counter Badge */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, zIndex: 10 }}>
            {currentSlide + 1} / {mediaList.length}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container" style={{ maxWidth: '1400px', display: 'grid', gridTemplateColumns: '70% 30%', gap: '3rem', marginTop: '2rem' }}>
        
        {/* LEFT COLUMN: Property Info */}
        <div className="property-left-col">
          
          {/* Header */}
          <div className="prop-header" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ backgroundColor: 'var(--primary-red)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{property.status}</span>
                  <span style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#a6882a', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{property.type}</span>
                </div>
                <h1 style={{ color: 'var(--primary-red)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{property.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '1.1rem' }}>
                  <PinIcon /> {property.location}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1rem', color: '#666', textTransform: 'uppercase' }}>Asking Price</div>
                <div className="notranslate" style={{ color: 'var(--accent-gold)', fontSize: '2.2rem', fontWeight: 800 }}>{displayPrice}</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <BedIcon />
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-red)' }}>{property.beds}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Bedrooms</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <BathIcon />
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-red)' }}>{property.baths}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Bathrooms</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <SqFtIcon />
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-red)' }}>{property.sqft}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Square Feet</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prop-section" style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: 'var(--primary-red)', marginBottom: '1rem', fontSize: '1.5rem' }}>Property Overview</h2>
            <p style={{ lineHeight: '1.8', color: '#444', fontSize: '1.05rem' }}>{property.desc}</p>
          </div>

          {/* Developer */}
          <div className="prop-section" style={{ marginBottom: '3rem', padding: '1.5rem', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderLeft: '4px solid var(--accent-gold)', borderRadius: '0 8px 8px 0' }}>
            <h2 style={{ color: 'var(--primary-red)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Developer</h2>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{property.developer}</div>
          </div>

          {/* Amenities */}
          <div className="prop-section" style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Features & Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {property.amenities.map((amenity: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.05rem', color: '#333' }}>
                  <CheckIcon /> {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Location Map */}
          <div className="prop-section" style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: 'var(--primary-red)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Location</h2>
            <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <iframe 
                src={property.mapSrc} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky CTA Box */}
        <div className="property-right-col" style={{ position: 'relative' }}>
          <div className="cta-sticky-box" style={{ 
            position: 'sticky', 
            top: '140px', 
            backgroundColor: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            borderTop: '5px solid var(--primary-red)'
          }}>
            <h3 style={{ color: 'var(--primary-red)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Talk to an Advisor</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Register your interest for <strong>{property.title}</strong> and a dedicated real estate advisor will contact you shortly.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
              <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select style={{ width: '30%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', backgroundColor: 'white' }}>
                  <option>+971</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+91</option>
                </select>
                <input type="tel" placeholder="Phone Number" style={{ width: '70%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem' }} />
              </div>
              <textarea placeholder="I am interested in this property..." rows={3} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', resize: 'none' }}></textarea>
              
              <button style={{ 
                width: '100%', 
                padding: '1rem', 
                backgroundColor: 'var(--primary-red)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                fontSize: '1.1rem', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                marginTop: '0.5rem',
                boxShadow: '0 4px 12px rgba(139,0,0,0.3)'
              }}>
                Request Callback
              </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Or Call Us Directly</div>
              <a href="tel:+971558847365" style={{ color: 'var(--accent-gold)', fontSize: '1.3rem', fontWeight: 'bold', textDecoration: 'none' }}>+971 55 884 7365</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
