import type { Metadata } from "next";
import Link from "next/link";
import { HomeCredibilitySections } from "./components/home-credibility-sections";
import { LiveStatisticsBar } from "./components/live-statistics-bar";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Nexus Growth Hub | Advanced Systems for Global Scale",
  description:
    "Nexus Growth Hub is a high-tier executive community delivering infrastructure architecture, AI automation systems, and B2B growth operations for global digital scale.",
};

export default function Home() {
  const curriculum = [
    {
      title: "Edge Node Management",
      detail: "What You Get: Deploying global redundancy for 99.9% uptime.",
    },
    {
      title: "Expert-Level Prompting",
      detail: "What You Get: Enterprise-grade LLM workflows.",
    },
    {
      title: "Autonomous Agents",
      detail: "What You Get: Building production-ready AI task-forces.",
    },
    {
      title: "B2B Funnel Architecture",
      detail: "What You Get: High-ticket conversion engineering.",
    },
    {
      title: "Global Compliance",
      detail: "What You Get: Navigating international trade and tax logic.",
    },
    {
      title: "SLA Operations",
      detail: "What You Get: The blueprint for managing enterprise-scale service.",
    },
  ];

  const memberProfiles = [
    "Founder of SaaS Platforms",
    "Head of Ops for Digital Agencies",
    "Infrastructure Engineers",
  ];

  const valueStack = [
    "Full Nexus Vault Access (€250 Value)",
    "35+ Professional Modules (€400 Value)",
    "Proprietary SOPs & Legal Frameworks (€150 Value)",
    "Direct Line to Lead Architects (Priceless)",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
          <div className="premium-panel rounded-3xl border border-slate-800 p-6 shadow-2xl shadow-black/30 sm:p-12">
            <p className="w-fit rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
              Executive Community - High-Tier Systems
            </p>
            <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-slate-100 sm:mt-6 sm:text-6xl">
              The Sovereign Operator: Advanced Systems for Global Scale.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
              Architecting high-performance digital infrastructure, AI automation, and B2B growth engines
              for the next generation of digital products.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/pricing"
                className="cta-primary w-full rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-500 sm:w-auto"
              >
                Secure Your Chairman Pass.
              </Link>
              <Link
                href="/outcomes"
                className="w-full rounded-lg border border-slate-700 px-6 py-3 text-center text-sm font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:w-auto"
              >
                Review Execution Outcomes
              </Link>
            </div>
            <LiveStatisticsBar />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Transparency</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">
            Inside the Nexus: Your Curriculum.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.map((item) => (
              <article key={item.title} className="micro-lift rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">- {item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Member Profiles</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">Who this community is built for</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {memberProfiles.map((profile) => (
              <article key={profile} className="micro-lift rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-base font-semibold text-slate-100">{profile}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="premium-panel rounded-2xl border border-slate-800 p-5 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Value Stack</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">
              Transparent breakdown of what you receive
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {valueStack.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Final Price</p>
              <p className="mt-2 text-3xl font-bold text-slate-100">€68.24/Year</p>
              <p className="mt-2 text-sm text-slate-300">
                Executive value benchmarked for high-tier operators targeting $949/year caliber outcomes.
              </p>
            </div>
            <Link
              href="/pricing"
              className="cta-primary mt-6 inline-block w-full rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-500 sm:w-auto"
            >
              Secure Your Chairman Pass.
            </Link>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-16 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:pb-24 lg:grid-cols-3 lg:px-8">
          {[
            {
              title: "Operator-Grade Resource Vault",
              description:
                "Members receive technical briefings, implementation playbooks, and audit-ready templates built for teams executing under revenue and compliance pressure.",
            },
            {
              title: "Curated Executive Network",
              description:
                "Admissions are vetted to keep the room focused on founders, directors, and high-accountability operators, not casual browsing traffic.",
            },
            {
              title: "Decision-Focused Advisory Cadence",
              description:
                "Monthly boardroom sessions prioritize deployment bottlenecks, KPI risk, and commercial scaling plans with practical next-step execution paths.",
            },
          ].map((pillar) => (
            <article
              key={pillar.title}
              className="micro-lift rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/20 sm:p-6"
            >
              <h2 className="text-xl font-semibold text-slate-100">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
            </article>
          ))}
        </section>

        <HomeCredibilitySections />
      </main>
      <SiteFooter />
    </div>
  );
}
