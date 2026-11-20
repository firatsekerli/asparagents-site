import { readFileSync } from 'node:fs';
import { site, services, references, reviews, worldwide } from './site.mjs';

// asparagents.com layout. The look follows the asparagents WordPress site (Firat, 20.11.2026: keep the look and
// colours of asparagents): navy and blue on white and light grey, Arial, centred sections, white cards with soft
// shadows, blue buttons, small red labels, a full-screen navy hero over the code photo on the home page.
// Styles: assets/css/site.css. Script: assets/js/site.js (menu, FAQ, consent, forms).

const logoSvg = readFileSync(new URL('../assets/img/logo-white.svg', import.meta.url), 'utf8')
  .trim()
  .replace(/fill="#fff"/g, 'fill="currentColor"');
const logo = (w, h, extra = '') => logoSvg.replace('<svg ', `<svg width="${w}" height="${h}" aria-hidden="true" focusable="false"${extra} `);

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

export const orgId = `${site.url}/#organization`;
export const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: site.name,
  legalName: site.legalName,
  url: `${site.url}/`,
  logo: `${site.url}/assets/img/logo-schema.png`,
  email: site.email,
  telephone: site.phone.replace(/\s/g, ''),
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
  sameAs: site.sameAs,
  founder: { '@type': 'Person', '@id': `${site.url}/about-us/#person`, name: 'Fırat Şekerli', url: 'https://www.linkedin.com/in/firatsekerli/' },
  areaServed: worldwide.map((c) => c.code),
  knowsLanguage: ['en', 'tr'],
};
const breadcrumbLd = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${site.url}${c.path}` })),
});

// <img> for WebP files /assets/img/<base>-<width>.webp
export const img = ({ base, widths, alt, w, h, cls = '', lazy = true, sizes = '100vw' }) =>
  `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${base}-${widths[widths.length - 1]}.webp" srcset="${widths.map((x) => `/assets/img/${base}-${x}.webp ${x}w`).join(', ')}" sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;

export const REF_WIDTHS = [360, 420, 460, 520, 640, 760, 900, 1200];
export const refShot = (key, alt, sizes = '(min-width: 1024px) 30vw, 90vw', suffix = '') => img({ base: `ref-${key}${suffix}`, widths: REF_WIDTHS, alt, w: 1200, h: 1920, sizes });
export const deskPhoto = (alt = 'A team working together around a wooden table with laptops and notebooks', sizes = '(min-width: 1024px) 40vw, 90vw') =>
  img({ base: 'team-desk', widths: [480, 720, 1000, 1220], w: 1220, h: 1828, alt, sizes });

const svg = (vb, body, size = 24) => `<svg aria-hidden="true" focusable="false" viewBox="${vb}" width="${size}" height="${size}">${body}</svg>`;
const stroke = (d, size = 24) => svg('0 0 24 24', `<path d="${d}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`, size);
export const icon = {
  check: svg('0 0 24 24', '<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>', 18),
  pm: svg('0 0 24 24', '<path d="M4 12h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path class="pm-v" d="M12 4v16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>', 18),
  star: svg('0 0 20 20', '<path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" fill="currentColor"/>', 20),
  wrench: stroke('M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z'),
  web: stroke('M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01'),
  seo: stroke('M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5'),
  pin: stroke('M12 21s-7-7.6-7-12a7 7 0 0 1 14 0c0 4.4-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'),
  ai: stroke('M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z'),
  social: stroke('M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4'),
  code: stroke('M8 7l-5 5 5 5M16 7l5 5-5 5'),
  layers: stroke('M12 3l9 5-9 5-9-5zM3 13l9 5 9-5'),
  plug: stroke('M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5'),
  users: stroke('M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 20v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'),
  clock: stroke('M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2'),
  shield: stroke('M12 2l8 3v6c0 5-3.5 9.3-8 11-4.5-1.7-8-6-8-11V5z'),
  chat: stroke('M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z'),
  globe: stroke('M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20'),
  report: stroke('M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h8M9 9h3'),
  moon: stroke('M20.2 14.6A8.3 8.3 0 0 1 9.4 3.8a8.3 8.3 0 1 0 10.8 10.8z'),
  phone: stroke('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'),
  mail: stroke('M3 5h18v14H3zM3 7l9 6 9-6'),
  whatsapp: svg('0 0 32 32', '<path d="M27.3 4.7A15.8 15.8 0 0 0 2.2 23.8L0 32l8.4-2.2a15.8 15.8 0 0 0 7.6 1.9 15.9 15.9 0 0 0 11.3-27zM16 29a13.2 13.2 0 0 1-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5A13.2 13.2 0 1 1 16 29zm7.3-9.8c-.4-.2-2.3-1.2-2.7-1.3s-.6-.2-.9.2-1 1.3-1.3 1.6-.5.3-.9.1a10.8 10.8 0 0 1-5.4-4.7c-.4-.7.4-.6 1.2-2.1a.8.8 0 0 0 0-.7c0-.2-.9-2.2-1.2-2.9s-.6-.7-.9-.7h-.8a1.4 1.4 0 0 0-1 .5 4.4 4.4 0 0 0-1.4 3.3 7.7 7.7 0 0 0 1.6 4.1 17.6 17.6 0 0 0 6.8 6c2.5 1.1 3.5 1.2 4.8 1a4.1 4.1 0 0 0 2.7-1.9 3.3 3.3 0 0 0 .2-1.9c-.1-.2-.4-.3-.7-.5z" fill="currentColor"/>', 22),
};

// "[[word]]" in a heading becomes the blue accent.
export const tt = (s) => s.replace(/\[\[(.+?)\]\]/g, '<span class="hl">$1</span>');

export const button = (href, label, variant = '', extra = '') => `<a class="btn${variant ? ` btn-${variant}` : ''}" href="${href}"${extra}>${label}</a>`;
export const buttons = (...list) => `<div class="btns">${list.filter(Boolean).map(([href, label, variant, extra]) => button(href, label, variant, extra)).join('')}</div>`;
export const ctaRow = (label = 'Get a Quote', href = '/contact/') => buttons([href, label], [site.whatsapp, 'WhatsApp', 'soft', ' target="_blank" rel="noopener"']);

export const label = (t) => (t ? `<p class="label">${t}</p>` : '');
export const head = (tag, title, { h = 'h2', intro = '', left = false } = {}) =>
  `<div class="sec-head${left ? ' left' : ''}">${label(tag)}<${h} class="h2">${tt(title)}</${h}>${intro ? `<div class="sec-intro">${intro.startsWith('<') ? intro : `<p>${intro}</p>`}</div>` : ''}</div>`;

// A page section: centred container, optional heading. tone: white | light | blue | navy
export const section = ({ tag = '', title = '', intro = '', body = '', tone = 'white', id = '', cls = '', h = 'h2', left = false }) =>
  `<section class="sec tone-${tone}${cls ? ` ${cls}` : ''}"${id ? ` id="${id}"` : ''}><div class="wrap">${title ? head(tag, title, { h, intro, left }) : ''}${body}</div></section>`;

export const checklist = (items, cls = '') => `<ul class="checklist${cls ? ` ${cls}` : ''}">${items.map((t) => `<li><span class="ck">${icon.check}</span><span>${t}</span></li>`).join('')}</ul>`;

// White cards in a grid. item: { icon?, num?, title, text?, list?, href?, linkText? }
export const cards = (items, { cols = 3, cls = '' } = {}) =>
  `<div class="cards c${cols}${cls ? ` ${cls}` : ''}">${items
    .map(
      (it) => `<div class="card">
    ${it.num ? `<span class="card-num" data-n="${it.num}" aria-hidden="true"></span>` : ''}
    ${it.icon ? `<span class="card-icon">${icon[it.icon] || it.icon}</span>` : ''}
    <h3 class="card-title">${it.href ? `<a href="${it.href}">${it.title}</a>` : it.title}</h3>
    ${it.text ? `<p>${it.text}</p>` : ''}
    ${it.list ? checklist(it.list, 'small') : ''}
    ${it.chips ? `<ul class="chips">${it.chips.map((c) => `<li>${c}</li>`).join('')}</ul>` : ''}
    ${it.href && it.linkText ? `<a class="card-link" href="${it.href}">${it.linkText}</a>` : ''}
  </div>`
    )
    .join('')}</div>`;

export const steps = (items) => cards(items.map(([title, text], i) => ({ num: String(i + 1).padStart(2, '0'), title, text })), { cls: 'steps' });

export const listedServices = services.filter((s) => s.listed !== false);
export const serviceCards = (list = listedServices) =>
  cards(list.map((s) => ({ icon: s.icon, title: s.card?.title || s.name, text: s.card?.text || s.strip, href: `/services/${s.slug}/`, linkText: 'Learn more' })), { cols: 3, cls: 'services' });

// Two columns: rounded image + text.
export const twoCol = ({ media, html, reverse = false, cls = '' }) =>
  `<div class="two${reverse ? ' rev' : ''}${cls ? ` ${cls}` : ''}"><div class="two-media">${media}</div><div class="two-text">${html}</div></div>`;

// Top of an inner page: light band; with an image it is a two-column intro like the old About page.
export const pageHead = ({ tag = '', title, intro = '', actions = '', media = '', h = 'h1', mediaRight = false }) =>
  `<section class="page-head${media ? ' has-media' : ''}"><div class="wrap">${
    media
      ? twoCol({ media, reverse: mediaRight, html: `${label(tag)}<${h} class="h1">${tt(title)}</${h}>${intro ? `<div class="lead">${intro.startsWith('<') ? intro : `<p>${intro}</p>`}</div>` : ''}${actions}` })
      : `<div class="page-head-in">${label(tag)}<${h} class="h1">${tt(title)}</${h}>${intro ? `<div class="lead">${intro.startsWith('<') ? intro : `<p>${intro}</p>`}</div>` : ''}${actions}</div>`
  }</div></section>`;

// Home hero: full screen, navy over the code photo, the white logo above the heading.
export const homeHero = ({ tag, title, intro, actions, trust }) => `
<section class="hero">
  <picture class="hero-bg" aria-hidden="true"><img src="/assets/img/hero-code-1920.webp" srcset="/assets/img/hero-code-800.webp 800w, /assets/img/hero-code-1200.webp 1200w, /assets/img/hero-code-1920.webp 1920w" sizes="100vw" alt="" width="1920" height="960" fetchpriority="high"></picture>
  <div class="hero-in">
    ${label(tag)}
    <h1 class="hero-title">${tt(title)}</h1>
    <p class="hero-lead">${intro}</p>
    ${actions}
    ${trust ? `<ul class="hero-trust">${trust.map(([ic, t]) => `<li><span class="ht-icon">${icon[ic]}</span>${t}</li>`).join('')}</ul>` : ''}
  </div>
</section>`;

// FAQ: heading and a highlight on the left, accordion on the right (the old asparagents FAQ block).
export const faqList = (items) => ({
  html: `<div class="faq">${items
    .map((f, i) => `<details${i === 0 ? ' open class="is-open"' : ''}><summary><span>${esc(f.q)}</span><i class="pm">${icon.pm}</i></summary><div class="faq-a"><div class="faq-in">${f.a}</div></div></details>`)
    .join('')}</div>`,
  ld: { '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })) },
});
export const faqBand = (items, { title = 'Answers to Frequently Asked Questions', intro = 'You can find answers to some of the most frequently asked questions here, so feel free to send us a message if you do not find what you are looking for.', aside, cta = ctaRow(), tone = 'light' } = {}) => {
  const f = faqList(items);
  const side = aside || { icon: 'moon', title: 'Quick WordPress Support', text: 'We reply to every message within 12 hours, in English or Turkish, and you deal with one person from start to finish.' };
  return {
    html: `<section class="sec tone-${tone}"><div class="wrap faq-grid">
  <div class="faq-side"><h2 class="h2">${tt(title)}</h2><p>${intro}</p>
    <div class="feature"><span class="feature-icon">${icon[side.icon]}</span><div><h3>${side.title}</h3><p>${side.text}</p></div></div>
    ${cta}</div>
  <div class="faq-col">${f.html}</div>
</div></section>`,
    ld: f.ld,
  };
};

// Blue band with review cards: stars, the review word for word, initials, name and month of the Google review.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthYear = (d) => `${MONTHS[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;
const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
const quoteMark = '<svg class="q-mark" aria-hidden="true" focusable="false" viewBox="0 0 48 36" width="48" height="36"><path d="M0 36V22C0 9.6 6.4 2.3 19.2 0l2 4.6C14 6.6 10.6 10.6 10.2 17H19v19zm27 0V22C27 9.6 33.4 2.3 46.2 0l1.8 4.6C41 6.6 37.6 10.6 37.2 17H46v19z" fill="currentColor"/></svg>';
export const reviewsBand = ({ list = reviews, extra = '' } = {}) => `
<section class="sec tone-blue reviews" aria-labelledby="reviews-title"><div class="wrap">
  <div class="sec-head">
    <p class="label">Testimonials</p>
    <h2 class="h2" id="reviews-title">${tt('What Our Clients [[Say]]')}</h2>
    <div class="reviews-badge"><span class="stars" role="img" aria-label="5 out of 5 stars">${icon.star.repeat(5)}</span><span>Reviews from our Google profile</span></div>
  </div>
  <div class="quotes">${list
    .map(
      (r) => `<figure class="quote">${quoteMark}<blockquote><p>${esc(r.text)}</p></blockquote><figcaption><span class="q-avatar" aria-hidden="true">${esc(initials(r.name))}</span><span><b>${esc(r.name)}</b><small>Google review, ${monthYear(r.date)}</small></span></figcaption></figure>`
    )
    .join('')}</div>
  <p class="reviews-note">${site.reviewsNote}</p>
  ${extra}
</div></section>`;

// References: a browser frame with the home page and one inner page beside the name, place, sector, the short
// case text and links to the case page and the live site. Every second one is mirrored.
const browser = (inner, cls = '') => `<span class="browser${cls ? ` ${cls}` : ''}"><span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></span><span class="browser-shot">${inner}</span></span>`;
export const refGrid = (list = references, { h = 'h3' } = {}) =>
  `<div class="showcase">${list
    .map(
      (r, i) => `<article class="show${i % 2 ? ' rev' : ''}">
    <a class="show-media" href="/references/${r.detail}/" tabindex="-1" aria-hidden="true">
      ${browser(refShot(r.key, '', '(min-width: 1024px) 40vw, 90vw'), 'main')}
      ${browser(refShot(r.key, '', '(min-width: 1024px) 14vw, 30vw', '-a'), 'side side-a')}
    </a>
    <div class="show-text">
      <p class="show-tags"><span>${esc(r.type)}</span><span>${esc(r.sector)}</span><span>${esc(r.place)}</span></p>
      <${h} class="show-title"><a href="/references/${r.detail}/">${esc(r.name)}</a></${h}>
      <p>${esc(r.text)}</p>
      ${buttons([`/references/${r.detail}/`, 'View the Project'], [r.url, 'Visit the Live Site', 'soft', ' target="_blank" rel="noopener"'])}
    </div>
  </article>`
    )
    .join('')}</div>`;

// Countries of partner agencies and clients (counts only, never names).
export const worldList = () => {
  const sum = (k) => worldwide.reduce((n, c) => n + c[k], 0);
  const count = (n, one, many) => (n ? `<span><b>${n}</b> ${n === 1 ? one : many}</span>` : '');
  return `<div class="world">
  <div class="world-stats"><div><span class="ws-icon">${icon.globe}</span><b><span class="js-count" data-to="${worldwide.length}">${worldwide.length}</span>+</b><span>countries</span></div><div><span class="ws-icon">${icon.users}</span><b><span class="js-count" data-to="${sum('agencies')}">${sum('agencies')}</span>+</b><span>partner agencies</span></div><div><span class="ws-icon">${icon.web}</span><b><span class="js-count" data-to="${sum('clients')}">${sum('clients')}</span>+</b><span>clients abroad</span></div></div>
  <ul class="world-list">${worldwide.map((c) => `<li><span class="code" aria-hidden="true">${c.code}</span><span class="name">${esc(c.name)}</span><span class="count">${count(c.agencies, 'partner agency', 'partner agencies')}${count(c.clients, 'client', 'clients')}</span></li>`).join('')}</ul>
</div>`;
};
export const worldBand = (tone = 'white') =>
  section({
    tone,
    tag: 'Where We Work',
    title: 'Fully Remote, [[Worldwide]]',
    intro: 'We work fully remotely from Ankara, Türkiye. Agencies in the United Kingdom, the United States, Austria, South Africa and the Netherlands trust us with work for their clients, and we also work directly with businesses in the United Kingdom, the United States and Ireland. We never name the agencies we work for: white label work stays white label.',
    body: worldList(),
  });

// Contact form. Posts to /api/form (functions/api/form.js).
const micIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg>';
const req = '<span class="req" aria-hidden="true">*</span>';
export const formBlock = ({ heading = 'Send us a message' } = {}) => {
  const f = (lab, input, wide = false) => `<label class="field${wide ? ' wide' : ''}"><span>${lab}</span>${input}</label>`;
  return `<form class="form" data-form="iletisim" novalidate>
  ${heading ? `<h2 class="form-title">${heading}</h2>` : ''}
  <div class="form-grid">
    ${f(`Full Name ${req}`, '<input type="text" name="name" autocomplete="name" placeholder="Your full name" required>')}
    ${f(`Email ${req}`, '<input type="email" name="email" autocomplete="email" placeholder="Your email address" required>')}
    ${f('Phone (optional)', '<input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+44 or +1 …">')}
    ${f('Company or Agency (optional)', '<input type="text" name="company" autocomplete="organization" placeholder="Your company or agency name">')}
    ${f(`How can we help? ${req}`, '<textarea name="message" rows="5" placeholder="A WordPress issue to fix, a plugin question, a new website or white label work for your agency" required data-voice-alt></textarea>', true)}
    <div class="field wide voice" data-voice>
      <span>Prefer not to type? Leave a voice message.</span>
      <div class="voice-row">
        <button type="button" class="voice-btn" data-voice-rec>${micIcon}<b>Start Recording</b></button>
        <span class="voice-time" data-voice-time hidden>0:00 / 2:00</span>
        <audio class="voice-audio" data-voice-audio controls preload="metadata" hidden></audio>
        <button type="button" class="voice-del" data-voice-del hidden>Delete recording</button>
      </div>
      <small class="voice-note" data-voice-note>Up to 2 minutes. You can listen to or delete the recording before sending.</small>
    </div>
  </div>
  <label class="hp" aria-hidden="true">Leave this field empty<input type="text" name="fax" tabindex="-1" autocomplete="off"></label>
  <label class="check"><input type="checkbox" name="privacy" value="1" required><span>I have read the <a href="/privacy-policy/" target="_blank">Privacy Policy</a>. ${req}</span></label>
  <button class="btn" type="submit">Send Message</button>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>`;
};

// Navy call-to-action band at the bottom of every page except Contact.
const ctaBand = () => `
<section class="sec tone-navy cta-band"><div class="wrap">
  <h2 class="h2">Tell Us <span class="hl">What You Need</span></h2>
  <p>A WordPress issue to fix, a question about one of our plugins, a new website or white label work for your agency. We reply to every message within 12 hours, in English or Turkish.</p>
  ${buttons(['/contact/', 'Get in Touch'], [site.whatsapp, 'WhatsApp Us', 'soft', ' target="_blank" rel="noopener"'])}
  <p class="cta-mail"><a href="mailto:${site.email}">${site.email}</a></p>
</div></section>`;

const menu = [
  { href: '/services/', label: 'Services' },
  { href: '/white-label/', label: 'White Label' },
  { href: '/plugins/', label: 'Plugins' },
  { href: '/prices/', label: 'Prices' },
  { href: '/references/', label: 'References' },
  { href: '/blog/', label: 'Blog' },
];

const header = (path) => `
<a class="skip" href="#content">Skip to content</a>
<header class="site-header${path === '/' ? ' over-hero' : ''}"><div class="header-in">
  <a class="logo" href="/" aria-label="asparagents home page">${logo(104, 60)}</a>
  <nav id="site-menu" class="site-menu" aria-label="Main menu">
    <ul>${menu.map((m) => `<li><a href="${m.href}">${m.label}</a></li>`).join('')}</ul>
    <div class="menu-btns">${button('/contact/', 'Contact', 'sm')}${button(site.shop, 'Shop', 'sm soft')}</div>
  </nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu"><span class="sr">Menu</span><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
</div></header>`;

const footer = ({ contact = true } = {}) => `
${contact ? ctaBand() : ''}
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="footer-logo" href="/" aria-label="asparagents home page">${logo(132, 76)}</a>
      <p>WordPress support, WordPress websites and white label SEO, GEO and social media for agencies. Fully remote from Ankara, Türkiye.</p>
      <div class="footer-social">
        <a href="${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon.whatsapp}</a>
        <a href="mailto:${site.email}" aria-label="Email">${icon.mail}</a>
        <a href="https://www.linkedin.com/in/firatsekerli/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="20" height="20"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" fill="currentColor"/></svg></a>
      </div>
    </div>
    <nav class="footer-col" aria-label="Services">
      <h2>Services</h2>
      <ul>${services.map((s) => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join('')}<li><a href="/white-label/">White Label &amp; Outsourcing</a></li></ul>
    </nav>
    <nav class="footer-col" aria-label="Company">
      <h2>Company</h2>
      <ul><li><a href="/about-us/">About Us</a></li><li><a href="/references/">References</a></li><li><a href="/prices/">Prices</a></li><li><a href="/plugins/">Plugins</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contact</a></li></ul>
    </nav>
    <div class="footer-col">
      <h2>Get in Touch</h2>
      <ul class="footer-contact">
        <li><a href="mailto:${site.email}">${icon.mail}<span>${site.email}</span></a></li>
        <li><a href="${site.phoneHref}">${icon.phone}<span>${site.phone}</span></a></li>
        <li><span>${icon.clock}<span>Replies within 12 hours</span></span></li>
      </ul>
      ${button(site.shop, 'Visit the Shop', 'sm')}
    </div>
  </div>
  <div class="footer-bottom"><div class="wrap footer-bottom-in">
    <p>© ${site.year} asparagents</p>
    <nav class="footer-legal" aria-label="Legal">
      <a href="/privacy-policy/">Privacy Policy</a>
      <a href="/cookie-policy-eu/">Cookie Policy</a>
      <button type="button" class="linklike" data-consent-open>Cookie Settings</button>
      <a href="https://asparajans.com/" hreflang="tr" lang="tr">Türkçe: asparajans</a>
    </nav>
  </div></div>
</footer>
<a class="wa-float" href="${site.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon.whatsapp}</a>
<div class="consent" role="dialog" aria-live="polite" aria-label="Cookie settings" hidden>
  <p>We value your privacy. Besides necessary cookies, we use analytics and advertising cookies to measure visits and ads only with your consent. <a href="/cookie-policy-eu/">Cookie Policy</a></p>
  <div class="consent-actions"><button type="button" class="btn btn-soft btn-sm" data-consent="denied">Reject</button><button type="button" class="btn btn-sm" data-consent="granted">Accept</button></div>
</div>
<script>(function(b){var c;try{c=localStorage.getItem('ag-consent')}catch(e){}if(!c)b.hidden=false})(document.currentScript.previousElementSibling)</script>`;

// page: { path, title, description, body, crumbs?, schema?: [], ogImage?, noindex?, type?, contact? }
// Scroll animations: these blocks fade and rise into view (site.js adds "in"). Added here so every page gets them.
const RV = /class="(card|sec-head(?: left)?|two-media|two-text|show(?: rev)?|quote|price-card|feat|demo|footer-brand|footer-col|faq-side|faq-col|world-stats|world-list|cta-band-in|refs|reviews-badge)"/g;
const rvAdd = (html) => html.replace(RV, (m, c) => `class="${c} rv${c === 'two-media' || c === 'demo' ? ' rv-z' : ''}"`);
// The first section (hero or page head) has its own entrance animation, so the scroll animation starts after it.
const reveal = (html) => {
  const i = /^\s*<section class="(hero|page-head)/.test(html) ? html.indexOf('</section>') : -1;
  return i < 0 ? rvAdd(html) : html.slice(0, i) + rvAdd(html.slice(i));
};

export const render = (page) => {
  const canonical = `${site.url}${page.path}`;
  const graph = [organization, { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: site.name, inLanguage: 'en', publisher: { '@id': orgId } }];
  if (page.crumbs) graph.push(breadcrumbLd([{ name: 'Home', path: '/' }, ...page.crumbs]));
  if (page.schema) graph.push(...page.schema);
  const og = page.ogImage || '/assets/img/og-default.jpg';
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<script>document.documentElement.className='js'</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="${page.type || 'website'}">
<meta property="og:locale" content="en_GB">
<meta property="og:site_name" content="asparagents">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0a2060">
<link rel="icon" href="/assets/img/icon-32.png" sizes="32x32">
<link rel="icon" href="/assets/img/icon-192.png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/icon-180.png">
<link rel="stylesheet" href="/assets/css/site.css?v=${page.assetVersion}">
${ld({ '@context': 'https://schema.org', '@graph': graph })}
</head>
<body><!--email_off-->
${header(page.path)}
<main id="content">
${reveal(page.body)}
</main>
${reveal(footer({ contact: page.contact !== false }))}
<script src="/assets/js/site.js?v=${page.assetVersion}" defer></script>
<!--/email_off--></body>
</html>
`;
};

export { references, services, site };
