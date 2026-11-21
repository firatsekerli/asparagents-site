import { site, pageHead, section, cards, twoCol, checklist, worldBand, formBlock, ctaRow, deskPhoto, refShot, icon, tt, scrollShot } from '../layout.mjs';

// About Us and Contact. Text from the live asparagents.com pages (About Us and Contact, 07.11.2026).
const about = {
  path: '/about-us/',
  title: 'About asparagents, Fırat Şekerli’s English-Speaking Studio | asparagents',
  description: 'asparagents is the English-speaking studio of Fırat Şekerli, a web and digital marketing specialist in Ankara: WordPress plugins, one-time fixes and white label work.',
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
    },
  ],
  body: `
${pageHead({
  tag: 'About Us',
  title: 'Satisfying Our Client Is [[Our Ultimate Goal]]',
  intro: 'asparagents is the English-speaking studio of Fırat Şekerli, a web and digital marketing specialist based in Ankara, Türkiye. We build WordPress plugins, fix WordPress issues one at a time, and work behind the scenes for agencies that need extra hands, all fully remotely.',
  actions: ctaRow('Get in Touch'),
  media: deskPhoto(),
})}
${section({
  tag: 'What We Do',
  title: 'Three Ways We [[Help]]',
  body: cards([
    { icon: 'plug', title: 'WordPress Plugins', text: 'Tools for Oxygen Builder and Breakdance users, such as <a href="/plugins/oxygen-media-usage-tracker-pro/">Oxygen Media Usage Tracker Pro</a>, which shows where every image is used.' },
    { icon: 'wrench', title: 'One-Time WordPress Support', text: 'You tell us about one issue, we fix it, and you pay only when you are happy with the result.' },
    { icon: 'users', title: 'White Label Work for Agencies', text: 'Websites, on-page SEO, local SEO, AI visibility and social media, delivered under your brand, with monthly reports ready to pass on to your clients.' },
  ]),
})}
${section({
  tone: 'light',
  body: twoCol({
    media: scrollShot('cristal-windows', 'Cristal Windows website, home page'),
    reverse: true,
    html: `<p class="label">Who Is Behind asparagents</p><h2 class="h2">${tt('Fırat [[Şekerli]]')}</h2>
    <p>Fırat Şekerli has worked on websites, social media, SEO and Google Ads since 2013. He holds an MBA in Marketing from Mississippi State University and worked as a digital marketing specialist, web design specialist and social media manager before running his own studio. He works in English and Turkish.</p>
    <p>In Türkiye the same studio works as <a href="https://asparajans.com/" hreflang="tr" lang="tr">asparajans</a>. <a href="https://www.linkedin.com/in/firatsekerli/" target="_blank" rel="noopener">Fırat on LinkedIn</a></p>
    <h3>How we work</h3>
    ${checklist(['We reply to every message within 12 hours', 'You deal with one person from start to finish', `Questions through the <a href="/contact/">contact page</a> or WhatsApp at ${site.phone}`])}`,
  }),
})}
${worldBand()}
`,
};

const contact = {
  path: '/contact/',
  title: 'Contact | asparagents',
  description: 'Tell us what you need: a WordPress issue to fix, a plugin question or white label work for your agency. We reply within 12 hours, in English or Turkish.',
  crumbs: [{ name: 'Contact', path: '/contact/' }],
  contact: false,
  schema: [{ '@type': 'ContactPage', url: `${site.url}/contact/`, about: { '@id': `${site.url}/#organization` } }],
  body: `
<section class="page-head"><div class="wrap contact-grid">
  <div>
    <p class="label">Contact</p>
    <h1 class="h1">${tt('Get [[in Touch]]')}</h1>
    <div class="lead"><p>Tell us what you need: a WordPress issue to fix, a question about one of our plugins, or white label work for your agency. We reply to every message within 12 hours, in English or Turkish.</p></div>
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
