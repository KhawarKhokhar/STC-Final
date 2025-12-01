'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ChatWidget from '@/components/ui/ChatWidget';
import CarbonJourneyPopup from '@/components/reusable/common/CarbonJourneyPopup'; 
import React from 'react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHiddenRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/login');


  return (
    <>
      {/* Global Popup Provider */}
      
        {/* Conditionally show Navbar, Chat, Footer */}
        {!isHiddenRoute && <Navbar />}

          {children}
        {!isHiddenRoute && <ChatWidget />}
        {!isHiddenRoute && <Footer />}

  
    </>
  );
}

