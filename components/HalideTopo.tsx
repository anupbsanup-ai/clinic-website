"use client";
import React, { useEffect, useRef } from "react";
import { clinicConfig, waLink } from "../config/clinic";

export default function HalideTopo() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 30;
      const y = (window.innerHeight / 2 - e.pageY) / 30;
      canvas.style.transform = `rotateX(${52 + y / 2}deg) rotateZ(${-20 + x / 2}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 18;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";
    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(52deg) rotateZ(-20deg) scale(1)";
    }, 200);

    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); clearTimeout(timeout); };
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050a14]">
      {/* Film grain */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="halide-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="absolute inset-0 pointer-events-none z-20 opacity-10" style={{ filter: "url(#halide-grain)" }} />

      {/* Interface overlay */}
      <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Healthcare Clinic</span>
          <div className="text-right font-mono text-xs" style={{ color: "#0d9488" }}>
            <div>SPECIALIST: General Medicine</div>
            <div>EXPERIENCE: {clinicConfig.doctor.experience}+ Years</div>
          </div>
        </div>

        <div>
          <h2
            className="font-black uppercase leading-none mb-6 mix-blend-difference text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}
          >
            Expert<br />Medical<br />Care
          </h2>
          <div className="flex justify-between items-end">
            <div className="font-mono text-xs text-white/30">
              <p>[ ESTABLISHED {clinicConfig.established} ]</p>
              <p>COMPASSIONATE · PROFESSIONAL · TRUSTED</p>
            </div>
            <a
              href={waLink()}
              target="_blank" rel="noopener noreferrer"
              className="pointer-events-auto text-[#050a14] font-bold text-sm px-6 py-3 transition-all hover:-translate-y-1"
              style={{
                background: "#e0e0e0",
                clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)",
              }}
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div style={{ perspective: "2000px", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div
          ref={canvasRef}
          style={{ position: "relative", width: "900px", height: "560px", transformStyle: "preserve-3d", transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {[
            { img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80", style: { filter: "grayscale(1) contrast(1.3) brightness(0.45)" } },
            { img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80", style: { filter: "grayscale(1) contrast(1.1) brightness(0.6)", opacity: 0.5, mixBlendMode: "screen" as const } },
            { img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80", style: { filter: "grayscale(1) contrast(1.3) brightness(0.7)", opacity: 0.35, mixBlendMode: "overlay" as const } },
          ].map((layer, i) => (
            <div
              key={i}
              ref={(el) => { layersRef.current[i] = el; }}
              style={{
                position: "absolute", inset: 0,
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundImage: `url('${layer.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.5s ease",
                ...layer.style,
              }}
            />
          ))}
          {/* Contour lines */}
          <div style={{
            position: "absolute", width: "200%", height: "200%", top: "-50%", left: "-50%",
            backgroundImage: "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 45px, rgba(13,148,136,0.06) 46px, transparent 47px)",
            transform: "translateZ(100px)", pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)", animation: "flow 2s infinite ease-in-out" }} />
      <style>{`@keyframes flow { 0%,100%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} }`}</style>
    </section>
  );
}
