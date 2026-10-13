import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
assert.match(html, /<html[^>]+lang="es"/, 'El idioma debe estar declarado.');
assert.match(html, /name="viewport"/, 'Falta viewport móvil.');
assert.match(html, /name="description"/, 'Falta descripción SEO.');
assert.match(html, /<h1[\s>]/, 'Falta título principal.');
assert.match(html, /<link rel="stylesheet" href="\.\/styles\.css">/, 'La hoja de estilos debe usar una ruta local relativa.');
assert.match(html, /<script defer src="\.\/data\/projects\.js"><\/script>\s*<script defer src="\.\/app\.js"><\/script>/, 'Los scripts clásicos locales deben cargar datos antes de la aplicación.');
assert.doesNotMatch(html, /(?:href|src)="\/(?:styles\.css|app\.js|data\/|assets\/)/, 'Hay rutas raíz que fallan al abrir index.html con file://.');
assert.doesNotMatch(html, /<script[^>]+type="module"/, 'file:// no debe depender de módulos JavaScript.');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Hay IDs duplicados.');
let assets = 0;
for (const [, value] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  if (value.startsWith('#')) {
    assert(ids.includes(value.slice(1)), `Ancla inexistente: ${value}`);
  } else if (!/^(https?:|mailto:|data:)/.test(value)) {
    await access(path.join(root, value.replace(/^\//, '').split('?')[0]));
    assets++;
  }
}
for (const [, opening] of html.matchAll(/(<a\b[^>]*target="_blank"[^>]*>)/g)) {
  assert.match(opening, /rel="[^"]*noopener/, 'Enlace externo sin noopener.');
}
execFileSync(process.execPath, ['--check', path.join(root, 'app.js')], { stdio: 'inherit' });
const projectSource = await readFile(path.join(root, 'data/projects.js'), 'utf8');
const context = vm.createContext({});
const projects = vm.runInContext(`${projectSource}\nprojects;`, context, { filename: 'data/projects.js' });
assert.equal(Object.keys(projects).length, 3);
const graphSignatures = new Set();
for (const project of Object.values(projects)) {
  for (const field of ['title', 'summary', 'problem', 'solution', 'stack']) {
    assert(project[field]?.trim(), `Contenido incompleto: ${field}`);
  }
  const graph = project.graph;
  assert(graph?.caption?.trim(), `Falta caption del mapa: ${project.title}`);
  assert(Array.isArray(graph.nodes) && graph.nodes.length >= 2, `Faltan nodos: ${project.title}`);
  const nodeIds = new Set();
  for (const node of graph.nodes) {
    assert(node.id?.trim() && !nodeIds.has(node.id), `ID de nodo vacío o duplicado: ${project.title}/${node.id}`);
    nodeIds.add(node.id);
    for (const field of ['title', 'subtitle', 'detail']) {
      assert(typeof node[field] === 'string' && node[field].trim(), `Campo real incompleto ${field}: ${project.title}/${node.id}`);
    }
    for (const positionName of ['position', 'mobilePosition']) {
      const position = node[positionName];
      assert(Array.isArray(position) && position.length === 2 && position.every(Number.isInteger), `Posición inválida: ${project.title}/${node.id}/${positionName}`);
      assert(position.every(value => value > 0), `La grilla empieza en 1: ${project.title}/${node.id}/${positionName}`);
    }
  }
  for (const positionName of ['position', 'mobilePosition']) {
    const positions = graph.nodes.map(node => node[positionName].join(','));
    assert.equal(new Set(positions).size, positions.length, `Hay nodos superpuestos en ${positionName}: ${project.title}`);
    const maxColumn = positionName === 'mobilePosition' ? 2 : 3;
    assert(graph.nodes.every(node => node[positionName][0] <= maxColumn), `Un nodo excede las columnas de ${positionName}: ${project.title}`);
  }
  assert(Array.isArray(graph.edges), `Faltan conexiones: ${project.title}`);
  for (const edge of graph.edges) {
    assert(nodeIds.has(edge.from), `Conexión con origen inexistente: ${project.title}/${edge.from}`);
    assert(nodeIds.has(edge.to), `Conexión con destino inexistente: ${project.title}/${edge.to}`);
    assert.notEqual(edge.from, edge.to, `Conexión propia inválida: ${project.title}/${edge.from}`);
  }
  graphSignatures.add(JSON.stringify({ nodes: graph.nodes.map(({ id, position, mobilePosition }) => [id, position, mobilePosition]), edges: graph.edges }));
  for (const field of ['demo', 'source']) assert.equal(new URL(project[field]).protocol, 'https:');
}
assert.equal(graphSignatures.size, Object.keys(projects).length, 'Cada proyecto debe tener un diagrama diferente.');
const choices = [...html.matchAll(/data-project="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(choices.sort(), Object.keys(projects).sort(), 'El índice debe corresponder a los proyectos documentados.');
const mapMarkup = html;
for (const id of ['map-caption', 'project-map', 'component-heading', 'component-copy']) {
  assert.match(mapMarkup, new RegExp(`\\bid="${id}"`), `Falta el ancla de integración ${id}.`);
}
assert.match(mapMarkup, /<marker\b[^>]*id="atlas-arrow"[^>]*markerUnits="userSpaceOnUse"/);
assert.equal([...mapMarkup.matchAll(/data-component="([^"]+)"/g)].length, 6, 'El fragmento debe incluir los seis nodos iniciales de Pelotita.');
const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(config.outputDirectory, 'dist');
assert.equal(config.buildCommand, 'npm run build');
console.log(`Verificación OK: idioma, SEO, IDs, anclas, ${assets} recursos locales, enlaces externos, grafos, sintaxis JS y Vercel.`);
