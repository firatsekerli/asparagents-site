import { demoShell } from './common.mjs';

// Builders demo: the visitor describes the project, adds photos and sees a rough price range at once; the office
// receives the lead with the follow-up questions already prepared. Sample rates only.

const opt = (k, list) => `<div class="demo-opts" data-k="${k}">${list.map(([v, t], i) => `<button type="button" class="demo-opt" data-v="${v}" aria-pressed="${i === 0}">${t}</button>`).join('')}</div>`;

const html = demoShell(
  'bd-demo',
  ['Customer', 'Office', 'Email'],
  [
    `<div class="demo-grid"><div>
      <fieldset class="demo-q"><legend>What is the project?</legend>${opt('type', [['kitchen', 'Kitchen'], ['bath', 'Bathroom'], ['ext', 'Extension'], ['loft', 'Loft Conversion']])}</fieldset>
      <div class="demo-q"><label for="bd-size">Approximate size (m²)</label><input class="demo-in" id="bd-size" type="number" inputmode="numeric" min="3" max="80" value="14"><p class="demo-err" id="bd-err" aria-live="polite"></p></div>
      <fieldset class="demo-q"><legend>Finish</legend>${opt('finish', [['std', 'Standard'], ['mid', 'Mid Range'], ['high', 'High End']])}</fieldset>
      <fieldset class="demo-q"><legend>Also needed</legend><div class="demo-opts" data-k="extra">
        <button type="button" class="demo-opt" data-x="elec" aria-pressed="false">New Electrics</button><button type="button" class="demo-opt" data-x="ufh" aria-pressed="false">Underfloor Heating</button><button type="button" class="demo-opt" data-x="win" aria-pressed="false">New Windows</button></div></fieldset>
      <fieldset class="demo-q"><legend>Photos of the space</legend><div class="thumbs" id="bd-photos"></div><div class="demo-btns" style="margin-top:10px"><button type="button" class="btn btn-soft" id="bd-photo">Add a Sample Photo</button></div></fieldset>
    </div>
    <aside class="demo-preview" aria-label="Your estimate"><h3>Rough Price Range</h3><p class="est" id="bd-est" aria-live="polite"></p><p class="demo-hint">Worked out from your own rates as the customer answers. The final price follows your site visit.</p><ul class="demo-spec" id="bd-spec" style="margin-top:14px"></ul>
      <div class="demo-q" style="margin:0 0 12px"><label for="bd-name">Your name</label><input class="demo-in" id="bd-name" value="James Carter"></div>
      <div class="demo-btns"><button type="button" class="btn" id="bd-send">Book a Site Visit</button></div></aside></div>`,
    `<div class="job" id="bd-job"></div>`,
    `<div id="bd-mail"></div><div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="bd-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
  ],
  'Interactive demo of a project estimate tool for builders'
);

const js = `
(function () {
  var root = document.getElementById('bd-demo'); if (!root) return;
  var T = window.agDemo(root), esc = window.agEsc, gbp = window.agGbp, $ = function (id) { return document.getElementById(id); };
  var names = { kitchen: 'Kitchen', bath: 'Bathroom', ext: 'Extension', loft: 'Loft Conversion' }, fin = { std: 'Standard', mid: 'Mid Range', high: 'High End' };
  var rate = { kitchen: [900, 1400], bath: [1100, 1700], ext: [1800, 2600], loft: [1500, 2200] }, fF = { std: 1, mid: 1.3, high: 1.75 }, xP = { elec: 2500, ufh: 1800, win: 3200 }, xN = { elec: 'New electrics', ufh: 'Underfloor heating', win: 'New windows' };
  var qs = {
    kitchen: ['Are you keeping the current layout, or moving the sink and appliances?', 'Who supplies the units and worktops?', 'Does any wall need to come down?'],
    bath: ['Are you changing the bath for a walk-in shower?', 'Is the bathroom upstairs or downstairs?', 'Who supplies the tiles and sanitaryware?'],
    ext: ['Do you have planning permission, or is it permitted development?', 'Is there side access for machinery and skips?', 'Do you have drawings from an architect?'],
    loft: ['What is the head height at the highest point of the loft today?', 'Do you want a dormer or roof windows?', 'Is a party wall agreement needed with the neighbours?']
  };
  var st = { type: 'kitchen', finish: 'std' }, extra = {}, photos = 0;
  var size = function () { return parseInt($('bd-size').value, 10) || 0; };
  var ok = function () { var s = size(); return s >= 3 && s <= 80; };
  function range() {
    var s = size(), r = rate[st.type], f = fF[st.finish], x = Object.keys(extra).filter(function (k) { return extra[k]; }).reduce(function (t, k) { return t + xP[k]; }, 0);
    var r5 = function (n) { return Math.round(n / 500) * 500; };
    return [r5(s * r[0] * f + x), r5(s * r[1] * f + x)];
  }
  function draw() {
    [].forEach.call(root.querySelectorAll('[data-k]'), function (g) { var k = g.getAttribute('data-k'); if (k === 'extra') return; [].forEach.call(g.children, function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === st[k]); }); });
    $('bd-err').textContent = ok() ? '' : 'Please enter a size from 3 to 80 m².';
    var r = range(); $('bd-est').textContent = ok() ? gbp(r[0]) + ' to ' + gbp(r[1]) : '...';
    var ex = Object.keys(extra).filter(function (k) { return extra[k]; }).map(function (k) { return xN[k]; });
    $('bd-spec').innerHTML = [['Project', names[st.type]], ['Size', size() + ' m²'], ['Finish', fin[st.finish]], ['Also needed', ex.length ? ex.join(', ') : 'Nothing extra'], ['Photos', photos ? photos + ' added' : 'None yet']].map(function (x) { return '<li><span>' + x[0] + '</span><b>' + esc(x[1]) + '</b></li>'; }).join('');
    $('bd-photos').innerHTML = Array.apply(null, Array(photos)).map(function (_, i) { return '<span class="thumb">Photo ' + (i + 1) + '</span>'; }).join('');
    $('bd-send').disabled = !ok();
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.demo-opt'); if (!b || !root.contains(b)) return;
    if (b.hasAttribute('data-x')) { var x = b.getAttribute('data-x'); extra[x] = !extra[x]; b.setAttribute('aria-pressed', !!extra[x]); }
    else if (b.parentNode.getAttribute('data-k')) st[b.parentNode.getAttribute('data-k')] = b.getAttribute('data-v');
    draw();
  });
  $('bd-size').addEventListener('input', draw);
  $('bd-photo').addEventListener('click', function () { if (photos < 4) photos++; draw(); });
  $('bd-send').addEventListener('click', function () {
    if (!ok()) return; var r = range(), who = $('bd-name').value.trim() || 'James Carter', first = who.split(' ')[0];
    var ex = Object.keys(extra).filter(function (k) { return extra[k]; }).map(function (k) { return xN[k]; });
    $('bd-job').innerHTML = '<span class="dtag ro">New lead</span> <span class="dtag ok">Site visit requested</span><h3>' + names[st.type] + ', ' + size() + ' m², ' + fin[st.finish] + '</h3>'
      + '<div class="job-grid"><ul class="kv"><li><span>Customer</span><b>' + esc(who) + '</b></li><li><span>Rough range shown</span><b>' + gbp(r[0]) + ' to ' + gbp(r[1]) + '</b></li><li><span>Also needed</span><b>' + esc(ex.length ? ex.join(', ') : 'Nothing extra') + '</b></li><li><span>Photos</span><b>' + (photos || 'None') + '</b></li></ul>'
      + '<div><b style="color:var(--navy)">Questions prepared for your call:</b><ol class="qs" style="margin-top:8px">' + qs[st.type].map(function (q) { return '<li>' + q + '</li>'; }).join('') + '</ol></div></div>';
    $('bd-mail').innerHTML = '<article class="demo-letter" aria-label="Sample email to the customer"><div class="demo-lhead"><div class="demo-lbrand">Your Company Ltd<small>Builders and Renovation</small></div><div class="demo-lmeta">' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '</div></div>'
      + '<h3>Your ' + names[st.type].toLowerCase() + ' project</h3><p>Dear ' + esc(first) + ',</p><p>Thank you for telling us about your ' + names[st.type].toLowerCase() + '. Based on what you told us, projects like yours usually cost between <b>' + gbp(r[0]) + ' and ' + gbp(r[1]) + '</b>. We will confirm the price after a free site visit.</p><p>To make the visit useful, we will ask you:</p><ol class="qs">' + qs[st.type].map(function (q) { return '<li>' + q + '</li>'; }).join('') + '</ol><p style="margin-top:14px">We will call you within one working day to agree a time.</p><p>Kind regards,<br>Your Company Ltd</p></article>';
    T.enable(1); T.enable(2); T.show(1);
  });
  $('bd-again').addEventListener('click', function () { st = { type: 'kitchen', finish: 'std' }; extra = {}; photos = 0; [].forEach.call(root.querySelectorAll('[data-x]'), function (b) { b.setAttribute('aria-pressed', 'false'); }); $('bd-size').value = 14; draw(); T.reset(); });
  draw();
})();
`;

export const buildersDemo = { html, js, css: '' };
