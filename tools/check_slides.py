# -*- coding: utf-8 -*-
"""
Render toàn bộ slide bằng Chrome thật, báo slide nào tràn khung và slide nào bị
auto-fit thu nhỏ. Ảnh chụp từng slide lưu vào tools/shots/.

    pip install playwright          (chỉ cần một lần, không cần playwright install)
    python tools/check_slides.py                 # tất cả
    python tools/check_slides.py plus-6,pro-13   # vài slide
"""
import os, re, sys, json, pathlib
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT.joinpath('index.html').as_uri()
OUT  = ROOT / 'tools' / 'shots'
OUT.mkdir(parents=True, exist_ok=True)

# đếm số slide mỗi bộ, tự bắt mọi bộ có trong dữ liệu — thêm bộ mới không phải sửa
data = (ROOT / 'js' / 'slides-data.js').read_text(encoding='utf-8')
DECKS = re.findall(r'^([a-z0-9]+): \{$', data, re.M)
COUNT = {}
for i, d in enumerate(DECKS):
    a = data.index('\n%s: {' % d)
    b = data.index('\n%s: {' % DECKS[i + 1]) if i + 1 < len(DECKS) else len(data)
    COUNT[d] = len(re.findall(r'\{ n:\d+,', data[a:b]))

targets = sys.argv[1].split(',') if len(sys.argv) > 1 else \
    [f'{d}-{i}' for d in DECKS for i in range(1, COUNT[d] + 1)]

PROBE = """() => {
  const over = [];
  document.querySelectorAll('.s-body,[data-fit]').forEach(e => {
    if (e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1)
      over.push(e.className + ' ' + e.scrollWidth + 'x' + e.scrollHeight +
                ' > ' + e.clientWidth + 'x' + e.clientHeight);
  });
  const d = document.documentElement;
  return {
    over,
    zooms: [...document.querySelectorAll('[style*=zoom]')].map(e => e.className + ':' + e.style.zoom),
    pageScroll: d.scrollWidth > d.clientWidth || d.scrollHeight > d.clientHeight,
    broken: [...document.querySelectorAll('#stage img')]
              .filter(i => !i.complete || i.naturalWidth === 0)
              .map(i => (i.getAttribute('src') || '').slice(-38))
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

    pg = browser.new_page(viewport={'width': 1500, 'height': 900})
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)

    # Bộ nội bộ nhớ mã trong bộ nhớ trang nên tải lại là mất. Mở khoá một lần
    # rồi đổi slide bằng hash — không tải lại nên trạng thái giữ nguyên.
    pg.goto(BASE)
    pg.wait_for_timeout(700)

    for t in targets:
        pg.evaluate('(h) => { location.hash = h; }', '#' + t)
        pg.wait_for_timeout(1600)   # chờ hiệu ứng vào slide chạy xong rồi mới đo
        r = pg.evaluate(PROBE)
        notes = []
        if r['over']:       notes.append('TRAN: ' + ' | '.join(r['over']))
        if r['zooms']:      notes.append('bi thu nho: ' + ','.join(r['zooms']))
        if r['pageScroll']: notes.append('SINH THANH CUON')
        if r['broken']:     notes.append('ANH HONG: ' + ','.join(r['broken']))
        if notes:
            problems.append(t)
            print('  %-9s %s' % (t, '  ·  '.join(notes)))
        pg.locator('#stage').screenshot(path=str(OUT / (t + '.png')))
    browser.close()

print('\nda kiem %d slide' % len(targets))
print('van de:', ', '.join(problems) if problems else 'khong co')
print('loi js:', errs[:5] if errs else 'khong co')
sys.exit(1 if (problems or errs) else 0)
