import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Compass, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: '404 — Page Not Located | PixelMutiny DigiMedia',
  description: 'The requested route does not exist in the PixelMutiny DigiMedia index.',
};

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] w-full bg-[#0A0F1F] text-white flex items-center justify-center px-6 py-20 sm:py-28 overflow-hidden">
      {/* Kinetic ambient glow behind error block */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1F3FFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#1F3FFF]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Center 404 Card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center">
        {/* Status indicator pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#8E95A5] mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[#1F3FFF] font-semibold">ERROR 404</span>
          <span className="text-white/30">//</span>
          <span>SIGNAL LOST</span>
        </div>

        {/* Big Glitch Headline */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase mb-4">
          Route Not Found
        </h1>

        <p className="font-mono text-sm sm:text-base text-[#8E95A5] max-w-lg mx-auto leading-relaxed mb-10">
          The requested coordinate or project file has been moved, renamed, or does not exist in the PixelMutiny DigiMedia index.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-full bg-[#1F3FFF] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1632D6] transition-all shadow-[0_0_30px_rgba(31,63,255,0.35)] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/works"
            className="px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <span>Explore Works</span>
            <ArrowUpRight className="w-4 h-4 text-[#1F3FFF]" />
          </Link>
          <Link
            href="/services"
            className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#8E95A5] hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            <span>Services & Pricing</span>
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#8E95A5] hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            <span>Get in Touch</span>
          </Link>
        </div>

        {/* Telemetry metadata footer badge */}
        <div className="mt-12 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#5A6072] gap-2">
          <span>COORDINATE: [INDEX_MISS // 404]</span>
          <span>PIXELMUTINY DIGIMEDIA LLP</span>
        </div>
      </div>
    </section>
  );
}
