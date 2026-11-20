// Cloudflare Pages Function: POST /api/form
// Sends form submissions to info@asparagents.com through the Resend email API (copy of the asparajans.com function).
// Required environment variables (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY  secret, from resend.com (the sending domain must be verified there)
//   FORM_FROM       e.g. "asparagents website <form@asparajans.com>" (asparajans.com is already verified)
//   FORM_TO         optional, defaults to info@asparagents.com
// Until RESEND_API_KEY is set the endpoint answers 503 and the page tells the visitor to email or WhatsApp instead.
// Abuse protection: origin/size checks and spam filters below, plus a Cloudflare rate-limiting rule on
// POST /api/form (Security > WAF > Rate limiting rules) that blocks an IP sending too many requests.

const LABELS = { quote: 'Quote request (asparagents)', partner: 'Agency partner request (asparagents)', iletisim: 'Contact form (asparagents)' };
const FIELDS = [
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['website', 'Website'],
  ['sector', 'Service'],
  ['message', 'Message'],
  ['page', 'Page'],
];

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const clean = (v, max = 2000) => String(v ?? '').replace(/\u0000/g, '').trim().slice(0, max);
const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Only our own pages may post to this endpoint (live domain, www, and Cloudflare Pages previews).
const ALLOWED_HOSTS = /^(www\.)?asparagents\.com$|^([a-z0-9-]+\.)?asparagents-site\.pages\.dev$/;
const MAX_BODY = 4500000; // bytes; a text submission is under 5 KB, a 2-minute voice message (WAV) about 3.9 MB
const MAX_AUDIO = 4200000; // base64 characters

// Voice messages from all forms (recorded with MediaRecorder in assets/js/site.js and converted there to WAV, which
// every mail app can play; the recorded formats are the fallback if a browser cannot convert).
// Only these formats are accepted, and the file's first bytes must match the format,
// so nothing but real audio can be attached to the email. File names use Istanbul time (UTC+3, no DST).
const AUDIO = {
  'audio/wav': { ext: 'wav', ok: (b) => String.fromCharCode(b[0], b[1], b[2], b[3]) === 'RIFF' && String.fromCharCode(b[8], b[9], b[10], b[11]) === 'WAVE' },
  'audio/webm': { ext: 'webm', ok: (b) => b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3 },
  'audio/ogg': { ext: 'ogg', ok: (b) => String.fromCharCode(b[0], b[1], b[2], b[3]) === 'OggS' },
  'audio/mp4': { ext: 'm4a', ok: (b) => String.fromCharCode(b[4], b[5], b[6], b[7]) === 'ftyp' },
};
const readAudio = (data) => {
  if (data.audio == null || data.audio === '') return { none: true };
  const audio = typeof data.audio === 'string' ? data.audio : '';
  const fmt = AUDIO[String(data.audio_type || '').split(';')[0].trim().toLowerCase()];
  if (!fmt || audio.length < 16 || audio.length > MAX_AUDIO || audio.length % 4 !== 0) return null;
  let head;
  try {
    head = Array.from(atob(audio.slice(0, 16)), (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
  if (!fmt.ok(head)) return null;
  const seconds = Math.max(0, Math.min(600, Math.round(Number(data.audio_seconds) || 0)));
  return { content: audio, ext: fmt.ext, seconds };
};
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// Spam is answered with a normal "ok" so bots cannot tell they were filtered.
const silentOk = () => json(200, { ok: true });

const hostOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

const looksLikeSpam = (v) => {
  const links = (v.message.match(/https?:\/\/|www\./gi) || []).length;
  if (links > 2) return true; // link dumps
  if (/https?:\/\/|www\./i.test(v.name + v.company)) return true; // URLs in the name or company field
  if (/<a\s|\[url=|\[link=/i.test(v.message)) return true; // HTML or BBCode links
  return false;
};

export async function onRequestPost({ request, env }) {
  // Cheap checks before reading the body: same-site origin, JSON, sensible size.
  const origin = hostOf(request.headers.get('Origin') || request.headers.get('Referer') || '');
  if (!ALLOWED_HOSTS.test(origin)) return json(403, { error: 'forbidden' });
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return json(415, { error: 'unsupported' });
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) return json(413, { error: 'too_large' });

  let data;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) return json(413, { error: 'too_large' });
    data = JSON.parse(raw);
  } catch {
    return json(400, { error: 'bad_request' });
  }
  if (!data || typeof data !== 'object') return json(400, { error: 'bad_request' });

  // Bot guards: the hidden field must be empty, and a human needs more than 3 seconds
  // (and less than a day) between opening the page and sending the form.
  const elapsed = Number(data.elapsed);
  if (clean(data.fax) || !(elapsed >= 3000 && elapsed < 86400000)) return silentOk();

  const form = LABELS[data.form] ? data.form : 'iletisim';
  const v = Object.fromEntries(FIELDS.map(([k]) => [k, clean(data[k], k === 'message' ? 4000 : 300)]));
  if (!v.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) || data.privacy !== '1') return json(422, { error: 'invalid' });
  const voice = readAudio(data);
  if (!voice) return json(422, { error: 'invalid_audio' });
  if (form === 'iletisim' && !v.message && voice.none) return json(422, { error: 'invalid' }); // a message or a recording
  if (looksLikeSpam(v)) return silentOk();

  if (!env.RESEND_API_KEY || !env.FORM_FROM) return json(503, { error: 'not_configured' });

  const rows = FIELDS.filter(([k]) => v[k]).map(([k, label]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td style="padding:4px 0">${escHtml(v[k]).replace(/\n/g, '<br>')}</td></tr>`).join('');
  let text = FIELDS.filter(([k]) => v[k]).map(([k, label]) => `${label}: ${v[k]}`).join('\n');
  let voiceRow = '';
  const attachments = [];
  if (!voice.none) {
    const len = voice.seconds ? ` (${mmss(voice.seconds)})` : '';
    voiceRow = `<tr><td style="padding:4px 12px 4px 0;color:#666">Voice message</td><td style="padding:4px 0"><b>Attached${len}</b></td></tr>`;
    text += `\nVoice message: attached${len}`;
    const stamp = new Date(Date.now() + 3 * 3600000).toISOString().slice(0, 16).replace(/[-:]/g, '').replace('T', '-');
    attachments.push({ filename: `voice-message-${stamp}.${voice.ext}`, content: voice.content });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.FORM_FROM,
      to: [env.FORM_TO || 'info@asparagents.com'],
      reply_to: v.email,
      subject: `${LABELS[form]}${voice.none ? '' : ' (voice message)'}: ${v.company || v.name}`,
      html: `<h2 style="font-family:sans-serif">${LABELS[form]}</h2><table style="font-family:sans-serif;font-size:14px">${rows}${voiceRow}</table>`,
      text,
      ...(attachments.length ? { attachments } : {}),
    }),
  });

  if (!res.ok) return json(502, { error: 'send_failed' });
  return json(200, { ok: true });
}

export const onRequest = () => json(405, { error: 'method_not_allowed' });
