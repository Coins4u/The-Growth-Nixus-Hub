"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { allowedCountries, americanCountries, CountryName, europeanCountries } from "@/lib/order-countries";

type ToastState = { type: "success" | "error"; message: string } | null;

type SelectedPlan = { name: string; price: string } | null;

type OrderFormProps = {
  selectedPlan: SelectedPlan;
  onClose: () => void;
};

export function OrderForm({ selectedPlan, onClose }: OrderFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const successMessage = useMemo(
    () =>
      "Order submitted! We've sent your invoice and payment link to your email. Check your inbox (and spam folder) to complete activation.",
    [],
  );

  useEffect(() => {
    if (!selectedPlan) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedPlan]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedPlan) onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [onClose, selectedPlan]);

  useEffect(() => {
    if (!selectedPlan) {
      setFullName("");
      setEmail("");
      setCountry("");
      setToast(null);
      setIsSubmitting(false);
    }
  }, [selectedPlan]);

  if (!selectedPlan) {
    return null;
  }

  const hideToastAfterDelay = () => {
    window.setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!allowedCountries.has(country as CountryName)) {
      setToast({ type: "error", message: "Please choose a valid country from the list." });
      hideToastAfterDelay();
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          membershipPlan: selectedPlan.name,
          fullName: fullName.trim(),
          email: email.trim(),
          country,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order request");
      }

      setToast({ type: "success", message: successMessage });
      setFullName("");
      setEmail("");
      setCountry("");
    } catch {
      setToast({
        type: "error",
        message: "We could not send your invoice email right now. Please retry in a minute.",
      });
    } finally {
      setIsSubmitting(false);
      hideToastAfterDelay();
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl shadow-black/50 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-indigo-200">
              Get your payment link
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-100">{selectedPlan.name}</h2>
            <p className="mt-1 text-lg font-semibold text-indigo-300">{selectedPlan.price}</p>
            <p className="mt-2 text-sm text-slate-300">Enter your details and we will email your secure payment link.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:border-indigo-400 hover:text-indigo-200"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="text-sm text-slate-300">
            Full Name
            <input
              type="text"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              placeholder="Your full name"
            />
          </label>

          <label className="text-sm text-slate-300">
            Email Address
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
              placeholder="you@company.com"
            />
          </label>

          <p className="text-xs text-amber-200/90">
            Note: Please ensure your email is accurate. Your secure invoice and digital access details are sent to this address.
          </p>

          <label className="text-sm text-slate-300">
            Country
            <select
              required
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none ring-indigo-500 focus:ring-2"
            >
              <option value="">Select your country</option>
              <optgroup label="European Countries">
                {europeanCountries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="American Countries">
                {americanCountries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-primary inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-900 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending invoice...
                </>
              ) : (
                "Submit Order"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-indigo-400 hover:text-indigo-200 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>

        {toast ? (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
              toast.type === "success"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-rose-500/40 bg-rose-500/10 text-rose-300"
            }`}
            role="status"
          >
            {toast.message}
          </div>
        ) : null}
      </div>
    </div>
  );
}
