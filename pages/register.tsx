import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("patient_token", data.token);
      localStorage.setItem("patient", JSON.stringify(data.patient));
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)" }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-2">Register to manage your appointments</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-4">
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "e.g. Priya Sharma" },
              { label: "Phone Number", key: "phone", type: "tel", placeholder: "e.g. 9876543210" },
              { label: "Email (optional)", key: "email", type: "email", placeholder: "e.g. priya@email.com" },
              { label: "Password", key: "password", type: "password", placeholder: "Min 6 characters" },
              { label: "Confirm Password", key: "confirm", type: "password", placeholder: "Repeat your password" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key !== "email"}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition" />
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm text-center">{error}</div>
            )}

            <button type="submit" disabled={status === "loading"}
              className="btn-brand w-full text-white font-bold py-3.5 rounded-xl disabled:opacity-60">
              {status === "loading" ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-teal-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
