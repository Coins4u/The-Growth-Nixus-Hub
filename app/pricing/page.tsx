"use client";

import { useState } from "react";
import { OrderForm } from "@/components/OrderForm";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const passes = [
  {
    name: "Basic",
    duration: "1 Month",
    price: "€15.23",
    detail: "Entry access to the Nexus Vault, weekly operator briefs, and foundational infrastructure guidance.",
  },
  {
    name: "Starter",
    duration: "2 Months",
    price: "€24.34",
    detail: "Adds structured implementation notes and tactical growth blueprints for disciplined execution.",
  },
  {
    name: "Pro",
    duration: "3 Months",
    price: "€25.78",
    detail: "Unlocks strategic session recaps, advanced prompt systems, and measurable deployment checkpoints.",
  },
  {
    name: "Growth",
    duration: "4 Months",
    price: "€35.98",
    detail: "Includes conversion architecture playbooks, escalation support, and partner-aligned operating models.",
  },
  {
    name: "Executive",
    duration: "6 Months",
    price: "€37.32",
    detail: "Designed for leadership teams requiring infrastructure resilience, AI automation, and SLA visibility.",
  },
  {
    name: "Elite",
    duration: "8 Months",
    price: "€45.13",
    detail: "Expands access to premium SOP packs, compliance frameworks, and direct implementation intelligence.",
  },
  {
    name: "Corporate",
    duration: "10 Months",
    price: "€49.09",
    detail: "Built for multi-seat operators with team enablement assets and enterprise decision support workflows.",
  },
  {
    name: "Chairman",
    duration: "12 Months",
    price: "€68.24",
    detail: "Full-year sovereign access to the complete curriculum, strategic architecture channels, and top-tier advisory cadence.",
  },
];

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof passes)[number] | null>(null);

  const includedEveryTier = [
    "Private portal access with governed member workspace",
    "Structured technical briefings and strategy resources",
    "Monthly implementation guidance and operator Q&A",
    "Commercial support and compliance-ready member policies",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="signal-pill mb-4 w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
          Enterprise Licensing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Membership Passes</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Select the pass that aligns with your strategic timeline. Every tier includes secure portal
          access and curated business resources.
        </p>
        <div className="premium-panel mt-8 rounded-2xl border border-slate-800 p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Included in every tier</p>
          <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {includedEveryTier.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <section className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {passes.map((pass) => (
            <article
              key={pass.name}
              className="micro-lift rounded-xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-black/20 sm:p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{pass.duration}</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-100">{pass.name}</h2>
              <p className="mt-2 text-3xl font-bold text-indigo-300">{pass.price}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{pass.detail}</p>
              <button
                type="button"
                onClick={() => setSelectedPlan(pass)}
                className="cta-primary mt-6 block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Secure License
              </button>
            </article>
          ))}
        </section>
        <OrderForm
          selectedPlan={selectedPlan ? { name: selectedPlan.name, price: selectedPlan.price } : null}
          onClose={() => setSelectedPlan(null)}
        />
        <section className="premium-panel mt-10 rounded-2xl border border-slate-800 p-5 sm:mt-12 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">Procurement and compliance note</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Membership billing is backed by transparent policy disclosures and documented support workflows.
            For enterprise buyer validation, legal and policy references are available directly from the
            public site footer before purchase.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
