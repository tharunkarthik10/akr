"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import PostersAdminTab from './PostersAdminTab';

function AdminDashboardContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'properties' | 'queries' | 'requests' | 'posters') || 'requests';
  const [activeTab, setActiveTab] = useState<'properties' | 'queries' | 'requests' | 'posters'>(initialTab);

  // Sync state if URL changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'properties' || tab === 'queries' || tab === 'requests' || tab === 'posters') {
      setActiveTab(tab as any);
    }
  }, [searchParams]);
  
  const [properties, setProperties] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Modals state
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [suggestingEditsFor, setSuggestingEditsFor] = useState<any>(null);
  const [adminFeedback, setAdminFeedback] = useState('');

  // Security check: Only allow specific admin emails
  const ADMIN_EMAILS = ['tharunkarthikav21@gmail.com', 'admin@akrgroupuae.com'];

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
        router.push('/client/post-property');
      } else {
        fetchData();
      }
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [propsRes, queriesRes] = await Promise.all([
        supabase.from('properties').select('*').order('created_at', { ascending: false }),
        supabase.from('support_queries').select('*').order('created_at', { ascending: false })
      ]);

      if (propsRes.data) setProperties(propsRes.data);
      if (queriesRes.data) setQueries(queriesRes.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const updatePropertyStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setProperties(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      alert(`Property status updated to: ${newStatus}`);
    } catch (error: any) {
      alert("Failed to update status: " + error.message);
    }
  };

  const handleSavePropertyEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;
    try {
      const { error } = await supabase.from('properties').update({
        title: editingProperty.title,
        description: editingProperty.description,
        price: editingProperty.price,
        location: editingProperty.location,
        developer: editingProperty.developer,
        amenities: editingProperty.amenities,
      }).eq('id', editingProperty.id);

      if (error) throw error;
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? editingProperty : p));
      setEditingProperty(null);
      alert('Property updated successfully.');
    } catch (err: any) {
      alert('Failed to update property: ' + err.message);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm("Are you sure you want to completely delete this property? This action cannot be undone.")) return;
    
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
      setProperties(properties.filter(p => p.id !== id));
      alert("Property deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Check your permissions or RLS policies.");
    }
  };

  const handleSubmitFeedback = async () => {
    if (!suggestingEditsFor) return;
    try {
      // NOTE: This assumes admin_feedback column exists in DB.
      const { error } = await supabase.from('properties').update({
        status: 'Edits Requested',
        admin_feedback: adminFeedback
      }).eq('id', suggestingEditsFor.id);
      
      if (error) throw error;
      setProperties(prev => prev.map(p => p.id === suggestingEditsFor.id ? { ...p, status: 'Edits Requested', admin_feedback: adminFeedback } : p));
      setSuggestingEditsFor(null);
      setAdminFeedback('');
      alert('Feedback sent and status updated to Edits Requested.');
    } catch (err: any) {
      alert('Failed to save feedback: ' + err.message);
    }
  };

  const updateQueryStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('support_queries')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setQueries(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    } catch (error: any) {
      alert("Failed to update status: " + error.message);
    }
  };

  if (authLoading || (ADMIN_EMAILS.includes(user?.email?.toLowerCase() || '') && dataLoading)) {
    return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Admin Dashboard...</div>;
  }

  if (!ADMIN_EMAILS.includes(user?.email?.toLowerCase() || '')) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfbf8' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary-red)', marginBottom: '1rem' }}>Access Denied</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>You must be logged in as an administrator to view this page.</p>
        <button onClick={() => router.push('/login?type=admin')} className="btn-red" style={{ padding: '0.75rem 2rem' }}>
          Go to Admin Login
        </button>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const pendingRequests = properties.filter(p => p.status === 'Pending Approval' || p.status === 'Edits Requested');
  const otherProperties = properties.filter(p => p.status !== 'Pending Approval' && p.status !== 'Edits Requested');

  const renderPropertyCard = (property: any) => (
    <div key={property.id} className="client-property-card">
      <div className="client-property-card-left" style={{ flex: 1 }}>
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt="Property" 
            style={{ width: '160px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} 
          />
        ) : (
          <div style={{ width: '160px', height: '120px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{property.title}</h3>
            <span style={{ 
              padding: '0.2rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600,
              backgroundColor: property.status === 'Approved' ? '#d4edda' : property.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
              color: property.status === 'Approved' ? '#155724' : property.status === 'Rejected' ? '#721c24' : '#856404'
            }}>
              {property.status}
            </span>
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{property.location} • {property.developer}</p>
          <p style={{ fontWeight: 600, color: 'var(--primary-red)', marginBottom: '0.5rem' }}>{property.currency} {property.price}</p>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>User ID: {property.user_id}</p>
          <p style={{ fontSize: '0.8rem', color: '#888' }}>Submitted: {new Date(property.created_at).toLocaleString()}</p>
          {property.admin_feedback && (
            <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '0.85rem' }}>
              <strong>Admin Feedback:</strong> {property.admin_feedback}
            </div>
          )}
        </div>
      </div>
      
      <div className="admin-property-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center', minWidth: '180px' }}>
        <button onClick={() => setEditingProperty(property)} style={{ padding: '0.5rem 1rem', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          Make Edit
        </button>
        {property.status !== 'Approved' && (
          <button onClick={() => updatePropertyStatus(property.id, 'Approved')} style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
            Approve
          </button>
        )}
        {property.status !== 'Rejected' && (
          <button onClick={() => updatePropertyStatus(property.id, 'Rejected')} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
            Reject
          </button>
        )}
        <button onClick={() => setSuggestingEditsFor(property)} style={{ padding: '0.5rem 1rem', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          Suggest Edits
        </button>
        <button onClick={() => handleDeleteProperty(property.id)} style={{ padding: '0.5rem 1rem', backgroundColor: 'transparent', color: '#dc2626', border: '1px solid #dc2626', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '0.5rem' }}>
          Delete Property
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fcfbf8', minHeight: '100vh', padding: '3rem 0', position: 'relative' }}>
      
      {/* EDIT MODAL */}
      {editingProperty && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Make Edit: {editingProperty.title}</h2>
            <form onSubmit={handleSavePropertyEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>Title</label>
                <input type="text" value={editingProperty.title} onChange={e => setEditingProperty({...editingProperty, title: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>Price</label>
                  <input type="text" value={editingProperty.price} onChange={e => setEditingProperty({...editingProperty, price: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>Developer</label>
                  <input type="text" value={editingProperty.developer} onChange={e => setEditingProperty({...editingProperty, developer: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>Location</label>
                <input type="text" value={editingProperty.location} onChange={e => setEditingProperty({...editingProperty, location: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>Amenities</label>
                <input type="text" value={editingProperty.amenities} onChange={e => setEditingProperty({...editingProperty, amenities: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description</label>
                <textarea rows={5} value={editingProperty.description} onChange={e => setEditingProperty({...editingProperty, description: e.target.value})} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setEditingProperty(null)} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUGGEST EDITS MODAL */}
      {suggestingEditsFor && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Suggest Edits</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>Leave feedback for the client on property "{suggestingEditsFor.title}". This will change its status to "Edits Requested".</p>
            <textarea 
              rows={4} 
              value={adminFeedback}
              onChange={e => setAdminFeedback(e.target.value)}
              placeholder="e.g., Please upload higher resolution images and fix the spelling in the description."
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }} 
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => {setSuggestingEditsFor(null); setAdminFeedback('');}} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSubmitFeedback} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Submit Feedback</button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        
        <div className="client-header-flex">
          <div>
            <h1 className="font-serif" style={{ fontSize: '2.5rem', color: 'var(--text-dark)' }}>Admin Portal</h1>
            <p style={{ color: '#666' }}>Welcome back, Admin. Manage all requests here.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={() => {setActiveTab('requests'); router.push('?tab=requests');}}
              className={activeTab === 'requests' ? "btn-red" : "btn-outline-dark"}
              style={{ padding: '0.75rem 2rem' }}
            >
              Requests ({pendingRequests.length})
            </button>
            <button 
              onClick={() => {setActiveTab('properties'); router.push('?tab=properties');}}
              className={activeTab === 'properties' ? "btn-red" : "btn-outline-dark"}
              style={{ padding: '0.75rem 2rem' }}
            >
              Properties ({otherProperties.length})
            </button>
            <button 
              onClick={() => {setActiveTab('queries'); router.push('?tab=queries');}}
              className={activeTab === 'queries' ? "btn-red" : "btn-outline-dark"}
              style={{ padding: '0.75rem 2rem' }}
            >
              Support Queries ({queries.filter(q => q.status === 'Open').length} Open)
            </button>
            <button 
              onClick={() => {setActiveTab('posters'); router.push('?tab=posters');}}
              className={activeTab === 'posters' ? "btn-red" : "btn-outline-dark"}
              style={{ padding: '0.75rem 2rem' }}
            >
              Posters
            </button>
          </div>
        </div>

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {pendingRequests.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px' }}>No pending requests.</p>
            ) : (
              pendingRequests.map(renderPropertyCard)
            )}
          </div>
        )}

        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {otherProperties.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px' }}>No approved or rejected properties.</p>
            ) : (
              otherProperties.map(renderPropertyCard)
            )}
          </div>
        )}

        {/* QUERIES TAB */}
        {activeTab === 'queries' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {queries.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '8px' }}>No support queries found.</p>
            ) : (
              queries.map(query => (
                <div key={query.id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                  
                  <div className="client-header-flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>{query.name}</h3>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>{query.service} • {query.project}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600,
                        backgroundColor: query.status === 'Resolved' ? '#d4edda' : '#fff3cd',
                        color: query.status === 'Resolved' ? '#155724' : '#856404'
                      }}>
                        {query.status}
                      </span>
                      <button 
                        onClick={() => updateQueryStatus(query.id, query.status === 'Open' ? 'Resolved' : 'Open')}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                      >
                        Mark as {query.status === 'Open' ? 'Resolved' : 'Open'}
                      </button>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div style={{ fontSize: '0.9rem' }}>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {query.email}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Mobile:</strong> {query.countryCode} {query.mobile}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Nationality:</strong> {query.nationality}</p>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Submitted:</strong> {new Date(query.created_at).toLocaleString()}</p>
                    </div>
                    
                    <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Message:</p>
                      <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>{query.query}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                    <a 
                      href={`mailto:${query.email}?subject=Regarding your AKR Group Query: ${query.project}`}
                      className="btn-outline-dark"
                      style={{ padding: '0.5rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      ✉️ Reply via Email
                    </a>
                    
                    <a 
                      href={`https://wa.me/${query.countryCode?.replace('+', '')}${query.mobile?.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-dark"
                      style={{ padding: '0.5rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderColor: '#25D366', color: '#25D366' }}
                    >
                      💬 Reply via WhatsApp
                    </a>
                  </div>
                  
                </div>
              ))
            )}
          </div>
        )}

        {/* POSTERS TAB */}
        {activeTab === 'posters' && user && (
          <PostersAdminTab userId={user.id} />
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <React.Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center' }}>Loading Admin Dashboard...</div>}>
      <AdminDashboardContent />
    </React.Suspense>
  );
}
