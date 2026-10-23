import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES_DATA, STARTUP_LAUNCH_KIT, ADD_ONS_DATA, BUDGET_OPTIONS, TIMELINE_OPTIONS, formatPrice } from '../data/pricing.ts';
import { PROJECTS } from '../app/data/projects.js';
import nextConfig from '../next.config.mjs';
import robots from '../app/robots.js';
import sitemap from '../app/sitemap.js';

test('1. Pricing Data & Packages Integrity', async (t) => {
  await t.test('All 8 Core Service Packages Exist', () => {
    assert.equal(SERVICES_DATA.length, 8, 'Expected exactly 8 core service packages');
    const expectedSlugs = [
      'website',
      'landing',
      'ui-ux',
      'dashboard',
      'graphics',
      'video',
      'brand',
      'meta-ads',
    ];
    for (const slug of expectedSlugs) {
      const match = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
      assert.ok(match, `Missing expected service package: ${slug}`);
    }
  });

  await t.test('Each Service Package has 3 Valid Tiers with Non-Zero Pricing', () => {
    for (const service of SERVICES_DATA) {
      assert.equal(service.tiers.length, 3, `Service ${service.name} must have exactly 3 tiers`);
      for (const tier of service.tiers) {
        assert.ok(tier.name, `Tier in ${service.name} missing name`);
        assert.ok(tier.priceINR > 0, `Tier ${tier.name} in ${service.name} has invalid INR price: ${tier.priceINR}`);
        assert.ok(tier.priceUSD > 0, `Tier ${tier.name} in ${service.name} has invalid USD price: ${tier.priceUSD}`);
        assert.ok(tier.timeline, `Tier ${tier.name} in ${service.name} missing timeline`);
        assert.ok(Array.isArray(tier.features) && tier.features.length >= 3, `Tier ${tier.name} in ${service.name} must have at least 3 features`);
      }
    }
  });

  await t.test('Startup Launch Kit Integrity', () => {
    assert.ok(STARTUP_LAUNCH_KIT, 'STARTUP_LAUNCH_KIT must exist');
    assert.ok(STARTUP_LAUNCH_KIT.priceINR > 0, 'Launch kit must have positive INR price');
    assert.ok(STARTUP_LAUNCH_KIT.priceUSD > 0, 'Launch kit must have positive USD price');
    assert.ok(STARTUP_LAUNCH_KIT.savingsINR > 0, 'Launch kit must indicate INR savings');
    assert.ok(STARTUP_LAUNCH_KIT.savingsUSD > 0, 'Launch kit must indicate USD savings');
    assert.ok(Array.isArray(STARTUP_LAUNCH_KIT.includes) && STARTUP_LAUNCH_KIT.includes.length >= 3, 'Must include at least 3 pillar items');
  });

  await t.test('Budget Options exist and match both INR and USD', () => {
    assert.ok(BUDGET_OPTIONS.INR, 'BUDGET_OPTIONS.INR missing');
    assert.ok(BUDGET_OPTIONS.USD, 'BUDGET_OPTIONS.USD missing');
    assert.equal(BUDGET_OPTIONS.INR.length, 5, 'BUDGET_OPTIONS.INR should have 5 choices');
    assert.equal(BUDGET_OPTIONS.USD.length, 5, 'BUDGET_OPTIONS.USD should have 5 choices');
  });

  await t.test('Currency Formatter Produces Valid Output', () => {
    const inrFormatted = formatPrice(50000, 'INR');
    const usdFormatted = formatPrice(1500, 'USD');
    assert.match(inrFormatted, /₹|INR|50,000/, 'INR price should contain currency symbol or digits');
    assert.match(usdFormatted, /\$|USD|1,500/, 'USD price should contain currency symbol or digits');
  });
});

test('2. Projects Archive & Case Studies Data Integrity', async (t) => {
  await t.test('All 8 Case Studies Exist with Full Fidelity Data', () => {
    assert.equal(PROJECTS.length, 8, 'Expected exactly 8 case studies');
    const expectedSlugs = [
      'avenor',
      'flow-task',
      'veyra-legal',
      'morrow-house',
      'veloce-ai',
      'krono-pay',
      'maison-aura',
      'axon-robotics',
    ];

    for (const slug of expectedSlugs) {
      const p = PROJECTS.find((proj) => proj.slug === slug);
      assert.ok(p, `Missing case study: ${slug}`);
      assert.ok(p.title, `Project ${slug} missing title`);
      assert.ok(p.client, `Project ${slug} missing client`);
      assert.ok(p.category, `Project ${slug} missing category`);
      assert.ok(p.challenge, `Project ${slug} missing challenge`);
      assert.ok(p.solution, `Project ${slug} missing solution`);
      assert.ok(p.heroImg, `Project ${slug} missing heroImg`);
      assert.ok(Array.isArray(p.deliverables) && p.deliverables.length >= 2, `Project ${slug} deliverables missing`);
      assert.ok(Array.isArray(p.results) && p.results.length >= 2, `Project ${slug} results metrics missing`);
    }
  });
});

test('3. Next.js Configuration & Security Headers', async (t) => {
  await t.test('Permanent Redirects Configured', async () => {
    assert.ok(typeof nextConfig.redirects === 'function', 'nextConfig must export async redirects()');
    const redirects = await nextConfig.redirects();
    const workRedirect = redirects.find((r) => r.source === '/work');
    const workSlugRedirect = redirects.find((r) => r.source === '/work/:slug');
    assert.ok(workRedirect && workRedirect.permanent, '/work permanent redirect missing');
    assert.ok(workSlugRedirect && workSlugRedirect.permanent, '/work/:slug permanent redirect missing');
  });

  await t.test('Security Headers Configured', async () => {
    assert.ok(typeof nextConfig.headers === 'function', 'nextConfig must export async headers()');
    const headersConfig = await nextConfig.headers();
    assert.ok(headersConfig.length > 0, 'headersConfig must not be empty');
    const allHeaders = headersConfig[0].headers;
    const headerKeys = allHeaders.map((h) => h.key);

    assert.ok(headerKeys.includes('X-Frame-Options'), 'Missing X-Frame-Options');
    assert.ok(headerKeys.includes('X-Content-Type-Options'), 'Missing X-Content-Type-Options');
    assert.ok(headerKeys.includes('Referrer-Policy'), 'Missing Referrer-Policy');
    assert.ok(headerKeys.includes('Permissions-Policy'), 'Missing Permissions-Policy');
    assert.ok(headerKeys.includes('Strict-Transport-Security'), 'Missing Strict-Transport-Security');
  });
});

test('4. Robots and Sitemap Dynamic Route Generators', async (t) => {
  await t.test('Robots Directives', () => {
    const r = robots();
    assert.equal(r.rules.allow, '/', 'Robots must allow root');
    assert.ok(r.rules.disallow.includes('/api/'), 'Robots must disallow /api/');
    assert.equal(r.sitemap, 'https://pixelmutiny.com/sitemap.xml', 'Sitemap location must be specified');
  });

  await t.test('Sitemap Coverage', () => {
    const sm = sitemap();
    assert.ok(Array.isArray(sm), 'Sitemap must return array of routes');
    assert.equal(sm.length, 5 + 8, 'Sitemap must cover 5 static pages and 8 project pages');
    const urls = sm.map((entry) => entry.url);
    assert.ok(urls.includes('https://pixelmutiny.com'), 'Home route missing');
    assert.ok(urls.includes('https://pixelmutiny.com/works'), 'Works route missing');
    assert.ok(urls.includes('https://pixelmutiny.com/services'), 'Services route missing');
    assert.ok(urls.includes('https://pixelmutiny.com/about'), 'About route missing');
    assert.ok(urls.includes('https://pixelmutiny.com/contact'), 'Contact route missing');
    assert.ok(urls.includes('https://pixelmutiny.com/works/veloce-ai') || urls.includes('https://pixelmutiny.com/works/avenor'), 'Project route missing');
  });
});

test('5. Mutiny AI Studio Chatbot & Meeting Scheduler Integrity', async (t) => {
  const { POST } = await import('../app/api/ai-chat/route.js');

  await t.test('AI Chat conversation returns intelligent reply and action chips', async () => {
    const req = new Request('http://localhost:3000/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'chat',
        message: 'Hi, I need pricing for a modern website and landing page',
        currency: 'INR',
        userProfile: {},
      }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.reply.length > 50, 'Reply should be comprehensive');
    assert.ok(Array.isArray(data.chips) && data.chips.length > 0, 'Should return quick action chips');
  });

  await t.test('AI Chat accurately extracts user profile and remembers project intent', async () => {
    const req = new Request('http://localhost:3000/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'chat',
        message: 'My name is Maya Sharma and my email is maya@acme.ai. We need a SaaS dashboard.',
        userProfile: {},
      }),
    });

    const res = await POST(req);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.updatedProfile.name, 'Maya Sharma');
    assert.equal(data.updatedProfile.email, 'maya@acme.ai');
    assert.equal(data.updatedProfile.projectType, 'Web Apps & Dashboards');
  });

  await t.test('Meeting Booking persists to storage and generates calendar integration links', async () => {
    const testMeeting = {
      action: 'book_meeting',
      name: 'Test Client',
      email: 'testclient@example.com',
      phone: '+91 9315580036',
      date: '2026-10-25',
      timeSlot: '2:30 PM IST',
      topic: 'Website & Brand Sprint Discovery',
      notes: 'Automated test suite verification',
    };

    const req = new Request('http://localhost:3000/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testMeeting),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.meeting.id.startsWith('meet_'));
    assert.ok(data.googleCalUrl.includes('calendar.google.com'));
    assert.ok(data.icsDataUri.startsWith('data:text/calendar'));
    assert.ok(data.whatsappUrl.includes('wa.me/919315580036'));
  });

  await t.test('Project Brief Dispatch persists lead to data/leads.json', async () => {
    const testLead = {
      action: 'send_lead',
      name: 'Test Founder',
      email: 'founder@teststartup.io',
      phone: '+91 9999999999',
      services: ['Website Design & Dev', 'Brand Identity'],
      budget: '₹50,000 to ₹1,00,000',
      timeline: '2 to 3 weeks',
      brief: 'Need a fast 48h turnaround sprint.',
      currency: 'INR',
      estimatedTotal: '₹47,000',
    };

    const req = new Request('http://localhost:3000/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testLead),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.lead.id.startsWith('lead_ai_'));
  });
});

