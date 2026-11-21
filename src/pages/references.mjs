import { windowsDemo } from '../demos/windows.mjs';
import { demoCss, tabsJs, lockJs } from '../demos/common.mjs';
import { cristalDemos } from '../demos/cristal.mjs';
import { site, references, pageHead, section, refGrid, worldBand, ctaRow, img, esc, REF_WIDTHS, buttons, twoCol, checklist, tt } from '../layout.mjs';

// References: live sites Fırat Şekerli built directly (src/site.mjs). Screenshots are shared with asparajans.com.
const alts = {
  'cristal-windows': { a: 'Cristal Windows website, About page', b: 'Cristal Windows website, double glazed windows product page' },
  'misbourne-design': { a: 'Misbourne Design Associates website, About page', b: 'Misbourne Design Associates website, residential architectural design page' },
  'dimak-kapi': { a: 'Dimak Kapı website, certified fire door product page', b: 'Dimak Kapı website, About page' },
};
const meta = (text) => (text.length > 155 ? text.slice(0, 152).replace(/\s+\S*$/, '') + '…' : text);
// Tools built for a client, each shown as a working prototype with sample data (Firat 22.11.2026).
const demos = { quote: windowsDemo, survey: cristalDemos.survey, checker: cristalDemos.checker };
const toolsSection = (r) =>
  r.tools
    ? section({
        tone: 'light',
        cls: 'tools-sec',
        tag: 'Built Beyond the Website',
        title: `Tools We Built for [[${esc(r.name)}]]`,
        intro: `Alongside the website, we built ${['one', 'two', 'three', 'four', 'five'][r.tools.length - 1]} tools for ${esc(r.name)}. Each one is a WordPress plugin made for how the business works. Try simplified versions below, with sample data.`,
        body:
          r.tools
            .map(
              (t) => `<div class="tool-block"><div class="tool-head"><div><p class="label">${t.label}</p><h3 class="h2">${tt(t.title)}</h3><p>${t.text}</p></div><div>${checklist(t.points)}</div></div>${demos[t.demo].html}${t.source ? `<p class="tool-source">${t.source}</p>` : ''}</div>`
            )
            .join('') +
          `<style>${demoCss}${cristalDemos.css}</style><script>${tabsJs}${r.tools.map((t) => demos[t.demo].js).join('')}${lockJs}</script>`,
      })
    : '';
// The hero shows the top of the home page (Firat 22.11.2026) in a browser frame, so it stands apart from the band.
const heroShot = (r) =>
  `<span class="browser main ref-hero"><span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></span>${img({ base: `ref-${r.key}`, widths: REF_WIDTHS, alt: `${r.name} website, home page`, w: 1200, h: 1920, lazy: false, sizes: '(min-width: 1024px) 40vw, 90vw' })}</span>`;
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
${pageHead({ tag: `${esc(r.sector)} · ${esc(r.place)}`, title: `${esc(r.name)} [[Website]]`, intro: r.text, actions: buttons([r.url, 'View the Site', '', ' target="_blank" rel="noopener"'], ['/references/', 'All References', 'soft']), media: heroShot(r) })}
${section({ body: `<div class="gallery">${shot(r.key, '-a', alts[r.key].a)}${shot(r.key, '-b', alts[r.key].b)}</div>` })}
${toolsSection(r)}
`,
  };
});

export default [listPage, ...detailPages];
