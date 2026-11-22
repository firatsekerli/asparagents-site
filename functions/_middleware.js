// asparagents.com: WooCommerce links that carry their meaning in the query string (?download_file= in order emails,
// ?add-to-cart=, ?wc-api= payment callbacks) cannot be matched by _redirects, so they are sent to the shop here.
// It also shows prices in the visitor's currency for the main markets (Firat 22.11.2026: the same number, "447 dollars
// becomes 447 euro"): amounts in <span class="m"> get the local sign and <span class="cur-note"> sentences are replaced.
// Everyone else, the structured data and items bought in the shop (USD checkout) stay in US dollars. ?cc=GB etc.
// previews a country. public/_routes.json limits this function to the pages that show prices and "/api/*".
const SHOP = 'https://shop.asparagents.com';
const KEYS = ['download_file', 'add-to-cart', 'wc-api', 'wc-ajax', 'order', 'key', 'p', 'page_id', 'post_type', 's'];

const EURO = ['AT', 'BE', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'];
const CURRENCIES = {
  GB: ['£', 'pounds sterling'],
  CA: ['CA$', 'Canadian dollars'],
  AU: ['A$', 'Australian dollars'],
  NZ: ['NZ$', 'New Zealand dollars'],
  ...Object.fromEntries(EURO.map((c) => [c, ['€', 'euros']])),
};

function localPrices(response, [sign, name]) {
  return new HTMLRewriter()
    .on('span.m', { text: (t) => { if (t.text.includes('$')) t.replace(t.text.replace('$', sign)); } })
    .on('span.cur-note', { element: (el) => el.setInnerContent(`Prices are shown in ${name} for your country, and your quote lists the exact amount before we start.`) })
    .transform(response);
}

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/') && KEYS.some((k) => url.searchParams.has(k))) {
    return Response.redirect(`${SHOP}${url.pathname}${url.search}`, request.method === 'GET' || request.method === 'HEAD' ? 301 : 308);
  }
  const res = await next();
  if (url.pathname.startsWith('/api/') || request.method !== 'GET' || !(res.headers.get('content-type') || '').includes('text/html')) return res;
  const pick = (url.searchParams.get('cc') || '').toUpperCase();
  const cur = CURRENCIES[/^[A-Z]{2}$/.test(pick) ? pick : (request.cf && request.cf.country) || ''];
  if (!cur) return res;
  const out = localPrices(res, cur);
  const headers = new Headers(out.headers);
  headers.set('cache-control', 'private, max-age=0, must-revalidate');
  headers.set('vary', 'CF-IPCountry');
  headers.delete('etag');
  return new Response(out.body, { status: out.status, headers });
}
