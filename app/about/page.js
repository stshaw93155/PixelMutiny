'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AwardsTable from '../components/AwardsTable';
import Marquee from '../components/Marquee';
import TiltCard from '../components/TiltCard';
import { useSound } from '../components/SoundManager';
import {
  ButtonRoll,
  useReducedMotion,
} from '@/lib/motion';
import {
  ArrowUpRight,
  ArrowRight,
  Globe2,
  Clock,
  MapPin,
  Target,
  Compass,
  Check,
  Sparkles,
  Layers,
  Zap,
  ShieldCheck,
  Rocket,
  Building2,
  Users,
  Search,
  Palette,
  Code2,
  LifeBuoy,
  CheckCircle2,
  Copy,
  Navigation,
} from 'lucide-react';
import {
  COMPANY_LEGAL_NAME,
  COMPANY_BRAND_NAME,
  TAGLINE_OPTIONS,
  ONE_LINER,
  SHORT_BIO,
  WHO_WE_ARE,
  ABOUT_NAME_MEANING,
  MISSION,
  VISION,
} from '../../data/pricing';

export default function AboutPage() {
  const { playClick, playHover } = useSound();
  const [istTime, setIstTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });
  const reducedMotion = useReducedMotion();

  // Mouse coordinate tracker for patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@pixelmutiny.com');
    setCopiedEmail(true);
    playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Live IST Clock for Delhi HQ
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        setIstTime('10:00:00 AM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const protocolStages = [
    {
      step: '01',
      icon: Search,
      name: 'Discover',
      tagline: 'Deep Brand & Audience Discovery',
      desc: 'Understand your brand, audience, and market landscape to establish clear project benchmarks and positioning.',
      deliverable: 'Deliverable: Brand brief & benchmark scope',
    },
    {
      step: '02',
      icon: Compass,
      name: 'Plan',
      tagline: 'Scope, Timelines & Architecture',
      desc: 'Define scope, milestone schedule, tech stack, and wireframe architecture with zero surprises down the line.',
      deliverable: 'Deliverable: Wireframes & sprint timeline',
    },
    {
      step: '03',
      icon: Palette,
      name: 'Design',
      tagline: 'High-Impact Concepts & Iteration',
      desc: 'Bespoke visual concepts, interactive Figma prototypes, typography hierarchy, and structured feedback rounds.',
      deliverable: 'Deliverable: Interactive Figma prototype',
    },
    {
      step: '04',
      icon: Code2,
      name: 'Build',
      tagline: 'Full-Stack Modern Engineering',
      desc: 'Clean Next.js, React, and Tailwind engineering with responsive polish, fluid motion, and zero technical debt.',
      deliverable: 'Deliverable: Production-ready code repo',
    },
    {
      step: '05',
      icon: Rocket,
      name: 'Launch',
      tagline: 'Deployment & Quality Gates',
      desc: 'Cross-browser QA testing, SEO checklist, Lighthouse 100 performance audit, and domain deployment.',
      deliverable: 'Deliverable: Live deployment & QA sign-off',
    },
    {
      step: '06',
      icon: LifeBuoy,
      name: 'Support',
      tagline: 'Ongoing Growth & Telemetry',
      desc: 'Post-launch warranty, conversion telemetry tracking, and iterative growth sprints to scale revenue.',
      deliverable: 'Deliverable: 30-day warranty & analytics',
    },
  ];

  const audienceGroups = [
    {
      title: 'Startups & Scaleups',
      icon: Rocket,
      tag: 'TECH & AI',
      desc: 'For seed to Series A tech founders launching new products or scaling customer acquisition with rapid 2-week sprints.',
      bullets: [
        'Funded Tech & SaaS Startups',
        'AI Product Interfaces & Tools',
        'MVP to Flagship Redesigns',
      ],
      turnaround: 'SPRINT: 2 TO 3 WEEKS',
    },
    {
      title: 'Businesses & SMEs',
      icon: Building2,
      tag: 'SCALE & COMMERCE',
      desc: 'For established brands modernizing legacy websites or scaling performance marketing with measurable ROAS.',
      bullets: [
        'E-commerce & High-AOV D2C Brands',
        'Real Estate, Architecture & Hospitality',
        'B2B Professional Advisory & Firms',
      ],
      turnaround: 'SPRINT: 2 TO 4 WEEKS',
    },
    {
      title: 'Individuals & Creators',
      icon: Users,
      tag: 'PERSONAL BRANDS',
      desc: 'For ambitious leaders, creators, and consultants needing high-authority personal websites that convert visitors into clients.',
      bullets: [
        'Executive Coaches & Keynote Speakers',
        'Top Content Creators & YouTubers',
        'Specialist Founders & Solo Operators',
      ],
      turnaround: 'SPRINT: 1 TO 2 WEEKS',
    },
  ];

  const whyChooseUsPillars = [
    {
      num: '01',
      title: 'One Team For Everything',
      desc: 'Design, development, content, and ads under one roof — no juggling five freelancers or dealing with handoff friction.',
    },
    {
      num: '02',
      title: '100% Original Work',
      desc: 'Built custom around your brand narrative and competitive edge, never from cheap templates or recycled boilerplates.',
    },
    {
      num: '03',
      title: 'Production-Ready Files',
      desc: 'Clean, vector-ready files, Figma design tokens, and modular source code you can scale anywhere with total ownership.',
    },
    {
      num: '04',
      title: 'Clear Timelines & Direct Access',
      desc: 'Definite delivery milestones, transparent weekly reporting, live Slack access, and zero corporate agency runaround.',
    },
    {
      num: '05',
      title: 'Creative + Performance Together',
      desc: 'Creative flair and mathematical performance thinking combined, ensuring your brand looks stunning while generating measurable revenue.',
    },
  ];

  const coreValues = [
    {
      icon: Sparkles,
      title: 'Originality first',
      desc: 'No recycled templates or copy-paste designs. Everything is built around your specific brand and goals.',
    },
    {
      icon: Layers,
      title: 'Clarity over clutter',
      desc: 'Clean visuals, clear messaging, simple user journeys that guide visitors straight to conversion.',
    },
    {
      icon: Zap,
      title: 'Results matter',
      desc: 'Pretty is not enough. It has to work, convert, and scale in the real market.',
    },
    {
      icon: Clock,
      title: 'Speed with quality',
      desc: 'Fast turnarounds without cutting corners, powered by disciplined sprint architectures.',
    },
    {
      icon: ShieldCheck,
      title: 'Honest partnership',
      desc: 'Clear timelines, transparent pricing, no fluff, and direct partner access throughout.',
    },
  ];

  return (
    <div className="w-full bg-white text-[#1D1D1F] min-h-screen selection:bg-[#0859D4] selection:text-white">
      {/* =========================================================================
          HERO SECTION: MANIFESTO & ORIGIN + REAL FEATURED PREVIEW CARD
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
          <div className="text-xs text-[#6B7280] mb-4 flex flex-wrap items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#0859D4]" />
            <span className="font-bold text-[#1D1D1F]">{COMPANY_LEGAL_NAME}</span>
            <span className="text-[rgba(18,18,19,0.2)]">|</span>
            <span className="text-xs text-[#0859D4] font-bold uppercase tracking-wider">
              01 // AGENCY MANIFESTO &amp; ORIGIN
            </span>
            <span className="text-[rgba(18,18,19,0.2)] hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#6B7280] uppercase tracking-wider">
              NEW DELHI, INDIA
            </span>
          </div>

          {/* Primary Tagline H1 with Dotted Baseline */}
          <h1
            className="font-display font-bold tracking-tight text-[#1D1D1F] max-w-6xl mb-6 pb-2"
            style={{
              lineHeight: 1.15,
              fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)',
            }}
          >
            <span className="dotted-baseline">A studio team that lives and breathes the web.</span>
          </h1>

          {/* Two-Column Hero Grid: Narrative + Featured Visual Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 mt-6 border-t border-[rgba(18,18,19,0.08)] text-sm text-[#424242]">
            {/* Left Side: Subheading, One-liner and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3.5 py-1 rounded-full bg-[#0859D4] text-white font-bold shadow-sm">
                  {TAGLINE_OPTIONS.secondary}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#1D1D1F] font-semibold">
                  {TAGLINE_OPTIONS.tertiary}
                </span>
              </div>

              {/* Subheading requested by QA */}
              <p className="text-xl sm:text-2xl font-bold text-[#1D1D1F] leading-snug">
                Brand, web and growth design for startups and creators, shipped in 2-week sprints.
              </p>

              <p className="text-sm sm:text-base text-[#424242] leading-relaxed font-normal">
                {ONE_LINER}
              </p>

              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                {SHORT_BIO}
              </p>

              {/* Dual CTAs: Primary "Start a project" + Secondary "View work" */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  onClick={playClick}
                  className="btn-onlines-blue py-3.5 px-7 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  data-cursor="START"
                >
                  <span>Start a project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/works"
                  onClick={playClick}
                  className="py-3.5 px-7 rounded-full border border-[#111] text-[#111] bg-white hover:bg-[#111] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                  data-cursor="WORK"
                >
                  <span>View work</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Real Rotating/Featured Visual Card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="p-6 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,18,19,0.08)] text-xs">
                  <span className="text-[#0859D4] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED FLAGSHIP WORK</span>
                  </span>
                  <span className="text-[#6B7280] font-semibold">AVENOR LOGISTICS</span>
                </div>

                {/* Real Screenshot Preview */}
                <Link
                  href="/works/avenor"
                  onClick={playClick}
                  className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[rgba(18,18,19,0.08)] bg-white group"
                >
                  <Image
                    src="/projects/avenor.png"
                    alt="Avenor Logistics Enterprise Cockpit"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold flex items-center gap-1">
                      <span>View case study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                {/* Key Stats Strip */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2.5 rounded-2xl bg-white border border-[rgba(18,18,19,0.08)]">
                    <span className="font-display font-extrabold text-base text-[#1D1D1F] block">8</span>
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Flagships</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white border border-[rgba(18,18,19,0.08)]">
                    <span className="font-display font-extrabold text-base text-[#0859D4] block">2 Wks</span>
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Sprints</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white border border-[rgba(18,18,19,0.08)]">
                    <span className="font-display font-extrabold text-base text-[#1BC47D] block">100%</span>
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">Original</span>
                  </div>
                </div>
              </div>

              {/* Live IST Telemetry Card */}
              <div className="p-5 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="text-[#1D1D1F] block font-bold text-xs uppercase tracking-wider">
                    NEW DELHI DESIGN LAB (HQ)
                  </span>
                  <span className="text-[#6B7280] text-[11px] uppercase tracking-wider">
                    DLF CYBER HUB, SECTOR 24, GURUGRAM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#1BC47D] animate-ping" />
                  <span className="font-bold text-[#0859D4]">LIVE IST: {istTime || '10:00:00 AM'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 01: WHO WE ARE, MISSION & VISION (FILLED CARDS WITH ICONS)
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Who We Are Story */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block">
              WHO WE ARE
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight pb-2"
              style={{ lineHeight: 1.15 }}
            >
              WE BUILD WORK THAT IS SHARP, ORIGINAL, AND MADE TO GET RESULTS.
            </h2>
            <p className="text-xs sm:text-sm text-[#424242] leading-relaxed font-normal">
              {WHO_WE_ARE.summary}
            </p>
            <p className="text-xs sm:text-sm text-[#424242] leading-relaxed font-normal">
              {WHO_WE_ARE.ethos}
            </p>
          </div>

          {/* Right: Mission & Vision Editorial Cards (Both filled with icons and descriptions) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: Mission */}
            <div className="p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] flex flex-col justify-between space-y-6 shadow-sm hover:border-[#0859D4] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0859D4] text-white flex items-center justify-center mb-6 shadow-md">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs text-[#6B7280] font-bold block mb-2 uppercase tracking-wider">
                  OUR MISSION
                </span>
                <h3 className="font-display text-2xl font-extrabold text-[#1D1D1F] mb-3">
                  Conversion &amp; Originality
                </h3>
                <p className="text-xs sm:text-sm text-[#424242] leading-relaxed">
                  {MISSION}
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(18,18,19,0.08)] text-[11px] text-[#6B7280] flex items-center justify-between uppercase tracking-wider font-semibold">
                <span>IMPACT OVER EGO</span>
                <span className="text-[#0859D4] font-bold">01 // MISSION</span>
              </div>
            </div>

            {/* Card 2: Vision */}
            <div className="p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white flex flex-col justify-between space-y-6 shadow-sm hover:border-[#0859D4] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] text-white flex items-center justify-center mb-6 shadow-md">
                  <Compass className="w-6 h-6 text-[#0859D4]" />
                </div>
                <span className="text-xs text-[#6B7280] font-bold block mb-2 uppercase tracking-wider">
                  OUR VISION
                </span>
                <h3 className="font-display text-2xl font-extrabold text-[#1D1D1F] mb-3">
                  India &amp; Global Trust
                </h3>
                <p className="text-xs sm:text-sm text-[#424242] leading-relaxed font-normal">
                  {VISION}
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(18,18,19,0.08)] text-[11px] text-[#6B7280] flex items-center justify-between uppercase tracking-wider font-semibold">
                <span>ORIGINAL • FAST • HONEST</span>
                <span className="text-[#0859D4] font-bold">02 // VISION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: 5 CORE VALUES (EACH WITH ICON + DESCRIPTION)
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] patron-puntos">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[rgba(18,18,19,0.08)] gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
              WHAT WE STAND FOR
            </span>
            <h2
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight pb-2"
              style={{ lineHeight: 1.15 }}
            >
              OUR 5 CORE VALUES
            </h2>
          </div>
          <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider max-w-sm">
            NO RECYCLED TEMPLATES. NO COPY-PASTE DESIGNS. HONEST PARTNERSHIP ONLY.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {coreValues.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <div
                key={val.title}
                onMouseEnter={playHover}
                className="p-6 sm:p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white flex flex-col justify-between h-full hover:border-[#0859D4] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-default shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280] mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#0859D4]/10 text-[#0859D4] flex items-center justify-center group-hover:bg-[#0859D4] group-hover:text-white transition-all shadow-sm">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className="font-display text-lg font-bold text-[#1D1D1F] mb-2 group-hover:text-[#0859D4] transition-colors"
                  >
                    {val.title}
                  </h3>

                  <p className="text-xs text-[#424242] leading-relaxed">
                    {val.desc}
                  </p>
                </div>

                <div className="border-t border-[rgba(18,18,19,0.08)] pt-4 mt-6 text-[11px] text-[#6B7280] flex items-center justify-between uppercase tracking-wider font-semibold">
                  <span>STANDARD #{idx + 1}</span>
                  <span className="text-[#0859D4] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: HOW WE WORK (6-STEP SPRINT PROTOCOL - 3X2 GRID)
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-white">
        <div className="mb-12 pb-6 border-b border-[rgba(18,18,19,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
              THE SPRINT ARCHITECTURE
            </span>
            <h2
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight pb-2"
              style={{ lineHeight: 1.15 }}
            >
              HOW WE WORK: 6-STEP PROTOCOL
            </h2>
          </div>
          <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider">
            FROM FIRST DISCOVERY CALL TO LAUNCH &amp; ONGOING GROWTH
          </span>
        </div>

        {/* Consistent 3x2 Grid on desktop, 2x3 on tablet, 1 col on mobile; equal heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {protocolStages.map((stage) => {
            const IconComp = stage.icon;
            return (
              <div
                key={stage.step}
                onMouseEnter={playHover}
                className="p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] flex flex-col justify-between hover:border-[#0859D4] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-default h-full shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280] mb-6">
                    <span className="w-12 h-12 rounded-2xl bg-[#0859D4] text-white font-bold text-base flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      {stage.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white border border-[rgba(18,18,19,0.08)] flex items-center justify-center text-[#0859D4]">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-[#1D1D1F] mb-1">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] font-semibold mb-3">
                    {stage.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#424242] leading-relaxed mb-6 font-normal">
                    {stage.desc}
                  </p>
                </div>

                <div className="border-t border-[rgba(18,18,19,0.08)] pt-4 mt-auto">
                  <div className="text-xs font-semibold text-[#0859D4] bg-white px-3 py-1.5 rounded-xl border border-[rgba(18,18,19,0.08)] shadow-sm">
                    {stage.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: WHO WE WORK WITH (3 EQUAL AUDIENCE CARDS)
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-[#F5F5F7]">
        <div className="mb-12 pb-6 border-b border-[rgba(18,18,19,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
              TARGET AUDIENCE
            </span>
            <h2
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight pb-2"
              style={{ lineHeight: 1.15 }}
            >
              WHO WE WORK WITH
            </h2>
          </div>
          <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider">
            BUILT FOR THOSE WHO WANT TO STAND OUT INSTEAD OF BLEND IN
          </span>
        </div>

        {/* 3 Equal Audience Cards in a clean 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {audienceGroups.map((aud, idx) => {
            const IconComp = aud.icon;
            return (
              <div
                key={aud.title}
                className="p-8 sm:p-10 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-white text-[#1D1D1F] shadow-sm hover:border-[#0859D4] hover:shadow-xl transition-all flex flex-col justify-between space-y-6 h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-6">
                    <span className="font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[11px] bg-[#0859D4] text-white shadow-sm">
                      {aud.tag}
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] flex items-center justify-center text-[#0859D4]">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F] mb-3">
                    {aud.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#424242] leading-relaxed mb-6 font-normal">
                    {aud.desc}
                  </p>

                  <div className="space-y-2 border-t border-[rgba(18,18,19,0.08)] pt-4 text-xs text-[#424242]">
                    <span className="text-[11px] font-bold text-[#1D1D1F] uppercase tracking-wider block mb-1">
                      EXAMPLES:
                    </span>
                    {aud.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[#0859D4] font-bold">●</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(18,18,19,0.08)] flex items-center justify-between text-xs">
                  <span className="text-[#6B7280] font-semibold text-[11px] uppercase tracking-wider">
                    {aud.turnaround}
                  </span>
                  <Link
                    href="/contact"
                    onClick={playClick}
                    className="font-bold text-[#0859D4] hover:underline flex items-center gap-1"
                  >
                    <span>Start brief</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: WHY CLIENTS CHOOSE US (3+2 BALANCED GRID)
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-white">
        <div className="mb-12 pb-6 border-b border-[rgba(18,18,19,0.08)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2">
              THE COMPETITIVE ADVANTAGE
            </span>
            <h2
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight pb-2"
              style={{ lineHeight: 1.15 }}
            >
              WHY CLIENTS CHOOSE US
            </h2>
          </div>
          <span className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider">
            CREATIVE EXCELLENCE + MATHEMATICAL PERFORMANCE THINKING
          </span>
        </div>

        {/* 5 Cards arranged in a 3-col grid with the last 2 centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {whyChooseUsPillars.map((item, idx) => {
            const isLastTwo = idx >= 3;
            return (
              <div
                key={item.num}
                onMouseEnter={playHover}
                className={`p-8 rounded-3xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] flex flex-col justify-between h-full hover:border-[#0859D4] hover:shadow-xl transition-all shadow-sm group ${
                  idx < 3
                    ? 'lg:col-span-2'
                    : idx === 3
                    ? 'lg:col-span-3 lg:col-start-1'
                    : 'lg:col-span-3'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#6B7280] mb-6">
                    <span className="text-xs font-bold text-[#1D1D1F] group-hover:text-[#0859D4] transition-colors uppercase tracking-wider">
                      {item.num} // ADVANTAGE
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white border border-[rgba(18,18,19,0.08)] flex items-center justify-center font-bold text-[#0859D4] shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#0859D4]" />
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-[#1D1D1F] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#424242] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="border-t border-[rgba(18,18,19,0.08)] pt-4 mt-6 text-[11px] text-[#6B7280] flex items-center justify-between uppercase tracking-wider font-semibold">
                  <span>UNCOMPROMISING CRAFT</span>
                  <span className="text-[#0859D4] font-bold">PIXELMUTINY GUARANTEE</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 06: BENCHMARK LEDGER
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-white">
        <AwardsTable />
      </section>

      {/* =========================================================================
          SECTION 07: VERIFIED REAL DELHI HQ STUDIO COORDINATES
          ========================================================================= */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-[rgba(18,18,19,0.08)] bg-white">
        {/* Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block mb-2 font-mono">
              [ 07 // OPERATIONS HQ ]
            </span>
            <h2
              className="font-display text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight"
              style={{ lineHeight: 1.1 }}
            >
              STUDIO &amp; LIVE<br />
              <span className="text-[#0859D4]">COORDINATES</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] font-mono">
            <Globe2 className="w-4 h-4 text-[#0859D4]" />
            <span className="font-bold text-[#1D1D1F] uppercase tracking-wider">DELHI STUDIO (HQ)</span>
            <span className="w-2 h-2 rounded-full bg-[#1BC47D] animate-pulse ml-1" />
            <span className="text-[#1BC47D] font-bold">ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Studio Details */}
          <div
            onMouseEnter={playHover}
            className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl border border-[rgba(18,18,19,0.08)] bg-[#050B14] text-white shadow-xl"
          >
            <div className="space-y-5">
              {/* IST Clock Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 font-mono">PRIMARY LAB</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#18A0FB] font-mono">
                  IST · UTC+5:30
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  NEW DELHI STUDIO
                </h3>
                <p className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">
                  {COMPANY_LEGAL_NAME}
                </p>
              </div>

              <div className="space-y-3 text-sm text-white/70 border-t border-white/10 pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#0859D4] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block text-xs">DLF Cyber Hub Design Lab</span>
                    <span className="text-xs text-white/50">DLF Phase 2, Sector 24, Gurugram — NCR 122002, India</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#0859D4] flex-shrink-0" />
                  <span className="text-xs text-white/70">Mon – Sat · 10:00 AM – 7:00 PM IST</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 text-[#1BC47D] flex-shrink-0 flex items-center justify-center text-base leading-none">⚡</span>
                  <span className="text-xs text-[#1BC47D] font-semibold">Replies within 24 business hours</span>
                </div>
              </div>

              {/* Coords */}
              <div className="font-mono text-[11px] text-white/30 border-t border-white/10 pt-4">
                28.4947° N, 77.0894° E
              </div>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 mt-6">
              <button
                type="button"
                onClick={copyEmail}
                className="py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1BC47D]" />
                    <span className="text-[#1BC47D]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/60" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
              <a
                href="https://maps.google.com/?q=DLF+Cyber+Hub+Gurugram"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#0859D4]" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Right Card: Radar Map Visual */}
          <div
            onMouseEnter={playHover}
            className="lg:col-span-7 relative rounded-2xl border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] overflow-hidden min-h-[360px] shadow-sm flex flex-col"
          >
            {/* Dot grid background */}
            <div className="absolute inset-0 patron-puntos opacity-60" />
            {/* Blue radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(8,89,212,0.12),transparent_70%)]" />

            <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10">
              {/* Top Bar */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#0859D4] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1BC47D] animate-ping" />
                  ACTIVE LAB RADAR
                </span>
                <span className="font-semibold text-[#1D1D1F] uppercase tracking-wider text-[11px]">NCR SECTOR 24</span>
              </div>

              {/* Radar Ping Visualizer */}
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="relative flex items-center justify-center w-40 h-40">
                  {/* Ripple rings */}
                  <div className="absolute w-40 h-40 rounded-full border border-[#0859D4]/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                  <div className="absolute w-28 h-28 rounded-full border border-[#0859D4]/25 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
                  <div className="absolute w-16 h-16 rounded-full border border-[#0859D4]/30 animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.8s' }} />
                  {/* Center pin */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#0859D4] shadow-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Bottom info row */}
              <div className="border-t border-[rgba(18,18,19,0.08)] pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="font-display text-lg font-extrabold text-[#1D1D1F] block">
                    PixelMutiny Studio Hub
                  </span>
                  <span className="text-xs text-[#6B7280] font-mono">
                    28.4947° N, 77.0894° E · New Delhi NCR
                  </span>
                  <span className="block text-[11px] text-[#0859D4] font-bold mt-1.5 px-2.5 py-0.5 rounded-full bg-[#0859D4]/10 border border-[#0859D4]/20 w-fit">
                    Open by appointment
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-mono text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1D1D1F]">FOUNDER INTAKE:</span>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/gfxsumit/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0859D4] hover:underline font-semibold inline-flex items-center gap-0.5"
                  >
                    <span>Sumit on LinkedIn</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => { playClick(); }}
                    className="btn-onlines-blue py-2 px-4 text-[11px] font-bold mt-1 self-start"
                  >
                    COMMENCE SPRINT →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SECTION 08: CLOSING CTA BAND BEFORE FOOTER
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 md:px-12 bg-[#050B14] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0859D4] block">
            READY TO STAND OUT?
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight pb-1"
            style={{ lineHeight: 1.15 }}
          >
            Ready to break the template?
          </h2>
          <p className="text-xs sm:text-base text-white/80 leading-relaxed font-normal max-w-xl mx-auto">
            Let&apos;s turn your concept into a high-converting digital flagship. Shipped in 2-week sprints with full transparency.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              onClick={playClick}
              className="btn-onlines-blue py-4 px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-2xl"
            >
              <span>Start a project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Marquee separator="✦" />
    </div>
  );
}
