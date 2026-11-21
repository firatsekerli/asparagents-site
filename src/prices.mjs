import { checklist, buttons, orgId, site, section } from './layout.mjs';

// asparagents.com prices, in US dollars only (Firat 21.11.2026: one currency; we convert to the client's currency in the quote). Every number must come from Firat (standing rule: never guess a price).
// null = not given yet: the card says "Price on request" and the build prints a warning, so a preview can be
// reviewed but nothing goes live with a guessed number. USD prices from Firat (21.11.2026), matched to the
// asparajans.com packages: fix $27, website $247, shop $447, SEO/GEO $247 a month, social media $147 a month.
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
    usd: 247,
    items: ['A WordPress website made for your business, 5 to 10 pages', 'Mobile-friendly and fast on every device', 'Technical and on-page SEO foundations from the start', 'Google Business Profile setup', 'A basic structure for AI visibility (GEO)', 'Maintenance and support free for the first year'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'woocommerce-shop',
    name: 'WooCommerce Shop',
    sub: 'Online shop, unlimited products, one-time',
    usd: 447,
    items: ['Unlimited products, and we add your first 100', 'Payment setup included', 'Mobile-friendly and fast', 'Technical and on-page SEO foundations', 'Google Business Profile setup and a basic structure for GEO', 'Maintenance and support free for the first year'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'seo-local-seo-geo',
    monthly: true,
    name: 'SEO, Local SEO and GEO',
    sub: 'Monthly service',
    usd: 247,
    items: ['Regular SEO: keyword and competitor tracking, a content plan', 'Google Business Profile management and review strategy', 'Tracking your visibility in ChatGPT and Google AI answers', 'Website maintenance included', 'A plain-language monthly report'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'social-media-management',
    monthly: true,
    name: 'Social Media Management',
    sub: 'Monthly service, Instagram',
    usd: 147,
    items: ['12 posts and 4 Reels a month', 'A content calendar, post designs and captions', 'Reels made from footage your business sends', 'Regular posting and a monthly report', 'Each extra platform (Facebook, LinkedIn) +20%', 'Ads management and ad budget not included'],
    cta: ['Get a Quote', '/contact/'],
  },
];

export const allPlans = () => plans;
export const byId = (id) => plans.find((p) => p.id === id);
export const pendingPrices = () => plans.filter((p) => p.usd == null).map((p) => p.name);

const money = (n, cur) => (n == null ? null : `${cur === 'usd' ? '$' : '£'}${n.toLocaleString('en-GB')}`);
const priceLine = (p) => {
  const parts = [money(p.usd, 'usd')].filter(Boolean);
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
  ${buttons([p.cta[1], p.cta[0]])}
</div>`;

// Blue band with white price cards (the old asparagents pricing block).
export const priceBand = (list, { tag = 'Prices', title = 'Clear and Transparent [[Prices]]', intro = '', id = 'pricing' } = {}) =>
  section({ tone: 'blue', tag, title, intro, id, body: `<div class="prices${list.length === 1 ? ' one' : ''}">${list.map(priceCard).join('')}</div>` });
