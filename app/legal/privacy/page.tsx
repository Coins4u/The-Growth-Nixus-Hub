import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Understand how Nexus Growth Hub collects, processes, protects, and retains member data under transparent privacy standards.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">1. Information Collected</h2>
            <p>
              We collect account details such as name, email, payment identifiers, and portal activity
              required to provide secure membership access and service improvements.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">2. Purpose of Processing</h2>
            <p>
              Data is processed for onboarding, membership management, fraud prevention, support delivery,
              and communication regarding product updates and policy changes.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">3. Security Measures</h2>
            <p>
              We apply administrative and technical controls to safeguard personal information, including
              restricted access, secure hosting, and periodic monitoring.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">4. Data Sharing</h2>
            <p>
              We do not sell personal data. Limited processing may occur through vetted payment and service
              providers solely for operational purposes.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">5. Data Retention and Rights</h2>
            <p>
              Data is retained only as long as needed for legal and operational requirements. Members may
              request access, correction, or deletion by contacting support@nexusgrowthub.com.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
