'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSound } from './SoundManager';
import { ArrowLeftRight, Sparkles, XCircle, ArrowRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [split, setSplit] = useState(50); // percentage 8 to 92
  const [isDragging, setIsDragging] = useState(false);
  const [isHinting, setIsHinting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const hasHintRunRef = useRef(false);
  const isHintingRef = useRef(false);
  const animFrameRef = useRef(null);
  const { playClick } = useSound();

  // ResizeObserver to track container width for accurate responsive breakpoints
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // One-time hint animation on first scroll into view (50 -> 35 -> 65 -> 50)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasHintRunRef.current) {
          hasHintRunRef.current = true;

          // Check prefers-reduced-motion
          const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReduced) return;

          // Run hint animation: 50 -> 35 -> 65 -> 50 over 1400ms
          setIsHinting(true);
          isHintingRef.current = true;
          const startTime = performance.now();
          const duration = 1400; // ms

          const animate = (currentTime) => {
            if (!isHintingRef.current) return;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            let currentSplit = 50;
            if (progress < 0.28) {
              // 50 -> 35
              const p = progress / 0.28;
              const ease = 1 - Math.cos((p * Math.PI) / 2);
              currentSplit = 50 - 15 * ease;
            } else if (progress < 0.72) {
              // 35 -> 65
              const p = (progress - 0.28) / 0.44;
              const ease = (1 - Math.cos(p * Math.PI)) / 2;
              currentSplit = 35 + 30 * ease;
            } else {
              // 65 -> 50
              const p = (progress - 0.72) / 0.28;
              const ease = Math.sin((p * Math.PI) / 2);
              currentSplit = 65 - 15 * ease;
            }

            setSplit(currentSplit);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setSplit(50);
              setIsHinting(false);
              isHintingRef.current = false;
            }
          };

          // Small delay before starting hint animation
          const timer = setTimeout(() => {
            requestAnimationFrame(animate);
          }, 350);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update split with clamping between 8% and 92%
  const updateSplitFromClientX = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(8, Math.min(92, (x / rect.width) * 100));
    setSplit(percentage);
  }, []);

  // Pointer event handlers with setPointerCapture
  const handlePointerDown = (e) => {
    if (isHintingRef.current) {
      isHintingRef.current = false;
      setIsHinting(false);
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    setIsDragging(true);
    playClick();
    updateSplitFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const clientX = e.clientX;
    animFrameRef.current = requestAnimationFrame(() => {
      updateSplitFromClientX(clientX);
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Keyboard navigation on handle
  const handleKeyDown = (e) => {
    if (isHintingRef.current) {
      isHintingRef.current = false;
      setIsHinting(false);
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSplit((prev) => Math.max(8, prev - 5));
      playClick();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSplit((prev) => Math.min(92, prev + 5));
      playClick();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSplit(8);
      playClick();
    } else if (e.key === 'End') {
      e.preventDefault();
      setSplit(92);
      playClick();
    }
  };

  // Responsive device checks based on measured container width
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  const isDesktop = containerWidth >= 1024;

  // Visible width percentages for each side
  const visibleLeftPct = split; // 8 to 92
  const visibleRightPct = 100 - split; // 8 to 92

  // Progressive collapse thresholds for Before side (left)
  // When visible width >= 48%: full content
  // < 48%: hide stats card
  // < 42%: hide subtext
  // < 38%: hide CTA
  // < 35%: hide headline and show compact centered metric pill (prevents any word clipping!)
  const showStatsLeft = isDesktop && visibleLeftPct >= 48;
  const showSubtextLeft = !isMobile && visibleLeftPct >= 42;
  const showCtaLeft = !isMobile && visibleLeftPct >= 38;
  const showHeadlineLeft = visibleLeftPct >= 35;
  const isCompactLeft = visibleLeftPct < 35;

  // Progressive collapse thresholds for After side (right)
  const showStatsRight = isDesktop && visibleRightPct >= 48;
  const showSubtextRight = !isMobile && visibleRightPct >= 42;
  const showCtaRight = !isMobile && visibleRightPct >= 38;
  const showHeadlineRight = visibleRightPct >= 35;
  const isCompactRight = visibleRightPct < 35;

  // Height based on viewport
  const containerHeight = isMobile ? '420px' : isTablet ? '560px' : '600px';

  return (
    <div className="w-full">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[var(--hairline)] gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="telemetry-badge active block font-bold text-black">
              [04 // PROOF OF CRAFT // CRO TEARDOWN]
            </span>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#EDECE8] border border-[var(--hairline)] text-[#4A4A54]">
              Concept example — Benchmark Audit
            </span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight"
            style={{ color: '#0A0A0C' }}
          >
            BEFORE &amp; AFTER ⤷ CONVERSION LIFT
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]"></span>
            <span className="text-[#4A4A54] font-medium">
              GENERIC SAAS: 1.1% CONV.
            </span>
          </div>
          <span className="text-black/20">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0C]"></span>
            <span className="text-black font-bold">
              PIXELMUTINY: 4.6% (+318% LIFT)
            </span>
          </div>
        </div>
      </div>

      {/* 
        COMPARISON SLIDER CONTAINER
        - position: relative, fixed height (420px mobile / 560px tablet / 600px desktop)
        - overflow: hidden, touch-action: pan-y (vertical scrolling preserved on mobile)
        - pointer events with setPointerCapture
      */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          height: containerHeight,
          minHeight: containerHeight,
          touchAction: 'pan-y',
          '--split': `${split}%`,
          backgroundColor: '#0A0A0F',
        }}
        className="comparison-slider-container"
        data-cursor="DRAG"
      >
        {/* =========================================================================
            LAYER 1: "BEFORE" LAYER (Underneath, full container width, beige background)
            Anchored to LEFT edge with max-width 44% (desktop) / 46% (tablet) / 88% (mobile)
           ========================================================================= */}
        <div
          className="slider-layer"
          style={{
            backgroundColor: '#E8E6DF',
            color: '#0A0A0C',
            zIndex: 1,
          }}
        >
          {/* Top-Left Pinned Badge Row (stays visible at any split) */}
          <div
            className="flex items-center gap-2 font-mono text-xs pointer-events-none"
            style={{
              position: 'absolute',
              top: isMobile ? '20px' : '36px',
              left: isMobile ? '20px' : '48px',
              zIndex: 20,
            }}
          >
            <span
              className="font-bold flex items-center gap-1.5 shadow-sm"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0A0A0C',
                border: '2px solid #0A0A0C',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
              }}
            >
              <XCircle className="w-3.5 h-3.5" style={{ color: '#991B1B' }} />
              <span>BEFORE // GENERIC TEMPLATE</span>
            </span>
            <span
              className="hidden sm:inline-block"
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(0,0,0,0.15)',
                color: '#4A4A54',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
              }}
            >
              Concept example
            </span>
          </div>

          {/* Centered Compact Metric for Before side (fades in when visible width < 35%) */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: 0,
              width: `${Math.max(split, 8)}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isCompactLeft ? 1 : 0,
              transition: 'opacity 150ms ease-out',
              zIndex: 20,
            }}
          >
            <div
              className="font-mono font-bold shadow-md whitespace-nowrap"
              style={{
                padding: isMobile ? '6px 12px' : '8px 16px',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#0A0A0C',
                border: '2px solid #0A0A0C',
                fontSize: isMobile ? '11px' : '13px',
              }}
            >
              1.1% conv
            </div>
          </div>

          {/* 
            Main Content Block (Anchored to LEFT, Vertically Centered)
            Desktop max-w-[44%], Tablet max-w-[46%], Mobile max-w-[88%]
          */}
          <div
            className="slider-content-block"
            style={{
              left: isMobile ? '20px' : '48px',
              maxWidth: isMobile ? 'calc(100% - 40px)' : isTablet ? '46%' : '44%',
              opacity: isCompactLeft ? 0 : 1,
              pointerEvents: isCompactLeft ? 'none' : 'auto',
            }}
          >
            {/* Row 1: Sub-label */}
            <span
              className="font-mono font-bold uppercase tracking-wider block"
              style={{
                fontSize: '12px',
                color: '#4A4A54',
                marginBottom: isMobile ? '8px' : '12px',
              }}
            >
              ● Before: generic template
            </span>

            {/* Row 2: Headline (Vertically mirrored with After side, clamp() scale, never < 28px on desktop) */}
            <div
              style={{
                minHeight: isMobile ? '52px' : '76px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: isMobile ? '8px' : '12px',
              }}
            >
              <h3
                className="font-sans font-extrabold text-[#0A0A0C] tracking-tight leading-[1.12]"
                style={{
                  fontSize: isMobile
                    ? 'clamp(20px, 5.2vw, 26px)'
                    : 'clamp(28px, 2.5vw, 36px)',
                  opacity: showHeadlineLeft ? 1 : 0,
                  transition: 'opacity 150ms ease-out',
                }}
              >
                The all-in-one platform for your team to collaborate and do work.
              </h3>
            </div>

            {/* Row 3: Subtext (Collapses smoothly when width < 42%) */}
            {!isMobile && (
              <div
                style={{
                  minHeight: '44px',
                  marginBottom: '14px',
                }}
              >
                <p
                  className="font-mono text-xs sm:text-sm leading-relaxed"
                  style={{
                    color: '#4A4A54',
                    opacity: showSubtextLeft ? 1 : 0,
                    pointerEvents: showSubtextLeft ? 'auto' : 'none',
                    transition: 'opacity 150ms ease-out',
                  }}
                >
                  Generic stock illustration placeholder, 14-field registration form, slow 4.2s mobile load time.
                </p>
              </div>
            )}

            {/* Row 4: CTA Row (Collapses smoothly when width < 38% on desktop) */}
            <div
              style={{
                height: isMobile ? '38px' : '46px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: isMobile ? '8px' : '14px',
              }}
            >
              {isMobile ? (
                /* Mobile Single Metric Badge */
                <div
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold shadow-sm"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.2)',
                    color: '#0A0A0C',
                  }}
                >
                  <span>1.1% conversion</span>
                  <span style={{ color: 'rgba(0,0,0,0.3)' }}>|</span>
                  <span style={{ color: '#991B1B' }}>74% bounce</span>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: showCtaLeft ? 1 : 0,
                    pointerEvents: showCtaLeft ? 'auto' : 'none',
                    transition: 'opacity 150ms ease-out',
                  }}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    style={{
                      height: '42px',
                      padding: '0 18px',
                      borderRadius: '8px',
                      backgroundColor: '#4B5563',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '13px',
                      border: '1px solid #374151',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      cursor: 'default',
                    }}
                  >
                    Sign Up For Free Demo
                  </button>
                  <span
                    className="font-mono text-xs font-bold shadow-sm"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#991B1B',
                      border: '1px solid #FCA5A5',
                      padding: '8px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    Bounce: 74%
                  </span>
                </div>
              )}
            </div>

            {/* Row 5: 3-Row Stats Card (Exact 104px height, collapses at < 48% on desktop, hidden on tablet/mobile) */}
            {isDesktop && (
              <div
                style={{
                  height: '104px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(0,0,0,0.15)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  opacity: showStatsLeft ? 1 : 0,
                  pointerEvents: showStatsLeft ? 'auto' : 'none',
                  transition: 'opacity 150ms ease-out',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    paddingBottom: '5px',
                  }}
                >
                  <span style={{ color: '#4A4A54' }}>Vague value proposition</span>
                  <span style={{ color: '#991B1B', fontWeight: 700 }}>Low trust</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    paddingBottom: '5px',
                  }}
                >
                  <span style={{ color: '#4A4A54' }}>14-field form</span>
                  <span style={{ color: '#991B1B', fontWeight: 700 }}>High dropoff</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#4A4A54' }}>Slow mobile load (4.2s)</span>
                  <span style={{ color: '#991B1B', fontWeight: 700 }}>74% bounce</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar Left (pinned to bottom) */}
          <div
            className="flex items-center justify-between font-mono text-xs pointer-events-none"
            style={{
              position: 'absolute',
              bottom: isMobile ? '16px' : '28px',
              left: isMobile ? '20px' : '48px',
              width: isMobile ? 'calc(100% - 40px)' : isTablet ? '46%' : '44%',
              borderTop: '1px solid rgba(0,0,0,0.15)',
              paddingTop: '8px',
              color: '#4A4A54',
              opacity: isCompactLeft ? 0 : 1,
              transition: 'opacity 150ms ease-out',
            }}
          >
            <span className="font-semibold truncate">
              Before: 1.1% conversion, 74% bounce
            </span>
            <span className="hidden sm:inline" style={{ color: 'rgba(0,0,0,0.5)', fontSize: '11px' }}>
              Concept example
            </span>
          </div>
        </div>

        {/* =========================================================================
            LAYER 2: "AFTER" LAYER (On Top, full container width, black canvas)
            Revealed with clip-path: inset(0 0 0 split%)
            Anchored to RIGHT edge with max-width 44% (desktop) / 46% (tablet) / 88% (mobile)
           ========================================================================= */}
        <div
          className="slider-layer pointer-events-none"
          style={{
            backgroundColor: '#0A0A0F',
            color: '#FFFFFF',
            zIndex: 2,
            clipPath: `inset(0 0 0 ${split}%)`,
            WebkitClipPath: `inset(0 0 0 ${split}%)`,
          }}
        >
          {/* Top-Right Pinned Badge Row (stays visible at any split) */}
          <div
            className="flex items-center gap-2 font-mono text-xs pointer-events-none"
            style={{
              position: 'absolute',
              top: isMobile ? '20px' : '36px',
              right: isMobile ? '20px' : '48px',
              zIndex: 20,
            }}
          >
            <span
              className="hidden sm:inline-block"
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
              }}
            >
              Concept example
            </span>
            <span
              className="font-bold flex items-center gap-1.5 shadow-md"
              style={{
                backgroundColor: '#0859D4',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '12px',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AFTER // REDESIGNED HERO</span>
            </span>
          </div>

          {/* Centered Compact Metric for After side (fades in when visible width < 35%) */}
          <div
            className="pointer-events-none"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: `${split}%`,
              width: `${Math.max(100 - split, 8)}%`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isCompactRight ? 1 : 0,
              transition: 'opacity 150ms ease-out',
              zIndex: 20,
            }}
          >
            <div
              className="font-mono font-bold shadow-md whitespace-nowrap"
              style={{
                padding: isMobile ? '6px 12px' : '8px 16px',
                borderRadius: '9999px',
                backgroundColor: '#0859D4',
                color: '#FFFFFF',
                fontSize: isMobile ? '11px' : '13px',
              }}
            >
              4.6% conv
            </div>
          </div>

          {/* 
            Main Content Block (Anchored to RIGHT, Vertically Centered)
            Desktop max-w-[44%], Tablet max-w-[46%], Mobile max-w-[88%]
          */}
          <div
            className="slider-content-block"
            style={{
              right: isMobile ? '20px' : '48px',
              maxWidth: isMobile ? 'calc(100% - 40px)' : isTablet ? '46%' : '44%',
              opacity: isCompactRight ? 0 : 1,
              pointerEvents: isCompactRight ? 'none' : 'auto',
            }}
          >
            {/* Row 1: Sub-label */}
            <span
              className="font-mono font-bold uppercase tracking-wider block"
              style={{
                fontSize: '12px',
                color: '#0859D4',
                marginBottom: isMobile ? '8px' : '12px',
              }}
            >
              ● After: redesigned hero
            </span>

            {/* Row 2: Headline (Vertically mirrored with Before side, clamp() scale, never < 28px on desktop) */}
            <div
              style={{
                minHeight: isMobile ? '52px' : '76px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: isMobile ? '8px' : '12px',
              }}
            >
              <h3
                className="font-display font-extrabold text-white tracking-tight leading-[1.12]"
                style={{
                  fontSize: isMobile
                    ? 'clamp(20px, 5.2vw, 26px)'
                    : 'clamp(28px, 2.5vw, 36px)',
                  opacity: showHeadlineRight ? 1 : 0,
                  transition: 'opacity 150ms ease-out',
                }}
              >
                AUTONOMOUS AI INFRASTRUCTURE <span style={{ color: '#0859D4' }}>✽</span> ENGINEERED FOR VELOCITY.
              </h3>
            </div>

            {/* Row 3: Subtext (Collapses smoothly when width < 42%) */}
            {!isMobile && (
              <div
                style={{
                  minHeight: '44px',
                  marginBottom: '14px',
                }}
              >
                <p
                  className="font-mono text-xs sm:text-sm leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    opacity: showSubtextRight ? 1 : 0,
                    pointerEvents: showSubtextRight ? 'auto' : 'none',
                    transition: 'opacity 150ms ease-out',
                  }}
                >
                  Interactive telemetry graphs, zero-fluff value propositions, and instant friction-free qualification pills.
                </p>
              </div>
            )}

            {/* Row 4: CTA Row (Collapses smoothly when width < 38% on desktop) */}
            <div
              style={{
                height: isMobile ? '38px' : '46px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: isMobile ? '8px' : '14px',
              }}
            >
              {isMobile ? (
                /* Mobile Single Metric Badge */
                <div
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold shadow-sm"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#0859D4',
                  }}
                >
                  <span>4.6% conversion</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                  <span style={{ color: '#FFFFFF' }}>+318% lift</span>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: showCtaRight ? 1 : 0,
                    pointerEvents: showCtaRight ? 'auto' : 'none',
                    transition: 'opacity 150ms ease-out',
                  }}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    style={{
                      height: '42px',
                      padding: '0 18px',
                      borderRadius: '8px',
                      backgroundColor: '#0859D4',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 8px rgba(8,89,212,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    <span>Get a quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span
                    className="font-mono text-xs font-bold"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#0859D4',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '8px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    +318% Lift
                  </span>
                </div>
              )}
            </div>

            {/* Row 5: 3-Row Stats Card (Exact 104px height, collapses at < 48% on desktop, hidden on tablet/mobile) */}
            {isDesktop && (
              <div
                style={{
                  height: '104px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  opacity: showStatsRight ? 1 : 0,
                  pointerEvents: showStatsRight ? 'auto' : 'none',
                  transition: 'opacity 150ms ease-out',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '5px',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Clear value proposition</span>
                  <span style={{ color: '#0859D4', fontWeight: 700 }}>High trust</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '5px',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Short 3-field form</span>
                  <span style={{ color: '#0859D4', fontWeight: 700 }}>Fast qualification</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>Fast load</span>
                  <span style={{ color: '#0859D4', fontWeight: 700 }}>Sub-second load</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar Right (pinned to bottom) */}
          <div
            className="flex items-center justify-between font-mono text-xs pointer-events-none"
            style={{
              position: 'absolute',
              bottom: isMobile ? '16px' : '28px',
              right: isMobile ? '20px' : '48px',
              width: isMobile ? 'calc(100% - 40px)' : isTablet ? '46%' : '44%',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingTop: '8px',
              color: 'rgba(255,255,255,0.7)',
              opacity: isCompactRight ? 0 : 1,
              transition: 'opacity 150ms ease-out',
            }}
          >
            <span className="font-semibold text-white truncate">
              After: 4.6% conversion, +318% lift
            </span>
            <span className="hidden sm:inline font-bold" style={{ color: '#0859D4', fontSize: '11px' }}>
              Concept example
            </span>
          </div>
        </div>

        {/* =========================================================================
            DIVIDER LINE & DRAGGABLE HANDLE
            - Centered on split percentage line
            - Full height thin vertical line
            - 56px circle (48px mobile), DRAG label, arrow icon
            - Accessible role="slider", tabIndex={0}, aria-valuenow
           ========================================================================= */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${split}%`,
            zIndex: 30,
            pointerEvents: 'none',
            transition: isHinting ? 'left 150ms ease-out' : 'none',
          }}
        >
          {/* Thin Vertical Divider Line Spanning Full Height */}
          <div className="slider-handle-line" />

          {/* 56px (Desktop) / 48px (Mobile) Draggable Circular Handle */}
          <div
            ref={handleRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={8}
            aria-valuemax={92}
            aria-valuenow={Math.round(split)}
            aria-label="Compare before and after"
            onKeyDown={handleKeyDown}
            className="slider-handle-button"
            title="Drag slider or use Left/Right arrow keys to compare"
          >
            <ArrowLeftRight
              style={{
                width: isMobile ? '16px' : '20px',
                height: isMobile ? '16px' : '20px',
                color: '#FFFFFF',
              }}
            />
            <span
              className="font-mono font-extrabold tracking-wider"
              style={{
                fontSize: isMobile ? '9px' : '10px',
                color: '#0859D4',
                marginTop: '2px',
              }}
            >
              DRAG
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER HELPER CAPTION */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#4A4A54] gap-2">
        <span>← DRAG SLIDER OR USE LEFT/RIGHT ARROW KEYS TO COMPARE →</span>
        <span className="font-semibold text-black">
          BENCHMARK AUDIT // CONCEPT EXAMPLE
        </span>
      </div>
    </div>
  );
}
