// sitemap-generator.js
// Run this script to generate sitemap.xml

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://praveenyadavme.vercel.app';
const pages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/projects', changefreq: 'weekly', priority: '0.9' },
    { url: '/skills', changefreq: 'monthly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' }
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
};

generateSitemap();

// Also generate a sitemap for humans
const generateHtmlSitemap = () => {
    const htmlSitemap = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap - Praveen Yadav Portfolio</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #6366f1; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 10px 0; }
        a { color: #6366f1; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Sitemap - Praveen Yadav Portfolio</h1>
    <ul>
${pages.map(page => `        <li><a href="${baseUrl}${page.url}">${baseUrl}${page.url}</a></li>`).join('\n')}
    </ul>
    <p>Last updated: ${new Date().toLocaleDateString()}</p>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.html'), htmlSitemap);
    console.log('HTML sitemap generated successfully!');
};

generateHtmlSitemap();