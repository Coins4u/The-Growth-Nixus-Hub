export type CourseSession = {
  title: string;
  summary: string;
  pillars: string[];
  resourceName: string;
  downloadLink: string;
  fileSize: string;
  lastUpdated: string;
  sessionNotes: string;
};

export type CourseReview = {
  name: string;
  role: string;
  date: string;
  text: string;
};

export type CourseItem = {
  slug: string;
  title: string;
  level: "Beginner" | "Expert" | "Executive";
  category: "Strategic" | "Infrastructure" | "Growth";
  instructor: string;
  subtitle: string;
  description: [string, string, string];
  thumbnail: string;
  youtubeId: string;
  previewDuration: string;
  memberSatisfaction: string;
  studentsEnrolled: string;
  completedSessions: number;
  sessions: CourseSession[];
  reviews: CourseReview[];
};

type CourseSeed = {
  slug: string;
  title: string;
  level: "Beginner" | "Expert" | "Executive";
  category: "Strategic" | "Infrastructure" | "Growth";
  instructor: string;
  subtitle: string;
  thumbnail: string;
  previewDuration: string;
  completedSessions: number;
  modules: string[];
};

const DEFAULT_YOUTUBE_ID = "46XhZf7Z94E";

const VIDEO_REGISTRY: Partial<Record<string, string>> = {
  "AI Video Bootcamp": "QZ5u4Nt3g9w",
  "Expert-Level Prompting": "qBlX6FhDm2E",
  "Autonomous Agent Deployment": "UgUTo45K73w",
  "Generative Design for Brands": "go_-6FfP0nA",
  "AI Data Analysis": "dvFDxwlT2e8",
  "Meta Ads Mastery": "mZWJCjhZanQ",
  "Google Search Dominance": "yTI5wN7WXwk",
  "TikTok Viral Frameworks": "cYF6m1XjqUs",
  "Native Ad Scaling": "r4POIRXS30I",
  "Retargeting Architecture": "YZ_zNzXHOio",
  "Edge Node Management": "cntmKNUJehI",
  "Cyber-Security for Agencies": "BfMvcm8-O4g",
  "Cloud Architecture Fundamentals": "pM45hWKia5o",
  "High-Performance Networking": "dhQ51C4F8WE",
  "System Automation": "xowQkxFXTNg",
  "High-Ticket Sales Engineering": "KpoqPBzyfdA",
  "Conversion Rate Optimization (CRO)": "Uh9V8HhkXNo",
  "Global Compliance & Tax": "L_UjKHUfN7E",
  "Content Distribution Systems": "RUmLdCwVmJU",
  "Retention & Community Building": "nEdGaVY7IK4",
};

const reviewNames = [
  "N. Kareem",
  "A. Voss",
  "D. Hartmann",
  "L. Becker",
  "R. Imani",
  "T. Gomez",
];
const reviewRoles = [
  "Operations Director",
  "Growth Lead",
  "Commercial Strategy Manager",
  "Infrastructure Program Lead",
  "Acquisition Manager",
  "Member Success Executive",
];
const reviewDates = ["2026-01-18", "2026-02-06", "2026-03-11", "2026-04-02", "2026-04-09"];

function buildDescription(seed: CourseSeed): [string, string, string] {
  const m1 = seed.modules[0];
  const m2 = seed.modules[1];
  const m3 = seed.modules[2];
  const m4 = seed.modules[3];
  const m5 = seed.modules[4];

  const p1 = `${seed.title} is structured as a high-ticket operator curriculum for teams that need measurable performance in enterprise delivery environments, not surface-level tutorials. The program starts by mapping how strategy, systems, and execution governance connect under real commercial pressure where SLA compliance, latency budgets, and conversion-funnel consistency directly affect revenue quality. In the opening modules, especially ${m1.toLowerCase()} and ${m2.toLowerCase()}, members establish an architectural baseline for decision-making, define success telemetry, and create escalation pathways for when throughput or quality drops below target. Rather than teaching isolated tactics, the course frames each action inside a systems perspective that improves predictability, reduces operational noise, and supports disciplined scaling across markets and business units.`;

  const p2 = `As the course advances into ${m3.toLowerCase()} and ${m4.toLowerCase()}, participants move from architecture into repeatable implementation. They work with professional-grade frameworks that combine LTV optimization, arbitrage models for channel efficiency, and process instrumentation for forecasting and resource allocation. The training emphasizes how to convert technical decisions into clear business outcomes by linking campaign performance, infrastructure reliability, and risk management into a unified scorecard. Teams are shown how to establish review cadences, model break-even thresholds, and reinforce operating discipline through documentation standards that are suitable for stakeholders, partners, and audit-facing workflows. This middle block is intentionally execution-heavy so members can deploy improvements quickly without introducing governance drift.`;

  const p3 = `The final segment, anchored by ${m5.toLowerCase()}, focuses on maturity and scale. Members build a long-horizon operating stack that includes node redundancy planning, observability controls, and LLM fine-tuning checkpoints where intelligent automation is part of delivery. They also learn to produce executive-grade artifacts that communicate impact with clarity: implementation briefs, risk registers, KPI narratives, and roadmap recommendations linked to ROI outcomes. With guidance from ${seed.instructor}, the result is a practical capability upgrade that strengthens commercial resilience, improves team confidence under growth pressure, and creates a durable framework for sustained performance. By the end of the program, participants can run this capability as an internal standard, not a one-time initiative, which is the core difference between temporary wins and enterprise-grade consistency.`;

  return [p1, p2, p3];
}

function sessionSummary(seed: CourseSeed, moduleTitle: string) {
  return `This module translates ${moduleTitle.toLowerCase()} into a production-ready framework with clear SLA checkpoints, latency controls, and conversion-funnel alignment. Members build an executable blueprint for ${seed.title.toLowerCase()} and validate it against ROI targets, governance standards, and enterprise deployment constraints.`;
}

function sessionPillars(seed: CourseSeed, moduleTitle: string) {
  return [
    `Architecture Pillar: Define the operating blueprint for ${moduleTitle.toLowerCase()} with SLA thresholds, latency targets, and node redundancy assumptions for stable execution.`,
    `Optimization Pillar: Apply arbitrage models, LTV optimization logic, and conversion-funnel signal analysis to improve commercial efficiency under live operating constraints.`,
    `Governance Pillar: Build observability, QA controls, and (where relevant) LLM fine-tuning checkpoints so teams can scale output without compromising compliance or delivery quality.`,
  ];
}

function sessionResource(index: number) {
  return `Module_${index + 1}_Cheat_Sheet.pdf`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sessionTheme(seed: CourseSeed) {
  if (seed.category === "Infrastructure") return "infrastructure";
  if (/(ai|prompt|autonomous|automation|generative)/i.test(seed.title)) return "ai";
  return "marketing";
}

function themePhrases(theme: ReturnType<typeof sessionTheme>) {
  if (theme === "ai") {
    return [
      "Prompt Chaining Workflows",
      "API Rate-Limit Strategies",
      "Deployment Guardrails",
    ];
  }
  if (theme === "infrastructure") {
    return [
      "Latency Benchmarking",
      "Node Redundancy Protocols",
      "Failover SOPs",
    ];
  }
  return [
    "Multi-Touch Attribution Models",
    "LTV/CAC Calculation Worksheets",
    "Funnel Logic Maps",
  ];
}

function buildSessionNotes(seed: CourseSeed, moduleTitle: string, theme: ReturnType<typeof sessionTheme>) {
  const [phraseA, phraseB, phraseC] = themePhrases(theme);
  const fragments = [
    `Session Implementation Guide for ${moduleTitle}.`,
    `This guide defines the operational architecture required to execute ${moduleTitle.toLowerCase()} inside ${seed.title} with measurable commercial impact.`,
    `The opening phase focuses on system baselining, role alignment, and KPI mapping so delivery teams understand the decision boundaries before production activation.`,
    `Operators establish service thresholds, quality controls, and governance checkpoints that keep execution consistent under enterprise load and cross-functional handoff pressure.`,
    `Implementation teams then build standardized runbooks to reduce ambiguity and accelerate onboarding for new contributors entering the workflow.`,
    `${phraseA} are documented with stage-by-stage handoff logic, validation checkpoints, and escalation pathways when outputs fall outside expected confidence ranges.`,
    `${phraseB} are applied to protect throughput stability, maintain predictable response times, and ensure production traffic does not degrade conversion-sensitive operations.`,
    `${phraseC} are integrated into the governance layer so strategic intent is preserved while tactical execution scales across channels, teams, and reporting windows.`,
    `The guide includes architecture decision records, allowing leadership to audit why specific technical choices were made and how those choices affected ROI reliability.`,
    `Execution standards are mapped to weekly review cadences where operators assess performance variance, update assumptions, and re-prioritize deployment backlog items.`,
    `A dedicated quality-assurance framework verifies that outputs meet brand, compliance, and technical standards before release into live member-facing workflows.`,
    `To support enterprise resilience, the framework introduces redundancy controls, rollback paths, and monitoring hooks that make incident response faster and less disruptive.`,
    `Teams are instructed to instrument every major milestone with event-level telemetry so reporting can distinguish signal from noise across high-volume production cycles.`,
    `Operational leaders are encouraged to translate technical findings into board-ready summaries tied to conversion funnel movement, service reliability, and unit economics.`,
    `The methodology prioritizes repeatability: once a tactic proves effective, it is converted into a reusable module with training notes and dependency checklists.`,
    `This enables organizations to reduce knowledge silos and preserve institutional memory as teams expand across geographies and business functions.`,
    `Risk controls include access governance, change approval policies, and scenario-based stress testing to ensure the process remains stable during scale spikes.`,
    `The guide closes with a maturity matrix that scores implementation quality across architecture, optimization, and governance domains.`,
    `By completing this session, teams can run ${moduleTitle.toLowerCase()} as a disciplined operating system instead of an ad-hoc initiative.`,
    `The final deliverable package includes implementation checkpoints, execution scorecards, and a deployment timeline aligned with strategic growth objectives.`,
  ];

  let notes = "";
  let index = 0;
  while (notes.split(/\s+/).filter(Boolean).length < 500) {
    notes += `${fragments[index % fragments.length]} `;
    index += 1;
  }
  return notes.trim();
}

function fileSizeForSession(index: number) {
  const sizes = ["2.1 MB", "2.4 MB", "2.8 MB", "3.0 MB", "3.3 MB"];
  return sizes[index % sizes.length];
}

function lastUpdatedForSession(index: number) {
  const updates = [
    "Mar 04, 2026",
    "Mar 18, 2026",
    "Apr 01, 2026",
    "Apr 06, 2026",
    "Apr 10, 2026",
  ];
  return updates[index % updates.length];
}

function makeSessions(seed: CourseSeed): CourseSession[] {
  const theme = sessionTheme(seed);
  return seed.modules.map((moduleTitle, index) => ({
    title: moduleTitle,
    summary: sessionSummary(seed, moduleTitle),
    pillars: sessionPillars(seed, moduleTitle),
    resourceName: sessionResource(index),
    downloadLink: `/downloads/${seed.slug}/${slugify(moduleTitle)}.pdf`,
    fileSize: fileSizeForSession(index),
    lastUpdated: lastUpdatedForSession(index),
    sessionNotes: buildSessionNotes(seed, moduleTitle, theme),
  }));
}

function makeReviews(seed: CourseSeed, offset: number): CourseReview[] {
  return Array.from({ length: 5 }).map((_, i) => {
    const name = reviewNames[(offset + i) % reviewNames.length];
    const role = reviewRoles[(offset + i) % reviewRoles.length];
    const date = reviewDates[i];
    return {
      name: `Verified Member - ${name}`,
      role,
      date,
      text: `The ${seed.title} modules were exceptionally practical. We implemented the framework in our live stack and improved delivery confidence, reduced troubleshooting time, and gained clearer KPI visibility for leadership decisions.`,
    };
  });
}

const seedCourses: CourseSeed[] = [
  {
    slug: "ai-video-bootcamp",
    title: "AI Video Bootcamp",
    level: "Executive",
    category: "Growth",
    instructor: "Dr. Elian Cross - AI Media Systems Lead",
    subtitle: "Includes Certificate of Participation",
    thumbnail:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "14:22",
    completedSessions: 5,
    modules: [
      "Architectural Foundations of AI Video Synthesis",
      "Script Engineering and Avatar Storyboarding Systems",
      "Rendering Pipelines and Quality-Upscaling Protocols",
      "Audio Post Stack and Multi-Layer Finishing Workflows",
      "API-Orchestrated Video Production at Scale",
    ],
  },
  {
    slug: "expert-level-prompting",
    title: "Expert-Level Prompting",
    level: "Expert",
    category: "Strategic",
    instructor: "Dr. Aris Thorne - Prompt Systems Architect",
    subtitle: "Advanced prompt engineering for LLM fine-tuning and creative automation",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "12:48",
    completedSessions: 2,
    modules: [
      "Enterprise Prompt Stack Architecture",
      "Context Windows, Retrieval Layers, and Memory Control",
      "Fine-Tuning Prompt Loops for Specialized Outputs",
      "Creative Automation with Guardrails and QA Gates",
      "Prompt Governance, Auditability, and Team Rollout",
    ],
  },
  {
    slug: "autonomous-agent-deployment",
    title: "Autonomous Agent Deployment",
    level: "Executive",
    category: "Infrastructure",
    instructor: "Mira Solen - Agent Operations Director",
    subtitle: "How to build and manage AI workers for 24/7 business operations",
    thumbnail:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "16:09",
    completedSessions: 2,
    modules: [
      "Agent Topology and Responsibility Mapping",
      "Tool Permissions, Policy Boundaries, and Safe Execution",
      "Monitoring, Telemetry, and Exception Escalation",
      "Multi-Agent Coordination for Revenue Operations",
      "24/7 Deployment with Governance and SLA Controls",
    ],
  },
  {
    slug: "generative-design-for-brands",
    title: "Generative Design for Brands",
    level: "Beginner",
    category: "Growth",
    instructor: "Clara Fen - Brand Systems Lead",
    subtitle: "Using AI to create scalable visual identities and marketing assets",
    thumbnail:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "11:37",
    completedSessions: 2,
    modules: [
      "AI-Driven Identity Systems and Brand Constraints",
      "Prompt Engineering for Visual Consistency",
      "Campaign Asset Factories for B2B Funnels",
      "Template Governance and Multi-Team Collaboration",
      "Design QA, Versioning, and Performance Feedback",
    ],
  },
  {
    slug: "ai-data-analysis",
    title: "AI Data Analysis",
    level: "Expert",
    category: "Strategic",
    instructor: "Jonas Vale - Predictive Intelligence Analyst",
    subtitle: "Leveraging machine learning to predict consumer trends and revenue shifts",
    thumbnail:
      "https://images.unsplash.com/photo-1551281044-8b2c5d8f7f0c?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "15:11",
    completedSessions: 5,
    modules: [
      "Data Signal Integrity and Feature Engineering",
      "Neural Network Selection for Trend Prediction",
      "Revenue Shift Modeling and Scenario Trees",
      "Forecast Validation and Decision Confidence Bands",
      "Executive AI Reporting and Strategic Activation",
    ],
  },
  {
    slug: "meta-ads-mastery",
    title: "Meta Ads Mastery",
    level: "Expert",
    category: "Growth",
    instructor: "Rami Kline - Paid Media Performance Lead",
    subtitle: "Scaling creative testing and CBO strategies for high-volume accounts",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "13:56",
    completedSessions: 2,
    modules: [
      "Meta Account Topology for Scalable Buying",
      "Creative Testing Matrices and Iteration Velocity",
      "CBO Strategy, Budget Routing, and Spend Elasticity",
      "Audience Signal Hygiene and Funnel Sequencing",
      "Profitability Analytics and Scale Governance",
    ],
  },
  {
    slug: "google-search-dominance",
    title: "Google Search Dominance",
    level: "Expert",
    category: "Growth",
    instructor: "Lena Brookes - Search Acquisition Director",
    subtitle: "Managing high-intent keyword bidding and quality score optimization",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "12:19",
    completedSessions: 2,
    modules: [
      "Intent-Weighted Keyword Architecture",
      "Match-Type Control and Query Sculpting",
      "Bid Automation with Profitability Safeguards",
      "Quality Score Engineering and Landing Relevance",
      "Expansion Systems for Competitive SERP Markets",
    ],
  },
  {
    slug: "tiktok-viral-frameworks",
    title: "TikTok Viral Frameworks",
    level: "Beginner",
    category: "Growth",
    instructor: "Dario Penn - Creative Performance Strategist",
    subtitle: "The science behind the hook-retain-convert video ad structure",
    thumbnail:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "10:43",
    completedSessions: 2,
    modules: [
      "Hook Engineering for High-Retention Openers",
      "Narrative Sequencing for Mid-Video Hold",
      "Conversion Trigger Design in Short-Form Ads",
      "Batch Creative Production and Test Velocity",
      "Signal-Based Optimization for Viral Scale",
    ],
  },
  {
    slug: "native-ad-scaling",
    title: "Native Ad Scaling",
    level: "Expert",
    category: "Growth",
    instructor: "Selim North - Native Acquisition Specialist",
    subtitle: "Using Outbrain and Taboola for mass-market lead generation",
    thumbnail:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "13:12",
    completedSessions: 5,
    modules: [
      "Native Funnel Blueprint and Message Fit",
      "Advertorial Engineering for Qualified Clicks",
      "Outbrain and Taboola Campaign Architecture",
      "Publisher Optimization and Bid Strategy Control",
      "Lead Quality Assurance and Scale Playbooks",
    ],
  },
  {
    slug: "retargeting-architecture",
    title: "Retargeting Architecture",
    level: "Expert",
    category: "Strategic",
    instructor: "Nora Diaz - Lifecycle Funnel Engineer",
    subtitle: "Building multi-touch attribution funnels to recover lost traffic",
    thumbnail:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "11:58",
    completedSessions: 2,
    modules: [
      "Audience State Mapping and Recovery Strategy",
      "Multi-Touch Attribution Design for Retargeting",
      "Message Sequencing Across Decision Stages",
      "Budget Reallocation by Incremental Impact",
      "Retargeting Governance and Performance Audits",
    ],
  },
  {
    slug: "edge-node-management",
    title: "Edge Node Management",
    level: "Executive",
    category: "Infrastructure",
    instructor: "Dr. Aris Thorne - Infrastructure Lead",
    subtitle: "Deploying global server networks for low-latency digital delivery",
    thumbnail:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "15:44",
    completedSessions: 2,
    modules: [
      "Global Node Topology and Region Prioritization",
      "Latency Budgeting and Route Optimization",
      "Node Telemetry, Alerting, and Incident Response",
      "Failover Orchestration and Redundancy Design",
      "Capacity Planning for Enterprise Traffic Growth",
    ],
  },
  {
    slug: "cyber-security-for-agencies",
    title: "Cyber-Security for Agencies",
    level: "Executive",
    category: "Infrastructure",
    instructor: "Iris Mendez - Security Compliance Officer",
    subtitle: "AES-256 encryption standards and protecting client data assets",
    thumbnail:
      "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "14:04",
    completedSessions: 5,
    modules: [
      "Agency Threat Models and Attack Surface Mapping",
      "AES-256 Encryption in Storage and Transit Pipelines",
      "Access Policy Design and Privilege Segmentation",
      "Incident Containment and Recovery Operations",
      "Security Reporting and Client Assurance Protocols",
    ],
  },
  {
    slug: "cloud-architecture-fundamentals",
    title: "Cloud Architecture Fundamentals",
    level: "Beginner",
    category: "Infrastructure",
    instructor: "Owen Trask - Cloud Operations Mentor",
    subtitle: "Mastering VPS deployment and Nginx reverse proxy configurations",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "12:05",
    completedSessions: 2,
    modules: [
      "VPS Provisioning and Baseline Security Standards",
      "Nginx Reverse Proxy Routing and Request Handling",
      "SSL/TLS Configuration and Domain Reliability",
      "Monitoring, Logging, and Incident Visibility",
      "Deployment Automation and Recovery Planning",
    ],
  },
  {
    slug: "high-performance-networking",
    title: "High-Performance Networking",
    level: "Expert",
    category: "Infrastructure",
    instructor: "Kai Riddell - Network Systems Engineer",
    subtitle: "Optimizing TX/RX rates and Point-to-Multipoint wireless bridges",
    thumbnail:
      "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "13:47",
    completedSessions: 2,
    modules: [
      "Throughput Baselines and Network Diagnostic Models",
      "TX/RX Rate Optimization and Stability Controls",
      "Wireless Bridge Design for Point-to-Multipoint",
      "Interference Isolation and Signal Integrity QA",
      "Capacity Audits and Scaling Recommendations",
    ],
  },
  {
    slug: "system-automation",
    title: "System Automation",
    level: "Beginner",
    category: "Infrastructure",
    instructor: "Reed Hall - Workflow Automation Consultant",
    subtitle: "Using Zapier and Make to connect disparate business software",
    thumbnail:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "10:54",
    completedSessions: 2,
    modules: [
      "Workflow Mapping and Automation Opportunity Design",
      "Zapier and Make Logic for Process Orchestration",
      "Data Transformation and Schema Reliability",
      "Error Handling, Alerting, and Retry Strategy",
      "Governance, Documentation, and Team Handover",
    ],
  },
  {
    slug: "high-ticket-sales-engineering",
    title: "High-Ticket Sales Engineering",
    level: "Executive",
    category: "Strategic",
    instructor: "Tariq Lowe - Enterprise Revenue Advisor",
    subtitle: "The psychology of closing five-figure B2B service contracts",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "12:42",
    completedSessions: 5,
    modules: [
      "Enterprise Buyer Psychology and Decision Systems",
      "Discovery Architectures for Strategic Qualification",
      "Offer Engineering and Value Quantification",
      "Objection Navigation in Multi-Stakeholder Deals",
      "Proposal Control and Five-Figure Closing",
    ],
  },
  {
    slug: "conversion-rate-optimization-cro",
    title: "Conversion Rate Optimization (CRO)",
    level: "Expert",
    category: "Growth",
    instructor: "Eva Shin - Conversion Science Lead",
    subtitle: "A/B testing landing pages for maximum ROI",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "11:31",
    completedSessions: 2,
    modules: [
      "CRO Experiment Architecture and KPI Alignment",
      "Hypothesis Backlog Prioritization and Test Design",
      "Variant Engineering for Copy and Offer Dynamics",
      "Statistical Significance and Decision Thresholds",
      "Scaling Winners Across Multi-Page Funnels",
    ],
  },
  {
    slug: "global-compliance-tax",
    title: "Global Compliance & Tax",
    level: "Executive",
    category: "Strategic",
    instructor: "Nadia Verne - International Compliance Counsel",
    subtitle: "Navigating international digital trade and AE regulations",
    thumbnail:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "13:05",
    completedSessions: 2,
    modules: [
      "Cross-Border Digital Trade Compliance Mapping",
      "Tax Structures, Invoicing, and Filing Workflows",
      "AE Regulatory Alignment for Digital Businesses",
      "Processor Risk Controls and Merchant Safeguards",
      "Ongoing Governance and Compliance Operations",
    ],
  },
  {
    slug: "content-distribution-systems",
    title: "Content Distribution Systems",
    level: "Expert",
    category: "Growth",
    instructor: "Paolo Krell - Distribution Operations Lead",
    subtitle: "Scaling a single video into 50+ pieces of cross-platform content",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "12:27",
    completedSessions: 5,
    modules: [
      "Core Asset Extraction and Content Atomization",
      "Platform-Native Adaptation and Format Engineering",
      "Repurposing Systems for Volume and Consistency",
      "Scheduling Orchestration and Editorial Governance",
      "Performance Loops and Distribution Optimization",
    ],
  },
  {
    slug: "retention-community-building",
    title: "Retention & Community Building",
    level: "Executive",
    category: "Strategic",
    instructor: "Hana Bell - Member Lifecycle Director",
    subtitle: "Strategies for reducing churn in subscription-based models",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    previewDuration: "11:46",
    completedSessions: 2,
    modules: [
      "Churn Diagnostics and Cohort Risk Signals",
      "Onboarding Architecture for Early Value Delivery",
      "Community Activation and Engagement Systems",
      "Save Flows and Lifecycle Communication Design",
      "Retention Governance and LTV Scaling",
    ],
  },
];

export const courseCatalog: CourseItem[] = seedCourses.map((seed, index) => ({
  ...seed,
  youtubeId: VIDEO_REGISTRY[seed.title] ?? DEFAULT_YOUTUBE_ID,
  memberSatisfaction: "98% Member Satisfaction",
  studentsEnrolled: "1.2k Students Enrolled",
  description: buildDescription(seed),
  sessions: makeSessions(seed),
  reviews: makeReviews(seed, index),
}));
