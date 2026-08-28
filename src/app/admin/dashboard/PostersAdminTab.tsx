"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import imageCompression from 'browser-image-compression';

export default function PostersAdminTab({ userId }: { userId: string }) {
  const [posters, setPosters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('posters').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setPosters(data);
    } catch (err: any) {
      console.error("Error fetching posters:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToR2 = async (file: File, userId: string): Promise<string> => {
    let fileToUpload = file;
    if (file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 0.4,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          initialQuality: 0.85,
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (posters.length >= 5) {
      alert("You already have 5 posters. Please delete one before uploading another.");
      return;
    }

    setUploading(true);
    try {
      const file = files[0];
      const imageUrl = await uploadFileToR2(file, userId);
      
      const { data, error } = await supabase.from('posters').insert([{
        image_url: imageUrl,
        is_active: true,
        link_url: newLink || null
      }]).select();

      if (error) throw error;
      
      if (data) {
        setPosters([data[0], ...posters]);
      }
      alert("Poster uploaded successfully.");
    } catch (err: any) {
      alert("Failed to upload poster: " + err.message);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = ''; // reset input
      setNewLink(''); // reset link
    }
  };

  const toggleStatus = async (poster: any) => {
    try {
      const { error } = await supabase.from('posters')
        .update({ is_active: !poster.is_active })
        .eq('id', poster.id);
      
      if (error) throw error;
      setPosters(posters.map(p => p.id === poster.id ? { ...p, is_active: !poster.is_active } : p));
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const deletePoster = async (id: string) => {
    if (!confirm("Are you sure you want to delete this poster?")) return;
    try {
      const { error } = await supabase.from('posters').delete().eq('id', id);
      if (error) throw error;
      setPosters(posters.filter(p => p.id !== id));
    } catch (err: any) {
      alert("Failed to delete poster: " + err.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <div className="client-header-flex" style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Popup Posters</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage posters that appear as a popup on the home page (max 5). 1 will be chosen randomly.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Destination Link (optional)" 
            value={newLink} 
            onChange={(e) => setNewLink(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '250px' }}
          />
          <label className="btn-red" style={{ cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1, padding: '0.75rem 2rem', display: 'inline-block' }}>
            {uploading ? 'Uploading...' : 'Upload New Poster'}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <p>Loading posters...</p>
      ) : posters.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No posters found. Upload one to get started.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {posters.map(poster => (
            <div key={poster.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={poster.image_url} alt="Poster" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              {poster.link_url && (
                <div style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: '#0066cc', borderTop: '1px solid #eee', wordBreak: 'break-all' }}>
                  <strong>Link:</strong> {poster.link_url}
                </div>
              )}
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fcfbf8', borderTop: '1px solid #eee' }}>
                <button 
                  onClick={() => toggleStatus(poster)}
                  style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '4px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    backgroundColor: poster.is_active ? '#d4edda' : '#e2e3e5',
                    color: poster.is_active ? '#155724' : '#383d41'
                  }}
                >
                  {poster.is_active ? 'Active' : 'Inactive'}
                </button>
                <button 
                  onClick={() => deletePoster(poster.id)}
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #dc3545', backgroundColor: 'transparent', color: '#dc3545', cursor: 'pointer', fontWeight: 600 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
