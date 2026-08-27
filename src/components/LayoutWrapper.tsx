"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      <Header />
      <main style={{ flex: 1, paddingTop: '80px', backgroundColor: isAdminRoute ? '#fcfbf8' : 'transparent', minHeight: isAdminRoute ? '100vh' : 'auto' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
