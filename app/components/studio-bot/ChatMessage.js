'use client';

import React from 'react';
import {
  Bot,
  User,
  Calendar,
  MessageCircle,
  Mail,
  Calculator,
  FileText,
  ExternalLink,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import ProjectBriefCard, { parseProjectBriefData } from './ProjectBriefCard';
import MeetingConfirmedCard from './MeetingConfirmedCard';
import WelcomeMessage from './WelcomeMessage';

function getChipIcon(chip, idx) {
  const action = chip?.action || '';
  const label = (chip?.label || '').toLowerCase();

  if (action === 'open_booking_tab' || label.includes('book') || label.includes('date') || label.includes('call') || label.includes('schedule')) {
    return <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
  }
  if (action === 'whatsapp' || label.includes('whatsapp') || label.includes('chat')) {
    return <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#10B981]" />;
  }
  if (action === 'open_mail_tab' || label.includes('mail') || label.includes('brief') || label.includes('dispatch')) {
    return <Mail className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
  }
  if (action === 'open_scope_tab' || label.includes('scope') || label.includes('estimate') || label.includes('calculator') || label.includes('price')) {
    return <Calculator className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
  }
  if (action === 'navigate_works' || label.includes('portfolio') || label.includes('works') || label.includes('projects')) {
    return <Briefcase className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
  }
  if (action === 'open_inquiry_drawer' || label.includes('inquiry') || label.includes('drawer')) {
    return <FileText className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
  }
  if (action === 'linkedin' || label.includes('linkedin')) {
    return <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
  }
  return <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-current opacity-85" />;
}

function cleanChipLabel(label) {
  if (!label) return '';
  return label
    .replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]\s*/u, '')
    .trim();
}

export default function ChatMessage({
  message,
  userProfile,
  onChipClick,
  onOpenBooking,
  onOpenWhatsApp,
}) {
  const isUser = message.role === 'user';
  const isInitialWelcome = message.id === 'msg_init';

  // If this is the initial greeting, render dedicated WelcomeMessage
  if (isInitialWelcome) {
    return (
      <div className="space-y-4">
        <WelcomeMessage userProfile={userProfile} />

        {/* Action Chips */}
        {message.chips && message.chips.length > 0 && (
          <div className="bot-action-chips select-none">
            {message.chips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onChipClick(chip)}
                className={`bot-chip-btn ${idx === 0 ? 'primary' : ''}`}
              >
                {getChipIcon(chip, idx)}
                <span>{cleanChipLabel(chip.label)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Check if message is a project dispatch brief
  const projectBriefData = parseProjectBriefData(message);

  return (
    <div className={`w-full ${isUser ? 'bot-msg-user-row' : 'bot-msg-assistant-row'}`}>
      {isUser ? (
        /* User Message Bubble */
        <div className="bot-msg-user-bubble">
          {message.content}
        </div>
      ) : (
        /* Assistant Message Row */
        <>
          <div className="bot-msg-assistant-avatar">
            <Bot className="w-3.5 h-3.5 text-[#4F46E5]" />
          </div>

          <div className="bot-msg-assistant-body">
            <div className="bot-msg-assistant-header">
              <span>Mutiny AI</span>
              <span className="text-[10px] text-[#9CA3AF]">•</span>
              <span className="text-[10px] text-[#9CA3AF]">
                {new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {projectBriefData ? (
              /* Structured Project Dispatch Card */
              <ProjectBriefCard
                data={projectBriefData}
                onOpenBooking={onOpenBooking}
                onOpenWhatsApp={onOpenWhatsApp}
              />
            ) : (
              /* Regular Assistant Response rendered via MarkdownRenderer */
              <div className="bot-msg-assistant-bubble">
                <MarkdownRenderer content={message.content} />
              </div>
            )}

            {/* Confirmed Meeting Rich Card */}
            {message.meta?.meeting && (
              <MeetingConfirmedCard meta={message.meta} />
            )}

            {/* Action Chips */}
            {message.chips && message.chips.length > 0 && (
              <div className="bot-action-chips select-none">
                {message.chips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChipClick(chip)}
                    className="bot-chip-btn"
                  >
                    {getChipIcon(chip, idx)}
                    <span>{cleanChipLabel(chip.label)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
