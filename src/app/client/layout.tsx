"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // Protect route
  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.email?.toLowerCase() === 'tharunkarthikav21@gmail.com') {
        router.push('/admin/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Client Portal...</div>;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navItems = [
    { name: 'My Properties', path: '/client/properties' },
    { name: 'Post a Property', path: '/client/post-property' },
    { name: 'Raise a Query', path: '/client/support' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fcfbf8' }}>
      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {children}
      </main>
    </div>
  );
}
