// Interactive demo for the window and door industry page. Runs entirely in the browser with sample products and
// sample prices: nothing is sent or stored. Mirrors the real quotation tool: the customer builds a basket of
// windows and doors, the office prices each item and the proposal letter is created with VAT.

const css = `
.demo { background: var(--white); border-radius: 16px; box-shadow: 0 24px 60px rgba(6, 11, 35, 0.18); overflow: hidden; color: var(--text); text-align: left; }
.demo-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 20px; background: #eef0f6; border-bottom: 1px solid var(--line); }
.demo-dots { display: flex; gap: 6px; }
.demo-dots i { width: 11px; height: 11px; border-radius: 50%; background: #c9cfdf; }
.demo-dots i:first-child { background: var(--red); }
.demo-badge { font-size: 13px; font-weight: 700; color: var(--red-text); background: #fff; border-radius: 999px; padding: 4px 12px; }
.demo-tabs { display: flex; gap: 4px; padding: 12px 20px 0; border-bottom: 1px solid var(--line); overflow-x: auto; }
.demo-tab { flex: none; border: 0; background: none; font: inherit; font-size: 15px; font-weight: 700; color: var(--muted); padding: 12px 16px; border-bottom: 3px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 8px; }
.demo-tab[aria-selected="true"] { color: var(--blue); border-bottom-color: var(--blue); }
.demo-tab:disabled { cursor: not-allowed; opacity: 0.55; }
.demo-tab span { width: 24px; height: 24px; border-radius: 50%; background: var(--blue-soft); color: var(--blue); display: inline-flex; align-items: center; justify-content: center; font-size: 13px; }
.demo-tab[aria-selected="true"] span { background: var(--blue); color: #fff; }
.demo-panel { padding: 28px; }
.demo-panel[hidden] { display: none; }
.demo-grid { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 28px; align-items: start; }
.demo-q { margin: 0 0 22px; border: 0; padding: 0; min-width: 0; }
.demo-q legend, .demo-q > label { display: block; font-weight: 700; color: var(--navy); margin-bottom: 10px; font-size: 15px; }
.demo-opts { display: flex; flex-wrap: wrap; gap: 8px; }
.demo-opt { border: 2px solid var(--line); background: var(--white); border-radius: 10px; padding: 9px 14px; font: inherit; font-size: 14px; font-weight: 700; color: var(--navy); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }
.demo-opt:hover { border-color: var(--blue); }
.demo-opt[aria-pressed="true"] { border-color: var(--blue); background: var(--blue-soft); }
.demo-opt svg { width: 34px; height: 34px; }
.demo-sw { width: 18px; height: 18px; border-radius: 50%; border: 1px solid #b8bfd0; }
.demo-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.demo-in { width: 100%; font: inherit; font-size: 15px; padding: 10px 12px; border: 2px solid var(--line); border-radius: 10px; color: var(--navy); background: var(--white); }
.demo-in:focus { outline: none; border-color: var(--blue); }
.demo-q label { display: block; font-weight: 700; color: var(--navy); margin-bottom: 8px; font-size: 15px; }
.demo-btns .btn:disabled { opacity: 0.5; cursor: not-allowed; }
.demo-hint { font-size: 13px; color: var(--muted); margin: 6px 0 0; }
.demo-err { font-size: 13px; color: var(--red-text); margin: 6px 0 0; min-height: 1em; }
.demo-preview { background: var(--bg); border: 1px solid var(--line); border-radius: 14px; padding: 20px; position: sticky; top: 90px; }
.demo-preview h3, .demo-basket h3 { font-size: 16px; margin: 0 0 12px; }
.demo-pic { display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 10px; height: 170px; margin-bottom: 14px; }
.demo-pic svg { height: 140px; width: auto; }
.demo-spec { list-style: none; margin: 0 0 16px; padding: 0; font-size: 14px; display: grid; gap: 6px; }
.demo-spec li { display: flex; justify-content: space-between; gap: 12px; border-bottom: 1px dashed var(--line); padding-bottom: 6px; }
.demo-spec b { color: var(--navy); text-align: right; }
.demo-basket { margin-top: 22px; border-top: 1px solid var(--line); padding-top: 18px; }
.demo-items { list-style: none; margin: 0 0 14px; padding: 0; display: grid; gap: 8px; }
.demo-items li { display: flex; justify-content: space-between; align-items: center; gap: 10px; background: #fff; border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; font-size: 14px; }
.demo-items small { display: block; color: var(--muted); }
.demo-x { border: 0; background: none; color: var(--red-text); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; padding: 6px; }
.demo-empty { font-size: 14px; color: var(--muted); margin: 0 0 14px; }
.demo-btns { display: flex; flex-wrap: wrap; gap: 10px; }
.demo-btns .btn { cursor: pointer; border: 0; font: inherit; font-weight: 700; }
.demo-note { margin: 20px 0 0; font-size: 13px; color: var(--muted); }
.demo-inbox { display: flex; align-items: center; gap: 14px; background: var(--blue-soft); border-radius: 12px; padding: 14px 18px; margin-bottom: 22px; color: var(--navy); font-size: 15px; }
.demo-inbox b { display: block; }
.demo-inbox span:first-child { flex: none; width: 40px; height: 40px; border-radius: 50%; background: var(--blue); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }
.demo-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.demo-table th { text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); padding: 8px 10px; border-bottom: 2px solid var(--line); }
.demo-table td { padding: 10px; border-bottom: 1px solid var(--line); vertical-align: middle; }
.demo-table td:last-child, .demo-table th:last-child { text-align: right; }
.demo-table .demo-in { width: 120px; text-align: right; padding: 7px 10px; }
.demo-tot { margin: 18px 0 0 auto; max-width: 340px; display: grid; gap: 6px; font-size: 15px; }
.demo-tot div { display: flex; justify-content: space-between; gap: 12px; }
.demo-tot div:last-child { border-top: 2px solid var(--navy); padding-top: 8px; font-size: 18px; font-weight: 700; color: var(--navy); }
.demo-letter { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid var(--line); border-radius: 6px; box-shadow: var(--shadow); padding: 40px; font-size: 14px; color: #333; }
.demo-lhead { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; border-bottom: 3px solid var(--blue); padding-bottom: 18px; margin-bottom: 22px; }
.demo-lbrand { font-weight: 700; font-size: 20px; color: var(--navy); }
.demo-lbrand small { display: block; font-size: 12px; font-weight: 400; color: var(--muted); }
.demo-lmeta { text-align: right; font-size: 13px; color: var(--muted); }
.demo h3 { color: var(--navy); }
.demo-letter h3 { font-size: 20px; margin: 0 0 10px; }
.demo-letter p { margin: 0 0 12px; line-height: 1.6; }
.demo-done { text-align: center; padding: 30px 10px; }
.demo-done svg { width: 56px; height: 56px; color: var(--blue); }
@media (max-width: 860px) {
  .demo-grid { grid-template-columns: minmax(0, 1fr); }
  .demo-preview { position: static; }
  .demo-panel { padding: 20px 16px; }
  .demo-tabs { padding: 8px 8px 0; gap: 0; }
  .demo-tab { font-size: 14px; padding: 10px 8px; gap: 6px; }
  .demo-top { padding: 12px 16px; }
  .demo-letter { padding: 22px 16px; }
  .demo-table thead { display: none; }
  .demo-table tr { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 10px; padding: 10px 0; border-bottom: 1px solid var(--line); }
  .demo-table td { border: 0; padding: 0; }
  .demo-table td:first-child { grid-column: 1 / -1; }
}
`;

const html = `
<div class="demo" id="win-demo" aria-label="Interactive demo of a window and door quotation tool">
  <div class="demo-top"><span class="demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="demo-badge">Demo with sample products and prices. Nothing is sent.</span></div>
  <div class="demo-tabs" role="tablist" aria-label="Demo steps">
    <button class="demo-tab" role="tab" id="wd-t1" aria-controls="wd-p1" aria-selected="true"><span>1</span>Customer</button>
    <button class="demo-tab" role="tab" id="wd-t2" aria-controls="wd-p2" aria-selected="false" tabindex="-1" disabled><span>2</span>Office</button>
    <button class="demo-tab" role="tab" id="wd-t3" aria-controls="wd-p3" aria-selected="false" tabindex="-1" disabled><span>3</span>Proposal</button>
  </div>

  <div class="demo-panel" role="tabpanel" id="wd-p1" aria-labelledby="wd-t1">
    <div class="demo-grid">
      <div>
        <fieldset class="demo-q"><legend>What do you need?</legend><div class="demo-opts" data-k="cat"></div></fieldset>
        <fieldset class="demo-q"><legend>Which type?</legend><div class="demo-opts" data-k="type"></div></fieldset>
        <fieldset class="demo-q"><legend>Material</legend><div class="demo-opts" data-k="mat"></div></fieldset>
        <fieldset class="demo-q"><legend>Style</legend><div class="demo-opts" data-k="style"></div></fieldset>
        <div class="demo-q">
          <div class="demo-row">
            <div><label for="wd-w">Width (mm)</label><input class="demo-in" id="wd-w" type="number" inputmode="numeric" min="300" max="4000" value="1200"></div>
            <div><label for="wd-h">Height (mm)</label><input class="demo-in" id="wd-h" type="number" inputmode="numeric" min="300" max="3000" value="1100"></div>
          </div>
          <p class="demo-err" id="wd-size-err" aria-live="polite"></p>
        </div>
        <fieldset class="demo-q"><legend>Colour</legend><div class="demo-opts" data-k="col"></div></fieldset>
        <fieldset class="demo-q"><legend>Glazing</legend><div class="demo-opts" data-k="glaze"></div></fieldset>
        <div class="demo-q"><label for="wd-room">Where is it going?</label>
          <select class="demo-in" id="wd-room"><option>Living room</option><option>Kitchen</option><option>Bedroom</option><option>Bathroom</option><option>Hallway</option><option>Garden</option></select>
        </div>
      </div>
      <aside class="demo-preview" aria-label="Your selection">
        <h3>Preview</h3>
        <div class="demo-pic" id="wd-pic" aria-hidden="true"></div>
        <ul class="demo-spec" id="wd-spec"></ul>
        <div class="demo-btns"><button type="button" class="btn" id="wd-add">Add to Basket</button></div>
        <div class="demo-basket">
          <h3>Basket</h3>
          <p class="demo-empty" id="wd-empty">Add one or more windows and doors, then send the request.</p>
          <ul class="demo-items" id="wd-items" aria-live="polite"></ul>
          <div><label for="wd-name" style="display:block;margin:0 0 8px;font-weight:700;color:var(--navy);font-size:15px">Your name</label><input class="demo-in" id="wd-name" value="Sarah Thompson" autocomplete="off"></div>
          <div class="demo-btns" style="margin-top:12px"><button type="button" class="btn" id="wd-send" disabled>Send Quote Request</button></div>
        </div>
      </aside>
    </div>
  </div>

  <div class="demo-panel" role="tabpanel" id="wd-p2" aria-labelledby="wd-t2" hidden>
    <div class="demo-inbox"><span aria-hidden="true">1</span><span><b>New quote request</b><span id="wd-from"></span></span></div>
    <p class="demo-hint" style="margin:0 0 14px">Each item arrives with its sizes and options, so nobody has to call back to ask. The prices below are filled in from a sample price list; change any of them and the totals update.</p>
    <table class="demo-table"><thead><tr><th scope="col">Item</th><th scope="col">Room</th><th scope="col">Price (£)</th></tr></thead><tbody id="wd-rows"></tbody></table>
    <div class="demo-tot" id="wd-tot"></div>
    <div class="demo-btns" style="justify-content:flex-end;margin-top:20px"><button type="button" class="btn" id="wd-make">Create Proposal</button></div>
  </div>

  <div class="demo-panel" role="tabpanel" id="wd-p3" aria-labelledby="wd-t3" hidden>
    <div id="wd-letter"></div>
    <div class="demo-btns" style="justify-content:center;margin-top:22px"><button type="button" class="btn btn-soft" id="wd-again">Start Again</button><a class="btn" href="/contact/">Get This Built for You</a></div>
  </div>
</div>`;

const js = `
(function () {
  var root = document.getElementById('win-demo'); if (!root) return;
  var $ = function (id) { return document.getElementById(id); };
  var pane = function (cols, rows, opts) {
    opts = opts || {}; var W = 120, H = opts.tall ? 150 : 110, f = 8, s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="' + (W - 4) + '" height="' + (H - 4) + '" rx="3" fill="var(--c,#fff)" stroke="#060b23" stroke-width="3"/>';
    var iw = (W - 4 - f * 2) / cols, ih = (H - 4 - f * 2) / rows;
    for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) {
      var x = 2 + f + c * iw + 3, y = 2 + f + r * ih + 3;
      s += '<rect x="' + x + '" y="' + y + '" width="' + (iw - 6) + '" height="' + (ih - 6) + '" fill="#cfe3f7" stroke="#060b23" stroke-width="1.5"/>';
      if (opts.open && c === 0) s += '<path d="M' + (x + iw - 6) + ' ' + y + 'L' + x + ' ' + (y + (ih - 6) / 2) + 'L' + (x + iw - 6) + ' ' + (y + ih - 6) + '" fill="none" stroke="#2d4ddb" stroke-width="1.5" stroke-dasharray="4 3"/>';
    }
    return s + '</svg>';
  };
  var data = {
    cat: [['win', 'Windows'], ['door', 'Doors'], ['bay', 'Bay Windows']],
    type: { win: [['casement', 'Casement'], ['tilt', 'Tilt and Turn'], ['sash', 'Sash']], door: [['french', 'French'], ['sliding', 'Sliding'], ['bifold', 'Bifold']], bay: [['bay3', 'Three Pane Bay'], ['bay5', 'Five Pane Bay']] },
    mat: [['pvcu', 'PVCu'], ['alu', 'Aluminium']],
    style: { win: [['1', 'Single', 1, 1, true], ['2', 'Double', 2, 1, true], ['3', 'Triple', 3, 1, true]], door: [['2', 'Two Panels', 2, 1, false], ['3', 'Three Panels', 3, 1, false], ['4', 'Four Panels', 4, 1, false]], bay: [['3', 'Three Lights', 3, 1, true], ['5', 'Five Lights', 5, 1, true]] },
    col: [['white', 'White', '#ffffff'], ['grey', 'Anthracite Grey', '#3b4148'], ['black', 'Black', '#16181c'], ['cream', 'Cream', '#efe6cf'], ['oak', 'Golden Oak', '#a8692d']],
    glaze: [['double', 'Double Glazing'], ['triple', 'Triple Glazing']]
  };
  var rate = { win: 380, door: 620, bay: 540 }, matF = { pvcu: 1, alu: 1.45 }, glazeF = { double: 1, triple: 1.18 }, colF = { white: 1, grey: 1.12, black: 1.12, cream: 1.08, oak: 1.15 };
  var st = { cat: 'win', type: 'casement', mat: 'pvcu', style: '2', col: 'white', glaze: 'double' }, basket = [];
  var name = function (list, k) { for (var i = 0; i < list.length; i++) if (list[i][0] === k) return list[i]; return list[0]; };
  var list = function (k) { return Array.isArray(data[k]) ? data[k] : data[k][st.cat]; };
  var styleSvg = function (s, col) { return pane(s[2], s[3], { open: s[4], tall: st.cat === 'door' }).replace('var(--c,#fff)', col || '#fff'); };
  var gbp = function (n) { return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var size = function () { return { w: parseInt($('wd-w').value, 10) || 0, h: parseInt($('wd-h').value, 10) || 0 }; };
  var sizeOk = function () { var z = size(); return z.w >= 300 && z.w <= 4000 && z.h >= 300 && z.h <= 3000; };
  var label = function (k) { return name(list(k), st[k])[1]; };
  function opts(k) {
    var box = root.querySelector('[data-k="' + k + '"]'), L = list(k);
    if (!name(L, st[k]) || L.map(function (o) { return o[0]; }).indexOf(st[k]) < 0) st[k] = L[0][0];
    box.innerHTML = L.map(function (o) {
      var extra = k === 'style' ? styleSvg(o) : k === 'col' ? '<span class="demo-sw" style="background:' + o[2] + '"></span>' : '';
      return '<button type="button" class="demo-opt" data-v="' + o[0] + '" aria-pressed="' + (o[0] === st[k]) + '">' + extra + o[1] + '</button>';
    }).join('');
  }
  function draw() {
    ['cat', 'type', 'mat', 'style', 'col', 'glaze'].forEach(opts);
    var s = name(list('style'), st.style), c = name(data.col, st.col), z = size();
    $('wd-pic').innerHTML = styleSvg(s, c[2]);
    $('wd-spec').innerHTML = [['Product', label('cat') + ', ' + label('type')], ['Material', label('mat')], ['Style', s[1]], ['Size', z.w + ' x ' + z.h + ' mm'], ['Colour', c[1]], ['Glazing', label('glaze')]].map(function (r) { return '<li><span>' + r[0] + '</span><b>' + r[1] + '</b></li>'; }).join('');
    $('wd-size-err').textContent = sizeOk() ? '' : 'Please enter a width from 300 to 4000 mm and a height from 300 to 3000 mm.';
    $('wd-add').disabled = !sizeOk();
  }
  function drawBasket() {
    $('wd-empty').hidden = basket.length > 0; $('wd-send').disabled = !basket.length;
    $('wd-items').innerHTML = basket.map(function (b, i) { return '<li><span>' + b.title + '<small>' + b.sub + '</small></span><button type="button" class="demo-x" data-i="' + i + '" aria-label="Remove ' + b.title + '">Remove</button></li>'; }).join('');
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.demo-opt'); if (b) { var k = b.parentNode.getAttribute('data-k'); st[k] = b.getAttribute('data-v'); if (k === 'cat') { st.type = data.type[st.cat][0][0]; st.style = data.style[st.cat][1] ? data.style[st.cat][1][0] : data.style[st.cat][0][0]; if (st.cat === 'door') { $('wd-w').value = 1800; $('wd-h').value = 2100; } else { $('wd-w').value = 1200; $('wd-h').value = 1100; } } draw(); return; }
    var x = e.target.closest('.demo-x'); if (x) { basket.splice(+x.getAttribute('data-i'), 1); drawBasket(); }
  });
  ['wd-w', 'wd-h'].forEach(function (id) { $(id).addEventListener('input', draw); });
  $('wd-add').addEventListener('click', function () {
    if (!sizeOk()) return; var z = size(), area = Math.max(z.w * z.h / 1e6, 0.6);
    var price = Math.round(rate[st.cat] * area * matF[st.mat] * glazeF[st.glaze] * colF[st.col] / 5) * 5 + 150;
    basket.push({ title: label('type') + { win: ' Window', door: ' Doors', bay: ' Window' }[st.cat], sub: z.w + ' x ' + z.h + ' mm, ' + label('mat') + ', ' + name(data.col, st.col)[1] + ', ' + label('glaze'), room: $('wd-room').value, price: price });
    drawBasket();
  });
  var tabs = [1, 2, 3].map(function (n) { return $('wd-t' + n); });
  function show(n) {
    tabs.forEach(function (t, i) { var on = i === n - 1; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; $('wd-p' + (i + 1)).hidden = !on; });
    var top = root.getBoundingClientRect().top; if (top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  tabs.forEach(function (t, i) { t.addEventListener('click', function () { if (!t.disabled) show(i + 1); }); t.addEventListener('keydown', function (e) { var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (!d) return; var j = i; do { j = (j + d + 3) % 3; } while (tabs[j].disabled); tabs[j].focus(); show(j + 1); }); });
  var extras = [['Installation', 0], ['Removal and disposal of old frames', 0]];
  function totals() {
    var items = basket.reduce(function (s, b) { return s + b.price; }, 0) + extras.reduce(function (s, x) { return s + x[1]; }, 0);
    var vat = Math.round(items * 0.2 * 100) / 100;
    $('wd-tot').innerHTML = '<div><span>Subtotal</span><span>' + gbp(items) + '</span></div><div><span>VAT (20%)</span><span>' + gbp(vat) + '</span></div><div><span>Total</span><span>' + gbp(items + vat) + '</span></div>';
    return { net: items, vat: vat, total: items + vat };
  }
  function office() {
    extras[0][1] = 120 * basket.length; extras[1][1] = 40 * basket.length;
    $('wd-from').textContent = $('wd-name').value.trim() + ', ' + basket.length + (basket.length === 1 ? ' item' : ' items') + ', sent just now';
    var row = function (t, sub, room, v, i) { return '<tr><td><b>' + t + '</b>' + (sub ? '<br><small>' + sub + '</small>' : '') + '</td><td>' + room + '</td><td><input class="demo-in" type="number" min="0" step="5" value="' + v + '" data-p="' + i + '" aria-label="Price for ' + t + '"></td></tr>'; };
    $('wd-rows').innerHTML = basket.map(function (b, i) { return row(b.title, b.sub, b.room, b.price, 'b' + i); }).join('') + extras.map(function (x, i) { return row(x[0], '', '', x[1], 'x' + i); }).join('');
    totals();
  }
  $('wd-rows').addEventListener('input', function (e) { var p = e.target.getAttribute('data-p'); if (!p) return; var v = Math.max(parseFloat(e.target.value) || 0, 0); if (p[0] === 'b') basket[+p.slice(1)].price = v; else extras[+p.slice(1)][1] = v; totals(); });
  $('wd-send').addEventListener('click', function () { if (!basket.length) return; if (!$('wd-name').value.trim()) $('wd-name').value = 'Sarah Thompson'; tabs[1].disabled = false; office(); show(2); });
  $('wd-make').addEventListener('click', function () {
    var t = totals(), d = new Date(), valid = new Date(d.getTime() + 30 * 864e5), fmt = function (x) { return x.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); };
    var who = $('wd-name').value.trim(), first = who.split(' ')[0];
    var lines = basket.map(function (b) { return '<tr><td><b>' + b.title + '</b><br><small>' + b.sub + ', ' + b.room + '</small></td><td>' + gbp(b.price) + '</td></tr>'; }).join('') + extras.map(function (x) { return '<tr><td>' + x[0] + '</td><td>' + gbp(x[1]) + '</td></tr>'; }).join('');
    $('wd-letter').innerHTML = '<article class="demo-letter" aria-label="Sample proposal letter"><div class="demo-lhead"><div class="demo-lbrand">Your Company Ltd<small>Windows, Doors and Conservatories</small></div><div class="demo-lmeta">Quotation Q-' + (1000 + basket.length * 7 + d.getDate()) + '<br>' + fmt(d) + '</div></div>'
      + '<h3>Your Quotation</h3><p>Dear ' + first + ',</p><p>Thank you for your enquiry. Below is your quotation for the windows and doors you selected, including installation and the removal of your old frames.</p>'
      + '<table class="demo-table"><thead><tr><th scope="col">Description</th><th scope="col">Price</th></tr></thead><tbody>' + lines + '</tbody></table>'
      + '<div class="demo-tot"><div><span>Subtotal</span><span>' + gbp(t.net) + '</span></div><div><span>VAT (20%)</span><span>' + gbp(t.vat) + '</span></div><div><span>Total</span><span>' + gbp(t.total) + '</span></div></div>'
      + '<p style="margin-top:22px">This quotation is valid until ' + fmt(valid) + '. To go ahead, reply to this email and we will book your survey.</p><p>Kind regards,<br>Your Company Ltd</p></article>';
    tabs[2].disabled = false; show(3);
  });
  $('wd-again').addEventListener('click', function () { basket = []; drawBasket(); tabs[1].disabled = true; tabs[2].disabled = true; show(1); });
  draw(); drawBasket();
})();
`;

export const windowsDemo = { css, html, js };
