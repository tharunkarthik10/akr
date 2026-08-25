"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientOverview() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/client/post-property');
  }, [router]);

  return null;
}
