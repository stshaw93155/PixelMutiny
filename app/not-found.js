import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Compass, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: '404 — Page Not Located | PixelMutiny DigiMedia',
  description: 'The requested route does not exist in the PixelMutiny DigiMedia index.',
};

export default function NotFound() {
  return (
    <section className="relative min-h-[65vh] w-full bg-[#0A0F1F] text-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-hidden">
      {/* Kinetic ambient glow behind error block */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#1F3FFF]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Center 404 Card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center">
        {/* Status indicator pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#8E95A5] mb-5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[#1F3FFF] font-semibold">ERROR 404</span>
          <span className="text-white/30">//</span>
          <span>PAGE NOT FOUND</span>
        </div>

        {/* Big Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase mb-3">
          Route Not Found
        </h1>

        <p className="font-mono text-xs sm:text-sm text-[#8E95A5] max-w-md mx-auto leading-relaxed mb-8">
          The requested coordinate or project file does not exist in the PixelMutiny DigiMedia index. Use the direct paths below to continue:
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-8">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#1F3FFF] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#1632D6] transition-all shadow-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/works"
            className="px-6 py-3 rounded-full bg-white/10 border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <span>Explore Works</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#1F3FFF]" />
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[#8E95A5] hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            <span>Services &amp; Pricing</span>
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[#8E95A5] hover:text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            <span>Start a Project</span>
          </Link>
        </div>

        {/* Telemetry metadata footer badge */}
        <div className="pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5A6072] gap-2">
          <span>COORDINATE: [STATUS // 404]</span>
          <span>PIXELMUTINY DIGIMEDIA PRIVATE LIMITED</span>
        </div>
      </div>
    </section>
  );
}
