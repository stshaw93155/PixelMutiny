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
  ALL_SERVICES_CATALOGUE,
  FOUR_PILLARS_SERVICES,
  SERVICES_DATA,
  MONTHLY_RETAINERS,
  GROWTH_PARTNER_BUNDLES,
  WEBSITE_BRAND_AUTOMATION_BUNDLES,
  PRIMARY_HERO_OFFERS,
  STANDALONE_PRICES_TABLE,
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
  Table,
} from 'lucide-react';

const COMPARISON_DATA = {
  'digital-experiences': {
    headers: ['Landing Page Launch', 'Business Website Pro (Recommended)', 'Digital Experience Premium'],
    rows: [
      {
        feature: 'Scope & Pages',
        tiers: ['1 responsive landing page (up to 6 sections)', 'Up to 5 custom responsive pages', 'Up to 8 custom pages + CMS (or E-commerce 25+ SKUs)'],
      },
      {
        feature: 'Content Management (CMS)',
        tiers: ['Static high-speed code', 'Basic CMS or markdown blog ready', 'Full headless CMS (dynamic collections & case studies)'],
      },
      {
        feature: 'Design System & UI/UX',
        tiers: ['Tailored high-converting UI', 'Bespoke Figma design system & responsive views', 'Advanced component system + interactive UI flows'],
      },
      {
        feature: 'Form & Lead Workflows',
        tiers: ['Contact form + direct WhatsApp CTA', 'Contact form, WhatsApp + lead notification', 'Custom multi-step inquiry flows + basic CRM sync'],
      },
      {
        feature: 'SEO & Analytics',
        tiers: ['Basic on-page SEO & metadata', 'Technical SEO + GA4 + Search Console', 'Technical SEO foundations + conversion-event tracking'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['7 to 12 business days', '12 to 20 business days', '20 to 30 business days'],
      },
      {
        feature: 'Support & Handover',
        tiers: ['Live deployment & testing', '2 revision rounds + admin handover & training', '3 revision rounds + handover docs & hypercare'],
      },
    ],
  },
  'brand-identity': {
    headers: ['Brand Essentials', 'Brand Identity Pro (Recommended)', 'Complete Brand System'],
    rows: [
      {
        feature: 'Logo Scope',
        tiers: ['Primary logo + 2 logo variations', '2 creative directions + expanded logo suite', 'Master logo system & extended identity language'],
      },
      {
        feature: 'Brand Guidelines',
        tiers: ['Basic usage guidelines sheet', 'Comprehensive brand presentation stylebook (PDF)', 'Full executive brand manual & typography rules'],
      },
      {
        feature: 'Creative & Social Assets',
        tiers: ['Business card + 5 social templates', 'Letterhead, email signature + 10 social templates', 'Stationery + 15 social templates + pitch deck styling'],
      },
      {
        feature: 'Deliverable Formats',
        tiers: ['PNG, JPG, PDF and vector formats (SVG, AI)', 'Full vector suite, brand book PDF & Figma assets', 'Complete master vector archive + print-ready CMYK files'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['7 to 10 business days', '10 to 15 business days', '15 to 25 business days'],
      },
      {
        feature: 'Revision Rounds',
        tiers: ['2 structured revision rounds', '3 structured revision rounds', '3 revision rounds + brand strategy workshop'],
      },
    ],
  },
  'content-production': {
    headers: ['Starter Video Batch', 'Creator Batch (Recommended)', 'Creative Studio Plus'],
    rows: [
      {
        feature: 'Deliverable Output',
        tiers: ['8 short-form video edits (30–60s)', '12 standard short-form video edits', '20 static creatives, 4 carousels + 8 video edits'],
      },
      {
        feature: 'Captions & Motion',
        tiers: ['Dynamic kinetic captions & subtitles', 'Animated hook titles, zooms & visual sound effects', 'High-end motion graphics + campaign creative direction'],
      },
      {
        feature: 'Sound Design & SFX',
        tiers: ['Sound leveling & background audio balance', 'Pacing sound design & trending SFX', 'Multi-track audio engineering & dynamic sound effects'],
      },
      {
        feature: 'Deliverable Formats',
        tiers: ['Vertical 9:16 (Reels/Shorts/TikTok)', 'Vertical 9:16 (Reels/Shorts/TikTok)', 'Multi-format (9:16 Vertical + 16:9 Landscape) + adaptations'],
      },
      {
        feature: 'Footage & Assets',
        tiers: ['Supplied by client', 'Supplied by client (B-roll curated)', 'Supplied by client (creative testing recommendations)'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['5 to 7 business days', '10 to 14 business days (48h per batch)', 'Monthly ongoing delivery & review meeting'],
      },
    ],
  },
  'performance-marketing': {
    headers: ['Ads Launch', 'Performance Growth (Recommended)', 'Performance Partner'],
    rows: [
      {
        feature: 'Advertising Platforms',
        tiers: ['One platform: Meta Ads or Google Ads', 'One primary platform (Meta or Google)', 'Both Meta Ads and Google Ads simultaneously'],
      },
      {
        feature: 'Active Campaigns',
        tiers: ['Up to 2 active campaigns', 'Up to 4 active campaigns', 'Up to 6 active campaigns across platforms'],
      },
      {
        feature: 'Creative Refreshes',
        tiers: ['Initial setup of 4 ad creative variants', 'Up to 4 bespoke ad creatives refreshed monthly', 'Up to 8 ad creative variations refreshed monthly'],
      },
      {
        feature: 'Tracking & Telemetry',
        tiers: ['Pixel, CAPI & conversion verification', 'Conversion tracking review & lead quality checks', 'Full attribution review + landing-page CRO guidance'],
      },
      {
        feature: 'Reporting & Cadence',
        tiers: ['Weekly optimization + monthly report', 'Weekly optimization + monthly review call', 'Weekly optimization + monthly strategy call & audit'],
      },
      {
        feature: 'Ad Spend Allocation',
        tiers: ['Paid directly by client to platform', 'Paid directly by client to platform', 'Paid directly by client to platform'],
      },
    ],
  },
  'crm-automation': {
    headers: ['Automation Starter', 'Lead Automation Pro (Recommended)', 'Business Automation Premium'],
    rows: [
      {
        feature: 'Lead Sources',
        tiers: ['1 lead source (Website form)', 'Up to 2 lead sources (Web form + Meta Lead Ads)', 'Up to 3 agreed business data sources'],
      },
      {
        feature: 'CRM & Pipeline Setup',
        tiers: ['Basic lead status pipeline in CRM/Sheets', 'Configured CRM pipeline & assignment rules', 'Advanced CRM custom fields, pipelines & escalation'],
      },
      {
        feature: 'Workflow Automations',
        tiers: ['1 automated notification workflow', 'Up to 3 automated follow-ups & notifications', 'Up to 5 multi-step workflows & follow-up sequences'],
      },
      {
        feature: 'AI & Advanced Flows',
        tiers: ['Standard webhook routing', 'Email follow-ups & dashboard status', 'Approved AI FAQ / internal-assistance workflow'],
      },
      {
        feature: 'Delivery Timeline',
        tiers: ['5 to 7 business days', '10 to 14 business days', '15 to 20 business days'],
      },
      {
        feature: 'Training & Handover',
        tiers: ['1 training session & testing', 'Testing, staff training & documentation', 'Full integration testing, documentation & staff training'],
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
  const heroOffersRef = useRef(null);
  const packagesSectionRef = useRef(null);
  const retainersSectionRef = useRef(null);
  const bundlesSectionRef = useRef(null);
  const standaloneTableRef = useRef(null);
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

  // Sync active tab with URL hash on load and hash change
  useEffect(() => {
    const mapHashToPillar = (hash) => {
      const clean = hash.replace('#', '').toLowerCase();
      if (['digital-experiences', 'brand-identity', 'content-production', 'performance-marketing', 'crm-automation'].includes(clean)) {
        return clean;
      }
      if (['website', 'landing', 'ui-ux', 'dashboard', 'ecommerce'].includes(clean)) {
        return 'digital-experiences';
      }
      if (['graphics', 'brand', 'branding'].includes(clean)) {
        return 'brand-identity';
      }
      if (['video', 'reels', 'content'].includes(clean)) {
        return 'content-production';
      }
      if (['meta-ads', 'ads', 'marketing'].includes(clean)) {
        return 'performance-marketing';
      }
      if (['automation', 'crm', 'leads'].includes(clean)) {
        return 'crm-automation';
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
    ALL_SERVICES_CATALOGUE.find((s) => s.id === activeTab) || ALL_SERVICES_CATALOGUE[0];
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
        {/* Architectural grid background */}
        <div className="grilla-celdas opacity-40 pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1920px] mx-auto relative z-10">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A0F1F]">
                01 // SERVICES &amp; PRICING CATALOGUE
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E4E6EB] text-[#5B6275] font-medium">
                {COMPANY_LEGAL_NAME}
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
            Strategy-led digital experiences.{' '}
            <span className="dotted-baseline">
              <span className="brand-highlight">Built different.</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#5B6275] max-w-3xl mt-6 leading-relaxed font-normal">
            Strategic branding, high-performance websites, compelling creative production, and connected lead-management workflows. Fixed project packages for launch sprints, and recurring monthly retainers for compounding growth.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8 text-xs">
            <button
              onClick={() => scrollToSection(heroOffersRef)}
              className="btn-onlines-blue py-3.5 px-7 cursor-pointer font-bold tracking-wider uppercase flex items-center gap-2 shadow-sm hover:shadow"
            >
              <span>Featured Hero Offers</span>
              <span>↓</span>
            </button>
            <button
              onClick={() => scrollToSection(packagesSectionRef)}
              className="btn-onlines-outline py-3.5 px-7 cursor-pointer font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <span>All Project Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
          RECOMMENDED HERO SALES OFFERS (SECTION 14 OF CATALOGUE)
          "Lead with three offers, not the entire catalogue."
          ========================================================================= */}
      <section
        ref={heroOffersRef}
        id="hero-offers"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  RECOMMENDED SALES STRATEGY
                </span>
                <span className="text-[#5B6275] px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E4E6EB]">
                  3 High-Conviction Core Offers
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Our Primary Core Offers.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6275] max-w-md font-medium">
              We lead with three focused offerings designed to solve the most critical bottlenecks for modern brands and growing companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PRIMARY_HERO_OFFERS.map((offer) => {
              const price = currency === 'INR' ? offer.priceINR : Math.round(offer.priceUSD);
              const formattedPrice = formatPrice(price, currency);

              return (
                <div
                  key={offer.num}
                  className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-sm relative transition-all bg-white ${
                    offer.isPopular
                      ? 'border-2 border-[#1F3FFF] shadow-xl ring-2 ring-[#1F3FFF]/15'
                      : 'border border-[#E4E6EB] hover:border-[#1F3FFF]/40'
                  }`}
                >
                  {offer.isPopular && (
                    <div className="brand-badge-popular absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-md flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Most Popular Transformation</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                      <span className="font-mono font-bold text-sm text-[#1F3FFF]">
                        {offer.num} // {offer.badge}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#0A0F1F] font-semibold flex items-center gap-1 border border-[#E4E6EB]">
                        <Clock className="w-3 h-3 text-[#1F3FFF]" />
                        <span>{offer.timeline}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0F1F] mb-2">
                      {offer.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#1F3FFF] mb-3">
                      {offer.tagline}
                    </p>

                    <div className="py-5 border-y border-[#E4E6EB] mb-6">
                      <span className="text-[11px] uppercase tracking-wider text-[#5B6275] font-semibold block mb-1">
                        Fixed Project Investment
                      </span>
                      <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                        {formattedPrice}
                      </span>
                      <span className="text-xs text-[#5B6275] block mt-1">
                        50% advance deposit to reserve sprint milestone
                      </span>
                    </div>

                    <p className="text-sm text-[#5B6275] leading-relaxed mb-6">
                      {offer.scope}
                    </p>
                  </div>

                  <Link
                    href={offer.ctaLink}
                    onClick={playClick}
                    className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      offer.isPopular ? 'btn-onlines-blue' : 'btn-onlines-outline hover:border-[#1F3FFF]'
                    }`}
                  >
                    <span>Initiate {offer.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          02 — CORE CAPABILITIES (ALL 5 SPECIALIZATIONS OVERVIEW)
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
                02 // DISCIPLINE ARCHITECTURE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Studio Capabilities &amp; Disciplines.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6275] max-w-md font-medium">
              We separate one-time project sprints from predictable monthly subscriptions so your brand moves at speed without juggling multiple agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {ALL_SERVICES_CATALOGUE.map((pillar) => {
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
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="font-bold text-lg text-[#0A0F1F] font-mono">
                        {pillar.num}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1F3FFF]/10 text-[#1F3FFF] font-bold text-[11px] border border-[#1F3FFF]/20">
                        From {formattedStartPrice}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-extrabold text-[#0A0F1F] mb-1">
                      {pillar.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#1F3FFF] uppercase tracking-wider mb-3">
                      {pillar.tag}
                    </p>

                    <p className="text-xs text-[#5B6275] leading-relaxed mb-6">
                      {pillar.idealFor}
                    </p>

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
                      <span>Explore Tiers</span>
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
          Choose your level. Clearly comparable tiers per service.
          ========================================================================= */}
      <section
        ref={packagesSectionRef}
        id="packages"
        className="py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E4E6EB]">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  03 // FIXED PROJECT PACKAGES
                </span>
                <span className="text-[#5B6275] px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E4E6EB]">
                  Fixed Scope · Defined Deliverables · 100% IP Ownership
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0F1F] tracking-tight">
                Choose your level.
              </h2>
              <p className="text-sm sm:text-base text-[#5B6275] mt-2 font-normal max-w-2xl">
                Structured packages for each core discipline. Select a discipline tab below to review exact deliverable scopes, timelines, and fixed rates.
              </p>
            </div>
            <div className="text-xs text-[#5B6275] bg-[#F5F6F8] p-3 rounded-xl border border-[#E4E6EB] max-w-xs">
              <strong className="text-[#0A0F1F] block mb-0.5">Need ongoing monthly output?</strong>
              Check out our <button onClick={() => scrollToSection(retainersSectionRef)} className="text-[#1F3FFF] underline font-bold cursor-pointer">Monthly Retainers</button> below instead.
            </div>
          </div>

          {/* Discipline Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-8 pb-10 overflow-x-auto">
            {ALL_SERVICES_CATALOGUE.map((pillar) => {
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

          {/* Active Discipline Focus Banner */}
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

          {/* Tier Pricing Cards */}
          <div className={`grid grid-cols-1 gap-6 lg:gap-8 items-stretch ${activeService.tiers.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
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
                  {tier.isPopular && (
                    <div className="brand-badge-popular absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Tier</span>
                    </div>
                  )}

                  <div>
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
                        Fixed project scope. Defined deliverable counts.
                      </div>
                    </div>

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

                  <Link
                    href={`/contact?service=${activeService.id}&tier=${tier.id}`}
                    onClick={playClick}
                    className={`w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      tier.isPopular ? 'btn-onlines-blue' : 'btn-onlines-outline'
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

          {activeTab === 'performance-marketing' && (
            <div className="mt-6 p-4 rounded-2xl border border-[#E4E6EB] bg-[#F5F6F8] text-sm text-[#5B6275] flex items-center gap-2 shadow-sm">
              <span className="text-[#1F3FFF] font-bold text-base">ℹ</span>
              <span>
                <strong>Important pricing rule:</strong> Advertising management fees cover account setup, campaign optimization, and creative refreshes. The client pays ad spend directly to Meta or Google Ads.
              </span>
            </div>
          )}

          {/* Detailed Deliverables Matrix Table */}
          {comparison && (
            <div className="mt-20 pt-12 border-t border-[#E4E6EB]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                    DETAILED DELIVERABLE MATRIX
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0F1F]">
                    Compare {activeService.shortName} tiers.
                  </h3>
                </div>
                <span className="text-xs text-[#5B6275] font-medium uppercase tracking-wider">
                  Side-by-side scope breakdown
                </span>
              </div>

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
                            header.includes('Recommended') || header.includes('Popular')
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
                      <tr key={rIdx} className="hover:bg-[#F5F6F8]/80 transition-colors">
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

              {/* Mobile Table Accordion */}
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
          )}
        </div>
      </section>

      {/* =========================================================================
          04 — MONTHLY RETAINERS & SUBSCRIPTIONS
          ========================================================================= */}
      <section
        ref={retainersSectionRef}
        id="retainers"
        className="py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F5F6F8]"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E4E6EB]">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  04 // RECURRING MONTHLY RETAINERS
                </span>
                <span className="text-[#5B6275] px-2.5 py-0.5 rounded-full bg-white border border-[#E4E6EB]">
                  Keep Growing · Predictable Deliverables
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0A0F1F] tracking-tight">
                Your creative &amp; growth team, on subscription.
              </h2>
              <p className="text-sm sm:text-base text-[#5B6275] mt-2 font-normal max-w-2xl">
                A website is usually a project sprint; recurring visual content, video editing, and advertising management build predictable, compounding growth.
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-[#5B6275] text-left md:text-right">
              <span className="font-bold text-[#0A0F1F]">Billed monthly in advance</span>
              <span>Recommended 3-month commitment • Explicit deliverable caps</span>
            </div>
          </div>

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

          {/* Growth Partner Retainer Bundles (Section 10) */}
          <div className="mt-20 pt-16 border-t border-[#E4E6EB]">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                  SECTION 10 // ONGOING MONTHLY PARTNER PACKAGES
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                  Combined Monthly Retainer Packages.
                </h3>
                <p className="text-sm text-[#5B6275] mt-1 max-w-2xl">
                  For clients who want ongoing multi-channel creative and marketing support after initial project delivery.
                </p>
              </div>
              <span className="text-xs text-[#5B6275] font-semibold uppercase tracking-wider">
                Integrated Digital Retainers
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
                        <span>Most Popular Growth Retainer</span>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-bold text-[#0A0F1F] uppercase tracking-wider font-mono">
                          SECTION 10 RETAINER
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1F3FFF]/10 text-[#1F3FFF] font-bold text-[11px]">
                          Monthly
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

                      <div className="py-5 border-y border-[#E4E6EB] mb-6">
                        <span className="text-[11px] uppercase tracking-wider text-[#5B6275] font-semibold block mb-1">
                          Monthly Fee
                        </span>
                        <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                          {feeDisplay}
                        </span>
                        <span className="text-xs text-[#5B6275] block mt-1">
                          {bundle.terms}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs text-[#5B6275] mb-8">
                        <span className="font-bold text-[#0A0F1F] block uppercase tracking-wider text-[11px] pb-1 border-b border-[#E4E6EB]">
                          Deliverables Included:
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
                      <span>Apply for {bundle.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — WEBSITE + BRANDING + AUTOMATION BUNDLES
          One-time bundled packages for complete project execution
          ========================================================================= */}
      <section
        ref={bundlesSectionRef}
        id="bundles"
        className="py-20 md:py-28 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                SECTION 09 // ONE-TIME SPRINT BUNDLES
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Website + Branding + Automation Bundles.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6275] max-w-md font-medium">
              Bundled offers for founders and businesses who want one unified studio to coordinate the entire digital architecture from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {WEBSITE_BRAND_AUTOMATION_BUNDLES.map((bundle) => {
              const price = currency === 'INR' ? bundle.priceINR : Math.round(bundle.priceUSD);
              const formattedPrice = formatPrice(price, currency);

              return (
                <div
                  key={bundle.id}
                  className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-sm relative transition-all bg-white ${
                    bundle.isHeroOffer
                      ? 'border-2 border-[#1F3FFF] shadow-xl ring-2 ring-[#1F3FFF]/15'
                      : 'border border-[#E4E6EB] hover:border-[#1F3FFF]/40'
                  }`}
                >
                  {bundle.isHeroOffer && (
                    <div className="brand-badge-popular absolute -top-3.5 left-1/2 -translate-x-1/2 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Bundle</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                      <span className="font-mono font-bold text-sm text-[#1F3FFF]">
                        {bundle.num} // ONE-TIME SPRINT
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5F6F8] text-[#0A0F1F] font-semibold flex items-center gap-1 border border-[#E4E6EB]">
                        <Clock className="w-3 h-3 text-[#1F3FFF]" />
                        <span>{bundle.timeline}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0A0F1F] mb-1">
                      {bundle.name}
                    </h3>

                    <p className="text-xs font-semibold text-[#1F3FFF] mb-3">
                      {bundle.tagline}
                    </p>

                    <p className="text-sm text-[#5B6275] mb-6 leading-relaxed">
                      {bundle.bestFor}
                    </p>

                    <div className="py-5 border-y border-[#E4E6EB] mb-6">
                      <span className="text-[11px] uppercase tracking-wider text-[#5B6275] font-semibold block mb-1">
                        Fixed Project Package
                      </span>
                      <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                        {formattedPrice}
                      </span>
                      <span className="text-xs text-[#5B6275] block mt-1">
                        {bundle.terms}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#5B6275] mb-8">
                      <span className="font-bold text-[#0A0F1F] block uppercase tracking-wider text-[11px] pb-1 border-b border-[#E4E6EB]">
                        Package Deliverables:
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
                    href={`/contact?bundle=${bundle.id}`}
                    onClick={playClick}
                    className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      bundle.isHeroOffer ? 'btn-onlines-blue' : 'btn-onlines-outline hover:border-[#1F3FFF]'
                    }`}
                  >
                    <span>Claim {bundle.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — STANDALONE SERVICE PRICE LIST TABLE
          ========================================================================= */}
      <section
        ref={standaloneTableRef}
        id="standalone-prices"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F5F6F8]"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-10 pb-6 border-b border-[#E4E6EB] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                SECTION 11 // A LA CARTE PRICE LIST
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                Standalone Service Price Index
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B6275] max-w-md">
              Starting prices for individual project components. Scopes are quoted based on complexity, urgency, and asset readiness.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#E4E6EB] bg-white shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E4E6EB] bg-[#F5F6F8]">
                  <th className="p-4 sm:p-5 font-bold text-[#0A0F1F] uppercase tracking-wider">
                    SERVICE DISCIPLINE / COMPONENT
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-[#0A0F1F] uppercase tracking-wider text-right">
                    STARTING PRICE ({currency})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E6EB]">
                {STANDALONE_PRICES_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F5F6F8]/80 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-[#0A0F1F]">
                      {row.service}
                    </td>
                    <td className="p-4 sm:p-5 font-mono font-bold text-[#1F3FFF] text-right text-sm">
                      {currency === 'INR' ? row.startingPriceINR : row.startingPriceUSD}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOM SCOPE ADD-ONS
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white">
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-10 pb-6 border-b border-[#E4E6EB] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
                CUSTOM SCOPE ADD-ONS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]">
                Sprint Add-ons &amp; Modular Extensions
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
                  className="p-6 rounded-3xl border border-[#E4E6EB] bg-[#F5F6F8] flex flex-col justify-between shadow-sm hover:border-[#1F3FFF] transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-display text-base font-bold text-[#0A0F1F]">
                        {addon.name}
                      </h4>
                      <span className="text-xs font-bold text-[#1F3FFF] px-3 py-1 rounded-full bg-[#1F3FFF]/10 border border-[#1F3FFF]/20 flex-shrink-0 font-mono">
                        {displayPrice}
                      </span>
                    </div>
                    <p className="text-xs text-[#5B6275] leading-relaxed">
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
      <section id="faq" className="pt-20 pb-20 px-4 sm:px-8 md:px-12 bg-[#F5F6F8]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F]">
              <span className="brand-highlight">Frequently asked</span> questions.
            </h2>
            <p className="text-sm text-[#5B6275] mt-3">
              Clear answers about scope boundaries, milestones, ad spend, and delivery rules.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E4E6EB] bg-white overflow-hidden shadow-sm transition-all hover:border-[#1F3FFF]/40"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setOpenFaq(isOpen ? null : index);
                    }}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-display text-lg font-bold text-[#0A0F1F] hover:bg-[#F5F6F8]/50 transition-colors cursor-pointer"
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
          SECTION 12 & 13 — COMMERCIAL TERMS & PROFIT PROTECTION
          ========================================================================= */}
      <section className="pt-12 pb-16 px-4 sm:px-8 md:px-12 border-t border-[#E4E6EB] bg-white text-xs">
        <div className="max-w-[1920px] mx-auto">
          <div className="p-8 rounded-3xl border border-[#E4E6EB] bg-[#F5F6F8] shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#0A0F1F] font-bold">
              <ShieldCheck className="w-5 h-5 text-[#1F3FFF]" />
              <span className="uppercase tracking-wider font-display text-sm">
                COMMERCIAL TERMS, PAYMENT MILESTONES &amp; PROFIT PROTECTION ({COMPANY_LEGAL_NAME})
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-[#5B6275]">
              {TERMS_CONDITIONS.map((term, i) => (
                <div key={i} className="flex items-start gap-2 bg-white p-4 rounded-2xl border border-[#E4E6EB]">
                  <span className="text-[#1F3FFF] font-bold">●</span>
                  <span className="text-xs leading-relaxed">{term}</span>
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
