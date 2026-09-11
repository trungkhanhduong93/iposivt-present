# -*- coding: utf-8 -*-
"""
Kiểm chế độ xấp trang trên điện thoại: cả bộ dựng thành trang xếp dọc, mỗi trang
giữ nguyên khung 1280×720 thu nhỏ vừa bề ngang, cuộn liên tục như xem PDF.

    python tools/check_mobile.py             # kiểm cả hai bộ
    python tools/check_mobile.py shot        # kiểm và lưu ảnh vào tools/shots-mobile/

Chạy ở khổ iPhone 14 (393×852). Đừng chụp bằng full_page của Playwright — trang
có thanh công cụ dính nên ảnh ra trắng phần trên; chụp theo viewport.
"""
import re, sys, pathlib
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT.joinpath('index.html').as_uri()
OUT = ROOT / 'tools' / 'shots-mobile'
SHOT = len(sys.argv) > 1 and sys.argv[1] == 'shot'
if SHOT:
    OUT.mkdir(parents=True, exist_ok=True)

# đếm số slide mỗi bộ, tự bắt mọi bộ có trong dữ liệu — thêm bộ mới không phải sửa
data = (ROOT / 'js' / 'slides-data.js').read_text(encoding='utf-8')
DECKS = re.findall(r'^([a-z0-9]+): \{$', data, re.M)
COUNT = {}
for i, d in enumerate(DECKS):
    a = data.index('\n%s: {' % d)
    b = data.index('\n%s: {' % DECKS[i + 1]) if i + 1 < len(DECKS) else len(data)
    COUNT[d] = len(re.findall(r'\{ n:\d+,', data[a:b]))

INFO = """() => {
  const pages = [...document.querySelectorAll('#stage .page')];
  const d = document.documentElement;
  const b = pages[0] ? pages[0].getBoundingClientRect() : null;
  const sl = pages[0] ? pages[0].querySelector('.slide') : null;
  return {
    mob: document.body.classList.contains('mob'),
    n: pages.length,
    w: b ? Math.round(b.width) : 0,
    ratio: b ? +(b.width / b.height).toFixed(3) : 0,
    slideW: sl ? sl.offsetWidth : 0,
    slideH: sl ? sl.offsetHeight : 0,
    anim: sl ? getComputedStyle(sl).animationName : '-',
    hScroll: d.scrollWidth > d.clientWidth,
    docH: d.scrollHeight
  };
}"""

# Chi tinh anh dang hien. Anh trong phan tu an (logo chan trang bia) khong duoc
# trinh duyet tai khi de loading=lazy nen complete van false — do khong phai loi.
BROKEN = """() => [...document.querySelectorAll('#stage .page')].map((p, k) => {
  const bad = [...p.querySelectorAll('img')]
    .filter(i => i.offsetWidth > 0 && !i.naturalWidth)
    .map(i => (i.getAttribute('src') || '').slice(-26));
  return bad.length ? (k + 1) + ': ' + bad.join(',') : null;
}).filter(Boolean)"""

fails, errs = [], []
def ok(name, cond, extra=''):
    print(('  OK   ' if cond else '  FAIL ') + name + (('   ' + str(extra)) if extra != '' else ''))
    if not cond:
        fails.append(name)

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

    # mở khoá bộ nội bộ một lần rồi đổi bộ bằng hash, không tải lại trang
    pg.goto(BASE)
    pg.wait_for_timeout(900)
    pg.evaluate("()=>{for (const k in DECKS) if (DECKS[k].gated) App.gate[k] = true;}")

    for deck in DECKS:
        pg.evaluate('(h) => { location.hash = h; }', '#%s-1' % deck)
        pg.wait_for_timeout(2200)
        r = pg.evaluate(INFO)
        print('-- bo %s --' % deck.upper())
        ok('vao che do xap trang', r['mob'])
        ok('dung du %d trang' % COUNT[deck], r['n'] == COUNT[deck], r['n'])
        ok('trang rong bang be ngang man', r['w'] == 393, r['w'])
        ok('trang giu ti le 16:9', abs(r['ratio'] - 16 / 9) < 0.02, r['ratio'])
        ok('noi dung giu nguyen khung 1280x720',
           r['slideW'] == 1280 and r['slideH'] == 720, (r['slideW'], r['slideH']))
        ok('khong tran ngang', not r['hScroll'])
        ok('khong con hieu ung', r['anim'] in ('none', ''), r['anim'])

        # cuon het bo de anh lazy tai va so trang chay dung
        step = pg.evaluate("()=>document.querySelector('#stage .page').offsetHeight + 9")
        for k in range(COUNT[deck]):
            pg.evaluate('(y)=>window.scrollTo(0,y)', int(step * k))
            pg.wait_for_timeout(260)
            if SHOT and k % 4 == 0:
                pg.screenshot(path=str(OUT / ('%s-%02d.png' % (deck, k + 1))))
        pg.wait_for_timeout(700)
        last = pg.evaluate('()=>App.i + 1')
        ok('cuon toi cuoi thi so trang chay dung', last == COUNT[deck], last)
        bad = pg.evaluate(BROKEN)
        ok('khong trang nao hong anh', not bad, bad)

    ctx.close()
    browser.close()

print('\nloi js:', errs[:5] if errs else 'khong co')
print('=> ' + ('TAT CA PASS' if not fails else 'CO LOI: ' + ', '.join(fails)))
sys.exit(1 if (fails or errs) else 0)
