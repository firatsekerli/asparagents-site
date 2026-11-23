import { demoShell } from './common.mjs';

// Trades demo: an enquiry tool that answers at any hour, asks the questions the office would ask, sorts emergencies
// from routine jobs and books a visit. Sample questions, slots and names only.

// makeTradesDemo(jobs): the same tool with the jobs of one trade (Google Ads landing pages for plumbers and
// electricians, 23.11.2026). Each job is [label, the urgency question]. The default is the mixed trades list.
const defaultJobs = [
  ['Roof leak', 'Is it causing damage inside the house right now?'],
  ['Gutters', 'Is water overflowing onto walls or into the house right now?'],
  ['Boiler or heating', 'Are you without heating or hot water right now?'],
  ['Blocked drain', 'Is it causing damage inside the house right now?'],
];

export const makeTradesDemo = (jobs = defaultJobs) => {
const html = demoShell(
  'tr-demo',
  ['Customer', 'Office', 'Text Message'],
  [
    `<div class="demo-grid"><div><div class="chat" id="tr-chat" aria-live="polite"></div><div class="chat-act" id="tr-act"></div></div>
    <aside class="demo-preview" aria-label="What the tool has collected"><h3>Collected So Far</h3><ul class="demo-spec" id="tr-sum"></ul><p class="demo-hint">The tool fills this in as the customer answers. Nobody in your office has to pick up the phone.</p></aside></div>`,
    `<div class="job" id="tr-job"></div>`,
    `<div class="sms" id="tr-sms"></div><div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="tr-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>`,
  ],
  'Interactive demo of an enquiry and booking tool for trades'
);

const js = `
(function () {
  var root = document.getElementById('tr-demo'); if (!root) return;
  var T = window.agDemo(root), esc = window.agEsc, chat = document.getElementById('tr-chat'), act = document.getElementById('tr-act');
  var a = {}, JOBS = ${JSON.stringify(jobs)};
  var say = function (t, who) { var d = document.createElement('div'); d.className = 'msg ' + (who || 'bot'); d.innerHTML = t; chat.appendChild(d); chat.scrollTop = chat.scrollHeight; };
  var sum = function () {
    var rows = [['Job', a.job], ['Urgency', a.urgent === undefined ? '' : a.urgent ? 'Emergency' : 'Routine'], ['Postcode', a.pc], ['Photo', a.photo === undefined ? '' : a.photo ? 'Added' : 'Skipped'], ['Visit', a.slot], ['Name', a.name]];
    document.getElementById('tr-sum').innerHTML = rows.map(function (r) { return '<li><span>' + r[0] + '</span><b>' + (r[1] ? esc(r[1]) : '...') + '</b></li>'; }).join('');
  };
  var choices = function (list, fn) {
    act.innerHTML = list.map(function (c, i) { return '<button type="button" class="demo-opt" data-i="' + i + '">' + esc(c) + '</button>'; }).join('');
    [].forEach.call(act.querySelectorAll('button'), function (b) { b.addEventListener('click', function () { var c = list[+b.getAttribute('data-i')]; say(esc(c), 'me'); act.innerHTML = ''; fn(c); sum(); }); });
  };
  var field = function (label, val, fn) {
    act.innerHTML = '<label class="sr" for="tr-in">' + label + '</label><input class="demo-in" id="tr-in" value="' + esc(val) + '"><button type="button" class="btn" id="tr-go">Send</button>';
    var go = function () { var v = document.getElementById('tr-in').value.trim() || val; say(esc(v), 'me'); act.innerHTML = ''; fn(v); sum(); };
    document.getElementById('tr-go').addEventListener('click', go);
    document.getElementById('tr-in').addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
  };
  var later = function (fn) { setTimeout(fn, 450); };
  var time = function () { return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); };
  function start() {
    a = {}; chat.innerHTML = ''; sum();
    say('Hi, thanks for contacting Your Company. I can book you in right now. What do you need help with?');
    choices(JOBS.map(function (j) { return j[0]; }), function (c) { a.job = c; later(q2); });
  }
  function q2() {
    say(JOBS.filter(function (j) { return j[0] === a.job; })[0][1]);
    choices(['Yes, right now', 'No, it can wait a few days'], function (c) { a.urgent = c.indexOf('Yes') === 0; later(q3); });
  }
  function q3() { say('What is your postcode?'); field('Postcode', 'GU51 4AB', function (v) { a.pc = v.toUpperCase(); later(q4); }); }
  function q4() { say('Good news, we cover ' + esc(a.pc) + '. Could you add a photo? It helps us bring the right parts.'); choices(['Add a photo', 'Skip'], function (c) { a.photo = c !== 'Skip'; later(q5); }); }
  function q5() {
    say(a.urgent ? 'As this is an emergency, I can offer the first free slots:' : 'Here are the next free visits:');
    choices(a.urgent ? ['Today, 4 to 6pm', 'Tomorrow, 8 to 10am'] : ['Tomorrow, 2 to 4pm', 'Thursday, 10am to 12pm', 'Friday, 8 to 10am'], function (c) { a.slot = c; later(q6); });
  }
  function q6() { say('Last thing: your name and mobile number?'); field('Name and mobile', 'Sarah Thompson, 07700 900123', function (v) { a.name = v.split(',')[0]; a.phone = v.split(',')[1] || ''; later(done); }); }
  function done() {
    say('You are booked in for <b>' + esc(a.slot) + '</b>. We have sent you a text with the details. Thank you, ' + esc(a.name.split(' ')[0]) + '!');
    act.innerHTML = '<button type="button" class="btn" id="tr-next">See What Your Office Receives</button>';
    document.getElementById('tr-next').addEventListener('click', function () { T.enable(1); T.enable(2); office(); T.show(1); });
  }
  function office() {
    var tag = a.urgent ? '<span class="dtag em">Emergency</span>' : '<span class="dtag ro">Routine</span>';
    document.getElementById('tr-job').innerHTML = tag + ' <span class="dtag ok">Booked</span><h3>' + esc(a.job) + ', ' + esc(a.pc) + '</h3>'
      + '<div class="job-grid"><ul class="kv"><li><span>Customer</span><b>' + esc(a.name) + '</b></li><li><span>Mobile</span><b>' + esc(a.phone || '07700 900123') + '</b></li><li><span>Visit</span><b>' + esc(a.slot) + '</b></li><li><span>Enquiry received</span><b>' + time() + ', answered at once</b></li></ul>'
      + '<div><div class="thumbs">' + (a.photo ? '<span class="thumb">Customer photo</span>' : '<span class="demo-hint">No photo sent</span>') + '</div>'
      + '<div class="note-box"><b>Summary for the engineer:</b> ' + esc(a.job) + (a.urgent ? ', causing problems right now. Booked as an emergency.' : ', not urgent. Booked as a routine visit.') + (a.photo ? ' Photo attached.' : '') + '</div></div></div>';
    document.getElementById('tr-sms').innerHTML = '<div class="msg bot">Your Company: Hi ' + esc(a.name.split(' ')[0]) + ', your visit for ' + esc(a.job.toLowerCase()) + ' is booked for ' + esc(a.slot) + '. Our engineer will text you when on the way. Reply C to change the time.<small>' + time() + '</small></div><div class="msg me">Thanks!</div>';
  }
  document.getElementById('tr-again').addEventListener('click', function () { T.reset(); start(); });
  start();
})();
`;

return { html, js, css: '' };
};

export const tradesDemo = makeTradesDemo();
