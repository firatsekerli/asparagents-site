/**
 * asparagents leads to sheet (Google Apps Script, bound to the asparagents Content Sheet).
 * Receives one row per accepted website form from functions/api/form.js and appends it to the tab "Leads".
 * No personal data arrives here: time, form, page, need, detail, from an ad, referrer site, voice, email status.
 *
 * Set up once (Firat, in the Content Sheet: Extensions > Apps Script):
 * 1. Paste this file, save.
 * 2. Run setup() once and allow it. It creates the "Leads" tab and a random token, and shows the token in the log.
 * 3. Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone". Copy the web app URL.
 * 4. Cloudflare Pages, project asparagents-site, Settings > Variables and Secrets (Production):
 *    LEADS_URL = the web app URL (plain text), LEADS_TOKEN = the token (secret). Then redeploy.
 */
var TAB = 'Leads';
var HEADERS = ['Received (UTC)', 'Form', 'Page', 'Need', 'Detail', 'From ad', 'Referrer', 'Voice', 'Email'];
var KEYS = ['received', 'form', 'page', 'need', 'detail', 'from_ad', 'ref', 'voice', 'email'];

function setup() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('LEADS_TOKEN')) props.setProperty('LEADS_TOKEN', Utilities.getUuid() + Utilities.getUuid().slice(0, 8));
  sheet_();
  Logger.log('LEADS_TOKEN for Cloudflare: ' + props.getProperty('LEADS_TOKEN'));
}

function doPost(e) {
  var token = PropertiesService.getScriptProperties().getProperty('LEADS_TOKEN');
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false }); }
  if (!token || !body || body.token !== token || !body.row) return out_({ ok: false });
  var row = KEYS.map(function (k) {
    var v = String(body.row[k] == null ? '' : body.row[k]).slice(0, 200);
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  });
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { sheet_().appendRow(row); } finally { lock.releaseLock(); }
  return out_({ ok: true });
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
