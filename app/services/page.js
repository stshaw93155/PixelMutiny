'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSound } from '../components/SoundManager';
import { useCurrency } from '../components/useCurrency';
import { useReducedMotion } from '@/lib/motion';
import {
  formatPrice,
  COMPANY_LEGAL_NAME,
} from '../../data/pricing';
import { PROJECTS } from '../data/projects';
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
  Flame,
  FileText,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

export default function ServicesPage() {
  const { currency } = useCurrency();
  const [openFaq, setOpenFaq] = useState(0);
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });
  const { playClick } = useSound();
  const reducedMotion = useReducedMotion();

  // Mouse coordinate tracker for patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  // Helper for localized pricing
  const displayPrice = (inr, usd) => {
    if (currency === 'INR') {
      return formatPrice(inr, 'INR');
    }
    return formatPrice(usd, 'USD');
  };

  // Select 3 featured projects for portfolio showcase
  const featuredProjects = [
    {
      id: 'veyra-legal',
      name: 'Veyra Legal',
      designation: 'Flagship Digital Platform',
      category: 'Corporate Advisory Flagship',
      challenge:
        'An elite corporate law firm handling high-stakes cross-border transactions had an outdated web presence that failed to convey their institutional authority and precision.',
      solution:
        'We architected a juristic-inspired digital flagship in Next.js with interactive deal dossiers, private consultation inquiry flows, and sub-second performance.',
      image: '/projects/veyra-legal.png',
      slug: 'veyra-legal',
    },
    {
      id: 'flow-task',
      name: 'FlowTask',
      designation: 'Enterprise Product Systems',
      category: 'Intelligent Workspace Platform',
      challenge:
        'Distributed engineering teams were juggling separate apps for sprint planning, resource tracking, and documentation, causing operational friction and lost velocity.',
      solution:
        'We designed and built an ultra-fast Next.js platform with zero-latency state hydration, intuitive drag-and-drop boards, and keyboard-first shortcut navigation.',
      image: '/projects/flow-task.jpg',
      slug: 'flow-task',
    },
    {
      id: 'krono-pay',
      name: 'Krono Pay',
      designation: 'Independent Design Exploration',
      category: 'Fintech Landing & 3D Assets',
      challenge:
        'Competing against established payment processors with generic web templates that failed to convey technical differentiation and developer trust.',
      solution:
        'We crafted liquid chrome 3D interactive assets, dynamic transaction fee calculators, transparent API documentation tabs, and responsive checkout flows.',
      image: '/projects/krono-pay.jpg',
      slug: 'krono-pay',
    },
  ];

  // 6 Curated FAQs matching the brief exactly
  const FAQS = [
    {
      q: 'What types of businesses do you work with?',
      a: 'We work with businesses looking to improve their brand identity, website, digital marketing and lead-management processes. Project suitability depends on the requirements and available scope.',
    },
    {
      q: 'How much does a project cost?',
      a: `Projects start from ${displayPrice(24999, 300)} for focused landing pages. Larger websites, branding engagements and integrated digital projects are priced according to scope.`,
    },
    {
      q: 'How long does a project take?',
      a: 'Timelines depend on the deliverables and complexity. A focused landing page may take around one to two weeks, while larger websites and integrated projects require more time.',
    },
    {
      q: 'What is included in the quoted price?',
      a: 'Each proposal defines the deliverables, revisions, timeline, payment schedule and exclusions before work begins.',
    },
    {
      q: 'Do you provide ongoing support?',
      a: 'Yes. We offer maintenance, creative subscriptions, marketing retainers and agreed CRM support.',
    },
    {
      q: 'How do we get started?',
      a: "Share your business, requirements, goals and timeline through our project inquiry form. We'll review the information and determine the next steps.",
    },
  ];

  return (
    <div className="w-full bg-white text-[#0A0F1F] min-h-screen selection:bg-[#1F3FFF] selection:text-white">
      {/* =========================================================================
          SECTION 1 — HERO
          Strategy-led digital experiences. Built different.
          ========================================================================= */}
      <section
        onMouseMove={handleMouseMove}
        className="relative border-b border-[#E4E6EB] pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-8 md:px-12 bg-white patron-puntos overflow-hidden"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        <div className="grilla-celdas opacity-35 pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1920px] mx-auto relative z-10">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0A0F1F]">
                01 // STUDIO SERVICES
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
              fontSize: 'clamp(36px, 5.6vw, 74px)',
              lineHeight: 1.05,
            }}
          >
            Strategy-led digital experiences.{' '}
            <span className="dotted-baseline">
              <span className="brand-highlight">Built different.</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#5B6275] max-w-3xl mt-6 leading-relaxed font-normal">
            We build distinctive brands, high-performing websites and connected digital systems that help ambitious businesses grow.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8 text-xs">
            <Link
              href="/contact"
              onClick={playClick}
              className="btn-onlines-blue py-3.5 px-7 cursor-pointer font-bold tracking-wider uppercase flex items-center gap-2 shadow-sm hover:shadow"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/works"
              onClick={playClick}
              className="btn-onlines-outline py-3.5 px-7 cursor-pointer font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — OUR PRIMARY CORE OFFERS
          Exactly 3 high-conviction cards:
          1. Business Website Pro (₹49,999)
          2. Brand & Growth (₹99,999) [Featured]
          3. Lead Automation Pro (₹34,999)
          ========================================================================= */}
      <section
        id="core-offers"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  02 // CORE COMMERCIAL OFFERS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Primary Core Offers
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              Three focused commercial entry points engineered for immediate clarity, rapid execution and measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Business Website Pro */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275]">
                    01 // DIGITAL FLAGSHIP
                  </span>
                  <span className="text-xs font-bold text-[#1F3FFF] bg-[#1F3FFF]/5 px-2.5 py-1 rounded-full border border-[#1F3FFF]/15">
                    Fixed Scope
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-2">
                  Business Website Pro
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(49999, 600)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    One-time fixed investment
                  </span>
                </div>
                <p className="text-sm text-[#5B6275] leading-relaxed mb-6">
                  A professional, responsive website designed to establish credibility and turn visitors into inquiries.
                </p>

                <div className="pt-5 border-t border-[#E4E6EB] mb-6">
                  <span className="text-xs font-bold text-[#0A0F1F] uppercase tracking-wider block mb-3">
                    Includes:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Up to five custom responsive pages</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Custom responsive design &amp; typography system</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Contact form and WhatsApp integration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Basic SEO foundations &amp; metadata</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Analytics setup (GA4 &amp; Search Console)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Two revision rounds + admin handover</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=web-business-pro"
                onClick={playClick}
                className="w-full btn-onlines-outline py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Website Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Brand & Growth (Featured Offer) */}
            <div className="relative border-2 border-[#1F3FFF] rounded-2xl p-7 bg-[#1F3FFF]/[0.02] flex flex-col justify-between shadow-lg shadow-[#1F3FFF]/5">
              <div className="absolute -top-3 left-7 bg-[#1F3FFF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular System
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F3FFF]">
                    02 // BRAND + DIGITAL + CREATIVE
                  </span>
                  <span className="text-xs font-bold text-[#1F3FFF] bg-[#1F3FFF]/10 px-2.5 py-1 rounded-full border border-[#1F3FFF]/20">
                    Turnkey Package
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-2">
                  Brand &amp; Growth
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(99999, 1200)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    One-time fixed investment
                  </span>
                </div>
                <p className="text-sm text-[#5B6275] leading-relaxed mb-6">
                  A cohesive brand identity and digital presence for businesses ready to present themselves professionally.
                </p>

                <div className="pt-5 border-t border-[#E4E6EB] mb-6">
                  <span className="text-xs font-bold text-[#0A0F1F] uppercase tracking-wider block mb-3">
                    Includes:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#0A0F1F]">
                    <li className="flex items-start gap-2.5 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Brand Identity Pro (Logo, stylebook &amp; collateral)</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Website up to five custom responsive pages</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Ten launch social media creatives</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Four short-form video edits with dynamic audio</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>One basic lead-capture workflow &amp; notifications</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Analytics setup (GA4 &amp; Meta Pixel)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=bundle-brand-growth"
                onClick={playClick}
                className="w-full btn-onlines-blue py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Brand &amp; Growth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Lead Automation Pro */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275]">
                    03 // REVENUE PIPELINE
                  </span>
                  <span className="text-xs font-bold text-[#1F3FFF] bg-[#1F3FFF]/5 px-2.5 py-1 rounded-full border border-[#1F3FFF]/15">
                    Pipeline Engine
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-2">
                  Lead Automation Pro
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(34999, 425)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    One-time fixed investment
                  </span>
                </div>
                <p className="text-sm text-[#5B6275] leading-relaxed mb-6">
                  Connect incoming leads, organise your sales pipeline and reduce manual follow-up.
                </p>

                <div className="pt-5 border-t border-[#E4E6EB] mb-6">
                  <span className="text-xs font-bold text-[#0A0F1F] uppercase tracking-wider block mb-3">
                    Includes:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>CRM pipeline configuration &amp; lead stages</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Up to two agreed lead sources (Web + Ads)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Up to three automated workflow sequences</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Instant email &amp; team notification routing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Basic pipeline performance dashboard</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Testing, validation &amp; team handover</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=lead-automation-pro"
                onClick={playClick}
                className="w-full btn-onlines-outline py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Automation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — STUDIO CAPABILITIES & DISCIPLINES
          Exactly 4 concise categories without package pricing:
          01. Brand Identity
          02. Digital Experiences
          03. Creative & Growth
          04. CRM & Automation
          ========================================================================= */}
      <section
        id="capabilities"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F8FAFC]"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  03 // CORE CAPABILITIES
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Studio Capabilities &amp; Disciplines
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              Comprehensive creative, technical, and marketing capabilities delivered through senior-led execution sprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01. Brand Identity */}
            <div className="border border-[#E4E6EB] rounded-2xl p-6 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1F3FFF]/10 text-[#1F3FFF] flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-[#5B6275] uppercase tracking-wider mb-1">
                  01 // IDENTITY
                </div>
                <h3 className="font-display text-xl font-bold text-[#0A0F1F] mb-3">
                  Brand Identity
                </h3>
                <p className="text-xs text-[#5B6275] leading-relaxed mb-6">
                  Build a recognisable brand through strategic positioning, visual identity and consistent brand systems.
                </p>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <span className="text-[11px] font-bold text-[#0A0F1F] uppercase tracking-wider block mb-2.5">
                    Disciplines:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5B6275]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Brand strategy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Logo and visual identity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Brand guidelines</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Business collateral</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=brand-identity"
                onClick={playClick}
                className="text-xs font-bold text-[#1F3FFF] hover:text-[#1631CC] flex items-center gap-1.5 group pt-2"
              >
                <span>Inquire Brand Identity</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 02. Digital Experiences */}
            <div className="border border-[#E4E6EB] rounded-2xl p-6 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1F3FFF]/10 text-[#1F3FFF] flex items-center justify-center mb-5">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-[#5B6275] uppercase tracking-wider mb-1">
                  02 // WEB &amp; PRODUCT
                </div>
                <h3 className="font-display text-xl font-bold text-[#0A0F1F] mb-3">
                  Digital Experiences
                </h3>
                <p className="text-xs text-[#5B6275] leading-relaxed mb-6">
                  Create responsive websites and digital experiences designed around your customers and business goals.
                </p>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <span className="text-[11px] font-bold text-[#0A0F1F] uppercase tracking-wider block mb-2.5">
                    Disciplines:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5B6275]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Website design and development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Landing pages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>CMS websites</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>E-commerce experiences</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=digital-experiences"
                onClick={playClick}
                className="text-xs font-bold text-[#1F3FFF] hover:text-[#1631CC] flex items-center gap-1.5 group pt-2"
              >
                <span>Inquire Websites</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 03. Creative & Growth */}
            <div className="border border-[#E4E6EB] rounded-2xl p-6 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1F3FFF]/10 text-[#1F3FFF] flex items-center justify-center mb-5">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-[#5B6275] uppercase tracking-wider mb-1">
                  03 // CREATIVE &amp; MEDIA
                </div>
                <h3 className="font-display text-xl font-bold text-[#0A0F1F] mb-3">
                  Creative &amp; Growth
                </h3>
                <p className="text-xs text-[#5B6275] leading-relaxed mb-6">
                  Create consistent brand communication and campaigns across the channels that matter.
                </p>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <span className="text-[11px] font-bold text-[#0A0F1F] uppercase tracking-wider block mb-2.5">
                    Disciplines:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5B6275]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Social media creative production</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Video editing &amp; reels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Social media management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Paid advertising and SEO</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=creative-production"
                onClick={playClick}
                className="text-xs font-bold text-[#1F3FFF] hover:text-[#1631CC] flex items-center gap-1.5 group pt-2"
              >
                <span>Inquire Creative &amp; Growth</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 04. CRM & Automation */}
            <div className="border border-[#E4E6EB] rounded-2xl p-6 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1F3FFF]/10 text-[#1F3FFF] flex items-center justify-center mb-5">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold text-[#5B6275] uppercase tracking-wider mb-1">
                  04 // AUTOMATION &amp; WORKFLOW
                </div>
                <h3 className="font-display text-xl font-bold text-[#0A0F1F] mb-3">
                  CRM &amp; Automation
                </h3>
                <p className="text-xs text-[#5B6275] leading-relaxed mb-6">
                  Connect lead sources and business tools to make sales workflows more organised and efficient.
                </p>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <span className="text-[11px] font-bold text-[#0A0F1F] uppercase tracking-wider block mb-2.5">
                    Disciplines:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5B6275]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>CRM implementation &amp; pipelines</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Lead capture &amp; routing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Email automation &amp; sequences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1F3FFF]" />
                      <span>Custom business workflows</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=crm-automation"
                onClick={playClick}
                className="text-xs font-bold text-[#1F3FFF] hover:text-[#1631CC] flex items-center gap-1.5 group pt-2"
              >
                <span>Inquire Automation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — SELECTED WORK / PORTFOLIO
          A closer look at the thinking, design and execution behind our digital work.
          3 featured projects with challenge, solution & link to case studies.
          ========================================================================= */}
      <section
        id="selected-work"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  04 // PROOF OF CRAFT
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Selected Work
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              A closer look at the thinking, design and execution behind our digital work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group border border-[#E4E6EB] rounded-2xl overflow-hidden bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-lg"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative aspect-[16/10] bg-[#0A0F1F] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A0F1F]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                      {project.designation}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="text-[11px] font-bold text-[#1F3FFF] uppercase tracking-wider mb-1">
                      {project.category}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-4">
                      {project.name}
                    </h3>

                    <div className="space-y-3 text-xs text-[#5B6275]">
                      <div>
                        <span className="font-bold text-[#0A0F1F] block mb-1">
                          Original Challenge:
                        </span>
                        <p className="leading-relaxed">{project.challenge}</p>
                      </div>
                      <div>
                        <span className="font-bold text-[#0A0F1F] block mb-1">
                          Our Solution:
                        </span>
                        <p className="leading-relaxed">{project.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/works/${project.slug}`}
                    onClick={playClick}
                    className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Full Portfolio */}
          <div className="mt-12 text-center">
            <Link
              href="/works"
              onClick={playClick}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0A0F1F] hover:text-[#1F3FFF] uppercase tracking-wider border-b border-[#0A0F1F] hover:border-[#1F3FFF] pb-1 transition-colors"
            >
              <span>Explore All Case Studies &amp; Work Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — CHOOSE YOUR LEVEL / COMPACT WEBSITE PRICING
          Heading: Clear Scope. Thoughtful Execution.
          3 compact cards: Launch, Growth, Premium + e-commerce note + CTA
          ========================================================================= */}
      <section
        id="website-pricing"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F8FAFC]"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  05 // WEBSITE TIERS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Clear Scope. Thoughtful Execution.
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              Choose a starting point that fits your business. Every engagement is scoped around your requirements, goals and delivery needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
            {/* Launch Tier */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275]">
                    01 // LAUNCH
                  </span>
                  <span className="text-[11px] font-medium text-[#5B6275]">
                    7–12 Days
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Launch
                </h3>
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0F1F]">
                    Starting at {displayPrice(24999, 300)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Focused landing page build
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>One focused landing page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Responsive design across mobile, tablet &amp; desktop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Contact form or WhatsApp CTA integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Basic SEO metadata &amp; analytics setup</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=web-landing-launch"
                onClick={playClick}
                className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Explore Launch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Growth Tier (Recommended) */}
            <div className="relative border-2 border-[#1F3FFF] rounded-2xl p-7 bg-white flex flex-col justify-between shadow-md">
              <div className="absolute -top-3 left-7 bg-[#1F3FFF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Recommended
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F3FFF]">
                    02 // GROWTH
                  </span>
                  <span className="text-[11px] font-medium text-[#5B6275]">
                    12–20 Days
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Growth
                </h3>
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0F1F]">
                    Starting at {displayPrice(49999, 600)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Complete 5-page business presence
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#0A0F1F]">
                    <li className="flex items-start gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Website up to five custom responsive pages</span>
                    </li>
                    <li className="flex items-start gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Custom responsive design in Figma &amp; Next.js</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Contact forms, WhatsApp &amp; lead notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Basic SEO foundations, GA4 &amp; Search Console</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=web-business-pro"
                onClick={playClick}
                className="w-full btn-onlines-blue py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Explore Growth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275]">
                    03 // PREMIUM
                  </span>
                  <span className="text-[11px] font-medium text-[#5B6275]">
                    20–30 Days
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Premium
                </h3>
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0F1F]">
                    Starting at {displayPrice(89999, 1100)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Bespoke web platform with CMS
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Website up to eight custom pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>CMS or blog functionality for self-serve updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Agreed CRM integration &amp; custom inquiry flows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Expanded testing, documentation &amp; handover</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=web-experience-premium"
                onClick={playClick}
                className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Explore Premium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* E-Commerce Note & Proposal CTA */}
          <div className="p-6 rounded-2xl bg-white border border-[#E4E6EB] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#5B6275] text-center md:text-left">
              <span className="font-bold text-[#0A0F1F] block text-sm mb-0.5">
                Custom Web Architecture &amp; E-Commerce
              </span>
              E-commerce storefronts, complex integrations and custom functionality are quoted according to scope.
            </div>
            <Link
              href="/contact?subject=custom-website-proposal"
              onClick={playClick}
              className="btn-onlines-blue py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider flex-shrink-0 flex items-center gap-2"
            >
              <span>Need Something Custom? Request a Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — CREATIVE & GROWTH SERVICES (SUBSCRIPTIONS)
          Heading: Your Creative & Growth Team, On Subscription.
          Consolidated 3 options:
          1. Creative Support (₹24,999/mo)
          2. Growth Partner (₹44,999/mo)
          3. Digital Experience Partner (₹74,999/mo)
          ========================================================================= */}
      <section
        id="subscriptions"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  06 // MONTHLY PARTNERSHIPS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Your Creative &amp; Growth Team, On Subscription.
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              Ongoing creative production and digital support for businesses that need consistent execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-6">
            {/* Creative Support */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275] mb-2">
                  01 // CREATIVE SUPPORT
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Creative Support
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(24999, 300)}
                    <span className="text-xs text-[#5B6275] font-normal"> / month</span>
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Consistent design &amp; marketing assets
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Up to 12 static creatives per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Two high-converting carousel graphics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Monthly content calendar &amp; sequencing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Caption and CTA suggestions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=creative-support"
                onClick={playClick}
                className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Subscribe to Creative Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Growth Partner (Recommended) */}
            <div className="relative border-2 border-[#1F3FFF] rounded-2xl p-7 bg-white flex flex-col justify-between shadow-md">
              <div className="absolute -top-3 left-7 bg-[#1F3FFF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Recommended Partner
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F3FFF] mb-2 pt-1">
                  02 // GROWTH PARTNER
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Growth Partner
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(44999, 550)}
                    <span className="text-xs text-[#5B6275] font-normal"> / month</span>
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Creative + video editing + channel growth
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#0A0F1F]">
                    <li className="flex items-start gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Up to 16 static creatives per month</span>
                    </li>
                    <li className="flex items-start gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Four short-form video edits per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Content calendar and scheduling support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Agreed channel support and monthly review</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=growth-partner"
                onClick={playClick}
                className="w-full btn-onlines-blue py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Start Growth Partnership</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Digital Experience Partner */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275] mb-2">
                  03 // EXPERIENCE PARTNER
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Digital Experience Partner
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(74999, 900)}
                    <span className="text-xs text-[#5B6275] font-normal"> / month</span>
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Creative, video, web updates &amp; CRM oversight
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Up to 20 static creatives per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Eight short-form video edits per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Agreed website maintenance &amp; content updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>CRM workflow monitoring &amp; monthly review</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=digital-experience-partner"
                onClick={playClick}
                className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Join as Experience Partner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="text-[11px] text-[#5B6275] text-center max-w-2xl mx-auto">
            These packages cover agreed monthly sprint allocations with defined turnaround milestones. They do not imply unlimited requests, indefinite revisions, or unmonitored scope creep.
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — WEBSITE + BRANDING + AUTOMATION BUNDLES
          Heading: One Partner. A More Connected Digital Presence.
          3 compact cards:
          1. Business Launch (₹59,999)
          2. Brand & Growth (₹99,999)
          3. Digital Business Premium (₹1,49,999)
          ========================================================================= */}
      <section
        id="bundles"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-[#F8FAFC]"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  07 // INTEGRATED BUNDLES
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                One Partner. A More Connected Digital Presence.
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              Combine branding, web development and automation in a coordinated engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Business Launch */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275] mb-2">
                  BUNDLE 01 // FOUNDATION
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Business Launch
                </h3>
                <div className="mb-3">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(59999, 750)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Best for new businesses establishing credibility
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Brand Essentials (Logo, palette &amp; typography)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Website up to five custom pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>WhatsApp contact &amp; lead form integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Five branded launch social media creatives</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=bundle-business-launch"
                onClick={playClick}
                className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Choose Business Launch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Brand & Growth */}
            <div className="relative border-2 border-[#1F3FFF] rounded-2xl p-7 bg-white flex flex-col justify-between shadow-md">
              <div className="absolute -top-3 left-7 bg-[#1F3FFF] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F3FFF] mb-2 pt-1">
                  BUNDLE 02 // SCALE
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Brand &amp; Growth
                </h3>
                <div className="mb-3">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(99999, 1200)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Best for growing businesses seeking authority
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#0A0F1F]">
                    <li className="flex items-start gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Brand Identity Pro (Discovery, stylebook &amp; stationery)</span>
                    </li>
                    <li className="flex items-start gap-2 font-medium">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Website up to five pages with lead flows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Ten launch social creatives + four video edits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Basic lead-capture workflow &amp; analytics setup</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=bundle-brand-growth"
                onClick={playClick}
                className="w-full btn-onlines-blue py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Choose Brand &amp; Growth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Digital Business Premium */}
            <div className="border border-[#E4E6EB] rounded-2xl p-7 bg-white flex flex-col justify-between hover:border-[#1F3FFF] transition-all hover:shadow-md">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5B6275] mb-2">
                  BUNDLE 03 // ENTERPRISE
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0A0F1F] mb-1">
                  Digital Business Premium
                </h3>
                <div className="mb-3">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0F1F]">
                    {displayPrice(149999, 1800)}
                  </div>
                  <span className="text-xs text-[#5B6275] font-medium">
                    Best for companies wanting unified brand &amp; CRM systems
                  </span>
                </div>

                <div className="pt-4 border-t border-[#E4E6EB] mb-6">
                  <ul className="space-y-2.5 text-xs text-[#5B6275]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Complete Brand System (Full manual &amp; collateral)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Website up to eight pages with CMS integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>CRM pipeline configuration &amp; 3 workflow automations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                      <span>Twelve creatives and six short-form video edits</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?service=bundle-digital-premium"
                onClick={playClick}
                className="w-full btn-onlines-outline py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Choose Business Premium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — NEED SOMETHING BEYOND STANDARD SCOPE?
          Replaces full lengthy add-on grid with a clean, high-conviction custom callout
          ========================================================================= */}
      <section
        id="custom-scope"
        className="py-16 md:py-20 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="border border-[#E4E6EB] rounded-3xl p-8 sm:p-12 bg-[#F8FAFC] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1F3FFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  08 // BESPOKE ENGAGEMENTS
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A0F1F] tracking-tight mb-3">
                Need Something Beyond the Standard Scope?
              </h2>
              <p className="text-sm text-[#5B6275] leading-relaxed mb-6">
                From additional pages and advanced integrations to custom dashboards and campaign assets, we can tailor the engagement to your requirements.
              </p>

              {/* Scope Tags */}
              <div className="flex flex-wrap gap-2 text-xs text-[#0A0F1F]">
                {[
                  'Additional Web Pages',
                  'Advanced Form Webhooks',
                  'Custom Dashboards',
                  'Motion Graphics & Video',
                  'Multi-Source CRM Pipelines',
                  'Custom Copywriting',
                  'Speed & Technical SEO Audits',
                  'Ongoing Maintenance & Hypercare',
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white border border-[#E4E6EB] font-medium"
                  >
                    + {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link
                href="/contact?subject=custom-scope"
                onClick={playClick}
                className="w-full sm:w-auto btn-onlines-blue py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Request a Custom Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — FREQUENTLY ASKED QUESTIONS
          Exactly 6 questions from the brief in an accessible accordion
          ========================================================================= */}
      <section
        id="faq"
        className="py-16 md:py-24 px-4 sm:px-8 md:px-12 border-b border-[#E4E6EB] bg-white"
      >
        <div className="max-w-[1920px] mx-auto">
          <div className="mb-12 pb-6 border-b border-[#E4E6EB] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3FFF]">
                  09 // FREQUENTLY ASKED QUESTIONS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A0F1F] tracking-tight">
                Clear Answers, Zero Ambiguity
              </h2>
            </div>
            <p className="text-sm text-[#5B6275] max-w-md">
              Everything you need to know about working with PixelMutiny before starting a project.
            </p>
          </div>

          <div className="max-w-4xl mx-auto divide-y divide-[#E4E6EB] border-y border-[#E4E6EB]">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-5">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setOpenFaq(isOpen ? -1 : index);
                    }}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left gap-4 font-display font-bold text-base sm:text-lg text-[#0A0F1F] hover:text-[#1F3FFF] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`w-7 h-7 rounded-full border border-[#E4E6EB] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#1F3FFF] text-white border-[#1F3FFF]' : 'text-[#5B6275]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pr-8 text-sm text-[#5B6275] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — FINAL CTA
          Headline: "Let's Build Your Next Advantage."
          Supporting text: "Tell us what you're building, what needs to improve and where you'd like to go next."
          Primary CTA: Start a Project -> /contact
          Secondary CTA: Explore Our Work -> /works
          ========================================================================= */}
      <section
        id="final-cta"
        className="py-20 md:py-32 px-4 sm:px-8 md:px-12 bg-[#0A0F1F] text-white relative overflow-hidden"
      >
        <div className="grilla-celdas opacity-20 pointer-events-none" aria-hidden="true" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
            <span>Ready for Senior Craft?</span>
          </div>

          <h2
            className="font-display font-extrabold tracking-tight text-white mb-6"
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 1.05,
            }}
          >
            Let&apos;s Build Your Next Advantage.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Tell us what you&apos;re building, what needs to improve and where you&apos;d like to go next.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link
              href="/contact"
              onClick={playClick}
              className="btn-onlines-blue py-3.5 px-8 rounded-xl font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/works"
              onClick={playClick}
              className="py-3.5 px-8 rounded-xl border border-white/20 hover:border-white font-bold tracking-wider uppercase text-white hover:text-white transition-colors flex items-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Senior Trust Signals */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F3FFF]" />
              <span>100% Asset &amp; IP Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1F3FFF]" />
              <span>Fixed-Scope Delivery Sprints</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1F3FFF]" />
              <span>Direct Founder Communication</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
