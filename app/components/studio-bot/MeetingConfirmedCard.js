'use client';

import React from 'react';
import {
  CalendarPlus,
  Download,
  Phone,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Clock,
  User,
} from 'lucide-react';

export default function MeetingConfirmedCard({ meta }) {
  if (!meta || !meta.meeting) return null;

  const { meeting, googleCalUrl, icsDataUri, whatsappUrl } = meta;

  return (
    <div className="w-full max-w-[640px] my-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow overflow-hidden text-[#17191F]">
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#F0FDF4] border-b border-[#DCFCE7] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
          <span className="text-[13px] font-semibold text-[#166534] tracking-tight">
            Sprint Discovery Call Confirmed
          </span>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-[#166534] border border-[#BBF7D0]">
          Calendar Reserved
        </span>
      </div>

      {/* Meeting Details */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[13px]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
              Date & Time Slot
            </span>
            <div className="font-medium text-[#17191F] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>{meeting.date} at {meeting.timeSlot}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
              Host
            </span>
            <div className="font-medium text-[#17191F] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Sumit (Founder & Design Director)</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
              Attendee
            </span>
            <div className="font-medium text-[#17191F] truncate">
              {meeting.name} ({meeting.email})
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
              Sprint Topic
            </span>
            <div className="font-medium text-[#17191F] truncate">
              {meeting.topic || 'Website & Brand Sprint Discovery'}
            </div>
          </div>
        </div>

        {/* Calendar & Sync Actions */}
        <hr className="border-[#E5E7EB]" />

        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
            Add to Calendar / Sync
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {googleCalUrl && (
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#17191F] hover:bg-[#0859D4] text-white text-[12px] font-medium transition-all shadow-xs active:scale-[0.98]"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Google Calendar</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {icsDataUri && (
              <a
                href={icsDataUri}
                download="PixelMutiny-Sprint-Discovery.ics"
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-white hover:bg-[#F9FAFB] text-[#17191F] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12px] font-medium transition-all shadow-xs active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Apple / Outlook (.ics)</span>
              </a>
            )}

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-[12px] font-medium transition-all shadow-xs active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Notify via WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
