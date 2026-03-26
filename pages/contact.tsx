import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { API_URL } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AnimatedSection from "../components/AnimatedSection";

const PHONE = "+91 91649 93469";
const PHONE_RAW = "+919164993469";
const WA_NUM = "919164993469";
const ADDRESS = "803, 11th Cross Road, Vyalikaval, HN Layout, Malleshwaram, Bengaluru, Karnataka 560003";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    let saved = false;
    try {
      const res = await fetch(`${API_URL}/api/leads/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-form" }),
      });
      if (res.ok) saved = true;
    } catch {
      // backend unavailable — fall through to WhatsApp
    }

    if (saved) {
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } else {
      // Always ensure the clinic sees the enquiry via WhatsApp
      const msg = `Hi, I have an enquiry.\n\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`;
      window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`, "_blank");
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us — Sanjeevani Clinic, Malleshwaram Bangalore</title>
        <meta name="description" content="Contact Sanjeevani Clinic in Malleshwaram, Bangalore. Call +91 91649 93469 or book via WhatsApp. Located at 803, 11th Cross Road, Vyalikaval, HN Layout." />
        <link rel="canonical" href="https://clinic-website-sigma-ten.vercel.app/contact" />
      </Head>

      <Navbar />

      {/* HERO */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1600&q=80"
            alt="Contact Sanjeevani Clinic Malleshwaram"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/75" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-12 w-full">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider mb-1">Reach Out</p>
          <h1 className="text-5xl font-extrabold text-white">Contact Us</h1>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-700 transition">
              <svg className="w-8 h-8 text-blue-700 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">Call Us</h3>
            <a href={`tel:${PHONE_RAW}`} className="text-blue-600 font-semibold text-lg hover:underline block mb-1">
              {PHONE}
            </a>
            <p className="text-gray-400 text-sm">All Days · 11:00 AM – 5:00 PM</p>
          </div>

          {/* WhatsApp */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-teal-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-teal-600 group-hover:fill-white transition">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.477 2.027 7.784L0 32l8.437-2.006A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.293 19.346c-.4-.2-2.362-1.166-2.728-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.266 1.566c-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.986-1.19-1.062-1.993-2.374-2.227-2.774-.234-.4-.025-.616.175-.815.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5S8 12.667 8 14.633c0 1.967 1.434 3.867 1.634 4.134.2.267 2.82 4.3 6.833 6.033.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.768-.115 2.362-.966 2.695-1.9.334-.933.334-1.733.234-1.9-.1-.166-.366-.266-.766-.466z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">WhatsApp</h3>
            <p className="text-gray-500 text-sm mb-4">Book instantly, get confirmed fast</p>
            <a
              href={`https://wa.me/${WA_NUM}?text=I want to book an appointment at Sanjeevani Clinic`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand inline-block text-white font-semibold px-6 py-2.5 rounded-full"
            >
              Book Appointment
            </a>
          </div>

          {/* Location */}
          <div className="group bg-white border border-gray-100 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-red-500 transition">
              <svg className="w-8 h-8 text-red-500 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 text-xl mb-2">Location</h3>
            <p className="text-gray-600 text-sm leading-relaxed">803, 11th Cross Road,<br />Vyalikaval, HN Layout,<br />Malleshwaram, Bengaluru 560003</p>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <AnimatedSection direction="left">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-2">Quick Booking</p>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Book Your Appointment</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Fill in your details and we will reach out to confirm your appointment. Alternatively, book instantly on WhatsApp.
            </p>
            <ul className="space-y-3 text-gray-600 text-sm">
              {["No waiting in queues", "Confirmed within minutes", "Flexible timings available"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="right">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5 border border-gray-100">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message / Reason for Visit</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need a general checkup..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-brand w-full text-white font-bold py-3.5 rounded-xl transition disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Request Appointment"}
              </button>

              {status === "success" && (
                <div className="bg-teal-50 border border-teal-200 text-teal-700 rounded-xl px-4 py-3 text-sm font-medium text-center">
                  ✅ Request sent! We will contact you shortly on WhatsApp.
                </div>
              )}
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* MAP + HOURS */}
      <section className="py-8 pb-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Map */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Us on the Map</h2>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sanjeevani Clinic Location — Malleshwaram, Bengaluru"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-teal-600 font-medium text-sm hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Google Maps →
            </a>
          </div>

          {/* Hours */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Clinic Hours</h2>
            <div className="bg-white border border-gray-100 rounded-2xl shadow overflow-hidden">
              {[
                { day: "Monday", time: "11:00 AM – 5:00 PM", open: true },
                { day: "Tuesday", time: "11:00 AM – 5:00 PM", open: true },
                { day: "Wednesday", time: "11:00 AM – 5:00 PM", open: true },
                { day: "Thursday", time: "11:00 AM – 5:00 PM", open: true },
                { day: "Friday", time: "11:00 AM – 5:00 PM", open: true },
                { day: "Saturday", time: "11:00 AM – 5:00 PM", open: true },
                { day: "Sunday", time: "11:00 AM – 5:00 PM", open: true },
              ].map((row, i) => (
                <div key={row.day} className={`flex justify-between items-center px-5 py-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <span className="text-gray-700 font-medium">{row.day}</span>
                  <span className={`font-semibold ${row.open ? "text-green-600" : "text-red-400"}`}>{row.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl p-4">
              <p className="text-teal-700 text-sm font-semibold mb-1">📍 Address</p>
              <p className="text-gray-600 text-sm leading-relaxed">{ADDRESS}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=80"
            alt="Sanjeevani Clinic"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/85" />
        </div>
        <div className="relative text-center text-white max-w-xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">Book Your Appointment</h2>
          <p className="text-blue-200 mb-8 text-lg">Message us on WhatsApp — confirmed in minutes</p>
          <a
            href={`https://wa.me/${WA_NUM}?text=I want to book an appointment at Sanjeevani Clinic`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl"
          >
            💬 Book on WhatsApp Now
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
