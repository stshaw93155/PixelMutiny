'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import QuickInquiryDrawer from './components/QuickInquiryDrawer';
import HeroShowreelModal from './components/HeroShowreelModal';
import { useSound } from './components/SoundManager';
import { useCurrency } from './components/useCurrency';
import { PROJECTS } from './data/projects';
import { SERVICES_DATA, formatPrice } from '@/data/pricing';
import { useReducedMotion, useIsMobile } from '@/lib/motion';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Code,
  Palette,
  Send,
} from 'lucide-react';

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });

  // Floating live collaborator cursors state (scattered naturally across left and right sides)
  const [collaborators, setCollaborators] = useState([
    { id: 'dev', name: 'Developer', color: '#18A0FB', x: 18, y: 24, vx: 0.05, vy: 0.04 },
    { id: 'client', name: 'Client', color: '#EF5533', x: 38, y: 36, vx: -0.04, vy: 0.05 },
    { id: 'director', name: 'Creative Director', color: '#1BC47D', x: 12, y: 62, vx: 0.04, vy: -0.05 },
    { id: 'ui', name: 'UI Designer', color: '#6465ED', x: 82, y: 26, vx: -0.05, vy: -0.04 },
    { id: 'ux', name: 'UX Designer', color: '#FF5C93', x: 74, y: 68, vx: 0.05, vy: 0.03 },
    { id: 'pm', name: 'Project Manager', color: '#00C4FF', x: 88, y: 48, vx: -0.04, vy: 0.04 },
  ]);

  const heroRef = useRef(null);
  const { playClick, playHover } = useSound();
  const { currency } = useCurrency();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Subtle natural wandering for Figma collaborator cursors on full-width Hero canvas
  useEffect(() => {
    if (reducedMotion || isMobile) return;

    let animId;
    const updateCursors = () => {
      setCollaborators((prev) =>
        prev.map((c) => {
          let nx = c.x + c.vx * 0.4;
          let ny = c.y + c.vy * 0.4;
          let nvx = c.vx;
          let nvy = c.vy;

          // Keep within comfortable viewport bounds (4% to 94% horizontal, 12% to 84% vertical)
          if (nx < 4 || nx > 94) nvx = -nvx;
          if (ny < 12 || ny > 84) nvy = -nvy;

          return { ...c, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
      animId = requestAnimationFrame(updateCursors);
    };

    animId = requestAnimationFrame(updateCursors);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion, isMobile]);

  // Track mouse coordinates for the Onlines patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  // Flagship 3 projects for the Onlines fanned-out deck
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="w-full bg-white text-[#1D1D1F] overflow-x-hidden selection:bg-[#0859D4] selection:text-white">
      {/* SHOWREEL MODAL */}
      <HeroShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* QUICK INQUIRY MODAL */}
      <QuickInquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* ===================================================================
          SECTION 1: HOME HERO (ONLINES FIGMA CANVAS WITH SELECTION BOUNDS)
          =================================================================== */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="home-hero border-b border-[rgba(18,18,19,0.08)]"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        <div className="home-hero__inner w-full relative flex items-center justify-center">
          {/* Subtle Architectural Dot Grid */}
          <div className="grilla-celdas opacity-60 pointer-events-none" aria-hidden="true" />

          {/* Interactive Mode Toggle Pill (Centered Above Title, below fixed navbar) */}
          <div className="absolute top-[84px] left-1/2 -translate-x-1/2 z-20" style={{ top: '84px' }}>
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsAiMode((prev) => !prev);
              }}
              className="home-hero__switch-pill hover:shadow-md transition-shadow cursor-pointer"
              aria-label="Toggle Studio Mode"
            >
              <span>{isAiMode ? 'Studio Mode: Active' : 'Design ↔ Code'}</span>
              <span className={`home-hero__switch-toggle ${isAiMode ? 'bg-[#0859D4]' : 'bg-[#1D1D1F]'}`}>
                <span className="home-hero__switch-toggle-knob transition-transform duration-200" />
              </span>
            </button>
          </div>

          {/* Floating Frosted Glass Tool Badges */}
          <div className="hidden md:block">
            {/* VS Code */}
            <div
              className="home-hero__app top-[22%] left-[10%] lg:left-[14%]"
              title="Full-Stack Code Architecture"
            >
              <Code className="w-5 h-5 text-[#18A0FB]" />
            </div>

            {/* Figma */}
            <div
              className="home-hero__app top-[20%] right-[10%] lg:right-[14%]"
              title="Design Systems & UI/UX"
            >
              <Palette className="w-5 h-5 text-[#EF5533]" />
            </div>

            {/* Next.js 16 */}
            <div
              className="home-hero__app bottom-[22%] left-[12%] lg:left-[16%]"
              title="Next.js 16.4 Engine"
            >
              <Layers className="w-5 h-5 text-[#1D1D1F]" />
            </div>

            {/* Performance Turbo */}
            <div
              className="home-hero__app bottom-[22%] right-[12%] lg:right-[16%]"
              title="Performance & Lighthouse 100"
            >
              <Sparkles className="w-5 h-5 text-[#0859D4]" />
            </div>
          </div>

          {/* Figma Live Speech Comment Bubbles */}
          <div className="hidden lg:block pointer-events-none">
            {/* Bubble 1: Top Right */}
            <div className="comentario-figma top-[12%] right-[6%] xl:right-[10%]">
              <div className="comentario-figma__burbuja animate-[pulse_4s_ease-in-out_infinite]">
                <div className="comentario-figma__avatar">PM</div>
                <div className="comentario-figma__contenido">
                  <p className="comentario-figma__header">
                    <strong>PixelMutiny</strong> <span>just now</span>
                  </p>
                  <p className="comentario-figma__texto">Let&apos;s build your next website.</p>
                </div>
              </div>
            </div>

            {/* Bubble 2: Bottom Left */}
            <div className="comentario-figma bottom-[12%] left-[6%] xl:left-[10%]">
              <div className="comentario-figma__burbuja">
                <div className="comentario-figma__avatar bg-[#1BC47D]">CD</div>
                <div className="comentario-figma__contenido">
                  <p className="comentario-figma__header">
                    <strong>Director</strong> <span>2m ago</span>
                  </p>
                  <p className="comentario-figma__texto">Engineered to break the template.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborative Live Figma Cursors (Desktop) */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden" aria-hidden="true">
              {collaborators.map((c) => (
                <div
                  key={c.id}
                  className="home-hero__cursor transition-transform duration-75 ease-out"
                  style={{
                    left: `${c.x}%`,
                    top: `${c.y}%`,
                  }}
                >
                  <svg width="15" height="17" viewBox="0 0 22 24" fill="none">
                    <path
                      d="M6.5 17.1L4 2.6C3.9 2.2 4.4 1.9 4.7 2.1L17.5 9.1C17.9 9.3 17.8 9.9 17.4 10L11 10.9C10.8 10.9 10.7 11 10.6 11.2L7.4 17.3C7.2 17.7 6.6 17.6 6.5 17.1Z"
                      fill={c.color}
                    />
                    <path
                      d="M3 2.8C2.8 1.6 4 0.6 5.1 1.1L18 8.2C19.3 8.9 18.9 10.8 17.5 11L11.4 11.9L8.3 17.7C7.6 19 5.7 18.7 5.5 17.3L3 2.8Z"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </svg>
                  <span
                    className="home-hero__cursor-label"
                    style={{ background: c.color }}
                  >
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Figma Selection Bounding Box with 8 Corner/Edge Handles */}
          <div className="home-hero__seleccion" aria-hidden="true">
            <div className="home-hero__seleccion-borde" />
            <span className="home-hero__handle home-hero__handle--tl" />
            <span className="home-hero__handle home-hero__handle--tr" />
            <span className="home-hero__handle home-hero__handle--tc" />
            <span className="home-hero__handle home-hero__handle--bl" />
            <span className="home-hero__handle home-hero__handle--br" />
            <span className="home-hero__handle home-hero__handle--bc" />
            <span className="home-hero__handle home-hero__handle--ml" />
            <span className="home-hero__handle home-hero__handle--mr" />
          </div>

          {/* Monumental Onlines Centered Title */}
          <h1 className="home-hero__titulo select-none">
            PixelMutiny.
          </h1>

          {/* Bottom Telemetry & Showreel Action */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#5A5A5E] gap-4 z-20">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#1BC47D] animate-ping" />
              <span className="text-[#1D1D1F] font-semibold">PixelMutiny DigiMedia LLP</span>
              <span className="hidden sm:inline text-[rgba(18,18,19,0.2)]">|</span>
              <span className="hidden sm:inline">New Delhi, India (HQ)</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsShowreelOpen(true);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(18,18,19,0.15)] bg-white text-[#1D1D1F] hover:border-[#0859D4] hover:text-[#0859D4] transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Showreel [01:15]</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsInquiryOpen(true);
                }}
                className="btn-onlines-dark text-xs py-1.5 px-4"
              >
                Let&apos;s Talk ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2: HOME QUOTE BLOCK (EDITORIAL MANIFESTO WITH DOT FIELD)
          =================================================================== */}
      <section
        onMouseMove={handleMouseMove}
        className="home-quote-block relative border-b border-[rgba(18,18,19,0.08)] patron-puntos"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        <div className="home-quote-block__contenido py-12 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#0859D4] font-bold mb-6">
            [ 01 // Manifesto ]
          </p>

          <h2 className="home-quote-block__titulo">
            We build high-performance web systems for ambitious companies and brands.
          </h2>

          <p className="home-quote-block__subtitulo">
            Following our mission to break the template and make the internet a sharper, better place.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              onClick={playClick}
              className="btn-onlines-blue"
            >
              Explore Services
            </Link>
            <Link
              href="/works"
              onClick={playClick}
              className="btn-onlines-outline"
            >
              View Selected Work
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3: PRIMARY SERVICES (ONLINES VERTICAL BLUE CAPABILITY CARDS)
          =================================================================== */}
      <section className="py-20 border-b border-[rgba(18,18,19,0.08)] bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-mono text-xs uppercase text-[#0859D4] font-semibold tracking-wider block mb-2">
                [ 02 // Core Capabilities ]
              </span>
              <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1D1D1F]">
                Tailored digital solutions.
              </h3>
            </div>
            <p className="max-w-md text-sm text-[#424242] font-mono leading-relaxed">
              Every pixel has a job. We unite bespoke design, bulletproof engineering, and performance growth under one studio.
            </p>
          </div>

          {/* 3 Featured Vertical Blue Cards */}
          <div className="home-servicios__grilla mb-16">
            {/* Card 1: UI/UX & Design */}
            <article className="card-servicio-article">
              <Link
                href="/services"
                onClick={playClick}
                className="card-servicio--vertical group"
              >
                <div className="card-servicio__tarjeta shader-halftone">
                  <div className="card-servicio__textos">
                    <h4 className="card-servicio__titulo">
                      <span>Experience & Interface Design</span>
                      <span className="card-servicio__titulo-puntos" />
                    </h4>
                    <p className="card-servicio__descripcion">
                      Users are the core of our creation process. We craft pixel-by-pixel relevant digital products, design systems, and identities that users genuinely love.
                    </p>
                  </div>
                  <span className="card-servicio__cta--vertical">
                    View Services
                  </span>
                </div>
                <p className="card-servicio__texto-debajo">
                  Our design thinking process empowers your brand from day zero to launch.
                </p>
              </Link>
            </article>

            {/* Card 2: Bespoke Web Development */}
            <article className="card-servicio-article">
              <Link
                href="/services"
                onClick={playClick}
                className="card-servicio--vertical group"
              >
                <div className="card-servicio__tarjeta shader-halftone">
                  <div className="card-servicio__textos">
                    <h4 className="card-servicio__titulo">
                      <span>Bespoke Web Development</span>
                      <span className="card-servicio__titulo-puntos" />
                    </h4>
                    <p className="card-servicio__descripcion">
                      Engineering lightning-fast, fully responsive web applications on Next.js 16 and modern cloud architectures. Built for performance, SEO, and bulletproof security.
                    </p>
                  </div>
                  <span className="card-servicio__cta--vertical">
                    View Services
                  </span>
                </div>
                <p className="card-servicio__texto-debajo">
                  Every deployment is bespoke for each client, adhering to global web quality standards.
                </p>
              </Link>
            </article>

            {/* Card 3: Performance & Growth */}
            <article className="card-servicio-article">
              <Link
                href="/services"
                onClick={playClick}
                className="card-servicio--vertical group"
              >
                <div className="card-servicio__tarjeta shader-halftone">
                  <div className="card-servicio__textos">
                    <h4 className="card-servicio__titulo">
                      <span>Performance & Growth Strategy</span>
                      <span className="card-servicio__titulo-puntos" />
                    </h4>
                    <p className="card-servicio__descripcion">
                      Full-funnel Meta Ads, viral content creation, technical conversion rate optimization, and deep telemetry analytics to drive compounding revenue.
                    </p>
                  </div>
                  <span className="card-servicio__cta--vertical">
                    View Services
                  </span>
                </div>
                <p className="card-servicio__texto-debajo">
                  Your growth is our accountability. End-to-end management with transparent reporting.
                </p>
              </Link>
            </article>
          </div>

          {/* Horizontal Specialized Service Rows with Dotted Dividers */}
          <div className="border-t border-[rgba(18,18,19,0.1)] pt-8">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#5A5A5E] mb-4 font-semibold">
              All Studio Disciplines (8 Packages Available)
            </h4>
            <div className="divide-y divide-[rgba(18,18,19,0.08)]">
              {SERVICES_DATA.slice(0, 5).map((srv) => (
                <div
                  key={srv.id}
                  className="card-servicio--horizontal group py-6"
                >
                  <div>
                    <h5 className="card-servicio__titulo-horizontal group-hover:text-[#0859D4] transition-colors">
                      {srv.title}
                    </h5>
                    <p className="text-xs text-[#5A5A5E] font-mono mt-1">
                      {srv.deliverables.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-[#1D1D1F] font-semibold hidden sm:inline">
                      From {formatPrice(currency === 'INR' ? srv.tiers[0].priceINR : srv.tiers[0].priceUSD, currency)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setIsInquiryOpen(true);
                      }}
                      className="card-servicio__cta-horizontal"
                    >
                      Inquire ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:text-right">
              <Link
                href="/services"
                onClick={playClick}
                className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-[#0859D4] hover:underline"
              >
                <span>View Full Pricing Matrix & Startup Launch Kit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 4: DARK MODE BENTO ("FROM ZERO TO ONE")
          =================================================================== */}
      <section className="home-bloque-dark-mode border-b border-[rgba(18,18,19,0.08)]">
        <div className="home-bloque-dark-mode__container">
          <div className="home-bloque-dark-mode__card">
            <div className="home-bloque-dark-mode__contenido">
              {/* Figma dashed selection frame */}
              <div className="home-bloque-dark-mode__titulo-wrap">
                <div className="home-bloque-dark-mode__seleccion" aria-hidden="true" />
                <h3 className="home-bloque-dark-mode__titulo">
                  From Zero to One
                </h3>
              </div>

              <p className="home-bloque-dark-mode__descripcion">
                We work under an agile collaborative methodology that allows us to build world-class digital platforms tailored strictly to client outcomes.
              </p>

              <p className="home-bloque-dark-mode__texto-secundario">
                We know turning ambitious ideas into reality requires focus. That&apos;s why PixelMutiny partners with you end-to-end—no juggling five disconnected agencies.
              </p>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsInquiryOpen(true);
                }}
                className="home-bloque-dark-mode__boton"
              >
                Schedule a Call ↗
              </button>
            </div>

            {/* Laptop Mockup with Glowing Halftone Texture */}
            <div className="home-bloque-dark-mode__pc shader-halftone relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#021133] via-[#0859D4]/40 to-[#021133] opacity-80" />
              <div className="relative z-10 text-center p-8 text-white font-mono space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#0859D4] flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="text-lg font-bold font-display">PixelMutiny DigiMedia LLP</div>
                <div className="text-xs text-white/70 max-w-xs mx-auto">
                  Next.js 16.4 • React 19 • Tailwind • Supabase • Vercel Edge
                </div>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] bg-white/10 border border-white/20 text-[#18A0FB]">
                    Production Grade Architecture
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs font-mono text-[#5A5A5E]">
            PixelMutiny DigiMedia LLP is a hybrid digital studio based in India, delivering globally for brands across North America, Europe, UAE, and APAC.
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5: STUDIO TEAM & LIVE STREAM ("UN EQUIPO QUE AMA INTERNET")
          =================================================================== */}
      <section className="home-equipo border-b border-[rgba(18,18,19,0.08)]">
        <div className="home-equipo__inner">
          {/* Architectural Cell Grid */}
          <div className="grilla-celdas opacity-40 pointer-events-none" aria-hidden="true" />

          {/* Heading with Yellow Highlight Rectangle */}
          <div className="home-equipo__titulo-wrap">
            <h3 className="home-equipo__titulo">
              A studio team that{' '}
              <strong className="home-equipo__titulo-highlight">
                lives and breathes the web.
              </strong>
            </h3>
          </div>

          <p className="max-w-xl mx-auto text-[#424242] text-sm sm:text-base leading-relaxed mb-8">
            Engineers, designers, copywriters, and ad strategists who refuse cookie-cutter templates. We craft digital experiences with ruthless attention to detail.
          </p>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsInquiryOpen(true);
            }}
            className="home-equipo__boton"
          >
            Start a Project with Us ↗
          </button>

          {/* Live Studio Status Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#424242]">
            <div className="px-3 py-1.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0859D4]" />
              <span>PixelMutiny right now: Accepting Q4 sprint projects</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1BC47D]" />
              <span>Average sprint turnaround: 7 to 14 days</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 6: CURATED WORKS ("LOS DETALLES NO SON DETALLES")
          =================================================================== */}
      <section className="home-portfolio border-b border-[rgba(18,18,19,0.08)]">
        <div className="home-portfolio__inner">
          <div className="home-portfolio__bloque">
            {/* Left Content */}
            <div className="home-portfolio__contenido">
              <span className="font-mono text-xs uppercase text-[#0859D4] font-semibold tracking-wider">
                [ 03 // Portfolio ]
              </span>

              <h3 className="home-portfolio__titulo">
                <span className="home-portfolio__titulo-linea">
                  <span>The details</span>
                  <span className="home-portfolio__titulo-puntos" />
                </span>
                <span className="home-portfolio__titulo-linea">
                  <span>are not details.</span>
                  <span className="home-portfolio__titulo-puntos" />
                </span>
              </h3>

              <p className="home-portfolio__descripcion">
                We believe design and engineering are inseparable in our craft. Every interaction, typeface, transition, and micro-animation is tuned to convert visitors into loyal clients.
              </p>

              <div className="home-portfolio__botonera">
                <Link
                  href="/works"
                  onClick={playClick}
                  className="home-portfolio__boton"
                >
                  Explore All Work (08)
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setIsShowreelOpen(true);
                  }}
                  className="btn-onlines-outline"
                >
                  Watch Reel ▶
                </button>
              </div>
            </div>

            {/* Right: Fanned-Out Interactive Card Deck */}
            <div className="home-portfolio__tarjetas-area">
              {featuredProjects.map((proj, idx) => (
                <Link
                  key={proj.id}
                  href={`/works/${proj.slug}`}
                  onClick={playClick}
                  className={`home-portfolio__tarjeta home-portfolio__tarjeta--${idx + 1}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={proj.heroImg || proj.coverImg}
                      alt={proj.client}
                      fill
                      sizes="340px"
                      className="home-portfolio__tarjeta-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="font-mono text-[10px] uppercase text-[#18A0FB] font-bold">
                        {proj.category}
                      </span>
                      <h4 className="font-display font-bold text-lg leading-tight mt-0.5">
                        {proj.client}
                      </h4>
                      <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                        {proj.metrics?.[0]?.value || '+340% Traffic'} — {proj.metrics?.[0]?.label || 'Impact'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Brand / Partner Marquee */}
        <div className="slider-logos mt-16">
          <div className="slider-logos__track">
            {[
              'NEXT.JS 16',
              'REACT 19',
              'TAILWIND CSS',
              'SUPABASE',
              'VERCEL EDGE',
              'META ADS',
              'TYPESCRIPT',
              'FIGMA DESIGN',
              'TURBOPACK',
              'LIGHTHOUSE 100',
              'NEXT.JS 16',
              'REACT 19',
              'TAILWIND CSS',
              'SUPABASE',
              'VERCEL EDGE',
              'META ADS',
            ].map((tech, i) => (
              <span key={i} className="slider-logos__item">
                {tech}
                <span className="mx-6 text-black/15">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 7: CONTACT LAUNCHPAD ("HAGAMOS UN PROYECTO JUNTOS")
          =================================================================== */}
      <section
        onMouseMove={handleMouseMove}
        className="home-contacto relative"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        <div className="home-contacto__inner">
          <div className="home-contacto__grilla">
            {/* Left Interactive Composition with Aa & Dot Grid */}
            <div className="home-contacto__animaciones patron-puntos relative">
              <span className="home-contacto__aa" aria-hidden="true">
                Aa
              </span>

              {/* Floating Metric Card Preview */}
              <div className="absolute bottom-10 left-8 right-8 bg-white/95 backdrop-blur-md rounded-xl p-5 border border-[rgba(18,18,19,0.1)] shadow-xl z-10 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[#5A5A5E]">
                  <span>PIXELMUTINY TELEMETRY</span>
                  <span className="text-[#0859D4] font-bold">100% PASS</span>
                </div>
                <div className="text-sm font-display font-bold text-[#1D1D1F]">
                  Ready to break the template?
                </div>
                <div className="text-[11px] text-[#424242]">
                  New Delhi studio headquarters • Worldwide remote sprint delivery.
                </div>
              </div>
            </div>

            {/* Right Contact Details & Trigger */}
            <div className="home-contacto__contenido">
              <span className="font-mono text-xs uppercase text-[#0859D4] font-semibold tracking-wider">
                [ 04 // Contact ]
              </span>

              <h3 className="home-contacto__titulo">
                <span className="home-contacto__titulo-linea">
                  <span>Let&apos;s build a</span>
                  <span className="home-contacto__titulo-puntos" />
                </span>
                <span className="home-contacto__titulo-linea">
                  <span>project together.</span>
                  <span className="home-contacto__titulo-puntos" />
                </span>
              </h3>

              <p className="home-contacto__descripcion">
                Transform your ideas into a high-performance web platform that works relentlessly toward your business goals. We&apos;re ready to start building.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setIsInquiryOpen(true);
                  }}
                  className="home-contacto__boton"
                >
                  Let&apos;s Talk ↗
                </button>

                <a
                  href="mailto:contact@pixelmutiny.com"
                  className="btn-onlines-outline"
                >
                  contact@pixelmutiny.com
                </a>
              </div>

              {/* Social Channels Matching Onlines */}
              <div className="flex items-center gap-6 pt-6 border-t border-[rgba(18,18,19,0.1)] font-mono text-xs text-[#5A5A5E]">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors"
                >
                  X (Twitter) ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/gfxsumit/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#0859D4] transition-colors"
                >
                  Behance ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
