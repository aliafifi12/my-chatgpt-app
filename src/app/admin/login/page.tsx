'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is no longer needed as the main login page now handles admin authentication.
// This component simply redirects to the main login page to avoid confusion.
export default function AdminLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return null; // Render nothing while redirecting
}
