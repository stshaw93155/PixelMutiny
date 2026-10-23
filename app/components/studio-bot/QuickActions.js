'use client';

import React from 'react';
import {
  Calendar,
  Sliders,
  Mail,
  Phone,
  ArrowUpRight,
} from 'lucide-react';

export const DEFAULT_QUICK_ACTIONS = [
  {
    id: 'book',
    label: 'Book a Discovery Call',
    action: 'open_booking_tab',
    icon: Calendar,
    primary: true,
  },
  {
    id: 'quote',
    label: 'Instant Price Quote',
    action: 'open_scope_tab',
    icon: Sliders,
    primary: false,
  },
  {
    id: 'mail',
    label: 'Mail My Project Brief',
    action: 'open_mail_tab',
    icon: Mail,
    primary: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Sumit Directly',
    action: 'whatsapp',
    icon: Phone,
    primary: false,
  },
  {
    id: 'portfolio',
    label: 'Browse Portfolio',
    action: 'navigate_works',
    icon: ArrowUpRight,
    primary: false,
  },
];

export default function QuickActions({
  actions = DEFAULT_QUICK_ACTIONS,
  onActionClick,
  className = '',
}) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 my-2 select-none ${className}`}>
      {actions.map((act, idx) => {
        const Icon = act.icon || Calendar;
        const isPrimary = act.primary || act.action === 'open_booking_tab';

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onActionClick(act)}
            className={`h-[34px] px-3.5 rounded-lg text-[12px] font-medium transition-all duration-150 inline-flex items-center gap-2 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:outline-none ${
              isPrimary
                ? 'bg-[#17191F] hover:bg-[#0859D4] text-white shadow-2xs'
                : 'bg-white hover:bg-[#F9FAFB] text-[#17191F] border border-[#E5E7EB] hover:border-[#D1D5DB] shadow-2xs'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isPrimary ? 'text-white' : 'text-[#6B7280]'}`} />
            <span>{act.label.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]\s*/u, '')}</span>
          </button>
        );
      })}
    </div>
  );
}
