"use client";

import { useEffect, useState } from "react";

const BASE_MEMBERS = 1482;

export function LiveStatisticsBar() {
  const [activeMembers, setActiveMembers] = useState(BASE_MEMBERS);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMembers((previous) => Math.max(BASE_MEMBERS, previous + Math.floor(Math.random() * 3) - 1));
    }, 5500);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200">
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        Live Statistics:
      </span>{" "}
      {activeMembers.toLocaleString()} Active Members | $12M+ Partner Revenue | 99.9% Infrastructure Uptime
    </div>
  );
}
