"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function SupportQueryPage() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const [userProperties, setUserProperties] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    countryCode: '+971',
    mobile: '',
    dob: '',
    nationality: '',
    project: '',
    service: 'Advisory',
    query: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProperties = async () => {
        try {
          const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('user_id', user.id);
            
          if (error) throw error;
          setUserProperties(data || []);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
      fetchProperties();
      
      // Auto-fill email if available and not set
      setFormData(prev => ({
        ...prev,
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to submit a query.");
    setLoading(true);

    // Create a payload that matches the Postgres column names (lowercase)
    const payload = {
      name: formData.name,
      email: formData.email,
      countrycode: formData.countryCode, // Postgres lowercases unquoted columns
      mobile: formData.mobile,
      dob: formData.dob,
      nationality: formData.nationality,
      project: formData.project,
      service: formData.service,
      query: formData.query,
      user_id: user.id,
      status: 'Open'
    };

    // Save to Supabase
    const { error } = await supabase.from('support_queries').insert([payload]);

    if (error) {
      console.error("Error submitting query:", error);
      alert("Failed to submit query: " + (error.message || JSON.stringify(error)));
      setLoading(false);
      return;
    }
    
    // Immediately show success
    setLoading(false);
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setFormData({ ...formData, query: '' }); // reset only the query text
    }, 3000);
  };

  if (success) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 2rem' }}>
          ✓
        </div>
        <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Query Submitted Successfully!</h2>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Our advisory team has received your query and will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Raise a Query</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Have a problem, doubt, or need advisory services? Submit your query below.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        
        <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>Personal & Project Details</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full Name *</label>
            <input name="name" value={formData.name} onChange={handleChange} required type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Date of Birth *</label>
            <input name="dob" value={formData.dob} onChange={handleChange} required type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address *</label>
            <input name="email" value={formData.email} onChange={handleChange} required type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Mobile Number *</label>
            <div style={{ display: 'flex' }}>
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} style={{ padding: '0.75rem', borderRadius: '4px 0 0 4px', border: '1px solid #ccc', borderRight: 'none', backgroundColor: '#f9f9f9', cursor: 'pointer', maxWidth: '120px' }}>
                <option value="+971">🇦🇪 +971</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+94">🇱🇰 +94</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+974">🇶🇦 +974</option>
                <option value="+7">🇷🇺 +7</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+33">🇫🇷 +33</option>
              </select>
              <input name="mobile" value={formData.mobile} onChange={handleChange} required type="tel" placeholder="55 884 7365" style={{ width: '100%', padding: '0.75rem', borderRadius: '0 4px 4px 0', border: '1px solid #ccc' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Nationality *</label>
            <input name="nationality" value={formData.nationality} onChange={handleChange} required type="text" placeholder="e.g. UAE, UK, India" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Project / Property *</label>
            <select name="project" value={formData.project} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="" disabled>Select a property...</option>
              {userProperties.map(p => (
                <option key={p.id} value={p.title || p.id}>
                  {p.title ? `${p.title} ${p.unitNo ? `(Unit: ${p.unitNo})` : ''}` : 'Unnamed Property'}
                </option>
              ))}
              <option value="General Query">General Query / Not Applicable</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Service Type *</label>
          <select name="service" value={formData.service} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Advisory">Advisory</option>
            <option value="Property Listing">Property Listing</option>
            <option value="Financial Strategy">Financial Strategy</option>
            <option value="Legal / Tax">Legal / Tax</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <h3 className="font-serif" style={{ fontSize: '1.5rem', margin: '3rem 0 2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>Your Query</h3>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Please describe your problem or doubt in detail *</label>
          <textarea name="query" value={formData.query} onChange={handleChange} required rows={6} placeholder="Type your query here..." style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-gold-solid"
            style={{ padding: '1rem 3rem', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT QUERY'}
          </button>
        </div>

      </form>
    </div>
  );
}
