import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Your payment was received. Check your inbox for your Nexus Growth Hub details and next steps.",
  alternates: {
    canonical: "https://www.nexusgrowthub.com/success",
  },
};

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-16">
      <div className="premium-panel w-full max-w-lg rounded-3xl border border-slate-800/80 bg-slate-900/90 p-8 text-center shadow-2xl shadow-black/40 sm:p-12">
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-2xl text-emerald-300"
          aria-hidden
        >
          ✓
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-indigo-300">Payment received</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
          Thank you for joining us
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          Your purchase went through successfully. Everything you need to get started is being sent to
          you now—open your inbox and look for a message with your access details and what to do next.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
          If nothing appears within a few minutes, check your spam or promotions folder. Filters
          sometimes tuck these messages out of sight, and a quick peek there usually does the trick.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          Nexus Growth Hub · Secure checkout complete
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
        >
          Return to website
        </Link>
      </div>
    </div>
  );
}
