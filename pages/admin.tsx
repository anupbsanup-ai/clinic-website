import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../lib/api";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const PER_PAGE = 8;

// ── Bookings Panel ────────────────────────────────────────────────────────────
function BookingsPanel({ bookings, loading }: { bookings: Booking[]; loading: boolean }) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "today">("all");
  const today = new Date().toISOString().split("T")[0];

  const filtered = bookings.filter((b) => {
    if (filter === "today") return b.date === today;
    if (filter === "upcoming") return b.date >= today;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Patient Bookings</h2>
        <div className="flex gap-2">
          {(["all", "today", "upcoming"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${filter === f ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "text-white/30 bg-white/5 hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 gap-3 px-6 py-3 border-b border-white/10 text-xs font-semibold text-white/30 uppercase tracking-widest">
          <span>Patient</span><span>Phone</span><span>Doctor</span><span>Date</span><span>Time</span><span className="text-right">Payment</span>
        </div>
        {loading ? (
          <div className="text-center py-16 text-white/30">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">No bookings found</div>
        ) : (
          filtered.map((b) => (
            <div key={b._id} className="grid grid-cols-6 gap-3 px-6 py-4 border-b border-white/5 hover:bg-white/3 transition group">
              <p className="text-white font-semibold text-sm truncate">{b.patientName || "—"}</p>
              <a href={`tel:${b.patientPhone}`} className="text-teal-400 text-sm hover:underline truncate">{b.patientPhone || "—"}</a>
              <p className="text-white/60 text-sm truncate">{b.doctorId?.name || "—"}</p>
              <p className="text-white/60 text-sm">{b.date}</p>
              <p className="text-white/60 text-sm">{b.time}</p>
              <div className="flex justify-end">
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                  b.paymentStatus === "paid" ? "bg-green-500/15 text-green-400" :
                  b.paymentStatus === "pending" ? "bg-yellow-500/15 text-yellow-400" :
                  "bg-white/5 text-white/30"
                }`}>{b.paymentStatus || "free"}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {!loading && (
        <p className="text-white/20 text-xs text-center">
          Showing {filtered.length} booking{filtered.length !== 1 ? "s" : ""} · Connect backend to see live data
        </p>
      )}
    </div>
  );
}

// ── Doctors Panel ─────────────────────────────────────────────────────────────
function DoctorsPanel({ doctors, loading }: { doctors: Doctor[]; loading: boolean }) {
  const seedDoctors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/doctors/seed`, { method: "POST" });
      const data = await res.json();
      alert(data.message || "Seeded!");
      window.location.reload();
    } catch { alert("Could not reach backend — deploy backend first."); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Doctors</h2>
        <button onClick={seedDoctors}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition"
          style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)" }}>
          + Seed Sample Doctors
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-white/30">Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <p className="text-white/40 mb-2">No doctors found in the database.</p>
          <p className="text-white/20 text-sm">Connect backend and click &ldquo;Seed Sample Doctors&rdquo; to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {doctors.map((doc) => (
            <div key={doc._id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white">{doc.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${doc.active ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                  {doc.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-teal-400 text-sm mb-1">{doc.specialty}</p>
              <p className="text-white/40 text-xs mb-3">{doc.qualifications} · {doc.experience} yrs</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">₹{doc.fee}</span>
                <span className="text-white/30 text-xs">{doc.availableDays?.length || 0} days/week</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const DEFAULT_CONTENT = {
  announcement: "Limited Appointments Available Today — Only a few slots remaining. Book now!",
  phone: "+91 91649 93469",
  address: "803, 11th Cross Road, Vyalikaval, HN Layout, Malleshwaram, Bengaluru 560003",
  hours: "All Days · 11:00 AM – 5:00 PM",
  doctorName: "Dr. P Venkat Rao",
  doctorQualification: "MBBS · General Physician",
  doctorBio: "With over 15 years of experience in general medicine, Dr. P Venkat Rao is dedicated to providing compassionate and effective healthcare solutions.",
  services: [
    { title: "General Health Consultation", desc: "Expert advice for all general health concerns and day-to-day illnesses." },
    { title: "Fever & Infection Treatment", desc: "Prompt diagnosis and effective treatment for viral and bacterial infections." },
    { title: "Cold & Cough Treatment", desc: "Relief-focused care for respiratory infections, cold, and cough." },
    { title: "Blood Pressure & Diabetes Check", desc: "Regular monitoring and management of BP and blood sugar levels." },
    { title: "Preventive Health Checkups", desc: "Routine screenings to detect health issues early and stay well." },
    { title: "Basic Medical Advice & Treatment", desc: "Practical, affordable medical guidance for patients of all ages." },
  ],
};

type SiteContent = typeof DEFAULT_CONTENT;

function ContentEditor() {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window === "undefined") return DEFAULT_CONTENT;
    try {
      const saved = localStorage.getItem("clinic_content");
      return saved ? { ...DEFAULT_CONTENT, ...JSON.parse(saved) } : DEFAULT_CONTENT;
    } catch { return DEFAULT_CONTENT; }
  });
  const [saved, setSaved] = useState(false);

  function save() {
    localStorage.setItem("clinic_content", JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function reset() {
    localStorage.removeItem("clinic_content");
    setContent(DEFAULT_CONTENT);
    setSaved(false);
  }

  function updateService(i: number, field: "title" | "desc", val: string) {
    const svcs = content.services.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    setContent({ ...content, services: svcs });
  }

  const field = (label: string, key: keyof Omit<SiteContent, "services">, rows = 1) => (
    <div key={key}>
      <label className="block text-white/50 text-xs uppercase tracking-widest mb-1.5">{label}</label>
      {rows > 1 ? (
        <textarea
          rows={rows}
          value={content[key] as string}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-teal-500/50 resize-none"
        />
      ) : (
        <input
          type="text"
          value={content[key] as string}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-teal-500/50"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Site Content Editor</h2>
          <p className="text-white/30 text-sm mt-0.5">Changes are saved in your browser. Update the source files for permanent changes.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white text-sm transition">
            Reset Defaults
          </button>
          <button onClick={save} className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition" style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)" }}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Clinic Info */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold mb-2">📋 Clinic Information</h3>
        {field("Announcement Banner", "announcement", 2)}
        {field("Phone Number", "phone")}
        {field("Address", "address", 2)}
        {field("Clinic Hours", "hours")}
      </div>

      {/* Doctor Info */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold mb-2">👨‍⚕️ Doctor Information</h3>
        {field("Doctor Name", "doctorName")}
        {field("Qualification & Specialty", "doctorQualification")}
        {field("Bio / Description", "doctorBio", 3)}
      </div>

      {/* Services */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">🏥 Services</h3>
        <div className="space-y-5">
          {content.services.map((svc, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 space-y-3">
              <p className="text-white/40 text-xs uppercase tracking-widest">Service {i + 1}</p>
              <div>
                <label className="block text-white/40 text-xs mb-1">Title</label>
                <input
                  type="text"
                  value={svc.title}
                  onChange={(e) => updateService(i, "title", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500/50"
                />
              </div>
              <div>
                <label className="block text-white/40 text-xs mb-1">Description</label>
                <textarea
                  rows={2}
                  value={svc.desc}
                  onChange={(e) => updateService(i, "desc", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500/50 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
        <p className="text-amber-300 font-semibold text-sm mb-1">💡 To make changes visible to all visitors</p>
        <p className="text-amber-200/60 text-sm">Update the matching values in your source files (e.g. <code className="bg-white/10 px-1 rounded">pages/index.tsx</code>, <code className="bg-white/10 px-1 rounded">pages/services.tsx</code>) and redeploy on Vercel. The editor above is for quick preview.</p>
      </div>
    </div>
  );
}

interface Lead {
  _id: string; name: string; phone: string;
  message: string; source: string; createdAt: string;
}

interface Booking {
  _id: string; date: string; time: string; booked: boolean;
  patientName: string; patientPhone: string; paymentStatus: string;
  doctorId: { _id: string; name: string; specialty: string } | null;
  createdAt: string;
}

interface Doctor {
  _id: string; name: string; specialty: string; qualifications: string;
  fee: number; experience: number; active: boolean; availableDays: string[];
}

function usePagination(total: number, perPage: number, current: number) {
  const totalPages = Math.ceil(total / perPage);
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) pages.push(i);
    if (current < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }
  return { totalPages, pages };
}

function buildChartData(leads: Lead[]) {
  const last7: Record<string, number> = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    last7[d.toLocaleDateString("en-IN", { month: "short", day: "numeric" })] = 0;
  }
  leads.forEach((l) => {
    const key = new Date(l.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    if (key in last7) last7[key]++;
  });
  return Object.entries(last7).map(([date, count]) => ({ date, count }));
}

function buildSourceData(leads: Lead[]) {
  const src: Record<string, number> = {};
  leads.forEach((l) => { src[l.source || "website"] = (src[l.source || "website"] || 0) + 1; });
  return Object.entries(src).map(([source, count]) => ({ source, count }));
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"leads" | "analytics" | "bookings" | "doctors" | "content">("leads");

  useEffect(() => {
    fetch(`${API_URL}/api/leads`)
      .then((r) => r.json())
      .then((data) => { setLeads(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));

    // Fetch all booked slots
    fetch(`${API_URL}/api/slots/all-bookings`)
      .then((r) => r.json())
      .then((data) => { setBookings(Array.isArray(data) ? data : []); setBookingsLoading(false); })
      .catch(() => setBookingsLoading(false));

    // Fetch doctors
    fetch(`${API_URL}/api/doctors`)
      .then((r) => r.json())
      .then((data) => { setDoctors(Array.isArray(data) ? data : []); setDoctorsLoading(false); })
      .catch(() => setDoctorsLoading(false));
  }, []);

  const filtered = leads.filter(
    (l) => l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search)
  );
  const { totalPages, pages } = usePagination(filtered.length, PER_PAGE, page);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const chartData = buildChartData(leads);
  const sourceData = buildSourceData(leads);
  const todayCount = chartData[chartData.length - 1]?.count ?? 0;
  const weekCount = chartData.reduce((s, d) => s + d.count, 0);

  const deleteLead = async (id: string) => {
    await fetch(`${API_URL}/api/leads/${id}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">HealthCare Clinic — Patient Management</p>
          </div>
          <a href="/" className="text-white/40 hover:text-white text-sm transition">← Back to Site</a>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: leads.length, color: "#0d9488" },
            { label: "Bookings", value: bookings.length, color: "#0ea5e9" },
            { label: "Today's Leads", value: todayCount, color: "#8b5cf6" },
            { label: "Doctors", value: doctors.length, color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{s.label}</p>
              <p className="text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { key: "leads",     label: "📋 Leads" },
            { key: "bookings",  label: "📅 Bookings" },
            { key: "doctors",   label: "👨‍⚕️ Doctors" },
            { key: "analytics", label: "📊 Analytics" },
            { key: "content",   label: "✏️ Content" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                tab === key ? "text-white" : "text-white/40 bg-white/5 hover:bg-white/10"
              }`}
              style={tab === key ? { background: "linear-gradient(135deg,#0d9488,#0ea5e9)" } : {}}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "content" ? (
          <ContentEditor />
        ) : tab === "bookings" ? (
          <BookingsPanel bookings={bookings} loading={bookingsLoading} />
        ) : tab === "doctors" ? (
          <DoctorsPanel doctors={doctors} loading={doctorsLoading} />
        ) : tab === "analytics" ? (
          <div className="space-y-6">
            {/* Area chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-6">Leads — Last 7 Days</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} />
                  <Area type="monotone" dataKey="count" stroke="#0d9488" strokeWidth={2} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart — sources */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-6">Leads by Source</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sourceData}>
                  <XAxis dataKey="source" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} />
                  <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="relative mb-4">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text" placeholder="Search by name or phone..."
                value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-teal-500/40"
              />
            </div>

            {/* Table */}
            <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-5 gap-4 px-6 py-3 border-b border-white/10 text-xs font-semibold text-white/30 uppercase tracking-widest">
                <span>Name</span><span>Phone</span><span className="col-span-2">Message</span><span className="text-right">Actions</span>
              </div>
              {loading ? (
                <div className="text-center py-16 text-white/30">Loading...</div>
              ) : paginated.length === 0 ? (
                <div className="text-center py-16 text-white/30">No leads found</div>
              ) : (
                <AnimatePresence>
                  {paginated.map((lead, i) => (
                    <motion.div
                      key={lead._id}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/3 transition group"
                    >
                      <div>
                        <p className="font-semibold text-white text-sm">{lead.name}</p>
                        <p className="text-white/30 text-xs mt-0.5">{new Date(lead.createdAt).toLocaleDateString("en-IN")}</p>
                      </div>
                      <div>
                        <a href={`tel:${lead.phone}`} className="text-teal-400 text-sm hover:underline">{lead.phone}</a>
                        <p className="text-white/30 text-xs mt-0.5">{lead.source}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-white/60 text-sm truncate">{lead.message || "—"}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/91${lead.phone}?text=Hi ${lead.name}, confirming your appointment.`}
                          target="_blank" rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-xs px-3 py-1.5 rounded-lg transition"
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="opacity-0 group-hover:opacity-100 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-5">
                <p className="text-white/30 text-sm">
                  {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="w-9 h-9 rounded-xl border border-white/10 text-white/40 hover:text-white disabled:opacity-30 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {pages.map((p, i) =>
                    p === "..." ? <span key={i} className="w-9 text-center text-white/20">…</span> : (
                      <button key={i} onClick={() => setPage(p as number)}
                        className="w-9 h-9 rounded-xl text-sm font-semibold border transition"
                        style={page === p ? { background: "linear-gradient(135deg,#0d9488,#0ea5e9)", borderColor: "transparent", color: "white" } : { borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                      >{p}</button>
                    )
                  )}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="w-9 h-9 rounded-xl border border-white/10 text-white/40 hover:text-white disabled:opacity-30 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
