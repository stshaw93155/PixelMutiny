'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useSound } from './SoundManager';

// 6 Strategic Delivery Nodes for the Dotted World Map
const GLOBAL_HUBS = [
  {
    id: 'delhi',
    name: 'New Delhi (HQ)',
    country: 'India',
    x: 68.5,
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
    status: 'Client Sprints',
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
    status: 'Brand Growth',
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
    status: 'Fintech Systems',
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
    status: 'APAC Regional Ops',
    latency: '34ms',
  },
];

// Content for the interactive ribbon (Industries & Services)
const RIBBON_ITEMS = {
  industries: [
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
  services: [
    'Website Design & Engineering',
    'High-Converting Landing Pages',
    'UI/UX & Figma Design Systems',
    'Custom Dashboards & Web Apps',
    'Multi-Source CRM Automation',
    'Kinetic Motion & Short-form Video',
    'Sub-16ms WebGL Experiences',
    'Headless E-Commerce Architecture',
    'Core Web Vitals & Speed Optimization',
  ],
};

export default function AgencyFooter({ onOpenInquiry }) {
  const { playClick, playHover } = useSound();
  const [activeTab, setActiveTab] = useState('industries');
  const [hoveredHub, setHoveredHub] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const magneticBtnRef = useRef(null);

  // Smooth scroll to top
  const handleBackToTop = () => {
    playClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Magnetic cursor interaction for back-to-top button
  const handleMouseMove = (e) => {
    if (!magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    setMousePos({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <footer className="w-full bg-[#FFFFFF] text-[#0A0F1F] border-t border-[#E5E7EB] font-sans antialiased relative overflow-hidden select-none">
      {/* =========================================================================
          ROW 1: SOCIALS | COMPANY (3 COLUMNS) | SECURE PAYMENTS
          ========================================================================= */}
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* SOCIALS (Col 1 — 3 columns wide) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
              SOCIALS
            </span>

            {/* Circular Social Buttons exactly matching reference */}
            <div className="flex items-center gap-2.5">
              {[
                { name: 'in', href: 'https://www.linkedin.com/in/gfxsumit/', label: 'LinkedIn', icon: 'in' },
                { name: 'ig', href: 'https://instagram.com', label: 'Instagram', icon: 'ig' },
                { name: 'x', href: 'https://twitter.com', label: 'X (Twitter)', icon: '𝕏' },
                { name: 'wa', href: 'https://wa.me/919315580036', label: 'WhatsApp', icon: 'wa' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  title={soc.label}
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full border border-[#D1D5DB] bg-[#FFFFFF] text-[#111827] hover:border-[#1F3FFF] hover:bg-[#1F3FFF] hover:text-white transition-all duration-200 flex items-center justify-center text-xs font-mono font-bold shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{soc.icon}</span>
                </a>
              ))}
            </div>

            <p className="text-xs text-[#6B7280] leading-relaxed pt-1">
              Direct founder access &amp; open dispatches.
            </p>
          </div>

          {/* COMPANY DIRECTORY (Col 2 — 6 columns wide, 3 sub-columns) */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
              COMPANY
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-[13px]">
              {/* Column 1 */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/"
                  className="text-[#1F3FFF] font-bold hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  About us
                </Link>
                <Link
                  href="/works"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  Selected Work
                </Link>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/about#manifesto"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  Manifesto
                </Link>
                <Link
                  href="/about#ledger"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  Benchmark Ledger
                </Link>
                <Link
                  href="/services"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  Services &amp; Pricing
                </Link>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/works"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  Industries
                </Link>
                <Link
                  href="/services"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors"
                >
                  Deliverables
                </Link>
                <Link
                  href="/contact"
                  className="text-[#111827] hover:text-[#1F3FFF] transition-colors font-semibold"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>

          {/* SECURE PAYMENTS (Col 3 — 3 columns wide) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
              SECURE PAYMENTS
            </span>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Payments secured via PCI-DSS compliant gateway. Card details are not stored.
            </p>

            {/* Payment Method Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                { name: 'VISA', bg: 'bg-[#1A1F71]', text: 'text-white' },
                { name: 'MC', bg: 'bg-[#EB001B]', text: 'text-white' },
                { name: 'AMEX', bg: 'bg-[#006FCF]', text: 'text-white' },
                { name: 'UPI', bg: 'bg-[#097939]', text: 'text-white' },
                { name: ' Pay', bg: 'bg-[#000000]', text: 'text-white' },
                { name: 'WIRE', bg: 'bg-[#374151]', text: 'text-white' },
              ].map((badge) => (
                <span
                  key={badge.name}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${badge.bg} ${badge.text}`}
                >
                  {badge.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: INTERACTIVE TAB PILLS & FULL-WIDTH STREAMING RIBBON
          ========================================================================= */}
      <div className="w-full border-t border-[#E5E7EB] pt-8 pb-10">
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 mb-4">
          {/* Tab Switcher Pills */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => {
                playClick?.();
                setActiveTab('industries');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'industries'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Industries
            </button>
            <button
              type="button"
              onClick={() => {
                playClick?.();
                setActiveTab('services');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827]'
              }`}
            >
              Services
            </button>
          </div>
        </div>

        {/* Large Elegant Horizontal Ticker Ribbon */}
        <div className="w-full overflow-hidden whitespace-nowrap relative flex items-center py-2">
          <div className="marquee-track gap-10 items-center text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-[#9CA3AF] tracking-tight hover:text-[#111827] transition-colors cursor-default">
            {RIBBON_ITEMS[activeTab].concat(RIBBON_ITEMS[activeTab]).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-10">
                <span className="hover:text-[#1F3FFF] transition-colors">
                  {item}
                </span>
                <span className="text-[#D1D5DB] font-sans">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 3: ARCHITECTURAL VISUAL | OPERATIONAL GRID | DOTTED WORLD MAP
          ========================================================================= */}
      <div className="w-full border-t border-[#E5E7EB] py-14">
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Thumbnail (Col 1 — 3 columns wide) */}
            <div className="lg:col-span-3">
              <div className="relative rounded-lg overflow-hidden border border-[#E5E7EB] bg-[#F3F4F6] aspect-[4/3] shadow-xs group">
                <Image
                  src="/projects/morrow-house.jpg"
                  alt="PixelMutiny Studio Perspective"
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Typographic Metadata (Col 2 — 5 columns wide, 2-column grid) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-6 text-xs">
              {/* Head Office */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
                  HEAD OFFICE
                </span>
                <p className="text-[#111827] leading-relaxed font-medium">
                  PixelMutiny DigiMedia Pvt. Ltd.
                  <br />
                  2A Connaught Place,
                  <br />
                  New Delhi 110001, India.
                </p>
                <a
                  href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#111827] hover:text-[#1F3FFF] font-semibold mt-1 transition-colors"
                >
                  <span>↳ Direction on Google</span>
                </a>
              </div>

              {/* Email & Hotline */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
                    EMAIL
                  </span>
                  <a
                    href="mailto:hello@pixelmutiny.com"
                    className="text-[#111827] hover:text-[#1F3FFF] font-mono font-medium block transition-colors"
                  >
                    hello@pixelmutiny.com
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
                    HOTLINE
                  </span>
                  <a
                    href="https://wa.me/919315580036"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#111827] hover:text-[#1F3FFF] font-mono font-semibold block transition-colors"
                  >
                    +91 93155 80036
                  </a>
                </div>
              </div>

              {/* Operating Across */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
                  OPERATING ACROSS
                </span>
                <p className="text-[#111827] font-medium leading-relaxed">
                  Australia / New Zealand / India / UAE / US
                </p>
              </div>

              {/* Office Hours */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B7280] block">
                  OFFICE HOURS
                </span>
                <p className="text-[#111827] font-medium leading-relaxed">
                  Monday - Friday / 8:30AM - 5PM (IST)
                </p>
              </div>
            </div>

            {/* Dotted World Map (Col 3 — 4 columns wide) */}
            <div className="lg:col-span-4 relative flex flex-col items-center">
              <div className="w-full relative aspect-[1.85/1] max-w-[420px] mx-auto p-1">
                {/* SVG Dot Matrix Map Base on Pure White */}
                <svg
                  viewBox="0 0 100 60"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Continental Dots Array in Subtle Slate/Grey */}
                  <g fill="#CBD5E1">
                    {/* North America */}
                    <circle cx="15" cy="22" r="0.9" /><circle cx="18" cy="20" r="0.9" /><circle cx="22" cy="18" r="0.9" />
                    <circle cx="26" cy="18" r="0.9" /><circle cx="30" cy="20" r="0.9" /><circle cx="16" cy="26" r="0.9" />
                    <circle cx="20" cy="24" r="0.9" /><circle cx="24" cy="22" r="0.9" /><circle cx="28" cy="24" r="0.9" />
                    <circle cx="18" cy="30" r="0.9" /><circle cx="22" cy="28" r="0.9" /><circle cx="26" cy="30" r="0.9" />
                    <circle cx="20" cy="34" r="0.9" /><circle cx="24" cy="36" r="0.9" /><circle cx="28" cy="34" r="0.9" />

                    {/* South America */}
                    <circle cx="30" cy="42" r="0.9" /><circle cx="32" cy="45" r="0.9" /><circle cx="34" cy="48" r="0.9" />
                    <circle cx="32" cy="52" r="0.9" /><circle cx="30" cy="55" r="0.9" />

                    {/* Europe */}
                    <circle cx="48" cy="20" r="0.9" /><circle cx="52" cy="18" r="0.9" /><circle cx="55" cy="20" r="0.9" />
                    <circle cx="47" cy="25" r="0.9" /><circle cx="50" cy="24" r="0.9" /><circle cx="54" cy="25" r="0.9" />
                    <circle cx="48" cy="29" r="0.9" /><circle cx="52" cy="28" r="0.9" />

                    {/* Africa */}
                    <circle cx="48" cy="34" r="0.9" /><circle cx="52" cy="33" r="0.9" /><circle cx="56" cy="35" r="0.9" />
                    <circle cx="50" cy="38" r="0.9" /><circle cx="54" cy="39" r="0.9" /><circle cx="52" cy="44" r="0.9" />
                    <circle cx="54" cy="48" r="0.9" /><circle cx="53" cy="52" r="0.9" />

                    {/* Asia & India */}
                    <circle cx="62" cy="20" r="0.9" /><circle cx="66" cy="18" r="0.9" /><circle cx="70" cy="20" r="0.9" />
                    <circle cx="75" cy="22" r="0.9" /><circle cx="80" cy="24" r="0.9" /><circle cx="63" cy="26" r="0.9" />
                    <circle cx="67" cy="25" r="0.9" /><circle cx="71" cy="26" r="0.9" /><circle cx="76" cy="27" r="0.9" />
                    <circle cx="82" cy="28" r="0.9" /><circle cx="61" cy="32" r="0.9" /><circle cx="65" cy="31" r="0.9" />
                    <circle cx="69" cy="33" r="0.9" /><circle cx="73" cy="32" r="0.9" /><circle cx="78" cy="34" r="0.9" />
                    <circle cx="84" cy="33" r="0.9" /><circle cx="64" cy="38" r="0.9" /><circle cx="68" cy="37" r="0.9" />
                    <circle cx="72" cy="39" r="0.9" /><circle cx="76" cy="40" r="0.9" /><circle cx="82" cy="40" r="0.9" />
                    <circle cx="68" cy="42" r="1.1" /><circle cx="69" cy="44" r="1.1" /><circle cx="68" cy="46" r="1.1" />

                    {/* Australia */}
                    <circle cx="84" cy="48" r="0.9" /><circle cx="88" cy="47" r="0.9" /><circle cx="86" cy="52" r="0.9" />
                    <circle cx="90" cy="51" r="0.9" />
                  </g>
                </svg>

                {/* Electric Blue Nodes exactly as in reference */}
                {GLOBAL_HUBS.map((hub) => (
                  <div
                    key={hub.id}
                    onMouseEnter={() => {
                      playHover?.();
                      setHoveredHub(hub);
                    }}
                    onMouseLeave={() => setHoveredHub(null)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer p-1 group z-20"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#1F3FFF] animate-ping opacity-75" />
                    <span className="relative block w-2 h-2 rounded-full bg-[#1F3FFF] shadow-xs group-hover:scale-150 transition-transform" />
                  </div>
                ))}

                {/* Tooltip */}
                {hoveredHub && (
                  <div
                    style={{
                      left: `${Math.min(Math.max(hoveredHub.x, 20), 80)}%`,
                      top: `${hoveredHub.y > 45 ? hoveredHub.y - 18 : hoveredHub.y + 12}%`,
                    }}
                    className="absolute -translate-x-1/2 z-30 pointer-events-none p-2 rounded-md bg-[#111827] text-white shadow-lg text-[10px] font-mono whitespace-nowrap"
                  >
                    <p className="font-bold">{hoveredHub.name}</p>
                    <p className="text-white/70 text-[9px] mt-0.5">{hoveredHub.status}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 4: LEGAL & POLICY METADATA STRIP
          ========================================================================= */}
      <div className="w-full border-t border-[#E5E7EB] py-4 bg-[#FFFFFF]">
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-wider text-[#6B7280]">
          <div>
            <span>© 2026 PIXELMUTINY DIGIMEDIA PRIVATE LIMITED. CRAFTED BY PIXELMUTINY</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <Link href="/privacy-policy" className="hover:text-[#111827] transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/terms-of-use" className="hover:text-[#111827] transition-colors">
              TERMS &amp; CONDITIONS
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#111827] transition-colors">
              COOKIE SETTINGS
            </Link>
            <span className="text-[#D1D5DB]">|</span>
            <span>ALL PRICES IN AUD / INR / USD. POWERED BY STRIPE.</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 5: MASSIVE HALFTONE DOT-MATRIX WORDMARK & BACK-TO-TOP BUTTON
          ========================================================================= */}
      <div
        className="w-full border-t border-[#E5E7EB] pt-6 pb-12 sm:pb-16 relative bg-[#FFFFFF]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 relative flex items-center justify-between">
          {/* Edge-to-Edge Dot Matrix Wordmark SVG matching reference */}
          <svg
            viewBox="0 0 1200 130"
            className="w-full h-auto select-none pointer-events-auto group cursor-default"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dot Grid Pattern on Pure White */}
              <pattern
                id="pm-dots-pattern"
                x="0"
                y="0"
                width="5"
                height="5"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2.5" cy="2.5" r="1.1" fill="#9CA3AF" />
              </pattern>
            </defs>

            {/* Dotted Halftone Fill */}
            <text
              x="50%"
              y="82%"
              textAnchor="middle"
              className="font-display font-black tracking-[-0.03em] transition-opacity duration-300 opacity-70 group-hover:opacity-90"
              fontSize="140"
              fill="url(#pm-dots-pattern)"
              letterSpacing="0.04em"
            >
              PIXELMUTINY.
            </text>

            {/* Subtle Hairline Vector Outline */}
            <text
              x="50%"
              y="82%"
              textAnchor="middle"
              className="font-display font-black tracking-[-0.03em]"
              fontSize="140"
              stroke="#D1D5DB"
              strokeWidth="0.75"
              fill="none"
              letterSpacing="0.04em"
            >
              PIXELMUTINY.
            </text>
          </svg>

          {/* Magnetic Circular Back-to-Top Button exactly as in reference */}
          <div
            ref={magneticBtnRef}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
              transition: mousePos.x === 0 ? 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
            className="absolute right-6 sm:right-12 bottom-6 sm:bottom-10 z-30"
          >
            <button
              type="button"
              onClick={handleBackToTop}
              onMouseEnter={playHover}
              title="Return to top"
              data-cursor="TOP"
              className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#111827] bg-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Back to top"
            >
              {/* Center Crosshair Dot/Arrow matching reference */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#111827] group-hover:scale-150 transition-transform" />
              <ArrowUp className="w-4 h-4 text-[#111827] absolute opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
