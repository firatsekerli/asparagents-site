import { site, pageHead } from '../layout.mjs';
const splitHero = ({ tag, title, intro, actions }) => pageHead({ tag, title, intro, actions });

// Privacy Policy and Cookie Policy for the static asparagents.com. They keep the URLs of the WordPress pages
// (/privacy-policy/, /cookie-policy-eu/). The shop (shop.asparagents.com) keeps its own policies for orders,
// accounts and payments. DRAFT for Firat's review (20.11.2026): adapted from the asparajans.com texts and the old
// asparagents pages; processors and retention periods are the ones already confirmed for asparajans.com.
const media = '';
const updated = '20 November 2026';

const privacy = {
  path: '/privacy-policy/',
  title: 'Privacy Policy | asparagents',
  description: 'How asparagents.com handles the personal data of visitors and of people who contact us, and the rights you have under the GDPR, the UK GDPR and the CCPA.',
  crumbs: [{ name: 'Privacy Policy', path: '/privacy-policy/' }],
  body: `
${splitHero({ tag: 'Legal', compact: true, title: 'Privacy [[Policy]]', intro: `<p>How we handle the personal data of visitors of asparagents.com and of people who contact us.</p><p>Data controller: ${site.legalName}</p>`, actions: `<div class="btns"><a class="btn" href="mailto:${site.email}">Privacy Request</a></div>`, media })}
<section class="sec"><div class="wrap prose">
<p>This Privacy Policy explains how ${site.legalName}, who runs asparagents (“we”), handles personal data on asparagents.com. Orders, customer accounts and payments in our shop at <a href="${site.shop}">shop.asparagents.com</a> are covered by the shop’s own privacy policy.</p>

<h2>Who we are</h2>
<p>Name: ${site.legalName}<br>Address: ${site.address.text}<br>Email: <a href="mailto:${site.email}">${site.email}</a><br>WhatsApp: ${site.phone}</p>

<h2>Personal data we process</h2>
<ul>
  <li>Contact details: your name, email address and, if you give them, your phone number and company name.</li>
  <li>Your request: the written or voice message you send through the contact form, by email or on WhatsApp.</li>
  <li>Security data: IP address, browser and device information in our hosting provider’s security logs.</li>
  <li>Usage data: how the site is used, collected through analytics and advertising cookies, only if you accept them.</li>
</ul>

<h2>Why we use it and on what basis</h2>
<ul>
  <li>To answer your message and prepare a quote, and to perform our services: steps you asked for before a contract, and the contract itself.</li>
  <li>To keep the website secure and prevent misuse: our legitimate interest.</li>
  <li>To measure visits and the effect of our ads: your consent, which you can withdraw at any time through “Cookie Settings”.</li>
  <li>To check which of our Google ads led to an enquiry or a purchase (enhanced conversions): your consent to advertising cookies. If you have given it and you send a form or place an order, your email address, phone number, name and address are converted in your browser into a one-way code (SHA-256 hashing) before they are sent to Google. Google uses the code only to match the enquiry to an ad click and does not receive the readable details from this measurement. Without your consent nothing is sent.</li>
  <li>To meet legal obligations, such as keeping invoices.</li>
</ul>

<h2>Who receives it</h2>
<ul>
  <li>Hosting and security: Cloudflare, Inc.</li>
  <li>Email: Uzman Posta (our mailbox provider).</li>
  <li>Delivery of form messages: Resend, Inc. (USA).</li>
  <li>Analytics and ad measurement, only with your consent: Google LLC (Google Analytics, Google Ads, Google Tag Manager), including the hashed contact details used for enhanced conversions.</li>
  <li>Public authorities, where the law requires it.</li>
</ul>
<p>Some of these providers process data outside the UK and the European Economic Area, mainly in the USA. Where that happens, the transfer relies on the safeguards those providers offer, such as standard contractual clauses.</p>
<p>We do not sell your personal data.</p>

<h2>How long we keep it</h2>
<ul>
  <li>Messages and correspondence: 2 years from the last contact. If your request becomes a contract, it is kept with the contract records.</li>
  <li>Contracts, quotes and invoices: as long as the law requires (up to 10 years).</li>
  <li>Analytics data: at most 14 months in Google Analytics. For cookie durations see the <a href="/cookie-policy-eu/">Cookie Policy</a>.</li>
  <li>Security logs: for the period our hosting provider sets.</li>
</ul>

<h2>Your rights</h2>
<p>Under the GDPR and the UK GDPR you have the right to access your personal data, to have it corrected, to have it erased, to restrict or object to its processing, to data portability and to withdraw your consent at any time. You can also complain to your data protection authority, in the UK the Information Commissioner’s Office.</p>
<p>If you live in California, the CCPA gives you the right to know which personal data we collected about you, to ask us to delete it, and to ask us not to sell it; we do not sell personal data.</p>
<p>Send your request to <a href="mailto:${site.email}">${site.email}</a>. We reply within one month.</p>

<h2>Children</h2>
<p>asparagents.com is not meant for children, and we do not knowingly collect personal data from children under 13. If you think a child has sent us personal data, contact us and we will delete it.</p>
<p class="meta">Last updated: ${updated}</p>
</div></section>
`,
};

const cookies = {
  path: '/cookie-policy-eu/',
  title: 'Cookie Policy | asparagents',
  description: 'The necessary, analytics and advertising cookies used on asparagents.com, and how you can manage your cookie choices.',
  crumbs: [{ name: 'Cookie Policy', path: '/cookie-policy-eu/' }],
  body: `
${splitHero({ tag: 'Legal', compact: true, title: '[[Cookie]] Policy', intro: '<p>Which cookies we use on asparagents.com, why, and how you can change your choice. Analytics and advertising cookies are used only if you accept them.</p>', actions: '<div class="btns"><button type="button" class="btn" data-consent-open>Cookie Settings</button></div>', media })}
<section class="sec"><div class="wrap prose">
<p>This Cookie Policy explains how asparagents (asparagents.com), run by ${site.legalName}, uses cookies and similar technologies, and how you can control them. Our shop at <a href="${site.shop}">shop.asparagents.com</a> uses its own cookies for the cart, accounts and payments; see its cookie policy.</p>

<h2>What cookies are</h2>
<p>Cookies are small text files a website stores in your browser. They help the site work, remember your choices and, if you agree, measure how the site is used.</p>

<h2>Necessary, no consent needed</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>ag-consent</td><td>asparagents.com</td><td>Remembers your cookie choice (kept in the browser’s local storage).</td><td>Until you change or delete your choice</td></tr>
    <tr><td>__cf_bm</td><td>Cloudflare</td><td>Tells malicious bot traffic apart; only created when needed.</td><td>30 minutes</td></tr>
  </tbody>
</table></div>

<h2>Analytics, only with your consent</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>_ga</td><td>Google Analytics</td><td>Tells visits apart with a random number to count visitors and sessions.</td><td>2 years</td></tr>
    <tr><td>_ga_&lt;id&gt;</td><td>Google Analytics</td><td>Stores and counts page views.</td><td>2 years</td></tr>
  </tbody>
</table></div>

<h2>Advertising, only with your consent</h2>
<div class="table-wrap"><table>
  <thead><tr><th>Name</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>_gcl_au</td><td>Google Ads</td><td>Measures whether our Google ads led to a visit or an enquiry.</td><td>90 days</td></tr>
    <tr><td>_gcl_ls</td><td>Google Ads</td><td>Stores information about ad clicks (browser storage).</td><td>Until you clear it</td></tr>
  </tbody>
</table></div>
<p>Analytics and advertising cookies are loaded through Google Tag Manager only after you accept them.</p>

<h2>Managing cookies</h2>
<p>You can accept or reject analytics and advertising cookies in our cookie banner, and change your choice later with “Cookie Settings” at the bottom of every page. You can also delete or block cookies in your browser settings.</p>

<h2>More information</h2>
<p>See our <a href="/privacy-policy/">Privacy Policy</a> for how we handle personal data. Questions about cookies: <a href="mailto:${site.email}">${site.email}</a>, ${site.legalName}, ${site.address.text}.</p>
<p class="meta">Last updated: ${updated}</p>
</div></section>
`,
};

const notFound = {
  path: '/404.html',
  title: 'Page Not Found | asparagents',
  description: 'The page you are looking for could not be found.',
  noindex: true,
  body: `
${splitHero({ tag: '404', compact: true, title: 'Page [[Not Found]]', intro: '<p>The page you are looking for has moved or no longer exists.</p><p>Looking for a plugin, your account or your order? They are in our <a href="https://shop.asparagents.com/">shop</a>.</p>', actions: '<div class="btns"><a class="btn" href="/">Home Page</a><a class="btn btn-soft" href="/contact/">Contact Us</a></div>', media })}
`,
};

export default [privacy, cookies, notFound];
