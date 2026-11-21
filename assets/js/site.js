// asparagents.com copy of the asparajans.com script (assets/js/site.js). Pages are English only.
(function () {
  'use strict';
  window.ajReady = true;
  var doc = document.documentElement;
  // Interface texts follow the page language (English pages live under /en/).
  var L = doc.lang === 'en' ? function (tr, en) { return en; } : function (tr) { return tr; };
  doc.classList.remove('no-js');
  doc.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = 'IntersectionObserver' in window;
  // Layout is only measured after the browser has drawn the page (never right after a class change),
  // and every measuring function reads everything first, then writes. That avoids forced reflows.
  var afterPaint = function (fn) { requestAnimationFrame(function () { setTimeout(fn, 0); }); };

  // Entrance animation for image columns and cards below the hero. The "js" class is set in <head>, so they
  // start hidden from the first paint (no visible -> hidden flash). IntersectionObserver reveals them as they
  // come into view, without forcing layout; anything already above the viewport (e.g. a refresh mid-page) is
  // revealed straight away. CSS shows everything after 3s if this script never runs.
  // Language choice (Firat 12.11.2026): a visitor whose main browser language is not Turkish is sent from a Turkish
  // page to its English version once, by the server (functions/_middleware.js). Using the TR / EN switch stores the
  // choice in the aj_lang cookie, so the server never redirects that visitor again.
  Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (a) {
    a.addEventListener('click', function () {
      document.cookie = 'aj_lang=' + (a.getAttribute('hreflang') === 'en' ? 'en' : 'tr') + '; Path=/; Max-Age=31536000; SameSite=Lax; Secure';
    });
  });

  // Scroll animations (asparagents): blocks marked "rv" by the build fade and rise into view. Siblings come in one
  // after another (90ms apart). Once the animation has finished the classes are removed, so hover effects and
  // later layout work exactly as without animation.
  var rvs = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  var rvDone = function (el) { el.classList.remove('rv', 'rv-z', 'in', 'instant'); el.style.removeProperty('--rd'); };
  if (reduce || !io) rvs.forEach(rvDone);
  else {
    rvs.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains('rv'); });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--rd', Math.min(i, 5) * 90 + 'ms');
    });
    var rvAt = Date.now();
    var rvo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting && en.boundingClientRect.bottom >= 0) return;
        var el = en.target;
        rvo.unobserve(el);
        if (en.boundingClientRect.bottom < 0) { rvDone(el); return; }
        el.classList.add('in');
        setTimeout(function () { rvDone(el); }, 1400);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    rvs.forEach(function (el) { rvo.observe(el); });
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !io) reveals.forEach(function (el) { el.classList.add('in'); });
  else {
    // Anything already on screen while the page is loading (e.g. after a refresh, when the browser restores the
    // scroll position) is shown at once, without the slide-in, so a refresh never looks like a flash.
    var loadedAt = Date.now();
    var ro = new IntersectionObserver(function (entries) {
      var instant = Date.now() - loadedAt < 1000;
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.bottom < 0) {
          if (instant) en.target.classList.add('instant');
          en.target.classList.add('in');
          ro.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  // Counters count up when they come into view
  var counts = document.querySelectorAll('.js-count');
  if (io && !reduce && counts.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        co.unobserve(en.target);
        var el = en.target, to = +el.getAttribute('data-to'), t0 = null;
        var step = function (t) {
          if (!t0) t0 = t;
          var p = Math.min(1, (t - t0) / 1600);
          el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counts, function (el) { el.textContent = '0'; co.observe(el); });
  }

  // Carousels: arrow buttons scroll one "page"
  Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function (c) {
    var track = c.querySelector('.car-track');
    var prev = c.querySelector('.prev'), next = c.querySelector('.next');
    var queued = false;
    var update = function () {
      queued = false;
      var left = track.scrollLeft, max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = left <= 2;
      next.disabled = left >= max;
    };
    var schedule = function () { if (!queued) { queued = true; requestAnimationFrame(update); } };
    var go = function (dir) {
      var item = track.firstElementChild;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var w = item ? item.getBoundingClientRect().width + gap : track.clientWidth;
      var per = Math.max(1, Math.floor((track.clientWidth + gap) / w));
      track.scrollBy({ left: dir * per * w, behavior: reduce ? 'auto' : 'smooth' });
    };
    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    afterPaint(update);
  });

  // Reviews: clamp long texts with a "Devamını oku" toggle.
  // Clamp all first (write), measure them all after the next paint (read), then show the toggles (write).
  var reviews = Array.prototype.slice.call(document.querySelectorAll('.review'));
  reviews.forEach(function (r) { r.classList.add('clamp'); });
  if (reviews.length) afterPaint(function () {
    var overflow = reviews.map(function (r) { var p = r.querySelector('blockquote p'); return p.scrollHeight > p.clientHeight + 2; });
    reviews.forEach(function (r, i) {
      var more = r.querySelector('.more');
      if (!overflow[i]) { r.classList.remove('clamp'); return; }
      more.hidden = false;
      more.addEventListener('click', function () {
        var open = r.classList.toggle('clamp') === false;
        more.textContent = open ? L('Daha az göster', 'Show less') : L('Devamını oku', 'Read more');
      });
    });
  });

  // Menu: full-screen menu behind the header button. Esc, a link, or the button closes it.
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('site-menu');
  if (menuBtn && menu) {
    var here = location.pathname;
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      var p = a.getAttribute('href');
      if (p !== '/' && here.indexOf(p) === 0) a.setAttribute('aria-current', 'page');
    });
    var setMenu = function (open, byKeyboard) {
      // Locking the page scroll hides a visible scrollbar; padding of the same width keeps the page and the
      // header exactly where they were (0 on phones and on systems with overlay scrollbars).
      if (open) doc.style.setProperty('--sbw', (window.innerWidth - doc.clientWidth) + 'px');
      doc.classList.toggle('menu-open', open);
      if (!open) doc.style.removeProperty('--sbw');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Keyboard users land on the first link; on touch and mouse nothing is focused (no focus box on iPhone).
      if (open && byKeyboard) { var first = menu.querySelector('a'); if (first) setTimeout(function () { first.focus(); }, 50); }
    };
    setMenu(false);
    // From 1024px the nav is inline in the header: close the overlay (and unlock scrolling) if the window grows.
    var wide = window.matchMedia('(min-width: 1024px)');
    var onWide = function () { if (wide.matches) setMenu(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
    // e.detail is 0 when the button is pressed with Enter or Space.
    menuBtn.addEventListener('click', function (e) { setMenu(!doc.classList.contains('menu-open'), e.detail === 0); });
    // A link to another page leaves the menu covering the screen until the next page replaces it (closing first
    // would show the old page for a moment). Only in-page links (#...) and taps on the backdrop close it.
    menu.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (e.target === menu || (a && a.getAttribute('href').charAt(0) === '#')) setMenu(false);
    });
    // Coming back with the browser's Back button can restore the page with the menu still open: close it.
    window.addEventListener('pageshow', function (e) { if (e.persisted) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
  }

  // Sticky header: at the top of the page the header sits over the hero as before. Once it has scrolled out of
  // view it becomes a fixed bar (hidden), slides back in when the visitor scrolls up and hides again when they
  // scroll down. Back at the very top it returns to its normal place. Switching happens while the header is out
  // of view, so nothing jumps; the open menu keeps it as it is.
  var header = document.querySelector('.site-header');
  if (header) {
    var lastY = 0, ticking = false;
    // On inner pages the bar sits in the page flow, so pinning it (position: fixed) would pull the content up by its
    // height. Its height is measured once after the first paint and kept as padding on the body while it is pinned.
    var inFlow = !header.classList.contains('over-hero'), headerH = 0;
    var pin = function (on) {
      if (inFlow) document.body.style.paddingTop = on ? headerH + 'px' : '';
      header.classList.toggle('is-pinned', on);
      if (!on) header.classList.remove('is-shown', 'is-ready');
      // Turn the slide transition on only after the bar is in place, so pinning itself never animates.
      else requestAnimationFrame(function () { requestAnimationFrame(function () { header.classList.add('is-ready'); }); });
    };
    var onScroll = function () {
      ticking = false;
      if (doc.classList.contains('menu-open')) return;
      var y = window.pageYOffset;
      var pinned = header.classList.contains('is-pinned');
      if (y <= 4) { if (pinned) pin(false); lastY = y; return; }
      if (!pinned) { if (y > header.offsetHeight + 40) { pin(true); lastY = y; } return; }
      if (Math.abs(y - lastY) < 8) return;
      header.classList.toggle('is-shown', y < lastY);
      lastY = y;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    // Keyboard users tabbing into a hidden bar see it.
    header.addEventListener('focusin', function () { if (header.classList.contains('is-pinned')) header.classList.add('is-shown'); });
    // First check after the first paint, so reading the scroll position never forces a layout during load.
    afterPaint(function () { headerH = header.offsetHeight; lastY = window.pageYOffset; onScroll(); });
    window.addEventListener('resize', function () { if (!header.classList.contains('is-pinned')) headerH = header.offsetHeight; });
  }

  // FAQ accordion: one answer open at a time, opening and closing with a smooth height animation.
  Array.prototype.forEach.call(document.querySelectorAll('.faq'), function (faq) {
    var items = Array.prototype.slice.call(faq.querySelectorAll('details'));
    var toggle = function (d, open) {
      var body = d.querySelector('.faq-a');
      if (d._anim) d._anim.cancel();
      d.classList.toggle('is-open', open);
      if (reduce || !body.animate) { d.open = open; return; }
      var from = d.open ? body.offsetHeight : 0;
      d.open = true;
      var to = open ? body.scrollHeight : 0;
      d._anim = body.animate([{ height: from + 'px', opacity: open ? 0.4 : 1 }, { height: to + 'px', opacity: open ? 1 : 0 }], { duration: 320, easing: 'cubic-bezier(.2, .7, .2, 1)' });
      d._anim.onfinish = function () { d._anim = null; if (!open) d.open = false; };
    };
    items.forEach(function (d) {
      d.querySelector('summary').addEventListener('click', function (e) {
        e.preventDefault();
        var open = !d.classList.contains('is-open');
        if (open) items.forEach(function (o) { if (o !== d && o.classList.contains('is-open')) toggle(o, false); });
        toggle(d, open);
      });
    });
    // In a 50/50 band (desktop) the text column gets a fixed minimum height: the height it needs with the longest
    // answer open. Opening another answer then never changes the band's height, so the image next to it stays put.
    // On phones (< 1024px) the column keeps its natural height.
    var col = faq.closest('.split > .col-text, .faq-grid > .faq-col');
    if (!col || !window.matchMedia) return;
    var wide = window.matchMedia('(min-width: 1024px)');
    var fit = function () {
      col.style.minHeight = '';
      col.classList.remove('faq-fixed');
      if (!wide.matches) return;
      var openH = 0, maxH = 0;
      items.forEach(function (d) {
        var body = d.querySelector('.faq-a');
        if (d.classList.contains('is-open')) openH += body.offsetHeight;
        var was = d.open;
        d.open = true;
        maxH = Math.max(maxH, body.scrollHeight);
        d.open = was;
      });
      col.style.minHeight = Math.ceil(col.offsetHeight - openH + maxH) + 'px';
      col.classList.add('faq-fixed');
    };
    var timer;
    var refit = function () { clearTimeout(timer); timer = setTimeout(fit, 150); };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener('resize', refit);
  });

  // Leaving for another page of the site: blank everything below the header (and the open menu's links) and only
  // navigate once that blank frame has been painted (two animation frames, ~30ms). Chrome on iPhone draws one or
  // two frames of the outgoing screen shifted ~90px up before the next page; with nothing on them they are
  // invisible. Phone, mail, WhatsApp, external, new-tab and same-page # links are left alone.
  // asparagents: a link to the page you are already on (the logo on the home page) scrolls back to the top instead
  // of reloading, and the blanking is only done in Chrome on iPhone, the browser with the glitch. Elsewhere pages
  // change with a short cross fade (CSS view transitions), so there is no white flash.
  var criOS = /CriOS/.test(navigator.userAgent);
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (url.hash && url.pathname === location.pathname && url.search === location.search) return;
    if (url.pathname === location.pathname && url.search === location.search) {
      e.preventDefault();
      if (doc.classList.contains('menu-open')) { var mb = document.querySelector('.menu-btn'); if (mb) mb.click(); }
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    if (!criOS) return;
    e.preventDefault();
    doc.classList.add('leaving');
    requestAnimationFrame(function () { requestAnimationFrame(function () { window.location.href = url.href; }); });
    setTimeout(function () { doc.classList.remove('leaving'); }, 2000);
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) doc.classList.remove('leaving'); });

  // Pull-to-refresh in Chrome on iPhone (UA "CriOS") has the same shifted-frame glitch. A page cannot run code
  // right before a reload on iOS, so: when a pull at the top is released far enough to trigger Chrome's reload,
  // blank the content the same way. If no reload follows (a light pull, or Chrome's "+" / "x"), it comes back at
  // the next touch or after 1.5s. Safari and Firefox are not affected. (Reload from Chrome's own menu gives the
  // page no signal at all, so it cannot be covered.)
  if (/CriOS/.test(navigator.userAgent)) {
    // A pull = a touch that starts with the page at the top and moves down. Chrome often moves the page itself
    // during the pull without telling the page, so the finger's travel is the reliable measure (plus the
    // page's own overscroll when Chrome does report it).
    var startY = null, travel = 0, deepest = 0, pullTimer = null;
    var unblank = function () { clearTimeout(pullTimer); doc.classList.remove('leaving'); };
    window.addEventListener('touchstart', function (e) {
      unblank();
      startY = window.scrollY <= 0 && e.touches.length === 1 ? e.touches[0].clientY : null;
      travel = 0; deepest = 0;
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (startY !== null) travel = Math.max(travel, e.touches[0].clientY - startY);
    }, { passive: true });
    window.addEventListener('scroll', function () { if (window.scrollY < deepest) deepest = window.scrollY; }, { passive: true });
    window.addEventListener('touchend', function () {
      if (startY === null) return;
      var over = -Math.min(deepest, window.scrollY);
      if (travel >= 50 || over >= 30) {
        doc.classList.add('leaving');
        pullTimer = setTimeout(unblank, 1500);
      }
      startY = null;
    }, { passive: true });
  }

  // Mobile bottom bar (phones): hidden over the hero, which has the same actions; once the visitor has scrolled past
  // the hero it stays in view (Firat, 25.10.2026).
  var mbar = document.querySelector('.mobile-bar');
  if (mbar) {
    var mbTick = false;
    var mbHero = document.querySelector('.hero');
    var mbUpdate = function () {
      mbTick = false;
      var limit = mbHero ? mbHero.offsetTop + mbHero.offsetHeight - window.innerHeight * 0.5 : 300;
      mbar.classList.toggle('mb-show', window.pageYOffset > limit);
    };
    window.addEventListener('scroll', function () { if (!mbTick) { mbTick = true; requestAnimationFrame(mbUpdate); } }, { passive: true });
    window.addEventListener('resize', mbUpdate);
    mbar.addEventListener('focusin', function () { mbar.classList.add('mb-show'); });
    mbUpdate();
  }

  // Consent: analytics (GTM) loads only after the visitor accepts.
  var KEY = 'ag-consent';
  var GTM_ID = 'GTM-TCGBCSBJ'; // asparagents.com container
  var banner = document.querySelector('.consent');
  var read = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var write = function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: choice lasts this page view */ } };
  var gtmLoaded = false;
  var loadGtm = function () {
    if (gtmLoaded) return;
    gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    // Google Consent Mode v2 ("basic"): nothing Google loads before the visitor accepts; once they do,
    // tags also receive the consent state, which Google Ads needs for conversion measurement.
    var gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  };
  var choice = read();
  if (choice === 'granted') loadGtm();
  else if (!choice && banner) banner.hidden = false;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-consent]');
    if (b) {
      var v = b.getAttribute('data-consent');
      write(v);
      if (banner) banner.hidden = true;
      if (v === 'granted') loadGtm();
      else {
        // Withdrawing consent: remove Google Analytics cookies, then reload without GTM.
        document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); }).filter(function (n) { return /^_ga|^_gid|^_gcl/.test(n); }).forEach(function (n) {
          ['', '; domain=' + location.hostname, '; domain=.' + location.hostname.replace(/^www\./, '')].forEach(function (d) { document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d; });
        });
        if (gtmLoaded) window.location.reload();
      }
    }
    if (e.target.closest('[data-consent-open]') && banner) banner.hidden = false;
  });

  // Voice message: MediaRecorder in the browser, max 2 minutes, kept in memory until the form is sent.
  // form.ajVoice() resolves to { audio: base64, type, seconds } or null. Nothing is requested from the
  // microphone until the visitor presses the button.
  var VOICE_MAX = 120;
  var fmt = function (s) { return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };
  // Every recording is converted to WAV (16-bit mono, 12 kHz) in the browser before it is attached. Browsers record
  // WebM, Ogg or MP4 depending on the make, and iPhone Mail, Outlook and Windows cannot all play those; WAV plays
  // everywhere. 2 minutes is about 2.9 MB. Quiet recordings are raised (peak to 90%, at most 4x). If the conversion
  // fails, the original recording is sent instead.
  var WAV_RATE = 12000;
  var OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  var render = function (ctx) {
    return new Promise(function (resolve, reject) {
      ctx.oncomplete = function (e) { resolve(e.renderedBuffer); };
      var r = ctx.startRendering();
      if (r && r.then) r.then(resolve, reject);
    });
  };
  var resample = function (data, from, to) { // fallback when the browser cannot render at 12 kHz itself
    var ratio = from / to, out = new Float32Array(Math.floor(data.length / ratio));
    for (var i = 0; i < out.length; i++) {
      var a = Math.floor(i * ratio), b = Math.min(data.length, Math.floor((i + 1) * ratio)), sum = 0;
      for (var j = a; j < b; j++) sum += data[j];
      out[i] = b > a ? sum / (b - a) : data[a] || 0;
    }
    return out;
  };
  var encodeWav = function (samples) {
    var peak = 0, i;
    for (i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]));
    var gain = peak > 0 ? Math.min(4, 0.9 / peak) : 1;
    var buf = new ArrayBuffer(44 + samples.length * 2), v = new DataView(buf);
    var put = function (o, str) { for (var k = 0; k < str.length; k++) v.setUint8(o + k, str.charCodeAt(k)); };
    put(0, 'RIFF'); v.setUint32(4, 36 + samples.length * 2, true); put(8, 'WAVE');
    put(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, WAV_RATE, true); v.setUint32(28, WAV_RATE * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    put(36, 'data'); v.setUint32(40, samples.length * 2, true);
    for (i = 0; i < samples.length; i++) {
      var x = Math.max(-1, Math.min(1, samples[i] * gain));
      v.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7fff, true);
    }
    return new Blob([buf], { type: 'audio/wav' });
  };
  var toWav = function (blob) {
    if (!OAC || !blob.arrayBuffer) return Promise.reject(new Error('unsupported'));
    return blob.arrayBuffer().then(function (data) {
      return new Promise(function (resolve, reject) {
        var p = new OAC(1, 1, 44100).decodeAudioData(data, resolve, reject);
        if (p && p.then) p.then(resolve, reject);
      });
    }).then(function (decoded) {
      var len = Math.min(Math.ceil(decoded.duration * WAV_RATE), (VOICE_MAX + 1) * WAV_RATE);
      var ctx;
      try { ctx = new OAC(1, len, WAV_RATE); } catch (e) { ctx = null; }
      if (!ctx) return resample(decoded.getChannelData(0), decoded.sampleRate, WAV_RATE);
      var src = ctx.createBufferSource();
      src.buffer = decoded; src.connect(ctx.destination); src.start(0);
      return render(ctx).then(function (out) { return out.getChannelData(0); });
    }).then(encodeWav);
  };
  Array.prototype.forEach.call(document.querySelectorAll('[data-voice]'), function (box) {
    var form = box.closest('form');
    var rec = box.querySelector('[data-voice-rec]');
    var label = rec.querySelector('b');
    var time = box.querySelector('[data-voice-time]');
    var audio = box.querySelector('[data-voice-audio]');
    var del = box.querySelector('[data-voice-del]');
    var note = box.querySelector('[data-voice-note]');
    var noteText = note.textContent;
    var alt = form.querySelector('[data-voice-alt]');
    var recorder = null, stream = null, chunks = [], blob = null, seconds = 0, timer = null, done = null, gen = 0;
    var say = function (text, err) { note.textContent = text; note.className = 'voice-note' + (err ? ' err' : ''); };
    var setIdle = function () {
      blob = null; seconds = 0; gen++; rec.disabled = false;
      if (alt) alt.required = true;
      if (audio.src) { URL.revokeObjectURL(audio.src); audio.removeAttribute('src'); }
      audio.hidden = true; del.hidden = true; time.hidden = true; rec.hidden = false;
      rec.classList.remove('is-rec'); label.textContent = L('Kaydı Başlat', 'Start Recording');
      say(noteText);
    };
    var release = function () {
      clearInterval(timer);
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      stream = null;
    };
    var pickType = function () {
      var types = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/webm'];
      for (var i = 0; i < types.length; i++) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(types[i])) return types[i];
      return '';
    };
    var stop = function () { if (recorder && recorder.state === 'recording') recorder.stop(); };
    var start = function () {
      if (!window.MediaRecorder || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        say(L('Tarayıcınız ses kaydını desteklemiyor. Lütfen mesajınızı yazın.', 'Your browser does not support voice recording. Please type your message.'), true);
        return;
      }
      navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then(function (s) {
        stream = s; chunks = [];
        var type = pickType();
        var opts = { audioBitsPerSecond: 32000 };
        if (type) opts.mimeType = type;
        recorder = new MediaRecorder(stream, opts);
        recorder.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
        recorder.onstop = function () {
          release();
          rec.classList.remove('is-rec');
          var finish = done; done = null;
          if (seconds < 1 || !chunks.length) { setIdle(); say(L('Kayıt çok kısa oldu. Lütfen tekrar deneyin.', 'The recording was too short. Please try again.'), true); if (finish) finish(); return; }
          var raw = new Blob(chunks, { type: (recorder.mimeType || type || 'audio/webm') });
          var mine = gen;
          rec.disabled = true; label.textContent = L('Hazırlanıyor…', 'Preparing…');
          say(L('Kaydınız hazırlanıyor…', 'Preparing your recording…'));
          toWav(raw).catch(function () { return raw; }).then(function (b) {
            if (mine !== gen) { if (finish) finish(); return; } // deleted or form reset meanwhile
            blob = b;
            audio.src = URL.createObjectURL(blob);
            if (alt) alt.required = false;
            rec.disabled = false; rec.hidden = true; time.hidden = true; audio.hidden = false; del.hidden = false;
            say(L('Sesli mesajınız forma eklendi (', 'Your voice message was added to the form (') + fmt(seconds) + L('). Formu göndermeyi unutmayın.', '). Remember to send the form.'));
            if (finish) finish();
          });
        };
        recorder.start(1000);
        seconds = 0; time.textContent = '0:00 / ' + fmt(VOICE_MAX); time.hidden = false;
        rec.classList.add('is-rec'); label.textContent = L('Kaydı Bitir', 'Stop Recording');
        say(L('Kayıt yapılıyor… Bitirdiğinizde “Kaydı Bitir”e basın.', 'Recording… Press “Stop Recording” when you are done.'));
        timer = setInterval(function () {
          seconds++;
          time.textContent = fmt(seconds) + ' / ' + fmt(VOICE_MAX);
          if (seconds >= VOICE_MAX) stop();
        }, 1000);
      }).catch(function () {
        release();
        say(L('Mikrofona erişilemedi. Tarayıcı izinlerini kontrol edin veya mesajınızı yazın.', 'The microphone could not be reached. Check your browser permissions or type your message.'), true);
      });
    };
    rec.addEventListener('click', function () { if (recorder && recorder.state === 'recording') stop(); else start(); });
    del.addEventListener('click', function () { setIdle(); rec.focus(); });
    form.addEventListener('reset', function () { stop(); setIdle(); });
    // Called on submit: finishes a running recording first, then hands over the audio as base64.
    form.ajVoice = function () {
      var wait = recorder && recorder.state === 'recording' ? new Promise(function (r) { done = r; stop(); }) : Promise.resolve();
      return wait.then(function () {
        if (!blob) return null;
        return new Promise(function (resolve, reject) {
          var fr = new FileReader();
          fr.onload = function () { resolve({ audio: String(fr.result).split(',')[1] || '', type: blob.type, seconds: seconds }); };
          fr.onerror = reject;
          fr.readAsDataURL(blob);
        });
      });
    };
  });

  // Forms -> /api/form
  Array.prototype.forEach.call(document.querySelectorAll('form[data-form]'), function (form) {
    var status = form.querySelector('.form-status');
    var started = Date.now();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var btn = form.querySelector('button[type="submit"]');
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });
      data.form = form.getAttribute('data-form');
      data.page = window.location.pathname;
      data.elapsed = Date.now() - started;
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = L('Gönderiliyor…', 'Sending…');
      (form.ajVoice ? form.ajVoice() : Promise.resolve(null))
        .then(function (voice) {
          if (voice) { data.audio = voice.audio; data.audio_type = voice.type; data.audio_seconds = voice.seconds; }
          return fetch('/api/form', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            status.className = 'form-status ok';
            status.textContent = L('Teşekkürler, mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.', 'Thank you, your message has reached us. We will get back to you as soon as possible.');
            if (window.dataLayer) window.dataLayer.push({ event: 'form_submit', form_name: data.form, voice_message: data.audio ? 'yes' : 'no' });
          } else { throw new Error(res.j && res.j.error); }
        })
        .catch(function () {
          status.className = 'form-status err';
          status.innerHTML = L('Mesajınız gönderilemedi. Lütfen <a href="mailto:info@asparajans.com">info@asparajans.com</a> adresine yazın veya WhatsApp üzerinden ulaşın.', 'Your message could not be sent. Please write to <a href="mailto:info@asparagents.com">info@asparagents.com</a> or contact us on WhatsApp.');
        })
        .finally(function () { btn.disabled = false; });
    });
  });
})();
