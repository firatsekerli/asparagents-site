import { site, section, cards, steps, checklist, faqBand, formBlock, reviewsBand, scrollShot, freeOfferFaq, icon, tt, orgId } from '../layout.mjs';
import { byId, priceCard, m } from '../prices.mjs';

// Google Ads landing pages (Firat 22.11.2026: one landing page per ad group, built for Quality Score). Each one mirrors
// its ad group: the searched phrase in the H1, the price and the enquiry form above the fold, the same call to action
// as the ads, reviews and a real project as proof. functions/_middleware.js swaps the H1 and title for ?trade= and
// ?need= so every keyword gets its own headline (server side, so Google's AdsBot sees the same page as the visitor).
// Facts only from the site (prices.mjs, services, reference stories, Google reviews). Plan: claude/asparagents-google-ads-plan.md.

// Closing call to action: the same navy band as every other page, pointing at this page's form.
const lpCta = (h, p, label) => `
<section class="sec tone-navy cta-band"><div class="wrap">
  <h2 class="h2">${tt(h)}</h2>
  <p>${p}</p>
  <div class="btns"><a class="btn" href="#quote">${label}</a><a class="btn btn-soft" href="${site.whatsapp}" target="_blank" rel="noopener">WhatsApp Us</a></div>
  <p class="cta-mail"><a href="mailto:${site.email}">${site.email}</a></p>
</div></section>`;

const hero = ({ tag, h1, lead, points, formHeading, cta }) => `
<section class="page-head lp-head"><div class="wrap contact-grid">
  <div>
    <p class="label">${tag}</p>
    <h1 class="h1">${h1}</h1>
    <div class="lead"><p>${lead}</p></div>
    <div class="btns lp-jump"><a class="btn" href="#quote">${cta}</a></div>
    ${checklist(points, 'lp-points')}
    <div class="contact-lines">
      <a href="${site.whatsapp}" target="_blank" rel="noopener"><span class="ci">${icon.whatsapp}</span>WhatsApp ${site.phone}</a>
      <a href="mailto:${site.email}"><span class="ci">${icon.mail}</span>${site.email}</a>
    </div>
  </div>
  <div id="quote">${formBlock({ heading: formHeading })}</div>
</div></section>`;

// Websites for tradesmen (ad group 1: website design for tradesmen, website for plumbers, website for builders,
// affordable website design).
const tradesFaq = faqBand(
  [
    { q: 'Is the price really fixed?', a: `<p>Yes. A WordPress website of 5 to 10 pages is ${m(447)}, one-time. We agree on the pages and what goes on them before any work starts, so you know the full price up front.</p>` },
    { q: 'What happens after the first year?', a: '<p>Maintenance and support are free for the first year. After that, website maintenance is included in our SEO, Local SEO and GEO plan; tell us what you need and we will tell you the options.</p>' },
    { q: 'Can I change the content myself?', a: '<p>Yes. The site is built on WordPress so you can update your text, photos and prices yourself. We are there if you would rather we did it.</p>' },
    { q: 'Can you add a quote or booking form?', a: '<p>Yes. We build tools that answer enquiries, take bookings or give a rough price, inside your website. You can <a href="/industries/trades/">try a demo for trades</a> first.</p>' },
    freeOfferFaq,
  ],
  { aside: { icon: 'chat', title: 'One Contact, Fast Replies', text: 'You deal with one person from start to finish, and we usually reply within minutes, and always within 12 hours.' }, cta: '' }
);

const trades = {
  path: '/websites-for-tradesmen/',
  title: 'Website Design for Tradesmen, Fixed Price | asparagents',
  description: 'Website design for tradesmen: a WordPress website of 5 to 10 pages for one fixed price, with SEO, Google Business Profile setup and a year of support.',
  crumbs: [{ name: 'Website Design for Tradesmen', path: '/websites-for-tradesmen/' }],
  contact: false,
  schema: [
    { '@type': 'Service', name: 'Website design for tradesmen', serviceType: 'Website design', provider: { '@id': orgId }, url: `${site.url}/websites-for-tradesmen/`, audience: { '@type': 'BusinessAudience', audienceType: 'Tradesmen and small trade businesses' }, offers: { '@type': 'Offer', price: 447, priceCurrency: 'USD' } },
    tradesFaq.ld,
  ],
  body: `
${hero({
  tag: 'Websites for Trades',
  h1: tt('Website Design for [[<span data-variant>Tradesmen</span>]]'),
  lead: `A WordPress website for your trade that brings you enquiries: 5 to 10 pages, fast on every phone, with SEO and your Google Business Profile set up. One fixed price of ${m(447)}, with the first year of maintenance and support free.`,
  points: [`Fixed price: ${m(447)}, one-time`, 'First year of maintenance and support free', 'Usually replies within minutes', 'One person from start to finish'],
  formHeading: 'Get a Quote for Your Website',
  cta: 'Get a Quote',
})}
${section({
  tag: 'What You Get',
  title: `Everything for ${m(447)}, [[No Surprises]]`,
  body: `<div class="lp-offer">${priceCard(byId('wordpress-website'))}<div>${cards(
    [
      { icon: 'web', title: 'Found in Your Area', text: 'Service pages written for what local customers search, plus your Google Business Profile set up, so people nearby find you on Google and on the map.' },
      { icon: 'chat', title: 'Enquiries, Not Just Visits', text: 'A clear call to action on every page, your phone and WhatsApp one tap away and a form that comes straight to your inbox.' },
      { icon: 'shield', title: 'Trust at First Glance', text: 'Your reviews, accreditations and photos of your work where customers look for them before they call.' },
      { icon: 'clock', title: 'Easy to Keep Up to Date', text: 'WordPress, so you can change text, photos and prices yourself, with the first year of support free.' },
    ],
    { cols: 2 }
  )}</div></div>`,
})}
${section({
  tone: 'light',
  body: `<div class="two"><div class="two-media">${scrollShot('cristal-windows', 'Cristal Windows website, home page')}</div><div class="two-text">
    <p class="label">Real Project</p>
    <h2 class="h2">${tt('A Window Installer’s Website That [[Brings Enquiries]]')}</h2>
    <p>Cristal Windows installs windows and doors in Hampshire, Surrey and Berkshire. We rebuilt its website in 2025 with a page for every town it covers, an online quote in 4 steps and its accreditations and reviews on every page.</p>
    <div class="ref-stats lp-stats"><div><b>95</b><span>contact forms</span></div><div><b>25</b><span>quote requests</span></div><div><b>34</b><span>area pages</span></div></div>
    <p class="note">In about 18 months after the relaunch, plus many phone and WhatsApp enquiries (figures as of 23 October 2026).</p>
    <p><a class="card-link" href="/references/cristal-windows/">See the project</a></p>
  </div></div>`,
})}
${reviewsBand()}
${section({ tag: 'How It Works', title: 'Three Steps to [[Your New Website]]', body: steps([
  ['Tell us about your business', 'Send the form or a WhatsApp message with your trade, the towns you cover and the work you want more of.'],
  ['We agree the pages and the price', 'You get a written list of the pages and what goes on them, at the fixed price, before any work starts.'],
  ['We build, you approve, it goes live', 'We design and build the site, check it on every phone and launch it when you are happy.'],
]) })}
${tradesFaq.html}
${lpCta('Ready for a Website That [[Brings Work In]]?', 'Tell us about your trade and we usually reply within minutes, and always within 12 hours.', 'Get a Quote')}
`,
};

// Website help (ad groups: freelance wordpress developer, wordpress maintenance services, wordpress help, wordpress
// fix, website help). Any platform (Firat 22.11.2026: "we can fix any sites with any issues"; the one-time fix is 27
// for any platform). Noindex: the indexable pages for these searches stay /services/wordpress-support/ and the
// service pages. ?need= in functions/_middleware.js swaps the H1 start and the title per ad group.
const fixCard = { ...byId('one-time-wordpress-support'), id: 'one-time-fix', name: 'One-Time Website Fix', sub: 'One issue, fixed, on any platform', cta: ['Describe Your Issue', '#quote'] };

const helpFaq = faqBand(
  [
    { q: 'Which websites can you fix?', a: '<p>WordPress and WooCommerce, Shopify, Webflow, TYPO3, Next.js and plain HTML sites. If your site runs on something else, tell us what it is and we will tell you honestly whether we can help.</p>' },
    { q: 'What if my issue is not fixed?', a: '<p>Then you do not pay. You pay only after the issue is fixed and you are happy with the result.</p>' },
    { q: 'Is the first fix really free?', a: `<p>Yes, if it takes up to 30 minutes, once per business. After that a one-time fix of one issue is ${m(27)}, on any platform, paid when you are happy, and bigger custom work is priced before we start.</p>` },
    { q: 'Do you offer ongoing website maintenance?', a: '<p>Yes. Website maintenance is included in our SEO, Local SEO and GEO plan, and every new website we build comes with the first year of maintenance free.</p>' },
    { q: 'Do you need my login?', a: '<p>We need access to fix the issue. Create a separate user or administrator account for us and remove it when the fix is done; never send us your own password.</p>' },
    { q: 'How fast do you reply?', a: '<p>We usually reply within minutes, and always within 12 hours, in English or Turkish.</p>' },
  ],
  { aside: { icon: 'moon', title: 'Quick Website Support', text: 'We usually reply within minutes, and always within 12 hours, and you deal with one person from start to finish.' }, cta: '' }
);

const help = {
  path: '/website-help/',
  title: 'Website Help, Pay Only When It Is Fixed | asparagents',
  description: 'Website help for WordPress, Shopify, Webflow, TYPO3 and custom sites: we back up your site, fix the issue and you pay only when you are happy.',
  crumbs: [{ name: 'Website Help', path: '/website-help/' }],
  contact: false,
  noindex: true,
  schema: [helpFaq.ld],
  body: `
${hero({
  tag: 'Website Help',
  h1: tt('<span data-variant>Website Help</span>, [[Pay Only When It Is Fixed]]'),
  lead: `Tell us what is wrong with your website, whatever it is built on. We back up your site, fix the issue while recording our screen, and you pay only when you are happy. Your first small fix, up to 30 minutes, is free; after that a one-time fix is ${m(27)}.`,
  points: ['Pay only when it is fixed', 'Your site backed up before we start', 'A screen recording of the fix', 'Usually replies within minutes'],
  formHeading: 'Describe Your Website Issue',
  cta: 'Describe Your Issue',
})}
${section({
  tag: 'What We Fix',
  title: 'Any Website, [[Any Issue]]',
  intro: '<p>A layout that falls apart after an update, a form that stops sending, a checkout error, a slow page, a broken link or a page that will not load: things break on every platform.</p>',
  body: cards(
    [
      { icon: 'layers', title: 'WordPress and WooCommerce', text: 'Themes, page builders such as Elementor, Oxygen Builder and Breakdance, plugins, checkouts and updates that went wrong.' },
      { icon: 'web', title: 'Shopify and Webflow', text: 'Theme and layout issues, forms, apps and integrations, product pages and checkout problems.' },
      { icon: 'code', title: 'TYPO3, Next.js and HTML', text: 'Content management, extensions, custom code, builds and deployments, and hand-written sites.' },
    ],
    { cols: 3 }
  ),
})}
${section({
  tone: 'light',
  tag: 'Prices',
  title: 'Clear Prices, [[Paid When You Are Happy]]',
  body: `<div class="prices">${priceCard(fixCard)}${priceCard(byId('seo-local-seo-geo'))}</div><p class="center note" style="margin-top:24px">Need ongoing website maintenance? It is included in the SEO, Local SEO and GEO plan.</p>`,
})}
${section({ tag: 'How It Works', title: 'Fixed in [[Three Steps]]', body: steps([
  ['Describe the issue', 'Tell us what is wrong and what your site is built on, or send a short screen recording.'],
  ['We fix the issue', 'We back up your website and fix the issue, recording our screen while we work.'],
  ['You pay when happy', 'You pay after the issue is solved and you are happy with the fix.'],
]) })}
${section({
  tone: 'light',
  body: `<div class="two"><div class="two-media">${scrollShot('cristal-windows', 'Cristal Windows website, home page')}</div><div class="two-text">
    <p class="label">One Developer</p>
    <h2 class="h2">${tt('The Person Who [[Fixes It]] Answers You')}</h2>
    <p>Fırat Şekerli has worked on websites since 2013 and builds and looks after websites every day, from WordPress and WooCommerce to Shopify, Webflow, TYPO3 and Next.js, including plugins for Oxygen Builder and Breakdance users. You deal with him from the first message to the fix.</p>
    ${checklist(['Live sites built for businesses in England, the United States and Türkiye', 'Our own WordPress plugins, sold in our shop', 'English or Turkish, usually within minutes'])}
    <p><a class="card-link" href="/references/">See our work</a></p>
  </div></div>`,
})}
${reviewsBand()}
${helpFaq.html}
${lpCta('Tell Us What Is [[Broken]]', 'Your first small fix is free, and you only pay for a fix when you are happy.', 'Describe Your Issue')}
`,
};

export default [trades, help];
