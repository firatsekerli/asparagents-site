// Reference projects (Firat 22.11.2026: bring every website build from asparajans.com/referanslar/). Card text is the
// approved English text from asparajans.com (src/en.mjs referencesEn). Project stories are translated from the
// asparajans.com case studies, whose facts Firat confirmed on 23.10.2026; relative dates in those studies ("3 years
// ago") are turned into years counted from that date. Nothing here is invented: no story means no case study.
// Fields: desc = meta description (max 155 characters), start / made / result = the project section, stats = figures
// from the case study, alts = gallery image alt texts.

export const moreReferences = [
  { key: 'academease', name: 'AcademEase', sector: 'Education Consultancy', type: 'Corporate Website', place: 'United States', url: 'https://academease.net/', detail: 'academease', color: '#44555c',
    text: 'For AcademEase, a higher education and university admissions consultancy, we designed a corporate website that explains its services to students, families and institutions.' },
  { key: 'dr-tim-jaeger', name: 'Dr. Tim Jaeger', sector: 'Healthcare', type: 'Membership Platform', url: 'https://drtimjaeger.com/', mock: true, detail: 'dr-tim-jaeger', color: '#b4cae9',
    text: 'We designed a membership-based, modern and SEO-friendly education site for Dr. Tim Jaeger. Its user-friendly interface and mobile-friendly structure give his patients easy access to exclusive content.' },
  { key: 'hatupen', name: 'Hatüpen', sector: 'PVC Doors and Windows', type: 'Corporate Website', place: 'Ankara, Türkiye', url: 'https://www.hatupen.com.tr/', mock: true, detail: 'hatupen', color: '#cd2122',
    text: 'For Hatüpen, a PVC door and window manufacturer, we replaced a hard to update HTML site with a bilingual website the team runs itself, with product series, project news and online orders.' },
  { key: 'arman-elektronik', name: 'Arman Elektronik', sector: 'Electronics', type: 'Online Shop', place: 'Ankara, Türkiye', url: 'https://magaza.armanelektronik.com.tr/', mock: true, detail: 'arman-elektronik', color: '#40345e',
    text: 'For Arman Elektronik, which had been selling only through marketplaces, we built its own WooCommerce shop, which the team runs itself without paying a commission on every sale.' },
  { key: 'proga', name: 'PROGA', sector: 'Real Estate Consultancy', type: 'Corporate Website', place: 'Ankara, Türkiye', url: 'https://proga.tr/', mock: true, detail: 'proga', color: '#15283f',
    text: 'For PROGA Professional Real Estate Consultancy, which lists homes, commercial property and land for sale and rent in Ankara, we designed a modern, lively website that puts the listings first.' },
  { key: 'neo-global-metal', name: 'NEO Global Metal', sector: 'Metal Manufacturer', type: 'Corporate Website', place: 'Ankara, Türkiye', url: 'https://neoglobalmetal.com/', mock: true, detail: 'neo-global-metal', color: '#ff7612',
    text: 'For NEO Global Metal, a metal manufacturer, we designed a corporate website that highlights its process from design to production and its projects.' },
  { key: 'intek-metal', name: 'İntek', sector: 'Steel Construction', type: 'Corporate Website', place: 'Türkiye', url: 'https://intekmetal.com/', mock: true, detail: 'intek-metal', color: '#1f2b3a',
    text: 'For İntek, which manufactures steel structures and assembles buildings, we designed a corporate website in Turkish and English that presents its services, projects and quality policy.' },
  { key: 'meya-hukuk', name: 'MEYA Hukuk', sector: 'Law Firm', type: 'Corporate Website', place: 'Türkiye', url: 'https://meyahukuk.com.tr/', mock: true, detail: 'meya-hukuk', color: '#b4986c',
    text: 'For MEYA Hukuk & Danışmanlık we designed a simple, trustworthy corporate website in Turkish and English that highlights its practice areas and team.' },
  { key: 'lilia', name: 'Lilia', sector: 'Olive Oil Brand', type: 'Corporate Website', place: 'Türkiye', url: 'https://liliaoliveoil.com/', mock: true, detail: 'lilia', color: '#5b6131',
    text: 'For Lilia olive oil, made from Memecik olives grown in Germencik, we designed a simple, elegant website that tells the brand’s story, its production process and its products.' },
  { key: 'nurhayat-tutuncu', name: 'Nurhayat Tütüncü', sector: 'Clinical Psychologist', type: 'Corporate Website', place: 'Türkiye', url: 'https://nurhayattutuncu.com/', mock: true, detail: 'nurhayat-tutuncu', color: '#524284',
    text: 'For Specialist Clinical Psychologist Nurhayat Tütüncü, who had no website, we built a site with a page for every service, her articles and online booking on every page.' },
  { key: 'dr-erkan-ozturk', name: 'Dr. Erkan Öztürk', sector: 'Doctor', type: 'Corporate Website', place: 'Türkiye', url: 'https://drerkan.com/', mock: true, detail: 'dr-erkan-ozturk', color: '#ebd59b',
    text: 'For Dr. Erkan Öztürk, who had no website, we built one around the questions families ask. Its prices page appears on the first page of Google for those searches.' },
];

export const stories = {
  'misbourne-design': { desc: 'WordPress website for Misbourne Design Associates, an architectural design practice in Oxfordshire: its services, way of working and projects.' },
  'dr-tim-jaeger': { desc: 'Membership-based education site for Dr. Tim Jaeger that gives his patients easy access to exclusive content on any device.' },
  'cristal-windows': {
    desc: 'Website for Cristal Windows in Fleet, Hampshire: 34 area pages, a 4-step online quote and 95 contact forms plus 25 quote requests in about 18 months.',
    start: 'Cristal Windows, Doors & Conservatories Ltd has over 40 years of experience installing windows and doors across Berkshire, Hampshire and Surrey. Window and door installation is local work: people search for double glazing with their town name, so the site had to appear in every town the company covers and lead visitors straight to a quote.',
    made: ['34 area pages for 3 regions and 31 towns under "Areas We Cover"', 'Separate pages for double and triple glazed windows, doors, garage doors and conservatory roof conversions', 'An online quote tool: visitors configure a window or door in 4 steps and request a quote', 'Trust signals on every page: FENSA, Which? Trusted Trader, reviews, brochures and FAQs', 'A blog with guides for homeowners', 'WordPress and Breakdance, so the team can add and update content easily'],
    result: 'We rebuilt the site in 2025 and have looked after its maintenance and SEO since. In about 18 months after the relaunch it brought 95 contact forms and 25 quote requests, plus many phone and WhatsApp enquiries (figures as of 23 October 2026).',
    stats: [['95', 'contact forms'], ['25', 'quote requests'], ['34', 'area pages']],
  },
  'dimak-kapi': {
    desc: 'Corporate website and ads for Dimak Kapı, an Ankara fire door manufacturer: 12 product groups, two languages and up to 15 qualified enquiries a month.',
    start: 'Dimak Kapı is an engineering company in Ankara that makes fire doors, industrial and sectional doors, garage doors and steel security doors, with 30 years of experience on projects in Türkiye and abroad. Its old WordPress site was built on a ready-made theme, so products, certificates, technical documents and the quote process were scattered.',
    made: ['Separate pages for about 12 product groups', 'A documents section: certificates, catalogues and technical drawings as PDF downloads in one place', 'Service pages for garage door and industrial door servicing', 'Projects and references in their own sections', 'Turkish and English versions', 'A blog written for searches such as fire door prices and fire door installation', 'A Get a Quote button as the main call to action', 'Advertising managed on several platforms'],
    result: 'We built the new site in 2020 and also manage Dimak’s advertising. Together, the website and the ads bring Dimak up to 10 to 15 qualified enquiries a month, each one a conversation about a real project.',
    stats: [['10 to 15', 'qualified enquiries a month'], ['12', 'product groups'], ['2', 'languages']],
  },
  hatupen: {
    desc: 'Hatüpen, a PVC window maker in Ankara, moved from a static HTML site to a bilingual WordPress site with product series, 25 project pages and online orders.',
    start: 'Hatüpen Pencere Sistemleri A.Ş. makes and installs PVC doors and windows in a 5,500 m² factory in Ostim, Ankara. Its old HTML site needed code for every new product or project, so it kept falling out of date.',
    made: ['WordPress and Oxygen, so the team adds content without code', 'Pages for each product series, double glazing, insect screens, colours and arched windows', 'An online shop with a basket and customer accounts, where round windows can be ordered', 'About 25 project news pages, such as a housing project with 7 blocks and 884 flats', 'References, a video gallery, dealers, FAQs and a blog', 'Turkish and English versions, Google reviews and a WhatsApp button'],
    result: 'The site went live around 2019. Hatüpen now runs its products, projects and news itself, and sells standard sizes online.',
    stats: [['25', 'project pages'], ['2', 'languages']],
  },
  'arman-elektronik': {
    desc: 'Arman Elektronik, in Ankara since 1982, left marketplace commissions behind with its own WooCommerce shop that the team runs itself.',
    start: 'Arman Elektronik has served Ankara since 1982 and is the Central Anatolia main dealer of Neta Elektronik, working on satellite systems, IPTV, security cameras and in-car cameras. It had no shop of its own and was tired of paying marketplace commissions.',
    made: ['A WooCommerce shop with a basket, customer accounts, favourites and product comparison', 'Categories from baby safety to security systems, satellite systems and caravan equipment', 'Prices shown including VAT', 'A shop the team runs itself: products, prices and stock without waiting for anyone', 'Hosting provided by us'],
    result: 'We built the shop in 2023. Arman Elektronik now sells under its own name, without a commission on every sale, and keeps the relationship with its customers.',
    stats: [['1982', 'in business since']],
  },
  proga: {
    desc: 'Real estate website for PROGA in Ankara: listings with voice search, filters, map view and favourites, as easy as a portal but under its own brand.',
    start: 'PROGA is a real estate consultancy in Ankara with homes, commercial property and land for sale and rent. People are used to searching on listing portals, so the site had to be just as easy, while connecting visitors directly with PROGA’s consultants.',
    made: ['Listing search by text or voice, with filters for location, price, rooms and property type', 'Three views: list, list with map, or map only', 'Favourites, so visitors can save the listings they like', 'Listing pages with a photo gallery, features and a consultant card with one-tap WhatsApp', 'Featured listings, about us, services and FAQs'],
    result: 'The site went live in October 2026 with 28 active listings, 12 for rent and 16 for sale. Listings are imported from a listing portal for now; an API application has been made so they can update automatically.',
    stats: [['28', 'listings at launch'], ['3', 'ways to view listings']],
  },
  'neo-global-metal': {
    desc: 'Website for NEO Global Metal, an Ankara metal manufacturer since 2014: collects B2B enquiries and shows its luxury metalwork as a portfolio.',
    start: 'NEO Global Metal has designed and made metal products in Ankara since 2014, in a 1,000 m² facility with welding, polishing, bending and cutting. It serves furniture, defence, automotive, construction and medical companies. Its visitors are B2B buyers looking for a production partner and people looking for bespoke metalwork.',
    made: ['Solutions and Production sections that explain the process from design to production', 'A references page for the 2024 projects', 'Large portfolio images of the luxury metalwork', 'A contact form, phone and email reachable from every page', 'FAQs and a blog', 'WordPress and Oxygen'],
    result: 'The site has been live since 2023 and presents both the production capacity and the craftsmanship, with a way to send an enquiry on every page.',
    stats: [['1,000 m²', 'facility shown'], ['5', 'industries served']],
  },
  academease: {
    desc: 'Bilingual website for AcademEase, a US university admissions consultancy, with separate paths for families and institutions; we also run its Instagram.',
    start: 'AcademEase is a university admissions and higher education consultancy in the United States that serves both families and institutions. A family and a university look for very different things, so the site had to take each visitor to their own path quickly.',
    made: ['For families: admissions mentoring, counselling, essay preparation, scholarships and financial aid, interview preparation', 'For institutions: enrolment, curriculum, staff development, grants and technology', 'Clear next steps: Get Started, Free Consultation and Hourly Consulting pages', 'A testimonials page and figures that show experience', 'English and Turkish versions', 'Instagram management: content and posting'],
    result: 'The site has been live for more than two years and, with the Instagram account we manage, works as AcademEase’s digital shop window.',
    stats: [['2', 'audiences, 2 paths'], ['2', 'languages']],
  },
  'meya-hukuk': {
    desc: 'Corporate website in Turkish and English for MEYA Hukuk & Danışmanlık, a law firm: practice areas, a profile for every lawyer and our own translation.',
    start: 'MEYA Hukuk & Danışmanlık is a law firm offering litigation and preventive legal advice, with practice areas including commercial and company law and real estate law. A law firm’s website should look like the firm: calm, orderly and trustworthy, and complete in English for international clients.',
    made: ['A clear structure that explains each practice area', 'A profile page for every lawyer', 'Pages for the sectors served and for career applications', 'Data protection policy and legal notice pages', 'Turkish and English versions, with the English translation done by us', 'WordPress and Breakdance, so the firm can update it easily'],
    result: 'The site went live in July 2026 and presents the firm’s practice areas, team and sectors in two languages.',
    stats: [['2', 'languages'], ['1', 'profile per lawyer']],
  },
  'intek-metal': {
    desc: 'Bilingual corporate website for İntek, a steel construction company since 2013: services, projects, ISO 9001 and 14001 and over 200 partners.',
    start: 'İntek has manufactured steel structures and assembled buildings since 2013, delivering turnkey projects from industrial plants to bridges and overpasses from a 5,000 m² facility. Clients in steel construction want to see at a glance whether a company can deliver large projects on time.',
    made: ['Sections for project management, building production and assembly, industrial plants and the defence industry', 'Completed projects and more than 200 business partners', 'Mission, vision, quality and environmental policy with ISO 9001 and ISO 14001', 'A drone video of site work on the home page', 'Turkish and English versions', 'WordPress and Breakdance, so it is easy to update'],
    result: 'The site went live in 2025 and presents İntek’s services, projects and certificates in two languages.',
    stats: [['200+', 'business partners'], ['5,000 m²', 'facility'], ['2', 'languages']],
  },
  lilia: {
    desc: 'Lilia olive oil moved from Wix to a premium WordPress, Breakdance and WooCommerce site that takes orders on WhatsApp and is ready for online sales.',
    start: 'Lilia is a premium olive oil brand made from Memecik olives from Germencik, Aydın, with early harvest and cold pressing. Its range includes early harvest extra virgin olive oil, a gourmet series with chilli, basil and lemon, and natural olive oil soap. A premium product has to look premium at first sight.',
    made: ['A move from Wix to WordPress, Breakdance and WooCommerce', 'About Us and Production pages that follow the oil from tree to bottle', 'Product pages where each product stands out with its own image and description', 'An Order on WhatsApp button under every product', 'A recipes section and blog'],
    result: 'The new site went live in September 2026 and takes orders on WhatsApp. Online sales are planned, and because the site runs on WooCommerce, that step needs no new website.',
  },
  'nurhayat-tutuncu': {
    desc: 'Website for clinical psychologist Nurhayat Tütüncü, who had none: a page for every service, articles and online booking on every page.',
    start: 'Specialist Clinical Psychologist Nurhayat Tütüncü graduated in psychology from Istanbul University and completed a master’s in clinical psychology at the University of Health Sciences. She had no website, and an expert without one cannot be found by the people looking for her.',
    made: ['An About page with her education, experience and therapy approach', 'Separate pages for individual, adult and adolescent psychotherapy, sex therapy, and training and workshops', 'An articles section on her areas of expertise', 'Online booking on every page', 'Her latest Instagram posts on the site', 'WordPress and Oxygen, with hosting provided by us'],
    result: 'The site has been live for about five years. People find her education, services and articles in one place and book an appointment directly from the site.',
    stats: [['5', 'years live']],
  },
  'dr-erkan-ozturk': {
    desc: 'Website for Dr. Erkan Öztürk, built from scratch around the questions families ask. His prices page is on the first page of Google for those searches.',
    start: 'Dr. Erkan Öztürk is a doctor who performs circumcisions with stitches, with a child-friendly approach. Families research a lot before they decide: the method, the doctor’s approach, the price and other families’ experiences. Without a website, he was left out of that research.',
    made: ['Pages built around the questions families ask, including prices, the method and FAQs', 'About and Gallery pages that show his approach and experience', 'A simple design that is easy to read', 'Quick ways for families to get in touch', 'Ongoing maintenance and support since launch'],
    result: 'The site has been live for more than two years, and its prices page is on the first page of Google for those searches. In his own Google review, he says the page comes up at the top when people search for prices and that his patients find it easy to read.',
    stats: [['Page 1', 'on Google for price searches']],
  },
};

export const referenceAlts = {
  'cristal-windows': { a: 'Cristal Windows website, About page', b: 'Cristal Windows website, double glazed windows product page' },
  'misbourne-design': { a: 'Misbourne Design Associates website, About page', b: 'Misbourne Design Associates website, residential architectural design page' },
  'dimak-kapi': { a: 'Dimak Kapı website, certified fire door product page', b: 'Dimak Kapı website, About page' },
  hatupen: { a: 'Hatüpen website, products page', b: 'Hatüpen website, About page' },
  'arman-elektronik': { a: 'Arman Elektronik online shop, product category page', b: 'Arman Elektronik online shop, product page' },
  'dr-tim-jaeger': { a: 'Dr. Tim Jaeger website, About page', b: 'Dr. Tim Jaeger website, Contact page' },
  'nurhayat-tutuncu': { a: 'Nurhayat Tütüncü website, Services page', b: 'Nurhayat Tütüncü website, Articles page' },
  'dr-erkan-ozturk': { a: 'Dr. Erkan Öztürk website, prices page', b: 'Dr. Erkan Öztürk website, Gallery page' },
  lilia: { a: 'Lilia olive oil website, About page', b: 'Lilia olive oil website, production process page' },
  proga: { a: 'PROGA real estate website, listings page', b: 'PROGA real estate website, listing detail page' },
  'neo-global-metal': { a: 'NEO Global Metal website, Solutions page', b: 'NEO Global Metal website, Production page' },
  academease: { a: 'AcademEase website, About page', b: 'AcademEase website, services for families page' },
  'meya-hukuk': { a: 'MEYA Hukuk & Danışmanlık website, practice areas page', b: 'MEYA Hukuk & Danışmanlık website, team page' },
  'intek-metal': { a: 'İntek steel construction website, About page', b: 'İntek steel construction website, References page' },
};
