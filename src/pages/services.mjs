import { site, services, references, pageHead, section, cards, steps, serviceCards, checklist, twoCol, faqBand, refGrid, ctaRow, orgId, deskPhoto, refShot, listedServices, tt, scrollShot } from '../layout.mjs';
import { byId, priceBand } from '../prices.mjs';

// Service pages (/services/ and /services/<slug>/). Facts come from the live asparagents.com pages and the approved
// English articles in content/articles/. No rankings, traffic or results are promised.
const pricing = {
  'wordpress-support': ['one-time-wordpress-support'],
  websites: ['wordpress-website', 'woocommerce-shop'],
  seo: ['seo-local-seo-geo'],
  'local-seo': ['seo-local-seo-geo'],
  'geo-ai-visibility': ['seo-local-seo-geo'],
  'social-media-management': ['social-media-management'],
};
const serviceLd = (s, description) => ({ '@type': 'Service', name: s.name, serviceType: s.name, description, url: `${site.url}/services/${s.slug}/`, provider: { '@id': orgId }, areaServed: ['GB', 'US', 'IE'] });
const cwShot = () => scrollShot('cristal-windows', 'Cristal Windows website, home page');

const servicePage = ({ slug, title, description, h1, intro, includes, includesIntro = '', forWho, process, faqs, extra = '', media = '' }) => {
  const s = services.find((x) => x.slug === slug);
  const faq = faqBand(faqs);
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
${plans.length ? priceBand(plans, { title: 'Clear [[Prices]]', intro: 'Prices in US dollars and British pounds. <a href="/prices/">All prices</a>' }) : ''}
${extra}
${faq.html}
${section({ tag: 'Also From Us', title: '[[Services]] That Work Better Together', body: serviceCards(listedServices.filter((x) => x.slug !== slug)) })}
`,
  };
};

const baseProcess = [
  ['Tell us what you need', 'Send the form, an email or a WhatsApp message. We reply within 12 hours.'],
  ['Plan and quote', 'We agree on the scope, the deliverables and the price before any work starts.'],
  ['The work and the report', 'We do the work, check with you at each stage and report what changed in plain language.'],
];

const wpSupport = servicePage({
  slug: 'wordpress-support',
  title: 'One-Time WordPress Support, Pay When Fixed | asparagents',
  description: 'Tell us about one WordPress issue, we fix it, and you pay only when you are happy with the result. Themes, page builders, WooCommerce and plugins.',
  h1: 'WordPress Agents Are Here to [[Fix Your Issues]]',
  intro: 'You do not have to be a WordPress expert to get help. You tell us about the issue you are facing, we fix it, and you pay only after it is fixed and you are happy with the result.',
  includesIntro: 'Even if you are using a WordPress theme or plugin from a well-known provider, you may still run into problems from time to time. We know how to fix issues related to themes, page builders and plugins.',
  includes: [
    ['Themes', 'The themes our support agents know and are ready to fix: Avada, Salient, Bridge, Woodmart and more.', 'layers'],
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
    { q: 'How fast do you reply?', a: '<p>We reply to every message within 12 hours, in English or Turkish.</p>' },
    { q: 'Do you need my WordPress login?', a: '<p>We need access to fix the issue. Create a separate administrator account for us and remove it when the fix is done; never send us your own password.</p>' },
  ],
});

const websites = servicePage({
  slug: 'websites',
  title: 'WordPress and WooCommerce Websites | asparagents',
  description: 'Fast, mobile-friendly WordPress websites and WooCommerce shops for small businesses, with the SEO foundations built in from the start.',
  h1: 'WordPress Websites and [[WooCommerce Shops]]',
  intro: 'We build WordPress websites that present your business clearly, open fast on every device and lead visitors to get in touch or buy. The SEO foundations are built in from the start, not added later.',
  includes: [
    ['Structure First', 'We agree on your goals, your audience and the page structure before the design starts.', 'layers'],
    ['Mobile-Friendly and Fast', 'Pages that work on every screen and open quickly.', 'web'],
    ['SEO Foundations', 'A clean heading structure, titles and descriptions, structured data and a sitemap.', 'seo'],
    ['WooCommerce', 'Online shops with payment setup.', 'plug'],
    ['Page Builders You Know', 'Breakdance, Oxygen, Elementor or the block editor.', 'code'],
    ['Easy to Update', 'You can change your content yourself.', 'report'],
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
    { q: 'Can I update the website myself?', a: '<p>Yes. Every site we build has an admin panel you can use to change your content.</p>' },
    { q: 'Do you build online shops?', a: '<p>Yes, with WooCommerce, including payment setup.</p>' },
    { q: 'Can you build a site my agency sells under its own name?', a: '<p>Yes. That is our <a href="/white-label/">white label service</a>: your brand, your client, our work in the background.</p>' },
  ],
  extra: section({ tone: 'light', tag: 'Projects', title: 'From [[Our Work]]', body: refGrid(references) }),
});

const seo = servicePage({
  slug: 'seo',
  title: 'SEO for Small Businesses and Agencies | asparagents',
  description: 'Technical and on-page SEO, content for real search questions and a plain-language monthly report, for small businesses or white label for agencies.',
  h1: 'SEO That Helps the [[Right People]] Find You',
  intro: 'Your customers search on Google before they call. From the technical foundations to the content, we work on your site so it appears for the searches your buyers really make.',
  includes: [
    ['Technical SEO', 'Speed, indexing, sitemaps, redirects and broken pages.', 'code'],
    ['On-Page SEO', 'Titles, meta descriptions, headings and internal links.', 'seo'],
    ['Structured Data', 'So search engines and AI assistants understand the business.', 'layers'],
    ['Content', 'Service pages and articles written for real search questions.', 'report'],
    ['Local SEO', 'Google Business Profile and local pages. <a href="/services/local-seo/">More</a>', 'pin'],
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
  title: 'Local SEO and Google Business Profile | asparagents',
  description: 'Google Business Profile management, local pages, consistent business details and a review strategy for businesses that serve a city or region.',
  h1: 'Be Found on [[Google Maps]] with Local SEO',
  intro: 'When someone searches for “a dentist near me” or “plumber in Leeds”, the map results come first. We work on your Google Business Profile and your website so you stand out in those searches.',
  includes: [
    ['Google Business Profile', 'Setup, categories, services, photos, posts and description.', 'pin'],
    ['Consistent Details', 'The same name, address and phone number on your website, your profile and directories.', 'layers'],
    ['Local Pages', 'Useful pages for the areas you serve.', 'web'],
    ['Review Strategy', 'An easy way to ask happy customers for reviews, and replies to reviews.', 'star'],
    ['Monthly Report', 'Profile views, searches and map results in plain language.', 'report'],
    ['Together with GEO', 'AI assistants lean on the same signals. <a href="/services/geo-ai-visibility/">More</a>', 'ai'],
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
  title: 'GEO and AI Visibility for Small Businesses | asparagents',
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
  title: 'Social Media Management | asparagents',
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

const listPage = {
  path: '/services/',
  title: 'WordPress Support, Websites, SEO and GEO | asparagents',
  description: 'One-time WordPress fixes, WordPress and WooCommerce websites, SEO, local SEO, GEO and social media management, for businesses or white label for agencies.',
  crumbs: [{ name: 'Services', path: '/services/' }],
  body: `
${pageHead({ tag: 'Our Services', title: 'What We [[Do]]', intro: '<p>We fix WordPress issues one at a time, build WordPress and WooCommerce websites, and help businesses be found on Google, on Google Maps and in AI answers.</p><p>Agencies can get all of it white label: your brand, your client, our work in the background. <a href="/white-label/">White label for agencies</a></p>', actions: ctaRow(), media: deskPhoto() })}
${section({ tag: 'Services', title: 'Choose What You [[Need]]', body: serviceCards() })}
${section({ tone: 'light', body: twoCol({ media: cwShot(), html: `<p class="label">One Partner</p><h2 class="h2">One Person From [[Start to Finish]]</h2><p>asparagents is the English-speaking studio of Fırat Şekerli, a web and digital marketing specialist based in Ankara, Türkiye. You deal with one person from the first message to the last report.</p>${checklist(['We reply to every message within 12 hours', 'In English or Turkish', 'Fully remote, for clients and agencies abroad'])}${ctaRow()}` }).replace(/\[\[(.+?)\]\]/g, '<span class="hl">$1</span>') })}
`,
};

export default [listPage, wpSupport, websites, seo, localSeo, geo, social];
