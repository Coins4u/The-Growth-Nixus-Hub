"use client";

type CourseThumbnailProps = {
  courseTitle: string;
  duration: string;
  children?: React.ReactNode;
  className?: string;
};

type ThumbnailTheme = {
  strapline: string;
  code: string;
  gradient: string;
};

const THEMES: Record<string, ThumbnailTheme> = {
  "AI Video Bootcamp": {
    strapline: "AI VIDEO SYNTHESIS",
    code: "AVB-01",
    gradient: "from-indigo-700 via-slate-900 to-cyan-700",
  },
  "Expert-Level Prompting": {
    strapline: "PROMPT ENGINEERING",
    code: "ELP-02",
    gradient: "from-violet-700 via-slate-900 to-indigo-700",
  },
  "Autonomous Agent Deployment": {
    strapline: "AUTONOMOUS SYSTEMS",
    code: "AAD-03",
    gradient: "from-teal-700 via-slate-900 to-blue-700",
  },
  "Generative Design for Brands": {
    strapline: "CREATIVE AI SYSTEMS",
    code: "GDB-04",
    gradient: "from-fuchsia-700 via-slate-900 to-indigo-700",
  },
  "AI Data Analysis": {
    strapline: "PREDICTIVE MODELING",
    code: "ADA-05",
    gradient: "from-blue-700 via-slate-900 to-cyan-700",
  },
  "Meta Ads Mastery": {
    strapline: "AD ARCHITECTURE",
    code: "MAM-06",
    gradient: "from-indigo-700 via-slate-900 to-sky-700",
  },
  "Google Search Dominance": {
    strapline: "SEARCH ACQUISITION",
    code: "GSD-07",
    gradient: "from-blue-700 via-slate-900 to-emerald-700",
  },
  "TikTok Viral Frameworks": {
    strapline: "HOOK RETAIN CONVERT",
    code: "TVF-08",
    gradient: "from-rose-700 via-slate-900 to-violet-700",
  },
  "Native Ad Scaling": {
    strapline: "NATIVE TRAFFIC SYSTEMS",
    code: "NAS-09",
    gradient: "from-orange-700 via-slate-900 to-indigo-700",
  },
  "Retargeting Architecture": {
    strapline: "MULTI TOUCH FUNNELS",
    code: "RTA-10",
    gradient: "from-indigo-700 via-slate-900 to-purple-700",
  },
  "Edge Node Management": {
    strapline: "GLOBAL NODE FABRIC",
    code: "ENM-11",
    gradient: "from-cyan-700 via-slate-900 to-blue-700",
  },
  "Cyber-Security for Agencies": {
    strapline: "SECURITY AND COMPLIANCE",
    code: "CSA-12",
    gradient: "from-emerald-700 via-slate-900 to-indigo-700",
  },
  "Cloud Architecture Fundamentals": {
    strapline: "CLOUD OPS BASELINE",
    code: "CAF-13",
    gradient: "from-sky-700 via-slate-900 to-indigo-700",
  },
  "High-Performance Networking": {
    strapline: "THROUGHPUT OPTIMIZATION",
    code: "HPN-14",
    gradient: "from-blue-700 via-slate-900 to-teal-700",
  },
  "System Automation": {
    strapline: "WORKFLOW ORCHESTRATION",
    code: "SAT-15",
    gradient: "from-violet-700 via-slate-900 to-cyan-700",
  },
  "High-Ticket Sales Engineering": {
    strapline: "ENTERPRISE CLOSING",
    code: "HSE-16",
    gradient: "from-amber-700 via-slate-900 to-indigo-700",
  },
  "Conversion Rate Optimization (CRO)": {
    strapline: "CONVERSION SCIENCE",
    code: "CRO-17",
    gradient: "from-indigo-700 via-slate-900 to-emerald-700",
  },
  "Global Compliance & Tax": {
    strapline: "REGULATORY SYSTEMS",
    code: "GCT-18",
    gradient: "from-slate-700 via-slate-900 to-indigo-700",
  },
  "Content Distribution Systems": {
    strapline: "OMNICHANNEL DELIVERY",
    code: "CDS-19",
    gradient: "from-fuchsia-700 via-slate-900 to-blue-700",
  },
  "Retention & Community Building": {
    strapline: "LTV AND RETENTION",
    code: "RCB-20",
    gradient: "from-purple-700 via-slate-900 to-indigo-700",
  },
};

export function CourseThumbnail({ courseTitle, duration, children, className = "" }: CourseThumbnailProps) {
  const theme = THEMES[courseTitle] ?? {
    strapline: "EXECUTIVE MODULE",
    code: "GEN-00",
    gradient: "from-indigo-700 via-slate-900 to-slate-700",
  };

  return (
    <div
      className={`relative mt-4 h-40 overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br ${theme.gradient} ${className}`}
    >
      <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-indigo-300/15 blur-2xl" />
      <div className="absolute inset-0 bg-slate-950/35" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-200/90">{theme.strapline}</p>
          <p className="rounded bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-slate-200">{theme.code}</p>
        </div>
        <p className="max-w-[85%] text-sm font-semibold text-slate-100">{courseTitle}</p>
      </div>
      {children ? <div className="absolute inset-0 flex items-center justify-center">{children}</div> : null}
      <span className="absolute bottom-2 right-2 z-10 rounded bg-slate-900/90 px-2 py-1 text-xs font-semibold text-slate-200">
        {duration}
      </span>
    </div>
  );
}
