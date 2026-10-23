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
import { ArrowUp } from 'lucide-react';
import StudioAiBot from './StudioAiBot';

function ShellInner({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const { playClick } = useSound();

  const handleBackToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      {/* STUDIO FOOTER — Spacious 3-Row Layout */}
      <footer className="w-full bg-[#FBFBFB] border-t border-[rgba(18,18,19,0.08)] text-[#424242]">

        {/* ROW 1: Brand + Nav Links */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 pt-14 pb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* Brand */}
            <div className="flex flex-col gap-3 min-w-[180px]">
              <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image
                  src="/img/logo-main.png"
                  alt="PixelMutiny"
                  width={130}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
              </Link>
              <p className="text-xs text-[#6B7280] leading-relaxed max-w-[220px]">
                High-performance web systems for ambitious brands. New Delhi, India.
              </p>
            </div>

            {/* Nav columns */}
            <div className="flex flex-wrap gap-x-14 gap-y-6 text-sm">
              {/* Studio */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] font-mono">Studio</span>
                <Link href="/about" className="hover:text-[#0859D4] transition-colors font-medium">Agency</Link>
                <Link href="/works" className="hover:text-[#0859D4] transition-colors font-medium">Work</Link>
                <Link href="/services" className="hover:text-[#0859D4] transition-colors font-medium">Services</Link>
              </div>

              {/* Connect */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] font-mono">Connect</span>
                <a
                  href="https://www.linkedin.com/in/gfxsumit/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors font-medium inline-flex items-center gap-1"
                >
                  LinkedIn <span className="text-[10px]">↗</span>
                </a>
                <a
                  href="https://wa.me/919315580036?text=Hi%20Sumit%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20PixelMutiny"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1BC47D] hover:opacity-80 transition-opacity font-medium inline-flex items-center gap-1"
                >
                  WhatsApp <span className="text-[10px]">↗</span>
                </a>
                <a
                  href="mailto:contact@pixelmutiny.com"
                  className="hover:text-[#0859D4] transition-colors font-medium"
                >
                  Email us
                </a>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] font-mono">Start a project</span>
                <button
                  type="button"
                  onClick={() => { playClick(); setIsInquiryOpen(true); }}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1D1D1F] hover:bg-[#0859D4] text-white text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer w-fit"
                >
                  Let&apos;s Talk →
                </button>
                <button
                  type="button"
                  onClick={handleBackToTop}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[rgba(18,18,19,0.14)] bg-white hover:bg-[#F5F5F7] hover:text-[#0859D4] text-xs font-medium transition-all duration-200 active:scale-95 cursor-pointer w-fit"
                  aria-label="Back to top"
                >
                  Back to top <ArrowUp className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[rgba(18,18,19,0.1)]" />

        {/* ROW 2: Copyright bar */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF]">
            <span>© 2024–2026 PixelMutiny DigiMedia LLP. All rights reserved.</span>
            <span className="font-mono text-[11px]">Built in New Delhi · Shipped Worldwide</span>
          </div>
        </div>

      </footer>


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
