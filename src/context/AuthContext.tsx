"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase/client';

interface UserProfile {
  id: string; // Postgres UUID
  email: string | null;
  full_name: string | null;
  role: 'client' | 'admin';
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        setLoading(false); // unlock UI instantly
        await fetchProfile(session.user.id, session.user.email, session.user.user_metadata?.full_name);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    };
    
    initializeAuth();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
        await fetchProfile(session.user.id, session.user.email, session.user.user_metadata?.full_name);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, email?: string, fallbackName?: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setProfile(data as UserProfile);
      } else if (error && error.code === 'PGRST116') {
        // PGRST116 means no rows returned. We should create the profile.
        const newProfile = {
          id: userId,
          email: email || '',
          full_name: fallbackName || 'Client',
          role: 'client'
        };
        const { data: insertedData } = await supabase
          .from('users')
          .insert([newProfile])
          .select()
          .single();
          
        if (insertedData) {
          setProfile(insertedData as UserProfile);
        }
      }
    } catch (e) {
      console.warn("Error fetching Supabase profile:", e);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
