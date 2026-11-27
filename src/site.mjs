// asparagents.com site-wide facts. Every fact here comes from the live asparagents.com pages (About Us, Contact,
// Cookie Policy, plugin pages, 20.11.2026) or was confirmed by Firat. Do not add claims that are not.

export const authors = {
  firat: {
    name: 'Fırat Şekerli',
    url: 'https://www.linkedin.com/in/firatsekerli/',
    page: '/about-us/',
    sameAs: ['https://www.linkedin.com/in/firatsekerli/', 'https://www.firatsekerli.com/'],
  },
};

export const site = {
  name: 'asparagents',
  url: 'https://asparagents.com',
  // WooCommerce (plugins, one-time support, cart, checkout, accounts, licences) lives on its own subdomain.
  shop: 'https://shop.asparagents.com/',
  lang: 'en',
  locale: 'en_GB',
  phone: '+90 533 631 19 07',
  phoneHref: 'tel:+905336311907',
  email: 'info@asparagents.com',
  whatsapp:
    'https://wa.me/905336311907?text=' +
    encodeURIComponent('Hello. Please tell us your name, your company (if any) and what you need, and we will get back to you shortly.'),
  sameAs: ['https://www.linkedin.com/in/firatsekerli/'],
  // asparajans and asparagents are Fırat Şekerli's brands; the business is registered in his name.
  legalName: 'Fırat Şekerli',
  address: {
    text: 'Söğütözü Mah. Söğütözü Cad. No: 2A, Kapı No: 13, 06510 Çankaya / Ankara / Türkiye',
    street: 'Söğütözü Mah. Söğütözü Cad. No: 2A, Kapı No: 13',
    postalCode: '06510',
    locality: 'Çankaya',
    region: 'Ankara',
    country: 'TR',
  },
  gtmId: 'GTM-TCGBCSBJ',
  googleProfile: 'https://g.co/kgs/yAuUq41',
  reviewsNote: 'Reviews from the Google profile of asparajans, our Turkish studio. <a href="https://g.co/kgs/yAuUq41" target="_blank" rel="noopener">See them on Google</a>',
  counters: [],
  year: new Date().getFullYear(),
};

// Services. The paths are English (/services/<slug>/). card = how the service shows in the service strip.
// Order (Firat, 21.11.2026): AI tools for industries lead (see /industries/), then these supporting services, with
// one-time WordPress support last as a quick entry point.
export const services = [
  {
    slug: 'websites',
    name: 'Websites',
    lines: ['Websites', 'and Shops'],
    label: 'Build',
    icon: 'web',
    short: 'Fast, mobile-friendly websites and online shops, with the SEO foundations built in.',
    strip: '<strong>Fast</strong>, mobile-friendly websites and <strong>online shops</strong>, with the SEO foundations built in from the start.',
  },
  {
    slug: 'seo',
    name: 'SEO',
    label: 'Search',
    icon: 'seo',
    short: 'Technical and on-page SEO so the right people find you on Google.',
    strip: '<strong>Technical</strong> and <strong>on-page SEO</strong> so the right people find you on Google.',
    card: { title: 'SEO and Local SEO', lines: ['SEO and', 'Local SEO'], label: 'Google and Maps', text: 'Be found in <strong>Google search</strong> and on <strong>Google Maps</strong> by customers in your area. Details: <a href="/services/local-seo/">Local SEO</a>.' },
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    listed: false,
    label: 'Google Maps',
    icon: 'pin',
    short: 'Google Business Profile and “near me” searches for businesses that serve an area.',
    strip: '<strong>Google Business Profile</strong> and “near me” searches for businesses that serve an area.',
  },
  {
    slug: 'geo-ai-visibility',
    name: 'GEO and AI Visibility',
    lines: ['GEO and AI', 'Visibility'],
    label: 'GEO',
    icon: 'ai',
    short: 'Get your brand mentioned in ChatGPT, Gemini and Google AI answers.',
    strip: 'Get your brand mentioned in <strong>ChatGPT</strong>, <strong>Gemini</strong> and Google’s <strong>AI answers</strong>.',
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    lines: ['Social Media', 'Management'],
    label: 'Social',
    icon: 'social',
    short: 'A content plan, post designs and regular publishing that keep your brand active.',
    strip: 'A <strong>content plan</strong>, post designs and <strong>regular publishing</strong> that keep your brand active.',
  },
  {
    slug: 'accessibility-fixes',
    name: 'Accessibility Fixes',
    lines: ['Accessibility', 'Fixes'],
    label: 'Access',
    icon: 'shield',
    short: 'We fix the issues your accessibility reporting tool finds, on the platform you already use.',
    strip: 'We fix the issues your <strong>accessibility reporting tool</strong> finds, on <strong>any platform</strong>, and check them again.',
  },
  {
    slug: 'wordpress-support',
    name: 'WordPress Support',
    lines: ['WordPress', 'Support'],
    label: 'Fix It Once',
    icon: 'wrench',
    short: 'One WordPress issue fixed for a fixed price. You pay after it is fixed and you are happy.',
    strip: 'You tell us about <strong>one issue</strong>, we fix it, and you <strong>pay only when you are happy</strong> with the result.',
  },
];

// Countries of partner agencies and clients (counts only, never names). Same list as asparajans.com, confirmed by
// Firat on 25.10.2026 and on the asparagents About Us page; never present it as complete.
export const worldwide = [
  { code: 'GB', name: 'United Kingdom', agencies: 2, clients: 3 },
  { code: 'US', name: 'United States', agencies: 2, clients: 2 },
  { code: 'AT', name: 'Austria', agencies: 1, clients: 0 },
  { code: 'ZA', name: 'South Africa', agencies: 1, clients: 0 },
  { code: 'NL', name: 'Netherlands', agencies: 1, clients: 0 },
  { code: 'IE', name: 'Ireland', agencies: 0, clients: 1 },
];

// References: only live sites Firat built directly (never partner-agency work). Images are shared with asparajans.com.
// PENDING Firat (20.11.2026): which other UK/US sites may be shown.
import { moreReferences, stories, referenceAlts } from './reference-stories.mjs';

const baseReferences = [
  { key: 'cristal-windows', name: 'Cristal Windows', sector: 'Windows and Doors', type: 'Website', place: 'Fleet, Hampshire, England', url: 'https://cristalwindows.co.uk/', mock: true, detail: 'cristal-windows', color: '#1f3a8a',
    text: 'For Cristal Windows, which installs double and triple glazed windows and doors in England, we designed a website that highlights its products, customer reviews and online quote process. We also continue to maintain and support the site.',
    // Tools Firat built for Cristal Windows (Firat 21.11.2026: show them on this page; 22.11.2026: as prototypes on
    // our site, not links to his). Facts from the plugins' own descriptions and the Survey Pro readme.
    tools: [
      { demo: 'quote', label: 'Online Quotation Form', title: 'A Quote in [[Four Steps]]',
        text: 'Homeowners choose a product, a style and a configuration, add each window or door to a basket and send one quote request for all of them.',
        points: ['Windows, doors and bay windows in one form', 'Product types, materials, colours and styles managed in WordPress', 'Quote requests handled in the WordPress dashboard'] },
      { demo: 'survey', label: 'Survey App', title: 'Surveys on a Phone, [[Not on Paper]]',
        text: 'Cristal Windows surveyors measure every window, door and bay window on a phone or tablet, and the office receives a finished survey it can order from.',
        points: ['Every required answer is checked before a survey can be sent', 'Photos, voice notes and drafts saved on the device', 'Bay windows drawn as seen from inside the room', 'The office gets an email with the survey PDF and tracks each job from submitted to installed', 'Styles come from the quotation form, so both always match'] },
      { demo: 'checker', label: 'Conservation Area Checker', title: 'Planning Questions [[Answered Early]]',
        text: 'Visitors enter a postcode and see whether they are in the service area, and whether the address may be in a conservation area or an Article 4 Direction area, which can affect replacement windows and doors.',
        points: ['Works from any page through a postcode box', 'Service area, counties and the call to action set in WordPress', 'Every result leads to booking a free survey'],
        source: 'Postcodes are located with <a href="https://postcodes.io/" target="_blank" rel="noopener">postcodes.io</a> and checked against the conservation area and Article 4 Direction datasets of <a href="https://www.planning.data.gov.uk/" target="_blank" rel="noopener">Planning Data</a> (GOV.UK).' },
    ] },
  { key: 'misbourne-design', name: 'Misbourne Design', sector: 'Architectural Design', type: 'Website', place: 'Oxfordshire, England', url: 'https://misbournedesign.com/', mock: true, detail: 'misbourne-design', color: '#0f8a3c', built: true,
    text: 'For Misbourne Design Associates, which offers residential and commercial architectural design in Oxfordshire and the surrounding counties in England, we developed a WordPress website that highlights its services, way of working and projects.' },
  // Firat 21.11.2026: Dimak gets its own reference page; the tools are shown as built for Dimak. Text and images from asparajans.com.
  { key: 'dimak-kapi', name: 'Dimak Kapı', sector: 'Fire Door Manufacturer', type: 'Corporate Website', place: 'Ankara, Türkiye', url: 'https://www.dimak.com.tr/', mock: true, detail: 'dimak-kapi', color: '#ff6b00',
    text: 'For Dimak Kapı, which makes fire doors, sectional doors and steel doors, we designed a corporate website that highlights its products, reference projects and quote process.',
    // Firat 27.11.2026: show the two web apps built for Dimak as working prototypes (no screenshots exist). Facts only
    // from the apps' repos (dimak-prospector: README, lib/config.ts, lib/score.ts, app/guide, docs/V2.md;
    // montaj-programi: README, docs/domain-model.md, packages/rules, supabase/migrations/0003_seed_dimak.sql).
    toolsIntro: 'Alongside the website, we built two web apps for Dimak Kapı: one finds companies to sell to, the other plans door installations. Try simplified versions below, rebuilt from the apps with sample data.',
    tools: [
      { demo: 'prospector', label: 'Prospector', title: 'New Buyers Found [[and Scored]]',
        text: 'Prospector searches Google business listings for distributors, contractors and suppliers in the countries and cities chosen, then scores, tags and tracks every company in one list.',
        points: ['Every chosen city is searched and the results merged, so each company appears once', 'A clear fit score from the business type and your own good-fit keywords', 'Status, segment tags and a dated note log for every lead', 'Phone numbers and websites load only for the leads you open, which keeps Google costs low', 'Business details are read live from Google and never stored', 'Steel door import figures by country from UN Comtrade show which markets to target'],
        source: 'Companies in this demo are invented samples. The real app reads live data from Google and steel door import statistics from UN Comtrade, the United Nations trade database.' },
      { demo: 'montaj', label: 'Montaj Programı', title: 'Installations Planned [[Team by Team]]',
        text: 'Montaj Programı, the installation planner, turns the backlog of door orders into a day by day plan for the installation teams, based on how many doors of each type a team can fit into a day.',
        points: ['Daily capacity for each door type, on normal and overtime days', 'Large leaves and demolition work lower the day’s capacity by set rules', 'Travel time and site entry time count against the day', 'A weekly board: generate the plan, then drag jobs between teams and days', 'Installed doors are recorded, and what is left is planned again', 'Door types, rules, teams and vehicles are all settings, not code'],
        source: 'The figures in this demo are the capacity rules set for Dimak in the app. Orders and teams are samples. The real app runs in Turkish.' },
    ] },
];
// Order (Firat 22.11.2026: every asparajans.com website build): English-speaking market first, then Türkiye.
const order = ['cristal-windows', 'misbourne-design', 'academease', 'total-health-chiropractic', 'dr-tim-jaeger', 'dimak-kapi', 'hatupen', 'proga', 'intek-metal', 'neo-global-metal', 'arman-elektronik', 'meya-hukuk', 'lilia', 'nurhayat-tutuncu', 'dr-erkan-ozturk'];
export const references = [...baseReferences, ...moreReferences]
  .map((r) => ({ ...r, ...(stories[r.key] || {}), alts: referenceAlts[r.key] }))
  .sort((x, y) => order.indexOf(x.key) - order.indexOf(y.key));
export const featuredReferences = references.slice(0, 3);


// English Google reviews of Fırat Şekerli's work, copied word for word from the asparajans Google profile.
export const reviews = [
  { name: 'Darren Locke', date: '2025-02-19', lang: 'en', text: "I have used Firat for around 10 websites over the last 2 years. I can highly recommend him. He's very good at what he does, has an extremely professional attitude, is always available and up for a challenge. If you hire him for your new website, to update an existing website, or for ongoing maintenance, you will not be sorry." },
  { name: 'Catherine Dawson', date: '2025-02-19', lang: 'en', text: 'Firat at asparajans has been a great to support to me, always working quickly and communicating well. I have found him to be trustworthy and reliable. Both a good guy and a great developer, I highly recommend.' },
  { name: 'Steve Cornish', date: '2026-10-23', lang: 'en', text: 'Very impressed with this company , its work ethics and very quick to answer queries and to action any issues that are raised. I would and have already recommended this company to friends and colleagues looking for website works,. Firat is fantastic, Keep up the good work.' },
  { name: 'Robert Gavin', date: '2026-10-23', lang: 'en', text: 'Firat and his company are meticulous in every aspect of their work which amounts to a fantastic product.' },
];

// Plugins sold in the shop (shop.asparagents.com). Prices are the live WooCommerce prices (20.11.2026).
export const plugins = [
  {
    slug: 'oxygen-media-usage-tracker-pro',
    name: 'Oxygen Media Usage Tracker Pro',
    short: 'See where every image is used in your Oxygen Builder site, and clean up your media library with confidence.',
    priceUsd: 27, // Firat 21.11.2026 (was 47)
    buy: 'product/oxygen-media-usage-tracker-pro/',
  },
];
