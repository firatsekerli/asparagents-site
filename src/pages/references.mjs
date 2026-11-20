import { site, references, pageHead, section, refGrid, worldBand, ctaRow, img, esc, REF_WIDTHS, buttons } from '../layout.mjs';

// References: live sites Fırat Şekerli built directly (src/site.mjs). Screenshots are shared with asparajans.com.
const alts = {
  'cristal-windows': { a: 'Cristal Windows website, About page', b: 'Cristal Windows website, double glazed windows product page' },
  'misbourne-design': { a: 'Misbourne Design Associates website, About page', b: 'Misbourne Design Associates website, residential architectural design page' },
};
const meta = (text) => (text.length > 155 ? text.slice(0, 152).replace(/\s+\S*$/, '') + '…' : text);
const shot = (key, suffix, alt) => img({ base: `ref-${key}${suffix}`, widths: REF_WIDTHS, alt, w: 1200, h: 1920, sizes: '(min-width: 1024px) 34vw, 90vw' });

const listPage = {
  path: '/references/',
  title: 'Website References in the UK | asparagents',
  description: 'Websites we built for businesses in England: a double glazing installer in Hampshire and an architectural design practice in Oxfordshire.',
  crumbs: [{ name: 'References', path: '/references/' }],
  body: `
${pageHead({ tag: 'References', title: 'From [[Our Work]]', intro: 'Live websites we built directly for businesses. Most of our work for agencies is white label and carries their names, so it is not listed here. <a href="/contact/">Contact us</a> to see more examples privately.', actions: ctaRow() })}
${section({ body: refGrid(references) })}
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
`,
  };
});

export default [listPage, ...detailPages];
