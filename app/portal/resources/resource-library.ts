export type ResourceDoc = {
  slug: string;
  name: string;
  size: string;
  updated: string;
  domain: "Growth" | "Infrastructure" | "Strategy";
};

export const resourceLibrary: ResourceDoc[] = [
  { slug: "q2-go-to-market-blueprint", name: "Q2-Go-To-Market-Blueprint.pdf", size: "2.1 MB", updated: "Apr 09, 2026", domain: "Growth" },
  { slug: "enterprise-access-governance-matrix", name: "Enterprise-Access-Governance-Matrix.pdf", size: "2.4 MB", updated: "Apr 06, 2026", domain: "Strategy" },
  { slug: "commercial-licensing-checklist", name: "Commercial-Licensing-Checklist.pdf", size: "1.4 MB", updated: "Apr 02, 2026", domain: "Strategy" },
  { slug: "yaml-deployment-templates", name: "YAML-Deployment-Templates-Pack.pdf", size: "2.0 MB", updated: "Apr 10, 2026", domain: "Infrastructure" },
  { slug: "sla-contract-drafts", name: "SLA-Contract-Drafts.pdf", size: "1.8 MB", updated: "Apr 07, 2026", domain: "Strategy" },
  { slug: "global-tax-compliance-checklist", name: "Global-Tax-Compliance-Checklist.pdf", size: "1.7 MB", updated: "Apr 04, 2026", domain: "Strategy" },
  { slug: "enterprise-sla-operations-guide", name: "Enterprise-SLA-Operations-Guide.pdf", size: "3.0 MB", updated: "Mar 28, 2026", domain: "Infrastructure" },
  { slug: "partner-provisioning-playbook", name: "Partner-Provisioning-Playbook.pdf", size: "2.6 MB", updated: "Mar 20, 2026", domain: "Infrastructure" },
  { slug: "node-redundancy-continuity-plan", name: "Node-Redundancy-Continuity-Plan.pdf", size: "3.3 MB", updated: "Mar 11, 2026", domain: "Infrastructure" },
  { slug: "b2b-funnel-optimization-deck", name: "B2B-Funnel-Optimization-Deck.pdf", size: "4.2 MB", updated: "Mar 05, 2026", domain: "Growth" },
  { slug: "ltv-optimization-attribution-model", name: "LTV-Optimization-Attribution-Model.pdf", size: "2.7 MB", updated: "Feb 22, 2026", domain: "Growth" },
  { slug: "infrastructure-incident-runbook", name: "Infrastructure-Incident-Runbook.pdf", size: "3.8 MB", updated: "Feb 14, 2026", domain: "Infrastructure" },
  { slug: "ai-agent-governance-guide", name: "AI_Agent_Governance_Guide.pdf", size: "2.9 MB", updated: "Feb 03, 2026", domain: "Strategy" },
  { slug: "paid-acquisition-attribution-model", name: "Paid_Acquisition_Attribution_Model.pdf", size: "2.5 MB", updated: "Jan 24, 2026", domain: "Growth" },
  { slug: "digital-trade-risk-assessment", name: "Digital_Trade_Risk_Assessment.pdf", size: "2.2 MB", updated: "Jan 15, 2026", domain: "Strategy" },
];
