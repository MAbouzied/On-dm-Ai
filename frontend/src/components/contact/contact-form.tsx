"use client";

import { useState } from "react";
import apiClient from "@/lib/api-client";
import { trackEvent, EVENTS } from "@/lib/analytics";

const DEFAULTS = {
  formHeading: "Send us a message",
  nameLabel: "Name *",
  emailLabel: "Email *",
  phoneLabel: "Phone",
  messageLabel: "Message *",
  submit: "Send",
  sending: "Sending...",
  success: "Thank you! Your message has been sent.",
  error: "Something went wrong. Please try again.",
};

interface ContactFormProps {
  formHeading?: string;
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  messageLabel?: string;
  submit?: string;
  sending?: string;
  success?: string;
  error?: string;
}

export function ContactForm({
  formHeading = DEFAULTS.formHeading,
  nameLabel = DEFAULTS.nameLabel,
  emailLabel = DEFAULTS.emailLabel,
  phoneLabel = DEFAULTS.phoneLabel,
  messageLabel = DEFAULTS.messageLabel,
  submit = DEFAULTS.submit,
  sending = DEFAULTS.sending,
  success = DEFAULTS.success,
  error = DEFAULTS.error,
}: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await apiClient.post("/api/contact", form);
      trackEvent(EVENTS.CONTACT_SUBMIT);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-xl">
        <h2 className="mb-6 text-2xl font-bold">{formHeading}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{nameLabel}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{emailLabel}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{phoneLabel}</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{messageLabel}</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={4}
              required
            />
          </div>
          {status === "success" && (
            <p className="text-green-600">{success}</p>
          )}
          {status === "error" && (
            <p className="text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {status === "loading" ? sending : submit}
          </button>
        </form>
      </div>
    </section>
  );
}
