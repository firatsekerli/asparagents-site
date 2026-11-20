import { checklist, buttons, orgId, site, section } from './layout.mjs';

// asparagents.com prices in USD and GBP. Every number must come from Firat (standing rule: never guess a price).
// null = not given yet: the card says "Price on request" and the build prints a warning, so a preview can be
// reviewed but nothing goes live with a guessed number. One-Time WordPress Support ($47) is the live shop price.
// PENDING Firat (20.11.2026): all other USD and GBP prices.
export const plans = [
  {
    id: 'one-time-wordpress-support',
    name: 'One-Time WordPress Support',
    sub: 'One issue, fixed',
    usd: 47,
    gbp: null,
    items: ['You describe one issue, in writing or with a short video', 'We back up your site before we change anything', 'We record our screen while we fix it', 'You pay after the fix, when you are happy'],
    cta: ['Buy in the Shop', `${site.shop}product/one-time-wordpress-support/`],
  },
  {
    id: 'wordpress-website',
    name: 'WordPress Website',
    sub: 'Business website, one-time',
    usd: null,
    gbp: null,
    items: ['A WordPress website made for your business', 'Mobile-friendly and fast', 'SEO foundations from the start', 'Easy to update yourself'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'woocommerce-shop',
    name: 'WooCommerce Shop',
    sub: 'Online shop, one-time',
    usd: null,
    gbp: null,
    items: ['A WooCommerce shop with payment setup', 'Mobile-friendly product and checkout pages', 'SEO foundations from the start'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'seo-local-seo-geo',
    monthly: true,
    name: 'SEO, Local SEO and GEO',
    sub: 'Monthly service',
    usd: null,
    gbp: null,
    items: ['Technical and on-page SEO', 'Google Business Profile management and review strategy', 'Monthly AI visibility checks', 'A plain-language monthly report'],
    cta: ['Get a Quote', '/contact/'],
  },
  {
    id: 'social-media-management',
    monthly: true,
    name: 'Social Media Management',
    sub: 'Monthly service',
    usd: null,
    gbp: null,
    items: ['A monthly content calendar, shared for approval', 'Post designs, captions and hashtags', 'Scheduling and posting', 'A plain-language monthly report'],
    cta: ['Get a Quote', '/contact/'],
  },
];

export const allPlans = () => plans;
export const byId = (id) => plans.find((p) => p.id === id);
export const pendingPrices = () => plans.filter((p) => p.usd == null || p.gbp == null).map((p) => p.name);

const money = (n, cur) => (n == null ? null : `${cur === 'usd' ? '$' : '£'}${n.toLocaleString('en-GB')}`);
const priceLine = (p) => {
  const parts = [money(p.usd, 'usd'), money(p.gbp, 'gbp')].filter(Boolean);
  if (!parts.length) return '<p class="price-num ask">Price on request</p>';
  return `<p class="price-num">${parts.join(' <small>/</small> ')}${p.monthly ? ' <small>a month</small>' : ''}</p>`;
};

export const offerLd = (p) => ({
  '@type': 'Service',
  name: p.name,
  serviceType: p.name,
  url: `${site.url}/prices/#${p.id}`,
  provider: { '@id': orgId },
  offers: [['usd', 'USD'], ['gbp', 'GBP']].filter(([k]) => p[k] != null).map(([k, c]) => ({ '@type': 'Offer', price: p[k], priceCurrency: c, availability: 'https://schema.org/InStock', seller: { '@id': orgId } })),
});

export const priceCard = (p) => `<div class="price-card" id="${p.id}">
  <h3>${p.name}</h3><p class="price-sub">${p.sub}</p>
  ${priceLine(p)}
  ${checklist(p.items)}
  ${buttons([p.cta[1], p.cta[0]])}
</div>`;

// Blue band with white price cards (the old asparagents pricing block).
export const priceBand = (list, { tag = 'Prices', title = 'Clear [[Prices]]', intro = '', id = 'pricing' } = {}) =>
  section({ tone: 'blue', tag, title, intro, id, body: `<div class="prices${list.length === 1 ? ' one' : ''}">${list.map(priceCard).join('')}</div>` });
