"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { services, whatsappLink } from "@/lib/site";
import { WhatsAppGlyph } from "./CTAButtons";

/**
 * Idiot-proof quote form. No backend: on submit it composes a tidy WhatsApp
 * message from the fields and opens the chat pre-filled. Easy to
 * swap to an email backend later (just POST instead of building the wa.me URL).
 */
export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    area: "",
    details: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi, I'd like a free quote.`,
      ``,
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.service && `Service: ${form.service}`,
      form.area && `Area / postcode: ${form.area}`,
      form.details && `Details: ${form.details}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-navy-900 outline-none transition-colors placeholder:text-navy-900/35 focus:border-royal focus:ring-2 focus:ring-royal/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-navy-900/10 bg-stone-50 p-6 shadow-xl shadow-navy-900/5 sm:p-8"
    >
      <h3 className="text-2xl font-bold text-navy-900">Request a free quote</h3>
      <p className="mb-6 mt-1 text-sm text-navy-900/60">
        Fill this in and it&apos;ll open WhatsApp with your details ready to
        send. Quick and easy.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-name" className="mb-1.5 block text-sm font-semibold text-navy-900">
            Your name
          </label>
          <input
            id="qf-name"
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="e.g. John Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="qf-phone" className="mb-1.5 block text-sm font-semibold text-navy-900">
            Phone <span className="font-normal text-navy-900/40">(optional)</span>
          </label>
          <input
            id="qf-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="So we can call you back"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="qf-service" className="mb-1.5 block text-sm font-semibold text-navy-900">
            What do you need?
          </label>
          <select
            id="qf-service"
            value={form.service}
            onChange={update("service")}
            className={inputClass}
          >
            <option value="">Choose a service…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
        <div>
          <label htmlFor="qf-area" className="mb-1.5 block text-sm font-semibold text-navy-900">
            Area / postcode
          </label>
          <input
            id="qf-area"
            type="text"
            value={form.area}
            onChange={update("area")}
            placeholder="Where's the job?"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="qf-details" className="mb-1.5 block text-sm font-semibold text-navy-900">
          Tell us about the job
        </label>
        <textarea
          id="qf-details"
          rows={4}
          value={form.details}
          onChange={update("details")}
          placeholder="A few details about what you need. You can send photos on WhatsApp too."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1fb955] active:scale-[0.98]"
      >
        <WhatsAppGlyph className="h-5 w-5" />
        Send on WhatsApp
        <Send className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs text-navy-900/50">
        No spam, no obligation. Opens WhatsApp with your message ready to send.
      </p>
    </form>
  );
}
