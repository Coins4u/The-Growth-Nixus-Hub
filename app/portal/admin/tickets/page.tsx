"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Ticket = {
  id: string;
  priority: "Normal" | "High" | "Critical";
  department: "Technical Operations" | "Learning & Content" | "Billing & Licensing";
  subject: string;
  technicalDescription: string;
  status: "Resolved" | "In Progress";
  createdAt: string;
};

export default function AdminTicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const memberCount = 1482;
  const openTickets = tickets.filter((ticket) => ticket.status === "In Progress").length;
  const resolvedTickets = tickets.filter((ticket) => ticket.status === "Resolved").length;

  const updateStatus = async (ticketId: string, status: Ticket["status"]) => {
    await fetch(`/api/tickets/${ticketId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setTickets((previous) => previous.map((ticket) => (ticket.id === ticketId ? { ...ticket, status } : ticket)));
  };

  useEffect(() => {
    let mounted = true;
    const unlocked = window.localStorage.getItem("growthHubPortalUnlocked") === "true";
    const role = window.localStorage.getItem("growthHubPortalRole");
    if (!unlocked || role !== "admin") {
      router.push("/portal");
      return;
    }
    const timer = window.setTimeout(async () => {
      const response = await fetch("/api/tickets", { cache: "no-store" });
      const data = (await response.json()) as { tickets: Ticket[] };
      if (mounted) {
        setTickets(data.tickets);
        setLoading(false);
      }
    }, 0);

    return () => {
      mounted = false;
      window.clearTimeout(timer);
    };
  }, [router]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/portal" className="text-sm text-indigo-300 hover:text-indigo-200">
        Return to Portal
      </Link>

      <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Admin Inbox</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-100">Support Ticket Management</h1>
        <p className="mt-3 text-sm text-slate-300">
          Review incoming support requests, prioritize responses, and track operational resolution status.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Community Members</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{memberCount.toLocaleString()}</p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Active Tickets</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{openTickets}</p>
          </article>
          <article className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
            <p className="text-xs uppercase tracking-[0.15em] text-indigo-300">Resolved Tickets</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{resolvedTickets}</p>
          </article>
        </div>

        {loading ? <p className="mt-6 text-sm text-slate-400">Loading tickets...</p> : null}

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
          <div className="grid grid-cols-[0.9fr_1.5fr_1fr_1fr_0.8fr] bg-slate-950/70 px-4 py-3 text-xs uppercase tracking-[0.12em] text-slate-400">
            <p>Ticket</p>
            <p>Subject</p>
            <p>Department</p>
            <p>Priority</p>
            <p>Status</p>
          </div>
          <div className="divide-y divide-slate-800">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="grid grid-cols-[0.9fr_1.5fr_1fr_1fr_0.8fr] gap-2 px-4 py-4 text-sm text-slate-200">
                <p>{ticket.id}</p>
                <div>
                  <p className="font-medium">{ticket.subject}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <p>{ticket.department}</p>
                <p>{ticket.priority}</p>
                <select
                  value={ticket.status}
                  onChange={(event) => void updateStatus(ticket.id, event.target.value as Ticket["status"])}
                  className="rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200"
                >
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
