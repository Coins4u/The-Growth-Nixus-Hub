import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "About Nexus Growth Hub",
  description:
    "Learn how Nexus Growth Hub supports sovereign operators with strategic clarity, execution discipline, and enterprise-grade commercial integrity.",
};

export default function AboutPage() {
  const operatingPrinciples = [
    {
      title: "Strategic Clarity",
      detail: "We help members simplify high-stakes decisions into executable priorities and measurable checkpoints.",
    },
    {
      title: "Execution Discipline",
      detail: "Frameworks are designed to be implemented in live operating environments, not left as static theory.",
    },
    {
      title: "Commercial Integrity",
      detail: "We maintain transparent policies, structured support, and compliance-conscious delivery standards.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">About Nexus Growth Hub</h1>
        <div className="mt-6 max-w-4xl space-y-5 text-sm text-slate-300 sm:mt-8 sm:space-y-6 sm:text-base">
          <p>
            Nexus Growth Hub was created for entrepreneurs and executives who need more than surface-level
            networking. Our mission is to connect decision-makers with practical strategy and measurable
            momentum.
          </p>
          <p>
            We curate a focused environment where members exchange frameworks, evaluate growth challenges,
            and collaborate with trusted operators across industries. Every touchpoint is engineered to
            move members from ideas to execution with confidence.
          </p>
          <p>
            Our team believes that sustainable growth comes from disciplined systems, resilient leadership,
            and high-quality relationships. Nexus Growth Hub exists to help entrepreneurs turn those pillars
            into long-term outcomes.
          </p>
        </div>
        <section className="micro-lift mt-10 max-w-2xl rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:mt-12 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Address</p>
          <p className="mt-3 text-sm font-semibold text-slate-100 sm:text-base">Nexus Growth Hub</p>
          <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">
            Lot Admine, Bloc E NR 213
            <br />
            Ait Melloul, 86150, Morocco
          </p>
        </section>
        <section className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {operatingPrinciples.map((principle) => (
            <article key={principle.title} className="micro-lift rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">{principle.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{principle.detail}</p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
