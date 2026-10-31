import Link from 'next/link';
import { ArrowLeft, FileCheck, Shield, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use — PixelMutiny DigiMedia Private Limited',
  description:
    'Terms of Use and standard engagement governance for PixelMutiny DigiMedia Private Limited. Project sprint terms, milestone delivery, asset ownership, and legal scope.',
  alternates: {
    canonical: '/terms-of-use',
  },
};

export default function TermsOfUsePage() {
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
            <FileCheck className="w-3.5 h-3.5" />
            <span>TERMS &amp; ENGAGEMENT TERMS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0A0F1F] mb-4">
            Terms of Use
          </h1>
          <p className="text-sm font-mono text-[#5B6275]">
            PixelMutiny DigiMedia Private Limited // Effective Date: {lastUpdated}
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#E4E6EB] rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 text-sm sm:text-base leading-relaxed text-[#4A4F5D]">
          {/* 1. Agreement to Terms */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website at <a href="https://pixelmutiny.com" className="text-[#1F3FFF] font-medium hover:underline">pixelmutiny.com</a> or commissioning services from PixelMutiny DigiMedia Private Limited (&ldquo;PixelMutiny&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
          </section>

          {/* 2. Studio Services & SOW Governance */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              2. Commercial SOW &amp; Sprint Agreements
            </h2>
            <p>
              All formal project engagements are executed under a dedicated Statement of Work (SOW) or Master Services Agreement (MSA) signed by both parties. The specific deliverables, sprint timelines, pricing, milestone reviews, and payment schedule defined in that executed document supersede general website package overviews.
            </p>
            <p>
              Prices displayed on this website represent standard baseline rates and starting-at estimates. All project fees exclude applicable Goods and Services Tax (GST) for Indian entities and third-party SaaS subscription or hosting costs unless explicitly itemized in the SOW.
            </p>
          </section>

          {/* 3. Intellectual Property Rights */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              3. Intellectual Property &amp; Delivery Rights
            </h2>
            <ul className="space-y-2.5 pl-2 list-none">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-1" />
                <span><strong className="text-[#0A0F1F]">Client Deliverables:</strong> Upon receipt of 100% final payment for the agreed milestone or project sprint, all copyright, design files, Figma source assets, and bespoke application code created specifically for the project transfer completely to the client.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-1" />
                <span><strong className="text-[#0A0F1F]">Studio Portfolio Rights:</strong> Unless protected under an explicit White-Label or Restrictive NDA agreement, PixelMutiny reserves the right to showcase completed project outcomes, non-confidential mockups, and performance outcomes in its public portfolio archive and design awards submissions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F3FFF] flex-shrink-0 mt-1" />
                <span><strong className="text-[#0A0F1F]">Site Content:</strong> The design tokens, typography system, brand identity, interactive 3D code, and editorial copy on pixelmutiny.com are the exclusive proprietary property of PixelMutiny DigiMedia Private Limited.</span>
              </li>
            </ul>
          </section>

          {/* 4. Payment Terms & Milestone Acceptance */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              4. Payment Milestones &amp; Revision Rounds
            </h2>
            <p>
              Fixed project engagements are structured with standard milestone tranches (typically 50% mobilization advance, with remaining tranches tied to sprint review or staging handover). Each package tier specifies an agreed number of revision rounds. Requested alterations outside the initial scope will be estimated transparently as a change order.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall PixelMutiny DigiMedia Private Limited or its directors be liable for indirect, incidental, or consequential damages resulting from third-party server outages, client hosting configuration changes, or external API modifications after milestone handover.
            </p>
          </section>

          {/* 6. Governing Law & Jurisdiction */}
          <section className="space-y-3 pt-6 border-t border-[#E4E6EB]">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A0F1F]">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and any dispute or claim arising out of them shall be governed by and construed in accordance with the laws of India. Courts situated in New Delhi / Gurugram, India shall have exclusive jurisdiction over any proceedings.
            </p>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E4E6EB] text-xs font-mono space-y-1 text-[#0A0F1F]">
              <div><strong>Entity:</strong> PixelMutiny DigiMedia Private Limited</div>
              <div><strong>Design Lab:</strong> DLF Cyber Hub, Phase 2, Gurugram, Delhi NCR 122002, India</div>
              <div><strong>Inquiries:</strong> <a href="mailto:hello@pixelmutiny.com" className="text-[#1F3FFF] hover:underline">hello@pixelmutiny.com</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
