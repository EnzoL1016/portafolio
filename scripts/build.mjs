import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('El directorio de salida debe ser dist dentro del proyecto.');
}
await import('./check.mjs');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'assets', 'data']) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
// Vercel provides this URL at build time. For local previews no domain is invented.
const deployment = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
if (deployment) {
  const base = new URL(deployment);
  if (!['http:', 'https:'].includes(base.protocol)) throw new Error('SITE_URL debe ser una URL HTTP válida.');
  const origin = base.origin;
  const htmlPath = path.join(output, 'index.html');
  const html = await readFile(htmlPath, 'utf8');
  const escaped = origin.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
  await writeFile(htmlPath, html.replace('content="./assets/social-card.png"', `content="${escaped}/assets/social-card.png"`).replace('</head>', `  <link rel="canonical" href="${escaped}/">\n  <meta property="og:url" content="${escaped}/">\n</head>`));
  await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escaped}/</loc></url></urlset>\n`);
  await writeFile(path.join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
} else {
  await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n');
}
console.log('Sitio estático listo en dist/. Sin dependencias de producción.');
