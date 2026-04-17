"use client";

import Link from "next/link";
import { resourceLibrary } from "./resource-library";

export default function ResourcesLibraryPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/portal" className="text-sm text-indigo-300 hover:text-indigo-200">
        Return to Portal
      </Link>
      <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Resources</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-100">Nexus Vault File Library</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Access operator documents, implementation templates, and governance files used across member
          workflows.
        </p>
        <div className="mt-8 divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800">
          {resourceLibrary.map((file) => (
            <div key={file.name} className="flex items-center justify-between bg-slate-950/60 px-4 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded bg-rose-500/15 px-2 py-1 text-xs font-semibold text-rose-300">PDF</span>
                <div>
                  <span className="text-sm text-slate-200">{file.name}</span>
                  <p className="text-xs text-slate-400">
                    {file.domain} - {file.size} - {file.updated}
                  </p>
                </div>
              </div>
              <a
                href={`/portal/resources/download/${file.slug}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
