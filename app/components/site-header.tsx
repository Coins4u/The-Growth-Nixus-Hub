"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/standards", label: "Standards" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/legal/terms", label: "Legal" },
  { href: "/portal", label: "Portal" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 640) setIsMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => {
      window.removeEventListener("resize", closeOnResize);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/legal/terms") return pathname.startsWith("/legal") || pathname === "/terms" || pathname === "/privacy" || pathname === "/refunds";
    if (href === "/portal") return pathname.startsWith("/portal");
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-wide text-slate-100 sm:text-lg">
            The Growth Hub
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <nav className="mt-3 hidden flex-wrap items-center gap-3 text-sm text-slate-300 sm:flex sm:justify-end">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded px-2 py-1 hover:bg-slate-900 hover:text-indigo-300 ${
                isActiveLink(link.href) ? "bg-indigo-500/15 text-indigo-200" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isMenuOpen ? (
          <nav className="mt-3 grid gap-1 rounded-xl border border-slate-800 bg-slate-900/95 p-2 text-sm text-slate-200 shadow-xl shadow-black/30 sm:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`rounded-lg px-3 py-2.5 hover:bg-slate-800 hover:text-indigo-200 ${
                  isActiveLink(link.href) ? "bg-indigo-500/15 text-indigo-200" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
