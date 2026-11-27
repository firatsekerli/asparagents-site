// Prototypes of the two web apps on the Dimak Kapı reference page (Firat 27.11.2026: publish the tools section; no
// screenshots exist, so build the demos from the repos). Every label, rule and number comes from the app code:
// Prospector (repo firatsekerli/dimak-prospector: CLAUDE.md, lib/config.ts, lib/score.ts, lib/website.ts, app/guide)
// and Montaj Programı (repo firatsekerli/montaj-programi: supabase/migrations/0003_seed_dimak.sql, docs/domain-model.md,
// messages/tr.json, the planning guide). Montaj Programı runs in Turkish; its labels are translated here. Company
// names, orders and teams are sample data. Both demos run only in the browser and send nothing.
import { demoShell } from './common.mjs';

const BADGE = 'Demo built from the app’s code, with sample data. Not a screenshot. Nothing is sent.';

// Prospector ------------------------------------------------------------------------------------------------------
const prospectorHtml = demoShell(
  'pr-demo',
  ['Find Companies', 'Leads', 'Work a Lead'],
  [
    `<div class="demo-grid">
      <div>
        <fieldset class="demo-q"><legend>Cities</legend><div class="demo-opts" id="pr-cities"></div><p class="demo-hint">All cities are on by default. Each city is one search, and the results are merged.</p></fieldset>
        <div class="demo-q"><label for="pr-kw">What to search for</label><input class="demo-in" id="pr-kw" list="pr-terms" value="fire door supplier" autocomplete="off"><datalist id="pr-terms"><option value="fire door supplier"><option value="fire rated door distributor"><option value="steel door supplier"><option value="building materials trading company"><option value="fit out contractor"><option value="architecture firm"><option value="facilities management company"></datalist></div>
        <div class="demo-q"><label for="pr-seg">Tag new results as</label><select class="demo-in" id="pr-seg"><option value="">Don’t tag</option><option>Distributor / Trading</option><option>Contractor</option><option>Specifier</option><option>Facility / FM</option></select></div>
        <div class="demo-btns"><button type="button" class="btn" id="pr-go">Search</button></div>
      </div>
      <aside class="demo-preview" aria-label="Search progress">
        <h3>Search</h3>
        <p class="demo-empty" id="pr-prog" aria-live="polite">Pick the cities and a keyword, then press Search.</p>
        <div class="bar" aria-hidden="true"><i id="pr-bar" style="width:0"></i></div>
        <div class="demo-btns" style="margin-top:16px"><button type="button" class="btn" id="pr-see" disabled>See the Leads</button></div>
        <p class="demo-note">In the app, business details come live from Google and only each company’s Google ID is stored.</p>
      </aside>
    </div>`,
    `<div class="pr-tools">
      <div class="demo-q" style="margin:0"><label for="pr-fit">Good-fit keywords</label><input class="demo-in" id="pr-fit" value="fire door, steel door" autocomplete="off"></div>
      <label class="pr-check"><input type="checkbox" id="pr-sort"> Sort by score</label>
    </div>
    <p class="demo-hint">Score: 10 off-target, 55 with one signal, 100 with both (a relevant business type, and your keywords in its name or category). Star a lead you know is a strong fit.</p>
    <div class="pr-table" role="table" aria-label="Sample leads"><div role="rowgroup" id="pr-rows"></div></div>`,
    `<div class="demo-grid">
      <div>
        <div class="job"><span class="dtag ro" id="pr-cat"></span><h3 id="pr-name"></h3><ul class="kv" id="pr-kv"></ul>
          <div class="demo-btns" style="margin-top:14px"><button type="button" class="btn btn-soft" id="pr-contact">Show contact</button><button type="button" class="btn btn-soft" id="pr-analyze">Analyze</button><button type="button" class="btn btn-soft" id="pr-out">Outreach</button></div>
          <div class="note-box" id="pr-res" aria-live="polite" hidden></div>
        </div>
      </div>
      <aside class="demo-preview" aria-label="Status and notes">
        <h3>Status</h3>
        <div class="demo-opts" id="pr-stat"></div>
        <h3 style="margin-top:18px">Notes</h3>
        <div class="chat-act"><label class="sr-only" for="pr-note">Note</label><input class="demo-in" id="pr-note" placeholder="e.g. Asked for the EN 1634 certificate" autocomplete="off"><button type="button" class="btn" id="pr-add">Add</button></div>
        <ul class="docs" id="pr-notes" style="margin-top:12px"></ul>
        <div class="demo-btns" style="margin-top:16px"><button type="button" class="btn btn-soft" id="pr-back">Back to Leads</button></div>
      </aside>
    </div>`,
  ],
  'Interactive demo of Prospector, a lead finder for export sales',
  BADGE
);

const prospectorJs = `
(function () {
  var root = document.getElementById('pr-demo'); if (!root || !window.agDemo) return;
  var $ = function (id) { return document.getElementById(id); }, E = window.agEsc, ui = window.agDemo(root);
  var cities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Riyadh', 'Jeddah', 'Doha'], on = cities.slice();
  // Sample companies (invented names). Category words decide the score, as in the app.
  var pool = [
    { n: 'Sample Fire Doors Trading LLC', c: 'Door supplier', city: 'Dubai' },
    { n: 'Example Building Materials Co.', c: 'Building materials supplier', city: 'Sharjah' },
    { n: 'Demo Fit Out Contracting', c: 'Interior fit out contractor', city: 'Abu Dhabi' },
    { n: 'Specimen Steel Works', c: 'Metal fabricator', city: 'Riyadh' },
    { n: 'Placeholder General Trading', c: 'Trading company', city: 'Jeddah' },
    { n: 'Model Facility Services', c: 'Facility management company', city: 'Doha' },
    { n: 'Test Business Centre', c: 'Business centre', city: 'Dubai' },
  ];
  var hints = ${JSON.stringify(['door', 'manufacturer', 'hardware', 'building material', 'building supply', 'construction', 'contractor', 'supplier', 'wholesal', 'distribut', 'metal', 'steel', 'iron', 'alumin', 'glass', 'window', 'joinery', 'carpentry', 'timber', 'lumber', 'interior', 'fit out', 'fitout', 'architect', 'industrial', 'trading', 'home improvement', 'home goods', 'furniture', 'fire'])};
  var statuses = ['New', 'Contacted', 'Replied', 'Not a fit'], leads = [], cur = null;
  function score(l) {
    if (l.star) return 100;
    var hay = (l.c + ' ' + l.n).toLowerCase();
    var type = hints.some(function (h) { return hay.indexOf(h) > -1; });
    var toks = $('pr-fit').value.toLowerCase().split(/[^a-z0-9]+/).filter(function (t) { return t.length >= 3 && t !== 'and' && t !== 'the' && t !== 'for' && t !== 'with'; });
    var user = toks.some(function (t) { return hay.indexOf(t) > -1; });
    return 10 + (type ? 45 : 0) + (user ? 45 : 0);
  }
  function chips() { $('pr-cities').innerHTML = cities.map(function (c) { return '<button type="button" class="demo-opt" data-c="' + c + '" aria-pressed="' + (on.indexOf(c) > -1) + '">' + c + '</button>'; }).join(''); }
  $('pr-cities').addEventListener('click', function (e) { var b = e.target.closest('[data-c]'); if (!b) return; var c = b.getAttribute('data-c'), i = on.indexOf(c); if (i > -1) on.splice(i, 1); else on.push(c); chips(); $('pr-go').disabled = !on.length; });
  $('pr-go').addEventListener('click', function () {
    var list = cities.filter(function (c) { return on.indexOf(c) > -1; }), i = 0, btn = this; if (!list.length) return;
    btn.disabled = true; $('pr-see').disabled = true;
    (function step() {
      if (i < list.length) { $('pr-prog').textContent = 'Searching ' + list[i] + ' ' + (i + 1) + '/' + list.length + '…'; $('pr-bar').style.width = Math.round((i + 1) / list.length * 100) + '%'; i++; setTimeout(step, 350); return; }
      var found = pool.filter(function (p) { return list.indexOf(p.city) > -1; }), added = 0, again = 0, seg = $('pr-seg').value;
      found.forEach(function (p) { var l = leads.filter(function (x) { return x.n === p.n; })[0]; if (l) { again++; if (seg && l.tags.indexOf(seg) < 0) l.tags.push(seg); } else { added++; leads.push({ n: p.n, c: p.c, city: p.city, tags: seg ? [seg] : [], via: $('pr-kw').value.trim() || 'search', st: 'New', notes: [], star: false }); } });
      $('pr-prog').textContent = 'Added ' + added + ' new, refreshed ' + again + '.';
      btn.disabled = false; $('pr-see').disabled = !leads.length; if (leads.length) ui.enable(1); rows();
    })();
  });
  $('pr-see').addEventListener('click', function () { ui.show(1); });
  function rows() {
    var list = leads.slice(); if ($('pr-sort').checked) list.sort(function (a, b) { return score(b) - score(a); });
    $('pr-rows').innerHTML = list.map(function (l) {
      var i = leads.indexOf(l), s = score(l);
      return '<div class="pr-row" role="row"><div class="pr-score s' + (s >= 100 ? 'hi' : s >= 55 ? 'mid' : 'lo') + '" role="cell"><b>' + s + '</b><button type="button" class="pr-star" data-star="' + i + '" aria-pressed="' + l.star + '" aria-label="Mark ' + E(l.n) + ' as a strong fit">★</button></div>' +
        '<div role="cell"><b>' + E(l.n) + '</b><small>' + E(l.c) + ' · ' + E(l.city) + '</small><small>Found via: ' + E(l.via) + (l.tags.length ? ' · ' + E(l.tags.join(', ')) : '') + '</small></div>' +
        '<div role="cell"><span class="pr-pill st' + statuses.indexOf(l.st) + '">' + l.st + '</span></div>' +
        '<div role="cell"><button type="button" class="btn btn-soft pr-open" data-open="' + i + '">Open</button></div></div>';
    }).join('');
  }
  $('pr-fit').addEventListener('input', rows); $('pr-sort').addEventListener('change', rows);
  $('pr-rows').addEventListener('click', function (e) {
    var s = e.target.closest('[data-star]'); if (s) { var l = leads[+s.getAttribute('data-star')]; l.star = !l.star; rows(); return; }
    var o = e.target.closest('[data-open]'); if (o) { cur = leads[+o.getAttribute('data-open')]; lead(); ui.enable(2); ui.show(2); }
  });
  function lead() {
    $('pr-name').textContent = cur.n; $('pr-cat').textContent = cur.c; $('pr-res').hidden = true;
    $('pr-kv').innerHTML = [['City', cur.city], ['Found via', cur.via], ['Fit score', String(score(cur))], ['Phone and website', 'Load on demand']].map(function (r) { return '<li><span>' + r[0] + '</span><b>' + E(r[1]) + '</b></li>'; }).join('');
    $('pr-stat').innerHTML = statuses.map(function (s, i) { return '<button type="button" class="demo-opt" data-s="' + i + '" aria-pressed="' + (cur.st === s) + '">' + s + '</button>'; }).join('');
    $('pr-notes').innerHTML = cur.notes.length ? cur.notes.map(function (n) { return '<li><span>' + E(n.t) + '<small>' + n.at + '</small></span></li>'; }).join('') : '<li><span>No notes yet.</span></li>';
  }
  function res(h) { $('pr-res').hidden = false; $('pr-res').innerHTML = h; }
  $('pr-contact').addEventListener('click', function () { res('<b>Contact loaded.</b> In the app this is a paid Google lookup, made only for leads you pursue, and it gives WhatsApp and website links. Contact details are not stored.'); });
  $('pr-analyze').addEventListener('click', function () { res('<b>Website signals (sample):</b> business type: supplier, distributor. Certification: EN 1634. Company social profiles. The app reads the company’s own site and keeps no personal data.'); });
  $('pr-out').addEventListener('click', function () { res('<b>Draft first message (sample):</b> Hello, we manufacture certified fire doors and are looking for distribution partners in ' + E(cur.city) + '. Could we send you our catalogue? <br><small>In the app, AI writes this from the lead and your saved pitch, in the language you pick. The salesperson edits and sends it.</small>'); });
  $('pr-stat').addEventListener('click', function (e) { var b = e.target.closest('[data-s]'); if (!b) return; cur.st = statuses[+b.getAttribute('data-s')]; lead(); rows(); });
  $('pr-add').addEventListener('click', function () { var v = $('pr-note').value.trim(); if (!v) return; cur.notes.unshift({ t: v, at: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }); $('pr-note').value = ''; lead(); });
  $('pr-back').addEventListener('click', function () { ui.show(1); });
  chips();
})();
`;

// Montaj Programı -------------------------------------------------------------------------------------------------
// Door types and day rates for a 2-person crew from the Dimak seed (normal day 9 hours, overtime day 12 hours). The
// industrial door is effort-based: 4.3125 hours plus 0.1875 hours per square metre, so a 5 x 5 m door takes one day.
const montajHtml = demoShell(
  'mp-demo',
  ['Orders', 'Planning', 'Record Installs'],
  [
    `<div class="demo-grid">
      <div>
        <h3 class="mp-h">Orders</h3>
        <ul class="demo-items" id="mp-orders"></ul>
        <div class="demo-btns"><button type="button" class="btn" id="mp-gen">Generate Plan</button></div>
      </div>
      <aside class="demo-preview" aria-label="Door types and daily capacity">
        <h3>Door types (per day, 2-person crew)</h3>
        <ul class="kv" id="mp-types"></ul>
        <h3 style="margin-top:18px">Capacity rules</h3>
        <ul class="kv"><li><span>Leaf wider than 1150 mm and taller than 2400 mm</span><b>-20%</b></li><li><span>Door removal or wall demolition</span><b>-50%</b></li></ul>
        <p class="demo-note">Teams: Team A (in house, fire and industrial doors), Team B (in house, fire doors), Subcontractor (industrial doors). In-house teams are used first.</p>
      </aside>
    </div>`,
    `<p class="demo-hint" id="mp-msg" aria-live="polite"></p>
    <p class="demo-hint mp-swipe">Swipe sideways to see the whole week.</p><div class="mp-board-wrap"><div class="mp-board" id="mp-board"></div></div>
    <div id="mp-unplaced"></div>
    <div class="demo-btns" style="margin-top:16px"><button type="button" class="btn" id="mp-rec">Record Installs</button><button type="button" class="btn btn-soft" id="mp-back">Change the Orders</button></div>`,
    `<div class="demo-grid">
      <div>
        <div class="demo-q"><label for="mp-card">Card</label><select class="demo-in" id="mp-card"></select></div>
        <div class="demo-q"><label for="mp-n">Installed count</label><input class="demo-in" id="mp-n" type="number" inputmode="numeric" min="0"></div>
        <p class="demo-err" id="mp-err" aria-live="polite"></p>
        <div class="demo-btns"><button type="button" class="btn" id="mp-save">Save</button></div>
      </div>
      <aside class="demo-preview" aria-label="How installs are recorded">
        <h3>Record installs</h3>
        <p class="demo-hint">Enter the full count and the card is done. Enter part of it (for example 4 of 8) and the rest moves to the next working day for the same team, and the other jobs shift.</p>
        <p class="note-box" id="mp-done" aria-live="polite" hidden></p>
        <div class="demo-btns"><button type="button" class="btn btn-soft" id="mp-see">See the Plan</button></div>
      </aside>
    </div>`,
  ],
  'Interactive demo of Montaj Programı, an installation planner for door teams',
  'Demo built from the app’s code, with sample orders. Not a screenshot. The real app is in Turkish. Nothing is sent.'
);

const montajJs = `
(function () {
  var root = document.getElementById('mp-demo'); if (!root || !window.agDemo) return;
  var $ = function (id) { return document.getElementById(id); }, E = window.agEsc, ui = window.agDemo(root);
  var types = {
    hs: { name: 'Half/block frame single leaf fire door', fire: true, n: 9, o: 12 },
    fs: { name: 'Full frame single leaf fire door', fire: true, n: 7, o: 10 },
    hd: { name: 'Half/block frame double leaf fire door', fire: true, n: 6, o: 9 },
    fd: { name: 'Full frame double leaf fire door', fire: true, n: 5, o: 8 },
    ind: { name: 'Industrial door', fire: false, effort: [4.3125, 0.1875] }
  };
  var teams = [{ id: 'A', name: 'Team A', note: 'in house', fire: true, ind: true }, { id: 'B', name: 'Team B', note: 'in house', fire: true, ind: false }, { id: 'S', name: 'Subcontractor', note: '', fire: false, ind: true }];
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  var orders = [
    { no: 'S-101', t: 'fs', q: 8, due: 1, demo: false, big: false, ready: true },
    { no: 'S-102', t: 'hs', q: 10, due: 3, demo: false, big: false, ready: true },
    { no: 'S-103', t: 'ind', q: 3, due: 4, area: 9, demo: false, big: false, ready: true },
    { no: 'S-104', t: 'fd', q: 6, due: 4, demo: false, big: false, ready: false }
  ];
  var fixed = [], cards = [], unplaced = [];
  function cost(o) {
    var ty = types[o.t];
    if (ty.effort) return (ty.effort[0] + ty.effort[1] * o.area) / 9;
    var f = (o.big ? 0.8 : 1) * (o.demo ? 0.5 : 1);
    return 1 / (ty.n * f);
  }
  function capable(tm, o) { return types[o.t].fire ? tm.fire : tm.ind; }
  function plan() {
    var used = {}; teams.forEach(function (tm) { used[tm.id] = [0, 0, 0, 0, 0]; });
    cards = fixed.map(function (c) { used[c.team][c.day] += c.q * cost(c.o); return c; });
    unplaced = [];
    orders.slice().sort(function (a, b) { return a.due - b.due; }).forEach(function (o) {
      if (!o.ready) { unplaced.push([o, 'Outside the horizon / production date is later']); return; }
      var left = o.q - fixed.filter(function (c) { return c.o === o; }).reduce(function (s, c) { return s + c.q; }, 0);
      var opts = teams.filter(function (tm) { return capable(tm, o); });
      if (!opts.length) { unplaced.push([o, 'No capable team']); return; }
      var c = cost(o), eps = 1e-9;
      for (var d = 0; d < 5 && left > 0; d++) {
        opts.forEach(function (tm) {
          if (left <= 0) return;
          var fit = Math.floor((1 - used[tm.id][d] + eps) / c);
          var n = Math.min(left, fit); if (n <= 0) return;
          used[tm.id][d] += n * c; left -= n; cards.push({ o: o, team: tm.id, day: d, q: n, done: false, pin: false });
        });
      }
      if (left > 0) unplaced.push([o, 'Capacity not enough (cannot meet the delivery date): ' + left + ' left']);
    });
    return used;
  }
  function drawOrders() {
    $('mp-types').innerHTML = Object.keys(types).map(function (k) { var t = types[k]; return '<li><span>' + t.name + '</span><b>' + (t.effort ? '4.3125 h + 0.1875 h per m²' : t.n + ' normal, ' + t.o + ' overtime') + '</b></li>'; }).join('');
    $('mp-orders').innerHTML = orders.map(function (o, i) {
      return '<li><span><b>' + o.no + '</b>: ' + o.q + ' × ' + types[o.t].name + (o.area ? ' (3 × 3 m)' : '') + '<small>Delivery: ' + days[o.due] + (o.ready ? '' : ' · production ready next week') + '</small>' +
        (types[o.t].fire ? '<label class="pr-check"><input type="checkbox" data-i="' + i + '" data-k="demo"' + (o.demo ? ' checked' : '') + '> Door removal or wall demolition</label><label class="pr-check"><input type="checkbox" data-i="' + i + '" data-k="big"' + (o.big ? ' checked' : '') + '> Large leaf</label>' : '') + '</span></li>';
    }).join('');
  }
  $('mp-orders').addEventListener('change', function (e) { var c = e.target.closest('[data-k]'); if (!c) return; orders[+c.getAttribute('data-i')][c.getAttribute('data-k')] = c.checked; });
  function board() {
    var used = plan();
    var h = '<div class="mp-cell mp-head"></div>' + days.map(function (d) { return '<div class="mp-cell mp-head">' + d + '</div>'; }).join('');
    teams.forEach(function (tm) {
      h += '<div class="mp-cell mp-team"><b>' + tm.name + '</b>' + (tm.note ? '<small>' + tm.note + '</small>' : '') + '</div>';
      days.forEach(function (d, di) {
        var pct = Math.round(used[tm.id][di] * 100);
        h += '<div class="mp-cell"><div class="mp-fill"><span>' + pct + '%</span><div class="bar"><i style="width:' + Math.min(pct, 100) + '%"></i></div></div>' +
          cards.filter(function (c) { return c.team === tm.id && c.day === di; }).map(function (c) {
            var late = !c.done && di > c.o.due;
            return '<div class="mp-card' + (c.done ? ' done' : '') + '"><b>' + c.o.no + (c.pin && !c.done ? ' <span aria-label="pinned">📌</span>' : '') + '</b><span>' + c.q + ' × ' + types[c.o.t].name + '</span><small>' + Math.round(c.q * cost(c.o) * 100) + '% day' + (c.done ? ' · installed' : '') + '</small>' + (late ? '<span class="dtag em">Late</span>' : '') + '</div>';
          }).join('') + '</div>';
      });
    });
    $('mp-board').innerHTML = h;
    $('mp-unplaced').innerHTML = unplaced.length ? '<div class="note-box"><b>Orders that could not be planned</b>' + unplaced.map(function (u) { return '<br>' + u[0].no + ': ' + E(u[1]); }).join('') + '</div>' : '';
    $('mp-card').innerHTML = cards.filter(function (c) { return !c.done; }).map(function (c) { return '<option value="' + cards.indexOf(c) + '">' + c.o.no + ', ' + teams.filter(function (t) { return t.id === c.team; })[0].name + ', ' + days[c.day] + ': ' + c.q + ' doors</option>'; }).join('');
  }
  $('mp-gen').addEventListener('click', function () { fixed = []; board(); $('mp-msg').textContent = 'Plan generated for the sample week. Cards show the order, the doors and the share of the team’s day.'; ui.enable(1); ui.enable(2); ui.show(1); });
  $('mp-rec').addEventListener('click', function () { $('mp-done').hidden = true; $('mp-err').textContent = ''; ui.show(2); });
  $('mp-back').addEventListener('click', function () { ui.show(0); });
  $('mp-see').addEventListener('click', function () { ui.show(1); });
  $('mp-save').addEventListener('click', function () {
    var c = cards[+$('mp-card').value], n = parseInt($('mp-n').value, 10);
    if (!c) return;
    if (!(n >= 1 && n <= c.q)) { $('mp-err').textContent = 'Enter a count from 1 to ' + c.q + '.'; return; }
    $('mp-err').textContent = '';
    fixed = fixed.filter(function (f) { return f !== c; });
    fixed.push({ o: c.o, team: c.team, day: c.day, q: n, done: true, pin: true });
    var msg = c.o.no + ': ' + n + ' installed on ' + days[c.day] + '.';
    if (n < c.q) {
      var nd = c.day + 1;
      if (nd < 5) { fixed.push({ o: c.o, team: c.team, day: nd, q: c.q - n, done: false, pin: true }); msg += ' The other ' + (c.q - n) + ' moved to ' + days[nd] + ' for the same team.'; }
      else msg += ' The other ' + (c.q - n) + ' go to next week.';
    }
    board(); $('mp-n').value = ''; $('mp-done').hidden = false; $('mp-done').textContent = msg;
  });
  drawOrders();
})();
`;

const css = `
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.pr-tools { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-end; margin-bottom: 8px; }
.pr-tools .demo-q { flex: 1 1 260px; }
.pr-check { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--navy); margin-top: 6px; }
.pr-table { display: grid; gap: 8px; margin-top: 12px; }
.pr-row { display: grid; grid-template-columns: 64px minmax(0, 1fr) auto auto; gap: 12px; align-items: center; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; font-size: 14px; }
.pr-row small { display: block; color: var(--muted); }
.pr-score { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.pr-score b { font-size: 20px; color: var(--navy); }
.pr-score.slo b { color: var(--muted); }
.pr-star { border: 0; background: none; font-size: 18px; line-height: 1; color: var(--line); cursor: pointer; padding: 2px; }
.pr-star[aria-pressed="true"] { color: #b26a00; }
.pr-pill { display: inline-block; font-size: 12px; font-weight: 700; border-radius: 999px; padding: 4px 10px; color: #fff; }
.pr-pill.st0 { background: #5b636e; } .pr-pill.st1 { background: #8a5a00; } .pr-pill.st2 { background: #1d6b3a; } .pr-pill.st3 { background: #9a3a30; }
.pr-open { padding: 8px 14px; font-size: 14px; }
.mp-h { font-size: 18px; margin: 0 0 12px; }
.mp-swipe { display: none; }
@media (max-width: 860px) { .mp-swipe { display: block; } }
.mp-board-wrap { overflow-x: auto; }
.mp-board { display: grid; grid-template-columns: 120px repeat(5, minmax(130px, 1fr)); gap: 6px; min-width: 780px; }
.mp-cell { background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 8px; font-size: 13px; display: grid; gap: 6px; align-content: start; }
.mp-head { background: none; border: 0; font-weight: 700; color: var(--navy); text-align: center; padding: 4px; }
.mp-team small { display: block; color: var(--muted); }
.mp-fill span { font-size: 12px; font-weight: 700; color: var(--navy); }
.mp-fill .bar { margin: 2px 0 0; height: 6px; }
.mp-card { background: var(--blue-soft); border-radius: 8px; padding: 6px 8px; display: grid; gap: 2px; }
.mp-card b { color: var(--navy); }
.mp-card small { color: var(--muted); }
.mp-card.done { background: #e6f5ec; }
.mp-card .dtag { justify-self: start; }
@media (max-width: 860px) { .pr-row { grid-template-columns: 56px minmax(0, 1fr) auto; } .pr-row > div:nth-child(1) { grid-row: span 2; } .pr-row > div:nth-child(2) { grid-column: 2 / 4; } }
`;

export const dimakDemos = { prospector: { html: prospectorHtml, js: prospectorJs }, montaj: { html: montajHtml, js: montajJs }, css };
