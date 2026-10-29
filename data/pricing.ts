export type Currency = 'INR' | 'USD' | 'PK_USD' | 'PKR';

export interface PriceTier {
  id: string;
  name: string;
  tagline: string;
  priceINR: number;
  priceUSD: number;
  pricePKR?: number;
  period?: string; // e.g. "per month", "one-time"
  timeline: string;
  isPopular?: boolean;
  isHeroOffer?: boolean;
  inheritsText?: string;
  features: string[];
}

export interface ServicePackage {
  id: string;
  slug: string;
  num: string;
  name: string;
  shortName: string;
  headline: string;
  code: string;
  tag: string;
  idealFor: string;
  fromPriceINR: number;
  fromPriceUSD: number;
  image: string;
  alt: string;
  deliverables: string[];
  tiers: PriceTier[];
}

export interface RetainerPlan {
  id: string;
  num: string;
  name: string;
  shortName: string;
  tagline: string;
  idealFor: string;
  priceRangeINR: string;
  priceRangeUSD: string;
  startingPriceINR: number;
  startingPriceUSD: number;
  includes: string[];
  terms: string;
  limits: string[];
}

export interface GrowthBundle {
  id: string;
  name: string;
  tagline: string;
  monthlyFeeINR: number;
  monthlyFeeUSD: number;
  feeDisplayINR: string;
  feeDisplayUSD: string;
  bestFor: string;
  isPopular?: boolean;
  deliverables: string[];
  terms: string;
}

export interface ProjectBundle {
  id: string;
  num: string;
  name: string;
  tagline: string;
  priceINR: number;
  priceUSD: number;
  bestFor: string;
  timeline: string;
  isHeroOffer?: boolean;
  deliverables: string[];
  terms: string;
}

export interface AddOn {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  unit: string;
  category: 'Branding' | 'Website' | 'Video' | 'Automation' | 'General';
  description: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

// =========================================================================
// BRAND METADATA & POSITIONING (PIXELMUTINY DIGIMEDIA PRIVATE LIMITED)
// =========================================================================

export const COMPANY_LEGAL_NAME = 'PixelMutiny DigiMedia Private Limited';
export const COMPANY_BRAND_NAME = 'PixelMutiny DigiMedia';
export const COMPANY_SHORT_NAME = 'PixelMutiny';

export const POSITIONING =
  'Strategy-led digital experiences, branding, creative production and business automation.';

export const TAGLINE_OPTIONS = {
  primary: 'Break the template. Built different.',
  secondary: 'Strategy-led digital experiences & business automation.',
  tertiary: 'Fixed project packages & recurring monthly retainers.',
};

export const ONE_LINER =
  'PixelMutiny DigiMedia Private Limited is a premium digital agency delivering strategy-led digital experiences, branding, creative production, and business automation.';

export const SHORT_BIO =
  'We separate one-time project sprints from predictable recurring retainers. Digital experiences, branding, creative production, and business automation—all under one roof.';

export const WHO_WE_ARE = {
  summary:
    'PixelMutiny DigiMedia Private Limited is a premium digital agency. We combine engineering, brand design, video production, performance media, and business automation so founders never have to juggle fragmented freelancers.',
  ethos:
    'Break the template. Built different. Every pixel has a job, and every dollar of advertising spend must be backed by conversion-engineered creative.',
  location: 'DLF Cyber Hub Design Lab, New Delhi, India',
};

export const ABOUT_NAME_MEANING = {
  pixel: 'Pixel is the smallest unit of digital design.',
  mutiny: 'Mutiny is breaking from the crowd.',
  conclusion:
    'Together: we sweat the small details and refuse to make forgettable work.',
};

export const MISSION =
  'To help ambitious businesses build a stronger digital presence through strategic branding, high-performance websites, compelling creative production and connected lead-management workflows.';

export const VISION =
  'To become the premier design, technology, and growth partner for ambitious tech startups, global creators, and modern consumer brands worldwide.';

export const CORE_VALUES = [
  {
    title: 'Originality first',
    desc: 'No recycled templates or cookie-cutter designs. Everything is bespoke to your business model.',
    icon: 'Sparkles',
  },
  {
    title: 'Clarity over clutter',
    desc: 'Clean aesthetics, unambiguous user flows, and clear pricing with zero hidden fees.',
    icon: 'Layers',
  },
  {
    title: 'Results matter',
    desc: 'Pretty is table stakes. Our work converts traffic, captures qualified leads, and drives revenue.',
    icon: 'Zap',
  },
  {
    title: 'Speed with quality',
    desc: 'Disciplined 2-week execution sprints with definite milestones and zero agency bloat.',
    icon: 'Clock',
  },
  {
    title: 'Honest partnership',
    desc: 'Transparent scopes, defined revision caps, direct founder access, and zero corporate runaround.',
    icon: 'ShieldCheck',
  },
];

export const WHO_WE_WORK_WITH = [
  {
    category: 'Startups & Scaleups',
    tag: 'PROJECTS & RETAINERS',
    audience: 'Funded SaaS, D2C brands, and tech ventures launching new products or overhauling dated systems.',
    desc: 'From initial branding and high-performance Next.js websites to connected CRM automation and Meta Ads acquisition.',
    bullets: ['Funded Tech Startups', 'E-commerce & D2C Brands', 'Real Estate & Healthcare', 'Modern SaaS Products'],
  },
  {
    category: 'Creators & Personal Brands',
    tag: 'CREATIVE SUBSCRIPTION',
    audience: 'Founders, coaches, educators, and creators who need consistent monthly visual content and video.',
    desc: 'Authority-building websites, signature logos, and recurring short-form video editing that converts followers into clients.',
    bullets: ['Executive Coaches & Consultants', 'Content Creators & YouTubers', 'High-Ticket Agencies', 'Specialist Founders'],
  },
];

export const WHY_CHOOSE_US = [
  {
    num: '01',
    title: 'Four Core Pillars, One Partner',
    desc: 'Web experiences, branding, video production, and performance ads work in sync—no misaligned vendors.',
  },
  {
    num: '02',
    title: 'Projects & Subscriptions Separated',
    desc: 'Fixed-scope packages for new builds, and recurring monthly retainers for predictable, compounding growth.',
  },
  {
    num: '03',
    title: 'Defined Deliverables & No Fluff',
    desc: 'Strict deliverable counts, clear revision rounds, and explicit scope boundaries so you always know what you get.',
  },
  {
    num: '04',
    title: '100% Asset & IP Ownership',
    desc: 'All Figma design tokens, vector source files, video edits, and production code belong entirely to you.',
  },
  {
    num: '05',
    title: 'Performance-First Engineering',
    desc: 'Sub-second page speeds, Core Web Vitals 95+, and tracking-verified Meta ad funnels engineered for ROI.',
  },
];

export const HOW_WE_WORK_STAGES = [
  {
    step: '01',
    name: 'Discover',
    tagline: 'Deep Brand & Audience Discovery',
    desc: 'Understand your brand, audience, and market landscape to establish clear project benchmarks and positioning.',
    bullets: ['Brand Discovery Intake', 'Audience & Funnel Analysis', 'Competitor Differentiation', 'Sprint Milestone Scope'],
  },
  {
    step: '02',
    name: 'Plan',
    tagline: 'Scope, Timelines & Architecture',
    desc: 'Define scope, milestone schedule, tech stack, and wireframe architecture so there are zero surprises down the line.',
    bullets: ['Information Architecture', 'User Journey Mapping', 'Sprint Timeline Agreement', 'Transparent Pricing Lock'],
  },
  {
    step: '03',
    name: 'Design',
    tagline: 'High-Impact Concepts & Iteration',
    desc: 'Concepts, interactive Figma prototypes, typography hierarchy, and structured feedback rounds until it is flawless.',
    bullets: ['Bespoke Visual Direction', 'Interactive Prototypes', 'Responsive Layout Polish', 'Consolidated Revision Rounds'],
  },
  {
    step: '04',
    name: 'Build / Produce',
    tagline: 'Engineering, Edits & Ad Setup',
    desc: 'Pixel-perfect development in Next.js, video editing with kinetic typography, or structured Meta ad campaign launch.',
    bullets: ['Clean Production Code', 'Motion & Kinetic Sound Edits', 'Meta Ad Account Setup', 'Tracking & Analytics Setup'],
  },
  {
    step: '05',
    name: 'Launch',
    tagline: 'Testing, QA & Go-Live',
    desc: 'Final delivery, cross-browser and mobile testing, Core Web Vitals audit, domain DNS setup, and successful public go-live.',
    bullets: ['Pre-Launch Heuristic QA', 'Speed & SEO Optimization', 'Domain & Hosting Switch', '100% Asset & Rights Transfer'],
  },
  {
    step: '06',
    name: 'Support',
    tagline: 'Revisions, Updates & Growth',
    desc: 'Post-launch tweaks, campaign optimization, ongoing creative refreshes, and scaling your brand long-term.',
    bullets: ['Post-Launch Hypercare', 'Ad Optimization & ROAS Tuning', 'Ongoing Content Sprints', 'Dedicated Founder Support'],
  },
];

// =========================================================================
// 1. THE FOUR CORE SERVICE PILLARS (FIXED ONE-TIME PROJECT PACKAGES)
// Aligned with the official Services & Pricing Catalogue
// =========================================================================

export const FOUR_PILLARS_SERVICES: ServicePackage[] = [
  {
    id: 'digital-experiences',
    slug: 'digital-experiences',
    num: '01',
    name: 'Website Design & Development',
    shortName: 'Digital Experiences',
    headline: 'Websites · Landing Pages · UI/UX · E-Commerce',
    code: '01 // DIGITAL',
    tag: 'Websites · Landing Pages · UI/UX · E-Commerce',
    idealFor:
      'Startups, SaaS, businesses and e-commerce brands wanting digital products that look premium, work smoothly and turn visitors into customers.',
    fromPriceINR: 24999,
    fromPriceUSD: 300,
    image: '/projects/veyra-legal.png',
    alt: 'PixelMutiny editorial multi-page business website design with case studies and interactive layout',
    deliverables: [
      'Multi-page websites, high-converting landing pages & web apps',
      'Custom UI/UX architecture and responsive design systems in Figma',
      'Mobile, tablet & desktop optimization with sub-second page loads',
      'Self-serve CMS setup for seamless in-house content updates',
      'Technical SEO, Schema markup, contact forms & analytics tracking',
    ],
    tiers: [
      {
        id: 'web-landing-launch',
        name: 'Landing Page Launch',
        tagline: 'Focused page engineered to generate inquiries and capture leads',
        priceINR: 24999,
        priceUSD: 300,
        timeline: '7 to 12 business days',
        features: [
          'One responsive high-converting landing page',
          'Up to six content sections custom-designed in Figma',
          'Custom UI design tailored to your industry positioning',
          'Contact form and direct WhatsApp CTA integration',
          'Mobile, tablet and desktop performance optimization',
          'Basic on-page SEO setup & metadata configuration',
          'Analytics integration (Google Analytics 4 & Meta Pixel)',
          'Two consolidated revision rounds included',
        ],
      },
      {
        id: 'web-business-pro',
        name: 'Business Website Pro',
        tagline: 'Complete, professional web presence for growing brands',
        priceINR: 49999,
        priceUSD: 600,
        timeline: '12 to 20 business days',
        isPopular: true,
        isHeroOffer: true,
        inheritsText: 'Everything in Landing Page Launch, plus:',
        features: [
          'Up to five custom responsive pages (Home, About, Services, Contact + 1)',
          'Custom responsive design & typography system',
          'Contact form and WhatsApp integration',
          'Basic technical and on-page SEO optimization',
          'Analytics and Google Search Console setup',
          'Social media integrations & OG social cards',
          'Basic security and performance configuration',
          'Two revision rounds + website handover and admin training',
        ],
      },
      {
        id: 'web-experience-premium',
        name: 'Digital Experience Premium',
        tagline: 'Differentiated website with editable CMS content and advanced UI',
        priceINR: 89999,
        priceUSD: 1100,
        timeline: '20 to 30 business days',
        inheritsText: 'Everything in Business Website Pro, plus:',
        features: [
          'Up to eight custom pages or bespoke web application UI',
          'Custom UI/UX design and development in Next.js',
          'CMS integration for agreed content types (Blog / Case Studies)',
          'Blog or resource section with filtering architecture',
          'Custom forms, inquiry flows & basic CRM integration',
          'Technical SEO foundations & conversion-event setup',
          'Performance, responsive testing & basic accessibility checks',
          'Three revision rounds + handover documentation & walkthrough',
        ],
      },
      {
        id: 'web-ecommerce-experience',
        name: 'E-commerce Experience',
        tagline: 'Complete store setup, catalog, cart, checkout & payment gateways',
        priceINR: 99999,
        priceUSD: 1200,
        timeline: '25 to 40 business days',
        inheritsText: 'Everything in Premium, plus:',
        features: [
          'Store setup using an agreed platform (Shopify / Next.js Commerce)',
          'Up to 25 initial products uploaded with client-supplied content',
          'Homepage, collections, product and policy pages setup',
          'Cart, checkout & secure payment gateway integration',
          'Shipping configuration using supported integrations',
          'Order notification configuration, admin training & handover',
          'Basic analytics, conversion tracking & e-commerce SEO setup',
          'Two revision rounds included',
        ],
      },
    ],
  },
  {
    id: 'brand-identity',
    slug: 'brand-identity',
    num: '02',
    name: 'Brand Identity & Design',
    shortName: 'Brand & Design',
    headline: 'Logo Design · Brand Systems · Graphics · Print',
    code: '02 // BRAND',
    tag: 'Logo Design · Brand Systems · Graphics · Print',
    idealFor:
      'New businesses, educational institutions, creators, and established brands needing a distinctive, consistent visual identity across digital and physical touchpoints.',
    fromPriceINR: 19999,
    fromPriceUSD: 240,
    image: '/projects/maison-aura.png',
    alt: 'PixelMutiny luxury brand identity design with typography guidelines and vector packaging',
    deliverables: [
      'Primary, secondary, and sub-mark vector logo suite',
      'Curated brand colour palette & typography system',
      'Comprehensive brand guideline book (PDF & Figma)',
      'Branded social media templates (Figma/Canva)',
      'Business cards, letterhead, stationery & vector source files',
    ],
    tiers: [
      {
        id: 'brand-essentials',
        name: 'Brand Essentials',
        tagline: 'For new businesses that need a credible, consistent identity',
        priceINR: 19999,
        priceUSD: 240,
        timeline: '7 to 10 business days',
        features: [
          'Primary logo and two logo variations',
          'Brand colour palette and typography system',
          'Basic brand usage guidelines sheet',
          'Business card design',
          'Social media profile and cover graphics',
          'Five branded social media templates',
          'Final files in PNG, JPG, PDF and vector formats (SVG, AI)',
          'Two revision rounds included',
        ],
      },
      {
        id: 'brand-identity-pro',
        name: 'Brand Identity Pro',
        tagline: 'For growing businesses that need a more distinctive, professional brand',
        priceINR: 39999,
        priceUSD: 480,
        timeline: '10 to 15 business days',
        isPopular: true,
        inheritsText: 'Everything in Brand Essentials, plus:',
        features: [
          'Brand discovery questionnaire and competitor review',
          'Two initial creative directions',
          'Expanded visual identity system',
          'Supporting graphic elements and custom icon style',
          'Letterhead and email signature design',
          'Ten branded social media templates',
          'Brand presentation PDF & basic brand messaging direction',
          'Three revision rounds included',
        ],
      },
      {
        id: 'brand-complete-system',
        name: 'Complete Brand System',
        tagline: 'For established businesses, premium service providers and ambitious startups',
        priceINR: 74999,
        priceUSD: 900,
        timeline: '15 to 25 business days',
        inheritsText: 'Everything in Brand Identity Pro, plus:',
        features: [
          'Brand strategy workshop & audience definition',
          'Competitor and visual-market review',
          'Logo system, extended identity, imagery & graphic language',
          'Comprehensive brand guidelines document',
          'Stationery and essential business collateral',
          'Fifteen branded social templates & master presentation template',
          'Brand messaging framework & launch creative direction',
          'Three revision rounds + 100% IP rights transfer',
        ],
      },
    ],
  },
  {
    id: 'content-production',
    slug: 'content-production',
    num: '03',
    name: 'Content & Creative Production',
    shortName: 'Content Production',
    headline: 'Reels · Video Editing · Motion Graphics · Campaign Creatives',
    code: '03 // CONTENT',
    tag: 'Reels · Video Editing · Motion Graphics · Campaign Creatives',
    idealFor:
      'Creators, personal brands, coaches, and growing businesses needing scroll-stopping visual content for social platforms, ad campaigns, and brand communication.',
    fromPriceINR: 17999,
    fromPriceUSD: 220,
    image: '/projects/krono-pay.png',
    alt: 'PixelMutiny dynamic motion graphics and social video editing creative showcase',
    deliverables: [
      'High-retention short-form video edits (Reels, TikTok, YouTube Shorts)',
      'Dynamic kinetic typography captions, emojis & sound design',
      'Pacing cuts, zoom choreography, and engaging visual hooks',
      'Custom motion graphics, animated lower thirds & transitions',
      'Promotional social media statics, carousels & campaign banners',
    ],
    tiers: [
      {
        id: 'content-starter-batch',
        name: 'Starter Video Batch',
        tagline: 'Monthly batch of 8 short-form video edits with kinetic captions',
        priceINR: 17999,
        priceUSD: 220,
        timeline: '5 to 7 business days',
        features: [
          'Up to 8 short-form video edits (up to 30–60s each)',
          'Dynamic kinetic captions & subtitles',
          'Sound design, sound effects & background audio balancing',
          'Color correction & vertical 9:16 exports for Reels and Shorts',
          'Client supplies raw footage',
          'One consolidated revision round per batch',
        ],
      },
      {
        id: 'content-creator-batch',
        name: 'Creator Batch',
        tagline: 'Monthly batch of 12 standard reel edits with motion graphics',
        priceINR: 35999,
        priceUSD: 440,
        timeline: '10 to 14 business days',
        isPopular: true,
        inheritsText: 'Everything in Starter, plus:',
        features: [
          'Up to 12 dynamic short-form video edits (up to 60s)',
          'Animated hook titles, zooms & visual sound effects',
          'Custom branded lower thirds & emoji animations',
          'Curated B-roll selection & seamless jump-cut pacing',
          'Two revision rounds per video batch included',
          'Fast 48-hour delivery per video batch',
        ],
      },
      {
        id: 'content-studio-plus',
        name: 'Creative Studio Plus',
        tagline: '20 static creatives, 4 carousels, and 8 short-form video edits',
        priceINR: 54999,
        priceUSD: 670,
        timeline: 'Monthly ongoing',
        inheritsText: 'Everything in Creator, plus:',
        features: [
          '20 static creatives + 4 carousels (up to 8 slides each)',
          '8 short-form video edits (up to 45 seconds each)',
          'Monthly content themes & campaign creative direction',
          'Platform-specific design adaptations (IG, LinkedIn, X)',
          'Creative testing recommendations',
          'Two consolidated revision rounds per batch',
          'Monthly review meeting and performance report',
        ],
      },
    ],
  },
  {
    id: 'performance-marketing',
    slug: 'performance-marketing',
    num: '04',
    name: 'Performance Marketing',
    shortName: 'Performance Marketing',
    headline: 'Meta Ads · Google Ads · Lead Gen · Tracking',
    code: '04 // ADS',
    tag: 'Meta Ads · Google Ads · Lead Gen · Tracking',
    idealFor:
      'Real estate, education, fitness, e-commerce, and local businesses wanting structured advertising campaigns focused on measurable leads, conversions, and business growth.',
    fromPriceINR: 14999,
    fromPriceUSD: 180,
    image: '/projects/veloce-ai.png',
    alt: 'PixelMutiny conversion tracking dashboard and Meta Ads campaign performance metrics',
    deliverables: [
      'Meta Ads & Google Ads campaign setup & tracking verification',
      'Target audience research, keyword grouping, and testing roadmap',
      'High-converting static & motion ad creative production',
      'Conversion API (CAPI), Meta Pixel & Google Analytics setup',
      'Weekly optimization, bid adjustments & monthly performance review',
    ],
    tiers: [
      {
        id: 'ads-launch',
        name: 'Ads Launch',
        tagline: 'One advertising platform: Meta or Google with audit & setup',
        priceINR: 14999,
        priceUSD: 180,
        period: 'per month',
        timeline: 'Monthly ongoing',
        features: [
          'One advertising platform: Meta or Google Ads',
          'Campaign and account audit',
          'Campaign setup and configuration',
          'Up to two active campaigns',
          'Basic conversion tracking setup (Pixel / CAPI verification)',
          'Weekly optimisation and bid adjustments',
          'Monthly performance report (Ad spend paid directly by client)',
        ],
      },
      {
        id: 'ads-growth',
        name: 'Performance Growth',
        tagline: 'Up to 4 active campaigns with creative testing and tracking review',
        priceINR: 24999,
        priceUSD: 300,
        period: 'per month',
        timeline: 'Monthly ongoing',
        isPopular: true,
        inheritsText: 'Everything in Ads Launch, plus:',
        features: [
          'One primary advertising platform',
          'Up to four active campaigns',
          'Audience and keyword research as relevant',
          'Campaign structure and testing plan',
          'Up to four ad creative variations per month',
          'Conversion tracking review & lead quality checks',
          'Weekly optimisation + monthly reporting and review call',
        ],
      },
      {
        id: 'ads-partner',
        name: 'Performance Partner',
        tagline: 'Meta Ads + Google Ads, up to 6 campaigns and 8 creatives/mo',
        priceINR: 39999,
        priceUSD: 480,
        period: 'per month',
        timeline: 'Monthly ongoing',
        inheritsText: 'Everything in Performance Growth, plus:',
        features: [
          'Meta Ads and Google Ads management simultaneously',
          'Up to six active campaigns across agreed platforms',
          'Campaign strategy and testing roadmap',
          'Up to eight ad creative variations per month',
          'Landing-page conversion recommendations',
          'Conversion tracking and lead-quality review',
          'Weekly optimisation + monthly strategy and review call',
        ],
      },
    ],
  },
  {
    id: 'crm-automation',
    slug: 'crm-automation',
    num: '05',
    name: 'CRM Implementation & Business Automation',
    shortName: 'CRM & Automation',
    headline: 'Lead Workflows · CRM Setup · WhatsApp · Auto-Followups',
    code: '05 // AUTOMATION',
    tag: 'Lead Workflows · CRM Setup · WhatsApp · Auto-Followups',
    idealFor:
      'Businesses receiving inquiries from multiple channels that need automated lead capture, instant notifications, and organized CRM pipelines.',
    fromPriceINR: 14999,
    fromPriceUSD: 180,
    image: '/projects/krono-pay.png',
    alt: 'PixelMutiny CRM pipeline automation and lead notification workflows',
    deliverables: [
      'Website contact or inquiry form to CRM integration',
      'Meta Lead Ads to CRM instant sync with notifications',
      'Automated email notification workflows & follow-up sequences',
      'Lead status pipeline & assignment rules',
      'Testing, staff training, documentation, and handover',
    ],
    tiers: [
      {
        id: 'automation-starter',
        name: 'Automation Starter',
        tagline: 'For businesses that need a simple, more organized lead workflow',
        priceINR: 14999,
        priceUSD: 180,
        timeline: '5 to 7 business days',
        features: [
          'Website contact or inquiry form integration',
          'Lead capture into one agreed CRM or spreadsheet',
          'Basic lead fields and source tracking',
          'One automated notification workflow (Email / Telegram)',
          'Basic lead status pipeline',
          'Testing and handover + one training session',
          'Two revision rounds included',
        ],
      },
      {
        id: 'automation-lead-pro',
        name: 'Lead Automation Pro',
        tagline: 'For businesses receiving leads from multiple channels',
        priceINR: 34999,
        priceUSD: 425,
        timeline: '10 to 14 business days',
        isPopular: true,
        isHeroOffer: true,
        inheritsText: 'Everything in Starter, plus:',
        features: [
          'CRM pipeline configuration for up to two agreed lead sources',
          'Website form integration + Meta Lead Ads integration',
          'Lead assignment rules and escalation triggers',
          'Up to three workflow automations',
          'Automated email notifications and customer follow-ups',
          'Basic reporting dashboard for lead volume and status',
          'Testing, staff training, documentation, and handover',
        ],
      },
      {
        id: 'automation-business-premium',
        name: 'Business Automation Premium',
        tagline: 'Connected sales and operations workflow with AI assistance',
        priceINR: 69999,
        priceUSD: 850,
        timeline: '15 to 20 business days',
        inheritsText: 'Everything in Lead Automation Pro, plus:',
        features: [
          'CRM configuration and custom fields for up to three data sources',
          'Up to five workflow automations and lead assignment rules',
          'Multi-step email follow-up sequences',
          'Sales pipeline and conversion reporting configuration',
          'Approved AI FAQ or internal-assistance workflow (where suitable)',
          'Integration testing, error handling, and security checks',
          'Full documentation, training, and two revision rounds',
        ],
      },
    ],
  },
];

// Alias SERVICES_DATA to the 4 core pillars for backward compatibility with 4-pillar tests and UI
export const SERVICES_DATA: ServicePackage[] = FOUR_PILLARS_SERVICES.slice(0, 4);

// All 5 services catalogue including CRM & Automation
export const ALL_SERVICES_CATALOGUE: ServicePackage[] = FOUR_PILLARS_SERVICES;

// Helper to look up services by ID or legacy slug
export function getServiceById(id: string): ServicePackage | undefined {
  const match = ALL_SERVICES_CATALOGUE.find((s) => s.id === id || s.slug === id);
  if (match) return match;
  // Fallbacks for legacy queries
  if (['website', 'landing', 'ui-ux', 'dashboard', 'ecommerce'].includes(id)) return FOUR_PILLARS_SERVICES[0];
  if (['graphics', 'brand'].includes(id)) return FOUR_PILLARS_SERVICES[1];
  if (['video'].includes(id)) return FOUR_PILLARS_SERVICES[2];
  if (['meta-ads', 'google-ads'].includes(id)) return FOUR_PILLARS_SERVICES[3];
  if (['automation', 'crm'].includes(id)) return FOUR_PILLARS_SERVICES[4];
  return undefined;
}

// =========================================================================
// 2. THE THREE MONTHLY RETAINER SERVICES (RECURRING SUBSCRIPTIONS)
// Aligned with Section 3, 4, 6 & 7 of the catalogue
// =========================================================================

export const MONTHLY_RETAINERS: RetainerPlan[] = [
  {
    id: 'social-media-retainer',
    num: '01',
    name: 'Social Media Creative Retainer',
    shortName: 'Creative Retainer',
    tagline: 'For brands that need consistent, high-impact visual content',
    idealFor: 'D2C brands, institutions, founders, and businesses requiring regular social presence.',
    priceRangeINR: '₹19,999 – ₹54,999 / month',
    priceRangeUSD: '$240 – $670 / month',
    startingPriceINR: 19999,
    startingPriceUSD: 240,
    includes: [
      '12 to 20 static creatives and multi-slide carousels per month',
      'Monthly content calendar aligned with product launches & campaigns',
      'Caption and CTA suggestions crafted for high engagement',
      'Brand-consistent design system and platform-specific adaptations',
      'One monthly review and performance-informed creative improvements',
    ],
    terms: 'Billed monthly in advance • 3-month recommended initial commitment',
    limits: [
      'Excludes daily community management & comments unless contracted',
      'Client supplies footage, product assets, and approved claims',
      'Two consolidated revision rounds per creative batch',
    ],
  },
  {
    id: 'reels-video-retainer',
    num: '02',
    name: 'Reels & Video Content Retainer',
    shortName: 'Reels Retainer',
    tagline: 'For creators, founders and businesses publishing regularly',
    idealFor: 'Content creators, coaches, personal brands, and businesses producing regular video.',
    priceRangeINR: '₹17,999 – ₹35,999 / month',
    priceRangeUSD: '$220 – $440 / month',
    startingPriceINR: 17999,
    startingPriceUSD: 220,
    includes: [
      '8 to 12 short-form video edits per month (up to 60s each)',
      'Dynamic captions, transitions, pacing cuts, and kinetic sound design',
      'Branded styling, intro hook graphics, and lower thirds',
      'Vertical 9:16 exports optimized for Reels, Shorts, and TikTok',
      'One to two revision rounds per video defined by plan tier',
    ],
    terms: 'Billed monthly in advance • 3-month recommended initial commitment',
    limits: [
      'Client supplies raw video footage & audio assets',
      'On-location filming available starting at ₹14,999 per half-day',
      'Advanced 3D animation quoted separately',
    ],
  },
  {
    id: 'ads-management-retainer',
    num: '03',
    name: 'Performance Marketing Retainer',
    shortName: 'Ads Retainer',
    tagline: 'For businesses that need ongoing paid acquisition and lead generation',
    idealFor: 'Startups, e-commerce, real estate, and local businesses running active acquisition campaigns.',
    priceRangeINR: '₹14,999 – ₹39,999 / month',
    priceRangeUSD: '$180 – $480 / month',
    startingPriceINR: 14999,
    startingPriceUSD: 180,
    includes: [
      'Meta Ads & Google Ads campaign management & weekly optimization',
      'Audience and keyword research with continuous A/B testing',
      'Defined monthly ad creative allowance (4–8 refreshed ad creatives/mo)',
      'Pixel, CAPI, and conversion event tracking verification',
      'Transparent monthly performance report, ROAS audit & strategy call',
    ],
    terms: 'Billed monthly in advance • 3-month recommended initial commitment',
    limits: [
      'Advertising spend paid directly by client to Meta or Google',
      'Covers professional management service, not guaranteed sales/leads',
      'Initial setup fees may apply for accounts needing extensive remediation',
    ],
  },
];

// Additional Retainers for SMM & SEO
export const EXTENDED_RETAINERS = [
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    priceRangeINR: '₹29,999 – ₹69,999 / month',
    priceRangeUSD: '$360 – $850 / month',
    startingPriceINR: 29999,
    startingPriceUSD: 360,
    tiers: [
      { name: 'Social Presence', priceINR: 29999, priceUSD: 360, scope: '1 platform, 12 feed posts, 4 video edits, calendar, business-day monitoring.' },
      { name: 'Social Growth', priceINR: 44999, priceUSD: 550, scope: 'Up to 2 platforms, 16 feed posts, 8 video edits, stories, strategy review.' },
      { name: 'Social Media Partner', priceINR: 69999, priceUSD: 850, scope: 'Up to 3 platforms, 20 feed posts, 12 video edits, full community management.' },
    ],
  },
  {
    id: 'seo-organic-growth',
    name: 'SEO & Organic Growth',
    priceRangeINR: '₹14,999 – ₹49,999 / month',
    priceRangeUSD: '$180 – $600 / month',
    startingPriceINR: 14999,
    startingPriceUSD: 180,
    tiers: [
      { name: 'SEO Foundation', priceINR: 14999, priceUSD: 180, scope: 'Technical audit, keyword research, on-page for 5 pages, monthly report.' },
      { name: 'SEO Growth', priceINR: 29999, priceUSD: 360, scope: 'Up to 10 pages, technical fixes, internal linking, 4 content briefs/month.' },
      { name: 'SEO Authority', priceINR: 49999, priceUSD: 600, scope: 'Up to 15 pages, 4 content deliverables/mo, link-earning roadmap, full reporting.' },
    ],
  },
];

// =========================================================================
// 3. MONTHLY RETAINER PACKAGES (SECTION 10 OF CATALOGUE)
// Bundled recurring partnerships for ongoing growth
// =========================================================================

export const GROWTH_PARTNER_BUNDLES: GrowthBundle[] = [
  {
    id: 'creative-partner',
    name: 'Digital Support',
    tagline: 'Up to 12 static creatives, website updates & monthly reporting',
    monthlyFeeINR: 24999,
    monthlyFeeUSD: 300,
    feeDisplayINR: '₹24,999 / month',
    feeDisplayUSD: '$300 / month',
    bestFor: 'Established businesses wanting ongoing design maintenance and consistent visual content.',
    deliverables: [
      'Up to 12 static social creatives per month',
      'Website content updates up to two hours monthly',
      'Basic technical maintenance and security checks',
      'Monthly performance reporting',
      'One monthly strategy review meeting',
    ],
    terms: 'Billed monthly in advance • 3-month recommended initial commitment',
  },
  {
    id: 'growth-partner',
    name: 'Digital Growth Partner',
    tagline: '16 creatives + 4 video edits + website updates + 1 marketing channel',
    monthlyFeeINR: 44999,
    monthlyFeeUSD: 550,
    feeDisplayINR: '₹44,999 / month',
    feeDisplayUSD: '$550 / month',
    bestFor: 'Growing businesses wanting both continuous content production and active customer acquisition.',
    isPopular: true,
    deliverables: [
      'Up to 16 static social creatives per month',
      'Four short-form video edits per month (up to 30s each)',
      'Website updates up to four hours monthly',
      'One agreed marketing channel for ongoing support',
      'Monthly performance review & basic lead-funnel recommendations',
    ],
    terms: 'Billed monthly in advance • Ad spend paid directly to platform • 3-month commitment',
  },
  {
    id: 'full-service-partner',
    name: 'Digital Experience Partner',
    tagline: '20 creatives + 8 video edits + 6 hrs website updates + CRM monitoring',
    monthlyFeeINR: 74999,
    monthlyFeeUSD: 900,
    feeDisplayINR: '₹74,999 / month',
    feeDisplayUSD: '$900 / month',
    bestFor: 'Scaleups & active brands needing an end-to-end creative, engineering & conversion team.',
    deliverables: [
      'Up to 20 static creatives per month',
      'Eight short-form video edits per month',
      'Website updates up to six hours monthly',
      'CRM and automation monitoring for agreed workflows',
      'Monthly marketing and conversion review',
      'Priority support during agreed business hours',
    ],
    terms: 'Billed monthly in advance • Ad spend paid directly to platform • 3-month commitment',
  },
];

// =========================================================================
// 4. WEBSITE + BRANDING + AUTOMATION BUNDLES (SECTION 9 OF CATALOGUE)
// One-time project packages for full digital transformation
// =========================================================================

export const WEBSITE_BRAND_AUTOMATION_BUNDLES: ProjectBundle[] = [
  {
    id: 'bundle-business-launch',
    num: '01',
    name: 'Business Launch',
    tagline: 'Brand Essentials + 5-page website + WhatsApp integration + 5 creatives',
    priceINR: 59999,
    priceUSD: 725,
    bestFor: 'New service businesses establishing their credible digital presence.',
    timeline: '2 to 3 weeks',
    deliverables: [
      'Brand Essentials (Logo, colour palette & typography)',
      'Business website up to five pages (Next.js responsive)',
      'WhatsApp contact and lead inquiry form integration',
      'Basic on-page SEO and Google Analytics setup',
      'Five branded launch social media creatives',
      'Handover and admin training session',
    ],
    terms: '50% advance, 30% milestone, 20% before final deployment',
  },
  {
    id: 'bundle-brand-growth',
    num: '02',
    name: 'Brand & Growth Kit',
    tagline: 'Brand Identity Pro + 5-page site + 10 creatives + 4 reels + CRM lead capture',
    priceINR: 99999,
    priceUSD: 1200,
    bestFor: 'Businesses ready to improve their brand presentation and inquiry workflow.',
    timeline: '3 to 4 weeks',
    isHeroOffer: true,
    deliverables: [
      'Brand Identity Pro (Discovery, 2 directions, stylebook & stationery)',
      'Business website up to five pages with CMS capabilities',
      'Ten launch social creatives + four short-form video edits',
      'Lead capture form with one basic CRM / email notification workflow',
      'Analytics and conversion-event setup (GA4 & Meta Pixel)',
      'Full launch support and admin handover',
    ],
    terms: '50% advance, 30% design approval, 20% before deployment',
  },
  {
    id: 'bundle-digital-premium',
    num: '03',
    name: 'Digital Business Premium',
    tagline: 'Complete Brand System + 8-page CMS site + multi-channel CRM automation',
    priceINR: 149999,
    priceUSD: 1800,
    bestFor: 'Established businesses wanting a coordinated brand, website and lead-management system.',
    timeline: '4 to 6 weeks',
    deliverables: [
      'Complete Brand System (Workshop, guidelines, stationery & 15 templates)',
      'Website up to eight pages with agreed CMS integration',
      'CRM pipeline configuration for up to three lead sources',
      'Up to three workflow automations with email follow-up sequences',
      'Twelve social creatives + six short-form video edits',
      'Analytics, conversion telemetry & reporting setup',
      'Launch strategy and staff handover training',
    ],
    terms: '50% advance, 30% milestone, 20% before final transfer',
  },
];

// Startup Launch Kit mapped to the Brand & Growth Bundle (Section 9)
export const STARTUP_LAUNCH_KIT = {
  id: 'startup-kit',
  name: 'Brand & Growth Kit',
  subtitle: 'The coordinated digital launchpack: Brand Identity Pro, 5-page custom website, 10 launch creatives, 4 video edits, and CRM lead capture.',
  priceINR: 99999,
  priceUSD: 1200,
  originalINR: 125000,
  originalUSD: 1500,
  savingsINR: 25000,
  savingsUSD: 300,
  timeline: '3 to 4 weeks',
  includes: [
    {
      title: 'Brand Identity Pro',
      desc: 'Discovery, competitor review, 2 directions, expanded visual identity, stylebook & letterhead.',
      valueINR: 39999,
      valueUSD: 480,
    },
    {
      title: 'Business Website Pro',
      desc: 'Up to 5 custom responsive pages, WhatsApp integration, basic SEO, and analytics setup.',
      valueINR: 49999,
      valueUSD: 600,
    },
    {
      title: 'Creative Launchpack & CRM Sync',
      desc: '10 launch creatives, 4 short-form video edits, lead capture form, and 1 automated CRM workflow.',
      valueINR: 35000,
      valueUSD: 420,
    },
  ],
};

// =========================================================================
// 5. RECOMMENDED HERO SALES OFFERS (SECTION 14 OF CATALOGUE)
// "Lead with three offers, not the entire catalogue."
// =========================================================================

export const PRIMARY_HERO_OFFERS = [
  {
    num: '01',
    name: 'Business Website Pro',
    priceINR: 49999,
    priceUSD: 600,
    tagline: 'The primary offer for businesses with weak or outdated websites.',
    badge: 'CORE OFFER #1',
    scope: 'Up to 5 custom responsive pages, custom UI in Figma, WhatsApp & contact forms, basic SEO, analytics, and admin training.',
    timeline: '12 to 20 business days',
    ctaLink: '/contact?service=digital-experiences&tier=web-business-pro',
  },
  {
    num: '02',
    name: 'Brand & Growth Bundle',
    priceINR: 99999,
    priceUSD: 1200,
    tagline: 'The bundled offer for businesses needing both a stronger identity and a website.',
    badge: 'HERO BUNDLE #2',
    isPopular: true,
    scope: 'Brand Identity Pro + 5-page business site + 10 creatives + 4 video edits + CRM lead capture + conversion analytics.',
    timeline: '3 to 4 weeks',
    ctaLink: '/contact?service=startup-kit',
  },
  {
    num: '03',
    name: 'Lead Automation Pro',
    priceINR: 34999,
    priceUSD: 425,
    tagline: 'The upsell for businesses that already receive inquiries but struggle to organize or follow up.',
    badge: 'AUTOMATION OFFER #3',
    scope: 'CRM pipeline configuration, up to 2 lead sources, Meta Lead Ads integration, 3 workflow automations & reporting dashboard.',
    timeline: '10 to 14 business days',
    ctaLink: '/contact?service=crm-automation&tier=automation-lead-pro',
  },
];

// =========================================================================
// 6. COMPREHENSIVE ADD-ONS DATA
// =========================================================================

export const ADD_ONS_DATA: AddOn[] = [
  // Website Add-ons
  {
    id: 'extra-page',
    name: 'Additional Standard Web Page',
    priceINR: 5000,
    priceUSD: 60,
    unit: 'per page',
    category: 'Website',
    description: 'Custom designed and developed responsive page added to any web package.',
  },
  {
    id: 'advanced-landing-page',
    name: 'Advanced Landing Page',
    priceINR: 14999,
    priceUSD: 180,
    unit: 'one-time',
    category: 'Website',
    description: 'Bespoke high-converting landing page with custom micro-animations.',
  },
  {
    id: 'cms-setup',
    name: 'CMS / Blog Setup',
    priceINR: 12999,
    priceUSD: 160,
    unit: 'one-time',
    category: 'Website',
    description: 'Self-serve headless CMS configuration for blog or resource directories.',
  },
  {
    id: 'booking-integration',
    name: 'Booking / Appointment Integration',
    priceINR: 9999,
    priceUSD: 120,
    unit: 'one-time',
    category: 'Website',
    description: 'Calendar scheduling and automatic appointment booking flows.',
  },
  {
    id: 'website-copywriting',
    name: 'Website Copywriting',
    priceINR: 2500,
    priceUSD: 30,
    unit: 'per page',
    category: 'Website',
    description: 'Conversion-engineered copywriting aligned with your brand voice.',
  },
  {
    id: 'website-maintenance',
    name: 'Website Maintenance & Support',
    priceINR: 7999,
    priceUSD: 95,
    unit: 'per month',
    category: 'Website',
    description: 'Routine updates, security checks, and minor content adjustments.',
  },
  // Branding Add-ons
  {
    id: 'extra-logo-concept',
    name: 'Additional Logo Concept',
    priceINR: 5000,
    priceUSD: 60,
    unit: 'per concept',
    category: 'Branding',
    description: 'One additional distinct creative logo direction explored.',
  },
  {
    id: 'company-profile',
    name: 'Company Profile Design',
    priceINR: 14999,
    priceUSD: 180,
    unit: 'one-time',
    category: 'Branding',
    description: 'Professional multi-page company profile brochure in print & digital PDF.',
  },
  {
    id: 'pitch-deck',
    name: 'Pitch Deck Design',
    priceINR: 19999,
    priceUSD: 240,
    unit: 'one-time',
    category: 'Branding',
    description: '10–15 slide bespoke investor-ready pitch presentation in Figma / PDF.',
  },
  {
    id: 'packaging-design',
    name: 'Packaging Design',
    priceINR: 14999,
    priceUSD: 180,
    unit: 'per SKU',
    category: 'Branding',
    description: 'Print-ready structural packaging, label, or box artwork.',
  },
  // Automation Add-ons
  {
    id: 'whatsapp-click-chat',
    name: 'WhatsApp Click-to-Chat Setup',
    priceINR: 3999,
    priceUSD: 50,
    unit: 'one-time',
    category: 'Automation',
    description: 'Direct interactive WhatsApp chat button with pre-filled messaging.',
  },
  {
    id: 'crm-form-integration',
    name: 'Website Form to CRM Sync',
    priceINR: 9999,
    priceUSD: 120,
    unit: 'one-time',
    category: 'Automation',
    description: 'Direct API webhook sync from lead forms into your CRM pipeline.',
  },
  {
    id: 'official-whatsapp-api',
    name: 'Official WhatsApp Business Platform',
    priceINR: 19999,
    priceUSD: 240,
    unit: 'one-time',
    category: 'Automation',
    description: 'Meta Cloud API / Business Platform setup for automated message templates.',
  },
  {
    id: 'ai-faq-assistant',
    name: 'AI FAQ Assistant Workflow',
    priceINR: 24999,
    priceUSD: 300,
    unit: 'one-time',
    category: 'Automation',
    description: 'Custom AI conversational agent trained on your business documentation.',
  },
  {
    id: 'extra-revision',
    name: 'Additional Revision Round',
    priceINR: 3000,
    priceUSD: 40,
    unit: 'per round',
    category: 'General',
    description: 'One additional consolidated feedback and refinement round.',
  },
];

// =========================================================================
// 7. STANDALONE SERVICE PRICE LIST (SECTION 11 OF CATALOGUE)
// =========================================================================

export const STANDALONE_PRICES_TABLE = [
  { service: 'Logo Design', startingPriceINR: '₹7,999', startingPriceUSD: '$95' },
  { service: 'Brand Identity System', startingPriceINR: '₹19,999', startingPriceUSD: '$240' },
  { service: 'Company Profile', startingPriceINR: '₹14,999', startingPriceUSD: '$180' },
  { service: 'Pitch Deck Design', startingPriceINR: '₹19,999', startingPriceUSD: '$240' },
  { service: 'Social Media Static Creative', startingPriceINR: '₹1,499', startingPriceUSD: '$20' },
  { service: 'Carousel Design (up to 5 slides)', startingPriceINR: '₹3,499', startingPriceUSD: '$45' },
  { service: 'YouTube Thumbnail', startingPriceINR: '₹1,999', startingPriceUSD: '$25' },
  { service: 'Short-Form Video Edit', startingPriceINR: '₹2,499', startingPriceUSD: '$30' },
  { service: 'Landing Page Launch', startingPriceINR: '₹24,999', startingPriceUSD: '$300' },
  { service: 'Five-Page Business Website', startingPriceINR: '₹49,999', startingPriceUSD: '$600' },
  { service: 'Premium CMS Website', startingPriceINR: '₹89,999', startingPriceUSD: '$1,100' },
  { service: 'E-Commerce Website', startingPriceINR: '₹99,999', startingPriceUSD: '$1,200' },
  { service: 'Website Maintenance', startingPriceINR: '₹7,999/month', startingPriceUSD: '$95/mo' },
  { service: 'Social Creative Retainer', startingPriceINR: '₹19,999/month', startingPriceUSD: '$240/mo' },
  { service: 'Social Media Management', startingPriceINR: '₹29,999/month', startingPriceUSD: '$360/mo' },
  { service: 'Ads Management', startingPriceINR: '₹14,999/month', startingPriceUSD: '$180/mo' },
  { service: 'SEO Services', startingPriceINR: '₹14,999/month', startingPriceUSD: '$180/mo' },
  { service: 'CRM Implementation', startingPriceINR: '₹14,999', startingPriceUSD: '$180' },
  { service: 'Business Automation Project', startingPriceINR: '₹14,999', startingPriceUSD: '$180' },
  { service: 'Custom CRM Development', startingPriceINR: '₹99,999+', startingPriceUSD: '$1,200+' },
];

// =========================================================================
// 8. COMMERCIAL TERMS & PROFIT PROTECTION (SECTION 12 OF CATALOGUE)
// =========================================================================

export const TERMS_CONDITIONS = [
  'One-Time Projects: 50% advance to reserve project, 30% after design approval/milestone, 20% before final deployment and file handover.',
  'Monthly Retainers: Billed monthly in advance on the 1st of each month with a recommended initial commitment of 3 months.',
  'Revision Policy: Each package includes the stated number of consolidated revision rounds to refine approved directions.',
  'Client Responsibilities: Client supplies business info, brand assets, raw footage, approvals, and legally usable content in a timely manner.',
  'Third-Party Charges: Domains, hosting, CRM subscriptions, ad spend, WhatsApp Platform fees, and paid software are billed separately.',
  '100% Asset & IP Ownership: Final approved deliverables and production code transfer to the client upon receipt of full payment.',
  'Taxes & Legal: Prices exclude applicable GST (18%) and statutory charges unless explicitly stated.',
];

export const FAQ_DATA: FAQItem[] = [
  {
    q: 'How does PixelMutiny’s service structure work?',
    a: 'We organize our agency around core pillars of digital growth: Digital Experiences (websites & e-commerce), Brand Identity & Design, Content & Video Production, Performance Marketing, and CRM Business Automation. You can hire us for a fixed-scope project sprint or on a recurring monthly retainer.',
  },
  {
    q: 'What are the three primary recommended lead offers?',
    a: 'Our three hero offers are: (1) Business Website Pro (₹49,999) for businesses needing a professional 5-page web presence, (2) Brand & Growth Bundle (₹99,999) for companies needing both branding and a website, and (3) Lead Automation Pro (₹34,999) for businesses receiving inquiries that need organized CRM workflows.',
  },
  {
    q: 'What is the payment milestone breakdown for one-time projects?',
    a: 'Standard projects follow a 50/30/20 milestone schedule: 50% advance deposit to reserve the sprint, 30% upon design approval milestone, and 20% prior to final production handover and domain deployment.',
  },
  {
    q: 'Is Meta or Google ad spend included in the management fees?',
    a: 'No. Advertising spend is paid directly by you to Meta or Google via your billing account. Our fee covers campaign architecture, creative production, audience targeting, tracking, weekly optimization, and strategic reporting.',
  },
  {
    q: 'Do you offer unlimited revisions or unlimited designs?',
    a: 'No. To ensure high senior-level craft and timely delivery, we never offer vague "unlimited" claims. Every package clearly specifies the exact number of deliverables, revision rounds, and turnaround timelines.',
  },
  {
    q: 'Who owns the intellectual property and source code?',
    a: 'Upon final invoice settlement, 100% of all custom Figma design tokens, vector source files, video edits, and production source code belong entirely to you with full commercial rights.',
  },
];

export const BUDGET_OPTIONS = {
  INR: [
    { label: 'Under ₹25,000', value: 'under-25k' },
    { label: '₹25,000 to ₹60,000', value: '25k-60k' },
    { label: '₹60,000 to ₹1,50,000', value: '60k-150k' },
    { label: '₹1,50,000+', value: '150k-plus' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],
  USD: [
    { label: 'Under $700', value: 'under-700' },
    { label: '$700 to $1,700', value: '700-1700' },
    { label: '$1,700 to $4,000', value: '1700-4000' },
    { label: '$4,000+', value: '4000-plus' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],
  PK_USD: [
    { label: 'Under $100 Million', value: 'under-100m' },
    { label: '$100M to $150M', value: '100m-150m' },
    { label: '$150M to $250M', value: '150m-250m' },
    { label: '$250 Million+', value: '250m-plus' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],
  PKR: [
    { label: 'Under $100 Million', value: 'under-100m' },
    { label: '$100M to $150M', value: '100m-150m' },
    { label: '$150M to $250M', value: '150m-250m' },
    { label: '$250 Million+', value: '250m-plus' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],
};

export const TIMELINE_OPTIONS = [
  { label: 'ASAP', value: 'asap' },
  { label: '2 to 4 weeks', value: '2-4-weeks' },
  { label: '1 to 2 months', value: '1-2-months' },
  { label: 'Ongoing monthly', value: 'monthly' },
  { label: 'Flexible', value: 'flexible' },
];

export function getTierPrice(tier: PriceTier, currency: Currency): number {
  if (currency === 'PK_USD' || currency === 'PKR') {
    if (typeof tier.pricePKR === 'number') return tier.pricePKR;
    // For Pakistan visitors: strictly in millions of dollars (>= $100M)
    if (tier.priceUSD <= 200) return 105000000;
    if (tier.priceUSD <= 500) return 180000000;
    return 250000000;
  }
  if (currency === 'INR') {
    return tier.priceINR;
  }
  return tier.priceUSD;
}

export function getAddonPrice(addon: AddOn, currency: Currency): number {
  if (currency === 'PK_USD' || currency === 'PKR') {
    return (addon.priceUSD || 100) * 100000;
  }
  if (currency === 'INR') {
    return addon.priceINR;
  }
  return addon.priceUSD;
}

export function getLaunchKitPrice(currency: Currency): { price: number; savings: number } {
  if (currency === 'PK_USD' || currency === 'PKR') {
    return { price: 150000000, savings: 35000000 };
  }
  if (currency === 'INR') {
    return { price: STARTUP_LAUNCH_KIT.priceINR, savings: STARTUP_LAUNCH_KIT.savingsINR };
  }
  return { price: STARTUP_LAUNCH_KIT.priceUSD, savings: STARTUP_LAUNCH_KIT.savingsUSD };
}

export function formatPrice(amount: number, currency: Currency): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
