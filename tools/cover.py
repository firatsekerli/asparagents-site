"""Turn one cover image (from Canva) into the files a blog post needs.

Run from the repo root:  python3 tools/cover.py <source image> <base> [output folder]
(articles: python3 tools/cover.py content/articles/<slug>/cover.jpg cover-<slug>)
Writes, from a square-cropped copy of the source:
  assets/img/<base>-420.webp ... <base>-1200.webp  (widths in WIDTHS, at most MAX_BPP bytes per pixel)
  assets/img/og-<base>.jpg                          (1200x630 social preview, centre crop)
and prints the `image` and `ogImage` values (the build finds the files by name, nothing to paste).
"""
import io
import json
import os
import sys

from PIL import Image

IMG = os.path.join(os.path.dirname(__file__), '..', 'assets', 'img')
WIDTHS = [420, 520, 640, 760, 900, 1200]
MAX_BPP = 0.15
MIN_Q, MAX_Q = 50, 85


def encode(im, budget_bytes):
    best, lo, hi = None, MIN_Q, MAX_Q
    while lo <= hi:  # highest quality that fits the byte budget
        q = (lo + hi) // 2
        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=q, method=6)
        if buf.tell() <= budget_bytes:
            best, lo = buf.getvalue(), q + 1
        else:
            hi = q - 1
    if best is None:
        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=MIN_Q, method=6)
        best = buf.getvalue()
    return best


def main():
    if len(sys.argv) not in (3, 4):
        sys.exit(__doc__)
    src, base = sys.argv[1], sys.argv[2]
    out = sys.argv[3] if len(sys.argv) == 4 else IMG
    if not base.replace('-', '').isalnum() or base != base.lower():
        sys.exit('base must be lowercase letters, digits and hyphens, e.g. "web-sitesi-maliyeti"')
    im = Image.open(src).convert('RGB')
    side = min(im.width, im.height)
    left, top = (im.width - side) // 2, (im.height - side) // 2
    square = im.crop((left, top, left + side, top + side))
    if side < WIDTHS[-1]:
        square = square.resize((WIDTHS[-1], WIDTHS[-1]), Image.LANCZOS)
    for w in WIDTHS:
        small = square.resize((w, w), Image.LANCZOS)
        data = encode(small, int(w * w * MAX_BPP))
        with open(os.path.join(out, f'{base}-{w}.webp'), 'wb') as f:
            f.write(data)
    # Social preview: 1200x630 from the middle of the original.
    ratio = 1200 / 630
    if im.width / im.height > ratio:
        h, w = im.height, int(im.height * ratio)
    else:
        w, h = im.width, int(im.width / ratio)
    l, t = (im.width - w) // 2, (im.height - h) // 2
    og = im.crop((l, t, l + w, t + h)).resize((1200, 630), Image.LANCZOS)
    og.save(os.path.join(out, f'og-{base}.jpg'), 'JPEG', quality=82, optimize=True, progressive=True)
    print(json.dumps({
        'image': {'base': base, 'widths': WIDTHS, 'w': 1200, 'h': 1200, 'alt': '<describe the image>'},
        'ogImage': f'/assets/img/og-{base}.jpg',
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
