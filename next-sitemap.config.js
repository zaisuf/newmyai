/**
 * Minimal next-sitemap configuration to satisfy `next-sitemap` during postbuild.
 * Adjust `siteUrl` or set the SITE_URL environment variable in Vercel.
 */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
};
