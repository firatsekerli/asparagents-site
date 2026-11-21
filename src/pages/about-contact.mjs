import { site, pageHead, section, cards, steps, twoCol, checklist, worldBand, formBlock, ctaRow, deskPhoto, refShot, icon, tt, scrollShot, img } from '../layout.mjs';

// About Us and Contact. Text from the live asparagents.com pages (About Us and Contact, 07.11.2026).
const about = {
  path: '/about-us/',
  title: 'About asparagents, Fırat Şekerli’s English-Speaking Studio | asparagents',
  description: 'The English-speaking studio of Fırat Şekerli in Ankara: AI tools for your industry, white label work for agencies, websites, SEO and WordPress support.',
  crumbs: [{ name: 'About Us', path: '/about-us/' }],
  schema: [
    {
      '@type': 'Person',
      '@id': `${site.url}/about-us/#person`,
      name: 'Fırat Şekerli',
      jobTitle: 'Web and digital marketing specialist',
      url: `${site.url}/about-us/`,
      sameAs: ['https://www.linkedin.com/in/firatsekerli/', 'https://www.firatsekerli.com/'],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Mississippi State University' },
      worksFor: { '@id': `${site.url}/#organization` },
      knowsLanguage: ['en', 'tr'],
      image: `${site.url}/assets/img/firat-sekerli-720.webp`,
    },
  ],
  body: `
${pageHead({
  tag: 'About Us',
  title: 'Satisfying Our Client Is [[Our Ultimate Goal]]',
  intro: 'asparagents is the English-speaking studio of Fırat Şekerli, a web and digital marketing specialist based in Ankara, Türkiye. We build AI tools for small businesses, take on work for agencies and companies that need extra hands, and look after websites, all fully remotely.',
  actions: ctaRow('Get in Touch'),
  // Fırat's photo, from firatsekerli.com (Firat 21.11.2026).
  media: img({ base: 'firat-sekerli', widths: [360, 480, 720], w: 720, h: 892, alt: 'Fırat Şekerli, founder of asparagents', cls: 'portrait', lazy: false, sizes: '(min-width: 1024px) 40vw, 90vw' }),
})}
${section({
  tag: 'What We Do',
  title: 'Three Ways We [[Help]]',
  body: cards([
    { icon: 'ai', title: 'AI Tools for Your Industry', text: 'Quote, booking, estimate, document and repair tools built around how your business works and connected to your website. <a href="/industries/">Try the demos</a>.' },
    { icon: 'users', title: 'White Label &amp; Outsourcing', text: 'Websites, SEO, local SEO, AI visibility, social media and accessibility fixes for agencies and companies, under your brand if you want. <a href="/white-label/">More about white label work</a>.' },
    { icon: 'wrench', title: 'WordPress Support &amp; Plugins', text: 'One issue fixed and paid for only when you are happy, plus <a href="/plugins/">plugins</a> for Oxygen Builder and Breakdance users.' },
  ]),
})}
${section({
  tone: 'light',
  body: twoCol({
    media: scrollShot('firatsekerli', 'firatsekerli.com, Fırat Şekerli’s own website, home page'),
    reverse: true,
    html: `<p class="label">Who Is Behind asparagents</p><h2 class="h2">${tt('Fırat [[Şekerli]]')}</h2>
    <p>Fırat Şekerli has worked on websites, social media, SEO and Google Ads since 2013. He holds an MBA in Marketing from Mississippi State University and worked as a digital marketing specialist, web design specialist and social media manager before running his own studio. He works in English and Turkish.</p>
    <p>In Türkiye the same studio works as <a href="https://asparajans.com/" hreflang="tr" lang="tr">asparajans</a>. <a href="https://www.linkedin.com/in/firatsekerli/" target="_blank" rel="noopener">Fırat on LinkedIn</a></p>
    ${checklist(['You deal with one person from start to finish', 'Most messages get an answer within minutes', `Questions through the <a href="/contact/">contact page</a> or WhatsApp at ${site.phone}`])}`,
  }),
})}
${section({
  id: 'how-we-work',
  tag: 'How We Work',
  title: 'Three Steps, [[One Person]]',
  intro: '<p>We work from Ankara, Türkiye (UTC+3). During our day most messages get an answer within minutes, unless we are in the middle of an emergency fix for a client. If your message arrives while we sleep, you get a reply within 12 hours.</p>',
  body: steps([
    ['Tell Us What You Need', 'Send the form, an email or a WhatsApp message, in English or Turkish. We ask questions if we need more detail.'],
    ['Agree What We Deliver', 'A written list of what we deliver and the price, before any work starts.'],
    ['We Do the Work and Report', 'The same person does the work, checks with you at each stage, tests it with you before it goes live and tells you what changed in plain language.'],
  ]),
})}
${worldBand()}
`,
};

const contact = {
  path: '/contact/',
  title: 'Contact | asparagents',
  description: 'Tell us what you need: a tool for your business, work to hand over, a website or a WordPress fix. We reply within 12 hours, in English or Turkish.',
  crumbs: [{ name: 'Contact', path: '/contact/' }],
  contact: false,
  schema: [{ '@type': 'ContactPage', url: `${site.url}/contact/`, about: { '@id': `${site.url}/#organization` } }],
  body: `
<section class="page-head"><div class="wrap contact-grid">
  <div>
    <p class="label">Contact</p>
    <h1 class="h1">${tt('Get [[in Touch]]')}</h1>
    <div class="lead"><p>Tell us what you need: a tool that takes work off your team, work to hand over under your brand, a new website or a WordPress issue to fix. We reply to every message within 12 hours, in English or Turkish.</p></div>
    <div class="contact-lines">
      <a href="mailto:${site.email}"><span class="ci">${icon.mail}</span>${site.email}</a>
      <a href="${site.whatsapp}" target="_blank" rel="noopener"><span class="ci">${icon.whatsapp}</span>WhatsApp ${site.phone}</a>
    </div>
    <h2 class="h2" style="font-size:24px">What happens next</h2>
    ${checklist([
      'You send the form, an email or a WhatsApp message.',
      'We read your message and reply within 12 hours, with questions if we need more detail.',
      'For a one-time WordPress fix, we agree on the issue and start; you pay only after the issue is fixed and you are happy with the result.',
    ])}
    <p class="note">You can also send a short screen recording of the issue with a free tool such as bubbles; it often helps us fix it faster.</p>
  </div>
  <div>${formBlock()}</div>
</div></section>
`,
};

export default [about, contact];
