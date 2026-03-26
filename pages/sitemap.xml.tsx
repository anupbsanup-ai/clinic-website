import { GetServerSideProps } from "next";

const SITE_URL = "https://clinic-website.vercel.app";
const pages = ["/", "/about", "/services", "/contact", "/book"];

function SitemapXML() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();
  return { props: {} };
};

export default SitemapXML;
