'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useSound } from './SoundManager';
import { useCurrency } from './useCurrency';
import { BUDGET_OPTIONS } from '../../data/pricing';
import { X, Check, ArrowRight, Loader2 } from 'lucide-react';

export default function QuickInquiryDrawer({ isOpen, onClose }) {
  const { currency } = useCurrency();
  const [selectedDisciplines, setSelectedDisciplines] = useState(['Landing Page Design']);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('2 to 4 weeks');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', brief: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const { playClick, playSuccess } = useSound();

  const budgetList = BUDGET_OPTIONS[currency] || BUDGET_OPTIONS.INR;
  const isBudgetValid = budgetList.some((b) => b.value === selectedBudget);
  const activeBudgetValue = isBudgetValid ? selectedBudget : (budgetList[1]?.value || budgetList[0]?.value);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleDiscipline = (item) => {
    playClick();
    setSelectedDisciplines((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const budgetObj = budgetList.find((b) => b.value === activeBudgetValue);
      const budgetLabel = budgetObj ? budgetObj.label : activeBudgetValue;

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          companyUrl: formData.company,
          brief: formData.brief,
          services: selectedDisciplines,
          budget: budgetLabel,
          timeline: selectedTimeline,
          currency,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      playSuccess();
      setSubmitted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0A0A0C', '#0859D4', '#EDECE8'],
        });
      } catch {}
    } catch (err) {
      setSubmitError(err.message || 'Submission failed. Please email hello@pixelmutiny.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm flex justify-end animate-fade-in select-none">
      <div className="w-full max-w-xl h-full bg-white border-l border-[rgba(18,18,19,0.1)] flex flex-col justify-between overflow-y-auto p-6 md:p-10 shadow-2xl text-[#1D1D1F]">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(18,18,19,0.08)] text-xs">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo-main.png"
                alt="PixelMutiny DigiMedia"
                width={130}
                height={40}
                className="h-6 w-auto object-contain"
              />
              <span className="text-[#71717A]">|</span>
              <span className="text-[#1D1D1F] font-bold">[QUICK INQUIRY // LET&apos;S TALK]</span>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="w-9 h-9 sm:w-8 sm:h-8 min-w-[36px] min-h-[36px] rounded-full bg-[#F5F5F7] hover:bg-[#1D1D1F] hover:text-white flex items-center justify-center transition-all text-[#1D1D1F] cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0859D4] focus-visible:outline-none"
              aria-label="Close inquiry drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* Step 1: Discipline selection */}
              <div>
                <label className="block text-xs text-[#424242] mb-3 font-semibold uppercase tracking-wider">
                  STEP 01 // WHAT DO YOU NEED? (MULTI-SELECT)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Website Design & Dev',
                    'Landing Page Design',
                    'UI/UX Design',
                    'Dashboard Design & Dev',
                    'Graphics Design',
                    'Reel & Video Editing',
                    'Logo & Brand Identity',
                    'Meta Ads (FB & IG)',
                    'Startup Launch Kit',
                  ].map((disc) => {
                    const active = selectedDisciplines.includes(disc);
                    return (
                      <button
                        type="button"
                        key={disc}
                        onClick={() => toggleDiscipline(disc)}
                        className={`text-xs px-4 py-2.5 rounded-full border transition-all ${
                          active
                            ? 'bg-[#1F3FFF] text-white border-[#1F3FFF] font-semibold shadow-sm'
                            : 'bg-[#F5F6F8] border-[#E4E6EB] text-[#5B6275] hover:border-[#1F3FFF]'
                        }`}
                      >
                        {active ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>{disc}</span>
                          </span>
                        ) : (
                          disc
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget */}
              <div>
                <label className="block text-xs text-[#5B6275] mb-3 font-semibold uppercase tracking-wider">
                  STEP 02 // ESTIMATED INVESTMENT ({currency})
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {budgetList.map((b) => {
                    const active = activeBudgetValue === b.value;
                    return (
                      <button
                        type="button"
                        key={b.value}
                        onClick={() => {
                          playClick();
                          setSelectedBudget(b.value);
                        }}
                        className={`text-xs p-3 rounded-xl border text-left transition-all ${
                          active
                            ? 'bg-[#1F3FFF] border-[#1F3FFF] text-white font-semibold shadow-sm'
                            : 'bg-white border-[#E4E6EB] text-[#5B6275] hover:border-[#1F3FFF]'
                        }`}
                      >
                        <span>{active ? '● ' : '○ '}</span>
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Timeline */}
              <div>
                <label className="block text-xs text-[#5B6275] mb-3 font-semibold uppercase tracking-wider">
                  STEP 03 // TARGET TIMELINE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['ASAP', '2 to 4 weeks', '1 to 2 months', 'Ongoing monthly', 'Flexible'].map(
                    (time) => {
                      const active = selectedTimeline === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => {
                            playClick();
                            setSelectedTimeline(time);
                          }}
                          className={`text-xs p-2.5 rounded-xl border text-center transition-all ${
                            active
                              ? 'bg-[#1F3FFF] border-[#1F3FFF] text-white font-semibold shadow-sm'
                              : 'bg-white border-[#E4E6EB] text-[#5B6275] hover:border-[#1F3FFF]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Step 4: Contact details */}
              <div className="space-y-4 pt-4 border-t border-[#E4E6EB]">
                <div>
                  <label className="block text-xs text-[#0A0F1F] mb-1 font-semibold uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-[#E4E6EB] rounded-xl p-3 text-sm text-[#0A0F1F] focus:outline-none focus:border-[#1F3FFF] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#0A0F1F] mb-1 font-semibold uppercase tracking-wider">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-[#E4E6EB] rounded-xl p-3 text-sm text-[#0A0F1F] focus:outline-none focus:border-[#1F3FFF] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5B6275] mb-1 font-semibold uppercase tracking-wider">
                    Company or Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://company.com"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-[#E4E6EB] rounded-xl p-3 text-sm text-[#0A0F1F] focus:outline-none focus:border-[#1F3FFF] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#0A0F1F] mb-1 font-semibold uppercase tracking-wider">
                    Brief Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you are building and when you want to launch..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-[#E4E6EB] rounded-xl p-3 text-sm text-[#0A0F1F] focus:outline-none focus:border-[#1F3FFF] shadow-sm"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-[#CF2E2E]">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#1F3FFF] text-white hover:bg-[#1632D6] font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-20 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#1F3FFF] text-white flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0A0F1F]">
                Inquiry Received
              </h3>
              <p className="text-sm text-[#5B6275] leading-relaxed max-w-sm mx-auto">
                Thank you, {formData.name}. We have received your brief and will review your project requirements within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-pill btn-pill-dark text-xs py-2 px-6"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-[rgba(18,18,19,0.08)] text-[11px] text-[#6B7280] flex items-center justify-between font-semibold uppercase tracking-wider">
          <span>● SPRINT INTAKE 2026</span>
          <span>REPLY WITHIN 24H</span>
        </div>
      </div>
    </div>
  );
}
