// asparagents.com static build: node build.mjs -> dist/
// No dependencies. Cloudflare Pages project "asparagents-site": build command "node build.mjs", output directory "dist".
// Only the images a page uses are copied from assets/img, so dist stays small.
import { readdir, mkdir, writeFile, cp, rm, readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { render, esc } from './src/layout.mjs';
import { site } from './src/site.mjs';
import { pendingPrices } from './src/prices.mjs';
import { fill } from './src/facts.mjs';
import { checkDist } from './tools/check-consistency.mjs';

const root = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(root, 'dist');
const exists = (p) => access(p).then(() => true, () => false);

const loadDir = async (dir) => {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.mjs')).sort();
  return Promise.all(files.map(async (f) => (await import(pathToFileURL(path.join(dir, f)).href)).default));
};

const ownImg = path.join(root, 'assets/img');
const cssSrc = path.join(root, 'assets/css/site.css');
const jsSrc = path.join(root, 'assets/js/site.js');

const hash = createHash('sha1');
for (const f of [cssSrc, jsSrc]) hash.update(await readFile(f));
const assetVersion = hash.digest('hex').slice(0, 8);

// ---- Blog posts --------------------------------------------------------------------------------------------
// 1) content/articles/<slug>/post.json: articles from the Publisher agent (the format the WordPress blog used). Optional "date" (YYYY-MM-DD); the first three got theirs from WordPress below.
// 2) content/legacy/*.mjs: older WordPress posts, moved as they were.
const wpDates = {
  'white-label-seo-for-small-web-design-studios': '2026-10-27',
  'white-label-social-media-management-for-small-web-studios': '2026-11-03',
  'white-label-geo-and-local-seo-for-small-agencies': '2026-11-12',
};
const meta = (text) => (text.length > 155 ? text.slice(0, 152).replace(/\s+\S*$/, '') + '…' : text);
const COVER_WIDTHS = [420, 520, 640, 760, 900, 1200];

const coverFor = async (slug, alt, i) =>
  (await exists(path.join(ownImg, `cover-${slug}-1200.webp`)))
    ? { image: { base: `cover-${slug}`, widths: COVER_WIDTHS, w: 1200, h: 1200, alt }, ogImage: (await exists(path.join(ownImg, `og-cover-${slug}.jpg`))) ? `/assets/img/og-cover-${slug}.jpg` : undefined }
    : { image: { base: 'hero-code', widths: [800, 1200, 1920], w: 1920, h: 960, alt: 'Code on a computer screen' } };

const posts = [];
const articleDir = path.join(root, 'content/articles');
for (const slug of (await readdir(articleDir)).sort()) {
  const f = path.join(articleDir, slug, 'post.json');
  if (!(await exists(f))) continue;
  const p = JSON.parse(await readFile(f, 'utf8'));
  if (!/^[a-z0-9-]+$/.test(p.slug || '')) throw new Error(`${f}: bad slug`);
  const date = p.date || wpDates[p.slug];
  if (!date) console.warn(`WARNING ${p.slug}: no date in post.json`);
  posts.push({ path: `/${p.slug}/`, h1: p.title, title: `${p.title} | asparagents`, description: meta(p.excerpt), excerpt: p.excerpt, date, updated: p.updated, label: 'Guide', body: fill(p.content, f), ...(await coverFor(p.slug, p.image_alt || '', posts.length)) });
}
for (const p of await loadDir(path.join(root, 'content/legacy'))) {
  posts.push({ path: `/${p.slug}/`, h1: p.title, title: `${p.title} | asparagents`, description: meta(p.excerpt), excerpt: p.excerpt, date: p.date, updated: p.updated, label: 'WordPress', body: fill(p.content, p.slug), ...(await coverFor(p.slug, '', posts.length)) });
}
posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

// ---- Pages -------------------------------------------------------------------------------------------------
const pageModules = await loadDir(path.join(root, 'src/pages'));
const pages = pageModules.flatMap((m) => [].concat(typeof m === 'function' ? m({ posts }) : m));

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets/img'), { recursive: true });
await mkdir(path.join(dist, 'assets/css'), { recursive: true });
await mkdir(path.join(dist, 'assets/js'), { recursive: true });
await cp(jsSrc, path.join(dist, 'assets/js/site.js'));

const imgPath = async (f) => ((await exists(path.join(ownImg, f))) ? path.join(ownImg, f) : null);
const fingerprints = new Map();
const fp = async (u) => {
  if (fingerprints.has(u)) return fingerprints.get(u);
  const [, dir, f] = u.match(/^\/assets\/(img|fonts)\/(.+)$/);
  const src = dir === 'img' ? await imgPath(f) : null;
  if (!src || !(await exists(src))) throw new Error(`Missing file: ${u}`);
  const h = createHash('sha1').update(await readFile(src)).digest('hex').slice(0, 8);
  if (dir === 'img') await cp(src, path.join(dist, 'assets/img', f));
  fingerprints.set(u, h);
  return h;
};
const fingerprint = async (text) => {
  const urls = [...new Set(text.match(/\/assets\/(?:img|fonts)\/[\w.-]+\.(?:webp|png|jpe?g|svg|ico|woff2)(?![\w?])/g) || [])];
  for (const u of urls) await fp(u);
  return text.replace(/\/assets\/(?:img|fonts)\/[\w.-]+\.(?:webp|png|jpe?g|svg|ico|woff2)(?![\w?])/g, (u) => `${u}?v=${fingerprints.get(u)}`);
};

const css = await fingerprint(await readFile(cssSrc, 'utf8'));
await writeFile(path.join(dist, 'assets/css/site.css'), css);
const inlineCss = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').trim();

const seen = new Set();
for (const p of pages) {
  if (seen.has(p.path)) throw new Error(`Duplicate path: ${p.path}`);
  seen.add(p.path);
  const out = p.path === '/404.html' ? path.join(dist, '404.html') : path.join(dist, p.path, 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  const html = (await fingerprint(render({ ...p, assetVersion }))).replace(/<link rel="stylesheet" href="\/assets\/css\/site\.css\?v=\w+">/, () => `<style>${inlineCss}</style>`);
  if (!html.includes('<style>')) throw new Error(`Stylesheet not inlined on ${p.path}`);
  if (/[–—]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) console.warn(`WARNING ${p.path}: contains an en or em dash`);
  await writeFile(out, html);
}
await fp('/assets/img/og-default.jpg');

for (const f of ['_headers', '_redirects', '_routes.json', 'robots.txt']) await cp(path.join(root, 'public', f), path.join(dist, f));
// llms.txt may use {{price:...}} and {{fact:...}} like the posts (src/facts.mjs), so its prices never go out of date.
await writeFile(path.join(dist, 'llms.txt'), fill(await readFile(path.join(root, 'public/llms.txt'), 'utf8'), 'public/llms.txt'));

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => !p.noindex && p.path.endsWith('/'))
  .map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${p.updated || today}</lastmod></url>`)
  .join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const pending = pendingPrices();
if (pending.length) console.warn(`WARNING prices not given yet (shown as "Price on request"): ${pending.join(', ')}`);
// Site-wide consistency (tools/check-consistency.mjs): an old price or a fact stated two ways stops the build.
const inconsistent = await checkDist(dist);
if (inconsistent.length) throw new Error(`Consistency check failed (${inconsistent.length}), fix every place before merging:\n${inconsistent.join('\n')}`);
console.log(`Built ${pages.length} pages (${posts.length} posts, ${fingerprints.size} assets) into dist/, assets v${assetVersion}`);
