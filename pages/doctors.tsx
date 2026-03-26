import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { API_URL } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AnimatedSection from "../components/AnimatedSection";
import { clinicConfig, waLink } from "../config/clinic";

interface Doctor { _id: string; name: string; specialty: string; photo: string; fee: number; experience: number; qualifications: string; bio: string; availableDays: string[]; }

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/doctors`)
      .then((r) => r.json())
      .then(setDoctors)
      .catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>Our Doctors — {clinicConfig.name}, {clinicConfig.city}</title>
        <meta name="description" content={`Meet the doctors at ${clinicConfig.name} in ${clinicConfig.city}. Expert care, affordable consultations.`} />
        <link rel="canonical" href={`${clinicConfig.url}/doctors`} />
      </Head>
      <Navbar />

      {/* Hero */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80" alt="Our Doctors" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-12 w-full">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider mb-1">Our Team</p>
          <h1 className="text-5xl font-extrabold text-white">Meet Our Doctors</h1>
        </div>
      </section>

      {/* Doctor Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doc, i) => (
              <AnimatedSection key={doc._id} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="bg-white border border-gray-100 rounded-3xl shadow hover:shadow-xl transition-all group overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={doc.photo} alt={doc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-teal-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">{doc.specialty}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-gray-800 mb-1">{doc.name}</h3>
                    <p className="text-teal-600 text-sm font-semibold mb-1">{doc.qualifications}</p>
                    <p className="text-gray-400 text-sm mb-3">{doc.experience} years experience</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{doc.bio}</p>

                    <div className="flex flex-wrap gap-1 mb-5">
                      {doc.availableDays.map((day) => (
                        <span key={day} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{day.slice(0, 3)}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-xs">Consultation Fee</p>
                        <p className="text-2xl font-extrabold text-teal-600">₹{doc.fee}</p>
                      </div>
                      <Link href="/book"
                        className="btn-brand text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-50 text-center">
        <AnimatedSection direction="up">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Not sure which doctor to see?</h2>
          <p className="text-gray-500 mb-8">Chat with us on WhatsApp and we&apos;ll guide you to the right specialist.</p>
          <a href={waLink("I need help choosing the right doctor")}
            target="_blank" rel="noopener noreferrer"
            className="btn-brand inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl">
            💬 Ask on WhatsApp
          </a>
        </AnimatedSection>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
