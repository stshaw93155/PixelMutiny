'use client';

import { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/lib/motion';

function subscribeSessionStorage(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSeenSnapshot() {
  try {
    return sessionStorage.getItem('bv_preloader_seen') === 'true';
  } catch {
    return true;
  }
}

function getSeenServerSnapshot() {
  return true;
}

export default function Preloader() {
  const hasSeen = useSyncExternalStore(subscribeSessionStorage, getSeenSnapshot, getSeenServerSnapshot);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const lettersRef = useRef([]);
  const reducedMotion = useReducedMotion();

  const shouldShow = !hasSeen && !reducedMotion && !isCompleted;

  // 2. Once element is in DOM, play letter-stagger reveal, 0 to 100 counter and wipe up
  useEffect(() => {
    if (!shouldShow || !containerRef.current) return;
    const container = containerRef.current;

    const countObj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('bv_preloader_seen', 'true');
        } catch {}
        // Slide up panel revealing the page (max 1.4s total)
        gsap.to(container, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            setIsCompleted(true);
            window.dispatchEvent(new Event('preloader_complete'));
          },
        });
      },
    });

    // Letter reveal
    const validLetters = lettersRef.current.filter(Boolean);
    if (validLetters.length > 0) {
      tl.fromTo(
        validLetters,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      );
    }

    // Counter 000 -> 100
    tl.to(
      countObj,
      {
        val: 100,
        duration: 0.7,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = String(Math.round(countObj.val)).padStart(3, '0');
          }
        },
      },
      0.05
    );

    return () => {
      tl.kill();
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  const brandText = 'PIXELMUTINY'.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#0A0A0C] text-white flex flex-col justify-between p-8 sm:p-12 select-none"
      style={{ willChange: 'transform' }}
    >
      {/* Top telemetry line */}
      <div className="flex items-center justify-between font-mono text-xs text-[#787884] tracking-wider">
        <span>[SYS // BOOT]</span>
        <span>DELHI, IN (IST)</span>
      </div>

      {/* Center Brand Name Letter-by-Letter Reveal */}
      <div className="text-center overflow-hidden flex flex-col items-center">
        <div className="mb-6">
          <Image
            src="/img/logo-main.png"
            alt="PixelMutiny"
            width={240}
            height={70}
            priority
            className="h-12 sm:h-16 w-auto object-contain brightness-0 invert opacity-95 drop-shadow-[0_0_16px_rgba(255,255,255,0.15)]"
          />
        </div>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight flex items-center justify-center">
          {brandText.map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) lettersRef.current[index] = el;
              }}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="font-mono text-xs text-[#0859D4] tracking-widest mt-3 uppercase font-semibold">
          Digital Craft &amp; Conversion Infrastructure
        </p>
      </div>

      {/* Bottom Counter */}
      <div className="flex items-end justify-between font-mono text-xs text-[#787884]">
        <span>INITIALIZING INTERACTION ENGINE</span>
        <div className="text-right">
          <span
            ref={counterRef}
            className="font-display text-4xl sm:text-5xl font-extrabold text-white block tabular-nums"
          >
            000
          </span>
          <span className="text-[10px] uppercase text-[#0859D4] font-bold">CALIBRATION %</span>
        </div>
      </div>
    </div>
  );
}
