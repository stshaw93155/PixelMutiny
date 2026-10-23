'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Marquee from '../components/Marquee';
import QuickInquiryDrawer from '../components/QuickInquiryDrawer';
import ProjectShowcaseModal from '../components/ProjectShowcaseModal';
import { useSound } from '../components/SoundManager';
import { PROJECTS } from '../data/projects';
import {
  ButtonRoll,
  useReducedMotion,
} from '@/lib/motion';
import {
  ArrowUpRight,
  Maximize2,
} from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'ALL', label: 'ALL' },
  { id: 'UI/UX SYSTEMS', label: 'UI/UX SYSTEMS' },
  { id: 'LANDING PAGES', label: 'LANDING PAGES' },
  { id: 'WEB DESIGN', label: 'WEB DESIGN' },
  { id: 'GRAPHICS & BRAND', label: 'GRAPHICS & BRAND' },
];

function WorksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const projectParam = searchParams.get('project');

  // Derive active category directly from searchParams or default to 'ALL'
  const activeCategory = categoryParam
    ? CATEGORY_TABS.find(
        (t) => t.id.toLowerCase().replace(/[^a-z0-9]/g, '-') === categoryParam.toLowerCase()
      )?.id || 'ALL'
    : 'ALL';

  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });
  const { playClick, playHover } = useSound();
  const reducedMotion = useReducedMotion();

  // Sync modal state with URL ?project=slug
  useEffect(() => {
    if (projectParam) {
      const match = PROJECTS.find((p) => p.slug === projectParam);
      if (match) setSelectedProject(match);
    } else {
      setSelectedProject(null);
    }
  }, [projectParam]);

  // Mouse coordinate tracker for patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  // Keep state in sync with URL if user navigates back/forward
  const currentCategory = categoryParam ? activeCategory : selectedCategory;

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    playClick();
    const slug = catId === 'ALL' ? '' : catId.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    const newQuery = params.toString();
    router.replace(newQuery ? `/works?${newQuery}` : '/works', { scroll: false });
  };

  const handleOpenShowcase = (project) => {
    playClick();
    setSelectedProject(project);
    const params = new URLSearchParams(searchParams.toString());
    params.set('project', project.slug);
    router.replace(`/works?${params.toString()}`, { scroll: false });
  };

  const handleCloseShowcase = () => {
    playClick();
    setSelectedProject(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('project');
    const newQuery = params.toString();
    router.replace(newQuery ? `/works?${newQuery}` : '/works', { scroll: false });
  };

  // Dynamically compute category counts from actual project data
  const categoryCounts = {
    ALL: PROJECTS.length,
    'UI/UX SYSTEMS': PROJECTS.filter((p) => p.category === 'UI/UX SYSTEMS').length,
    'LANDING PAGES': PROJECTS.filter((p) => p.category === 'LANDING PAGES').length,
    'WEB DESIGN': PROJECTS.filter((p) => p.category === 'WEB DESIGN').length,
    'GRAPHICS & BRAND': PROJECTS.filter((p) => p.category === 'GRAPHICS & BRAND').length,
  };

  const filteredProjects = PROJECTS.filter((project) => {
    if (currentCategory === 'ALL') return true;
    return project.category === currentCategory;
  });

  return (
    <div className="w-full bg-white text-[#1D1D1F] min-h-screen select-none selection:bg-[#0859D4] selection:text-white">
      <QuickInquiryDrawer
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Showcase Modal Overlay (Matches Image 2) */}
      <ProjectShowcaseModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={handleCloseShowcase}
        onSelectProject={(newProject) => handleOpenShowcase(newProject)}
      />

      {/* Top Header & Breadcrumb with explicit top padding (pt-32) below sticky nav */}
      <section
        onMouseMove={handleMouseMove}
        className="relative border-b border-[rgba(18,18,19,0.08)] pt-32 pb-12 px-4 sm:px-8 md:px-12 bg-white patron-puntos overflow-hidden"
        style={{
          '--dot-x': dotPos.x,
          '--dot-y': dotPos.y,
        }}
      >
        {/* Subtle Architectural Cell Grid */}
        <div className="grilla-celdas opacity-40 pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1920px] mx-auto relative z-10">
          {/* Breadcrumb with generous spacing */}
          <div className="flex items-center gap-3 text-xs text-[#1D1D1F] font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0859D4]" />
            <span className="uppercase tracking-wider">02 // SELECTED WORKS (08)</span>
            <span className="text-[rgba(18,18,19,0.2)]">|</span>
            <span className="text-[#424242] font-medium hidden sm:inline uppercase tracking-wider">
              CURATED BENCHMARK PORTFOLIO
            </span>
            <span className="text-[rgba(18,18,19,0.2)] hidden sm:inline">|</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-[rgba(18,18,19,0.08)] text-[#424242] text-xs font-normal">
              Bespoke Client Platforms
            </span>
          </div>

          {/* Title with Dotted Baseline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-4">
            <span className="dotted-baseline">Selected Works (08)</span>
          </h1>

          <p className="text-base sm:text-lg text-[#424242] max-w-2xl leading-relaxed mb-8 font-normal">
            A showcase of conversion-engineered landing pages, interactive high-performance web systems, and scalable product design architectures.
          </p>

          {/* Filter Pills */}
          <div className="pt-6 border-t border-[rgba(18,18,19,0.08)]">
            <div
              role="tablist"
              aria-label="Filter case studies by category"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
            >
              {CATEGORY_TABS.map((tab) => {
                const active = currentCategory === tab.id;
                const count = categoryCounts[tab.id] || 0;
                const formattedCount = String(count).padStart(2, '0');
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleCategorySelect(tab.id)}
                    className={`relative text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0859D4] ${
                      active
                        ? 'border-[#1D1D1F] bg-[#1D1D1F] text-white font-bold shadow-sm'
                        : 'border-[rgba(18,18,19,0.16)] text-[#1D1D1F] bg-white hover:border-[#1D1D1F] font-semibold'
                    }`}
                    data-cursor="FILTER"
                  >
                    <span>{tab.label}</span>
                    <span className={active ? 'text-white/80 font-bold' : 'text-[#6B7280] font-semibold'}>
                      ({formattedCount})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Works Showcase Container */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-12">
        {filteredProjects.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center space-y-4">
            <p className="text-base text-[#424242] font-medium">
              No case studies found for this category filter.
            </p>
            <button
              onClick={() => handleCategorySelect('ALL')}
              className="btn-onlines-blue py-2.5 px-6 text-xs cursor-pointer"
            >
              <ButtonRoll text="RESET TO ALL (08)" icon="→" />
            </button>
          </div>
        ) : (
          /* 4-COLUMN GALLERY GRID (Exclusive View matching Image 1) */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    delay: reducedMotion ? 0 : idx * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col group"
                >
                  {/* Card Thumbnail Frame: 16:10 aspect ratio with rounded corners matching Image 1 */}
                  <div
                    onClick={() => handleOpenShowcase(project)}
                    onMouseEnter={playHover}
                    className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[rgba(18,18,19,0.12)] bg-[#0C0C12] transition-all duration-300 group-hover:border-[#1D1D1F] group-hover:shadow-2xl shadow-sm cursor-pointer"
                  >
                    <Image
                      src={project.coverImg || project.heroImg}
                      alt={`${project.client} - ${project.title}`}
                      fill
                      priority={idx < 4}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />

                    {/* Subtle Hover Overlay with Quick Preview CTA */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#1D1D1F] text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span>Showcase</span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#0859D4]" />
                      </span>
                    </div>
                  </div>

                  {/* Card Metadata Row strictly OUTSIDE and UNDERNEATH thumbnail (Image 1 match) */}
                  <div className="flex items-center justify-between pt-3 pb-1 px-1 text-xs">
                    {/* Left: Avatar + Client/Author + PRO badge */}
                    <div
                      onClick={() => handleOpenShowcase(project)}
                      className="flex items-center gap-2 min-w-0 cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 shadow-sm">
                        {project.client?.charAt(0) || 'P'}
                      </div>
                      <span className="font-bold text-[#1D1D1F] truncate group-hover:text-[#0859D4] transition-colors">
                        {project.client}
                      </span>
                      <span className="text-[9px] font-bold uppercase text-[#5A5A5E] bg-[#F5F5F7] px-1.5 py-0.5 rounded border border-[rgba(18,18,19,0.08)] flex-shrink-0">
                        PRO
                      </span>
                    </div>

                    {/* Right: Status Pill Tags (DEV, SOTD, popout) */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {project.award ? (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#EF5533]/30 text-[#EF5533] bg-[#EF5533]/8 uppercase tracking-wider">
                          SOTD
                        </span>
                      ) : null}
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-[rgba(18,18,19,0.12)] text-[#5A5A5E] bg-white uppercase">
                        DEV
                      </span>
                      <Link
                        href={`/works/${project.slug}`}
                        onClick={playClick}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[#5A5A5E] hover:text-[#0859D4] hover:bg-[#F5F5F7] transition-all"
                        title={`Open dedicated ${project.client} case study`}
                        aria-label={`Open ${project.client} case study page`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Marquee separator="✦" />
    </div>
  );
}

export default function WorksPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-white flex items-center justify-center text-xs text-[#5A5A5E]">
          INITIALIZING BENCHMARK LEDGER...
        </div>
      }
    >
      <WorksContent />
    </Suspense>
  );
}
