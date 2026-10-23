'use client';

import React from 'react';
import { Bot, User } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import ProjectBriefCard, { parseProjectBriefData } from './ProjectBriefCard';
import MeetingConfirmedCard from './MeetingConfirmedCard';
import WelcomeMessage from './WelcomeMessage';

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
                <span>{chip.label.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]\s*/u, '')}</span>
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
                    <span>{chip.label.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]\s*/u, '')}</span>
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
