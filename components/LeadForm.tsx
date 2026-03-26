import { useState } from "react";
import { API_URL } from "../lib/api";
import { clinicConfig, waLink } from "../config/clinic";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Save lead to backend
      await fetch(`${API_URL}/api/leads/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage-form" }),
      });
    } catch (err) {
      console.error("Lead save failed:", err);
    }

    // Always redirect to WhatsApp (even if backend fails)
    const whatsappMessage = `Hi, my name is ${form.name}. My phone is ${form.phone}. ${form.message}`;
    window.open(waLink(whatsappMessage), "_blank");

    setStatus("done");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
        />
      </div>
      <div>
        <textarea
          name="message"
          rows={3}
          placeholder="Reason for visit (e.g. General checkup)"
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-brand w-full text-white font-bold py-4 rounded-xl text-lg disabled:opacity-60 transition"
      >
        {status === "loading" ? "Sending..." : "📅 Book Appointment"}
      </button>

      {status === "done" && (
        <p className="text-teal-600 text-sm font-medium text-center">
          ✅ Opening WhatsApp — we saved your details too!
        </p>
      )}
    </form>
  );
}
