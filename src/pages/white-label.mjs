import { pageHead, section, cards, steps, twoCol, checklist, faqBand, ctaRow, worldBand, orgId, site, deskPhoto, refShot, tt, icon, scrollShot } from '../layout.mjs';

// White label for agencies and outsourcing for companies (Firat, 21.11.2026: the value is the client's time). Agency
// statements come from the approved English articles and the About Us page. Partner agencies and clients are never named.
export default (() => {
  const faq = faqBand(
    [
      { q: 'We are not an agency. Can we still work with you?', a: '<p>Yes. Companies hand us work their own team does not have the time or the know-how for, such as accessibility fixes, website changes or SEO. You deal with us directly and we report back in plain language.</p>' },
      { q: 'Which platforms do you work on?', a: '<p>WordPress, Webflow, Shopify, Wix and custom built sites. If your site runs on something else, tell us what it is and we will tell you honestly whether we can help.</p>' },
      { q: 'Will my client see your name?', a: '<p>Not if you are an agency working with us white label. The end client sees your emails, your reports and your invoices. They do not see our name unless you choose to tell them.</p>' },
      { q: 'Do you contact my clients?', a: '<p>Not unless you ask us to join a call, and then we join as part of your team.</p>' },
      { q: 'Who sets the price for my client?', a: '<p>You do. You sell the service at your own price under your own brand, pay us a wholesale fee and keep the margin.</p>' },
      { q: 'When does handing it over beat hiring?', a: '<p>Usually when the work comes in projects rather than every week, when your team would first have to learn how to do it, or when you want to test a service before you build a team. Hiring tends to win once one kind of work keeps a person busy every week.</p>' },
    ],
    { aside: { icon: 'users', title: 'One Partner, One Contact', text: 'You deal with one person from start to finish, and we reply to every message within 12 hours.' }, cta: ctaRow('Tell Us What You Need') }
  );

  const tiles = [
    ['shield', 'Accessibility Fixes', 'Making your website usable for everyone, from the audit to the fixes, on the platform you already use.'],
    ['web', 'Website Changes', 'New pages, layout fixes and updates on WordPress, Webflow, Shopify, Wix or a custom site.'],
    ['seo', 'SEO &amp; Local SEO', 'On-page and technical SEO, Google Business Profile management and review strategy.'],
    ['ai', 'GEO &amp; AI Visibility', 'Monthly checks in ChatGPT, Gemini and Google AI Overviews, and the fixes they point to.'],
    ['social', 'Social Media', 'A content calendar, post designs, captions, short videos and posting.'],
    ['code', 'AI Tools &amp; Automations', 'Quote forms, booking tools and more, built for your industry and connected to your site.'],
  ];

  const body = `
${pageHead({
  tag: 'White Label &amp; Outsourcing',
  title: 'Your Team’s Time Is [[Worth More]]',
  intro: '<p>Agencies and companies hand us the work their own team does not have the time or the know-how for. Instead of spending days learning something new, your team stays on the work only they can do, and we deliver the rest, under your brand if you want.</p>',
  actions: ctaRow('Tell Us What You Need'),
  media: deskPhoto(),
})}
${section({
  tag: 'Why Hand It Over',
  title: 'Learning It Costs More Than [[Doing It]]',
  body: cards([
    { icon: 'clock', title: 'Hours You Get Back', text: 'A task your team has never done can take days of research before any real work starts. We already know how, so it gets done while your team carries on.' },
    { icon: 'shield', title: 'Done Right the First Time', text: 'Accessibility, SEO and website changes have details that are easy to miss when you learn on the job. We have done them before.' },
    { icon: 'users', title: 'No Hiring for One Project', text: 'You get the skills when you need them, without a job advert, interviews or a new salary.' },
    { icon: 'chat', title: 'One Contact, Fast Replies', text: 'You deal with one person from start to finish, and we reply to every message within 12 hours.' },
    { icon: 'report', title: 'Plain Language Reports', text: 'You always know what was done and why, in words your whole team understands.' },
    { icon: 'globe', title: 'Fully Remote', text: 'Clients and partner agencies in the UK, the US, Austria, South Africa and the Netherlands.' },
  ]),
})}
${section({
  tone: 'navy',
  cls: 'ai-band',
  tag: 'Why Not Just Use AI',
  title: 'Anyone Can Do It With AI, but [[the Details Still Decide]]',
  intro: 'AI tools let anyone write a page, fix a heading or draft a post, and they are genuinely useful. We use them too. What they do not bring is someone who does this work every day, knows what to check and notices what is wrong before your customers do.',
  body: cards([
    { icon: 'seo', title: 'Knowing What to Check', text: 'An accessibility audit, an SEO fix or a new page has steps that are easy to skip when you do not know they exist.' },
    { icon: 'web', title: 'An Eye for Detail', text: 'Spacing, wording, contrast and how the page looks on a phone. Small things that decide whether a site feels right.' },
    { icon: 'shield', title: 'Checked Before It Goes Live', text: 'Every change is tested on desktop and phone before anyone sees it, not after a customer complains.' },
    { icon: 'users', title: 'Someone Accountable', text: 'One person who did the work, knows why and answers for it, within 12 hours.' },
  ], { cols: 4 }),
})}
${section({
  tone: 'light',
  tag: 'What You Can Hand Over',
  title: 'Work Your Team [[Does Not Have to Learn]]',
  body: `<div class="feats">${tiles.map(([ic, t, x]) => `<div class="feat"><span class="feat-icon">${icon[ic]}</span><div><h3>${t}</h3><p>${x}</p></div></div>`).join('')}</div>`,
})}
${section({
  tag: 'Two Ways to Work With Us',
  title: 'For Agencies and [[for Companies]]',
  body: `<div class="cards c2 ways">
    <div class="card"><span class="card-icon">${icon.users}</span><h3 class="card-title">For Agencies: White Label</h3><p>Sell the service under your brand. We work in the background and you keep the client.</p>${checklist(['You sell at your own price and keep the margin', 'Reports with your logo and your name, ready to forward', 'You stay the only contact for your client', 'We join a call only if you ask, as part of your team'])}</div>
    <div class="card"><span class="card-icon">${icon.wrench}</span><h3 class="card-title">For Companies: Outsourcing</h3><p>Hand us a task your team does not have the time or the know-how for, and get it back done.</p>${checklist(['We work on the platform you already use', 'A written list of what we deliver and the price before we start', 'Plain language updates for your team', 'One project or ongoing help, whatever you need'])}</div>
  </div>`,
})}
${section({
  body: twoCol({
    media: scrollShot('misbourne-design', 'Misbourne Design Associates website, home page'),
    reverse: true,
    html: `<p class="label">For Agencies</p><h2 class="h2">${tt('What Your [[Clients Get]] Every Month')}</h2>
    ${checklist([
      '<strong>On-page and technical SEO:</strong> titles, meta descriptions, headings, internal links, structured data, speed and indexing checks.',
      '<strong>Local SEO:</strong> Google Business Profile management, categories, services, photos, review strategy and consistent business details.',
      '<strong>GEO:</strong> monthly AI visibility checks in ChatGPT, Gemini and Google AI Overviews, and the fixes they point to.',
      '<strong>Social media:</strong> a content calendar, post designs, captions, short videos and posting.',
      '<strong>Monthly reporting:</strong> a plain-language report, ready to send under your brand.',
    ])}`,
  }),
})}
${section({
  tone: 'light',
  tag: 'Getting Started',
  title: 'Three Steps to [[Getting It Done]]',
  body: steps([
    ['Tell Us What You Need', 'The task or the service, the platform you use and when you need it.'],
    ['Agree What We Deliver', 'A written list of what we deliver and the price, before any work starts.'],
    ['We Do the Work', 'In the background, with plain language updates, under your brand if you want.'],
  ]),
})}
${worldBand()}
${faq.html}
`;

  return {
    path: '/white-label/',
    title: 'White Label & Outsourcing for Agencies & Companies | asparagents',
    description: 'Hand us the work your team has no time for: accessibility fixes, website changes, SEO, GEO, social media and AI tools, under your brand if you want.',
    crumbs: [{ name: 'White Label', path: '/white-label/' }],
    schema: [
      { '@type': 'Service', name: 'White label and outsourced digital work', serviceType: 'White label and outsourced web, SEO and social media services', provider: { '@id': orgId }, url: `${site.url}/white-label/`, audience: { '@type': 'BusinessAudience', audienceType: 'Digital agencies and companies' } },
      faq.ld,
    ],
    body,
  };
})();
