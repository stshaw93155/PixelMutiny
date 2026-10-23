'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Share2,
  ExternalLink,
  Check,
  ArrowUpRight,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSound } from './SoundManager';
import { PROJECTS } from '../data/projects';

export default function ProjectShowcaseModal({
  isOpen,
  onClose,
  project,
  onSelectProject,
}) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { playClick, playHover } = useSound();

  const modalRef = useRef(null);
  const overviewRef = useRef(null);
  const highlightsRef = useRef(null);
  const techRef = useRef(null);
  const testimonialRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Notify SmoothScroll/Lenis to pause window wheel interception
      window.dispatchEvent(new Event('pixelmutiny_modal_open'));
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('pixelmutiny_modal_close'));
    }

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('pixelmutiny_modal_close'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project || !mounted) return null;

  // Find next and prev projects for quick cycling
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject =
    PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleShare = async () => {
    playClick();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/works/${project.slug}` : '';
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
    }
  };

  const scrollToSection = (sectionRef, tabName) => {
    playClick();
    setActiveTab(tabName);
    if (sectionRef && sectionRef.current && modalRef.current) {
      const modalTop = modalRef.current.getBoundingClientRect().top;
      const targetTop = sectionRef.current.getBoundingClientRect().top;
      const offset = targetTop - modalTop + modalRef.current.scrollTop - 70;
      modalRef.current.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handleNavToFullCase = () => {
    document.body.style.overflow = '';
    window.dispatchEvent(new Event('pixelmutiny_modal_close'));
    playClick();
    onClose();
  };

  // Extract side-by-side highlight images or fallbacks
  const highlightImages =
    project.screens?.sideBySide && project.screens.sideBySide.length >= 2
      ? project.screens.sideBySide
      : [
          {
            image: project.screens?.fullWidth?.image || project.heroImg,
            title: project.title,
            caption: '01 — Architectural Viewport & Design System',
          },
          {
            image: project.screens?.offset?.main?.image || project.coverImg || project.heroImg,
            title: 'Telemetry & Fast Tables',
            caption: '02 — High-Density Grid & Interaction Layer',
          },
        ];

  // Tech items with highlight tags
  const techList = project.tech && project.tech.length > 0
    ? project.tech
    : ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'WebGL', 'Figma Tokens'];

  const modalContent = (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.client} — Showcase`}
      data-lenis-prevent="true"
      onWheel={(e) => {
        // Prevent Lenis on window from intercepting inner modal scrolling
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        e.stopPropagation();
      }}
      style={{
        backgroundColor: '#FFFFFF',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
      className="bg-white text-[#1D1D1F] selection:bg-[#0859D4] selection:text-white"
    >
      {/* TOP HUD BAR (Matches Image 2 top bar) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[rgba(18,18,19,0.08)] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        {/* Left: Author / Project Brand Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 shadow-sm">
            {project.client?.charAt(0) || 'P'}
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-sm text-[#1D1D1F] truncate">
              {project.client}
            </span>
            <span className="text-[rgba(18,18,19,0.25)] hidden sm:inline">•</span>
            <span className="text-xs text-[#5A5A5E] hidden sm:inline truncate">
              PixelMutiny DigiMedia
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#0859D4]">
              {project.category}
            </span>
          </div>
        </div>

        {/* Right: Actions (Share, Open Full Case, Close) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            onMouseEnter={playHover}
            className="relative p-2 sm:px-3 sm:py-1.5 rounded-full border border-[rgba(18,18,19,0.12)] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Copy Case Study Link"
            aria-label="Share case study"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-emerald-700 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#5A5A5E]" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>

          <Link
            href={`/works/${project.slug}`}
            onClick={handleNavToFullCase}
            onMouseEnter={playHover}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[rgba(18,18,19,0.12)] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Open Standalone Case Study Page"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#5A5A5E]" />
            <span className="hidden sm:inline">Full Case</span>
          </Link>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHover}
            className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white hover:bg-[#0859D4] transition-colors flex items-center justify-center cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0859D4]"
            aria-label="Close project showcase"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* SHOWCASE CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 pb-36">
        {/* SECTION 1: HEADER & HEADLINE (Matches Image 2 typography) */}
        <div ref={overviewRef} className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          {/* Meta Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#5A5A5E] tracking-wider uppercase mb-5">
            <span>PRAGUE // PIXELMUTINY</span>
            <span className="text-[rgba(18,18,19,0.25)]">•</span>
            <span>{project.year}</span>
            <span className="text-[rgba(18,18,19,0.25)]">•</span>
            <span className="text-[#0859D4] font-extrabold">{project.num}</span>
          </div>

          {/* Massive Display Title */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-[#1D1D1F] uppercase tracking-tight mb-6 leading-none">
            {project.client}
          </h1>

          {/* Author / Studio Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(18,18,19,0.12)] bg-[#F5F5F7] text-xs font-semibold text-[#1D1D1F] shadow-sm mb-8">
            <div className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px] font-bold">
              M
            </div>
            <span>PixelMutiny DigiMedia</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0859D4]" />
            <span className="text-[#5A5A5E] font-medium">{project.role || 'Design & Engineering'}</span>
          </div>
        </div>

        {/* PRIMARY SHOWCASE MEDIA FRAME (Rounded-2xl glass container with hero image) */}
        <div className="relative aspect-[16/10] w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(18,18,19,0.12)] bg-[#0C0C12] shadow-2xl group mb-14">
          <Image
            src={project.heroImg || project.coverImg}
            alt={`${project.client} Showcase Visual`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-102"
          />
          {/* Subtle Gradient Glow in Footer of Card */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between text-white text-xs">
            <span className="font-mono text-white/90 font-medium">
              {project.title}
            </span>
            {project.metric && (
              <span className="px-3 py-1 rounded-full bg-[#0859D4] text-white font-bold shadow-md">
                {project.metric}
              </span>
            )}
          </div>
        </div>

        {/* EDITORIAL MANIFESTO / VISION STATEMENT (Matches Image 2 airy typography) */}
        <div className="max-w-3xl mx-auto text-center my-14 px-4">
          <p className="text-xl sm:text-2xl md:text-3xl text-[#1D1D1F] font-normal leading-relaxed tracking-tight">
            {project.overviewIntro || project.solution || project.challenge}
          </p>
          <p className="mt-4 text-base sm:text-lg text-[#5A5A5E] font-medium">
            Bespoke architecture: custom built without boilerplate compromises → maximum conversion velocity.
          </p>
        </div>

        {/* SECTION 2: HIGHLIGHTS GALLERY (Matches Image 2 "See the highlights of this website") */}
        <div ref={highlightsRef} className="my-16 sm:my-20 pt-8 border-t border-[rgba(18,18,19,0.08)]">
          <div className="mb-8">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#5A5A5E]">
              01 // HIGHLIGHTS
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] mt-1 tracking-tight">
              See the highlights of this website.
            </h2>
          </div>

          {/* 2-Column Side-by-Side Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {highlightImages.map((screen, sIdx) => (
              <div
                key={sIdx}
                className="rounded-2xl overflow-hidden border border-[rgba(18,18,19,0.12)] bg-[#0C0C12] shadow-lg group relative aspect-[16/10] flex flex-col justify-end"
              >
                <Image
                  src={screen.image}
                  alt={screen.title || screen.caption || `Highlight ${sIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/35 to-transparent text-white">
                  <p className="text-xs font-bold text-white/95">
                    {screen.title || `Curated Viewport ${sIdx + 1}`}
                  </p>
                  <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                    {screen.caption || 'High-density reactive interface component'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: TECH & DISCIPLINE PILL CLOUD (Matches Image 2 glowing indicator dots) */}
        <div ref={techRef} className="my-16 sm:my-20 text-center">
          <p className="text-xs uppercase font-bold tracking-wider text-[#5A5A5E] mb-6">
            Technologies & Disciplines
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
            {/* Highlight Primary Disciplines with glowing green dot */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(18,18,19,0.12)] bg-white text-[#1D1D1F] text-xs font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>Product & Interaction</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(18,18,19,0.12)] bg-white text-[#1D1D1F] text-xs font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0859D4] shadow-[0_0_8px_rgba(8,89,212,0.8)]" />
              <span>Web & High-Performance</span>
            </div>

            {/* Individual Tech and Deliverables */}
            {techList.map((t, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-full border border-[rgba(18,18,19,0.08)] bg-[#F5F5F7] text-[#424242] text-xs font-semibold hover:border-[#1D1D1F] hover:text-[#1D1D1F] transition-colors"
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: CLIENT TESTIMONIAL BLOCK */}
        {project.testimonial && (
          <div ref={testimonialRef} className="my-16 sm:my-20 max-w-3xl mx-auto rounded-3xl bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
            <Quote className="w-8 h-8 text-[#0859D4] mx-auto mb-4 opacity-75" />
            <blockquote className="text-lg sm:text-xl text-[#1D1D1F] font-normal italic leading-relaxed mb-6">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div className="text-xs font-bold text-[#1D1D1F]">
              {project.testimonial.author}
            </div>
            <div className="text-xs text-[#5A5A5E]">
              {project.testimonial.role}, {project.testimonial.company}
            </div>
          </div>
        )}

        {/* PRIMARY ACTION / CTA BUTTON */}
        <div className="text-center my-12">
          <Link
            href={`/works/${project.slug}`}
            onClick={handleNavToFullCase}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1D1D1F] text-white hover:bg-[#0859D4] transition-all font-bold text-sm shadow-xl hover:scale-105 active:scale-95 duration-200 cursor-pointer"
          >
            <span>View Full Case Specification</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* PREVIOUS / NEXT QUICK PROJECT PAGER */}
        <div className="pt-10 border-t border-[rgba(18,18,19,0.08)] flex items-center justify-between text-xs text-[#5A5A5E]">
          <button
            onClick={() => {
              playClick();
              if (onSelectProject) onSelectProject(prevProject);
            }}
            className="flex items-center gap-2 hover:text-[#1D1D1F] font-bold cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev: {prevProject.client}</span>
          </button>
          <button
            onClick={() => {
              playClick();
              if (onSelectProject) onSelectProject(nextProject);
            }}
            className="flex items-center gap-2 hover:text-[#1D1D1F] font-bold cursor-pointer"
          >
            <span>Next: {nextProject.client}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FLOATING BOTTOM PILL DOCK (Matches Image 2 bottom dock) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 pointer-events-auto">
        <nav
          aria-label="Showcase quick navigation"
          className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#1D1D1F]/92 backdrop-blur-2xl border border-white/20 text-white shadow-2xl"
        >
          {/* Monogram Badge */}
          <div className="w-8 h-8 rounded-full bg-white text-[#1D1D1F] flex items-center justify-center font-black text-xs">
            W.
          </div>

          {/* Quick Anchor Buttons */}
          <button
            onClick={() => scrollToSection(overviewRef, 'overview')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => scrollToSection(highlightsRef, 'highlights')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'highlights'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Highlights
          </button>

          <button
            onClick={() => scrollToSection(techRef, 'tech')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-white text-[#1D1D1F] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Tech
          </button>

          <Link
            href={`/works/${project.slug}`}
            onClick={handleNavToFullCase}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFC700] text-[#1D1D1F] hover:bg-yellow-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Full Case</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        {/* Floating Close Button Right beside dock */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="w-11 h-11 rounded-full bg-[#1D1D1F]/92 backdrop-blur-2xl border border-white/20 text-white hover:bg-red-600 transition-colors flex items-center justify-center cursor-pointer shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close showcase modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
