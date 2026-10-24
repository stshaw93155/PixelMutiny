'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSound } from '../components/SoundManager';
import { useCurrency } from '../components/useCurrency';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/motion';
import Marquee from '../components/Marquee';
import {
  SERVICES_DATA,
  STARTUP_LAUNCH_KIT,
  ADD_ONS_DATA,
  TERMS_CONDITIONS,
  FAQ_DATA,
  formatPrice,
  WHY_CHOOSE_US,
  COMPANY_LEGAL_NAME,
  ONE_LINER,
} from '../../data/pricing';
import {
  Check,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  ArrowUpRight,
  Play,
} from 'lucide-react';

const COMPARISON_DATA = {
  website: {
    headers: ['Starter', 'Custom Business (Most Popular)', 'Flagship & E-commerce'],
    rows: [
      {
        feature: 'Page Scope',
        tiers: ['Up to 5 custom responsive pages', 'Up to 10 custom pages + blog', '15+ pages or full online store'],
      },
      {
        feature: 'Content Management (CMS)',
        tiers: ['Self-serve headless CMS', 'Headless CMS + dynamic resources', 'Multi-collection / E-commerce CMS'],
      },
      {
        feature: 'Design System & UI/UX',
        tiers: ['Clean modular layouts', 'Custom Figma design system & tokens', 'Advanced design system with interactive views'],
      },
      {
        feature: 'Animations & Polish',
        tiers: ['Subtle CSS transitions', 'Fluid GSAP micro-interactions', 'Custom 3D / WebGL product showcase'],
      },
      {
        feature: 'SEO & Performance',
        tiers: ['Core technical SEO & sitemap', 'Technical SEO + Schema markup', 'Programmatic SEO & speed optimization'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['2 to 3 weeks', '4 to 5 weeks', '6 to 8 weeks'],
      },
      {
        feature: 'Support & Handover',
        tiers: ['Video walkthrough guide', 'Live team training + docs', '30-day post-launch hypercare'],
      },
    ],
  },
  landing: {
    headers: ['Essential', 'Standard (Most Popular)', 'Premium'],
    rows: [
      {
        feature: 'Page Scope',
        tiers: ['1 responsive landing page', '1 conversion-engineered launch page', '1 flagship landing page + A/B variant'],
      },
      {
        feature: 'Copywriting & Narrative',
        tiers: ['Client-provided copy polish', 'Full narrative copy structure included', 'Full high-converting copy + heuristic audit'],
      },
      {
        feature: 'Animations & Interactions',
        tiers: ['Standard smooth scroll', 'Fluid kinetic micro-animations', 'Interactive element (calculator or visual demo)'],
      },
      {
        feature: 'Analytics & Pixel Setup',
        tiers: ['Basic form intake', 'GA4 & Meta Pixel event setup', 'Full CRM routing + custom event tracking'],
      },
      {
        feature: 'Revision Rounds',
        tiers: ['2 rounds included', '2 rounds included', '2 rounds + 2 post-launch tweak rounds'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['5 to 7 days', '10 to 14 days', '3 weeks'],
      },
      {
        feature: 'Platform',
        tiers: ['Next.js or Webflow', 'Next.js or Webflow', 'Next.js custom production stack'],
      },
    ],
  },
  'ui-ux': {
    headers: ['Audit & Wireframes', 'Complete App UI (Most Popular)', 'Enterprise System'],
    rows: [
      {
        feature: 'Screen Scope',
        tiers: ['Up to 8 low-fi wireframe views', 'Up to 15 high-fidelity screens', '30+ application views & edge cases'],
      },
      {
        feature: 'UX Research & Audit',
        tiers: ['Heuristic review & friction teardown', 'User flow & competitor benchmarking', 'Deep UX research & user usability testing'],
      },
      {
        feature: 'Prototyping',
        tiers: ['Static wireframe deck', 'Clickable Figma prototype', 'Full interactive multi-state prototype'],
      },
      {
        feature: 'Design System Specs',
        tiers: ['UX flow recommendations', 'Component library & auto-layout tokens', 'Multi-platform design token repository'],
      },
      {
        feature: 'Developer Handoff',
        tiers: ['Figma file export', 'Developer handoff call + asset specs', 'Continuous engineering sprint support'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['1 to 2 weeks', '3 to 4 weeks', '5 to 6 weeks'],
      },
    ],
  },
  dashboard: {
    headers: ['Core UI Kit', 'Frontend Build (Most Popular)', 'Scalable SaaS Suite'],
    rows: [
      {
        feature: 'Scope',
        tiers: ['Figma design of 4 core views', 'Full Next.js / Tailwind code', 'Multi-role production admin suite'],
      },
      {
        feature: 'Data Visualization',
        tiers: ['Metric cards & chart mockups', 'Interactive Chart.js / Recharts', 'Real-time charting & report pipelines'],
      },
      {
        feature: 'Data Tables & Lists',
        tiers: ['Figma table components', 'Sortable, searchable, paginated tables', 'Exportable tables with custom filters'],
      },
      {
        feature: 'Dark & Light Mode',
        tiers: ['Figma theme specifications', 'Included in Next.js code', 'Included in Next.js code'],
      },
      {
        feature: 'Backend Wiring',
        tiers: ['Figma design only', 'Clean mock JSON API wiring', 'Production API sync & state management'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['2 to 3 weeks', '4 to 5 weeks', '6 to 8 weeks'],
      },
    ],
  },
  graphics: {
    headers: ['Starter Pack', 'Collateral Kit (Most Popular)', 'Monthly Retainer'],
    rows: [
      {
        feature: 'Deliverable Volume',
        tiers: ['6 social posts or 1 banner', '15 social posts + pitch deck + flyer', '30 assets per month ongoing'],
      },
      {
        feature: 'Pitch Deck / Presentations',
        tiers: ['Not included', 'Up to 15 custom investor slides', 'Multiple presentations & sales decks'],
      },
      {
        feature: 'Print Collateral',
        tiers: ['Digital or print ready', 'Brochures, flyers & roll-up banners', 'Complete print & digital brand collateral'],
      },
      {
        feature: 'Source Files',
        tiers: ['Figma / Illustrator / PNG', 'Figma / Canva editable templates', 'Full master source files & raw vectors'],
      },
      {
        feature: 'Turnaround',
        tiers: ['3 to 5 days', '1 to 2 weeks', 'Priority 48-hour turnarounds'],
      },
    ],
  },
  video: {
    headers: ['Reel Sprint', 'Creator Pack (Most Popular)', 'Monthly Video Engine'],
    rows: [
      {
        feature: 'Video Quantity',
        tiers: ['5 short-form reels / shorts', '15 high-retention reels', '30 reels per month ongoing'],
      },
      {
        feature: 'Captions & Typography',
        tiers: ['Kinetic animated subtitles', 'Custom branded typography & emojis', 'Signature branded animated text styling'],
      },
      {
        feature: 'Sound Design & SFX',
        tiers: ['Background music + basic SFX', 'Pacing sound design & trending audio', 'Full audio curation, SFX & dynamic mixing'],
      },
      {
        feature: 'Viral Hook Strategy',
        tiers: ['Fast pacing cuts', 'Hook recommendations & visual callouts', 'Monthly strategy sync on viral formats'],
      },
      {
        feature: 'Turnaround',
        tiers: ['3 to 5 days', '10 to 14 days', 'Priority 48-hour turnarounds'],
      },
    ],
  },
  brand: {
    headers: ['Essentials', 'Standard (Most Popular)', 'Premium'],
    rows: [
      {
        feature: 'Logo Concepts',
        tiers: ['3 initial concepts (1 refined)', '5 concepts + full logo system', 'Full exploration + motion marks'],
      },
      {
        feature: 'Guidelines Manual',
        tiers: ['1-page mini guide (PDF)', 'Comprehensive PDF + Figma guidelines', 'Executive brand book + positioning deck'],
      },
      {
        feature: 'Social Media Templates',
        tiers: ['Not included', '10 editable Canva/Figma templates', '30 custom multi-format templates'],
      },
      {
        feature: 'Marketing & Ad Creatives',
        tiers: ['Not included', 'Social starter pack', 'Ad creative starter set + collateral'],
      },
      {
        feature: 'Revision Rounds',
        tiers: ['2 structured rounds', '2 structured rounds', '3 rounds + strategy session'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['5 to 7 days', '2 to 3 weeks', '4 weeks'],
      },
      {
        feature: 'Source Files & Rights',
        tiers: ['Vector SVG, PNG, EPS (100% owned)', 'Vector, Figma, Print-ready (100% owned)', 'Full Master Archive (100% owned)'],
      },
    ],
  },
  'meta-ads': {
    headers: ['Creative Pack', 'Management (Most Popular)', 'Growth'],
    rows: [
      {
        feature: 'Monthly New Creatives',
        tiers: ['8 static + 2 videos (one-time)', '4 fresh performance creatives / mo', '12 fresh performance creatives / mo'],
      },
      {
        feature: 'Creative Formats',
        tiers: ['Feed (1:1), Story (9:16), Reel', 'Feed, Story, Reel', 'Feed, Story, Reel, Carousel & Hooks'],
      },
      {
        feature: 'Campaign Setup & Tuning',
        tiers: ['Asset pack only', 'Weekly budget & audience optimization', 'Multi-campaign scaling & daily monitoring'],
      },
      {
        feature: 'Landing Page Guidance',
        tiers: ['Not included', 'Conversion recommendations', 'Continuous landing page CRO tweaks'],
      },
      {
        feature: 'Reporting & Sync',
        tiers: ['Asset delivery handover', 'Monthly transparent performance report', 'Weekly strategy call + monthly dashboard'],
      },
      {
        feature: 'Commitment Period',
        tiers: ['One-time sprint (7 days)', '3-month minimum partnership', '3-month minimum partnership'],
      },
      {
        feature: 'Ad Spend Allocation',
        tiers: ['Paid directly by client to Meta', 'Paid directly by client to Meta', 'Paid directly by client to Meta'],
      },
    ],
  },
};

export default function ServicesPage() {
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState('website');
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileAccordionTier, setMobileAccordionTier] = useState(1);
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });
  const { playClick, playHover } = useSound();
  const pricingSectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Mouse coordinate tracker for patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  // Sync active tab with URL hash on load and hash change
  useEffect(() => {
    const validHashes = [
      'website',
      'landing',
      'ui-ux',
      'dashboard',
      'graphics',
      'video',
      'brand',
      'meta-ads',
    ];

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validHashes.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabSelect = (tabId) => {
    playClick();
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  const scrollToPricingForService = (serviceId) => {
    playClick();
    setActiveTab(serviceId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${serviceId}`);
    }
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeService =
    SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];
  const comparison = COMPARISON_DATA[activeTab] || COMPARISON_DATA.website;

  return (
    <div className="w-full bg-white text-[#1D1D1F] min-h-screen selection:bg-[#0859D4] selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO CANVAS (ONLINES PATRON-PUNTOS + SELECTION FRAME)
          ========================================================================= */}
      <section
        onMouseMove={handleMouseMove}
        className="relative border-b border-[rgba(18,18,19,0.08)] pt-28 pb-16 md:pt-32 md:pb-20 px-4 sm:px-8 md:px-12 bg-white patron-puntos overflow-hidden"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        {/* Subtle Architectural Grid */}
        <div className="grilla-celdas opacity-40 pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1920px] mx-auto relative z-10">
          {/* Header Metadata & Currency Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0859D4]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
                01 // SERVICES &amp; PRICING
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#424242] font-medium">
                8 Core Disciplines Under One Roof
              </span>
            </div>
          </div>

          {/* Monumental Hero Headline with Dotted Baseline */}
          <h1
            className="font-display font-bold tracking-tight text-[#1D1D1F] max-w-5xl"
            style={{
              fontSize: 'clamp(32px, 5.2vw, 68px)',
              lineHeight: 1.08,
            }}
          >
            <span className="dotted-baseline">Built different. Designed to perform.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#424242] max-w-3xl mt-6 leading-relaxed font-normal">
            {ONE_LINER}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 text-xs">
            <button
              onClick={() => {
                if (pricingSectionRef.current) {
                  pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-onlines-blue py-3 px-6 cursor-pointer"
            >
              <span>EXPLORE ALL 8 PACKAGES &amp; RATES</span>
              <span className="ml-2">↓</span>
            </button>
            <Link
              href="/contact"
              onClick={playClick}
              className="btn-onlines-outline py-3 px-6"
            >
              <span>TALK WITH A DESIGNER</span>
              <span className="ml-2">→</span>
            </Link>
          </div>

          {/* 3 Featured Onlines Vertical Blue Cards */}
          <div className="home-servicios__grilla mt-14 mb-4">
            <div className="card-servicio--vertical">
              <div className="card-servicio__tarjeta shader-halftone">
                <div className="card-servicio__textos">
                  <h3 className="card-servicio__titulo">
                    <span>Experience &amp; Interface Design</span>
                    <span className="card-servicio__titulo-puntos" />
                  </h3>
                  <p className="card-servicio__descripcion">
                    Design systems, wireframing, high-fidelity UI/UX, and brand identities crafted pixel-by-pixel for maximum clarity and engagement.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToPricingForService('ui-ux')}
                  className="card-servicio__cta--vertical cursor-pointer"
                >
                  View Packages
                </button>
              </div>
              <p className="card-servicio__texto-debajo">
                Our design thinking process empowers your brand from day zero to launch.
              </p>
            </div>

            <div className="card-servicio--vertical">
              <div className="card-servicio__tarjeta shader-halftone">
                <div className="card-servicio__textos">
                  <h3 className="card-servicio__titulo">
                    <span>Bespoke Web Development</span>
                    <span className="card-servicio__titulo-puntos" />
                  </h3>
                  <p className="card-servicio__descripcion">
                    Engineering scalable, fully responsive web apps on Next.js 16 and modern cloud architectures. Built for speed, SEO, and security.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToPricingForService('website')}
                  className="card-servicio__cta--vertical cursor-pointer"
                >
                  View Packages
                </button>
              </div>
              <p className="card-servicio__texto-debajo">
                Adhering to international performance and accessibility standards.
              </p>
            </div>

            <div className="card-servicio--vertical">
              <div className="card-servicio__tarjeta shader-halftone">
                <div className="card-servicio__textos">
                  <h3 className="card-servicio__titulo">
                    <span>Performance &amp; Growth Strategy</span>
                    <span className="card-servicio__titulo-puntos" />
                  </h3>
                  <p className="card-servicio__descripcion">
                    Full-funnel Meta Ads, viral content creation, conversion rate optimization, and deep telemetry analytics to drive compounding revenue.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToPricingForService('meta-ads')}
                  className="card-servicio__cta--vertical cursor-pointer"
                >
                  View Packages
                </button>
              </div>
              <p className="card-servicio__texto-debajo">
                Your growth is our accountability. End-to-end management with transparent reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUICK JUMP NAVIGATION STRIP
          ========================================================================= */}
      <section className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[rgba(18,18,19,0.08)] py-3 px-4 sm:px-8 md:px-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar text-xs">
          <span className="font-bold text-[#1D1D1F] uppercase tracking-wider flex-shrink-0">
            JUMP TO SERVICE:
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {SERVICES_DATA.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToPricingForService(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === s.id
                    ? 'bg-[#0859D4] text-white shadow-sm'
                    : 'bg-[#F5F5F7] text-[#424242] hover:text-[#1D1D1F] hover:bg-[#EBEBEF] border border-[rgba(18,18,19,0.08)]'
                }`}
              >
                {s.num} {s.shortName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE 8 PILLARS (DEEP DIVE DISCIPLINE SECTIONS)
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 divide-y divide-[rgba(18,18,19,0.08)] bg-white">
        {SERVICES_DATA.map((serv, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={serv.id}
              id={`service-${serv.id}`}
              className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Content Column */}
              <div
                className={`space-y-6 ${
                  isEven ? 'lg:col-span-5 lg:order-2' : 'lg:col-span-5 lg:order-1'
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-bold text-lg text-[#1D1D1F]">{serv.num}</span>
                  <span className="text-[rgba(18,18,19,0.2)]">|</span>
                  <span className="px-3 py-1 rounded-full border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] text-[#1D1D1F] font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0859D4]" />
                    <span>{serv.tag}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[#0859D4]/25 bg-[#0859D4]/8 text-[#0859D4] font-bold">
                    Starting at {formatPrice(currency === 'INR' ? serv.tiers[0].priceINR : serv.tiers[0].priceUSD, currency)}
                  </span>
                </div>

                <h2
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight"
                >
                  {serv.name}
                </h2>

                <p className="text-base text-[#424242] leading-relaxed font-normal">
                  {serv.headline}
                </p>

                <div className="p-4 rounded-xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] text-xs text-[#424242]">
                  <strong className="text-[#1D1D1F] block mb-1 uppercase tracking-wider">
                    IDEAL FIT:
                  </strong>
                  <span>{serv.idealFor}</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                  <button
                    onClick={() => scrollToPricingForService(serv.id)}
                    className="btn-onlines-blue py-3 px-6 flex items-center gap-2 cursor-pointer font-bold shadow-sm hover:shadow"
                  >
                    <span>VIEW {serv.shortName.toUpperCase()} TIERS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/contact?service=${serv.id}`}
                    onClick={playClick}
                    className="btn-onlines-outline py-3 px-6 font-bold"
                  >
                    <span>BOOK SPRINT</span>
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>

              {/* Visuals & Key Deliverables Card */}
              <div
                className={`${
                  isEven ? 'lg:col-span-7 lg:order-1' : 'lg:col-span-7 lg:order-2'
                }`}
              >
                <div className="p-6 sm:p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white shadow-sm space-y-6 group">
                  {/* Fixed Aspect Image Preview (16:10, full cover) */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)]">
                    <Image
                      src={serv.image}
                      alt={serv.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    {serv.id === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-[#0859D4] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-xs text-[#5A5A5E] font-bold block mb-3 uppercase tracking-wider">
                      CORE DELIVERABLES INCLUDED:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {serv.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-[#424242] leading-snug"
                        >
                          <Check className="w-4 h-4 text-[#0859D4] flex-shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* =========================================================================
          WHY CLIENTS CHOOSE US (ARCHITECTURAL BENEFIT GRID)
          ========================================================================= */}
      <section className="border-t border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] py-20 px-4 sm:px-8 md:px-12 patron-puntos">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[rgba(18,18,19,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
                THE ADVANTAGE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight">
                Why clients choose us.
              </h2>
            </div>
            <span className="text-xs text-[#5A5A5E] font-semibold uppercase tracking-wider">
              NO JUGGLING MULTIPLE FREELANCERS. ONE DEDICATED STUDIO TEAM.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl border border-[rgba(18,18,19,0.08)] bg-white flex flex-col justify-between shadow-sm hover:border-[#0859D4] transition-colors"
              >
                <div>
                  <span className="text-xs font-bold text-[#0859D4] block mb-3 uppercase tracking-wider">
                    0{idx + 1} // BENEFIT
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#1D1D1F] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#424242] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING PACKAGES & TIERS
          ========================================================================= */}
      <section
        ref={pricingSectionRef}
        id="pricing"
        className="py-20 md:py-28 px-4 sm:px-8 md:px-12 border-t border-[rgba(18,18,19,0.08)] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[rgba(18,18,19,0.08)]">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#0859D4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4]">
                  CLEAR PRICING
                </span>
                <span className="text-[#424242] px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)]">
                  Zero Hidden Fees • 100% IP Ownership
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight">
                Transparent rates.
              </h2>
              <p className="text-sm sm:text-base text-[#424242] mt-2 font-normal">
                Select your service discipline below to review tier options.
              </p>
            </div>

          </div>

          {/* 8 Service Tabs with URL Hash Sync */}
          <div className="flex flex-wrap items-center gap-2 pt-8 pb-10 overflow-x-auto">
            {SERVICES_DATA.map((service) => {
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => handleTabSelect(service.id)}
                  className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#0859D4] text-white shadow-md'
                      : 'bg-[#F5F5F7] text-[#424242] hover:text-[#1D1D1F] hover:border-[#0859D4] border border-[rgba(18,18,19,0.08)]'
                  }`}
                  data-cursor="TAB"
                >
                  <span>{service.num} {service.shortName}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>

          {/* 3 Equal-Height Pricing Cards for the Active Service */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {activeService.tiers.map((tier) => {
              const price = currency === 'INR' ? tier.priceINR : tier.priceUSD;
              const formattedPrice = formatPrice(price, currency);

              return (
                <div
                  key={tier.id}
                  className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-sm relative transition-all bg-white ${
                    tier.isPopular
                      ? 'border-2 border-[#0859D4] shadow-xl ring-2 ring-[#0859D4]/15'
                      : 'border border-[rgba(18,18,19,0.08)] hover:border-[#0859D4]/40'
                  }`}
                >
                  {/* "Most popular" Badge */}
                  {tier.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0859D4] text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md border border-[#0859D4]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Most popular</span>
                    </div>
                  )}

                  <div>
                    {/* Top Tier Meta */}
                    <div className="flex items-center justify-between text-xs mb-3 text-[#5A5A5E]">
                      <span className="font-bold text-[#1D1D1F] uppercase tracking-wider">
                        {tier.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F] font-semibold flex items-center gap-1 border border-[rgba(18,18,19,0.08)]">
                        <Clock className="w-3 h-3 text-[#0859D4]" />
                        <span>{tier.timeline}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] mb-2">
                      {tier.name}
                    </h3>

                    <p className="text-xs text-[#424242] min-h-[36px] mb-6 leading-relaxed">
                      {tier.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="py-5 border-y border-[rgba(18,18,19,0.08)] mb-6">
                      <div className="text-[11px] uppercase tracking-wider text-[#5A5A5E] font-semibold mb-1">
                        Starting at
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight">
                          {formattedPrice}
                        </span>
                        {tier.period && (
                          <span className="text-xs text-[#5A5A5E] font-semibold">
                            / {tier.period}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#5A5A5E] mt-2 italic">
                        Final quote depends on specific project scope.
                      </div>
                    </div>

                    {/* Checklist of Features */}
                    <div className="space-y-3 text-xs mb-8">
                      {tier.inheritsText && (
                        <div className="font-bold text-[#1D1D1F] text-[11px] pb-1 border-b border-[rgba(18,18,19,0.08)] flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-[#0859D4]" />
                          <span>{tier.inheritsText}</span>
                        </div>
                      )}
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[#424242]">
                          <Check className="w-4 h-4 text-[#0859D4] flex-shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier Action Button */}
                  <Link
                    href={`/contact?service=${activeService.id}&tier=${tier.id}`}
                    onClick={playClick}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      tier.isPopular
                        ? 'btn-onlines-blue'
                        : 'btn-onlines-outline'
                    }`}
                    data-cursor="CHOOSE"
                  >
                    <span>Choose {tier.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Note for Meta Ads spend */}
          {activeTab === 'meta-ads' && (
            <div className="mt-6 p-4 rounded-2xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] text-xs text-[#424242] flex items-center gap-2 shadow-sm">
              <span className="text-[#0859D4] font-bold text-sm">ℹ</span>
              <span>
                <strong>Important note:</strong> Ad spend is paid directly by the client to Meta and is separate from our management and creative fees.
              </span>
            </div>
          )}

          {/* =========================================================================
              COMPARE PACKAGES TABLE
              ========================================================================= */}
          <div className="mt-20 pt-12 border-t border-[rgba(18,18,19,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
                  DETAILED BREAKDOWN
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1D1D1F]">
                  Compare {activeService.shortName} packages.
                </h3>
              </div>
              <span className="text-xs text-[#5A5A5E] font-medium uppercase tracking-wider">
                Side-by-side feature comparison
              </span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] sticky top-0 z-10">
                    <th className="p-4 sm:p-5 font-bold text-[#1D1D1F] w-1/4 uppercase tracking-wider">
                      FEATURE / SPEC
                    </th>
                    {comparison.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className={`p-4 sm:p-5 font-extrabold text-sm w-1/4 ${
                          header.includes('Popular')
                            ? 'text-[#0859D4] bg-[#0859D4]/10 border-x border-[rgba(18,18,19,0.08)]'
                            : 'text-[#1D1D1F]'
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(18,18,19,0.08)]">
                  {comparison.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-[#F5F5F7]/80 transition-colors"
                    >
                      <td className="p-4 sm:p-5 font-bold text-[#1D1D1F] bg-[#F5F5F7]/40">
                        {row.feature}
                      </td>
                      {row.tiers.map((val, cIdx) => (
                        <td
                          key={cIdx}
                          className={`p-4 sm:p-5 text-[#424242] leading-relaxed ${
                            cIdx === 1 ? 'bg-[#0859D4]/5 border-x border-[rgba(18,18,19,0.08)] font-medium text-[#1D1D1F]' : ''
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Accordion View */}
            <div className="md:hidden space-y-3">
              <div className="flex rounded-full bg-[#F5F5F7] p-1 border border-[rgba(18,18,19,0.08)] text-xs mb-4">
                {comparison.headers.map((header, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileAccordionTier(idx)}
                    className={`flex-1 py-2 text-center rounded-full font-bold text-[11px] transition-all cursor-pointer ${
                      mobileAccordionTier === idx
                        ? 'bg-[#0859D4] text-white shadow-sm'
                        : 'text-[#424242]'
                    }`}
                  >
                    {header.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white divide-y divide-[rgba(18,18,19,0.08)] text-xs">
                {comparison.rows.map((row, rIdx) => (
                  <div key={rIdx} className="py-3 first:pt-0 last:pb-0">
                    <span className="text-[11px] text-[#5A5A5E] block font-semibold mb-1 uppercase tracking-wider">
                      {row.feature}
                    </span>
                    <p className="text-[#1D1D1F] font-medium leading-relaxed">
                      {row.tiers[mobileAccordionTier]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              STARTUP LAUNCH KIT BANNER (ONLINES DARK BENTO CARD)
              ========================================================================= */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl bg-[#050B14] text-white shadow-2xl relative overflow-hidden border border-[rgba(255,255,255,0.08)]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#0859D4] text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <Zap className="w-3.5 h-3.5" />
                    <span>ALL-IN-ONE BUNDLE</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] border border-white/20">
                    Saves {currency === 'INR' ? '₹10,000' : '$300'}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {STARTUP_LAUNCH_KIT.name}.
                </h3>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl font-normal">
                  {STARTUP_LAUNCH_KIT.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  {STARTUP_LAUNCH_KIT.includes.map((inc, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <span className="font-bold text-[#0859D4] block mb-1">
                        ✓ {inc.title}
                      </span>
                      <p className="text-white/70 text-[11px] leading-relaxed">
                        {inc.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundle Pricing Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white text-[#1D1D1F] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5A5A5E] mb-2">
                    <span className="font-bold uppercase tracking-wider text-[#1D1D1F]">
                      Sprint Turnaround:
                    </span>
                    <span className="font-semibold text-[#0859D4]">{STARTUP_LAUNCH_KIT.timeline}</span>
                  </div>

                  <div className="flex items-baseline gap-3 my-4">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight">
                      {formatPrice(
                        currency === 'INR'
                          ? STARTUP_LAUNCH_KIT.priceINR
                          : STARTUP_LAUNCH_KIT.priceUSD,
                        currency
                      )}
                    </span>
                    <span className="text-sm text-[#71717A] line-through">
                      {formatPrice(
                        currency === 'INR'
                          ? STARTUP_LAUNCH_KIT.originalINR
                          : STARTUP_LAUNCH_KIT.originalUSD,
                        currency
                      )}
                    </span>
                  </div>

                  <p className="text-xs text-[#424242] mb-6 leading-relaxed">
                    Launch your brand, flagship landing page, and acquisition campaign simultaneously with full cross-team alignment.
                  </p>
                </div>

                <Link
                  href="/contact?bundle=startup-kit"
                  onClick={playClick}
                  className="w-full py-4 rounded-full btn-onlines-blue text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  data-cursor="CLAIM"
                >
                  <span>Claim Launch Kit Sprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          A LA CARTE ADD-ONS TABLE
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 md:px-12 border-t border-[rgba(18,18,19,0.08)] bg-[#F5F5F7]">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-10 pb-6 border-b border-[rgba(18,18,19,0.08)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
                CUSTOM SCOPE ADD-ONS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1D1D1F]">
                Sprint Add-ons &amp; Extensions
              </h2>
            </div>
            <span className="text-xs text-[#5A5A5E] font-semibold uppercase tracking-wider">
              Available on any active sprint
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ONS_DATA.map((addon) => {
              const price = currency === 'INR' ? addon.priceINR : addon.priceUSD;
              const displayPrice =
                price === 0 ? addon.unit : `${formatPrice(price, currency)} ${addon.unit}`;

              return (
                <div
                  key={addon.id}
                  className="p-6 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white flex flex-col justify-between shadow-sm hover:border-[#0859D4] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-display text-lg font-bold text-[#1D1D1F]">
                        {addon.name}
                      </h4>
                      <span className="text-xs font-bold text-[#0859D4] px-3 py-1 rounded-full bg-[#0859D4]/10 border border-[#0859D4]/20 flex-shrink-0">
                        {displayPrice}
                      </span>
                    </div>
                    <p className="text-xs text-[#424242] leading-relaxed">
                      {addon.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TERMS & CONDITIONS
          ========================================================================= */}
      <section className="pt-12 pb-6 px-4 sm:px-8 md:px-12 border-t border-[rgba(18,18,19,0.08)] bg-white text-xs">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#1D1D1F] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#0859D4]" />
              <span className="uppercase tracking-wider">
                TRANSPARENT TERMS &amp; PAYMENT CONDITIONS ({COMPANY_LEGAL_NAME})
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[#424242]">
              {TERMS_CONDITIONS.map((term, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#0859D4] font-bold">●</span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION
          ========================================================================= */}
      <section id="faq" className="pt-8 pb-20 px-4 sm:px-8 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D1F]">
              Frequently asked questions.
            </h2>
            <p className="text-xs sm:text-sm text-[#424242] mt-3">
              Clear answers about scope, revisions, ad spend, and delivery.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] overflow-hidden shadow-sm transition-all hover:border-[#0859D4]/40"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setOpenFaq(isOpen ? null : index);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display text-lg font-bold text-[#1D1D1F] hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1D1D1F] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#0859D4]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#424242] leading-relaxed border-t border-[rgba(18,18,19,0.08)] bg-white">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 md:px-12 border-t border-[rgba(18,18,19,0.08)] bg-[#050B14] text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block">
            INITIATE YOUR SPRINT
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Break the template.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
            Ready to build a digital presence that stands out instead of blending in? We review briefs and reply with a transparent quote within 24 hours.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              onClick={playClick}
              className="btn-onlines-blue py-3.5 px-8 text-xs font-bold"
            >
              <span>COMMENCE SPRINT INTAKE</span>
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Marquee separator="✦" />
    </div>
  );
}
