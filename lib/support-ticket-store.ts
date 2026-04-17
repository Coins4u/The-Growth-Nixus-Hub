import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SupportTicket = {
  id: string;
  priority: "Normal" | "High" | "Critical";
  department: "Technical Operations" | "Learning & Content" | "Billing & Licensing";
  subject: string;
  technicalDescription: string;
  status: "Resolved" | "In Progress";
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "support-tickets.json");

const defaultTickets: SupportTicket[] = [
  {
    id: "GH-1021",
    priority: "Normal",
    department: "Learning & Content",
    subject: "Access to Q2 Blueprint",
    technicalDescription: "Member requested access reconciliation for Q2 blueprint assets.",
    status: "Resolved",
    createdAt: "2026-04-02T10:20:00.000Z",
  },
  {
    id: "GH-1055",
    priority: "High",
    department: "Technical Operations",
    subject: "Node Configuration Query",
    technicalDescription: "Requesting validation of active node profile and routing behavior.",
    status: "In Progress",
    createdAt: "2026-04-08T14:40:00.000Z",
  },
];

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, JSON.stringify(defaultTickets, null, 2), "utf8");
  }
}

export async function readTickets() {
  await ensureStore();
  const content = await readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(content) as SupportTicket[];
  return parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

async function writeTickets(tickets: SupportTicket[]) {
  await ensureStore();
  await writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), "utf8");
}

function generateTicketId(existing: SupportTicket[]) {
  let candidate = "";
  do {
    candidate = `GH-${Math.floor(1000 + Math.random() * 9000)}`;
  } while (existing.some((ticket) => ticket.id === candidate));
  return candidate;
}

export async function createTicket(
  input: Pick<SupportTicket, "priority" | "department" | "subject" | "technicalDescription">,
) {
  const tickets = await readTickets();
  const newTicket: SupportTicket = {
    id: generateTicketId(tickets),
    priority: input.priority,
    department: input.department,
    subject: input.subject,
    technicalDescription: input.technicalDescription,
    status: "In Progress",
    createdAt: new Date().toISOString(),
  };
  await writeTickets([newTicket, ...tickets]);
  return newTicket;
}

export async function updateTicketStatus(id: string, status: SupportTicket["status"]) {
  const tickets = await readTickets();
  const next = tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket));
  await writeTickets(next);
  return next.find((ticket) => ticket.id === id) ?? null;
}
