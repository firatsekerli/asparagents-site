import { pageHead, section, cards, steps, checklist, faqBand, ctaRow, orgId, site } from '../layout.mjs';
import { windowsDemo } from '../demos/windows.mjs';

// Industry pages: one problem, one working demo, then what the real tool does. Every feature named here exists in
// the quotation tool and the postcode checker we built for a window company (the company is never named). The demo
// uses sample products and prices and sends nothing.

const windows = (() => {
  const path = '/industries/windows-doors/';
  const faq = faqBand(
    [
      { q: 'Is the demo the real tool?', a: '<p>It is a simplified version with sample products and sample prices, so you can see how it works. The tool we build for you uses your own range, your own options and your own price list.</p>' },
      { q: 'Does it work with my website?', a: '<p>Yes. We integrate it into the website you already have, whatever it runs on: WordPress, Shopify, Webflow, Wix or a custom build. If you prefer, it can also run as its own page with its own link that you share by email or in your adverts.</p>' },
      { q: 'Can I change the products, colours and options myself?', a: '<p>Yes. Product categories, types, materials, styles, colours and glazing options are managed from a settings page, so you can update your range without asking a developer.</p>' },
      { q: 'Where do the quote requests go?', a: '<p>Each request arrives in your office dashboard as a quote with every item, size and option listed, and you get an email. Your customer gets a confirmation email too. You price the items, add installation and removal, and the totals and VAT are worked out for you.</p>' },
      { q: 'Can it create the proposal letter?', a: '<p>Yes. Once the prices are in, it creates a branded PDF proposal with your logo, the item list, the totals and VAT, ready to send to your customer.</p>' },
      { q: 'What else can it check?', a: '<p>For window companies we have also built a postcode checker that tells a visitor whether their address is in your service area and whether it falls in a conservation area or an Article 4 area, before anyone books a survey.</p>' },
    ],
    { aside: { icon: 'chat', title: 'Tell Us How You Quote Today', text: 'Send us your product range and how you price a job. We reply within 12 hours with how the tool would work for you.' }, cta: ctaRow('Get This Built for You') }
  );

  const body = `
${pageHead({
  tag: 'AI Tools for Window and Door Companies',
  title: 'From Website Visit to [[Priced Proposal]]',
  intro: '<p>Your customers choose their windows and doors on your website, with sizes, colours and glazing, and add as many as they need. You receive a complete request, add your prices and send a branded proposal with VAT. No back and forth to find out what they actually want.</p>',
  actions: `<div class="btns"><a class="btn" href="#demo">Try the Demo</a><a class="btn btn-soft" href="/contact/">Get This Built for You</a></div>`,
})}
${section({
  tag: 'The Problem',
  title: 'Quoting Takes Longer Than [[Fitting]]',
  body: cards([
    { icon: 'chat', title: 'Every Quote Starts With a Call', text: 'Visitors fill in a short contact form, then you spend calls and emails finding out which windows they mean, how big they are and what colour they want.' },
    { icon: 'layers', title: 'Details Get Lost', text: 'Sizes in one email, colours in a text message, the back door mentioned on the phone. Something is always missing when you sit down to price the job.' },
    { icon: 'clock', title: 'Proposals Take an Evening', text: 'Typing up items, adding installation, working out VAT and formatting a letter by hand, one customer at a time.' },
  ]),
})}
<section class="sec tone-navy demo-sec" id="demo" aria-labelledby="demo-title"><div class="wrap">
  <div class="sec-head"><p class="label">Try It Yourself</p><h2 class="h2" id="demo-title">See How It <span class="hl">Works</span></h2><p class="sec-intro">Step 1 is what your customer sees on your website. Step 2 is your office. Step 3 is the proposal your customer receives.</p></div>
  ${windowsDemo.html}
</div></section>
<style>${windowsDemo.css}
.demo-sec .sec-head .h2, .demo-sec .sec-intro { color: #fff; }
.demo-sec .sec-head { margin-bottom: 40px; }
</style>
<script>${windowsDemo.js}</script>
${section({
  tone: 'light',
  tag: 'What You Get',
  title: 'Built Around [[Your Range]]',
  body: `<div class="two"><div class="two-text">${checklist([
    'A step by step quote form: product, type, material, style, size, colours, glazing and hardware',
    'A basket so customers can add every window and door in one request, with the room for each',
    'Photo upload, so customers can show you what they have now',
    'Every request saved in your office dashboard with all its details',
    'Item prices, installation and removal added in one place, with totals and VAT worked out for you',
    'A branded PDF proposal letter, created from the quote',
    'Emails to you and a confirmation to your customer',
  ])}</div><div class="two-text">${checklist([
    'Your own products, options and colours, managed from a settings page',
    'Your logo, your colours and your wording',
    'Optional postcode check for your service area, conservation areas and Article 4 areas',
    'Works on phones, tablets and desktops',
    '<strong>Works with your platform:</strong> WordPress, Shopify, Webflow, Wix, a custom site, or as a standalone page with its own link',
  ])}</div></div>`,
})}
${section({
  tag: 'How We Build It',
  title: 'Three Steps to [[Your Own Tool]]',
  body: steps([
    ['Tell Us How You Quote', 'Send us your product range, your options and how you price a job today.'],
    ['We Build It Around You', 'We set up your products, styles, colours and proposal letter, in your branding.'],
    ['We Connect It and Go Live', 'We integrate it into your website and email, test it with you and switch it on.'],
  ]),
})}
${faq.html}
`;

  return {
    path,
    title: 'Quote and Proposal Tool for Window and Door Companies | asparagents',
    description: 'Let customers choose windows and doors with sizes, colours and glazing on your website, then price the request and send a branded proposal with VAT. Try the demo.',
    crumbs: [{ name: 'Windows and Doors', path }],
    schema: [
      { '@type': 'Service', name: 'Quote and proposal tool for window and door companies', serviceType: 'Business process automation', provider: { '@id': orgId }, url: `${site.url}${path}`, audience: { '@type': 'BusinessAudience', audienceType: 'Window, door and glazing installers' } },
      faq.ld,
    ],
    body,
  };
})();

export default [windows];
