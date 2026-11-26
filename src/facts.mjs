// One home for every fact that appears in more than one place (Firat 26.11.2026: "a change or update should not
// make the whole site inconsistent"). Prices stay in src/prices.mjs and the plugin price in src/site.mjs; this file
// reads them, so there is still only one place to change each number.
//
// How it is used:
// 1. Posts (content/articles/*/post.json, content/legacy/*.mjs) and public/llms.txt may write {{price:<plan id>}},
//    {{price:bundle}}, {{price:bundle-full}}, {{price:plugin}} or {{fact:<id>}}; the build fills in the current value.
// 2. tools/check-consistency.mjs runs at the end of every build and fails it when a page states one of these facts
//    with a different value (an old price next to a plan name, a different free fix limit, and so on).
// 3. Every agent that changes a fact first changes it here (or in prices.mjs), searches the whole site for the old
//    value and wording, and lists the places outside the site in alsoIn as to-dos for Firat.
// Never add a fact Firat has not given or that is not already on the live site.
import { plans, byId, bundle } from './prices.mjs';
import { plugins } from './site.mjs';

const plugin = plugins.find((p) => p.priceUsd != null);


export const facts = [
  { id: 'free-fix-minutes', label: 'Free small fix limit', value: '30 minutes', note: 'one free small fix per business (layout.mjs freeOfferFaq, landing pages)' },
  { id: 'reply-time', label: 'Reply time', value: 'usually within minutes, always within 12 hours', note: 'contact page, FAQ side panel, ads callout "Fast Replies"' },
  { id: 'since-year', label: 'Building websites since', value: '2013', note: 'about page, landing pages, ads headline "One Developer Since 2013"' },
  { id: 'irish-homepage-designs', label: 'Homepage designs for Irish leads', value: '2', note: '/web-design-cork/ (Firat 24.11.2026: 2 for everyone)' },
  { id: 'plugin-refund-days', label: 'Plugin refund', value: '7 days, technical issues only', note: '/plugins/, shop delivery and refund page' },
];

// Places outside this repository that repeat a fact. Agents cannot change them (Google Ads, the shop, Google Business
// Profile), so a change to the fact adds one to-do for Firat naming each place.
export const alsoIn = {
  price: [
    'Google Ads: the Tradesmen, Plumbers and Electricians ads show the WordPress Website price in a headline and description 2 (£547 today)',
    'Google Ads: the WordPress Help and Website Help ads show the one-time fix price ("From £27")',
    'shop.asparagents.com: product One-Time WordPress Support (id 25) must match the One-Time WordPress Support price',
    'Meta ads plan for Ireland (draft, not live): the Business Website price',
  ],
  plugin: ['shop.asparagents.com: product Oxygen Media Usage Tracker Pro (id 164) must match the plugin price'],
  'reply-time': ['Google Ads callout "Fast Replies" and headline "Usually Reply Within Minutes"'],
  'since-year': ['Google Ads headline "One Developer Since 2013"'],
  'free-fix-minutes': ['Google Ads headlines about the free fix (WordPress Help, Website Help)'],
  'plugin-refund-days': ['shop.asparagents.com: delivery and refund page, Plugins paragraph'],
};

// Names a page may use for each plan. The consistency check expects the plan's price as the first amount after any
// of these names in the same sentence.
export const planNames = {
  'one-time-wordpress-support': ['One-Time WordPress Support', 'one-time WordPress fix', 'One-Time WordPress Fix', 'one-time website fix', 'One-Time Website Fix', 'Website Fix', 'WordPress Fix', 'WordPress Support From'],
  'wordpress-website': ['WordPress Website', 'WordPress website'],
  'business-website': ['Business Website', 'website without WordPress', 'Website Without WordPress'],
  'woocommerce-shop': ['WooCommerce Shop', 'WooCommerce shop'],
  'seo-local-seo-geo': ['SEO, Local SEO and GEO', 'SEO, local SEO and GEO'],
  'social-media-management': ['Social Media Management', 'social media management', 'social media'],
};

const fmt = (n) => `$${n.toLocaleString('en-GB')}`;
export const priceOf = (id) => {
  if (id === 'bundle') return bundle.usd;
  if (id === 'bundle-full') return bundle.fullUsd;
  if (id === 'plugin') return plugin ? plugin.priceUsd : null;
  const p = byId(id);
  return p ? p.usd : null;
};

// Fill {{price:...}} and {{fact:...}}. An unknown name stops the build, so a typo never reaches the site.
export const fill = (text, where = '') =>
  String(text).replace(/\{\{(price|fact):([a-z0-9-]+)\}\}/g, (all, kind, id) => {
    if (kind === 'price') {
      const v = priceOf(id);
      if (v == null) throw new Error(`${where}: unknown price ${all}`);
      return fmt(v);
    }
    const f = facts.find((x) => x.id === id);
    if (!f) throw new Error(`${where}: unknown fact ${all}`);
    return f.value;
  });

export { plans, plugin, bundle };
