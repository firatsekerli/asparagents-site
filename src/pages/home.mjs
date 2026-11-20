import { site, plugins, references } from '../site.mjs';
import { homeHero, buttons, section, steps, cards, listedServices, twoCol, checklist, reviewsBand, refGrid, faqBand, worldBand, ctaRow, deskPhoto, tt } from '../layout.mjs';
import { byId, priceCard } from '../prices.mjs';

// Home page: the order of the old asparagents home (hero, How It Works, Services, testimonial with prices, FAQ),
// with the white label and plugin sections added. Copy from the live pages and the approved articles.
export default (() => {
  const faq = faqBand([
    { q: 'What if my WordPress issue is not fixed?', a: '<p>Then you do not pay. With One-Time WordPress Support you pay only after the issue is fixed and you are happy with the result.</p>' },
    { q: 'Are you providing custom code?', a: '<p>Yes. A single fix is One-Time WordPress Support; larger custom work, from a landing page to a full website, is priced by your requirements.</p>' },
    { q: 'Do you have a customization service?', a: '<p>The customization service ranges from building a landing page to a full website, at a price that depends on your requirements. If you need a one-time fix, you can use our One-Time WordPress Support.</p>' },
    { q: 'Do you work with agencies?', a: '<p>Yes. Agencies in the United Kingdom, the United States, Austria, South Africa and the Netherlands use us for websites, SEO, local SEO, AI visibility and social media, delivered under their own brand. See <a href="/white-label/">white label for agencies</a>.</p>' },
    { q: 'Will my clients see your name?', a: '<p>No. The end client sees your emails, your reports and your invoices. We do not contact your clients unless you ask us to join a call, and then we join as part of your team.</p>' },
    { q: 'How fast do you reply?', a: '<p>We reply to every message within 12 hours, in English or Turkish, and you deal with one person from start to finish.</p>' },
  ]);

  const omut = plugins[0];
  const omutCard = `<div class="price-card"><h3>${omut.name}</h3><p class="price-sub">Plugin for Oxygen Builder</p><p class="price-num">$${omut.priceUsd}</p>${checklist(['Perfect for developers, agencies and site owners who want to optimize their media libraries', '7-day refund for technical issues'])}${buttons([`/plugins/${omut.slug}/`, 'See the Plugin'])}</div>`;

  const body = `
${homeHero({
  tag: 'Affordable WordPress Support',
  title: 'WordPress agents are here to fix your issues.',
  intro: 'asparagents offers solutions for WordPress users who need help with one particular issue, builds WordPress websites and works behind the scenes for agencies that need extra hands. You tell us about the issue, we fix it, and that’s all!',
  actions: buttons(['/services/wordpress-support/', 'WordPress Support'], ['/white-label/', 'For Agencies', 'soft']),
  trust: [['shield', 'Pay after the fix'], ['clock', 'Replies within 12 hours'], ['globe', 'Partners and clients in 6+ countries'], ['users', 'One person from start to finish']],
})}

${section({
  id: 'how-it-works',
  title: 'How It Works',
  intro: 'You don’t have to be a WordPress expert to get help. You tell us about the issue you are facing, we fix it, and your site is the way you want it to be!',
  body: `${steps([
    ['Describe the issue', 'Tell us about the issue you’re having in as much detail as you can, or send us a video.'],
    ['We fix the issue', 'Our WordPress agents back up your website and fix the issue.'],
    ['You make payment', 'You pay after we have solved your issue and you’re 100% happy with the fix.'],
  ])}<p class="center note" style="margin-top:32px">While we fix your issue, we record our screen and send the recording to you. You can also send us a short video when you describe your issue, for example with the free tool bubbles.</p>`,
})}

${section({
  tone: 'light',
  id: 'services',
  tag: 'Our Services',
  title: 'Services',
  intro: 'Even if you are using a WordPress theme or plugin from a well-known provider, you may still run into problems from time to time. In such times, asparagents is here to help. We know how to fix issues related to themes, page builders and plugins, and we build and grow websites too.',
  body: cards([
    { icon: 'layers', title: 'Themes', text: 'The themes our support agents know and are ready to fix.', chips: ['Avada', 'Salient', 'Bridge', 'Woodmart', 'and more'], href: '/services/wordpress-support/', linkText: 'Get it fixed' },
    { icon: 'code', title: 'Page Builders', text: 'The page builders our support agents know and are ready to fix.', chips: ['Oxygen Builder', 'Breakdance', 'Elementor', 'WPBakery', 'and more'], href: '/services/wordpress-support/', linkText: 'Get it fixed' },
    { icon: 'plug', title: 'Plugins', text: 'The plugins our support agents know and are ready to fix.', chips: ['WooCommerce', 'SEO plugins', 'Form plugins', 'Membership plugins', 'and more'], href: '/services/wordpress-support/', linkText: 'Get it fixed' },
    ...listedServices.map((sv) => ({ icon: sv.icon, title: sv.card?.title || sv.name, text: sv.card?.text || sv.strip, href: `/services/${sv.slug}/`, linkText: 'Learn more' })),
    { icon: 'users', title: 'White Label for Agencies', text: '<strong>Websites</strong>, SEO, GEO and <strong>social media</strong> delivered under your brand, with reports carrying your logo. You stay the only contact for the client.', href: '/white-label/', linkText: 'Learn more' },
  ], { cols: 3, cls: 'services' }),
})}

${reviewsBand({ extra: `<div class="prices" style="margin-top:56px">${priceCard(byId('one-time-wordpress-support'))}${omutCard}</div>` })}

${section({
  id: 'agencies',
  body: twoCol({
    media: deskPhoto(),
    html: `<p class="label">For Agencies</p><h2 class="h2">${tt('Extra Hands, [[Your Brand]]')}</h2>
    <p>Your client asks, “How do we get found on Google?” or “Who can look after our Instagram?” With a white label partner you say yes, sell the service at your own price and keep the client.</p>
    ${checklist(['Websites, SEO, local SEO, AI visibility (GEO) and social media management', 'Reports with your logo and your name, ready to forward', 'You stay the only contact for the client', 'Partner agencies in the UK, the US, Austria, South Africa and the Netherlands'])}
    ${buttons(['/white-label/', 'White Label for Agencies'], ['/contact/', 'Become a Partner', 'soft'])}`,
  }),
})}

${section({ tone: 'light', tag: 'Projects', title: 'From [[Our Work]]', intro: 'Live websites we built directly. Most of our work for agencies is white label and carries their names.', body: refGrid(references) })}

${worldBand()}

${faq.html}
`;

  return {
    path: '/',
    title: 'WordPress Support and Help Services | asparagents',
    description: 'WordPress agents fix your issue and you pay when you are happy. Also WordPress and WooCommerce websites, and white label SEO, GEO and social media for agencies.',
    body,
    schema: [faq.ld],
  };
})();
