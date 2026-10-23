'use client';

import React from 'react';
import {
  Calendar,
  Phone,
  CheckCircle2,
  Clock,
  Mail,
  User,
  Layers,
} from 'lucide-react';

/**
 * Robust parser to extract project brief fields from either
 * structured metadata or legacy text response strings.
 */
export function parseProjectBriefData(msg) {
  if (!msg) return null;

  // 1. Direct structured metadata
  if (msg.meta?.type === 'project_brief') {
    return {
      client: msg.meta.client || '',
      email: msg.meta.email || '',
      services: Array.isArray(msg.meta.services)
        ? msg.meta.services
        : typeof msg.meta.services === 'string'
        ? msg.meta.services.split(',').map((s) => s.trim())
        : [],
      price: msg.meta.estimatedTotal || msg.meta.price || '',
      turnaround: msg.meta.timeline || msg.meta.turnaround || '2–3 weeks',
      nextSteps:
        msg.meta.nextSteps ||
        'Our team will review your requirements and share a sprint roadmap within 24 business hours.',
    };
  }

  const content = msg.content || '';
  // Check if content matches project scope dispatch patterns
  const isDispatchMatch =
    content.includes('Project Scope Dispatched') ||
    content.includes('Project brief dispatched') ||
    content.includes('Project Scope Dispatched to Sumit');

  if (!isDispatchMatch) return null;

  try {
    let client = '';
    let email = '';
    let services = [];
    let price = '';
    let turnaround = '';
    let nextSteps =
      'Our team will review your requirements and share a sprint roadmap within 24 business hours.';

    // Client line: • Client: Sumit Shaw (email@example.com)
    const clientMatch = content.match(
      /(?:•|\*|-)?\s*\**Client\**:\s*([^\n(]+)(?:\(([^)]+)\))?/i
    );
    if (clientMatch) {
      client = clientMatch[1].trim();
      email = clientMatch[2] ? clientMatch[2].trim() : '';
    }

    // Services line: • Services: High-converting landing page, Kinetic reels
    const servicesMatch = content.match(
      /(?:•|\*|-)?\s*\**Services\**:\s*([^\n]+)/i
    );
    if (servicesMatch) {
      services = servicesMatch[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Price line: • Estimated Starting Total: ₹26,000 (INR)
    const priceMatch = content.match(
      /(?:•|\*|-)?\s*\**(?:Estimated Starting Total|Estimated starting price|Starting Total|Estimated Total)\**:\s*([^\n]+)/i
    );
    if (priceMatch) {
      price = priceMatch[1].replace(/\s*\([A-Z]{3}\)/i, '').trim();
    }

    // Turnaround line: • Target Sprint Turnaround: 5–7 days
    const turnaroundMatch = content.match(
      /(?:•|\*|-)?\s*\**(?:Target Sprint Turnaround|Estimated turnaround|Turnaround|Timeline)\**:\s*([^\n]+)/i
    );
    if (turnaroundMatch) {
      turnaround = turnaroundMatch[1].trim();
    }

    // Next steps: paragraph after the list
    const parts = content.split('\n\n');
    if (parts.length >= 3) {
      const candidate = parts[parts.length - 1].trim();
      if (candidate && !candidate.startsWith('•') && !candidate.startsWith('*')) {
        nextSteps = candidate;
      }
    }

    if (services.length > 0 || price || client) {
      return {
        client,
        email,
        services,
        price,
        turnaround: turnaround || '2–3 weeks',
        nextSteps,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export default function ProjectBriefCard({
  data,
  onOpenBooking,
  onOpenWhatsApp,
}) {
  if (!data) return null;

  const { client, email, services, price, turnaround, nextSteps } = data;

  return (
    <div className="bot-brief-card text-[#17191F]">
      {/* Card Header with Status Badge */}
      <div className="bot-brief-header">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          <span className="text-[13px] font-semibold text-[#17191F] tracking-tight">
            Project Brief Dispatched
          </span>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
          Sent to Lead Designer
        </span>
      </div>

      {/* Detail Layout */}
      <div className="bot-brief-body">
        <div className="bot-brief-grid">
          {/* Client Info */}
          {(client || email) && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
                Client Contact
              </span>
              <div className="text-[13.5px] font-medium text-[#17191F] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                <span className="truncate">{client || 'Client Founder'}</span>
              </div>
              {email && (
                <div className="text-[12px] text-[#4F46E5] flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-[#6B7280] shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="hover:underline truncate"
                  >
                    {email}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Turnaround Timeline */}
          {turnaround && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
                Target Turnaround
              </span>
              <div className="text-[13.5px] font-medium text-[#17191F] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                <span>{turnaround}</span>
              </div>
              <span className="text-[11px] text-[#16A34A] font-medium block">
                Sprint slot held for 48 hours
              </span>
            </div>
          )}
        </div>

        {/* Estimated Starting Price */}
        {price && (
          <div className="bot-brief-price-box">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
                Estimated Starting Price
              </span>
              <div className="bot-brief-price-val">
                {price}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white border border-[#E2E8F0] text-[#475569] shadow-2xs">
                Milestone-Gated
              </span>
            </div>
          </div>
        )}

        {/* Services Requested */}
        {services && services.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>Services Requested</span>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {services.map((srv, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-medium bg-[#F3F4F6] text-[#17191F] border border-[#E5E7EB]"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="pt-2 border-t border-[#E5E7EB] space-y-1 text-[12.5px] text-[#4B5563] leading-relaxed">
          <div className="font-semibold text-[#17191F] flex items-center gap-1.5 text-[11.5px] uppercase tracking-wider text-[#6B7280]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Next Steps</span>
          </div>
          <p>{nextSteps}</p>
        </div>

        {/* Action Buttons */}
        <div className="bot-brief-actions">
          <button
            type="button"
            onClick={onOpenBooking}
            className="bot-btn-primary"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Discovery Call</span>
          </button>

          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="bot-btn-secondary"
          >
            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Message Sumit on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
