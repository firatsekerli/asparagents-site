import { freeOfferFaq, pageHead, faqBand, ctaRow, section } from '../layout.mjs';
import { allPlans, priceCard, priceStrip, offerLd } from '../prices.mjs';
import { industryCards } from './industries.mjs';
import { cards } from '../layout.mjs';

// Prices page. Numbers live in src/prices.mjs (only prices Firat gave; the rest say "Price on request").
export default (() => {
  const faq = faqBand([
    { q: 'When do I pay for a one-time WordPress fix?', a: '<p>After the issue is fixed and you are happy with the result.</p>' },
    { q: 'Do agencies get different prices?', a: '<p>Agencies pay a wholesale fee and sell the service at their own price. <a href="/contact/">Tell us about your agency</a> and we will send the partner prices.</p>' },
    { q: 'Does the Business Website have monthly costs?', a: '<p>No, not for a small business site. A Business Website runs on Cloudflare’s free plan: the pages, the editor and its database are free, and the contact form fits within a free email plan. You only renew your domain name each year.</p><p>When a fee can apply:</p><ul><li>Photos are stored in Cloudflare R2. Its free tier covers 10 GB a month, far more than a small site needs, but Cloudflare asks you to add a payment method to switch it on. You are only charged above the free tier.</li><li>The free plan covers 100,000 requests a day. Above that, the site needs the Workers Paid plan, from $5 a month.</li><li>The free email plan covers 100 form emails a day.</li></ul><p>Sources: Cloudflare <a href="https://developers.cloudflare.com/workers/platform/pricing/" rel="noopener">Workers</a>, <a href="https://developers.cloudflare.com/d1/platform/pricing/" rel="noopener">D1</a> and <a href="https://developers.cloudflare.com/r2/pricing/" rel="noopener">R2</a> pricing.</p>' },
    freeOfferFaq,
    { q: 'Is VAT added to your prices?', a: '<p>No. We invoice from Türkiye and add no VAT, so the price shown is the amount on your invoice.</p>' },
    { q: 'Which currency do you use?', a: '<p><span class="cur-note">All prices are in US dollars. In the UK, the euro countries, Canada, Australia and New Zealand the same amounts are shown in your own currency.</span></p>' },
  ]);
  const list = allPlans();
  return {
    path: '/prices/',
    title: 'Prices for Websites, SEO, GEO and Support | asparagents',
    description: 'Fixed prices for websites, SEO, local SEO, GEO, social media and WordPress support, with no VAT added. Website tools are priced by what they need to do.',
    crumbs: [{ name: 'Prices', path: '/prices/' }],
    schema: list.filter((p) => p.usd != null || p.gbp != null).map(offerLd).concat(faq.ld),
    body: `
${pageHead({ tag: 'Prices', title: 'Clear and Transparent [[Prices]]', intro: '<p><span class="cur-note">All prices are in US dollars, and your quote lists the exact amount before we start.</span> One-time work is paid once; SEO, GEO and social media are monthly services.</p>', actions: ctaRow() })}
${section({ tag: 'Tools', title: 'Tools Built for [[Your Industry]]', intro: '<p>Every tool is built around your services, rules and prices, so the price depends on what it needs to do. Try a demo below and <a href="/contact/">tell us about your business</a>; we usually reply within minutes with a price.</p>', body: cards(industryCards, { cls: 'services' }) })}
${section({ tone: 'blue', tag: 'One-Time', title: 'Fixes and [[Websites]]', body: `<div class="prices">${list.filter((p) => !p.monthly && p.id !== 'one-time-wordpress-support').map(priceCard).join('')}</div>${list.filter((p) => p.id === 'one-time-wordpress-support').map((p) => priceStrip(p, 'You tell us about <strong>one issue</strong>, we back up your site and fix it while recording our screen, and you <strong>pay only when you are happy</strong> with the result.')).join('')}` })}
${section({ tone: 'light', tag: 'Monthly', title: 'Search, AI Visibility and [[Social Media]]', body: `<div class="prices">${list.filter((p) => p.monthly).map(priceCard).join('')}</div>` })}
${faq.html}
`,
  };
})();
