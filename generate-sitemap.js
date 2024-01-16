const Family = require("./src/Family");
const fs = require("fs");
const path = require("path");

const createSitemapContent = (Family) => {
  const currentDate = new Date().toISOString().split("T")[0];
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  xmlContent += `   <url>\n      <loc>https://pusheen.se</loc>\n      <lastmod>${currentDate}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;

  xmlContent += `   <url>\n      <loc>https://pusheen.se/all</loc>\n      <lastmod>${currentDate}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;

  Family.forEach((member) => {
    const lastmod = currentDate;

    xmlContent += `   <url>\n      <loc>https://pusheen.se/${member.id}</loc>\n      <lastmod>${lastmod}</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n   </url>\n`;
  });

  xmlContent += "</urlset>";
  return xmlContent;
};

const sitemapContent = createSitemapContent(Family);

const publicDir = path.join("public");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapContent);

console.log("Sitemap generated successfully.");
