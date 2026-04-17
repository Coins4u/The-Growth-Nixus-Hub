import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export default function LegalPage() {
  const legalLinks = [
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/refund", label: "Refund Policy" },
    { href: "/legal/dmca", label: "DMCA / Ownership" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-100">Legal</h1>
        <p className="mt-4 text-slate-300">
          Review our legal framework for membership access, privacy commitments, ownership, and refund
          procedures.
        </p>
        <div className="mt-10 grid gap-4">
          {legalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-800 bg-slate-900/70 px-5 py-4 text-slate-200 hover:border-indigo-400 hover:text-indigo-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
