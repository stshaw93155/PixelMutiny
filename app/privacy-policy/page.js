import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — PixelMutiny DigiMedia Private Limited',
  description:
    'Privacy Policy and client data protection practices for PixelMutiny DigiMedia Private Limited. Transparent policies on data collection, client confidentiality, and security.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 30, 2026';

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#0A0F1F] pt-28 pb-20 px-4 sm:px-8 md:px-12 selection:bg-[#1F3FFF] selection:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#5B6275] hover:text-[#1F3FFF] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        {/* Header */}
        <div className="border-b border-[#E4E6EB] pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3FFF]/10 border border-[#1F3FFF]/20 text-[#1F3FFF] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0F1F] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-[#5B6275]">
            PixelMutiny DigiMedia Private Limited // Effective Date: {lastUpdated}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#E4E6EB] rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 text-sm sm:text-base leading-relaxed text-[#4A4F5D]">
          {/* 1. Introduction */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              1. Overview &amp; Commitment
            </h2>
            <p>
              PixelMutiny DigiMedia Private Limited (&ldquo;PixelMutiny&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the confidential project data, personal details, and commercial intelligence you share with us through our website (<a href="https://pixelmutiny.com" className="text-[#1F3FFF] font-medium hover:underline">pixelmutiny.com</a>) and communication channels.
            </p>
            <p>
              We adhere strictly to data protection principles. We never sell, rent, or trade client data or project briefs to third parties for marketing purposes.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              2. Information We Collect
            </h2>
            <p>We only collect information necessary to initiate and deliver high-craft digital services:</p>
            <ul className="space-y-2.5 pl-2 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-1" />
                <span><strong className="text-[#0A0F1F]">Direct Project Inquiries:</strong> When you submit a project brief or schedule a call, we collect your name, business email, phone number, company name, website URL, budget range, and project scope notes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-1" />
                <span><strong className="text-[#0A0F1F]">Communication Records:</strong> Correspondence exchanged via email (<a href="mailto:hello@pixelmutiny.com" className="text-[#1F3FFF] hover:underline">hello@pixelmutiny.com</a>), WhatsApp, video discovery sessions, or our interactive studio assistant.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-1" />
                <span><strong className="text-[#0A0F1F]">Technical Telemetry &amp; Analytics:</strong> Aggregated, non-identifying telemetry including browser type, screen resolution, referral path, and Core Web Vitals performance metrics to optimize site usability.</span>
              </li>
            </ul>
          </section>

          {/* 3. Non-Disclosure & Confidentiality */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              3. Strict Confidentiality &amp; Client Non-Disclosure
            </h2>
            <p>
              We treat all unpublished briefs, wireframes, codebases, business logic, and pre-release venture concepts with institutional confidentiality. We routinely sign Mutual Non-Disclosure Agreements (NDAs) prior to formal discovery sessions upon request.
            </p>
          </section>

          {/* 4. Client IP & Asset Ownership */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              4. Intellectual Property &amp; Asset Ownership
            </h2>
            <p>
              Upon final settlement of project invoices, all final custom design tokens, vector assets, production source code, animations, and bespoke web deliverables become the sole and exclusive intellectual property of the client, as stipulated in individual Statements of Work (SOW).
            </p>
          </section>

          {/* 5. Cookies & Tracking */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              5. Cookies &amp; Local Storage
            </h2>
            <p>
              Our website uses minimal local storage solely for state preferences: currency selection (INR vs USD), audio toggle states, and memory for your in-progress project brief. We do not use third-party invasive cross-site tracking pixels or sell ad-retargeting profiles.
            </p>
          </section>

          {/* 6. Jurisdiction & Contact */}
          <section className="space-y-3 pt-6 border-t border-[#E4E6EB]">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              6. Governance &amp; Data Officer Inquiries
            </h2>
            <p>
              This privacy policy is governed in accordance with the laws of India. For questions, data access requests, or NDA execution, contact our studio leadership:
            </p>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E4E6EB] text-xs font-mono space-y-1 text-[#0A0F1F]">
              <div><strong>Entity:</strong> PixelMutiny DigiMedia Private Limited</div>
              <div><strong>Design Lab:</strong> DLF Cyber Hub, Phase 2, Gurugram, Delhi NCR 122002, India</div>
              <div><strong>Email:</strong> <a href="mailto:hello@pixelmutiny.com" className="text-[#1F3FFF] hover:underline">hello@pixelmutiny.com</a></div>
              <div><strong>Direct Telephone:</strong> +91 9315580036</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
