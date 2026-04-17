import { createTicket, readTickets } from "@/lib/support-ticket-store";

export const runtime = "nodejs";

export async function GET() {
  const tickets = await readTickets();
  return Response.json({ tickets });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    priority?: "Normal" | "High" | "Critical";
    department?: "Technical Operations" | "Learning & Content" | "Billing & Licensing";
    subject?: string;
    technicalDescription?: string;
  };

  if (!body.priority || !body.department || !body.subject || !body.technicalDescription) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const ticket = await createTicket({
    priority: body.priority,
    department: body.department,
    subject: body.subject,
    technicalDescription: body.technicalDescription,
  });

  return Response.json({ ticket }, { status: 201 });
}
