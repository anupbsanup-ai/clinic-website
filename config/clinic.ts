// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CLINIC CONFIG — Change this ONE file to resell to any clinic
//  Every piece of text, phone number, address, and SEO tag comes from here.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const clinicConfig = {

  // ── Identity ──────────────────────────────────────────────────────────────
  name:       "Sanjeevani Clinic",
  shortName:  "Sanjeevani",
  tagline:    "Trusted Family Clinic in Malleshwaram",
  city:       "Malleshwaram, Bangalore",
  url:        "https://clinic-website-sigma-ten.vercel.app",

  // ── Contact ───────────────────────────────────────────────────────────────
  phone:      "+91 91649 93469",
  phoneRaw:   "+919164993469",        // for tel: href
  whatsapp:   "919164993469",         // for wa.me/ links
  email:      "sanjeevaniclinikmalleshwaram@gmail.com",
  address:    "803, 11th Cross Road, Vyalikaval, HN Layout, Malleshwaram, Bengaluru, Karnataka 560003",
  addressShort: "803, 11th Cross, Malleshwaram, Bangalore",
  emergency:  "For emergencies outside clinic hours, please call 108 (ambulance) or visit the nearest hospital.",

  // ── Social Media ──────────────────────────────────────────────────────────
  social: {
    instagram: "",   // e.g. "https://instagram.com/sanjeevani_clinic"
    facebook:  "",   // e.g. "https://facebook.com/sanjeevaniclinikmalleshwaram"
    google:    "https://maps.app.goo.gl/your-google-business-link",
  },

  // ── Hours ─────────────────────────────────────────────────────────────────
  hours:      "All Days · 11:00 AM – 5:00 PM",
  hoursShort: "11AM – 5PM",
  openDays:   "All Days" as string,

  // ── Weekly Schedule (used on contact page) ───────────────────────────────
  schedule: [
    { day: "Monday",    time: "11:00 AM – 5:00 PM", open: true },
    { day: "Tuesday",   time: "11:00 AM – 5:00 PM", open: true },
    { day: "Wednesday", time: "11:00 AM – 5:00 PM", open: true },
    { day: "Thursday",  time: "11:00 AM – 5:00 PM", open: true },
    { day: "Friday",    time: "11:00 AM – 5:00 PM", open: true },
    { day: "Saturday",  time: "11:00 AM – 5:00 PM", open: true },
    { day: "Sunday",    time: "11:00 AM – 5:00 PM", open: true },
  ],

  // ── Clinic Info ───────────────────────────────────────────────────────────
  established:        2010,
  registrationNumber: "KMC-12345",   // Replace with real MCI/KMC registration number

  // ── Doctor ────────────────────────────────────────────────────────────────
  doctor: {
    name:           "Dr. P Venkat Rao",
    qualifications: "MBBS",
    specialty:      "General Physician",
    experience:     15,
    patients:       "5K+",
    rating:         "4.9★",
    fee:            300,
    photo:          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    photoAlt:       "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=80",
    bio:            "With over 15 years of experience in general medicine, Dr. P Venkat Rao is dedicated to providing compassionate and effective healthcare solutions. He specializes in treating common illnesses, managing chronic conditions, and offering preventive healthcare guidance.",
    tags:           ["15 Yrs Experience", "General Medicine", "Diabetes Care", "Family Medicine"],
    skills:         [
      "Treating common illnesses & infections",
      "Managing BP, diabetes & chronic conditions",
      "Preventive care & affordable consultations",
    ],
  },

  // ── Services ──────────────────────────────────────────────────────────────
  services: [
    {
      title: "General Health Consultation",
      desc:  "Expert advice for all general health concerns, day-to-day illnesses, and follow-up visits.",
      img:   "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    },
    {
      title: "Fever & Infection Treatment",
      desc:  "Prompt diagnosis and effective treatment for viral and bacterial infections, typhoid, malaria, and fever.",
      img:   "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
    },
    {
      title: "Cold & Cough Treatment",
      desc:  "Relief-focused care for respiratory infections, seasonal cold, cough, sore throat, and breathing complaints.",
      img:   "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80",
    },
    {
      title: "Blood Pressure & Diabetes Check",
      desc:  "Regular monitoring, medication review, and management of blood pressure and blood sugar levels.",
      img:   "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
    },
    {
      title: "Preventive Health Checkups",
      desc:  "Routine screenings and health assessments to detect issues early and keep you and your family in good health.",
      img:   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    },
    {
      title: "Basic Medical Advice & Treatment",
      desc:  "Affordable, practical medical guidance for minor injuries, headaches, stomach issues, and common ailments.",
      img:   "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    },
  ],

  // ── Stats ─────────────────────────────────────────────────────────────────
  stats: [
    { end: 15,   suffix: "+", label: "Years Experience" },
    { end: 5000, suffix: "+", label: "Patients Treated" },
    { end: 20,   suffix: "+", label: "Services Offered" },
    { end: 98,   suffix: "%", label: "Satisfaction Rate" },
  ],

  // ── Hero Images ───────────────────────────────────────────────────────────
  heroImage:    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1800&q=90",
  ctaImage:     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&q=80",
  contactImage: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1600&q=80",

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title:       "Sanjeevani Clinic — Trusted Family Clinic in Malleshwaram, Bangalore",
    description: "Dr. P Venkat Rao (MBBS) — 15+ years experience. Book same-day appointments via WhatsApp. Open all days 11am–5pm in Malleshwaram, Bangalore.",
    keywords:    "clinic in Malleshwaram, doctor near me, general physician in Bangalore, family clinic in Malleshwaram, Sanjeevani Clinic, Dr P Venkat Rao, Vyalikaval clinic, HN Layout doctor",
    ogImage:     "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    geo: { lat: 13.0068, lng: 77.5679 },
  },

  // ── Branding colors (used inline where Tailwind can't dynamic class) ──────
  brand: {
    gradient: "linear-gradient(135deg,#0d9488,#0ea5e9)",
    primary:  "#0d9488",
    accent:   "#0ea5e9",
  },

} as const;

// ── Convenience helpers ───────────────────────────────────────────────────────
export const waLink = (msg = "I want to book an appointment at " + clinicConfig.name) =>
  `https://wa.me/${clinicConfig.whatsapp}?text=${encodeURIComponent(msg)}`;

export const mapEmbed = () =>
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4!2d${clinicConfig.seo.geo.lng}!3d${clinicConfig.seo.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(clinicConfig.address)}!5e0!3m2!1sen!2sin!4v1`;

export const mapLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicConfig.address)}`;
