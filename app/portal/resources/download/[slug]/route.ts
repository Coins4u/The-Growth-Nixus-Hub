import { PDFDocument, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { resourceLibrary } from "../../resource-library";

function wrapText(text: string, maxLength = 95) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) lines.push(current);
  return lines;
}

function sectionParagraphs(title: string, domain: string) {
  const ai = [
    "Prompt Chaining Workflows",
    "API Rate-Limit Strategies",
    "Deployment Guardrails",
  ];
  const infra = [
    "Latency Benchmarking",
    "Node Redundancy Protocols",
    "Failover SOPs",
  ];
  const growth = [
    "Multi-Touch Attribution Models",
    "LTV/CAC Calculation Worksheets",
    "Funnel Logic Maps",
  ];

  const theme = domain === "Infrastructure" ? infra : domain === "Growth" ? growth : ai;

  return [
    `The ${title} report is a premium internal operating brief designed for leadership teams running high-stakes growth and infrastructure programs. It provides a structured implementation architecture that aligns strategic goals with daily execution controls, ensuring each initiative can be measured through SLA compliance, conversion throughput, and financial efficiency. The guide introduces proprietary naming conventions such as the Nexus Command Lattice(TM), Signal Integrity Corridor(TM), and Velocity Assurance Stack(TM) to standardize communication across strategy, operations, and delivery teams.`,
    `This volume includes actionable frameworks with detailed operating checkpoints, escalation gates, and governance controls for cross-functional teams. In practice, organizations use this document to reduce planning latency, improve deployment confidence, and maintain consistent output quality across changing market conditions. Each section contains scenario-tested workflows that tie tactical decisions to ROI, LTV/CAC performance, and long-horizon resilience. The framework also embeds decision trees and maturity diagnostics so stakeholders can calibrate execution intensity by region, product line, and partner network.`,
    `The implementation sections emphasize ${theme[0]}, ${theme[1]}, and ${theme[2]} as core themes required for scalable enterprise delivery. These modules are supported by benchmarking templates, dashboard schemas, and audit-ready operating records designed for commercial due diligence. Teams can deploy this playbook as a living system: every sprint closes with review loops that convert production telemetry into improved process baselines. The result is a high-ticket operational artifact that functions as both execution engine and strategic control layer for premium business environments.`,
  ];
}

function drawDiagram(page: PDFPage, yBase: number, title: string) {
  page.drawText(title, { x: 50, y: yBase + 95, size: 11, color: rgb(0.1, 0.12, 0.2) });

  const boxColor = rgb(0.92, 0.94, 0.99);
  const stroke = rgb(0.35, 0.42, 0.8);
  const boxes = [
    { x: 55, y: yBase + 40, w: 145, h: 45, label: "Intelligence Layer" },
    { x: 225, y: yBase + 40, w: 145, h: 45, label: "Execution Layer" },
    { x: 395, y: yBase + 40, w: 145, h: 45, label: "Governance Layer" },
  ];

  boxes.forEach((box) => {
    page.drawRectangle({ x: box.x, y: box.y, width: box.w, height: box.h, color: boxColor, borderColor: stroke, borderWidth: 1.2 });
    page.drawText(box.label, { x: box.x + 16, y: box.y + 18, size: 9, color: rgb(0.16, 0.2, 0.35) });
  });

  page.drawLine({ start: { x: 201, y: yBase + 62 }, end: { x: 224, y: yBase + 62 }, thickness: 1.3, color: stroke });
  page.drawLine({ start: { x: 371, y: yBase + 62 }, end: { x: 394, y: yBase + 62 }, thickness: 1.3, color: stroke });
}

function writeWrapped(page: PDFPage, lines: string[], startY: number) {
  let y = startY;
  lines.forEach((line) => {
    page.drawText(line, { x: 50, y, size: 10, color: rgb(0.14, 0.15, 0.22) });
    y -= 15;
  });
  return y;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = resourceLibrary.find((item) => item.slug === slug);

  if (!resource) {
    return new Response("Resource not found", { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  const cover = pdf.addPage([595.28, 841.89]);
  cover.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: rgb(0.07, 0.09, 0.17) });
  cover.drawRectangle({ x: 40, y: 60, width: 515, height: 721, borderColor: rgb(0.28, 0.35, 0.78), borderWidth: 1.5 });
  cover.drawText("THE GROWTH HUB", { x: 52, y: 755, size: 14, font: bold, color: rgb(0.72, 0.78, 0.98) });
  cover.drawText("Nexus Vault - Proprietary Resource Dossier", { x: 52, y: 732, size: 10, font: regular, color: rgb(0.75, 0.78, 0.87) });
  cover.drawText(resource.name, { x: 52, y: 670, size: 24, font: bold, color: rgb(0.92, 0.94, 0.98) });
  cover.drawText(`${resource.domain} Domain | ${resource.size} | ${resource.updated}`, {
    x: 52,
    y: 635,
    size: 10,
    font: regular,
    color: rgb(0.79, 0.84, 0.96),
  });
  cover.drawText("Confidential - Internal Commercial Use Only", {
    x: 52,
    y: 120,
    size: 10,
    font: regular,
    color: rgb(0.74, 0.79, 0.9),
  });

  const paragraphs = sectionParagraphs(resource.name.replace(".pdf", ""), resource.domain);

  for (let i = 0; i < 11; i += 1) {
    const page = pdf.addPage([595.28, 841.89]);
    const pageTitle = [
      "Executive Briefing",
      "Strategic Context",
      "Framework Architecture",
      "Diagram Pack A",
      "Diagram Pack B",
      "Implementation Sprint Model",
      "KPI and Benchmark Controls",
      "Risk and Governance",
      "Deployment Checklists",
      "Commercial Readiness Appendix",
      "Operating Summary",
    ][i];

    page.drawText(resource.name, { x: 50, y: 800, size: 11, font: bold, color: rgb(0.13, 0.16, 0.3) });
    page.drawText(pageTitle, { x: 50, y: 780, size: 16, font: bold, color: rgb(0.1, 0.12, 0.2) });
    page.drawLine({ start: { x: 50, y: 772 }, end: { x: 545, y: 772 }, thickness: 1, color: rgb(0.8, 0.84, 0.93) });

    const paragraph = paragraphs[i % paragraphs.length];
    let cursorY = writeWrapped(page, wrapText(paragraph, 96), 745);

    const extra = `${paragraphs[(i + 1) % paragraphs.length]} ${paragraphs[(i + 2) % paragraphs.length]}`;
    cursorY = writeWrapped(page, wrapText(extra, 96).slice(0, 16), cursorY - 12);

    if (i === 3 || i === 4 || i === 6 || i === 8) {
      drawDiagram(page, Math.max(120, cursorY - 160), "Operational Diagram");
    }

    page.drawText(`Page ${i + 2} of 12`, { x: 500, y: 24, size: 9, font: regular, color: rgb(0.44, 0.46, 0.56) });
  }

  const bytes = await pdf.save();
  return new Response(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resource.name}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
