"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CourseThumbnail } from "./components/course-thumbnail";
import { VideoModal } from "./components/video-modal";
import { courseCatalog } from "./courses/course-catalog";
import { resourceLibrary } from "./resources/resource-library";

type LicenseKey = {
  code: string;
  duration: string;
};

const ACTIVATION_KEYS: LicenseKey[] = [
  { code: "BAS-1M-77A2", duration: "1 Month" },
  { code: "BAS-1M-99P1", duration: "1 Month" },
  { code: "BAS-1M-33K8", duration: "1 Month" },
  { code: "BAS-1M-55L0", duration: "1 Month" },
  { code: "BAS-1M-11X4", duration: "1 Month" },
  { code: "BAS-1M-88Q2", duration: "1 Month" },
  { code: "STR-2M-44B3", duration: "2 Months" },
  { code: "STR-2M-22C9", duration: "2 Months" },
  { code: "STR-2M-66D1", duration: "2 Months" },
  { code: "STR-2M-11E5", duration: "2 Months" },
  { code: "STR-2M-99F7", duration: "2 Months" },
  { code: "STR-2M-33G2", duration: "2 Months" },
  { code: "PRO-3M-12H4", duration: "3 Months" },
  { code: "PRO-3M-56J8", duration: "3 Months" },
  { code: "PRO-3M-90K1", duration: "3 Months" },
  { code: "PRO-3M-34L9", duration: "3 Months" },
  { code: "PRO-3M-78M2", duration: "3 Months" },
  { code: "PRO-3M-21N5", duration: "3 Months" },
  { code: "GRO-4M-88V2", duration: "4 Months" },
  { code: "GRO-4M-44W9", duration: "4 Months" },
  { code: "GRO-4M-22Z1", duration: "4 Months" },
  { code: "GRO-4M-99Y4", duration: "4 Months" },
  { code: "GRO-4M-33X7", duration: "4 Months" },
  { code: "GRO-4M-55R3", duration: "4 Months" },
  { code: "EXE-6M-10S4", duration: "6 Months" },
  { code: "EXE-6M-20T8", duration: "6 Months" },
  { code: "EXE-6M-30U1", duration: "6 Months" },
  { code: "EXE-6M-40V9", duration: "6 Months" },
  { code: "EXE-6M-50W2", duration: "6 Months" },
  { code: "EXE-6M-60X5", duration: "6 Months" },
  { code: "ELI-8M-99A1", duration: "8 Months" },
  { code: "ELI-8M-88B2", duration: "8 Months" },
  { code: "ELI-8M-77C3", duration: "8 Months" },
  { code: "ELI-8M-66D4", duration: "8 Months" },
  { code: "ELI-8M-55E5", duration: "8 Months" },
  { code: "ELI-8M-44F6", duration: "8 Months" },
  { code: "COR-10M-11G1", duration: "10 Months" },
  { code: "COR-10M-22H2", duration: "10 Months" },
  { code: "COR-10M-33J3", duration: "10 Months" },
  { code: "COR-10M-44K4", duration: "10 Months" },
  { code: "COR-10M-55L5", duration: "10 Months" },
  { code: "COR-10M-66M6", duration: "10 Months" },
  { code: "CHA-12M-AA11", duration: "12 Months" },
  { code: "CHA-12M-BB22", duration: "12 Months" },
  { code: "CHA-12M-CC33", duration: "12 Months" },
  { code: "CHA-12M-DD44", duration: "12 Months" },
  { code: "CHA-12M-EE55", duration: "12 Months" },
  { code: "CHA-12M-FF66", duration: "12 Months" },
];
const ADMIN_CODE = "GH-2026-ADMIN";

function planLabelFromCode(code: string) {
  const prefix = code.split("-")[0];
  const labels: Record<string, string> = {
    BAS: "Basic",
    STR: "Starter",
    PRO: "Pro",
    GRO: "Growth",
    EXE: "Executive",
    ELI: "Elite",
    COR: "Corporate",
    CHA: "Chairman",
  };
  return labels[prefix] ?? "Member";
}

const courseLibrary = courseCatalog.map((course) => ({
  title: course.title,
  level: course.level,
  category: course.category,
  instructor: course.instructor,
  description: course.description[0],
  youtubeId: course.youtubeId,
  previewDuration: course.previewDuration,
  memberSatisfaction: course.memberSatisfaction,
  studentsEnrolled: course.studentsEnrolled,
  completedSessions: course.completedSessions,
  totalSessions: course.sessions.length,
  progress: Math.round((course.completedSessions / course.sessions.length) * 100),
  href: `/portal/courses/${course.slug}`,
}));

const weeklyRoadmapTemplate = [
  { label: "Step 1: Onboarding", done: true },
  { label: "Step 2: Resource Access", done: true },
  { label: "Step 3: Strategy Session Booking", done: false },
  { label: "Step 4: KPI Deployment Review", done: false },
];

type DashboardSnapshot = {
  engagementRate: number;
  sessionAttendance: number;
  openPartnerships: number;
  resourceVelocity: number;
  activityFeed: string[];
  upcomingSessions: { title: string; time: string; type: "Executive" | "Infrastructure" | "Growth" }[];
};

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildRandomFeed() {
  return [
    `New member roundtable opened with ${randomBetween(24, 68)} participants in Strategic Growth Circle.`,
    `Infrastructure Desk pushed ${randomBetween(2, 8)} updates to the Enterprise SLA operations stack.`,
    `Global compliance AMA confirmed ${randomBetween(10, 35)} live seats from regional operators.`,
    `AI Video Bootcamp cohort reported a ${randomBetween(8, 29)}% lift in content conversion metrics.`,
  ];
}

function buildRandomSessions() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return [
    { title: "Boardroom Strategy Call", time: `${days[randomBetween(0, 4)]}, ${randomBetween(14, 20)}:00 UTC`, type: "Executive" as const },
    {
      title: "Infrastructure Scale Clinic",
      time: `${days[randomBetween(0, 4)]}, ${randomBetween(13, 19)}:00 UTC`,
      type: "Infrastructure" as const,
    },
    { title: "Growth Funnel Review", time: `${days[randomBetween(0, 4)]}, ${randomBetween(12, 18)}:00 UTC`, type: "Growth" as const },
  ];
}

function generateDashboardSnapshot(): DashboardSnapshot {
  return {
    engagementRate: randomBetween(84, 97),
    sessionAttendance: randomBetween(118, 196),
    openPartnerships: randomBetween(18, 46),
    resourceVelocity: randomBetween(21, 57),
    activityFeed: buildRandomFeed(),
    upcomingSessions: buildRandomSessions(),
  };
}

function generateWeeklyRoadmap() {
  return weeklyRoadmapTemplate.map((step, index) => ({
    ...step,
    done: index < 2 ? true : Math.random() > 0.55,
  }));
}

const defaultSnapshot: DashboardSnapshot = {
  engagementRate: 92,
  sessionAttendance: 148,
  openPartnerships: 27,
  resourceVelocity: 34,
  activityFeed: [
    "New member roundtable opened in Strategic Growth Circle.",
    "Enterprise SLA Operations Guide updated by Infrastructure Desk.",
    "Global compliance AMA scheduled with legal operations partner.",
    "AI Video Bootcamp cohort posted Q2 execution benchmarks.",
  ],
  upcomingSessions: [
    { title: "Boardroom Strategy Call", time: "Tuesday, 18:00 UTC", type: "Executive" },
    { title: "Infrastructure Scale Clinic", time: "Thursday, 16:00 UTC", type: "Infrastructure" },
    { title: "Growth Funnel Review", time: "Friday, 14:00 UTC", type: "Growth" },
  ],
};

const announcements = [
  {
    date: "Jan 29, 2026",
    title: "New Content Release - AI Agent Governance Pack",
    detail: "Added operational deployment guardrails and policy templates for 24/7 agent workflows.",
  },
  {
    date: "Mar 13, 2026",
    title: "Network Update - Node Optimization Cycle Completed",
    detail: "Regional routing tables updated to improve low-latency member delivery performance.",
  },
  {
    date: "Apr 08, 2026",
    title: "New Content Release - Q2 Attribution Framework Bundle",
    detail: "Published multi-touch attribution models with updated LTV/CAC calibration worksheets.",
  },
];

type PortalState = "locked" | "validating" | "success" | "error";
type Section = "dashboard" | "courses" | "resources";
const BASE_MEMBER_COUNT = 1482;
const BASE_ACTIVE_NODES = 12;

export default function PortalPage() {
  const [keyValue, setKeyValue] = useState("");
  const [portalState, setPortalState] = useState<PortalState>("locked");
  const [section, setSection] = useState<Section>("dashboard");
  const [activeVideo, setActiveVideo] = useState<null | { title: string; youtubeId: string }>(null);
  const [liveMemberCount, setLiveMemberCount] = useState(() => {
    if (typeof window === "undefined") return BASE_MEMBER_COUNT;
    const storedCount = Number(window.localStorage.getItem("growthHubLiveMemberCount"));
    return !Number.isNaN(storedCount) && storedCount >= BASE_MEMBER_COUNT ? storedCount : BASE_MEMBER_COUNT;
  });
  const [activeNodes, setActiveNodes] = useState(BASE_ACTIVE_NODES);
  const [dashboardSnapshot, setDashboardSnapshot] = useState<DashboardSnapshot>(() => {
    if (typeof window === "undefined") return defaultSnapshot;
    const stored = window.localStorage.getItem("growthHubDashboardSnapshot");
    if (!stored) return defaultSnapshot;
    try {
      return JSON.parse(stored) as DashboardSnapshot;
    } catch {
      return defaultSnapshot;
    }
  });
  const [weeklyRoadmap, setWeeklyRoadmap] = useState(generateWeeklyRoadmap);
  const [showNotifications, setShowNotifications] = useState(false);

  const keyMap = useMemo(() => new Map(ACTIVATION_KEYS.map((item) => [item.code, item])), []);
  const persistedUnlocked = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem("growthHubPortalUnlocked") === "true",
    () => false,
  );
  const portalRole = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem("growthHubPortalRole") ?? "member",
    () => "member",
  );
  const membershipSummary = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem("growthHubMembershipSummary") ?? "Plan: Member - Active",
    () => "Plan: Member - Active",
  );
  const isUnlocked = portalState === "success" || persistedUnlocked;
  const isAdmin = portalRole === "admin";

  useEffect(() => {
    if (!isUnlocked) return;

    const memberTimer = window.setInterval(() => {
      setLiveMemberCount((previous) => {
        const delta = Math.floor(Math.random() * 4) - 1;
        const next = Math.max(BASE_MEMBER_COUNT, previous + delta);
        window.localStorage.setItem("growthHubLiveMemberCount", String(next));
        return next;
      });
    }, 6000);

    const nodeTimer = window.setInterval(() => {
      setActiveNodes(Math.max(8, BASE_ACTIVE_NODES + Math.floor(Math.random() * 5) - 2));
    }, 7000);

    const dashboardTimer = window.setInterval(() => {
      setDashboardSnapshot((previous) => {
        const next: DashboardSnapshot = {
          ...previous,
          engagementRate: Math.max(80, Math.min(99, previous.engagementRate + randomBetween(-1, 1))),
          sessionAttendance: Math.max(100, previous.sessionAttendance + randomBetween(-4, 6)),
          openPartnerships: Math.max(10, previous.openPartnerships + randomBetween(-1, 2)),
          resourceVelocity: Math.max(15, previous.resourceVelocity + randomBetween(-2, 3)),
          activityFeed: buildRandomFeed(),
          upcomingSessions: buildRandomSessions(),
        };
        window.localStorage.setItem("growthHubDashboardSnapshot", JSON.stringify(next));
        return next;
      });
    }, 12000);

    const roadmapTimer = window.setInterval(() => {
      setWeeklyRoadmap(generateWeeklyRoadmap());
    }, 15000);

    return () => {
      window.clearInterval(memberTimer);
      window.clearInterval(nodeTimer);
      window.clearInterval(dashboardTimer);
      window.clearInterval(roadmapTimer);
    };
  }, [isUnlocked]);

  const handleActivate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submittedKey = keyValue.trim().toUpperCase();

    if (submittedKey !== ADMIN_CODE && !keyMap.has(submittedKey)) {
      setPortalState("error");
      return;
    }

    setPortalState("validating");
    window.setTimeout(() => {
      const role = submittedKey === ADMIN_CODE ? "admin" : "member";
      const matchedLicense = keyMap.get(submittedKey);
      const plan = submittedKey === ADMIN_CODE ? "Admin" : matchedLicense ? planLabelFromCode(matchedLicense.code) : "Member";
      const duration = submittedKey === ADMIN_CODE ? "Unlimited" : matchedLicense?.duration ?? "Active";
      window.localStorage.setItem("growthHubPortalUnlocked", "true");
      window.localStorage.setItem("growthHubPortalRole", role);
      window.localStorage.setItem("growthHubMembershipSummary", `Plan: ${plan} - ${duration}`);
      const storedCount = Number(window.localStorage.getItem("growthHubLiveMemberCount"));
      const baseline = Number.isNaN(storedCount) ? BASE_MEMBER_COUNT : storedCount;
      const increasedCount = baseline + Math.floor(Math.random() * 4) + 1;
      window.localStorage.setItem("growthHubLiveMemberCount", String(increasedCount));
      setLiveMemberCount(increasedCount);
      const snapshot = generateDashboardSnapshot();
      window.localStorage.setItem("growthHubDashboardSnapshot", JSON.stringify(snapshot));
      setDashboardSnapshot(snapshot);
      setWeeklyRoadmap(generateWeeklyRoadmap());
      setActiveNodes(Math.max(8, BASE_ACTIVE_NODES + randomBetween(-1, 2)));
      setPortalState("success");
    }, 3000);
  };

  if (!isUnlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/40"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Member Activation</p>
          <h1 className="mt-4 text-2xl font-semibold text-slate-100">Portal Access Control</h1>
          <p className="mt-3 text-sm text-slate-300">
            Enter your 16-digit Membership Key to unlock the private community dashboard.
          </p>
          <form onSubmit={handleActivate} className="mt-8 space-y-4">
            <input
              value={keyValue}
              onChange={(event) => {
                setKeyValue(event.target.value);
                if (portalState === "error") setPortalState("locked");
              }}
              placeholder="Enter your Member Code (e.g., CHA-12M-XXXX)"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            />
            <button
              type="submit"
              disabled={portalState === "validating"}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-900"
            >
              {portalState === "validating" ? "Validating..." : "Activate Access"}
            </button>
          </form>
          {portalState === "error" ? (
            <p className="mt-4 text-sm text-rose-300">
              Invalid key. Please verify your membership code and try again.
            </p>
          ) : null}
          {portalState === "validating" ? (
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="mt-4 h-1 rounded-full bg-indigo-400"
            />
          ) : null}
          <p className="mt-6 text-center text-xs text-slate-400">
            Need help? Contact <span className="text-slate-200">membership@thegrowthhub.com</span>
          </p>
        </motion.section>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col border-b border-slate-800 bg-slate-900/80 p-4 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
        <h1 className="text-lg font-semibold text-slate-100">The Growth Hub Portal</h1>
        <p className="mt-1 text-sm text-slate-400">{membershipSummary}</p>
        <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400">
          <p className="font-semibold uppercase tracking-[0.15em] text-slate-300">System Status</p>
          <p className="mt-3">API: Online</p>
          <p className="mt-1">Nodes: {activeNodes} Operational</p>
          <p className="mt-1">Support: Active</p>
        </div>
        <nav className="mt-6 grid gap-2">
          {[
            { id: "dashboard", label: "Dashboard Overview" },
            { id: "courses", label: "Course Library" },
            { id: "resources", label: "Resource Section" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id as Section)}
              className={`rounded-lg px-3 py-2 text-left text-sm ${
                section === item.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {item.label}
                {item.id === "resources" ? (
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </nav>
        <a
          href="mailto:membership@thegrowthhub.com"
          className="mt-4 inline-block text-sm text-slate-300 hover:text-indigo-200"
        >
          Member Support
        </a>
        <Link href="/portal/support" className="mt-2 inline-block text-sm text-slate-300 hover:text-indigo-200">
          Help &amp; Support
        </Link>
        {isAdmin ? (
          <Link href="/portal/admin/tickets" className="mt-2 inline-block text-sm text-slate-300 hover:text-indigo-200">
            Admin Tickets
          </Link>
        ) : null}
        <Link href="/portal/resources" className="mt-2 inline-block text-sm text-slate-300 hover:text-indigo-200">
          Resources Library
        </Link>
        <Link href="/" className="mt-6 inline-block text-sm text-indigo-300 hover:text-indigo-200">
          Return to Main Site
        </Link>
        <p className="mt-auto pt-6 text-[11px] leading-5 text-slate-500">
          © 2026 The Growth Nexus Hub. All Rights Reserved. Enterprise License v4.2
        </p>
      </aside>

      <main className="relative flex-1 p-4 sm:p-8">
        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={() => setShowNotifications((previous) => !previous)}
            className="relative rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-200 hover:border-indigo-400"
            aria-label="Toggle notifications"
          >
            <span className="text-lg">🔔</span>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              1
            </span>
          </button>
          {showNotifications ? (
            <div className="absolute right-4 top-16 z-20 w-80 rounded-lg border border-slate-700 bg-slate-900/95 p-4 text-sm text-slate-200 shadow-xl sm:right-8">
              Welcome to the Vault! Your Q2 Resources are now ready for download.
            </div>
          ) : null}
        </div>
        {section === "dashboard" ? (
          <div className="space-y-6">
            <section className="grid gap-4 xl:grid-cols-4">
              <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Engagement</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{dashboardSnapshot.engagementRate}%</p>
                <p className="mt-1 text-xs text-slate-400">Weekly participation rate</p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Session Attendance</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{dashboardSnapshot.sessionAttendance}</p>
                <p className="mt-1 text-xs text-slate-400">Members active this cycle</p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Open Partnerships</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{dashboardSnapshot.openPartnerships}</p>
                <p className="mt-1 text-xs text-slate-400">Strategic collaboration opportunities</p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Resource Velocity</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">{dashboardSnapshot.resourceVelocity}</p>
                <p className="mt-1 text-xs text-slate-400">New assets released this month</p>
              </article>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Community Command Center</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-100">Membership Activated</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Welcome to your enterprise collaboration workspace. Track strategic momentum, monitor
                execution checkpoints, and align with high-performance operators across the network.
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Execution</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-100">Weekly Roadmap</h3>
                <div className="mt-5 space-y-3">
                  {weeklyRoadmap.map((step) => (
                    <label
                      key={step.label}
                      className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200"
                    >
                      <input
                        type="checkbox"
                        checked={step.done}
                        readOnly
                        className="h-4 w-4 accent-indigo-500"
                      />
                      {step.label}
                    </label>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Live Activity Feed</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-100">Community Pulse</h3>
                <ul className="mt-5 space-y-3">
                  {dashboardSnapshot.activityFeed.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Announcements</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">Platform Broadcasts</h3>
              <div className="mt-6 space-y-4">
                {announcements.map((entry) => (
                  <article key={entry.title} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-indigo-300">{entry.date}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-100">{entry.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{entry.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Calendar</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-100">Upcoming Member Sessions</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {dashboardSnapshot.upcomingSessions.map((session) => (
                  <article key={session.title} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">{session.type}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-100">{session.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{session.time}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : null}

        {section === "courses" ? (
          <section className="grid gap-6 lg:grid-cols-2">
            {courseLibrary.map((course) => (
              <article
                key={course.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-100">{course.title}</h3>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        course.level === "Expert"
                          ? "bg-indigo-600/20 text-indigo-300"
                          : course.level === "Executive"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {course.level}
                    </span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                      {course.category}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400">{course.instructor}</p>
                <CourseThumbnail courseTitle={course.title} duration={course.previewDuration}>
                  <button
                    type="button"
                    onClick={() => setActiveVideo({ title: course.title, youtubeId: course.youtubeId })}
                    className="z-10 rounded-full border border-indigo-300/60 bg-indigo-600/80 px-4 py-1.5 text-xs font-semibold text-white"
                  >
                    Play
                  </button>
                </CourseThumbnail>
                <div className="mt-4 grid gap-1 text-xs text-slate-300">
                  <p>{course.memberSatisfaction}</p>
                  <p>{course.studentsEnrolled}</p>
                </div>
                <p className="mt-4 text-xs leading-6 text-slate-300">
                  {course.description.slice(0, 230)}...
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    {course.completedSessions}/{course.totalSessions} sessions completed
                  </p>
                </div>
                {course.href ? (
                  <Link
                    href={course.href}
                    className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    Open Course
                  </Link>
                ) : null}
              </article>
            ))}
          </section>
        ) : null}

        {section === "resources" ? (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-semibold text-slate-100">Resource Section</h2>
            <p className="mt-3 text-slate-300">
              Access and download commercial intelligence files from your secure member workspace.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
              <div className="hidden grid-cols-[1fr_auto_auto_auto] bg-slate-950/70 px-4 py-3 text-xs uppercase tracking-[0.15em] text-slate-400 sm:grid">
                <p>File Name</p>
                <p>Type</p>
                <p>Size</p>
                <p className="text-right">Action</p>
              </div>
              <div className="divide-y divide-slate-800">
                {resourceLibrary.map((file) => (
                  <div
                    key={file.name}
                    className="grid grid-cols-1 gap-3 bg-slate-900/40 px-4 py-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-md bg-rose-500/15 px-2 py-1 text-xs font-semibold text-rose-300">
                        PDF
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-100">{file.name}</p>
                        <p className="text-xs text-slate-400">{file.updated}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300">Document</p>
                    <p className="text-xs text-slate-300">{file.size}</p>
                    <a
                      href={`/portal/resources/download/${file.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 sm:justify-self-end"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <footer className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300">
          <p>Live Member Count: {liveMemberCount.toLocaleString()}</p>
          <p className="mt-1">Active Nodes: {activeNodes}</p>
        </footer>
        <VideoModal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          title={activeVideo ? activeVideo.title : "Course Preview"}
          youtubeId={activeVideo?.youtubeId ?? ""}
        />
      </main>
    </div>
  );
}
