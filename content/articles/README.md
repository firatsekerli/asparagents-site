# English articles for asparagents.com

One folder per article: `content/articles/<slug>/` with

- `post.json`: `{ "title", "slug", "date", "excerpt", "content", "image", "image_alt" }`
- Prices and repeated facts in `content` are written as placeholders, never as numbers: `{{price:wordpress-website}}`, `{{price:business-website}}`, `{{price:woocommerce-shop}}`, `{{price:one-time-wordpress-support}}`, `{{price:seo-local-seo-geo}}`, `{{price:social-media-management}}`, `{{price:bundle}}`, `{{price:plugin}}`, `{{fact:free-fix-minutes}}` (see `src/facts.mjs`). The build fills in the current value, so a price change reaches every post.
  - `content` is HTML using only h2, h3, p, ul, ol, li, a, strong, em, code (no h1: the page shows the title).
  - `slug`: lowercase letters, digits and hyphens; the article is published at `https://asparagents.com/<slug>/`.
  - `date`: publication date, YYYY-MM-DD.
  - `updated` (optional): the date of the last real content change, YYYY-MM-DD. Set it to today whenever a post's text, facts, sources or links change (a refresh, a Quick Fix change, a fact fix); leave it out for a new post. It becomes dateModified on the post and on /blog/, and lastmod in sitemap.xml. Never set it for a change that only touches styling or covers.
- the cover image named in `image`: every post uses the same green code cover with the white logo, uncropped at 2:1
  (Firat 21.11.2026). Copy `cover.jpg` from any existing article folder, and copy the existing
  `assets/img/cover-<slug>-*.webp` and `og-cover-<slug>.jpg` files under the new slug (the build picks them up by
  name). Do not run `tools/cover.py` for this cover: it crops to a square and would cut the logo off.

Open a pull request from a `publish/` or `content/` branch. "Agent auto-merge" merges it when the build, the
Cloudflare preview and Lighthouse pass; Cloudflare Pages then publishes it.
