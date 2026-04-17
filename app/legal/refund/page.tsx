import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Review The Growth Hub refund eligibility, non-refundable conditions, request process, and chargeback-prevention policy.",
};

export default function RefundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100">Refund Policy</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">1. Eligibility Window</h2>
            <p>
              Refund requests are accepted within 7 calendar days of initial purchase for first-time
              members who have not substantially consumed premium content.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">2. Non-Refundable Cases</h2>
            <p>
              Renewals, discounted promotional passes, and corporate agreements are non-refundable unless
              otherwise specified in a signed agreement.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">3. Request Process</h2>
            <p>
              Submit requests to billing@thegrowthhub.com with your full name, purchase email, and
              transaction reference. Decisions are typically issued within 5 business days.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">4. Chargeback Prevention</h2>
            <p>
              Members are encouraged to contact us directly before initiating a chargeback so we can
              resolve concerns and maintain account continuity.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
