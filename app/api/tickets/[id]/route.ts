import { updateTicketStatus } from "@/lib/support-ticket-store";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as { status?: "Resolved" | "In Progress" };

  if (!body.status) {
    return Response.json({ error: "Status is required" }, { status: 400 });
  }

  const ticket = await updateTicketStatus(id, body.status);
  if (!ticket) {
    return Response.json({ error: "Ticket not found" }, { status: 404 });
  }

  return Response.json({ ticket });
}
