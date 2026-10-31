'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSound } from './SoundManager';
import { ArrowUpRight, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGsapPlugins, useReducedMotion } from '@/lib/motion';

const BENCHMARK_PROJECTS = [
  {
    year: '2026',
    client: 'Avenor Logistics',
    slug: 'avenor',
    architecture: 'Enterprise Operations Cockpit & Inventory Data Grid',
    discipline: 'UI/UX SYSTEMS',
    metric: '+185% FULFILLMENT',
    badge: 'ENTERPRISE OPS',
  },
  {
    year: '2026',
    client: 'FlowTask Workspace',
    slug: 'flow-task',
    architecture: 'Sub-Second Kanban & Sprint Telemetry Platform',
    discipline: 'UI/UX SYSTEMS',
    metric: '+210% VELOCITY',
    badge: 'PRODUCTIVITY',
  },
  {
    year: '2026',
    client: 'Veyra Legal',
    slug: 'veyra-legal',
    architecture: 'Monumental Institutional Advisory & Case Dossier Portal',
    discipline: 'LANDING PAGES',
    metric: '+320% INQUIRIES',
    badge: 'CORPORATE LAW',
  },
  {
    year: '2026',
    client: 'Morrow House',
    slug: 'morrow-house',
    architecture: 'Sensory Fragrance Flagship & Slide-Out Cart Funnel',
    discipline: 'WEB DESIGN',
    metric: '+275% AOV',
    badge: 'LUXURY E-COM',
  },
  {
    year: '2025',
    client: 'Veloce AI',
    slug: 'veloce-ai',
    architecture: 'Conversational LLM Interface & Modular Component Library',
    discipline: 'UI/UX SYSTEMS',
    metric: '+168% ACTIVATION',
    badge: 'AI INTERACTION',
  },
  {
    year: '2025',
    client: 'Krono Pay',
    slug: 'krono-pay',
    architecture: 'Checkout Flow with 3D Card Simulator & Live Telemetry',
    discipline: 'LANDING PAGES',
    metric: '4.9% CONV. RATE',
    badge: 'FINTECH CRO',
  },
  {
    year: '2025',
    client: 'Maison Aura',
    slug: 'maison-aura',
    architecture: 'Spatial 3D Gallery & WebGL Architecture Showcase',
    discipline: 'WEB DESIGN',
    metric: 'SUB-16MS FRAME',
    badge: 'SPATIAL WEB',
  },
  {
    year: '2026',
    client: 'Axon Robotics',
    slug: 'axon-robotics',
    architecture: 'Commercial Humanoid Robotics Flagship & 3D Key Visuals',
    discipline: 'GRAPHICS & BRAND',
    metric: '3D KINEMATICS',
    badge: 'CONCEPT SPEC',
  },
];

export default function AwardsTable() {
  const { playHover, playClick } = useSound();
  const tableRef = useRef(null);
  const rowsRef = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    const rows = rowsRef.current.filter(Boolean);
    if (!tableRef.current || rows.length === 0) return;

    if (reducedMotion) {
      gsap.set(rows, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(rows, { opacity: 0, y: 16 });

    const anim = gsap.to(rows, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: tableRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    // Safety fallback: force visibility after 1.2s so rows never stay at opacity: 0
    const timer = setTimeout(() => {
      gsap.set(rows, { opacity: 1, y: 0 });
    }, 1200);

    return () => {
      clearTimeout(timer);
      anim.kill();
    };
  }, [reducedMotion]);

  return (
    <div ref={tableRef} className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[rgba(18,18,19,0.08)] gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#0859D4]" />
            <span className="font-bold text-[#0859D4] uppercase tracking-wider">
              05 // BENCHMARK LEDGER
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#424242] font-medium">
              Verified Conversion Architectures
            </span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight"
            style={{ lineHeight: 1.15 }}
          >
            BENCHMARK PROJECTS ✽ MEASURED BY CONVERSION
          </h2>
        </div>
        <div className="text-xs text-[#6B7280] flex items-center gap-2 font-medium">
          <Layers className="w-4 h-4 text-[#0859D4]" />
          <span>HIGH-VELOCITY DESIGN SYSTEMS &amp; CRO ARCHITECTURES</span>
        </div>
      </div>

      {/* Tightened Responsive Table with Stagger Reveal and Horizontal Scroll Shadow */}
      <div className="w-full overflow-x-auto rounded-2xl border border-[rgba(18,18,19,0.08)] bg-white shadow-sm scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[680px]">
          <thead>
            <tr className="border-b border-[rgba(18,18,19,0.08)] text-[#1D1D1F] bg-[#F5F5F7]">
              <th className="py-3.5 px-4 w-20 font-bold uppercase tracking-wider text-xs">YEAR</th>
              <th className="py-3.5 px-4 w-44 font-bold uppercase tracking-wider text-xs">CLIENT</th>
              <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-xs">SYSTEM ARCHITECTURE / DELIVERABLE</th>
              <th className="py-3.5 px-4 hidden md:table-cell w-40 font-bold uppercase tracking-wider text-xs">DISCIPLINE</th>
              <th className="py-3.5 px-4 text-right w-44 font-bold uppercase tracking-wider text-xs">BENCHMARK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(18,18,19,0.06)]">
            {BENCHMARK_PROJECTS.map((item, idx) => (
              <tr
                key={idx}
                ref={(el) => (rowsRef.current[idx] = el)}
                onMouseEnter={playHover}
                onClick={playClick}
                className="group hover:bg-[#F5F5F7]/80 transition-colors cursor-pointer"
                data-cursor="CASE"
              >
                <td className="py-4 px-4 text-[#6B7280] group-hover:text-[#1D1D1F] transition-colors font-semibold text-xs">
                  {item.year}
                </td>
                <td className="py-4 px-4 font-display font-bold text-[#1D1D1F] text-sm sm:text-base group-hover:text-[#0859D4] group-hover:translate-x-1 transition-transform">
                  <Link href={`/works/${item.slug}`} className="hover:underline">
                    {item.client}
                  </Link>
                </td>
                <td className="py-4 px-4 text-[#424242] group-hover:text-[#1D1D1F] transition-colors font-medium text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span>{item.architecture}</span>
                    <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#1D1D1F] font-semibold">
                      {item.badge}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[#6B7280] hidden md:table-cell text-xs font-medium">
                  {item.discipline}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/works/${item.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0859D4] bg-[#0859D4]/8 hover:bg-[#0859D4] hover:text-white px-3 py-1.5 rounded-full border border-[#0859D4]/20 transition-all shadow-sm"
                  >
                    <span>{item.metric}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
