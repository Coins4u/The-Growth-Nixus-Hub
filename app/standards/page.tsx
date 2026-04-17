import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Membership Standards",
  description:
    "Explore The Growth Hub membership standards, governance principles, and policy alignment for high-accountability executive operators.",
};

const principles = [
  {
    title: "Admission Integrity",
    detail:
      "Membership is designed for founders, executives, and operators with active implementation responsibility. The room is curated for signal quality, not raw volume.",
  },
  {
    title: "Execution Accountability",
    detail:
      "Every strategic discussion is expected to map to execution paths, KPI checkpoints, and review cycles. We prioritize measurable progress over theory-only conversation.",
  },
  {
    title: "Commercial Confidentiality",
    detail:
      "Members are expected to protect private business intelligence, partner details, and operational information shared within the community environment.",
  },
  {
    title: "Professional Conduct",
    detail:
      "The network is built on respectful collaboration, high-context communication, and disciplined peer support across growth, infrastructure, and governance domains.",
  },
];

const includedValue = [
  "Private portal access with structured learning tracks and technical briefings",
  "Executive strategy sessions focused on high-impact operating decisions",
  "Resource vault with implementation playbooks and governance templates",
  "Member support desk with escalation pathways and operational response standards",
];

export default function StandardsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="signal-pill w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
          Membership Standards
        </p>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Built for serious operators who execute with discipline.
        </h1>
        <p className="mt-5 max-w-3xl text-slate-300">
          The Growth Hub is intentionally structured as a high-trust, high-accountability environment.
          These standards protect member quality, improve strategic clarity, and preserve long-term
          commercial value for the network.
        </p>

        <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
          {principles.map((principle) => (
            <article key={principle.title} className="micro-lift rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">{principle.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{principle.detail}</p>
            </article>
          ))}
        </section>

        <section className="premium-panel mt-10 rounded-2xl border border-slate-800 p-5 sm:mt-12 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">What membership includes</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
            {includedValue.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>

        <section className="premium-panel mt-10 rounded-2xl border border-slate-800 p-5 sm:mt-12 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">Compliance and policy alignment</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Our public policy framework, support process, and membership disclosures are maintained to
            support transparent partner review and payment-provider due diligence standards.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/legal/terms"
              className="w-full rounded-lg border border-slate-700 px-5 py-2.5 text-center text-sm font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:w-auto"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy"
              className="w-full rounded-lg border border-slate-700 px-5 py-2.5 text-center text-sm font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:w-auto"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/refund"
              className="w-full rounded-lg border border-slate-700 px-5 py-2.5 text-center text-sm font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:w-auto"
            >
              Refund Policy
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
