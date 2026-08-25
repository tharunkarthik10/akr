"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';

interface Property {
  id: string;
  user_id: string;
  title: string;
  location: string;
  price: string;
  currency: string;
  status: string;
  created_at: string;
  images?: string[];
  video_url?: string;
}

export default function MyPropertiesPage() {
  const { user, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setProperties((data as Property[]) || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      fetchProperties();
    }
  }, [user, authLoading]);

  if (loading || authLoading) {
    return <div>Loading your properties...</div>;
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;
    
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
      setProperties(properties.filter(p => p.id !== id));
      alert("Property deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. It may be linked to other records or you lack permission.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>My Properties</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Manage and view the properties you have submitted.</p>
        </div>
        <Link href="/client/post-property" className="btn-gold-solid" style={{ padding: '0.75rem 2rem' }}>
          + Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '4rem 2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '1.5rem', opacity: 0.5 }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Properties Listed Yet</h3>
          <p style={{ color: '#666', marginBottom: '2rem' }}>You haven't submitted any properties for review.</p>
          <Link href="/client/post-property" className="btn-outline-dark">
            Post Your First Property
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {properties.map(property => (
            <div key={property.id} style={{ display: 'flex', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0]} 
                    alt="Property" 
                    style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                ) : (
                  <div style={{ width: '120px', height: '80px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '0.8rem' }}>
                    [No Image]
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.25rem' }}>{property.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{property.location}</p>
                  <p style={{ fontWeight: 600, color: 'var(--primary-red)' }}>{property.currency} {parseFloat(property.price).toLocaleString()}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '0.25rem 1rem', 
                    borderRadius: '50px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    backgroundColor: property.status === 'Pending Approval' ? '#fff3cd' : '#d4edda',
                    color: property.status === 'Pending Approval' ? '#856404' : '#155724'
                  }}>
                    {property.status}
                  </span>
                  
                  <button 
                    onClick={() => handleDelete(property.id)}
                    style={{ 
                      backgroundColor: 'transparent', 
                      color: '#dc2626', 
                      border: '1px solid #dc2626', 
                      borderRadius: '4px', 
                      padding: '0.2rem 0.5rem', 
                      fontSize: '0.8rem', 
                      cursor: 'pointer',
                      marginTop: '0.5rem'
                    }}
                  >
                    Delete Property
                  </button>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                  Submitted on {new Date(property.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
