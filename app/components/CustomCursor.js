import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useSound } from './SoundManager';
import { useReducedMotion } from '@/lib/motion';

function subscribeFinePointer(callback) {
  if (typeof window === 'undefined') return () => {};
  const fineMedia = window.matchMedia('(pointer: fine)');
  const hoverMedia = window.matchMedia('(hover: hover)');
  fineMedia.addEventListener('change', callback);
  hoverMedia.addEventListener('change', callback);
  return () => {
    fineMedia.removeEventListener('change', callback);
    hoverMedia.removeEventListener('change', callback);
  };
}

function getFinePointerSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const followerRef = useRef(null);
  const dotRef = useRef(null);
  const [badgeText, setBadgeText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const { playHover } = useSound();
  const playHoverRef = useRef(playHover);
  const reducedMotion = useReducedMotion();

  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot
  );
  const isDesktopFine = isFinePointer && !reducedMotion;

  useEffect(() => {
    playHoverRef.current = playHover;
  }, [playHover]);

  const mousePos = useRef({ x: -500, y: -500 });
  const followerPos = useRef({ x: -500, y: -500 });
  const hasMovedRef = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    if (!isDesktopFine) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        followerPos.current = { x: e.clientX, y: e.clientY };
        if (followerRef.current) followerRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      if (followerRef.current) followerRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (hasMovedRef.current) {
        if (followerRef.current) followerRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    const updateFollower = () => {
      if (hasMovedRef.current) {
        // Lerp factor 0.15 exactly
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15;

        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
        }
      }

      rafId.current = requestAnimationFrame(updateFollower);
    };

    rafId.current = requestAnimationFrame(updateFollower);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const inputTarget = target.closest('input, textarea, select, [contenteditable="true"]');
      if (inputTarget) {
        setIsInput(true);
        setIsHovered(false);
        setBadgeText('');
        return;
      }
      setIsInput(false);

      const interactive = target.closest('a, button, [data-cursor], .interactive-target');
      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute('data-cursor') || 'VIEW';
        setBadgeText(label);
        if (playHoverRef.current) playHoverRef.current();
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const inputTarget = target.closest('input, textarea, select');
      if (inputTarget) setIsInput(false);

      const interactive = target.closest('a, button, [data-cursor], .interactive-target');
      if (interactive) {
        setIsHovered(false);
        setBadgeText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isDesktopFine, reducedMotion]);

  if (!isDesktopFine || reducedMotion) {
    return null;
  }

  return (
    <>
      {/* 40px Ring with Lerp 0.15 and Mix-Blend-Mode Difference */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center transition-all duration-200 z-[999999] ${
          isHovered ? 'scale-180 bg-white text-black' : isInput ? 'scale-60 border border-white' : 'border border-white/60'
        }`}
        style={{
          width: '40px',
          height: '40px',
          marginTop: '-20px',
          marginLeft: '-20px',
          mixBlendMode: 'difference',
          opacity: 0,
          willChange: 'transform',
        }}
      >
        {isHovered && badgeText && (
          <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase select-none text-black">
            {badgeText}
          </span>
        )}
      </div>

      {/* 12px Dot with Instant Follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[999999]"
        style={{
          width: '12px',
          height: '12px',
          marginTop: '-6px',
          marginLeft: '-6px',
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
