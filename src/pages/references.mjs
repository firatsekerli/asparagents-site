import { site, references, pageHead, section, refGrid, worldBand, ctaRow, img, esc, REF_WIDTHS, buttons, twoCol, checklist, tt } from '../layout.mjs';

// References: live sites Fırat Şekerli built directly (src/site.mjs). Screenshots are shared with asparajans.com.
const alts = {
  'cristal-windows': { a: 'Cristal Windows website, About page', b: 'Cristal Windows website, double glazed windows product page' },
  'misbourne-design': { a: 'Misbourne Design Associates website, About page', b: 'Misbourne Design Associates website, residential architectural design page' },
  'dimak-kapi': { a: 'Dimak Kapı website, certified fire door product page', b: 'Dimak Kapı website, About page' },
};
const meta = (text) => (text.length > 155 ? text.slice(0, 152).replace(/\s+\S*$/, '') + '…' : text);
// Tools built for a client: desktop screenshots in a browser frame, phone screenshots side by side.
const toolMedia = (r, t) =>
  t.phone
    ? `<div class="tool-phones">${t.phone.map((p, i) => `<span class="phone-shot">${img({ base: `tool-${r.key}-${p}`, widths: [300, 420, 600], alt: t.alt[i], w: 600, h: 954, sizes: '(min-width: 1024px) 20vw, 44vw' })}</span>`).join('')}</div>`
    : `<span class="tool-shot"><span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></span>${img({ base: `tool-${r.key}-${t.img}`, widths: [360, 520, 760, 1200], alt: t.alt, w: 1200, h: 750, sizes: '(min-width: 1024px) 46vw, 90vw' })}</span>`;
const toolsSection = (r) =>
  r.tools
    ? section({
        tone: 'light',
        tag: 'Built Beyond the Website',
        title: `Tools We Built for [[${esc(r.name)}]]`,
        intro: `Alongside the website, we built ${['one', 'two', 'three', 'four', 'five'][r.tools.length - 1]} tools for ${esc(r.name)}. Each one is a WordPress plugin made for how the business works.`,
        body: r.tools
          .map((t, i) =>
            twoCol({
              media: toolMedia(r, t),
              reverse: i % 2 === 1,
              cls: 'tool-row',
              html: `<p class="label">${t.label}</p><h3 class="h2">${tt(t.title)}</h3><p>${t.text}</p>${checklist(t.points)}${t.link ? buttons([t.link[0], t.link[1], '', ' target="_blank" rel="noopener"']) : ''}`,
            })
          )
          .join(''),
      })
    : '';
const shot = (key, suffix, alt) => img({ base: `ref-${key}${suffix}`, widths: REF_WIDTHS, alt, w: 1200, h: 1920, sizes: '(min-width: 1024px) 34vw, 90vw' });

const listPage = {
  path: '/references/',
  title: 'Website References | asparagents',
  description: 'Websites we built for businesses: a double glazing installer in Hampshire, an architectural design practice in Oxfordshire and a fire door manufacturer in Ankara.',
  crumbs: [{ name: 'References', path: '/references/' }],
  body: `
${pageHead({ tag: 'References', title: 'From [[Our Work]]', intro: 'Live websites we built directly for businesses. Most of our work for agencies is white label and carries their names, so it is not listed here. <a href="/contact/">Contact us</a> to see more examples privately.', actions: ctaRow() })}
${section({ body: refGrid(references, { h: 'h2' }) })}
${worldBand('light')}
`,
};

const detailPages = references.map((r) => {
  const h1 = `${r.name} Website`;
  return {
    path: `/references/${r.detail}/`,
    title: `Website for ${r.name} | asparagents`,
    description: meta(r.text),
    crumbs: [{ name: 'References', path: '/references/' }, { name: h1, path: `/references/${r.detail}/` }],
    ogImage: `/assets/img/og-${r.key}.jpg`,
    schema: [{ '@type': 'CreativeWork', name: h1, description: r.text, url: `${site.url}/references/${r.detail}/`, creator: { '@id': `${site.url}/#organization` }, image: `${site.url}/assets/img/ref-${r.key}-1200.webp` }],
    body: `
${pageHead({ tag: `${esc(r.sector)} · ${esc(r.place)}`, title: `${esc(r.name)} [[Website]]`, intro: r.text, actions: buttons([r.url, 'View the Site', '', ' target="_blank" rel="noopener"'], ['/references/', 'All References', 'soft']), media: shot(r.key, '', `${r.name} website, home page`) })}
${section({ body: `<div class="gallery">${shot(r.key, '-a', alts[r.key].a)}${shot(r.key, '-b', alts[r.key].b)}</div>` })}
${toolsSection(r)}
`,
  };
});

export default [listPage, ...detailPages];
