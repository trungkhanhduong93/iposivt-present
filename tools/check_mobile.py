# -*- coding: utf-8 -*-
"""
Kiểm chế độ xấp trang trên điện thoại: cả bộ dựng thành trang xếp dọc, mỗi trang
giữ nguyên khung 1280×720 thu nhỏ vừa bề ngang, cuộn liên tục như xem PDF.

    python tools/check_mobile.py             # kiểm mọi bộ
    python tools/check_mobile.py shot        # kiểm và lưu ảnh vào tools/shots-mobile/

Chạy ở khổ iPhone 14 (393×852). Đừng chụp bằng full_page của Playwright — trang
có thanh công cụ dính nên ảnh ra trắng phần trên; chụp theo viewport.

Kiểm luôn thanh công cụ điện thoại (menu thả chọn bộ + nút PDF, không còn lưới,
toàn màn hình, phím tắt) và nút PDF: bản in của từng bộ xuất ra đúng mỗi slide một
trang 960×540pt. PDF này do Chrome máy tính dựng — hộp thoại in thật của Android
và iPhone thì script không thay được, phải thử trên máy.
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

# Thanh cong cu: nut nao dang hien, va co nut nao thoi ra ngoai man khong
BAR = """() => {
  const vis = s => { const e = document.querySelector(s); return !!e && e.getBoundingClientRect().width > 0; };
  const out = [...document.querySelectorAll('.bar *')]
    .filter(e => !e.closest('.dsw-list') && e.getBoundingClientRect().width > 0)
    .filter(e => { const r = e.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth + 0.5; })
    .map(e => e.id || String(e.className.baseVal ?? e.className) || e.tagName);
  return {seg: vis('.seg'), grid: vis('#gridBtn'), fs: vis('#fsBtn'), help: vis('#helpBtn'),
          pdf: vis('#pdfBtn'), dsw: vis('#dswBtn'), out};
}"""

MENU = """() => { const its = [...document.querySelectorAll('#dswList .dsw-it')];
  return {open: document.getElementById('dsw').classList.contains('open'), n: its.length,
          names: its.map(i => i.querySelector('b').textContent),
          lot: its.every(i => { const r = i.getBoundingClientRect();
                                return r.left >= 0 && r.right <= innerWidth && r.height >= 44; })}; }"""
MENU_OPEN = "()=>document.getElementById('dsw').classList.contains('open')"

# Chan lenh in that, chi ghi lai la da goi
BAY = "window.__p=0;window.print=new Proxy(window.print,{apply(){window.__p=1}});"

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
    ctx.add_init_script(BAY)
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)

    pg.goto(BASE)
    pg.wait_for_timeout(900)
    TITLE0 = pg.title()

    # ── Thanh cong cu: menu chon bo + so trang + nut PDF. Luoi, toan man hinh,
    # bang phim bo tren dien thoai (Trum 14/09/2026). Tung dinh: nut V3 bi cat mat.
    for w in (393, 360):
        pg.set_viewport_size({'width': w, 'height': 852}); pg.wait_for_timeout(500)
        r = pg.evaluate(BAR)
        print('-- thanh cong cu %dpx --' % w)
        ok('giau nut chon bo kieu may tinh, luoi, toan man hinh, phim tat',
           not any((r['seg'], r['grid'], r['fs'], r['help'])), r)
        ok('hien menu chon bo va nut PDF', r['dsw'] and r['pdf'])
        ok('moi thu tren thanh deu lot man', not r['out'], r['out'])
    pg.set_viewport_size({'width': 393, 'height': 852}); pg.wait_for_timeout(500)

    print('-- menu chon bo --')
    pg.click('#dswBtn'); pg.wait_for_timeout(350)
    m = pg.evaluate(MENU)
    ok('bam la mo menu', m['open'])
    ok('du %d bo trong menu' % len(DECKS), m['n'] == len(DECKS), m['names'])
    ok('muc nao cung lot man va du cao de cham', m['lot'])
    if SHOT:
        pg.screenshot(path=str(OUT / 'menu.png'))
    pg.click('#dswList .dsw-it[data-deck="pro"]'); pg.wait_for_timeout(900)
    ok('chon Pro thi sang bo Pro va dong menu',
       pg.evaluate('()=>document.body.dataset.deck') == 'pro' and not pg.evaluate(MENU_OPEN))
    ok('nut menu doi ten theo bo', pg.inner_text('#dswName') == 'IVT Pro', pg.inner_text('#dswName'))
    for k in [k for k in DECKS if pg.evaluate('(k)=>!!DECKS[k].gated', k)]:
        pg.click('#dswBtn'); pg.wait_for_timeout(300)
        ok('bo %s hien o khoa truoc khi nhap ma' % k,
           pg.is_visible('#dswList .dsw-it[data-deck="%s"] .dsw-lk' % k))
        pg.click('#dswList .dsw-it[data-deck="%s"]' % k); pg.wait_for_timeout(400)
        ok('chon bo %s thi hoi ma' % k,
           pg.evaluate("()=>document.getElementById('pin').classList.contains('open')"))
        pg.evaluate('()=>App.closePin()'); pg.wait_for_timeout(200)
    pg.click('#dswBtn'); pg.wait_for_timeout(300)
    pg.click('#cnt'); pg.wait_for_timeout(300)
    ok('cham ra ngoai thi dong menu', not pg.evaluate(MENU_OPEN))

    # mở khoá bộ nội bộ một lần rồi đổi bộ bằng hash, không tải lại trang
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

        # ── Nut PDF: bo So sanh mo ban goc; bo slide mo ban in, cho anh xong moi
        # cho bam Xuat PDF, va ban in xuat ra dung moi slide mot trang.
        pg.click('#pdfBtn')
        if pg.evaluate('(k)=>!!DECKS[k].page', deck):
            pg.wait_for_timeout(900)
            ok('PDF: mo ban goc', pg.is_visible('#pdfv'))
            ok('PDF: co dong huong dan luu', 'PDF' in pg.inner_text('#pdfTip'),
               pg.inner_text('#pdfTip')[:60])
            if SHOT:
                pg.screenshot(path=str(OUT / ('%s-pdf.png' % deck)))
            pg.click('#pdfClose'); pg.wait_for_timeout(300)
            continue
        try:
            pg.wait_for_function("()=>!document.getElementById('prntSave').disabled", timeout=30000)
            san = True
        except Exception:
            san = False
        tip = pg.inner_text('#prntTip')
        ok('PDF: anh tai xong thi mo nut Xuat PDF', san, tip[:60])
        ok('PDF: dong huong dan chi cach luu', 'Lưu dưới dạng PDF' in tip, tip[:70])
        if SHOT:
            pg.screenshot(path=str(OUT / ('%s-pdf.png' % deck)))
        pg.click('#prntSave'); pg.wait_for_timeout(200)
        name = pg.evaluate('(k)=>DECKS[k].name', deck)
        ok('PDF: bam Xuat PDF thi goi lenh in, ten file theo bo',
           pg.evaluate('()=>window.__p') == 1 and pg.title() == name, pg.title())
        pdf = pg.pdf(prefer_css_page_size=True, print_background=True)
        trang = len(re.findall(rb'/Type\s*/Page\b', pdf))
        kho = re.findall(rb'/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)\s*\]', pdf)
        ok('PDF: moi slide mot trang, du %d trang' % COUNT[deck], trang == COUNT[deck], trang)
        ok('PDF: kho 960x540pt nhu slide 1280x720px',
           kho and all((float(a), float(b)) == (960.0, 540.0) for a, b in kho), kho[:1])
        pg.evaluate('()=>{window.__p=0}')
        pg.click('#prntClose'); pg.wait_for_timeout(300)
        ok('PDF: dong ban in thi tra lai tieu de trang', pg.title() == TITLE0, pg.title())

    ctx.close()

    # Trinh duyet nhung trong Zalo khong in duoc: phai bao mo bang trinh duyet that
    print('-- mo trong Zalo --')
    ctx = browser.new_context(viewport={'width': 393, 'height': 852}, is_mobile=True, has_touch=True,
                              user_agent='Mozilla/5.0 (Linux; Android 13; SM-A536E) AppleWebKit/537.36 '
                                         '(KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36 Zalo android/12345')
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(BASE); pg.wait_for_timeout(900)
    pg.click('#pdfBtn')
    pg.wait_for_function("()=>!document.getElementById('prntSave').disabled", timeout=30000)
    ok('bao mo bang Chrome hoac Safari',
       pg.evaluate("()=>document.getElementById('prntTip').classList.contains('warn')")
       and 'Chrome' in pg.inner_text('#prntTip'), pg.inner_text('#prntTip')[:60])
    ctx.close()
    browser.close()

print('\nloi js:', errs[:5] if errs else 'khong co')
print('=> ' + ('TAT CA PASS' if not fails else 'CO LOI: ' + ', '.join(fails)))
sys.exit(1 if (fails or errs) else 0)
