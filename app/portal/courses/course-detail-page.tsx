"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseThumbnail } from "../components/course-thumbnail";
import { VideoModal } from "../components/video-modal";
import type { CourseItem } from "./course-catalog";

type Tab = "description" | "content" | "reviews";

const tabLabels: { id: Tab; label: string }[] = [
  { id: "description", label: "Course Description" },
  { id: "content", label: "Course Content" },
  { id: "reviews", label: "Member Reviews" },
];

export function CourseDetailPage({ course }: { course: CourseItem }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("growthHubPortalUnlocked") !== "true") {
      router.push("/portal");
    }
  }, [router]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/portal" className="text-sm text-indigo-300 hover:text-indigo-200">
        Return to Portal
      </Link>

      <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Executive Course</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-100">{course.title}</h1>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-indigo-600/20 px-3 py-1 text-xs font-semibold text-indigo-300">
            {course.level} Level
          </span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
            {course.subtitle}
          </span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            {course.category}
          </span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            {course.instructor}
          </span>
        </div>

        <CourseThumbnail courseTitle={course.title} duration={course.previewDuration} className="h-52 mt-7">
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="rounded-full border border-indigo-300/60 bg-indigo-600/80 px-5 py-2 text-sm font-semibold text-white"
          >
            Play Preview
          </button>
        </CourseThumbnail>

        <div className="mt-8 flex flex-wrap gap-3 border-b border-slate-800 pb-4">
          {tabLabels.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "description" ? (
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <p>{course.description[0]}</p>
            <p>{course.description[1]}</p>
            <p>{course.description[2]}</p>
          </div>
        ) : null}

        {activeTab === "content" ? (
          <div className="mt-6 space-y-3">
            {course.sessions.map((session, index) => (
              <details
                key={session.title}
                className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300"
              >
                <summary className="cursor-pointer font-semibold text-slate-100">
                  Session {index + 1}: {session.title}
                </summary>
                <p className="mt-3 leading-7 text-slate-300">{session.summary}</p>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-indigo-300">Key Learning Pillars</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {session.pillars.map((pillar) => (
                      <li key={pillar}>- {pillar}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-indigo-300">Session Implementation Guide</p>
                  <p className="mt-2 max-h-56 overflow-y-auto pr-2 text-sm leading-7 text-slate-300">
                    {session.sessionNotes}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="rounded bg-slate-800 px-2 py-1">File Size: {session.fileSize}</span>
                  <span className="rounded bg-slate-800 px-2 py-1">Last Updated: {session.lastUpdated}</span>
                </div>
                <a
                  href={session.downloadLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  Downloadable Resource: {session.resourceName}
                </a>
              </details>
            ))}
          </div>
        ) : null}

        {activeTab === "reviews" ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {course.reviews.map((review) => (
              <article key={`${review.name}-${review.date}`} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm leading-7 text-slate-300">{review.text}</p>
                <p className="mt-4 text-sm font-semibold text-slate-100">{review.name}</p>
                <p className="text-xs text-slate-400">
                  {review.role} - {review.date}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {course.sessions.map((session, index) => (
          <article
            key={session.title}
            className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center text-slate-100"
          >
            <p className="text-lg font-semibold">SESSION {index + 1}</p>
            <p className="mt-1 text-xs text-slate-400">Core Operator Module</p>
          </article>
        ))}
      </section>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={course.title}
        youtubeId={course.youtubeId}
      />
    </main>
  );
}
