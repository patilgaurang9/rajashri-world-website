/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://rajashriworld.com', // Replace with your actual domain
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/api/*'], // Exclude any private or API routes
  // Optionally, add more SEO options here
};