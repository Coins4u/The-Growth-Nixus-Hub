import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read Nexus Growth Hub Terms of Service covering digital membership licensing, acceptable use, IP protection, payment obligations, and liability limits.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">1. Acceptance of Terms</h2>
            <p>
              By purchasing access, activating a membership key, or using Nexus Growth Hub platform, you
              agree to these Terms of Service and all applicable laws. If you do not agree, do not
              activate or use the service.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">2. Service Scope</h2>
            <p>
              The service provides digital educational content, strategic frameworks, private community
              channels, and operational resources designed for professional development and execution
              support. The service is informational and operational in nature and does not constitute legal,
              tax, accounting, or investment advice.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">3. Membership License and Key Usage</h2>
            <p>
              Membership keys are licensed, not sold. Unless explicitly stated otherwise in writing, each
              key grants a non-transferable, non-sublicensable, revocable license for a single end user for
              the purchased duration. Key sharing, unauthorized resale, credential distribution, or account
              access by unauthorized parties is prohibited and may result in suspension or termination.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">4. Billing, Renewal, and Taxes</h2>
            <p>
              Fees are charged in the currency and interval presented at checkout. Membership may renew
              according to the selected plan unless otherwise indicated at purchase. You are responsible for
              any applicable taxes, duties, or bank charges associated with your transaction.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">5. Acceptable Use and Community Standards</h2>
            <p>
              You agree to use the platform professionally and lawfully. Harassment, hate speech, unlawful
              conduct, scraping, reverse engineering, malware distribution, privacy violations, and attempts
              to bypass access controls are prohibited. We may suspend or terminate access for violations.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">6. Intellectual Property and Content Protection</h2>
            <p>
              All platform content, including modules, playbooks, templates, documents, graphics, and brand
              assets, is protected by intellectual property law and remains the exclusive property of The
              Growth Nexus or its licensors. Reproduction, redistribution, recording, resale, or derivative
              commercialization without prior written permission is prohibited.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">7. Confidentiality and Data Handling</h2>
            <p>
              Members may access non-public operational methods and peer discussions. You agree not to
              disclose confidential information obtained through the platform. Personal data is processed
              according to our Privacy Policy and applicable data protection laws.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">8. Refunds and Service Disputes</h2>
            <p>
              Refund eligibility is governed by the Refund Policy. For technical disputes, you must contact
              support and provide reasonable documentation so the issue can be investigated and remediated
              within the stated support window.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">9. Disclaimer of Warranties</h2>
            <p>
              The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis to the maximum extent
              permitted by law. We do not warrant uninterrupted availability, error-free operation, or
              specific business outcomes from use of the platform.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Nexus Growth Hub and its operators are not liable for
              indirect, incidental, special, consequential, or punitive damages, including loss of revenue,
              profits, or goodwill. Total aggregate liability is limited to the amount paid by you for the
              membership term at issue.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">11. Governing Law and Dispute Resolution</h2>
            <p>
              These terms are governed by applicable commercial law in the jurisdiction designated by The
              Growth Nexus. Parties agree to attempt informal resolution first before filing formal claims,
              unless urgent injunctive relief is required.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">12. Updates to These Terms</h2>
            <p>
              We may update these terms to reflect product, legal, or operational changes. Updated terms are
              effective when published. Continued use of the platform after publication constitutes
              acceptance of the revised terms.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
