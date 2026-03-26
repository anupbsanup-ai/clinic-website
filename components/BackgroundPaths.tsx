import { motion } from "framer-motion";
import Link from "next/link";
import { waLink } from "../config/clinic";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="rgba(13,148,136,1)"
            strokeWidth={path.width}
            strokeOpacity={0.07 + path.id * 0.015}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
            transition={{ duration: 20 + (path.id % 10), repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

interface BackgroundPathsProps {
  title?: string;
  subtitle?: string;
}

export function BackgroundPaths({ title = "Expert Care", subtitle }: BackgroundPathsProps) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#030712]">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-3xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-teal-400 font-semibold text-sm uppercase tracking-widest mb-6"
          >
            {subtitle || "Healthcare Reimagined"}
          </motion.p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-8 tracking-tighter">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, li) => (
                  <motion.span
                    key={`${wi}-${li}`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: wi * 0.1 + li * 0.03, type: "spring", stiffness: 150, damping: 25 }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="text-white/60 text-lg mb-10"
          >
            Same-day appointments · Trusted by 5,000+ patients · No queues
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={waLink()}
              target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 justify-center bg-gradient-to-b from-white/10 to-white/5 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-teal-500/20 transition-shadow"
            >
              <span className="flex items-center gap-3 rounded-[0.9rem] px-8 py-4 text-base font-bold bg-white/10 hover:bg-white/15 text-white transition-all group-hover:-translate-y-0.5 border border-white/10">
                💬 Book Free Consultation
                <span className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </span>
            </a>
            <Link href="/book"
              className="group relative inline-flex items-center gap-3 justify-center bg-gradient-to-b from-teal-500/20 to-teal-500/5 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-teal-500/30 transition-shadow"
            >
              <span className="flex items-center gap-3 rounded-[0.9rem] px-8 py-4 text-base font-bold bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 transition-all group-hover:-translate-y-0.5 border border-teal-500/20">
                📅 View Time Slots
                <span className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
