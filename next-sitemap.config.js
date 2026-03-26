/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://clinic-website-sigma-ten.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 100,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/api/"] },
    ],
  },
};
