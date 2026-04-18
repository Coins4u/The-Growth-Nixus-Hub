import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Member Outcomes",
  description:
    "Review verified Growth Hub member outcomes across SaaS expansion, infrastructure stabilization, and global payment-readiness initiatives.",
};

const caseStudies = [
  {
    title: "SaaS Revenue Operations Realignment",
    profile: "B2B SaaS company, 22-person team, EMEA focus",
    challenge:
      "The team had inconsistent acquisition quality and no shared decision model between growth and operations leadership.",
    intervention:
      "Nexus Growth Hub introduced an execution governance framework, weekly KPI review loop, and attribution calibration protocol.",
    result: "31% pipeline-quality lift and 18% faster sales-cycle progression within one quarter.",
  },
  {
    title: "Multi-Region Agency Delivery Stabilization",
    profile: "Digital services agency handling infrastructure-heavy client accounts",
    challenge:
      "Escalations were increasing as campaign volume scaled, creating SLA risk and team fatigue.",
    intervention:
      "The member team deployed node monitoring SOPs, incident escalation ladders, and service-priority traffic controls.",
    result: "42% reduction in critical delivery incidents and improved client retention confidence.",
  },
  {
    title: "Cross-Border Payment Risk Hardening",
    profile: "Growth-stage operator expanding into additional jurisdictions",
    challenge:
      "Payment review posture was weak due to fragmented policy documentation and inconsistent support controls.",
    intervention:
      "Nexus Growth Hub implementation stack aligned legal pages, support systems, and operational disclosure standards.",
    result: "Processor-readiness posture established in six weeks with audit-ready policy alignment.",
  },
];

const operationalMetrics = [
  { label: "Verified member organizations", value: "1,482" },
  { label: "Countries represented", value: "34" },
  { label: "Quarterly implementation workshops", value: "48+" },
  { label: "Strategic introductions facilitated", value: "420+" },
];

export default function OutcomesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="signal-pill w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
          Member Outcomes
        </p>
        <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
          Evidence of execution, not vanity claims.
        </h1>
        <p className="mt-5 max-w-3xl text-slate-300">
          This page reflects the type of commercial improvements our members pursue: better decision speed,
          stronger governance, and measurable operating outcomes tied to growth and delivery reliability.
        </p>

        <section className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {operationalMetrics.map((metric) => (
            <article key={metric.label} className="micro-lift rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
              <p className="text-2xl font-semibold text-slate-100">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-400">{metric.label}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 space-y-4 sm:mt-12 sm:space-y-6">
          {caseStudies.map((study) => (
            <article key={study.title} className="micro-lift rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
              <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">{study.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{study.profile}</p>
              <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-300 md:grid-cols-3">
                <p>
                  <span className="font-semibold text-slate-100">Challenge: </span>
                  {study.challenge}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">Intervention: </span>
                  {study.intervention}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">Result: </span>
                  {study.result}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section className="premium-panel mt-10 rounded-2xl border border-slate-800 p-5 sm:mt-12 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">Ready to evaluate membership fit?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            If your team needs practical operator guidance, governance clarity, and execution frameworks
            that support high-accountability growth, review membership options or speak with our team.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/pricing"
              className="cta-primary w-full rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-500 sm:w-auto"
            >
              Review Pricing
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-lg border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:w-auto"
            >
              Contact Membership Team
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
