// asparagents.com: WooCommerce links that carry their meaning in the query string (?download_file= in order emails,
// ?add-to-cart=, ?wc-api= payment callbacks) cannot be matched by _redirects, so they are sent to the shop here.
// public/_routes.json limits this function to "/", "/plugins/*" and "/api/*".
const SHOP = 'https://shop.asparagents.com';
const KEYS = ['download_file', 'add-to-cart', 'wc-api', 'wc-ajax', 'order', 'key', 'p', 'page_id', 'post_type', 's'];

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/') && KEYS.some((k) => url.searchParams.has(k))) {
    return Response.redirect(`${SHOP}${url.pathname}${url.search}`, request.method === 'GET' || request.method === 'HEAD' ? 301 : 308);
  }
  return next();
}
