import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AnimatedSection from "../components/AnimatedSection";

const services = [
  {
    title: "General Health Consultation",
    desc: "Expert advice for all general health concerns, day-to-day illnesses, and follow-up visits. Dr. Venkat Rao ensures every patient gets personalised attention.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    title: "Fever & Infection Treatment",
    desc: "Prompt diagnosis and effective treatment for viral and bacterial infections, typhoid, malaria, and other fever-related conditions.",
    img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
  },
  {
    title: "Cold & Cough Treatment",
    desc: "Relief-focused care for respiratory infections, seasonal cold, cough, sore throat, and breathing-related complaints.",
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80",
  },
  {
    title: "Blood Pressure & Diabetes Check",
    desc: "Regular monitoring, medication review, and management of blood pressure and blood sugar levels for long-term wellness.",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
  },
  {
    title: "Preventive Health Checkups",
    desc: "Routine screenings and health assessments to detect issues early and keep you and your family in good health.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    title: "Basic Medical Advice & Treatment",
    desc: "Affordable, practical medical guidance for minor injuries, headaches, stomach issues, body pain, and common ailments.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
  },
];

export default function Services() {
  return (
    <>
      <Head>
        <title>Our Services — Sanjeevani Clinic, Malleshwaram Bangalore</title>
        <meta name="description" content="Sanjeevani Clinic offers General Health Consultation, Fever & Infection Treatment, BP & Diabetes Management, Preventive Checkups and more in Malleshwaram, Bangalore." />
        <link rel="canonical" href="https://clinic-website-sigma-ten.vercel.app/services" />
      </Head>

      <Navbar />

      {/* HERO */}
      <section className="relative h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80" alt="Medical services at Sanjeevani Clinic Malleshwaram" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-blue-900/75" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pb-12 w-full">
          <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider mb-1">What We Offer</p>
          <h1 className="text-5xl font-extrabold text-white">Our Services</h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed">
            Sanjeevani Clinic focuses on General Physician care, Family Medicine, Preventive Health, and Quick Consultation —
            providing affordable, quality treatment for patients of all ages in Malleshwaram, Bangalore.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.07}>
              <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <Image src={s.img} alt={`${s.title} — Sanjeevani Clinic Malleshwaram`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-800 text-base mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <a
                    href={`https://wa.me/919164993469?text=I want to book an appointment for ${encodeURIComponent(s.title)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-teal-600 font-semibold text-sm hover:gap-2 transition-all"
                  >
                    Book via WhatsApp →
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-4xl font-extrabold text-gray-800">Why Choose Sanjeevani Clinic?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "15+ Years Experience", desc: "Dr. P Venkat Rao brings over 15 years of hands-on experience in general medicine and family care." },
              { title: "Affordable Consultation", desc: "Quality healthcare at fair, transparent prices — no hidden charges, no unnecessary tests." },
              { title: "Convenient Location", desc: "Located in Malleshwaram, easily accessible from Vyalikaval, HN Layout, and surrounding areas." },
            ].map((item) => (
              <div key={item.title} className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d9488,#0ea5e9)" }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1f44 0%, #0f4c75 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="relative text-center text-white max-w-xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-3">Need a Consultation?</h2>
          <p className="text-blue-300 mb-2 text-lg">Skip the wait — book directly on WhatsApp</p>
          <p className="text-blue-400 text-sm mb-8">Open All Days · 11:00 AM – 5:00 PM · +91 91649 93469</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919164993469?text=I want to book an appointment at Sanjeevani Clinic"
              target="_blank" rel="noopener noreferrer"
              className="btn-brand inline-flex items-center justify-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl">
              Book on WhatsApp
            </a>
            <a href="tel:+919164993469"
              className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white font-semibold text-lg px-10 py-4 rounded-2xl hover:bg-white/20 transition">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
