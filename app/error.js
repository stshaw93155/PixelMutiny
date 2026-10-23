'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RotateCcw, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log exception safely to diagnostics
    console.error('[CLIENT RUNTIME ERROR CAUGHT]:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0C] text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none relative overflow-hidden">
      {/* Background kinetic warning glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#991B1B]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top telemetry */}
      <div className="flex items-center justify-between font-mono text-xs text-[#787884] border-b border-white/10 pb-6 z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-block group">
            <Image
              src="/img/logo-main.png"
              alt="PixelMutiny"
              width={160}
              height={50}
              priority
              className="h-8 w-auto object-contain brightness-0 invert opacity-95 transition-transform group-hover:scale-105"
            />
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-[#EF4444] font-bold">[SYS // FAULT_TRAP]</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[#EF4444]">● ANOMALY INTERCEPTED</span>
          <span className="text-white/20">|</span>
          <span>NEW DELHI STUDIO (HQ)</span>
        </div>
      </div>

      {/* Center Error Box */}
      <div className="max-w-2xl my-auto py-16 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] font-mono text-xs mb-4">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>RECOVERABLE FAULT PROTOCOL</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
          Runtime Interrupted.
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#A0A0AB] leading-relaxed mb-8 max-w-lg">
          An unexpected interaction anomaly occurred during execution. No data was lost. You can re-attempt the view transition or return to the studio overview.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3.5 rounded-full bg-[#0859D4] text-white font-mono font-bold text-xs uppercase hover:bg-[#1A59F9] transition-all shadow-lg flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Re-attempt Protocol</span>
          </button>
          <Link
            href="/"
            className="px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#787884] gap-4 z-10">
        <span>SECURITY ENFORCED // NO DATA EXPOSED</span>
        <span>PIXELMUTINY DIGIMEDIA LLP</span>
      </div>
    </div>
  );
}
