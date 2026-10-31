'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Clock,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  MapPin,
  Send,
  Compass,
} from 'lucide-react';
import { useSound } from './SoundManager';
import { useCurrency } from './useCurrency';

// Operating Locations for the Interactive Map
const OPERATIONS_HUBS = [
  {
    id: 'delhi',
    city: 'New Delhi',
    code: 'DEL',
    tz: 'Asia/Kolkata',
    role: 'Global HQ & Engineering Core',
    coordinates: '28.6139° N, 77.2090° E',
    x: 68.5,
    y: 48.5,
    status: 'STUDIO ACTIVE',
    isHQ: true,
  },
  {
    id: 'newyork',
    city: 'New York',
    code: 'NYC',
    tz: 'America/New_York',
    role: 'US Commercial Desk',
    coordinates: '40.7128° N, 74.0060° W',
    x: 28.5,
    y: 37.0,
    status: 'CLIENT LIAISON',
    isHQ: false,
  },
  {
    id: 'london',
    city: 'London',
    code: 'LON',
    tz: 'Europe/London',
    role: 'EMEA Partner Desk',
    coordinates: '51.5074° N, 0.1278° W',
    x: 48.5,
    y: 31.5,
    status: 'ACTIVE REVIEW',
    isHQ: false,
  },
  {
    id: 'singapore',
    city: 'Singapore',
    code: 'SIN',
    tz: 'Asia/Singapore',
    role: 'APAC Partner Network',
    coordinates: '1.3521° N, 103.8198° E',
    x: 77.0,
    y: 59.0,
    status: 'REGIONAL DESK',
    isHQ: false,
  },
];

// Marquee Ribbon Tracks
const DISCIPLINE_TICKER = [
  'Custom Web Platforms',
  'Conversion Landing Pages',
  'UI/UX Design Systems',
  'Interactive 3D WebGL',
  'Brand Identity Systems',
  'Kinetic Motion & Reels',
  'Multi-Channel CRM Sync',
  'Rapid 14-Day Production Sprints',
  'Zero-Template Bespoke Engineering',
  'Core Web Vitals 95+',
];

const SECTOR_TICKER = [
  'Fintech & Payments Infrastructure',
  'Enterprise SaaS Platforms',
  'Logistics & Freight Architecture',
  'Luxury Architecture & Living',
  'Legal & Corporate Advisory',
  'Autonomous AI & Robotics',
  'High-Growth Consumer Brands',
];

export default function AgencyFooter({ onOpenInquiry }) {
  const { playClick, playHover, playSuccess } = useSound();
  const { currency } = useCurrency();

  // State for live clocks
  const [times, setTimes] = useState({
    ist: '--:--:--',
    nyc: '--:--:--',
    lon: '--:--:--',
  });

  // State for interactive tab switcher
  const [activeTab, setActiveTab] = useState('disciplines'); // 'disciplines' | 'sectors'

  // State for hover on map hub
  const [selectedHub, setSelectedHub] = useState(OPERATIONS_HUBS[0]);

  // State for newsletter dispatch
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  // Update real-time world clocks every 1000ms
  useEffect(() => {
    function updateClocks() {
      const now = new Date();
      const formatTime = (tz) =>
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);

      setTimes({
        ist: formatTime('Asia/Kolkata'),
        nyc: formatTime('America/New_York'),
        lon: formatTime('Europe/London'),
      });
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Back to top helper
  const handleBackToTop = () => {
    playClick?.();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle newsletter / sprint proposal dispatch
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setNewsletterLoading(true);
    playClick?.();

    setTimeout(() => {
      setNewsletterLoading(false);
      setNewsletterSubmitted(true);
      playSuccess?.();
    }, 600);
  };

  const activeMarqueeList = activeTab === 'disciplines' ? DISCIPLINE_TICKER : SECTOR_TICKER;

  return (
    <footer className="w-full bg-[#070A14] border-t border-white/10 text-white relative overflow-hidden select-none">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[360px] bg-[#1F3FFF]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* =========================================================================
          SECTION 1 — TOP ROW: EDITORIAL STATEMENT, LIVE CLOCKS & SPRINT DISPATCH
          (Inspired by The Collected Works)
          ========================================================================= */}
      <div className="w-full border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left: Editorial Statement */}
            <div className="max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#1F3FFF] font-bold block mb-2">
                01 // DIGITAL AGENCY ETHOS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-normal tracking-tight text-white leading-tight">
                Strategy-Led Experiences.<br />
                <span className="text-white/90">Built Different.™</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#8E95A5] mt-2 font-medium">
                PixelMutiny DigiMedia Private Limited · Bespoke websites, visual systems &amp; automation workflows.
              </p>
            </div>

            {/* Center: Live Studio Clocks */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Delhi Clock (Hub) */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  DEL
                </span>
                <span className="font-mono text-xs text-[#8E95A5]">
                  {times.ist}
                </span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                  STUDIO OPEN
                </span>
              </div>

              {/* NYC Clock */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  NYC
                </span>
                <span className="font-mono text-xs text-[#8E95A5]">
                  {times.nyc}
                </span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                  EST
                </span>
              </div>

              {/* London Clock */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  LON
                </span>
                <span className="font-mono text-xs text-[#8E95A5]">
                  {times.lon}
                </span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                  GMT
                </span>
              </div>
            </div>

            {/* Right: Rapid Sprint / Newsletter Capsule */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {!newsletterSubmitted ? (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex items-center p-1 rounded-full bg-white/5 border border-white/15 focus-within:border-[#1F3FFF] focus-within:ring-2 focus-within:ring-[#1F3FFF]/30 transition-all shadow-lg"
                >
                  <label htmlFor="footer-sprint-email" className="sr-only">
                    Work Email for Project Inquiry
                  </label>
                  <div className="flex items-center pl-3 pr-2 text-[#8E95A5]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    id="footer-sprint-email"
                    type="email"
                    required
                    placeholder="Enter work email for sprint availability..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none w-56 sm:w-64 pr-2 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    onMouseEnter={playHover}
                    className="px-4 py-2 rounded-full bg-[#1F3FFF] hover:bg-[#3855FF] text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>{newsletterLoading ? 'Dispatching...' : 'Request Sprint'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              ) : (
                <div className="px-5 py-2.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-white text-xs flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span>Brief received. Founder reviews within 24 business hours.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2 — INTERACTIVE PILL TOGGLE & SMOOTH INFINITE MARQUEE
          (Inspired by United Carriers)
          ========================================================================= */}
      <div className="w-full border-b border-white/10 bg-[#0A0E1C]/60 backdrop-blur-md py-4">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row sm:items-center gap-4">
          
          {/* Interactive Switcher Pills */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                playClick?.();
                setActiveTab('disciplines');
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'disciplines'
                  ? 'bg-white text-[#0A0F1F] shadow-md'
                  : 'bg-white/5 text-[#8E95A5] hover:text-white hover:bg-white/10'
              }`}
            >
              CORE DISCIPLINES
            </button>
            <button
              type="button"
              onClick={() => {
                playClick?.();
                setActiveTab('sectors');
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sectors'
                  ? 'bg-white text-[#0A0F1F] shadow-md'
                  : 'bg-white/5 text-[#8E95A5] hover:text-white hover:bg-white/10'
              }`}
            >
              SECTOR FOCUS
            </button>
          </div>

          <div className="hidden sm:block w-px h-5 bg-white/10 flex-shrink-0" />

          {/* Running marquee strip */}
          <div className="overflow-hidden flex-1 relative mask-fade-edges">
            <div className="marquee-track flex items-center gap-8 text-xs font-mono tracking-wide text-white/70">
              {activeMarqueeList.concat(activeMarqueeList).map((item, idx) => (
                <span key={idx} className="flex items-center gap-3 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                  <span className="hover:text-white transition-colors cursor-default">{item}</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 3 — DIRECTORY NAVIGATION & SECURE PAYMENTS GRID
          ========================================================================= */}
      <div className="w-full border-b border-white/10 py-14 lg:py-16">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Column 1: Brand & Direct CTA */}
            <div className="space-y-6 lg:pr-4">
              <Link
                href="/"
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/img/PixelMutiny reverse.png"
                  alt="PixelMutiny DigiMedia"
                  width={150}
                  height={34}
                  className="h-[30px] w-auto object-contain block"
                />
              </Link>
              <p className="text-xs text-[#8E95A5] leading-relaxed">
                Strategy-led agency building high-performance websites, distinctive brand identities, and connected business automation workflows.
              </p>

              {/* Get In Touch Pill Button */}
              <button
                type="button"
                onClick={() => {
                  playClick?.();
                  onOpenInquiry?.();
                }}
                onMouseEnter={playHover}
                className="group inline-flex items-center rounded-xl overflow-hidden cursor-pointer transition-all active:scale-95 shadow-lg hover:shadow-[#1F3FFF]/25"
                style={{ backgroundColor: '#1F3FFF' }}
              >
                <span className="px-5 py-3 text-xs font-bold tracking-wider uppercase text-white">
                  Initiate Project
                </span>
                <span className="px-3 py-3 flex items-center justify-center bg-white/10 border-l border-white/20">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </button>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2.5 font-bold">
                  STUDIO CHANNELS
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'X', href: 'https://twitter.com' },
                    { label: 'IN', href: 'https://instagram.com' },
                    { label: 'WA', href: 'https://wa.me/919315580036' },
                    { label: 'LI', href: 'https://www.linkedin.com/in/gfxsumit/' },
                  ].map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={playHover}
                      className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-[#1F3FFF] hover:border-[#1F3FFF] text-white flex items-center justify-center text-[10px] font-mono font-bold transition-all hover:scale-105"
                      aria-label={soc.label}
                    >
                      {soc.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Disciplines & Services */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1F3FFF] mb-1">
                DISCIPLINES
              </span>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                High-Performance Web Platforms
              </Link>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Conversion Landing Pages
              </Link>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                UI/UX &amp; Figma Design Systems
              </Link>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Brand Identity &amp; Collateral
              </Link>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Multi-Channel CRM Pipelines
              </Link>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Monthly Growth Retainers
              </Link>
            </div>

            {/* Column 3: Portfolio & Case Studies */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1F3FFF] mb-1">
                SELECTED WORKS (08)
              </span>
              <Link href="/works" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors font-semibold">
                Explore All Case Studies (08) →
              </Link>
              <Link href="/works/avenor" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Avenor Logistics (Enterprise)
              </Link>
              <Link href="/works/flow-task" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                FlowTask App (SaaS Platform)
              </Link>
              <Link href="/works/veyra-legal" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Veyra Legal (Corporate Site)
              </Link>
              <Link href="/works/morrow-house" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Morrow House (Architecture)
              </Link>
              <Link href="/works/veloce-ai" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Veloce AI (Concept / 3D WebGL)
              </Link>
            </div>

            {/* Column 4: Agency Intelligence */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1F3FFF] mb-1">
                AGENCY &amp; SPECS
              </span>
              <Link href="/about" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Agency Overview &amp; Partners
              </Link>
              <Link href="/about#manifesto" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Studio Manifesto
              </Link>
              <Link href="/about#ledger" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Benchmark Performance Ledger
              </Link>
              <Link href="/services" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Transparent Pricing Catalog
              </Link>
              <Link href="/contact" onMouseEnter={playHover} className="text-xs text-[#8E95A5] hover:text-white transition-colors">
                Schedule Discovery Call
              </Link>
            </div>

            {/* Column 5: Secure Payments & Financial Integrity (From United Carriers) */}
            <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  SECURE PAYMENTS
                </span>
              </div>
              <p className="text-[11px] text-[#8E95A5] leading-relaxed">
                Commercial projects billed via PCI-DSS Level 1 compliant gateways. Milestone escrow &amp; direct bank transfers supported.
              </p>

              {/* Payment Gateway Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['VISA', 'MC', 'AMEX', 'STRIPE', 'RAZORPAY', 'APPLE PAY', 'UPI'].map((badge) => (
                  <span
                    key={badge}
                    className="text-[9px] font-mono font-bold px-2 py-1 rounded bg-black/40 border border-white/10 text-white/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Tax & Currency Notice */}
              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-[#8E95A5] space-y-1">
                <div>CURRENCY: {currency === 'INR' ? '₹ INR (India)' : '$ USD (Global)'}</div>
                <div>EXCLUDES APPLICABLE GST FOR INDIAN CLIENTS</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4 — OPERATIONS DETAILS & INTERACTIVE GLOBAL LOCATOR MAP
          (Inspired by United Carriers)
          ========================================================================= */}
      <div className="w-full border-b border-white/10 py-12 lg:py-16 bg-[#060912]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* 1. Left Thumbnail Showcase */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 group aspect-[4/3] bg-[#0E1324]">
                <Image
                  src="/projects/veloce-ai.jpg"
                  alt="Veloce AI Studio Specimen"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#1F3FFF] font-bold block">
                    STUDIO SPECIMEN 01
                  </span>
                  <span className="text-xs font-bold block text-white mt-0.5">
                    Veloce AI — Interactive 3D WebGL
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Center: Operations & Studio Data Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              
              {/* Head Office */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E95A5] block mb-1">
                  HEAD OFFICE
                </span>
                <p className="font-semibold text-white leading-relaxed">
                  PixelMutiny DigiMedia Pvt Ltd<br />
                  Outer Ring Road, New Delhi 110001, India.
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1 text-[11px] text-[#1F3FFF] hover:underline mt-1 font-semibold"
                >
                  <span>→ Studio Location</span>
                </a>
              </div>

              {/* Direct Inquiries */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E95A5] block mb-1">
                  DIRECT INQUIRIES
                </span>
                <a
                  href="mailto:hello@pixelmutiny.com"
                  onMouseEnter={playHover}
                  className="font-semibold text-white hover:text-[#1F3FFF] transition-colors block"
                >
                  hello@pixelmutiny.com
                </a>
                <span className="text-[10px] font-mono text-[#8E95A5] block mt-1">
                  HOTLINE / WHATSAPP:
                </span>
                <a
                  href="https://wa.me/919315580036"
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  className="font-semibold text-white hover:text-[#1F3FFF] transition-colors block"
                >
                  +91 93155 80036
                </a>
              </div>

              {/* Operating Reach */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E95A5] block mb-1">
                  OPERATING ACROSS
                </span>
                <p className="font-semibold text-white">
                  India / United States / United Kingdom / Singapore / Global Remote
                </p>
              </div>

              {/* Studio Hours */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E95A5] block mb-1">
                  STUDIO HOURS
                </span>
                <p className="font-semibold text-white">
                  Monday – Friday / 10:00 AM – 7:00 PM IST
                </p>
                <span className="text-[10px] text-[#10B981] font-bold inline-flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Sprint Desk Online</span>
                </span>
              </div>

            </div>

            {/* 3. Right: Interactive Dot-Matrix World Operations Map */}
            <div className="lg:col-span-4 bg-[#0A0F1F] p-4 rounded-2xl border border-white/10 relative">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#1F3FFF]" />
                  <span>GLOBAL SPRINT HUBS</span>
                </span>
                <span className="text-[10px] font-mono text-[#10B981] font-bold">
                  {selectedHub.code} · {selectedHub.status}
                </span>
              </div>

              {/* SVG World Map Schematic with interactive pins */}
              <div className="relative w-full aspect-[2/1] bg-[#070A14] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                {/* SVG Dot-Matrix World Grid */}
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full opacity-40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Grid Lat/Long */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" />

                  {/* Continent Schematic Shapes (Stylized Dots) */}
                  {/* North America */}
                  <ellipse cx="110" cy="70" rx="35" ry="25" fill="rgba(255,255,255,0.08)" />
                  {/* South America */}
                  <ellipse cx="150" cy="140" rx="20" ry="35" fill="rgba(255,255,255,0.06)" />
                  {/* Europe */}
                  <ellipse cx="205" cy="60" rx="25" ry="18" fill="rgba(255,255,255,0.08)" />
                  {/* Africa */}
                  <ellipse cx="215" cy="115" rx="25" ry="30" fill="rgba(255,255,255,0.06)" />
                  {/* Asia */}
                  <ellipse cx="280" cy="75" rx="55" ry="30" fill="rgba(255,255,255,0.08)" />
                  {/* Australia */}
                  <ellipse cx="325" cy="145" rx="22" ry="16" fill="rgba(255,255,255,0.06)" />
                </svg>

                {/* Interactive Location Pins */}
                {OPERATIONS_HUBS.map((hub) => {
                  const isHovered = selectedHub.id === hub.id;
                  return (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => {
                        playClick?.();
                        setSelectedHub(hub);
                      }}
                      onMouseEnter={() => {
                        playHover?.();
                        setSelectedHub(hub);
                      }}
                      className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline-none"
                      style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                      aria-label={`${hub.city} Hub`}
                    >
                      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            hub.isHQ ? 'bg-[#1F3FFF]' : 'bg-[#10B981]'
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 border border-white ${
                            hub.isHQ ? 'bg-[#1F3FFF]' : 'bg-[#10B981]'
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}

                {/* Selected Hub Live Tooltip */}
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-[#0E1324]/90 backdrop-blur-md border border-white/15 flex items-center justify-between text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#1F3FFF]" />
                    <span className="text-white font-bold">{selectedHub.city}</span>
                    <span className="text-[#8E95A5]">({selectedHub.role})</span>
                  </div>
                  <span className="text-[#10B981] font-semibold">{selectedHub.coordinates}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5 — COLOSSAL STATEMENT DISPLAY BRANDING
          (Inspired by United Carriers & The Collected Works)
          ========================================================================= */}
      <div className="w-full relative border-b border-white/10 overflow-hidden bg-[#05070E] py-8 lg:py-12">
        <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          
          {/* Giant Display Typography */}
          <div className="w-full relative">
            <h1
              className="font-display text-[15vw] leading-[0.8] font-extrabold uppercase tracking-tighter text-white/90 select-none hover:text-white transition-colors duration-300"
              style={{
                letterSpacing: '-0.04em',
                WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              }}
            >
              PIXELMUTINY
            </h1>
          </div>

          {/* Floating Compass / Studio Seal */}
          <div className="hidden lg:flex flex-col items-center gap-1.5 absolute right-16 top-1/2 -translate-y-1/2 px-4 py-3 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md group hover:border-[#1F3FFF] transition-all">
            <Compass className="w-6 h-6 text-[#1F3FFF] animate-[spin_12s_linear_infinite]" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white text-center">
              EST. 2025<br />NEW DELHI
            </span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 6 — LEGAL, COMPLIANCE & BACK TO TOP STRIP
          ========================================================================= */}
      <div className="w-full py-6 bg-[#04060B] text-xs text-[#8E95A5]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Copyright & Registration */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-medium text-white/70">
              © 2026 PixelMutiny DigiMedia Private Limited.
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-[11px] font-mono text-white/50">
              CIN: U74999DL2025PTC000000 · CRAFTED IN INDIA
            </span>
          </div>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium">
            <Link
              href="/privacy-policy"
              onMouseEnter={playHover}
              className="text-[#8E95A5] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              onMouseEnter={playHover}
              className="text-[#8E95A5] hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/about#manifesto"
              onMouseEnter={playHover}
              className="text-[#8E95A5] hover:text-white transition-colors"
            >
              Studio Manifesto
            </Link>
            <Link
              href="/about#ledger"
              onMouseEnter={playHover}
              className="text-[#8E95A5] hover:text-white transition-colors"
            >
              Benchmark Ledger
            </Link>
            <button
              type="button"
              onClick={handleBackToTop}
              onMouseEnter={playHover}
              className="text-white hover:text-[#1F3FFF] transition-colors inline-flex items-center gap-1 cursor-pointer font-bold px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-[#1F3FFF]"
              aria-label="Back to top of page"
            >
              <span>Back to top ↑</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
