import { pageHead, section, cards, steps, faqBand, ctaRow, orgId, site, icon, aiBand } from '../layout.mjs';
import { windowsDemo } from '../demos/windows.mjs';
import { demoCss, tabsJs, lockJs } from '../demos/common.mjs';
import { tradesDemo } from '../demos/trades.mjs';
import { buildersDemo } from '../demos/builders.mjs';
import { hireDemo } from '../demos/hire.mjs';
import { brokersDemo } from '../demos/brokers.mjs';
import { lettingsDemo } from '../demos/lettings.mjs';

// Industry pages (Firat, 21.11.2026): one problem, one working demo, then what the tool does. The windows tool is
// real (built for a window company that is never named); the other five show what we build for that industry.
// Every demo uses sample data and sends nothing. Prices are on request until Firat sets them in src/prices.mjs.

const platforms = 'WordPress, Shopify, Webflow, Wix, a custom site, or a standalone page with its own link.';
const platformFaq = { q: 'Does it work with my website?', a: '<p>Yes. We integrate it into the website you already have, whatever it runs on: WordPress, Shopify, Webflow, Wix or a custom build. If you prefer, it can also run as its own page with its own link that you share by email or in your adverts.</p>' };
const demoFaq = (what) => ({ q: 'Is the demo the real tool?', a: `<p>It is a simplified version with sample data, so you can see how it works. The tool we build for you uses ${what}, and it is tested with you before it goes live.</p>` });

const feats = (list) => `<div class="feats">${list.map(([ic, t, x]) => `<div class="feat"><span class="feat-icon">${icon[ic]}</span><div><h3>${t}</h3><p>${x}</p></div></div>`).join('')}</div>`;

const heroShot = (slug, alt) =>
  `<a class="shot-wrap" href="#demo" aria-label="Try the demo"><span class="browser main"><span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/assets/img/demo-${slug}-1200.webp" srcset="/assets/img/demo-${slug}-800.webp 800w, /assets/img/demo-${slug}-1200.webp 1200w" sizes="(min-width: 1024px) 46vw, 92vw" width="1200" height="900" alt="${alt}" fetchpriority="high"></span></a>`;

const industryPage = (c) => {
  const path = `/industries/${c.slug}/`;
  const faq = faqBand(c.faq, { aside: { icon: 'chat', title: c.asideTitle, text: c.asideText }, cta: ctaRow('Get This Built for You') });
  const body = `
${pageHead({
  tag: 'AI Tools for Your Industry',
  title: c.h1,
  intro: `<p>${c.intro}</p>`,
  actions: `<div class="btns"><a class="btn" href="#demo">Try the Demo</a><a class="btn btn-soft" href="/contact/">Get This Built for You</a></div>`,
  mediaRight: true,
  media: heroShot(c.slug, c.heroAlt),
})}
${section({ tag: 'The Problem', title: c.problemTitle, body: cards(c.problems.map(([ic, t, x]) => ({ icon: ic, title: t, text: x }))) })}
<section class="sec tone-navy demo-sec" id="demo" aria-labelledby="demo-title"><div class="wrap">
  <div class="sec-head"><p class="label">Try It Yourself</p><h2 class="h2" id="demo-title">See How It <span class="hl">Works</span></h2><p class="sec-intro">${c.demoIntro}</p></div>
  ${c.demo.html}
</div></section>
<style>${demoCss}${c.demo.css || ''}</style>
<script>${c.slug === 'windows-doors' ? '' : tabsJs}${c.demo.js}${lockJs}</script>
${section({ tone: 'light', tag: 'What You Get', title: c.featsTitle, body: feats([...c.feats, ['plug', 'Works With Your Platform', platforms]]) })}
${aiBand({ intro: c.aiIntro })}
${section({ tag: 'How We Build It', title: 'Three Steps to [[Your Own Tool]]', body: steps(c.steps) })}
${faq.html}
`;
  return {
    path,
    title: `${c.metaTitle} | asparagents`,
    description: c.description,
    crumbs: [{ name: 'Industries', path: '/industries/' }, { name: c.name, path }],
    schema: [
      { '@type': 'Service', name: c.serviceName, serviceType: 'Business process automation', provider: { '@id': orgId }, url: `${site.url}${path}`, audience: { '@type': 'BusinessAudience', audienceType: c.audience } },
      faq.ld,
    ],
    body,
    card: c.card,
    name: c.name,
  };
};

const list = [
  {
    slug: 'windows-doors',
    name: 'Windows and Doors',
    card: ['web', 'Quote &amp; Proposal Tool', 'Customers choose windows and doors with sizes and options; you send a branded proposal with VAT.'],
    h1: 'Quote &amp; Proposal Tool for [[Window &amp; Door Companies]]',
    intro: 'Your customers choose their windows and doors on your website, with sizes, colours and glazing, and add as many as they need. You receive a complete request, add your prices and send a branded proposal with VAT. No back and forth to find out what they actually want.',
    heroAlt: 'The quote tool demo: a customer choosing bifold doors in anthracite grey, with a casement window already in the basket',
    problemTitle: 'Quoting Takes Longer Than [[Fitting]]',
    problems: [
      ['chat', 'Every Quote Starts With a Call', 'Visitors fill in a short contact form, then you spend calls and emails finding out which windows they mean, how big they are and what colour they want.'],
      ['layers', 'Details Get Lost', 'Sizes in one email, colours in a text message, the back door mentioned on the phone. Something is always missing when you sit down to price the job.'],
      ['clock', 'Proposals Take an Evening', 'Typing up items, adding installation, working out VAT and formatting a letter by hand, one customer at a time.'],
    ],
    demo: windowsDemo,
    demoIntro: 'Step 1 is what your customer sees on your website. Step 2 is your office. Step 3 is the proposal your customer receives.',
    aiIntro: 'With today’s AI tools, anyone can put a quote form together in an afternoon. The hard part starts when real customers use it every day: it has to work the same way every time, keep up with your range and keep your customers’ details safe.',
    featsTitle: 'Built Around [[Your Range]]',
    feats: [
      ['layers', 'Step by Step Quote Form', 'Product, type, material, style, size, colours, glazing and hardware.'],
      ['web', 'One Basket for the Whole House', 'Every window and door in one request, with the room for each.'],
      ['chat', 'Photo Upload', 'Customers show you what they have now, before anyone visits.'],
      ['report', 'Every Request in Your Dashboard', 'All items, sizes and options saved in one place.'],
      ['wrench', 'Prices, Installation &amp; VAT', 'Add item prices, installation and removal; totals and VAT are worked out for you.'],
      ['mail', 'Branded PDF Proposal', 'Created from the quote with your logo, then emailed. Your customer gets a confirmation too.'],
      ['code', 'Your Range, Your Settings', 'Products, options and colours managed from a settings page, in your branding.'],
      ['pin', 'Postcode Check', 'Optional check for your service area, conservation areas and Article 4 areas.'],
    ],
    steps: [
      ['Tell Us How You Quote', 'Send us your product range, your options and how you price a job today.'],
      ['We Build It Around You', 'We set up your products, styles, colours and proposal letter, in your branding.'],
      ['We Connect It and Go Live', 'We integrate it into your website and email, test it with you and switch it on.'],
    ],
    faq: [
      demoFaq('your own range, your own options and your own price list'),
      platformFaq,
      { q: 'Can I change the products, colours and options myself?', a: '<p>Yes. Product categories, types, materials, styles, colours and glazing options are managed from a settings page, so you can update your range without asking a developer.</p>' },
      { q: 'Where do the quote requests go?', a: '<p>Each request arrives in your office dashboard as a quote with every item, size and option listed, and you get an email. Your customer gets a confirmation email too. You price the items, add installation and removal, and the totals and VAT are worked out for you.</p>' },
      { q: 'Can it create the proposal letter?', a: '<p>Yes. Once the prices are in, it creates a branded PDF proposal with your logo, the item list, the totals and VAT, ready to send to your customer.</p>' },
      { q: 'What else can it check?', a: '<p>For window companies we have also built a postcode checker that tells a visitor whether their address is in your service area and whether it falls in a conservation area or an Article 4 area, before anyone books a survey.</p>' },
    ],
    asideTitle: 'Tell Us How You Quote Today',
    asideText: 'Send us your product range and how you price a job. We reply within 12 hours with how the tool would work for you.',
    metaTitle: 'Quote & Proposal Tool for Window & Door Companies',
    description: 'Let customers choose windows and doors with sizes, colours and glazing on your website, then price the request and send a branded proposal with VAT. Try the demo.',
    serviceName: 'Quote and proposal tool for window and door companies',
    audience: 'Window, door and glazing installers',
  },
  {
    slug: 'trades',
    name: 'Trades',
    card: ['wrench', 'Enquiry &amp; Booking Tool', 'Answers every enquiry at any hour, spots emergencies and books visits into your free slots.'],
    h1: 'Enquiry &amp; Booking Tool for [[Trades]]',
    intro: 'For roofers, plumbers, heating engineers and every trade that works away from the desk. When you are on a roof or under a sink, you cannot answer the phone. The tool answers every enquiry on your website at any hour, asks the questions you would ask, spots emergencies and books the visit into your free slots. You get a complete job card instead of a missed call.',
    heroAlt: 'The enquiry tool demo: a customer reporting a roof leak and being offered visit times',
    problemTitle: 'The Phone Rings While [[You Are Working]]',
    problems: [
      ['chat', 'Missed Calls Become Lost Jobs', 'While you are on a job, the phone rings out. Many callers do not leave a message; they try the next company on the list.'],
      ['clock', 'Evenings Spent Calling Back', 'After a full day of work you return calls, play phone tag and write down the same details again and again.'],
      ['shield', 'Emergencies Mixed With Routine Jobs', 'A leak coming through a ceiling and a slow gutter look the same in your inbox until you read every message.'],
    ],
    demo: tradesDemo,
    demoIntro: 'Step 1 is a visitor chatting with the tool on your website. Step 2 is the job card your office receives. Step 3 is the text your customer gets.',
    aiIntro: 'With today’s AI tools, anyone can put a chatbot on a website. The hard part is a bot your customers can trust every day: it must ask the right questions, never promise a slot you do not have and keep people’s details safe.',
    featsTitle: 'Built Around [[Your Jobs]]',
    feats: [
      ['clock', 'Answers Day and Night', 'Every enquiry gets an answer at once, evenings and weekends included.'],
      ['chat', 'Your Questions, Your Way', 'It asks what you would ask for each kind of job, in your tone.'],
      ['shield', 'Emergencies First', 'Urgent jobs are recognised by your rules and offered the first free slots.'],
      ['report', 'Books Your Free Slots', 'Visits go straight into your calendar, so there is no double booking.'],
      ['pin', 'Your Service Area', 'Postcodes outside your area are told politely before anyone books.'],
      ['layers', 'Photos Before the Visit', 'Customers send photos, so you bring the right parts the first time.'],
      ['mail', 'Text &amp; Email Confirmations', 'Customers get the booking details at once, and a reminder before the visit.'],
      ['users', 'Job Cards for the Team', 'Every booking arrives as a clear summary your engineer can read on the way.'],
    ],
    steps: [
      ['Tell Us How You Work', 'Your services, the questions you ask, your area, and what counts as an emergency.'],
      ['We Build It Around You', 'We set up the questions, your rules and your messages, in your branding and tone.'],
      ['We Connect It and Go Live', 'We integrate it into your website and calendar, test it with you and switch it on.'],
    ],
    faq: [
      demoFaq('your own services, questions, area and free slots'),
      platformFaq,
      { q: 'Can it use my calendar or job software?', a: '<p>We connect it to the calendar or job management software you already use when that software allows it. Otherwise bookings arrive by email and in a simple dashboard, ready to add in one click.</p>' },
      { q: 'What if a customer asks something it cannot answer?', a: '<p>It does not guess. It takes the customer’s details and passes you the whole conversation, so you can call back knowing exactly what they need.</p>' },
      { q: 'Will it promise things I do not offer?', a: '<p>No. It works inside the services, prices, area and rules you give it, and only offers slots that are really free.</p>' },
    ],
    asideTitle: 'Tell Us About Your Jobs',
    asideText: 'Send us your services, your area and how you book visits today. We reply within 12 hours with how the tool would work for you.',
    metaTitle: 'Enquiry & Booking Tool for Roofers, Plumbers & Heating Engineers',
    description: 'A tool on your website that answers every enquiry at any hour, asks your questions, spots emergencies and books visits into your free slots. Try the demo.',
    serviceName: 'Enquiry and booking tool for trades',
    audience: 'Roofers, plumbers, heating engineers and other trades',
  },
  {
    slug: 'builders-renovation',
    name: 'Builders and Renovation',
    card: ['layers', 'Project Estimate Tool', 'A rough price range from your own rates, photos of the space and a booked site visit.'],
    h1: 'Project Estimate Tool for [[Builders &amp; Renovation]]',
    intro: 'Homeowners want a rough price before they invite anyone round. The tool asks about the project, takes photos and shows a price range worked out from your own rates, then books a site visit. You only visit people who already know the ballpark, and you arrive with the right questions.',
    heroAlt: 'The estimate tool demo: a kitchen project with a rough price range',
    problemTitle: 'Site Visits That [[Go Nowhere]]',
    problems: [
      ['clock', 'Wasted Site Visits', 'You drive out, measure and talk it through, only to find the budget was never there.'],
      ['layers', 'Quotes Without the Full Picture', 'Enquiries say “kitchen refit, how much?” with no size, no finish and no photos.'],
      ['chat', 'Leads Go Cold', 'By the time you call back after work, the homeowner has already booked someone else.'],
    ],
    demo: buildersDemo,
    demoIntro: 'Step 1 is the homeowner describing the project. Step 2 is the lead your office receives. Step 3 is the email the homeowner gets.',
    aiIntro: 'With today’s AI tools, anyone can build a price calculator. The hard part is one you can stand behind: ranges that come from your real rates, questions that fit how you work, and homeowners’ details kept safe.',
    featsTitle: 'Built Around [[Your Rates]]',
    feats: [
      ['layers', 'Project Questions', 'Type, size, finish and extras, asked in plain language.'],
      ['report', 'Price Range From Your Rates', 'A rough range worked out from your own rates, clearly marked as a guide.'],
      ['chat', 'Photo Upload', 'Homeowners send photos of the space before you visit.'],
      ['seo', 'Questions Ready for Your Call', 'Each lead comes with the follow-up questions that matter for that project.'],
      ['clock', 'Site Visit Booking', 'Homeowners ask for a visit at once, while they are still keen.'],
      ['mail', 'Summary Email', 'The homeowner gets the range and next steps in writing, in your branding.'],
      ['users', 'Every Lead in One Place', 'All projects, ranges and photos in a simple dashboard.'],
      ['pin', 'Your Working Area', 'Postcodes outside your area are told politely before they book.'],
    ],
    steps: [
      ['Tell Us How You Price', 'Your project types, your rates per square metre and what changes the price.'],
      ['We Build It Around You', 'We set up the questions, the ranges and the emails, in your branding.'],
      ['We Connect It and Go Live', 'We integrate it into your website and email, test it with you and switch it on.'],
    ],
    faq: [
      demoFaq('your own project types, rates and questions'),
      platformFaq,
      { q: 'Is the price range a quote?', a: '<p>No, and the tool says so clearly. It is a guide worked out from your own rates, so homeowners know the ballpark. Your price follows the site visit.</p>' },
      { q: 'Can I change my rates later?', a: '<p>Yes. Rates and project types are managed from a settings page, so you can update them as your prices change.</p>' },
    ],
    asideTitle: 'Tell Us How You Price a Job',
    asideText: 'Send us your project types and rates. We reply within 12 hours with how the tool would work for you.',
    metaTitle: 'Project Estimate Tool for Builders & Renovation Companies',
    description: 'Show homeowners a rough price range from your own rates, collect photos and book site visits with the right questions ready. Try the demo.',
    serviceName: 'Project estimate tool for builders and renovation companies',
    audience: 'Builders and renovation companies',
  },
  {
    slug: 'skip-equipment-hire',
    name: 'Skip and Equipment Hire',
    card: ['clock', 'Online Booking', 'Size, availability and full price at once, with the drop added to your delivery round.'],
    h1: 'Online Booking for [[Skip &amp; Equipment Hire]]',
    intro: 'Customers want to know three things: which size, when, and how much. The booking tool answers all three, takes the booking and puts the drop on your delivery round, including the road permit when one is needed.',
    heroAlt: 'The booking tool demo: choosing a skip size and a delivery day',
    problemTitle: 'The Same Three Questions [[All Day]]',
    problems: [
      ['chat', 'Phone Calls for Simple Answers', 'Which size do I need, when can you come, how much is it. Every call, every day.'],
      ['report', 'Double Bookings and Gaps', 'Bookings on paper and in heads lead to clashes on busy days and empty slots on quiet ones.'],
      ['shield', 'Permits Forgotten', 'A skip on the road without a permit means a fine and an unhappy customer.'],
    ],
    demo: hireDemo,
    demoIntro: 'Step 1 is your customer booking online. Step 2 is your delivery round with the new drop added. Step 3 is the confirmation your customer receives.',
    aiIntro: 'With today’s AI tools, anyone can build a booking form. The hard part is one your drivers can rely on: availability that is always right, prices that match your list, and payments and customer details kept safe.',
    featsTitle: 'Built Around [[Your Fleet]]',
    feats: [
      ['layers', 'Size Guide With Pictures', 'Each size with what it fits, so customers choose the right one first time.'],
      ['report', 'Live Availability', 'Only days with free skips or equipment can be booked.'],
      ['wrench', 'Full Price Up Front', 'Delivery, collection, extra weeks and the road permit, shown before they pay.'],
      ['shield', 'Online Payment', 'Customers pay when they book, through the payment provider you use.'],
      ['pin', 'Delivery Rounds', 'Each booking lands on the right day’s round for your drivers.'],
      ['mail', 'Permit Reminders', 'Road placements are flagged with the permit details ready.'],
      ['chat', 'Clear Rules for Customers', 'What can and cannot go in the skip, in every confirmation.'],
      ['clock', 'Equipment Hire Too', 'The same tool works for mini diggers, mixers and other equipment.'],
    ],
    steps: [
      ['Tell Us About Your Fleet', 'Your sizes, prices, area, delivery days and permit rules.'],
      ['We Build It Around You', 'We set up sizes, prices, availability and confirmations, in your branding.'],
      ['We Connect It and Go Live', 'We integrate it into your website and payments, test it with you and switch it on.'],
    ],
    faq: [
      demoFaq('your own sizes, prices, area and availability'),
      platformFaq,
      { q: 'Can customers pay online?', a: '<p>Yes. Payment is taken when they book, through the payment provider you already use or one we set up with you.</p>' },
      { q: 'Does it work for equipment as well as skips?', a: '<p>Yes. Mini diggers, mixers, access equipment and anything else you hire out can be booked the same way, with its own availability and prices.</p>' },
    ],
    asideTitle: 'Tell Us About Your Fleet',
    asideText: 'Send us your sizes, prices and area. We reply within 12 hours with how the booking tool would work for you.',
    metaTitle: 'Online Booking Tool for Skip & Equipment Hire',
    description: 'Let customers choose a skip size, see availability and the full price including permits, then book and pay online. Try the demo.',
    serviceName: 'Online booking tool for skip and equipment hire',
    audience: 'Skip hire and equipment hire companies',
  },
  {
    slug: 'mortgage-insurance-brokers',
    name: 'Mortgage and Insurance Brokers',
    card: ['shield', 'Fact-Find &amp; Document Chasing', 'A checklist built for each case, uploads from the phone and reminders sent for you.'],
    h1: 'Fact-Find &amp; Document Chasing for [[Mortgage &amp; Insurance Brokers]]',
    intro: 'Most of a case is paperwork. The tool asks clients a few simple questions, builds the right document checklist, lets them upload from their phone and chases what is missing, so your advisers spend their time advising.',
    heroAlt: 'The fact-find demo: a document checklist built from the client’s answers',
    problemTitle: 'Advisers Spend Their Days [[Chasing Paperwork]]',
    problems: [
      ['mail', 'Chasing Payslips by Email', 'One reminder, then another, then a phone call, for every document on every case.'],
      ['layers', 'A Different Checklist Every Time', 'Employed, self-employed, a gifted deposit, a second applicant: each case needs its own list.'],
      ['clock', 'Files Stuck Nearly Finished', 'Cases sit waiting for the last two documents while the client’s purchase moves on.'],
    ],
    demo: brokersDemo,
    demoIntro: 'Step 1 is your client answering a few questions and uploading. Step 2 is your case view. Step 3 is the reminder the client receives.',
    aiIntro: 'With today’s AI tools, anyone can build an upload form. The hard part is one you can trust with clients’ personal documents: checklists that follow your lenders’ rules, reminders that never stop by accident, and storage that stays secure.',
    featsTitle: 'Built Around [[Your Cases]]',
    feats: [
      ['chat', 'Guided Fact-Find', 'A few simple questions, in plain language, on any phone.'],
      ['layers', 'Checklist Built for Each Case', 'The right documents for the purpose, income type and deposit.'],
      ['shield', 'Secure Uploads', 'Clients upload from their phone; files go to storage you control.'],
      ['mail', 'Automatic Reminders', 'Missing documents are chased for you, politely and on schedule.'],
      ['report', 'Case Progress at a Glance', 'What is in, what is missing and who needs a nudge.'],
      ['users', 'Joint Applications', 'Separate lists for each applicant, in one case.'],
      ['clock', 'Protection Cases Too', 'The same tool works for life and income protection fact-finds.'],
      ['seo', 'Your Lenders’ Rules', 'Checklists follow the requirements you set, and you can change them.'],
    ],
    steps: [
      ['Tell Us How Your Cases Run', 'Your case types, your checklists and how you chase documents today.'],
      ['We Build It Around You', 'We set up the questions, checklists and reminders, in your branding.'],
      ['We Connect It and Go Live', 'We integrate it into your website and email, test it with you and switch it on.'],
    ],
    faq: [
      demoFaq('your own case types, checklists and reminder schedule'),
      platformFaq,
      { q: 'Does the tool give financial advice?', a: '<p>No. It only collects information and documents. Advice stays with your advisers.</p>' },
      { q: 'Where are clients’ documents stored?', a: '<p>In storage you control, with access limited to your team, and deleted on the schedule you set.</p>' },
    ],
    asideTitle: 'Tell Us How You Chase Documents',
    asideText: 'Send us your case types and checklists. We reply within 12 hours with how the tool would work for you.',
    metaTitle: 'Fact-Find & Document Chasing for Mortgage & Insurance Brokers',
    description: 'A guided fact-find builds each client’s document checklist, collects uploads from their phone and chases what is missing for you. Try the demo.',
    serviceName: 'Fact-find and document chasing tool for mortgage and insurance brokers',
    audience: 'Mortgage and insurance brokers',
  },
  {
    slug: 'letting-property-management',
    name: 'Letting and Property Management',
    card: ['pin', 'Repair Reporting &amp; Triage', 'Repairs reported with photos, sorted by urgency and sent to the right contractor.'],
    h1: 'Repair Reporting &amp; Triage for [[Letting Agents]]',
    intro: 'Tenants report repairs at all hours, often by phone and with half the details. The tool takes the report with photos, asks the safety questions, sorts it by urgency using your rules and sends it to the right contractor, with the landlord asked when approval is needed.',
    heroAlt: 'The repair reporting demo: a tenant reporting a leak, marked as an emergency',
    problemTitle: 'Every Repair Starts [[With a Phone Call]]',
    problems: [
      ['chat', 'Vague Reports', '“The heating is not working” with no photos, no details and no idea when someone can get in.'],
      ['shield', 'Everything Marked Urgent', 'Without the right questions, a dripping tap and a ceiling leak land in the same pile.'],
      ['clock', 'Everyone Calling for Updates', 'Tenants, landlords and contractors all phone the office to ask what is happening.'],
    ],
    demo: lettingsDemo,
    demoIntro: 'Step 1 is your tenant reporting a repair. Step 2 is the job your office sees. Step 3 is the updates the tenant receives.',
    aiIntro: 'With today’s AI tools, anyone can build a repair form. The hard part is one you can rely on at 2am: safety questions that are never skipped, urgency rules that match your agreements, and tenants’ details kept safe.',
    featsTitle: 'Built Around [[Your Rules]]',
    feats: [
      ['chat', 'Guided Repair Reports', 'Tenants choose the problem and answer a few questions, with photos.'],
      ['shield', 'Safety Questions First', 'Leaks near electrics, no heating or a broken lock are spotted at once.'],
      ['report', 'Urgency by Your Rules', 'Emergency, urgent or routine, with the response times you set.'],
      ['wrench', 'The Right Contractor', 'Jobs go to your contractor for that trade and area, with photos and access details.'],
      ['users', 'Landlord Approval Limits', 'Landlords are asked to approve when a job goes over their limit.'],
      ['mail', 'Updates for Everyone', 'Tenants, landlords and contractors are kept informed, without calling the office.'],
      ['clock', 'Out of Hours', 'Emergencies reported at night reach your out of hours contact at once.'],
      ['layers', 'History per Property', 'Every repair, cost and contractor saved against the property.'],
    ],
    steps: [
      ['Tell Us How You Handle Repairs', 'Your categories, response times, contractors and landlord limits.'],
      ['We Build It Around You', 'We set up the questions, rules and messages, in your branding.'],
      ['We Connect It and Go Live', 'We integrate it into your website and email, test it with you and switch it on.'],
    ],
    faq: [
      demoFaq('your own categories, response times, contractors and landlord limits'),
      platformFaq,
      { q: 'Can it work with my property management software?', a: '<p>Where your software allows it, we connect the two so jobs and updates appear there too. Otherwise jobs arrive by email and in a simple dashboard.</p>' },
      { q: 'What happens with emergencies at night?', a: '<p>The tenant gets safety advice straight away, and the job goes to your out of hours contractor and contact, by the rules you set.</p>' },
    ],
    asideTitle: 'Tell Us How You Handle Repairs',
    asideText: 'Send us your categories, response times and contractors. We reply within 12 hours with how the tool would work for you.',
    metaTitle: 'Repair Reporting & Triage Tool for Letting Agents',
    description: 'Tenants report repairs with photos, the tool sorts them by urgency using your rules, sends them to the right contractor and keeps everyone updated. Try the demo.',
    serviceName: 'Repair reporting and triage tool for letting agents',
    audience: 'Letting agents and property managers',
  },
];

const pages = list.map(industryPage);

// Cards for the home and services pages: one per industry, linking to its demo.
export const industryCards = pages.map((p) => ({ icon: p.card[0], title: `<span class="label" style="display:block;margin-bottom:6px">${p.name}</span>${p.card[1]}`, text: p.card[2], href: p.path, linkText: 'Try the demo' }));

// Overview page: one card per industry, then the same AI message and a call for industries not listed yet.
const hub = {
  path: '/industries/',
  title: 'AI Tools for Your Industry | asparagents',
  description: 'Quote tools, booking tools, estimate tools, document chasing and repair triage, built for your industry and connected to your website. Try the demos.',
  crumbs: [{ name: 'Industries', path: '/industries/' }],
  body: `
${pageHead({
  tag: 'Industries',
  title: 'AI Tools Built for [[Your Industry]]',
  intro: '<p>Every industry loses time in its own way: quotes, missed calls, paperwork, repairs. We build tools that take that work off your hands, connected to the website and systems you already use. Each page has a working demo, so you can see it before you ask.</p>',
  actions: `<div class="btns"><a class="btn" href="#list">See the Industries</a><a class="btn btn-soft" href="/contact/">Tell Us About Yours</a></div>`,
})}
${section({
  id: 'list',
  tag: 'Choose Your Industry',
  title: 'Try a [[Working Demo]]',
  body: cards(industryCards, { cls: 'services' }),
})}
${aiBand()}
${section({
  tone: 'light',
  tag: 'Not Listed',
  title: 'Your Industry [[Not Here]]?',
  intro: '<p>These are the industries we have built demos for so far. If your team spends hours on the same task every week, tell us about it. We reply within 12 hours with how a tool could take it off your hands.</p>',
  body: ctaRow('Tell Us About Your Business'),
})}
`,
};

export default [hub, ...pages.map(({ card, name, ...p }) => p)];
