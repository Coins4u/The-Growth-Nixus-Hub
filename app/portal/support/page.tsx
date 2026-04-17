"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState, useSyncExternalStore } from "react";

type TicketItem = {
  id: string;
  priority: "Normal" | "High" | "Critical";
  department: "Technical Operations" | "Learning & Content" | "Billing & Licensing";
  subject: string;
  status: "Resolved" | "In Progress";
  technicalDescription: string;
  createdAt: string;
};

const faqs = [
  {
    question: "How quickly does member support respond to operational issues?",
    answer:
      "Enterprise support tickets are triaged continuously and prioritized by SLA impact tier. Most member requests receive an initial response within 2-6 business hours.",
  },
  {
    question: "Can I request technical guidance for implementation frameworks?",
    answer:
      "Yes. Members can open a support ticket for workflow diagnostics, dashboard configuration, and resource interpretation aligned with their strategic execution model.",
  },
  {
    question: "Where can I report access or provisioning anomalies?",
    answer:
      "Use the Open Ticket channel to submit account metadata, observed issue signatures, and timestamps. The support desk validates node status and resolves access pathways.",
  },
];

export default function SupportPage() {
  const portalRole = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem("growthHubPortalRole") ?? "member",
    () => "member",
  );
  const isAdmin = portalRole === "admin";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [subjectValue, setSubjectValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priorityValue, setPriorityValue] = useState<"Normal" | "High" | "Critical">("Normal");
  const [departmentValue, setDepartmentValue] = useState<
    "Technical Operations" | "Learning & Content" | "Billing & Licensing"
  >("Technical Operations");

  useEffect(() => {
    let mounted = true;
    const timer = window.setTimeout(async () => {
      const response = await fetch("/api/tickets", { cache: "no-store" });
      const data = (await response.json()) as { tickets: TicketItem[] };
      if (mounted) setTickets(data.tickets);
    }, 0);

    return () => {
      mounted = false;
      window.clearTimeout(timer);
    };
  }, []);

  const handleTicketSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(async () => {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority: priorityValue,
          department: departmentValue,
          subject: subjectValue.trim() || "Support Request",
          technicalDescription: descriptionValue.trim() || "No technical details provided.",
        }),
      });

      const data = (await response.json()) as { ticket: TicketItem };
      setTicketId(data.ticket.id);
      setTickets((previous) => [data.ticket, ...previous]);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowToast(true);

      window.setTimeout(() => {
        setShowToast(false);
      }, 3200);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubjectValue("");
    setDescriptionValue("");
    setPriorityValue("Normal");
    setDepartmentValue("Technical Operations");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/portal" className="text-sm text-indigo-300 hover:text-indigo-200">
        Return to Portal
      </Link>
      {isAdmin ? (
        <Link href="/portal/admin/tickets" className="ml-4 text-sm text-indigo-300 hover:text-indigo-200">
          Open Admin Inbox
        </Link>
      ) : null}

      <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Help &amp; Support</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-100">Member Support Desk</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Access operational assistance, troubleshooting guidance, and enterprise implementation support.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
              <h2 className="text-sm font-semibold text-slate-100">{faq.question}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">{faq.answer}</p>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-8 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Open Ticket
        </button>

        <section className="mt-8 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-300">Recent Tickets</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-800">
            <div className="grid grid-cols-[1fr_1.5fr_auto] bg-slate-900 px-4 py-3 text-xs uppercase tracking-[0.12em] text-slate-400">
              <p>Ticket</p>
              <p>Subject</p>
              <p>Status</p>
            </div>
              <div className="divide-y divide-slate-800">
                {tickets.slice(0, 6).map((ticket) => (
                  <div key={ticket.id} className="grid grid-cols-[1fr_1.5fr_auto] px-4 py-3 text-sm text-slate-200">
                    <p>{ticket.id}</p>
                    <p>{ticket.subject}</p>
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        ticket.status === "Resolved"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
          </div>
        </section>

        <p className="mt-5 text-xs text-slate-400">
          Note: Priority support is available only for Platinum and Chairman members.
        </p>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4">
          <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-900 p-6 font-sans shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-100">Support Ticket</h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-indigo-400 hover:text-indigo-200"
              >
                Close
              </button>
            </div>

            {isSubmitted ? (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-5">
                <p className="text-sm uppercase tracking-[0.12em] text-emerald-300">Submission Success</p>
                <p className="mt-3 text-xl font-semibold text-slate-100">Ticket Confirmed</p>
                <p className="mt-2 text-sm text-slate-300">
                  Your request has been queued for review by the support operations team.
                </p>
                <p className="mt-4 rounded bg-slate-800 px-3 py-2 text-sm font-semibold text-indigo-300">
                  Ticket ID: {ticketId}
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="grid gap-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="text-sm text-slate-300">
                    Priority
                    <select
                      value={priorityValue}
                      onChange={(event) => setPriorityValue(event.target.value as "Normal" | "High" | "Critical")}
                      className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
                    >
                      <option>Normal</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </label>
                  <label className="text-sm text-slate-300">
                    Department
                    <select
                      value={departmentValue}
                      onChange={(event) =>
                        setDepartmentValue(
                          event.target.value as "Technical Operations" | "Learning & Content" | "Billing & Licensing",
                        )
                      }
                      className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
                    >
                      <option>Technical Operations</option>
                      <option>Learning & Content</option>
                      <option>Billing & Licensing</option>
                    </select>
                  </label>
                </div>

                <label className="text-sm text-slate-300">
                  Subject
                  <input
                    required
                    value={subjectValue}
                    onChange={(event) => setSubjectValue(event.target.value)}
                    placeholder="Describe the issue briefly"
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Technical Description
                  <textarea
                    required
                    rows={6}
                    value={descriptionValue}
                    onChange={(event) => setDescriptionValue(event.target.value)}
                    placeholder="Include impacted modules, timestamps, and observed behavior."
                    className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-900"
                >
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}

      {showToast ? (
        <div className="fixed bottom-5 right-5 z-[60] rounded-lg border border-emerald-500/40 bg-slate-900 px-4 py-3 text-sm text-emerald-300 shadow-xl">
          Success: Ticket {ticketId} created successfully.
        </div>
      ) : null}
    </main>
  );
}
