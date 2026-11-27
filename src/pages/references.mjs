import { windowsDemo } from '../demos/windows.mjs';
import { demoCss, tabsJs, lockJs } from '../demos/common.mjs';
import { cristalDemos } from '../demos/cristal.mjs';
import { dimakDemos } from '../demos/dimak.mjs';
import { site, references, pageHead, section, refGrid, refCards, worldBand, ctaRow, img, esc, REF_WIDTHS, buttons, twoCol, checklist, tt } from '../layout.mjs';

// References: live sites Fırat Şekerli built directly (src/site.mjs). Screenshots are shared with asparajans.com.
const alts = Object.fromEntries(references.map((r) => [r.key, r.alts || { a: `${r.name} website, inner page`, b: `${r.name} website, inner page` }]));
const meta = (text) => (text.length > 155 ? text.slice(0, 152).replace(/\s+\S*$/, '') + '…' : text);
// Tools built for a client, each shown as a working prototype with sample data (Firat 22.11.2026).
const demos = { quote: windowsDemo, survey: cristalDemos.survey, checker: cristalDemos.checker, prospector: dimakDemos.prospector, montaj: dimakDemos.montaj };
const toolsSection = (r) =>
  r.tools
    ? section({
        tone: 'light',
        cls: 'tools-sec',
        tag: 'Built Beyond the Website',
        title: `Tools We Built for [[${esc(r.name)}]]`,
        intro: r.toolsIntro || `Alongside the website, we built ${['one', 'two', 'three', 'four', 'five'][r.tools.length - 1]} tools for ${esc(r.name)}. Each one is a WordPress plugin made for how the business works. Try simplified versions below, with sample data.`,
        body:
          r.tools
            .map(
              (t) => `<div class="tool-block"><div class="tool-head"><div><p class="label">${t.label}</p><h3 class="h2">${tt(t.title)}</h3><p>${t.text}</p></div><div>${checklist(t.points)}</div></div>${demos[t.demo].html}${t.source ? `<p class="tool-source">${t.source}</p>` : ''}</div>`
            )
            .join(''),
      }) + `<style>${demoCss}${cristalDemos.css}${r.tools.some((t) => t.demo === 'prospector' || t.demo === 'montaj') ? dimakDemos.css : ''}</style><script>${tabsJs}${r.tools.map((t) => demos[t.demo].js).join('')}${lockJs}</script>`
    : '';
// The hero shows the top of the home page (Firat 22.11.2026) in a browser frame, so it stands apart from the band.
const heroShot = (r) =>
  `<span class="browser main ref-hero"><span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i></span><span class="browser-shot">${img({ base: `ref-${r.key}`, widths: REF_WIDTHS, alt: `${r.name} website, home page`, w: 1200, h: 1920, lazy: false, sizes: '(min-width: 1024px) 40vw, 90vw' })}</span></span>`;
// The project in three parts, from the case study facts (src/reference-stories.mjs); only when a story exists.
const projectSection = (r) =>
  r.made
    ? section({
        tone: 'light',
        tag: 'The Project',
        title: `What We Built for [[${esc(r.name)}]]`,
        body: `${r.stats ? `<div class="ref-stats">${r.stats.map(([n, l]) => `<div><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>` : ''}<div class="ref-story"><div><h3>The Starting Point</h3><p>${esc(r.start)}</p><h3>The Result</h3><p>${esc(r.result)}</p></div><div><h3>What We Built</h3>${checklist(r.made.map(esc))}</div></div>`,
      })
    : '';
// Three other projects after this one (wrapping round), so every reference page links to others.
const nextRefs = (r) => { const i = references.indexOf(r); return [1, 2, 3].map((n) => references[(i + n) % references.length]); };
const shot = (key, suffix, alt) => img({ base: `ref-${key}${suffix}`, widths: REF_WIDTHS, alt, w: 1200, h: 1920, sizes: '(min-width: 1024px) 34vw, 90vw' });

const listPage = {
  path: '/references/',
  title: 'Website References | asparagents',
  description: 'Websites, online shops and tools we built for businesses in England, Ireland, the United States and Türkiye, from window installers to law firms and manufacturers.',
  crumbs: [{ name: 'References', path: '/references/' }],
  body: `
${pageHead({ tag: 'References', title: 'Websites and Tools [[We Built]]', intro: 'Live websites we built directly for businesses. Most of our work for agencies is white label and carries their names, so it is not listed here. <a href="/contact/">Contact us</a> to see more examples privately.', actions: ctaRow() })}
${section({ body: refGrid(references.slice(0, 5), { h: 'h2' }) })}
${section({ tone: 'light', tag: 'More Projects', title: 'More Websites [[We Built]]', body: refCards(references.slice(5)) })}
${worldBand('light')}
`,
};

const detailPages = references.map((r) => {
  const h1 = `${r.name} Website`;
  return {
    path: `/references/${r.detail}/`,
    title: `Website for ${r.name} | asparagents`,
    description: r.desc || meta(r.text),
    crumbs: [{ name: 'References', path: '/references/' }, { name: h1, path: `/references/${r.detail}/` }],
    ogImage: `/assets/img/og-${r.key}.jpg`,
    schema: [{ '@type': 'CreativeWork', name: h1, description: r.text, url: `${site.url}/references/${r.detail}/`, creator: { '@id': `${site.url}/#organization` }, image: `${site.url}/assets/img/ref-${r.key}-1200.webp` }],
    body: `
${pageHead({ tag: [r.sector, r.place].filter(Boolean).map(esc).join(' · '), title: `${esc(r.name)} [[Website]]`, intro: r.key === 'total-health-chiropractic' ? `${r.text} Based in Cork too? See <a href="/web-design-cork/">web design in Cork</a>.` : r.text, actions: buttons([r.url, 'View the Site', '', ' target="_blank" rel="noopener"'], ['/references/', 'All References', 'soft']), media: heroShot(r) })}
${projectSection(r)}
${section({ body: `<div class="gallery">${shot(r.key, '-a', alts[r.key].a)}${shot(r.key, '-b', alts[r.key].b)}</div>` })}
${toolsSection(r)}
${section({ tone: r.tools ? 'white' : 'light', tag: 'More Projects', title: 'Other Websites [[We Built]]', body: refCards(nextRefs(r)) + `<div class="btns" style="justify-content:center;margin-top:40px"><a class="btn" href="/references/">All References</a></div>` })}
`,
  };
});

export default [listPage, ...detailPages];
