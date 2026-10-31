'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderHUD from './HeaderHUD';
import TakeoverMenu from './TakeoverMenu';
import QuickInquiryDrawer from './QuickInquiryDrawer';
import CustomCursor from './CustomCursor';
import SmoothScroll from './SmoothScroll';
import Preloader from './Preloader';
import PageTransition from './PageTransition';
import { ScrollProgressBar } from '@/lib/motion';
import { SoundProvider, useSound } from './SoundManager';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import StudioAiBot from './StudioAiBot';
import AgencyFooter from './AgencyFooter';

function ShellInner({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const { playClick } = useSound();

  return (
    <SmoothScroll>
      <ScrollProgressBar />
      <Preloader />
      <CustomCursor />

      <HeaderHUD
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      <TakeoverMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <QuickInquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Main Page Content */}
      <PageTransition>
        <main className="min-h-screen bg-white text-[#1D1D1F]">
          {children}
        </main>
      </PageTransition>

      {/* Dynamic Editorial Agency Footer (Inspired by Site of the Day / Brutalist Reference) */}
      <AgencyFooter onOpenInquiry={() => setIsInquiryOpen(true)} />


      {/* Autonomous Studio AI Assistant & Cute Bot (Always on top of all page elements) */}
      <StudioAiBot
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />
    </SmoothScroll>
  );
}

export default function GlobalShell({ children }) {
  return (
    <SoundProvider>
      <ShellInner>{children}</ShellInner>
    </SoundProvider>
  );
}
