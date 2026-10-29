'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSound } from '../components/SoundManager';
import { useCurrency } from '../components/useCurrency';
import { useReducedMotion } from '@/lib/motion';
import Marquee from '../components/Marquee';
import {
  SERVICES_DATA,
  MONTHLY_RETAINERS,
  GROWTH_PARTNER_BUNDLES,
  STARTUP_LAUNCH_KIT,
  ADD_ONS_DATA,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  formatPrice,
  getTierPrice,
  getAddonPrice,
  getLaunchKitPrice,
  getServiceById,
} from '../../data/pricing';
import {
  Copy,
  Check,
  Calendar,
  Send,
  MessageSquare,
  Clock,
  Phone,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Zap,
  Lock,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const { playClick, playSuccess } = useSound();
  const reducedMotion = useReducedMotion();

  const serviceParam = searchParams.get('service');
  const bundleParam = searchParams.get('bundle');
  const tierParam = searchParams.get('tier');
  const addonParam = searchParams.get('addon');

  // Multi-select for services & add-ons initialized directly from URL parameters
  const [selectedServices, setSelectedServices] = useState(() => {
    if (serviceParam === 'startup-kit' || bundleParam === 'startup-kit' || bundleParam === 'bundle-brand-growth') {
      return ['Brand & Growth Kit'];
    }
    if (serviceParam) {
      const match = getServiceById(serviceParam);
      if (match) return [match.name];
      const retainerMatch = MONTHLY_RETAINERS.find((r) => r.id === serviceParam || r.slug === serviceParam);
      if (retainerMatch) return [retainerMatch.name];
      const bundleMatch = GROWTH_PARTNER_BUNDLES.find((b) => b.id === serviceParam);
      if (bundleMatch) return [bundleMatch.name];
    }
    return [];
  });

  const [selectedTier, setSelectedTier] = useState(() => tierParam || null);

  const [selectedAddons, setSelectedAddons] = useState(() => {
    if (addonParam) {
      const addMatch = ADD_ONS_DATA.find((a) => a.id === addonParam);
      if (addMatch) return [addMatch.name];
    }
    return [];
  });

  const [selectedBudget, setSelectedBudget] = useState(() => {
    if (tierParam) {
      for (const serv of SERVICES_DATA) {
        const t = serv.tiers.find((x) => x.id === tierParam);
        if (t) {
          const p = getTierPrice(t, currency);
          if (currency === 'INR') {
            if (p < 25000) return 'under-25k';
            if (p <= 60000) return '25k-60k';
            if (p <= 150000) return '60k-150k';
            return '150k-plus';
          } else if (currency === 'PK_USD' || currency === 'PKR') {
            if (p < 100000000) return 'under-100m';
            if (p <= 150000000) return '100m-150m';
            if (p <= 250000000) return '150m-250m';
            return '250m-plus';
          } else {
            if (p < 700) return 'under-700';
            if (p <= 1700) return '700-1700';
            if (p <= 4000) return '1700-4000';
            return '4000-plus';
          }
        }
      }
    }
    return '';
  });

  const [selectedTimeline, setSelectedTimeline] = useState(() => {
    if (serviceParam === 'startup-kit') return '2 to 4 weeks';
    return '';
  });

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyUrl: '',
    brief: '',
    website_hp: '', // Honeypot field
  });

  // Validation errors & submission state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedLeadSummary, setSubmittedLeadSummary] = useState(null);

  // Direct contact state
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState('');
  const [dotPos, setDotPos] = useState({ x: '50%', y: '50%' });

  // Refs for focusing errors
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const briefInputRef = useRef(null);

  // Mouse coordinate tracker for patron-puntos illuminated halo
  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    setDotPos({ x, y });
  };

  // Live IST Clock for Delhi Hub
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setIstTime(timeStr);
      } catch {
        setIstTime('10:00:00 AM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Service toggle handler
  const toggleService = (name) => {
    playClick();
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: '' }));
    }
  };

  // Add-on toggle handler
  const toggleAddon = (name) => {
    playClick();
    setSelectedAddons((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@pixelmutiny.com');
    setCopiedEmail(true);
    playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Live Estimate Calculation
  const calculateEstimate = () => {
    if (selectedServices.length === 0 && selectedAddons.length === 0) {
      return null;
    }

    let minTotal = 0;
    let timelines = [];

    // Check if Brand & Growth Kit / Startup Launch Kit selected
    if (selectedServices.includes('Brand & Growth Kit') || selectedServices.includes('Startup Launch Kit')) {
      minTotal += getLaunchKitPrice(currency).price;
      timelines.push('3 to 4 weeks');
    }

    // Check each selected service
    for (const serviceName of selectedServices) {
      if (serviceName === 'Brand & Growth Kit' || serviceName === 'Startup Launch Kit') continue;
      const servObj = SERVICES_DATA.find(
        (s) => s.name === serviceName || s.shortName === serviceName
      );
      if (servObj) {
        const matchedTier = selectedTier
          ? servObj.tiers.find((t) => t.id === selectedTier)
          : null;
        if (matchedTier) {
          minTotal += getTierPrice(matchedTier, currency);
          timelines.push(matchedTier.timeline);
        } else {
          minTotal += getTierPrice(servObj.tiers[0], currency);
          timelines.push(servObj.tiers[0].timeline);
        }
      } else {
        const retObj = MONTHLY_RETAINERS.find((r) => r.name === serviceName);
        if (retObj) {
          minTotal += currency === 'INR' ? retObj.startingPriceINR : retObj.startingPriceUSD;
          timelines.push('Monthly Retainer');
        }
        const bunObj = GROWTH_PARTNER_BUNDLES.find((b) => b.name === serviceName);
        if (bunObj) {
          minTotal += currency === 'INR' ? bunObj.monthlyFeeINR : bunObj.monthlyFeeUSD;
          timelines.push('Monthly Partner');
        }
      }
    }

    // Check add-ons
    for (const addName of selectedAddons) {
      const addObj = ADD_ONS_DATA.find((a) => a.name === addName);
      if (addObj && addObj.id !== 'rush-delivery') {
        minTotal += getAddonPrice(addObj, currency);
      }
    }

    return {
      priceString: `Starting at ${formatPrice(minTotal, currency)}`,
      timeline: timelines.length > 0 ? timelines[0] : '2 to 3 weeks',
    };
  };

  const estimate = calculateEstimate();

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your work email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    setErrors(newErrors);

    if (newErrors.name && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (newErrors.email && emailInputRef.current) {
      emailInputRef.current.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const activeBudgetOption =
        BUDGET_OPTIONS[currency].find((b) => b.value === selectedBudget)?.label ||
        'Not sure yet';
      const activeTimelineOption =
        TIMELINE_OPTIONS.find((t) => t.value === selectedTimeline)?.label || 'Flexible';

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyUrl: formData.companyUrl,
        brief: formData.brief,
        website_hp: formData.website_hp,
        services: [...selectedServices, ...selectedAddons],
        budget: activeBudgetOption,
        timeline: activeTimelineOption,
        currency,
        estimatedTotal: estimate ? estimate.priceString : 'Custom estimate required',
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      playSuccess();
      setSubmitSuccess(true);
      setSubmittedLeadSummary(payload);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(
        err.message || 'There was a problem submitting your brief. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white text-[#0A0F1F] min-h-screen selection:bg-[#1F3FFF] selection:text-white">
      {/* Top Telemetry Line */}
      <div className="w-full px-4 sm:px-8 md:px-12 pt-28 pb-3 border-b border-[#E4E6EB] flex flex-wrap items-center justify-between text-xs text-[#5B6275] bg-[#F5F6F8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
          <span className="text-[#0A0F1F] font-bold uppercase tracking-wider">
            PIXELMUTINY DIRECT INTAKE
          </span>
          <span className="text-[#E4E6EB]">|</span>
          <span className="uppercase tracking-wider">NEW DELHI, INDIA</span>
        </div>
        <div className="text-[#1F3FFF] font-bold flex items-center gap-1.5 uppercase tracking-wider">
          <span>RESPONSE TARGET: WITHIN 24 HOURS</span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)]">
        {/* =========================================================================
            LEFT COLUMN: STICKY AT HEADER OFFSET (64px + 24px = 88px / top-24)
            ========================================================================= */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-5 p-6 sm:p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-[#E4E6EB] bg-white patron-puntos relative lg:sticky lg:top-24 h-fit space-y-8"
          style={{
            '--dot-x': dotPos.x,
            '--dot-y': dotPos.y,
          }}
        >
          {/* Subtle architectural grid */}
          <div className="grilla-celdas opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#12B76A]" />
              <span className="text-xs text-[#1F3FFF] font-bold uppercase tracking-wider">
                01 // INITIATE PROJECT
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F6F8] border border-[#E4E6EB] text-[#0A0F1F] font-semibold">
                Direct Studio Intake
              </span>
            </div>

            <h1
              className="font-display font-bold tracking-tight text-[#0A0F1F] pb-1"
              style={{
                fontSize: 'clamp(32px, 5vw, 60px)',
                lineHeight: 1.12,
              }}
            >
              <span className="dotted-baseline">Let&apos;s build a <span className="brand-highlight">project together.</span></span>
            </h1>

            <p className="text-sm text-[#5B6275] leading-relaxed max-w-md font-normal">
              Whether you need a full brand identity, high-converting landing page, custom website, or Meta performance ads, we reply with a clear scope and transparent pricing within 24 hours.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] text-[#5B6275] block font-bold uppercase tracking-wider">
                DIRECT INTAKE CHANNELS
              </span>

              {/* Email Box with Copy */}
              <div className="p-4 rounded-2xl border border-[#E4E6EB] bg-white flex items-center justify-between gap-4 shadow-sm hover:border-[#1F3FFF] transition-colors">
                <div>
                  <span className="text-[10px] text-[#5B6275] uppercase tracking-wider block font-semibold">DIRECT INBOX</span>
                  <a
                    href="mailto:hello@pixelmutiny.com"
                    className="text-sm sm:text-base font-bold text-[#0A0F1F] hover:text-[#1F3FFF] transition-colors truncate block"
                  >
                    hello@pixelmutiny.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="py-1.5 px-3.5 rounded-full border border-[#E4E6EB] bg-[#F5F6F8] hover:bg-white hover:border-[#1F3FFF] text-xs font-bold text-[#0A0F1F] flex items-center gap-1.5 flex-shrink-0 cursor-pointer transition-all shadow-sm"
                  data-cursor="COPY"
                >
                  {copiedEmail ? (
                    <div className="flex items-center gap-1.5 text-[#1F3FFF] font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <Copy className="w-3.5 h-3.5 text-[#5B6275]" />
                      <span>COPY EMAIL</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Two Small Cards: WhatsApp & LinkedIn / Social */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/919315580036?text=Hi%20Sumit%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20with%20PixelMutiny"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="p-3.5 rounded-2xl border border-[#E4E6EB] bg-white hover:border-[#12B76A] text-xs font-bold text-[#0A0F1F] flex items-center justify-center gap-2 shadow-sm transition-all group"
                  aria-label="Chat with Sumit on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-[#12B76A] group-hover:scale-110 transition-transform" />
                  <span>CHAT ON WHATSAPP</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/gfxsumit/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="p-3.5 rounded-2xl border border-[#E4E6EB] bg-white hover:border-[#1F3FFF] text-xs font-bold text-[#0A0F1F] flex items-center justify-center gap-2 shadow-sm transition-all group"
                  aria-label="Connect with Sumit on LinkedIn"
                >
                  <svg className="w-4 h-4 text-[#1F3FFF] group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34M7.86 18.5V10.13H5.07V18.5h2.79z" />
                  </svg>
                  <span>CONNECT ON LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* NEW DELHI // STUDIO HUB CARD */}
            <div className="p-6 rounded-3xl border border-[#E4E6EB] bg-[#F5F6F8] shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E6EB]">
                <div>
                  <span className="font-display font-extrabold text-sm sm:text-base text-[#0A0F1F] block tracking-tight">
                    NEW DELHI // STUDIO HUB
                  </span>
                  <span className="text-[#5B6275] text-[11px] uppercase tracking-wider">
                    Primary Operations &amp; Design Lab
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#1F3FFF] block">
                    {istTime || '10:00:00 AM'}
                  </span>
                  <span className="text-[10px] text-[#5B6275] uppercase tracking-wider font-semibold">
                    India Standard (IST)
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-[#5B6275]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                  <span>DLF Cyber Hub Design Lab, Phase 2, Gurugram, New Delhi NCR, 122002</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1F3FFF] flex-shrink-0" />
                  <span>Working Hours: Mon – Sat, 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* RESPONSE TIME & GUARANTEE CARD */}
            <div className="p-5 rounded-3xl border border-[#E4E6EB] bg-white shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between font-bold text-[#0A0F1F] uppercase tracking-wider border-b border-[#E4E6EB] pb-2">
                <span className="flex items-center gap-1.5 text-[#1F3FFF]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PIXELMUTINY COMMITMENT</span>
                </span>
                <span className="text-[#12B76A]">GUARANTEED</span>
              </div>
              <div className="space-y-2 text-[#5B6275]">
                <p className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0A0F1F]">Replies within 24 business hours:</strong> Every brief is analyzed directly by a senior craft lead with a transparent quote.
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#0A0F1F]">Direct &amp; Confidential:</strong> 100% private. No spam, no marketing email blasts, no junior account manager runaround.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: NUMBERED FORM STEPS + LIVE ESTIMATE SUMMARY
            ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 bg-[#F5F6F8] flex flex-col justify-between">
          <div>
            {/* Form Top Header */}
            <div className="flex items-center justify-between text-xs pb-6 border-b border-[#E4E6EB]">
              <span className="text-[#0A0F1F] font-bold tracking-wider uppercase">
                PROJECT INTAKE FORM
              </span>
              <span className="text-xs font-mono font-medium text-[#5B6275]">
                Auto-Detected: {currency === 'INR' ? '₹ INR (India)' : '$ USD (International)'}
              </span>
            </div>

            {!submitSuccess ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-10" noValidate>
                {/* Honeypot field for anti-spam (hidden from users) */}
                <input
                  type="text"
                  name="website_hp"
                  value={formData.website_hp}
                  onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                  style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* STEP 01: WHAT DO YOU NEED? */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                    <h2 className="font-bold text-[#0A0F1F] uppercase tracking-wider text-sm">
                      01 What do you need?
                    </h2>
                    <span className="uppercase tracking-wider font-semibold text-[11px]">MULTI-SELECT</span>
                  </div>

                  {/* 4 Core Agency Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {SERVICES_DATA.map((service) => {
                      const isSelected = selectedServices.includes(service.name);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className={`text-xs p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-[#1F3FFF]/10 text-[#0A0F1F] border-2 border-[#1F3FFF] font-bold shadow-sm'
                              : 'border-[#E4E6EB] bg-white text-[#5B6275] hover:border-[#1F3FFF]'
                          }`}
                          data-cursor="SELECT"
                        >
                          <div>
                            <span className="block text-sm font-display font-bold mb-1 text-[#0A0F1F]">
                              {service.name}
                            </span>
                            <span
                              className={`text-[11px] block font-semibold ${
                                isSelected ? 'text-[#1F3FFF]' : 'text-[#5B6275]'
                              }`}
                            >
                              Starting at {formatPrice(getTierPrice(service.tiers[0], currency), currency)}
                            </span>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-[#1F3FFF] border-[#1F3FFF] text-white font-extrabold'
                                : 'border-[#E4E6EB] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Monthly Retainers */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-[#5B6275] uppercase tracking-wider block mb-2">
                      Monthly Retainers &amp; Partnerships:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {MONTHLY_RETAINERS.map((ret) => {
                        const isSelected = selectedServices.includes(ret.name);
                        return (
                          <button
                            key={ret.id}
                            type="button"
                            onClick={() => toggleService(ret.name)}
                            className={`text-xs p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-[#1F3FFF]/10 text-[#0A0F1F] border-2 border-[#1F3FFF] font-bold shadow-sm'
                                : 'border-[#E4E6EB] bg-white text-[#5B6275] hover:border-[#1F3FFF]'
                            }`}
                          >
                            <div>
                              <span className="block text-xs font-display font-bold text-[#0A0F1F] mb-0.5">
                                {ret.shortName}
                              </span>
                              <span className="text-[10px] text-[#1F3FFF] font-semibold block">
                                {currency === 'INR' ? ret.priceRangeINR : ret.priceRangeUSD}
                              </span>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-[#1F3FFF] border-[#1F3FFF] text-white'
                                  : 'border-[#E4E6EB] bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand & Growth Kit / Startup Launchpack Option */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleService('Brand & Growth Kit')}
                      className={`w-full text-xs p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        selectedServices.includes('Brand & Growth Kit') || selectedServices.includes('Startup Launch Kit')
                          ? 'bg-[#1F3FFF]/10 text-[#0A0F1F] border-2 border-[#1F3FFF] font-bold shadow-sm'
                          : 'border-[#E4E6EB] bg-white text-[#5B6275] hover:border-[#1F3FFF]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#1F3FFF]" />
                        <span className="font-display font-bold text-sm text-[#0A0F1F]">
                          Brand &amp; Growth Kit (Brand Identity Pro + Website + CRM Sync)
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#1F3FFF]">
                        {formatPrice(getLaunchKitPrice(currency).price, currency)}
                      </span>
                    </button>
                  </div>
                </div>

                {/* STEP 02: ADD-ONS */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                    <h2 className="font-bold text-[#0A0F1F] uppercase tracking-wider text-sm">
                      02 Add-ons
                    </h2>
                    <span className="uppercase tracking-wider font-semibold text-[11px]">OPTIONAL BOOSTS</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {ADD_ONS_DATA.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.name);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddon(addon.name)}
                          className={`text-xs px-4 py-2.5 rounded-full border transition-all cursor-pointer font-bold ${
                            isSelected
                              ? 'bg-[#1F3FFF] text-white border-[#1F3FFF] shadow-sm'
                              : 'bg-white border-[#E4E6EB] text-[#0A0F1F] hover:border-[#1F3FFF]'
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 flex-shrink-0" />
                            ) : (
                              <span className="text-sm leading-none font-normal">+</span>
                            )}
                            <span>{addon.name}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 03: BUDGET */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                    <h2 className="font-bold text-[#0A0F1F] uppercase tracking-wider text-sm">
                      03 Budget ({currency})
                    </h2>
                    <span className="uppercase tracking-wider font-semibold text-[11px]">ESTIMATED RANGE</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {BUDGET_OPTIONS[currency].map((b) => {
                      const isSelected = selectedBudget === b.value;
                      return (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => {
                            setSelectedBudget(b.value);
                            playClick();
                          }}
                          className={`text-xs p-3.5 rounded-2xl border text-center transition-all cursor-pointer font-bold ${
                            isSelected
                              ? 'bg-[#1F3FFF] text-white border-[#1F3FFF] shadow-md'
                              : 'border-[#E4E6EB] bg-white text-[#0A0F1F] hover:border-[#1F3FFF]'
                          }`}
                        >
                          {b.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* STEP 04: TIMELINE */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-3 text-[#5B6275]">
                    <h2 className="font-bold text-[#0A0F1F] uppercase tracking-wider text-sm">
                      04 Timeline
                    </h2>
                    <span className="uppercase tracking-wider font-semibold text-[11px]">TARGET LAUNCH</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {TIMELINE_OPTIONS.map((t) => {
                      const isSelected = selectedTimeline === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => {
                            setSelectedTimeline(t.value);
                            playClick();
                          }}
                          className={`text-xs p-3.5 rounded-2xl border text-center transition-all cursor-pointer font-bold ${
                            isSelected
                              ? 'bg-[#1F3FFF] text-white border-[#1F3FFF] shadow-md'
                              : 'border-[#E4E6EB] bg-white text-[#0A0F1F] hover:border-[#1F3FFF]'
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* LIVE ESTIMATE SUMMARY CARD */}
                <div className="p-6 rounded-3xl border-2 border-[#1F3FFF] bg-white shadow-lg space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4E6EB]">
                    <span className="font-bold text-[#0A0F1F] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#1F3FFF]" />
                      <span>YOUR LIVE SCOPE ESTIMATE</span>
                    </span>
                    <span className="text-[11px] text-[#5B6275] uppercase tracking-wider font-semibold">Real-time Calculation</span>
                  </div>

                  {estimate ? (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <div>
                          <span className="text-[#5B6275] block text-[11px] uppercase tracking-wider font-semibold">Selected Services:</span>
                          <span className="font-bold text-[#0A0F1F] text-sm">
                            {[...selectedServices, ...selectedAddons].join(' + ')}
                          </span>
                        </div>
                        <div className="sm:text-right">
                          <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F3FFF] block">
                            {estimate.priceString}
                          </span>
                          <span className="text-[11px] text-[#5B6275] font-semibold">
                            Est. Timeline: {estimate.timeline}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#F5F6F8] text-[#5B6275] text-xs flex items-center gap-2 border border-[#E4E6EB]">
                        <span className="text-[#1F3FFF]">●</span>
                        <span>Final quote is locked in writing after brief review. All scopes depend on custom deliverables.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-[#5B6275] text-center font-medium">
                      Select one or more services or add-ons above to see an instant starting price and delivery timeline.
                    </div>
                  )}
                </div>

                {/* STEP 05: YOUR DETAILS */}
                <div className="space-y-4 pt-6 border-t border-[#E4E6EB]">
                  <div className="flex items-center justify-between text-xs text-[#5B6275]">
                    <h2 className="font-bold text-[#0A0F1F] uppercase tracking-wider text-sm">
                      05 Your details
                    </h2>
                    <span className="text-[#EF5533] font-semibold uppercase tracking-wider text-[11px]">* REQUIRED FIELDS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-xs text-[#0A0F1F] mb-1.5 font-bold uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full h-12 bg-white border rounded-2xl px-4 text-sm text-[#0A0F1F] placeholder:text-[#9CA3AF] focus:outline-none shadow-sm ${
                          errors.name
                            ? 'border-[#EF5533] ring-1 ring-[#EF5533]'
                            : 'border-[#E4E6EB] focus:border-[#1F3FFF] focus:ring-2 focus:ring-[#1F3FFF]/20'
                        }`}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-[#EF5533] mt-1" aria-live="polite">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs text-[#0A0F1F] mb-1.5 font-bold uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        ref={emailInputRef}
                        type="email"
                        name="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full h-12 bg-white border rounded-2xl px-4 text-sm text-[#0A0F1F] placeholder:text-[#9CA3AF] focus:outline-none shadow-sm ${
                          errors.email
                            ? 'border-[#EF5533] ring-1 ring-[#EF5533]'
                            : 'border-[#E4E6EB] focus:border-[#1F3FFF] focus:ring-2 focus:ring-[#1F3FFF]/20'
                        }`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-[#EF5533] mt-1" aria-live="polite">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs text-[#5B6275] mb-1.5 font-bold uppercase tracking-wider">
                        Phone or WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-12 bg-white border border-[#E4E6EB] rounded-2xl px-4 text-sm text-[#0A0F1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1F3FFF] focus:ring-2 focus:ring-[#1F3FFF]/20 shadow-sm"
                      />
                    </div>

                    {/* Company URL */}
                    <div>
                      <label className="block text-xs text-[#5B6275] mb-1.5 font-bold uppercase tracking-wider">
                        Company or Website URL (Optional)
                      </label>
                      <input
                        type="url"
                        name="companyUrl"
                        placeholder="https://yourcompany.com"
                        value={formData.companyUrl}
                        onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                        className="w-full h-12 bg-white border border-[#E4E6EB] rounded-2xl px-4 text-sm text-[#0A0F1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1F3FFF] focus:ring-2 focus:ring-[#1F3FFF]/20 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 06: PROJECT NOTES */}
                <div className="space-y-3 pt-6 border-t border-[#E4E6EB]">
                  <div className="flex items-center justify-between text-xs text-[#5B6275]">
                    <h2 className="font-bold text-[#0A0F1F] uppercase tracking-wider text-sm">
                      06 Project notes
                    </h2>
                    <span className="uppercase tracking-wider font-semibold text-[11px]">SCOPE DETAILS</span>
                  </div>

                  <div>
                    <label className="block text-xs text-[#0A0F1F] mb-1.5 font-bold uppercase tracking-wider">
                      Tell us about your project
                    </label>
                    <textarea
                      ref={briefInputRef}
                      name="brief"
                      rows={4}
                      placeholder="Share your goals, current challenges, launch date, or reference links..."
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      className="w-full bg-white border border-[#E4E6EB] rounded-2xl p-4 text-sm text-[#0A0F1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1F3FFF] focus:ring-2 focus:ring-[#1F3FFF]/20 shadow-sm"
                    ></textarea>
                  </div>

                  {/* Submission Error Alert */}
                  {submitError && (
                    <div className="p-4 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] text-xs text-[#EF5533] flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Submission Problem:</p>
                        <p>{submitError}</p>
                        <p className="mt-2 text-[#7F1D1D]">
                          You can also email your brief directly to{' '}
                          <a href="mailto:hello@pixelmutiny.com" className="underline font-bold">
                            hello@pixelmutiny.com
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full btn-onlines-blue text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-4 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer font-bold"
                    data-cursor="TRANSMIT"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Submitting project brief...</span>
                      </>
                    ) : (
                      <>
                        <span>Send project brief</span>
                        <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Reassurance text with lightning icon - no orphan icon! */}
                  <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#5B6275] pt-2 gap-2 font-medium">
                    <span className="flex items-center gap-1.5 text-[#0A0F1F] font-semibold">
                      <Zap className="w-3.5 h-3.5 text-[#1F3FFF]" />
                      <span>We reply within 24 hours. No spam.</span>
                    </span>
                    <span className="uppercase tracking-wider text-[11px] font-bold">100% PRIVATE &amp; CONFIDENTIAL</span>
                  </div>
                </div>
              </form>
            ) : (
              /* SUCCESS STATE */
              <div className="py-16 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#1F3FFF] text-white flex items-center justify-center mx-auto shadow-2xl">
                  <Check className="w-10 h-10" />
                </div>

                <h3
                  className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1F]"
                >
                  Got it. We&apos;ll reply within 24 hours.
                </h3>

                <p className="text-sm text-[#5B6275] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#0A0F1F]">{formData.name}</strong>. Your project brief has been received and routed directly to our lead designer.
                </p>

                {/* Summary Box */}
                {submittedLeadSummary && (
                  <div className="p-6 rounded-3xl border border-[#E4E6EB] bg-white max-w-md mx-auto text-xs space-y-3 text-left shadow-sm">
                    <span className="font-bold text-[#0A0F1F] block pb-2 border-b border-[#E4E6EB] uppercase tracking-wider">
                      BRIEF SUMMARY
                    </span>
                    <div className="space-y-1.5 text-[#5B6275]">
                      <p>
                        <strong className="text-[#0A0F1F]">Services:</strong>{' '}
                        {submittedLeadSummary.services.join(', ') || 'Custom'}
                      </p>
                      <p>
                        <strong className="text-[#0A0F1F]">Estimated Total:</strong>{' '}
                        {submittedLeadSummary.estimatedTotal}
                      </p>
                      <p>
                        <strong className="text-[#0A0F1F]">Target Timeline:</strong>{' '}
                        {submittedLeadSummary.timeline}
                      </p>
                      <p>
                        <strong className="text-[#0A0F1F]">Contact:</strong> {submittedLeadSummary.email}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-onlines-blue text-xs py-3.5 px-6 font-bold"
                  >
                    <span>BOOK A CALL NOW</span>
                    <Calendar className="w-3.5 h-3.5 ml-2" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        companyUrl: '',
                        brief: '',
                        website_hp: '',
                      });
                    }}
                    className="py-3.5 px-6 rounded-full border border-[#0A0F1F] text-[#0A0F1F] bg-white hover:bg-[#0A0F1F] hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>SUBMIT ANOTHER BRIEF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Marquee separator="✦" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-white flex items-center justify-center text-xs text-[#6B7280]">
          Loading contact protocol...
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
