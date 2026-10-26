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

      {/* FOOTER — Deep Ink Contrast */}
      <footer className="w-full bg-[#0A0F1F] border-t border-white/10 text-white">
        <div className="w-full px-6 sm:px-10 lg:px-16 pt-12 pb-8">

          {/* Main row: logo+button | spacer | 4 nav columns */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0">

            {/* LEFT: Logo + CTA button */}
            <div className="flex flex-col items-start gap-6 flex-shrink-0">
              <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/img/PixelMutiny reverse.png"
                  alt="PixelMutiny"
                  width={140}
                  height={32}
                  className="h-[28px] w-auto object-contain block"
                  priority={false}
                />
              </Link>

              {/* Split Pill CTA Button */}
              <button
                type="button"
                onClick={() => { playClick(); setIsInquiryOpen(true); }}
                className="group inline-flex items-center rounded-sm overflow-hidden cursor-pointer transition-all active:scale-95"
                style={{ backgroundColor: '#1F3FFF' }}
              >
                <span className="px-5 py-3 text-[13px] font-bold tracking-wide uppercase text-white">
                  Get in Touch
                </span>
                <span
                  className="px-3.5 py-3 flex items-center justify-center"
                  style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </div>

            {/* CENTER: Flex spacer */}
            <div className="hidden lg:block flex-1" />

            {/* RIGHT: 4 Nav columns, no dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 flex-shrink-0" style={{ columnGap: '56px', rowGap: '40px' }}>

              {/* Disciplines */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">
                  Disciplines
                </span>
                <Link href="/services" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Web Systems</Link>
                <Link href="/services" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Landing Pages</Link>
                <Link href="/services" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">UI/UX Systems</Link>
                <Link href="/services" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Web Apps</Link>
                <Link href="/services" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Brand Identity</Link>
              </div>

              {/* Portfolio */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">
                  Portfolio
                </span>
                <Link href="/works" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Case Studies</Link>
                <Link href="/works/avenor" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Avenor Design</Link>
                <Link href="/works/veyra-legal" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Veyra Legal</Link>
                <Link href="/works/flow-task" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">FlowTask App</Link>
                <Link href="/works" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Motion Reel</Link>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">
                  Company
                </span>
                <Link href="/about" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">About Us</Link>
                <Link href="/about" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Manifesto</Link>
                <Link href="/about" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Studio Awards</Link>
                <Link href="/contact" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Contact Us</Link>
                <Link href="/about" className="text-[13px] text-[#8E95A5] hover:text-[#1F3FFF] transition-colors">Press & News</Link>
              </div>

              {/* Connect */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white mb-1">
                  Connect
                </span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#8E95A5] hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Image
                    src="/img/social/x.png"
                    alt="X"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] rounded-[4px] object-contain flex-shrink-0"
                  />
                  <span>X (Twitter)</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#E4405F' }}
                  className="text-[13px] hover:opacity-80 transition-opacity font-medium inline-flex items-center gap-2"
                >
                  <Image
                    src="/img/social/instagram.png"
                    alt="Instagram"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] rounded-[4px] object-contain flex-shrink-0"
                  />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://wa.me/919315580036"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#12B76A' }}
                  className="text-[13px] hover:opacity-80 transition-opacity font-medium inline-flex items-center gap-2"
                >
                  <Image
                    src="/img/social/whatsapp.png"
                    alt="WhatsApp"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] rounded-full object-contain flex-shrink-0"
                  />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gfxsumit/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#38BDF8' }}
                  className="text-[13px] hover:opacity-80 transition-opacity font-medium inline-flex items-center gap-2"
                >
                  <Image
                    src="/img/social/linkedin.png"
                    alt="LinkedIn"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] rounded-[4px] object-contain flex-shrink-0"
                  />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <div className="flex items-center gap-5">
              <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Terms of Use</Link>
              <button
                type="button"
                onClick={handleBackToTop}
                className="hover:text-[#1F3FFF] transition-colors inline-flex items-center gap-1 cursor-pointer"
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
