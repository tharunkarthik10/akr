"use client";

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import imageCompression from 'browser-image-compression';

const PROPERTY_FEATURES_LIST = [
  "Smart Home System", "Private Pool", "Private Garden", "Maid's Room", 
  "Driver's Room", "Study Room", "Walk-in Closet", "Balcony/Terrace", 
  "Central A/C", "Built-in Wardrobes", "Private Elevator"
];

const COMMUNITY_AMENITIES_LIST = [
  "Gymnasium", "Swimming Pool", "Beach Access", "24/7 Security", 
  "Concierge Service", "Children's Play Area", "Tennis Court", 
  "Basketball Court", "Spa & Sauna", "Retail Outlets", "Restaurants & Cafes",
  "Valet Parking", "Clubhouse", "BBQ Area", "Golf Course"
];

export default function PostPropertyPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // State for all 25+ fields
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    type: 'Apartment',
    price: '',
    currency: 'AED',
    bedrooms: '1',
    bathrooms: '1',
    size: '',
    handover_date: '',
    property_status: 'Ready to Move',
    
    // Description
    short_description: '',
    description: '',
    lifestyle_overview: '',
    
    // Features & Amenities
    property_features: [] as string[],
    amenities: [] as string[],
    
    // Payment Plan
    down_payment_pct: '',
    during_construction_pct: '',
    on_handover_pct: '',
    
    // Location
    location: '',
    google_map_link: '',
    nearby_places: [] as { place: string; distance: string }[],
    
    // Developer
    developer: '',
    developer_description: '',
    project_status: 'Completed'
  });

  // Media States
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [floorPlanFiles, setFloorPlanFiles] = useState<File[]>([]);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  
  const [showOtherFeature, setShowOtherFeature] = useState(false);
  const [customFeature, setCustomFeature] = useState('');
  
  const [showOtherAmenity, setShowOtherAmenity] = useState(false);
  const [customAmenity, setCustomAmenity] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = rawValue ? Number(rawValue).toLocaleString('en-US') : '';
    setFormData({ ...formData, price: formattedValue });
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      property_features: prev.property_features.includes(feature) 
        ? prev.property_features.filter(f => f !== feature)
        : [...prev.property_features, feature]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const addNearbyPlace = () => {
    setFormData(prev => ({
      ...prev,
      nearby_places: [...prev.nearby_places, { place: '', distance: '' }]
    }));
  };

  const updateNearbyPlace = (index: number, field: 'place' | 'distance', value: string) => {
    setFormData(prev => {
      const newPlaces = [...prev.nearby_places];
      newPlaces[index][field] = value;
      return { ...prev, nearby_places: newPlaces };
    });
  };

  const removeNearbyPlace = (index: number) => {
    setFormData(prev => ({
      ...prev,
      nearby_places: prev.nearby_places.filter((_, i) => i !== index)
    }));
  };

  // --- Upload Logic ---
  const uploadFileToR2 = async (file: File, userId: string): Promise<string> => {
    let fileToUpload = file;

    // Compress the file if it is an image
    if (file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 0.4, // Compress to max 400KB
          maxWidthOrHeight: 1600, // Reduced max dimensions slightly to maintain crispness at 400KB
          useWebWorker: true,
          initialQuality: 0.85, // Maintains high visual fidelity
        };
        fileToUpload = await imageCompression(file, options);
      } catch (err) {
        console.warn("Compression failed, uploading original:", err);
      }
    }

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: fileToUpload.name, contentType: fileToUpload.type, userId })
    });
    if (!res.ok) throw new Error('Failed to get presigned URL');
    const { presignedUrl, publicUrl } = await res.json();
    
    const uploadRes = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': fileToUpload.type },
      body: fileToUpload
    });
    if (!uploadRes.ok) throw new Error('Failed to upload file to R2');
    return publicUrl;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to post a property.");

    // Validation: Payment Plan = 100%
    const dp = parseFloat(formData.down_payment_pct) || 0;
    const dc = parseFloat(formData.during_construction_pct) || 0;
    const oh = parseFloat(formData.on_handover_pct) || 0;
    if ((dp + dc + oh) !== 0 && (dp + dc + oh) !== 100) {
      return alert(`Payment plan percentages must sum to 100%. Current sum: ${dp + dc + oh}%`);
    }

    setLoading(true);

    try {
      // 1. Upload Media
      const imageUrls: string[] = [];
      for (const file of imageFiles) { imageUrls.push(await uploadFileToR2(file, user.id)); }

      const floorPlanUrls: string[] = [];
      for (const file of floorPlanFiles) { floorPlanUrls.push(await uploadFileToR2(file, user.id)); }

      const videoUrl = videoFile ? await uploadFileToR2(videoFile, user.id) : '';
      const brochureUrl = brochureFile ? await uploadFileToR2(brochureFile, user.id) : '';

      // 2. Prepare Payload
      const payload = {
        title: formData.title,
        type: formData.type,
        price: formData.price,
        currency: formData.currency,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        size: formData.size,
        location: formData.location,
        description: formData.description,
        developer: formData.developer,
        status: 'Pending Approval',
        user_id: user.id,
        
        // New Fields
        handover_date: formData.handover_date || null,
        property_status: formData.property_status,
        short_description: formData.short_description,
        lifestyle_overview: formData.lifestyle_overview,
        property_features: formData.property_features, // JSONB
        nearby_places: formData.nearby_places, // JSONB
        google_map_link: formData.google_map_link,
        payment_plan: {
          down_payment: dp,
          during_construction: dc,
          on_handover: oh
        }, // JSONB
        developer_description: formData.developer_description,
        project_status: formData.project_status,

        // Modified Fields
        amenities: formData.amenities.join(', '), // Keeping string for backwards compatibility, or could change to JSONB
        
        // Media
        images: imageUrls,
        video_url: videoUrl,
        floor_plans: floorPlanUrls, // JSONB
        brochure_url: brochureUrl,
      };

      // 3. Save to Supabase
      const { error } = await supabase.from('properties').insert([payload]);

      if (error) {
        if (error.code === 'PGRST204') {
            alert("Database Schema Error: You need to run the SQL query from the plan to add the new columns (handover_date, short_description, etc.) before you can submit!");
        }
        throw error;
      }

      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push('/client/properties'), 2000);

    } catch (error: any) {
      console.error("Error uploading property:", JSON.stringify(error, null, 2));
      alert(error?.message || error?.details || JSON.stringify(error) || "Failed to upload property. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 2rem' }}>✓</div>
        <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Property Submitted Successfully!</h2>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Your property has been submitted for advisory review.</p>
      </div>
    );
  }

  // Helper styles
  const headerStyle = { fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem', color: 'var(--primary-red)' };
  const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', fontSize: '1rem' };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' };

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>List a Property</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Submit comprehensive details to list on AKR Group.</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* Section 1: Basic Information */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>1. Basic Information</h3>
          
          <div className="form-grid-2" style={{ marginBottom: '2rem' }}>
            <div>
              <label style={labelStyle}>Project / Property Name *</label>
              <input name="title" value={formData.title} onChange={handleChange} required type="text" placeholder="e.g. Luxury Villa in Palm Jumeirah" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Property Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
          </div>

          <div className="form-grid-3" style={{ marginBottom: '2rem' }}>
            <div>
              <label style={labelStyle}>Price *</label>
              <div style={{ display: 'flex' }}>
                <select name="currency" value={formData.currency} onChange={handleChange} style={{ ...inputStyle, width: '30%', borderRadius: '4px 0 0 4px', borderRight: 'none', backgroundColor: '#f9f9f9' }}>
                  <option value="AED">AED</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <input name="price" value={formData.price} onChange={handlePriceChange} required type="text" placeholder="2,500,000" style={{ ...inputStyle, width: '70%', borderRadius: '0 4px 4px 0' }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Bedrooms</label>
              <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} style={inputStyle}>
                <option value="Studio">Studio</option>
                <option value="1">1 Bed</option><option value="2">2 Beds</option><option value="3">3 Beds</option><option value="4">4 Beds</option><option value="5+">5+ Beds</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Bathrooms</label>
              <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} style={inputStyle}>
                <option value="1">1 Bath</option><option value="2">2 Baths</option><option value="3">3 Baths</option><option value="4+">4+ Baths</option>
              </select>
            </div>
          </div>

          <div className="form-grid-3">
            <div>
              <label style={labelStyle}>Property Area (Sq.Ft) *</label>
              <input name="size" value={formData.size} onChange={handleChange} required type="number" placeholder="1200" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Property Status *</label>
              <select name="property_status" value={formData.property_status} onChange={handleChange} style={inputStyle}>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Off-Plan">Off-Plan</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Handover Date</label>
              <input name="handover_date" value={formData.handover_date} onChange={handleChange} type="date" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Section 2: Property Description */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>2. Property Description</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Short Description (Headline)</label>
            <input name="short_description" value={formData.short_description} onChange={handleChange} type="text" placeholder="A stunning 3-bedroom apartment with panoramic marina views..." style={inputStyle} maxLength={150} />
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem', textAlign: 'right' }}>Max 150 characters</div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Detailed Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} placeholder="Provide a comprehensive description of the property, its design, finishes, and layout..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

          <div>
            <label style={labelStyle}>Lifestyle / Community Overview</label>
            <textarea name="lifestyle_overview" value={formData.lifestyle_overview} onChange={handleChange} rows={4} placeholder="Describe what it's like to live in this community..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>
        </div>

        {/* Section 3: Features & Amenities */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>3. Features & Amenities</h3>
          
          <div style={{ marginBottom: '3rem' }}>
            <label style={labelStyle}>Property Features (Select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1rem' }}>
              {PROPERTY_FEATURES_LIST.map(feature => (
                <div 
                  key={feature} 
                  onClick={() => toggleFeature(feature)}
                  style={{ 
                    padding: '0.6rem 1.2rem', 
                    borderRadius: '30px', 
                    border: '1px solid', 
                    borderColor: formData.property_features.includes(feature) ? 'var(--primary-red)' : '#ddd',
                    backgroundColor: formData.property_features.includes(feature) ? 'rgba(139,0,0,0.05)' : 'white',
                    color: formData.property_features.includes(feature) ? 'var(--primary-red)' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                >
                  {formData.property_features.includes(feature) ? '✓ ' : ''}{feature}
                </div>
              ))}
              
              {/* Custom Added Features */}
              {formData.property_features.filter(f => !PROPERTY_FEATURES_LIST.includes(f)).map(feature => (
                <div 
                  key={feature} 
                  onClick={() => toggleFeature(feature)}
                  style={{ 
                    padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px solid var(--primary-red)', 
                    backgroundColor: 'rgba(139,0,0,0.05)', color: 'var(--primary-red)', cursor: 'pointer', fontWeight: 500
                  }}
                >
                  ✓ {feature}
                </div>
              ))}

              {/* Other Button */}
              <div 
                onClick={() => setShowOtherFeature(!showOtherFeature)}
                style={{ 
                  padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px dashed #999', 
                  backgroundColor: 'white', color: '#666', cursor: 'pointer', fontWeight: 500
                }}
              >
                + Other
              </div>
            </div>

            {showOtherFeature && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={customFeature} 
                  onChange={(e) => setCustomFeature(e.target.value)} 
                  placeholder="Type a custom feature..." 
                  style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid #ccc', flex: 1, maxWidth: '300px' }} 
                />
                <button 
                  type="button" 
                  onClick={() => {
                    if (customFeature.trim()) {
                      if (!formData.property_features.includes(customFeature.trim())) toggleFeature(customFeature.trim());
                      setCustomFeature('');
                      setShowOtherFeature(false);
                    }
                  }}
                  style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', backgroundColor: 'var(--primary-red)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Add Feature
                </button>
              </div>
            )}
          </div>

          <div>
            <label style={labelStyle}>Community Amenities (Select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1rem' }}>
              {COMMUNITY_AMENITIES_LIST.map(amenity => (
                <div 
                  key={amenity} 
                  onClick={() => toggleAmenity(amenity)}
                  style={{ 
                    padding: '0.6rem 1.2rem', 
                    borderRadius: '30px', 
                    border: '1px solid', 
                    borderColor: formData.amenities.includes(amenity) ? 'var(--accent-gold)' : '#ddd',
                    backgroundColor: formData.amenities.includes(amenity) ? 'rgba(212,175,55,0.05)' : 'white',
                    color: formData.amenities.includes(amenity) ? 'var(--accent-gold)' : '#666',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500
                  }}
                >
                  {formData.amenities.includes(amenity) ? '✓ ' : ''}{amenity}
                </div>
              ))}

              {/* Custom Added Amenities */}
              {formData.amenities.filter(a => !COMMUNITY_AMENITIES_LIST.includes(a)).map(amenity => (
                <div 
                  key={amenity} 
                  onClick={() => toggleAmenity(amenity)}
                  style={{ 
                    padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px solid var(--accent-gold)', 
                    backgroundColor: 'rgba(212,175,55,0.05)', color: 'var(--accent-gold)', cursor: 'pointer', fontWeight: 500
                  }}
                >
                  ✓ {amenity}
                </div>
              ))}

              {/* Other Button */}
              <div 
                onClick={() => setShowOtherAmenity(!showOtherAmenity)}
                style={{ 
                  padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px dashed #999', 
                  backgroundColor: 'white', color: '#666', cursor: 'pointer', fontWeight: 500
                }}
              >
                + Other
              </div>
            </div>

            {showOtherAmenity && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={customAmenity} 
                  onChange={(e) => setCustomAmenity(e.target.value)} 
                  placeholder="Type a custom amenity..." 
                  style={{ padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid #ccc', flex: 1, maxWidth: '300px' }} 
                />
                <button 
                  type="button" 
                  onClick={() => {
                    if (customAmenity.trim()) {
                      if (!formData.amenities.includes(customAmenity.trim())) toggleAmenity(customAmenity.trim());
                      setCustomAmenity('');
                      setShowOtherAmenity(false);
                    }
                  }}
                  style={{ padding: '0.5rem 1.5rem', borderRadius: '30px', backgroundColor: 'var(--accent-gold)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Add Amenity
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Payment Plan */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>4. Payment Plan (Optional)</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>For off-plan properties, outline the payment structure. Percentages must sum to exactly 100%.</p>
          
          <div className="form-grid-3">
            <div>
              <label style={labelStyle}>Down Payment (%)</label>
              <div style={{ position: 'relative' }}>
                <input name="down_payment_pct" value={formData.down_payment_pct} onChange={handleChange} type="number" min="0" max="100" placeholder="e.g. 20" style={{ ...inputStyle, paddingRight: '2.5rem' }} />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>%</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>During Construction (%)</label>
              <div style={{ position: 'relative' }}>
                <input name="during_construction_pct" value={formData.during_construction_pct} onChange={handleChange} type="number" min="0" max="100" placeholder="e.g. 30" style={{ ...inputStyle, paddingRight: '2.5rem' }} />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>%</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>On Handover (%)</label>
              <div style={{ position: 'relative' }}>
                <input name="on_handover_pct" value={formData.on_handover_pct} onChange={handleChange} type="number" min="0" max="100" placeholder="e.g. 50" style={{ ...inputStyle, paddingRight: '2.5rem' }} />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Location */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>5. Location</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Address / Community *</label>
            <input name="location" value={formData.location} onChange={handleChange} required type="text" placeholder="e.g. Palm Jumeirah, Dubai" style={inputStyle} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={labelStyle}>Google Maps Embed Link</label>
            <input 
              name="google_map_link" 
              value={formData.google_map_link} 
              onChange={handleChange} 
              type="text" 
              placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe> OR https://www.google.com/maps/embed?...' 
              style={inputStyle} 
            />
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>Paste the Google Maps embed URL (src) here.</p>
          </div>

          {/* Map Preview */}
          {formData.google_map_link && formData.google_map_link.includes('google.com/maps') && (
            <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid #ccc' }}>
              <iframe 
                src={formData.google_map_link.match(/src="([^"]+)"/)?.[1] || formData.google_map_link} 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              ></iframe>
            </div>
          )}

          <div>
            <label style={{ ...labelStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Nearby Places & Travel Times
              <button type="button" onClick={addNearbyPlace} style={{ background: 'none', border: 'none', color: 'var(--primary-red)', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Place</button>
            </label>
            
            {formData.nearby_places.length === 0 && (
              <p style={{ color: '#999', fontStyle: 'italic', padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', textAlign: 'center' }}>No nearby places added. Click "+ Add Place" to list landmarks.</p>
            )}

            {formData.nearby_places.map((place, index) => (
              <div key={index} className="form-grid-nearby" style={{ marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={place.place} 
                  onChange={(e) => updateNearbyPlace(index, 'place', e.target.value)} 
                  placeholder="e.g. Dubai Mall" 
                  style={inputStyle} 
                />
                <input 
                  type="text" 
                  value={place.distance} 
                  onChange={(e) => updateNearbyPlace(index, 'distance', e.target.value)} 
                  placeholder="e.g. 15 mins drive" 
                  style={inputStyle} 
                />
                <button type="button" onClick={() => removeNearbyPlace(index)} style={{ padding: '0 1rem', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Media */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>6. Media & Documents</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>High-quality media significantly increases listing engagement.</p>
          
          <div className="form-grid-2" style={{ marginBottom: '2rem' }}>
            <div style={{ padding: '1.5rem', border: '2px dashed #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
              <label style={labelStyle}>Property Images (Max 7) *</label>
              <input 
                type="file" accept="image/*" multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length > 7) return alert('Max 7 images allowed.');
                  setImageFiles(files);
                }}
                style={inputStyle} 
              />
              <div style={{ color: 'var(--primary-red)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{imageFiles.length} image(s) selected</div>
            </div>
            
            <div style={{ padding: '1.5rem', border: '2px dashed #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
              <label style={labelStyle}>Property Video (Optional)</label>
              <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} style={inputStyle} />
              <div style={{ color: 'var(--primary-red)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{videoFile ? videoFile.name : 'No video selected'}</div>
            </div>
          </div>

          <div className="form-grid-2">
            <div style={{ padding: '1.5rem', border: '2px dashed #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
              <label style={labelStyle}>Floor Plans (Images or PDF)</label>
              <input 
                type="file" accept="image/*,application/pdf" multiple
                onChange={(e) => setFloorPlanFiles(Array.from(e.target.files || []))}
                style={inputStyle} 
              />
              <div style={{ color: 'var(--primary-red)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{floorPlanFiles.length} file(s) selected</div>
            </div>
            
            <div style={{ padding: '1.5rem', border: '2px dashed #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
              <label style={labelStyle}>Property Brochure (PDF)</label>
              <input type="file" accept="application/pdf" onChange={(e) => setBrochureFile(e.target.files?.[0] || null)} style={inputStyle} />
              <div style={{ color: 'var(--primary-red)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{brochureFile ? brochureFile.name : 'No brochure selected'}</div>
            </div>
          </div>
        </div>

        {/* Section 7: Developer Information */}
        <div className="form-section-container">
          <h3 className="font-serif" style={headerStyle}>7. Developer Information</h3>
          
          <div className="form-grid-2" style={{ marginBottom: '2rem' }}>
            <div>
              <label style={labelStyle}>Developer Name *</label>
              <input name="developer" value={formData.developer} onChange={handleChange} required type="text" placeholder="e.g. Emaar Properties" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Project Status *</label>
              <select name="project_status" value={formData.project_status} onChange={handleChange} style={inputStyle}>
                <option value="Completed">Completed</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Developer Description (Optional)</label>
            <textarea name="developer_description" value={formData.developer_description} onChange={handleChange} rows={3} placeholder="Brief background about the developer's reputation and track record..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-gold-solid"
            style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 10px 30px rgba(212,175,55,0.3)', width: '100%', maxWidth: '500px' }}
          >
            {loading ? 'UPLOADING ASSETS & SUBMITTING...' : 'SUBMIT PROPERTY LISTING'}
          </button>
        </div>

      </form>
    </div>
  );
}
