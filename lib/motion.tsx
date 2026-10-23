'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
  ReactNode,
  ElementType,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';
import Lenis from 'lenis';

// ============================================================================
// MOTION TOKENS (Strictly adhere to the design system specification)
// ============================================================================
export const MOTION_EASINGS = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  linear: [0, 0, 1, 1] as const,
  cssOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cssInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  gsapOut: 'pixelmutinyOut',
  gsapInOut: 'pixelmutinyInOut',
};

export const MOTION_DURATIONS = {
  micro: 0.2,
  hover: 0.3,
  reveal: 0.8,
  largeReveal: 1.1,
  pageTransition: 0.7,
  countUp: 1.6,
  scramble: 0.6,
  imageReveal: 1.2,
};

export const MOTION_STAGGER = {
  letters: 0.015,
  words: 0.06,
  lines: 0.1,
  cards: 0.08,
};

export const MOTION_DISTANCES = {
  textMask: '110%',
  block: 32,
  parallax: 0.08,
};

// Register GSAP plugins client-side once
let isGsapInitialized = false;
export function initGsapPlugins() {
  if (typeof window === 'undefined' || isGsapInitialized) return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  try {
    CustomEase.create(MOTION_EASINGS.gsapOut, '0.16, 1, 0.3, 1');
    CustomEase.create(MOTION_EASINGS.gsapInOut, '0.65, 0, 0.35, 1');
  } catch {
    // Fallback if custom ease fails
  }
  isGsapInitialized = true;
}

// ============================================================================
// HOOK: useReducedMotion (Concurrent & SSR Safe via useSyncExternalStore)
// ============================================================================
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    () => false
  );
}

// ============================================================================
// HOOK: useIsMobile (Responsive Viewport Tracking via useSyncExternalStore)
// ============================================================================
export function useIsMobile(): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () =>
      typeof window !== 'undefined'
        ? window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
        : false,
    () => false
  );
}

// ============================================================================
// COMPONENT: SplitReveal (Line-mask headline reveal for H1 & H2)
// ============================================================================
interface SplitRevealProps {
  children: string | ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  isHeroH1?: boolean;
  delay?: number;
}

export function SplitReveal({
  children,
  as: Component = 'h2',
  className = '',
  style = {},
  isHeroH1 = false,
  delay = 0,
}: SplitRevealProps) {
  const textRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!textRef.current || reducedMotion) return;

    const el = textRef.current;
    const rawText = el.innerText || '';
    if (!rawText.trim()) return;

    // Accessibility: set full raw text in aria-label, aria-hidden on split
    el.setAttribute('aria-label', rawText);

    let splitInstance: SplitType | null = null;
    let animTimeline: gsap.core.Timeline | null = null;

    const runSplitAndAnimation = () => {
      if (splitInstance) {
        splitInstance.revert();
      }

      // Split text into lines
      splitInstance = new SplitType(el, {
        types: 'lines',
        lineClass: 'bv-split-line',
      });

      if (!splitInstance.lines || splitInstance.lines.length === 0) return;

      // Wrap each line in an overflow:hidden mask wrapper
      splitInstance.lines.forEach((line) => {
        line.setAttribute('aria-hidden', 'true');
        const wrapper = document.createElement('span');
        wrapper.className = 'bv-line-mask';
        wrapper.style.display = 'block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'top';

        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);

        // Initial masked position
        gsap.set(line, {
          yPercent: 110,
          opacity: 1,
          willChange: 'transform',
        });
      });

      // Mark JS ready so CSS knows split is constructed
      el.classList.add('js-ready');

      // Fallback timeout (~1.2s) that forces visible so nothing remains invisible
      const fallbackTimer = setTimeout(() => {
        if (splitInstance?.lines) {
          gsap.to(splitInstance.lines, { yPercent: 0, duration: 0.3, overwrite: 'auto' });
        }
      }, 1200);

      // Create reveal timeline
      animTimeline = gsap.timeline({
        delay,
        scrollTrigger: isHeroH1
          ? undefined
          : {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
        onComplete: () => {
          clearTimeout(fallbackTimer);
          if (splitInstance?.lines) {
            gsap.set(splitInstance.lines, { clearProps: 'willChange' });
          }
        },
      });

      animTimeline.to(splitInstance.lines, {
        yPercent: 0,
        duration: Math.min(MOTION_DURATIONS.largeReveal, 0.6),
        stagger: Math.min(MOTION_STAGGER.lines, 0.05),
        ease: MOTION_EASINGS.gsapOut,
      });
    };

    // Run after fonts load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runSplitAndAnimation);
    } else {
      runSplitAndAnimation();
    }

    // Debounced re-split on window resize
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        runSplitAndAnimation();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      animTimeline?.kill();
      splitInstance?.revert();
    };
  }, [reducedMotion, isHeroH1, delay]);

  return (
    <Component
      ref={textRef as any}
      className={`bv-headline-reveal ${className}`}
      style={{
        ...style,
        position: 'relative',
      }}
    >
      {children}
    </Component>
  );
}

// ============================================================================
// COMPONENT: FadeUp (for blocks, cards, sections)
// ============================================================================
interface FadeUpProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  distance?: number;
  duration?: number;
}

export function FadeUp({
  children,
  className = '',
  style = {},
  delay = 0,
  distance = MOTION_DISTANCES.block,
  duration = MOTION_DURATIONS.reveal,
}: FadeUpProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!elRef.current) return;

    const el = elRef.current;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'willChange' });
      return;
    }

    gsap.set(el, {
      y: distance,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    // Safety fallback timeout (~1.2s) that forces visible so nothing remains invisible
    const fallbackTimer = setTimeout(() => {
      if (el) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.3, overwrite: 'auto' });
      }
    }, 1200);

    const anim = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: Math.min(duration, 0.5),
      delay: Math.min(delay, 0.3),
      ease: MOTION_EASINGS.gsapOut,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        clearTimeout(fallbackTimer);
        gsap.set(el, { clearProps: 'willChange' });
      },
    });

    return () => {
      clearTimeout(fallbackTimer);
      anim.scrollTrigger?.kill();
      anim.kill();
      if (el) {
        gsap.set(el, { clearProps: 'opacity,transform,willChange' });
      }
    };
  }, [reducedMotion, delay, distance, duration]);

  return (
    <div ref={elRef} className={className} style={style}>
      {children}
    </div>
  );
}

// ============================================================================
// COMPONENT: Magnetic (Cursor magnet pull effect for buttons/handles)
// ============================================================================
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number; // max pixels shift (default 12)
  radius?: number; // active radius (default 80)
}

export function Magnetic({
  children,
  className = '',
  strength = 12,
  radius = 80,
}: MagneticProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elRef.current || isMobile || reducedMotion) return;
    const el = elRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        const pull = 1 - distance / radius;
        const moveX = (distX / radius) * strength * pull;
        const moveY = (distY / radius) * strength * pull;

        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: MOTION_DURATIONS.hover,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [isMobile, reducedMotion, strength, radius]);

  return (
    <div ref={elRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

// ============================================================================
// COMPONENT: CountUp (tabular-nums odometer counter)
// ============================================================================
interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  formatCommas?: boolean;
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = MOTION_DURATIONS.countUp,
  className = '',
  formatCommas = true,
}: CountUpProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reducedMotion ? value : 0);

  const formatNumber = useCallback(
    (num: number) => {
      const rounded = Math.round(num);
      return formatCommas ? rounded.toLocaleString('en-US') : rounded.toString();
    },
    [formatCommas]
  );

  useEffect(() => {
    initGsapPlugins();
    if (!elRef.current || reducedMotion) {
      return;
    }

    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayValue(Math.round(obj.val));
      },
    });

    return () => {
      anim.kill();
    };
  }, [value, duration, reducedMotion]);

  return (
    <span
      ref={elRef}
      className={`tabular-nums ${className}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

// ============================================================================
// COMPONENT: ScrambleText (decode text on enter or hover)
// ============================================================================
interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//-+=*#@';

export function ScrambleText({
  text,
  className = '',
  triggerOnHover = false,
}: ScrambleTextProps) {
  const [currentText, setCurrentText] = useState(text);
  const elRef = useRef<HTMLSpanElement>(null);
  const isScramblingRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const runScramble = useCallback(() => {
    if (reducedMotion || isScramblingRef.current) return;
    isScramblingRef.current = true;

    const originalText = text;
    const length = originalText.length;
    let iteration = 0;
    const maxIterations = 14;

    const interval = setInterval(() => {
      setCurrentText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < (iteration / maxIterations) * length) {
              return originalText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setCurrentText(originalText);
        isScramblingRef.current = false;
      }
    }, 38);
  }, [text, reducedMotion]);

  useEffect(() => {
    initGsapPlugins();
    if (!elRef.current || reducedMotion) return;

    if (!triggerOnHover) {
      const trigger = ScrollTrigger.create({
        trigger: elRef.current,
        start: 'top 90%',
        onEnter: () => runScramble(),
      });
      return () => trigger.kill();
    }
  }, [triggerOnHover, runScramble, reducedMotion]);

  return (
    <span
      ref={elRef}
      onMouseEnter={triggerOnHover ? runScramble : undefined}
      className={`font-mono select-none ${className}`}
    >
      {currentText}
    </span>
  );
}

// ============================================================================
// COMPONENT: ImageReveal (clip-path inset reveal + inner scale)
// ============================================================================
interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function ImageReveal({
  children,
  className = '',
  style = {},
  delay = 0,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!containerRef.current || reducedMotion) return;

    const container = containerRef.current;
    const imageEl = container.querySelector('img') || container.firstElementChild;

    gsap.set(container, {
      clipPath: 'inset(100% 0 0 0)',
      WebkitClipPath: 'inset(100% 0 0 0)',
      willChange: 'clip-path',
    });

    if (imageEl) {
      gsap.set(imageEl, {
        scale: 1.25,
        willChange: 'transform',
      });
    }

    const tl = gsap.timeline({
      delay,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        gsap.set([container, imageEl], { clearProps: 'willChange' });
      },
    });

    tl.to(container, {
      clipPath: 'inset(0% 0 0 0)',
      WebkitClipPath: 'inset(0% 0 0 0)',
      duration: MOTION_DURATIONS.imageReveal,
      ease: MOTION_EASINGS.gsapOut,
    });

    if (imageEl) {
      tl.to(
        imageEl,
        {
          scale: 1,
          duration: MOTION_DURATIONS.imageReveal,
          ease: MOTION_EASINGS.gsapOut,
        },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [reducedMotion, delay]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// ============================================================================
// COMPONENT: Parallax (scrubbed subtle Y translation)
// ============================================================================
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // e.g. 0.08 = 8%
}

export function Parallax({
  children,
  className = '',
  speed = MOTION_DISTANCES.parallax,
}: ParallaxProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!elRef.current || isMobile || reducedMotion) return;

    const el = elRef.current;
    const yDistance = el.offsetHeight * speed;

    const anim = gsap.fromTo(
      el,
      { y: -yDistance },
      {
        y: yDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [speed, isMobile, reducedMotion]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}

// ============================================================================
// COMPONENT: Marquee (Continuous velocity-reactive ticker with hover pause)
// ============================================================================
interface MarqueeProps {
  items?: string[];
  separator?: string;
  className?: string;
  baseSpeed?: number;
}

export function Marquee({
  items = [
    'BRAND GRAPHICS & IDENTITY',
    'HIGH-CONVERTING LANDING PAGES',
    'CUSTOM WEB DESIGN & 3D STORYTELLING',
    'PRODUCT UI/UX & DESIGN SYSTEMS',
    'CONVERSION-ENGINEERED FLOWS',
    'RAPID 2-WEEK SPRINT DELIVERY',
  ],
  separator = '✦',
  className = '',
  baseSpeed = 1,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!trackRef.current || reducedMotion) return;

    let xPos = 0;
    let direction = -1; // Moving left by default
    let currentSpeed = baseSpeed;
    const track = trackRef.current;

    const tickerCallback = () => {
      if (isHovered.current) return;

      // Track scroll velocity via ScrollTrigger
      const velocity = (ScrollTrigger as any).getVelocity ? (ScrollTrigger as any).getVelocity() : 0;

      // Calculate dynamic speed boost and directional shift based on scroll velocity
      if (Math.abs(velocity) > 60) {
        direction = velocity > 0 ? -1 : 1;
        const boost = Math.min(Math.abs(velocity) / 250, 5);
        currentSpeed = baseSpeed + boost;
      } else {
        currentSpeed += (baseSpeed - currentSpeed) * 0.05;
        if (Math.abs(currentSpeed - baseSpeed) < 0.02) {
          direction = -1;
        }
      }

      xPos += direction * currentSpeed;

      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0) {
        if (xPos <= -halfWidth) {
          xPos += halfWidth;
        } else if (xPos >= 0) {
          xPos -= halfWidth;
        }
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  }, [baseSpeed, reducedMotion]);

  const fullList = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      className={`w-full overflow-hidden hairline-t hairline-b py-4 bg-[#EDECE8]/60 select-none relative ${className}`}
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
      aria-label="Disciplines ticker"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-8 font-mono text-xs md:text-sm tracking-widest text-[#4A4A54] uppercase whitespace-nowrap will-change-transform"
      >
        {fullList.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 flex-shrink-0" aria-hidden={idx >= items.length}>
            <span className="hover:text-black font-semibold transition-colors cursor-default">
              {item}
            </span>
            <span className="text-black/40 text-xs">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: WordScrollHighlight (word-by-word scroll scrub)
// ============================================================================
interface WordScrollHighlightProps {
  children: string;
  className?: string;
  as?: ElementType;
}

export function WordScrollHighlight({
  children,
  className = '',
  as: Component = 'p',
}: WordScrollHighlightProps) {
  const elRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!elRef.current || reducedMotion) return;

    const el = elRef.current;
    const split = new SplitType(el, { types: 'words', wordClass: 'bv-word' });

    if (!split.words || split.words.length === 0) return;

    gsap.set(split.words, { opacity: 0.2 });

    const anim = gsap.to(split.words, {
      opacity: 1,
      stagger: MOTION_STAGGER.words,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: true,
      },
    });

    return () => {
      anim.kill();
      split.revert();
    };
  }, [children, reducedMotion]);

  return (
    <Component ref={elRef as any} className={className}>
      {children}
    </Component>
  );
}

// ============================================================================
// COMPONENT: ButtonRoll (Rolling label on hover for all primary/secondary buttons)
// ============================================================================
interface ButtonRollProps {
  text: string;
  icon?: ReactNode;
  className?: string;
}

export function ButtonRoll({ text, icon, className = '' }: ButtonRollProps) {
  return (
    <span className={`bv-btn-roll-wrapper inline-flex items-center gap-2 overflow-hidden relative ${className}`}>
      <span className="bv-btn-roll-inner flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <span className="bv-btn-label-primary block">{text}</span>
        <span className="bv-btn-label-clone block absolute top-full left-0">{text}</span>
      </span>
      {icon && (
        <span className="bv-btn-icon inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {icon}
        </span>
      )}
    </span>
  );
}

// ============================================================================
// COMPONENT: ScrollProgressBar (2px lime bar at the top)
// ============================================================================
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (!barRef.current || reducedMotion) return;

    const bar = barRef.current;
    const anim = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        transformOrigin: 'left center',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#D4FF00] z-[9999] pointer-events-none origin-left"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}

// ============================================================================
// COMPONENT: SmoothScrollProvider (Lenis + GSAP ScrollTrigger synchronization)
// ============================================================================
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    initGsapPlugins();
    if (typeof window === 'undefined' || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Keep native touch performance on mobile
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh triggers on load
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
