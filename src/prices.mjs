import { checklist, buttons, orgId, site, section } from './layout.mjs';

// asparagents.com prices in US dollars; shown with the local sign for the main markets (see m() below, Firat 22.11.2026). Every number must come from Firat (standing rule: never guess a price).
// null = not given yet: the card says "Price on request" and the build prints a warning, so a preview can be
// reviewed but nothing goes live with a guessed number. USD prices from Firat (21.11.2026), matched to the
// asparajans.com packages (bundle SEO + social $345 = same 12.5% discount as 17,500 TL instead of 20,000 TL): fix $27, website $447, shop $747 (raised 21.11.2026); WordPress website $547 and shop $847 from 23.11.2026, SEO/GEO $247 a month, social media $147 a month.
export const plans = [
  {
    id: 'one-time-wordpress-support',
    name: 'One-Time WordPress Support',
    sub: 'One issue, fixed',
    usd: 27,
    items: ['You describe one issue, in writing or with a short video', 'We back up your site before we change anything', 'We record our screen while we fix it', 'You pay after the fix, when you are happy'],
    cta: ['Buy in the Shop', `${site.shop}product/one-time-wordpress-support/`],
  },
  {
    id: 'wordpress-website',
    name: 'WordPress Website',
    sub: 'Business website, 5 to 10 pages, one-time',
    usd: 547,
    items: ['A WordPress website made for your business, 5 to 10 pages', 'Mobile-friendly and fast on every device', 'Technical and on-page SEO foundations from the start', 'Google Business Profile setup', 'A basic structure for AI visibility (GEO)', 'First year free: plugin updates and fixes for technical problems such as plugin conflicts'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    // Firat 23.11.2026: sell both. Built and hosted on Cloudflare, code in the client's own GitHub, form emails sent
    // with Resend, then handed over so the client's own AI assistant can keep it up to date. No free first year.
    // Price: the same as the WordPress website (Firat 23.11.2026).
    id: 'business-website',
    name: 'Business Website',
    sub: 'Fast website without WordPress, one-time',
    usd: 447,
    items: ['A website made for your business, pages agreed before we start', 'Very fast, hosted on Cloudflare: no hosting bill for a typical small business site', 'The code is yours, in your own GitHub account', 'Contact form messages straight to your inbox', 'Technical and on-page SEO, Google Business Profile setup and a basic structure for GEO', 'Handed over with a guide, so your own AI assistant can make updates', 'No plugins to update; fixes after handover are paid per fix'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'woocommerce-shop',
    name: 'WooCommerce Shop',
    sub: 'Online shop, unlimited products, one-time',
    usd: 847,
    items: ['Unlimited products, and we add your first 100', 'Payment setup included', 'Mobile-friendly and fast', 'Technical and on-page SEO foundations', 'Google Business Profile setup and a basic structure for GEO', 'First year free: plugin updates and fixes for technical problems such as plugin conflicts'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'seo-local-seo-geo',
    monthly: true,
    name: 'SEO, Local SEO and GEO',
    sub: 'Monthly service',
    usd: 247,
    note: 'With social media management: <b>$345 a month</b> <small>(instead of $394)</small>',
    items: ['Regular SEO: keyword and competitor tracking, a content plan', 'Google Business Profile management and review strategy', 'Tracking your visibility in ChatGPT and Google AI answers', 'Website maintenance included', 'A plain-language monthly report'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'social-media-management',
    monthly: true,
    name: 'Social Media Management',
    sub: 'Monthly service, Instagram',
    usd: 147,
    note: 'With SEO, Local SEO and GEO: <b>$345 a month</b> <small>(instead of $394)</small>',
    items: ['12 posts and 4 Reels a month', 'A content calendar, post designs and captions', 'Reels made from footage your business sends', 'Regular posting and a monthly report', 'Each extra platform (Facebook, LinkedIn) +20%', 'Ads management and ad budget not included'],
    cta: ['Get a Quote', '/contact/'],
  },
];

export const allPlans = () => plans;
export const byId = (id) => plans.find((p) => p.id === id);
export const pendingPrices = () => plans.filter((p) => p.usd == null).map((p) => p.name);

// Local currency (Firat 22.11.2026: "447 dollars becomes 447 euro"): the same number in the visitor's currency for
// the main markets, swapped at the edge by functions/_middleware.js. Amounts it may swap are wrapped in
// <span class="m">. Every plan on this page is swapped, One-Time WordPress Support included (Firat 22.11.2026); the
// plugin price on /plugins/ stays in US dollars. South Africa stays in US dollars (Firat 22.11.2026).
export const m = (n) => `<span class="m">$${n.toLocaleString('en-GB')}</span>`;
export const wrapMoney = (html) => html.replace(/\$([0-9][0-9,]*)/g, (_, n) => `<span class="m">$${n}</span>`);
const money = (n) => (n == null ? null : m(n));
const priceLine = (p) => {
  const parts = [money(p.usd)].filter(Boolean);
  if (!parts.length) return '<p class="price-num ask">Price on request</p>';
  return `<p class="price-num">${parts.join(' <small>/</small> ')}${p.monthly ? ' <small>a month</small>' : ''}</p>`;
};

export const offerLd = (p) => ({
  '@type': 'Service',
  name: p.name,
  serviceType: p.name,
  url: `${site.url}/prices/#${p.id}`,
  provider: { '@id': orgId },
  offers: [['usd', 'USD']].filter(([k]) => p[k] != null).map(([k, c]) => ({ '@type': 'Offer', price: p[k], priceCurrency: c, availability: 'https://schema.org/InStock', seller: { '@id': orgId } })),
});

export const priceCard = (p) => `<div class="price-card" id="${p.id}">
  <h3>${p.name}</h3><p class="price-sub">${p.sub}</p>
  ${priceLine(p)}
  ${checklist(p.items)}
  ${p.note ? `<p class="price-note">${wrapMoney(p.note)}</p>` : ''}
  ${buttons([p.cta[1], p.cta[0]])}
</div>`;

// One plan as a full-width band under the cards (One-Time WordPress Support on /prices/, Firat 23.11.2026:
// four columns were too narrow). Same look as the quick-band on the home and services pages.
export const priceStrip = (p, text) => `<div class="quick-band price-strip" id="${p.id}"><div><h3>${p.name}</h3><p>${text}</p></div><div class="strip-buy">${priceLine(p)}${buttons([p.cta[1], p.cta[0]])}</div></div>`;

// Blue band with white price cards (the old asparagents pricing block).
export const priceBand = (list, { tag = 'Prices', title = 'Clear and Transparent [[Prices]]', intro = '', id = 'pricing' } = {}) =>
  section({ tone: 'blue', tag, title, intro, id, body: `<div class="prices${list.length === 1 ? ' one' : ''}">${list.map(priceCard).join('')}</div>` });
