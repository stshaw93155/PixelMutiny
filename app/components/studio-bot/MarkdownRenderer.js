'use client';

import React from 'react';

/**
 * Structured, safe, lightweight Markdown renderer in pure React.
 * Zero dangerous innerHTML, zero external runtime vulnerabilities.
 * Safely parses bold, italics, inline code, headings, bullet/numbered lists,
 * links, and paragraphs while respecting line breaks and spacing.
 */

// Helper to parse inline elements (bold, italic, code, links)
function parseInline(text, keyPrefix = '') {
  if (!text || typeof text !== 'string') return null;

  // Tokenize regex for inline elements:
  // 1. Links: [label](url)
  // 2. Bold: **text** or __text__
  // 3. Italic: *text* or _text_
  // 4. Inline code: `code`
  // 5. Autolink URL: https?://\S+
  // 6. Autolink email: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
  const inlineRegex =
    /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*|__[^_]+__)|(`[^`]+`)|(\*[^*]+\*|_[^_]+_)|(https?:\/\/[^\s<)]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const elements = [];
  let lastIndex = 0;
  let match;
  let subKey = 0;

  while ((match = inlineRegex.exec(text)) !== null) {
    // Plain text before match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const matchedStr = match[0];
    const itemKey = `${keyPrefix}_inline_${subKey++}`;

    if (matchedStr.startsWith('[') && matchedStr.includes('](')) {
      // Markdown link [text](url)
      const linkMatch = matchedStr.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        elements.push(
          <a
            key={itemKey}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0859D4] hover:underline font-medium inline-flex items-center gap-0.5 break-all"
          >
            {linkMatch[1]}
          </a>
        );
      } else {
        elements.push(matchedStr);
      }
    } else if (matchedStr.startsWith('**') || matchedStr.startsWith('__')) {
      // Bold
      const content = matchedStr.slice(2, -2);
      elements.push(
        <strong key={itemKey} className="font-semibold text-[#17191F]">
          {parseInline(content, itemKey)}
        </strong>
      );
    } else if (matchedStr.startsWith('`') && matchedStr.endsWith('`')) {
      // Inline code
      const code = matchedStr.slice(1, -1);
      elements.push(
        <code
          key={itemKey}
          className="px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#4F46E5] text-[12px] font-mono border border-[#E5E7EB]"
        >
          {code}
        </code>
      );
    } else if (
      (matchedStr.startsWith('*') && matchedStr.endsWith('*')) ||
      (matchedStr.startsWith('_') && matchedStr.endsWith('_'))
    ) {
      // Italic
      const content = matchedStr.slice(1, -1);
      elements.push(
        <em key={itemKey} className="italic text-[#374151]">
          {parseInline(content, itemKey)}
        </em>
      );
    } else if (matchedStr.startsWith('http://') || matchedStr.startsWith('https://')) {
      // Auto-linked URL
      elements.push(
        <a
          key={itemKey}
          href={matchedStr}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0859D4] hover:underline font-medium break-all"
        >
          {matchedStr}
        </a>
      );
    } else if (matchedStr.includes('@')) {
      // Auto-linked email
      elements.push(
        <a
          key={itemKey}
          href={`mailto:${matchedStr}`}
          className="text-[#0859D4] hover:underline font-medium"
        >
          {matchedStr}
        </a>
      );
    } else {
      elements.push(matchedStr);
    }

    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length === 1 ? elements[0] : elements;
}

export default function MarkdownRenderer({ content, className = '' }) {
  if (!content || typeof content !== 'string') return null;

  // Split into lines for block parsing
  const rawLines = content.split('\n');
  const blocks = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }

  const flushList = () => {
    if (currentList) {
      const ListTag = currentList.type;
      const listKey = `list_${blocks.length}`;
      blocks.push(
        <ListTag
          key={listKey}
          className={`space-y-1 my-2 pl-5 ${
            currentList.type === 'ul'
              ? 'list-disc marker:text-[#6B7280]'
              : 'list-decimal marker:text-[#6B7280]'
          }`}
        >
          {currentList.items.map((item, idx) => (
            <li key={`${listKey}_item_${idx}`} className="leading-relaxed">
              {parseInline(item, `${listKey}_${idx}`)}
            </li>
          ))}
        </ListTag>
      );
      currentList = null;
    }
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // Empty line -> paragraph separator
    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings
    if (trimmed.startsWith('#### ')) {
      flushList();
      blocks.push(
        <h5
          key={`h4_${i}`}
          className="text-[13px] font-semibold text-[#17191F] mt-3 mb-1 tracking-tight"
        >
          {parseInline(trimmed.slice(5), `h4_${i}`)}
        </h5>
      );
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushList();
      blocks.push(
        <h4
          key={`h3_${i}`}
          className="text-[14px] font-semibold text-[#17191F] mt-3.5 mb-1.5 tracking-tight"
        >
          {parseInline(trimmed.slice(4), `h3_${i}`)}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      flushList();
      const textOnly = trimmed.replace(/^#+\s*/, '');
      blocks.push(
        <h3
          key={`h2_${i}`}
          className="text-[15px] font-bold text-[#17191F] mt-4 mb-2 tracking-tight"
        >
          {parseInline(textOnly, `h2_${i}`)}
        </h3>
      );
      continue;
    }

    // Unordered List Items: • or - or * (when followed by space)
    const ulMatch = trimmed.match(/^([•\-\*])\s+(.*)$/);
    if (ulMatch && !trimmed.startsWith('**')) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[2]);
      continue;
    }

    // Ordered List Items: 1. 2. etc.
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[2]);
      continue;
    }

    // Regular line / Paragraph
    flushList();
    blocks.push(
      <p key={`p_${i}`} className="leading-relaxed my-1.5 text-[#17191F]">
        {parseInline(line, `p_${i}`)}
      </p>
    );
  }

  flushList();

  return (
    <div className={`text-[13.5px] text-[#17191F] selection:bg-[#0859D4] selection:text-white ${className}`}>
      {blocks}
    </div>
  );
}
