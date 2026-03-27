import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AnimatedSection from "../components/AnimatedSection";
import HalideTopo from "../components/HalideTopo";
import { clinicConfig, waLink } from "../config/clinic";

const specializations = [
  { icon: "🩺", title: "General Medicine", desc: "Comprehensive care for common illnesses and routine health checks.", color: "from-blue-500 to-blue-700" },
  { icon: "❤️", title: "Chronic Disease Management", desc: "Expert management of diabetes, hypertension, asthma, and more.", color: "from-rose-500 to-rose-700" },
  { icon: "🧬", title: "Preventive Care", desc: "Screenings, vaccinations, and lifestyle guidance to prevent disease.", color: "from-teal-500 to-teal-700" },
  { icon: "👨‍👩‍👧", title: "Family Medicine", desc: "Healthcare for all ages — children, adults, and seniors alike.", color: "from-purple-500 to-purple-700" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", alt: "Clinic reception" },
  { src: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&q=80", alt: "Medical equipment" },
  { src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80", alt: "Consultation" },
  { src: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=600&q=80", alt: "Waiting area" },
  { src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80", alt: "Modern clinic" },
  { src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80", alt: "Medical care" },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About the Doctor — {clinicConfig.name}, {clinicConfig.city}</title>
        <meta name="description" content={`Meet ${clinicConfig.doctor.name}, ${clinicConfig.doctor.qualifications} with ${clinicConfig.doctor.experience}+ years of experience at ${clinicConfig.name} in ${clinicConfig.city}.`} />
        <link rel="canonical" href={`${clinicConfig.url}/about`} />
      </Head>
      <Navbar />

      {/* HERO */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1666214276372-24e525bcc456?w=1600&q=80" alt="Medical team" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f44]/90 to-blue-800/60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-12 w-full">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-widest mb-1">Meet the Expert</p>
          <h1 className="text-5xl font-extrabold text-white">About the Doctor</h1>
        </div>
      </section>

      {/* HALIDE 3D SECTION */}
      <HalideTopo />

      {/* PROFILE */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-80 h-80 bg-blue-50 rounded-full -z-10" />
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src={clinicConfig.doctor.photoAlt} alt={clinicConfig.doctor.name} fill className="object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-br from-teal-600 to-teal-800 text-white px-6 py-5 rounded-2xl shadow-xl text-center">
                <p className="text-4xl font-extrabold">{clinicConfig.doctor.patients}</p>
                <p className="text-teal-200 text-xs mt-1">Patients Treated</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-2">About the Doctor</p>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">{clinicConfig.doctor.name}</h2>
            <p className="text-blue-700 font-semibold text-lg mb-1">{clinicConfig.doctor.qualifications} — {clinicConfig.doctor.specialty}</p>
            <p className="text-gray-400 text-xs mb-6">Reg. No: {clinicConfig.registrationNumber} · Est. {clinicConfig.established}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[[`${clinicConfig.doctor.experience}+`, "Years Exp."], [clinicConfig.doctor.patients, "Patients"], [clinicConfig.doctor.rating, "Satisfaction"]].map(([v, l]) => (
                <div key={l} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-4 text-center border border-blue-100">
                  <p className="text-2xl font-extrabold text-blue-700">{v}</p>
                  <p className="text-gray-500 text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-500 leading-relaxed mb-8">
              {clinicConfig.doctor.bio}
            </p>

            <a
              href={waLink()}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-4 rounded-2xl transition shadow-lg hover:shadow-blue-200"
            >
              Book a Consultation →
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* SPECIALIZATIONS */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-2">Areas of Expertise</p>
            <h2 className="text-4xl font-extrabold text-gray-800">Specializations</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specializations.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 p-6 flex gap-5 items-start border border-gray-100 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition`} />
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Space</p>
            <h2 className="text-4xl font-extrabold text-gray-800">Inside the Clinic</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <AnimatedSection key={img.alt} delay={i * 0.08}>
                <div className="relative h-52 rounded-2xl overflow-hidden shadow group">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white py-20 px-6 text-center">
        <AnimatedSection>
          <h2 className="text-4xl font-extrabold mb-3">Ready to Meet the Doctor?</h2>
          <p className="text-blue-300 mb-8 text-lg">Book a consultation on WhatsApp — quick and easy</p>
          <a
            href={waLink()}
            target="_blank" rel="noopener noreferrer"
            className="btn-brand inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl"
          >
            💬 Book on WhatsApp
          </a>
        </AnimatedSection>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
