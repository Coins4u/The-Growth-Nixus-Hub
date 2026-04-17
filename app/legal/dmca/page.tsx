import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "DMCA and Ownership",
  description:
    "Review The Growth Hub DMCA, ownership, and unauthorized-use policy for protected educational and strategic assets.",
};

export default function DmcaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100">DMCA / Ownership</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-lg font-semibold text-slate-100">1. Intellectual Property Ownership</h2>
            <p>
              All materials published in The Growth Hub, including text, designs, course videos, strategic
              templates, and downloadable files, are the exclusive property of The Growth Hub unless
              otherwise stated.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">2. DMCA Compliance</h2>
            <p>
              We respect the intellectual property rights of others and respond to valid DMCA notices.
              Copyright owners who believe content infringes their rights may submit a formal complaint to
              hamzaamaarad757@gmail.com.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">3. Takedown Procedure</h2>
            <p>
              Upon receiving a complete and valid notice, we may remove or disable access to the disputed
              material while the claim is reviewed. Users may submit a counter-notification where permitted
              by law.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-100">4. Unauthorized Use</h2>
            <p>
              Reproduction, redistribution, resale, or public reposting of protected materials without
              written consent is prohibited and may result in account suspension and legal action.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
