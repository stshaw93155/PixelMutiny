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

      {/* ONLINES STYLE MINIMALIST STUDIO FOOTER */}
      <footer className="w-full bg-[#FBFBFB] border-t border-dashed border-[rgba(18,18,19,0.12)] text-[#424242] py-8 sm:py-10 transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] leading-relaxed">
            {/* Left Colophon */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
              <Link href="/" className="inline-flex items-center gap-1.5 font-semibold text-[#1D1D1F] mr-1 hover:text-[#0859D4] transition-colors focus-visible:ring-2 focus-visible:ring-[#0859D4] rounded">
                <Image
                  src="/img/logo-main.png"
                  alt="PixelMutiny"
                  width={110}
                  height={28}
                  className="h-5 w-auto object-contain inline-block"
                />
              </Link>
              <span>2024–2026 All rights reserved. PixelMutiny DigiMedia LLP.</span>
              <span className="hidden sm:inline text-[#71717A]">|</span>
              <span className="text-[#5A5A5E]">New Delhi, India.</span>
            </div>

            {/* Right Links & Back to Top */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 text-[#424242]">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link href="/services" className="hover:text-[#0859D4] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#0859D4] rounded px-1">
                  Services
                </Link>
                <span className="text-[#71717A] opacity-60">,</span>
                <Link href="/works" className="hover:text-[#0859D4] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#0859D4] rounded px-1">
                  Work
                </Link>
                <span className="text-[#71717A] opacity-60">,</span>
                <Link href="/about" className="hover:text-[#0859D4] transition-colors font-medium focus-visible:ring-2 focus-visible:ring-[#0859D4] rounded px-1">
                  Agency
                </Link>
                <span className="text-[#71717A] opacity-60">,</span>
                <a
                  href="https://www.linkedin.com/in/gfxsumit/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors font-medium inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[#0859D4] rounded px-1"
                  title="Connect with Sumit on LinkedIn"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px]">↗</span>
                </a>
                <span className="text-[#71717A] opacity-60">,</span>
                <a
                  href="https://wa.me/919315580036?text=Hi%20Sumit%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20PixelMutiny"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#1BC47D] transition-colors font-medium inline-flex items-center gap-1 text-[#1BC47D] focus-visible:ring-2 focus-visible:ring-[#1BC47D] rounded px-1"
                  title="Chat with Sumit on WhatsApp"
                >
                  <span>WhatsApp</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>

              <span className="hidden sm:inline-block mx-3 text-[rgba(18,18,19,0.18)]">|</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setIsInquiryOpen(true);
                  }}
                  className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#1D1D1F] hover:bg-[#0859D4] text-white text-[12px] font-semibold transition-all duration-200 active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none cursor-pointer"
                >
                  Let&apos;s Talk
                </button>
                <button
                  type="button"
                  onClick={handleBackToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(18,18,19,0.14)] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] hover:text-[#0859D4] text-[12px] font-medium transition-all duration-200 active:scale-95 shadow-xs focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none cursor-pointer"
                  aria-label="Back to top"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
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
