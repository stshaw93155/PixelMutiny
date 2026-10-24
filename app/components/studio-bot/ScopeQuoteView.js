'use client';

import React from 'react';
import { Check, Mail, Phone } from 'lucide-react';

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
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#FAFAFA' }}>

      {/* Scrollable top section */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div className="bot-form-container">

          {/* Estimator Header & Currency Badge */}
          <div className="bot-card flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[14px] text-[#17191F] tracking-tight">
                Instant Scope Estimator
              </h3>
              <p className="text-[12px] text-[#6B7280]">
                Transparent, milestone-gated sprint pricing
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
              <span>{isUSD ? '$ USD (Detected)' : '₹ INR (Detected)'}</span>
            </div>
          </div>

          {/* Disciplines Selection List */}
          <div className="bot-card" style={{ padding: '20px' }}>
            <span className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
              Select Required Disciplines:
            </span>

            <div className="space-y-1.5">
              {scopeServices.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => {
                      onPlayClick?.();
                      setSelectedServices(
                        isSelected
                          ? selectedServices.filter((id) => id !== srv.id)
                          : [...selectedServices, srv.id]
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        onPlayClick?.();
                        setSelectedServices(
                          isSelected
                            ? selectedServices.filter((id) => id !== srv.id)
                            : [...selectedServices, srv.id]
                        );
                      }
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: `1px solid ${isSelected ? '#17191F' : '#E5E7EB'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      userSelect: 'none',
                      background: isSelected ? '#F9FAFB' : '#FFFFFF',
                      transition: 'all 0.12s ease',
                      marginBottom: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '5px',
                          border: `1.5px solid ${isSelected ? '#17191F' : '#D1D5DB'}`,
                          background: isSelected ? '#17191F' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.12s ease',
                        }}
                      >
                        {isSelected && <Check style={{ width: '11px', height: '11px', color: '#FFFFFF', strokeWidth: 3 }} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '13px', color: '#17191F', lineHeight: 1.3 }}>
                          {srv.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                          Turnaround: {srv.time}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#17191F', flexShrink: 0 }}>
                      {isUSD ? `$${srv.usd.toLocaleString()}` : `₹${srv.inr.toLocaleString()}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Fixed bottom: Total Card + Action Buttons */}
      <div style={{ flexShrink: 0, background: '#17191F', padding: '20px', borderTop: '1px solid #E5E7EB' }}>
        
        {/* Total Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>
              Starting Scope Estimate
            </span>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', display: 'block', marginTop: '2px' }}>
              {isUSD ? `$${totalScopeUSD.toLocaleString()}` : `₹${totalScopeINR.toLocaleString()}`}
            </span>
          </div>
          <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(22,163,74,0.2)', color: '#4ADE80', fontWeight: 600, border: '1px solid rgba(22,163,74,0.3)' }}>
            48h Draft Guarantee
          </span>
        </div>

        <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: '16px' }}>
          Includes 2 revision rounds, 100% IP transfer, and direct communication with Sumit.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onDispatchScope}
            disabled={selectedServices.length === 0 || isLoading}
            style={{
              flex: 1,
              minWidth: '140px',
              padding: '10px 16px',
              borderRadius: '8px',
              background: selectedServices.length === 0 ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
              color: '#17191F',
              fontSize: '12.5px',
              fontWeight: 600,
              border: 'none',
              cursor: selectedServices.length === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: selectedServices.length === 0 ? 0.5 : 1,
              transition: 'all 0.15s ease',
            }}
          >
            <Mail style={{ width: '15px', height: '15px' }} />
            <span>{scopeDispatched ? 'Brief Sent! Send Another' : 'Mail Brief to Sumit'}</span>
          </button>

          <a
            href={`https://wa.me/919315580036?text=${encodeURIComponent(
              `Hi Sumit! Scope estimate on PixelMutiny: ${scopeServices
                .filter((s) => selectedServices.includes(s.id))
                .map((s) => s.name)
                .join(', ')} (${isUSD ? `$${totalScopeUSD}` : `₹${totalScopeINR}`}). Can we discuss?`
            )}`}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1,
              minWidth: '140px',
              padding: '10px 16px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: '12.5px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              textDecoration: 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Phone style={{ width: '15px', height: '15px' }} />
            <span>Discuss on WhatsApp</span>
          </a>
        </div>

        {/* Return to chat */}
        <button
          type="button"
          onClick={onReturnToChat}
          style={{
            marginTop: '14px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            padding: '4px',
          }}
        >
          ← Return to conversation
        </button>

      </div>
    </div>
  );
}
