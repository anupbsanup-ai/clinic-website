import { Html, Head, Main, NextScript } from "next/document";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary SEO */}
        <meta name="description" content="Sanjeevani Clinic — Trusted family clinic in Malleshwaram, Bangalore. Dr. P Venkat Rao (MBBS) with 15+ years experience. Book appointments via WhatsApp." />
        <meta name="keywords" content="clinic in Malleshwaram, doctor near me, general physician in Bangalore, clinic near Sanjeevani Nagar, family clinic in Malleshwaram, Sanjeevani Clinic, Dr P Venkat Rao, Vyalikaval clinic, HN Layout doctor, clinic Bengaluru 560003" />
        <meta name="author" content="Sanjeevani Clinic" />
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://clinic-website-sigma-ten.vercel.app" />

        {/* Open Graph (WhatsApp / Facebook previews) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sanjeevani Clinic — Trusted Family Clinic in Malleshwaram, Bangalore" />
        <meta property="og:description" content="Dr. P Venkat Rao (MBBS) — 15+ years experience. Quick consultation, accurate diagnosis, patient-focused care. Book via WhatsApp." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80" />
        <meta property="og:url" content="https://clinic-website-sigma-ten.vercel.app" />
        <meta property="og:site_name" content="Sanjeevani Clinic" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sanjeevani Clinic, Malleshwaram Bangalore" />
        <meta name="twitter:description" content="Trusted family clinic. Dr. P Venkat Rao (MBBS), 15+ years experience. Book appointment on WhatsApp." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80" />

        {/* Schema.org structured data (Google rich results) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Sanjeevani Clinic",
              "description": "Trusted family clinic in Malleshwaram, Bangalore. Dr. P Venkat Rao (MBBS), 15+ years experience.",
              "url": "https://clinic-website-sigma-ten.vercel.app",
              "telephone": "+919164993469",
              "image": "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
              "priceRange": "₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "803, 11th Cross Road, Vyalikaval, HN Layout",
                "addressLocality": "Malleshwaram, Bengaluru",
                "addressRegion": "Karnataka",
                "postalCode": "560003",
                "addressCountry": "IN",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 13.0038,
                "longitude": 77.5671,
              },
              "openingHours": ["Mo-Su 11:00-17:00"],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "11:00",
                "closes": "17:00",
              },
              "medicalSpecialty": ["General Practice", "Family Medicine"],
              "hasMap": "https://www.google.com/maps/search/?api=1&query=803+11th+Cross+Road+Vyalikaval+Malleshwaram+Bengaluru",
            }),
          }}
        />

        {/* Google Analytics (GA4) */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d9488" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
