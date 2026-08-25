"use client";

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      router.push('/client/post-property');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user returned");

      // 2. Insert into users table (optional, our AuthContext also handles this on login, but good to do explicitly)
      const newProfile = {
        id: authData.user.id,
        email: email,
        full_name: name,
        role: 'client'
      };

      const { error: dbError } = await supabase
        .from('users')
        .insert([newProfile]);
        
      if (dbError && dbError.code !== '23505') { // Ignore unique violation if it already exists
        console.warn("Could not insert user profile:", dbError);
      }

      router.push('/client/post-property');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfbf8', padding: '2rem 0' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        padding: '3rem', 
        backgroundColor: 'white', 
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        borderTop: '5px solid var(--accent-gold)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif" style={{ fontSize: '2rem', color: 'var(--text-dark)' }}>Client Registration</h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Join AKR Group and manage your portfolio</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn-gold-solid"
            style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
          <p style={{ color: '#666' }}>Already have an account?</p>
          <Link href="/login" style={{ color: 'var(--primary-red)', fontWeight: 600, marginTop: '0.5rem', display: 'inline-block' }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
