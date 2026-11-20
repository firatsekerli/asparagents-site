# English articles for asparagents.com

One folder per article: `content/articles/<slug>/` with

- `post.json`: `{ "title", "slug", "date", "excerpt", "content", "image", "image_alt" }`
  - `content` is HTML using only h2, h3, p, ul, ol, li, a, strong, em, code (no h1: the page shows the title).
  - `slug`: lowercase letters, digits and hyphens; the article is published at `https://asparagents.com/<slug>/`.
  - `date`: publication date, YYYY-MM-DD.
- the cover image named in `image` (e.g. `cover.jpg`, from Canva). Then run
  `python3 tools/cover.py content/articles/<slug>/cover.jpg cover-<slug>` to make the WebP sizes and the social
  image in `assets/img/` (the build picks them up by name).

Open a pull request from a `publish/` or `content/` branch. "Agent auto-merge" merges it when the build, the
Cloudflare preview and Lighthouse pass; Cloudflare Pages then publishes it.
