import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL(process.argv.includes('--dist') ? '../dist/' : '../', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  try {
    let requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (requested === '/') requested = '/index.html';
    const relative = requested.replace(/^\/+/, '');
    const target = path.resolve(root, relative);
    if (!target.startsWith(path.resolve(root) + path.sep) || !/^(index\.html|styles\.css|app\.js|robots\.txt|sitemap\.xml|assets\/[^.][^\0]*|data\/[^.][^\0]*)$/.test(relative)) {
      res.writeHead(404); res.end('No encontrado'); return;
    }
    if (!(await stat(target)).isFile()) throw Object.assign(new Error(), { code: 'ENOENT' });
    const content = await readFile(target);
    res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(content);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 404 : 400); res.end('No encontrado');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
