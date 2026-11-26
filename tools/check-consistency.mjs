// Site-wide consistency check (Firat 26.11.2026: a change must never leave the site saying two different things).
// Runs at the end of node build.mjs on the built dist/ folder and stops the build when:
// - a plan name is followed in the same sentence by a price that is not the plan's price in src/prices.mjs,
// - the bundle, the plugin price or a fact from src/facts.mjs is stated with another value,
// - a {{price:...}} or {{fact:...}} placeholder was left unfilled.
// Also usable on its own: node tools/check-consistency.mjs (after a build).
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { planNames, priceOf, bundle, plugin } from '../src/facts.mjs';

const MONEY = /[$£€]\s?([0-9][0-9,]*)/;
const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;|’/g, "'")
    .replace(/\s+/g, ' ');

// Sentences, cut at full stops, line breaks between cards and headings (the text of two cards must not run together).
const sentences = (t) => t.split(/(?<=[.!?])\s+|\s{2,}|\s(?=Get a Quote|Buy in the Shop|All prices)/);

export function checkText(t, where) {
  const problems = [];
  const say = (msg, s) => problems.push(`${where}: ${msg}: "${s.trim().slice(0, 160)}"`);
  if (/\{\{(price|fact):/.test(t)) say('unfilled placeholder', t.match(/.{0,40}\{\{(price|fact):[^}]*\}\}.{0,40}/)[0]);
  const names = Object.entries(planNames).flatMap(([id, list]) => list.map((n) => ({ id, n })));
  names.sort((a, b) => b.n.length - a.n.length);
  for (let s of sentences(t)) {
    // the bundle: "$345 a month (instead of $394)" and "both services together $345"
    const b = s.match(/[$£€]\s?([0-9][0-9,]*) a month\s*\(\s*instead of [$£€]\s?([0-9][0-9,]*)\s*\)/);
    if (b) {
      if (+b[1].replace(/,/g, '') !== bundle.usd || +b[2].replace(/,/g, '') !== bundle.fullUsd) say(`bundle should be $${bundle.usd} instead of $${bundle.fullUsd}`, s);
      s = s.replace(b[0], ' ').replace(/With (SEO, Local SEO and GEO|social media management):/i, ' ');
    }
    const t2 = s.match(/together [$£€]\s?([0-9][0-9,]*)/);
    if (t2) {
      if (+t2[1].replace(/,/g, '') !== bundle.usd) say(`bundle should be $${bundle.usd}`, s);
      s = s.replace(t2[0], ' ');
    }
    if (plugin) {
      const pm = s.match(new RegExp(plugin.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[^$£€]{0,60}?[$£€]\\s?([0-9][0-9,]*)'));
      if (pm) {
        if (+pm[1].replace(/,/g, '') !== plugin.priceUsd) say(`${plugin.name} should be $${plugin.priceUsd}`, s);
        s = s.replace(pm[0], ' ');
      }
    }
    // plan name, then the first amount after it with no other plan name in between
    const hits = [];
    for (const { id, n } of names) {
      let i = -1;
      while ((i = s.indexOf(n, i + 1)) !== -1) if (!hits.some((h) => i >= h.i && i < h.i + h.n.length)) hits.push({ id, n, i });
    }
    hits.sort((a, b) => a.i - b.i);
    hits.forEach((h, k) => {
      const end = k + 1 < hits.length ? hits[k + 1].i : s.length;
      const seg = s.slice(h.i + h.n.length, end);
      const mm = seg.match(MONEY);
      if (!mm) return;
      const before = seg.slice(0, mm.index);
      if (before.length > 110) return; // too far away to be this plan's price
      if (/\b(Workers|Cloudflare|domain|plan from|from \$5)\b/i.test(before)) return; // third-party costs
      const v = +mm[1].replace(/,/g, '');
      const want = priceOf(h.id);
      if (want != null && v !== want) say(`${h.n} should be $${want}, found ${mm[0].trim()}`, s);
    });
    // facts
    const fix = s.match(/free[^.]{0,60}?up to (\d+) minutes|(\d+) minutes[^.]{0,40}free/i);
    if (fix && +(fix[1] || fix[2]) !== 30) say('free fix limit should be 30 minutes', s);
    const since = s.match(/(?:Developer|developer|building websites|WordPress)[^.]{0,30}\b[Ss]ince (20\d\d)/);
    if (since && since[1] !== '2013') say('the start year should be 2013', s);
    const hp = s.match(/(\d+) homepage designs/);
    if (hp && hp[1] !== '2' && !/selected/i.test(s)) say('Irish leads get 2 homepage designs', s);
    const rf = s.match(/(\d+)-day refund/);
    if (rf && rf[1] !== '7') say('plugin refund is 7 days', s);
  }
  return problems;
}

export async function checkDist(dist) {
  const problems = [];
  const walk = async (d) => {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) await walk(f);
      else if (e.name.endsWith('.html') || e.name === 'llms.txt') {
        const raw = await readFile(f, 'utf8');
        problems.push(...checkText(e.name.endsWith('.html') ? text(raw) : raw.replace(/\s+/g, ' '), path.relative(dist, f)));
      }
    }
  };
  await walk(dist);
  return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const dist = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../dist');
  const p = await checkDist(dist);
  if (p.length) {
    console.error(`Consistency check failed (${p.length}):\n` + p.join('\n'));
    process.exit(1);
  }
  console.log('Consistency check passed');
}
