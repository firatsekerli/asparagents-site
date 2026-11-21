import { site, plugins } from '../site.mjs';
import { pageHead, section, cards, checklist, faqBand, buttons, orgId } from '../layout.mjs';

// Plugin pages. Buying happens in the shop (shop.asparagents.com); these pages explain the plugins.
// Text from the live overview page /plugins/oxygen-media-usage-tracker-pro/ (20.11.2026).
// PENDING Firat: the live page says both "Unlimited sites forever" and "The license needs to be deactivated in order
// to use on another site"; neither line is shown until he says which is right.
const omut = plugins.find((p) => p.slug === 'oxygen-media-usage-tracker-pro');
const buyUrl = `${site.shop}${omut.buy}`;
const buy = (label = 'Get OMUT Pro Now') => buttons([buyUrl, label], ['/contact/', 'Ask a Question', 'soft']);

const omutPage = (() => {
  const faq = faqBand(
    [
      { q: 'Does this work with the latest version of Oxygen Builder?', a: '<p>Yes. We maintain compatibility with Oxygen Builder Classic, and the plugin is tested with Oxygen 4.x and earlier versions.</p>' },
      { q: 'Will this slow down my site?', a: '<p>No. The plugin only runs in the WordPress admin area and uses caching to keep database queries low.</p>' },
      { q: 'Can it detect images in dynamic data and repeaters?', a: '<p>Yes. It finds images in dynamic featured images, repeater fields and escaped URLs in JSON data.</p>' },
      { q: 'What if it does not work for my site?', a: '<p>We offer a 7-day refund for technical issues that prevent proper use of the plugin. Refunds are not available after 7 days or for non-technical reasons.</p>' },
      { q: 'Do you offer support?', a: '<p>Email support is included for 12 months, with priority support for faster replies.</p>' },
    ],
    { aside: { icon: 'wrench', title: 'WordPress Support Also Available', text: 'No matter the problem, our WordPress agents are ready to fix it. <a href="/services/wordpress-support/">One-Time WordPress Support</a>' }, cta: buy() }
  );
  return {
    path: '/plugins/oxygen-media-usage-tracker-pro/',
    title: 'Oxygen Media Usage Tracker Pro, See Where Images Are Used | asparagents',
    description: 'See every page that uses each image in your Oxygen Builder site, find unused media and clean up your media library with confidence. $47, 7-day refund.',
    crumbs: [{ name: 'Plugins', path: '/plugins/' }, { name: omut.name, path: '/plugins/oxygen-media-usage-tracker-pro/' }],
    schema: [
      { '@type': 'SoftwareApplication', name: omut.name, applicationCategory: 'DeveloperApplication', operatingSystem: 'WordPress with Oxygen Builder (Classic)', description: omut.short, url: `${site.url}/plugins/oxygen-media-usage-tracker-pro/`, publisher: { '@id': orgId }, offers: { '@type': 'Offer', price: omut.priceUsd, priceCurrency: 'USD', url: buyUrl, availability: 'https://schema.org/InStock' } },
      faq.ld,
    ],
    body: `
${pageHead({ tag: 'Oxygen Media Usage Tracker Pro', title: 'Finally See Where Every Image Is Used in Your [[Oxygen Builder]] Site', intro: '<p>Stop guessing. Start knowing. Clean up your media library with confidence.</p><p>✓ 7-day refund policy for technical issues only</p>', actions: buy() })}
${section({
  tag: 'Why It Exists',
  title: 'The Problem and [[the Solution]]',
  body: `<div class="cards c2">
    <div class="card"><h3 class="card-title">The Problem</h3><p>You’ve built a site with Oxygen Builder, but your media library is a mess:</p>${checklist(['Hundreds of unused images taking up space', 'No idea which images are safe to delete', 'Hours spent checking pages by hand', 'A slower site because of a bloated media library'], 'small')}</div>
    <div class="card"><h3 class="card-title">The Solution</h3><p>Oxygen Media Usage Tracker Pro instantly shows you:</p>${checklist(['Every page using each image', 'Direct edit links to make changes', 'Which images are completely unused', 'Hidden usage in dynamic data and CSS'], 'small')}</div>
  </div>`,
})}
${section({
  tone: 'light',
  tag: 'Features',
  title: 'Powerful Features Built for [[Oxygen]]',
  intro: 'Designed for Oxygen Builder’s own data structure.',
  body: cards([
    { icon: 'clock', title: 'Instant Results', text: 'Caching shows usage straight away, without waiting for scans.' },
    { icon: 'seo', title: 'Deep Scan Mode', text: 'Finds usage in CSS caches, dynamic data, thumbnails and escaped URLs.' },
    { icon: 'layers', title: 'Batch Processing', text: 'Processes hundreds of images without timeouts.' },
    { icon: 'code', title: 'Direct Edit Links', text: 'Jump to each page that uses an image and update it.' },
    { icon: 'shield', title: 'Filter Unused', text: 'Show only unused media, ideal for a clean-up before launch.' },
    { icon: 'ai', title: 'Auto-Detection', text: 'Scans when you open the media library, so the data stays fresh.' },
  ]),
})}
${section({
  tag: 'Why You Need It',
  title: 'For Agencies, Developers and [[Site Owners]]',
  body: cards([
    { icon: 'users', title: 'For Agencies', list: ['Find unused media during site migrations', 'Show clients where their assets are used', 'Remove unused heavy images in audits'] },
    { icon: 'code', title: 'For Developers', list: ['Track down missing images or broken references', 'Clean up media libraries before going live', 'Regular audits keep sites lean'] },
    { icon: 'web', title: 'For Site Owners', list: ['Smaller media libraries can lower hosting costs', 'A leaner site', 'Know what can be safely deleted'] },
  ]),
})}
${section({
  tone: 'blue',
  tag: 'Simple Pricing',
  title: 'One Licence for [[Everyone]]',
  body: `<div class="prices one"><div class="price-card"><h3>${omut.name}</h3><p class="price-sub">Requires Oxygen Builder (Classic)</p><p class="price-num">$${omut.priceUsd}</p>${checklist(['All features included', '12 months of updates', 'Priority email support', 'Full refund if the plugin does not work as described (7 days, technical issues)'])}${buttons([buyUrl, 'Buy in the Shop'])}</div></div>`,
})}
${faq.html}
`,
  };
})();

const listPage = {
  path: '/plugins/',
  title: 'WordPress Plugins for Oxygen and Breakdance | asparagents',
  description: 'Plugins we build for Oxygen Builder and Breakdance users, such as Oxygen Media Usage Tracker Pro, which shows where every image is used.',
  crumbs: [{ name: 'Plugins', path: '/plugins/' }],
  body: `
${pageHead({ tag: 'Plugins', title: 'Tools for [[Oxygen]] and [[Breakdance]] Users', intro: 'We build WordPress plugins for the page builders we use every day. Each plugin is sold in our shop, with support by email.', actions: buttons([site.shop, 'Open the Shop'], ['/contact/', 'Ask a Question', 'soft']) })}
${section({ tag: 'Our Plugins', title: 'Available in [[Our Shop]]', body: cards(plugins.map((p) => ({ icon: 'plug', title: `${p.name}, $${p.priceUsd}`, text: p.short, href: `/plugins/${p.slug}/`, linkText: 'See the plugin' })), { cols: 2 }) })}
`,
};

export default [listPage, omutPage];
