import { authors } from '../site.mjs';
import { site, pageHead, section, img, esc, orgId } from '../layout.mjs';

// Blog. Posts are built by build.mjs from content/articles/<slug>/post.json (the articles the Publisher agent
// adds) and content/legacy/*.mjs (older posts moved from WordPress). Each post keeps its WordPress URL,
// https://asparagents.com/<slug>/, so no redirects are needed.
const fmt = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

// Every cover is the same 2:1 image with the logo top right (Firat 21.11.2026).
const COVER_ALT = 'asparagents logo over lines of website code';
const cover = (im) => (im.base.startsWith('cover-') ? { ...im, h: Math.round(im.w / 2), alt: im.alt || COVER_ALT } : im);

const postPage = (p) => {
  const author = authors[p.author || 'firat'];
  return {
    path: p.path,
    title: p.title,
    description: p.description,
    type: 'article',
    updated: p.updated || p.date,
    crumbs: [{ name: 'Blog', path: '/blog/' }, { name: p.h1, path: p.path }],
    ogImage: p.ogImage || '/assets/img/og-default.jpg',
    schema: [
      {
        '@type': 'Article',
        headline: p.h1,
        description: p.description,
        url: `${site.url}${p.path}`,
        mainEntityOfPage: `${site.url}${p.path}`,
        inLanguage: 'en',
        author: { '@type': 'Person', '@id': `${site.url}/about-us/#person`, name: author.name, url: `${site.url}${author.page}`, sameAs: author.sameAs, worksFor: { '@id': orgId } },
        publisher: { '@id': orgId },
        image: `${site.url}/assets/img/${p.image.base}-${p.image.widths[p.image.widths.length - 1]}.webp`,
        ...(p.date ? { datePublished: p.date } : {}),
        ...(p.updated ? { dateModified: p.updated } : {}),
      },
    ],
    body: `
<section class="page-head"><div class="wrap"><div class="page-head-in" style="margin:0 auto;max-width:760px">
  <p class="label">${esc(p.label || 'Guide')}</p>
  <h1 class="h1">${esc(p.h1)}</h1>
  <p class="post-meta">${[p.date ? `Published ${fmt(p.date)}` : '', `By <a href="${author.page}" rel="author">${esc(author.name)}</a>`].filter(Boolean).join(' · ')}</p>
</div></div></section>
<section class="sec" style="padding-top:48px"><div class="wrap">
  <div class="post-cover">${img({ ...cover(p.image), lazy: false, sizes: '(min-width: 800px) 760px, 92vw' })}</div>
  <article class="prose">
    ${p.body}
    <p><strong>Need a hand?</strong> <a href="/contact/">Tell us what you need</a>. We reply within 12 hours.</p>
  </article>
</div></section>
`,
  };
};

export default ({ posts }) => [
  {
    path: '/blog/',
    title: 'WordPress, SEO and White Label Guides | asparagents',
    description: 'Plain, practical guides on WordPress, SEO, local SEO, AI visibility (GEO) and white label services for small agencies and web studios.',
    crumbs: [{ name: 'Blog', path: '/blog/' }],
    body: `
${pageHead({ tag: 'Blog', title: 'Guides and [[Articles]]', intro: 'Plain, practical guides on WordPress, SEO, AI visibility and white label work for small agencies and web studios.' })}
${section({
  body: `<div class="posts">${posts
    .map(
      (p) => `<a class="post-card" href="${p.path}"><span class="pc-img">${img({ ...cover(p.image), sizes: '(min-width: 1024px) 30vw, (min-width: 680px) 45vw, 90vw' })}</span><span class="pc-body"><span class="label">${esc(p.label || 'Guide')}</span><b>${esc(p.h1)}</b><span class="pc-ex">${esc(p.excerpt)}</span><span class="card-link">Read the article</span></span></a>`
    )
    .join('')}</div>`,
})}
`,
  },
  ...posts.map(postPage),
];
