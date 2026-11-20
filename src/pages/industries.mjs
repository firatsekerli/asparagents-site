import { pageHead, section, cards, steps, faqBand, ctaRow, orgId, site, icon } from '../layout.mjs';
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
  tag: 'AI Tools for Your Industry',
  title: 'Quote &amp; Proposal Tool for [[Window &amp; Door Companies]]',
  intro: '<p>Your customers choose their windows and doors on your website, with sizes, colours and glazing, and add as many as they need. You receive a complete request, add your prices and send a branded proposal with VAT. No back and forth to find out what they actually want.</p>',
  actions: `<div class="btns"><a class="btn" href="#demo">Try the Demo</a><a class="btn btn-soft" href="/contact/">Get This Built for You</a></div>`,
  mediaRight: true,
  media: `<a class="shot-wrap" href="#demo" aria-label="Try the demo"><span class="browser main"><span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></span><img src="/assets/img/demo-windows-1200.webp" srcset="/assets/img/demo-windows-800.webp 800w, /assets/img/demo-windows-1200.webp 1200w" sizes="(min-width: 1024px) 46vw, 92vw" width="1200" height="912" alt="The quote tool demo: a customer choosing bifold doors in anthracite grey, with a casement window already in the basket" fetchpriority="high"></span></a>`,
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
  tone: 'navy',
  cls: 'ai-band',
  tag: 'Why Not Build It With AI',
  title: 'Anyone Can Build a Prototype, but [[Running It Every Day Is Different]]',
  intro: 'With today’s AI tools, anyone can put a quote form together in an afternoon. The hard part starts when real customers use it every day: it has to work the same way every time, keep up with your business and keep your customers’ details safe.',
  body: cards([
    { icon: 'check', title: 'Consistent', text: 'Works the same way for every customer, on every phone and browser, and is tested before it goes live.' },
    { icon: 'clock', title: 'Sustainable', text: 'Kept up to date when your products, prices or platform change, instead of being forgotten after launch.' },
    { icon: 'shield', title: 'Secure', text: 'Forms protected against spam, customer details stored where you control them, and privacy rules such as UK GDPR followed.' },
    { icon: 'users', title: 'Accountable', text: 'One person who built it and looks after it, and replies to every message within 12 hours.' },
  ], { cols: 4 }),
})}
${section({
  tone: 'light',
  tag: 'What You Get',
  title: 'Built Around [[Your Range]]',
  body: `<div class="feats">${[
    ["layers", "Step by Step Quote Form", "Product, type, material, style, size, colours, glazing and hardware."],
    ["web", "One Basket for the Whole House", "Every window and door in one request, with the room for each."],
    ["chat", "Photo Upload", "Customers show you what they have now, before anyone visits."],
    ["report", "Every Request in Your Dashboard", "All items, sizes and options saved in one place."],
    ["wrench", "Prices, Installation &amp; VAT", "Add item prices, installation and removal; totals and VAT are worked out for you."],
    ["mail", "Branded PDF Proposal", "Created from the quote with your logo, then emailed. Your customer gets a confirmation too."],
    ["code", "Your Range, Your Settings", "Products, options and colours managed from a settings page, in your branding."],
    ["pin", "Postcode Check", "Optional check for your service area, conservation areas and Article 4 areas."],
    ["plug", "Works With Your Platform", "WordPress, Shopify, Webflow, Wix, a custom site, or a standalone page with its own link."]
  ].map(([ic, t, x]) => `<div class="feat"><span class="feat-icon">${icon[ic]}</span><div><h3>${t}</h3><p>${x}</p></div></div>`).join('')}</div>`,
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
    title: 'Quote & Proposal Tool for Window & Door Companies | asparagents',
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
