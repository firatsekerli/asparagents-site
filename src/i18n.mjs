// asparagents.com is English only. The shared components (copied from the asparajans.com layout) still call t(tr, en),
// so the language is fixed to English here and every t() call returns the English text.
let cur = 'en';
export const lang = () => cur;
export const inLang = (l, fn) => fn();
export const t = (tr, en) => en;
export const servicePath = (slug) => `/services/${slug}/`;
export const alternates = () => null;
export const enPath = (p) => p;
