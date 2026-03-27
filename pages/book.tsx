import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { API_URL } from "../lib/api";
import { clinicConfig, waLink } from "../config/clinic";

// ── Static fallback (shown when backend is not connected) ─────────────────────
const STATIC_DOCTORS = [
  {
    _id: "1",
    name: "Dr. P Venkat Rao",
    specialty: "General Physician",
    qualifications: "MBBS",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    fee: 300,
    experience: 15,
  },
];

const ALL_TIMES = [
  "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM",
];

const today = new Date();
const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i + 1);
  return d.toISOString().split("T")[0];
});

function dateLabel(s: string) {
  const d = new Date(s);
  return {
    day: d.toLocaleDateString("en-IN", { weekday: "short" }),
    date: d.getDate(),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
  };
}

type DocType = typeof STATIC_DOCTORS[0];
type Step = "doctor" | "slot" | "confirm" | "success";

export default function BookPage() {
  const [step, setStep] = useState<Step>("doctor");
  const [doctors, setDoctors] = useState<DocType[]>(STATIC_DOCTORS);
  const [backendOnline, setBackendOnline] = useState(false);
  const [doctor, setDoctor] = useState<DocType | null>(null);
  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch doctors from backend
  useEffect(() => {
    fetch(`${API_URL}/api/doctors`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
          setBackendOnline(true);
        }
      })
      .catch(() => {}); // falls back to static
  }, []);

  // Fetch booked slots when doctor + date change
  useEffect(() => {
    if (!doctor || !backendOnline) return;
    setSlotsLoading(true);
    fetch(`${API_URL}/api/slots/${doctor._id}/${date}`)
      .then((r) => r.json())
      .then((slots: Array<{ time: string; booked: boolean }>) => {
        setBookedSlots(slots.filter((s) => s.booked).map((s) => s.time));
        setSlotsLoading(false);
      })
      .catch(() => setSlotsLoading(false));
  }, [doctor, date, backendOnline]);

  function pickDoctor(doc: DocType) {
    setDoctor(doc);
    setTime("");
    setStep("slot");
  }

  function pickTime(t: string) {
    setTime(t);
    setStep("confirm");
  }

  async function confirm() {
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!phone.trim()) { setError("Please enter your phone number"); return; }
    setError("");
    setSubmitting(true);

    const msg = `Hi, I'd like to book an appointment.\n\nDoctor: ${doctor!.name}\nDate: ${date}\nTime: ${time}\nName: ${name}\nPhone: ${phone}\n\nPlease confirm my slot.`;

    if (backendOnline) {
      try {
        // Generate slots first if they don't exist, then book
        await fetch(`${API_URL}/api/slots/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doctorId: doctor!._id, date }),
        });
        // Save as lead
        await fetch(`${API_URL}/api/leads/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, message: `Appointment: ${date} at ${time} with ${doctor!.name}`, source: "slot-booking" }),
        });
      } catch { /* silent — still open WhatsApp */ }
    }

    window.open(waLink(msg), "_blank");
    setSubmitting(false);
    setStep("success");
  }

  function reset() {
    setStep("doctor");
    setDoctor(null);
    setTime("");
    setName("");
    setPhone("");
    setError("");
  }

  const stepsList = ["doctor", "slot", "confirm", "success"];
  const stepIdx = stepsList.indexOf(step);

  return (
    <>
      <Head>
        <title>Book Appointment — Sanjeevani Clinic, Malleshwaram Bangalore</title>
        <meta name="description" content="Book an appointment with Dr. P Venkat Rao at Sanjeevani Clinic, Malleshwaram. Select your time slot and confirm instantly via WhatsApp." />
        <link rel="canonical" href="https://clinic-website-sigma-ten.vercel.app/book" />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a1f44] to-blue-900 py-16 px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-teal-300 mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Slots available today
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight">Book an Appointment</h1>
        <p className="text-blue-200 text-lg">Choose your doctor, pick a slot, confirm on WhatsApp</p>
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          {["Instant WhatsApp confirmation", "No queue", "Free cancellation", backendOnline ? "Live slot availability" : "Quick & easy"].map((t) => (
            <span key={t} className="text-xs text-blue-200 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-teal-400 mr-1">✓</span>{t}
            </span>
          ))}
        </div>
      </section>

      {/* Progress bar */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          {[
            { label: "Doctor", key: "doctor" },
            { label: "Time Slot", key: "slot" },
            { label: "Confirm", key: "confirm" },
          ].map((s, i) => {
            const done = i < stepIdx;
            const active = s.key === step;
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${done ? "bg-teal-500 text-white" : active ? "text-white" : "bg-gray-100 text-gray-400"}`}
                  style={active ? { background: "linear-gradient(135deg,#0d9488,#0ea5e9)" } : {}}
                  onClick={() => { if (done) { if (i === 0) setStep("doctor"); if (i === 1) setStep("slot"); } }}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-semibold hidden sm:block ${active ? "text-teal-600" : done ? "text-teal-500" : "text-gray-400"}`}>
                  {s.label}
                </span>
                {i < 2 && <span className="text-gray-300 text-xl mx-1">›</span>}
              </div>
            );
          })}
          {doctor && step !== "doctor" && (
            <div className="ml-auto flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full">
              <span className="text-teal-700 text-xs font-semibold hidden sm:block">{doctor.name}</span>
              {time && <span className="text-teal-600 text-xs">· {time}</span>}
            </div>
          )}
        </div>
      </div>

      <section className="py-12 px-6 bg-slate-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto">

          <AnimatePresence mode="wait">

            {/* STEP 1 — Choose Doctor */}
            {step === "doctor" && (
              <motion.div key="doctor" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Choose Your Doctor</h2>
                <p className="text-gray-500 mb-6">Click on a doctor to see available time slots</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {doctors.map((doc) => (
                    <motion.div key={doc._id} whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => pickDoctor(doc)}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border-2 border-transparent hover:border-teal-400 cursor-pointer transition-all">
                      <div className="relative h-44">
                        <Image src={(doc as { photo?: string }).photo || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"} alt={doc.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Available
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-extrabold text-gray-800">{doc.name}</h3>
                        <p className="text-teal-600 text-sm mb-1">{doc.specialty}</p>
                        <p className="text-gray-400 text-xs mb-3">{doc.qualifications} · {doc.experience} yrs</p>
                        <div className="flex items-center justify-between">
                          <span className="bg-teal-50 text-teal-700 font-bold text-sm px-3 py-1 rounded-full">₹{doc.fee}</span>
                          <span className="text-teal-600 text-sm font-bold">Select →</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Pick Slot */}
            {step === "slot" && doctor && (
              <motion.div key="slot" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <button onClick={() => setStep("doctor")} className="text-gray-400 hover:text-teal-600 text-sm mb-4 flex items-center gap-1 transition">
                  ← Change doctor
                </button>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Pick a Time Slot</h2>
                <p className="text-gray-500 mb-6">Tap any available slot to continue</p>

                {/* Date row */}
                <div className="flex gap-3 overflow-x-auto pb-3 mb-6">
                  {DATES.map((d) => {
                    const { day, date: dt, month } = dateLabel(d);
                    const sel = d === date;
                    return (
                      <button key={d} onClick={() => setDate(d)}
                        className={`flex-shrink-0 w-16 py-3 rounded-2xl text-center transition-all font-medium ${sel ? "text-white shadow-lg scale-105" : "bg-white border border-gray-200 text-gray-600 hover:border-teal-400"}`}
                        style={sel ? { background: "linear-gradient(135deg,#0d9488,#0ea5e9)" } : {}}>
                        <p className="text-xs">{day}</p>
                        <p className="text-xl font-extrabold">{dt}</p>
                        <p className="text-xs">{month}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Slots */}
                {slotsLoading ? (
                  <div className="text-center py-10 text-gray-400">Loading slots...</div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {ALL_TIMES.map((t) => {
                      const booked = bookedSlots.includes(t);
                      return (
                        <motion.button key={t} disabled={booked}
                          whileHover={!booked ? { scale: 1.05 } : {}}
                          whileTap={!booked ? { scale: 0.95 } : {}}
                          onClick={() => !booked && pickTime(t)}
                          className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                            booked
                              ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                              : "bg-white border-gray-200 text-gray-700 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 cursor-pointer shadow-sm hover:shadow-md"
                          }`}>
                          {t}
                          {booked && <span className="block text-xs mt-0.5 no-underline">Full</span>}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
                <p className="text-gray-400 text-xs mt-4 text-center">Greyed slots are booked · Tap any white slot to continue</p>
              </motion.div>
            )}

            {/* STEP 3 — Confirm */}
            {step === "confirm" && doctor && (
              <motion.div key="confirm" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <button onClick={() => setStep("slot")} className="text-gray-400 hover:text-teal-600 text-sm mb-4 flex items-center gap-1 transition">
                  ← Change slot
                </button>
                <h2 className="text-2xl font-extrabold text-gray-800 mb-5">Confirm Your Booking</h2>

                {/* Summary */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-100 rounded-2xl p-5 mb-6 flex items-center gap-4">
                  <Image src={(doctor as { photo?: string }).photo || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"} alt={doctor.name} width={64} height={64} className="rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-gray-800 text-lg">{doctor.name}</p>
                    <p className="text-teal-600 text-sm">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm">{date} &nbsp;·&nbsp; {time}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-3xl font-extrabold text-teal-600">₹{doctor.fee}</p>
                    <p className="text-gray-400 text-xs">consult fee</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Your Name *</label>
                      <input type="text" placeholder="e.g. Priya Sharma" value={name}
                        onChange={(e) => { setName(e.target.value); setError(""); }}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number *</label>
                      <input type="tel" placeholder="e.g. 9876543210" value={phone}
                        onChange={(e) => { setPhone(e.target.value); setError(""); }}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4 text-center">{error}</div>
                  )}

                  <button onClick={confirm} disabled={submitting}
                    className="w-full py-4 rounded-xl font-extrabold text-white text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-white flex-shrink-0">
                      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.477 2.027 7.784L0 32l8.437-2.006A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.293 19.346c-.4-.2-2.362-1.166-2.728-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.266 1.566c-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.986-1.19-1.062-1.993-2.374-2.227-2.774-.234-.4-.025-.616.175-.815.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5S8 12.667 8 14.633c0 1.967 1.434 3.867 1.634 4.134.2.267 2.82 4.3 6.833 6.033.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.768-.115 2.362-.966 2.695-1.9.334-.933.334-1.733.234-1.9-.1-.166-.366-.266-.766-.466z" />
                    </svg>
                    {submitting ? "Booking..." : "Confirm on WhatsApp"}
                  </button>
                  <p className="text-gray-400 text-xs text-center mt-3">WhatsApp opens with your details pre-filled. Clinic confirms within 5 min.</p>
                </div>
              </motion.div>
            )}

            {/* SUCCESS */}
            {step === "success" && doctor && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl p-12 text-center border border-teal-100">
                <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Booking Sent!</h2>
                <p className="text-teal-600 font-semibold mb-1">{doctor.name}</p>
                <p className="text-gray-500 mb-1">{date} at {time}</p>
                <p className="text-gray-400 text-sm mb-8">WhatsApp has opened. The doctor will confirm your slot within 5 minutes.</p>
                <button onClick={reset} className="btn-brand text-white font-bold px-10 py-3.5 rounded-xl shadow-lg">
                  Book Another Appointment
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      <section className="bg-white border-t border-gray-100 py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          {[
            { title: "Safe & Trusted", desc: `All doctors are NABH certified with ${clinicConfig.doctor.experience}+ years experience.` },
            { title: "Easy Reschedule", desc: "Need to change your time? Message us on WhatsApp anytime." },
            { title: "Free Cancellation", desc: "Cancel up to 2 hours before your slot, no questions asked." },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-slate-50 border border-gray-100">
              <p className="font-bold text-gray-800 mb-1">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
