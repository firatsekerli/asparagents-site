// Prototypes of the tools on the Cristal Windows reference page (Firat 22.11.2026: prototypes on our site instead of
// links to the client's site). They run only in the browser with sample data and send nothing. The quotation form
// uses the window and door demo (windows.mjs); the survey app and the conservation area checker are below.
import { demoShell } from './common.mjs';

const surveyHtml = demoShell(
  'sv-demo',
  ['Job', 'Openings', 'Office'],
  [
    `<div class="demo-grid">
      <div>
        <div class="demo-q"><label for="sv-name">Customer name <span class="req">*</span></label><input class="demo-in" id="sv-name" placeholder="e.g. Mr and Mrs J. Thompson" autocomplete="off"></div>
        <div class="demo-q"><div class="demo-row">
          <div><label for="sv-pc">Postcode <span class="req">*</span></label><input class="demo-in" id="sv-pc" placeholder="e.g. AB1 2CD" autocomplete="off"></div>
          <div><label for="sv-date">Survey date <span class="req">*</span></label><input class="demo-in" id="sv-date" type="date"></div>
        </div></div>
        <fieldset class="demo-q"><legend>Property photo <span class="req">*</span></legend><div class="demo-opts"><button type="button" class="demo-opt" id="sv-photo" aria-pressed="false">Add photo</button></div><p class="demo-hint">In the app this opens the camera.</p></fieldset>
        <fieldset class="demo-q"><legend>Parking <span class="req">*</span></legend><div class="demo-opts" data-k="park"></div></fieldset>
      </div>
      <aside class="demo-preview" aria-label="Survey status">
        <h3>Before this survey can be sent</h3>
        <ul class="docs" id="sv-left" aria-live="polite"></ul>
        <div class="demo-btns" style="margin-top:16px"><button type="button" class="btn" id="sv-next" disabled>Add Openings</button></div>
        <p class="demo-note">Drafts stay on the surveyor's phone until the survey is sent.</p>
      </aside>
    </div>`,
    `<div class="demo-grid">
      <div>
        <fieldset class="demo-q"><legend>Room</legend><div class="demo-opts" data-k="room"></div></fieldset>
        <fieldset class="demo-q"><legend>Position</legend><div class="demo-opts" data-k="pos"></div></fieldset>
        <fieldset class="demo-q"><legend>Opening</legend><div class="demo-opts" data-k="kind"></div></fieldset>
        <div class="demo-q" id="sv-sizes"><div class="demo-row">
          <div><label for="sv-w">Width (mm) <span class="req">*</span></label><input class="demo-in" id="sv-w" type="number" inputmode="numeric" placeholder="e.g. 1200"></div>
          <div><label for="sv-h">Height (mm) <span class="req">*</span></label><input class="demo-in" id="sv-h" type="number" inputmode="numeric" placeholder="e.g. 1100"></div>
        </div></div>
        <div id="sv-bay" hidden>
          <fieldset class="demo-q"><legend>Bay shape, seen from inside the room</legend><div class="sv-shapes" data-k="shape"></div></fieldset>
          <div class="demo-q"><p class="demo-hint" style="margin:0 0 8px">Angles are measured on site, so they are never filled in for the surveyor.</p><div class="sv-angles" id="sv-angles"></div></div>
        </div>
        <p class="demo-err" id="sv-err" aria-live="polite"></p>
        <div class="demo-btns"><button type="button" class="btn" id="sv-add">Add Opening</button></div>
      </div>
      <aside class="demo-preview" aria-label="Openings on this survey">
        <h3>Openings</h3>
        <p class="demo-empty" id="sv-none">No openings yet. Every window and door being replaced needs its own record.</p>
        <ul class="demo-items" id="sv-items" aria-live="polite"></ul>
        <div class="demo-btns"><button type="button" class="btn" id="sv-send" disabled>Send Survey</button></div>
      </aside>
    </div>`,
    `<div class="demo-inbox"><span aria-hidden="true">1</span><span><b>Survey received</b><span id="sv-from"></span></span></div>
    <div class="job-grid">
      <div class="job"><span class="dtag ro">Survey report</span><h3 id="sv-cust"></h3><ul class="kv" id="sv-kv"></ul></div>
      <div class="job"><span class="dtag ok" id="sv-stat">Submitted</span><h3>Job status</h3><p class="demo-hint" style="margin:0 0 12px">The office moves each job along as it happens.</p><div class="demo-opts" id="sv-flow"></div><div class="note-box">An email with the survey PDF went to the sales office.</div></div>
    </div>
    <div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="sv-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
  ],
  'Interactive demo of a survey app for window and door surveyors'
);

const surveyJs = `
(function () {
  var root = document.getElementById('sv-demo'); if (!root || !window.agDemo) return;
  var $ = function (id) { return document.getElementById(id); }, E = window.agEsc, ui = window.agDemo(root);
  var data = { park: ['Driveway', 'On street', 'Permit'], room: ['Lounge', 'Kitchen', 'Bedroom 1', 'Hall', 'Bathroom'], pos: ['front', 'rear', 'side'], kind: ['Window', 'Door', 'Bay window'], shape: ['2', '3', '4', '5'] };
  var st = { park: '', room: 'Lounge', pos: 'front', kind: 'Window', shape: '3', photo: false }, list = [], status = 0;
  var flow = ['Submitted', 'Ordered', 'Installed'];
  function bay(n) {
    var W = 120, H = 60, pts = [], i;
    for (i = 0; i <= n; i++) { var a = Math.PI - Math.PI * i / n; pts.push([60 + 52 * Math.cos(a), 54 - 40 * Math.sin(a) * (i === 0 || i === n ? 0 : 1)]); }
    pts[0][1] = 56; pts[n][1] = 56;
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><polyline points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '" fill="none" stroke="#060b23" stroke-width="3" stroke-linejoin="round"/>' + pts.slice(1, -1).map(function (p) { return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3" fill="#2d4ddb"/>'; }).join('') + '</svg>';
  }
  function opts(k) {
    var box = root.querySelector('[data-k="' + k + '"]');
    box.innerHTML = data[k].map(function (v) { return '<button type="button" class="demo-opt' + (k === 'shape' ? ' sv-shape' : '') + '" data-v="' + v + '" aria-pressed="' + (st[k] === v) + '">' + (k === 'shape' ? bay(+v) + v + ' segments' : v) + '</button>'; }).join('');
  }
  function left() {
    var miss = [];
    if (!$('sv-name').value.trim()) miss.push('Customer name');
    if (!/^[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}$/.test($('sv-pc').value.trim())) miss.push('A full postcode');
    if (!$('sv-date').value) miss.push('Survey date');
    if (!st.photo) miss.push('Property photo');
    if (!st.park) miss.push('Parking');
    $('sv-left').innerHTML = miss.length ? miss.map(function (m) { return '<li><span>' + m + '</span><span class="dtag ur">To answer</span></li>'; }).join('') : '<li class="done"><span>Job details complete</span><span class="dtag ok">Done</span></li>';
    $('sv-next').disabled = miss.length > 0; return miss.length === 0;
  }
  function angles() {
    var n = +st.shape - 1, have = [].slice.call($('sv-angles').querySelectorAll('input')).map(function (i) { return i.value; });
    $('sv-angles').innerHTML = Array.apply(null, Array(n)).map(function (_, i) { return '<label>A' + (i + 1) + '<input class="demo-in" type="number" inputmode="numeric" placeholder="90 to 180" value="' + (have[i] || '') + '"></label>'; }).join('');
  }
  function draw() { ['park', 'room', 'pos', 'kind', 'shape'].forEach(opts); var isBay = st.kind === 'Bay window'; $('sv-bay').hidden = !isBay; if (isBay) angles(); left(); }
  function items() {
    $('sv-none').hidden = list.length > 0; $('sv-send').disabled = !list.length;
    $('sv-items').innerHTML = list.map(function (o, i) { return '<li><span>' + (i + 1) + '. ' + E(o.title) + '<small>' + E(o.sub) + '</small></span><button type="button" class="demo-x" data-i="' + i + '" aria-label="Remove opening ' + (i + 1) + '">Remove</button></li>'; }).join('');
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.demo-opt[data-v]'); if (b) { var k = b.parentNode.getAttribute('data-k'); if (k) { st[k] = b.getAttribute('data-v'); draw(); } return; }
    var x = e.target.closest('.demo-x'); if (x) { list.splice(+x.getAttribute('data-i'), 1); items(); }
  });
  $('sv-photo').addEventListener('click', function () { st.photo = !st.photo; this.setAttribute('aria-pressed', st.photo); this.textContent = st.photo ? 'Photo added' : 'Add photo'; left(); });
  ['sv-name', 'sv-pc', 'sv-date'].forEach(function (id) { $(id).addEventListener('input', left); });
  $('sv-next').addEventListener('click', function () { if (!left()) return; ui.enable(1); ui.show(1); });
  $('sv-add').addEventListener('click', function () {
    var where = st.room + ' ' + st.pos, err = '';
    if (st.kind === 'Bay window') {
      var a = [].slice.call($('sv-angles').querySelectorAll('input')).map(function (i) { return parseInt(i.value, 10); });
      if (a.some(function (v) { return !(v >= 90 && v <= 180); })) err = 'Enter every angle, from 90 to 180 degrees.';
      else list.push({ title: where + ', bay window', sub: st.shape + ' segments, angles ' + a.join(', ') });
    } else {
      var w = parseInt($('sv-w').value, 10), h = parseInt($('sv-h').value, 10);
      if (!(w >= 300 && w <= 4000 && h >= 300 && h <= 3000)) err = 'Enter a width from 300 to 4000 mm and a height from 300 to 3000 mm.';
      else { list.push({ title: where + ', ' + st.kind.toLowerCase(), sub: w + ' x ' + h + ' mm' }); $('sv-w').value = ''; $('sv-h').value = ''; }
    }
    $('sv-err').textContent = err; if (!err) { items(); if (st.kind === 'Bay window') angles(); }
  });
  function report() {
    $('sv-stat').textContent = flow[status];
    $('sv-flow').innerHTML = flow.map(function (f, i) { return '<button type="button" class="demo-opt" data-s="' + i + '" aria-pressed="' + (i === status) + '"' + (i > status + 1 ? ' disabled' : '') + '>' + f + '</button>'; }).join('');
  }
  $('sv-flow').addEventListener('click', function (e) { var b = e.target.closest('[data-s]'); if (!b || b.disabled) return; status = +b.getAttribute('data-s'); report(); });
  $('sv-send').addEventListener('click', function () {
    if (!list.length) return; status = 0;
    $('sv-from').textContent = list.length + (list.length === 1 ? ' opening' : ' openings') + ', sent just now';
    $('sv-cust').textContent = $('sv-name').value.trim();
    var d = new Date($('sv-date').value);
    $('sv-kv').innerHTML = [['Postcode', $('sv-pc').value.trim().toUpperCase()], ['Survey date', isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })], ['Parking', st.park], ['Photos', '1']].concat(list.map(function (o, i) { return ['Opening ' + (i + 1), o.title.split(', ').pop() + ', ' + o.sub]; })).map(function (r) { return '<li><span>' + r[0] + '</span><b>' + E(r[1]) + '</b></li>'; }).join('');
    report(); ui.enable(2); ui.show(2);
  });
  $('sv-again').addEventListener('click', function () { list = []; st.photo = false; st.park = ''; $('sv-photo').setAttribute('aria-pressed', 'false'); $('sv-photo').textContent = 'Add photo'; ['sv-name', 'sv-pc', 'sv-date', 'sv-w', 'sv-h'].forEach(function (id) { $(id).value = ''; }); items(); draw(); ui.reset(); });
  draw(); items();
})();
`;

// The checker uses sample addresses: the real plugin finds the postcode with postcodes.io and checks it against the
// conservation area and Article 4 Direction datasets of planning.data.gov.uk.
const checkerHtml = `
<div class="demo" id="ck-demo" aria-label="Interactive demo of a conservation area checker">
  <div class="demo-top"><span class="demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="demo-badge">Demo with sample addresses. Nothing is sent.</span></div>
  <div class="demo-panel">
    <div class="ck-box">
      <h3>Conservation Area Checker</h3>
      <p class="demo-hint" style="margin:0 0 16px">Visitors type their postcode. In this demo, pick a sample address.</p>
      <div class="demo-opts" id="ck-opts" role="group" aria-label="Sample addresses"></div>
      <div class="ck-result" id="ck-res" aria-live="polite" hidden></div>
    </div>
  </div>
</div>`;

const checkerJs = `
(function () {
  var root = document.getElementById('ck-demo'); if (!root) return;
  var opts = document.getElementById('ck-opts'), res = document.getElementById('ck-res');
  var samples = [
    ['Old town centre street', 'warn', ['This postcode appears to be within a conservation area. Replacement windows and doors may need to match the existing style and material.', 'This area may also be subject to an Article 4 Direction, so planning permission can be needed for windows or doors facing the road.'], 'Book a Free Survey'],
    ['Modern housing estate', 'ok', ['This postcode does not appear to be within a conservation area or an Article 4 Direction area. Standard permitted development rules are likely to apply.'], 'Book a Free Survey'],
    ['Village outside the area', 'out', ['This postcode is outside the usual service area. Get in touch and the team will check whether they can reach you.'], 'Contact Us'],
  ], cur = -1;
  function draw() {
    opts.innerHTML = samples.map(function (s, i) { return '<button type="button" class="demo-opt" data-i="' + i + '" aria-pressed="' + (i === cur) + '">' + s[0] + '</button>'; }).join('');
    if (cur < 0) { res.hidden = true; return; }
    var s = samples[cur]; res.hidden = false; res.className = 'ck-result ck-' + s[1];
    res.innerHTML = s[2].map(function (p) { return '<p>' + p + '</p>'; }).join('') + '<p class="demo-hint">This check is for guidance only. The homeowner confirms planning requirements with the local planning authority.</p><div class="demo-btns"><button type="button" class="btn" id="ck-cta">' + s[3] + '</button></div><p class="demo-hint" id="ck-cta-note" hidden>On the real site this opens the booking form.</p>';
  }
  opts.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (!b) return; cur = +b.getAttribute('data-i'); draw(); });
  res.addEventListener('click', function (e) { if (e.target.id === 'ck-cta') document.getElementById('ck-cta-note').hidden = false; });
  draw();
})();
`;

const css = `
.req { color: var(--red-text); }
.sv-shapes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.sv-shape { flex-direction: column; justify-content: center; padding: 10px 8px; font-size: 13px; }
.demo-opt.sv-shape svg { width: 100%; max-width: 120px; height: 56px; }
.sv-angles { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; }
.sv-angles label { display: block; font-weight: 700; color: var(--navy); font-size: 14px; }
.sv-angles .demo-in { margin-top: 4px; }
.demo-opt:disabled { opacity: 0.45; cursor: not-allowed; }
.ck-box { max-width: 640px; margin: 0 auto; text-align: center; }
.ck-box h3 { font-size: 22px; margin: 0 0 8px; }
.ck-box .demo-opts { justify-content: center; }
.ck-result { text-align: left; margin-top: 20px; background: var(--bg); border-left: 4px solid var(--blue); border-radius: 10px; padding: 16px 18px; font-size: 15px; }
.ck-result p { margin: 0 0 10px; }
.ck-warn { border-left-color: var(--red); }
.ck-ok { border-left-color: #1d6b3a; }
.ck-out { border-left-color: #8a4b00; }
`;

export const cristalDemos = { survey: { html: surveyHtml, js: surveyJs }, checker: { html: checkerHtml, js: checkerJs }, css };
