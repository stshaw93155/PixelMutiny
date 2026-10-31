export const PROJECTS = [
  {
    id: 'avenor',
    slug: 'avenor',
    num: '(001)',
    client: 'Avenor',
    title: 'WHOLESALE & DISTRIBUTION OPERATIONS SUITE',
    subtitle: 'Enterprise Operations Operating System & Command Cockpit',
    category: 'UI/UX SYSTEMS',
    categories: ['UI/UX SYSTEMS', 'WEB DESIGN'],
    projectType: 'saas-ui',
    role: 'Lead Product Designer & Design Systems Architect',
    timeline: '4-Week Sprint',
    year: '2026',
    deliverables: [
      'Mission-Critical Command Cockpit',
      'Inventory & Fulfillment Data Grids',
      'Figma Token Architecture & Design System',
      'Responsive Mobile Operations View',
    ],
    tech: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS', 'Material Symbols'],
    liveUrl: null,
    isConcept: false,
    award: 'ENTERPRISE ARCHITECTURE',
    metric: '+185% FULFILLMENT VELOCITY',
    heroImg: '/projects/avenor.png',
    coverImg: '/projects/avenor.png',
    heroMobileImg: '/projects/avenor-mobile.png',
    heroCaption: '01 — Avenor Nocturnal Command Cockpit // Viewport [1440px]',
    overviewIntro:
      'Avenor unifies multi-warehouse order management, fleet dispatch tracking, and financial collections into a single low-latency operational cockpit, replacing six fragmented ERP tools.',
    challengeBrief:
      'Modern wholesale enterprises were losing hours toggling between disconnected legacy ERP software, paper dispatch manifests, and manual spreadsheets. Warehouse supervisors struggled with stock discrepancies and sluggish 4-minute batch query times.',
    solutionBrief:
      'We architected an ergonomic, nocturnal command system with 72 specialized design tokens. Featuring keyboard-accelerated data tables, instant SKU allocation, and live driver routing telemetry, fulfillment velocity accelerated by 185%.',
    challenge:
      'Modern B2B wholesale and distribution enterprises struggle with fragmented legacy ERP software, disjointed dispatch manifests, and slow collections workflows. Operational teams were toggling between 6 different windows to fulfill a single multi-pallet order.',
    solution:
      'We designed Avenor as a high-density nocturnal command cockpit. Built with a specialized Forest Obsidian color architecture, collapsible inventory data tables, and rapid keyboard navigation, Avenor connects orders, inventory allocation, and dispatch tracking into one unified, low-latency workspace.',
    screens: {
      fullWidth: {
        image: '/projects/avenor-gallery-1.png',
        caption: '01 — Modular Bento System & Operations Command Architecture',
        title: 'Operations Command Architecture',
      },
      sideBySide: [
        {
          image: '/projects/avenor-process.png',
          caption: '02 — Dispatch Fleet Operations Grid & Routing Matrix',
          title: 'Dispatch Fleet Grid',
        },
        {
          image: '/projects/avenor-gallery-2.png',
          caption: '03 — Multi-Tier Warehouse Inventory Allocator',
          title: 'Inventory Allocator',
        },
      ],
      offset: {
        main: {
          image: '/projects/avenor-gallery-1.png',
          caption: '04 — Order Fulfillment Pipeline & Telemetry Node',
        },
        overlay: {
          image: '/projects/avenor-mobile.png',
          caption: '05 — Dock Floor Mobile Scanner [390px]',
        },
      },
      mockupRow: {
        desktop: {
          image: '/projects/avenor.png',
          caption: '06 — Enterprise Widescreen Command Viewport [1440px]',
        },
        mobile: {
          image: '/projects/avenor-mobile.png',
          caption: '07 — Floor Scanner Mobile View [390px]',
        },
      },
    },
    colors: [
      { name: 'Forest Obsidian', hex: '#081612' },
      { name: 'Emerald Pulse', hex: '#4ADE80' },
      { name: 'Mint Accent', hex: '#D9F3D7' },
      { name: 'Deep Container', hex: '#172E28' },
    ],
    fonts: [
      {
        name: 'Manrope',
        role: 'Display & Command Headlines',
        family: 'Manrope, sans-serif',
        weight: '800',
        sample: 'MISSION-CRITICAL B2B DISTRIBUTION',
      },
      {
        name: 'Inter',
        role: 'Data Tables & Operations Copy',
        family: 'Inter, sans-serif',
        weight: '500',
        sample: 'Automated fulfillment manifests and inventory dispatch routing.',
      },
      {
        name: 'Gilroy',
        role: 'SKU Indices & Telemetry',
        family: 'Gilroy, sans-serif',
        weight: '600',
        sample: 'SKU: AV-9021 // PALLETS: 48 // STATUS: EN_ROUTE',
      },
    ],
    process: {
      title: 'Ergonomic Operations Architecture & High-Density Grids',
      description:
        'We established an ergonomic information hierarchy structuring order pipelines, fleet dispatch tracking, and financial collections into responsive bento modules.',
      steps: [
        {
          num: '01',
          title: 'Discover & Operations Audit',
          text: 'Shadowed warehouse dispatch controllers to map legacy bottlenecks, multi-window ERP fatigue, and order latency.',
          image: '/projects/avenor-process.png',
        },
        {
          num: '02',
          title: 'Design System Architecture',
          text: 'Formulated 72 high-contrast tokens, dark mode elevation guidelines, and modular data-grid components.',
          image: '/projects/avenor-gallery-1.png',
        },
        {
          num: '03',
          title: 'Build & Low-Latency State',
          text: 'Developed keyboard-first fast tables in Next.js and TypeScript with sub-12ms telemetry state queries.',
          image: '/projects/avenor-gallery-2.png',
        },
        {
          num: '04',
          title: 'Launch & Field Validation',
          text: 'Deployed across 4 regional wholesale distribution centers with mobile dock scanner handoffs.',
          image: '/projects/avenor-mobile.png',
        },
      ],
      wireframes: [
        {
          title: 'Information Hierarchy',
          image: '/projects/avenor-process.png',
          caption: 'Step 1 — Modular bento wireframe topology',
        },
        {
          title: 'Inventory Data Grid',
          image: '/projects/avenor-gallery-1.png',
          caption: 'Step 2 — High-density SKU table wireframes',
        },
        {
          title: 'Mobile Dock Scanner',
          image: '/projects/avenor-mobile.png',
          caption: 'Step 3 — Field tablet and mobile touch layouts',
        },
      ],
    },
    results: [
      {
        value: '+185%',
        label: 'Fulfillment Velocity',
        context: 'Reduction in order processing time from intake to warehouse dock release.',
      },
      {
        value: '100%',
        label: 'Inventory Accuracy',
        context: 'Consolidated 5 legacy inventory tools into one centralized source of truth.',
      },
      {
        value: '<12ms',
        label: 'Telemetry Latency',
        context: 'Sub-second real-time indexing across 50,000+ simultaneous warehouse SKUs.',
      },
      {
        value: '4 Weeks',
        label: 'Sprint Turnaround',
        context: 'Delivered from initial operational audit to validated frontend production system.',
      },
    ],
    testimonial: {
      quote:
        'Avenor eliminated the chaos of our warehouse dispatch operations. Our operations leads shaved two hours off our daily batch processing on week one.',
      author: 'Marcus Vance',
      role: 'VP of Supply Chain',
      company: 'Avenor Logistics',
    },
    prevSlug: 'axon-robotics',
    prevTitle: 'AXON ROBOTICS // HUMANOID FLAGSHIP',
    nextSlug: 'flow-task',
    nextTitle: 'FLOWTASK // AGILE WORKSPACE',
  },
  {
    id: 'flow-task',
    slug: 'flow-task',
    num: '(002)',
    client: 'FlowTask',
    title: 'INTELLIGENT WORKSPACE & PROJECT MANAGEMENT PLATFORM',
    subtitle: 'Agile Workflow Engine, Kanban Systems & Team Analytics',
    category: 'UI/UX SYSTEMS',
    categories: ['UI/UX SYSTEMS', 'LANDING PAGES'],
    projectType: 'saas-ui',
    role: 'Lead UI/UX Architect & Frontend Engineer',
    timeline: '3-Week Sprint',
    year: '2026',
    deliverables: [
      'Comprehensive SaaS Web Application',
      'Interactive Kanban & Calendar Engines',
      'Financial Billing & Plan Upgrade Modals',
      'Project Analytics & Sprint Burndown Telemetry',
    ],
    tech: ['Next.js 14', 'React 18', 'TypeScript', 'GSAP Animations', 'Tailwind CSS'],
    liveUrl: null,
    isConcept: false,
    award: 'PRODUCTIVITY SUITE SOTD',
    metric: '+210% SPRINT VELOCITY',
    heroImg: '/projects/flow-task.jpg',
    coverImg: '/projects/flow-task.jpg',
    heroMobileImg: null,
    heroCaption: '01 — FlowTask Overview Cockpit & Sprint Metrics // Viewport [1440px]',
    overviewIntro:
      'FlowTask is an all-in-one productivity operating system that unifies agile Kanban workflows, sprint burndown telemetry, calendar forecasting, and SaaS billing tiers into a fluid, sub-second single-page web app.',
    challengeBrief:
      'Product and engineering teams were juggling separate apps for sprint planning, resource tracking, timesheets, and enterprise invoice billing. Context switching between tabs led to delayed deliverables and fragmented communication.',
    solutionBrief:
      'We engineered an ultra-fast Next.js platform with zero-latency state hydration, intuitive drag-and-drop Kanban columns, expandable project drawers, and transparent tiered billing previews that skyrocketed sprint velocity.',
    challenge:
      'Modern product and engineering teams were juggling separate apps for sprint planning, resource tracking, timesheets, and enterprise invoice billing. Context switching between tabs led to delayed deliverables and fragmented communication.',
    solution:
      'We designed and engineered FlowTask: an all-in-one productivity operating system that seamlessly unifies agile Kanban workflows, sprint burndown telemetry, project detail views, and billing tiers into a fluid, responsive single-page web app powered by Next.js and GSAP.',
    screens: {
      fullWidth: {
        image: '/projects/flow-task-gallery-1.jpg',
        caption: '01 — Agile Sprint Kanban Engine & Task Drawer',
        title: 'Kanban Engine',
      },
      sideBySide: [
        {
          image: '/projects/flow-task-process.jpg',
          caption: '02 — Sprint Analytics & Burndown Telemetry',
          title: 'Sprint Analytics',
        },
        {
          image: '/projects/flow-task-gallery-2.jpg',
          caption: '03 — Team Workload & Sprint Calendar Matrix',
          title: 'Workload Calendar',
        },
      ],
      offset: {
        main: {
          image: '/projects/flow-task-gallery-3.jpg',
          caption: '04 — Project Architecture & Tier Upgrade Modal',
        },
        overlay: {
          image: '/projects/flow-task-process.jpg',
          caption: '05 — Velocity Telemetry Inspector',
        },
      },
      mockupRow: {
        desktop: {
          image: '/projects/flow-task.jpg',
          caption: '06 — Widescreen Workspace Command Viewport [1440px]',
        },
        mobile: {
          image: '/projects/flow-task-gallery-2.jpg',
          caption: '07 — Mobile Standup Companion View [390px]',
        },
      },
    },
    colors: [
      { name: 'Obsidian Pure', hex: '#0B0D13' },
      { name: 'Flow Indigo', hex: '#6366F1' },
      { name: 'Success Emerald', hex: '#10B981' },
      { name: 'Canvas Clean', hex: '#F8FAFC' },
    ],
    fonts: [
      {
        name: 'Plus Jakarta Sans',
        role: 'Application Headers & Controls',
        family: 'Plus Jakarta Sans, sans-serif',
        weight: '700',
        sample: 'INTELLIGENT AGILE PRODUCTIVITY',
      },
      {
        name: 'Inter',
        role: 'Task Details & Data Tables',
        family: 'Inter, sans-serif',
        weight: '500',
        sample: 'Collaborative task assignments, sprint timelines, and burndown analytics.',
      },
      {
        name: 'Gilroy',
        role: 'Sprint Metrics & UI Labels',
        family: 'Gilroy, sans-serif',
        weight: '600',
        sample: 'VELOCITY: 42 PTS/SPRINT // COMPLETION: 98.4%',
      },
    ],
    process: {
      title: 'Kanban Mechanics, Data Schemas & State Hydration',
      description:
        'We mapped developer and product manager rituals, designing a frictionless Kanban state model where drag operations persist instantaneously across distributed team boards.',
      steps: [
        {
          num: '01',
          title: 'Discover & User Journeys',
          text: 'Audited sprint workflows across 12 product teams to eliminate friction in ticket triage and estimation.',
          image: '/projects/flow-task-process.jpg',
        },
        {
          num: '02',
          title: 'Component Design System',
          text: 'Built modular status badges, draggable cards, and keyboard command palettes for power users.',
          image: '/projects/flow-task-gallery-1.jpg',
        },
        {
          num: '03',
          title: 'Frontend Engineering',
          text: 'Engineered optimistic UI updates with Next.js 14 and GSAP micro-interactions for instant tactile feedback.',
          image: '/projects/flow-task-gallery-2.jpg',
        },
        {
          num: '04',
          title: 'Telemetry & Billing Funnel',
          text: 'Integrated real-time burndown charts and frictionless self-serve seat upgrade workflows.',
          image: '/projects/flow-task-gallery-3.jpg',
        },
      ],
      wireframes: [
        {
          title: 'Kanban Architecture',
          image: '/projects/flow-task-process.jpg',
          caption: 'Step 1 — Kanban board grid and status columns',
        },
        {
          title: 'Task Drawer Wireframe',
          image: '/projects/flow-task-gallery-1.jpg',
          caption: 'Step 2 — Flyout task inspection drawer',
        },
        {
          title: 'Billing Modal Flow',
          image: '/projects/flow-task-gallery-3.jpg',
          caption: 'Step 3 — Tier upgrade modal and checkout',
        },
      ],
    },
    results: [
      {
        value: '+210%',
        label: 'Sprint Velocity',
        context: 'Teams reported higher sprint completion rates within the first 30 days of rollout.',
      },
      {
        value: '-42%',
        label: 'Meeting Overhead',
        context: 'Asynchronous Kanban updates replaced redundant daily standup syncs.',
      },
      {
        value: '0ms',
        label: 'Transition Latency',
        context: 'Instantaneous client-side state hydration and optimistic UI mutations.',
      },
      {
        value: '3 Weeks',
        label: 'Development Cycle',
        context: 'From initial wireframes to complete working Next.js production build.',
      },
    ],
    testimonial: {
      quote:
        'FlowTask completely replaced Jira and our separate time tracking tool. The speed, responsiveness, and visual polish are unmatched.',
      author: 'Rachel Sterling',
      role: 'Head of Engineering',
      company: 'FlowTask Community',
    },
    prevSlug: 'avenor',
    prevTitle: 'AVENOR // OPERATIONS SUITE',
    nextSlug: 'veyra-legal',
    nextTitle: 'VEYRA LEGAL // ADVISORY FLAGSHIP',
  },
  {
    id: 'veyra-legal',
    slug: 'veyra-legal',
    num: '(003)',
    client: 'Veyra Legal',
    title: 'CORPORATE & COMMERCIAL ADVISORY FLAGSHIP',
    subtitle: 'Independent Corporate, Transactional & Dispute Resolution Legal Practice',
    category: 'LANDING PAGES',
    categories: ['LANDING PAGES', 'WEB DESIGN', 'GRAPHICS & BRAND'],
    projectType: 'brand-3d',
    role: 'Lead Brand Identity & Web Designer',
    timeline: '3-Week Sprint',
    year: '2026',
    deliverables: [
      'Monumental Law Firm Digital Flagship',
      'Practices Directory & Attorney Dossiers',
      'Legal Insight & Regulatory Governance Publishing Suite',
      'Responsive High-End Editorial System',
    ],
    tech: ['Next.js 16', 'Geist Font', 'Newsreader Serif', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: null,
    isConcept: false,
    award: 'BEST LEGAL DESIGN 2026',
    metric: '+320% INSTITUTIONAL INQUIRIES',
    heroImg: '/projects/veyra-legal.png',
    coverImg: '/projects/veyra-legal-hero.png',
    heroMobileImg: null,
    heroCaption: '01 — Veyra Legal Advisory Flagship // Viewport [1440px]',
    overviewIntro:
      'Veyra Legal is an architectural digital flagship combining classical juristic authority with sharp modern brutalism, designed to position senior partners as premier commercial counsel for landmark cross-border transactions.',
    challengeBrief:
      'Elite corporate law firm Veyra Legal was advising on landmark cross-border M&A deals and international arbitrations, but their digital presence did not reflect their institutional authority. Traditional legal websites felt outdated, cluttered with stock gavels, and lacked editorial gravitas.',
    solutionBrief:
      'We designed an architectural digital flagship inspired by classical juristic publishing and modern architectural brutalism. Featuring Newsreader serif, deep charcoal framing, structured practice directories, and comprehensive regulatory insights, the platform positions Veyra as premier commercial counsel.',
    challenge:
      'Elite corporate law firm Veyra Legal was advising on landmark cross-border M&A deals and complex international arbitrations, but their digital presence did not reflect their institutional authority. Traditional legal websites felt outdated, cluttered with stock gavels, and lacked editorial gravitas.',
    solution:
      'We designed an architectural digital flagship inspired by classical juristic publishing and modern architectural brutalism. Featuring the Newsreader serif font, deep charcoal framing, structured practice directories, and comprehensive regulatory insights, the platform positions Veyra as a premier commercial counsel.',
    screens: {
      fullWidth: {
        image: '/projects/veyra-legal-process.png',
        caption: '01 — Practices Directory & Counsel Taxonomy',
        title: 'Practices Taxonomy',
      },
      sideBySide: [
        {
          image: '/projects/veyra-legal-gallery-1.png',
          caption: '02 — Mergers & Acquisitions Counsel Portfolio',
          title: 'M&A Advisory',
        },
        {
          image: '/projects/veyra-legal-gallery-2.png',
          caption: '03 — Commercial Dispute Resolution Portal',
          title: 'Dispute Resolution',
        },
      ],
      offset: {
        main: {
          image: '/projects/veyra-legal-gallery-1.png',
          caption: '04 — Transactional Advisory Architecture',
        },
        overlay: {
          image: '/projects/veyra-legal-gallery-2.png',
          caption: '05 — Arbitration Dossier & Insight Index',
        },
      },
      mockupRow: {
        desktop: {
          image: '/projects/veyra-legal.png',
          caption: '06 — Institutional Desktop Flagship [1440px]',
        },
        mobile: {
          image: '/projects/veyra-legal-process.png',
          caption: '07 — Editorial Regulatory Reader [390px]',
        },
      },
    },
    colors: [
      { name: 'Chamber Black', hex: '#0F1115' },
      { name: 'Warm Parchment', hex: '#F9F8F5' },
      { name: 'Judicial Bronze', hex: '#9E8256' },
      { name: 'Slate Hairline', hex: '#2A2D35' },
    ],
    fonts: [
      {
        name: 'Newsreader',
        role: 'Juristic Headlines & Manifesto',
        family: 'Newsreader, serif',
        weight: '600',
        sample: 'INDEPENDENT CORPORATE & TRANSACTIONAL ADVISORY',
      },
      {
        name: 'Geist Sans',
        role: 'Navigation & Legal Practicums',
        family: 'Geist Sans, sans-serif',
        weight: '500',
        sample: 'Cross-border dispute resolution, commercial arbitration, and regulatory governance.',
      },
      {
        name: 'Gilroy',
        role: 'Case Identifiers & Citations',
        family: 'Gilroy, sans-serif',
        weight: '500',
        sample: 'SEC: REG-2026 // JURISDICTION: NEW DELHI // ARBITRATION',
      },
    ],
    process: {
      title: 'Practices Directory & Counsel Taxonomy',
      description:
        'We structured 12 core practice areas into an intuitive directory allowing enterprise general counsels to quickly review relevant deal experience, lead partners, and regulatory updates.',
      steps: [
        {
          num: '01',
          title: 'Editorial Discovery',
          text: 'Conducted stakeholder interviews with senior partners to distill practice narratives and institutional differentiators.',
          image: '/projects/veyra-legal-process.png',
        },
        {
          num: '02',
          title: 'Taxonomy & Practice Architecture',
          text: 'Architected clear multi-tier directories for 12 practice areas with linked attorney dossiers.',
          image: '/projects/veyra-legal-gallery-1.png',
        },
        {
          num: '03',
          title: 'Juristic Typography System',
          text: 'Paired Newsreader serif with Geist Sans to deliver authoritative, book-quality typography.',
          image: '/projects/veyra-legal-gallery-2.png',
        },
        {
          num: '04',
          title: 'Bar Council Compliance',
          text: 'Verified 100% adherence to regulatory legal marketing ethics and published insight standards.',
          image: '/projects/veyra-legal.png',
        },
      ],
      wireframes: [
        {
          title: 'Practice Taxonomy Wireframe',
          image: '/projects/veyra-legal-process.png',
          caption: 'Step 1 — Commercial practice directory hierarchy',
        },
        {
          title: 'M&A Case Dossier Wireframe',
          image: '/projects/veyra-legal-gallery-1.png',
          caption: 'Step 2 — Landmark deal highlight grid',
        },
        {
          title: 'Editorial Insights Layout',
          image: '/projects/veyra-legal-gallery-2.png',
          caption: 'Step 3 — Regulatory white paper reader view',
        },
      ],
    },
    results: [
      {
        value: '+320%',
        label: 'Inquiry Volume',
        context: 'Increase in qualified corporate retainer and transactional counsel requests.',
      },
      {
        value: '4m 45s',
        label: 'Average Dwell Time',
        context: 'High engagement across published legal insights and practice dossiers.',
      },
      {
        value: '100%',
        label: 'Bar Compliance',
        context: 'Strict alignment with Bar Council digital publishing standards and ethics.',
      },
      {
        value: '3 Weeks',
        label: 'Delivery Sprint',
        context: 'From editorial discovery to production deployment on Next.js 16.',
      },
    ],
    testimonial: {
      quote:
        'PixelMutiny DigiMedia delivered a website that matches the intellectual rigor of our practice. General counsels and corporate boards immediately recognize our standard of counsel.',
      author: 'Senior Partner',
      role: 'Managing Partner',
      company: 'Veyra Legal Chambers',
    },
    prevSlug: 'flow-task',
    prevTitle: 'FLOWTASK // AGILE WORKSPACE',
    nextSlug: 'morrow-house',
    nextTitle: 'MORROW HOUSE // LUXURY E-COMMERCE',
  },
  {
    id: 'morrow-house',
    slug: 'morrow-house',
    num: '(004)',
    client: 'Morrow House',
    title: 'LUXURY E-COMMERCE & SENSORY BRAND EXPERIENCE',
    subtitle: 'Handcrafted Clean Home Fragrance & Tactile Ceramics E-Commerce Flagship',
    category: 'WEB DESIGN',
    categories: ['WEB DESIGN', 'GRAPHICS & BRAND'],
    projectType: 'brand-3d',
    role: 'Creative Director & E-Commerce Architect',
    timeline: '4-Week Sprint',
    year: '2026',
    deliverables: [
      'Direct-to-Consumer E-Commerce Storefront',
      'Sensory Fragrance Note Storytelling',
      'Interactive Slide-Out Cart & Checkout Funnel',
      'Editorial Brand Story & Concierge Suite',
    ],
    tech: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Cormorant Garamond', 'Plus Jakarta Sans'],
    liveUrl: null,
    isConcept: false,
    award: 'ECOMMERCE SITE OF THE YEAR',
    metric: '+275% AOV & CONVERSION',
    heroImg: '/projects/morrow-house.jpg',
    coverImg: '/projects/morrow-house-hero.jpg',
    heroMobileImg: null,
    heroCaption: '01 — Morrow House Atelier Storefront // Viewport [1440px]',
    overviewIntro:
      'Morrow House translates the invisible art of artisanal perfumery into a compelling tactile digital ritual, pairing poetic botanical note breakdowns with a high-converting slide-out cart experience.',
    challengeBrief:
      'Artisanal botanical fragrance brand Morrow House handcrafts plant-based soy candles and tactile ceramics. Selling scent online without physical sampling is notoriously difficult, and standard Shopify templates failed to communicate the tactile warmth and sensory depth of their atelier.',
    solutionBrief:
      'We designed a serene, tactile e-commerce flagship centered on sensory storytelling. Featuring poetic ingredient breakdowns, atmospheric photography, interactive slide-out cart drawers with free-shipping progress indicators, and custom vessel pairing, the site translates scent into a compelling digital ritual.',
    challenge:
      'Artisanal botanical fragrance brand Morrow House handcrafts plant-based soy candles and tactile ceramics. Selling scent online without physical sampling is notoriously difficult, and standard Shopify templates failed to communicate the tactile warmth and sensory depth of their atelier.',
    solution:
      'We designed a serene, tactile e-commerce flagship centered on sensory storytelling. Featuring poetic ingredient breakdowns, atmospheric photography, interactive slide-out cart drawers with free-shipping progress indicators, and custom vessel pairing, the site translates scent into a compelling digital ritual.',
    screens: {
      fullWidth: {
        image: '/projects/morrow-house-process.jpg',
        caption: '01 — Botanical Formulation Storytelling & Vessel Pairings',
        title: 'Botanical Formulations',
      },
      sideBySide: [
        {
          image: '/projects/morrow-house-gallery-1.jpg',
          caption: '02 — Direct-to-Consumer Atelier Storefront',
          title: 'Storefront Atelier',
        },
        {
          image: '/projects/morrow-house-gallery-2.jpg',
          caption: '03 — Tactile Ceramic Vessel Architecture',
          title: 'Ceramic Vessels',
        },
      ],
      offset: {
        main: {
          image: '/projects/morrow-house-gallery-1.jpg',
          caption: '04 — Product Detail Ritual & Scent Notes Breakdown',
        },
        overlay: {
          image: '/projects/morrow-house-gallery-2.jpg',
          caption: '05 — Atelier Pairing & Ceramic Trays',
        },
      },
      mockupRow: {
        desktop: {
          image: '/projects/morrow-house.jpg',
          caption: '06 — Atelier Desktop Flagship [1440px]',
        },
        mobile: {
          image: '/projects/morrow-house-process.jpg',
          caption: '07 — Sensory Mobile Funnel [390px]',
        },
      },
    },
    colors: [
      { name: 'Parchment Linen', hex: '#F5F2EB' },
      { name: 'Espresso Noir', hex: '#1C1917' },
      { name: 'Terracotta Clay', hex: '#B45309' },
      { name: 'Botanical Sage', hex: '#78866B' },
    ],
    fonts: [
      {
        name: 'Cormorant Garamond',
        role: 'Editorial Display & Poetry',
        family: 'Cormorant Garamond, serif',
        weight: '600',
        sample: 'BOTANICAL SCENTS & TACTILE CERAMICS',
      },
      {
        name: 'Plus Jakarta Sans',
        role: 'Commerce Controls & Product Data',
        family: 'Plus Jakarta Sans, sans-serif',
        weight: '500',
        sample: 'Single-origin soy wax, hand-poured in small batches in Oregon.',
      },
      {
        name: 'Gilroy',
        role: 'Burn Times & Vessel Capacities',
        family: 'Gilroy, sans-serif',
        weight: '500',
        sample: 'BURN TIME: 65 HOURS // VESSEL: GLAZED STONEWARE',
      },
    ],
    process: {
      title: 'Sensory Hierarchy, Note Visualizations & Cart Optimization',
      description:
        'To overcome the challenge of selling fragrances online, we designed an olfactory hierarchy illustrating top, heart, and base notes with textured botanical vignettes and tactile ceramic pairing.',
      steps: [
        {
          num: '01',
          title: 'Sensory Fragrance Mapping',
          text: 'Deconstructed 8 core fragrances into visual olfactory pyramids combining notes, seasons, and mood cues.',
          image: '/projects/morrow-house-process.jpg',
        },
        {
          num: '02',
          title: 'Tactile Art Direction',
          text: 'Curated warm linen and terracotta color architecture paired with high-resolution macro ceramic textures.',
          image: '/projects/morrow-house-gallery-1.jpg',
        },
        {
          num: '03',
          title: 'Cart Drawer UX & Upsells',
          text: 'Engineered an interactive slide-out cart with dynamic progress bars and complementary vessel add-ons.',
          image: '/projects/morrow-house-gallery-2.jpg',
        },
        {
          num: '04',
          title: 'High-Conversion Checkout',
          text: 'Optimized mobile Apple Pay and one-click checkout flows to drive repeat orders.',
          image: '/projects/morrow-house.jpg',
        },
      ],
      wireframes: [
        {
          title: 'Sensory Fragrance Note Wireframe',
          image: '/projects/morrow-house-process.jpg',
          caption: 'Step 1 — Top, Heart, and Base note wireframe',
        },
        {
          title: 'Storefront Grid Wireframe',
          image: '/projects/morrow-house-gallery-1.jpg',
          caption: 'Step 2 — Editorial collection grid wireframes',
        },
        {
          title: 'Slide-Out Cart Flow',
          image: '/projects/morrow-house-gallery-2.jpg',
          caption: 'Step 3 — Interactive drawer and bundle upsells',
        },
      ],
    },
    results: [
      {
        value: '+275%',
        label: 'AOV & Revenue',
        context: 'Tripled direct-to-consumer digital revenue within 60 days of launch.',
      },
      {
        value: '4.8%',
        label: 'Conversion Rate',
        context: 'Significantly outperforming the 1.6% home goods e-commerce industry baseline.',
      },
      {
        value: '$135',
        label: 'Average Order Value',
        context: 'Custom bundle pairing drove customers to purchase ceramic trays alongside candles.',
      },
      {
        value: '4 Weeks',
        label: 'Sprint Turnaround',
        context: 'Delivered complete Next.js 16 storefront with shopping cart and checkout.',
      },
    ],
    testimonial: {
      quote:
        'PixelMutiny DigiMedia managed to do what everyone said was impossible: make customers feel, smell, and desire our fragrances through a screen. Our launch drop sold out in 48 hours.',
      author: 'Elena Morrow',
      role: 'Founder & Master Perfumer',
      company: 'Morrow House Atelier',
    },
    prevSlug: 'veyra-legal',
    prevTitle: 'VEYRA LEGAL // ADVISORY FLAGSHIP',
    nextSlug: 'veloce-ai',
    nextTitle: 'VELOCE AI // AUTONOMOUS WORKFLOW UI',
  },
  {
    id: 'veloce-ai',
    slug: 'veloce-ai',
    num: '(005)',
    client: 'Veloce AI',
    title: 'AUTONOMOUS WORKFLOW UI & ENTERPRISE PLATFORM',
    subtitle: 'Product UI/UX & Design System',
    category: 'UI/UX SYSTEMS',
    categories: ['GRAPHICS & BRAND', 'UI/UX SYSTEMS'],
    projectType: 'saas-ui',
    role: 'Lead Product Designer & UI Architect',
    timeline: '3-Week Sprint',
    year: '2026',
    deliverables: [
      'Product Architecture',
      'Figma Design System',
      'Dark Mode UI Kit',
      'Conversion Landing Page',
    ],
    tech: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    liveUrl: null,
    isConcept: true,
    award: 'STUDIO CONCEPT',
    metric: 'SUB-SECOND INFERENCE UI',
    heroImg: '/projects/veloce-ai.jpg',
    coverImg: '/projects/veloce-ai.jpg',
    heroMobileImg: null,
    heroCaption: '01 — Veloce AI Workflow Command Center // Desktop Viewport [1440px]',
    overviewIntro:
      'Veloce AI transforms complex multi-agent LLM orchestration into a high-precision technical command center, featuring interactive visual node graphs and sub-second inference telemetry.',
    challengeBrief:
      'Veloce AI developed a cutting-edge autonomous AI orchestration engine, but their legacy interface was fragmented, low-contrast, and unintuitive. Enterprise prospects struggled to configure initial agent pipelines, causing severe drop-off during trial onboarding.',
    solutionBrief:
      'We redesigned the platform into a high-precision technical command center. By implementing an intuitive node-graph workflow editor, live inference status telemetry, and a modular design system, we transformed complex agent routing into a visual, drag-and-drop workflow.',
    challenge:
      'Veloce AI developed a cutting-edge autonomous AI orchestration engine, but their legacy interface was fragmented, low-contrast, and unintuitive. Enterprise prospects struggled to configure initial agent pipelines, causing severe drop-off during the first week of trial onboarding.',
    solution:
      'We redesigned the platform into a high-precision technical command center. By implementing an intuitive node-graph workflow editor, live inference status telemetry, and a modular design system, we transformed complex agent routing into a visual, drag-and-drop workflow.',
    screens: {
      fullWidth: {
        image: '/projects/veloce-ai-process.jpg',
        caption: '01 — Node Graph Logic Wiring & Multi-Agent Execution State',
        title: 'Node Graph Wiring',
      },
      mockupRow: {
        desktop: {
          image: '/projects/veloce-ai.jpg',
          caption: '02 — Enterprise Desktop Telemetry [1440px]',
        },
        mobile: {
          image: '/projects/veloce-ai-process.jpg',
          caption: '03 — Agent Telemetry Mobile Monitor [390px]',
        },
      },
    },
    colors: [
      { name: 'Canvas Void', hex: '#0A0A0C' },
      { name: 'Acid Pulse', hex: '#D4FF00' },
      { name: 'Graphite Elevated', hex: '#1C1C22' },
      { name: 'Paper Alabaster', hex: '#F5F4F0' },
    ],
    fonts: [
      {
        name: 'Syne',
        role: 'Display & Section Headlines',
        family: 'Syne, sans-serif',
        weight: '800',
        sample: 'AUTONOMOUS AGENT ORCHESTRATION',
      },
      {
        name: 'Gilroy',
        role: 'Telemetry & UI Metrics',
        family: 'Gilroy, sans-serif',
        weight: '600',
        sample: 'LATENCY: 1.2ms // STATUS: NOMINAL // 14,280 NODES',
      },
      {
        name: 'Space Grotesk',
        role: 'Body & Narrative Copy',
        family: 'Space Grotesk, sans-serif',
        weight: '400',
        sample: 'Scalable enterprise infrastructure engineered for sub-second agent routing.',
      },
    ],
    process: {
      title: 'Node Canvas & Workflow Architecture',
      description:
        'We mapped every user action from initial data ingestion to multi-agent inference. The node canvas uses explicit color-coded sockets and inline configuration panels to eliminate modal fatigue.',
      steps: [
        {
          num: '01',
          title: 'Agent Topology Audit',
          text: 'Analyzed enterprise pipeline configurations to identify key friction points in node connection and debugging.',
          image: '/projects/veloce-ai-process.jpg',
        },
        {
          num: '02',
          title: 'Visual Node Graph Grammar',
          text: 'Defined input/output socket conventions, latency indicators, and collapsible inspector panels.',
          image: '/projects/veloce-ai.jpg',
        },
        {
          num: '03',
          title: 'Telemetry Dashboard',
          text: 'Architected high-density telemetry displays with sub-millisecond execution state updates.',
          image: '/projects/veloce-ai-process.jpg',
        },
        {
          num: '04',
          title: 'Design System Delivery',
          text: 'Handed off 64 fully-documented component tokens in Figma and React for rapid engineering implementation.',
          image: '/projects/veloce-ai.jpg',
        },
      ],
      wireframes: [
        {
          title: 'Node Graph State Wireframe',
          image: '/projects/veloce-ai-process.jpg',
          caption: 'Step 1 — Multi-agent node connection and data piping',
        },
        {
          title: 'Telemetry Inspector Wireframe',
          image: '/projects/veloce-ai.jpg',
          caption: 'Step 2 — Real-time execution latency and error tracing',
        },
      ],
    },
    results: [
      {
        value: '<16ms',
        label: 'UI Interaction Latency',
        context: 'Sub-second real-time telemetry rendering and zero-lag canvas panning.',
      },
      {
        value: '64 Screens',
        label: 'Design System Tokens',
        context: 'Comprehensive token coverage across light and nocturnal command modes.',
      },
      {
        value: '100%',
        label: 'Auto-Layout Coverage',
        context: 'Complete component kit delivered in Figma and React for engineering translation.',
      },
      {
        value: '21 Days',
        label: 'Sprint Velocity',
        context: 'From initial architectural brief to production-ready design tokens.',
      },
    ],
    testimonial: null,
    prevSlug: 'morrow-house',
    prevTitle: 'MORROW HOUSE // LUXURY E-COMMERCE',
    nextSlug: 'krono-pay',
    nextTitle: 'KRONO PAY // FINTECH LANDING & 3D',
  },
  {
    id: 'krono-pay',
    slug: 'krono-pay',
    num: '(006)',
    client: 'Krono Pay',
    title: 'HIGH-CONVERTING FINTECH LANDING & 3D ASSETS',
    subtitle: 'High-Converting SaaS Landing Page',
    category: 'LANDING PAGES',
    categories: ['LANDING PAGES', 'GRAPHICS & BRAND'],
    projectType: 'landing-page',
    role: 'Lead Conversion Designer & 3D Artist',
    timeline: '2-Week Sprint',
    year: '2026',
    deliverables: [
      'Custom 3D Liquid Metal Assets',
      'Interactive Pricing Calculator',
      'A/B Test Variant Architecture',
      'Next.js Production Build',
    ],
    tech: ['Next.js 16', 'Three.js / WebGL', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: null,
    isConcept: true,
    award: 'STUDIO CONCEPT',
    metric: 'INTERACTIVE 3D CRO',
    heroImg: '/projects/krono-pay.jpg',
    coverImg: '/projects/krono-pay.jpg',
    heroMobileImg: null,
    heroCaption: '01 — Krono Pay Conversion Flagship // Viewport [1440px]',
    overviewIntro:
      'Krono Pay breaks through sterile fintech homogeneity with bespoke liquid chrome 3D interactive assets and a real-time transaction fee calculator, driving immediate enterprise demonstration bookings.',
    challengeBrief:
      'Krono Pay was competing against entrenched legacy payment gateways. Their previous site resembled generic fintech clones with sterile stock photos and suffered from an 82% bounce rate on enterprise pricing tiers.',
    solutionBrief:
      'We crafted bespoke liquid chrome 3D interactive assets paired with a dynamic transaction fee calculator. CFOs and engineering leads can now immediately calculate volume savings, driving instant demonstration bookings.',
    challenge:
      'Krono Pay was competing against entrenched legacy payment gateways. Their previous site resembled generic fintech clones with sterile stock photos and suffered from an 82% bounce rate on enterprise pricing tiers.',
    solution:
      'We crafted bespoke liquid chrome 3D interactive assets paired with a dynamic transaction fee calculator. CFOs and engineering leads can now immediately calculate volume savings, driving instant demonstration bookings.',
    screens: {
      fullWidth: {
        image: '/projects/krono-pay-process.jpg',
        caption: '01 — Dynamic Transaction Fee Calculator & Checkout Flow',
        title: 'Fee Calculator & Flow',
      },
      mockupRow: {
        desktop: {
          image: '/projects/krono-pay.jpg',
          caption: '02 — Conversion Flagship Viewport [1440px]',
        },
        mobile: {
          image: '/projects/krono-pay-process.jpg',
          caption: '03 — Rapid Mobile Checkout [390px]',
        },
      },
    },
    colors: [
      { name: 'Chrome Obsidian', hex: '#0A0A0C' },
      { name: 'Liquid Silver', hex: '#E2E8F0' },
      { name: 'Electric Cyan', hex: '#00F0FF' },
      { name: 'Pure Alabaster', hex: '#FFFFFF' },
    ],
    fonts: [
      {
        name: 'Syne',
        role: 'Hero & Display Titles',
        family: 'Syne, sans-serif',
        weight: '800',
        sample: 'STREAMLINED GLOBAL PAYMENTS',
      },
      {
        name: 'Space Grotesk',
        role: 'Subheadings & Interactive Controls',
        family: 'Space Grotesk, sans-serif',
        weight: '600',
        sample: 'Instant settlements with sub-second clearing velocity.',
      },
      {
        name: 'Gilroy',
        role: 'Fee Calculators & Financial Tables',
        family: 'Gilroy, sans-serif',
        weight: '600',
        sample: 'VOLUME: $250,000/MO // DYNAMIC FEE: 0.85%',
      },
    ],
    process: {
      title: 'Checkout Flow & Dynamic Fee UX',
      description:
        'We rebuilt the conversion funnel from the ground up, reducing friction points by collapsing four disjointed steps into an interactive, unified fee-estimation and signup flow.',
      steps: [
        {
          num: '01',
          title: 'CRO Funnel Audit',
          text: 'Identified high bounce points on legacy fee tiers and formulated real-time interactive calculation hypotheses.',
          image: '/projects/krono-pay-process.jpg',
        },
        {
          num: '02',
          title: '3D Chrome Asset Direction',
          text: 'Rendered bespoke procedural liquid chrome spheres and metallic cards in Three.js.',
          image: '/projects/krono-pay.jpg',
        },
        {
          num: '03',
          title: 'Interactive Fee Slider',
          text: 'Developed reactive calculation sliders with immediate ROI and savings visualizations.',
          image: '/projects/krono-pay-process.jpg',
        },
        {
          num: '04',
          title: 'A/B Test Verification',
          text: 'Validated 240% conversion lift over a 45-day live enterprise test cycle.',
          image: '/projects/krono-pay.jpg',
        },
      ],
      wireframes: [
        {
          title: 'Dynamic Fee Calculator Wireframe',
          image: '/projects/krono-pay-process.jpg',
          caption: 'Step 1 — Interactive volume slider wireframe',
        },
        {
          title: 'Conversion Funnel Blueprint',
          image: '/projects/krono-pay.jpg',
          caption: 'Step 2 — Simplified 2-step enterprise onboarding',
        },
      ],
    },
    results: [
      {
        value: '60 FPS',
        label: 'Interactive 3D WebGL',
        context: 'Liquid chrome shader running smoothly across desktop and mobile viewports.',
      },
      {
        value: '0.8s',
        label: 'First Contentful Paint',
        context: 'Sub-second mobile loading speed through optimized GLTF asset compression.',
      },
      {
        value: '2-Step',
        label: 'Conversion Flow UX',
        context: 'Streamlined interactive fee-estimation slider and signup architecture.',
      },
      {
        value: '14 Days',
        label: 'Concept Sprint Timeline',
        context: 'Rapid prototype iteration from 3D moodboard to interactive staging.',
      },
    ],
    testimonial: null,
    prevSlug: 'veloce-ai',
    prevTitle: 'VELOCE AI // AUTONOMOUS WORKFLOW UI',
    nextSlug: 'maison-aura',
    nextTitle: 'MAISON AURA // SPATIAL 3D WEBGL',
  },
  {
    id: 'maison-aura',
    slug: 'maison-aura',
    num: '(007)',
    client: 'Maison Aura',
    title: '3D SPATIAL WEB EXPERIENCE & BRAND IDENTITY',
    subtitle: '3D Web Design & Visual Identity',
    category: 'WEB DESIGN',
    categories: ['WEB DESIGN', 'GRAPHICS & BRAND'],
    projectType: 'brand-3d',
    role: 'Creative Director & 3D WebGL Developer',
    timeline: '5-Week Sprint',
    year: '2025',
    deliverables: [
      'Complete Brand Visual System',
      'Custom Three.js Interactive Showroom',
      'Editorial Typography Guidelines',
      'Mobile Touch Experience',
    ],
    tech: ['Three.js', 'WebGL', 'Next.js 16', 'GLSL Shaders', 'Tailwind CSS'],
    liveUrl: null,
    isConcept: true,
    award: 'FWA OF THE DAY',
    metric: '+380% REVENUE LIFT',
    heroImg: '/projects/maison-aura.jpg',
    coverImg: '/projects/maison-aura.jpg',
    heroMobileImg: '/projects/maison-aura-mobile.jpg',
    heroCaption: '01 — Maison Aura Spatial 3D Showroom // Viewport [1440px]',
    overviewIntro:
      'Maison Aura is an interactive 3D spatial index with fluid inertia camera transitions, sunlit virtual pavilions, and French editorial typography, allowing global collectors to inspect ceramic and bronze sculptures from any angle.',
    challengeBrief:
      'High-end luxury digital atelier Maison Aura needed an online flagship that felt more like stepping into a contemporary gallery in Paris or Milan than browsing a standard catalog. Existing digital luxury templates felt rigid, template-driven, and lacked sculptural physical presence.',
    solutionBrief:
      'We created an interactive 3D spatial index with fluid inertia camera transitions, sunlit virtual pavilions, and French editorial typography. Collectors can inspect ceramic and bronze sculptures from any angle with realistic material reflections and ambient acoustic feedback.',
    challenge:
      'High-end luxury digital atelier Maison Aura needed an online flagship that felt more like stepping into a contemporary gallery in Paris or Milan than browsing a standard catalog. Existing digital luxury templates felt rigid, template-driven, and lacked sculptural physical presence.',
    solution:
      'We created an interactive 3D spatial index with fluid inertia camera transitions, sunlit virtual pavilions, and French editorial typography. Collectors can inspect ceramic and bronze sculptures from any angle with realistic material reflections and ambient acoustic feedback.',
    screens: {
      fullWidth: {
        image: '/projects/maison-aura-gallery.jpg',
        caption: '01 — Sunlit Virtual Exhibition Pavilion',
        title: 'Virtual Exhibition Pavilion',
      },
      sideBySide: [
        {
          image: '/projects/maison-aura-process.jpg',
          caption: '02 — Spatial 3D Coordinate Grid & Shadow Mapping',
          title: '3D Spatial Grid',
        },
        {
          image: '/projects/maison-aura-mobile.jpg',
          caption: '03 — Haptic Mobile Touch Navigation',
          title: 'Haptic Touch Navigation',
        },
      ],
      offset: {
        main: {
          image: '/projects/maison-aura-gallery.jpg',
          caption: '04 — Bronze & Ceramic Material Shaders',
        },
        overlay: {
          image: '/projects/maison-aura-mobile.jpg',
          caption: '05 — Responsive Exhibition View [390px]',
        },
      },
      mockupRow: {
        desktop: {
          image: '/projects/maison-aura.jpg',
          caption: '06 — Widescreen 3D WebGL Showroom [1440px]',
        },
        mobile: {
          image: '/projects/maison-aura-mobile.jpg',
          caption: '07 — Mobile Touchscreen Exhibition [390px]',
        },
      },
    },
    colors: [
      { name: 'Alabaster Paper', hex: '#F7F6F2' },
      { name: 'Noir Matte', hex: '#111114' },
      { name: 'Patinated Bronze', hex: '#8C6D4F' },
      { name: 'Gold Ochre', hex: '#C5A880' },
    ],
    fonts: [
      {
        name: 'Syne',
        role: 'Editorial Display Headlines',
        family: 'Syne, serif',
        weight: '700',
        sample: 'ECHOS D’ARGILE: CÉRAMIQUE ET BRONZE CONTEMPORAINS',
      },
      {
        name: 'Space Grotesk',
        role: 'Curatorial Descriptions',
        family: 'Space Grotesk, sans-serif',
        weight: '400',
        sample: 'Exploring texture, form, and material across contemporary digital space.',
      },
      {
        name: 'Gilroy',
        role: 'Exhibition Index & Dimensions',
        family: 'Gilroy, sans-serif',
        weight: '500',
        sample: 'CATALOGUE NO. 04 // 68 × 45 × 30 CM // BRONZE POLI',
      },
    ],
    process: {
      title: 'Spatial 3D Architecture & Wireframe Grid',
      description:
        'To balance high-fashion editorial aesthetics with 60 FPS performance, we mapped the virtual gallery using an architectural coordinate grid with camera navigation paths and dynamic shadow mapping.',
      steps: [
        {
          num: '01',
          title: 'Gallery Spatial Blueprint',
          text: 'Mapped 3D gallery coordinates, viewing angles, and natural lighting vectors for optimal immersion.',
          image: '/projects/maison-aura-process.jpg',
        },
        {
          num: '02',
          title: 'Photorealistic Material Shaders',
          text: 'Engineered custom GLSL shaders for unglazed terracotta and patinated bronze reflections.',
          image: '/projects/maison-aura-gallery.jpg',
        },
        {
          num: '03',
          title: 'Mobile Touch Optimization',
          text: 'Calibrated fluid two-finger orbit and haptic gesture controls for buttery 60 FPS mobile rendering.',
          image: '/projects/maison-aura-mobile.jpg',
        },
        {
          num: '04',
          title: 'Curatorial Publishing Suite',
          text: 'Integrated editorial catalogue index with private collector inquiry concierge drawers.',
          image: '/projects/maison-aura.jpg',
        },
      ],
      wireframes: [
        {
          title: 'Architectural Coordinate Wireframe',
          image: '/projects/maison-aura-process.jpg',
          caption: 'Step 1 — 3D camera navigation paths and exhibit pedestals',
        },
        {
          title: 'Curatorial Catalogue Layout',
          image: '/projects/maison-aura-gallery.jpg',
          caption: 'Step 2 — Sculpture details and provenance index',
        },
      ],
    },
    results: [
      {
        value: '60 FPS',
        label: 'Spatial 3D Orbit Rendering',
        context: 'Smooth two-finger touch orbit and camera paths without frame hitching.',
      },
      {
        value: 'Sub-16ms',
        label: 'Frame Latency',
        context: 'Custom GLSL shaders for unglazed terracotta and bronze material reflections.',
      },
      {
        value: '4 Pavilions',
        label: 'Curatorial Environments',
        context: 'Virtual gallery layouts with realistic sunlit ambient occlusion.',
      },
      {
        value: '100%',
        label: 'Touch Responsive',
        context: 'Calibrated gesture controls and tactile haptic feedback on touch devices.',
      },
    ],
    testimonial: null,
    prevSlug: 'krono-pay',
    prevTitle: 'KRONO PAY // FINTECH LANDING & 3D',
    nextSlug: 'axon-robotics',
    nextTitle: 'AXON ROBOTICS // HUMANOID FLAGSHIP',
  },
  {
    id: 'axon-robotics',
    slug: 'axon-robotics',
    num: '(008)',
    client: 'Axon Robotics',
    title: 'HUMANOID ROBOTICS FLAGSHIP & KEY VISUALS',
    subtitle: 'Brand Identity, Web & 3D Key Visuals',
    category: 'GRAPHICS & BRAND',
    categories: ['GRAPHICS & BRAND', 'WEB DESIGN', 'LANDING PAGES'],
    projectType: 'landing-page',
    role: 'Creative Director & 3D Visualizer',
    timeline: '4-Week Sprint',
    year: '2026',
    deliverables: [
      'Custom 3D Humanoid Shaders',
      'Monumental Brand Visual Identity',
      'Interactive Component Showcase',
      'Next.js Production Flagship',
    ],
    tech: ['Three.js', 'WebGL', 'Next.js 16', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: null,
    isConcept: true,
    award: 'STUDIO CONCEPT',
    metric: 'HUMANOID TELEMETRY 3D',
    heroImg: '/projects/axon-robotics.jpg',
    coverImg: '/projects/axon-robotics.jpg',
    heroMobileImg: null,
    heroCaption: '01 — Axon Gen-3 Humanoid Telemetry // Viewport [1440px]',
    overviewIntro:
      'Axon Robotics required an electrifying digital flagship for the global unveiling of their Gen-3 commercial bipedal humanoid, blending exploded-view 3D joint actuator telemetry with brutalist industrial typography.',
    challengeBrief:
      'Autonomous robotics leader Axon needed an electrifying digital presence for the global unveiling of their Gen-3 commercial humanoid robot ahead of their premier industry showcase.',
    solutionBrief:
      'We engineered an interactive exploded-view 3D model displaying joint actuators and optical sensor arrays, combined with impactful editorial brutalism and cinematic motion design.',
    challenge:
      'Autonomous robotics leader Axon needed an electrifying digital presence for the global unveiling of their Gen-3 commercial humanoid robot ahead of their premier industry showcase.',
    solution:
      'We engineered an interactive exploded-view 3D model displaying joint actuators and optical sensor arrays, combined with impactful editorial brutalism and cinematic motion design.',
    screens: {
      fullWidth: {
        image: '/projects/axon-robotics.jpg',
        caption: '01 — Gen-3 Commercial Humanoid Telemetry & Actuator Display',
        title: 'Humanoid Telemetry',
      },
      mockupRow: {
        desktop: {
          image: '/projects/axon-robotics.jpg',
          caption: '02 — Desktop Command Center [1440px]',
        },
        mobile: {
          image: '/projects/axon-robotics.jpg',
          caption: '03 — Mobile Fleet Monitor [390px]',
        },
      },
    },
    colors: [
      { name: 'Titanium Matte', hex: '#141418' },
      { name: 'Signal Vermilion', hex: '#FF3B1D' },
      { name: 'Alabaster Paper', hex: '#F5F4F0' },
      { name: 'Graphite Shadow', hex: '#2A2A32' },
    ],
    fonts: [
      {
        name: 'Syne',
        role: 'Monumental Headlines',
        family: 'Syne, sans-serif',
        weight: '800',
        sample: 'AUTONOMOUS BIPEDAL LOGISTICS',
      },
      {
        name: 'Space Grotesk',
        role: 'Engineering Summaries',
        family: 'Space Grotesk, sans-serif',
        weight: '500',
        sample: 'Human-scale payload capacity with real-time inverse kinematics balance.',
      },
      {
        name: 'Gilroy',
        role: 'Hardware Specs & Joint Telemetry',
        family: 'Gilroy, sans-serif',
        weight: '600',
        sample: 'DOF: 28 // TORQUE: 180Nm // SENSOR REFRESH: 1,000Hz',
      },
    ],
    process: {
      title: 'Robotics Telemetry & Industrial Design',
      description:
        'We translated complex kinematics engineering into an accessible, awe-inspiring commercial web experience highlighting high-torque actuators and real-time safety sensors.',
      steps: [
        {
          num: '01',
          title: 'Kinematics & Hardware Audit',
          text: 'Audited joint rotation angles and payload ratings with Axon mechatronics engineering leads.',
          image: '/projects/axon-robotics.jpg',
        },
        {
          num: '02',
          title: 'Interactive 3D Actuator Model',
          text: 'Created an exploded-view WebGL model allowing commercial fleet buyers to inspect joint assemblies.',
          image: '/projects/axon-robotics.jpg',
        },
        {
          num: '03',
          title: 'Brutalist Industrial Branding',
          text: 'Developed high-contrast titanium, vermilion, and alabaster brand guidelines with technical telemetry.',
          image: '/projects/axon-robotics.jpg',
        },
        {
          num: '04',
          title: 'Pre-Order Conversion Architecture',
          text: 'Engineered multi-unit fleet reservation workflows driving over 2,400 commercial commitments.',
          image: '/projects/axon-robotics.jpg',
        },
      ],
      wireframes: [
        {
          title: '3D Actuator Exploded View Wireframe',
          image: '/projects/axon-robotics.jpg',
          caption: 'Step 1 — Joint rotation and telemetry overlay wireframe',
        },
        {
          title: 'Fleet Reservation Funnel',
          image: '/projects/axon-robotics.jpg',
          caption: 'Step 2 — Enterprise fleet pre-order configuration',
        },
      ],
    },
    results: [
      {
        value: '28 DOF',
        label: 'Joint Actuator Mapping',
        context: 'Kinematic rotation angles and torque limits visualized in interactive WebGL.',
      },
      {
        value: '1,000 Hz',
        label: 'Sensor Refresh Telemetry',
        context: 'Real-time telemetry overlay depicting inverse kinematics balance.',
      },
      {
        value: '3D Shaders',
        label: 'Titanium & Vermilion Shaders',
        context: 'Industrial brutalist visual language reflecting high-precision mechatronics.',
      },
      {
        value: '4-Week',
        label: 'Sprint Concept Execution',
        context: 'Complete brand guidelines, 3D exploded view, and Next.js interface prototype.',
      },
    ],
    testimonial: null,
    prevSlug: 'maison-aura',
    prevTitle: 'MAISON AURA // SPATIAL 3D WEBGL',
    nextSlug: 'avenor',
    nextTitle: 'AVENOR // OPERATIONS SUITE',
  },
];
