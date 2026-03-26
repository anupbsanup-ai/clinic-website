import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Appointment {
  _id: string;
  date: string;
  time: string;
  paymentStatus: string;
  paymentId: string;
  doctorId: { name: string; specialty: string; photo: string; fee: number };
}

interface Patient { id: string; name: string; phone: string; email: string; }

export default function DashboardPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("patient");
    const token = localStorage.getItem("patient_token");
    if (!stored || !token) { router.push("/login"); return; }
    const p = JSON.parse(stored) as Patient;
    setPatient(p);

    fetch(`${API_URL}/api/slots/patient/${p.phone}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => { setAppointments(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("patient_token");
    localStorage.removeItem("patient");
    router.push("/login");
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = appointments.filter((a) => a.date >= today);
  const past = appointments.filter((a) => a.date < today);

  if (!patient) return null;

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold" style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)" }}>
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-gray-800">{patient.name}</h1>
                <p className="text-gray-500 text-sm">{patient.phone}{patient.email ? ` · ${patient.email}` : ""}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 text-sm font-semibold transition">
              Sign Out
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Visits", value: appointments.length, color: "#0d9488" },
              { label: "Upcoming", value: upcoming.length, color: "#0ea5e9" },
              { label: "Completed", value: past.length, color: "#8b5cf6" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-3xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Upcoming Appointments</h2>
              <Link href="/book" className="btn-brand text-white text-sm font-semibold px-4 py-2 rounded-xl">+ Book New</Link>
            </div>
            {loading ? (
              <div className="text-gray-400 text-sm bg-white rounded-2xl p-8 text-center border border-gray-100">Loading...</div>
            ) : upcoming.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <p className="text-gray-400 mb-4">No upcoming appointments</p>
                <Link href="/book" className="btn-brand text-white font-semibold px-6 py-3 rounded-xl inline-block">Book Now</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((appt) => (
                  <AppointmentCard key={appt._id} appt={appt} upcoming />
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          {past.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Past Appointments</h2>
              <div className="space-y-3">
                {past.map((appt) => (
                  <AppointmentCard key={appt._id} appt={appt} upcoming={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

function AppointmentCard({ appt, upcoming }: { appt: Appointment; upcoming: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border p-5 flex items-center gap-4 ${upcoming ? "border-teal-100 shadow-sm" : "border-gray-100 opacity-70"}`}>
      {appt.doctorId?.photo ? (
        <Image src={appt.doctorId.photo} alt={appt.doctorId.name} width={52} height={52} className="rounded-xl object-cover flex-shrink-0" />
      ) : (
        <div className="w-13 h-13 rounded-xl bg-gray-100 flex-shrink-0" />
      )}
      <div className="flex-1">
        <p className="font-bold text-gray-800">{appt.doctorId?.name || "Doctor"}</p>
        <p className="text-teal-600 text-sm">{appt.doctorId?.specialty}</p>
        <p className="text-gray-400 text-xs mt-0.5">{appt.date} at {appt.time}</p>
      </div>
      <div className="text-right">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
          appt.paymentStatus === "paid" ? "bg-green-100 text-green-700"
          : appt.paymentStatus === "free" ? "bg-gray-100 text-gray-500"
          : "bg-yellow-100 text-yellow-700"
        }`}>
          {appt.paymentStatus === "paid" ? "✓ Paid" : appt.paymentStatus === "free" ? "Free" : "Pending"}
        </span>
        {appt.doctorId?.fee && (
          <p className="text-gray-400 text-xs mt-1">₹{appt.doctorId.fee}</p>
        )}
      </div>
    </div>
  );
}
