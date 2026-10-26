import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, Compass } from 'lucide-react';

export const metadata = {
  title: '404 — Page Not Located | PixelMutiny DigiMedia',
  description: 'The requested route does not exist in the PixelMutiny DigiMedia index.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#0A0F1F] text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none relative overflow-hidden">
      {/* Background kinetic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1F3FFF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top telemetry bar */}
      <div className="flex items-center justify-between font-mono text-xs text-[#8E95A5] border-b border-white/10 pb-6 z-10">
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
          <span className="text-white font-bold">[SYS // 404_INDEX_MISS]</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[#1F3FFF]">● ZERO PACKETS FOUND</span>
          <span className="text-white/20">|</span>
          <span>NEW DELHI STUDIO (HQ)</span>
        </div>
      </div>

      {/* Center 404 Content */}
      <div className="max-w-3xl my-auto py-16 z-10">
        <span className="font-mono text-xs text-[#1F3FFF] tracking-widest uppercase mb-4 block">
          [ERROR PROTOCOL 404]
        </span>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white mb-6 uppercase">
          Signal Lost.
        </h1>
        <p className="font-mono text-sm sm:text-base text-[#8E95A5] leading-relaxed mb-10 max-w-xl">
          The requested coordinate or project file has been moved, renamed, or does not exist in the PixelMutiny DigiMedia deployment.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-full bg-[#1F3FFF] text-white font-mono font-bold text-xs uppercase hover:bg-[#1632D6] transition-all shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
          <Link
            href="/works"
            className="px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-mono font-bold text-xs uppercase hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <span>Explore Case Studies (08)</span>
            <ArrowUpRight className="w-4 h-4 text-[#1F3FFF]" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#A0A0AB] hover:text-white font-mono text-xs uppercase hover:bg-white/10 transition-all"
          >
            <span>Initiate Project</span>
          </Link>
        </div>
      </div>

      {/* Bottom telemetry */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#787884] gap-4 z-10">
        <span>DELHI, IN (IST) // LATENCY OPTIMAL</span>
        <span>PIXELMUTINY DIGIMEDIA LLP // BREAK THE TEMPLATE</span>
      </div>
    </div>
  );
}
