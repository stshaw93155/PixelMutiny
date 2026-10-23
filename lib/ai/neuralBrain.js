/**
 * Mutiny AI Neural Core — Lightweight Embedded AI Architecture
 * 
 * Model Footprint Target: ~300–400 MB (Qwen2.5-0.5B-Instruct / SmolLM2)
 * Features:
 *  - Persistent Multi-Turn Memory & Profile Entity Extraction
 *  - Full Studio Domain Intelligence (8 Services, INR/USD Pricing, Sprints)
 *  - Pluggable Engine Cascade:
 *     1. Local Ollama (qwen2.5:0.5b at 398 MB with RTX 5060 GPU acceleration)
 *     2. Cloud Fast-Inference API (Groq / OpenAI compatible)
 *     3. In-Process ONNX Micro-Worker (Transformers.js Qwen2.5-0.5B ~350 MB)
 *     4. Autonomous Contextual Domain Brain (Zero-latency fallback)
 */

export const STUDIO_KNOWLEDGE = {
  agency: 'PixelMutiny DigiMedia',
  tagline: 'Break the Template. Built Different.',
  founder: 'Sumit (GFX Sumit)',
  role: 'Founder & Design Director',
  experience: '7+ years crafting high-velocity digital brands, Next.js web applications, and conversion funnels.',
  location: 'DLF Cyber Hub Design Lab, New Delhi, India',
  whatsapp: '+91 9315580036',
  email: 'hello@pixelmutiny.com',
  turnaround: '48-hour initial concept sprints, weekly milestone builds, 2 revision cycles, 100% intellectual property transfer.',
  techStack: 'Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP motion, Lenis smooth scrolling, Spline 3D, Supabase, Node.js.',
  services: [
    {
      name: 'Website Design & Development',
      priceINR: '₹35,000',
      priceUSD: '$950',
      timeline: '2–3 weeks',
      scope: '5 custom responsive pages, custom CMS integration, on-page SEO, speed optimization (98+ Lighthouse).',
    },
    {
      name: 'High-Converting Landing Page',
      priceINR: '₹20,000',
      priceUSD: '$350',
      timeline: '5–7 days',
      scope: 'Single focused product/campaign page engineered for maximum conversion, dynamic visual sections, analytics setup.',
    },
    {
      name: 'UI/UX & Figma Design Systems',
      priceINR: '₹25,000',
      priceUSD: '$450',
      timeline: '1–2 weeks',
      scope: 'Figma interactive prototypes, design tokens, component library, accessibility audits.',
    },
    {
      name: 'Web Apps & Dashboards',
      priceINR: '₹45,000',
      priceUSD: '$800',
      timeline: '3–4 weeks',
      scope: 'Complex SaaS workflows, data-dense analytics dashboards, authentication, responsive layouts.',
    },
    {
      name: 'Brand Identity & Visual System',
      priceINR: '₹12,000',
      priceUSD: '$200',
      timeline: '7–10 days',
      scope: 'Full vector logo suite, typography hierarchy, brand guideline book, social media asset templates.',
    },
    {
      name: 'Kinetic Reels & Short-form Video',
      priceINR: '₹6,000',
      priceUSD: '$100',
      timeline: '48–72 hours',
      scope: 'High-retention kinetic typography, product showcase reels, sound design for Instagram/TikTok/YouTube Shorts.',
    },
    {
      name: 'Meta Ads & Growth Marketing',
      priceINR: '₹15,000/mo',
      priceUSD: '$250/mo',
      timeline: 'Monthly retainer',
      scope: 'High-CTR ad creative production, audience testing matrices, campaign setup, conversion optimization.',
    },
    {
      name: 'Startup Full Launch Kit',
      priceINR: '₹75,000',
      priceUSD: '$1,250',
      timeline: '3 weeks',
      scope: 'Complete brand identity + 5-page custom site + pitch deck design + social launch pack (save >25%).',
    },
  ],
  caseStudies: [
    { name: 'Veloce AI', summary: 'Automation landing platform with interactive 3D particle nodes & 4.2x conversion lift.' },
    { name: 'Veyra Legal', summary: 'Editorial intelligence portal for enterprise international arbitration.' },
    { name: 'Krono Pay', summary: 'Multi-currency cross-border settlement dashboard for modern fintech.' },
    { name: 'Avenor', summary: 'Monolithic architectural portfolio with real-time solar daylight tracking.' },
    { name: 'Maison Aura', summary: 'Parisian luxury perfume house e-commerce experience.' },
  ],
};

/**
 * Extract user profile information from conversational context
 */
export function extractUserProfile(message = '', currentProfile = {}) {
  const updated = { ...currentProfile };
  const text = message.trim();
  const lower = text.toLowerCase();

  // 1. Email Extraction
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !updated.email) {
    updated.email = emailMatch[0];
  }

  // 2. Phone Extraction (Indian 10-digit or international format)
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/);
  if (phoneMatch && !updated.phone && phoneMatch[0].length >= 10) {
    updated.phone = phoneMatch[0];
  }

  // 3. Name Extraction ("My name is ...", "I am ...", "I'm ...", "Call me ...")
  const nameMatch = text.match(/(?:my name is|i am|i'm|this is|call me)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
  if (nameMatch && !updated.name) {
    let rawName = nameMatch[1].trim();
    rawName = rawName.replace(/\s+(?:and|from|at|with|the|who|running|building)$/i, '').trim();
    if (rawName && !/^(?:a|an|the|here|just|now|developer|designer|founder)$/i.test(rawName)) {
      updated.name = rawName;
    }
  }

  // 4. Project Service Intent Extraction
  if (lower.includes('website') || lower.includes('web design') || lower.includes('web dev')) {
    updated.projectType = 'Website Design & Development';
  } else if (lower.includes('landing') || lower.includes('one page') || lower.includes('one-page')) {
    updated.projectType = 'Landing Page';
  } else if (lower.includes('ui/ux') || lower.includes('ui ux') || lower.includes('figma')) {
    updated.projectType = 'UI/UX & Design System';
  } else if (lower.includes('dashboard') || lower.includes('saas') || lower.includes('web app')) {
    updated.projectType = 'Web Apps & Dashboards';
  } else if (lower.includes('brand') || lower.includes('logo') || lower.includes('identity')) {
    updated.projectType = 'Brand Identity';
  } else if (lower.includes('reel') || lower.includes('video') || lower.includes('tiktok') || lower.includes('youtube')) {
    updated.projectType = 'Reels & Short-form Video';
  } else if (lower.includes('ad') || lower.includes('meta') || lower.includes('marketing') || lower.includes('facebook')) {
    updated.projectType = 'Meta Ads & Growth';
  } else if (lower.includes('kit') || lower.includes('startup') || lower.includes('launch')) {
    updated.projectType = 'Startup Full Launch Kit';
  }

  // 5. Budget Extraction
  const budgetMatch = text.match(/(?:budget|spend|cost)\s*(?:is|around|about|of)?\s*([₹$€£]?\s*[\d,]+(?:\s*(?:k|lakh|lac|thousand|usd|inr))?)/i);
  if (budgetMatch && !updated.budget) {
    updated.budget = budgetMatch[1].trim();
  }

  // 6. Timeline Extraction
  const timelineMatch = text.match(/(?:need it in|timeline|turnaround|deadline|within)\s*([0-9]+\s*(?:days|weeks|months|hours)|asap|urgently)/i);
  if (timelineMatch && !updated.timeline) {
    updated.timeline = timelineMatch[1].trim();
  }

  return updated;
}

/**
 * Build System Instructions including the live user memory card
 */
export function buildSystemPrompt(userProfile = {}, currency = 'INR') {
  const isUSD = currency === 'USD';
  const memoryItems = [];
  if (userProfile.name) memoryItems.push(`Client Name: ${userProfile.name}`);
  if (userProfile.email) memoryItems.push(`Client Email: ${userProfile.email}`);
  if (userProfile.phone) memoryItems.push(`Client Phone/WhatsApp: ${userProfile.phone}`);
  if (userProfile.projectType) memoryItems.push(`Project Type Interest: ${userProfile.projectType}`);
  if (userProfile.budget) memoryItems.push(`Client Budget: ${userProfile.budget}`);
  if (userProfile.timeline) memoryItems.push(`Target Timeline: ${userProfile.timeline}`);

  const servicesList = STUDIO_KNOWLEDGE.services
    .map(
      (s) =>
        `- ${s.name}: ${isUSD ? s.priceUSD : s.priceINR} (${isUSD ? s.priceINR : s.priceUSD}) | Turnaround: ${s.timeline}`
    )
    .join('\n');

  return `You are Mutiny AI, the autonomous creative studio copilot for PixelMutiny DigiMedia.
You converse like a sharp, modern AI assistant (like ChatGPT/Linear) with full memory of the visitor's background.

CORE STUDIO IDENTITY:
- Founder & Director: ${STUDIO_KNOWLEDGE.founder} (${STUDIO_KNOWLEDGE.role})
- Ethos: "${STUDIO_KNOWLEDGE.tagline}" Every pixel has a job. We break cookie-cutter templates to build high-converting digital products.
- Location: ${STUDIO_KNOWLEDGE.location}
- Direct WhatsApp: ${STUDIO_KNOWLEDGE.whatsapp}
- Turnaround: ${STUDIO_KNOWLEDGE.turnaround}
- Active Currency: ${currency}

FIXED PRICING MATRIX:
${servicesList}

CONVERSATION RULES:
1. Speak naturally, confidently, and concisely. Use rich markdown formatting (bolding, clean lists).
2. Remember everything the user has shared. Refer to the user by name if known.
3. If they ask about pricing, quotes, or services, share exact figures transparently.
4. If they want to book a call, mention Sumit's 20-min rapid discovery session and direct them to choose a date or connect on WhatsApp.
5. Never break character. Never invent services PixelMutiny doesn't offer.

[ACTIVE VISITOR MEMORY CARD]
${memoryItems.length > 0 ? memoryItems.join('\n') : 'No client details stored yet.'}`;
}

/**
 * Concise System Prompt optimized for fast local CPU micro-model inference
 */
export function buildConciseMicroPrompt(userProfile = {}, currency = 'INR') {
  const isUSD = currency === 'USD';
  const nameStr = userProfile.name ? ` Client: ${userProfile.name}.` : '';
  const projStr = userProfile.projectType ? ` Project: ${userProfile.projectType}.` : '';
  return `You are Mutiny AI, autonomous studio copilot for PixelMutiny DigiMedia. Founder: Sumit (direct WhatsApp: +91 9315580036). We build high-converting Next.js websites, UI/UX systems, and SaaS dashboards with 48h turnaround sprints.${nameStr}${projStr} Standard prices: Website Design (${isUSD ? '$950' : '₹35,000'}), Landing Pages (${isUSD ? '$350' : '₹20,000'}), SaaS Dashboards (${isUSD ? '$800' : '₹45,000'}), Brand Identity (${isUSD ? '$200' : '₹12,000'}). Respond in 2-3 sharp, helpful sentences.`;
}

/**
 * Generate intelligent context-aware action chips
 */
export function generateActionChips(userMessage = '', botReply = '', userProfile = {}, currency = 'INR') {
  const text = (userMessage + ' ' + botReply).toLowerCase();
  const chips = [];

  // 1. Booking & scheduling intent
  if (text.includes('book') || text.includes('call') || text.includes('meet') || text.includes('schedule') || text.includes('discovery')) {
    chips.push({ label: '📅 Choose Date & Time', action: 'open_booking_tab' });
    chips.push({ label: '💬 WhatsApp Sumit Directly', action: 'whatsapp' });
    chips.push({ label: '⚡ Estimate Project Scope', action: 'open_scope_tab' });
    return chips;
  }

  // 2. Pricing & cost intent
  if (text.includes('cost') || text.includes('price') || text.includes('pricing') || text.includes('quote') || text.includes('budget') || text.includes('₹') || text.includes('$')) {
    chips.push({ label: '⚡ Interactive Scope Calculator', action: 'open_scope_tab' });
    chips.push({ label: '📅 Book 20-min Sprint Call', action: 'open_booking_tab' });
    chips.push({ label: '📩 Mail My Project Brief', action: 'open_mail_tab' });
    chips.push({ label: '💬 Chat on WhatsApp', action: 'whatsapp' });
    return chips;
  }

  // 3. Portfolio & case study intent
  if (text.includes('work') || text.includes('portfolio') || text.includes('case study') || text.includes('projects') || text.includes('veloce') || text.includes('avenor')) {
    chips.push({ label: '💼 Browse All Projects (/works)', action: 'navigate_works' });
    chips.push({ label: '⚡ Calculate Project Scope', action: 'open_scope_tab' });
    chips.push({ label: '📅 Book Discovery Call', action: 'open_booking_tab' });
    return chips;
  }

  // 4. Tech stack & process intent
  if (text.includes('stack') || text.includes('tech') || text.includes('next.js') || text.includes('process') || text.includes('sprint')) {
    chips.push({ label: '⚡ Estimate My Tech Stack', action: 'open_scope_tab' });
    chips.push({ label: '📅 Schedule Tech Discovery Call', action: 'open_booking_tab' });
    chips.push({ label: '💬 Talk to Sumit on WhatsApp', action: 'whatsapp' });
    return chips;
  }

  // 5. Default high-utility chips
  chips.push({ label: '📅 Book a Discovery Call', action: 'open_booking_tab' });
  chips.push({ label: '⚡ Instant Price Estimate', action: 'open_scope_tab' });
  chips.push({ label: '📩 Mail Project Brief', action: 'open_mail_tab' });
  chips.push({ label: '💬 WhatsApp Sumit (+91 9315580036)', action: 'whatsapp' });

  return chips;
}

/**
 * Fast Local Ollama Engine Connector
 * Model: qwen2.5:0.5b (Footprint: 398 MB)
 */
async function queryOllama({ messages, model = 'qwen2.5:0.5b', timeoutMs = 4000 }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch('http://127.0.0.1:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 220,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.message?.content?.trim() || null;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/**
 * Local Micro-Worker Connector (Qwen2.5-0.5B ONNX ~350 MB on port 11435)
 */
async function queryLocalWorker({ messages, timeoutMs = 15000 }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch('http://127.0.0.1:11435/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        max_new_tokens: 100,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.reply?.trim() || null;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/**
 * Optional Cloud Inference Engine (Groq / OpenAI compatible)
 */
async function queryCloudAi({ messages, timeoutMs = 5000 }) {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const isGroq = Boolean(process.env.GROQ_API_KEY);
  const endpoint = isGroq
    ? 'https://api.groq.com/openai/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';
  const model = isGroq ? 'llama-3.1-8b-instant' : 'gpt-4o-mini';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });

    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/**
 * Autonomous Domain Brain (Zero-Latency Fallback)
 * Provides comprehensive, instant responses with 100% reliability
 */
function queryDomainBrain({ message = '', userProfile = {}, currency = 'INR' }) {
  const text = message.toLowerCase().trim();
  const isUSD = currency === 'USD';
  const nameGreeting = userProfile.name ? ` ${userProfile.name}` : '';

  // 1. Booking intent
  if (
    text.includes('book') ||
    text.includes('meeting') ||
    text.includes('call') ||
    text.includes('schedule') ||
    text.includes('calendar') ||
    text.includes('discovery') ||
    text.includes('zoom') ||
    text.includes('google meet')
  ) {
    return (
      `I'd love to lock in a sprint call with you${nameGreeting}! Sumit (our founder & design director) hosts 20-minute rapid discovery sessions to evaluate your scope, show relevant case studies, and lock in milestone delivery dates.\n\n` +
      `You can pick your preferred date and time slot right below, or jump directly onto WhatsApp:`
    );
  }

  // 2. Pricing & Cost intent
  if (
    text.includes('cost') ||
    text.includes('price') ||
    text.includes('pricing') ||
    text.includes('how much') ||
    text.includes('rate') ||
    text.includes('quote') ||
    text.includes('budget') ||
    text.includes('estimate')
  ) {
    const webPrice = isUSD ? '$950 (₹35,000)' : '₹35,000 ($950)';
    const landingPrice = isUSD ? '$350 (₹20,000)' : '₹20,000 ($350)';
    const uiPrice = isUSD ? '$450 (₹25,000)' : '₹25,000 ($450)';
    const dashPrice = isUSD ? '$800 (₹45,000)' : '₹45,000 ($800)';
    const brandPrice = isUSD ? '$200 (₹12,000)' : '₹12,000 ($200)';
    const reelPrice = isUSD ? '$100 (₹6,000)' : '₹6,000 ($100)';
    const metaPrice = isUSD ? '$250/mo (₹15,000/mo)' : '₹15,000/mo ($250/mo)';
    const launchPrice = isUSD ? '$1,250 (₹75,000)' : '₹75,000 ($1,250)';

    return (
      `Here is our transparent, fixed-scope pricing structure (no hidden agency surprises):\n\n` +
      `• **Website Design & Dev**: Starting at ${webPrice} (5 pages, CMS, SEO, 2–3 weeks)\n` +
      `• **High-Converting Landing Page**: Starting at ${landingPrice} (5–7 day turnaround)\n` +
      `• **UI/UX & Figma Systems**: Starting at ${uiPrice} (Interactive prototype & components)\n` +
      `• **Web Apps & Dashboards**: Starting at ${dashPrice} (Data-dense SaaS interfaces)\n` +
      `• **Brand Identity & Logo**: Starting at ${brandPrice} (Vector logos & complete brand book)\n` +
      `• **Kinetic Reels & Video**: Starting at ${reelPrice} per reel pack\n` +
      `• **Meta Ads & Performance**: Starting at ${metaPrice}\n` +
      `• **Startup Launch Kit**: ${launchPrice} (Full brand + 5-page site + pitch deck + social assets, save over 25%)\n\n` +
      `Would you like me to calculate a custom scope estimate, mail your brief, or schedule a sprint call?`
    );
  }

  // 3. Mail / Brief dispatch
  if (
    text.includes('mail') ||
    text.includes('email') ||
    text.includes('send brief') ||
    text.includes('submit') ||
    text.includes('inquiry') ||
    text.includes('contact form')
  ) {
    return (
      `I can package your requirements and dispatch your project brief directly to Sumit and the engineering team! We guarantee a detailed reply and sprint roadmap within 24 business hours.\n\n` +
      (userProfile.name || userProfile.email
        ? `I currently have your details saved in memory (${[userProfile.name, userProfile.email].filter(Boolean).join(' • ')}). Click below to dispatch or edit:`
        : `Click below to confirm your contact details and project goals:`)
    );
  }

  // 4. Founder / Team / Location
  if (
    text.includes('sumit') ||
    text.includes('founder') ||
    text.includes('who are you') ||
    text.includes('team') ||
    text.includes('location') ||
    text.includes('delhi') ||
    text.includes('linkedin') ||
    text.includes('whatsapp')
  ) {
    return (
      `PixelMutiny DigiMedia was founded by **Sumit (GFX Sumit)**, a digital director and product designer with over 7 years of experience building standout digital brands, Next.js web applications, and high-converting marketing campaigns.\n\n` +
      `• **Location**: New Delhi, India (DLF Cyber Hub Design Lab)\n` +
      `• **Direct WhatsApp**: +91 9315580036\n` +
      `• **LinkedIn**: linkedin.com/in/gfxsumit\n` +
      `• **Agency Ethos**: Every pixel has a job. We break from cookie-cutter templates to build work that is sharp, original, and made to convert.\n\n` +
      `Would you like to connect directly with Sumit on WhatsApp or schedule a discovery call?`
    );
  }

  // 5. Work / Portfolio
  if (
    text.includes('work') ||
    text.includes('portfolio') ||
    text.includes('case study') ||
    text.includes('project') ||
    text.includes('examples') ||
    text.includes('client')
  ) {
    return (
      `We've crafted high-performance digital products across finance, SaaS, luxury, AI, and robotics. Highlights include:\n\n` +
      `• **Veloce AI**: High-velocity automation landing platform with interactive 3D particle nodes & 4.2x conversion lift.\n` +
      `• **Veyra Legal**: Editorial intelligence portal for enterprise arbitration.\n` +
      `• **Krono Pay**: Multi-currency cross-border settlement dashboard.\n` +
      `• **Avenor**: Monolithic brutalist architectural portfolio with real-time solar tracking.\n` +
      `• **Maison Aura**: Parisian luxury perfume house e-commerce.\n\n` +
      `You can explore the full archive on our Work page or let me calculate an estimate for a similar build:`
    );
  }

  // 6. Technology stack
  if (
    text.includes('stack') ||
    text.includes('tech') ||
    text.includes('code') ||
    text.includes('next.js') ||
    text.includes('react') ||
    text.includes('tailwind') ||
    text.includes('process') ||
    text.includes('sprint') ||
    text.includes('turnaround')
  ) {
    return (
      `We build with modern, high-performance web standards:\n\n` +
      `• **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4\n` +
      `• **Motion & Interaction**: GSAP, Framer Motion, Lenis Smooth Scroll, Spline 3D\n` +
      `• **Backend & CMS**: Node.js, Supabase, PostgreSQL, Sanity / Strapi, Resend\n` +
      `• **Performance**: 98+ Google Lighthouse scores, zero-bloat vanilla CSS architecture, semantic SEO\n` +
      `• **Sprint Process**: Initial concepts in **48 hours**, weekly milestone builds, 2 revision rounds, 100% intellectual property transfer.\n\n` +
      `Have a specific tech requirement for your project?`
    );
  }

  // 7. Currency switch
  if (text.includes('currency') || text.includes('dollar') || text.includes('rupee') || text.includes('usd') || text.includes('inr')) {
    return `Our site and scope estimator natively support both **INR (₹)** and **USD ($)**. You can toggle your active currency at any time using the HUD currency switch at the top, or click below:`;
  }

  // 8. General conversational response
  return (
    `Hello${nameGreeting}! I am Mutiny AI, PixelMutiny's autonomous studio copilot.\n\n` +
    `I have persistent memory across your session. I can help you:\n` +
    `1. **Book a 20-min Discovery Call** with Sumit (with instant Google Calendar & .ics sync)\n` +
    `2. **Mail a Project Brief** directly to our engineering desk\n` +
    `3. **Calculate an Instant Scope Estimate** for websites, apps, brand identities, or Meta Ads\n` +
    `4. **Answer questions** about our 48-hour sprint process, past case studies, and tech stack\n\n` +
    `What would you like to explore first?`
  );
}

/**
 * Main Orchestrator: Dispatches across AI Tiers with graceful fallback
 */
export async function executeAiConversation({
  message = '',
  userProfile = {},
  history = [],
  currency = 'INR',
}) {
  // 1. Incrementally update memory with any extracted entities
  const updatedProfile = extractUserProfile(message, userProfile);

  // 2. Prepare multi-turn messages array
  const systemPrompt = buildSystemPrompt(updatedProfile, currency);
  const formattedMessages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-8).map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content || '',
    })),
    { role: 'user', content: message },
  ];

  let reply = null;
  let engine = 'domain_brain';

  // 3. Attempt Tier 1: Local Ollama (qwen2.5:0.5b - 398 MB on RTX 5060)
  try {
    const ollamaResponse = await queryOllama({ messages: formattedMessages });
    if (ollamaResponse && ollamaResponse.length > 20) {
      reply = ollamaResponse;
      engine = 'ollama_qwen_0.5b';
    }
  } catch {
    // Ollama not currently active
  }

  // 4. Attempt Tier 2: Local Qwen2.5 Micro-Worker (~350 MB on port 11435)
  if (!reply) {
    try {
      const concisePrompt = buildConciseMicroPrompt(updatedProfile, currency);
      const microMessages = [
        { role: 'system', content: concisePrompt },
        ...history.slice(-4).map((m) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content || '',
        })),
        { role: 'user', content: message },
      ];
      const workerResponse = await queryLocalWorker({ messages: microMessages, timeoutMs: 12000 });
      if (workerResponse && workerResponse.length > 20) {
        reply = workerResponse;
        engine = 'local_qwen_onnx_350mb';
      }
    } catch {
      // Worker not currently running
    }
  }

  // 5. Attempt Tier 3: Cloud Fast API (Groq / OpenAI) if configured
  if (!reply) {
    try {
      const cloudResponse = await queryCloudAi({ messages: formattedMessages });
      if (cloudResponse && cloudResponse.length > 20) {
        reply = cloudResponse;
        engine = 'cloud_ai';
      }
    } catch {
      // Cloud API not configured or failed
    }
  }

  // 5. Tier 3 & Fallback: Autonomous Contextual Domain Brain
  if (!reply) {
    reply = queryDomainBrain({
      message,
      userProfile: updatedProfile,
      currency,
    });
    engine = 'domain_brain';
  }

  // 6. Generate Contextual Action Chips
  const chips = generateActionChips(message, reply, updatedProfile, currency);

  return {
    reply,
    chips,
    updatedProfile,
    engine,
  };
}
