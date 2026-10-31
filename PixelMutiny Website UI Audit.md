# PixelMutiny Website UI Audit

**Reviewed:** 30 October 2026  
**Site:** [pixelmutiny.vercel.app](https://pixelmutiny.vercel.app/)  
**Scope:** Homepage, Services, Work archive, Agency/About, Contact, all eight portfolio case studies, advertised legal routes, footer destinations, and a Work archive category-filter interaction.

## Executive summary

The site has a recognizable visual direction: bold editorial typography, strong contrast, and a yellow accent. The main opportunity is restraint. Across the site, status labels, tiny chips, section numbers, tickers, floating UI, lengthy descriptions, and overlapping packages compete for attention. At times, the presentation reads more like a dashboard or template showcase than a focused premium agency.

The highest-priority fixes are not animation or decoration. They are: **repairing broken/misleading destinations, establishing credible and consistent portfolio proof, simplifying the package structure, and reducing the Contact form to a few easy decisions.**

## Priority fixes

### 1. Fix legal and footer destinations

- In the footer, **Privacy Policy** and **Terms of Use** both point to `/contact`.
- Direct visits to `/privacy-policy` and `/terms-of-use` return the site's 404 page.
- **Studio Awards** and **Press & News** point to `/about`; **Motion Reel** points to `/works`. These labels promise destinations that do not appear to exist as separate pages.
- Create the promised pages, or change/remove the links so the label accurately describes the destination. Legal links should lead to actual legal documents, not the Contact page.
- The 404 page is visually branded, but it leaves a large blank area under the error content. Tighten the vertical layout and make the next steps clear.

### 2. Reconcile concept work, awards, metrics, and testimonials

Several case studies pair a **“Concept Sample”** badge with client-style results, testimonials, or award claims. Examples include Veloce AI, Krono Pay, Maison Aura, and Axon Robotics. This is a major trust issue because visitors cannot tell whether the work is a concept, a real client engagement, or an award-winning project.

- If a project is self-initiated, label it prominently as a **concept / self-initiated project** and do not present invented client quotations, real-world performance metrics, or third-party awards as verified results.
- If it is client work, remove the concept label and support claims with clear evidence, attribution, or a careful explanation of measurement.
- Verify every award badge and metric before using it as proof.
- Testimonials use **“PixelMutiny XP,”** which does not match the site’s PixelMutiny DigiMedia name. Standardize the brand name and confirm that quoted people and companies have approved the testimonials.

### 3. Make portfolio results consistent

The homepage assigns **“+340% Traffic — Impact”** to Avenor, FlowTask, and Veyra. Their case-study pages report different outcomes: Avenor **+185% Fulfillment**, FlowTask **+210% Sprint Velocity**, and Veyra **+320% Inquiry Volume**. The Agency ledger also uses the latter metrics. Align the homepage cards, Agency ledger, and case studies—or explicitly state that the metrics describe different outcomes and provide context.

The Agency ledger lists **Synthetix Cloud**, while the Work archive lists **Axon Robotics** instead. Reconcile the project lists so the advertised set of eight matches across the site.

### 4. Simplify and standardize pricing

Pricing is currently spread across homepage “from” prices, core offers, website tiers, monthly retainers, bundles, custom scope, and Contact-form price labels. Visitors have to determine which offer is current and how the options relate.

- Choose one primary package structure and use it on Services and Contact.
- State what each price includes, the currency, any applicable GST/tax treatment, and what is a starting price versus a fixed price.
- Distinguish one-time projects from monthly support.
- Ensure prices and names match wherever they appear. For example, the site offers website work from $300, while “Business Website Pro” costs $600; this may be intentional, but the difference needs a clear explanation.

### 5. Reduce Contact-form friction

The current form asks users to navigate service types, multiple retainers, a long add-on list, budget ranges, timelines, personal details, and project notes. The numerous options create work before a visitor can even start a conversation.

- Remove the long add-on checklist and live scope calculator from the first step.
- Ask only what is needed to begin a conversation; gather detailed scope later.
- Make optional questions genuinely optional and progressively reveal them rather than showing every decision at once.
- Standardize the public email: the homepage shows `contact@pixelmutiny.com`, while Contact shows `hello@pixelmutiny.com`.
- State the currency and India/GST handling clearly, especially because the Contact page labels the estimate USD/international.

## Page-by-page findings

### Homepage — `/`

**What works:** The headline and visual direction are memorable; the page has a clear route into Services, Work, and Contact.

**Issues and recommendations:**

- The hero combines Studio Mode, an audio control, chat/activity cards, role labels, status text, a showreel, and multiple calls to action. Too many details compete with the main message.
- Keep one main headline, a single primary CTA, one quieter secondary CTA, and one strong project visual or proof point. Move secondary UI to later sections or remove it.
- The repeating technology ticker and persistent AI assistant add noise. Reduce their prominence, frequency, or presence on smaller screens.
- Repeated technical claims and positioning appear in multiple sections. Make the homepage a concise introduction rather than a compressed version of the entire Services and Agency pages.
- The three homepage portfolio cards use the same “+340% Traffic” result; replace this with verified, project-specific outcomes that agree with the case studies.
- Standardize the contact email with the Contact page.

### Services — `/services`

**Main issue: too many overlapping package families.** The page includes core commercial offers, capabilities, selected work, website tiers, monthly partnerships, bundles, bespoke engagements, and FAQ. Some content is useful, but the number of parallel package systems makes comparison difficult.

**Recommended simpler structure:**

1. **Launch** — a focused landing page or starter site.
2. **Growth** — a fuller business website with lead capture.
3. **Custom** — larger websites, ecommerce, CRM/automation, or work outside the standard scope.

For each package, show only:

- Who it is for
- A short list of included deliverables
- Starting price (or fixed price, clearly labeled)
- Typical timeline
- One CTA

Keep ongoing retainers in a separate, smaller section. Merge, remove, or subordinate duplicate bundles and core-offer cards so visitors compare one coherent set of packages. Keep specialist capabilities available without turning each into another competing package.

Other Services findings:

- The jump menu uses section numbers that do not match the headings below. For instance, the menu labels FAQ as 08 while the page heading labels it 09. Align the numbering and link labels.
- The amount of detailed deliverable text makes the page long and difficult to scan. Use a concise summary with optional detail/FAQ for scope boundaries.
- Make price, timeline, tax, and “starting at” conventions consistent with the homepage and Contact form.

### Work archive — `/works`

**What works:** The category filters function; testing **UI/UX Systems** narrowed the grid to the two matching projects.

**Issues and recommendations:**

- Eight cards are displayed with many small tags and badges competing for attention. The cards are visually compact for work intended to sell design craft.
- Lead with fewer, larger featured projects that show a strong image, a concise project summary, your role, and one defensible result. Place the rest in a secondary archive.
- Clarify what labels such as “PRO,” “SOTD,” and “DEV” mean. Use awards only if they are real and verifiable; avoid badges that read as decorative or unsubstantiated.
- Make the archive categories and project types agree with case-study metadata and the Agency page.

### Agency/About — `/about`

**Issues and recommendations:**

- The page repeats the positioning through the intro, “Who We Are,” values, advantages, audience sections, benchmark ledger, operations/location material, and closing CTA. Trim repeated claims and give the space to a real founder/team story, working process, or specific client proof.
- The portfolio ledger lists Synthetix Cloud while the Work archive includes Axon Robotics instead. Reconcile the lists and the total of eight projects.
- Location wording varies among New Delhi, Gurugram, and Delhi NCR. State the actual location consistently and describe it plainly.
- The live clock, studio/location panels, status labels, benchmark table, ticker, and multiple repeated trust claims add interface noise. Keep the few details that genuinely reassure clients.
- Claims such as “100% Original,” “Lighthouse 100,” “2-week sprints,” and “zero technical debt” should be specific, supportable, and qualified where needed.

### Contact — `/contact`

**Main issue: too many choices before the visitor can send a brief.** The form has service and retainer selections, many add-ons, budget choices, timeline choices, personal details, and project notes.

**Recommended simpler first step:**

1. **What do you need?** Website, Brand, Creative/Marketing, Automation, or Not sure.
2. **Name**
3. **Email**
4. **Short project summary**
5. Optional: **budget range** and **target timing**

Remove the long add-on list and live scope calculator from the initial form. Ask follow-up questions after the agency has replied or reveal them only when relevant. Keep email and WhatsApp as simple alternatives outside the form.

Additional findings:

- The page’s two-column layout contains useful contact information, but the form dominates and the left side repeats contact/response assurances.
- Standardize the public email with the homepage.
- Clarify the currency and tax handling, especially for India-based clients versus international USD estimates.
- Keep the response-time promise only if it can be met consistently.

### Case studies — `/works/avenor`, `/works/flow-task`, `/works/veyra-legal`, `/works/morrow-house`, `/works/veloce-ai`, `/works/krono-pay`, `/works/maison-aura`, `/works/axon-robotics`

**Shared issues:**

- The case studies are very long and share a repetitive sequence: challenge, solution, results, many screenshots, palette, typography, process, and additional detail. Shorten each page to the most convincing evidence and make the story specific to that project.
- Several pages reuse the same project image in multiple screen/process sections. For example, the Axon Robotics hero image appears repeatedly later on the page. Use distinct, labeled screenshots or remove redundant repeats.
- The repeated page template is useful for consistency, but every project needs an individual narrative and genuinely different evidence. Reduce repeated generic phrases such as “Strategic Challenge & Architecture” and “Measurable Velocity & Business Outcomes.”
- Make concept work, client work, awards, testimonials, and measured results unambiguous and verifiable.

**Specific checks:**

- **Avenor:** Detailed page reports +185% fulfillment, which conflicts with the homepage’s +340% traffic claim.
- **FlowTask:** Detailed page reports +210% sprint velocity, which conflicts with the homepage’s +340% traffic claim.
- **Veyra Legal:** Detailed page reports +320% inquiries, which conflicts with the homepage’s +340% traffic claim.
- **Morrow House:** Repeated page images and an extensive metrics/testimonial story; verify the claims and use distinct visuals.
- **Veloce AI:** Tagged “Graphics & Brand” despite being described as product UI/UX; its award-style label appears beside “Concept Sample.”
- **Krono Pay:** “Verified CRO” appears beside “Concept Sample.” Clarify whether it is a concept or a measured client engagement.
- **Maison Aura:** “FWA of the Day” appears beside “Concept Sample.” Clarify the relationship and verify any award claim.
- **Axon Robotics:** “Red Dot Best of the Best” appears beside “Concept Sample.” Clarify the relationship and verify the award and metrics. The hero image is repeated in later sections.

### Legal routes and 404 — `/privacy-policy`, `/terms-of-use`

Both direct routes return the branded 404 page. The footer currently sends both corresponding labels to Contact, so these are both destination and content gaps. Publish the legal pages or remove the links until the pages are ready. Then tighten the 404 layout, particularly the large blank area below the error panel.

## Premium visual direction

- Keep the typography, contrast, and accent color; reduce decorative interface chrome.
- Use fewer chips, labels, counters, tickers, badges, and overlapping status panels.
- Give the best portfolio work more space and let authentic project evidence carry the sales message.
- Use fewer, clearer calls to action: one primary action per section is usually enough.
- Shorten repeated positioning copy and reserve detailed service or process information for the page where it belongs.
- Keep floating widgets from obscuring content, especially on small screens; consider making the assistant opt-in or less prominent.
- Test responsive layouts, image loading, button targets, and form usability at a real mobile width before launch. This review did not verify the site at a 390px viewport.

## Suggested order of work

1. Fix footer/legal destinations and missing legal pages.
2. Decide which portfolio pieces are client work versus concepts; verify or remove awards, metrics, and testimonials.
3. Align portfolio project lists, labels, and results across homepage, Work, Agency, and case studies.
4. Replace the Services package maze with Launch, Growth, and Custom, plus a small separate retainer section.
5. Replace the Contact mega-form with a short first-step brief and optional details.
6. Reduce repeated content and decorative UI across the homepage and Agency page.
7. Curate unique imagery and shorten the case studies.
8. Run a dedicated mobile QA pass at common phone widths and verify all links and interactive states.
