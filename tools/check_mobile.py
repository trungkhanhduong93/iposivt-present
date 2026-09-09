# -*- coding: utf-8 -*-
"""
Rà bố cục dọc trên điện thoại: slide nào tràn ngang, chữ nào nhỏ quá đọc không
nổi, ảnh nào hỏng. Chạy ở khổ iPhone 14 (393×852) vì đó là khổ hẹp phổ biến nhất.

    python tools/check_mobile.py             # rà toàn bộ, không chụp ảnh
    python tools/check_mobile.py shot        # rà và lưu ảnh vào tools/shots-mobile/

Đừng chụp bằng full_page của Playwright — trang có thanh công cụ dính nên ảnh
ra trắng phần trên. Chụp thẳng phần tử #stage.
"""
import os, re, sys, pathlib
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT.joinpath('index.html').as_uri()
OUT = ROOT / 'tools' / 'shots-mobile'
SHOT = len(sys.argv) > 1 and sys.argv[1] == 'shot'
if SHOT:
    OUT.mkdir(parents=True, exist_ok=True)

# đếm số slide thẳng từ dữ liệu, khỏi phải sửa tay mỗi lần thêm slide
data = (ROOT / 'js' / 'slides-data.js').read_text(encoding='utf-8')
seg_plus = data[data.index('plus: {'):data.index('pro: {')]
seg_pro = data[data.index('pro: {'):]
COUNT = {'plus': len(re.findall(r'\{ n:\d+,', seg_plus)),
         'pro': len(re.findall(r'\{ n:\d+,', seg_pro))}

PROBE = """() => {
  const d = document.documentElement, W = d.clientWidth;
  const out = [];
  document.querySelectorAll('#stage *').forEach(e => {
    // hình tròn trang trí là span rỗng, chúng cố ý tràn rồi bị cha cắt — bỏ qua
    if (!e.textContent.trim() && e.tagName !== 'IMG') return;
    const b = e.getBoundingClientRect();
    if (b.width > 0 && (b.right > W + 1 || b.left < -1))
      out.push((e.className || e.tagName).toString().slice(0, 26)
               + ' [' + Math.round(b.left) + '..' + Math.round(b.right) + ']');
  });
  const small = [];
  document.querySelectorAll('#stage p,#stage li,#stage span,#stage small,#stage b')
    .forEach(e => {
      if (!e.textContent.trim()) return;
      const f = parseFloat(getComputedStyle(e).fontSize);
      if (f > 0 && f < 10.5 && e.getBoundingClientRect().height > 0)
        small.push((e.className || e.tagName).toString().slice(0, 18) + ':' + f.toFixed(1));
    });
  return {
    mob: document.body.classList.contains('mob'),
    hScroll: d.scrollWidth > W,
    over: out.slice(0, 4),
    small: [...new Set(small)].slice(0, 4),
    h: Math.round(document.querySelector('#stage .slide').getBoundingClientRect().height),
    broken: [...document.querySelectorAll('#stage img')]
              .filter(i => !i.complete || !i.naturalWidth)
              .map(i => (i.getAttribute('src') || '').slice(-26))
  };
}"""

problems, errs = [], []
with sync_playwright() as p:
    browser = None
    for ch in ('chrome', 'msedge', None):
        try:
            browser = p.chromium.launch(channel=ch) if ch else p.chromium.launch()
            print('trinh duyet:', ch or 'bundled'); break
        except Exception:
            continue
    if not browser:
        sys.exit('khong mo duoc trinh duyet nao')

    ctx = browser.new_context(viewport={'width': 393, 'height': 852},
                              device_scale_factor=2, is_mobile=True, has_touch=True)
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)

    for deck in ('plus', 'pro'):
        for i in range(1, COUNT[deck] + 1):
            t = '%s-%d' % (deck, i)
            pg.goto(BASE + '#' + t)
            pg.wait_for_timeout(560)
            r = pg.evaluate(PROBE)
            notes = []
            if not r['mob']:  notes.append('KHONG VAO BO CUC DOC')
            if r['hScroll']:  notes.append('TRAN NGANG')
            if r['over']:     notes.append('loi ra: ' + ' | '.join(r['over']))
            if r['small']:    notes.append('chu nho: ' + ','.join(r['small']))
            if r['broken']:   notes.append('ANH HONG: ' + ','.join(r['broken']))
            if r['h'] > 3200: notes.append('slide qua dai %dpx' % r['h'])
            if notes:
                problems.append(t)
                print('  %-9s %s' % (t, '  ·  '.join(notes)))
            if SHOT:
                pg.locator('#stage').screenshot(path=str(OUT / (t + '.png')))
    ctx.close()
    browser.close()

print('\nda ra %d slide o bo cuc doc' % (COUNT['plus'] + COUNT['pro']))
print('van de:', ', '.join(problems) if problems else 'khong co')
print('loi js:', errs[:5] if errs else 'khong co')
sys.exit(1 if (problems or errs) else 0)
