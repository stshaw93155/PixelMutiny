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
  FOUR_PILLARS_SERVICES,
  SERVICES_DATA,
  MONTHLY_RETAINERS,
  GROWTH_PARTNER_BUNDLES,
  STARTUP_LAUNCH_KIT,
  ADD_ONS_DATA,
  TERMS_CONDITIONS,
  FAQ_DATA,
  formatPrice,
  getTierPrice,
  getAddonPrice,
  getLaunchKitPrice,
  getServiceById,
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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Flame,
  Award,
} from 'lucide-react';

const COMPARISON_DATA = {
  'digital-experiences': {
    headers: ['Launch', 'Growth (Most Popular)', 'Scale'],
    rows: [
      {
        feature: 'Scope & Pages',
        tiers: ['Up to 5 custom responsive pages', 'Up to 10 custom pages + dynamic blog', 'E-commerce or complex web apps (15+ pages)'],
      },
      {
        feature: 'Content Management (CMS)',
        tiers: ['Self-serve headless CMS', 'Headless CMS + dynamic resources & collections', 'Enterprise multi-collection CMS & store management'],
      },
      {
        feature: 'Design System & UI/UX',
        tiers: ['Modular component tokens', 'Bespoke Figma design system & responsive views', 'Advanced enterprise design system + interactive prototypes'],
      },
      {
        feature: 'Animations & Interactions',
        tiers: ['Smooth CSS transitions', 'Fluid kinetic micro-animations & scroll interactions', 'Custom interactive WebGL / 3D product showcase'],
      },
      {
        feature: 'SEO & Performance',
        tiers: ['Technical SEO, sitemap & lead forms', 'Technical SEO + Schema markup + speed tuning', 'Programmatic SEO + deep event telemetry + 95+ Vitals'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['2 to 3 weeks', '4 to 5 weeks', '6 to 8 weeks'],
      },
      {
        feature: 'Support & Handover',
        tiers: ['Video walkthrough guide', '14-day hypercare + video documentation', '30-day hypercare + live team training & documentation'],
      },
    ],
  },
  'brand-identity': {
    headers: ['Essential', 'Signature (Most Popular)', 'Complete Identity'],
    rows: [
      {
        feature: 'Logo Scope',
        tiers: ['Primary logo + mark (3 initial directions)', 'Full logo suite (primary, secondary & submarks)', 'Expanded identity system + animated motion mark'],
      },
      {
        feature: 'Brand Guidelines',
        tiers: ['1-page quick PDF reference sheet', 'Multi-page comprehensive PDF + Figma brand book', 'Executive brand manual + positioning narrative deck'],
      },
      {
        feature: 'Creative Assets',
        tiers: ['Color palette & typography hierarchy', '10 editable social media & marketing templates', 'Full stationery, print collateral & 25+ campaign assets'],
      },
      {
        feature: 'Deliverable Formats',
        tiers: ['Vector SVG, PNG & EPS (100% owned)', 'Figma design tokens, SVG, PNG & PDF vectors', 'Complete master vector archive + print-ready CMYK files'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['5 to 7 days', '10 to 14 days', '3 to 4 weeks'],
      },
      {
        feature: 'Revision Rounds',
        tiers: ['2 structured revision rounds', '2 structured revision rounds', '3 revision rounds + 1-on-1 brand strategy sync'],
      },
    ],
  },
  'content-production': {
    headers: ['Starter', 'Creator (Most Popular)', 'Studio'],
    rows: [
      {
        feature: 'Video Edits Volume',
        tiers: ['Up to 4 short-form video edits (<=60s)', 'Up to 8 high-retention video edits', 'Up to 12 video edits + campaign creative assets'],
      },
      {
        feature: 'Captions & Motion',
        tiers: ['Dynamic kinetic subtitles & captions', 'Animated hooks, zooms, callouts & emojis', 'High-end 2D/3D motion graphics + logo stinger'],
      },
      {
        feature: 'Sound Design & SFX',
        tiers: ['Sound leveling & background music', 'Pacing sound design & trending SFX', 'Multi-track audio engineering & dynamic sound effects'],
      },
      {
        feature: 'Deliverable Formats',
        tiers: ['Vertical 9:16 (Reels/Shorts/TikTok)', 'Vertical 9:16 (Reels/Shorts/TikTok)', 'Multi-format (9:16 Vertical + 16:9 Landscape) + 4 banners'],
      },
      {
        feature: 'Raw Footage',
        tiers: ['Supplied by client', 'Supplied by client (B-roll curated)', 'Supplied by client (B-roll & asset library provided)'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['5 to 7 days', '10 to 14 days', '2 to 3 weeks'],
      },
    ],
  },
  'performance-marketing': {
    headers: ['Ad Launch', 'Lead Generation (Most Popular)', 'Growth Performance'],
    rows: [
      {
        feature: 'Service Format',
        tiers: ['One-time launch sprint', 'Monthly ongoing campaign management', 'Multi-campaign scaling & growth management'],
      },
      {
        feature: 'Campaign Funnel Structure',
        tiers: ['Business Manager audit & 2 launch funnels', 'Full-funnel management (TOF to Retargeting)', 'Multi-tier funnel architecture & custom audiences'],
      },
      {
        feature: 'Creative Allowance',
        tiers: ['4 initial static & copy variations', '4 fresh performance creatives refreshed monthly', 'Up to 8 fresh ad creative variants refreshed monthly'],
      },
      {
        feature: 'Tracking & Telemetry',
        tiers: ['Meta Pixel & CAPI verification', 'CAPI + lead event audit & conversion tracking', 'Full attribution audit, GA4 + CRM lead pipeline sync'],
      },
      {
        feature: 'Reporting & Review',
        tiers: ['Launch walkthrough & handover', 'Bi-weekly performance report & ROAS insights', 'Bi-weekly 1-on-1 strategy call + monthly dashboard'],
      },
      {
        feature: 'Meta Ad Spend',
        tiers: ['Paid directly by client to Meta', 'Paid directly by client to Meta', 'Paid directly by client to Meta'],
      },
    ],
  },
};

export default function ServicesPage() {
  const { currency } = useCurrency();
  const [activeTab, setActiveTab] = useState('digital-experiences');
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileAccordionTier, setMobileAccordionTier] = useState(1);
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });
  const { playClick } = useSound();
  const packagesSectionRef = useRef(null);
  const retainersSectionRef = useRef(null);
  const servicesCardsRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Mouse coordinate tracker for patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  // Sync active tab with URL hash on load and hash change, with backward-compatibility for legacy slugs
  useEffect(() => {
    const mapHashToPillar = (hash) => {
      const clean = hash.replace('#', '').toLowerCase();
      if (['digital-experiences', 'brand-identity', 'content-production', 'performance-marketing'].includes(clean)) {
        return clean;
      }
      if (['website', 'landing', 'ui-ux', 'dashboard'].includes(clean)) {
        return 'digital-experiences';
      }
      if (['graphics', 'brand'].includes(clean)) {
        return 'brand-identity';
      }
      if (['video'].includes(clean)) {
        return 'content-production';
      }
      if (['meta-ads'].includes(clean)) {
        return 'performance-marketing';
      }
      return null;
    };

    const handleHash = () => {
      if (typeof window === 'undefined') return;
      const targetPillar = mapHashToPillar(window.location.hash);
      if (targetPillar) {
        setActiveTab(targetPillar);
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

  const scrollToSection = (ref, targetPillarId = null) => {
    playClick();
    if (targetPillarId) {
      setActiveTab(targetPillarId);
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `#${targetPillarId}`);
      }
    }
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeService =
    FOUR_PILLARS_SERVICES.find((s) => s.id === activeTab) || FOUR_PILLARS_SERVICES[0];
  const comparison = COMPARISON_DATA[activeTab] || COMPARISON_DATA['digital-experiences'];

  return (
    <div className="w-full bg-white text-[#0A0F1F] min-h-screen selection:bg-[#1F3FFF] selection:text-white">
      {/* =========================================================================
          01 — HERO SECTION
          One studio. Four ways to grow.
          ========================================================================= */}
      <section
        onMouseMove={handleMouseMove}
        className="relative border-b border-[#E4E6EB] pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-8 md:px-12 bg-white patron-puntos overflow-hidden"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        {/* Subtle Architectural Grid */}
        <div className="grilla-celdas opacity-40 pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1920px] mx-auto relative z-10">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A0F1F]">
                01 // SERVICES &amp; PRICING
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E4E6EB] text-[#5B6275] font-medium">
                Four Pillars · Projects &amp; Retainers
              </span>
            </div>
            <div className="text-xs text-[#5B6275] font-medium flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
              <span>Break the Template. Built Different.</span>
            </div>
          </div>

          {/* Monumental Hero Headline */}
          <h1
            className="font-display font-extrabold tracking-tight text-[#0A0F1F] max-w-5xl"
            style={{
              fontSize: 'clamp(36px, 5.8vw, 76px)',
              lineHeight: 1.05,
            }}
          >
            One studio.{' '}
            <span className="dotted-baseline">
              <span className="brand-highlight">Four ways to grow.</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#5B6275] max-w-3xl mt-6 leading-relaxed font-normal">
            Design, development, content and performance marketing for ambitious brands. Fixed project sprints for building new digital assets, and recurring monthly retainers for predictable, compounding growth.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8 text-xs">
            <button
              onClick={() => scrollToSection(servicesCardsRef)}
              className="btn-onlines-blue py-3.5 px-7 cursor-pointer font-bold tracking-wider uppercase flex items-center gap-2 shadow-sm hover:shadow"
            >
              <span>Explore Services</span>
              <span>↓</span>
            </button>
            <button
              onClick={() => scrollToSection(retainersSectionRef)}
              className="btn-onlines-outline py-3.5 px-7 cursor-pointer font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <span>Monthly Retainers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/contact"
              onClick={playClick}
              className="text-xs text-[#5B6275] hover:text-[#1F3FFF] font-semibold underline underline-offset-4 ml-2"
            >
              Request custom proposal →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — FOUR SERVICE CARDS (BENTO OVERVIEW)
          Quick overview with starting prices & clear pillars
          ========================================================================= */}
      <section
        ref={servicesCardsRef}
        id="overview"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F5F6F8]"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-10 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                02 // CORE CAPABILITIES
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                The Four Pillars.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6275] max-w-md font-medium">
              We separate one-time project sprints from predictable monthly subscriptions so your marketing engine never stalls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_PILLARS_SERVICES.map((pillar) => {
              const startPrice = getTierPrice(pillar.tiers[0], currency);
              const formattedStartPrice = formatPrice(startPrice, currency);
              const isActive = activeTab === pillar.id;

              return (
                <div
                  key={pillar.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-white border flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                    isActive
                      ? 'border-[#1F3FFF] ring-2 ring-[#1F3FFF]/15 shadow-md'
                      : 'border-[#E4E6EB] hover:border-[#1F3FFF]/50'
                  }`}
                >
                  <div>
                    {/* Pillar Meta */}
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="font-bold text-lg text-[#0A0F1F] font-mono">
                        {pillar.num}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1F3FFF]/10 text-[#1F3FFF] font-bold text-[11px] border border-[#1F3FFF]/20">
                        From {formattedStartPrice}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-extrabold text-[#0A0F1F] mb-2">
                      {pillar.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#1F3FFF] uppercase tracking-wider mb-4">
                      {pillar.tag}
                    </p>

                    <p className="text-sm text-[#5B6275] leading-relaxed mb-6">
                      {pillar.idealFor}
                    </p>

                    {/* Key Deliverables Pills */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-[#E4E6EB] text-xs">
                      {pillar.deliverables.slice(0, 3).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-[#5B6275]">
                          <Check className="w-3.5 h-3.5 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E4E6EB] flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => scrollToSection(packagesSectionRef, pillar.id)}
                      className={`w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'btn-onlines-blue'
                          : 'btn-onlines-outline hover:border-[#1F3FFF]'
                      }`}
                    >
                      <span>View 3 Tiers</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 — PROJECT PACKAGES
          Choose your level. Three clearly comparable tiers per service.
          Growth is highlighted as the recommended tier.
          ========================================================================= */}
      <section
        ref={packagesSectionRef}
        id="packages"
        className="py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E4E6EB]">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  03 // ONE-TIME SPRINT PACKAGES
                </span>
                <span className="text-[#5B6275] px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E4E6EB]">
                  Fixed Scope · Defined Milestones · 100% IP Ownership
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0F1F] tracking-tight">
                Choose your level.
              </h2>
              <p className="text-sm sm:text-base text-[#5B6275] mt-2 font-normal max-w-2xl">
                Three clearly defined project packages for each pillar. Select a discipline below to review exact deliverables, turnaround times, and pricing.
              </p>
            </div>
            <div className="text-xs text-[#5B6275] bg-[#F5F6F8] p-3 rounded-xl border border-[#E4E6EB] max-w-xs">
              <strong className="text-[#0A0F1F] block mb-0.5">Need ongoing monthly output?</strong>
              Check out our <button onClick={() => scrollToSection(retainersSectionRef)} className="text-[#1F3FFF] underline font-bold cursor-pointer">Monthly Retainers</button> below instead.
            </div>
          </div>

          {/* 4 Pillar Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-8 pb-10 overflow-x-auto">
            {FOUR_PILLARS_SERVICES.map((pillar) => {
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handleTabSelect(pillar.id)}
                  className={`px-5 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#1F3FFF] text-white shadow-md'
                      : 'bg-[#F5F6F8] text-[#5B6275] hover:text-[#0A0F1F] hover:border-[#1F3FFF] border border-[#E4E6EB]'
                  }`}
                  data-cursor="TAB"
                >
                  <span className="font-mono">{pillar.num}</span>
                  <span>{pillar.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white ml-1" />}
                </button>
              );
            })}
          </div>

          {/* Active Pillar Focus Banner */}
          <div className="mb-10 p-6 rounded-2xl bg-[#F5F6F8] border border-[#E4E6EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#1F3FFF] uppercase block mb-1">
                {activeService.code}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
                {activeService.name} — <span className="text-[#5B6275] font-normal text-lg">{activeService.headline}</span>
              </h3>
            </div>
            <div className="text-xs text-[#5B6275] max-w-md">
              <strong className="text-[#0A0F1F]">Best suited for:</strong> {activeService.idealFor}
            </div>
          </div>

          {/* 3 Tier Pricing Cards for Active Pillar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {activeService.tiers.map((tier) => {
              const price = getTierPrice(tier, currency);
              const formattedPrice = formatPrice(price, currency);

              return (
                <div
                  key={tier.id}
                  className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-sm relative transition-all bg-white ${
                    tier.isPopular
                      ? 'border-2 border-[#1F3FFF] shadow-xl ring-2 ring-[#1F3FFF]/15'
                      : 'border border-[#E4E6EB] hover:border-[#1F3FFF]/40'
                  }`}
                >
                  {/* Growth / Most Popular Highlight Badge */}
                  {tier.isPopular && (
                    <div className="brand-badge-popular absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Tier</span>
                    </div>
                  )}

                  <div>
                    {/* Top Tier Meta */}
                    <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                      <span className="font-bold text-[#0A0F1F] uppercase tracking-wider font-mono">
                        {tier.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#0A0F1F] font-semibold flex items-center gap-1 border border-[#E4E6EB]">
                        <Clock className="w-3 h-3 text-[#1F3FFF]" />
                        <span>{tier.timeline}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0F1F] mb-2">
                      {tier.name}
                    </h3>

                    <p className="text-sm text-[#5B6275] min-h-[40px] mb-6 leading-relaxed">
                      {tier.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="py-5 border-y border-[#E4E6EB] mb-6">
                      <div className="text-[11px] uppercase tracking-wider text-[#5B6275] font-semibold mb-1">
                        Starting at
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                          {formattedPrice}
                        </span>
                        {tier.period && (
                          <span className="text-xs text-[#5B6275] font-semibold">
                            / {tier.period}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#5B6275] mt-2 italic">
                        Fixed project sprint scope. Defined deliverables.
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-3 text-sm mb-8">
                      {tier.inheritsText && (
                        <div className="font-bold text-[#0A0F1F] text-xs pb-1 border-b border-[#E4E6EB] flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-[#1F3FFF]" />
                          <span>{tier.inheritsText}</span>
                        </div>
                      )}
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-[#5B6275]">
                          <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
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

          {/* Performance Marketing Ad Spend Note */}
          {activeTab === 'performance-marketing' && (
            <div className="mt-6 p-4 rounded-2xl border border-[#E4E6EB] bg-[#F5F6F8] text-sm text-[#5B6275] flex items-center gap-2 shadow-sm">
              <span className="text-[#1F3FFF] font-bold text-base">ℹ</span>
              <span>
                <strong>Important pricing rule:</strong> Our fee covers account setup, campaign management, and creative optimization. The client pays Meta advertising spend directly to their Meta Business account.
              </span>
            </div>
          )}

          {/* =========================================================================
              SIDE-BY-SIDE FEATURE COMPARISON TABLE
              ========================================================================= */}
          <div className="mt-20 pt-12 border-t border-[#E4E6EB]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                  DETAILED DELIVERABLE MATRIX
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0F1F]">
                  Compare {activeService.shortName} packages.
                </h3>
              </div>
              <span className="text-xs text-[#5B6275] font-medium uppercase tracking-wider">
                Full side-by-side scope breakdown
              </span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-[#E4E6EB] bg-white shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E4E6EB] bg-[#F5F6F8] sticky top-0 z-10">
                    <th className="p-4 sm:p-5 font-bold text-[#0A0F1F] w-1/4 uppercase tracking-wider">
                      SPECIFICATION / SCOPE
                    </th>
                    {comparison.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className={`p-4 sm:p-5 font-extrabold text-sm w-1/4 ${
                          header.includes('Popular')
                            ? 'text-[#1F3FFF] bg-[#1F3FFF]/10 border-x border-[#E4E6EB]'
                            : 'text-[#0A0F1F]'
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E6EB]">
                  {comparison.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="hover:bg-[#F5F6F8]/80 transition-colors"
                    >
                      <td className="p-4 sm:p-5 font-bold text-[#0A0F1F] bg-[#F5F6F8]/40">
                        {row.feature}
                      </td>
                      {row.tiers.map((val, cIdx) => (
                        <td
                          key={cIdx}
                          className={`p-4 sm:p-5 text-[#5B6275] leading-relaxed text-sm ${
                            cIdx === 1 ? 'bg-[#1F3FFF]/5 border-x border-[#E4E6EB] font-medium text-[#0A0F1F]' : ''
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
              <div className="flex rounded-full bg-[#F5F6F8] p-1 border border-[#E4E6EB] text-xs mb-4">
                {comparison.headers.map((header, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMobileAccordionTier(idx)}
                    className={`flex-1 py-2 text-center rounded-full font-bold text-[11px] transition-all cursor-pointer ${
                      mobileAccordionTier === idx
                        ? 'bg-[#1F3FFF] text-white shadow-sm'
                        : 'text-[#5B6275]'
                    }`}
                  >
                    {header.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-3xl border border-[#E4E6EB] bg-white divide-y divide-[#E4E6EB] text-xs">
                {comparison.rows.map((row, rIdx) => (
                  <div key={rIdx} className="py-3 first:pt-0 last:pb-0">
                    <span className="text-[11px] text-[#5B6275] block font-semibold mb-1 uppercase tracking-wider">
                      {row.feature}
                    </span>
                    <p className="text-[#0A0F1F] font-medium leading-relaxed text-sm">
                      {row.tiers[mobileAccordionTier]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 — MONTHLY RETAINERS
          Your creative team, on subscription.
          3 Standalone Monthly Retainers + Growth Partner Bundles
          ========================================================================= */}
      <section
        ref={retainersSectionRef}
        id="retainers"
        className="py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F5F6F8]"
      >
        <div className="max-w-[1920px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E4E6EB]">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  04 // RECURRING SUBSCRIPTIONS
                </span>
                <span className="text-[#5B6275] px-2.5 py-0.5 rounded-full bg-white border border-[#E4E6EB]">
                  Keep Growing · Predictable Monthly Output
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0F1F] tracking-tight">
                Your creative team, on subscription.
              </h2>
              <p className="text-sm sm:text-base text-[#5B6275] mt-2 font-normal max-w-2xl">
                A website is a one-time project; visual content, dynamic video editing, and performance advertising drive ongoing monthly revenue. Hire our specialized team on a recurring retainer with zero hiring overhead.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-[#5B6275] text-left md:text-right">
              <span className="font-bold text-[#0A0F1F]">Billed monthly in advance</span>
              <span>3-month initial commitment • Transparent quotas</span>
            </div>
          </div>

          {/* 3 Standalone Monthly Retainers */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {MONTHLY_RETAINERS.map((ret) => {
              const displayRange = currency === 'INR' ? ret.priceRangeINR : ret.priceRangeUSD;

              return (
                <div
                  key={ret.id}
                  className="p-8 md:p-10 rounded-3xl bg-white border border-[#E4E6EB] flex flex-col justify-between shadow-sm hover:border-[#1F3FFF] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono font-bold text-sm text-[#1F3FFF]">
                        {ret.num} // RETAINER
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#5B6275] font-semibold text-[11px] border border-[#E4E6EB]">
                        Monthly Retainer
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-extrabold text-[#0A0F1F] mb-2">
                      {ret.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#1F3FFF] mb-3">
                      {ret.tagline}
                    </p>

                    <p className="text-sm text-[#5B6275] mb-6 leading-relaxed">
                      {ret.idealFor}
                    </p>

                    {/* Price Range Banner */}
                    <div className="py-4 px-5 rounded-2xl bg-[#F5F6F8] border border-[#E4E6EB] mb-6">
                      <span className="text-[11px] uppercase tracking-wider text-[#5B6275] font-semibold block">
                        Monthly Fee Range
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0F1F]">
                        {displayRange}
                      </span>
                      <span className="text-[11px] text-[#5B6275] block mt-1">
                        Exact tier tailored to deliverable volume
                      </span>
                    </div>

                    {/* What's Included */}
                    <div className="space-y-2.5 text-xs text-[#5B6275] mb-6">
                      <span className="font-bold text-[#0A0F1F] block uppercase tracking-wider text-[11px] pb-1 border-b border-[#E4E6EB]">
                        Monthly Deliverables Included:
                      </span>
                      {ret.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Scope Boundaries & Exclusions */}
                    <div className="p-4 rounded-xl bg-[#FFF9EB] border border-[#FFE1A6] text-[11px] text-[#8C5D00] space-y-1 mb-6">
                      <strong className="block uppercase tracking-wider text-[10px] text-[#8C5D00]">
                        Scope Boundaries &amp; Rules:
                      </strong>
                      {ret.limits.map((lim, lIdx) => (
                        <div key={lIdx} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{lim}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E4E6EB]">
                    <div className="text-[11px] text-[#5B6275] mb-3 text-center">
                      {ret.terms}
                    </div>
                    <Link
                      href={`/contact?service=${ret.id}`}
                      onClick={playClick}
                      className="w-full py-3.5 rounded-full btn-onlines-blue text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Apply for {ret.shortName}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              GROWTH PARTNER BUNDLES (COMBINED MONTHLY RETAINERS)
              ========================================================================= */}
          <div className="mt-20 pt-16 border-t border-[#E4E6EB]">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                  ALL-IN-ONE GROWTH PARTNERSHIPS
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                  PixelMutiny Growth Partner Bundles.
                </h3>
                <p className="text-sm text-[#5B6275] mt-1 max-w-2xl">
                  Once your brand needs both content production and active customer acquisition, our combined monthly partner plans provide a complete external marketing department.
                </p>
              </div>
              <span className="text-xs text-[#5B6275] font-semibold uppercase tracking-wider">
                Full-Stack Creative + Media Buying
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {GROWTH_PARTNER_BUNDLES.map((bundle) => {
                const feeDisplay = currency === 'INR' ? bundle.feeDisplayINR : bundle.feeDisplayUSD;

                return (
                  <div
                    key={bundle.id}
                    className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-sm relative transition-all bg-white ${
                      bundle.isPopular
                        ? 'border-2 border-[#1F3FFF] shadow-xl ring-2 ring-[#1F3FFF]/15'
                        : 'border border-[#E4E6EB] hover:border-[#1F3FFF]/40'
                    }`}
                  >
                    {bundle.isPopular && (
                      <div className="brand-badge-popular absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-md flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Most Popular Growth Bundle</span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-bold text-[#0A0F1F] uppercase tracking-wider font-mono">
                          PARTNER BUNDLE
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1F3FFF]/10 text-[#1F3FFF] font-bold text-[11px]">
                          Monthly Retainer
                        </span>
                      </div>

                      <h4 className="font-display text-2xl font-extrabold text-[#0A0F1F] mb-1">
                        {bundle.name}
                      </h4>

                      <p className="text-xs font-semibold text-[#1F3FFF] mb-3">
                        {bundle.tagline}
                      </p>

                      <p className="text-sm text-[#5B6275] mb-6 leading-relaxed">
                        {bundle.bestFor}
                      </p>

                      {/* Fee Card */}
                      <div className="py-5 border-y border-[#E4E6EB] mb-6">
                        <span className="text-[11px] uppercase tracking-wider text-[#5B6275] font-semibold block mb-1">
                          Monthly Retainer Fee
                        </span>
                        <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                          {feeDisplay}
                        </span>
                        <span className="text-xs text-[#5B6275] block mt-1">
                          {bundle.terms}
                        </span>
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-2.5 text-xs text-[#5B6275] mb-8">
                        <span className="font-bold text-[#0A0F1F] block uppercase tracking-wider text-[11px] pb-1 border-b border-[#E4E6EB]">
                          Combined Monthly Output:
                        </span>
                        {bundle.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/contact?service=${bundle.id}`}
                      onClick={playClick}
                      className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        bundle.isPopular ? 'btn-onlines-blue' : 'btn-onlines-outline'
                      }`}
                    >
                      <span>Join as {bundle.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              TWO IMPORTANT PRICING RULES (GOVERNANCE CALLOUT)
              ========================================================================= */}
          <div className="mt-16 p-8 rounded-3xl bg-white border border-[#E4E6EB] shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#0A0F1F] font-bold">
              <ShieldCheck className="w-5 h-5 text-[#1F3FFF]" />
              <h4 className="font-display text-lg uppercase tracking-wider">
                Two Non-Negotiable Pricing Rules We Stand By:
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#5B6275]">
              <div className="p-5 rounded-2xl bg-[#F5F6F8] border border-[#E4E6EB]">
                <strong className="text-[#0A0F1F] block font-display text-base mb-2">
                  1. We Do Not Sell &ldquo;Unlimited Output&rdquo;
                </strong>
                <p className="leading-relaxed">
                  Agencies promising unlimited revisions and unlimited requests either produce substandard cookie-cutter work or bottleneck turnaround times. We strictly define the number of pages, creatives, videos, campaigns, and revision rounds for every package so quality remains immaculate.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F5F6F8] border border-[#E4E6EB]">
                <strong className="text-[#0A0F1F] block font-display text-base mb-2">
                  2. We Protect Your Margins &amp; Keep Costs Transparent
                </strong>
                <p className="leading-relaxed">
                  Third-party costs (domain hosting, paid font licenses, proprietary stock footage, and Meta advertising budgets) are never secretly marked up. They are paid directly to providers or explicitly itemized. For complex enterprise needs, we provide bespoke, fixed quotes before work commences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STARTUP LAUNCH KIT BANNER
          The all-in-one bridge bundle
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-8 md:px-12 bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-8 md:p-12 rounded-3xl bg-[#0A0F1F] text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#1F3FFF] text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                    <Zap className="w-3.5 h-3.5" />
                    <span>ALL-IN-ONE LAUNCH SPRINT</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] border border-white/20">
                    Saves {currency === 'INR' ? '₹20,000' : '$250'}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {STARTUP_LAUNCH_KIT.name}.
                </h3>

                <p className="text-sm text-white/80 leading-relaxed max-w-xl font-normal">
                  {STARTUP_LAUNCH_KIT.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  {STARTUP_LAUNCH_KIT.includes.map((inc, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <span className="font-bold text-[#1F3FFF] flex items-center gap-1.5 mb-1">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{inc.title}</span>
                      </span>
                      <p className="text-white/70 text-[11px] leading-relaxed">
                        {inc.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundle Pricing Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white text-[#0A0F1F] flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5B6275] mb-2">
                    <span className="font-bold uppercase tracking-wider text-[#0A0F1F]">
                      Sprint Turnaround:
                    </span>
                    <span className="font-semibold text-[#1F3FFF]">{STARTUP_LAUNCH_KIT.timeline}</span>
                  </div>

                  <div className="flex items-baseline gap-3 my-4">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                      {formatPrice(getLaunchKitPrice(currency).price, currency)}
                    </span>
                    <span className="text-sm text-[#5B6275] line-through">
                      {formatPrice(
                        getLaunchKitPrice(currency).price + getLaunchKitPrice(currency).savings,
                        currency
                      )}
                    </span>
                  </div>

                  <p className="text-sm text-[#5B6275] mb-6 leading-relaxed">
                    Launch your brand identity, conversion landing page, dynamic creative assets, and Meta ads campaign simultaneously under one unified partner.
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
          CUSTOM SCOPE ADD-ONS
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 md:px-12 border-t border-[#E4E6EB] bg-[#F5F6F8]">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-10 pb-6 border-b border-[#E4E6EB] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                CUSTOM SCOPE ADD-ONS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                Sprint Add-ons &amp; Extensions
              </h2>
            </div>
            <span className="text-xs text-[#5B6275] font-semibold uppercase tracking-wider">
              Available on any active sprint or retainer
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADD_ONS_DATA.map((addon) => {
              const price = getAddonPrice(addon, currency);
              const displayPrice =
                price === 0 ? addon.unit : `${formatPrice(price, currency)} ${addon.unit}`;

              return (
                <div
                  key={addon.id}
                  className="p-6 rounded-3xl border border-[#E4E6EB] bg-white flex flex-col justify-between shadow-sm hover:border-[#1F3FFF] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-display text-lg font-bold text-[#0A0F1F]">
                        {addon.name}
                      </h4>
                      <span className="text-xs font-bold text-[#1F3FFF] px-3 py-1 rounded-full bg-[#1F3FFF]/10 border border-[#1F3FFF]/20 flex-shrink-0">
                        {displayPrice}
                      </span>
                    </div>
                    <p className="text-sm text-[#5B6275] leading-relaxed">
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
          FAQ ACCORDION
          ========================================================================= */}
      <section id="faq" className="pt-20 pb-20 px-4 sm:px-8 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F]">
              <span className="brand-highlight">Frequently asked</span> questions.
            </h2>
            <p className="text-sm text-[#5B6275] mt-3">
              Clear answers about scope boundaries, revisions, ad spend, and billing.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E4E6EB] bg-[#F5F6F8] overflow-hidden shadow-sm transition-all hover:border-[#1F3FFF]/40"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setOpenFaq(isOpen ? null : index);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display text-lg font-bold text-[#0A0F1F] hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0A0F1F] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#1F3FFF]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm text-[#5B6275] leading-relaxed border-t border-[#E4E6EB] bg-white">
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
          TERMS & CONDITIONS
          ========================================================================= */}
      <section className="pt-10 pb-16 px-4 sm:px-8 md:px-12 border-t border-[#E4E6EB] bg-[#F5F6F8] text-xs">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-8 rounded-3xl border border-[#E4E6EB] bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#0A0F1F] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#1F3FFF]" />
              <span className="uppercase tracking-wider">
                TRANSPARENT TERMS &amp; PAYMENT CONDITIONS ({COMPANY_LEGAL_NAME})
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#5B6275]">
              {TERMS_CONDITIONS.map((term, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#1F3FFF] font-bold">●</span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          05 — FINAL CTA
          Let's build your next advantage.
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-8 md:px-12 border-t border-[#E4E6EB] bg-[#0A0F1F] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block">
            05 // GET IN TOUCH
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Let&apos;s build your next advantage.
          </h2>
          <p className="text-base text-white/80 leading-relaxed font-normal max-w-2xl mx-auto">
            Ready to break the template? Whether you need a fixed-scope project sprint or an ongoing monthly creative and performance team, we review briefs and provide structured proposals within 24 hours.
          </p>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              onClick={playClick}
              className="btn-onlines-blue py-4 px-8 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              <span>Request a Proposal</span>
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/contact?type=meeting"
              onClick={playClick}
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Book Discovery Call</span>
              <span className="ml-2">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <Marquee separator="✦" />
    </div>
  );
}
