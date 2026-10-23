export type Currency = 'INR' | 'USD';

export interface PriceTier {
  id: string;
  name: string;
  tagline: string;
  priceINR: number;
  priceUSD: number;
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
  image: string;
  alt: string;
  deliverables: string[];
  tiers: PriceTier[];
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
  primary: 'Break the template.',
  secondary: 'Design that breaks rank.',
  tertiary: 'Built different. Designed to perform.',
};

export const ONE_LINER =
  'PixelMutiny DigiMedia is a creative and digital studio that builds websites, dashboards, brand identities, content, and ad campaigns for brands and individuals who want to stand out instead of blend in.';

export const SHORT_BIO =
  'We design, build, and grow brands. Websites, landing pages, UI/UX, dashboards, logos, graphics, reels, and Meta Ads, all under one roof.';

export const WHO_WE_ARE = {
  summary:
    'PixelMutiny DigiMedia is a full-service digital studio based in India. We bring design, development, and performance marketing together so clients don’t have to juggle five freelancers to launch one brand.',
  ethos:
    'The name says it: every pixel has a job, and we don’t follow the boring, templated look the internet is full of. We build work that is sharp, original, and made to get results.',
  location: 'New Delhi, India (DLF Cyber Hub Design Lab)',
};

export const ABOUT_NAME_MEANING = {
  pixel: 'Pixel is the smallest unit of digital design.',
  mutiny: 'Mutiny is breaking from the crowd.',
  conclusion:
    'Together: we sweat the small details and refuse to make forgettable work.',
};

export const MISSION =
  'To help brands and individuals build a strong digital presence through clean design, solid development, and marketing that actually converts.';

export const VISION =
  'To grow into a trusted creative agency that works with clients across India and globally, known for original work, fast delivery, and honest communication.';

export const CORE_VALUES = [
  {
    title: 'Originality first',
    desc: 'No recycled templates or copy-paste designs. Everything is built around your specific brand and goals.',
    icon: 'Sparkles',
  },
  {
    title: 'Clarity over clutter',
    desc: 'Clean visuals, clear messaging, simple user journeys that guide visitors straight to conversion.',
    icon: 'Layers',
  },
  {
    title: 'Results matter',
    desc: 'Pretty is not enough. It has to work, convert, and scale in the real market.',
    icon: 'Zap',
  },
  {
    title: 'Speed with quality',
    desc: 'Fast turnarounds without cutting corners, powered by disciplined sprint architectures.',
    icon: 'Clock',
  },
  {
    title: 'Honest partnership',
    desc: 'Clear timelines, transparent pricing, no fluff, and direct partner access throughout.',
    icon: 'ShieldCheck',
  },
];

export const WHO_WE_WORK_WITH = [
  {
    category: 'Brands & Businesses',
    tag: 'SCALE & ENTERPRISE',
    audience: 'Startups, local businesses, education, real estate, fitness, e-commerce, and SaaS.',
    desc: 'Companies launching new products, redesigning dated websites, or scaling customer acquisition with high-converting digital flagships and ad campaigns.',
    bullets: ['Funded Tech Startups', 'E-commerce & D2C Brands', 'Real Estate & Hospitality', 'Modern SaaS Products'],
  },
  {
    category: 'Individuals & Creators',
    tag: 'PERSONAL BRANDS',
    audience: 'Creators, coaches, freelancers, consultants, and personal brands.',
    desc: 'Ambitious professionals and content creators needing authoritative digital portfolios, landing pages, custom graphics, and reels that convert followers into clients.',
    bullets: ['Executive Coaches & Consultants', 'Content Creators & YouTubers', 'High-Ticket Freelancers', 'Specialist Founders'],
  },
];

export const WHY_CHOOSE_US = [
  {
    num: '01',
    title: 'One Team For Everything',
    desc: 'Design, development, content, and ads all under one roof — no juggling five freelancers or dealing with handoff friction.',
  },
  {
    num: '02',
    title: '100% Original Work',
    desc: 'Built custom around your brand narrative and competitive edge, never from cheap templates or recycled boilerplates.',
  },
  {
    num: '03',
    title: 'Production-Ready Files',
    desc: 'Clean, vector-ready files, Figma design tokens, and modular source code you can scale anywhere with total ownership.',
  },
  {
    num: '04',
    title: 'Clear Timelines & Communication',
    desc: 'Definite delivery milestones, transparent weekly reporting, live Slack access, and zero corporate agency runaround.',
  },
  {
    num: '05',
    title: 'Creative + Performance Together',
    desc: 'Creative flair and mathematical performance thinking combined, ensuring your brand looks stunning while generating measurable revenue.',
  },
];

export const HOW_WE_WORK_STAGES = [
  {
    step: '01',
    name: 'Discover',
    tagline: 'Deep Brand & Audience Discovery',
    desc: 'Understand your brand, business goals, target audience, and market landscape to establish clear project benchmarks.',
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
// 8 CORE SERVICE PACKAGES (WHAT WE DO)
// =========================================================================

export const SERVICES_DATA: ServicePackage[] = [
  {
    id: 'website',
    slug: 'website',
    num: '(01)',
    name: 'Website Design & Development',
    shortName: 'Websites',
    headline: 'Business sites, portfolios, and e-commerce stores.',
    code: 'WEB // DEV',
    tag: 'Fast, Responsive & SEO-Ready',
    idealFor: 'Businesses, founders, creators, and online stores wanting a fast, responsive, SEO-ready site built to be easy to manage.',
    image: '/projects/veyra-legal.png',
    alt: 'PixelMutiny editorial multi-page business website design with case studies and interactive layout',
    deliverables: [
      'Multi-page responsive website design & development',
      'Self-serve CMS setup for easy in-house content editing',
      'Mobile, tablet & desktop optimization with fast load speeds',
      'Core technical SEO, sitemaps & Schema markup',
      'Contact forms, newsletter integration & lead routing',
    ],
    tiers: [
      {
        id: 'web-starter',
        name: 'Starter',
        tagline: 'Clean 5-page business site with self-serve CMS.',
        priceINR: 35000,
        priceUSD: 950,
        timeline: '2 to 3 weeks',
        features: [
          'Up to 5 custom responsive pages',
          'Self-serve CMS for easy text & image updates',
          'Mobile, tablet & desktop optimization',
          'Technical SEO basics & sitemap setup',
          'Lead capture & contact form integration',
          '2 revision rounds included',
        ],
      },
      {
        id: 'web-business',
        name: 'Custom Business',
        tagline: 'Up to 10 pages with custom UI design & blog.',
        priceINR: 75000,
        priceUSD: 2100,
        timeline: '4 to 5 weeks',
        isPopular: true,
        inheritsText: 'Everything in Starter, plus:',
        features: [
          'Up to 10 custom designed & coded pages',
          'Custom modular UI kit & Figma design files',
          'Fluid micro-animations & scroll interactions',
          'Dynamic blog or resources publishing section',
          'Google Analytics & Meta Pixel tracking setup',
          'Full source code & asset handover',
        ],
      },
      {
        id: 'web-flagship',
        name: 'Flagship & E-commerce',
        tagline: '15+ pages, e-commerce shop or complex interactive site.',
        priceINR: 140000,
        priceUSD: 3800,
        timeline: '6 to 8 weeks',
        inheritsText: 'Everything in Custom Business, plus:',
        features: [
          '15+ custom pages or full online shopping store',
          'Payment gateway (Stripe / Razorpay) & inventory setup',
          'Interactive 3D / product showcase views',
          'Advanced programmatic SEO architecture',
          '30-day post-launch hypercare & team walkthrough',
        ],
      },
    ],
  },
  {
    id: 'landing',
    slug: 'landing',
    num: '(02)',
    name: 'Landing Page Design & Development',
    shortName: 'Landing Pages',
    headline: 'High-converting single pages for campaigns, launches, and ad traffic.',
    code: 'CRO // LANDING',
    tag: 'Conversion-Engineered',
    idealFor: 'SaaS products, marketing campaigns, launches, lead generation, and paid traffic.',
    image: '/projects/flow-task.jpg',
    alt: 'PixelMutiny modern high-converting SaaS landing page interface with conversion metrics',
    deliverables: [
      'Conversion-centered layout architecture & persuasive wireframe',
      'Compelling headline copywriting & narrative flow',
      'Bespoke responsive design matching your brand aesthetic',
      'Fast Next.js or Webflow build with sub-second load times',
      'Analytics event tracking, Meta Pixel & lead capture setup',
    ],
    tiers: [
      {
        id: 'landing-essential',
        name: 'Essential',
        tagline: 'Clean 1-page launchpad with responsive form.',
        priceINR: 20000,
        priceUSD: 600,
        timeline: '5 to 7 days',
        features: [
          '1 custom responsive landing page',
          'Responsive lead capture / inquiry form',
          'Mobile & tablet optimization',
          'Fast deployment on Vercel or Webflow',
          '2 revision rounds included',
        ],
      },
      {
        id: 'landing-standard',
        name: 'Standard',
        tagline: 'Conversion-engineered launch page with copy & tracking.',
        priceINR: 40000,
        priceUSD: 1100,
        timeline: '10 to 14 days',
        isPopular: true,
        inheritsText: 'Everything in Essential, plus:',
        features: [
          'Custom design crafted around your unique offer',
          'Persuasive copy structure & section narrative',
          'Subtle scroll animations & micro-interactions',
          'Google Analytics & Meta Pixel tracking setup',
          'Search engine optimization (SEO) basics & meta tags',
        ],
      },
      {
        id: 'landing-premium',
        name: 'Premium',
        tagline: 'Interactive powerhouse with A/B variant & CRM sync.',
        priceINR: 70000,
        priceUSD: 1900,
        timeline: '3 weeks',
        inheritsText: 'Everything in Standard, plus:',
        features: [
          'A/B testing variant layout for campaign experimentation',
          'Interactive element (pricing calculator or visual demo)',
          'In-depth conversion rate heuristic audit',
          'Direct integration with your CRM or email provider',
          '2 post-launch tweak & refinement rounds',
        ],
      },
    ],
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux',
    num: '(03)',
    name: 'UI/UX Design',
    shortName: 'UI/UX Design',
    headline: 'User research, wireframes, and polished interface design for websites, apps, and SaaS.',
    code: 'UI // RESEARCH',
    tag: 'Websites, Apps & SaaS',
    idealFor: 'Product founders, software companies, and mobile app teams needing intuitive user journeys.',
    image: '/projects/veloce-ai.jpg',
    alt: 'PixelMutiny UI/UX component library, user journeys, and Figma wireframes mockup',
    deliverables: [
      'User research, competitor benchmarking & journey maps',
      'Low-fidelity wireframes exploring optimal UX flows',
      'High-fidelity interactive prototype inside Figma',
      'Scalable design token system (colors, typography, components)',
      'Detailed developer handoff documentation & export assets',
    ],
    tiers: [
      {
        id: 'ui-audit',
        name: 'Audit & Wireframes',
        tagline: 'Heuristic review & UX wireframes for core flows.',
        priceINR: 25000,
        priceUSD: 700,
        timeline: '1 to 2 weeks',
        features: [
          'Heuristic UX teardown of current product',
          'User journey mapping & friction analysis',
          'Low-fidelity wireframes (up to 8 core views)',
          'Information architecture recommendations',
          'Figma project file handoff',
        ],
      },
      {
        id: 'ui-complete',
        name: 'Complete App UI',
        tagline: 'Full high-fidelity Figma UI with interactive prototype.',
        priceINR: 60000,
        priceUSD: 1650,
        timeline: '3 to 4 weeks',
        isPopular: true,
        inheritsText: 'Everything in Audit & Wireframes, plus:',
        features: [
          'Up to 15 high-fidelity polished screens',
          'Clickable interactive Figma prototype',
          'Modular UI component library & auto-layout tokens',
          'Light & dark mode design system specs',
          'Developer handoff call & asset exports',
        ],
      },
      {
        id: 'ui-enterprise',
        name: 'Enterprise System',
        tagline: 'End-to-end multi-platform design system & 30+ screens.',
        priceINR: 120000,
        priceUSD: 3200,
        timeline: '5 to 6 weeks',
        inheritsText: 'Everything in Complete App UI, plus:',
        features: [
          '30+ comprehensive application screens & edge states',
          'Multi-platform component library (Web, iOS & Android)',
          'Comprehensive design token repository for dev sync',
          'User usability testing & feedback synthesis',
          'Ongoing design sprint guidance during engineering',
        ],
      },
    ],
  },
  {
    id: 'dashboard',
    slug: 'dashboard',
    num: '(04)',
    name: 'Dashboard Design & Development',
    shortName: 'Dashboards',
    headline: 'Admin panels, analytics dashboards, and SaaS interfaces that are clean, usable, and scalable.',
    code: 'DATA // SAAS',
    tag: 'Clean, Usable & Scalable',
    idealFor: 'SaaS platforms, enterprise tools, and analytics systems needing clean, dense data visualization.',
    image: '/projects/krono-pay.jpg',
    alt: 'PixelMutiny clean analytics dashboard and admin panel user interface',
    deliverables: [
      'Intuitive navigation hierarchy and responsive layout',
      'Clean data visualization widgets, graphs & metrics cards',
      'Filterable data tables, search states & modal actions',
      'Scalable design tokens for charts, alerts & states',
      'Ready-to-integrate frontend components or full Next.js build',
    ],
    tiers: [
      {
        id: 'dash-uikit',
        name: 'Core UI Kit',
        tagline: 'Figma design of core dashboard views & widgets.',
        priceINR: 45000,
        priceUSD: 1250,
        timeline: '2 to 3 weeks',
        features: [
          'Core overview dashboard + 3 key module views',
          'Modular metric cards, charts & widget kit in Figma',
          'Responsive desktop & tablet states',
          'Design tokens & color coding for statuses/KPIs',
          'Clean Figma component architecture',
        ],
      },
      {
        id: 'dash-production',
        name: 'Frontend Build',
        tagline: 'Full Next.js/React dashboard code with interactive charts.',
        priceINR: 95000,
        priceUSD: 2600,
        timeline: '4 to 5 weeks',
        isPopular: true,
        inheritsText: 'Everything in Core UI Kit, plus:',
        features: [
          'Full Next.js / Tailwind CSS frontend codebase',
          'Interactive charts (Recharts / Chart.js integration)',
          'Sortable, searchable data tables with pagination',
          'Clean mock JSON data wiring ready for backend API',
          'Dark & light mode toggle included',
        ],
      },
      {
        id: 'dash-suite',
        name: 'Scalable SaaS Suite',
        tagline: 'Multi-tenant admin architecture with export pipelines.',
        priceINR: 175000,
        priceUSD: 4800,
        timeline: '6 to 8 weeks',
        inheritsText: 'Everything in Frontend Build, plus:',
        features: [
          'Multi-role admin panel (Admin, Manager, Viewer views)',
          'Complex real-time metrics & report export engine',
          'Full state management & production backend integration sync',
          '30-day technical support & architecture walkthrough',
        ],
      },
    ],
  },
  {
    id: 'graphics',
    slug: 'graphics',
    num: '(05)',
    name: 'Graphics Design',
    shortName: 'Graphics',
    headline: 'Social media creatives, posters, brochures, banners, pitch decks, and brand collateral.',
    code: 'VISUAL // ART',
    tag: 'Print & Digital Collateral',
    idealFor: 'Brands, event organizers, educators, and startups needing stunning visual collateral.',
    image: '/projects/maison-aura.jpg',
    alt: 'PixelMutiny bold graphic design posters, brochures, and editorial collateral cards',
    deliverables: [
      'High-impact social media creatives & carousels',
      'Investor pitch decks, sales presentations & brochures',
      'Event banners, roll-up signage & print collateral',
      'Clean, vector-ready files you can use anywhere',
      'Full commercial usage rights & editable source files',
    ],
    tiers: [
      {
        id: 'graphics-starter',
        name: 'Starter Pack',
        tagline: '6 social media creatives or 1 promotional poster.',
        priceINR: 12000,
        priceUSD: 350,
        timeline: '3 to 5 days',
        features: [
          '6 high-impact social media posts or 1 print banner',
          'Formats for Instagram, LinkedIn & X',
          'High-resolution PNG, JPG & PDF print-ready files',
          '2 revision rounds included',
          'Clean vector source files included',
        ],
      },
      {
        id: 'graphics-collateral',
        name: 'Collateral Kit',
        tagline: '15 social creatives + pitch deck + brochure.',
        priceINR: 28000,
        priceUSD: 800,
        timeline: '1 to 2 weeks',
        isPopular: true,
        inheritsText: 'Everything in Starter Pack, plus:',
        features: [
          '15 custom social creatives or carousel sets',
          'Pitch deck or sales presentation (up to 15 custom slides)',
          'Tri-fold brochure or event promotional banner design',
          'Editable Figma / Canva templates for your team',
          'Print-ready CMYK files with bleed marks',
        ],
      },
      {
        id: 'graphics-retainer',
        name: 'Monthly Retainer',
        tagline: '30 monthly graphic assets with priority turnaround.',
        priceINR: 55000,
        priceUSD: 1500,
        period: 'per month',
        timeline: 'Ongoing monthly',
        inheritsText: 'Everything in Collateral Kit, plus:',
        features: [
          '30 custom visual assets every month',
          'Social posts, ad banners, presentation slides & flyers',
          'Dedicated senior visual designer assigned to your brand',
          'Priority 48-hour turnarounds on urgent requests',
          'Shared Slack channel for instant briefs & iterations',
        ],
      },
    ],
  },
  {
    id: 'video',
    slug: 'video',
    num: '(06)',
    name: 'Reel & Video Editing',
    shortName: 'Reels & Video',
    headline: 'Short-form edits for Instagram, YouTube Shorts, and ads, with strong hooks, clean cuts, motion, and sound design.',
    code: 'MOTION // REELS',
    tag: 'Strong Hooks & Sound Design',
    idealFor: 'Creators, personal brands, founders, e-commerce, and businesses scaling on Instagram, YouTube, and TikTok.',
    image: '/projects/solaris-dex.jpg',
    alt: 'PixelMutiny dynamic vertical video editing timeline with motion graphics and kinetic typography',
    deliverables: [
      'Engaging short-form vertical video (9:16) with viral hooks',
      'Dynamic kinetic typography, captions & zoom cuts',
      'Custom sound design, sound effects & trending audio pairing',
      'Color grading, visual b-roll pacing & graphic callouts',
      'Optimized export ready for Instagram Reels, Shorts & TikTok',
    ],
    tiers: [
      {
        id: 'video-sprint',
        name: 'Reel Sprint',
        tagline: '5 dynamic short-form reels with kinetic captions.',
        priceINR: 6000,
        priceUSD: 180,
        timeline: '3 to 5 days',
        features: [
          '5 edited vertical videos (up to 60s each)',
          'Kinetic subtitles & animated typography hooks',
          'Pacing cuts, zoom-ins & seamless transitions',
          'Sound design, SFX & background audio mixing',
          '2 revision rounds per reel',
        ],
      },
      {
        id: 'video-creator',
        name: 'Creator Pack',
        tagline: '15 high-engagement reels with custom branded styling.',
        priceINR: 18000,
        priceUSD: 500,
        timeline: '10 to 14 days',
        isPopular: true,
        inheritsText: 'Everything in Reel Sprint, plus:',
        features: [
          '15 dynamic short-form videos optimized for retention',
          'Custom branded subtitle styles & visual emojis/stickers',
          'Color grading & lighting enhancement',
          'Strategic hook recommendations to increase watch time',
          'B-roll and stock footage insertion where needed',
        ],
      },
      {
        id: 'video-engine',
        name: 'Monthly Video Engine',
        tagline: '30 edited reels per month with 48h turnaround.',
        priceINR: 35000,
        priceUSD: 980,
        period: 'per month',
        timeline: 'Ongoing monthly',
        inheritsText: 'Everything in Creator Pack, plus:',
        features: [
          '30 polished reels/shorts delivered across the month',
          'Priority 48-hour turnarounds on raw footage uploads',
          'Monthly strategy sync on content formats and trending hooks',
          'Full project file and high-bitrate master exports',
          'Ideal for consistent daily social growth',
        ],
      },
    ],
  },
  {
    id: 'brand',
    slug: 'brand',
    num: '(07)',
    name: 'Logo & Brand Identity Design',
    shortName: 'Brand Identity',
    headline: 'Original, scalable, vector-ready logos with colour palettes, typography, and usage guidelines.',
    code: 'BRAND // IDENTITY',
    tag: 'Original & Scalable',
    idealFor: 'Startups, personal brands, local businesses, and rebrands wanting a distinctive identity that stands out instead of blending in.',
    image: '/projects/avenor.png',
    alt: 'PixelMutiny luxury architectural brand identity guidelines sheet with typography and stationery mockup',
    deliverables: [
      'Original, scalable, vector-ready logo marks (primary & secondary)',
      'Curated brand color palette & high-contrast typography hierarchy',
      'Comprehensive brand guidelines manual (PDF & Figma)',
      'Social media starter templates for Instagram, LinkedIn & X',
      'Stationery suite with business cards & letterhead print files',
    ],
    tiers: [
      {
        id: 'brand-essentials',
        name: 'Essentials',
        tagline: 'Clean, professional brand foundations fast.',
        priceINR: 12000,
        priceUSD: 350,
        timeline: '5 to 7 days',
        features: [
          'Logo design (3 concepts, 1 refined final mark)',
          'Color palette & typography pairing setup',
          '1-page brand mini-guide (PDF)',
          '2 revision rounds included',
          'Full vector asset export (SVG, PNG, EPS)',
        ],
      },
      {
        id: 'brand-standard',
        name: 'Standard',
        tagline: 'Comprehensive visual identity for growing brands.',
        priceINR: 30000,
        priceUSD: 900,
        timeline: '2 to 3 weeks',
        isPopular: true,
        inheritsText: 'Everything in Essentials, plus:',
        features: [
          'Full comprehensive brand guidelines PDF & Figma file',
          'Social media kit (10 editable Canva/Figma templates)',
          'Stationery system & business card print-ready files',
          'Custom vector iconography kit',
          'Favicon, email signature & web asset pack',
        ],
      },
      {
        id: 'brand-premium',
        name: 'Premium',
        tagline: 'Flagship brand universe with motion & strategy.',
        priceINR: 65000,
        priceUSD: 1800,
        timeline: '4 weeks',
        inheritsText: 'Everything in Standard, plus:',
        features: [
          '1-on-1 brand strategy & positioning session',
          'Animated kinetic logo reveal for web and video',
          '30 custom social media templates across all formats',
          'Ad creative starter set for paid campaigns',
          'Brand collateral (pitch deck theme, merchandise specs)',
        ],
      },
    ],
  },
  {
    id: 'meta-ads',
    slug: 'meta-ads',
    num: '(08)',
    name: 'Meta Ads (Facebook & Instagram)',
    shortName: 'Meta Ads',
    headline: 'Campaign setup, creatives, audience targeting, tracking, and optimization focused on leads and sales.',
    code: 'ADS // PERFORMANCE',
    tag: 'Leads & Sales Focus',
    idealFor: 'E-commerce, education, real estate, fitness, local businesses, and SaaS looking to scale profitably.',
    image: '/projects/meta-ads-grid.jpg',
    alt: 'PixelMutiny high-converting creative design grid showcasing visual ad formats, hooks, and video frames',
    deliverables: [
      'Thumb-stopping ad creatives in 1:1 Feed, 9:16 Story & Reel formats',
      'Short-form video ads with clear kinetic typography and hooks',
      'Campaign setup, custom audience targeting & Meta Pixel tracking',
      'Weekly performance monitoring, creative refreshes & optimization',
      'Transparent reporting focused on ROAS, CAC, and lead volume',
    ],
    tiers: [
      {
        id: 'ads-pack',
        name: 'Creative Pack',
        tagline: 'High-converting asset bundle ready for your campaigns.',
        priceINR: 15000,
        priceUSD: 400,
        period: 'one-time',
        timeline: '7 days',
        features: [
          '8 static performance ad creatives',
          '2 short video ad creatives',
          'Formats included: Feed (1:1), Story (9:16), and Reel',
          'Tested copy hooks & conversion headlines',
          'Full source Figma files included',
        ],
      },
      {
        id: 'ads-management',
        name: 'Management',
        tagline: 'Full campaign setup with monthly creative refreshes.',
        priceINR: 20000,
        priceUSD: 550,
        period: 'per month',
        timeline: 'Ongoing monthly',
        isPopular: true,
        inheritsText: 'Everything in Creative Pack, plus:',
        features: [
          'Complete ad account & Meta Pixel setup',
          '4 fresh new performance creatives each month',
          'Weekly budget & audience optimization',
          'Transparent monthly performance reports',
          '3-month minimum partnership',
        ],
      },
      {
        id: 'ads-growth',
        name: 'Growth',
        tagline: 'Aggressive scaling with 12 creatives/mo & CRO support.',
        priceINR: 45000,
        priceUSD: 1200,
        period: 'per month',
        timeline: 'Ongoing monthly',
        inheritsText: 'Everything in Management, plus:',
        features: [
          '12 fresh high-converting creatives per month',
          'Multiple simultaneous campaign architectures',
          'Continuous landing page CRO guidance & advice',
          'Weekly strategy call with senior lead',
          '3-month minimum partnership',
        ],
      },
    ],
  },
];

export const STARTUP_LAUNCH_KIT = {
  id: 'startup-kit',
  name: 'Full-Service Brand & Growth Kit',
  subtitle: 'The complete digital foundation: branding, high-converting landing page, graphics, and Meta ads all under one roof.',
  priceINR: 75000,
  priceUSD: 2100,
  originalINR: 85000,
  originalUSD: 2400,
  savingsINR: 10000,
  savingsUSD: 300,
  timeline: '3 to 4 weeks',
  includes: [
    {
      title: 'Logo & Brand Identity Standard',
      desc: 'Logo suite, full brand guidelines, 10 social templates, and stationery.',
      valueINR: 30000,
      valueUSD: 900,
    },
    {
      title: 'Landing Page Standard',
      desc: 'Custom design, conversion copywriting structure, micro-animations, and tracking.',
      valueINR: 40000,
      valueUSD: 1100,
    },
    {
      title: 'Meta Ads Creative Pack',
      desc: '8 static ads + 2 video ads across Feed, Story, and Reel formats.',
      valueINR: 15000,
      valueUSD: 400,
    },
  ],
};

export const ADD_ONS_DATA: AddOn[] = [
  {
    id: 'extra-page',
    name: 'Extra Web Page',
    priceINR: 4000,
    priceUSD: 100,
    unit: 'per page',
    description: 'Custom designed and developed responsive page added to any web package.',
  },
  {
    id: 'extra-revision',
    name: 'Extra Revision Round',
    priceINR: 2000,
    priceUSD: 50,
    unit: 'per round',
    description: 'One additional structured round of design feedback and polish.',
  },
  {
    id: 'reel-editing',
    name: 'Single Reel / Video Edit',
    priceINR: 1200,
    priceUSD: 35,
    unit: 'per video',
    description: 'Dynamic kinetic captions, sound design, and viral pacing for short-form video.',
  },
  {
    id: 'pitch-deck-slide',
    name: 'Extra Pitch Deck Slides',
    priceINR: 1500,
    priceUSD: 40,
    unit: 'per slide',
    description: 'Bespoke investor-ready presentation design in Figma or PowerPoint.',
  },
  {
    id: 'social-management',
    name: 'Social Media Management',
    priceINR: 15000,
    priceUSD: 420,
    unit: 'per month',
    description: '12 branded posts/carousels per month, copywriting, and scheduled publishing.',
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
  '50% advance to start, 50% before final files.',
  'Monthly work billed in advance, 3-month minimum.',
  '2 revision rounds included with each deliverable.',
  'Timelines start after the brief and advance are received.',
  'Source files and usage rights transfer on final payment.',
  'GST added where applicable.',
  'Quote valid for 14 days from presentation.',
];

export const FAQ_DATA: FAQItem[] = [
  {
    q: 'Why choose PixelMutiny DigiMedia over multiple freelancers?',
    a: 'We bring design, development, content, and performance marketing together under one roof. You get cohesive branding, clean code, and high-converting marketing without juggling five freelancers, managing conflicting schedules, or dealing with handoff blame.',
  },
  {
    q: 'How do payments and milestones work?',
    a: 'A 50% advance deposit is required to lock in your sprint slot and kick off project execution. The remaining 50% is due upon completion before final source files and production assets are transferred. Monthly retainers and campaign management are billed in advance on the 1st of each month.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Every package includes 2 full rounds of structured revisions. We gather feedback collaboratively on interactive Figma prototypes or staging sites, ensuring alignment without chaotic back-and-forth. Additional revision rounds can be added anytime at ₹2,000 / $50 per round.',
  },
  {
    q: 'When does the project timeline officially begin?',
    a: 'Timelines officially start on Day 1 after we receive both your 50% advance deposit and your completed onboarding brief along with any necessary brand assets or copy inputs.',
  },
  {
    q: 'Is ad spend included in the Meta Ads pricing?',
    a: 'No. Ad spend is paid directly by you to Meta via your own connected payment method inside Meta Ads Manager. Our pricing covers creative production, strategic setup, testing, continuous optimization, and reporting.',
  },
  {
    q: 'Do I own the source files and intellectual property?',
    a: 'Yes, 100%. Upon receipt of final payment, full intellectual property, commercial usage rights, editable Figma source files, code repositories, vector graphics, and production exports belong entirely to you.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Because sprints require reserving dedicated senior creative capacity in advance, deposits are non-refundable once sprint work begins. If you need to postpone before kickoff, we are happy to pause or reschedule your slot with 7 days advance notice.',
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
};

export const TIMELINE_OPTIONS = [
  { label: 'ASAP', value: 'asap' },
  { label: '2 to 4 weeks', value: '2-4-weeks' },
  { label: '1 to 2 months', value: '1-2-months' },
  { label: 'Ongoing monthly', value: 'monthly' },
  { label: 'Flexible', value: 'flexible' },
];

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
