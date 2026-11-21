import { demoShell } from './common.mjs';

// Mortgage and insurance broker demo: a short guided fact-find builds the client's document checklist, the client
// uploads, and the broker sees what is still missing with the reminders already scheduled. No advice, no rates:
// only the paperwork. The checklist is a sample; a real one follows the broker's own lenders and insurers.

const opt = (k, list) => `<div class="demo-opts" data-k="${k}">${list.map(([v, t], i) => `<button type="button" class="demo-opt" data-v="${v}" aria-pressed="${i === 0}">${t}</button>`).join('')}</div>`;

const html = demoShell(
  'bk-demo',
  ['Client', 'Broker', 'Reminder'],
  [
    `<div class="demo-grid"><div>
      <fieldset class="demo-q"><legend>What can we help with?</legend>${opt('need', [['first', 'Buying my first home'], ['move', 'Moving home'], ['remo', 'Remortgage'], ['btl', 'Buy to let']])}</fieldset>
      <fieldset class="demo-q"><legend>How do you earn your income?</legend>${opt('work', [['emp', 'Employed'], ['self', 'Self-employed'], ['ltd', 'Company director'], ['ret', 'Retired']])}</fieldset>
      <fieldset class="demo-q"><legend>Applying</legend>${opt('who', [['one', 'On my own'], ['two', 'With someone']])}</fieldset>
      <fieldset class="demo-q" id="bk-dep-q"><legend>Where is the deposit from?</legend>${opt('dep', [['sav', 'Savings'], ['gift', 'A gift from family'], ['sale', 'Sale of my home']])}</fieldset>
    </div>
    <aside class="demo-preview" aria-label="Your document checklist"><h3>Your Document Checklist</h3><p class="demo-hint" style="margin:0 0 12px">Built from your answers. Tap Upload to send each one securely.</p><ul class="docs" id="bk-docs"></ul>
      <p class="demo-hint" id="bk-count" style="margin-top:12px"></p><div class="demo-btns" style="margin-top:12px"><button type="button" class="btn" id="bk-send">Save and Continue Later</button></div></aside></div>`,
    `<div class="job" id="bk-case"></div>`,
    `<div id="bk-mail"></div><div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="bk-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
  ],
  'Interactive demo of a fact-find and document checklist tool for mortgage and insurance brokers'
);

const js = `
(function () {
  var root = document.getElementById('bk-demo'); if (!root) return;
  var T = window.agDemo(root), esc = window.agEsc, $ = function (id) { return document.getElementById(id); };
  var st = { need: 'first', work: 'emp', who: 'one', dep: 'sav' }, got = {};
  var N = { first: 'First home purchase', move: 'Moving home', remo: 'Remortgage', btl: 'Buy to let' };
  function list() {
    var l = [['id', 'Photo ID', 'Passport or driving licence'], ['addr', 'Proof of address', 'A recent utility bill or council tax letter']];
    if (st.work === 'emp') l.push(['pay', 'Last 3 payslips', ''], ['p60', 'Latest P60', '']);
    if (st.work === 'self') l.push(['sa', 'Tax calculations, last 2 years', 'With the matching tax year overviews'], ['acc', 'Accounts, last 2 years', 'Prepared by your accountant']);
    if (st.work === 'ltd') l.push(['acc', 'Company accounts, last 2 years', ''], ['sa', 'Personal tax calculations, last 2 years', '']);
    if (st.work === 'ret') l.push(['pen', 'Pension statements', 'State and private pensions']);
    l.push(['bank', 'Bank statements, last 3 months', 'For every current account']);
    if (st.need !== 'remo') { if (st.dep === 'gift') l.push(['gift', 'Gifted deposit letter', 'Signed by the person giving it, with their ID']); if (st.dep === 'sav') l.push(['sav', 'Savings statements', 'Showing the deposit building up']); if (st.dep === 'sale') l.push(['sale', 'Memorandum of sale', 'From the agent selling your home']); }
    if (st.need === 'remo') l.push(['mort', 'Current mortgage statement', '']);
    if (st.need === 'btl') l.push(['rent', 'Rental estimate', 'A letter from a letting agent']);
    if (st.who === 'two') l = l.concat(l.filter(function (d) { return ['id', 'pay', 'p60', 'sa', 'acc', 'pen'].indexOf(d[0]) >= 0; }).map(function (d) { return [d[0] + '2', d[1] + ' (second applicant)', d[2]]; }));
    return l;
  }
  function draw() {
    [].forEach.call(root.querySelectorAll('[data-k]'), function (g) { var k = g.getAttribute('data-k'); [].forEach.call(g.children, function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === st[k]); }); });
    $('bk-dep-q').hidden = st.need === 'remo';
    var l = list(), n = l.filter(function (d) { return got[d[0]]; }).length;
    $('bk-docs').innerHTML = l.map(function (d) { var g = got[d[0]]; return '<li' + (g ? ' class="done"' : '') + '><span>' + esc(d[1]) + (d[2] ? '<small>' + esc(d[2]) + '</small>' : '') + '</span>' + (g ? '<span class="dtag ok">Received</span>' : '<button type="button" class="demo-opt" data-up="' + d[0] + '">Upload</button>') + '</li>'; }).join('');
    $('bk-count').textContent = n + ' of ' + l.length + ' documents received.';
  }
  root.addEventListener('click', function (e) {
    var u = e.target.closest('[data-up]'); if (u) { got[u.getAttribute('data-up')] = true; draw(); return; }
    var b = e.target.closest('.demo-opt'); if (b && b.parentNode.getAttribute('data-k')) { st[b.parentNode.getAttribute('data-k')] = b.getAttribute('data-v'); draw(); }
  });
  $('bk-send').addEventListener('click', function () {
    var l = list(), have = l.filter(function (d) { return got[d[0]]; }), miss = l.filter(function (d) { return !got[d[0]]; }), pc = Math.round(have.length / l.length * 100);
    var tmr = new Date(Date.now() + 864e5).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    $('bk-case').innerHTML = '<span class="dtag ' + (miss.length ? 'ur' : 'ok') + '">' + (miss.length ? miss.length + ' documents missing' : 'Ready to submit') + '</span><h3>' + (st.who === 'two' ? 'Emma and Tom Wilson' : 'Emma Wilson') + ', ' + N[st.need] + '</h3>'
      + '<div class="bar" aria-hidden="true"><i style="width:' + pc + '%"></i></div><p class="demo-hint" style="margin:0 0 16px">' + have.length + ' of ' + l.length + ' documents received (' + pc + '%)</p>'
      + '<div class="job-grid"><div><b style="color:var(--navy)">Still missing</b><ul class="docs" style="margin-top:8px">' + (miss.length ? miss.map(function (d) { return '<li>' + esc(d[1]) + '</li>'; }).join('') : '<li class="done">Nothing, the file is complete</li>') + '</ul></div>'
      + '<div><b style="color:var(--navy)">Next steps, done for you</b><ul class="kv" style="margin-top:8px"><li><span>Reminder to the client</span><b>' + (miss.length ? tmr + ', 9am' : 'Not needed') + '</b></li><li><span>Second reminder</span><b>' + (miss.length ? 'After 3 more days' : 'Not needed') + '</b></li><li><span>You are told when</span><b>Every document is in</b></li></ul><div class="note-box">You only step in when the file is complete or a client has not replied after two reminders.</div></div></div>';
    $('bk-mail').innerHTML = '<article class="demo-letter" aria-label="Sample reminder email"><div class="demo-lhead"><div class="demo-lbrand">Your Brokerage Ltd<small>Mortgages and Protection</small></div><div class="demo-lmeta">' + tmr + '</div></div><h3>A few documents to go</h3><p>Hi Emma,</p>'
      + (miss.length ? '<p>Thank you for the documents so far. To move your application forward we still need:</p><ul class="qs">' + miss.map(function (d) { return '<li>' + esc(d[1]) + '</li>'; }).join('') + '</ul><p style="margin-top:14px">You can upload them from your phone using your secure link. It only takes a few minutes.</p>' : '<p>Thank you, we have everything we need. Your adviser will be in touch shortly.</p>')
      + '<p>Kind regards,<br>Your Brokerage Ltd</p></article>';
    T.enable(1); T.enable(2); T.show(1);
  });
  $('bk-again').addEventListener('click', function () { st = { need: 'first', work: 'emp', who: 'one', dep: 'sav' }; got = {}; draw(); T.reset(); });
  draw();
})();
`;

export const brokersDemo = { html, js, css: '' };
