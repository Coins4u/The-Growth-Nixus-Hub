import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

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
              By purchasing a membership pass or accessing The Growth Hub platform, you agree to comply
              with these Terms of Service and all applicable laws and regulations.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">2. Membership Access</h2>
            <p>
              Membership keys are issued for individual use unless a multi-seat corporate plan is
              explicitly purchased. Key sharing, unauthorized resale, or credential misuse may lead to
              immediate suspension.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">3. Content and Intellectual Property</h2>
            <p>
              All strategy materials, video sessions, templates, and community resources are proprietary
              assets of The Growth Hub and are protected by intellectual property law.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">4. Community Conduct</h2>
            <p>
              Members are expected to engage professionally, avoid harassment, and maintain confidentiality
              when discussing private business matters within the community.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">5. Liability Limitation</h2>
            <p>
              The Growth Hub provides educational and networking resources and does not guarantee specific
              business results. To the maximum extent permitted by law, liability is limited to the amount
              paid for the active membership term.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">6. Changes to Terms</h2>
            <p>
              We may update these Terms of Service at any time. Continued platform use after updates
              constitutes acceptance of the revised terms.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
