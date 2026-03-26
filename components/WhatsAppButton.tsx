"use client";
import { useState } from "react";
import { waLink } from "../config/clinic";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-20 right-6 z-50 flex items-center gap-3 text-white rounded-full shadow-2xl transition-all duration-300 overflow-hidden"
      style={{
        padding: hovered ? "14px 20px 14px 16px" : "14px",
        background: hovered
          ? "linear-gradient(135deg, #0f766e, #0891b2)"
          : "linear-gradient(135deg, #0d9488, #0ea5e9)",
        boxShadow: "0 8px 30px rgba(13,148,136,0.45)",
      }}
      aria-label="Book appointment on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-white flex-shrink-0">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.477 2.027 7.784L0 32l8.437-2.006A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.293 19.346c-.4-.2-2.362-1.166-2.728-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.266 1.566c-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.986-1.19-1.062-1.993-2.374-2.227-2.774-.234-.4-.025-.616.175-.815.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5S8 12.667 8 14.633c0 1.967 1.434 3.867 1.634 4.134.2.267 2.82 4.3 6.833 6.033.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.768-.115 2.362-.966 2.695-1.9.334-.933.334-1.733.234-1.9-.1-.166-.366-.266-.766-.466z" />
      </svg>
      {hovered && <span className="font-semibold text-sm whitespace-nowrap">Book Appointment</span>}
    </a>
  );
}
