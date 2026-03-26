"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../lib/api";
import { waLink } from "../config/clinic";

const suggestions = [
  "General health consultation",
  "Fever and body pain",
  "Cold and cough treatment",
  "Blood pressure check",
  "Diabetes management",
  "Preventive health checkup",
];

export default function AppointmentPrompt() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"prompt" | "details">("prompt");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [value]);

  const handleSend = async () => {
    if (!value.trim()) return;
    if (step === "prompt") { setStep("details"); return; }
    if (!name || !phone) return;
    setStatus("loading");

    try {
      await fetch(`${API_URL}/api/leads/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message: value, source: "prompt-box" }),
      });
    } catch {}

    const msg = `Hi, I'm ${name}. ${value}. My phone: ${phone}`;
    window.open(waLink(msg), "_blank");
    setStatus("done");
    setValue(""); setName(""); setPhone(""); setStep("prompt");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="py-24 px-6 bg-[#0a0f1a]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-block border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            AI-Powered Booking
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">Tell Us What You Need</h2>
          <p className="text-white/40">Describe your concern and we'll connect you with the doctor instantly</p>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }} viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-6"
        >
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => { setValue(s); setFocused(true); textareaRef.current?.focus(); }}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:border-teal-500/50 hover:text-teal-400 transition-all hover:bg-teal-500/5"
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* Prompt box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }} viewport={{ once: true }}
        >
          <div
            className={`relative rounded-2xl border transition-all duration-300 ${
              focused ? "border-teal-500/50 shadow-[0_0_30px_rgba(13,148,136,0.15)]" : "border-white/10"
            }`}
            style={{ background: "#111827" }}
          >
            <AnimatePresence mode="wait">
              {step === "prompt" ? (
                <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Describe your symptoms or what you need help with..."
                    rows={2}
                    className="w-full bg-transparent text-white placeholder-white/25 px-5 pt-5 pb-2 resize-none focus:outline-none text-sm leading-relaxed"
                    style={{ minHeight: 60 }}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  />
                </motion.div>
              ) : (
                <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-5 space-y-3"
                >
                  <p className="text-white/40 text-xs">Your request: <span className="text-teal-400">"{value}"</span></p>
                  <input
                    type="text" placeholder="Your name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-teal-500/50"
                  />
                  <input
                    type="tel" placeholder="Phone number"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-teal-500/50"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-4 pb-4 pt-1">
              <div className="flex items-center gap-2">
                {step === "details" && (
                  <button onClick={() => setStep("prompt")} className="text-white/30 hover:text-white/60 text-xs transition">
                    ← Back
                  </button>
                )}
                <div className="flex gap-1.5">
                  {["Search", "Consult", "Urgent"].map((mode) => (
                    <span key={mode} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 cursor-pointer transition">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {value && (
                  <span className="text-white/20 text-xs">{value.length} chars</span>
                )}
                <button
                  onClick={handleSend}
                  disabled={!value.trim() || status === "loading"}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-30 transition-all hover:scale-105"
                  style={{ background: value.trim() ? "linear-gradient(135deg, #0d9488, #0ea5e9)" : "#1f2937" }}
                >
                  {status === "loading" ? (
                    <span className="flex gap-1">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i*0.1}s` }} />)}</span>
                  ) : (
                    <>
                      {step === "prompt" ? "Continue" : "Book via WhatsApp"}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {status === "done" && (
            <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="text-center text-teal-400 text-sm mt-4"
            >
              ✅ Opening WhatsApp with your details pre-filled!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
