import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Contact The Growth Hub",
  description:
    "Contact the Growth Hub membership and partnership desks for onboarding, enterprise due diligence, and executive access clarification.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Contact</h1>
        <p className="mt-4 text-sm text-slate-300 sm:text-base">
          Reach out to our membership team for onboarding, corporate partnerships, and private founder
          introductions.
        </p>
        <div className="mt-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:mt-10 sm:gap-6 sm:p-8 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Email</p>
            <p className="mt-2 text-slate-100">hamzaamaarad757@gmail.com</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Response Window</p>
            <p className="mt-2 text-slate-100">Monday to Friday, within 24 business hours</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Partnership Desk</p>
            <p className="mt-2 text-slate-100">hamzaamaarad757@gmail.com</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Operations Office</p>
            <p className="mt-2 text-slate-100">Global Remote Team, EMEA Focus</p>
          </div>
        </div>
        <section className="premium-panel mt-8 rounded-xl border border-slate-800 p-5 sm:mt-10 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Pre-Purchase Verification</p>
          <h2 className="mt-3 text-xl font-semibold text-slate-100 sm:text-2xl">Need enterprise due diligence details?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Our team can provide membership scope clarification, operational support process details, and
            guidance on which tier aligns with your current growth stage and governance requirements.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
