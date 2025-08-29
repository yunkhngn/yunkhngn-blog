// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yunkhngn.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/500', '/_error'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://yunkhngn.dev/sitemap.xml',
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/about') {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path === '/project') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/writing') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/writing/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path === '/photo') {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path.startsWith('/photo/')) {
      priority = 0.5;
      changefreq = 'monthly';
    } else if (path === '/contact') {
      priority = 0.6;
      changefreq = 'monthly';
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};