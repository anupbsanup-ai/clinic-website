import Link from "next/link";
import { useState, useEffect } from "react";
import { clinicConfig, waLink } from "../config/clinic";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [patient, setPatient] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    const stored = localStorage.getItem("patient");
    if (stored) setPatient(JSON.parse(stored));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home",      href: "/" },
    { label: "Doctors",   href: "/doctors" },
    { label: "Services",  href: "/services" },
    { label: "Contact",   href: "/contact" },
    { label: "Book Slot", href: "/book" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm shadow-md"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold text-blue-800 leading-none block">{clinicConfig.shortName}</span>
            <span className="text-xs text-teal-600 font-medium tracking-wider">CLINIC</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 text-gray-600 font-medium items-center">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={`hover:text-blue-700 transition ${label === "Book Slot" ? "text-teal-600 font-semibold" : ""}`}>
                {label}
              </Link>
            </li>
          ))}
          {patient ? (
            <li>
              <Link href="/dashboard" className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-semibold hover:bg-teal-100 transition">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: clinicConfig.brand.gradient }}>
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                {patient.name.split(" ")[0]}
              </Link>
            </li>
          ) : (
            <li><Link href="/login" className="text-gray-500 hover:text-blue-700 transition font-semibold">Login</Link></li>
          )}
          <li>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-brand text-white px-5 py-2 rounded-full font-semibold">
              Book Now
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-gray-700 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 pb-6 space-y-4">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-700 font-medium border-b hover:text-blue-700 transition">
              {label}
            </Link>
          ))}
          {patient ? (
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block py-2 text-teal-600 font-semibold border-b">My Dashboard</Link>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 font-medium border-b hover:text-blue-700 transition">Patient Login</Link>
          )}
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            className="block text-center btn-brand text-white px-5 py-3 rounded-full font-semibold">
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  );
}
