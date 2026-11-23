import { freeOfferFaq, site, services, references, featuredReferences, pageHead, section, cards, steps, serviceCards, checklist, twoCol, faqBand, refGrid, ctaRow, orgId, refShot, listedServices, tt, scrollShot, icon } from '../layout.mjs';
import { byId, priceBand } from '../prices.mjs';

// Service pages (/services/ and /services/<slug>/). Facts come from the live asparagents.com pages and the approved
// English articles in content/articles/. No rankings, traffic or results are promised.
const pricing = {
  'wordpress-support': ['one-time-wordpress-support'],
  websites: ['wordpress-website', 'business-website', 'woocommerce-shop'],
  seo: ['seo-local-seo-geo'],
  'local-seo': ['seo-local-seo-geo'],
  'geo-ai-visibility': ['seo-local-seo-geo'],
  'social-media-management': ['social-media-management'],
};
import { industryCards } from './industries.mjs';
const serviceLd = (s, description) => ({ '@type': 'Service', name: s.name, serviceType: s.name, description, url: `${site.url}/services/${s.slug}/`, provider: { '@id': orgId } });
const cwShot = () => scrollShot('cristal-windows', 'Cristal Windows website, home page');

// Agency guides linked from the matching service pages (internal links, audit 22.11.2026).
const agencyGuides = {
  seo: ['/white-label-seo-for-small-web-design-studios/', 'White Label SEO for Small Web Design Studios'],
  'local-seo': ['/white-label-geo-and-local-seo-for-small-agencies/', 'White Label GEO and Local SEO for Agencies'],
  'geo-ai-visibility': ['/white-label-geo-and-local-seo-for-small-agencies/', 'White Label GEO and Local SEO for Agencies'],
  'social-media-management': ['/white-label-social-media-management-for-small-web-studios/', 'White Label Social Media for Web Studios'],
};
const servicePage = ({ slug, title, description, h1, intro, includes, includesIntro = '', forWho, process, faqs, extra = '', media = '' }) => {
  const s = services.find((x) => x.slug === slug);
  const guide = agencyGuides[slug];
  const faq = faqBand([...faqs, ...(guide ? [{ q: 'How does this work white label for an agency?', a: `<p>Our guide explains what gets delivered, what your client sees and how the first month runs: <a href="${guide[0]}">${guide[1]}</a>.</p>` }] : []), freeOfferFaq], slug === 'wordpress-support' ? { aside: { icon: 'moon', title: 'Quick WordPress Support', text: 'We usually reply within minutes, and always within 12 hours, in English or Turkish, and you deal with one person from start to finish.' } } : {});
  const plans = (pricing[slug] || []).map(byId);
  return {
    path: `/services/${slug}/`,
    title,
    description,
    crumbs: [{ name: 'Services', path: '/services/' }, { name: s.name, path: `/services/${slug}/` }],
    schema: [serviceLd(s, description), faq.ld],
    body: `
${pageHead({ tag: s.name, title: h1, intro, actions: ctaRow(), media })}
${section({ tag: 'What We Do', title: 'What Is [[Included]]', intro: includesIntro, body: cards(includes.map(([title, text, ic]) => ({ icon: ic, title, text })), { cols: 3 }) })}
${section({ tone: 'light', body: twoCol({ media: cwShot(), reverse: true, html: `<p class="label">Who It Is For</p><h2 class="h2">${tt(forWho.title)}</h2>${forWho.html}` }) })}
${section({ tag: 'How It Works', title: 'Simple and [[Clear]]', body: steps(process) })}
${plans.length ? priceBand(plans, { title: 'Clear and Transparent [[Prices]]', intro: '<p><span class="cur-note">All prices are in US dollars, and we convert them to your country’s currency in your quote.</span> <a href="/prices/">All prices</a></p>' }) : ''}
${extra}
${faq.html}
${section({ tag: 'Also From Us', title: '[[Services]] That Work Better Together', body: serviceCards(listedServices.filter((x) => x.slug !== slug)) })}
`,
  };
};

const baseProcess = [
  ['Tell us what you need', 'Send the form, an email or a WhatsApp message. We usually reply within minutes.'],
  ['Plan and quote', 'We agree on the scope, the deliverables and the price before any work starts.'],
  ['The work and the report', 'We do the work, check with you at each stage and report what changed in plain language.'],
];

const wpSupport = servicePage({
  slug: 'wordpress-support',
  title: 'WordPress Support and Help, Pay When Fixed | asparagents',
  description: 'Tell us about one WordPress issue, we fix it, and you pay only when you are happy with the result. Themes, page builders, WooCommerce and plugins.',
  h1: 'WordPress Issues Fixed, [[Pay When You Are Happy]]',
  intro: 'You do not have to be a WordPress expert to get help. You tell us about the issue you are facing, we fix it, and you pay only after it is fixed and you are happy with the result.',
  includesIntro: 'Even if you are using a WordPress theme or plugin from a well-known provider, you may still run into problems from time to time. We know how to fix issues related to themes, page builders and plugins.',
  includes: [
    ['Themes', 'The themes we know and are ready to fix: Avada, Salient, Bridge, Woodmart and more.', 'layers'],
    ['Page Builders', 'Oxygen Builder, Breakdance, Elementor, WPBakery Page Builder, Bold Page Builder and more.', 'web'],
    ['Plugins', 'WooCommerce, popular SEO plugins, form plugins, membership plugins and more.', 'plug'],
    ['A Backup First', 'We back up your website before we change anything.', 'shield'],
    ['A Screen Recording', 'We record our screen while we fix the issue and send it to you, so you can see what we did.', 'report'],
    ['Custom Work', 'From a landing page to a full website, priced by your requirements.', 'code'],
  ],
  forWho: {
    title: 'For site owners and agencies with [[one thing to fix]]',
    html: '<p>A layout that falls apart after an update, a form that stops sending, a checkout error, a page builder that will not load: things break even on good themes and plugins.</p><p>Agencies use the same service when a client site needs a quick fix and their own team is busy.</p><p>You can describe the issue in writing or send a short screen recording with a free tool such as bubbles. It often helps us fix it faster.</p>',
  },
  process: [
    ['Describe the issue', 'Tell us about the issue you are having in as much detail as you can, or send us a video.'],
    ['We fix the issue', 'We back up your website and fix the issue, recording our screen while we work.'],
    ['You make the payment', 'You pay after the issue is solved and you are 100% happy with the fix.'],
  ],
  faqs: [
    { q: 'What if my issue is not fixed?', a: '<p>Then you do not pay. You pay only after the issue is fixed and you are happy with the result.</p>' },
    { q: 'Are you providing custom code?', a: '<p>Yes. For a single fix we use One-Time WordPress Support. Larger custom work, from a landing page to a full website, is priced by your requirements. <a href="/contact/">Tell us what you need</a>.</p>' },
    { q: 'How fast do you reply?', a: '<p>We usually reply within minutes, and always within 12 hours, in English or Turkish.</p>' },
    { q: 'Do you need my WordPress login?', a: '<p>We need access to fix the issue. Create a separate administrator account for us and remove it when the fix is done; never send us your own password.</p>' },
  ],
});

const websites = servicePage({
  slug: 'websites',
  title: 'Websites, WordPress and WooCommerce Shops | asparagents',
  description: 'Fast, mobile-friendly websites for small businesses: WordPress websites, WooCommerce shops and small websites without WordPress, with the SEO foundations built in.',
  h1: 'Websites and [[Online Shops]]',
  intro: 'We build WordPress websites, WooCommerce shops and small websites without WordPress that present your business clearly, open fast on every device and lead visitors to get in touch or buy. The SEO foundations are built in from the start, not added later.',
  includes: [
    ['Structure First', 'We agree on your goals, your audience and the page structure before the design starts.', 'layers'],
    ['Mobile-Friendly and Fast', 'Pages that work on every screen and open quickly.', 'web'],
    ['SEO Foundations', 'A clean heading structure, titles and descriptions, structured data and a sitemap.', 'seo'],
    ['WooCommerce', 'Online shops with payment setup.', 'plug'],
    ['Page Builders You Know', 'Breakdance, Oxygen, Elementor or the block editor.', 'code'],
    ['Easy to Update', 'Change your content in WordPress, or update a website without WordPress with your own AI assistant.', 'report'],
  ],
  forWho: {
    title: 'For small businesses and [[the agencies behind them]]',
    html: '<p>Service businesses, trades, consultancies, clinics and online shops that need a website people trust.</p><p>Agencies can also hand us a build and sell it under their own name. See <a href="/white-label/">white label for agencies</a>.</p><p>Our references include a window and door installer in Hampshire and an architectural design practice in Oxfordshire. <a href="/references/">See the projects</a></p>',
  },
  process: [
    ['Needs and structure', 'We agree on the goals, the audience and the pages before any design work.'],
    ['Design and build', 'We design the pages, get your approval, then build and test speed, mobile layout and forms.'],
    ['Launch', 'We launch the site and stay available for changes after launch.'],
  ],
  faqs: [
    { q: 'How long does a website take?', a: '<p>It depends on the number of pages and the content you have. We give you a timeline with the quote.</p>' },
    { q: 'Can I update the website myself?', a: '<p>Yes. A WordPress website or shop has an admin panel you can use to change your content. A Business Website has no admin panel: we hand it over with a guide, so your own AI assistant can make updates.</p>' },
    { q: 'WordPress Website or Business Website?', a: '<p>A Business Website suits 1 to 5 pages of mostly static content: it is very fast, hosted on Cloudflare, has no plugins to update and the code is yours in your own GitHub. A WordPress Website suits 5 to 10 pages you want to edit in an admin panel, and its first year of plugin updates and fixes is free.</p>' },
    { q: 'Do you build online shops?', a: '<p>Yes, with WooCommerce, including payment setup.</p>' },
    { q: 'Can you build a site my agency sells under its own name?', a: '<p>Yes. That is our <a href="/white-label/">white label service</a>: your brand, your client, our work in the background.</p>' },
  ],
  extra: section({ tone: 'light', tag: 'Projects', title: 'From [[Our Work]]', body: refGrid(featuredReferences) + `<div class="btns" style="justify-content:center;margin-top:40px"><a class="btn" href="/references/">All References</a></div>` }),
});

const seo = servicePage({
  slug: 'seo',
  title: 'SEO Services and White Label SEO | asparagents',
  description: 'Technical and on-page SEO, content for real search questions and a plain-language monthly report, for small businesses or white label for agencies.',
  h1: 'SEO That Helps the [[Right People]] Find You',
  intro: 'Your customers search on Google before they call. From the technical foundations to the content, we work on your site so it appears for the searches your buyers really make.',
  includes: [
    ['Technical SEO', 'Speed, indexing, sitemaps, redirects and broken pages.', 'code'],
    ['On-Page SEO', 'Titles, meta descriptions, headings and internal links.', 'seo'],
    ['Structured Data', 'So search engines and AI assistants understand the business.', 'layers'],
    ['Content', 'Service pages and articles written for real search questions.', 'report'],
    ['Local SEO', 'Google Business Profile and local pages. <a href="/services/local-seo/">More about local SEO</a>', 'pin'],
    ['Monthly Report', 'Rankings, traffic, profile activity and AI mentions in plain language.', 'chat'],
  ],
  forWho: {
    title: 'For businesses whose customers [[search on Google]]',
    html: '<p>Service businesses, trades, clinics, consultancies and online shops whose customers start with a search.</p><p>Agencies can sell the same work under their own brand. See <a href="/white-label/">white label for agencies</a>.</p><p class="note">No one can honestly guarantee a ranking on Google. We report every month what we did and what changed.</p>',
  },
  process: baseProcess,
  faqs: [
    { q: 'When do SEO results show?', a: '<p>Technical fixes can show sooner; content and authority work builds up over months, not weeks. That is why we report what changed every month.</p>' },
    { q: 'Do you guarantee rankings?', a: '<p>No. Rankings depend on many factors outside anyone’s control. We commit to the work and to clear reporting.</p>' },
    { q: 'What is the difference between SEO and local SEO?', a: '<p>SEO works on general search results. Local SEO works on Google Maps and “near me” searches. See <a href="/services/local-seo/">Local SEO</a>.</p>' },
  ],
});

const localSeo = servicePage({
  slug: 'local-seo',
  title: 'Local SEO Services and Google Business Profile | asparagents',
  description: 'Google Business Profile management, local pages, consistent business details and a review strategy for businesses that serve a city or region.',
  h1: 'Be Found on [[Google Maps]] with Local SEO',
  intro: 'When someone searches for “a dentist near me” or “plumber in Leeds”, the map results come first. We work on your Google Business Profile and your website so you stand out in those searches.',
  includes: [
    ['Google Business Profile', 'Setup, categories, services, photos, posts and description.', 'pin'],
    ['Consistent Details', 'The same name, address and phone number on your website, your profile and directories.', 'layers'],
    ['Local Pages', 'Useful pages for the areas you serve.', 'web'],
    ['Review Strategy', 'An easy way to ask happy customers for reviews, and replies to reviews.', 'star'],
    ['Monthly Report', 'Profile views, searches and map results in plain language.', 'report'],
    ['Together with GEO', 'AI assistants lean on the same signals. <a href="/services/geo-ai-visibility/">More about GEO</a>', 'ai'],
  ],
  forWho: {
    title: 'For businesses that serve [[a city or region]]',
    html: '<p>Clinics, trades, shops, restaurants, law firms and regional service businesses whose customers are nearby.</p><p>Google says local results are based mainly on relevance, distance and prominence, and a complete, active Business Profile feeds all three.</p>',
  },
  process: baseProcess,
  faqs: [
    { q: 'Can you set up a Google Business Profile for me?', a: '<p>Yes, we help with the setup. Google verifies the business with the owner, so you take part in that step.</p>' },
    { q: 'Do you buy reviews?', a: '<p>No. Fake reviews break Google’s rules and put the profile at risk. We help you ask real customers.</p>' },
    { q: 'Why do you sell local SEO together with GEO?', a: '<p>AI assistants lean on the same signals as Google’s local results, so a strong profile helps in both places. See <a href="/services/geo-ai-visibility/">GEO and AI visibility</a>.</p>' },
  ],
});

const geo = servicePage({
  slug: 'geo-ai-visibility',
  title: 'Generative Engine Optimization (GEO) Services | asparagents',
  description: 'We check whether ChatGPT, Gemini and Google AI Overviews mention your business, fix what the checks point to and report it every month.',
  h1: 'Get Mentioned [[in AI Answers]] with GEO',
  intro: 'Buyers now ask AI assistants for recommendations: “Who is a good dentist near me?” GEO (generative engine optimization) is the work of making a business show up, and be described correctly, in those answers.',
  includes: [
    ['A Prompt List', 'The buyer questions to track, agreed with you at the start.', 'chat'],
    ['Monthly AI Checks', 'ChatGPT, Gemini and Google AI Overviews: who is named, who is cited and which sources were used.', 'ai'],
    ['Fixes on the Website', 'Service pages, FAQs and structured data that make your facts easy to quote.', 'code'],
    ['Consistent Facts', 'The same details on your site, your Google Business Profile and directories.', 'layers'],
    ['Local SEO', 'A complete, active Google Business Profile.', 'pin'],
    ['A Report You Can Forward', 'Plain language, no jargon.', 'report'],
  ],
  forWho: {
    title: 'For businesses whose buyers [[ask AI before they call]]',
    html: '<p>GEO builds on SEO. Google says the same SEO best practices apply to its AI features and that there are no extra technical requirements to appear in AI Overviews.</p><p>Agencies can sell GEO under their own name. Read <a href="/white-label-geo-and-local-seo-for-small-agencies/">white label GEO and local SEO for small agencies</a>.</p>',
  },
  process: baseProcess,
  faqs: [
    { q: 'What is the difference between GEO and SEO?', a: '<p>SEO aims for a place in the list of search results. GEO aims for a mention inside the AI answer itself. The two overlap, so we do them together.</p>' },
    { q: 'Can you guarantee that ChatGPT will recommend my business?', a: '<p>No. Nobody controls what an AI assistant says. We check every month, fix what the checks point to and show you what changed.</p>' },
  ],
});

const social = servicePage({
  slug: 'social-media-management',
  title: 'Social Media Management for Small Businesses | asparagents',
  description: 'A monthly content calendar, post designs, captions, scheduling and a plain-language report, for small businesses or white label for agencies.',
  h1: 'Social Media Management That [[Keeps You Active]]',
  intro: 'Social media keeps a business visible to the people who already follow it. We plan, design and publish the posts, so your channels stay active every month.',
  includes: [
    ['A Content Calendar', 'Planned topics and dates, shared for approval before anything goes live.', 'report'],
    ['Post Designs', 'Branded graphics and carousels that match your look.', 'layers'],
    ['Captions and Hashtags', 'Written in your tone of voice.', 'chat'],
    ['Short Videos', 'Reels or short clips edited from footage you provide.', 'web'],
    ['Scheduling and Posting', 'On the agreed platforms at the agreed times.', 'clock'],
    ['A Monthly Report', 'Reach, engagement and follower growth in plain language.', 'social'],
  ],
  forWho: {
    title: 'For businesses and [[the studios]] that look after them',
    html: '<p>Small businesses that want regular, good-looking posts without doing them in-house.</p><p>Web studios can sell the service under their own brand. Read <a href="/white-label-social-media-management-for-small-web-studios/">white label social media management for small web studios</a>.</p>',
  },
  process: baseProcess,
  faqs: [
    { q: 'Do you post without my approval?', a: '<p>No. The content calendar is shared for approval before anything goes live.</p>' },
    { q: 'Can my agency sell this under its own name?', a: '<p>Yes. The end client sees your emails, your reports and your invoices, not our name. See <a href="/white-label/">white label for agencies</a>.</p>' },
  ],
});

const accessibility = servicePage({
  slug: 'accessibility-fixes',
  title: 'Website Accessibility Fixes and Remediation | asparagents',
  description: 'Your accessibility reporting tool lists the issues; we fix them on the platform you already use, check them again and tell you what changed.',
  h1: 'Accessibility Fixes for [[Your Website]]',
  intro: 'Your accessibility reporting tool lists the issues. We fix them on the platform your site runs on, check them again with the same tool, and tell you in plain language what changed. Your team does not have to learn accessibility first.',
  includesIntro: 'We work from the report your own tool produces, so you can see every fix in the place you already track them.',
  includes: [
    ['Fixes From Your Report', 'We work through the issues your reporting tool lists, starting with the ones that affect the most pages.', 'report'],
    ['On Your Platform', 'Webflow, WordPress, Shopify, Wix or a custom site. No rebuild needed.', 'web'],
    ['Checked Again', 'After each round of fixes we check the pages again with your tool.', 'check'],
    ['Plain Language Summary', 'What was fixed, on which pages, and anything that needs a decision from you.', 'chat'],
    ['Under Your Brand', 'Agencies can sell the work to their clients as their own.', 'users'],
    ['Ongoing or One-Off', 'Clear the current report once, or keep new issues fixed as your site changes.', 'clock'],
  ],
  forWho: {
    title: 'For companies and agencies with [[a report full of issues]]',
    html: '<p>Your reporting tool shows a long list of accessibility issues, and your team has neither the time nor the know-how to work through it.</p><p>Agencies can hand us a client’s report and sell the fixes under their own brand. See <a href="/white-label/">White Label &amp; Outsourcing</a>.</p>',
  },
  process: [
    ['Send us the report', 'Share the report from your accessibility tool and access to your site or a staging copy.'],
    ['We fix and check again', 'We fix the issues on your platform and check them again with the same tool.'],
    ['You get the summary', 'A plain language summary of what changed and anything that needs your decision.'],
  ],
  faqs: [
    { q: 'Do you need a report from an accessibility tool?', a: '<p>Yes, we work from the report your tool produces, so every fix can be checked in the same place. If you do not have one yet, <a href="/contact/">tell us</a> and we will talk about how to start.</p>' },
    { q: 'Which platforms do you work on?', a: '<p>Webflow, WordPress, Shopify, Wix and custom built sites.</p>' },
    { q: 'Can my agency sell this under its own name?', a: '<p>Yes. The client sees your reports and your invoices, not our name. See <a href="/white-label/">White Label &amp; Outsourcing</a>.</p>' },
  ],
});

const listPage = {
  path: '/services/',
  title: 'Services for Small Businesses and Agencies | asparagents',
  description: 'Website tools that solve everyday problems, white label work for agencies, websites, SEO, local SEO, GEO, social media and WordPress support.',
  crumbs: [{ name: 'Services', path: '/services/' }],
  body: `
${pageHead({ tag: 'Our Services', title: 'Tools, Websites and Search for [[Small Businesses and Agencies]]', intro: '<p>We build tools that solve your everyday problems and connect them to the website you already have. Around them we offer the services they need: websites, search, AI visibility, social media and accessibility.</p><p>Agencies and companies can hand any of it over to us, under their own brand if they want.</p>', actions: ctaRow() })}
${section({
  tag: 'Where We Start',
  title: 'Tools Built for [[Your Industry]]',
  body: `<div class="feature-card"><div><p class="label">Our Main Focus</p><h3 class="h2" style="font-size:clamp(24px,2.4vw,32px)">Quotes, Bookings, Estimates, Paperwork and Repairs</h3><p>Tools that take repeated work off your team, built around your rules and prices and connected to your website. Each industry has a working demo you can try.</p><div class="btns"><a class="btn btn-soft" href="/industries/">See the Industries</a></div></div>
  <ul class="fc-tiles">${industryCards.map((c) => `<li><a href="${c.href}"><span class="fc-i">${icon[c.icon]}</span><span>${c.title.match(/>([^<]*)<\/span>/)[1].replace(/ and /g, ' &amp; ')}<small>${c.title.replace(/<span[^>]*>[^<]*<\/span>/, '')}</small></span></a></li>`).join('')}</ul></div>`,
})}
${section({ tone: 'light', tag: 'Services', title: 'Choose What You [[Need]]', body: `${cards([
    { icon: 'users', title: 'White Label &amp; Outsourcing', text: 'For agencies and companies: hand us the work your team does not have the time or the know-how for, <strong>under your brand</strong> if you want.', href: '/white-label/', linkText: 'More about White Label' },
    ...listedServices.filter((sv) => sv.slug !== 'wordpress-support').map((sv) => ({ icon: sv.icon, title: sv.card?.title || sv.name, text: sv.card?.text || sv.strip, href: `/services/${sv.slug}/`, linkText: `More about ${sv.name}` })),
  ], { cols: 3, cls: 'services' })}
  <div class="quick-band"><div><h3>Need One WordPress Fix?</h3><p>${services.find((x) => x.slug === 'wordpress-support').strip}</p></div><div class="btns"><a class="btn" href="/services/wordpress-support/">WordPress Support</a></div></div>` })}
${section({ body: twoCol({ media: cwShot(), html: `<p class="label">One Partner</p><h2 class="h2">One Person From [[Start to Finish]]</h2><p>asparagents is the studio of Fırat Şekerli, a web and digital marketing specialist based in Ankara, Türkiye, building websites and website tools for small businesses and agencies. You deal with one person from the first message to the last report.</p>${checklist(['We usually reply within minutes', 'In English or Turkish', 'Fully remote, for clients and agencies abroad'])}${ctaRow()}` }).replace(/\[\[(.+?)\]\]/g, '<span class="hl">$1</span>') })}
`,
};

export default [listPage, websites, seo, localSeo, geo, social, accessibility, wpSupport];
