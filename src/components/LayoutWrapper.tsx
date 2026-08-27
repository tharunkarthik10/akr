"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [headerHeight, setHeaderHeight] = useState(110);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('.header-container');
      if (header) {
        setHeaderHeight(header.clientHeight);
      }
    };
    
    // Initial check
    updateHeaderHeight();
    
    // Check on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Small delay check to ensure fonts/images loaded
    const timeout = setTimeout(updateHeaderHeight, 100);
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <>
      <Header />
      <main style={{ flex: 1, paddingTop: `${headerHeight}px`, backgroundColor: isAdminRoute ? '#fcfbf8' : 'transparent', minHeight: isAdminRoute ? '100vh' : 'auto' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
