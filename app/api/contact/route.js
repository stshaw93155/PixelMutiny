import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// In-memory rate limiting map: ip -> array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();

  // Periodic eviction of expired IPs to prevent unbounded memory growth
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (!times.some((t) => now - t < RATE_LIMIT_WINDOW)) {
        rateLimitMap.delete(key);
      }
    }
  }

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// XSS / HTML Injection defense for email rendering
function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Email Header / CRLF injection defense for subjects
function sanitizeHeader(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[\r\n]+/g, ' ').trim();
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function saveLeadToDatabase(lead) {
  try {
    let existingLeads = [];
    try {
      const data = await fs.readFile(LEADS_FILE, 'utf-8');
      existingLeads = JSON.parse(data);
    } catch {
      existingLeads = [];
    }

    existingLeads.unshift(lead);
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(existingLeads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DATABASE LEAD SAVE ERROR]:', err);
  }
}

async function sendResendEmails(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[RESEND NOTICE]: RESEND_API_KEY not configured. Lead recorded in database.');
    return { sent: false, reason: 'No API Key' };
  }

  try {
    const safeName = sanitizeHeader(lead.name);
    const safeServicesSummary = sanitizeHeader(lead.services.join(', ') || 'General Inquiry');

    // 1. Send notification email to agency
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PixelMutiny Leads <leads@pixelmutiny.com>',
        to: ['hello@pixelmutiny.com'],
        subject: `New Project Inquiry: ${safeName} (${safeServicesSummary})`,
        html: `
          <h2>New Project Specification Received</h2>
          <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
          <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(lead.phone || 'N/A')}</p>
          <p><strong>Company / URL:</strong> ${escapeHtml(lead.companyUrl || 'N/A')}</p>
          <p><strong>Services:</strong> ${escapeHtml(lead.services.join(', '))}</p>
          <p><strong>Budget:</strong> ${escapeHtml(lead.budget)}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(lead.timeline)}</p>
          <p><strong>Currency:</strong> ${escapeHtml(lead.currency)}</p>
          <p><strong>Estimated Starting Price:</strong> ${escapeHtml(lead.estimatedTotal)}</p>
          <p><strong>Project Brief:</strong></p>
          <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #000;">${escapeHtml(lead.brief) || 'No brief provided.'}</blockquote>
          <hr/>
          <small>Submitted at: ${escapeHtml(lead.createdAt)} from IP: ${escapeHtml(lead.ip)}</small>
        `,
      }),
    });

    // 2. Send automated confirmation to client
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PixelMutiny <hello@pixelmutiny.com>',
        to: [lead.email],
        subject: `We received your project brief, ${safeName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0c;">
            <h2>We got your project brief.</h2>
            <p>Hi ${escapeHtml(lead.name)},</p>
            <p>Thank you for reaching out to PixelMutiny. We have received your project details regarding <strong>${escapeHtml(lead.services.join(', '))}</strong> with a target timeline of <strong>${escapeHtml(lead.timeline)}</strong>.</p>
            <p>A senior partner is reviewing your scope and will reply within 24 business hours with our proposed sprint plan and exact estimate.</p>
            <p>If you prefer to speak sooner, feel free to message us directly on WhatsApp or reply to this email.</p>
            <br/>
            <p>Best regards,<br/><strong>PixelMutiny Team</strong><br/>PixelMutiny DigiMedia LLP<br/>New Delhi, India</p>
          </div>
        `,
      }),
    });

    return { sent: true };
  } catch (error) {
    console.error('[RESEND EMAIL ERROR]:', error);
    return { sent: false, error: error.message };
  }
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    // Rate limit check: max 5 submissions per hour per IP
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            'Too many requests from this address. Please wait an hour or email us directly at hello@pixelmutiny.com.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check: hidden website_hp field must be empty
    if (body.website_hp && typeof body.website_hp === 'string' && body.website_hp.trim().length > 0) {
      // Quietly succeed to fool bots without saving spam
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // Server-side validation & bounds checking
    const name = (typeof body.name === 'string' ? body.name : '').trim();
    const email = (typeof body.email === 'string' ? body.email : '').trim();
    const phone = (typeof body.phone === 'string' ? body.phone : '').trim();
    const companyUrl = (typeof body.companyUrl === 'string' ? body.companyUrl : '').trim();
    const brief = (typeof body.brief === 'string' ? body.brief : '').trim();
    const services = Array.isArray(body.services) ? body.services : [];
    const budget = (typeof body.budget === 'string' ? body.budget : 'Not specified').slice(0, 100);
    const timeline = (typeof body.timeline === 'string' ? body.timeline : 'Flexible').slice(0, 100);
    const currency = body.currency === 'USD' ? 'USD' : 'INR';
    const estimatedTotal = (typeof body.estimatedTotal === 'string' ? body.estimatedTotal : 'Custom scope').slice(0, 100);

    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Please enter your full name (2 to 100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length > 100 || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    if (phone.length > 50) {
      return NextResponse.json(
        { error: 'Phone number is too long (maximum 50 characters).' },
        { status: 400 }
      );
    }

    if (companyUrl.length > 200) {
      return NextResponse.json(
        { error: 'Company or website URL is too long (maximum 200 characters).' },
        { status: 400 }
      );
    }

    if (brief.length > 10000) {
      return NextResponse.json(
        { error: 'Project brief is too long (maximum 10,000 characters).' },
        { status: 400 }
      );
    }

    const cleanServices = services
      .slice(0, 20)
      .map((s) => (typeof s === 'string' ? s.slice(0, 100).trim() : ''))
      .filter(Boolean);

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      ip,
      name,
      email,
      phone,
      companyUrl,
      brief,
      services: cleanServices,
      budget,
      timeline,
      currency,
      estimatedTotal,
    };

    // 1. Save lead locally to database/file
    await saveLeadToDatabase(leadRecord);

    // 2. Email via Resend if configured
    await sendResendEmails(leadRecord);

    return NextResponse.json({
      success: true,
      message: "Got it. I'll reply within 24 hours.",
      lead: {
        id: leadRecord.id,
        name: leadRecord.name,
        email: leadRecord.email,
        services: leadRecord.services,
        timeline: leadRecord.timeline,
        budget: leadRecord.budget,
      },
    });
  } catch (error) {
    console.error('[CONTACT API ROUTE ERROR]:', error);
    return NextResponse.json(
      {
        error:
          'An unexpected server error occurred. Please contact hello@pixelmutiny.com directly.',
      },
      { status: 500 }
    );
  }
}
