# asparagents.com

Static site for asparagents.com (English-speaking studio of Fırat Şekerli). No dependencies.

    node build.mjs        # -> dist/

- Cloudflare Pages project `asparagents-site`: build command `node build.mjs`, output `dist`. A push to `main`
  deploys; every other branch gets a preview.
- Look: the asparagents WordPress design (navy, blue, Arial). Styles in `assets/css/site.css`, layout in
  `src/layout.mjs`, pages in `src/pages/`, site facts in `src/site.mjs`, prices in `src/prices.mjs` (USD and GBP,
  only numbers Firat gave).
- Articles: `content/articles/` (see its README); older WordPress posts in `content/legacy/`. Posts keep their old
  URLs (`/<slug>/`).
- The WooCommerce shop (plugins, one-time support, cart, checkout, accounts, licences) is WordPress on
  `shop.asparagents.com`. `public/_redirects` and `functions/_middleware.js` send old shop, product, wp-admin,
  wp-json and download links there.
- Contact form: `functions/api/form.js` (Resend; Cloudflare variables RESEND_API_KEY and FORM_FROM).
- Consent: the analytics container GTM-TCGBCSBJ loads only after the visitor accepts (`assets/js/site.js`).
