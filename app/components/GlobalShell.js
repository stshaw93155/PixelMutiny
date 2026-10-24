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

      {/* VISIONOS INSPIRED EDITORIAL FOOTER */}
      <footer className="w-full bg-[#FAFAFC] border-t border-[rgba(0,0,0,0.08)] text-[#1a1a1f]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Left Brand & Headline Block (Columns 1-5) */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
              <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity mb-8">
                <Image
                  src="/img/logo-main.png"
                  alt="PixelMutiny"
                  width={140}
                  height={32}
                  className="h-[28px] w-auto object-contain block"
                  priority={false}
                />
              </Link>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#111827] tracking-tight leading-[1.2] mb-8 max-w-[380px]">
                The Architect Of Modern Digital Growth.
              </h2>

              {/* VisionOS-style Split Pill CTA Button */}
              <button
                type="button"
                onClick={() => { playClick(); setIsInquiryOpen(true); }}
                className="group inline-flex items-center rounded-sm bg-[#0859D4] hover:bg-[#0747A6] text-white transition-all shadow-md active:scale-98 overflow-hidden cursor-pointer"
                style={{ backgroundColor: '#0859D4', color: '#FFFFFF' }}
              >
                <span className="px-5 py-3 text-[13px] font-bold tracking-wide uppercase text-white">
                  Get in Touch
                </span>
                <span className="px-3.5 py-3 border-l border-white/20 bg-white/10 group-hover:bg-white/20 flex items-center justify-center text-white">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </div>

            {/* Right 4 Link Columns with Subtle Vertical Dividers (Columns 6-12) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(0,0,0,0.08)] text-left">
              
              {/* Column 1: Disciplines */}
              <div className="flex flex-col items-start pr-4 sm:pr-6 pb-6 sm:pb-0">
                <span className="text-[12px] font-bold text-[#111827] mb-4 block">
                  Disciplines
                </span>
                <div className="flex flex-col gap-2.5 text-[13px] text-[#4B5563]">
                  <Link href="/services" className="hover:text-[#0859D4] transition-colors">Web Systems</Link>
                  <Link href="/services" className="hover:text-[#0859D4] transition-colors">Landing Pages</Link>
                  <Link href="/services" className="hover:text-[#0859D4] transition-colors">UI/UX Systems</Link>
                  <Link href="/services" className="hover:text-[#0859D4] transition-colors">Web Apps</Link>
                  <Link href="/services" className="hover:text-[#0859D4] transition-colors">Brand Identity</Link>
                </div>
              </div>

              {/* Column 2: Works */}
              <div className="flex flex-col items-start px-0 sm:px-6 py-6 sm:py-0">
                <span className="text-[12px] font-bold text-[#111827] mb-4 block">
                  Portfolio
                </span>
                <div className="flex flex-col gap-2.5 text-[13px] text-[#4B5563]">
                  <Link href="/works" className="hover:text-[#0859D4] transition-colors">Case Studies</Link>
                  <Link href="/works/avenor" className="hover:text-[#0859D4] transition-colors">Avenor Design</Link>
                  <Link href="/works/veyra-legal" className="hover:text-[#0859D4] transition-colors">Veyra Legal</Link>
                  <Link href="/works/flow-task" className="hover:text-[#0859D4] transition-colors">FlowTask App</Link>
                  <Link href="/works" className="hover:text-[#0859D4] transition-colors">Motion Reel</Link>
                </div>
              </div>

              {/* Column 3: Company */}
              <div className="flex flex-col items-start px-0 sm:px-6 py-6 sm:py-0">
                <span className="text-[12px] font-bold text-[#111827] mb-4 block">
                  Company
                </span>
                <div className="flex flex-col gap-2.5 text-[13px] text-[#4B5563]">
                  <Link href="/about" className="hover:text-[#0859D4] transition-colors">About Us</Link>
                  <Link href="/about" className="hover:text-[#0859D4] transition-colors">Manifesto</Link>
                  <Link href="/about" className="hover:text-[#0859D4] transition-colors">Studio Awards</Link>
                  <Link href="/contact" className="hover:text-[#0859D4] transition-colors">Contact Us</Link>
                  <Link href="/about" className="hover:text-[#0859D4] transition-colors">Press & News</Link>
                </div>
              </div>

              {/* Column 4: Connect */}
              <div className="flex flex-col items-start pl-0 sm:pl-6 pt-6 sm:pt-0">
                <span className="text-[12px] font-bold text-[#111827] mb-4 block">
                  Connect
                </span>
                <div className="flex flex-col gap-2.5 text-[13px] text-[#4B5563]">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#0859D4] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>𝕏</span> <span>X.com</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#0859D4] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>📸</span> <span>Instagram</span>
                  </a>
                  <a
                    href="https://wa.me/919315580036?text=Hi%20Sumit%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20PixelMutiny"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#10B981] hover:opacity-85 transition-opacity inline-flex items-center gap-1.5 font-medium"
                  >
                    <span>💬</span> <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gfxsumit/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#0859D4] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>💼</span> <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Legal & Copyright Strip */}
          <div className="mt-14 pt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-6">
              <Link href="/contact" className="hover:text-[#4B5563] transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-[#4B5563] transition-colors">Terms of Use</Link>
              <button
                type="button"
                onClick={handleBackToTop}
                className="hover:text-[#0859D4] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                Back to top ↑
              </button>
            </div>
            <span>© 2026 PixelMutiny DigiMedia LLP. All rights reserved.</span>
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
