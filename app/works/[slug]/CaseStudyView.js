'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LightboxModal from '../../components/LightboxModal';
import QuickInquiryDrawer from '../../components/QuickInquiryDrawer';
import CountUpMetric from '../../components/CountUpMetric';
import { useSound } from '../../components/SoundManager';
import { SplitReveal, FadeUp, ImageReveal, WordScrollHighlight, CountUp } from '@/lib/motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react';

export default function CaseStudyView({ project, prevProject, nextProject }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMiniNav, setShowMiniNav] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedColor, setCopiedColor] = useState(null);
  const [mockupView, setMockupView] = useState('desktop');
  const [parallaxY, setParallaxY] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Lightbox state
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    currentIndex: 0,
    images: [],
  });

  const { playClick, playHover } = useSound();
  const heroRef = useRef(null);

  // Collect all project screen images into a linear gallery for the lightbox
  const galleryImages = [];
  if (project.heroImg) {
    galleryImages.push({
      src: project.heroImg,
      alt: `${project.client} Hero Visual`,
      title: project.title,
      caption: project.heroCaption || '01 — Primary Hero Visual',
    });
  }
  if (project.screens?.fullWidth?.image) {
    galleryImages.push({
      src: project.screens.fullWidth.image,
      alt: project.screens.fullWidth.title || project.title,
      title: project.screens.fullWidth.title || 'Full Screen View',
      caption: project.screens.fullWidth.caption,
    });
  }
  if (project.screens?.sideBySide) {
    project.screens.sideBySide.forEach((item) => {
      galleryImages.push({
        src: item.image,
        alt: item.title || item.caption,
        title: item.title || 'Screen Detail',
        caption: item.caption,
      });
    });
  }
  if (project.screens?.offset?.main?.image) {
    galleryImages.push({
      src: project.screens.offset.main.image,
      alt: project.screens.offset.main.caption,
      title: 'Detailed Screen Overview',
      caption: project.screens.offset.main.caption,
    });
  }
  if (project.screens?.offset?.overlay?.image) {
    galleryImages.push({
      src: project.screens.offset.overlay.image,
      alt: project.screens.offset.overlay.caption,
      title: 'Component Detail View',
      caption: project.screens.offset.overlay.caption,
    });
  }
  if (project.screens?.mockupRow?.desktop?.image) {
    galleryImages.push({
      src: project.screens.mockupRow.desktop.image,
      alt: project.screens.mockupRow.desktop.caption,
      title: 'Desktop Viewport Mockup',
      caption: project.screens.mockupRow.desktop.caption,
    });
  }
  if (project.screens?.mockupRow?.mobile?.image) {
    galleryImages.push({
      src: project.screens.mockupRow.mobile.image,
      alt: project.screens.mockupRow.mobile.caption,
      title: 'Mobile Viewport Mockup',
      caption: project.screens.mockupRow.mobile.caption,
    });
  }
  if (project.process?.steps) {
    project.process.steps.forEach((step) => {
      if (step.image && !galleryImages.some((img) => img.src === step.image)) {
        galleryImages.push({
          src: step.image,
          alt: step.title,
          title: step.title,
          caption: `${step.num} — ${step.title}`,
        });
      }
    });
  }

  const openLightboxBySrc = (src) => {
    playClick();
    const index = galleryImages.findIndex((img) => img.src === src);
    setLightboxState({
      isOpen: true,
      currentIndex: index >= 0 ? index : 0,
      images: galleryImages,
    });
  };

  const handleNextLightbox = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const handlePrevLightbox = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  // Scroll Progress, Parallax & Active Section Observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);

      // Mini-Nav visibility after hero (approx 550px)
      setShowMiniNav(scrollY > 550);

      // Subtle parallax: image moves 8% slower than scroll
      setParallaxY(scrollY * 0.08);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for section anchors
    const sectionIds = ['overview', 'results', 'screens', 'design', 'process'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px' }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [project]);

  const copyHex = (hex) => {
    try {
      navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      playClick();
      setTimeout(() => setCopiedColor(null), 2000);
    } catch {}
  };

  const scrollToAnchor = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if live site button should show
  const showLiveSite = Boolean(project.liveUrl && !project.isConcept);

  // Define accent background style for Section 5 (Design System)
  const primaryProjectColor = project.colors?.[0]?.hex || '#0A0A0C';
  const secondaryProjectColor = project.colors?.[1]?.hex || '#1F3FFF';

  return (
    <div className="w-full overflow-x-clip bg-white text-[#0A0F1F] min-h-screen selection:bg-[#1F3FFF] selection:text-white">
      {/* 1. SLIM PROGRESS BAR (2px, electric blue) */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#1F3FFF] z-50 origin-left pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* 2. STICKY DESKTOP MINI-NAV */}
      <nav
        aria-label="Case Study Section Navigation"
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center justify-between gap-6 px-6 py-2.5 rounded-full bg-[#0A0A0C]/90 text-white backdrop-blur-md border border-white/15 shadow-2xl transition-all duration-300 ${
          showMiniNav ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Project Name */}
        <span className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--accent)] border-r border-white/20 pr-4">
          {project.client}
        </span>

        {/* Section Anchors */}
        <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={() => scrollToAnchor('overview')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeSection === 'overview'
                ? 'bg-white text-black font-bold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => scrollToAnchor('results')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeSection === 'results'
                ? 'bg-white text-black font-bold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => scrollToAnchor('screens')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeSection === 'screens'
                ? 'bg-white text-black font-bold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Screens
          </button>
          <button
            onClick={() => scrollToAnchor('design')}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeSection === 'design'
                ? 'bg-white text-black font-bold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Design
          </button>
          {project.process?.steps && (
            <button
              onClick={() => scrollToAnchor('process')}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeSection === 'process'
                  ? 'bg-white text-black font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Process
            </button>
          )}
        </div>

        {/* Next Project Link */}
        <Link
          href={`/works/${nextProject.slug}`}
          onClick={playClick}
          className="font-mono text-xs font-bold text-white hover:text-[var(--accent)] transition-colors pl-4 border-l border-white/20 flex items-center gap-1 group"
        >
          <span>Next</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />

      {/* QUICK INQUIRY DRAWER */}
      <QuickInquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* =========================================================================
          SECTION 1: HERO
          96px top padding, back link, category+year, large H1, 20px summary,
          full-bleed hero image (100vw, 70vh, 8% parallax), 4-column meta row
         ========================================================================= */}
      <header className="w-full pt-28 lg:pt-32 pb-0">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* ← All work link */}
          <div className="mb-6">
            <Link
              href="/works"
              onClick={playClick}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#4A4A54] hover:text-[#0A0A0C] transition-colors font-medium group"
              data-cursor="WORKS"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>← All work</span>
            </Link>
          </div>

          {/* Category + Year pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-black/5 border border-black/10 text-[#0A0A0C]">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-black/5 border border-black/10 text-[#787884]">
              {project.year}
            </span>
            {project.isConcept ? (
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#1F3FFF]/10 text-[#1F3FFF] border border-[#1F3FFF]/20">
                Studio Concept Exploration
              </span>
            ) : (
              project.award && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#1F3FFF] text-white border border-[#1F3FFF]">
                  {project.award}
                </span>
              )
            )}
          </div>

          {/* H1 Project Name */}
          <SplitReveal
            as="h1"
            className="font-display font-extrabold uppercase text-[#0A0A0C] tracking-tight text-left mb-6 break-words"
            style={{
              fontSize: 'clamp(44px, 6.8vw, 108px)',
              lineHeight: 0.95,
            }}
          >
            {project.title}
          </SplitReveal>

          {/* One-line summary in 20px */}
          <p className="text-[20px] leading-[1.5] text-[#4A4A54] max-w-[65ch] font-medium mb-12">
            {project.subtitle || project.overviewIntro}
          </p>
        </div>

        {/* Full-bleed hero image (100vw, 70vh desktop / 50vh mobile, 8% parallax, no borders) */}
        <div
          ref={heroRef}
          onClick={() => openLightboxBySrc(project.heroImg)}
          className="w-full relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-black/5 cursor-pointer group"
          data-cursor="VIEW"
        >
          <div
            className="relative w-full h-[120%] -top-[10%] transition-transform duration-100 ease-out"
            style={{
              transform: `translate3d(0, ${parallaxY}px, 0)`,
            }}
          >
            <Image
              src={project.heroImg}
              alt={project.heroCaption || `${project.client} hero`}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* Subtle View Badge on hover */}
          <div className="absolute bottom-6 right-6 font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-black/75 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Expand ↗
          </div>
        </div>

        {/* 4-Column Meta Row (Client / Role / Timeline / Year) with thin vertical dividers */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[var(--hairline)] py-6 divide-y md:divide-y-0 md:divide-x divide-[var(--hairline)]">
            {/* Client */}
            <div className="px-3 sm:px-6 py-4 md:py-2">
              <span className="block font-mono text-xs uppercase tracking-wider text-[#787884] mb-1">
                Client
              </span>
              <span className="block font-display font-bold text-base sm:text-lg text-[#0A0A0C]">
                {project.client}
              </span>
            </div>

            {/* Role */}
            <div className="px-3 sm:px-6 py-4 md:py-2">
              <span className="block font-mono text-xs uppercase tracking-wider text-[#787884] mb-1">
                Role
              </span>
              <span className="block font-body font-medium text-sm sm:text-base text-[#0A0A0C] line-clamp-2">
                {project.role}
              </span>
            </div>

            {/* Timeline */}
            <div className="px-3 sm:px-6 py-4 md:py-2">
              <span className="block font-mono text-xs uppercase tracking-wider text-[#787884] mb-1">
                Timeline
              </span>
              <span className="block font-display font-bold text-base sm:text-lg text-[#0A0A0C]">
                {project.timeline}
              </span>
            </div>

            {/* Year & Live Site Button */}
            <div className="px-3 sm:px-6 py-4 md:py-2 flex items-center justify-between">
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-[#787884] mb-1">
                  Year
                </span>
                <span className="block font-display font-bold text-base sm:text-lg text-[#0A0A0C]">
                  {project.year}
                </span>
              </div>

              {showLiveSite && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-[#0A0A0C] text-white hover:bg-[var(--accent)] hover:text-black font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 2: OVERVIEW (challenge + solution)
          Spacing: desktop 160px (py-40), mobile 96px (py-24)
          Left 4 cols sticky label + H2, right 8 cols 22px intro, 2-col challenge/solution,
          deliverables as simple list with thin divider, tech stack outlined chips
         ========================================================================= */}
      <section
        id="overview"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 py-24 lg:py-40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 4 Cols: Sticky Section Label + H2 */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-3">
              01 / The Challenge
            </span>
            <h2
              className="font-display font-extrabold uppercase text-[#0A0A0C] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
            >
              The Strategic Challenge & Architecture
            </h2>
          </div>

          {/* Right 8 Cols: Large 22px Intro, Challenge & Solution Row, Deliverables, Tech */}
          <div className="lg:col-span-8">
            {/* Large 22px Intro Paragraph */}
            <WordScrollHighlight as="p" className="text-[22px] leading-[1.5] text-[#0A0A0C] font-medium mb-12">
              {project.overviewIntro || project.challenge}
            </WordScrollHighlight>

            {/* Two-Column Row with Challenge and Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mb-12">
              <div className="border-l-2 border-[#0A0A0C] pl-5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-2 font-bold">
                  The Problem
                </span>
                <p className="text-[18px] leading-[1.6] text-[#4A4A54] max-w-[65ch]">
                  {project.challengeBrief || project.challenge}
                </p>
              </div>

              <div className="border-l-2 border-[var(--accent)] pl-5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#0A0A0C] block mb-2 font-bold">
                  Our Solution
                </span>
                <p className="text-[18px] leading-[1.6] text-[#4A4A54] max-w-[65ch]">
                  {project.solutionBrief || project.solution}
                </p>
              </div>
            </div>

            {/* Deliverables: Simple list with a thin divider between items (not grey pills) */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[var(--hairline)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-4">
                  Deliverables & Execution Scope
                </span>
                <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 flex items-center justify-between text-base sm:text-lg font-medium text-[#0A0A0C] hover:pl-2 transition-all duration-200"
                    >
                      <span>{item}</span>
                      <span className="font-mono text-xs text-[#787884]">
                        [0{idx + 1}]
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack: Small outlined chips */}
            {project.tech && project.tech.length > 0 && (
              <div className="mt-10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-3">
                  Technology Stack & Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-black/20 text-[#0A0A0C] hover:border-black transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: RESULTS (black background, full-bleed)
          Spacing: desktop 160px (py-40), mobile 96px (py-24)
          3-4 huge numbers (80-120px lime accent), count-up animation on scroll,
          4-col grid desktop, 2x2 mobile. Client quote in large italic serif below.
         ========================================================================= */}
      <section
        id="results"
        className="w-full bg-[#0A0A0C] text-white py-24 lg:py-36 overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Label */}
          <span className="font-mono text-xs uppercase tracking-wider text-[#1F3FFF] block mb-3">
            {project.isConcept ? '02 / Technical Architecture & Specs' : '02 / Results & Impact'}
          </span>
          <h2
            className="font-display font-extrabold uppercase tracking-tight text-white mb-16 break-words"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.15, textWrap: 'balance' }}
          >
            {project.isConcept ? 'Design Specifications & Performance Benchmarks' : 'Measurable Velocity & Business Outcomes'}
          </h2>

          {/* 4-Col Grid on Desktop, 2x2 on Mobile */}
          {project.results && project.results.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 border-y border-white/15 py-12">
              {project.results.map((res, idx) => (
                <div key={idx} className="flex flex-col justify-between">
                  <div
                    className="font-display font-extrabold text-[#1F3FFF] tracking-tight leading-none mb-3"
                    style={{ fontSize: 'clamp(56px, 6vw, 100px)' }}
                  >
                    <CountUpMetric value={res.value} />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base sm:text-lg text-white block mb-1">
                      {res.label}
                    </span>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-body">
                      {res.context}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Client Quote in Large Italic Serif (Verified client work only) */}
          {!project.isConcept && project.testimonial && (
            <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 max-w-4xl">
              <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white/95 leading-relaxed mb-6">
                “{project.testimonial.quote}”
              </blockquote>
              <div className="font-mono text-xs uppercase tracking-wider text-white/60">
                <span className="text-white font-bold">{project.testimonial.author}</span> —{' '}
                <span>{project.testimonial.role}</span>,{' '}
                <span className="text-[#1F3FFF] font-bold">{project.testimonial.company}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KEY SCREENS (the main visual section)
          Spacing: desktop 160px (py-40), mobile 96px (py-24)
          Mix layouts:
            a) one full-width image (16:9)
            b) two images side by side (6/6 cols)
            c) one wide image with smaller offset image overlapping on right (7/5 cols, 48px offset)
            d) device mockup row (desktop + mobile) in soft tinted background panel with tab switch
          Every image: sharp, rounded 12px, soft shadow, 12px caption underneath
         ========================================================================= */}
      <section
        id="screens"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 py-24 lg:py-40"
      >
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-3">
            03 / Key Screens
          </span>
          <h2
            className="font-display font-extrabold uppercase text-[#0A0A0C] tracking-tight leading-[1.05]"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Interface Systems & Key Visuals
          </h2>
          <p className="text-[18px] leading-[1.6] text-[#4A4A54] max-w-[65ch] mt-4">
            Curated high-fidelity interface layouts demonstrating structural hierarchy, data density, and component ergonomics.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {/* Layout A: Full-width Image (16:9) */}
          {project.screens?.fullWidth && (
            <div className="w-full">
              <div
                onClick={() => openLightboxBySrc(project.screens.fullWidth.image)}
                className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-lg bg-black/5 cursor-pointer group"
                data-cursor="VIEW"
              >
                <Image
                  src={project.screens.fullWidth.image}
                  alt={project.screens.fullWidth.title || project.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover image-zoom-hover"
                />
                <div className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Zoom ↗
                </div>
              </div>
              <p className="text-xs font-mono text-[#787884] mt-2.5 text-left">
                {project.screens.fullWidth.caption}
              </p>
            </div>
          )}

          {/* Layout B: Two Images Side by Side (6 / 6 Cols) */}
          {project.screens?.sideBySide && project.screens.sideBySide.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.screens.sideBySide.map((item, idx) => (
                <div key={idx} className="w-full">
                  <div
                    onClick={() => openLightboxBySrc(item.image)}
                    className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-md bg-black/5 cursor-pointer group"
                    data-cursor="VIEW"
                  >
                    <Image
                      src={item.image}
                      alt={item.title || item.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover image-zoom-hover"
                    />
                    <div className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Zoom ↗
                    </div>
                  </div>
                  <p className="text-xs font-mono text-[#787884] mt-2.5 text-left">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Layout C: Wide image with smaller offset image overlapping on right (7 / 5 cols, 48px offset) */}
          {project.screens?.offset?.main && project.screens?.offset?.overlay && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-6 pb-12">
              {/* Left 7 Cols: Main Wide Image */}
              <div className="lg:col-span-7">
                <div
                  onClick={() => openLightboxBySrc(project.screens.offset.main.image)}
                  className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-lg bg-black/5 cursor-pointer group"
                  data-cursor="VIEW"
                >
                  <Image
                    src={project.screens.offset.main.image}
                    alt={project.screens.offset.main.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 750px"
                    className="object-cover image-zoom-hover"
                  />
                  <div className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Zoom ↗
                  </div>
                </div>
                <p className="text-xs font-mono text-[#787884] mt-2.5 text-left">
                  {project.screens.offset.main.caption}
                </p>
              </div>

              {/* Right 5 Cols: Offset Image (48px vertical offset on desktop) */}
              <div className="lg:col-span-5 lg:translate-y-12 lg:-ml-6 z-10">
                <div
                  onClick={() => openLightboxBySrc(project.screens.offset.overlay.image)}
                  className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full rounded-xl overflow-hidden shadow-2xl bg-white border border-black/10 cursor-pointer group"
                  data-cursor="VIEW"
                >
                  <Image
                    src={project.screens.offset.overlay.image}
                    alt={project.screens.offset.overlay.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover image-zoom-hover"
                  />
                  <div className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Zoom ↗
                  </div>
                </div>
                <p className="text-xs font-mono text-[#787884] mt-2.5 text-left">
                  {project.screens.offset.overlay.caption}
                </p>
              </div>
            </div>
          )}

          {/* Layout D: Device Mockup Row with Desktop / Mobile Tab Switch in Soft Tinted Background Panel */}
          {project.screens?.mockupRow && (
            <div className="bg-black/[0.03] border border-black/10 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-1">
                    Device Fidelity Preview
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0C]">
                    Responsive Form Factor Validation
                  </h3>
                </div>

                {/* Tab Switch: Desktop / Mobile */}
                <div className="flex items-center gap-1 p-1 bg-white border border-black/15 rounded-lg shadow-sm">
                  <button
                    onClick={() => {
                      playClick();
                      setMockupView('desktop');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-bold uppercase transition-colors ${
                      mockupView === 'desktop'
                        ? 'bg-[#0A0A0C] text-white'
                        : 'text-[#4A4A54] hover:text-black'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop (1440px)</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      setMockupView('mobile');
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-bold uppercase transition-colors ${
                      mockupView === 'mobile'
                        ? 'bg-[#0A0A0C] text-white'
                        : 'text-[#4A4A54] hover:text-black'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (390px)</span>
                  </button>
                </div>
              </div>

              {/* Mockup Display */}
              <div className="w-full flex justify-center">
                {mockupView === 'desktop' ? (
                  <div className="w-full max-w-5xl">
                    <div
                      onClick={() =>
                        openLightboxBySrc(
                          project.screens.mockupRow.desktop?.image || project.heroImg
                        )
                      }
                      className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-xl bg-white border border-black/15 cursor-pointer group"
                      data-cursor="VIEW"
                    >
                      <Image
                        src={
                          project.screens.mockupRow.desktop?.image || project.heroImg
                        }
                        alt="Desktop Preview"
                        fill
                        sizes="(max-width: 1280px) 100vw, 1100px"
                        className="object-cover image-zoom-hover"
                      />
                      <div className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Zoom ↗
                      </div>
                    </div>
                    <p className="text-xs font-mono text-[#787884] mt-3 text-left">
                      {project.screens.mockupRow.desktop?.caption ||
                        'Desktop Viewport [1440px] Widescreen Display'}
                    </p>
                  </div>
                ) : (
                  <div className="w-full max-w-sm">
                    <div
                      onClick={() =>
                        openLightboxBySrc(
                          project.screens.mockupRow.mobile?.image ||
                            project.heroMobileImg ||
                            project.heroImg
                        )
                      }
                      className="relative aspect-[9/19] w-full rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-black/80 cursor-pointer group"
                      data-cursor="VIEW"
                    >
                      <Image
                        src={
                          project.screens.mockupRow.mobile?.image ||
                            project.heroMobileImg ||
                            project.heroImg
                        }
                        alt="Mobile Preview"
                        fill
                        sizes="380px"
                        className="object-cover image-zoom-hover"
                      />
                      <div className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded bg-black/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Zoom ↗
                      </div>
                    </div>
                    <p className="text-xs font-mono text-[#787884] mt-3 text-center">
                      {project.screens.mockupRow.mobile?.caption ||
                        'Mobile Viewport [390px] Haptic Experience'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DESIGN SYSTEM / BRAND (project accent background)
          Spacing: desktop 160px (py-40), mobile 96px (py-24)
          Color palette: full row, flex, 240px high swatches, hex and name inside,
          click to copy with "Copied!" toast.
          Typography specimen: font name set in own typeface at 96px, alphabet line,
          real heading/body samples.
         ========================================================================= */}
      <section
        id="design"
        className="w-full py-24 lg:py-40 border-y border-[var(--hairline)]"
        style={{
          backgroundColor: '#EDECE6',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-3">
              04 / Brand & Design System
            </span>
            <h2
              className="font-display font-extrabold uppercase text-[#0A0A0C] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
            >
              Color Geometry & Typographic DNA
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#4A4A54] max-w-[65ch] mt-4">
              Mathematical color scales and high-legibility typographic pairings engineered for accessibility and brand authority.
            </p>
          </div>

          {/* Color Palette as Large Tall Swatches (full row, flex, 240px high) */}
          {project.colors && project.colors.length > 0 && (
            <div className="mb-20">
              <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-4">
                Color Palette (Click to Copy HEX)
              </span>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {project.colors.map((c, idx) => {
                  const isLight =
                    c.hex.toLowerCase() === '#ffffff' ||
                    c.hex.toLowerCase() === '#f5f4f0' ||
                    c.hex.toLowerCase() === '#f9f8f5' ||
                    c.hex.toLowerCase() === '#f5f2eb' ||
                    c.hex.toLowerCase() === '#f8fafc' ||
                    c.hex.toLowerCase() === '#d9f3d7' ||
                    c.hex.toLowerCase() === '#e2e8f0';

                  const isCopied = copiedColor === c.hex;

                  return (
                    <div
                      key={idx}
                      onClick={() => copyHex(c.hex)}
                      className="h-[240px] flex-1 hover:flex-[2] rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm relative group"
                      style={{
                        backgroundColor: c.hex,
                        color: isLight ? '#0A0A0C' : '#FFFFFF',
                        border: isLight ? '1px solid rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      {/* Top Label */}
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="font-bold uppercase tracking-wider">{c.name}</span>
                        <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                          {isCopied ? (
                            <Check className="w-4 h-4 text-[#1F3FFF]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </div>

                      {/* Bottom HEX & Copied Indicator */}
                      <div>
                        {isCopied ? (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-[#1F3FFF] text-white font-mono text-xs font-bold uppercase tracking-wider mb-2 animate-bounce">
                            Copied!
                          </span>
                        ) : null}
                        <span className="font-mono text-lg font-bold block tracking-wider">
                          {c.hex}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Typography Specimen: Font name at 96px, Alphabet line, Heading/Body Samples */}
          {project.fonts && project.fonts.length > 0 && (
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-8">
                Typography Architecture Specimen
              </span>

              <div className="space-y-12 divide-y divide-black/10">
                {project.fonts.map((f, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-12' : ''}>
                    {/* Font Label */}
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#787884] mb-3">
                      <span className="font-bold text-[#0A0A0C]">{f.name}</span>
                      <span>—</span>
                      <span>{f.role}</span>
                      <span>—</span>
                      <span>Weight: {f.weight}</span>
                    </div>

                    {/* Font name set in its own typeface at 96px */}
                    <div
                      className="tracking-tight text-[#0A0A0C] mb-6 leading-none"
                      style={{
                        fontFamily: f.family,
                        fontWeight: f.weight,
                        fontSize: 'clamp(48px, 7vw, 96px)',
                      }}
                    >
                      {f.name}
                    </div>

                    {/* Alphabet line */}
                    <div
                      className="font-mono text-xs sm:text-sm text-[#787884] tracking-wider mb-6 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ fontFamily: f.family }}
                    >
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 (!@#$%^&*)
                    </div>

                    {/* Real heading & body sample */}
                    <div
                      className="text-xl sm:text-2xl text-[#0A0A0C] leading-snug font-medium max-w-4xl"
                      style={{ fontFamily: f.family }}
                    >
                      {f.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PROCESS (only if data exists)
          Spacing: desktop 160px (py-40), mobile 96px (py-24)
          Horizontal timeline with 4 steps (Discover / Design / Build / Launch),
          number, title, 2 lines text, small image. Mobile: stacks vertically with line.
          Wireframes shown as horizontal scroll strip with snap points.
         ========================================================================= */}
      {project.process?.steps && project.process.steps.length > 0 && (
        <section
          id="process"
          className="max-w-[1280px] mx-auto px-4 sm:px-6 py-24 lg:py-40"
        >
          {/* Section Header */}
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-3">
              05 / Process & Delivery
            </span>
            <h2
              className="font-display font-extrabold uppercase text-[#0A0A0C] tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
            >
              {project.process.title || 'Sprint Process & Engineering Execution'}
            </h2>
            <p className="text-[18px] leading-[1.6] text-[#4A4A54] max-w-[65ch] mt-4">
              {project.process.description}
            </p>
          </div>

          {/* 4-Step Timeline (Horizontal on desktop, stacked with line on mobile) */}
          <div className="relative mb-20">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-7 left-8 right-8 h-[2px] bg-black/10 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {project.process.steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col justify-between">
                  {/* Step Number Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-14 h-14 rounded-full bg-[#1F3FFF] text-white font-mono font-bold text-base flex items-center justify-center shadow-md">
                      {step.num}
                    </span>
                    <span className="lg:hidden font-display font-bold text-lg text-[#0A0A0C]">
                      {step.title}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div>
                    <h4 className="hidden lg:block font-display font-bold text-lg text-[#0A0A0C] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-[#4A4A54] leading-relaxed mb-4">
                      {step.text}
                    </p>
                  </div>

                  {/* Step Small Image */}
                  {step.image && (
                    <div
                      onClick={() => openLightboxBySrc(step.image)}
                      className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-sm bg-black/5 border border-black/10 cursor-pointer group mt-2"
                      data-cursor="VIEW"
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 300px"
                        className="object-cover image-zoom-hover"
                      />
                      <div className="absolute top-2 right-2 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        Zoom ↗
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Wireframes Horizontal Scroll Strip with Snap Points */}
          {project.process?.wireframes && project.process.wireframes.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[var(--hairline)]">
              <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-6">
                Wireframes & Architectural Iterations (Swipe to Inspect)
              </span>

              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar">
                {project.process.wireframes.map((wf, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightboxBySrc(wf.image)}
                    className="min-w-[280px] sm:min-w-[380px] snap-center rounded-xl overflow-hidden border border-black/10 bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    data-cursor="VIEW"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/5">
                      <Image
                        src={wf.image}
                        alt={wf.title}
                        fill
                        sizes="400px"
                        className="object-cover image-zoom-hover"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="font-display font-bold text-sm text-[#0A0A0C] block">
                        {wf.title}
                      </span>
                      <span className="font-mono text-xs text-[#787884] block">
                        {wf.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          SECTION 7: NEXT PROJECT (full-bleed, black background)
          Large "Next project" label, project title at H1 size, thumbnail on right.
          On hover thumbnail scales up and title shifts right with an arrow.
          Whole block is a link. Include smaller "Previous project" link on left.
         ========================================================================= */}
      <section className="w-full bg-[#0A0A0C] text-white py-24 lg:py-36 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Top Row: Previous Project Link & Next Label */}
          <div className="flex items-center justify-between pb-8 border-b border-white/15 mb-12">
            <Link
              href={`/works/${prevProject.slug}`}
              onClick={playClick}
              className="font-mono text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>
                Previous: <strong className="text-white">{prevProject.client}</strong>
              </span>
            </Link>

            <span className="font-mono text-xs uppercase tracking-widest text-[#1F3FFF]">
              06 / Next Case Study
            </span>
          </div>

          {/* Main Next Project Card (Whole Block is Link) */}
          <Link
            href={`/works/${nextProject.slug}`}
            onClick={playClick}
            className="group block"
            data-cursor="NEXT"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 8 Cols: Next Label, H1 Title, Pills */}
              <div className="lg:col-span-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#1F3FFF] block mb-4">
                  Next Project → {nextProject.num || ''}
                </span>

                <div className="flex items-center gap-4 group-hover:translate-x-3 transition-transform duration-300">
                  <h3
                    className="font-display font-extrabold uppercase text-white tracking-tight leading-[0.95] group-hover:text-[#1F3FFF] transition-colors"
                    style={{ fontSize: 'clamp(36px, 5.5vw, 84px)' }}
                  >
                    {nextProject.title}
                  </h3>
                  <ArrowUpRight className="w-10 h-10 text-[#1F3FFF] hidden sm:block shrink-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    {nextProject.category}
                  </span>
                  <span className="font-mono text-xs text-white/60">
                    {nextProject.year}
                  </span>
                  <span className="font-mono text-xs text-[#1F3FFF] font-bold">
                    {nextProject.metric}
                  </span>
                </div>
              </div>

              {/* Right 4 Cols: Thumbnail Image (scales up on hover) */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-2xl bg-white/5 border border-white/15">
                  <Image
                    src={nextProject.heroImg}
                    alt={nextProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA
          Spacing: desktop 160px (py-36), mobile 96px (py-24)
          Centered: "Have a project like this?" in H2 size,
          one primary lime button "Start Your Project",
          one outlined secondary button "See more work"
         ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-24 lg:py-36 text-center">
        <div className="max-w-[800px] mx-auto">
          <span className="font-mono text-xs uppercase tracking-wider text-[#787884] block mb-3">
            07 / Start A Project
          </span>
          <h2
            className="font-display font-extrabold uppercase text-[#0A0A0C] tracking-tight leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
          >
            Have a project like this?
          </h2>
          <p className="text-[18px] leading-[1.6] text-[#4A4A54] max-w-[65ch] mx-auto mb-10">
            We partner with ambitious founders, high-growth technology enterprises, and luxury ateliers to architect memorable digital products with measurable conversion lift.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Electric Blue Button */}
            <button
              onClick={() => {
                playClick();
                setIsInquiryOpen(true);
              }}
              className="h-12 px-8 rounded-full bg-[#1F3FFF] hover:bg-[#1632D6] text-white font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Outlined Secondary Button */}
            <Link
              href="/works"
              onClick={playClick}
              className="h-12 px-8 rounded-full border border-black/20 hover:border-black text-[#0A0F1F] font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>See more work</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING BOTTOM PILL DOCK (Matches Image 2) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 pointer-events-auto">
        <nav
          aria-label="Case study navigation dock"
          className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0A0F1F]/92 backdrop-blur-2xl border border-white/20 text-white shadow-2xl"
        >
          {/* Monogram Badge */}
          <div className="w-8 h-8 rounded-full bg-white text-[#0A0F1F] flex items-center justify-center font-black text-xs">
            W.
          </div>

          {/* Quick Section Anchors */}
          <button
            onClick={() => scrollToAnchor('overview')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'overview'
                ? 'bg-white text-[#0A0F1F] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => scrollToAnchor('screens')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'screens'
                ? 'bg-white text-[#0A0F1F] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Highlights
          </button>

          <button
            onClick={() => scrollToAnchor('design')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'design'
                ? 'bg-white text-[#0A0F1F] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Tech
          </button>

          {showLiveSite && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFE14D] text-[#0A0F1F] hover:bg-yellow-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </nav>

        {/* Close / Return to Gallery button */}
        <Link
          href="/works"
          onClick={playClick}
          className="w-11 h-11 rounded-full bg-[#0A0F1F]/92 backdrop-blur-2xl border border-white/20 text-white hover:bg-[#1F3FFF] transition-colors flex items-center justify-center cursor-pointer shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          title="Back to Works Gallery"
          aria-label="Back to Works Gallery"
        >
          <X className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
