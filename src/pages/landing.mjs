import { site, section, cards, steps, checklist, faqBand, stepForm, reviewsBand, scrollShot, TWO_SIZES, freeOfferFaq, icon, tt, orgId } from '../layout.mjs';
import { byId, priceCard, priceStrip, m } from '../prices.mjs';
// Prices always come from src/prices.mjs (never typed here), so a price change reaches every landing page.
const P = (id) => m(byId(id).usd);
import { plugins } from '../site.mjs';
import { demoCss, tabsJs, lockJs } from '../demos/common.mjs';
import { makeTradesDemo } from '../demos/trades.mjs';

// Google Ads landing pages (Firat 23.11.2026: one landing page per ad group, the slug is the ad group's main keyword,
// web apps and tools on every page, Quality Score 7 to 8 or better). Each page mirrors its ad group: the main keyword
// in the slug, title, H1 and first paragraph, the other keywords of the group in the copy, the price and the enquiry
// form above the fold, the same call to action as the ads, a working tool demo, reviews and a real project as proof.
// Facts only from the site (prices.mjs, services, reference stories, Google reviews). Plan:
// claude/asparagents-google-ads-plan.md. The three trade pages are indexable (no other page targets these searches);
// the two help pages are noindex (Firat 26.11.2026: they must not compete with /services/wordpress-support/, the organic
// page for those searches). PageSpeed shows SEO below 100 on them for that reason only, which is accepted.

// Closing call to action: the same navy band as every other page, pointing at this page's form.
const lpCta = (h, p, label) => `
<section class="sec tone-navy cta-band"><div class="wrap">
  <h2 class="h2">${tt(h)}</h2>
  <p>${p}</p>
  <div class="btns"><a class="btn" href="#quote">${label}</a><a class="btn btn-soft" href="${site.whatsapp}" target="_blank" rel="noopener">WhatsApp Us</a></div>
  <p class="cta-mail"><a href="mailto:${site.email}">${site.email}</a></p>
</div></section>`;

const hero = ({ tag, h1, lead, points, formHeading, cta, preset = '' }) => `
<section class="page-head lp-head"><div class="wrap contact-grid">
  <div>
    <p class="label">${tag}</p>
    <h1 class="h1">${tt(h1)}</h1>
    <div class="lead"><p>${lead}</p></div>
    <div class="btns lp-jump"><a class="btn" href="#quote">${cta}</a></div>
    ${checklist(points, 'lp-points')}
    <div class="contact-lines">
      <a href="${site.whatsapp}" target="_blank" rel="noopener"><span class="ci">${icon.whatsapp}</span>WhatsApp ${site.phone}</a>
      <a href="mailto:${site.email}"><span class="ci">${icon.mail}</span>${site.email}</a>
    </div>
  </div>
  <div id="quote">${stepForm({ heading: formHeading, preset })}</div>
</div></section>`;

// Working demo of a tool in a navy band, with the tools we build next to it.
const toolsBand = ({ title, intro, demo, demoIntro, tools }) => `
<section class="sec tone-navy demo-sec" id="demo" aria-labelledby="demo-title"><div class="wrap">
  <div class="sec-head"><p class="label">Web Apps and Tools</p><h2 class="h2" id="demo-title">${tt(title)}</h2><p class="sec-intro">${intro}</p></div>
  ${cards(tools, { cols: 3, cls: 'lp-tools' })}
  <p class="sec-intro lp-demo-intro">${demoIntro}</p>
  ${demo.html}
</div></section>
<style>${demoCss}${demo.css || ''}.lp-tools{margin-bottom:48px}.lp-demo-intro{margin:0 auto 24px;text-align:center}</style>
<script>${tabsJs}${demo.js}${lockJs}</script>`;

// Proof: the Cristal Windows website and the three tools built for it.
const cristal = (title) =>
  section({
    tone: 'light',
    body: `<div class="two"><div class="two-media">${scrollShot('cristal-windows', 'Cristal Windows website, home page', TWO_SIZES)}</div><div class="two-text">
    <p class="label">Real Project</p>
    <h2 class="h2">${tt(title)}</h2>
    <p>Cristal Windows installs windows and doors in Hampshire, Surrey and Berkshire. We rebuilt its website in 2025 with a page for every town it covers, an online quote in 4 steps and its accreditations and reviews on every page. We also built its tools: the online quotation form, a survey app its surveyors use on a phone, and a conservation area checker.</p>
    <div class="ref-stats lp-stats"><div><b>95</b><span>contact forms</span></div><div><b>25</b><span>quote requests</span></div><div><b>34</b><span>area pages</span></div></div>
    <p class="note">In about 18 months after the relaunch, plus many phone and WhatsApp enquiries (figures as of 23 October 2026).</p>
    <p><a class="card-link" href="/references/cristal-windows/">See the project and try its tools</a></p>
  </div></div>`,
  });

// ---------------------------------------------------------------------------------------------------------------
// Website pages for trades: one per ad group (Tradesmen, Plumbers, Electricians).

const toolFaq = (trade) => ({
  q: 'How much does a tool cost?',
  a: `<p>A tool is priced by what it needs to do, so we tell you the price in writing before any work starts. First we build a free prototype with sample data from your own ${trade} work, so you can try it before you decide. It can be added to the website we build for you or to the one you already have.</p>`,
});

// Smaller option under the WordPress offer (Firat 23.11.2026: add the Business Website as an option and stress that it has no
// ongoing costs). Static pages on Cloudflare's free plan; the only yearly cost is the domain name.
const smallSite = (c) => priceStrip({ ...byId('business-website'), name: c.h.small, cta: ['Get a Quote', '#quote'] },
  `1 to 5 pages of mostly static content, built without WordPress. <strong>No monthly costs</strong>: hosting on Cloudflare’s free plan covers a site like this, so you only renew your domain name. The code is yours in your own GitHub, you edit text, photos and prices in a simple editor, and there are no plugins to update.`);
const noCostsFaq = { q: 'Is there a smaller option with no monthly costs?', a: `<p>Yes. The Business Website is ${P('business-website')} for 1 to 5 pages of mostly static content, built without WordPress and hosted on Cloudflare’s free plan, which covers a small business site. You only renew your domain name each year; the <a href="/prices/">prices page</a> explains when a Cloudflare fee can apply. Fixes after handover are paid per fix, and there is no free first year as there are no plugins to update.</p>` };

const tradePage = (c) => {
  const faq = faqBand(
    [
      { q: 'Is the price really fixed?', a: `<p>Yes. A WordPress website of 5 to 10 pages is ${P('wordpress-website')}, one-time. We agree on the pages and what goes on them before any work starts, so you know the full price up front.</p>` },
      ...c.faq,
      toolFaq(c.tradeWord),
      { q: 'What happens after the first year?', a: '<p>Plugin updates and fixes for technical problems such as plugin conflicts are free for the first year. After that, website maintenance is included in our SEO, Local SEO and GEO plan; tell us what you need and we will tell you the options.</p>' },
      { q: 'Can I change the content myself?', a: '<p>Yes. The site is built on WordPress so you can update your text, photos and prices yourself. We are there if you would rather we did it.</p>' },
      noCostsFaq,
      freeOfferFaq,
    ],
    { title: c.h.faq, aside: { icon: 'chat', title: 'One Contact, Fast Replies', text: 'You deal with one person from start to finish, and we usually reply within minutes, and always within 12 hours.' }, cta: '' }
  );
  return {
    path: `/${c.slug}/`,
    title: `${c.title} | asparagents`,
    description: c.description,
    crumbs: [{ name: c.crumb, path: `/${c.slug}/` }],
    contact: false,
    schema: [
      { '@type': 'Service', name: c.crumb, serviceType: 'Website design', provider: { '@id': orgId }, url: `${site.url}/${c.slug}/`, audience: { '@type': 'BusinessAudience', audienceType: c.audience }, offers: [{ '@type': 'Offer', name: 'WordPress Website', price: 547, priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Business Website', price: 447, priceCurrency: 'USD' }] },
      faq.ld,
    ],
    body: `
${hero({ tag: c.tag, h1: c.h1, lead: c.lead, points: [`Fixed price: ${P('wordpress-website')}, one-time`, 'First year of plugin updates and fixes free', ...c.points, 'Usually replies within minutes'], formHeading: c.h.form, cta: 'Get a Quote', preset: 'website' })}
${section({
  tag: 'What You Get',
  title: c.h.offer,
  intro: `<p>${c.offerIntro}</p>`,
  body: `<div class="lp-offer">${priceCard(byId('wordpress-website'))}<div>${cards(c.offer, { cols: 2 })}</div></div>${smallSite(c)}`,
})}
${toolsBand(c.tools)}
${cristal(c.h.proof)}
${reviewsBand({ title: c.h.reviews })}
${section({ tag: 'How It Works', title: c.h.steps, body: steps(c.steps) })}
${faq.html}
${lpCta(c.h.cta, c.ctaText, 'Get a Quote')}
`,
  };
};

const updateCard = { icon: 'clock', title: 'Easy to Keep Up to Date', text: 'WordPress, so you can change text, photos and prices yourself, with the first year of plugin updates and fixes free.' };

const tradesmen = tradePage({
  slug: 'website-design-for-tradesmen',
  title: 'Website Design for Tradesmen, Fixed Price',
  description: 'Website design for tradesmen: a WordPress website of 5 to 10 pages for one fixed price, with SEO, Google Business Profile setup, a year of support and booking tools.',
  crumb: 'Website Design for Tradesmen',
  audience: 'Tradesmen and small trade businesses',
  tradeWord: 'trade',
  h: {
    form: "Get a Quote for Your Tradesman Website",
    small: "A Smaller Tradesman Website With No Monthly Costs",
    offer: "Website Design for Tradesmen for [[One Fixed Price]]",
    proof: "Website Design for Tradesmen That [[Brings Enquiries]]",
    reviews: "What Clients Say About Our [[Website Design]]",
    steps: "Three Steps to Your [[Tradesman Website]]",
    faq: "Questions About Website Design for [[Tradesmen]]",
    cta: "Ready for a Tradesman Website That [[Brings Work In]]?",
  },
  tag: 'Websites for Trades',
  h1: 'Website Design for [[Tradesmen]]',
  lead: `Website design for tradesmen that brings you enquiries: a WordPress website of 5 to 10 pages, fast on every phone, with SEO and your Google Business Profile set up, for one fixed price of ${P('wordpress-website')}. Add a tool that answers enquiries and books jobs while you are working.`,
  points: ['Booking and quote tools for your trade'],
  offerIntro: 'A tradesman website for roofers, plumbers, electricians, builders, heating engineers and every other trade, made to turn visitors into calls and booked jobs.',
  offer: [
    { icon: 'pin', title: 'Found in Your Area', text: 'Service pages written for what local customers search, plus your Google Business Profile set up, so people nearby find you on Google and on the map.' },
    { icon: 'chat', title: 'Enquiries, Not Just Visits', text: 'A clear call to action on every page, your phone and WhatsApp one tap away and a form that comes straight to your inbox.' },
    { icon: 'shield', title: 'Trust at First Glance', text: 'Your reviews, accreditations and photos of your work where customers look for them before they call.' },
    updateCard,
  ],
  tools: {
    title: "A Tradesman Website That [[Books Jobs]] While You Work",
    intro: 'Your tradesman website can do more than show your phone number. We build web apps and tools into it that answer enquiries, give a rough price and book visits, so you stop losing jobs to missed calls.',
    tools: [
      { icon: 'chat', title: 'Enquiry and Booking Tool', text: 'Answers every enquiry at any hour, asks your questions, spots emergencies and books visits into your free slots. Try it below.' },
      { icon: 'report', title: 'Quote and Estimate Tools', text: 'Customers describe the job and get a rough price from your own rates before you visit. <a href="/industries/builders-renovation/">See the estimate demo</a>.' },
      { icon: 'users', title: 'Apps for Your Team', text: 'Job cards, surveys and checklists on a phone instead of paper, like the survey app we built for a window installer.' },
    ],
    demo: makeTradesDemo(),
    demoIntro: 'Step 1 is a customer on your website. Step 2 is the job card you receive. Step 3 is the text your customer gets.',
  },
  faq: [],
  steps: [
    ['Tell us about your business', 'Send the form or a WhatsApp message with your trade, the towns you cover and the work you want more of.'],
    ['We agree the pages and the price', 'You get a written list of the pages and what goes on them, at the fixed price, before any work starts.'],
    ['We build, you approve, it goes live', 'We design and build the site, check it on every phone and launch it when you are happy.'],
  ],
  ctaText: 'Tell us about your trade and we usually reply within minutes, and always within 12 hours.',
});

const plumbers = tradePage({
  slug: 'website-for-plumbers',
  title: 'Website for Plumbers, Fixed Price Plumber Website Design',
  description: 'A website for plumbers: plumber website design with 5 to 10 pages for one fixed price, SEO, Google Business Profile setup and a booking tool for plumbing jobs.',
  crumb: 'Website for Plumbers',
  audience: 'Plumbers, plumbing and heating businesses',
  tradeWord: 'plumbing',
  h: {
    form: "Get a Quote for Your Plumber Website",
    small: "A Smaller Plumber Website With No Monthly Costs",
    offer: "Plumber Website Design for [[One Fixed Price]]",
    proof: "Plumbing Website Design Built on [[Real Results]]",
    reviews: "What Clients Say About Our [[Website Design]]",
    steps: "Three Steps to Your [[Plumber Website]]",
    faq: "Questions About a Website for [[Plumbers]]",
    cta: "Ready for a Website for Plumbers That [[Brings Work In]]?",
  },
  tag: 'Plumber Website Design',
  h1: 'Website for Plumbers That [[Brings In Jobs]]',
  lead: `A website for plumbers that turns searches into booked jobs: plumber website design with 5 to 10 pages, fast on every phone, with SEO and your Google Business Profile set up, for one fixed price of ${P('wordpress-website')}. Add a tool that takes enquiries while you are under a sink.`,
  points: ['A booking tool for plumbing jobs'],
  offerIntro: 'Plumbing website design for sole traders and small plumbing and heating firms, made for the way customers look for a plumber: on a phone, often in a hurry.',
  offer: [
    { icon: 'pin', title: 'Found for Plumbing Searches', text: 'A page for each job you want more of, such as boiler repairs, leaks, blocked drains and bathroom fitting, written for what people nearby search, plus your Google Business Profile set up.' },
    { icon: 'chat', title: 'Emergency Calls Come Straight Through', text: 'Your phone and WhatsApp one tap away on every page, so someone with a burst pipe reaches you, not the next plumber on the list.' },
    { icon: 'shield', title: 'Trust Before They Call', text: 'Your Gas Safe number if you work on boilers, your reviews, insurance and photos of your work, where customers look before they call.' },
    updateCard,
  ],
  tools: {
    title: "A Website for Plumbers That [[Takes Bookings]]",
    intro: 'When you are on a job you cannot answer the phone. We build web apps and tools into your plumbing website that answer every enquiry, sort emergencies from routine jobs and book the visit.',
    tools: [
      { icon: 'chat', title: 'Enquiry and Booking Tool', text: 'Asks what you would ask about a leak, a boiler or a blocked drain, takes a photo and books a free slot. Try it below.' },
      { icon: 'shield', title: 'Emergencies First', text: 'A burst pipe or no hot water is marked as an emergency by your rules and offered the first free slots.' },
      { icon: 'report', title: 'Quote Tools', text: 'A rough price for a bathroom or boiler job from your own rates, before you spend time on a visit.' },
    ],
    demo: makeTradesDemo([
      ['Leak or burst pipe', 'Is water leaking into the house right now?'],
      ['Boiler or heating', 'Are you without heating or hot water right now?'],
      ['Blocked drain or toilet', 'Is it overflowing or out of use right now?'],
      ['New bathroom or kitchen', 'Is anything leaking or out of use right now?'],
    ]),
    demoIntro: 'Step 1 is a customer reporting a plumbing job on your website. Step 2 is the job card you receive. Step 3 is the text your customer gets.',
  },
  faq: [
    { q: 'Do you build websites for plumbing and heating firms?', a: '<p>Yes. We build the same website for a sole trader plumber and for a plumbing and heating firm with a team: the pages follow the jobs you do and the towns you cover.</p>' },
  ],
  steps: [
    ['Tell us about your plumbing work', 'Send the form or a WhatsApp message with the jobs you do, the towns you cover and the work you want more of.'],
    ['We agree the pages and the price', 'You get a written list of the pages and what goes on them, at the fixed price, before any work starts.'],
    ['We build, you approve, it goes live', 'We design and build the site, check it on every phone and launch it when you are happy.'],
  ],
  ctaText: 'Tell us about your plumbing business and we usually reply within minutes, and always within 12 hours.',
});

const electricians = tradePage({
  slug: 'website-for-electricians',
  title: 'Website for Electricians, Fixed Price Electrician Website Design',
  description: 'A website for electricians and electrical contractors: 5 to 10 pages for one fixed price, SEO, Google Business Profile setup and a booking tool for electrical jobs.',
  crumb: 'Website for Electricians',
  audience: 'Electricians and electrical contractors',
  tradeWord: 'electrical',
  h: {
    form: "Get a Quote for Your Electrician Website",
    small: "A Smaller Electrician Website With No Monthly Costs",
    offer: "Electrician Website Design for [[One Fixed Price]]",
    proof: "Electrician Website Design Built on [[Real Results]]",
    reviews: "What Clients Say About Our [[Website Design]]",
    steps: "Three Steps to Your [[Electrician Website]]",
    faq: "Questions About a Website for [[Electricians]]",
    cta: "Ready for a Website for Electricians That [[Brings Work In]]?",
  },
  tag: 'Electrician Website Design',
  h1: 'Website for Electricians That [[Brings In Jobs]]',
  lead: `A website for electricians and electrical contractors that turns searches into booked jobs: 5 to 10 pages, fast on every phone, with SEO and your Google Business Profile set up, for one fixed price of ${P('wordpress-website')}. Add a tool that takes enquiries while you are on site.`,
  points: ['A booking tool for electrical jobs'],
  offerIntro: 'Electrician website design for sole traders and electrical contractors, made for homeowners, landlords and businesses looking for an electrician on their phone.',
  offer: [
    { icon: 'pin', title: 'Found for Electrical Searches', text: 'A page for each job you want more of, such as rewires, consumer unit upgrades, EV charger installs, fault finding and testing, written for what people nearby search, plus your Google Business Profile set up.' },
    { icon: 'chat', title: 'Enquiries, Not Just Visits', text: 'Your phone and WhatsApp one tap away on every page and a form that comes straight to your inbox, with the job details you need.' },
    { icon: 'shield', title: 'Trust Before They Call', text: 'Your NICEIC or NAPIT membership, insurance, reviews and photos of your work, where customers look before they call.' },
    updateCard,
  ],
  tools: {
    title: "A Website for Electricians That [[Takes Bookings]]",
    intro: 'When you are on site you cannot answer the phone. We build web apps and tools into your electrician website that answer every enquiry, sort urgent faults from planned work and book the visit.',
    tools: [
      { icon: 'chat', title: 'Enquiry and Booking Tool', text: 'Asks what you would ask about a fault, a rewire or an EV charger, takes a photo and books a free slot. Try it below.' },
      { icon: 'shield', title: 'Urgent Faults First', text: 'No power or a burning smell is marked as urgent by your rules and offered the first free slots.' },
      { icon: 'report', title: 'Quote Tools', text: 'A rough price for a rewire, a consumer unit or an EV charger from your own rates, before you spend time on a visit.' },
    ],
    demo: makeTradesDemo([
      ['Power cut or tripping', 'Is part of the house without power right now?'],
      ['Faulty socket or switch', 'Is there a burning smell, sparks or heat right now?'],
      ['EV charger installation', 'Is anything not working right now?'],
      ['Rewire or new circuit', 'Is anything not working or unsafe right now?'],
    ]),
    demoIntro: 'Step 1 is a customer reporting an electrical job on your website. Step 2 is the job card you receive. Step 3 is the text your customer gets.',
  },
  faq: [
    { q: 'Do you build websites for electrical contractors?', a: '<p>Yes. We build the same website for a sole trader electrician and for an electrical contractor with a team: the pages follow the work you do, domestic or commercial, and the towns you cover.</p>' },
  ],
  steps: [
    ['Tell us about your electrical work', 'Send the form or a WhatsApp message with the jobs you do, the towns you cover and the work you want more of.'],
    ['We agree the pages and the price', 'You get a written list of the pages and what goes on them, at the fixed price, before any work starts.'],
    ['We build, you approve, it goes live', 'We design and build the site, check it on every phone and launch it when you are happy.'],
  ],
  ctaText: 'Tell us about your electrical business and we usually reply within minutes, and always within 12 hours.',
});

// ---------------------------------------------------------------------------------------------------------------
// Help pages: WordPress Help and Website Help. Any platform on Website Help (Firat 22.11.2026: "we can fix any sites
// with any issues"; the one-time fix is 27 for any platform).

const fixCard = (name, sub) => ({ ...byId('one-time-wordpress-support'), id: 'one-time-fix', name, sub, cta: ['Describe Your Issue', '#quote'] });
const plugin = plugins[0];

const helpPage = (c) => {
  const faq = faqBand(
    [
      ...c.faq,
      { q: 'What if my issue is not fixed?', a: '<p>Then you do not pay. You pay only after the issue is fixed and you are happy with the result.</p>' },
      { q: 'Is the first fix really free?', a: `<p>Yes, if it takes up to 30 minutes, once per business. After that a one-time fix of one issue is ${P('one-time-wordpress-support')}, paid when you are happy, and bigger custom work is priced before we start.</p>` },
      { q: 'Can you build a tool or a feature, not only fix things?', a: '<p>Yes. We build web apps and tools such as quote calculators, booking tools and plugins. A tool is priced by what it needs to do, and we first build a free prototype with sample data so you can try it before you decide.</p>' },
      { q: 'Do you need my login?', a: '<p>We need access to fix the issue. Create a separate user or administrator account for us and remove it when the fix is done; never send us your own password.</p>' },
      { q: 'How fast do you reply?', a: '<p>We usually reply within minutes, and always within 12 hours, in English or Turkish.</p>' },
    ],
    { title: c.h.faq, aside: { icon: 'moon', title: c.asideTitle, text: 'We usually reply within minutes, and always within 12 hours, and you deal with one person from start to finish.' }, cta: '' }
  );
  return {
    path: `/${c.slug}/`,
    title: `${c.title} | asparagents`,
    description: c.description,
    crumbs: [{ name: c.crumb, path: `/${c.slug}/` }],
    contact: false,
    noindex: true,
    schema: [faq.ld],
    body: `
${hero({ tag: c.tag, h1: c.h1, lead: c.lead, points: ['Pay only when it is fixed', 'Your site backed up before we start', 'A screen recording of the fix', 'Usually replies within minutes'], formHeading: c.formHeading, cta: 'Describe Your Issue', preset: 'fix' })}
${section({ tag: 'What We Fix', title: c.fixTitle, intro: `<p>${c.fixIntro}</p>`, body: cards(c.fixes, { cols: 3 }) })}
${section({
  tone: 'light',
  tag: 'Prices',
  title: c.h.prices,
  body: `<div class="prices">${priceCard(c.card)}${priceCard(byId('seo-local-seo-geo'))}</div><p class="center note" style="margin-top:24px">Need ongoing ${c.maintWord} maintenance? It is included in the SEO, Local SEO and GEO plan.</p>`,
})}
${section({ tag: 'How It Works', title: c.h.steps, body: steps([
  ['Describe the issue', `Tell us what is wrong${c.platformAsk}, or send a short screen recording.`],
  ['We fix the issue', 'We back up your website and fix the issue, recording our screen while we work.'],
  ['You pay when happy', 'You pay after the issue is solved and you are happy with the fix.'],
]) })}
${section({ tone: 'navy', tag: 'Web Apps and Tools', title: c.toolsTitle, intro: `<p>${c.toolsIntro}</p>`, body: cards(c.tools, { cols: 3, cls: 'lp-tools' }) })}
${section({
  tone: 'light',
  body: `<div class="two"><div class="two-media">${scrollShot('cristal-windows', 'Cristal Windows website, home page', TWO_SIZES)}</div><div class="two-text">
    <p class="label">One Developer</p>
    <h2 class="h2">${tt(c.h.developer)}</h2>
    <p>${c.developer}</p>
    ${checklist(['Live sites built for businesses in England, Ireland, the United States and Türkiye', 'Our own WordPress plugins, sold in our shop', 'English or Turkish, usually within minutes'])}
    <p><a class="card-link" href="/references/">See our work</a></p>
  </div></div>`,
})}
${reviewsBand({ title: c.h.reviews })}
${faq.html}
${lpCta(c.h.cta, 'Your first small fix is free, and you only pay for a fix when you are happy.', 'Describe Your Issue')}
`,
  };
};

const wordpressHelp = helpPage({
  slug: 'wordpress-help',
  title: 'WordPress Help and Support, Pay Only When It Is Fixed',
  description: 'WordPress help and WordPress support: we back up your site, fix the WordPress issue while recording our screen, and you pay only when you are happy.',
  crumb: 'WordPress Help',
  h: {
    prices: "WordPress Help Prices, [[Paid When You Are Happy]]",
    steps: "Your WordPress Fix in [[Three Steps]]",
    developer: "The WordPress Developer Who [[Answers You]]",
    reviews: "What Clients Say About Our [[WordPress Support]]",
    faq: "Questions About WordPress Help and [[Support]]",
    cta: "Tell Us What Is Wrong With [[Your WordPress Site]]",
  },
  tag: 'WordPress Support',
  h1: 'WordPress Help, [[Pay Only When It Is Fixed]]',
  lead: `WordPress help from a developer who works in WordPress every day. Tell us what is wrong with your WordPress site: we back up your site, fix the issue while recording our screen, and you pay only when you are happy. Your first small fix, up to 30 minutes, is free; after that a one-time WordPress fix is ${P('one-time-wordpress-support')}.`,
  formHeading: 'Describe Your WordPress Issue',
  fixTitle: 'WordPress Support for [[Any Issue]]',
  fixIntro: 'Fast WordPress support for whatever went wrong: a WordPress update that broke the layout, a plugin conflict, a contact form that stopped sending, a WooCommerce checkout error or a slow WordPress site: tell us what happened and we fix it.',
  fixes: [
    { icon: 'wrench', title: 'Updates That Went Wrong', text: 'A WordPress, theme or plugin update that broke a page, the layout or the admin area.' },
    { icon: 'layers', title: 'Page Builders and Themes', text: 'Elementor, Oxygen Builder, Breakdance and theme issues: layouts that fall apart, menus, headers and mobile views.' },
    { icon: 'plug', title: 'Plugins and Conflicts', text: 'Plugins that clash, stop working or slow your WordPress site down.' },
    { icon: 'report', title: 'WooCommerce', text: 'Checkout and payment errors, product pages, emails and shipping settings.' },
    { icon: 'mail', title: 'Forms and Emails', text: 'Contact forms that stopped sending and WordPress emails that never arrive.' },
    { icon: 'clock', title: 'Slow WordPress Sites', text: 'Pages that load slowly on phones, heavy images and scripts.' },
  ],
  card: fixCard('One-Time WordPress Fix', 'One WordPress issue, fixed'),
  maintWord: 'WordPress',
  platformAsk: ' with your WordPress site',
  toolsTitle: 'More Than WordPress [[Fixes]]',
  toolsIntro: 'When your WordPress site needs something new rather than a fix, we build it: WordPress plugins, web apps and tools that work inside your site.',
  tools: [
    { icon: 'plug', title: 'Our Own WordPress Plugins', text: `${plugin.name}: ${plugin.short.charAt(0).toLowerCase()}${plugin.short.slice(1)} <a href="/plugins/${plugin.slug}/">See the plugin</a>.` },
    { icon: 'report', title: 'Quote and Booking Tools', text: 'Quote forms, calculators and booking tools built into WordPress and managed from your dashboard. <a href="/industries/">Try the demos</a>.' },
    { icon: 'code', title: 'Custom Features', text: 'A feature your theme or plugins cannot do, built for your WordPress site and documented.' },
  ],
  developer: 'Fırat Şekerli has worked on websites since 2013 and works in WordPress every day, with WooCommerce, Elementor, Oxygen Builder and Breakdance, and builds WordPress plugins for Oxygen Builder and Breakdance users. You deal with him from the first message to the fix.',
  asideTitle: 'Quick WordPress Support',
  faq: [
    { q: 'Which WordPress issues can you fix?', a: '<p>Updates that broke something, theme and page builder issues (Elementor, Oxygen Builder, Breakdance), plugin conflicts, WooCommerce checkout problems, forms that stopped sending and slow pages. If you are not sure, describe what you see and we will tell you honestly whether we can help.</p>' },
    { q: 'Do you offer ongoing WordPress support and maintenance?', a: '<p>Yes. Website maintenance is included in our SEO, Local SEO and GEO plan, and every new WordPress website or WooCommerce shop we build comes with the first year of plugin updates and fixes free.</p>' },
  ],
  ctaTitle: 'Tell Us What Is Wrong With [[Your WordPress Site]]',
});

const websiteHelp = helpPage({
  slug: 'website-help',
  title: 'Website Help, Pay Only When It Is Fixed',
  description: 'Website help and website support for WordPress, Shopify, Webflow, TYPO3 and custom sites: we back up your site, fix the issue and you pay only when you are happy.',
  crumb: 'Website Help',
  h: {
    prices: "Website Fix Prices, [[Paid When You Are Happy]]",
    steps: "Your Website Fix in [[Three Steps]]",
    developer: "The Developer Who Fixes Your Website [[Answers You]]",
    reviews: "What Clients Say About Our [[Website Support]]",
    faq: "Questions About Website Help and [[Support]]",
    cta: "Tell Us What Is Broken on [[Your Website]]",
  },
  tag: 'Website Support',
  h1: 'Website Help, [[Pay Only When It Is Fixed]]',
  lead: `Website help for any website, whatever it is built on. Tell us what is wrong: we back up your site, fix the issue while recording our screen, and you pay only when you are happy. Your first small fix, up to 30 minutes, is free; after that a one-time website fix is ${P('one-time-wordpress-support')}.`,
  formHeading: 'Describe Your Website Issue',
  fixTitle: 'Website Help for [[Any Website, Any Issue]]',
  fixIntro: 'A layout that falls apart after an update, a form that stops sending, a checkout error, a slow page, a broken link or a page that will not load: things break on every platform. Website support and website repair for any site: we fix your website wherever it runs.',
  fixes: [
    { icon: 'layers', title: 'WordPress and WooCommerce', text: 'Themes, page builders such as Elementor, Oxygen Builder and Breakdance, plugins, checkouts and updates that went wrong.' },
    { icon: 'web', title: 'Shopify and Webflow', text: 'Theme and layout issues, forms, apps and integrations, product pages and checkout problems.' },
    { icon: 'code', title: 'TYPO3, Next.js and HTML', text: 'Content management, extensions, custom code, builds and deployments, and hand-written sites.' },
  ],
  card: fixCard('One-Time Website Fix', 'One issue, fixed, on any platform'),
  maintWord: 'website',
  platformAsk: ' and what your site is built on',
  toolsTitle: 'Need More Than a [[Website Fix]]?',
  toolsIntro: 'When your website needs something new rather than a repair, we build it: web apps and tools that work inside the website you already have.',
  tools: [
    { icon: 'chat', title: 'Enquiry and Booking Tools', text: 'Answer every enquiry at any hour and book visits into your free slots. <a href="/industries/trades/">Try the demo</a>.' },
    { icon: 'report', title: 'Quote Calculators', text: 'Customers get a price or a rough range from your own rates on your website. <a href="/industries/windows-doors/">Try the demo</a>.' },
    { icon: 'plug', title: 'Works With Your Platform', text: 'WordPress, Shopify, Webflow, Wix, a custom site, or a standalone page with its own link. <a href="/industries/">See all tools</a>.' },
  ],
  developer: 'Fırat Şekerli has worked on websites since 2013 and builds and looks after websites every day, from WordPress and WooCommerce to Shopify, Webflow, TYPO3 and Next.js, including plugins for Oxygen Builder and Breakdance users. You deal with him from the first message to the fix.',
  asideTitle: 'Quick Website Support',
  faq: [
    { q: 'Which websites can you fix?', a: '<p>WordPress and WooCommerce, Shopify, Webflow, TYPO3, Next.js and plain HTML sites. If your site runs on something else, tell us what it is and we will tell you honestly whether we can help.</p>' },
    { q: 'Do you offer ongoing website maintenance?', a: '<p>Yes. Website maintenance is included in our SEO, Local SEO and GEO plan, and every new WordPress website or WooCommerce shop we build comes with the first year of plugin updates and fixes free.</p>' },
  ],
  ctaTitle: 'Tell Us What Is [[Broken]]',
});


// ---------------------------------------------------------------------------------------------------------------
// Ireland (Firat 24.11.2026): one page for Cork and the rest of Ireland, for organic search ("web design cork" and
// "website design cork", low difficulty) and for the Facebook and Instagram ads. Visitors in Ireland see euros (the
// middleware). Hooks agreed with Firat: one fixed price, no monthly costs with the Business Website, help for people who
// tried to build their site themselves, and 2 homepage designs to choose from (Firat 24.11.2026: 2 for everyone). Plan: claude/asparagents-ireland-meta-ads.md.

const corkFaq = faqBand(
  [
    { q: 'How much does a website cost?', a: `<p>A Business Website of 1 to 5 pages is ${P('business-website')}, one-time, and a WordPress website of 5 to 10 pages is ${P('wordpress-website')}. We agree the pages and what goes on them before any work starts, so the price is fixed.</p>` },
    { q: 'Are there monthly costs?', a: '<p>Not with a Business Website. It runs on Cloudflare’s free plan: the pages, the editor and its database are free, and the contact form fits within a free email plan. You only renew your domain name each year.</p><p>When a fee can apply:</p><ul><li>Photos are stored in Cloudflare R2. Its free tier covers 10 GB a month, far more than a small site needs, but Cloudflare asks you to add a payment method to switch it on. You are only charged above the free tier.</li><li>The free plan covers 100,000 requests a day. Above that, the site needs the Workers Paid plan, from $5 a month.</li><li>The free email plan covers 100 form emails a day.</li></ul><p>Sources: Cloudflare <a href="https://developers.cloudflare.com/workers/platform/pricing/" rel="noopener">Workers</a>, <a href="https://developers.cloudflare.com/d1/platform/pricing/" rel="noopener">D1</a> and <a href="https://developers.cloudflare.com/r2/pricing/" rel="noopener">R2</a> pricing.</p><p>A WordPress website needs hosting, which we help you choose.</p>' },
    { q: 'Is VAT added?', a: '<p>No. We invoice from Türkiye and add no VAT, so the price shown is the amount on your invoice.</p>' },
    { q: 'I started building my website myself. Can you use what I have?', a: '<p>Yes. Send us your text, photos, logo and a website you like, even if they are half finished. We use them for the 2 homepage designs, and we help with the text where it is missing.</p>' },
    { q: 'How do the 2 homepage designs work?', a: '<p>Based on your business and a website you like, we design 2 different homepages. You choose the one you like best, we build the rest of the site in the same style, and you approve it before it goes live.</p>' },
    { q: 'You are not in Ireland. How does it work?', a: '<p>We work fully remotely from Ankara, Türkiye, for clients in Ireland, the UK and the US. You talk to one person on WhatsApp, a call or email, and we usually reply within minutes, and always within 12 hours.</p>' },
    { q: 'Can I update the website myself?', a: '<p>Yes. A WordPress website has an admin panel for your text, photos and prices. A Business Website comes with a simple editor for the same things, and we show you how it works; fixes after handover are paid per fix.</p>' },
    freeOfferFaq,
  ],
  { title: 'Questions About Web Design in [[Cork]]', aside: { icon: 'chat', title: 'One Contact, Fast Replies', text: 'You deal with one person from start to finish, and we usually reply within minutes, and always within 12 hours.' }, cta: '' }
);

const webDesignCork = {
  path: '/web-design-cork/',
  title: 'Web Design Cork, Fixed Price and No Monthly Costs | asparagents',
  description: 'Web design for Cork and Irish small businesses: a fast website of 1 to 5 pages for one fixed price, no monthly hosting costs and 2 homepage designs to choose from.',
  crumbs: [{ name: 'Web Design Cork', path: '/web-design-cork/' }],
  contact: false,
  schema: [
    { '@type': 'Service', name: 'Web Design Cork', serviceType: 'Website design', provider: { '@id': orgId }, url: `${site.url}/web-design-cork/`, areaServed: [{ '@type': 'City', name: 'Cork' }, { '@type': 'Country', name: 'Ireland' }], offers: [{ '@type': 'Offer', name: 'Business Website', price: 447, priceCurrency: 'EUR' }, { '@type': 'Offer', name: 'WordPress Website', price: 547, priceCurrency: 'EUR' }] },
    corkFaq.ld,
  ],
  body: `
${hero({
  tag: 'Web Design Cork',
  h1: 'Web Design in Cork With [[No Monthly Costs]]',
  lead: `Web design for small businesses in Cork and across Ireland: a fast website of 1 to 5 pages for one fixed price of ${P('business-website')}, with no monthly hosting costs. You choose from 2 homepage designs made for your business before we build the rest.`,
  points: [`Fixed price: ${P('business-website')}, one-time, no VAT added`, 'No monthly costs: you only renew your domain', '2 homepage designs to choose from', 'Usually replies within minutes'],
  formHeading: 'Get a Quote for Your Website in Cork',
  cta: 'Get a Quote',
})}
${section({
  tag: 'Prices',
  title: 'Website Design Cork for [[One Fixed Price]]',
  intro: '<p>Two ways to get your website, both for one fixed price agreed before we start. Most small businesses in Cork need the Business Website: a few clear pages that load fast and bring calls and messages.</p>',
  body: `<div class="prices prices-two">${priceCard({ ...byId('business-website'), cta: ['Get a Quote', '#quote'] })}${priceCard({ ...byId('wordpress-website'), cta: ['Get a Quote', '#quote'] })}</div>`,
})}
${section({
  tone: 'light',
  tag: 'No Monthly Costs',
  title: 'What a Website in Cork [[Really Costs]]',
  intro: '<p>With a Business Website you pay once. After that, the only yearly cost is your domain name.</p>',
  body: cards([
    { icon: 'check', title: 'Once: the Website', text: `${P('business-website')} for 1 to 5 pages, designed, built and launched. No VAT added.` },
    { icon: 'clock', title: 'Every Year: Your Domain', text: 'Your .ie or .com domain is renewed with the company you bought it from, in your own name.' },
    { icon: 'shield', title: 'Hosting: Free', text: 'Static pages on Cloudflare are free with no traffic limit, and a small site stays well within the free plan for its contact form.' },
  ], { cols: 3 }),
})}
${section({
  tag: 'Tried It Yourself?',
  title: 'Started Your Website and [[Got Stuck]]?',
  intro: '<p>Many small business owners start with a website builder and run out of time. Send us what you have and we take it from there.</p>',
  body: steps([
    ['Send what you have', 'Your text, photos, logo and a website you like, even if they are half finished. A WhatsApp message is enough.'],
    ['Choose from 2 homepage designs', 'We design 2 different homepages for your business. You pick the one you like best.'],
    ['We build it and you approve it', 'We build the rest in the same style, check it on every phone and launch it when you are happy.'],
  ]),
})}
${section({
  tone: 'light',
  body: `<div class="two"><div class="two-media">${scrollShot('total-health-chiropractic', 'Total Health Chiropractic website, home page', TWO_SIZES)}</div><div class="two-text">
    <p class="label">Built in Cork</p>
    <h2 class="h2">${tt('A Website for a [[Cork Clinic]]')}</h2>
    <p>Total Health Chiropractic Wellness Clinic in Douglas, Cork, has been helping patients since 2003. We built its website to present its chiropractic care and its team, show video testimonials from patients and put an appointment request on every page.</p>
    <p><a class="card-link" href="/references/total-health-chiropractic/">See the project</a></p>
  </div></div>`,
})}
${reviewsBand({ title: 'What Clients Say About Our [[Web Design]]' })}
${corkFaq.html}
${lpCta('Ready for a Website With [[No Monthly Costs]]?', 'Tell us about your business in Cork and we usually reply within minutes, and always within 12 hours.', 'Get a Quote')}
`,
};

export default [tradesmen, plumbers, electricians, wordpressHelp, websiteHelp, webDesignCork];
