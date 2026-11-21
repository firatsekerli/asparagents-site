import { demoShell } from './common.mjs';

// Letting and property management demo: the tenant reports a repair with photos and answers two safety questions;
// the tool sorts it by urgency using the agency's own rules, picks the contractor and keeps everyone updated.
// Sample categories, response times, contractors and landlord limit only.

const html = demoShell(
  'lt-demo',
  ['Tenant', 'Office', 'Updates'],
  [
    `<div class="demo-grid"><div>
      <p class="demo-hint" style="margin:0 0 18px">Reporting for <b>Flat 3, 12 Station Road</b></p>
      <fieldset class="demo-q"><legend>What is the problem?</legend><div class="demo-opts" data-k="cat"></div></fieldset>
      <fieldset class="demo-q"><legend id="lt-q1"></legend><div class="demo-opts" data-k="q1"><button type="button" class="demo-opt" data-v="y" aria-pressed="false">Yes</button><button type="button" class="demo-opt" data-v="n" aria-pressed="true">No</button></div></fieldset>
      <fieldset class="demo-q"><legend id="lt-q2"></legend><div class="demo-opts" data-k="q2"><button type="button" class="demo-opt" data-v="y" aria-pressed="false">Yes</button><button type="button" class="demo-opt" data-v="n" aria-pressed="true">No</button></div></fieldset>
      <div class="demo-q"><label for="lt-desc">Tell us a bit more</label><textarea class="demo-in" id="lt-desc" rows="3"></textarea></div>
      <fieldset class="demo-q"><legend>Photos</legend><div class="thumbs" id="lt-photos"></div><div class="demo-btns" style="margin-top:10px"><button type="button" class="btn btn-soft" id="lt-photo">Add a Sample Photo</button></div></fieldset>
      <fieldset class="demo-q"><legend>When can a contractor get in?</legend><div class="demo-opts" data-k="access"><button type="button" class="demo-opt" data-v="Weekday mornings" aria-pressed="true">Weekday mornings</button><button type="button" class="demo-opt" data-v="Weekday afternoons" aria-pressed="false">Weekday afternoons</button><button type="button" class="demo-opt" data-v="Any time, use the office keys" aria-pressed="false">Any time, use the office keys</button></div></fieldset>
    </div>
    <aside class="demo-preview" aria-label="Your report"><h3>Your Report</h3><div id="lt-tri" aria-live="polite"></div><ul class="demo-spec" id="lt-spec" style="margin-top:14px"></ul><div class="demo-btns"><button type="button" class="btn" id="lt-send">Send Report</button></div></aside></div>`,
    `<div class="job" id="lt-job"></div>`,
    `<div class="sms" id="lt-sms"></div><div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="lt-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
  ],
  'Interactive demo of a repair reporting and triage tool for letting agents'
);

const js = `
(function () {
  var root = document.getElementById('lt-demo'); if (!root) return;
  var T = window.agDemo(root), esc = window.agEsc, gbp = window.agGbp, $ = function (id) { return document.getElementById(id); };
  var C = {
    leak: { s: 'leak', t: 'Leak or water', q1: 'Is water coming through a ceiling or near electrics?', q2: 'Can you turn the water off at the stopcock?', who: 'Sample Plumbing Ltd', trade: 'Plumber', cost: 180, d: 'Water dripping from the bathroom ceiling into the hallway.' },
    heat: { s: 'heating', t: 'Heating or hot water', q1: 'Are you without any heating or hot water?', q2: 'Is anyone in the home elderly, very young or unwell?', who: 'Sample Heating Services', trade: 'Gas Safe engineer', cost: 220, d: 'The boiler shows an error code and the radiators are cold.' },
    elec: { s: 'electrics', t: 'Electrics', q1: 'Is there a burning smell, sparks or exposed wires?', q2: 'Has the power gone off in the whole home?', who: 'Sample Electrical', trade: 'Electrician', cost: 160, d: 'The kitchen sockets stopped working after the fuse tripped.' },
    lock: { s: 'lock', t: 'Doors, windows or locks', q1: 'Is the home unsafe to leave, or can you not get in?', q2: 'Is it the front door?', who: 'Sample Locksmiths', trade: 'Locksmith', cost: 140, d: 'The front door lock is very stiff and hard to turn.' },
    appl: { s: 'appliance', t: 'Appliance', q1: 'Is it the fridge or the only oven?', q2: 'Is it leaking water?', who: 'Sample Appliance Repairs', trade: 'Appliance engineer', cost: 120, d: 'The washing machine stops halfway and will not drain.' }
  };
  var LIMIT = 250, st = { cat: 'leak', q1: 'n', q2: 'n', access: 'Weekday mornings' }, photos = 1, typed = false;
  function level() {
    var c = st.cat;
    if ((c === 'leak' || c === 'elec' || c === 'lock') && st.q1 === 'y') return 0;
    if (c === 'heat' && st.q1 === 'y') return st.q2 === 'y' ? 0 : 1;
    if (c === 'elec' && st.q2 === 'y') return 0;
    if (c === 'appl' && st.q1 === 'y') return 1;
    if (st.q1 === 'y' || st.q2 === 'y') return 1;
    return 2;
  }
  var L = [['em', 'Emergency', 'Contractor within 24 hours'], ['ur', 'Urgent', 'Contractor within 3 working days'], ['ro', 'Routine', 'Contractor within 14 days']];
  function draw() {
    var c = C[st.cat];
    $('lt-q1').textContent = c.q1; $('lt-q2').textContent = c.q2;
    root.querySelector('[data-k="cat"]').innerHTML = Object.keys(C).map(function (k) { return '<button type="button" class="demo-opt" data-v="' + k + '" aria-pressed="' + (k === st.cat) + '">' + C[k].t + '</button>'; }).join('');
    [].forEach.call(root.querySelectorAll('[data-k]'), function (g) { var k = g.getAttribute('data-k'); if (k === 'cat') return; [].forEach.call(g.children, function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === st[k]); }); });
    if (!typed) $('lt-desc').value = c.d;
    $('lt-photos').innerHTML = Array.apply(null, Array(photos)).map(function (_, i) { return '<span class="thumb">Photo ' + (i + 1) + '</span>'; }).join('');
    var l = L[level()];
    $('lt-tri').innerHTML = '<span class="dtag ' + l[0] + '">' + l[1] + '</span><p class="demo-hint" style="margin:8px 0 0">' + l[2] + '. Sorted by your own rules as the tenant answers.</p>' + (level() === 0 && st.cat === 'leak' ? '<p class="note-box">If you can, turn off the water at the stopcock now. A plumber is being arranged.</p>' : '');
    $('lt-spec').innerHTML = [['Problem', c.t], ['Photos', photos || 'None'], ['Access', st.access]].map(function (r) { return '<li><span>' + r[0] + '</span><b>' + esc(r[1]) + '</b></li>'; }).join('');
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.demo-opt'); if (!b || !b.parentNode.getAttribute('data-k')) return;
    var k = b.parentNode.getAttribute('data-k'); st[k] = b.getAttribute('data-v'); if (k === 'cat') { st.q1 = 'n'; st.q2 = 'n'; typed = false; } draw();
  });
  $('lt-desc').addEventListener('input', function () { typed = true; });
  $('lt-photo').addEventListener('click', function () { if (photos < 4) photos++; draw(); });
  $('lt-send').addEventListener('click', function () {
    var c = C[st.cat], l = L[level()], ok = c.cost <= LIMIT, now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    $('lt-job').innerHTML = '<span class="dtag ' + l[0] + '">' + l[1] + '</span> <span class="dtag ' + (ok ? 'ok' : 'ur') + '">' + (ok ? 'Within landlord limit' : 'Landlord approval needed') + '</span><h3>' + c.t + ', Flat 3, 12 Station Road</h3>'
      + '<div class="job-grid"><ul class="kv"><li><span>Tenant</span><b>Priya Shah</b></li><li><span>Response time</span><b>' + l[2] + '</b></li><li><span>Contractor</span><b>' + c.who + ' (' + c.trade + ')</b></li><li><span>Typical cost</span><b>' + gbp(c.cost) + ' (limit ' + gbp(LIMIT) + ')</b></li><li><span>Access</span><b>' + esc(st.access) + '</b></li></ul>'
      + '<div><div class="thumbs">' + Array.apply(null, Array(photos)).map(function (_, i) { return '<span class="thumb">Photo ' + (i + 1) + '</span>'; }).join('') + '</div><div class="note-box"><b>Tenant says:</b> ' + esc($('lt-desc').value) + '</div><div class="note-box"><b>Done for you:</b> job sent to ' + c.who + ' with the photos and access details' + (ok ? '' : ', landlord asked to approve') + ', tenant updated.</div></div></div>';
    $('lt-sms').innerHTML = '<div class="msg bot">Your Lettings: Thanks Priya, we have your report about the ' + c.s + '. It is marked ' + l[1].toLowerCase() + ' and ' + c.who + ' will contact you to arrange a visit.<small>' + now + '</small></div><div class="msg bot">' + c.who + ': Hi Priya, we can come ' + (level() === 0 ? 'today between 4 and 6pm' : 'on Thursday morning') + '. Reply YES to confirm.<small>' + now + '</small></div><div class="msg me">YES</div><div class="msg bot">Your Lettings: Confirmed. We will let you know when the job is done.<small>' + now + '</small></div>';
    T.enable(1); T.enable(2); T.show(1);
  });
  $('lt-again').addEventListener('click', function () { st = { cat: 'leak', q1: 'n', q2: 'n', access: 'Weekday mornings' }; photos = 1; typed = false; draw(); T.reset(); });
  draw();
})();
`;

export const lettingsDemo = { html, js, css: '' };
