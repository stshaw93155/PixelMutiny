'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  RefreshCw,
  X,
  Bot,
  Brain,
  Cpu,
  CheckCircle2,
  User,
  Mail,
  Briefcase,
  DollarSign,
  Clock,
} from 'lucide-react';

export default function AppHeader({
  soundEnabled,
  onToggleSound,
  onClearMemory,
  onClose,
  userProfile = {},
  activeEngine = 'local_qwen_onnx_350mb',
}) {
  const [showMemoryPopover, setShowMemoryPopover] = useState(false);
  const popoverRef = useRef(null);

  const profileName = userProfile?.name || '';
  const profileType = userProfile?.projectType || '';

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowMemoryPopover(false);
      }
    }
    if (showMemoryPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMemoryPopover]);

  const getEngineLabel = () => {
    switch (activeEngine) {
      case 'local_qwen_onnx_350mb':
        return 'Qwen 350MB';
      case 'ollama_qwen_0.5b':
        return 'Qwen GPU (398MB)';
      case 'cloud_ai':
        return 'Cloud AI';
      default:
        return 'Neural Core';
    }
  };

  const hasMemoryData = Boolean(
    userProfile.name ||
    userProfile.email ||
    userProfile.projectType ||
    userProfile.budget ||
    userProfile.timeline
  );

  return (
    <header className="bot-workspace-header relative">
      {/* Left: Brand Identity, Version, Engine Badge, Memory Indicator */}
      <div className="bot-header-left">
        {/* Compact Logo Mark */}
        <div className="bot-header-logo">
          <Bot className="w-4 h-4 text-[#38BDF8]" />
        </div>

        {/* Product Name & Version */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="bot-header-title">
            Mutiny AI
          </span>
          <span className="bot-header-badge hidden xs:inline-block">
            v2.4
          </span>
          <span
            className="bot-engine-badge inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]"
            title={`Active AI Architecture: ${activeEngine}`}
          >
            <Cpu className="w-2.5 h-2.5" />
            <span>{getEngineLabel()}</span>
          </span>
        </div>

        {/* Connection Status Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 bot-header-status">
          <span className="bot-status-dot" />
          <span>Sumit&apos;s AI Copilot</span>
        </div>

        {/* Interactive Memory Indicator */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMemoryPopover(!showMemoryPopover)}
            className="hidden md:flex items-center gap-1.5 bot-header-memory hover:bg-[#F3F4F6] py-1 px-2 rounded-md transition-colors cursor-pointer text-left"
            title="Click to view active conversation memory"
            aria-expanded={showMemoryPopover}
          >
            <Brain className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
            <span className="font-semibold text-[#374151]">Memory:</span>
            <span className="text-[#17191F] truncate font-medium max-w-[130px]">
              {profileName || 'Anonymous'}
              {profileType ? ` • ${profileType}` : ''}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ml-0.5 ${
                hasMemoryData ? 'bg-[#16A34A]' : 'bg-[#9CA3AF]'
              }`}
              title={hasMemoryData ? 'Memory Active & Stored' : 'No details captured yet'}
            />
          </button>

          {/* Interactive Memory Inspector Popover */}
          {showMemoryPopover && (
            <div
              ref={popoverRef}
              className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E5E7EB] p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-[12px]"
            >
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-1.5 font-bold text-[#111827]">
                  <Brain className="w-4 h-4 text-[#4F46E5]" />
                  <span>Session Memory Card</span>
                </div>
                <span className="text-[10px] text-[#059669] font-medium bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                  Local Sync
                </span>
              </div>

              <div className="space-y-1.5 text-[#4B5563]">
                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-[#F9FAFB]">
                  <span className="flex items-center gap-1.5 text-[#6B7280]">
                    <User className="w-3.5 h-3.5" /> Name:
                  </span>
                  <span className="font-semibold text-[#111827] truncate max-w-[140px]">
                    {userProfile.name || 'Not provided'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-[#F9FAFB]">
                  <span className="flex items-center gap-1.5 text-[#6B7280]">
                    <Mail className="w-3.5 h-3.5" /> Email:
                  </span>
                  <span className="font-semibold text-[#111827] truncate max-w-[140px]">
                    {userProfile.email || 'Not provided'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-[#F9FAFB]">
                  <span className="flex items-center gap-1.5 text-[#6B7280]">
                    <Briefcase className="w-3.5 h-3.5" /> Service:
                  </span>
                  <span className="font-semibold text-[#111827] truncate max-w-[140px]">
                    {userProfile.projectType || 'General inquiry'}
                  </span>
                </div>

                {userProfile.budget && (
                  <div className="flex items-center justify-between py-1 px-1.5 rounded bg-[#F9FAFB]">
                    <span className="flex items-center gap-1.5 text-[#6B7280]">
                      <DollarSign className="w-3.5 h-3.5" /> Budget:
                    </span>
                    <span className="font-semibold text-[#111827] truncate max-w-[140px]">
                      {userProfile.budget}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-1 px-1.5 rounded bg-[#F9FAFB]">
                  <span className="flex items-center gap-1.5 text-[#6B7280]">
                    <Cpu className="w-3.5 h-3.5" /> Architecture:
                  </span>
                  <span className="font-semibold text-[#4F46E5] truncate max-w-[140px]">
                    {activeEngine === 'local_qwen_onnx_350mb'
                      ? 'Qwen2.5-0.5B (~350MB)'
                      : activeEngine === 'ollama_qwen_0.5b'
                      ? 'Ollama Qwen (398MB)'
                      : 'Neural Domain Core'}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#F3F4F6] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowMemoryPopover(false);
                    onClearMemory?.();
                  }}
                  className="text-[11px] text-[#DC2626] hover:underline font-medium"
                >
                  Clear Memory
                </button>
                <button
                  type="button"
                  onClick={() => setShowMemoryPopover(false)}
                  className="text-[11px] text-[#6B7280] hover:text-[#111827] font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Secondary Actions (Sound, Reset, Close) */}
      <div className="bot-header-tools">
        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="bot-tool-btn"
          title={soundEnabled ? 'Mute sound chimes' : 'Enable sound chimes'}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#4F46E5]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#9CA3AF]" />
          )}
        </button>

        {/* Clear Memory / Restart */}
        <button
          type="button"
          onClick={onClearMemory}
          className="bot-tool-btn"
          title="Reset conversation and clear session memory"
          aria-label="Clear session memory"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Close Modal / Window */}
        <button
          type="button"
          onClick={onClose}
          className="bot-tool-btn"
          title="Close workspace (Esc)"
          aria-label="Close workspace"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
