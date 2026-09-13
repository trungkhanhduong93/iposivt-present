# -*- coding: utf-8 -*-
"""
Tìm bóng đổ bị cắt cụt: phần tử có box-shadow mà một khung cha overflow khác
visible chặn mất phần bóng tràn ra. Bóng bị cắt hiện thành mép thẳng hoặc mảng
xám chữ nhật — nhìn rất giả, và check_slides không bắt được vì box-shadow không
tính vào scrollHeight.

    python tools/check_shadow.py                 # tất cả
    python tools/check_shadow.py v3-8,plus-10    # vài slide
"""
import re, sys, pathlib, json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT.joinpath('index.html').as_uri()

data = (ROOT / 'js' / 'slides-data.js').read_text(encoding='utf-8')
DECKS = re.findall(r'^([a-z0-9]+): \{$', data, re.M)
COUNT = {}
for i, d in enumerate(DECKS):
    a = data.index('\n%s: {' % d)
    b = data.index('\n%s: {' % DECKS[i + 1]) if i + 1 < len(DECKS) else len(data)
    COUNT[d] = len(re.findall(r'\{ n:\d+,', data[a:b]))
targets = sys.argv[1].split(',') if len(sys.argv) > 1 else \
    [f'{d}-{i}' for d in DECKS for i in range(1, COUNT[d] + 1)]

PROBE = r"""() => {
  const stage = document.querySelector('#stage');
  // khung slide 1280x720: tới đó thì dừng, bị cắt ở mép slide là tự nhiên
  const all = [...stage.querySelectorAll('*')];
  const root = all.find(e => e.offsetWidth >= 1270 && e.offsetHeight >= 700) || stage;
  const k = root.getBoundingClientRect().width / root.offsetWidth;
  const RE = /(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8})\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px\s+(-?[\d.]+)px(\s+inset)?/g;
  const alpha = c => { const m = c.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/); return m ? +m[1] : 1; };
  const name = e => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string'
      ? '.' + e.className.trim().split(/\s+/).join('.') : '');
  const out = [];
  for (const e of root.querySelectorAll('*')) {
    const cs = getComputedStyle(e);
    if (cs.boxShadow === 'none' || !e.offsetWidth) continue;
    let reach = {t: 0, b: 0, l: 0, r: 0}, m;
    RE.lastIndex = 0;
    while ((m = RE.exec(cs.boxShadow))) {
      if (m[6] || alpha(m[1]) < 0.08) continue;
      const ox = +m[2], oy = +m[3], bl = +m[4], sp = +m[5];
      reach.t = Math.max(reach.t, bl + sp - oy); reach.b = Math.max(reach.b, bl + sp + oy);
      reach.l = Math.max(reach.l, bl + sp - ox); reach.r = Math.max(reach.r, bl + sp + ox);
    }
    if (Math.max(reach.t, reach.b, reach.l, reach.r) < 8) continue;
    const r = e.getBoundingClientRect();
    const need = {t: r.top - reach.t * k, b: r.bottom + reach.b * k,
                  l: r.left - reach.l * k, r: r.right + reach.r * k};
    for (let a = e.parentElement; a && a !== root && a !== stage; a = a.parentElement) {
      const ac = getComputedStyle(a);
      if (ac.overflowX === 'visible' && ac.overflowY === 'visible') continue;
      // khung to bằng cả slide (.cvd của bìa) là mép slide, ngoài đó không còn gì để hiện
      if (a.offsetWidth >= root.offsetWidth - 2 && a.offsetHeight >= root.offsetHeight - 2) continue;
      const ar = a.getBoundingClientRect();
      const cut = {t: (ar.top - need.t) / k, b: (need.b - ar.bottom) / k,
                   l: (ar.left - need.l) / k, r: (need.r - ar.right) / k};
      // chính phần tử cũng thò ra ngoài khung ở cạnh đó (máy ở bìa, ảnh tràn mép)
      // thì bóng bị cắt cùng với phần tử — cố ý, nhìn vẫn tự nhiên
      const bleed = {t: r.top < ar.top - 1, b: r.bottom > ar.bottom + 1,
                     l: r.left < ar.left - 1, r: r.right > ar.right + 1};
      const sides = Object.entries(cut)
        .filter(([s, v]) => !bleed[s] && v > 10 && v > 0.35 * reach[s])
        .map(([s, v]) => s + ':' + Math.round(v) + '/' + Math.round(reach[s]));
      if (sides.length) {
        out.push({el: name(e), clip: name(a), sides: sides.join(' ')});
        break;
      }
    }
  }
  return out;
}"""

# Khung đã có lớp phủ mờ che đúng mép bị cắt, soi ảnh phóng to không thấy vết.
# Thêm vào đây phải kèm lý do đã nhìn tận mắt.
ALLOW = {
    ('div.art', 'l'),   # .intro .art::before phủ trắng mờ 120px từ mép trái (V3 slide 3)
}

bad = {}
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': 1600, 'height': 900})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(BASE)
    pg.wait_for_timeout(800)
    pg.evaluate("()=>{for (const k in DECKS) if (DECKS[k].gated) App.gate[k] = true;}")
    for t in targets:
        pg.evaluate('(h) => { location.hash = h; }', '#' + t)
        pg.wait_for_timeout(1900)
        r = []
        for x in pg.evaluate(PROBE):
            keep = [s for s in x['sides'].split()
                    if (x['clip'], s.split(':')[0]) not in ALLOW]
            if keep:
                r.append(dict(x, sides=' '.join(keep)))
        if r:
            bad[t] = r
    b.close()

print('da kiem %d slide' % len(targets))
if not bad:
    print('bong bi cat: khong co')
for t, rows in bad.items():
    print('--', t)
    seen = set()
    for x in rows:
        key = (x['el'], x['clip'], x['sides'])
        if key in seen:
            continue
        seen.add(key)
        print('   %s  <- cat boi %s  [%s]' % (x['el'], x['clip'], x['sides']))
print('loi js:', errs or 'khong co')
