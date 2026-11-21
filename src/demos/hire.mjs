import { demoShell } from './common.mjs';

// Skip and equipment hire demo: pick a size, enter a postcode, see real availability and the full price (with a
// permit when the skip goes on the road), then book. The office sees the delivery round with the new drop added.
// Sample sizes, prices and availability only.

const skips = [
  ['mini', 'Mini Skip', '2 yards', 'Garden waste, small clear-outs', 160],
  ['midi', 'Midi Skip', '4 yards', 'Bathroom or kitchen strip-out', 220],
  ['builders', 'Builders Skip', '6 yards', 'Renovation and building waste', 280],
  ['large', 'Large Skip', '8 yards', 'House clearance, bulky waste', 330],
];
const skipSvg = (w) => `<svg viewBox="0 0 120 60" width="${60 + w * 8}" height="${32 + w * 3}" aria-hidden="true"><path d="M6 10h108l-14 44H20z" fill="#2d4ddb"/><path d="M6 10h108" stroke="#060b23" stroke-width="4"/><rect x="26" y="24" width="68" height="6" rx="3" fill="#dce1f9"/></svg>`;

const html = demoShell(
  'hr-demo',
  ['Customer', 'Office', 'Confirmation'],
  [
    `<div class="demo-grid"><div>
      <fieldset class="demo-q"><legend>Which size?</legend><div class="demo-opts" data-k="size">${skips
        .map(([v, t, y, use], i) => `<button type="button" class="demo-opt" data-v="${v}" aria-pressed="${i === 1}" style="flex-direction:column;align-items:flex-start;min-width:150px">${skipSvg(i)}<span>${t}</span><small style="font-weight:400;color:var(--muted)">${y}, ${use}</small></button>`)
        .join('')}</div></fieldset>
      <fieldset class="demo-q"><legend>Where will it go?</legend><div class="demo-opts" data-k="place"><button type="button" class="demo-opt" data-v="drive" aria-pressed="true">On my driveway</button><button type="button" class="demo-opt" data-v="road" aria-pressed="false">On the road (permit needed)</button></div></fieldset>
      <div class="demo-q"><div class="demo-row"><div><label for="hr-pc">Postcode</label><input class="demo-in" id="hr-pc" value="RG27 8AB"></div><div><label for="hr-days">Hire period</label><select class="demo-in" id="hr-days"><option value="7">7 days</option><option value="14">14 days</option></select></div></div></div>
      <fieldset class="demo-q"><legend>Delivery day</legend><div class="cal" id="hr-cal"></div></fieldset>
    </div>
    <aside class="demo-preview" aria-label="Your booking"><h3>Your Booking</h3><ul class="demo-spec" id="hr-spec"></ul><p class="est" id="hr-price" aria-live="polite"></p><p class="demo-hint" id="hr-note"></p><div class="demo-btns"><button type="button" class="btn" id="hr-book">Book and Pay</button></div></aside></div>`,
    `<div class="job"><span class="dtag ok">New booking</span><h3 id="hr-day-title"></h3><table class="demo-table"><thead><tr><th scope="col">Stop</th><th scope="col">Address</th><th scope="col">Job</th></tr></thead><tbody id="hr-round"></tbody></table><div class="note-box" id="hr-flag"></div></div>`,
    `<div id="hr-conf"></div><div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="hr-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
  ],
  'Interactive demo of a booking tool for skip and equipment hire'
);

const js = `
(function () {
  var root = document.getElementById('hr-demo'); if (!root) return;
  var T = window.agDemo(root), esc = window.agEsc, gbp = window.agGbp, $ = function (id) { return document.getElementById(id); };
  var S = ${JSON.stringify(skips.map(([v, t, y, , p]) => ({ v, t, y, p })))};
  var st = { size: 'midi', place: 'drive', day: null }, PERMIT = 45, EXTRA_WEEK = 40;
  var days = [], d0 = new Date(); d0.setHours(12);
  for (var i = 1; days.length < 10; i++) { var d = new Date(d0.getTime() + i * 864e5); if (d.getDay() === 0) continue; days.push(d); }
  var full = { 0: 1, 3: 1, 4: 1 };
  var skip = function () { return S.filter(function (s) { return s.v === st.size; })[0]; };
  var fmt = function (d, o) { return d.toLocaleDateString('en-GB', o || { weekday: 'short', day: 'numeric', month: 'short' }); };
  // a road permit needs two working days, so the first days are not offered for the road
  var blocked = function (i) { return full[i] || (st.place === 'road' && i < 2); };
  function draw() {
    [].forEach.call(root.querySelectorAll('[data-k]'), function (g) { var k = g.getAttribute('data-k'); [].forEach.call(g.children, function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === st[k]); }); });
    if (st.day !== null && blocked(st.day)) st.day = null;
    $('hr-cal').innerHTML = days.map(function (d, i) { var b = blocked(i); return '<button type="button" data-d="' + i + '" aria-pressed="' + (st.day === i) + '"' + (b ? ' disabled' : '') + '>' + fmt(d) + '<small>' + (full[i] ? 'Fully booked' : b ? 'Permit time' : 'Available') + '</small></button>'; }).join('');
    var s = skip(), wk = $('hr-days').value === '14' ? EXTRA_WEEK : 0, pm = st.place === 'road' ? PERMIT : 0;
    $('hr-spec').innerHTML = [['Skip', s.t + ', ' + s.y], ['Placed', st.place === 'road' ? 'On the road' : 'On the driveway'], ['Postcode', $('hr-pc').value.toUpperCase()], ['Hire', $('hr-days').value + ' days'], ['Delivery', st.day === null ? 'Choose a day' : fmt(days[st.day], { weekday: 'long', day: 'numeric', month: 'long' })]].map(function (r) { return '<li><span>' + r[0] + '</span><b>' + esc(r[1]) + '</b></li>'; }).join('');
    $('hr-price').textContent = gbp(s.p + wk + pm);
    $('hr-note').textContent = 'Includes delivery, collection and disposal' + (pm ? ', plus ' + gbp(pm) + ' for the council permit' : '') + (wk ? ', plus ' + gbp(wk) + ' for the second week' : '') + '.';
    $('hr-book').disabled = st.day === null;
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.demo-opt'); if (b && b.parentNode.getAttribute('data-k')) { st[b.parentNode.getAttribute('data-k')] = b.getAttribute('data-v'); draw(); return; }
    var c = e.target.closest('#hr-cal button'); if (c && !c.disabled) { st.day = +c.getAttribute('data-d'); draw(); }
  });
  $('hr-days').addEventListener('change', draw); $('hr-pc').addEventListener('input', draw);
  $('hr-book').addEventListener('click', function () {
    if (st.day === null) return; var s = skip(), day = fmt(days[st.day], { weekday: 'long', day: 'numeric', month: 'long' }), pc = esc($('hr-pc').value.toUpperCase());
    var round = [['1', 'GU51 3QT', 'Collect 6 yard'], ['2', pc, 'Deliver ' + s.y + ' (new)'], ['3', 'RG27 0HF', 'Exchange 8 yard'], ['4', 'GU52 6LE', 'Deliver 2 yard']];
    $('hr-day-title').textContent = 'Delivery round, ' + day;
    $('hr-round').innerHTML = round.map(function (r) { var me = r[2].indexOf('(new)') > 0; return '<tr' + (me ? ' style="background:var(--blue-soft)"' : '') + '><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; }).join('');
    $('hr-flag').innerHTML = st.place === 'road' ? '<b>Permit:</b> road placement, so the council permit application for ' + pc + ' has been prepared for you to submit.' : '<b>No permit needed:</b> driveway placement. Added to the nearest round automatically.';
    $('hr-conf').innerHTML = '<article class="demo-letter" aria-label="Sample booking confirmation"><div class="demo-lhead"><div class="demo-lbrand">Your Company Ltd<small>Skip and Equipment Hire</small></div><div class="demo-lmeta">Booking B-' + (2000 + st.day * 13) + '</div></div><h3>Your skip is booked</h3><p>Your ' + s.t.toLowerCase() + ' (' + s.y + ') will be delivered to ' + pc + ' on <b>' + day + '</b> and collected after ' + $('hr-days').value + ' days. You will get a text on the morning of delivery.</p><p><b>Please do not put in the skip:</b> plasterboard, tyres, fridges, paint or batteries. Ask us about these separately.</p><p>Kind regards,<br>Your Company Ltd</p></article>';
    T.enable(1); T.enable(2); T.show(1);
  });
  $('hr-again').addEventListener('click', function () { st = { size: 'midi', place: 'drive', day: null }; draw(); T.reset(); });
  draw();
})();
`;

export const hireDemo = { html, js, css: '' };
