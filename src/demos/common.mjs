// Shared parts of the industry demos: the frame with step tabs, the tab script and the extra styles (chat, badges,
// calendar, progress). Every demo runs only in the browser with sample data and sends nothing.
import { windowsDemo } from './windows.mjs';

export const demoShell = (id, tabs, panels, label) => `
<div class="demo" id="${id}" role="region" aria-label="${label}">
  <div class="demo-top"><span class="demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="demo-badge">Demo with sample data. Nothing is sent.</span></div>
  <div class="demo-tabs" role="tablist" aria-label="Demo steps">${tabs
    .map((t, i) => `<button class="demo-tab" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1" disabled' : ''}><span>${i + 1}</span>${t}</button>`)
    .join('')}</div>
  ${panels.map((p, i) => `<div class="demo-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}>${p}</div>`).join('')}
</div>`;

// window.agDemo(root): wires the step tabs (click and arrow keys) and returns show(n), enable(n) and reset().
export const tabsJs = `
window.agDemo = function (root) {
  var tabs = [].slice.call(root.querySelectorAll('[role=tab]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  function show(n) {
    tabs.forEach(function (t, i) { var on = i === n; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; panels[i].hidden = !on; });
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { if (!t.disabled) show(i); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return;
      var j = i; do { j = (j + d + tabs.length) % tabs.length; } while (tabs[j].disabled);
      tabs[j].focus(); show(j);
    });
  });
  return { show: show, enable: function (n) { tabs[n].disabled = false; }, reset: function () { tabs.forEach(function (t, i) { if (i) t.disabled = true; }); show(0); } };
};
window.agEsc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
window.agGbp = function (n) { return '£' + Number(n).toLocaleString('en-GB', { maximumFractionDigits: 0 }); };
`;

// Height lock: on wide screens every demo panel gets the height of the tallest panel (measured as the page loads and
// again when the width changes), so switching steps never moves the page; longer content scrolls inside. On phones
// (Firat 22.11.2026: too much empty space) panels keep their own height and a step change scrolls the demo to its top.
export const lockJs = `
(function () {
  function lock() {
    var wide = innerWidth > 860;
    [].forEach.call(document.querySelectorAll('.demo'), function (d) {
      var ps = [].slice.call(d.querySelectorAll('.demo-panel')), max = 0;
      ps.forEach(function (p) { p.style.height = ''; });
      if (!wide || ps.length < 2) return;
      ps.forEach(function (p) { var h = p.hidden; p.hidden = false; max = Math.max(max, p.offsetHeight); p.hidden = h; });
      ps.forEach(function (p) { p.style.height = max + 'px'; });
    });
  }
  lock(); var w = innerWidth, t;
  addEventListener('resize', function () { if (innerWidth === w) return; w = innerWidth; clearTimeout(t); t = setTimeout(lock, 150); });
})();
`;

export const demoCss = `${windowsDemo.css}
.demo-panel { overflow-y: auto; scrollbar-width: thin; }
@media (max-width: 860px) { .demo-panel { overflow-y: visible; } }
.demo-panel .demo-preview { top: 0; }
.demo-sec .sec-head .h2, .demo-sec .sec-intro { color: #fff; }
.demo-sec .sec-head { margin-bottom: 40px; }
.chat { display: flex; flex-direction: column; gap: 12px; height: 440px; overflow-y: auto; padding: 4px 4px 12px; }
.msg { max-width: 82%; padding: 12px 16px; border-radius: 16px; font-size: 15px; line-height: 1.5; }
.msg.bot { background: var(--bg); border: 1px solid var(--line); color: var(--navy); border-bottom-left-radius: 4px; align-self: flex-start; }
.msg.me { background: var(--blue); color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
.msg small { display: block; font-size: 12px; opacity: 0.75; margin-top: 4px; }
.chat-act { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.chat-act .demo-in { max-width: 240px; }
.dtag { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; border-radius: 999px; padding: 4px 10px; }
.dtag.em { background: #fdecea; color: var(--red-text); }
.dtag.ur { background: #fff4e0; color: #8a4b00; }
.dtag.ro { background: var(--blue-soft); color: var(--blue); }
.dtag.ok { background: #e6f5ec; color: #1d6b3a; }
.job { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 22px; box-shadow: var(--shadow); }
.job h3 { font-size: 18px; margin: 10px 0 12px; }
.job-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.kv { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; font-size: 14px; }
.kv li { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--line); padding-bottom: 6px; }
.kv b { color: var(--navy); text-align: right; }
.note-box { background: var(--blue-soft); border-radius: 12px; padding: 14px 16px; font-size: 15px; color: var(--navy); margin-top: 14px; }
.thumbs { display: flex; gap: 8px; flex-wrap: wrap; }
.thumb { width: 72px; height: 56px; border-radius: 8px; background: linear-gradient(135deg, #cfe3f7, #9fb2ff); display: flex; align-items: center; justify-content: center; color: var(--navy); font-size: 11px; font-weight: 700; text-align: center; padding: 4px; }
.cal { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.cal button { border: 2px solid var(--line); background: #fff; border-radius: 10px; padding: 8px 4px; font: inherit; font-size: 13px; font-weight: 700; color: var(--navy); cursor: pointer; line-height: 1.3; }
.cal button small { display: block; font-weight: 400; color: var(--muted); font-size: 12px; }
.cal button[aria-pressed="true"] { border-color: var(--blue); background: var(--blue-soft); }
.cal button:disabled { opacity: 0.45; cursor: not-allowed; text-decoration: line-through; }
.bar { height: 10px; border-radius: 999px; background: var(--line); overflow: hidden; margin: 8px 0 4px; }
.bar i { display: block; height: 100%; background: var(--blue); border-radius: 999px; transition: width 0.4s; }
.docs { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.docs li { display: flex; justify-content: space-between; align-items: center; gap: 12px; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; font-size: 14px; }
.docs li.done { border-color: #bfe3cc; background: #f3fbf6; }
.docs small { display: block; color: var(--muted); }
.sms { max-width: 380px; margin: 0 auto; background: var(--bg); border: 1px solid var(--line); border-radius: 28px; padding: 22px 16px; display: flex; flex-direction: column; gap: 10px; }
.sms .msg { max-width: 92%; }
.est { font-size: 30px; font-weight: 700; color: var(--navy); letter-spacing: -0.02em; }
.qs { margin: 0; padding-left: 20px; display: grid; gap: 6px; font-size: 15px; }
@media (max-width: 860px) { .job-grid { grid-template-columns: minmax(0, 1fr); } .cal { grid-template-columns: repeat(3, minmax(0, 1fr)); } .msg { max-width: 92%; } }
`;
