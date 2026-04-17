"use client";

import { motion } from "framer-motion";

const nodeCities = [
  { city: "New York", x: 240, y: 152 },
  { city: "London", x: 432, y: 115 },
  { city: "Amsterdam", x: 455, y: 124 },
  { city: "Dubai", x: 520, y: 155 },
  { city: "Singapore", x: 650, y: 205 },
];

const securityCards = [
  {
    title: "Encrypted Tunnels",
    description:
      "All member portal traffic is routed through encrypted channels with strict access controls.",
  },
  {
    title: "99.9% Uptime SLA",
    description:
      "Our platform stack is monitored continuously with proactive incident handling and recovery playbooks.",
  },
  {
    title: "Verified Commercial Licensing",
    description:
      "All community assets and commercial materials are managed under verified licensing standards.",
  },
];

const partnerLogos = ["Nexora Systems", "Vectorline Cloud", "Aurelia Stack", "HelixPort Labs", "Northgrid AI", "Stratosync"];
const roadmapReleases = [
  { quarter: "Q2", item: "Advanced Market Entry Frameworks" },
  { quarter: "Q3", item: "Automating B2B Lead Acquisition" },
  { quarter: "Q4", item: "Global Tax & Compliance Blueprints" },
];

const tierRows = [
  { feature: "Seats", bronze: "1", gold: "5", enterprise: "Unlimited" },
  { feature: "Data Priority", bronze: "Standard", gold: "Priority", enterprise: "Ultra Priority" },
  { feature: "Private Lounge Access", bronze: "No", gold: "Yes", enterprise: "Dedicated Lounge" },
  { feature: "API Availability", bronze: "No", gold: "Limited", enterprise: "Full Access" },
];

const leadershipTeam = [
  {
    name: "Hamza Amaarad",
    title: "Managing Director",
    description:
      "Oversees enterprise access strategy, commercial licensing standards, and long-term member value delivery.",
  },
  {
    name: "Lina Voss",
    title: "Member Success",
    description:
      "Leads onboarding, provisioning workflows, and SLA-aligned support operations for business members.",
  },
  {
    name: "Youssef el Harti",
    title: "Strategic Partnerships",
    description:
      "Builds B2B alliance channels and integration opportunities across distribution and data ecosystems.",
  },
];

const processSteps = [
  {
    title: "Extraction",
    detail: "We extract high-signal market intelligence from vetted operators and partner networks.",
    icon: "database",
  },
  {
    title: "Synthesis",
    detail: "Insights are structured into executive frameworks and compliance-ready implementation tracks.",
    icon: "layers",
  },
  {
    title: "Deployment",
    detail: "Members deploy with guided provisioning, KPI checkpoints, and enterprise support protocols.",
    icon: "rocket",
  },
];

const vaultUpdates = [
  { date: "2026-02-14", title: "Enterprise Access SLA Benchmark Report Released" },
  { date: "2026-03-09", title: "Commercial Licensing Matrix Updated for EMEA Operators" },
  { date: "2026-04-10", title: "Provisioning Automation Briefing Added to the Vault" },
];

export function HomeCredibilitySections() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="grid-pattern rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Infrastructure</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-100">Our Global Infrastructure</h2>
          <p className="mt-3 text-sm text-slate-300">
            Secure, low-latency infrastructure across key business regions to support enterprise access,
            commercial licensing, and member provisioning workflows.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <svg
              viewBox="0 0 900 380"
              className="h-auto w-full"
              role="img"
              aria-label="Dark themed global member node map"
            >
              <rect x="0" y="0" width="900" height="380" fill="#020617" />
              <path
                d="M90 150l45-35 66 10 29 38-12 28-70 20-53-15zM248 135l48-18 56 10 18 30-10 25-53 18-45-10-22-24zM405 105l46-15 77 15 35 40-20 35-88 15-52-20-20-37zM575 170l70-18 55 15 22 35-11 32-63 24-64-10-25-33zM706 250l35-18 45 12 18 29-10 24-42 12-37-7-20-22z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {nodeCities.map((node) => (
                <g key={node.city}>
                  <circle cx={node.x} cy={node.y} r="4" fill="#818cf8" />
                  <circle cx={node.x} cy={node.y} r="10" fill="#6366f1" opacity="0.2">
                    <animate attributeName="r" values="6;12;6" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0.1;0.35" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <text x={node.x + 10} y={node.y - 8} fill="#cbd5e1" fontSize="12">
                    {node.city}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Enterprise Trust Layer</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-100">Built on Security and Trust</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {securityCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/20"
            >
              <h3 className="text-lg font-semibold text-slate-100">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Leadership</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-100">The Leadership Team</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {leadershipTeam.map((leader) => (
            <article
              key={leader.title}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/20"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{leader.title}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-100">{leader.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{leader.description}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.14 }}
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="grid-pattern rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Methodology</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-100">Extraction, Synthesis, Deployment</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.title} className="rounded-lg border border-slate-800 bg-slate-950/60 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600/20 text-indigo-300">
                  {step.icon === "database" ? (
                    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M10 2C6.13 2 3 3.34 3 5v10c0 1.66 3.13 3 7 3s7-1.34 7-3V5c0-1.66-3.13-3-7-3Zm0 2c3.31 0 5 .99 5 1s-1.69 1-5 1-5-.99-5-1 1.69-1 5-1Zm0 5c3.31 0 5-.99 5-1v2c0 .01-1.69 1-5 1s-5-.99-5-1V8c0 .01 1.69 1 5 1Zm0 4c3.31 0 5-.99 5-1v2c0 .01-1.69 1-5 1s-5-.99-5-1v-2c0 .01 1.69 1 5 1Z" />
                    </svg>
                  ) : null}
                  {step.icon === "layers" ? (
                    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="m10 2 8 4-8 4-8-4 8-4Zm8 7-8 4-8-4v3l8 4 8-4V9Zm-8 7-8-4v3l8 4 8-4v-3l-8 4Z" />
                    </svg>
                  ) : null}
                  {step.icon === "rocket" ? (
                    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M11.5 2c2.5 0 5 1.5 6.5 4-1.2 2.4-3 4.5-5.4 6.1l-1.2 3.4-2-2-2 2-.8-2.8L3.8 10l3.3-1.2C8.8 5 10 3.3 11.5 2Zm-.2 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                    </svg>
                  ) : null}
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
        className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Strategic Alliances</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-100">Powered by Industry Leaders</h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="partner-marquee flex min-w-max items-center gap-10 px-6 py-5">
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={`${logo}-${index}`} className="text-sm font-semibold tracking-wide text-slate-400 grayscale">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">The Vault</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-100">Quarterly Resource Roadmap</h2>
          <div className="mt-8 space-y-4">
            {roadmapReleases.map((release) => (
              <div
                key={release.quarter}
                className="flex items-start gap-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="rounded-md bg-indigo-600/20 px-3 py-1 text-sm font-semibold text-indigo-300">
                  {release.quarter}
                </div>
                <p className="pt-1 text-sm text-slate-300">{release.item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.23 }}
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Live Activity</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-100">Vault Updates</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {vaultUpdates.map((update) => (
            <article key={update.date} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{update.date}</p>
              <h3 className="mt-4 text-base font-semibold leading-7 text-slate-100">{update.title}</h3>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
        className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Membership Architecture</p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-100">Choose Your Access Tier</h2>
        <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-950/70 text-slate-200">
              <tr>
                <th className="px-5 py-4 font-semibold">Feature</th>
                <th className="px-5 py-4 font-semibold">Bronze</th>
                <th className="px-5 py-4 font-semibold">Gold</th>
                <th className="px-5 py-4 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {tierRows.map((row) => (
                <tr key={row.feature} className="border-b border-slate-800/70 text-slate-300">
                  <td className="px-5 py-4 font-medium text-slate-100">{row.feature}</td>
                  <td className="px-5 py-4">{row.bronze}</td>
                  <td className="px-5 py-4">{row.gold}</td>
                  <td className="px-5 py-4">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </>
  );
}
