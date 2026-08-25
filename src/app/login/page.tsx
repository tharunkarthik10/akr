"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();
  const isAdminView = searchParams.get('type') === 'admin';
  
  const [email, setEmail] = useState(isAdminView ? 'tharunkarthikav21@gmail.com' : '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Ensure email updates if they switch tabs without unmounting
  useEffect(() => {
    if (isAdminView) {
      setEmail('tharunkarthikav21@gmail.com');
    } else {
      setEmail('');
    }
  }, [isAdminView]);

  // If already logged in, redirect based on user role/email
  useEffect(() => {
    if (user) {
      if (user.email?.toLowerCase() === 'tharunkarthikav21@gmail.com') {
        router.push('/admin/dashboard');
      } else {
        router.push('/client/post-property');
      }
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Route based on who logged in
      if (email.toLowerCase() === 'tharunkarthikav21@gmail.com') {
        router.push('/admin/dashboard');
      } else {
        router.push('/client/post-property');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfbf8' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem', 
        backgroundColor: 'white', 
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        borderTop: isAdminView ? '5px solid #333' : '5px solid var(--primary-red)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2rem', color: 'var(--text-dark)' }}>
            {isAdminView ? 'ADMIN LOGIN' : 'CLIENT LOGIN'}
          </h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            {isAdminView ? 'Access the AKR Group control panel' : 'Access your personalized AKR dashboard'}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={isAdminView}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', backgroundColor: isAdminView ? '#f5f5f5' : 'white', color: isAdminView ? '#555' : 'inherit' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={isAdminView ? "btn-outline-dark" : "btn-red"}
            style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
          {!isAdminView ? (
            <>
              <p style={{ color: '#666' }}>Don't have an account?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <Link href="/register" style={{ color: 'var(--primary-red)', fontWeight: 600 }}>
                  Register as a Client
                </Link>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div style={{ height: '1px', backgroundColor: '#eee', flex: 1 }}></div>
                  <span style={{ color: '#aaa', fontSize: '0.8rem' }}>OR</span>
                  <div style={{ height: '1px', backgroundColor: '#eee', flex: 1 }}></div>
                </div>

                <Link href="/login?type=admin" style={{ color: '#333', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  🛡️ Login as Admin
                </Link>
              </div>
            </>
          ) : (
            <Link href="/login" style={{ color: 'var(--primary-red)', fontWeight: 600 }}>
              ← Back to Client Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
