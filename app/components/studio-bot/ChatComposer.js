'use client';

import React, { useRef, useEffect } from 'react';
import { ArrowUp, Zap, Loader2 } from 'lucide-react';

export default function ChatComposer({
  inputMessage,
  setInputMessage,
  onSend,
  isLoading,
  onQuickBook,
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea height as content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${Math.max(newHeight, 36)}px`;
    }
  }, [inputMessage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim() && !isLoading) {
        onSend();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSend();
    }
  };

  return (
    <div className="bot-composer-container select-none">
      {/* Composer Input Surface */}
      <form onSubmit={handleSubmit} className="bot-composer-surface">
        {/* Multiline auto-expanding textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask about pricing, share your project requirements, or book a call..."
          className="bot-composer-textarea"
        />

        {/* Embedded Send Button */}
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          aria-label="Send message"
          className="bot-send-btn"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <ArrowUp className="w-4 h-4" />
          )}
        </button>
      </form>

      {/* Composer Footer Toolbar */}
      <div className="bot-composer-footer">
        <span className="hidden sm:inline">
          Press <kbd className="px-1 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563] text-[10px] font-mono border border-[#E5E7EB]">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded bg-[#F3F4F6] text-[#4B5563] text-[10px] font-mono border border-[#E5E7EB]">Shift + Enter</kbd> for a new line
        </span>
        <span className="inline sm:hidden">Tap send when ready</span>

        {/* Quick Book Action */}
        <button
          type="button"
          onClick={onQuickBook}
          className="bot-quick-book-btn"
        >
          <Zap className="w-3 h-3 text-[#4F46E5]" />
          <span>Quick Book Call</span>
        </button>
      </div>
    </div>
  );
}
