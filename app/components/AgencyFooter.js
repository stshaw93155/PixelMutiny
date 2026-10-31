'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowUp,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Clock,
  Globe,
  Radio,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useSound } from './SoundManager';

// Active Hubs for the Interactive Dotted World Map
const GLOBAL_HUBS = [
  {
    id: 'delhi',
    name: 'New Delhi (HQ)',
    country: 'India',
    x: 68.5, // SVG percentage coordinate
    y: 43.5,
    isHQ: true,
    timezone: 'Asia/Kolkata',
    status: 'Primary Studio & Lab',
    latency: '4ms',
  },
  {
    id: 'sf',
    name: 'San Francisco',
    country: 'United States',
    x: 17.5,
    y: 35.0,
    isHQ: false,
    timezone: 'America/Los_Angeles',
    status: 'Client Accounts & Sprints',
    latency: '68ms',
  },
  {
    id: 'nyc',
    name: 'New York',
    country: 'United States',
    x: 27.5,
    y: 33.5,
    isHQ: false,
    timezone: 'America/New_York',
    status: 'Brand & Growth Operations',
    latency: '52ms',
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    x: 48.0,
    y: 28.0,
    isHQ: false,
    timezone: 'Europe/London',
    status: 'European Deployments',
    latency: '41ms',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    x: 60.5,
    y: 40.5,
    isHQ: false,
    timezone: 'Asia/Dubai',
    status: 'Fintech & Architecture Hub',
    latency: '26ms',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    x: 77.5,
    y: 56.5,
    isHQ: false,
    timezone: 'Asia/Singapore',
    status: 'APAC Regional Operations',
    latency: '34ms',
  },
];

// Marquee / Ticker categories
const TICKER_DATA = {
  disciplines: [
    'Next.js 16 App Router Systems',
    'Sub-16ms Interactive WebGL',
    'High-Converting Landing Pages',
    'Design Systems & Figma Tokens',
    'Multi-Source CRM Automation',
    'Kinetic Motion & Micro-interactions',
    'Custom Middleware & Webhooks',
    'Headless E-Commerce Architecture',
    'Lighthouse 100 Performance Optimization',
    'Algolia Vector & Hybrid Search',
  ],
  sectors: [
    'Fintech & Digital Banking',
    'AI & Deep Tech Platforms',
    'Luxury Architecture & Real Estate',
    'Legal Intelligence & Analytics',
    'Supply Chain & Fleet Logistics',
    'Enterprise B2B SaaS',
    'Biotech & Health Systems',
    'Direct-to-Consumer Brands',
    'Creative Production Studios',
  ],
};

export default function AgencyFooter({ onOpenInquiry }) {
  const { playClick, playHover } = useSound();
  const [activeTab, setActiveTab] = useState('disciplines');
  const [hoveredHub, setHoveredHub] = useState(null);
  const [istTime, setIstTime] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const magneticBtnRef = useRef(null);

  // Live IST Clock
  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        };
        const formatter = new Intl.DateTimeFormat('en-IN', options);
        setIstTime(formatter.format(now));
      } catch {
        setIstTime('New Delhi (IST)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Back to Top Smooth Scroll
  const handleBackToTop = () => {
    playClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subtle magnetic pull for the back to top button
  const handleMouseMove = (e) => {
    if (!magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;
    setMousePos({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <footer className="w-full bg-[#0A0F1F] text-white border-t border-white/10 relative overflow-hidden select-none">
      {/* Subtle Background Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* =========================================================================
          SECTION 1 — TOP ROW: SOCIALS | COMPANY DIRECTORY | SECURE COMMERCE
          ========================================================================= */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12 border-b border-white/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Col 1: Socials & Direct Links (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block mb-3">
                01 // SOCIALS &amp; CHANNELS
              </span>
              <p className="text-xs text-[#8E95A5] leading-relaxed mb-5 max-w-xs">
                Direct founder channels, open-source repositories, and real-time project dispatches.
              </p>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {[
                { name: 'X', label: '𝕏', href: 'https://twitter.com', title: 'X (Twitter)' },
                { name: 'IN', label: 'in', href: 'https://www.linkedin.com/in/gfxsumit/', title: 'LinkedIn' },
                { name: 'IG', label: 'ig', href: 'https://instagram.com', title: 'Instagram' },
                { name: 'WA', label: 'wa', href: 'https://wa.me/919315580036', title: 'WhatsApp Direct' },
                { name: 'GH', label: 'gh', href: 'https://github.com/stshaw93155', title: 'GitHub' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  title={soc.title}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-[#0A0F1F] hover:border-white transition-all duration-200 flex items-center justify-center text-xs font-mono font-extrabold cursor-pointer group shadow-sm hover:scale-105 active:scale-95"
                  aria-label={soc.title}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {soc.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Quick Consultation CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  playClick?.();
                  onOpenInquiry?.();
                }}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F3FFF] hover:bg-[#1834D9] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Initiate Project Brief</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Col 2: Multi-Column Directory (lg: 6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Disciplines */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block mb-2">
                DISCIPLINES
              </span>
              <ul className="space-y-2.5 text-[13px]">
                <li>
                  <Link href="/services" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Website Systems
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Landing Pages
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    UI/UX &amp; Figma Systems
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Business Automation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Brand Identity &amp; Motion
                  </Link>
                </li>
              </ul>
            </div>

            {/* Portfolio */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block mb-2">
                CASE STUDIES
              </span>
              <ul className="space-y-2.5 text-[13px]">
                <li>
                  <Link href="/works" className="text-white/80 hover:text-[#1F3FFF] transition-colors block font-semibold">
                    Works Archive (08)
                  </Link>
                </li>
                <li>
                  <Link href="/works/avenor" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Avenor Logistics
                  </Link>
                </li>
                <li>
                  <Link href="/works/flow-task" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    FlowTask Systems
                  </Link>
                </li>
                <li>
                  <Link href="/works/veyra-legal" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Veyra Legal AI
                  </Link>
                </li>
                <li>
                  <Link href="/works/morrow-house" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Morrow House
                  </Link>
                </li>
              </ul>
            </div>

            {/* Studio / Agency */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block mb-2">
                AGENCY
              </span>
              <ul className="space-y-2.5 text-[13px]">
                <li>
                  <Link href="/about" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Overview &amp; Story
                  </Link>
                </li>
                <li>
                  <Link href="/about#manifesto" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Studio Manifesto
                  </Link>
                </li>
                <li>
                  <Link href="/about#ledger" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Benchmark Ledger
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-white/80 hover:text-[#1F3FFF] transition-colors block">
                    Pricing Catalogue
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-[#1F3FFF] transition-colors block font-semibold text-[#1F3FFF]">
                    Start Discovery →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Secure Payments & Compliance (lg: 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block">
              03 // COMMERCE &amp; COMPLIANCE
            </span>
            <p className="text-xs text-[#8E95A5] leading-relaxed">
              Enterprise transactions processed via PCI-DSS Level 1 compliant gateways. 256-bit encryption. Zero financial credentials stored on studio servers.
            </p>

            {/* Payment Method Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY', 'UPI', 'WIRE / SWIFT'].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-wider text-white/80"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 text-[11px] text-[#8E95A5]">
              <ShieldCheck className="w-4 h-4 text-[#1F3FFF] flex-shrink-0" />
              <span>GST Registered Private Limited Company. Tax invoices issued with input tax credit.</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2 — INTERACTIVE MARQUEE & TAB SWITCHER (INDUSTRIES / SERVICES)
          ========================================================================= */}
      <div className="w-full border-b border-white/10 py-6 bg-black/20">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Switcher Pills */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 w-fit">
            <button
              type="button"
              onClick={() => {
                playClick?.();
                setActiveTab('disciplines');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'disciplines'
                  ? 'bg-white text-[#0A0F1F] shadow-sm'
                  : 'text-[#8E95A5] hover:text-white'
              }`}
            >
              Core Disciplines
            </button>
            <button
              type="button"
              onClick={() => {
                playClick?.();
                setActiveTab('sectors');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sectors'
                  ? 'bg-white text-[#0A0F1F] shadow-sm'
                  : 'text-[#8E95A5] hover:text-white'
              }`}
            >
              Sector Verticals
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#8E95A5] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF] animate-pulse" />
            <span>Interactive Catalog · Hover to Inspect</span>
          </span>
        </div>

        {/* Dynamic Continuous Horizontal Ribbon */}
        <div className="overflow-hidden whitespace-nowrap relative flex items-center">
          <div className="marquee-track gap-8 items-center py-2 text-sm font-display font-medium text-white/50 hover:text-white transition-colors cursor-default">
            {TICKER_DATA[activeTab].concat(TICKER_DATA[activeTab]).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-8">
                <span className="hover:text-white hover:underline underline-offset-4 decoration-[#1F3FFF] transition-all">
                  {item}
                </span>
                <span className="text-[#1F3FFF] font-mono text-xs">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3 — STUDIO OPERATIONS & DOTTED WORLD MAP
          ========================================================================= */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-14 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* 1. Camera HUD Feature Thumbnail (lg: 3 cols) */}
          <div className="lg:col-span-3">
            <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 aspect-[4/3] flex flex-col justify-between p-3.5 shadow-xl">
              {/* Image Underlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/projects/morrow-house.jpg"
                  alt="PixelMutiny Studio Architecture"
                  fill
                  className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-[#0A0F1F]/40 to-transparent" />
              </div>

              {/* Top HUD Bar */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/80">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>PM-HQ // LIVE</span>
                </span>
                <span>28.6139° N, 77.2090° E</span>
              </div>

              {/* Bottom HUD Bar */}
              <div className="relative z-10 pt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E95A5] block">
                  CRAFT SPECIFICATION
                </span>
                <p className="text-xs font-bold text-white tracking-wide">
                  Engineered in New Delhi · Operating Globally
                </p>
              </div>

              {/* Reticle corners */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40 pointer-events-none">[+]</div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-white/40 pointer-events-none">[+]</div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/40 pointer-events-none">[+]</div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/40 pointer-events-none">[+]</div>
            </div>
          </div>

          {/* 2. Structured Operational Metadata (lg: 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-6 text-xs">
            {/* Headquarters */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block">
                HEAD OFFICE
              </span>
              <p className="text-white/90 leading-relaxed font-medium">
                PixelMutiny DigiMedia Pvt. Ltd.
                <br />
                Connaught Place / Barakhamba Rd,
                <br />
                New Delhi, NCR 110001, India.
              </p>
              <a
                href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#1F3FFF] hover:underline font-bold mt-1"
              >
                <span>Direction on Google Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Email Channels */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block">
                DIRECT INTAKE
              </span>
              <p className="text-white/90 leading-relaxed font-mono">
                <a href="mailto:hello@pixelmutiny.com" className="hover:text-[#1F3FFF] transition-colors block">
                  hello@pixelmutiny.com
                </a>
              </p>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block pt-2">
                HOTLINE / WHATSAPP
              </span>
              <p className="text-white/90 font-mono font-bold">
                <a href="https://wa.me/919315580036" target="_blank" rel="noreferrer" className="hover:text-[#1F3FFF]">
                  +91 93155 80036
                </a>
              </p>
            </div>

            {/* Global Territories */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block">
                OPERATING TERRITORIES
              </span>
              <p className="text-white/90 leading-relaxed font-medium">
                India (HQ) / United States / United Kingdom / UAE / Singapore
              </p>
            </div>

            {/* Office Hours & Live IST Clock */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8E95A5] block">
                LIVE STUDIO TIME (IST)
              </span>
              <p className="text-white font-mono font-bold text-sm text-[#FFE14D]">
                {isClient && istTime ? istTime : 'Loading IST...'}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-white/70 pt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Async &amp; Discovery Queue Active</span>
              </div>
            </div>
          </div>

          {/* 3. Interactive Dotted World Map (lg: 4 cols) */}
          <div className="lg:col-span-4 relative flex flex-col items-center">
            <div className="w-full relative aspect-[1.9/1] max-w-[460px] mx-auto border border-white/10 rounded-2xl p-3 bg-black/30">
              {/* SVG Dot Matrix Map Base */}
              <svg
                viewBox="0 0 100 60"
                className="w-full h-full opacity-60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* World Continental Outline (Abstract Dot Array) */}
                <g fill="currentColor" className="text-white/20">
                  {/* North America */}
                  <circle cx="15" cy="22" r="0.8" /><circle cx="18" cy="20" r="0.8" /><circle cx="22" cy="18" r="0.8" />
                  <circle cx="26" cy="18" r="0.8" /><circle cx="30" cy="20" r="0.8" /><circle cx="16" cy="26" r="0.8" />
                  <circle cx="20" cy="24" r="0.8" /><circle cx="24" cy="22" r="0.8" /><circle cx="28" cy="24" r="0.8" />
                  <circle cx="18" cy="30" r="0.8" /><circle cx="22" cy="28" r="0.8" /><circle cx="26" cy="30" r="0.8" />
                  <circle cx="20" cy="34" r="0.8" /><circle cx="24" cy="36" r="0.8" /><circle cx="28" cy="34" r="0.8" />
                  
                  {/* South America */}
                  <circle cx="30" cy="42" r="0.8" /><circle cx="32" cy="45" r="0.8" /><circle cx="34" cy="48" r="0.8" />
                  <circle cx="32" cy="52" r="0.8" /><circle cx="30" cy="55" r="0.8" />

                  {/* Europe */}
                  <circle cx="48" cy="20" r="0.8" /><circle cx="52" cy="18" r="0.8" /><circle cx="55" cy="20" r="0.8" />
                  <circle cx="47" cy="25" r="0.8" /><circle cx="50" cy="24" r="0.8" /><circle cx="54" cy="25" r="0.8" />
                  <circle cx="48" cy="29" r="0.8" /><circle cx="52" cy="28" r="0.8" />

                  {/* Africa */}
                  <circle cx="48" cy="34" r="0.8" /><circle cx="52" cy="33" r="0.8" /><circle cx="56" cy="35" r="0.8" />
                  <circle cx="50" cy="38" r="0.8" /><circle cx="54" cy="39" r="0.8" /><circle cx="52" cy="44" r="0.8" />
                  <circle cx="54" cy="48" r="0.8" /><circle cx="53" cy="52" r="0.8" />

                  {/* Asia & India */}
                  <circle cx="62" cy="20" r="0.8" /><circle cx="66" cy="18" r="0.8" /><circle cx="70" cy="20" r="0.8" />
                  <circle cx="75" cy="22" r="0.8" /><circle cx="80" cy="24" r="0.8" /><circle cx="63" cy="26" r="0.8" />
                  <circle cx="67" cy="25" r="0.8" /><circle cx="71" cy="26" r="0.8" /><circle cx="76" cy="27" r="0.8" />
                  <circle cx="82" cy="28" r="0.8" /><circle cx="61" cy="32" r="0.8" /><circle cx="65" cy="31" r="0.8" />
                  <circle cx="69" cy="33" r="0.8" /><circle cx="73" cy="32" r="0.8" /><circle cx="78" cy="34" r="0.8" />
                  <circle cx="84" cy="33" r="0.8" /><circle cx="64" cy="38" r="0.8" /><circle cx="68" cy="37" r="0.8" />
                  <circle cx="72" cy="39" r="0.8" /><circle cx="76" cy="40" r="0.8" /><circle cx="82" cy="40" r="0.8" />
                  {/* India Subcontinent */}
                  <circle cx="68" cy="42" r="0.9" /><circle cx="69" cy="44" r="0.9" /><circle cx="68" cy="46" r="0.9" />

                  {/* Australia */}
                  <circle cx="84" cy="48" r="0.8" /><circle cx="88" cy="47" r="0.8" /><circle cx="86" cy="52" r="0.8" />
                  <circle cx="90" cy="51" r="0.8" />
                </g>

                {/* Connection Flight Paths */}
                <path
                  d="M 68.5 43.5 Q 45 25 17.5 35.0"
                  stroke="rgba(31,63,255,0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  fill="none"
                />
                <path
                  d="M 68.5 43.5 Q 58 30 48.0 28.0"
                  stroke="rgba(31,63,255,0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  fill="none"
                />
                <path
                  d="M 68.5 43.5 Q 64 38 60.5 40.5"
                  stroke="rgba(31,63,255,0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  fill="none"
                />
                <path
                  d="M 68.5 43.5 Q 73 50 77.5 56.5"
                  stroke="rgba(31,63,255,0.3)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  fill="none"
                />
              </svg>

              {/* Interactive Pulsing Hub Nodes */}
              {GLOBAL_HUBS.map((hub) => {
                const isSelected = hoveredHub?.id === hub.id;
                return (
                  <div
                    key={hub.id}
                    onMouseEnter={() => {
                      playHover?.();
                      setHoveredHub(hub);
                    }}
                    onMouseLeave={() => setHoveredHub(null)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1.5 group z-20"
                  >
                    {/* Concentric Pulse Rings */}
                    <span
                      className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                        hub.isHQ ? 'bg-[#1F3FFF]' : 'bg-[#38bdf8]'
                      }`}
                    />
                    <span
                      className={`relative block rounded-full border border-black shadow-lg transition-transform group-hover:scale-150 ${
                        hub.isHQ
                          ? 'w-2.5 h-2.5 bg-[#1F3FFF] ring-2 ring-white/80'
                          : 'w-2 h-2 bg-[#38bdf8]'
                      }`}
                    />
                  </div>
                );
              })}

              {/* Dynamic Hub Tooltip */}
              {hoveredHub && (
                <div
                  style={{
                    left: `${Math.min(Math.max(hoveredHub.x, 20), 80)}%`,
                    top: `${hoveredHub.y > 45 ? hoveredHub.y - 18 : hoveredHub.y + 12}%`,
                  }}
                  className="absolute -translate-x-1/2 z-30 pointer-events-none p-2 rounded-lg bg-[#0E1222] border border-white/20 shadow-2xl text-[10px] font-mono text-white whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
                >
                  <p className="font-bold flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                    <span>{hoveredHub.name}</span>
                  </p>
                  <p className="text-white/60 text-[9px] mt-0.5">
                    {hoveredHub.status} · Ping: {hoveredHub.latency}
                  </p>
                </div>
              )}
            </div>

            <span className="text-[10px] font-mono text-[#8E95A5] mt-2 text-center block">
              Direct Hub Coordinates · 5 Global Delivery Nodes
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4 — LEGAL & REGULATORY BOTTOM STRIP
          ========================================================================= */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/50 border-b border-white/10">
        <div>
          <span>© 2026 PIXELMUTINY DIGIMEDIA PRIVATE LIMITED. CRAFTED BY PIXELMUTINY.</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            PRIVACY POLICY
          </Link>
          <Link href="/terms-of-use" className="hover:text-white transition-colors">
            TERMS OF USE
          </Link>
          <Link href="/sitemap.xml" className="hover:text-white transition-colors">
            SITEMAP
          </Link>
          <span className="text-white/30">|</span>
          <span className="text-white/60">GST: 07AABCP0000A1Z5</span>
          <span className="text-white/30">|</span>
          <span>ALL PRICES IN INR / USD. TAX EXCLUSIVE.</span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5 — MASSIVE HALFTONE DOT-MATRIX BRAND TYPOGRAPHY & MAGNETIC TOP
          ========================================================================= */}
      <div
        className="w-full relative px-4 sm:px-8 py-10 sm:py-16 flex items-center justify-between overflow-hidden bg-gradient-to-b from-transparent to-black/40"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Giant Halftone / Dot-Matrix Wordmark SVG */}
        <div className="w-full max-w-[1550px] mx-auto relative flex items-center justify-between">
          <svg
            viewBox="0 0 1200 135"
            className="w-full h-auto select-none pointer-events-auto group cursor-crosshair"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Halftone Pattern Dot Grid */}
              <pattern
                id="pm-halftone-dots"
                x="0"
                y="0"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="1.3" fill="rgba(255,255,255,0.22)" />
              </pattern>

              {/* Hover Glow Pattern */}
              <pattern
                id="pm-halftone-dots-hover"
                x="0"
                y="0"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="1.7" fill="#1F3FFF" />
              </pattern>
            </defs>

            {/* Background Dot-Matrix Fill Text */}
            <text
              x="50%"
              y="85%"
              textAnchor="middle"
              className="font-display font-black tracking-[-0.04em] transition-opacity duration-500 opacity-60 group-hover:opacity-90"
              fontSize="148"
              fill="url(#pm-halftone-dots)"
              letterSpacing="0.08em"
            >
              PIXELMUTINY
            </text>

            {/* Geometric Outlines matching brutalist reference */}
            <text
              x="50%"
              y="85%"
              textAnchor="middle"
              className="font-display font-black tracking-[-0.04em] transition-colors duration-500"
              fontSize="148"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="0.8"
              fill="none"
              letterSpacing="0.08em"
            >
              PIXELMUTINY
            </text>
          </svg>

          {/* Magnetic Circular Back to Top Button (from reference) */}
          <div
            ref={magneticBtnRef}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
              transition: mousePos.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
            className="absolute right-4 sm:right-12 bottom-6 sm:bottom-10 z-30"
          >
            <button
              type="button"
              onClick={handleBackToTop}
              onMouseEnter={playHover}
              title="Return to top"
              data-cursor="TOP"
              className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-[#0A0F1F]/90 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#1F3FFF] hover:bg-[#1F3FFF] hover:shadow-[0_0_35px_rgba(31,63,255,0.4)] active:scale-90"
              aria-label="Back to top of page"
            >
              {/* Outer Crosshair Ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-white/20 group-hover:border-white/50 transition-colors pointer-events-none" />

              {/* Animated Arrow Icon */}
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-white/70 group-hover:text-white uppercase mt-0.5">
                TOP
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
