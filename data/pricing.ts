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

export interface AddOn {
  id: string;
  name: string;
  priceINR: number;
  priceUSD: number;
  unit: string;
  description: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

// =========================================================================
// BRAND METADATA & NARRATIVE (PIXELMUTINY DIGIMEDIA LLP)
// =========================================================================

export const COMPANY_LEGAL_NAME = 'PixelMutiny DigiMedia LLP';
export const COMPANY_BRAND_NAME = 'PixelMutiny DigiMedia';
export const COMPANY_SHORT_NAME = 'PixelMutiny';

export const TAGLINE_OPTIONS = {
  primary: 'Break the template. Built different.',
  secondary: 'One studio. Four ways to grow.',
  tertiary: 'Fixed project packages & recurring monthly retainers.',
};

export const ONE_LINER =
  'PixelMutiny is a digital growth agency building high-performance websites, distinctive brand identities, content production, and Meta Ads for brands that refuse to blend in.';

export const SHORT_BIO =
  'We separate one-time project sprints from predictable recurring retainers. Digital experiences, branding, video editing, and performance marketing—all under one roof.';

export const WHO_WE_ARE = {
  summary:
    'PixelMutiny DigiMedia is a four-pillar digital growth agency based in India. We combine engineering, brand design, video production, and performance media so founders never have to juggle fragmented freelancers.',
  ethos:
    'Break the template. Built different. Every pixel has a job, and every dollar of advertising spend must be backed by conversion-engineered creative.',
  location: 'New Delhi, India (DLF Cyber Hub Design Lab)',
};

export const ABOUT_NAME_MEANING = {
  pixel: 'Pixel is the smallest unit of digital design.',
  mutiny: 'Mutiny is breaking from the crowd.',
  conclusion:
    'Together: we sweat the small details and refuse to make forgettable work.',
};

export const MISSION =
  'To help brands and creators build high-conversion digital experiences, memorable visual identities, and scalable paid acquisition funnels.';

export const VISION =
  'To become the premier design and growth partner for ambitious tech startups, global creators, and modern consumer brands worldwide.';

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
    desc: 'From initial branding and high-performance Next.js websites to ongoing Meta Ads acquisition retainers.',
    bullets: ['Funded Tech Startups', 'E-commerce & D2C Brands', 'Real Estate & Hospitality', 'Modern SaaS Products'],
  },
  {
    category: 'Creators & Personal Brands',
    tag: 'CREATIVE SUBSCRIPTION',
    audience: 'Founders, coaches, educators, and creators who need consistent monthly visual content and reels.',
    desc: 'Authority-building websites, signature logos, and recurring short-form video editing that converts followers into clients.',
    bullets: ['Executive Coaches & Consultants', 'Content Creators & YouTubers', 'High-Ticket Freelancers', 'Specialist Founders'],
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
    bullets: ['Bespoke Visual Direction', 'Interactive Prototypes', 'Responsive Layout Polish', '2 Feedback & Revision Rounds'],
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
// =========================================================================

export const FOUR_PILLARS_SERVICES: ServicePackage[] = [
  {
    id: 'digital-experiences',
    slug: 'digital-experiences',
    num: '01',
    name: 'Digital Experiences',
    shortName: 'Digital Experiences',
    headline: 'Websites · Landing Pages · UI/UX · Dashboards',
    code: '01 // DIGITAL',
    tag: 'Websites · Landing Pages · UI/UX · Dashboards',
    idealFor: 'Startups, SaaS, businesses, and e-commerce brands wanting digital products that look premium, work smoothly, and turn visitors into customers.',
    fromPriceINR: 35000,
    fromPriceUSD: 425,
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
        id: 'digital-launch',
        name: 'Launch',
        tagline: 'Up to 5 pages, responsive design, basic SEO and lead forms',
        priceINR: 35000,
        priceUSD: 425,
        timeline: '2 to 3 weeks',
        features: [
          'Up to 5 custom responsive pages',
          'Clean, modern layout across mobile, tablet & desktop',
          'Basic technical SEO, metadata & sitemap setup',
          'Lead capture & contact form integration',
          'Fast Next.js build with Core Web Vitals optimization',
          '2 structured revision rounds included',
        ],
      },
      {
        id: 'digital-growth',
        name: 'Growth',
        tagline: 'Up to 10 pages, custom UI, CMS, blog and analytics setup',
        priceINR: 75000,
        priceUSD: 900,
        timeline: '3 to 4 weeks',
        isPopular: true,
        inheritsText: 'Everything in Launch, plus:',
        features: [
          'Up to 10 custom pages or bespoke web app UI dashboard',
          'Custom modular UI kit & interactive Figma prototype',
          'Self-serve CMS integration for dynamic blog & case studies',
          'Google Analytics 4 & conversion event tracking',
          'Fluid micro-animations & responsive scroll interactions',
          'Full source code handover & CMS walkthrough video',
        ],
      },
      {
        id: 'digital-scale',
        name: 'Scale',
        tagline: 'E-commerce or complex websites, advanced integrations and custom functionality',
        priceINR: 140000,
        priceUSD: 1700,
        timeline: '4 to 6 weeks',
        inheritsText: 'Everything in Growth, plus:',
        features: [
          'E-commerce store or complex web app interface',
          'Payment gateway (Razorpay / Stripe) & third-party API sync',
          'Interactive component states (calculators, demos, filter hubs)',
          'Advanced programmatic SEO architecture',
          '3 structured feedback rounds included',
          '30-day post-launch hypercare & priority SLA support',
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
    idealFor: 'New businesses, educational institutions, creators, and established brands needing a distinctive, memorable visual presence.',
    fromPriceINR: 8000,
    fromPriceUSD: 100,
    image: '/projects/maison-aura.png',
    alt: 'PixelMutiny luxury brand identity design with typography guidelines and vector packaging',
    deliverables: [
      'Primary, secondary, and sub-mark vector logo suite',
      'Curated brand color palette (HEX, RGB, CMYK) & typography rules',
      'Comprehensive brand guideline book (digital PDF & Figma)',
      'Editable social media post & carousel templates',
      'Corporate stationery, pitch deck styling & print-ready assets',
    ],
    tiers: [
      {
        id: 'brand-essential',
        name: 'Essential',
        tagline: 'Primary logo, colour palette and typography',
        priceINR: 8000,
        priceUSD: 100,
        timeline: '5 to 7 days',
        features: [
          '2 bespoke primary logo concept directions',
          'Final vector logo kit (SVG, PNG, EPS, AI)',
          'Curated brand color palette (HEX, RGB, CMYK)',
          'Primary & secondary typography pairing guide',
          'Favicon & avatar exports for social profiles',
          '2 revision rounds included',
        ],
      },
      {
        id: 'brand-signature',
        name: 'Signature',
        tagline: 'Logo suite, brand guidelines and social templates',
        priceINR: 18000,
        priceUSD: 220,
        timeline: '10 to 14 days',
        isPopular: true,
        inheritsText: 'Everything in Essential, plus:',
        features: [
          'Complete logo suite (primary, secondary mark, monochrome)',
          'Comprehensive brand guidelines stylebook (PDF)',
          '6 editable social media post/carousel templates (Figma/Canva)',
          'Custom brand patterns, textures & graphic elements',
          'Visual dos and don’ts & brand usage rules',
          '2 revision rounds included',
        ],
      },
      {
        id: 'brand-complete',
        name: 'Complete Identity',
        tagline: 'Expanded identity system, stationery and campaign-ready brand assets',
        priceINR: 35000,
        priceUSD: 425,
        timeline: '2 to 3 weeks',
        inheritsText: 'Everything in Signature, plus:',
        features: [
          'Expanded multi-channel visual identity architecture',
          'Corporate stationery kit (business cards, letterhead, email signature)',
          'Master presentation / pitch deck template (10+ slides)',
          'Packaging, merchandise, or print-ready collateral',
          'Complete Figma design component library',
          '100% intellectual property & commercial rights transfer',
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
    idealFor: 'Creators, personal brands, coaches, and growing businesses that need scroll-stopping visual content and high-retention video.',
    fromPriceINR: 6000,
    fromPriceUSD: 75,
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
        id: 'content-starter',
        name: 'Starter',
        tagline: 'Up to 4 short-form video edits',
        priceINR: 6000,
        priceUSD: 75,
        timeline: '5 to 7 days',
        features: [
          'Up to 4 short-form video edits (up to 60s each)',
          'Dynamic kinetic captions & subtitles',
          'Sound design, sound effects & background audio balancing',
          'Color correction & vertical 9:16 exports',
          'Client supplies raw footage',
          '1 revision round per video included',
        ],
      },
      {
        id: 'content-creator',
        name: 'Creator',
        tagline: 'Up to 8 video edits with captions and motion graphics',
        priceINR: 15000,
        priceUSD: 180,
        timeline: '10 to 14 days',
        isPopular: true,
        inheritsText: 'Everything in Starter, plus:',
        features: [
          'Up to 8 dynamic short-form video edits',
          'Animated hook titles, zooms & visual sound effects',
          'Custom branded lower thirds & emoji animations',
          'Curated B-roll selection & seamless jump-cut pacing',
          '2 revision rounds per video included',
          'Fast 48-hour delivery per video batch',
        ],
      },
      {
        id: 'content-studio',
        name: 'Studio',
        tagline: 'Up to 12 video edits, advanced motion graphics and campaign assets',
        priceINR: 30000,
        priceUSD: 360,
        timeline: '2 to 3 weeks',
        inheritsText: 'Everything in Creator, plus:',
        features: [
          'Up to 12 high-production video edits',
          'Advanced 2D/3D motion graphics & logo stingers',
          'Multi-format delivery (9:16 Vertical + 16:9 Landscape)',
          '4 static promotional banner / story creatives included',
          'Dedicated senior video editor & audio engineer',
          '2 revision rounds per video included',
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
    headline: 'Meta Ads · Lead Generation · Campaign Strategy · Tracking',
    code: '04 // ADS',
    tag: 'Meta Ads · Lead Generation · Campaign Strategy · Tracking',
    idealFor: 'Real estate, education, fitness, e-commerce, and local businesses wanting measurable customer acquisition and qualified leads.',
    fromPriceINR: 8000,
    fromPriceUSD: 100,
    image: '/projects/veloce-ai.png',
    alt: 'PixelMutiny conversion tracking dashboard and Meta Ads campaign performance metrics',
    deliverables: [
      'Meta Ads account audit, campaign setup & tracking verification',
      'Target audience research, lookalikes, and interest clustering',
      'High-converting static & motion ad creative production',
      'Conversion API (CAPI), Meta Pixel & Google Analytics setup',
      'Continuous bid optimization, A/B testing & transparent reporting',
    ],
    tiers: [
      {
        id: 'ads-launch',
        name: 'Ad Launch',
        tagline: 'Campaign setup, tracking checks and launch (One-time project)',
        priceINR: 8000,
        priceUSD: 100,
        period: 'one-time project',
        timeline: '3 to 5 days',
        features: [
          'Meta Ads account & Business Manager audit/setup',
          'Pixel, CAPI & conversion event tracking verification',
          'Audience research & 2 campaign funnel structures',
          'Setup of initial 4 ad creatives with copy variations',
          'Pre-flight quality assurance & launch execution',
          'Client ad spend paid directly to Meta',
        ],
      },
      {
        id: 'ads-leadgen',
        name: 'Lead Generation',
        tagline: 'Campaign management, optimisation and reporting',
        priceINR: 15000,
        priceUSD: 180,
        period: 'per month',
        timeline: 'Monthly ongoing',
        isPopular: true,
        inheritsText: 'Everything in Ad Launch, plus:',
        features: [
          'Full-month active Meta Ads management & bid scaling',
          'Continuous A/B testing of hooks, copy & audiences',
          '4 fresh high-converting ad creatives refreshed monthly',
          'Weekly lead quality reviews & negative audience pruning',
          'Bi-weekly performance report & ROAS insights',
          'Client ad spend paid directly to Meta',
        ],
      },
      {
        id: 'ads-growth',
        name: 'Growth Performance',
        tagline: 'Multiple campaigns, creative testing and deeper performance reporting',
        priceINR: 30000,
        priceUSD: 360,
        period: 'per month',
        timeline: 'Monthly ongoing',
        inheritsText: 'Everything in Lead Generation, plus:',
        features: [
          'Multi-tier funnel architecture (TOF, MOF, Retargeting)',
          'Aggressive creative testing (up to 8 ad creative variants/mo)',
          'Landing page conversion rate optimization (CRO) reviews',
          'Multi-channel attribution guidance',
          'Bi-weekly 1-on-1 strategy calls with lead media buyer',
          'Client ad spend paid directly to Meta',
        ],
      },
    ],
  },
];

// Alias SERVICES_DATA to the 4 core pillars for the new architecture
export const SERVICES_DATA: ServicePackage[] = FOUR_PILLARS_SERVICES;

// Helper to look up services by either new pillar ID or legacy slug
export function getServiceById(id: string): ServicePackage | undefined {
  const match = SERVICES_DATA.find((s) => s.id === id || s.slug === id);
  if (match) return match;
  // Fallbacks for legacy links/queries
  if (['website', 'landing', 'ui-ux', 'dashboard'].includes(id)) return SERVICES_DATA[0];
  if (['graphics', 'brand'].includes(id)) return SERVICES_DATA[1];
  if (['video'].includes(id)) return SERVICES_DATA[2];
  if (['meta-ads'].includes(id)) return SERVICES_DATA[3];
  return undefined;
}

// =========================================================================
// 2. THE THREE MONTHLY RETAINER SERVICES (RECURRING SUBSCRIPTIONS)
// =========================================================================

export const MONTHLY_RETAINERS: RetainerPlan[] = [
  {
    id: 'social-media-retainer',
    num: '01',
    name: 'Social Media Creative Retainer',
    shortName: 'Social Retainer',
    tagline: 'For brands that need consistent visual content',
    idealFor: 'D2C brands, local businesses, institutions, and founders wanting daily brand consistency.',
    priceRangeINR: '₹12,000 – ₹25,000 / month',
    priceRangeUSD: '$150 – $300 / month',
    startingPriceINR: 12000,
    startingPriceUSD: 150,
    includes: [
      '12 to 20 static posts and carousels per month (plan-defined)',
      'Monthly strategic creative calendar aligned with your promos',
      'Branded promotional and product announcement designs',
      'Platform-specific adaptations (Instagram, LinkedIn, X, Facebook)',
      'One monthly review and performance-informed creative improvements',
    ],
    terms: 'Billed monthly in advance • 3-month initial commitment',
    limits: [
      'Excludes daily community management & comments',
      'Excludes on-site photography shoots',
      'Up to 2 revision rounds per creative piece',
    ],
  },
  {
    id: 'reels-video-retainer',
    num: '02',
    name: 'Reels & Video Retainer',
    shortName: 'Reels Retainer',
    tagline: 'For creators, founders and businesses publishing regularly',
    idealFor: 'Content creators, coaches, personal brands, and businesses producing regular video.',
    priceRangeINR: '₹10,000 – ₹30,000 / month',
    priceRangeUSD: '$120 – $360 / month',
    startingPriceINR: 10000,
    startingPriceUSD: 120,
    includes: [
      '8 to 16 short-form video edits per month (plan-defined)',
      'Dynamic captions, transitions, pacing cuts, and kinetic sound design',
      'Branded styling, intro hook graphics, and lower thirds',
      'Vertical 9:16 exports optimized for Reels, Shorts, and TikTok',
      '1 to 2 revision rounds per video defined by plan tier',
    ],
    terms: 'Billed monthly in advance • 3-month initial commitment',
    limits: [
      'Client supplies raw video footage & audio',
      'Scripting & filming available as custom add-ons',
      'Advanced 3D animation quoted separately',
    ],
  },
  {
    id: 'ads-management-retainer',
    num: '03',
    name: 'Ads Management Retainer',
    shortName: 'Ads Retainer',
    tagline: 'For businesses that need ongoing paid acquisition',
    idealFor: 'Startups, e-commerce, real estate, and local businesses running active acquisition campaigns.',
    priceRangeINR: '₹15,000 – ₹35,000+ / month',
    priceRangeUSD: '$180 – $425+ / month',
    startingPriceINR: 15000,
    startingPriceUSD: 180,
    includes: [
      'End-to-end Meta Ads campaign management & daily optimization',
      'Continuous audience testing, bid scaling, and negative keyword pruning',
      'Defined monthly ad creative allowance (4–8 refreshed ad creatives/mo)',
      'Pixel, CAPI, and conversion event tracking verification',
      'Transparent monthly performance report, ROAS audit & strategy call',
    ],
    terms: 'Billed monthly in advance • 3-month initial commitment',
    limits: [
      'Advertising spend paid directly to Meta by client',
      'Complex multi-brand or enterprise funnels quoted custom',
      'No unrealistic viral or lead volume guarantees',
    ],
  },
];

// =========================================================================
// 3. GROWTH PARTNER RETAINER BUNDLES (COMBINED MONTHLY PLANS)
// =========================================================================

export const GROWTH_PARTNER_BUNDLES: GrowthBundle[] = [
  {
    id: 'creative-partner',
    name: 'Creative Partner',
    tagline: 'Social creatives + a focused batch of video edits',
    monthlyFeeINR: 20000,
    monthlyFeeUSD: 240,
    feeDisplayINR: '₹20,000 / month',
    feeDisplayUSD: '$240 / month',
    bestFor: 'Founders & personal brands needing social consistency and regular reel output.',
    deliverables: [
      '12 branded social media posts & carousels per month',
      '4 short-form dynamic reel edits with kinetic captions',
      'Monthly strategic creative calendar',
      '1 monthly review & design iteration sprint',
      'Dedicated creative Slack channel',
    ],
    terms: 'Billed monthly in advance • 3-month minimum commitment',
  },
  {
    id: 'growth-partner',
    name: 'Growth Partner',
    tagline: 'Social creatives + reels + Meta Ads management',
    monthlyFeeINR: 35000,
    monthlyFeeUSD: 425,
    feeDisplayINR: '₹35,000 / month',
    feeDisplayUSD: '$425 / month',
    bestFor: 'Growing businesses wanting both content production and active customer acquisition.',
    isPopular: true,
    deliverables: [
      '16 branded social media posts & carousels per month',
      '8 dynamic short-form video edits with motion graphics',
      'Full-funnel Meta Ads campaign management & scaling',
      '4 bespoke ad creatives refreshed each month',
      'Bi-weekly performance reporting & ROAS strategy call',
    ],
    terms: 'Billed monthly in advance • Ad spend paid directly to Meta • 3-month commitment',
  },
  {
    id: 'full-service-partner',
    name: 'Full-Service Partner',
    tagline: 'Higher content volume, video production and advertising management',
    monthlyFeeINR: 50000,
    monthlyFeeUSD: 600,
    feeDisplayINR: '₹50,000 – ₹65,000+ / month',
    feeDisplayUSD: '$600 – $800+ / month',
    bestFor: 'Scaleups & active brands needing a complete external creative + performance team.',
    deliverables: [
      '24+ branded social creatives, carousels & banners per month',
      '16 dynamic short-form video edits + custom motion graphics',
      'Multi-campaign Meta Ads management & aggressive A/B testing',
      'Continuous landing page conversion rate optimization (CRO) reviews',
      'Weekly 1-on-1 strategy call with agency founder & priority turnaround',
    ],
    terms: 'Billed monthly in advance • Ad spend paid directly to Meta • 3-month commitment',
  },
];

// =========================================================================
// 4. BUNDLE: STARTUP LAUNCH KIT
// =========================================================================

export const STARTUP_LAUNCH_KIT = {
  id: 'startup-kit',
  name: 'Full-Service Brand & Growth Kit',
  subtitle: 'The complete digital foundation: branding, high-converting landing page, graphics, and Meta ads all under one roof.',
  priceINR: 75000,
  priceUSD: 900,
  originalINR: 95000,
  originalUSD: 1150,
  savingsINR: 20000,
  savingsUSD: 250,
  timeline: '3 to 4 weeks',
  includes: [
    {
      title: 'Brand Identity Standard',
      desc: 'Complete logo suite, full brand guidelines, 6 social templates, and typography rules.',
      valueINR: 30000,
      valueUSD: 360,
    },
    {
      title: 'High-Converting Web Experience',
      desc: 'Custom 5-page responsive website or flagship landing page with CMS and analytics.',
      valueINR: 50000,
      valueUSD: 600,
    },
    {
      title: 'Meta Ads & Content Launchpack',
      desc: '4 ad creatives + 2 video edits + campaign architecture ready for paid acquisition.',
      valueINR: 15000,
      valueUSD: 190,
    },
  ],
};

export const ADD_ONS_DATA: AddOn[] = [
  {
    id: 'extra-page',
    name: 'Extra Web Page',
    priceINR: 4000,
    priceUSD: 50,
    unit: 'per page',
    description: 'Custom designed and developed responsive page added to any web package.',
  },
  {
    id: 'extra-revision',
    name: 'Extra Revision Round',
    priceINR: 2000,
    priceUSD: 25,
    unit: 'per round',
    description: 'One additional structured round of design feedback and polish.',
  },
  {
    id: 'reel-editing',
    name: 'Single Reel / Video Edit',
    priceINR: 1500,
    priceUSD: 20,
    unit: 'per video',
    description: 'Dynamic kinetic captions, sound design, and viral pacing for short-form video.',
  },
  {
    id: 'pitch-deck-slide',
    name: 'Extra Pitch Deck Slides',
    priceINR: 1500,
    priceUSD: 20,
    unit: 'per slide',
    description: 'Bespoke investor-ready presentation design in Figma or PowerPoint.',
  },
  {
    id: 'rush-delivery',
    name: 'Rush Delivery',
    priceINR: 0,
    priceUSD: 0,
    unit: '+30% of total',
    description: 'Expedited sprint timeline with priority queue and weekend execution.',
  },
];

export const TERMS_CONDITIONS = [
  '50% advance deposit to start project sprints, 50% upon completion before source file delivery.',
  'Monthly retainers billed in advance on the 1st of each month with a 3-month initial commitment.',
  '2 structured revision rounds included with each deliverable.',
  'Timelines start after completed onboarding brief and advance deposit are received.',
  'Full source files, Figma design tokens, and intellectual property transfer on final payment.',
  'Client pays advertising spend directly to Meta; ad budgets are not included in management fees.',
  'Quotes are valid for 14 days from presentation.',
];

export const FAQ_DATA: FAQItem[] = [
  {
    q: 'How does PixelMutiny’s four-pillar structure work?',
    a: 'We organize our agency around four natural areas of growth: Digital Experiences (websites & apps), Brand Identity & Design (logos & systems), Content & Creative Production (reels & video), and Performance Marketing (Meta Ads). You can hire us for a one-time project sprint or on a recurring monthly retainer.',
  },
  {
    q: 'What is the difference between one-time projects and monthly retainers?',
    a: 'One-time projects build something new—such as a 10-page website, a new brand identity, or an initial ad campaign setup—with a fixed scope and delivery milestone. Monthly retainers help you keep growing with predictable creative output (12–20 posts, 8–16 reels, or active Meta Ads scaling) billed monthly.',
  },
  {
    q: 'Why do you have defined deliverable caps instead of "unlimited" work?',
    a: 'Agencies offering "unlimited" designs inevitably compromise on turnaround time, quality, or assign your work to entry-level temps. PixelMutiny delivers bespoke, senior-crafted work with explicit deliverable counts, clear review rounds, and fast 48-hour turnarounds.',
  },
  {
    q: 'Is ad spend included in the Meta Ads pricing?',
    a: 'No. Ad spend is paid directly by you to Meta via your connected billing method in Meta Ads Manager. Our pricing covers expert campaign architecture, audience targeting, ongoing optimization, reporting, and high-converting creative refreshes.',
  },
  {
    q: 'How do payments, commitments, and milestone schedules work?',
    a: 'For one-time project packages, a 50% deposit locks in your sprint, with the remaining 50% due upon final approval before asset handover. For monthly retainers and Growth Partner bundles, billing occurs monthly in advance with a recommended 3-month commitment to allow marketing campaigns to mature.',
  },
  {
    q: 'Do I own the source files, intellectual property, and code?',
    a: 'Yes, 100%. Upon receipt of final payment, full intellectual property, commercial usage rights, editable Figma source files, code repositories, vector graphics, and production exports belong entirely to you.',
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
    if (tier.priceUSD <= 150) return 105000000;
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
