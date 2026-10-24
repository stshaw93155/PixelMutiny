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

      {/* STUDIO FOOTER — Compact Single Row Layout */}
      <footer className="w-full bg-[#FBFBFB] border-t border-[rgba(0,0,0,0.08)] text-[#1a1a1f]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8">
          
          {/* Main Grid: Mobile (stacked/2-col), Tablet (2-col), Desktop (1 single compact row) */}
          <div className="compact-footer-grid gap-y-7 md:gap-y-8 gap-x-6 sm:gap-x-8 lg:gap-x-12">

            {/* COLUMN 1: BRAND */}
            <div className="flex flex-col items-start md:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block hover:opacity-80 transition-opacity p-0 m-0">
                <Image
                  src="/img/logo-main.png"
                  alt="PixelMutiny"
                  width={115}
                  height={28}
                  className="h-[28px] w-auto object-contain block p-0 m-0"
                  priority={false}
                />
              </Link>
              <p className="text-[13px] leading-[1.5] text-[#6b6b73] mt-3 max-w-[280px]">
                High-performance web systems for ambitious brands. New Delhi, India.
              </p>
            </div>

            {/* COLUMN 2: STUDIO */}
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9a9aa5] mb-3.5 block leading-none">
                Studio
              </span>
              <div className="flex flex-col gap-2 text-[14px] leading-[1.4] text-[#1a1a1f]">
                <Link href="/about" className="hover:text-[#0859D4] transition-colors duration-150">Agency</Link>
                <Link href="/works" className="hover:text-[#0859D4] transition-colors duration-150">Work</Link>
                <Link href="/services" className="hover:text-[#0859D4] transition-colors duration-150">Services</Link>
              </div>
            </div>

            {/* COLUMN 3: CONNECT */}
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9a9aa5] mb-3.5 block leading-none">
                Connect
              </span>
              <div className="flex flex-col gap-2 text-[14px] leading-[1.4] text-[#1a1a1f]">
                <a
                  href="https://www.linkedin.com/in/gfxsumit/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors duration-150 inline-flex items-center gap-1"
                >
                  LinkedIn <span className="text-[10px]">↗</span>
                </a>
                <a
                  href="https://wa.me/919315580036?text=Hi%20Sumit%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20PixelMutiny"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1BC47D] hover:opacity-85 transition-opacity duration-150 inline-flex items-center gap-1"
                >
                  WhatsApp <span className="text-[10px]">↗</span>
                </a>
                <a
                  href="mailto:contact@pixelmutiny.com"
                  className="hover:text-[#0859D4] transition-colors duration-150"
                >
                  Email us
                </a>
              </div>
            </div>

            {/* COLUMN 4: START A PROJECT */}
            <div className="flex flex-col items-start md:col-span-2 lg:col-span-1 w-full">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9a9aa5] mb-3.5 block leading-none">
                Start a project
              </span>
              <div className="flex flex-col md:flex-row lg:flex-col gap-2 w-full">
                <button
                  type="button"
                  onClick={() => { playClick(); setIsInquiryOpen(true); }}
                  className="inline-flex items-center justify-center h-[40px] w-full md:w-auto lg:w-full max-w-[200px] px-4 rounded-full bg-[#1a1a1f] hover:bg-[#0859D4] text-white text-[13px] font-semibold transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  Let&apos;s Talk →
                </button>
                <button
                  type="button"
                  onClick={handleBackToTop}
                  className="inline-flex items-center justify-center gap-1.5 h-[40px] w-full md:w-auto lg:w-full max-w-[200px] px-4 rounded-full border border-[rgba(0,0,0,0.12)] bg-transparent hover:bg-[rgba(0,0,0,0.04)] text-[#1a1a1f] text-[13px] font-medium transition-all duration-150 active:scale-95 cursor-pointer"
                  aria-label="Back to top"
                >
                  Back to top <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Strip */}
          <div className="mt-8 pt-4 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#9a9aa5]">
            <span>© 2026 PixelMutiny DigiMedia</span>
            <span className="font-mono text-[11px] hidden sm:inline">Built in New Delhi · Shipped Worldwide</span>
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
