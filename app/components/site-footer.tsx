import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-slate-400 sm:px-6 sm:text-sm lg:px-8">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <Link href="/outcomes" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            Outcomes
          </Link>
          <Link href="/standards" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            Membership Standards
          </Link>
          <Link href="/legal" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            Legal
          </Link>
          <Link href="/about" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            About Us
          </Link>
          <Link href="/legal/terms" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            Terms of Service
          </Link>
          <Link href="/legal/privacy" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            Privacy Policy
          </Link>
          <Link href="/legal/refund" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            Refund Policy
          </Link>
          <Link href="/legal/dmca" className="rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300">
            DMCA / Ownership
          </Link>
        </div>
        <div className="mt-2 grid gap-1 text-slate-300">
          <p>Operational Hours: 9 AM - 6 PM</p>
          <p>Global Support Centers: Agadir, Morocco | Amsterdam, NL</p>
        </div>
        <p className="text-slate-300">Hamza Amaarad - Authorized Community Founder</p>
      </div>
    </footer>
  );
}
