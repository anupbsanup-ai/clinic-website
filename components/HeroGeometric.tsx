"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";
import { waLink } from "../config/clinic";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: "easeOut" as const,
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" as const },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-teal-500/[0.07] blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3} width={600} height={140} rotate={12}
          gradient="from-blue-500/[0.18]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5} width={500} height={120} rotate={-15}
          gradient="from-teal-500/[0.18]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4} width={300} height={80} rotate={-8}
          gradient="from-cyan-500/[0.18]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6} width={200} height={60} rotate={20}
          gradient="from-indigo-500/[0.18]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7} width={150} height={40} rotate={-25}
          gradient="from-sky-500/[0.18]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            custom={0} variants={fadeUpVariants} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] mb-8"
          >
            <Circle className="h-2 w-2 fill-teal-400" />
            <span className="text-sm text-white/60 tracking-wide">Now Accepting Appointments</span>
          </motion.div>

          {/* Heading */}
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Your Health,
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300">
                Our Priority
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
              Compassionate, expert medical care for you and your family.
              Quality Care You Can Trust.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            custom={3} variants={fadeUpVariants} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={waLink()}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0d9488, #0ea5e9)", boxShadow: "0 8px 30px rgba(13,148,136,0.4)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-white flex-shrink-0">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.477 2.027 7.784L0 32l8.437-2.006A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.293 19.346c-.4-.2-2.362-1.166-2.728-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.266 1.566c-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.986-1.19-1.062-1.993-2.374-2.227-2.774-.234-.4-.025-.616.175-.815.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5S8 12.667 8 14.633c0 1.967 1.434 3.867 1.634 4.134.2.267 2.82 4.3 6.833 6.033.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.768-.115 2.362-.966 2.695-1.9.334-.933.334-1.733.234-1.9-.1-.166-.366-.266-.766-.466z" />
              </svg>
              Book on WhatsApp
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all hover:scale-105"
            >
              View Services →
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            custom={4} variants={fadeUpVariants} initial="hidden" animate="visible"
            className="flex items-center justify-center gap-6 mt-12"
          >
            <div className="flex -space-x-2">
              {["bg-blue-400", "bg-teal-400", "bg-purple-400", "bg-rose-400"].map((c, i) => (
                <div key={i} className={`w-9 h-9 rounded-full ${c} border-2 border-[#030712] flex items-center justify-center text-white text-xs font-bold`}>
                  {["P","R","A","K"][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-white/40 text-xs">5,000+ happy patients</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/60 pointer-events-none" />
    </div>
  );
}
