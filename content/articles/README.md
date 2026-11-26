# English articles for asparagents.com

One folder per article: `content/articles/<slug>/` with

- `post.json`: `{ "title", "slug", "date", "excerpt", "content", "image", "image_alt" }`
- Prices and repeated facts in `content` are written as placeholders, never as numbers: `{{price:wordpress-website}}`, `{{price:business-website}}`, `{{price:woocommerce-shop}}`, `{{price:one-time-wordpress-support}}`, `{{price:seo-local-seo-geo}}`, `{{price:social-media-management}}`, `{{price:bundle}}`, `{{price:plugin}}`, `{{fact:free-fix-minutes}}` (see `src/facts.mjs`). The build fills in the current value, so a price change reaches every post.
  - `content` is HTML using only h2, h3, p, ul, ol, li, a, strong, em, code (no h1: the page shows the title).
  - `slug`: lowercase letters, digits and hyphens; the article is published at `https://asparagents.com/<slug>/`.
  - `date`: publication date, YYYY-MM-DD.
- the cover image named in `image`: every post uses the same green code cover with the white logo, uncropped at 2:1
  (Firat 21.11.2026). Copy `cover.jpg` from any existing article folder, and copy the existing
  `assets/img/cover-<slug>-*.webp` and `og-cover-<slug>.jpg` files under the new slug (the build picks them up by
  name). Do not run `tools/cover.py` for this cover: it crops to a square and would cut the logo off.

Open a pull request from a `publish/` or `content/` branch. "Agent auto-merge" merges it when the build, the
Cloudflare preview and Lighthouse pass; Cloudflare Pages then publishes it.
