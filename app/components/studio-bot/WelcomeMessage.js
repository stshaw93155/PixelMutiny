'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WelcomeMessage({ userProfile }) {
  const name = userProfile?.name;

  return (
    <div className="py-6 px-1 max-w-[680px]">
      {/* Icon Glyph */}
      <div className="w-8 h-8 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] text-[#4F46E5] flex items-center justify-center shadow-2xs">
        <Sparkles className="w-4 h-4 text-[#4F46E5]" />
      </div>

      {/* Main Heading */}
      <h2 className="text-[18px] sm:text-[20px] font-bold text-[#17191F] tracking-tight mt-3">
        {name ? `Welcome back, ${name} · Mutiny AI` : 'Welcome to Mutiny AI'}
      </h2>

      {/* Description */}
      <p className="text-[13.5px] text-[#4B5563] mt-1.5 leading-relaxed">
        Your AI-powered studio assistant for project scoping, pricing, and getting your next creative project moving.
      </p>

      {/* Supporting Text */}
      <p className="text-[12.5px] text-[#6B7280] mt-1 leading-normal">
        Ask a question, request a project estimate, or schedule a discovery call with Sumit.
      </p>
    </div>
  );
}
