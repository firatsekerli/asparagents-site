// Prototypes of the two web apps on the Dimak Kapı reference page (Firat 27.11.2026: show both tools as working
// prototypes like the Cristal Windows page; no screenshots exist). Built from the apps' own code: Prospector
// (lib/config.ts, lib/score.ts, app/guide) and Montaj Programı (packages/rules, supabase/migrations/0003_seed_dimak.sql,
// messages/tr.json). They run only in the browser with invented sample data and send nothing.
import { demoShell } from './common.mjs';

const badge = (html) => html.replace('Demo with sample data. Nothing is sent.', 'Demo rebuilt from the app. Sample data, not live data.');

// Prospector: cities, segments, statuses and the fit score rules from the app (lib/config.ts, lib/score.ts).
const prospectorHtml = badge(
  demoShell(
    'px-demo',
    ['Find Companies', 'Leads'],
    [
      `<div class="demo-grid">
      <div>
        <fieldset class="demo-q"><legend>Country</legend><div class="demo-opts" id="px-country"></div></fieldset>
        <fieldset class="demo-q"><legend>Cities</legend><div class="demo-opts" id="px-cities"></div><p class="demo-hint">All cities are on by default. Searching more cities finds more companies.</p></fieldset>
        <div class="demo-q"><label for="px-term">What to search for</label><input class="demo-in" id="px-term" value="fire door supplier" autocomplete="off"></div>
        <fieldset class="demo-q"><legend>Tag new results as</legend><div class="demo-opts" id="px-seg"></div></fieldset>
        <div class="demo-btns"><button type="button" class="btn" id="px-go">Search</button></div>
        <p class="demo-hint" id="px-prog" aria-live="polite"></p>
      </div>
      <aside class="demo-preview" aria-label="How the search works">
        <h3>How the search works</h3>
        <ul class="docs">
          <li><span>Each city is searched as<small>keyword in city, country</small></span></li>
          <li><span>Results are merged by Google ID<small>a company found twice is counted once</small></span></li>
          <li><span>Irrelevant places are dropped<small>hotels, places of worship, campgrounds</small></span></li>
          <li><span>Only the Google ID and your own data are saved<small>names and phone numbers are read live</small></span></li>
        </ul>
      </aside>
    </div>`,
      `<div class="px-bar">
      <div class="demo-q"><label for="px-kw">Good-fit keywords</label><input class="demo-in" id="px-kw" value="fire door, steel door" autocomplete="off"></div>
      <div class="demo-q"><label for="px-fs">Status</label><select class="demo-in" id="px-fs"><option value="">All</option></select></div>
      <label class="px-chk"><input type="checkbox" id="px-sort" checked> Sort by score</label>
    </div>
    <p class="demo-hint" id="px-sum" aria-live="polite" style="margin:0 0 14px"></p>
    <ul class="px-leads" id="px-leads"></ul>
    <p class="demo-note">The score is the fit: 10 for an off-target business, 55 with one signal, 100 with both (a relevant business type, and your keywords in its name or category). A star marks a lead you checked yourself and sets it to 100.</p>
    <div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="px-again">New Search</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
    ],
    'Interactive demo of a lead finder that searches business listings and scores each company'
  )
);

const prospectorJs = `
(function () {
  var root = document.getElementById('px-demo'); if (!root || !window.agDemo) return;
  var $ = function (id) { return document.getElementById(id); }, E = window.agEsc, ui = window.agDemo(root);
  var cities = { 'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah'], 'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam'], 'Qatar': ['Doha'], 'Kuwait': ['Kuwait City'], 'Oman': ['Muscat'], 'Bahrain': ['Manama'] };
  var segs = ["Don't tag", 'Distributor / Trading', 'Contractor', 'Specifier', 'Facility / FM'];
  var statuses = ['New', 'Contacted', 'Replied', 'Not a fit'];
  var hints = ['door', 'manufacturer', 'hardware', 'building material', 'building supply', 'construction', 'contractor', 'supplier', 'wholesal', 'distribut', 'metal', 'steel', 'iron', 'alumin', 'glass', 'window', 'joinery', 'carpentry', 'timber', 'interior', 'fit out', 'architect', 'industrial', 'trading', 'fire'];
  // Invented sample companies. A city search returns some of them; one appears in every city to show the merge.
  var pool = [
    ['Sample Steel Doors Trading', 'Door supplier', 'all'],
    ['Sample Building Materials', 'Building materials store', 0],
    ['Sample General Contracting', 'General contractor', 1],
    ['Sample Office Services', 'Business center', 0],
    ['Sample Metal Works', 'Metal fabricator', 2],
    ['Sample Fit Out Company', 'Interior fit out contractor', 1],
    ['Sample Hotel', 'Hotel', 'junk']
  ];
  var st = { country: 'UAE', on: {}, seg: "Don't tag" }, leads = [], searched = 0;
  function chips() {
    $('px-country').innerHTML = Object.keys(cities).map(function (c) { return '<button type="button" class="demo-opt" data-c="' + c + '" aria-pressed="' + (c === st.country) + '">' + c + '</button>'; }).join('');
    $('px-cities').innerHTML = cities[st.country].map(function (c) { return '<button type="button" class="demo-opt" data-city="' + c + '" aria-pressed="' + !!st.on[c] + '">' + c + '</button>'; }).join('');
    $('px-seg').innerHTML = segs.map(function (s) { return '<button type="button" class="demo-opt" data-s="' + s + '" aria-pressed="' + (s === st.seg) + '">' + E(s) + '</button>'; }).join('');
    $('px-go').disabled = !cities[st.country].some(function (c) { return st.on[c]; });
  }
  function country(c) { st.country = c; st.on = {}; cities[c].forEach(function (x) { st.on[x] = true; }); chips(); }
  function score(l) {
    if (l.star) return 100;
    var hay = (l.cat + ' ' + l.name).toLowerCase();
    var type = hints.some(function (h) { return hay.indexOf(h) > -1; });
    var toks = $('px-kw').value.toLowerCase().split(/[^a-z0-9]+/).filter(function (t) { return t.length >= 3 && t !== 'and' && t !== 'the' && t !== 'for' && t !== 'with'; });
    var user = toks.some(function (t) { return hay.indexOf(t) > -1; });
    return 10 + (type ? 45 : 0) + (user ? 45 : 0);
  }
  function list() {
    var f = $('px-fs').value, rows = leads.map(function (l, i) { return { l: l, i: i, s: score(l) }; }).filter(function (r) { return !f || r.l.status === f; });
    if ($('px-sort').checked) rows.sort(function (a, b) { return b.s - a.s; });
    $('px-leads').innerHTML = rows.map(function (r) {
      var l = r.l, cls = r.s >= 100 ? 'hi' : r.s >= 55 ? 'mid' : 'lo';
      return '<li class="px-lead"><div class="px-score ' + cls + '"><b>' + r.s + '</b><button type="button" class="px-star" data-star="' + r.i + '" aria-pressed="' + l.star + '" aria-label="Mark ' + E(l.name) + ' as a strong fit">' + (l.star ? '&#9733;' : '&#9734;') + '</button></div>' +
        '<div class="px-co"><b>' + E(l.name) + '</b><small>' + E(l.cat) + ', ' + E(l.city) + '</small><small>Found via: ' + E(l.via) + (l.seg ? ' &middot; Segment: ' + E(l.seg) : '') + '</small>' +
        '<div class="px-ct">' + (l.contact ? '<span class="dtag ok">Phone and website loaded</span>' : '<button type="button" class="demo-opt" data-ct="' + r.i + '">Show contact</button>') + '</div></div>' +
        '<div><label class="sr" for="px-st' + r.i + '">Status of ' + E(l.name) + '</label><select class="demo-in px-st" id="px-st' + r.i + '" data-st="' + r.i + '">' + statuses.map(function (s) { return '<option' + (s === l.status ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div></li>';
    }).join('') || '<li class="demo-empty">No leads match this filter.</li>';
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('[data-c]'); if (b) { country(b.getAttribute('data-c')); return; }
    b = e.target.closest('[data-city]'); if (b) { var c = b.getAttribute('data-city'); st.on[c] = !st.on[c]; chips(); return; }
    b = e.target.closest('[data-s]'); if (b) { st.seg = b.getAttribute('data-s'); chips(); return; }
    b = e.target.closest('[data-star]'); if (b) { var l = leads[+b.getAttribute('data-star')]; l.star = !l.star; list(); return; }
    b = e.target.closest('[data-ct]'); if (b) { leads[+b.getAttribute('data-ct')].contact = true; list(); }
  });
  root.addEventListener('change', function (e) { var s = e.target.getAttribute('data-st'); if (s !== null) { leads[+s].status = e.target.value; list(); } });
  $('px-kw').addEventListener('input', list); $('px-fs').addEventListener('change', list); $('px-sort').addEventListener('change', list);
  $('px-fs').innerHTML += statuses.map(function (s) { return '<option>' + s + '</option>'; }).join('');
  $('px-go').addEventListener('click', function () {
    var on = cities[st.country].filter(function (c) { return st.on[c]; }), term = $('px-term').value.trim() || 'fire door supplier', seen = {}, added = 0, again = 0, junk = 0, n = 0;
    leads = []; $('px-go').disabled = true;
    (function next() {
      if (n === on.length) {
        $('px-prog').textContent = 'Added ' + added + ' new, refreshed ' + again + '.';
        $('px-sum').textContent = leads.length + ' leads in ' + st.country + '. ' + junk + (junk === 1 ? ' hotel was' : ' hotels were') + ' filtered out.';
        $('px-go').disabled = false; list(); ui.enable(1); ui.show(1); return;
      }
      var city = on[n]; n++;
      $('px-prog').textContent = 'Searching ' + city + ' ' + n + '/' + on.length + '...';
      pool.forEach(function (p) {
        if (p[2] === 'junk') { if (n === 1) junk++; return; }
        if (p[2] !== 'all' && p[2] !== (n - 1) % 3) return;
        var key = p[0] + (p[2] === 'all' ? '' : city);
        if (seen[key]) { again++; return; }
        seen[key] = 1; added++;
        leads.push({ name: p[0], cat: p[1], city: city, via: term, seg: st.seg === "Don't tag" ? '' : st.seg, status: 'New', star: false, contact: false });
      });
      setTimeout(next, 450);
    })();
  });
  $('px-again').addEventListener('click', function () { ui.reset(); $('px-prog').textContent = ''; });
  country('UAE');
})();
`;

// Montaj Programı: Dimak's door types and capacity rules from the app's seed data and rules engine.
// Rate per team day = base (normal or overtime) x rule factors + 2 per person above a 2 person crew.
const montajHtml = badge(
  demoShell(
    'mp-demo',
    ['Order', 'Weekly Plan', 'Record Installed'],
    [
      `<div class="demo-grid">
      <div>
        <fieldset class="demo-q"><legend>Door type</legend><div class="demo-opts" id="mp-type"></div></fieldset>
        <div class="demo-q"><label for="mp-qty">Quantity</label><input class="demo-in" id="mp-qty" type="number" inputmode="numeric" min="1" max="40" value="10" style="max-width:140px"></div>
        <fieldset class="demo-q"><legend>Order details</legend><div class="demo-opts">
          <button type="button" class="demo-opt" id="mp-big" aria-pressed="false">Leaf wider than 1150 mm and taller than 2400 mm</button>
          <button type="button" class="demo-opt" id="mp-dem" aria-pressed="false">Old door removal or wall demolition</button>
        </div></fieldset>
        <p class="demo-err" id="mp-err" aria-live="polite"></p>
        <div class="demo-btns"><button type="button" class="btn" id="mp-gen">Generate Plan</button></div>
      </div>
      <aside class="demo-preview" aria-label="Capacity for this order">
        <h3>Doors one team can install in a day</h3>
        <ul class="kv" id="mp-cap" aria-live="polite"></ul>
        <p class="demo-hint" id="mp-rules"></p>
        <p class="demo-note">In the app every door type, rule and team is a setting the office can change, so nothing here is fixed in code.</p>
      </aside>
    </div>`,
      `<p class="demo-hint" style="margin:0 0 14px">Two sample orders were already waiting. Your order is <b>S-103</b>. Each card shows the share of the team's day it uses.</p>
    <div class="mp-board" id="mp-board"></div>
    <div id="mp-un" aria-live="polite"></div>
    <div class="demo-btns" style="margin-top:18px"><button type="button" class="btn" id="mp-next">Record Installed Doors</button></div>`,
      `<div class="demo-grid">
      <div>
        <p id="mp-rec-what" style="margin:0 0 14px"></p>
        <div class="demo-q"><label for="mp-done">Installed doors</label><input class="demo-in" id="mp-done" type="number" inputmode="numeric" min="0" style="max-width:140px"></div>
        <p class="demo-err" id="mp-rerr" aria-live="polite"></p>
        <div class="demo-btns"><button type="button" class="btn" id="mp-save">Save</button></div>
      </div>
      <aside class="demo-preview" aria-label="Result">
        <h3>After saving</h3>
        <div id="mp-res" aria-live="polite"><p class="demo-empty">Enter how many doors the team installed on Monday. Any doors left are planned again.</p></div>
      </aside>
    </div>
    <div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="mp-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
    ],
    'Interactive demo of an installation planner that turns door orders into a weekly plan for teams'
  )
);

const montajJs = `
(function () {
  var root = document.getElementById('mp-demo'); if (!root || !window.agDemo) return;
  var $ = function (id) { return document.getElementById(id); }, ui = window.agDemo(root);
  var types = [
    ['hs', 'Half or block frame, single leaf', 9, 12], ['fs', 'Full frame, single leaf', 7, 10],
    ['hd', 'Half or block frame, double leaf', 6, 9], ['fd', 'Full frame, double leaf', 5, 8]
  ];
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], teams = [['Team 1', 3], ['Team 2', 2]];
  var st = { type: 'fs', big: false, dem: false }, plan = [], mine = null;
  function T(k) { return types.filter(function (t) { return t[0] === k; })[0]; }
  function rate(o, crew, ot) { var t = T(o.type), f = (o.big ? 0.8 : 1) * (o.dem ? 0.5 : 1); return t[ot ? 3 : 2] * f + 2 * Math.max(0, crew - 2); }
  function r1(n) { return Math.round(n * 10) / 10; }
  function aside() {
    $('mp-type').innerHTML = types.map(function (t) { return '<button type="button" class="demo-opt" data-t="' + t[0] + '" aria-pressed="' + (t[0] === st.type) + '">' + t[1] + '</button>'; }).join('');
    $('mp-big').setAttribute('aria-pressed', st.big); $('mp-dem').setAttribute('aria-pressed', st.dem);
    $('mp-cap').innerHTML = [['2 person crew, normal day (9 h)', rate(st, 2, 0)], ['2 person crew, overtime day (12 h)', rate(st, 2, 1)], ['3 person crew, normal day', rate(st, 3, 0)]].map(function (r) { return '<li><span>' + r[0] + '</span><b>' + r1(r[1]) + '</b></li>'; }).join('');
    var rs = []; if (st.big) rs.push('large leaf: 20% fewer'); if (st.dem) rs.push('removal or demolition: 50% fewer');
    $('mp-rules').textContent = rs.length ? 'Rules applied: ' + rs.join(', ') + '. Each extra person adds 2 doors a day.' : 'No reducing rule applies. Each extra person adds 2 doors a day.';
  }
  // Orders are planned in order. Each team day has a budget of 1; a door uses 1 / rate of it. Orders may split over days.
  function schedule(orders, from) {
    var out = [], left = orders.map(function (o) { return o.qty; }), oi = 0;
    for (var d = from; d < days.length; d++) for (var t = 0; t < teams.length; t++) {
      var budget = 1;
      while (oi < orders.length) {
        var o = orders[oi], cost = 1 / rate(o, teams[t][1], 0), n = Math.min(left[oi], Math.floor((budget + 1e-9) / cost));
        if (n > 0) { out.push({ d: d, t: t, o: o, n: n, share: Math.round(n * cost * 100) }); left[oi] -= n; budget -= n * cost; }
        if (left[oi] === 0) { oi++; continue; }
        break;
      }
    }
    return { cards: out, left: orders.map(function (o, i) { return { o: o, n: left[i] }; }).filter(function (x) { return x.n > 0; }) };
  }
  function board(res, done) {
    var h = '<div class="mp-row mp-head"><span></span>' + days.map(function (d) { return '<span>' + d + '</span>'; }).join('') + '</div>';
    teams.forEach(function (tm, t) {
      h += '<div class="mp-row"><span class="mp-team">' + tm[0] + '<small>' + tm[1] + ' people</small></span>' + days.map(function (_, d) {
        var cs = (done || []).concat(res.cards).filter(function (c) { return c.d === d && c.t === t; });
        return '<div class="mp-cell"><span class="sr">' + tm[0] + ', ' + days[d] + ': </span>' + (cs.length ? cs.map(function (c) { return '<div class="mp-card' + (c.o.code === 'S-103' ? ' mine' : '') + (c.inst ? ' inst' : '') + '"><b>' + c.o.code + '</b>' + c.n + (c.n === 1 ? ' door' : ' doors') + '<small>' + (c.inst ? 'installed' : c.share + '% of day') + '</small></div>'; }).join('') : '<span class="mp-free">free</span>') + '</div>';
      }).join('') + '</div>';
    });
    return h;
  }
  function unplaced(res) {
    return res.left.length ? '<div class="note-box"><b>Orders that could not be placed this week</b><br>' + res.left.map(function (x) { return x.o.code + ': ' + x.n + ' doors, not enough capacity'; }).join('<br>') + '</div>' : '';
  }
  function orders() {
    return [{ code: 'S-101', type: 'fs', qty: 12, big: false, dem: false }, { code: 'S-102', type: 'hd', qty: 8, big: false, dem: true }, { code: 'S-103', type: st.type, qty: +$('mp-qty').value, big: st.big, dem: st.dem }];
  }
  root.addEventListener('click', function (e) { var b = e.target.closest('[data-t]'); if (b) { st.type = b.getAttribute('data-t'); aside(); } });
  $('mp-big').addEventListener('click', function () { st.big = !st.big; aside(); });
  $('mp-dem').addEventListener('click', function () { st.dem = !st.dem; aside(); });
  $('mp-gen').addEventListener('click', function () {
    var q = +$('mp-qty').value;
    if (!(q >= 1 && q <= 40)) { $('mp-err').textContent = 'Enter a quantity from 1 to 40.'; return; }
    $('mp-err').textContent = '';
    plan = orders(); var res = schedule(plan, 0);
    $('mp-board').innerHTML = board(res); $('mp-un').innerHTML = unplaced(res);
    mine = res.cards.filter(function (c) { return c.d === 0; })[0];
    $('mp-rec-what').innerHTML = 'On Monday, <b>' + teams[mine.t][0] + '</b> was planned to install <b>' + mine.n + ' doors</b> for order <b>' + mine.o.code + '</b>.';
    $('mp-done').value = Math.max(0, mine.n - 2); $('mp-done').max = mine.n;
    $('mp-res').innerHTML = '<p class="demo-empty">Enter how many doors the team installed on Monday. Any doors left are planned again.</p>';
    ui.enable(1); ui.show(1);
  });
  $('mp-next').addEventListener('click', function () { ui.enable(2); ui.show(2); });
  $('mp-save').addEventListener('click', function () {
    var n = parseInt($('mp-done').value, 10);
    if (!(n >= 0 && n <= mine.n)) { $('mp-rerr').textContent = 'Enter a number from 0 to ' + mine.n + '.'; return; }
    $('mp-rerr').textContent = '';
    // Monday is recorded: every other Monday card is taken as installed in full; the rest is planned from Tuesday.
    var first = schedule(plan, 0), mon = first.cards.filter(function (c) { return c.d === 0; });
    var rest = plan.map(function (o) { var used = mon.filter(function (c) { return c.o === o; }).reduce(function (s, c) { return s + c.n; }, 0); if (o === mine.o) used = used - mine.n + n; return { code: o.code, type: o.type, qty: o.qty - used, big: o.big, dem: o.dem }; }).filter(function (o) { return o.qty > 0; });
    var done = mon.map(function (c) { return { d: 0, t: c.t, o: c.o, n: c === mon[0] ? n : c.n, inst: true }; }).filter(function (c) { return c.n > 0; });
    var res = schedule(rest, 1), back = mine.n - n;
    $('mp-res').innerHTML = '<p><b>' + n + ' installed.</b> ' + (back ? back + (back === 1 ? ' door goes' : ' doors go') + ' back into the plan from Tuesday.' : 'Nothing left over from Monday.') + '</p><div class="mp-board mp-small">' + board(res, done) + '</div>' + unplaced(res);
  });
  $('mp-again').addEventListener('click', function () { st = { type: 'fs', big: false, dem: false }; $('mp-qty').value = 10; aside(); ui.reset(); });
  aside();
})();
`;

const css = `
.px-bar { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) auto; gap: 14px; align-items: end; }
.px-bar .demo-q { margin-bottom: 8px; }
.px-chk { display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--navy); font-size: 15px; margin-bottom: 18px; }
.px-chk input { width: 18px; height: 18px; accent-color: var(--blue); }
.px-leads { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.px-lead { display: grid; grid-template-columns: 64px minmax(0, 1fr) 170px; gap: 14px; align-items: center; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; font-size: 14px; }
.px-score { text-align: center; }
.px-score b { display: block; font-size: 22px; line-height: 1.2; border-radius: 10px; padding: 4px 0; }
.px-score.hi b { background: #e6f5ec; color: #1d6b3a; }
.px-score.mid b { background: #fff4e0; color: #8a4b00; }
.px-score.lo b { background: #f1f2f4; color: var(--muted); }
.px-star { border: 0; background: none; font: inherit; font-size: 20px; color: #8a4b00; cursor: pointer; padding: 2px 8px; }
.px-co b { color: var(--navy); font-size: 15px; }
.px-co small { display: block; color: var(--muted); }
.px-ct { margin-top: 8px; }
.px-ct .demo-opt { padding: 6px 12px; font-size: 13px; }
.px-st { padding: 8px 10px; font-size: 14px; }
.mp-board { display: grid; gap: 8px; min-width: 0; position: relative; }
#mp-demo .demo-grid > * { min-width: 0; }
.mp-row { display: grid; grid-template-columns: 96px repeat(5, minmax(0, 1fr)); gap: 8px; }
.mp-head span { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); text-align: center; }
.mp-team { font-weight: 700; color: var(--navy); font-size: 14px; align-self: center; }
.mp-team small { display: block; font-weight: 400; color: var(--muted); font-size: 12px; }
.mp-cell { background: var(--bg); border: 1px dashed var(--line); border-radius: 10px; padding: 6px; min-height: 64px; display: grid; gap: 6px; align-content: start; }
.mp-card { background: #fff; border: 1px solid var(--line); border-left: 4px solid var(--muted); border-radius: 8px; padding: 6px 8px; font-size: 13px; color: var(--navy); line-height: 1.35; }
.mp-card b { display: block; }
.mp-card small { display: block; color: var(--muted); font-size: 12px; }
.mp-card.mine { border-left-color: var(--blue); background: var(--blue-soft); }
.mp-card.inst { border-left-color: #1d6b3a; opacity: 0.75; }
.mp-free { font-size: 12px; color: var(--muted); text-align: center; padding-top: 16px; }
.mp-small .mp-row { grid-template-columns: 70px repeat(5, minmax(0, 1fr)); gap: 4px; }
.mp-small .mp-card { padding: 4px 5px; font-size: 12px; }
@media (max-width: 860px) {
  .px-bar { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .px-lead { grid-template-columns: 56px minmax(0, 1fr); }
  .px-lead > div:last-child { grid-column: 1 / -1; }
  .mp-board { overflow-x: auto; }
  .mp-row, .mp-small .mp-row { grid-template-columns: 70px repeat(5, minmax(84px, 1fr)); min-width: 520px; }
}
`;

export const dimakDemos = { prospector: { html: prospectorHtml, js: prospectorJs }, montaj: { html: montajHtml, js: montajJs }, css };
