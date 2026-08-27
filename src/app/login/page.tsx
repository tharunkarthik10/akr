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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Ensure email clears if they switch tabs without unmounting
  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, [isAdminView]);

  const ADMIN_EMAILS = ['tharunkarthikav21@gmail.com', 'admin@akrgroupuae.com'];

  // If already logged in, redirect based on user role/email
  useEffect(() => {
    if (user) {
      if (ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
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
      if (ADMIN_EMAILS.includes(email.toLowerCase())) {
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
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', backgroundColor: 'white', color: 'inherit' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', backgroundColor: 'white', color: 'inherit' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '0.75rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <Link href="/register" className="btn-outline-dark" style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600 }}>
                  Register as New Client
                </Link>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div style={{ height: '1px', backgroundColor: '#eee', flex: 1 }}></div>
                  <span style={{ color: '#aaa', fontSize: '0.8rem' }}>OR</span>
                  <div style={{ height: '1px', backgroundColor: '#eee', flex: 1 }}></div>
                </div>

                <Link href="/login?type=admin" className="btn-outline-dark" style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#fcfbf8', color: '#333' }}>
                  🛡️ Admin Login
                </Link>
              </div>
            </>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              <Link href="/login" className="btn-outline-dark" style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 600, display: 'block', width: '100%' }}>
                ← Client Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
