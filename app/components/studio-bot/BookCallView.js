'use client';

import React from 'react';
import {
  Calendar,
  CalendarPlus,
  Clock,
  Download,
  Phone,
  CheckCircle2,
  ExternalLink,
  User,
  Mail,
} from 'lucide-react';

export default function BookCallView({
  bookForm,
  setBookForm,
  availableDates,
  onBookMeeting,
  bookingLoading,
  bookedMeeting,
  onResetMeeting,
  onPlayClick,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA] text-[#17191F]">
      <div className="bot-form-container">
        {/* Sprint Discovery Overview Header */}
        <div className="bot-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#17191F] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Calendar className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-[#17191F] tracking-tight">
                20-Min Sprint Discovery
              </h3>
              <p className="text-[12px] text-[#6B7280]">
                With Sumit (Founder & Design Director) • 1-on-1 Architecture Call
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FDF4] border border-[#DCFCE7] text-[11px] font-semibold text-[#166534]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Free • 100% Confidential</span>
          </div>
        </div>

        {/* If Meeting Booked -> Confirmed Screen */}
        {bookedMeeting ? (
          <div className="bot-card border-[#BBF7D0] space-y-4">
            <div className="flex items-center gap-2.5 text-[#166534] font-bold text-[15px]">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
              <span>Sprint Discovery Call Confirmed!</span>
            </div>

            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              You are locked in for{' '}
              <strong className="text-[#17191F]">{bookedMeeting.meeting.date}</strong> at{' '}
              <strong className="text-[#17191F]">{bookedMeeting.meeting.timeSlot}</strong>. A calendar invite has been dispatched to{' '}
              <strong className="text-[#17191F]">{bookedMeeting.meeting.email}</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <a
                href={bookedMeeting.googleCalUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-lg bg-[#17191F] hover:bg-[#0859D4] text-white text-[12.5px] font-medium flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={bookedMeeting.icsDataUri}
                download="PixelMutiny-Sprint-Discovery.ics"
                className="py-2.5 px-4 rounded-lg bg-white hover:bg-[#F9FAFB] text-[#17191F] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[12.5px] font-medium flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-[#6B7280]" />
                <span>Download .ics File</span>
              </a>

              <a
                href={bookedMeeting.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="sm:col-span-2 py-2.5 px-4 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-[12.5px] font-medium flex items-center justify-center gap-2 transition-all shadow-xs active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>Notify Sumit on WhatsApp</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onResetMeeting}
              className="pt-2 text-[12px] text-[#6B7280] hover:text-[#17191F] font-medium transition-colors mx-auto block cursor-pointer"
            >
              ← Schedule another meeting
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form
            onSubmit={onBookMeeting}
            className="bot-card space-y-4"
          >
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                  Full Name <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookForm.name}
                  onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                  placeholder="e.g. Sumit Shaw"
                  className="bot-input"
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                  Work Email <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={bookForm.email}
                  onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                  placeholder="e.g. sumit@agency.com"
                  className="bot-input"
                />
              </div>
            </div>

            {/* Phone or WhatsApp */}
            <div>
              <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                Phone / WhatsApp <span className="text-[#9CA3AF] font-normal">(Optional for SMS/WhatsApp reminder)</span>
              </label>
              <input
                type="tel"
                value={bookForm.phone}
                onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                placeholder="e.g. +91 9315580036"
                className="bot-input"
              />
            </div>

            {/* Date Selection Grid */}
            <div>
              <label className="block text-[11.5px] font-semibold text-[#374151] mb-1.5">
                Preferred Date <span className="text-[#DC2626]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableDates.map((d) => {
                  const isSelected = bookForm.date === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => {
                        onPlayClick?.();
                        setBookForm({ ...bookForm, date: d.value });
                      }}
                      className={`py-2 px-3 rounded-lg text-center transition-all duration-150 cursor-pointer border text-[12px] active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[#17191F] text-white border-[#17191F] font-semibold shadow-2xs'
                          : 'bg-white text-[#17191F] border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span className="block">{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection Grid */}
            <div>
              <label className="block text-[11.5px] font-semibold text-[#374151] mb-1.5">
                Preferred Time Slot <span className="text-[#DC2626]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['11:30 AM IST', '2:30 PM IST', '5:00 PM IST', '7:00 PM IST'].map((slot) => {
                  const isSelected = bookForm.timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        onPlayClick?.();
                        setBookForm({ ...bookForm, timeSlot: slot });
                      }}
                      className={`py-2 px-2.5 rounded-lg text-center transition-all duration-150 cursor-pointer border text-[12px] active:scale-[0.98] ${
                        isSelected
                          ? 'bg-[#17191F] text-white border-[#17191F] font-semibold shadow-2xs'
                          : 'bg-white text-[#17191F] border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sprint Topic Dropdown */}
            <div>
              <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                Sprint Discussion Topic
              </label>
              <select
                value={bookForm.topic}
                onChange={(e) => setBookForm({ ...bookForm, topic: e.target.value })}
                className="bot-input cursor-pointer"
              >
                <option value="Website & Brand Sprint Discovery">Website & Brand Sprint Discovery</option>
                <option value="Landing Page & Conversion Optimization">Landing Page & CRO Sprint</option>
                <option value="Web App / Dashboard SaaS Architecture">Web App & Dashboard Architecture</option>
                <option value="Meta Ads & Growth Strategy">Meta Ads & Performance Campaign</option>
                <option value="Startup Full Launch Kit Scope">Startup Full Launch Kit Scope</option>
                <option value="Custom Project / Retainer Consultation">Custom Project / Retainer</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={bookingLoading}
                className="bot-submit-btn"
              >
                {bookingLoading ? (
                  <span>Reserving sprint time slot...</span>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4" />
                    <span>Confirm Discovery Call with Sumit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
