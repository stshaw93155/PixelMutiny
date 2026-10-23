'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/motion';

const ROUTE_NAMES = {
  '/': 'INDEX // OVERVIEW',
  '/works': 'SELECTED WORKS (08)',
  '/services': 'SERVICES & PRICING',
  '/about': 'AGENCY MANIFESTO',
  '/contact': 'INITIATE PROJECT',
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const isFirstRender = useRef(true);
  const reducedMotion = useReducedMotion();

  // Derive page title directly from current route
  let currentPageTitle = ROUTE_NAMES[pathname] || 'CASE STUDY // ARCHIVE';
  if (pathname.startsWith('/works/')) {
    const slug = pathname.replace('/works/', '').toUpperCase();
    currentPageTitle = `PROJECT // ${slug}`;
  }

  useEffect(() => {

    // On initial mount, don't play wipe over preloader
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (reducedMotion) {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Refresh ScrollTriggers smoothly without destroying component instances
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    // Make overlay active and animate wipe out upward revealing new page
    gsap.set(overlay, { display: 'flex', yPercent: 0 });
    gsap.to(
      overlay,
      {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlay, { display: 'none', yPercent: 100 });
          ScrollTrigger.refresh();
        },
      }
    );
  }, [pathname, reducedMotion]);

  return (
    <>
      {/* Wipe Overlay Panel (hidden by default, display:none when idle) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99999] bg-[#0A0A0C] text-white flex-col justify-between p-8 sm:p-12 pointer-events-none select-none"
        style={{ display: 'none', transform: 'translateY(100%)', willChange: 'transform' }}
      >
        <div className="flex items-center justify-between font-mono text-xs text-[#787884] tracking-wider">
          <span>● TRANSITION ENGINE</span>
          <span>[VELOCITY 0.7S]</span>
        </div>

        <div className="text-center overflow-hidden">
          <h2
            ref={titleRef}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase"
          >
            {currentPageTitle}
          </h2>
          <span className="font-mono text-xs text-[#0859D4] tracking-widest mt-2 block font-bold">
            PIXELMUTINY
          </span>
        </div>

        <div className="flex items-center justify-between font-mono text-[11px] text-[#787884]">
          <span>NEW DELHI // IST</span>
          <span>DISCIPLINE IN MOTION</span>
        </div>
      </div>

      {children}
    </>
  );
}
