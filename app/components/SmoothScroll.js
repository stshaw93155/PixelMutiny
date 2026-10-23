'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion, initGsapPlugins } from '@/lib/motion';

export default function SmoothScroll({ children }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef(null);
  const pathname = usePathname();

  // Reset body overflow and refresh scroll on route changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    if (lenisRef.current) {
      lenisRef.current.start();
      lenisRef.current.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  useEffect(() => {
    initGsapPlugins();

    if (typeof window === 'undefined' || reducedMotion) {
      const handleScrollToTopFallback = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      };
      window.addEventListener('bv_scroll_top', handleScrollToTopFallback);
      return () => {
        window.removeEventListener('bv_scroll_top', handleScrollToTopFallback);
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Keep native touch performance on mobile
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Modal stop/start listeners to prevent Lenis from intercepting scroll in modals
    const handleModalOpen = () => {
      lenis.stop();
    };
    const handleModalClose = () => {
      lenis.start();
    };
    window.addEventListener('pixelmutiny_modal_open', handleModalOpen);
    window.addEventListener('pixelmutiny_modal_close', handleModalClose);

    // Smooth anchor scrolling for in-page links (e.g. #brand, #landing, #pricing, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Listen for custom "scroll_to_top" events
    const handleScrollToTop = () => {
      lenis.scrollTo(0, { duration: 1.2 });
    };
    window.addEventListener('bv_scroll_top', handleScrollToTop);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('bv_scroll_top', handleScrollToTop);
      window.removeEventListener('pixelmutiny_modal_open', handleModalOpen);
      window.removeEventListener('pixelmutiny_modal_close', handleModalClose);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
