import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Review Nexus Growth Hub refund policy for digital memberships, including the 72-hour unresolved technical-failure condition after key activation.",
};

export default function RefundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100">Refund Policy</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">1. Digital Membership Nature</h2>
            <p>
              Nexus Growth Hub provides digital membership access, including online modules, resources, and
              community systems. Because access is delivered electronically and can be consumed immediately,
              purchases are generally non-refundable except as expressly stated below.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">
              2. Eligible Refund Condition: Documented Technical Failure (72 Hours)
            </h2>
            <p>
              A refund may be approved only if, after membership key activation, you experience a verified
              technical failure that materially prevents access to core paid features, and the failure
              remains unresolved for at least 72 consecutive hours after your first valid support report.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">3. Required Documentation</h2>
            <p>
              To request review, submit: full name, purchase email, transaction reference, activation key
              (masked if preferred), timestamped screenshots or screen recording, device/browser details,
              and any error IDs shown. Missing documentation may delay or void eligibility.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">4. Resolution First Policy</h2>
            <p>
              Before any refund decision, our support team will attempt to diagnose and resolve the issue.
              The 72-hour window begins only after a complete and valid report is received through official
              support channels.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">5. Non-Refundable Scenarios</h2>
            <p>
              Refunds are not provided for change of mind, lack of usage, business performance expectations,
              user setup errors, temporary third-party outages outside our control, policy violations,
              account suspension for misuse, renewals, discounted promotional sales, or enterprise contracts
              unless separately agreed in writing.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">6. Request Window and Decision Timeline</h2>
            <p>
              Eligible requests must be submitted promptly after the unresolved 72-hour period and no later
              than 7 calendar days from that point. Once complete documentation is received, decisions are
              typically issued within 5 business days.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">7. Approved Refund Processing</h2>
            <p>
              If approved, refunds are returned to the original payment method where possible. Processing
              times depend on the payment provider and issuing bank. Access licenses may be revoked upon
              refund completion.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">8. Chargeback and Contact</h2>
            <p>
              Contact support before initiating a chargeback so we can attempt remediation quickly.
              Unsupported chargebacks may result in account restrictions during investigation. For all refund
              matters, contact{" "}
              <a className="text-cyan-300 underline underline-offset-4" href="mailto:support@nexusgrowthub.com">
                support@nexusgrowthub.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
