import Link from "next/link";
import { clinicConfig, waLink } from "../config/clinic";

export default function Footer() {
  return (
    <footer className="bg-[#0f2744] text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-lg leading-none">{clinicConfig.shortName}</p>
              <p className="text-blue-400 text-xs tracking-wider">CLINIC</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {clinicConfig.tagline}. Led by {clinicConfig.doctor.name} ({clinicConfig.doctor.qualifications}) with {clinicConfig.doctor.experience}+ years of experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {[["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Contact", "/contact"]].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="hover:text-white transition flex items-center gap-2">
                  <span className="text-blue-400">›</span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {clinicConfig.services.slice(0, 5).map((s) => (
              <li key={s.title} className="flex items-center gap-2">
                <span className="text-teal-400">›</span> {s.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${clinicConfig.phoneRaw}`} className="hover:text-white transition">{clinicConfig.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {clinicConfig.address}
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${clinicConfig.email}`} className="hover:text-white transition break-all">{clinicConfig.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {clinicConfig.hours}
            </li>
          </ul>
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 btn-brand text-white text-sm font-semibold px-4 py-2.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-white">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.477 2.027 7.784L0 32l8.437-2.006A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.293 19.346c-.4-.2-2.362-1.166-2.728-1.3-.366-.133-.633-.2-.9.2s-1.033 1.3-1.266 1.566c-.233.267-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.986-1.19-1.062-1.993-2.374-2.227-2.774-.234-.4-.025-.616.175-.815.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.656-.674-.9-.686l-.767-.013c-.267 0-.7.1-1.067.5S8 12.667 8 14.633c0 1.967 1.434 3.867 1.634 4.134.2.267 2.82 4.3 6.833 6.033.954.412 1.698.658 2.278.843.957.305 1.828.262 2.517.159.768-.115 2.362-.966 2.695-1.9.334-.933.334-1.733.234-1.9-.1-.166-.366-.266-.766-.466z" />
            </svg>
            Book on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-xs px-0">
        <p>© {new Date().getFullYear()} {clinicConfig.name}, {clinicConfig.city}. All rights reserved. · Reg. No: {clinicConfig.registrationNumber}</p>
        <div className="flex items-center gap-4">
          {clinicConfig.social.google && (
            <a href={clinicConfig.social.google} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="Google Business">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 11h8.533c.044.385.067.78.067 1.184 0 5.407-3.621 9.25-8.6 9.25C5.823 21.434 2 17.61 2 12S5.823 2.566 12 2.566c2.67 0 4.9.975 6.61 2.564l-2.686 2.587C14.786 6.676 13.518 6.1 12 6.1c-3.283 0-5.95 2.75-5.95 5.9s2.667 5.9 5.95 5.9c2.553 0 4.396-1.386 5.1-3.4H12v-3.5z"/></svg>
            </a>
          )}
          {clinicConfig.social.facebook && (
            <a href={clinicConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="Facebook">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>
          )}
          {clinicConfig.social.instagram && (
            <a href={clinicConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition" aria-label="Instagram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
