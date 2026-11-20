import { pageHead, faqBand, ctaRow, section } from '../layout.mjs';
import { allPlans, priceCard, offerLd } from '../prices.mjs';

// Prices page. Numbers live in src/prices.mjs (only prices Firat gave; the rest say "Price on request").
export default (() => {
  const faq = faqBand([
    { q: 'When do I pay for a one-time WordPress fix?', a: '<p>After the issue is fixed and you are happy with the result.</p>' },
    { q: 'Do agencies get different prices?', a: '<p>Agencies pay a wholesale fee and sell the service at their own price. <a href="/contact/">Tell us about your agency</a> and we will send the partner prices.</p>' },
    { q: 'Which currencies do you show?', a: '<p>US dollars and British pounds.</p>' },
  ]);
  const list = allPlans();
  return {
    path: '/prices/',
    title: 'WordPress Support, Website, SEO and Social Media Prices | asparagents',
    description: 'Clear prices in US dollars and British pounds for one-time WordPress support, WordPress and WooCommerce websites, SEO, local SEO, GEO and social media.',
    crumbs: [{ name: 'Prices', path: '/prices/' }],
    schema: list.filter((p) => p.usd != null || p.gbp != null).map(offerLd).concat(faq.ld),
    body: `
${pageHead({ tag: 'Prices', title: 'Clear [[Prices]]', intro: 'Prices in US dollars and British pounds. One-time work is paid once; SEO, GEO and social media are monthly services.', actions: ctaRow() })}
${section({ tone: 'blue', tag: 'One-Time', title: 'Fixes and [[Websites]]', body: `<div class="prices">${list.filter((p) => !p.monthly).map(priceCard).join('')}</div>` })}
${section({ tone: 'light', tag: 'Monthly', title: 'Search, AI Visibility and [[Social Media]]', body: `<div class="prices">${list.filter((p) => p.monthly).map(priceCard).join('')}</div>` })}
${faq.html}
`,
  };
})();
