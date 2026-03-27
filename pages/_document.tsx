import { Html, Head, Main, NextScript } from "next/document";
import { clinicConfig } from "../config/clinic";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const { seo, name, phone: phoneRaw, address, doctor, url, whatsapp } = clinicConfig;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary SEO */}
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="author" content={name} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={name} />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": name,
              "description": seo.description,
              "url": url,
              "telephone": clinicConfig.phoneRaw,
              "image": seo.ogImage,
              "priceRange": "₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": address.split(",").slice(0, 2).join(","),
                "addressLocality": clinicConfig.city,
                "addressRegion": "Karnataka",
                "postalCode": "560003",
                "addressCountry": "IN",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": seo.geo.lat,
                "longitude": seo.geo.lng,
              },
              "openingHours": ["Mo-Su 11:00-17:00"],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "11:00",
                "closes": "17:00",
              },
              "medicalSpecialty": "General Practice",
              "hasMap": `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
              "employee": {
                "@type": "Physician",
                "name": doctor.name,
                "jobTitle": doctor.specialty,
                "description": doctor.bio,
              },
            }),
          }}
        />

        {/* Google Analytics GA4 */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`,
            }} />
          </>
        )}

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={clinicConfig.brand.primary} />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
