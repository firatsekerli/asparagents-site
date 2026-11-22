import { site, references, featuredReferences, services } from '../site.mjs';
import { freeOfferFaq, homeHero, buttons, section, steps, cards, listedServices, twoCol, checklist, reviewsBand, refGrid, faqBand, worldBand, ctaRow, founderPhoto, tt, aiBand } from '../layout.mjs';
import { industryCards } from './industries.mjs';

// Home page (Firat 22.11.2026: convince people we solve their day to day problems with tools integrated into their website; AI is how we build them, trustworthy and honest). Tools for industries lead, then the AI message, the supporting services with
// white label first and one-time WordPress support as a quick entry point, reviews, agencies, projects and FAQ.
export default (() => {
  const faq = faqBand([
    { q: 'What kind of tools do you build?', a: '<p>Tools that take repeated work off your team: quote and proposal tools, enquiry and booking tools, estimate tools, document chasing and repair reporting. Each <a href="/industries/">industry page</a> has a working demo.</p>' },
    { q: 'Do I need a new website?', a: '<p>No. We connect the tool to the website you already have, whatever it runs on: WordPress, Shopify, Webflow, Wix or a custom build. It can also run as its own page with its own link.</p>' },
    { q: 'Can I not just build it myself with AI?', a: '<p>You can build a prototype. Running it every day is different: it has to work the same way for every customer, keep up with your business and keep your customers’ details safe. That is the part we take care of.</p>' },
    { q: 'Do you work with agencies and companies?', a: '<p>Yes. Agencies sell our work under their own brand, and companies hand us the work their team does not have the time or the know-how for. See <a href="/white-label/">White Label &amp; Outsourcing</a>.</p>' },
    { q: 'Do you still fix WordPress issues?', a: '<p>Yes. With <a href="/services/wordpress-support/">One-Time WordPress Support</a> you tell us about one issue, we fix it, and you pay only when you are happy with the result.</p>' },
    freeOfferFaq,
    { q: 'How fast do you reply?', a: '<p>We usually reply within minutes, and always within 12 hours, in English or Turkish, and you deal with one person from start to finish.</p>' },
  ]);

  const support = services.find((x) => x.slug === 'wordpress-support');

  const body = `
${homeHero({
  tag: 'Tools for Small Businesses',
  title: 'Everyday Problems, Solved [[Inside Your Website]]',
  intro: 'Quotes that take hours, calls you miss, paperwork you chase, repairs you sort out by phone: we build tools that take this work off your hands and run inside the website you already have. We build them with AI, and we make them trustworthy and honest, so they use only your real information and never make things up.',
  actions: buttons(['/industries/', 'See the Industries'], ['/white-label/', 'White Label &amp; Outsourcing', 'soft']),
  trust: [['layers', 'Working demos for 6 industries'], ['plug', 'Works with the platform you use'], ['clock', 'Usually replies within minutes'], ['users', 'One person from start to finish']],
})}

${section({
  id: 'industries',
  tag: 'Built for Your Industry',
  title: 'Website Tools for [[Your Industry]]',
  intro: 'Every industry loses time in its own way. Each of these tools has a working demo with sample data, so you can see it before you ask.',
  body: `${cards(industryCards, { cls: 'services' })}<p class="center" style="margin-top:32px"><a class="btn btn-soft" href="/industries/">All Industries</a></p>`,
})}

${section({
  tone: 'light',
  id: 'how-it-works',
  tag: 'How It Works',
  title: 'From Your Process to [[Your Own Tool]]',
  body: steps([
    ['Tell Us How You Work', 'The task that takes your team the most time, and how you do it today.'],
    ['We Build It Around You', 'Your questions, your rules, your prices and your branding, tested with you.'],
    ['We Connect It and Go Live', 'Integrated into your website and email, on the platform you already use.'],
  ]),
})}

${aiBand()}

${section({
  id: 'services',
  tag: 'What Else We Do',
  title: 'Services That [[Support Your Tools]]',
  intro: 'The foundations your tools sit on, and the work agencies and companies hand over to us.',
  body: `${cards([
    { icon: 'users', title: 'White Label &amp; Outsourcing', text: 'For agencies and companies: hand us the work your team does not have the time or the know-how for, <strong>under your brand</strong> if you want.', href: '/white-label/', linkText: 'More about White Label' },
    ...listedServices.filter((sv) => sv.slug !== 'wordpress-support').map((sv) => ({ icon: sv.icon, title: sv.card?.title || sv.name, text: sv.card?.text || sv.strip, href: `/services/${sv.slug}/`, linkText: `More about ${sv.name}` })),
  ], { cols: 3, cls: 'services' })}
  <div class="quick-band"><div><h3>Need One WordPress Fix?</h3><p>${support.strip}</p></div>${buttons(['/services/wordpress-support/', 'WordPress Support'])}</div>`,
})}

${reviewsBand()}

${section({
  id: 'agencies',
  body: twoCol({
    media: founderPhoto(),
    html: `<p class="label">For Agencies and Companies</p><h2 class="h2">${tt('Extra Hands, [[Your Brand]]')}</h2>
    <p>Your team’s time is worth more than learning something new for one project. Hand the work to us: agencies sell it under their own brand, companies get it done without hiring.</p>
    ${checklist(['Websites, SEO, local SEO, AI visibility (GEO), social media and accessibility fixes', 'Reports with your logo and your name, ready to forward', 'You stay the only contact for your client', 'Partner agencies in the UK, the US, Austria, South Africa and the Netherlands'])}
    ${buttons(['/white-label/', 'White Label &amp; Outsourcing'], ['/contact/', 'Tell Us What You Need', 'soft'])}`,
  }),
})}

${section({ tone: 'light', tag: 'Projects', title: 'From [[Our Work]]', intro: 'Live websites we built directly. Most of our work for agencies is white label and carries their names.', body: refGrid(featuredReferences) + `<div class="btns" style="justify-content:center;margin-top:40px"><a class="btn" href="/references/">All References</a></div>` })}

${worldBand()}

${faq.html}
`;

  return {
    path: '/',
    title: 'Website Tools for Everyday Business Problems | asparagents',
    description: 'Website tools for everyday business problems: we take quotes, bookings, estimates, paperwork and repairs off your hands. Try the demos. White label too.',
    body,
    schema: [faq.ld],
  };
})();
