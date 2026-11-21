// asparagents shop: same header, footer, colours and buttons as asparagents.com (Firat 21.11.2026).
// Shop-only header and footer (Firat 21.11.2026: the shop holds the products, with one small link back to asparagents.com).
add_action('wp_head', function () {
  if (is_admin() || (defined('SHOW_CT_BUILDER') && SHOW_CT_BUILDER)) return;
  echo '<style id="ag-chrome-css">' . ':root {
  --navy: #060b23;
  --hero: rgba(10, 32, 96, 0.88);
  --blue: #2d4ddb;
  --blue-dark: #1f3bb8;
  --blue-soft: #dce1f9;
  --red: #eb5757;
  --red-text: #c62828;
  --bg: #f9fafb;
  --white: #fff;
  --text: #444;
  --muted: #5f6672;
  --line: #e5e7eb;
  --shadow: 0 10px 30px rgba(6, 11, 35, 0.06);
  --radius: 8px;
  --wrap: 1280px;
}
.sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.wrap { width: 100%; max-width: var(--wrap); margin: 0 auto; padding: 0 24px; }
/* Buttons: blue, or light blue with blue text (the two hero buttons of the old site) */
.btns { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 10px 24px; border: 0; border-radius: 6px; background: var(--blue); color: #fff; font: 600 15px/1.2 Arial, Helvetica, sans-serif; text-decoration: none; cursor: pointer; box-shadow: 0 4px 9px rgba(45, 77, 219, 0.2); transition: background 0.2s, transform 0.2s; }
.btn:hover { background: var(--blue-dark); transform: translateY(-2px); box-shadow: 0 10px 22px rgba(45, 77, 219, 0.28); }
.btn { transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
.btn-soft { background: var(--blue-soft); color: var(--blue); box-shadow: none; }
.btn-soft:hover { background: #c9d1f6; box-shadow: none; }
.btn-sm { min-height: 40px; padding: 8px 22px; font-size: 14px; }
/* Header: white bar with the grey logo; over the home hero it is transparent with white text */
.site-header { position: relative; z-index: 50; background: var(--white); border-bottom: 1px solid var(--line); }
.header-in { max-width: 1280px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; min-height: 84px; }
.logo { color: #646263; display: block; }
.logo img { display: block; width: 104px; height: auto; }
.site-menu { display: flex; align-items: center; gap: 28px; }
.site-menu ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 26px; }
.site-menu li a { color: var(--navy); text-decoration: none; font-weight: 700; font-size: 15px; white-space: nowrap; }
.site-menu li a:hover, .site-menu li a[aria-current="page"] { color: var(--blue); }
.menu-btns { display: flex; gap: 10px; }
.menu-btn { display: none; width: 48px; height: 48px; border: 0; border-radius: 50%; background: var(--blue-soft); color: var(--blue); cursor: pointer; align-items: center; justify-content: center; }
.burger { display: grid; gap: 4px; width: 18px; }
.burger i { display: block; height: 2px; background: currentColor; border-radius: 2px; transition: transform 0.2s, opacity 0.2s; }
.menu-open .burger i:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.menu-open .burger i:nth-child(2) { opacity: 0; }
.menu-open .burger i:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
.site-header.over-hero { position: absolute; top: 0; left: 0; right: 0; background: transparent; border-bottom: 0; }
.over-hero .logo img { filter: brightness(0) invert(1); }
.over-hero .site-menu li a { color: #fff; }
.over-hero .site-menu li a:hover { color: #c9d4ff; }
.site-header.is-pinned { position: fixed; top: 0; left: 0; right: 0; background: var(--white); border-bottom: 1px solid var(--line); transform: translateY(-100%); box-shadow: var(--shadow); }
.site-header.is-pinned.is-ready { transition: transform 0.25s ease; }
.site-header.is-pinned.is-shown { transform: none; }
.is-pinned.over-hero .logo img { filter: none; }
.is-pinned.over-hero .site-menu li a { color: var(--navy); }
@media (max-width: 1023px) {.menu-btn { display: inline-flex; }
.site-menu { position: fixed; inset: 84px 0 0 0; background: var(--white); flex-direction: column; align-items: stretch; gap: 24px; padding: 24px; overflow-y: auto; visibility: hidden; opacity: 0; transition: opacity 0.2s, visibility 0.2s; }
.menu-open .site-menu { visibility: visible; opacity: 1; }
.menu-open body { overflow: hidden; }
.site-menu ul { flex-direction: column; gap: 0; }
.site-menu li a, .over-hero .site-menu li a { display: block; padding: 14px 0; font-size: 20px; color: var(--navy); border-bottom: 1px solid var(--line); }
.over-hero .menu-btn { background: rgba(255, 255, 255, 0.92); }
.menu-open .site-header.over-hero { background: var(--white); }
.menu-open .over-hero .logo img { filter: none; }}
/* Footer: navy, four columns */
.site-footer { background: var(--navy); color: #c3cae6; font-size: 15px; }
.footer-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 3fr) minmax(0, 2fr) minmax(0, 3fr); gap: 48px; padding-top: 72px; padding-bottom: 56px; }
.footer-logo { display: inline-block; color: #fff; margin-bottom: 20px; }
.footer-logo img { display: block; width: 132px; height: auto; }
.footer-brand p { margin: 0 0 24px; max-width: 340px; }
.footer-social { display: flex; gap: 10px; }
.footer-social a { width: 44px; height: 44px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); color: #fff; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.footer-social a:hover { background: var(--blue); }
.footer-social svg { width: 20px; height: 20px; }
.footer-col h2 { color: #fff; font-size: 16px; margin: 0 0 20px; letter-spacing: 0.02em; }
.footer-col h2::after { content: ""; display: block; width: 28px; height: 3px; margin-top: 10px; border-radius: 2px; background: var(--red); }
.footer-col ul { list-style: none; margin: 0 0 24px; padding: 0; display: grid; gap: 4px; }
.footer-col a:not(.btn) { color: #c3cae6; text-decoration: none; display: inline-block; padding: 4px 0; }
.footer-col a:not(.btn):hover { color: #fff; }
.footer-contact li > *, .footer-col .footer-contact a { display: inline-flex; gap: 10px; align-items: center; padding: 4px 0; color: #c3cae6; }
.footer-contact svg { flex: none; width: 18px; height: 18px; color: #9fb2ff; }
.footer-bottom { border-top: 1px solid rgba(255, 255, 255, 0.1); }
.footer-bottom-in { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px 24px; padding-top: 22px; padding-bottom: 22px; font-size: 14px; }
.footer-bottom p { margin: 0; }
.footer-legal { display: flex; flex-wrap: wrap; gap: 6px 20px; align-items: center; }
.footer-legal a, .footer-legal .linklike { color: #c3cae6; text-decoration: none; font-size: 14px; padding: 4px 0; }
.footer-legal a:hover, .footer-legal .linklike:hover { color: #fff; }
.wa-float { position: fixed; right: 20px; bottom: 20px; z-index: 40; width: 56px; height: 56px; border-radius: 50%; background: var(--blue); color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(6, 11, 35, 0.18); }
.wa-float:hover { background: var(--blue-dark); }
@media (max-width: 1023px) {.footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; }}
@media (max-width: 680px) {.wrap { padding: 0 20px; }
.header-in { min-height: 72px; padding: 10px 20px; }
.site-menu { inset: 72px 0 0 0; }
.btns .btn { flex: 1 1 auto; }
.consent-actions .btn { flex: 1; }
.footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 56px 20px 48px; gap: 36px 20px; }
.footer-brand, .footer-grid > .footer-col:last-child { grid-column: 1 / -1; }
.footer-bottom-in { flex-direction: column; align-items: flex-start; padding: 22px 20px 88px; }}
/* Same-site link: blank the content for two frames before leaving (Chrome on iPhone glitch, see site.js) */
.leaving main, .leaving .site-footer, .leaving .cta-band { visibility: hidden; }
.ai-band .wrap { position: relative; }
.feature-card .btn-soft { background: #fff; }
.page-head a:not(.btn) { color: #fff; }
.page-head .btn-soft { background: #fff; color: var(--blue); }
.page-head .btn-soft:hover { background: var(--blue-soft); }
.page-head .form a:not(.btn) { color: var(--blue); }
/* Light footer */
.site-footer { background: var(--bg); color: var(--muted); border-top: 1px solid var(--line); }
.footer-logo { color: #646263; }
.footer-col h2 { color: var(--navy); }
.footer-col a:not(.btn) { color: var(--text); }
.footer-col a:not(.btn):hover { color: var(--blue); }
.footer-contact li > *, .footer-col .footer-contact a { color: var(--text); }
.footer-contact svg { color: var(--blue); }
.footer-social a { background: var(--blue-soft); color: var(--blue); }
.footer-social a:hover { background: var(--blue); color: #fff; }
.footer-bottom { border-top: 1px solid var(--line); }
.footer-legal a, .footer-legal .linklike { color: var(--muted); }
.footer-legal a:hover, .footer-legal .linklike:hover { color: var(--blue); }
/* The quick fix bar: the button sits level with the text; the bar\'s own gap spaces it when it wraps on phones */
.quick-band .btns { margin-top: 0; }

#_header-56-12, footer#section-10-12, #div_block-87-12 { display: none !important; }
html { scroll-padding-top: 0; }
body.oxygen-body { font-family: Arial, Helvetica, sans-serif; color: #444; }
body.oxygen-body h1, body.oxygen-body h2, body.oxygen-body h3, .woocommerce div.product .product_title { color: #060b23; font-family: Arial, Helvetica, sans-serif; letter-spacing: -0.015em; }
.ag-chrome a { text-decoration: none; }
.ag-chrome img { display: block; max-width: 100%; height: auto; }
.woocommerce a.button, .woocommerce button.button, .woocommerce input.button, .woocommerce #respond input#submit, .woocommerce a.button.alt, .woocommerce button.button.alt, .woocommerce input.button.alt, .wc-block-components-button:not(.is-link), .wp-element-button, .woocommerce a.added_to_cart { background: #2d4ddb !important; color: #fff !important; border-radius: 6px !important; font: 600 15px/1.2 Arial, Helvetica, sans-serif !important; padding: 12px 22px !important; text-transform: none !important; letter-spacing: 0 !important; border: 0 !important; box-shadow: 0 4px 9px rgba(45, 77, 219, 0.2); }
.woocommerce a.button:hover, .woocommerce button.button:hover, .wc-block-components-button:not(.is-link):hover, .wp-element-button:hover { background: #1f3bb8 !important; color: #fff !important; }
.woocommerce ul.products li.product .woocommerce-loop-product__title, .woocommerce ul.products li.product .price, .woocommerce div.product p.price, .woocommerce div.product span.price { color: #060b23 !important; font-family: Arial, Helvetica, sans-serif; }
.woocommerce ul.products li.product .woocommerce-loop-product__title { color: #2d4ddb !important; font-weight: 700; }
.woocommerce-message, .woocommerce-info { border-top-color: #2d4ddb !important; }
.woocommerce-message::before, .woocommerce-info::before { color: #2d4ddb !important; }
.woocommerce span.onsale { background: #eb5757 !important; }
body.oxygen-body a { color: #2d4ddb; }
body.oxygen-body .ag-chrome .btn, body.oxygen-body .wa-float { color: #fff; }
body.oxygen-body .ag-chrome .btn.soft { background: #dce1f9; color: #2d4ddb; box-shadow: none; }
body.oxygen-body .ag-chrome .site-menu li a { color: #060b23; }
body.oxygen-body .ag-chrome .site-menu li a:hover { color: #2d4ddb; }
body.oxygen-body .ag-chrome .footer-col a:not(.btn) { color: #444; }
body.oxygen-body .ag-chrome .footer-col a:not(.btn):hover { color: #2d4ddb; }
body.oxygen-body .ag-chrome .footer-social a { background: #dce1f9; color: #2d4ddb; }
body.oxygen-body .ag-chrome .footer-social a:hover { background: #2d4ddb; color: #fff; }
body.oxygen-body .ag-chrome .footer-legal a, .ag-chrome .linklike, body.oxygen-body .ag-chrome a.ag-home { color: #5f6672; } body.oxygen-body .ag-chrome a.ag-home { text-decoration: underline; }
body.oxygen-body .ag-chrome .footer-legal a:hover, .ag-chrome .linklike:hover { color: #2d4ddb; }
.ag-chrome .linklike { background: none; border: 0; padding: 4px 0; font: inherit; font-size: 14px; cursor: pointer; }
body.oxygen-body .ag-chrome .footer-col a:not(.btn):hover { color: #fff; }
.hl { color: var(--blue); }
.tone-blue .hl, .tone-navy .hl, .hero .hl { color: #9fb2ff; }
/* Labels look the same on every background: red text on a light red pill (Firat 21.11.2026) */
.label { display: inline-block; color: var(--red-text); background: #fdecea; border-radius: 999px; padding: 5px 12px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.4; margin: 0 0 14px; width: fit-content; }
.hero .label, .page-head .label, .feature-card .label, .ai-band .label, .cta-band .label, [class*="tone-"] .label { color: var(--red-text); }
.h1 { font-size: clamp(32px, 3.8vw, 48px); line-height: 1.1; letter-spacing: -0.025em; }
.h2 { font-size: clamp(28px, 3vw, 40px); letter-spacing: -0.02em; }
.lead { font-size: 18px; }
/* Buttons: blue, or light blue with blue text (the two hero buttons of the old site) */
.btns { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
.sec-head + .btns, .center .btns { justify-content: center; }
.hero .btns { justify-content: center; }
/* Inner page heading */
.page-head { background: var(--bg); padding: 72px 0; overflow-x: clip; }
.page-head-in { max-width: 820px; }
.page-head .lead p:last-child { margin-bottom: 0; }
/* Sections */
.sec { padding: 96px 0; }
.tone-navy { background: #0a2060; color: #e6eaff; }
.tone-blue h2, .tone-blue h3, .tone-navy h2, .tone-navy h3 { color: #fff; }
.tone-navy a:not(.btn) { color: #fff; }
.page-head .two-media img { max-height: 620px; object-fit: cover; }
.price-card .btns { margin-top: auto; justify-content: center; }
.faq-side .btns { margin-top: 32px; }
/* Call to action band */
.cta-band { text-align: center; }
.cta-band .wrap { max-width: 820px; }
.cta-band .btns { justify-content: center; }
.cta-mail { margin: 20px 0 0; }
@media (max-width: 1023px) {.sec { padding: 72px 0; }
.page-head { padding: 48px 0; }
.page-head .two-media img { max-height: 360px; }}
@media (max-width: 680px) {.sec { padding: 56px 0; }
.hero-lead, .lead { font-size: 16px; }
.btns .btn { flex: 1 1 auto; }}
/* Same-site link: blank the content for two frames before leaving (Chrome on iPhone glitch, see site.js) */
.leaving main, .leaving .site-footer, .leaving .cta-band { visibility: hidden; }
/* Product shot in a browser frame (page heads) */
.page-head .two-media .browser { box-shadow: 0 10px 30px rgba(6, 11, 35, 0.18); }
.page-head .two-media .browser img { max-height: none; width: 100%; height: auto; display: block; }
.page-head .shot-wrap { position: relative; display: block; }
/* Inner page heads: the navy to blue gradient of the call to action band (Firat, 21.11.2026) */
.page-head { background: linear-gradient(135deg, #0a2060 0%, #1d3aa8 55%, #2d4ddb 100%); color: #e6eaff; }
.page-head .h1, .page-head h1, .page-head h2 { color: #fff; }
.page-head .hl { color: #9fb2ff; }
.page-head .lead, .page-head p, .page-head li { color: #e6eaff; }
.page-head a:not(.btn) { color: #fff; }
.page-head .btn-soft { background: #fff; color: var(--blue); }
.page-head .btn-soft:hover { background: var(--blue-soft); }
.page-head .two-media img:not(.browser img) { border-radius: 14px; }
.page-head .note { color: #c9d4ff; }
.page-head .contact-lines a { color: #fff; }
.page-head .contact-lines .ci { background: rgba(255, 255, 255, 0.14); color: #fff; }
.page-head .form, .page-head .form p, .page-head .form li, .page-head .form span { color: var(--text); }
.page-head .form h2, .page-head .form-title { color: var(--navy); }
.page-head .form a:not(.btn) { color: var(--blue); }
/* Call to action band: slowly moving gradient */
.cta-band { background: linear-gradient(120deg, #0a2060, #2d4ddb, #1f3bb8, #0a2060); background-size: 300% 300%; }
@media (prefers-reduced-motion: no-preference) {@keyframes ctaflow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.cta-band { animation: ctaflow 14s ease-in-out infinite; }}
/* The quick fix bar: the button sits level with the text; the bar\'s own gap spaces it when it wraps on phones */
.quick-band .btns { margin-top: 0; }
.post-card .label { align-self: flex-start; margin-bottom: 4px; }
.ag-chrome-hero .wrap, .ag-cta .wrap { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.post-type-archive-product .oxy-woo-products > h1.page-title, .post-type-archive-product .woocommerce-result-count, .post-type-archive-product .woocommerce-ordering { display: none !important; }
.woocommerce ul.products { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; margin: 0 !important; }
.woocommerce ul.products::before, .woocommerce ul.products::after { display: none !important; }
.woocommerce ul.products li.product { width: auto !important; float: none !important; margin: 0 !important; background: #fff; border-radius: 8px; padding: 16px 16px 20px; box-shadow: 0 10px 30px rgba(6, 11, 35, 0.06); display: flex; flex-direction: column; }
.woocommerce ul.products li.product a.button { margin-top: auto !important; }
@media (max-width: 1023px) { .woocommerce ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; } }
@media (max-width: 600px) { .woocommerce ul.products { grid-template-columns: 1fr; } }
body.oxygen-body .ag-chrome-hero .h1, body.oxygen-body .ag-chrome-hero h1 { color: #fff; font-family: Arial, Helvetica, sans-serif; margin: 0 0 16px; }
body.oxygen-body .ag-chrome-hero .hl, body.oxygen-body .ag-cta .hl { color: #9fb2ff; }
body.oxygen-body .ag-cta h2 { color: #fff; margin: 0 0 16px; }
body.oxygen-body .ag-chrome-hero .btn, body.oxygen-body .ag-cta .btn { color: #fff; }
body.oxygen-body .ag-chrome-hero .btn-soft, body.oxygen-body .ag-cta .btn-soft { background: #fff; color: #2d4ddb; box-shadow: none; }
body.oxygen-body .ag-cta p { color: #e6eaff; }
body.oxygen-body .ag-cta .cta-mail a { color: #fff; }
#section-2-63 { padding-top: 56px; }
' . '</style>';
}, 99);
function ag_chrome_header() {
  static $done = false;
  if ($done || is_admin() || (defined('SHOW_CT_BUILDER') && SHOW_CT_BUILDER)) return;
  $done = true;
  echo '<header class="site-header ag-chrome"><div class="header-in">
  <a class="logo" href="https://shop.asparagents.com/"><img src="https://asparagents.com/assets/img/logo-grey.svg" alt="asparagents shop home page" width="104" height="60"></a>
  <nav id="site-menu" class="site-menu" aria-label="Shop menu">
    <ul><li><a href="https://shop.asparagents.com/">Products</a></li><li><a href="https://shop.asparagents.com/my-account/">My Account</a></li></ul>
    <div class="menu-btns"><a class="btn btn-sm" href="https://shop.asparagents.com/cart/">Cart</a></div>
  </nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-menu"><span class="sr">Menu</span><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
</div></header>';
}
add_action('wp_body_open', 'ag_chrome_header', 1);
add_action('ct_before_builder', 'ag_chrome_header', 1);
add_action('wp_footer', function () {
  if (is_admin() || (defined('SHOW_CT_BUILDER') && SHOW_CT_BUILDER)) return;
  echo '<footer class="site-footer ag-chrome">
  <div class="footer-bottom"><div class="wrap footer-bottom-in">
    <p>© 2026 asparagents shop. Plugins and one-time WordPress support. <a class="ag-home" href="https://asparagents.com/">asparagents.com</a></p>
    <nav class="footer-legal" aria-label="Legal">
      <a href="https://shop.asparagents.com/terms-and-conditions/">Terms</a>
      <a href="https://shop.asparagents.com/delivery-and-refund/">Delivery &amp; Refund</a>
      <a href="https://shop.asparagents.com/privacy-policy/">Privacy Policy</a>
      <a href="https://shop.asparagents.com/cookie-policy-eu/">Cookie Policy</a>
      <button type="button" class="linklike cky-banner-element">Cookie Settings</button>
    </nav>
  </div></div>
</footer>';
  echo '<a class="wa-float" href="https://wa.me/905336311907?text=Hello.%20Please%20tell%20us%20your%20name%2C%20your%20company%20(if%20any)%20and%20what%20you%20need%2C%20and%20we%20will%20get%20back%20to%20you%20shortly." target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"><svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" width="22" height="22"><path d="M27.3 4.7A15.8 15.8 0 0 0 2.2 23.8L0 32l8.4-2.2a15.8 15.8 0 0 0 7.6 1.9 15.9 15.9 0 0 0 11.3-27zM16 29a13.2 13.2 0 0 1-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5A13.2 13.2 0 1 1 16 29zm7.3-9.8c-.4-.2-2.3-1.2-2.7-1.3s-.6-.2-.9.2-1 1.3-1.3 1.6-.5.3-.9.1a10.8 10.8 0 0 1-5.4-4.7c-.4-.7.4-.6 1.2-2.1a.8.8 0 0 0 0-.7c0-.2-.9-2.2-1.2-2.9s-.6-.7-.9-.7h-.8a1.4 1.4 0 0 0-1 .5 4.4 4.4 0 0 0-1.4 3.3 7.7 7.7 0 0 0 1.6 4.1 17.6 17.6 0 0 0 6.8 6c2.5 1.1 3.5 1.2 4.8 1a4.1 4.1 0 0 0 2.7-1.9 3.3 3.3 0 0 0 .2-1.9c-.1-.2-.4-.3-.7-.5z" fill="currentColor"/></svg></a>';
  echo '<script>' . '(function(){var d=document.documentElement,b=document.querySelector(\'.ag-chrome .menu-btn\'),m=document.getElementById(\'site-menu\');if(!b||!m)return;var s=function(o){d.classList.toggle(\'menu-open\',o);b.setAttribute(\'aria-expanded\',o?\'true\':\'false\');};b.addEventListener(\'click\',function(){s(!d.classList.contains(\'menu-open\'));});document.addEventListener(\'keydown\',function(e){if(e.key===\'Escape\')s(false);});var w=window.matchMedia(\'(min-width: 1024px)\');var f=function(){if(w.matches)s(false);};w.addEventListener?w.addEventListener(\'change\',f):w.addListener(f);})();' . '</script>';
}, 5);

// Tracking on the shop: GTM-TCGBCSBJ is loaded by the snippets "Google Tag Manager - HEAD" (id 6, CookieYes consent)
// and "Google Tag Manager - BODY" (id 7). This snippet only adds the purchase event.

// Purchase event for GA4 and the Google Ads conversion, once per order, on the order received page.
add_action('wp_footer', function () {
  if (!function_exists('is_order_received_page') || !is_order_received_page()) return;
  $order_id = absint(get_query_var('order-received'));
  $order = $order_id ? wc_get_order($order_id) : null;
  if (!$order || $order->get_order_key() !== wc_clean(wp_unslash($_GET['key'] ?? ''))) return;
  if ($order->get_meta('_ag_purchase_tracked')) return;
  $items = [];
  foreach ($order->get_items() as $item) {
    $items[] = ['item_id' => (string) $item->get_product_id(), 'item_name' => $item->get_name(), 'quantity' => (int) $item->get_quantity(), 'price' => (float) $order->get_item_total($item, false)];
  }
  $data = ['event' => 'purchase', 'ecommerce' => ['transaction_id' => (string) $order->get_order_number(), 'value' => (float) $order->get_total(), 'tax' => (float) $order->get_total_tax(), 'currency' => $order->get_currency(), 'items' => $items]];
  echo '<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({ecommerce:null});window.dataLayer.push(' . wp_json_encode($data) . ');</script>';
  $order->update_meta_data('_ag_purchase_tracked', current_time('mysql'));
  $order->save();
}, 5);

// Shop home: page head instead of the plain "Shop" title, and one call to action band before the footer (Firat 21.11.2026).
function ag_shop_hero() {
  static $done = false;
  if ($done || is_admin() || !function_exists('is_shop') || !is_shop() || (defined('SHOW_CT_BUILDER') && SHOW_CT_BUILDER)) return;
  $done = true;
  echo '<section class="page-head ag-chrome-hero"><div class="wrap"><div class="page-head-in"><p class="label">Shop</p><h1 class="h1">WordPress Plugins and <span class="hl">One-Time Support</span></h1><div class="lead"><p>Plugins for Oxygen Builder and Breakdance, and one WordPress issue fixed for $27. For a fix, you pay only after the issue is fixed and you are happy with the result.</p></div><div class="btns"><a class="btn" href="#products">See the Products</a><a class="btn btn-soft" href="https://wa.me/905336311907?text=Hello.%20Please%20tell%20us%20your%20name%2C%20your%20company%20(if%20any)%20and%20what%20you%20need%2C%20and%20we%20will%20get%20back%20to%20you%20shortly." target="_blank" rel="noopener">Ask on WhatsApp</a></div></div></div></section>';
}
add_action('wp_body_open', 'ag_shop_hero', 2);
add_action('ct_before_builder', 'ag_shop_hero', 2);
add_action('wp_footer', function () {
  if (is_admin() || !function_exists('is_shop') || !is_shop() || (defined('SHOW_CT_BUILDER') && SHOW_CT_BUILDER)) return;
  echo '<section class="sec tone-navy cta-band ag-cta"><div class="wrap">
  <h2 class="h2">Need More Than <span class="hl">a Plugin?</span></h2>
  <p>We also build websites and online shops, AI tools for your industry, and look after SEO, GEO and social media every month. We usually reply within minutes.</p>
  <div class="btns"><a class="btn" href="https://asparagents.com/services/">See Our Services</a><a class="btn btn-soft" href="https://asparagents.com/prices/">See Prices</a></div>
  <p class="cta-mail"><a href="mailto:info@asparagents.com">info@asparagents.com</a></p>
</div></section>';
}, 4);
add_action('wp_footer', function () {
  if (!function_exists('is_shop') || !is_shop()) return;
  echo '<script>(function(){var u=document.querySelector(".woocommerce ul.products");if(u)u.id="products";var c=document.querySelector(".ag-cta"),f=document.querySelector("footer.ag-chrome");if(c&&f&&c.nextElementSibling!==f)f.parentNode.insertBefore(c,f);var h=document.querySelector(".ag-chrome-hero"),hd=document.querySelector("header.ag-chrome");if(h&&hd&&hd.nextElementSibling!==h)hd.parentNode.insertBefore(h,hd.nextSibling);})();</script>';
}, 50);
