import { pageHead, section, cards, steps, serviceCards, twoCol, checklist, faqBand, ctaRow, buttons, worldBand, orgId, site, deskPhoto, refShot, tt } from '../layout.mjs';

// White label for agencies. Every statement comes from the approved English articles (content/articles/) and
// the About Us page. Partner agencies are never named.
export default (() => {
  const faq = faqBand(
    [
      { q: 'Will my client see your name?', a: '<p>No. The end client sees your emails, your reports and your invoices. They do not see our name unless you choose to tell them.</p>' },
      { q: 'Do you contact my clients?', a: '<p>Not unless you ask us to join a call, and then we join as part of your team.</p>' },
      { q: 'Who sets the price for my client?', a: '<p>You do. You sell the service at your own price under your own brand, pay us a wholesale fee and keep the margin.</p>' },
      { q: 'Which countries do you work with?', a: '<p>Our partner agencies include agencies in the United Kingdom, the United States, Austria, South Africa and the Netherlands. We work fully remotely.</p>' },
      { q: 'When does white label beat hiring?', a: '<p>Usually while you have a handful of interested clients rather than a full workload, when demand goes up and down, or when you want to test an offer before you build a team. Hiring tends to win once one service keeps a person busy every week.</p>' },
    ],
    { aside: { icon: 'users', title: 'One Partner, One Contact', text: 'You deal with one person from start to finish, and we reply to every message within 12 hours.' }, cta: ctaRow('Become a Partner') }
  );

  const body = `
${pageHead({
  tag: 'White Label for Agencies',
  title: 'Your Brand, Your Client, [[Our Work]]',
  intro: 'Sell websites, SEO, local SEO, AI visibility (GEO) and social media management under your agency’s brand. You keep the client relationship and the invoice; we do the work in the background and hand you reports you can send as your own.',
  actions: ctaRow('Become a Partner'),
  media: deskPhoto(),
})}
${section({
  tag: 'How It Works',
  title: 'You Sell It, [[We Do It]]',
  body: cards([
    { icon: 'users', title: 'Your Price, Your Brand', text: 'You sell the service at your own price, under your own brand.' },
    { icon: 'wrench', title: 'We Do the Work', text: 'Research, fixes, content and tracking, in the background.' },
    { icon: 'report', title: 'Reports in Your Name', text: 'Reports go out with your logo and your name on them.' },
    { icon: 'chat', title: 'You Stay the Contact', text: 'The client deals with you. We join a call only if you ask, as part of your team.' },
    { icon: 'shield', title: 'You Keep the Margin', text: 'You pay us a wholesale fee and keep the difference.' },
    { icon: 'globe', title: 'Fully Remote', text: 'Partner agencies in the UK, the US, Austria, South Africa and the Netherlands.' },
  ]),
})}
${section({ tone: 'light', tag: 'What You Can Sell', title: 'One Partner for [[Every Service]]', body: serviceCards() })}
${section({
  body: twoCol({
    media: refShot('misbourne-design', 'Misbourne Design Associates website, home page', '(min-width: 1024px) 40vw, 90vw'),
    reverse: true,
    html: `<p class="label">Every Month</p><h2 class="h2">${tt('What Your [[Clients Get]]')}</h2>
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
  title: 'From First Message to [[First Report]]',
  body: steps([
    ['Tell us about the client', 'The business, the services you want to sell and what the client expects.'],
    ['Agree the deliverables', 'A written list of monthly deliverables and the wholesale price.'],
    ['We do the work', 'In the background, with you as the only contact for the client.'],
  ]),
})}
${worldBand()}
${faq.html}
`;

  return {
    path: '/white-label/',
    title: 'White Label SEO, GEO, Websites and Social Media | asparagents',
    description: 'Sell websites, SEO, local SEO, GEO and social media under your agency’s brand. You keep the client and the invoice; we do the work and send reports in your name.',
    crumbs: [{ name: 'White Label', path: '/white-label/' }],
    schema: [
      { '@type': 'Service', name: 'White label services for agencies', serviceType: 'White label digital marketing', provider: { '@id': orgId }, url: `${site.url}/white-label/`, audience: { '@type': 'BusinessAudience', audienceType: 'Digital agencies and web design studios' } },
      faq.ld,
    ],
    body,
  };
})();
