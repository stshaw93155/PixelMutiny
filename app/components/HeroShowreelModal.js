'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSound } from './SoundManager';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';

const CHAPTERS = [
  { time: 0, title: '01 // VELOCE AI — ENTERPRISE UI', img: '/website-design/03-case-study-veloce-ai.png' },
  { time: 18, title: '02 // KRONO PAY — 3D FINTECH CRO', img: '/website-design/01-home-landing.png' },
  { time: 35, title: '03 // MAISON AURA — SPATIAL WEBGL', img: '/website-design/02-services-pricing.png' },
  { time: 52, title: '04 // PIXELMUTINY SPECIFICATION PROTOCOL', img: '/website-design/04-contact-protocol.png' },
];

function ShowreelContent({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(CHAPTERS[0]);
  const [isMuted, setIsMuted] = useState(false);
  const { playClick, playWhoosh } = useSound();
  const timerRef = useRef(null);

  useEffect(() => {
    playWhoosh();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [playWhoosh]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        const next = prev + 0.5;
        const sec = (next / 100) * 60;
        const matched = [...CHAPTERS].reverse().find((c) => sec >= c.time) || CHAPTERS[0];
        setCurrentChapter(matched);
        return next;
      });
    }, 150);

    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-fade-in">
      <div
        className="relative w-full max-w-6xl aspect-[16/10] bg-[#0c0c12] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between"
        style={{ backgroundColor: '#0C0C12' }}
      >
        {/* Top HUD Bar */}
        <div className="p-4 md:p-6 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between z-20">
          <div className="flex items-center gap-3 font-mono text-xs text-white">
            <span className="pulse-dot"></span>
            <span className="font-bold tracking-wider">PIXELMUTINY STUDIO SHOWREEL [2026 // 4K 60FPS]</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-[var(--accent)]">{currentChapter.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playClick();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white text-black font-bold hover:bg-[var(--accent)] transition-colors"
              data-cursor="CLOSE"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas Presentation Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentChapter.img}
            alt={currentChapter.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1152px"
            className="object-cover object-top opacity-85 transition-opacity duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

          {/* Kinetic Scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30" />
        </div>

        {/* Center Play Overlay if Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={() => {
                setIsPlaying(true);
                playClick();
              }}
              className="w-20 h-20 rounded-full bg-[#0859D4] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            >
              <Play className="w-8 h-8 ml-1 fill-current" />
            </button>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-black/95 to-transparent z-20 space-y-4">
          {/* Progress Bar with Chapter Markers */}
          <div className="relative w-full h-2 bg-white/15 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  playClick();
                }}
                className="flex items-center gap-2 text-white hover:text-[var(--accent)] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <span className="text-white/30">|</span>

              <span className="text-white">
                00:{String(Math.floor((progress / 100) * 60)).padStart(2, '0')} / 01:00
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[var(--text-muted)]">
                PRODUCED FOR AMBITIOUS PRODUCT FOUNDERS
              </span>
              <span className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 text-[10px]">
                HDR 4K
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroShowreelModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return <ShowreelContent onClose={onClose} />;
}
