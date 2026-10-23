'use client';

import React from 'react';
import {
  Check,
  Mail,
  Phone,
} from 'lucide-react';

export default function ScopeQuoteView({
  scopeServices,
  selectedServices,
  setSelectedServices,
  isUSD,
  setCurrency,
  totalScopeINR,
  totalScopeUSD,
  onDispatchScope,
  scopeDispatched,
  isLoading,
  onReturnToChat,
  onPlayClick,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA] text-[#17191F]">
      <div className="bot-form-container">
        {/* Estimator Header & Currency Toggle */}
        <div className="bot-card flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-[14px] text-[#17191F] tracking-tight">
              Instant Scope Estimator
            </h3>
            <p className="text-[12px] text-[#6B7280]">
              Transparent, milestone-gated sprint pricing
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onPlayClick?.();
              setCurrency(isUSD ? 'INR' : 'USD');
            }}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#17191F] border border-[#E5E7EB] transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <span>{isUSD ? '$ USD (Switch to ₹)' : '₹ INR (Switch to $)'}</span>
          </button>
        </div>

        {/* Disciplines Selection List */}
        <div className="bot-card space-y-3">
          <span className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
            Select Required Disciplines:
          </span>

          <div className="space-y-1.5">
            {scopeServices.map((srv) => {
              const isSelected = selectedServices.includes(srv.id);
              return (
                <div
                  key={srv.id}
                  onClick={() => {
                    onPlayClick?.();
                    setSelectedServices(
                      isSelected
                        ? selectedServices.filter((id) => id !== srv.id)
                        : [...selectedServices, srv.id]
                    );
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150 select-none active:scale-[0.99] ${
                    isSelected
                      ? 'bg-[#F9FAFB] border-[#17191F] text-[#17191F] shadow-2xs'
                      : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB] hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#17191F] border-[#17191F] text-white'
                          : 'border-[#D1D5DB] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-medium text-[13px] leading-tight text-[#17191F]">
                        {srv.name}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF] mt-0.5">
                        Turnaround: {srv.time}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold text-[13px] text-[#17191F]">
                      {isUSD ? `$${srv.usd.toLocaleString()}` : `₹${srv.inr.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scope Total Card */}
        <div className="bg-[#17191F] text-white p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] text-white/70 block uppercase tracking-wider font-medium">
                Starting Scope Estimate
              </span>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0.5 block">
                {isUSD ? `$${totalScopeUSD.toLocaleString()}` : `₹${totalScopeINR.toLocaleString()}`}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#16A34A]/20 text-[#4ADE80] font-semibold border border-[#16A34A]/30">
                48h Draft Guarantee
              </span>
            </div>
          </div>

          <p className="text-[12px] text-white/75 leading-relaxed">
            Includes 2 revision rounds, 100% intellectual property transfer, and direct communication channel with Sumit.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onDispatchScope}
              disabled={selectedServices.length === 0 || isLoading}
              className="flex-1 py-2.5 px-4 rounded-lg bg-white hover:bg-[#F3F4F6] text-[#17191F] text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98] disabled:opacity-40 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{scopeDispatched ? 'Brief Sent! Send Another' : 'Mail Project Brief to Sumit'}</span>
            </button>

            <a
              href={`https://wa.me/919315580036?text=${encodeURIComponent(
                `Hi Sumit! I calculated a scope estimate on PixelMutiny for: ${scopeServices
                  .filter((s) => selectedServices.includes(s.id))
                  .map((s) => s.name)
                  .join(', ')} (${isUSD ? `$${totalScopeUSD}` : `₹${totalScopeINR}`}). Can we discuss timelines?`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[12.5px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Back to Chat Option */}
        <button
          type="button"
          onClick={onReturnToChat}
          className="text-[12px] text-[#6B7280] hover:text-[#17191F] font-medium transition-colors mx-auto block cursor-pointer py-1"
        >
          ← Return to conversation workspace
        </button>
      </div>
    </div>
  );
}
