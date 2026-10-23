'use client';

import React from 'react';
import { MessageSquare, Calendar, Sliders, Brain } from 'lucide-react';

export default function PrimaryNavigation({
  activeTab,
  onSelectTab,
  userProfile,
}) {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'book', label: 'Book Call', icon: Calendar },
    { id: 'quote', label: 'Scope Quote', icon: Sliders },
  ];

  return (
    <div className="bot-workspace-nav">
      {/* Segmented Tab Navigation Control */}
      <div
        role="tablist"
        aria-label="Mutiny AI Studio Navigation"
        className="bot-segmented-tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`bot-segmented-tab ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile/Tablet Memory Tag */}
      <div className="bot-nav-memory-tag md:hidden">
        <Brain className="w-3 h-3 text-[#4F46E5] shrink-0" />
        <span className="truncate max-w-[140px] font-medium">{userProfile?.name || 'Anonymous'}</span>
      </div>
    </div>
  );
}
