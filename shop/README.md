# shop.asparagents.com chrome

`shop-chrome.php` is the Code Snippets snippet "asparagents header, footer and colours" on shop.asparagents.com
(front end only). It prints a shop-only header and footer and the WhatsApp button, adds the asparagents colours and
button style to WooCommerce, and hides the old Oxygen header, footer and floating menu.

The header and footer are shop-only (Products, My Account, Cart; legal pages and one link back to asparagents.com).

GTM-TCGBCSBJ is loaded on the shop by the snippets "Google Tag Manager - HEAD" (id 6, waits for CookieYes
consent) and "Google Tag Manager - BODY" (id 7). This snippet pushes a GA4 `purchase` event (once per order) on the order
received page. GTM turns that into the GA4 purchase and the Google Ads conversion.
