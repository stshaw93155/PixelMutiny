 # Agency Website PRD, AUGE XP Reference Architecture & Google Stitch Complete Design Playbook

## 1. Executive Summary & Reference Deconstruction (`auge-xp.com`)

### 1.1 Reference Architecture Analysis: AUGE Experience (`https://www.auge-xp.com/`)

[AUGE Experience](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2F) is an [Awwwards-nominated](https://www.google.com/search?q=https%3A%2F%2Fwww.awwwards.com%2Fsites%2Fauge-experience) independent digital experience studio part of the broader [AUGE Creative Ecosystem](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fabout) (alongside [AUGE Design](https://www.google.com/search?q=https%3A%2F%2Fauge-design.com%2F), AUGE Strategy, and AUGE Communication) with studios in Verona, Milan, and Florence ([AUGE Contacts](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fcontacts)). Built on **Next.js**, **Prismic CMS**, **WebGL/Three.js**, and **GSAP** ([Awwwards Profile](https://www.google.com/search?q=https%3A%2F%2Fwww.awwwards.com%2Fsites%2Fauge-experience)), its interface sets a modern benchmark for creative studio portfolios by abandoning static corporate layouts in favor of an **interactive spatial index**.

| Architectural Dimension | Reference Pattern on `auge-xp.com` | Adaptation for Your Graphics, Web, Landing Page & UI Design Agency | 
| ----- | ----- | ----- | 
| **Core Visual Metaphor** | Swiss-brutalist technical index meets kinetic digital exhibition space. | High-contrast dark-mode canvas (`#09090B`) with razor-sharp 1px hairlines (`#222226`), monospace telemetry indices, and full-bleed UI/graphics showcases. | 
| **Typography & Glyphs** | Monumental uppercase display headlines interspersed with custom typographic symbols (`⤷`, `✽`, `./`, `✦`, `➵`, `⬏`) and parenthetical index markers (`(001)`, `(WHE *)`). | Display Grotesque (`Syne` or `Clash Display`) paired with clean UI Sans (`Plus Jakarta Sans` or `Inter`) and technical Monospace (`JetBrains Mono`) for `(001)` indexing and live coordinate badges. | 
| **Micro-Interactions** | Scramble/cipher text decoding on hover (e.g., `ABOUT US` scrambling from `RAHHF DY`, city codes like `VE--RONA` / `MI--LANO`), magnetic cursor follower, and sound toggles. | Scramble-text hover states on navigation and capability headers, custom context-aware cursor (`VIEW UI`, `DRAG`, `PLAY`), and interactive before/after UI comparison sliders. | 
| **Navigation Architecture** | Persistent corner-pinned HUD (Logo top-left, index/status counter `089` and menu trigger top-right) + full-viewport takeover overlay menu (`Works`, `About`, `Let's talk`). | Fixed 4-corner HUD header + Full-Screen Takeover Menu (`Works`, `Services`, `Process`, `About`, `Let's Talk`) with live project preview reel and agency availability telemetry. | 
| **Portfolio Indexing** | Infinite looping project stream (`(001) Viru Group` to `(007) Maxima Ferrarelle`) with instant category tags (`Website`, `Installation`). | Dual-mode Portfolio (`[STREAM VIEW]` & `[GRID INDEX]`) filterable by **Brand & Graphics**, **Web Design**, **High-Converting Landing Pages**, and **Product UI/UX**. | 
| **Capabilities & Credibility** | 4-pillar capability breakdown (`Experience Design`, `Creative Technology`, `Digital Experience`, `Interactive Spaces`) + structured tabular awards ledger (`15 Awards` across Awwwards, FWA, CSSDA, Muzli). | 4-pillar agency matrix (**01. Brand & Graphic Design**, **02. High-Converting Landing Pages**, **03. Custom Web Design & Dev**, **04. Product UI/UX & Design Systems**) + Live Metrics & Recognition Ledger. | 

## 2. Product Requirements Document (PRD)

### 2.1 Product Vision & Value Proposition

Build a flagship digital agency website and interactive portfolio for a **Graphics, Web Design, Landing Page Design, and UI/UX Design Studio**. Inspired by [AUGE Experience](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2F), the site itself acts as the primary proof of capability—combining theatrical kinetic typography and editorial art direction with conversion-engineered landing page architecture.

### 2.2 Target Audience & User Personas

1. **High-Growth SaaS & AI Founders (Seed to Series B):** Seeking rapid, high-converting product launch landing pages, pitch deck graphics, and scalable UI design systems.

2. **Marketing VPs & Brand Directors:** Looking for complete web rebrands, campaign microsites, 3D/motion graphic assets, and conversion rate optimization (CRO) redesigns.

3. **Product Leads & CTOs:** Looking for embedded UI/UX product designers to overhaul complex web apps, dashboards, and design token libraries (`DESIGN.md` / Figma).

### 2.3 Core Business Goals & KPIs

* **Primary Conversion Goal:** Achieve a **3.5%+ visitor-to-inquiry conversion rate** via the interactive project configurator (`Let's Talk` drawer and `/contact` page).

* **Engagement Benchmark:** Average session duration **> 2 minutes 15 seconds** driven by interactive case study previews, draggable UI component playgrounds, and smooth scroll storytelling.

* **Performance & Technical Excellence:** Lighthouse Performance **≥ 90**, Accessibility **≥ 95**, Best Practices **100**, SEO **100**; First Contentful Paint (FCP) **< 1.2s**; 60fps scroll animations.

### 2.4 Sitemap & Information Architecture

```
/ (Root)
├── / (Home — Kinetic Hero, Infinite Marquee, Selected Works Stream, 4 Service Pillars, Metrics/Awards, CTA)
├── /works (Works Index — Filterable by All, Graphics & Branding, Web Design, Landing Pages, UI/UX Systems)
│   └── /works/[slug] (Case Study Detail — Challenge, Strategy, Visual System, UI Walkthrough, Live KPIs)
├── /services (Capabilities & Retainer/Project Packages — Deep dive into the 4 core design disciplines)
├── /about (Studio Manifesto, Showreel, Design Process, Team, Awards Ledger, Ecosystem)
├── /contact (Interactive Project Brief Configurator, Direct Email, Global Hub Clocks & Locations)
└── Global Overlays
    ├── Full-Screen Takeover Menu Overlay (Triggered from any screen via Header HUD)
    └── Quick "Let's Talk" Slide-Over Drawer (Instant 3-step inquiry from any CTA)

```

### 2.5 Functional Requirements (FR)

| ID | Feature Module | Functional Specification | Priority | 
| ----- | ----- | ----- | ----- | 
| **FR-01** | **Corner-Pinned HUD Header** | Fixed `z-50` top bar with `mix-blend-difference`. Left: Agency wordmark + live availability dot (`2 Q4 SLOTS OPEN`). Center: Monospace coordinate/scroll progress indicator (`001 // 089%`). Right: Quick `LET'S TALK ⬏` pill button and `[MENU +]` trigger. | P0 | 
| **FR-02** | **Full-Screen Takeover Menu** | Clicking `[MENU +]` animates a full-viewport (`100vw x 100vh`) dark obsidian overlay (`#09090B`). Displays 5 numbered giant navigation links `(01) WORKS` to `(05) CONTACT` with scramble-text hover effects, a live hover-preview thumbnail container on the right, social links (`LINKEDIN`, `INSTAGRAM`, `DRIBBBLE`, `FIGMA`), and studio timezones. | P0 | 
| **FR-03** | **Kinetic Hero & Showreel** | Monumental typographic hero with inline symbolic glyphs (`⤷`, `✽`, `./`, `✦`), live floating UI/graphic cards that react to cursor movement, and an expandable full-screen 60s Studio Showreel video modal (`PLAY SHOWREEL ▶`). | P0 | 
| **FR-04** | **Dual-View Portfolio Engine** | Supports **Stream View** (AUGE XP-inspired vertical/horizontal oversized numbered list `(001)`–`(008)` where hovering a row expands a floating 16:10 video/UI preview) and **Bento Grid View** (2-column asymmetric visual cards), plus instant category filtering without page reload. | P0 | 
| **FR-05** | **Service Pillar Interactive Accordion** | 4 expandable capability modules (`01 Graphics & Brand Identity`, `02 High-Converting Landing Pages`, `03 Custom Web Design`, `04 Product UI/UX & Design Systems`). Expanding a row reveals deliverable tags, turnaround timeline, sample artifacts, and a direct `Scope This Service ⬏` link. | P0 | 
| **FR-06** | **Interactive Case Study Template** | Structured dynamic route featuring sticky project metadata sidebar (Client, Year, Scope, Live URL, Conversion Lift), full-bleed hero mockup, typography/color token showcase, interactive Desktop/Mobile UI toggle, and next-project infinite scroll footer. | P0 | 
| **FR-07** | **Awards & Conversion Ledger** | High-density tabular list patterned after [AUGE XP's Awards section](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fabout) (\`YEAR | PROJECT | 
| **FR-08** | **Interactive Project Configurator** | Multi-select pill form on `/contact`: Step 1: Discipline pills (`Landing Page`, `Web Design`, `UI/UX System`, `Brand & Graphics`); Step 2: Budget tier pills (`$5k–$10k`, `$10k–$25k`, `$25k–$50k`, `$50k+`); Step 3: Timeline (`Sprint 2 Wks`, `1–2 Mos`, `Ongoing Retainer`); Step 4: Name, Email, Project URL/Brief. | P0 | 

### 2.6 Non-Functional & Technical Stack Recommendations

* **Frontend Framework:** Next.js 15+ (App Router, React Server Components, TypeScript)

* **Styling & Design Tokens:** Tailwind CSS v4 + Google Stitch [DESIGN.md](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fgoogle-labs-code%2Fdesign.md) token synchronization (`npx @google/design.md export --format css-tailwind DESIGN.md > theme.css`)

* **Motion & Smooth Scroll:** Lenis Smooth Scroll + GSAP (ScrollTrigger, SplitText for scramble/kinetic reveals) + Framer Motion (page transitions and layout animations)

* **Headless CMS:** Prismic or Sanity.io for managing Case Studies, Awards Ledger rows, and Service Packages

* **Accessibility & Fallback:** Respect `prefers-reduced-motion` (disables scramble loops and heavy parallax, retaining crisp opacity fades) and maintain WCAG AA contrast on all body/UI text.

## 3. Global Design System & Navigation Menu Specification

### 3.1 Visual Language & Aesthetic Direction

* **Theme Polarity:** **Obsidian Editorial Dark Mode** (Primary canvas `#09090B`, Elevated cards `#121216`) paired with **Warm Alabaster Paper** (`#F4F3EF`) for high-contrast editorial callout sections.

* **Accent Strategy:** **Electric Acid Lime** (`#D4FF00`) or **Hyper Vermilion** (`#FF3B1D`) used with surgical restraint—exclusively for active indicators, primary conversion CTAs, cursor followers, and `(001)` index highlights.

* **Exposed Structural Grid:** Visible `1px solid #222226` hairlines dividing sections, columns, and tabular ledger rows—echoing Swiss architectural blueprints and [AUGE XP's](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fabout) index layout.

* **Symbolic Glyphs & Telemetry:** Incorporate directional and editorial glyphs (`⤷`, `⬏`, `✽`, `✦`, `./`, `→`) inside display headlines and CTA buttons, plus monospace scramble labels (`[SYS.UI // 2026]`, `(001)`).

### 3.2 Color Palette Tokens

| Token Name | Hex Value | Usage & Role | Contrast vs `#09090B` | 
| ----- | ----- | ----- | ----- | 
| `background` | `#09090B` | Primary obsidian page canvas | — | 
| `surface-1` | `#121216` | Elevated bento cards, service rows, form inputs | 1.15:1 | 
| `surface-2` | `#1A1A20` | Hover state surface, active navigation row fill | 1.32:1 | 
| `surface-light` | `#F4F3EF` | Inverted high-contrast editorial section background | 17.8:1 | 
| `text-primary` | `#F4F3EF` | Primary headlines, active navigation links, body lead | 17.8:1 (AAA) | 
| `text-secondary` | `#A1A1AA` | Supporting body copy, descriptions, subtitles | 7.8:1 (AAA) | 
| `text-muted` | `#63636E` | Monospace index numbers `(001)`, coordinates, inactive tags | 3.6:1 (Decorative/Large) | 
| `accent-primary` | `#D4FF00` | Primary CTA fill, active filter indicator, cursor badge | 16.9:1 (AAA vs `#09090B`) | 
| `accent-secondary` | `#FF3B1D` | Secondary interactive highlight, showreel play badge | 5.4:1 (AA) | 
| `border-subtle` | `#222226` | 1px structural grid hairlines, table dividers | — | 
| `border-focus` | `#D4FF00` | Active input border, focused card outline | 16.9:1 | 

### 3.3 Typography System & Scale

| Token Role | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Letter Spacing | Usage Context | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| `display-hero` | `Syne` (or `Clash Display`) | `96px` (`6rem`) / `48px` | `800` | `0.92` | `-0.04em` | Hero statements with inline glyphs (`⤷ DESIGN ✽ BECOMES ./ REVENUE`) | 
| `h1-page` | `Syne` | `64px` (`4rem`) / `36px` | `700` | `0.98` | `-0.03em` | Page titles (`SELECTED WORKS`, `CAPABILITIES`) | 
| `h2-section` | `Plus Jakarta Sans` | `40px` (`2.5rem`) / `28px` | `600` | `1.10` | `-0.02em` | Section headers, case study titles | 
| `h3-card` | `Plus Jakarta Sans` | `24px` (`1.5rem`) / `20px` | `600` | `1.25` | `-0.01em` | Service card titles, project row names | 
| `body-lg` | `Plus Jakarta Sans` | `20px` (`1.25rem`) / `18px` | `400` | `1.55` | `0em` | Studio manifesto, case study executive summaries | 
| `body-md` | `Plus Jakarta Sans` | `16px` (`1rem`) / `16px` | `400` | `1.60` | `0em` | Standard descriptions, deliverables lists | 
| `mono-index` | `JetBrains Mono` | `13px` (`0.8125rem`) | `500` | `1.40` | `+0.08em` | Uppercase `(001)` indices, category pills, telemetry, nav counters | 

### 3.4 Complete Navigation Menu Architecture (All 3 Components)

#### A. Persistent Corner-Pinned Header Bar (`Desktop & Mobile`)

* **Height:** `72px` fixed (`top: 0`, `left: 0`, `right: 0`, `z-index: 50`), background `rgba(9, 9, 11, 0.75)` with `backdrop-filter: blur(16px)` and bottom border `1px solid #222226`.

* **Left Zone:**

  * **Brand Wordmark:** `KINETIX® XP` (or your studio name) in `Syne 800`, `18px`, `#F4F3EF`.

  * **Live Status Pill:** Adjacent bordered pill (`border: 1px solid #222226`, `border-radius: 999px`, `padding: 4px 10px`) with a pulsing `#D4FF00` 6px dot and `JetBrains Mono 11px` text: `BOOKING Q4 // 2 SLOTS`.

* **Center Zone (Desktop only):**

  * Quick Inline Anchor Links: `WORKS (08)`, `SERVICES (04)`, `ABOUT`, `PROCESS` in `JetBrains Mono 12px` `#A1A1AA`. On hover, text scrambles for `250ms` and shifts to `#F4F3EF` with a prefix `⤷`.

* **Right Zone:**

  * **Primary Action Button:** `LET'S TALK ⬏` (`background: #D4FF00`, `color: #09090B`, `JetBrains Mono 12px Bold`, `padding: 10px 18px`, `border-radius: 999px`).

  * **Overlay Menu Trigger:** `[MENU +]` button (`background: #121216`, `border: 1px solid #222226`, `color: #F4F3EF`, `padding: 10px 16px`, `border-radius: 999px`). Changes to `[CLOSE ×]` when the overlay is open.

#### B. Full-Screen Takeover Menu Overlay (`Menu Open State`)

Patterned directly on [AUGE Experience's](https://www.google.com/search?q=https%3A%2F%2Fwww.awwwards.com%2Finspiration%2Fmenu-auge-experience) interactive menu:

* **Layout Grid:** 12-column full-viewport (`100vw x 100vh`) grid on `#09090B` divided by `1px solid #222226` vertical and horizontal hairlines.

* **Left 7 Columns (Primary Navigation Stack):**

  * 5 horizontal full-width rows separated by `1px solid #222226`. Each row contains:

    1. `(001)` **WORKS** — *Selected Web, Landing Page & UI Case Studies* (`Badge: 08 PROJECTS`)

    2. `(002)` **SERVICES** — *Graphics, Web Design, Landing Pages & UI Systems* (`Badge: 04 PILLARS`)

    3. `(003)` **ABOUT US** — *Studio Manifesto, Process & 15+ Awards* (`Badge: STUDIO`)

    4. `(004)` **PLAYGROUND** — *Experimental UI Components, 3D & Motion Lab* (`Badge: LABS ✦`)

    5. `(005)` **LET'S TALK** — *Start a Project or Book a Discovery Sprint* (`Badge: AVAILABLE ⬏`)

  * **Hover Interaction:** Hovering any row fills the row background with `#121216`, shifts the title `24px` right, injects an acid-lime `⤷` arrow on the left, scrambles the subtitle cipher in `JetBrains Mono`, and swaps the right-hand preview card.

* **Right 5 Columns (Dynamic Preview & Telemetry Panel):**

  * **Top Half:** Live 16:10 video/image preview frame showing a highlight reel of the currently hovered menu item, framed with corner crosshair markers (`+`).

  * **Bottom Half:** Studio Direct Contact (`hello@studio-xp.com →`), Global Clocks (`DELHI // LONDON // NEW YORK`), and Social Pills (`LINKEDIN ⬏`, `INSTAGRAM ⬏`, `DRIBBBLE ⬏`, `X / TWITTER ⬏`).

#### C. Monumental Editorial Footer

* **Top Marquee Band:** Infinite horizontal ticker (`1px solid #222226` top/bottom): `BRAND IDENTITY ✦ LANDING PAGE DESIGN ✦ WEB DESIGN & WEBGL ✦ PRODUCT UI/UX SYSTEMS ✦`.

* **Main CTA Block:** Giant headline `READY TO BUILD ⤷ CATEGORY-DEFINING UI?` with an oversized pill CTA button `START YOUR PROJECT ⬏` (`#D4FF00`).

* **Bottom Legal & Index Bar:** Match [AUGE XP's footer](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2F): Giant edge-to-edge cropped watermark wordmark (`STUDIO XP` at `18vw` height), flanked by `© 2026 | PRIVACY | COOKIES`, `LINKEDIN | INSTAGRAM | DRIBBBLE`, and live counter `089`.

## 4. Page-by-Page Wireframes & Design Instructions

### Page 1: Home Page (`/`) — *The Experiential Conversion Engine*

1. **Section 1.1: Kinetic Typographic Hero (`100vh`)**

   * **Top Telemetry Strip:** Beneath the fixed header, display a 3-column metadata strip in `JetBrains Mono 12px #63636E`: `[001 // DIGITAL DESIGN STUDIO]`, `[GRAPHICS • WEB • LANDING PAGES • UI]`, `[SCROLL TO EXPLORE ↓]`.

   * **Centerpiece Display Statement:** Left-aligned monumental typography (`Syne 800, 96px`):

     * Line 1: `⤷ WHERE BOLD`

     * Line 2: `"GRAPHICS" ✽ AND`

     * Line 3: `./ HIGH-CONVERTING`

     * Line 4: `UI ✦ MERGE(S).`

   * **Floating Interactive Showreel Card:** Positioned on columns 8–12, a `480px x 300px` glassmorphic video preview card with a magnetic `PLAY SHOWREEL ▶ (01:15)` button in `#D4FF00`.

   * **Bottom Hero Bar:** Studio positioning statement (inspired by [AUGE XP](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2F)): *"An award-winning design studio partnering with ambitious brands and startups to craft distinctive graphics, websites, landing pages, and product UI."* + Primary CTA `EXPLORE SELECTED WORK ⬏` and Secondary CTA `BOOK A DESIGN SPRINT →`.

2. **Section 1.2: Selected Works Interactive Stream (`Works Preview`)**

   * **Section Header:** `[002 // SELECTED WORKS]` on the left; `(001 — 006)` counter and `VIEW ALL PROJECTS (08) →` on the right.

   * **Project Rows (AUGE XP Numbered Stream Pattern):**

     * `(001)` **Veloce AI** — *Product UI/UX & Design System* — `[+168% Activation]`

     * `(002)` **Krono Pay** — *High-Converting SaaS Landing Page* — `[4.9% Conv. Rate]`

     * `(003)` **Maison Aura** — *3D Web Design & Brand Graphics* — `[Awwwards SOTD]`

     * `(004)` **Synthetix Cloud** — *Web Redesign & Interactive Motion* — `[Series B Launch]`

     * `(005)` **Pulse OS** — *Mobile & Web Application UI* — `[Design System]`

     * `(006)` **Monolith Studio** — *Visual Identity & Editorial Web* — `[CSSDA WOTD]`

   * **Visual Layout:** Each row spans 12 columns with a `1px solid #222226` bottom border, `32px` vertical padding, and displays a 16:10 thumbnail preview card alongside deliverable tags (`UI DESIGN`, `LANDING PAGE`, `GRAPHICS`).

3. **Section 1.3: The 4 Core Design Capabilities (`Capabilities Matrix`)**

   * Modeled on [AUGE XP's 4-pillar capability breakdown](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fabout), tailored specifically to your agency's services:

     * **Pillar 01: Brand & Graphic Design (`GRAPHICS // VISUAL ID`)** — Brand Identity Systems, 3D & Motion Graphics, Social & Campaign Key Visuals, Pitch Deck Design, Custom Iconography & Illustration.

     * **Pillar 02: High-Converting Landing Pages (`CRO // LAUNCH PAGES`)** — Product Launch Pages, SaaS Marketing Pages, A/B Tested Hero Architecture, Interactive Product Demos, Copywriting & Conversion Storytelling.

     * **Pillar 03: Custom Web Design & Interactive (`WEB // EXPERIENCES`)** — Multi-Page Marketing Websites, WebGL & GSAP Interactive Storytelling, Framer & Webflow Development, Next.js Headless Builds, Technical SEO/GEO.

     * **Pillar 04: Product UI/UX & Design Systems (`UI/UX // PRODUCT`)** — Web & Mobile App Interfaces, Complex SaaS Dashboards, Multi-Brand Figma Libraries, `DESIGN.md` AI Token Systems, Interactive Prototyping.

4. **Section 1.4: Interactive Before/After Landing Page Teardown (`Proof of Craft`)**

   * Split-screen interactive comparison widget showing a generic legacy SaaS page on the left ("Before: 1.1% Conversion") and the studio's redesigned high-contrast dark UI on the right ("After: 4.6% Conversion — +318% Pipeline Lift"), complete with annotated callout pins (`01 Clear Value Prop`, `02 Interactive Telemetry Widget`, `03 Frictionless CTA`).

5. **Section 1.5: Recognition & Client Impact Ledger (`Awards & Metrics`)**

   * 12-column tabular ledger matching [AUGE XP's Awards table](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fabout) with 8 rows mixing design awards (`Awwwards SOTD`, `FWA FOTD`, `CSS Design Awards WOTD`, `Muzli Honor`) and verified conversion lifts.

### Page 2: Works / Portfolio Archive (`/works`)

1. **Header & Filter Control Bar:**

   * Monumental title `SELECTED ⤷ WORKS (08)` with live category filter pills: `[ALL (08)]` (active `#D4FF00`), `[LANDING PAGES (03)]`, `[WEB DESIGN (03)]`, `[UI/UX DESIGN (04)]`, `[GRAPHICS & BRAND (02)]`.

   * View Switcher on the far right: `[≡ INDEX STREAM]` vs `[⊞ BENTO GRID]`.

2. **Bento Grid & Stream Presentation:**

   * **Bento Grid Mode:** Asymmetric 2-column grid where flagship projects (`(001) Veloce AI` and `(003) Maison Aura`) span 7 columns (`640px` height) and companion projects span 5 columns (`520px` height). Every card includes a top metadata bar (`(001)` on left, `2026 // UI DESIGN` on right), a high-resolution device/interface mockup center stage, and a bottom metric bar (`+168% USER ACTIVATION ⬏`).

### Page 3: Services & Capabilities Page (`/services`)

1. **Hero Section:**

   * Headline: `FULL-STACK ⤷ DESIGN ✽ FOR AMBITIOUS ./ BRANDS.`

   * Subtitle explaining how graphics, landing pages, web design, and product UI work together as a unified growth engine.

2. **Deep-Dive Service Blocks (4 Sticky Split-Screen Sections):**

   * Left 5 columns sticky: Index number `(01)`–`(04)`, Discipline Title, Ideal Client Profile, Turnaround Time (`2–4 Weeks`), and `Request Scope ⬏` CTA.

   * Right 7 columns scrolling: Visual artifact showcase (UI kits, landing page wireframes, 3D graphics), itemized deliverable checklist, and toolstack badges (`Figma`, `Google Stitch`, `Framer`, `Next.js`, `Blender`, `Rive`).

3. **Engagement Models (Pricing / Retainer Matrix):**

   * 3 transparent engagement cards:

     * **01 // Landing Page Sprint** (`2 Weeks` — High-converting landing page + custom graphics + interactive prototype)

     * **02 // Flagship Website & Brand** (`4–6 Weeks` — Complete visual identity, multi-page web design, motion graphics, CMS build)

     * **03 // Embedded UI/UX Design Partner** (`Monthly Retainer` — Dedicated senior UI/UX & graphic design squad, unlimited requests, `DESIGN.md` & Figma system ownership)

### Page 4: Case Study Detail Page (`/works/[slug]`)

1. **Case Study Hero:**

   * Breadcrumb `[WORKS // (001) VELOCE AI]`, Client Title `VELOCE AI — AUTONOMOUS WORKFLOW UI & LAUNCH LANDING PAGE`, and 4 KPI Stat Cards (`+168% Activation`, `4.9% Visitor-to-Signup`, `42 UI Screens`, `3 Weeks Delivery`).

2. **2-Column Sticky Narrative & Visual Feed:**

   * **Left 4 Columns (Sticky Project Brief):** Client, Industry, Deliverables (`Brand Graphics`, `Landing Page`, `Web App UI`, `Design System`), Live Link (`veloce.ai ⬏`), and Tech/Design Stack.

   * **Right 8 Columns (Visual Showcase):**

     * **01. The Challenge & Conversion Bottleneck**

     * **02. Graphic Direction & Custom 3D Assets** (Full-bleed bento grid of custom icons, shaders, and social graphics)

     * **03. Landing Page Architecture** (Annotated full-page scroll preview showing hero, social proof, interactive pricing, and CTA)

     * **04. Product UI & Design System Tokens** (Interactive dark/light mode component inspection card)

3. **Next Project Transition Footer:** Full-width hover banner `(002) NEXT PROJECT: KRONO PAY ⤷`.

### Page 5: About / Studio Manifesto (`/about`)

Directly inspired by [auge-xp.com/about](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fabout):

1. **Typographic Manifesto Hero:**

   * `(WHE *) ©2026`

   * `⤷ WHERE "DESIGN" ✽ BECOMES ./ MEASURABLE ✦ IMPACT(S).`

   * Giant interactive showreel banner (`PLAY STUDIO REEL ▶`).

2. **Our 4-Stage Design Methodology (`The Sprint Architecture`):**

   * `01 // DISCOVER & AUDIT` (UX audit, conversion teardown, competitive positioning)

   * `02 // VISUAL DIRECTION & GRAPHICS` (Moodboards, 3D/graphic assets, typographic system)

   * `03 // UI ARCHITECTURE & PROTOTYPING` (High-fidelity Figma & Google Stitch screens, micro-interactions)

   * `04 // SHIP, TEST & SCALE` (Production handoff, Webflow/Framer/Next.js build, CRO iteration)

3. **Awards & Ecosystem Section:**

   * Complete 15-row Awards & Press table + Agency Ecosystem callout (`Strategy • Graphics • Web • Product UI`).

### Page 6: Contact & Project Configurator (`/contact`)

Directly inspired by [auge-xp.com/contacts](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fcontacts) combined with a high-converting agency intake flow:

1. **Left 5 Columns (Direct Access & Studio Hubs):**

   * Monumental headline: `READY TO BE ⤷ IN MOTION?`

   * Direct oversized email link: `hello@kinetix-xp.com →` (with click-to-copy badge).

   * 3 Studio Hub Cards with [AUGE XP's hyphenated city typography](https://www.google.com/search?q=https%3A%2F%2Fwww.auge-xp.com%2Fcontacts):

     * `NEW--YORK` (SoHo Design Loft, NY — Local Time + Map Link `→`)

     * `LON--DON` (Shoreditch Studio, UK — Local Time + Map Link `→`)

     * `DE--LHI` (Cyber Hub Creative Lab, IN — Local Time + Map Link `→`)

2. **Right 7 Columns (Interactive Project Brief Builder):**

   * Interactive pill-selection form (Needs, Budget, Timeline, Details) + instant `BOOK A 15-MIN DISCOVERY CALL ⬏` calendar toggle.

## 5. Google Stitch Setup & Ready-to-Use Prompts (`stitch.withgoogle.com`)

### 5.1 How to Use This Blueprint in Google Stitch

[Google Stitch](https://www.google.com/search?q=https%3A%2F%2Fstitch.withgoogle.com%2F) generates high-fidelity web UI and frontend code using two inputs:

1. **`DESIGN.md` (Persistent Design System File):** Stored in your Stitch project root ([google-labs-code/design.md specification](https://www.google.com/search?q=https%3A%2F%2Fgithub.com%2Fgoogle-labs-code%2Fdesign.md)). Stitch reads this file on **every prompt** so colors, typography, border radii, and spacing stay 100% consistent across all generated pages.

2. **Screen-by-Screen Generation Prompts:** Paste each prompt from **Section 5.3** into [Google Stitch](https://www.google.com/search?q=https%3A%2F%2Fstitch.withgoogle.com%2F) (select **Web / Desktop** or **Mobile** mode) to generate the individual pages and menu states.

### 5.2 Complete `DESIGN.md` File for Google Stitch (Copy & Save as `DESIGN.md`)

```
---
version: "alpha"
name: "AUGE-Inspired Creative Design Agency (KINETIX XP)"
description: "High-contrast obsidian editorial dark-mode design system inspired by auge-xp.com for a Graphics, Web Design, Landing Page, and Product UI/UX Agency."
colors:
  primary: "#D4FF00"
  on-primary: "#09090B"
  secondary: "#A1A1AA"
  tertiary: "#FF3B1D"
  on-tertiary: "#F4F3EF"
  neutral: "#09090B"
  surface: "#121216"
  surface-elevated: "#1A1A20"
  surface-light: "#F4F3EF"
  text-primary: "#F4F3EF"
  text-secondary: "#A1A1AA"
  text-muted: "#63636E"
  border-hairline: "#222226"
  success: "#10B981"
typography:
  display-hero:
    fontFamily: "Syne"
    fontSize: "5.5rem"
    fontWeight: 800
    lineHeight: "0.92"
    letterSpacing: "-0.04em"
  h1:
    fontFamily: "Syne"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: "0.98"
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: "1.12"
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: "1.25"
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: "1.55"
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  label-mono:
    fontFamily: "JetBrains Mono"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: "1.4"
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  xxl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-mono}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label-mono}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "24px"
---

## Overview
Swiss-Brutalist Digital Experience Studio meets High-Converting Product UI Agency. Inspired by auge-xp.com, the interface pairs an obsidian dark canvas (#09090B) and exposed 1px structural grid hairlines (#222226) with monumental uppercase display typography, symbolic glyphs (⤷, ✽, ./, ✦, ⬏), and surgical Acid Lime (#D4FF00) interactive accents.

## Colors
- **Neutral Canvas (#09090B):** Deep obsidian background across all primary screens.
- **Surface (#121216) & Surface Elevated (#1A1A20):** Used for bento cards, interactive service rows, and form controls.
- **Primary Accent (#D4FF00):** Electric Acid Lime reserved strictly for primary CTAs, active filter states, live availability dots, and hover indicators.
- **Tertiary Accent (#FF3B1D):** Hyper Vermilion used for showreel badges and featured award tags.
- **Border Hairline (#222226):** Exposed 1px solid structural borders dividing every major section, navigation bar, and index row.

## Typography
- **Display & Headlines (Syne):** Bold, architectural uppercase display headlines interspersed with editorial symbols (`⤷`, `✽`, `./`, `✦`).
- **UI & Body (Plus Jakarta Sans):** Crisp geometric sans-serif for high readability across case studies, service deliverables, and pricing matrices.
- **Telemetry & Indexing (JetBrains Mono):** All-caps monospace for parenthetical index numbers `(001)`–`(008)`, category tags, coordinates, and navigation counters.

## Layout
- 12-column CSS Grid (`max-width: 1440px`, `24px` gap) with visible `1px solid #222226` hairlines separating major horizontal and vertical zones.
- Corner-pinned 72px HUD header with glassmorphic blur (`rgba(9,9,11,0.8)`).

## Elevation & Depth
- Flat architectural depth relying on crisp 1px borders (`#222226`) rather than soft drop shadows.
- Floating preview modals and header bars use `backdrop-filter: blur(16px)` with `1px solid rgba(244,243,239,0.12)` borders.

## Shapes
- Structural layout containers use `0px` radius (flush grid cells).
- Interactive project cards use `12px` radius (`rounded.md`).
- Buttons, status badges, and filter tags use full `999px` pill radius (`rounded.pill`).

## Components
- **Indexed Project Rows:** Full-width horizontal rows with `(001)` monospace index on the left, bold project title in the center, discipline tags (`LANDING PAGE`, `UI DESIGN`, `GRAPHICS`) on the right, and a 16:10 visual preview.
- **HUD Navigation Header:** Left wordmark + live availability dot; Center monospace anchor links; Right `LET'S TALK ⬏` acid-lime pill + `[MENU +]` trigger.

## Do's and Don'ts
- DO prefix numbered portfolio and capability items with three-digit monospace indices like `(001)`, `(002)`, `(003)`.
- DO include symbolic glyphs (`⤷`, `✽`, `./`, `✦`, `⬏`) in display headlines and button labels.
- DON'T use soft purple/blue SaaS gradients or generic white-background corporate layouts.
- DON'T crowd cards—maintain generous vertical padding (`48px` to `96px`) and visible 1px grid lines.

```

### 5.3 Copy-Paste Google Stitch Screen Prompts (All Pages & Menu States)

#### Prompt 1: Home Page (`Desktop Web — 1440px`)

> **Prompt to paste into Google Stitch:** Design a desktop landing page (1440px wide) for an award-winning digital design agency named "KINETIX XP" specializing in Graphics, Web Design, High-Converting Landing Pages, and Product UI/UX, inspired by auge-xp.com. Use an obsidian dark background (#09090B), exposed 1px solid #222226 structural grid lines, warm off-white text (#F4F3EF), muted gray metadata (#A1A1AA), and Electric Acid Lime (#D4FF00) accents.
>
> **1. Fixed Corner-Pinned HUD Header (72px height, bottom 1px border #222226):**
>
> * Left: Bold wordmark "KINETIX® XP" next to a rounded pill badge with a glowing #D4FF00 dot and monospace text "2 Q4 SLOTS OPEN".
>
> * Center: Monospace nav links "WORKS (08)", "SERVICES (04)", "ABOUT", "AWARDS (15)".
>
> * Right: Pill button "LET'S TALK ⬏" in solid #D4FF00 with #09090B text, next to a dark bordered pill button "\[MENU +\]".
>
> **2. Kinetic Typographic Hero Section (divided by 1px grid hairlines):**
>
> * Top telemetry bar in JetBrains Mono 12px: "\[001 // DIGITAL EXPERIENCE & UI STUDIO\]" on left, "\[GRAPHICS • WEB • LANDING PAGES • UI/UX\]" in center, "\[SCROLL ↓ 089\]" on right.
>
> * Left 7 columns: Giant uppercase Syne 800 display headline stacked on 4 lines with inline symbols: Line 1: "⤷ WHERE BOLD" Line 2: ""GRAPHICS" ✽ AND" Line 3: "./ HIGH-CONVERTING" Line 4: "UI ✦ MERGE(S)."
>
> * Below headline: Lead paragraph "We partner with ambitious startups and global brands to craft distinctive brand graphics, interactive websites, conversion-engineered landing pages, and scalable product UI." followed by a solid #D4FF00 pill button "EXPLORE SELECTED WORK ⬏" and a bordered pill button "SCOPE YOUR PROJECT →".
>
> * Right 5 columns: A framed interactive showreel preview card showing a sleek dark-mode SaaS UI and 3D abstract chrome sculpture, corner crosshair markers (+), and a floating magnetic pill button "PLAY SHOWREEL ▶ (01:15)" in #FF3B1D.
>
> **3. Selected Works Indexed Stream Section (`[002 // SELECTED WORKS]`):**
>
> * Full-width numbered horizontal project rows separated by 1px solid #222226 lines:
>
>   * Row 1 (Active/Hovered state with #121216 fill and inline 16:10 UI preview thumbnail): "(001)" in monospace, large title "Veloce AI", tags "\[PRODUCT UI/UX\] \[DESIGN SYSTEM\]", metric badge "+168% Activation ⬏" in #D4FF00.
>
>   * Row 2: "(002)" | "Krono Pay" | "\[LANDING PAGE DESIGN\] \[3D GRAPHICS\]" | "4.9% Conv. Rate ⬏".
>
>   * Row 3: "(003)" | "Maison Aura" | "\[WEB DESIGN\] \[BRAND IDENTITY\]" | "Awwwards SOTD ⬏".
>
>   * Row 4: "(004)" | "Synthetix Cloud" | "\[WEB REDESIGN\] \[INTERACTIVE MOTION\]" | "Series B Launch ⬏".
>
> **4. Four Core Capabilities Matrix (`[003 // CAPABILITIES]`):**
>
> * 4-column architectural grid separated by 1px vertical #222226 borders:
>
>   * Col 1: "(01) GRAPHICS & BRANDING" — Visual Identity, 3D Motion Assets, Campaign Key Visuals, Pitch Decks, Iconography.
>
>   * Col 2: "(02) LANDING PAGE DESIGN" — High-Converting SaaS Launches, CRO Hero Architecture, Interactive Product Tours, A/B Ready Layouts.
>
>   * Col 3: "(03) CUSTOM WEB DESIGN" — Editorial Marketing Sites, WebGL & GSAP Storytelling, Framer/Webflow/Next.js Builds, SEO/GEO.
>
>   * Col 4: "(04) PRODUCT UI/UX SYSTEMS" — Web & Mobile Apps, Complex Dashboards, Figma Component Libraries, DESIGN.md AI Tokens.
>
> **5. Awards & Impact Ledger (`[004 // RECOGNITION & METRICS]`):**
>
> * High-density 6-row table with 1px #222226 borders showing Year (2026), Project Name, Platform/Metric (Awwwards SOTD, The FWA FOTD, CSS Design Awards WOTD, +318% Pipeline Lift), and Link arrow (⬏).
>
> **6. Monumental Footer:**
>
> * Giant headline "READY TO BUILD ⤷ CATEGORY-DEFINING DESIGN?" with an oversized #D4FF00 pill button "START A PROJECT ⬏", studio links for "NEW--YORK", "LON--DON", "DE--LHI", social links "LINKEDIN | INSTAGRAM | DRIBBBLE", and an edge-to-edge cropped footer wordmark "KINETIX XP".

#### Prompt 2: Full-Screen Takeover Navigation Menu Overlay (`Desktop Web — 1440px`)

> **Prompt to paste into Google Stitch:** Design a full-viewport (1440x900) takeover navigation menu overlay for the "KINETIX XP" creative design agency website, inspired by auge-xp.com's interactive menu. Obsidian background (#09090B) with exposed 1px solid #222226 grid lines.
>
> **1. Top HUD Bar (72px):**
>
> * Left: "KINETIX® XP" logo and monospace telemetry "MENU // NAV_INDEX_089".
>
> * Right: Active pill button "\[CLOSE ×\]" with #D4FF00 border and text.
>
> **2. Main 12-Column Split Layout:**
>
> * **Left 7 Columns (5 Monumental Numbered Navigation Rows separated by 1px #222226 lines):**
>
>   * Row 1 (Active/Hovered State — background #121216, left border 4px solid #D4FF00): Monospace "(001)", giant uppercase Syne title "⤷ WORKS", right-aligned pill badge "08 CASE STUDIES" in #D4FF00.
>
>   * Row 2: Monospace "(002)", giant title "SERVICES", subtitle "Graphics • Landing Pages • Web • UI/UX", badge "04 PILLARS".
>
>   * Row 3: Monospace "(003)", giant title "ABOUT STUDIO", subtitle "Manifesto • Process • Team", badge "15 AWARDS".
>
>   * Row 4: Monospace "(004)", giant title "UI PLAYGROUND", subtitle "Interactive Components & 3D Lab", badge "LABS ✦".
>
>   * Row 5: Monospace "(005)", giant title "LET'S TALK", subtitle "Interactive Project Configurator", badge "BOOK Q4 ⬏".
>
> * **Right 5 Columns (Live Preview & Studio Telemetry Panel):**
>
>   * Top Card: Framed 16:10 live preview window displaying a montage of the "WORKS" portfolio (dark SaaS dashboard UI + kinetic typography poster) with monospace overlay tags "\[PREVIEW // (001) VELOCE AI\]" and corner crosshair marks (+).
>
>   * Middle Card: Direct Business Inquiry block with label "NEW BUSINESS ⤷" and large clickable email "hello@kinetix-xp.com →" in #D4FF00.
>
>   * Bottom Card: 3-column studio clock strip in monospace: "NEW--YORK 06:51 EST", "LON--DON 11:51 GMT", "DE--LHI 16:21 IST", plus social links "LINKEDIN ⬏", "INSTAGRAM ⬏", "DRIBBBLE ⬏", "FIGMA ⬏".

#### Prompt 3: Works / Portfolio Archive Page (`/works`)

> **Prompt to paste into Google Stitch:** Design the Portfolio & Works Index page (`/works`, 1440px desktop) for "KINETIX XP", a Graphics, Web Design, Landing Page, and UI/UX Agency inspired by auge-xp.com/works. Dark obsidian background (#09090B), 1px solid #222226 structural grid lines, and #D4FF00 acid-lime accents.
>
> **1. Top Page Header & Filter Bar:**
>
> * Left: Giant uppercase Syne 700 headline "SELECTED ⤷ WORKS" with superscript counter "(001—008)".
>
> * Right: View mode switcher pills "\[≡ STREAM VIEW\]" and "\[⊞ BENTO GRID (Active #D4FF00)\]".
>
> * Filter Strip (full-width 1px bordered bar): Interactive filter pills: "ALL WORK (08)" (active in solid #D4FF00 with #09090B text), "LANDING PAGES (03)", "WEB DESIGN (03)", "PRODUCT UI/UX (04)", "GRAPHICS & BRANDING (02)".
>
> **2. Asymmetric Bento Portfolio Grid (6 Featured Projects across 3 Rows):**
>
> * **Row 1 (7 Cols + 5 Cols):**
>
>   * Card (001) \[7 Cols\]: "Veloce AI — Autonomous Workflow Product UI & Design System". Top bar with "(001)" and tags "\[UI/UX DESIGN\] \[DESIGN SYSTEM\]". Center shows a high-contrast dark SaaS node-graph interface mockup. Bottom bar shows "+168% User Activation" in #D4FF00 and "VIEW CASE STUDY ⬏".
>
>   * Card (002) \[5 Cols\]: "Krono Pay — Fintech Launch Landing Page". Top bar "(002)" and "\[LANDING PAGE\] \[3D GRAPHICS\]". Center shows a sleek mobile + desktop fintech hero mockup with metallic 3D cards. Bottom bar: "4.9% Visitor-to-Signup ⬏".
>
> * **Row 2 (5 Cols + 7 Cols):**
>
>   * Card (003) \[5 Cols\]: "Maison Aura — Luxury Editorial E-Commerce Web Design". Tags: "\[WEB DESIGN\] \[ART DIRECTION\]". Badge: "AWWWARDS SOTD ✦".
>
>   * Card (004) \[7 Cols\]: "Synthetix Cloud — GPU Infrastructure Web & Brand Identity". Tags: "\[GRAPHICS\] \[WEB DESIGN\] \[LANDING PAGE\]". Center shows isometric shader graphics and technical telemetry UI. Badge: "\$42M Series B Launch ⬏".
>
> * **Row 3 (6 Cols + 6 Cols):**
>
>   * Card (005): "Pulse OS — Wearable Health Mobile UI Kit". Tags: "\[MOBILE UI\] \[DESIGN TOKENS\]".
>
>   * Card (006): "Monolith — Architectural Graphic System & Microsite". Tags: "\[BRAND GRAPHICS\] \[WEBGL\]".
>
> **3. Bottom Conversion Strip:**
>
> * Full-width callout bar: "HAVE A PRODUCT LAUNCH OR REBRAND COMING UP?" with a solid #D4FF00 pill CTA "CONFIGURE YOUR PROJECT BRIEF ⬏".

#### Prompt 4: Services & Capabilities Page (`/services`)

> **Prompt to paste into Google Stitch:** Design the Services & Capabilities page (`/services`, 1440px desktop) for "KINETIX XP" Agency, showcasing 4 core services: Graphic Design, High-Converting Landing Pages, Custom Web Design, and Product UI/UX Design. Inspired by auge-xp.com/about capability blocks. Obsidian theme (#09090B), 1px #222226 grid borders, Syne + Plus Jakarta Sans + JetBrains Mono typography, and #D4FF00 accents.
>
> **1. Hero Banner:**
>
> * Monospace index "\[001 // CAPABILITIES & ENGAGEMENT MODELS\]".
>
> * Giant headline: "FULL-SPECTRUM ⤷ DESIGN ✽ BUILT FOR ./ CONVERSION & SCALE."
>
> * Right-aligned summary stat block: "120+ Interfaces Shipped | \$480M+ Client Equity Created | 15 International Design Awards".
>
> **2. Four Split-Screen Capability Deep-Dive Modules (Stacked with 1px #222226 dividers):**
>
> * **Module (01): GRAPHICS & BRAND IDENTITY** — Left column: Index "(01)", title, turnaround badge "2–3 WEEKS", CTA "Scope Graphics ⬏". Middle column: Deliverable pills (Logo & Visual Identity, 3D Abstract & Motion Graphics, Social & Ad Key Visuals, Pitch Deck Systems, Custom Iconography). Right column: Visual showcase card displaying brand guidelines, 3D chrome typography, and pitch deck slides.
>
> * **Module (02): HIGH-CONVERTING LANDING PAGES** — Left column: Index "(02)", title, turnaround badge "10–14 DAYS", CTA "Scope Landing Page ⬏" in #D4FF00. Middle column: Deliverable pills (Above-the-Fold Hero Architecture, Conversion Copy & Wireframing, Interactive Product Demos, Speed & CRO Optimization, Framer/Webflow Build). Right column: Annotated landing page wireframe & high-fidelity UI preview showing "+318% Conversion Lift".
>
> * **Module (03): CUSTOM WEB DESIGN & INTERACTIVE** — Left column: Index "(03)", title, turnaround badge "4–6 WEEKS". Middle column: Deliverable pills (Multi-page Marketing Sites, WebGL & GSAP Motion Storytelling, Headless CMS Integration, Technical SEO/GEO). Right column: Desktop & mobile responsive showcase.
>
> * **Module (04): PRODUCT UI/UX & DESIGN SYSTEMS** — Left column: Index "(04)", title, turnaround badge "ONGOING / SPRINT". Middle column: Deliverable pills (SaaS Web & Mobile App UI, Multi-Brand Figma Libraries, Google Stitch DESIGN.md Token Files, Interactive Prototypes & User Testing). Right column: Component library & dark-mode token inspector preview.
>
> **3. Transparent Engagement Models (3-Column Pricing Grid):**
>
> * **Card 1: LANDING PAGE SPRINT** — "\$8,500 / 2 Weeks" — Ideal for startup launches. Includes Custom Hero Graphics, Desktop/Mobile UI, Interactive Prototype & Framer/Webflow Handoff.
>
> * **Card 2 (Highlighted with #D4FF00 border): FLAGSHIP WEB & BRAND** — "\$22,000 / 5 Weeks" — Complete Brand Graphics, Multi-Page Web Design, Motion Assets, CMS & SEO Setup.
>
> * **Card 3: DEDICATED UI/UX SQUAD** — "\$11,000 / Month" — Embedded Senior UI/UX + Graphic Designer, Unlimited Design Requests, Figma & DESIGN.md System Ownership, Slack Collaboration.

#### Prompt 5: Case Study Detail Page (`/works/veloce-ai`)

> **Prompt to paste into Google Stitch:** Design a high-converting Case Study Detail page (`/works/veloce-ai`, 1440px desktop) for the "KINETIX XP" design agency, showcasing the "Veloce AI" Product UI, Brand Graphics, and Launch Landing Page project. Obsidian dark background (#09090B), 1px #222226 grid hairlines, #D4FF00 accents.
>
> **1. Case Study Header & KPI Scoreboard:**
>
> * Top breadcrumb: "← BACK TO WORKS // CASE STUDY (001)".
>
> * Giant title: "VELOCE AI ⤷ AUTONOMOUS WORKFLOW UI & LAUNCH LANDING PAGE".
>
> * 4-Column KPI Impact Bar (1px bordered cells):
>
>   * Cell 1: "+168%" in 48px Syne #D4FF00 — "User Onboarding Activation"
>
>   * Cell 2: "4.9%" — "Landing Page Signup Conversion (Up from 1.2%)"
>
>   * Cell 3: "64 Screens" — "End-to-End Product UI & Figma Token System"
>
>   * Cell 4: "21 Days" — "Concept to Production Launch"
>
> **2. Full-Bleed Hero Showcase:**
>
> * Wide 16:9 presentation frame showing the Veloce AI dark-mode landing page alongside floating 3D glassmorphic workflow cards and mobile app screens.
>
> **3. Two-Column Sticky Narrative & Artifact Walkthrough:**
>
> * **Left 4 Columns (Sticky Metadata Sidebar):** Client ("Veloce AI, San Francisco"), Scope tags ("\[BRAND GRAPHICS\]", "\[LANDING PAGE DESIGN\]", "\[PRODUCT UI/UX\]", "\[DESIGN.MD TOKENS\]"), Timeline ("Q3 2026"), Live Site link ("veloce.ai ⬏" in #D4FF00), and Client Quote card from the CEO.
>
> * **Right 8 Columns (Scrolling Visual Breakdown):**
>
>   * Block 01: "THE CHALLENGE & CONVERSION BOTTLENECK" with text analysis and a Before/After hero wire-to-UI slider.
>
>   * Block 02: "TYPOGRAPHY, COLOR & DESIGN TOKENS" displaying swatch cards (#09090B, #D4FF00, #6366F1) and type specimen scales.
>
>   * Block 03: "HIGH-CONVERTING LANDING PAGE ARCHITECTURE" showing full-page annotated desktop and mobile scroll views.
>
>   * Block 04: "PRODUCT UI & COMPONENT LIBRARY" showing interactive data tables, command palette (`⌘K`), and node canvas widgets.
>
> **4. Next Project Footer Banner:**
>
> * Full-width interactive row: "NEXT PROJECT (002) ⤷ KRONO PAY — FINTECH LANDING PAGE & 3D GRAPHICS →".

#### Prompt 6: Contact & Interactive Project Configurator Page (`/contact`)

> **Prompt to paste into Google Stitch:** Design the Contact & Project Inquiry page (`/contact`, 1440px desktop) for "KINETIX XP" Agency, combining auge-xp.com/contacts editorial typography with an interactive multi-pill project configurator. Obsidian dark canvas (#09090B), 1px solid #222226 grid lines, #D4FF00 accents.
>
> **1. 12-Column Split Architecture:**
>
> * **Left 5 Columns (Editorial Contact & Studio Hubs — auge-xp.com style):**
>
>   * Monospace label "\[005 // INITIATE A PROJECT\]".
>
>   * Giant Syne 800 headline: "READY TO BE" "⤷ IN MOTION?"
>
>   * Direct Email Link: Oversized pill/row "hello@kinetix-xp.com →" in #D4FF00 with a subtle "\[COPY EMAIL\]" tag.
>
>   * 3 Hyphenated City Hub Cards separated by 1px #222226 lines (matching auge-xp.com/contacts):
>
>     * Card 1: "NEW--YORK" | "SoHo Creative Loft, 459 Broadway, NY" | "06:51 EST" | "View in Maps →"
>
>     * Card 2: "LON--DON" | "Redchurch St Studio, Shoreditch, UK" | "11:51 GMT" | "View in Maps →"
>
>     * Card 3: "DE--LHI" | "DLF Cyber Hub Design Lab, NCR, IN" | "16:21 IST" | "View in Maps →"
>
> * **Right 7 Columns (Interactive Project Brief Configurator Card on #121216 surface):**
>
>   * Step 01 // "WHAT DO YOU NEED DESIGNED? (SELECT ALL THAT APPLY)"
>
>     * Interactive multi-select pills: "\[✓ HIGH-CONVERTING LANDING PAGE\]" (Selected: #D4FF00 fill, #09090B text), "\[✓ PRODUCT UI/UX DESIGN\]" (Selected: #D4FF00 fill), "\[CUSTOM WEB DESIGN\]", "\[GRAPHICS & BRAND IDENTITY\]", "\[DESIGN SYSTEM / DESIGN.MD\]", "\[MOTION & 3D ASSETS\]".
>
>   * Step 02 // "ESTIMATED PROJECT INVESTMENT"
>
>     * Single-select pills: "\[\$5K – $10K\]", "\[✓ $10K – $25K\]" (Selected #D4FF00), "\[$25K – $50K\]", "\[$50K+ / ENTERPRISE\]".
>
>   * Step 03 // "TARGET TIMELINE"
>
>     * Single-select pills: "\[⚡ 2-WEEK SPRINT\]" (Selected #D4FF00), "\[1 – 2 MONTHS\]", "\[ONGOING MONTHLY RETAINER\]".
>
>   * Step 04 // "PROJECT DETAILS"
>
>     * Clean dark-mode inputs (`#09090B` fill, `1px solid #222226` border) for "Your Name \*", "Work Email \*", "Company / Current Website URL", and "Tell us about your goals, conversion targets, or launch date...".
>
>   * Bottom Action Row: Full-width solid #D4FF00 pill button "SEND PROJECT BRIEF & BOOK DISCOVERY CALL ⬏" alongside a live trust note "⚡ Average response time: Under 4 business hours".

#### Prompt 7: Mobile Responsive Views (`390px iPhone Viewport — Home + Open Menu`)

> **Prompt to paste into Google Stitch:** Design two side-by-side mobile web screens (390x844px) for the "KINETIX XP" creative design agency (inspired by auge-xp.com): Screen A is the Mobile Home Page, and Screen B is the Mobile Full-Screen Open Menu. Obsidian dark background (#09090B), 1px #222226 grid hairlines, #D4FF00 acid-lime accents.
>
> **Screen A (Mobile Home Page):**
>
> * Sticky Top Header (60px): Left "KINETIX® XP" + green status dot; Right compact "\[MENU +\]" pill button and "TALK ⬏" #D4FF00 button.
>
> * Hero Section: Monospace tag "\[001 // GRAPHICS • WEB • UI STUDIO\]", stacked 44px Syne 800 headline "⤷ WHERE BOLD 'GRAPHICS' ✽ AND ./ HIGH-CONVERTING UI ✦ MERGE.", compact 16:9 showreel video card with "PLAY REEL ▶" badge, and full-width #D4FF00 pill CTA "EXPLORE SELECTED WORK ⬏".
>
> * Mobile Works Stream: Vertical stacked project cards for "(001) Veloce AI — Product UI (+168% Activation)" and "(002) Krono Pay — Landing Page (4.9% Conv.)" with crisp 16:10 UI thumbnails and discipline pills.
>
> **Screen B (Mobile Full-Screen Open Menu):**
>
> * Top Header: "KINETIX® XP" on left, "\[CLOSE ×\]" button in #D4FF00 on right.
>
> * Vertical Stack of 5 numbered rows with 1px #222226 borders:
>
>   * "(001) ⤷ WORKS \[08\]" (Active in #D4FF00)
>
>   * "(002) SERVICES \[04\]"
>
>   * "(003) ABOUT STUDIO"
>
>   * "(004) UI PLAYGROUND"
>
>   * "(005) LET'S TALK ⬏"
>
> * Bottom Drawer Section: Quick "START A PROJECT" pill selector ("Landing Page", "Web Design", "UI/UX", "Graphics"), direct email "hello@kinetix-xp.com →", and studio timezones "NYC • LDN • DEL".