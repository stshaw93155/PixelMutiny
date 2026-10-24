import fs from 'fs/promises';
import path from 'path';
import { executeAiConversation } from '../../../lib/ai/neuralBrain.js';

const MEETINGS_FILE = path.join(process.cwd(), 'data', 'meetings.json');
const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

// XSS / Injection sanitizer
function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeHeader(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[\r\n]+/g, ' ').trim();
}

async function saveMeeting(meeting) {
  try {
    let existing = [];
    try {
      const data = await fs.readFile(MEETINGS_FILE, 'utf-8');
      existing = JSON.parse(data);
    } catch {
      existing = [];
    }
    existing.unshift(meeting);
    await fs.mkdir(path.dirname(MEETINGS_FILE), { recursive: true });
    await fs.writeFile(MEETINGS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[MEETING SAVE ERROR]:', err);
    return false;
  }
}

async function saveLead(lead) {
  try {
    let existing = [];
    try {
      const data = await fs.readFile(LEADS_FILE, 'utf-8');
      existing = JSON.parse(data);
    } catch {
      existing = [];
    }
    existing.unshift(lead);
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[LEAD SAVE ERROR]:', err);
    return false;
  }
}

// Generate Google Calendar Link
function generateGoogleCalendarUrl({ title, description, date, timeSlot }) {
  // Parse date and timeSlot (e.g. date: "2026-10-24", timeSlot: "3:00 PM IST")
  try {
    const [year, month, day] = (date || new Date().toISOString().split('T')[0]).split('-');
    let hour = 11;
    let minute = 0;
    if (timeSlot) {
      const match = timeSlot.match(/(\d+):?(\d+)?\s*(AM|PM)/i);
      if (match) {
        hour = parseInt(match[1], 10);
        minute = match[2] ? parseInt(match[2], 10) : 0;
        const meridian = match[3].toUpperCase();
        if (meridian === 'PM' && hour < 12) hour += 12;
        if (meridian === 'AM' && hour === 12) hour = 0;
      }
    }
    // Pad values
    const pad = (n) => String(n).padStart(2, '0');
    const startStr = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
    // 30 min duration
    let endHour = hour;
    let endMinute = minute + 30;
    if (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
    }
    const endStr = `${year}${pad(month)}${pad(day)}T${pad(endHour)}${pad(endMinute)}00`;

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title || 'PixelMutiny Sprint Discovery Call with Sumit',
      details: description || 'Discovery call to review design, tech architecture, timeline, and sprint milestones with Sumit (Founder, PixelMutiny).',
      location: 'Google Meet (link will be sent to your email)',
      dates: `${startStr}/${endStr}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  } catch {
    return 'https://calendar.google.com/calendar/render';
  }
}

// Generate standard .ics data URI for Apple Calendar, Outlook, Google Calendar
function generateIcsDataUri({ title, description, date, timeSlot, name, email }) {
  try {
    const [year, month, day] = (date || new Date().toISOString().split('T')[0]).split('-');
    let hour = 11;
    let minute = 0;
    if (timeSlot) {
      const match = timeSlot.match(/(\d+):?(\d+)?\s*(AM|PM)/i);
      if (match) {
        hour = parseInt(match[1], 10);
        minute = match[2] ? parseInt(match[2], 10) : 0;
        const meridian = match[3].toUpperCase();
        if (meridian === 'PM' && hour < 12) hour += 12;
        if (meridian === 'AM' && hour === 12) hour = 0;
      }
    }
    const pad = (n) => String(n).padStart(2, '0');
    const dtStart = `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}00`;
    let endHour = hour;
    let endMinute = minute + 30;
    if (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
    }
    const dtEnd = `${year}${pad(month)}${pad(day)}T${pad(endHour)}${pad(endMinute)}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PixelMutiny DigiMedia//AI Meeting Scheduler//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:pm-meet-${Date.now()}@pixelmutiny.com`,
      `DTSTAMP:${dtStart}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${title || 'PixelMutiny Discovery Call with Sumit'}`,
      `DESCRIPTION:${(description || 'Discovery Call with Sumit at PixelMutiny DigiMedia').replace(/\n/g, '\\n')}`,
      'LOCATION:Google Meet / Remote',
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=Sumit (PixelMutiny):mailto:hello@pixelmutiny.com`,
      name && email ? `ATTENDEE;CN=${name};ROLE=REQ-PARTICIPANT:mailto:${email}` : '',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean).join('\r\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  } catch {
    return null;
  }
}

// Intelligent contextual responder with domain intelligence
function generateAiResponse({ message, userProfile = {}, history = [], currency = 'INR' }) {
  const text = (message || '').toLowerCase().trim();
  const isUSD = currency === 'USD';

  // Profile extraction
  const updatedProfile = { ...userProfile };

  // Detect email
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !updatedProfile.email) {
    updatedProfile.email = emailMatch[0];
  }

  // Detect phone / WhatsApp
  const phoneMatch = message.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/);
  if (phoneMatch && !updatedProfile.phone && phoneMatch[0].length >= 10) {
    updatedProfile.phone = phoneMatch[0];
  }

  // Detect Name ("my name is ...", "I am ...", "call me ...")
  const nameMatch = message.match(/(?:my name is|i am|i'm|this is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch && !updatedProfile.name) {
    updatedProfile.name = nameMatch[1].trim();
  }

  // Detect project service intent
  if (text.includes('website') || text.includes('web design') || text.includes('web dev')) {
    updatedProfile.projectType = 'Website Design & Development';
  } else if (text.includes('landing') || text.includes('one page') || text.includes('one-page')) {
    updatedProfile.projectType = 'Landing Page';
  } else if (text.includes('ui/ux') || text.includes('ui ux') || text.includes('figma')) {
    updatedProfile.projectType = 'UI/UX & Design System';
  } else if (text.includes('dashboard') || text.includes('saas') || text.includes('web app')) {
    updatedProfile.projectType = 'Web Apps & Dashboards';
  } else if (text.includes('brand') || text.includes('logo') || text.includes('identity')) {
    updatedProfile.projectType = 'Brand Identity';
  } else if (text.includes('reel') || text.includes('video') || text.includes('tiktok') || text.includes('youtube')) {
    updatedProfile.projectType = 'Reels & Short-form Video';
  } else if (text.includes('ad') || text.includes('meta') || text.includes('marketing') || text.includes('facebook')) {
    updatedProfile.projectType = 'Meta Ads & Growth';
  } else if (text.includes('kit') || text.includes('startup') || text.includes('launch')) {
    updatedProfile.projectType = 'Startup Full Launch Kit';
  }

  const nameGreeting = updatedProfile.name ? ` ${updatedProfile.name}` : '';

  // 1. Booking Meeting Intent
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
    return {
      reply: `I'd love to lock in a sprint call with you${nameGreeting}! Sumit (our founder & design director) hosts 20-minute rapid discovery sessions to evaluate your scope, show relevant case studies, and lock in milestone delivery dates.\n\nYou can pick your preferred date and time slot right below, or jump directly onto WhatsApp:`,
      action: 'show_booking_modal',
      chips: [
        { label: '📅 Choose Date & Time', action: 'open_booking_tab' },
        { label: '💬 WhatsApp Sumit (+91 9315580036)', action: 'whatsapp' },
        { label: '📩 Mail My Project Brief', action: 'open_mail_tab' },
      ],
      updatedProfile,
    };
  }

  // 2. Pricing & Cost Estimation Intent
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

    return {
      reply: `Here is our transparent, fixed-scope pricing structure (no hidden agency surprises):\n\n` +
        `• **Website Design & Dev**: Starting at ${webPrice} (5 pages, CMS, SEO, 2–3 weeks)\n` +
        `• **High-Converting Landing Page**: Starting at ${landingPrice} (5–7 day turnaround)\n` +
        `• **UI/UX & Figma Systems**: Starting at ${uiPrice} (Interactive prototype & components)\n` +
        `• **Web Apps & Dashboards**: Starting at ${dashPrice} (Data-dense SaaS interfaces)\n` +
        `• **Brand Identity & Logo**: Starting at ${brandPrice} (Vector logos & complete brand book)\n` +
        `• **Kinetic Reels & Video**: Starting at ${reelPrice} per reel pack\n` +
        `• **Meta Ads & Performance**: Starting at ${metaPrice}\n` +
        `• **Startup Launch Kit**: ${launchPrice} (Full brand + 5-page site + pitch deck + social assets, save over 25%)\n\n` +
        `Would you like me to calculate a custom scope estimate, mail your brief, or schedule a sprint call?`,
      action: 'show_scope_calculator',
      chips: [
        { label: '⚡ Interactive Scope Calculator', action: 'open_scope_tab' },
        { label: '📅 Book 20-min Sprint Call', action: 'open_booking_tab' },
        { label: '📩 Mail Project Brief', action: 'open_mail_tab' },
        { label: '💬 Chat on WhatsApp', action: 'whatsapp' },
      ],
      updatedProfile,
    };
  }

  // 3. Mail / Brief Dispatch Intent
  if (
    text.includes('mail') ||
    text.includes('email') ||
    text.includes('send brief') ||
    text.includes('submit') ||
    text.includes('inquiry') ||
    text.includes('contact form')
  ) {
    return {
      reply: `I can package your requirements and dispatch your project brief directly to Sumit and the engineering team! We guarantee a detailed reply and sprint roadmap within 24 business hours.\n\n` +
        (updatedProfile.name || updatedProfile.email
          ? `I currently have your details saved in memory (${[updatedProfile.name, updatedProfile.email].filter(Boolean).join(' • ')}). Click below to dispatch or edit:`
          : `Click below to confirm your contact details and project goals:`),
      action: 'open_mail_tab',
      chips: [
        { label: '📩 Dispatch Project Brief', action: 'open_mail_tab' },
        { label: '📋 Open Full Inquiry Drawer', action: 'open_inquiry_drawer' },
        { label: '📅 Book Call Instead', action: 'open_booking_tab' },
      ],
      updatedProfile,
    };
  }

  // 4. Founder / Sumit / Team / Location Intent
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
    return {
      reply: `PixelMutiny DigiMedia was founded by **Sumit (GFX Sumit)**, a digital director and product designer with over 7 years of experience building standout digital brands, Next.js web applications, and high-converting marketing campaigns.\n\n` +
        `• **Location**: New Delhi, India (DLF Cyber Hub Design Lab)\n` +
        `• **Direct WhatsApp**: +91 9315580036\n` +
        `• **LinkedIn**: linkedin.com/in/gfxsumit\n` +
        `• **Agency Ethos**: Every pixel has a job. We break from cookie-cutter templates to build work that is sharp, original, and made to convert.\n\n` +
        `Would you like to connect directly with Sumit on WhatsApp or schedule a discovery call?`,
      chips: [
        { label: '💬 WhatsApp Sumit Directly', action: 'whatsapp' },
        { label: '🔗 View Sumit on LinkedIn', action: 'linkedin' },
        { label: '📅 Book Discovery Call', action: 'open_booking_tab' },
      ],
      updatedProfile,
    };
  }

  // 5. Work / Portfolio / Case Studies Intent
  if (
    text.includes('work') ||
    text.includes('portfolio') ||
    text.includes('case study') ||
    text.includes('project') ||
    text.includes('examples') ||
    text.includes('client')
  ) {
    return {
      reply: `We've crafted high-performance digital products across finance, SaaS, luxury, AI, and robotics. Highlights include:\n\n` +
        `• **Veloce AI**: High-velocity automation landing platform with interactive 3D particle nodes & 4.2x conversion lift.\n` +
        `• **Veyra Legal**: Editorial intelligence portal for enterprise arbitration.\n` +
        `• **Krono Pay**: Multi-currency cross-border settlement dashboard.\n` +
        `• **Avenor**: Monolithic brutalist architectural portfolio with real-time solar tracking.\n` +
        `• **Maison Aura**: Parisian luxury perfume house e-commerce.\n\n` +
        `You can explore the full archive on our Work page or let me calculate an estimate for a similar build:`,
      chips: [
        { label: '💼 Browse All Projects (/works)', action: 'navigate_works' },
        { label: '⚡ Calculate Project Scope', action: 'open_scope_tab' },
        { label: '📅 Book Discovery Call', action: 'open_booking_tab' },
      ],
      updatedProfile,
    };
  }

  // 6. Technology Stack & Process Intent
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
    return {
      reply: `We build with modern, high-performance web standards:\n\n` +
        `• **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4\n` +
        `• **Motion & Interaction**: GSAP, Framer Motion, Lenis Smooth Scroll, Spline 3D\n` +
        `• **Backend & CMS**: Node.js, Supabase, PostgreSQL, Sanity / Strapi, Resend\n` +
        `• **Performance**: 98+ Google Lighthouse scores, zero-bloat vanilla CSS architecture, semantic SEO\n` +
        `• **Sprint Process**: Initial concepts in **48 hours**, weekly milestone builds, 2 revision rounds, 100% intellectual property transfer.\n\n` +
        `Have a specific tech requirement for your project?`,
      chips: [
        { label: '⚡ Estimate My Tech Stack', action: 'open_scope_tab' },
        { label: '📅 Schedule Tech Discovery Call', action: 'open_booking_tab' },
        { label: '💬 Talk to Sumit on WhatsApp', action: 'whatsapp' },
      ],
      updatedProfile,
    };
  }

  // 7. Currency Switch
  if (text.includes('currency') || text.includes('dollar') || text.includes('rupee') || text.includes('usd') || text.includes('inr')) {
    return {
      reply: `Our site automatically detects your country to show prices in **${isUSD ? 'USD ($)' : 'INR (₹)'}** seamlessly (${isUSD ? 'international visitors are quoted in USD' : 'Indian visitors are quoted in INR'}).`,
      chips: [
        { label: '⚡ View Instant Scope (' + (isUSD ? '$ USD' : '₹ INR') + ')', action: 'open_scope_tab' },
        { label: '💬 Talk to Sumit on WhatsApp', action: 'whatsapp' },
      ],
      updatedProfile,
    };
  }

  // 8. Default Engaging Response
  return {
    reply: `Hello${nameGreeting}! I am Mutiny AI, PixelMutiny's autonomous studio copilot.\n\n` +
      `I have persistent memory across your session. I can help you:\n` +
      `1. **Book a 20-min Discovery Call** with Sumit (with instant Google Calendar & .ics sync)\n` +
      `2. **Mail a Project Brief** directly to our engineering desk\n` +
      `3. **Calculate an Instant Scope Estimate** for websites, apps, brand identities, or Meta Ads\n` +
      `4. **Answer questions** about our 48-hour sprint process, past case studies, and tech stack\n\n` +
      `What would you like to explore first?`,
    chips: [
      { label: '📅 Book a Discovery Call', action: 'open_booking_tab' },
      { label: '⚡ Instant Price Estimate', action: 'open_scope_tab' },
      { label: '📩 Mail Project Brief', action: 'open_mail_tab' },
      { label: '💬 WhatsApp Sumit (+91 9315580036)', action: 'whatsapp' },
      { label: '💼 Browse Portfolio', action: 'navigate_works' },
    ],
    updatedProfile,
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const action = body.action || 'chat';

    // 1. ACTION: BOOK MEETING
    if (action === 'book_meeting') {
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const phone = (body.phone || '').trim();
      const date = (body.date || '').trim();
      const timeSlot = (body.timeSlot || '3:00 PM IST').trim();
      const timezone = (body.timezone || 'IST').trim();
      const topic = (body.topic || 'Website & Brand Sprint Discovery').trim();
      const notes = (body.notes || '').trim();

      if (!name || name.length < 2) {
        return Response.json({ error: 'Please enter your name.' }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return Response.json({ error: 'Please enter a valid work email address.' }, { status: 400 });
      }

      if (!date) {
        return Response.json({ error: 'Please select a meeting date.' }, { status: 400 });
      }

      const meetingId = `meet_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const meetingRecord = {
        id: meetingId,
        createdAt: new Date().toISOString(),
        name,
        email,
        phone,
        date,
        timeSlot,
        timezone,
        topic,
        notes,
        status: 'confirmed',
        host: 'Sumit (Founder & Design Director)',
      };

      await saveMeeting(meetingRecord);

      // Calendar sync URLs
      const googleCalUrl = generateGoogleCalendarUrl({
        title: `PixelMutiny Discovery Call: ${name} & Sumit`,
        description: `Discovery Call with Sumit (PixelMutiny DigiMedia)\nTopic: ${topic}\nClient: ${name} (${email})\nNotes: ${notes || 'No extra notes'}`,
        date,
        timeSlot,
      });

      const icsDataUri = generateIcsDataUri({
        title: `PixelMutiny Discovery Call: ${name} & Sumit`,
        description: `Discovery Call with Sumit (PixelMutiny DigiMedia)\nTopic: ${topic}\nClient: ${name} (${email})\nNotes: ${notes || 'No extra notes'}`,
        date,
        timeSlot,
        name,
        email,
      });

      const whatsappMsg = encodeURIComponent(
        `Hi Sumit, I have scheduled a PixelMutiny discovery call for ${date} at ${timeSlot} regarding ${topic}. My email is ${email}. Looking forward to connecting!`
      );
      const whatsappUrl = `https://wa.me/919315580036?text=${whatsappMsg}`;

      return Response.json({
        success: true,
        message: `Meeting confirmed! You're booked for ${date} at ${timeSlot} with Sumit.`,
        meeting: meetingRecord,
        googleCalUrl,
        icsDataUri,
        whatsappUrl,
      });
    }

    // 2. ACTION: SEND LEAD / MAIL BRIEF
    if (action === 'send_lead') {
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const phone = (body.phone || '').trim();
      const companyUrl = (body.companyUrl || '').trim();
      const brief = (body.brief || '').trim();
      const services = Array.isArray(body.services) ? body.services : [];
      const budget = (body.budget || 'Custom scope').slice(0, 100);
      const timeline = (body.timeline || '2 to 4 weeks').slice(0, 100);
      const currency = body.currency === 'USD' ? 'USD' : 'INR';
      const estimatedTotal = (body.estimatedTotal || 'Custom scope').slice(0, 100);

      if (!name || name.length < 2) {
        return Response.json({ error: 'Please enter your full name.' }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
      }

      const leadRecord = {
        id: `lead_ai_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        createdAt: new Date().toISOString(),
        source: 'Mutiny AI Assistant',
        name,
        email,
        phone,
        companyUrl,
        brief: brief || 'Project brief initiated via Mutiny AI Assistant.',
        services,
        budget,
        timeline,
        currency,
        estimatedTotal,
      };

      await saveLead(leadRecord);

      // Attempt Resend email dispatch if API key exists
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        try {
          const safeName = sanitizeHeader(name);
          const safeServices = sanitizeHeader(services.join(', ') || 'Custom Project');
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'PixelMutiny AI <leads@pixelmutiny.com>',
              to: ['hello@pixelmutiny.com'],
              subject: `[AI Bot Lead] ${safeName} - ${safeServices}`,
              html: `
                <h2>New Project Brief via Mutiny AI Assistant</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
                <p><strong>Services:</strong> ${escapeHtml(services.join(', '))}</p>
                <p><strong>Estimated Total:</strong> ${escapeHtml(estimatedTotal)} (${escapeHtml(currency)})</p>
                <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
                <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
                <p><strong>Brief:</strong> ${escapeHtml(brief)}</p>
              `,
            }),
          });
        } catch (mailErr) {
          console.error('[AI RESEND NOTIFICATION ERROR]:', mailErr);
        }
      }

      return Response.json({
        success: true,
        message: `Your project brief has been logged and dispatched to Sumit & the engineering team! We will reply within 24 business hours.`,
        lead: leadRecord,
      });
    }

    // 3. ACTION: CHAT CONVERSATION
    const message = body.message || '';
    const userProfile = body.userProfile || {};
    const history = body.history || [];
    const currency = body.currency || 'INR';

    const aiResponse = await executeAiConversation({
      message,
      userProfile,
      history,
      currency,
    });

    return Response.json({
      success: true,
      ...aiResponse,
    });
  } catch (error) {
    console.error('[AI CHAT API ERROR]:', error);
    return Response.json(
      { error: 'An unexpected error occurred in Mutiny AI. Please try again or WhatsApp Sumit at +91 9315580036.' },
      { status: 500 }
    );
  }
}
