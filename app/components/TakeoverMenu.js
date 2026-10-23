'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSound } from './SoundManager';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

const MENU_ITEMS = [
  {
    num: '(001)',
    title: 'WORKS',
    pill: '08 PROJECTS',
    desc: 'Selected Web, Landing Page & UI Case Studies',
    href: '/works',
    previewImg: '/projects/veloce-ai.jpg',
    previewTitle: 'VELOCE AI — ENTERPRISE UI',
    previewBadge: 'LIVE SHADER REEL',
  },
  {
    num: '(002)',
    title: 'SERVICES',
    pill: '08 DISCIPLINES',
    desc: 'Websites • Landing Pages • UI/UX • Dashboards • Ads',
    href: '/services',
    previewImg: '/projects/veyra-legal.png',
    previewTitle: 'FULL-SPECTRUM CONVERSION ARCHITECTURE',
    previewBadge: 'CAPABILITY MATRIX',
  },
  {
    num: '(003)',
    title: 'ABOUT STUDIO',
    pill: 'STUDIO',
    desc: 'Studio Manifesto, Process & 15+ Awards',
    href: '/about',
    previewImg: '/projects/avenor.png',
    previewTitle: 'THE PIXELMUTINY MANIFESTO & AWARDS LEDGER',
    previewBadge: 'AWWWARDS SOTD',
  },
  {
    num: '(004)',
    title: 'UI PLAYGROUND',
    pill: 'LABS ✦',
    desc: 'Interactive Components, 3D & Motion Lab',
    href: '/works',
    previewImg: '/projects/flow-task.jpg',
    previewTitle: 'EXPERIMENT LAB // REACT 19 + GSAP + SHADERS',
    previewBadge: 'INTERACTIVE SANDBOX',
  },
  {
    num: '(005)',
    title: "LET'S TALK",
    pill: 'AVAILABLE ⬏',
    desc: 'Interactive Project Configurator & Sprints',
    href: '/contact',
    previewImg: '/projects/krono-pay.jpg',
    previewTitle: 'PROJECT SPECIFICATION PROTOCOL [STAGE 01-04]',
    previewBadge: 'ACCEPTING Q4 CLIENTS',
  },
];

export default function TakeoverMenu({ isOpen, onClose }) {
  const [activeItem, setActiveItem] = useState(MENU_ITEMS[0]);
  const [copied, setCopied] = useState(false);
  const [clocks, setClocks] = useState({ nyc: '', lon: '', del: '' });
  const { playClick, playHover, playWhoosh } = useSound();

  useEffect(() => {
    if (isOpen) {
      playWhoosh();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const updateWorldClocks = () => {
      const now = new Date();
      const formatTime = (tz) =>
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);

      setClocks({
        nyc: formatTime('America/New_York'),
        lon: formatTime('Europe/London'),
        del: formatTime('Asia/Kolkata'),
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    updateWorldClocks();
    const interval = setInterval(updateWorldClocks, 1000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, playWhoosh]);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@pixelmutiny.com');
    setCopied(true);
    playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl text-[#1D1D1F] flex flex-col overflow-y-auto animate-fade-in select-none">
      {/* Top HUD Bar */}
      <div className="w-full px-6 md:px-12 py-5 border-b border-[rgba(18,18,19,0.08)] flex items-center justify-between font-mono text-xs text-[#424242] bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={onClose} className="flex items-center group">
            <Image
              src="/img/logo-main.png"
              alt="PixelMutiny DigiMedia"
              width={150}
              height={44}
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="hidden md:inline px-2.5 py-1 rounded bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#1D1D1F]">
            ● [MENU // PIXELMUTINY]
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[#5A5A5E] text-[11px]">
          <span>NEW DELHI STUDIO</span>
          <span>{'//'}</span>
          <span>IST (UTC+5:30)</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-[#5A5A5E] text-[11px]">
            ESC TO DISMISS
          </span>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full bg-[#1D1D1F] text-white hover:bg-[#0859D4] font-mono font-semibold text-xs transition-all shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none cursor-pointer"
            data-cursor="CLOSE"
          >
            <span>CLOSE ✕</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 max-w-[1920px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
        {/* Left 7 Columns: Giant Navigation Items with Light Background */}
        <div className="lg:col-span-7 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[rgba(18,18,19,0.08)] bg-[#F5F5F7]">
          {MENU_ITEMS.map((item) => {
            const isActive = activeItem.title === item.title;
            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => {
                  playClick();
                  onClose();
                }}
                onMouseEnter={() => {
                  setActiveItem(item);
                  playHover();
                }}
                className={`group relative px-6 md:px-12 py-7 md:py-9 border-b border-[rgba(18,18,19,0.08)] flex flex-col transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none ${
                  isActive ? 'bg-[#FFFFFF] shadow-sm' : 'hover:bg-white/80'
                }`}
                data-cursor="NAVIGATE"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs md:text-sm text-[#5A5A5E] group-hover:text-[#0859D4] transition-colors font-medium">
                      {item.num}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D1D1F] group-hover:text-[#0859D4] group-hover:translate-x-2 transition-all duration-300 flex items-center gap-3">
                      <span>{item.title}</span>
                      {isActive && (
                        <span className="text-[#0859D4] text-2xl md:text-3xl">⤷</span>
                      )}
                    </h2>
                  </div>

                  <span className={`font-mono text-[11px] px-3 py-1 rounded-full border transition-all ${
                    isActive
                      ? 'border-[#0859D4] bg-[#0859D4] text-white font-semibold'
                      : 'border-[rgba(18,18,19,0.12)] bg-white text-[#424242]'
                  }`}>
                    {item.pill}
                  </span>
                </div>

                <p className="font-mono text-xs text-[#5A5A5E] pl-8 md:pl-12">
                  {item.desc}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Right 5 Columns: Dynamic Live Preview Reel & Telemetry */}
        <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-between bg-white">
          {/* Top Half: Live Hover Reel */}
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-[#4A4A54] mb-3">
              <span className="font-bold flex items-center gap-1.5 text-black">
                <span>*</span>
                <span className="uppercase">[PREVIEW // {activeItem.previewTitle}]</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-[#EDECE8] border border-[var(--hairline)] text-black font-semibold">
                {activeItem.previewBadge}
              </span>
            </div>

            {/* Preview Frame with Monitor */}
            <div
              className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[var(--hairline)] bg-[#0A0A0E] shadow-2xl group"
              style={{ backgroundColor: '#0A0A0E' }}
            >
              <div className="absolute top-2 left-2 z-10 text-white/40 text-[10px] font-mono">+</div>
              <div className="absolute top-2 right-2 z-10 text-white/40 text-[10px] font-mono">+</div>
              <div className="absolute bottom-2 left-2 z-10 text-white/40 text-[10px] font-mono">+</div>
              <div className="absolute bottom-2 right-2 z-10 text-white/40 text-[10px] font-mono">+</div>

              <Image
                src={activeItem.previewImg}
                alt={activeItem.title}
                fill
                sizes="(max-width: 1200px) 100vw, 50vw"
                className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-xs text-white bg-black/70 px-3 py-1.5 rounded-full border border-white/20">
                  ● VELOCE ENTERPRISE // Q1 CASE STUDY // 2026
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Half: Direct Contact, World Clocks, and Socials */}
          <div className="mt-8 pt-8 border-t border-[var(--hairline)] space-y-6">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)] mb-2">
                <span>NEW BUSINESS &amp; RFPS</span>
                <span className="px-2 py-0.5 rounded bg-[#EDECE8] border border-[var(--hairline)] text-black font-bold">
                  EST. REPLY &lt; 4H
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <a
                  href="mailto:hello@pixelmutiny.com"
                  className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0A0A0C] hover:opacity-75 transition-opacity"
                >
                  hello@pixelmutiny.com
                </a>
                <button
                  onClick={copyEmail}
                  className="btn-pill btn-pill-muted text-xs py-1.5 px-3"
                  data-cursor="COPY"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>[COPY EMAIL]</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* World Clocks */}
            <div className="grid grid-cols-3 gap-3 font-mono text-[11px] py-4 border-y border-[var(--hairline)]">
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">NYC [HQ]</span>
                <span className="text-[#0A0A0C] font-bold">{clocks.nyc || '10:42 AM'} EST</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">LON [LAB]</span>
                <span className="text-[#0A0A0C] font-bold">{clocks.lon || '03:42 PM'} GMT</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block text-[10px]">DEL [DEV]</span>
                <span className="text-[#0A0A0C] font-bold">{clocks.del || '09:12 PM'} IST</span>
              </div>
            </div>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gfxsumit/' },
                { label: 'WHATSAPP', href: 'https://wa.me/919315580036?text=Hi%20Sumit%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20PixelMutiny' },
                { label: 'INSTAGRAM', href: 'https://instagram.com' },
                { label: 'DRIBBBLE', href: 'https://dribbble.com' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full border border-[var(--hairline)] bg-[#EDECE8] hover:bg-[#0A0A0C] hover:text-white transition-all flex items-center gap-1 font-medium"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] pt-2">
              <span>FRAMEWORK: XP_CORE_V4</span>
              <span>© 2026 PIXELMUTINY DIGIMEDIA LLP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
