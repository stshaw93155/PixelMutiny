'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSound } from './SoundManager';
import { useReducedMotion } from '@/lib/motion';
import { Volume2, VolumeX, Menu } from 'lucide-react';

export default function HeaderHUD({ onOpenMenu, onOpenInquiry }) {
  const [currentIstTime, setCurrentIstTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { soundEnabled, toggleSound, playClick } = useSound();
  const reducedMotion = useReducedMotion();

  const isWorkActive = pathname === '/works' || pathname === '/work' || pathname?.startsWith('/works/');
  const isServicesActive = pathname === '/services';
  const isAgencyActive = pathname === '/about' || pathname === '/agency';
  const isContactActive = pathname === '/contact';

  // Live IST Clock (Delhi, India)
  useEffect(() => {
    const updateClock = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setCurrentIstTime(timeStr);
      } catch {
        setCurrentIstTime('12:00:00');
      }
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sticky header motion: hide on scroll down, show on scroll up
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 30);

      if (currentY > 100) {
        if (currentY > lastScrollY.current && currentY - lastScrollY.current > 8) {
          setIsVisible(false);
        } else if (lastScrollY.current - currentY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  const navLinks = [
    { label: 'Services', href: '/services', active: isServicesActive },
    { label: 'Work', href: '/works', active: isWorkActive },
    { label: 'Agency', href: '/about', active: isAgencyActive },
    { label: 'Contact', href: '/contact', active: isContactActive },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] header-hud-blur ${
        isScrolled ? 'is-scrolled' : ''
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Onlines Minimal Header Bar */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 h-16 flex items-center justify-between">
        {/* Left: Onlines Brand Logo & Mark */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={playClick}
            aria-label="PixelMutiny DigiMedia LLP"
          >
            {/* Dot-and-bar glyph like onlines.com.ar */}
            <span className="inline-flex items-center gap-1 text-[#1D1D1F] transition-transform duration-300 group-hover:scale-110">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D1D1F] inline-block"></span>
              <span className="w-5 h-1.5 bg-[#1D1D1F] inline-block"></span>
            </span>
            <Image
              src="/img/logo-main.png"
              alt="PixelMutiny DigiMedia"
              width={140}
              height={36}
              priority
              className="h-6 sm:h-7 w-auto object-contain ml-1"
            />
          </Link>

          {/* Micro status chip (Onlines justo ahora style) */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-[rgba(18,18,19,0.1)] text-[12px] text-[#6B7280]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0859D4] animate-pulse"></span>
            <span>PixelMutiny right now:</span>
            <span className="text-[#1D1D1F] font-semibold">Accepting Q4 projects</span>
          </div>
        </div>

        {/* Center: Clean Onlines Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#424242]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={playClick}
              className={`transition-colors relative py-1 hover:text-[#0859D4] ${
                link.active ? 'text-[#0859D4] font-semibold' : 'text-[#424242]'
              }`}
            >
              {link.label}
              {link.active && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#0859D4] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Audio, Onlines Pill CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playClick();
            }}
            className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-[rgba(18,18,19,0.12)] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#0859D4]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#5A5A5E]" />
            )}
          </button>

          {/* Onlines Signature Black Pill CTA Button ("Hablemos" / "Let's Talk") */}
          <button
            onClick={() => {
              playClick();
              if (onOpenInquiry) onOpenInquiry();
            }}
            className="bg-[#1D1D1F] hover:bg-[#0859D4] text-white text-[13px] font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none cursor-pointer"
          >
            Let&apos;s Talk
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              playClick();
              if (onOpenMenu) onOpenMenu();
            }}
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full border border-[rgba(18,18,19,0.12)] bg-[#F5F5F7] hover:bg-white text-[#1D1D1F] transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4 text-[#1D1D1F]" />
          </button>
        </div>
      </div>
    </header>
  );
}
