'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCurrency } from './useCurrency';
import { useSound } from './SoundManager';

import AppHeader from './studio-bot/AppHeader';
import PrimaryNavigation from './studio-bot/PrimaryNavigation';
import ChatMessage from './studio-bot/ChatMessage';
import ChatComposer from './studio-bot/ChatComposer';
import BookCallView from './studio-bot/BookCallView';
import ScopeQuoteView from './studio-bot/ScopeQuoteView';
import './studio-bot/studio-bot.css';

// Core Service catalog for Scope Estimator
export const SCOPE_SERVICES = [
  { id: 'website', name: 'Website Design & Dev', inr: 35000, usd: 950, time: '2–3 weeks' },
  { id: 'landing', name: 'High-Converting Landing Page', inr: 20000, usd: 350, time: '5–7 days' },
  { id: 'ui-ux', name: 'UI/UX & Figma Systems', inr: 25000, usd: 450, time: '1–2 weeks' },
  { id: 'dashboard', name: 'Web Apps & Dashboards', inr: 45000, usd: 800, time: '3–4 weeks' },
  { id: 'brand', name: 'Brand Identity & Visual System', inr: 12000, usd: 200, time: '7–10 days' },
  { id: 'video', name: 'Kinetic Reels & Short-form Video', inr: 6000, usd: 100, time: '48–72 hours' },
  { id: 'meta-ads', name: 'Meta Ads & Growth Marketing', inr: 15000, usd: 250, time: 'Monthly retainer' },
  { id: 'launch-kit', name: 'Startup Full Launch Kit (Save 25%)', inr: 75000, usd: 1250, time: '3 weeks' },
];

export default function StudioAiBot({ onOpenInquiry }) {
  const router = useRouter();
  const { currency, setCurrency, isUSD } = useCurrency();
  const { playClick, playSuccess } = useSound();

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'book' | 'quote'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeEngine, setActiveEngine] = useState('local_qwen_onnx_350mb');

  // Persistent User Memory
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
  });

  // Conversation History
  const [messages, setMessages] = useState([]);

  // Meeting Booking Form State
  const [bookForm, setBookForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '3:00 PM IST',
    topic: 'Website & Brand Sprint Discovery',
    notes: '',
  });
  const [bookedMeeting, setBookedMeeting] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Scope Estimator State
  const [selectedServices, setSelectedServices] = useState(['website']);
  const [scopeNotes, setScopeNotes] = useState('');
  const [scopeDispatched, setScopeDispatched] = useState(false);

  const messagesEndRef = useRef(null);
  const workspaceRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat' && isOpen) {
      scrollToBottom();
    }
  }, [messages, activeTab, isOpen]);

  // Handle Modal Open / Close Body Lock and Lenis Sync
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('pixelmutiny_modal_open'));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('pixelmutiny_modal_close'));
    }

    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('pixelmutiny_modal_close'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Load persistent memory on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('pixelmutiny_ai_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setUserProfile(parsed);
        setBookForm((prev) => ({
          ...prev,
          name: parsed.name || prev.name,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone,
        }));
      }

      const savedMessages = localStorage.getItem('pixelmutiny_ai_messages');
      if (savedMessages) {
        const parsedMsgs = JSON.parse(savedMessages);
        if (Array.isArray(parsedMsgs) && parsedMsgs.length > 0) {
          setMessages(parsedMsgs);
          return;
        }
      }

      // Initial default greeting with clean structured content
      const initialGreeting = {
        id: 'msg_init',
        role: 'assistant',
        timestamp: new Date().toISOString(),
        content: `Welcome to Mutiny AI\n\nYour AI-powered studio assistant for project scoping, pricing, and getting your next creative project moving.\n\nAsk a question, request a project estimate, or schedule a discovery call.`,
        chips: [
          { label: 'Book a Discovery Call', action: 'open_booking_tab' },
          { label: 'Instant Price Quote', action: 'open_scope_tab' },
          { label: 'Mail My Project Brief', action: 'open_mail_tab' },
          { label: 'WhatsApp Sumit Directly', action: 'whatsapp' },
          { label: 'Browse Portfolio', action: 'navigate_works' },
        ],
      };
      setMessages([initialGreeting]);
    } catch (err) {
      console.warn('Memory load error:', err);
    }
  }, []);

  // Save to localStorage whenever memory changes
  const updateMemory = (newProfile, newMessages) => {
    try {
      if (newProfile) {
        setUserProfile(newProfile);
        localStorage.setItem('pixelmutiny_ai_profile', JSON.stringify(newProfile));
        setBookForm((prev) => ({
          ...prev,
          name: newProfile.name || prev.name,
          email: newProfile.email || prev.email,
          phone: newProfile.phone || prev.phone,
        }));
      }
      if (newMessages) {
        setMessages(newMessages);
        localStorage.setItem('pixelmutiny_ai_messages', JSON.stringify(newMessages));
      }
    } catch (e) {
      console.warn('Memory write error:', e);
    }
  };

  // Clear memory & reset
  const handleClearMemory = () => {
    playClick?.();
    if (confirm('Reset Mutiny AI memory and clear chat history?')) {
      localStorage.removeItem('pixelmutiny_ai_profile');
      localStorage.removeItem('pixelmutiny_ai_messages');
      setUserProfile({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
      });
      const resetMsg = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        content: `Memory cleared! Starting fresh. What project or question can I assist you with today?`,
        chips: [
          { label: 'Book Discovery Call', action: 'open_booking_tab' },
          { label: 'Instant Scope Estimate', action: 'open_scope_tab' },
          { label: 'Browse Case Studies', action: 'navigate_works' },
        ],
      };
      setMessages([resetMsg]);
    }
  };

  // Sound chime helper
  const playBotChime = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // AudioContext unavailable
    }
  };

  // Handle Action Chips
  const handleChipClick = (chip) => {
    playClick?.();
    if (chip.action === 'open_booking_tab') {
      setActiveTab('book');
    } else if (chip.action === 'open_scope_tab') {
      setActiveTab('quote');
    } else if (chip.action === 'open_mail_tab') {
      setActiveTab('quote');
    } else if (chip.action === 'whatsapp') {
      const text = encodeURIComponent(
        `Hi Sumit! I'm browsing PixelMutiny and would love to discuss a project.${
          userProfile.name ? ` My name is ${userProfile.name}.` : ''
        }`
      );
      window.open(`https://wa.me/919315580036?text=${text}`, '_blank');
    } else if (chip.action === 'linkedin') {
      window.open('https://www.linkedin.com/in/gfxsumit/', '_blank');
    } else if (chip.action === 'navigate_works') {
      setIsOpen(false);
      router.push('/works');
    } else if (chip.action === 'navigate_services') {
      setIsOpen(false);
      router.push('/services');
    } else if (chip.action === 'open_inquiry_drawer') {
      setIsOpen(false);
      onOpenInquiry?.();
    } else if (chip.action === 'toggle_currency') {
      if (currency === 'INR') {
        setCurrency('USD');
      } else if (currency === 'USD') {
        setCurrency('PK_USD');
      } else {
        setCurrency('INR');
      }
    } else {
      handleSendMessage(chip.label);
    }
  };

  // Send Chat Message
  const handleSendMessage = async (customText) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    playClick?.();
    setInputMessage('');

    const userMsg = {
      id: `usr_${Date.now()}`,
      role: 'user',
      timestamp: new Date().toISOString(),
      content: textToSend,
    };

    const nextHistory = [...messages, userMsg];
    updateMemory(null, nextHistory);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          message: textToSend,
          userProfile,
          history: nextHistory.map((m) => ({ role: m.role, content: m.content })),
          currency: isUSD ? 'USD' : 'INR',
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.engine) setActiveEngine(data.engine);
        playBotChime();
        const botMsg = {
          id: `bot_${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          content: data.reply,
          chips: data.chips || [],
          action: data.action,
        };
        const finalHistory = [...nextHistory, botMsg];
        updateMemory(data.updatedProfile || userProfile, finalHistory);
      } else {
        const errorMsg = {
          id: `err_${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          content: data.error || 'Sorry, I encountered an issue. Please feel free to message Sumit on WhatsApp directly (+91 9315580036).',
        };
        updateMemory(null, [...nextHistory, errorMsg]);
      }
    } catch {
      const errorMsg = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        content: 'Connection interrupted. Please reach out to Sumit directly on WhatsApp (+91 9315580036) or email hello@pixelmutiny.com.',
      };
      updateMemory(null, [...nextHistory, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Meeting Booking
  const handleBookMeeting = async (e) => {
    e.preventDefault();
    if (!bookForm.name || !bookForm.email || !bookForm.date) {
      alert('Please fill in your name, email, and choose a meeting date.');
      return;
    }

    setBookingLoading(true);
    playClick?.();

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'book_meeting',
          ...bookForm,
        }),
      });

      const data = await res.json();
      if (data.success) {
        playSuccess?.();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0859D4', '#16A34A', '#17191F', '#ffffff'],
        });
        setBookedMeeting(data);

        // Update profile in memory
        const newProfile = {
          ...userProfile,
          name: bookForm.name,
          email: bookForm.email,
          phone: bookForm.phone,
        };

        // Append confirmation in chat
        const confirmMsg = {
          id: `msg_book_${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          content: `Discovery Call Confirmed!\n\n` +
            `• Date & Time: ${bookForm.date} at ${bookForm.timeSlot}\n` +
            `• Host: Sumit (Founder & Design Director)\n` +
            `• Attendee: ${bookForm.name} (${bookForm.email})\n` +
            `• Topic: ${bookForm.topic}\n\n` +
            `I've saved this meeting to our agency calendar. Click below to add it to your Google Calendar or sync via .ics:`,
          meta: {
            meeting: data.meeting,
            googleCalUrl: data.googleCalUrl,
            icsDataUri: data.icsDataUri,
            whatsappUrl: data.whatsappUrl,
          },
        };

        updateMemory(newProfile, [...messages, confirmMsg]);
      } else {
        alert(data.error || 'Failed to book meeting. Please try again or WhatsApp Sumit.');
      }
    } catch {
      alert('Failed to connect to scheduler. Please reach out via WhatsApp at +91 9315580036.');
    } finally {
      setBookingLoading(false);
    }
  };

  // Submit Scope / Mail Brief
  const handleDispatchScope = async () => {
    if (!userProfile.name || !userProfile.email) {
      const name = prompt('What is your name?');
      if (!name) return;
      const email = prompt('What is your email address?');
      if (!email) return;
      userProfile.name = name;
      userProfile.email = email;
    }

    setIsLoading(true);
    playClick?.();

    const selectedObjs = SCOPE_SERVICES.filter((s) => selectedServices.includes(s.id));
    const totalINR = selectedObjs.reduce((acc, curr) => acc + curr.inr, 0);
    const totalUSD = selectedObjs.reduce((acc, curr) => acc + curr.usd, 0);
    const estimatedTotal = isUSD ? `$${totalUSD.toLocaleString()}` : `₹${totalINR.toLocaleString()}`;

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_lead',
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          services: selectedObjs.map((s) => s.name),
          budget: estimatedTotal,
          timeline: selectedObjs[0]?.time || '2–3 weeks',
          currency: isUSD ? 'USD' : 'INR',
          estimatedTotal,
          brief: scopeNotes || `Selected scope package: ${selectedObjs.map((s) => s.name).join(', ')}.`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        playSuccess?.();
        setScopeDispatched(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0859D4', '#16A34A'],
        });

        // Add structured brief card to chat history
        const dispatchMsg = {
          id: `msg_disp_${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toISOString(),
          content: `Project Scope Dispatched to Sumit!\n\n` +
            `• Client: ${userProfile.name} (${userProfile.email})\n` +
            `• Services: ${selectedObjs.map((s) => s.name).join(', ')}\n` +
            `• Estimated Starting Total: ${estimatedTotal}\n` +
            `• Target Sprint Turnaround: ${selectedObjs[0]?.time || '2–3 weeks'}\n\n` +
            `Sumit and our senior engineers will review your requirements and reply with a complete sprint roadmap within 24 business hours.`,
          meta: {
            type: 'project_brief',
            client: userProfile.name,
            email: userProfile.email,
            services: selectedObjs.map((s) => s.name),
            estimatedTotal,
            timeline: selectedObjs[0]?.time || '2–3 weeks',
            nextSteps: 'Sumit and our senior engineers will review your requirements and reply with a complete sprint roadmap within 24 business hours.',
          },
          chips: [
            { label: 'Book a Discovery Call', action: 'open_booking_tab' },
            { label: 'Message Sumit on WhatsApp', action: 'whatsapp' },
          ],
        };

        updateMemory(userProfile, [...messages, dispatchMsg]);
      } else {
        alert(data.error || 'Failed to dispatch brief.');
      }
    } catch {
      alert('Error dispatching brief. Please WhatsApp Sumit at +91 9315580036.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Scope calculations
  const totalScopeINR = SCOPE_SERVICES.filter((s) => selectedServices.includes(s.id)).reduce(
    (acc, curr) => acc + curr.inr,
    0
  );
  const totalScopeUSD = SCOPE_SERVICES.filter((s) => selectedServices.includes(s.id)).reduce(
    (acc, curr) => acc + curr.usd,
    0
  );

  // Available dates for booking (Next 6 weekdays)
  const getAvailableDates = () => {
    const dates = [];
    const now = new Date();
    let count = 0;
    while (dates.length < 6) {
      count++;
      const nextDate = new Date(now);
      nextDate.setDate(now.getDate() + count);
      // Skip weekends (0 is Sun, 6 is Sat)
      if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
        const yyyy = nextDate.getFullYear();
        const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
        const dd = String(nextDate.getDate()).padStart(2, '0');
        const formatted = `${yyyy}-${mm}-${dd}`;
        const dayLabel = nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        dates.push({ value: formatted, label: dayLabel });
      }
    }
    return dates;
  };
  const availableDates = getAvailableDates();

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Sumit! I'm browsing PixelMutiny and would love to discuss a project.${
        userProfile.name ? ` My name is ${userProfile.name}.` : ''
      }`
    );
    window.open(`https://wa.me/919315580036?text=${text}`, '_blank');
  };

  return (
    <>
      {/* =========================================================================
          FLOATING LAUNCHER — Bottom Left, compact, no tooltip
          ========================================================================= */}
      <div
        className="fixed bottom-6 left-6 z-[60] flex flex-col items-start pointer-events-auto"
        style={{ zIndex: 60 }}
      >
        {/* Interactive Character Button — compact */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              playClick?.();
              setIsOpen(true);
            }}
            className="group relative flex items-center justify-center cursor-pointer select-none outline-none focus:outline-none"
            aria-label="Open Mutiny AI Studio Assistant"
            title="Chat with Mutiny AI"
          >
            {/* Ambient Pulse Ring */}
            <div className="absolute inset-0 rounded-full bot-launcher-ring pointer-events-none" />

            {/* Robot Head Body — smaller */}
            <div className="bot-character-float relative w-10 h-10 rounded-xl bg-[#17191F] p-[2px] shadow-lg border border-[rgba(255,255,255,0.1)] transition-transform duration-200 group-hover:scale-105 active:scale-95 flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-[#0E1015] flex items-center justify-center overflow-hidden relative">
                {/* SVG Cute Bot Face */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full p-1.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="50" y1="26" x2="50" y2="10" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="8" r="6" fill="#0859D4" className="bot-antenna-orb" />
                  <rect x="18" y="24" width="64" height="54" rx="16" fill="#18181B" stroke="#27272a" strokeWidth="3" />
                  <rect x="26" y="36" width="48" height="26" rx="8" fill="#030712" stroke="#0859D4" strokeWidth="1.5" />
                  <g className="bot-eye-blink">
                    <circle cx="39" cy="48" r="4.5" fill="#38bdf8" />
                    <circle cx="41" cy="46.5" r="1.5" fill="#ffffff" />
                    <circle cx="61" cy="48" r="4.5" fill="#38bdf8" />
                    <circle cx="63" cy="46.5" r="1.5" fill="#ffffff" />
                  </g>
                  <ellipse cx="32" cy="56" rx="3" ry="1.5" fill="#f43f5e" opacity="0.6" />
                  <ellipse cx="68" cy="56" rx="3" ry="1.5" fill="#f43f5e" opacity="0.6" />
                  <path d="M44 55 Q50 58 56 55" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>

                {/* Online Status Dot */}
                <span className="absolute bottom-0.5 right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A] border-[1.5px] border-[#0E1015]"></span>
                </span>
              </div>
            </div>

            <span className="sr-only">Mutiny AI Studio Assistant</span>
          </button>
        )}
      </div>


      {/* =========================================================================
          REDESIGNED MODERN AI STUDIO WORKSPACE (Linear / ChatGPT aesthetic)
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mutiny AI Studio Assistant Workspace"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="bot-workspace-overlay animate-in fade-in duration-200"
          style={{ zIndex: 70 }}
        >
          {/* Main Application Shell Frame */}
          <div className="bot-workspace-shell">
            {/* 1. Compact Application Header */}
            <AppHeader
              soundEnabled={soundEnabled}
              onToggleSound={() => {
                playClick?.();
                setSoundEnabled(!soundEnabled);
              }}
              onClearMemory={handleClearMemory}
              onClose={() => {
                playClick?.();
                setIsOpen(false);
              }}
              userProfile={userProfile}
              activeEngine={activeEngine}
            />

            {/* 2. Primary Segmented Navigation */}
            <PrimaryNavigation
              activeTab={activeTab}
              onSelectTab={(tabId) => {
                playClick?.();
                setActiveTab(tabId);
              }}
              userProfile={userProfile}
            />

            {/* 3. Central Conversation Workspace / Tab Content */}
            {activeTab === 'chat' && (
              <div className="bot-conversation-area">
                {/* Scrollable Conversation Stream */}
                <div
                  ref={workspaceRef}
                  className="bot-chat-scroll"
                  style={{ flex: 1, overflowY: 'auto' }}
                >
                  <div className="bot-conversation-container">
                    {messages.map((msg) => (
                      <ChatMessage
                        key={msg.id}
                        message={msg}
                        userProfile={userProfile}
                        onChipClick={handleChipClick}
                        onOpenBooking={() => {
                          playClick?.();
                          setActiveTab('book');
                        }}
                        onOpenWhatsApp={handleWhatsAppDirect}
                      />
                    ))}

                    {/* Typing / Thinking Indicator */}
                    {isLoading && (
                      <div className="bot-msg-assistant-row">
                        <div className="bot-msg-assistant-avatar">
                          <Bot className="w-3.5 h-3.5 text-[#4F46E5]" />
                        </div>
                        <div className="bot-msg-assistant-bubble flex items-center gap-2 text-[12.5px] text-[#6B7280]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-bounce" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-bounce [animation-delay:0.4s]" />
                          <span className="ml-1 text-[12px] font-medium text-[#6B7280]">
                            Mutiny AI is typing...
                          </span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* 4. Fixed Bottom Message Composer */}
                <ChatComposer
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  onSend={() => handleSendMessage()}
                  isLoading={isLoading}
                  onQuickBook={() => {
                    playClick?.();
                    setActiveTab('book');
                  }}
                />
              </div>
            )}

            {/* TAB 2: Book Discovery Call */}
            {activeTab === 'book' && (
              <BookCallView
                bookForm={bookForm}
                setBookForm={setBookForm}
                availableDates={availableDates}
                onBookMeeting={handleBookMeeting}
                bookingLoading={bookingLoading}
                bookedMeeting={bookedMeeting}
                onResetMeeting={() => setBookedMeeting(null)}
                onPlayClick={playClick}
              />
            )}

            {/* TAB 3: Instant Scope Estimator */}
            {activeTab === 'quote' && (
              <ScopeQuoteView
                scopeServices={SCOPE_SERVICES}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
                isUSD={isUSD}
                setCurrency={setCurrency}
                totalScopeINR={totalScopeINR}
                totalScopeUSD={totalScopeUSD}
                onDispatchScope={handleDispatchScope}
                scopeDispatched={scopeDispatched}
                isLoading={isLoading}
                onReturnToChat={() => setActiveTab('chat')}
                onPlayClick={playClick}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
