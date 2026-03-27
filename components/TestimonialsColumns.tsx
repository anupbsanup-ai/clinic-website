"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  { text: "The doctor was incredibly thorough. Diagnosed my issue in one visit after 3 other doctors missed it.", name: "Priya Sharma", role: "Patient since 2021", color: "from-pink-500 to-rose-500" },
  { text: "Booked via WhatsApp in 30 seconds. Got confirmed instantly. The whole experience was seamless.", name: "Rahul Mehta", role: "Patient since 2022", color: "from-blue-500 to-indigo-500" },
  { text: "Very professional clinic. Clean, modern and the staff is incredibly helpful. Best in the city.", name: "Anita Kapoor", role: "Patient since 2020", color: "from-teal-500 to-cyan-500" },
  { text: "My entire family comes here. The doctor takes time to explain everything clearly. Highly recommend.", name: "Suresh Iyer", role: "Patient since 2019", color: "from-orange-500 to-amber-500" },
  { text: "After years of visiting different clinics, I finally found one that actually cares.", name: "Meena Pillai", role: "Patient since 2023", color: "from-purple-500 to-violet-500" },
  { text: "The vaccination service was quick and painless. Kids didn't even cry!", name: "Deepak Nair", role: "Patient since 2022", color: "from-green-500 to-emerald-500" },
  { text: "Blood test results came in within 24 hours with a detailed explanation. Excellent service.", name: "Kavitha Reddy", role: "Patient since 2021", color: "from-red-500 to-pink-500" },
  { text: "Dr. Venkat Rao diagnosed my recurring fever correctly when others couldn't. Recovered in 3 days!", name: "Arjun Singh", role: "Patient since 2023", color: "from-sky-500 to-blue-500" },
  { text: "Emergency consultation was handled quickly and professionally. Very grateful.", name: "Lakshmi Nair", role: "Patient since 2020", color: "from-fuchsia-500 to-purple-500" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialCard({ text, name, role, color }: { text: string; name: string; role: string; color: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm max-w-xs w-full shadow-xl">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow`}>
          {initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-white/40 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsColumn({ testimonials, duration = 15, className = "" }: {
  testimonials: typeof firstColumn;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].fill(0).map((_, idx) => (
          <React.Fragment key={idx}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} text={t.text} name={t.name} role={t.role} color={t.color} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-900 to-blue-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="inline-block border border-white/20 text-white/60 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Patient Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            What Our Patients Say
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Real stories from real patients who trust us with their health
          </p>
        </AnimatedSection>

        <div
          className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} duration={22} className="hidden md:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={16} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
