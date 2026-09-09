# -*- coding: utf-8 -*-
"""
Kiểm cổng mã của bộ nội bộ: bấm nút hay mở link thẳng đều phải hỏi mã, mã sai
thì không vào được, mã đúng thì mở và nhớ trong phiên. Hai bộ kia không bị chặn.

    python tools/check_gate.py

Mã lấy từ biến môi trường IVT_PIN, không ghi vào repo:

    IVT_PIN=<ma> python tools/check_gate.py

Lưu ý: đây là rào cản nhẹ chứ không phải bảo mật — trang tĩnh nên dữ liệu slide
vẫn nằm trong js/slides-data.js, ai xem mã nguồn cũng đọc được. Muốn chặn thật
thì bật Cloudflare Access.
"""
import os, sys, pathlib
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT.joinpath('index.html').as_uri()

# Mã KHÔNG ghi vào repo. Đặt biến môi trường rồi chạy:
#   PowerShell:  $env:IVT_PIN = '...'; python tools/check_gate.py
#   Git Bash:    IVT_PIN=... python tools/check_gate.py
PIN = os.environ.get('IVT_PIN', '')
if not PIN:
    print('Chua dat bien moi truong IVT_PIN — bo qua bo kiem cong ma.')
    print('Cach chay:  IVT_PIN=<ma> python tools/check_gate.py')
    sys.exit(0)

fails = []
def ok(name, cond, extra=''):
    print(('  OK   ' if cond else '  FAIL ') + name + (('   ' + str(extra)) if extra != '' else ''))
    if not cond:
        fails.append(name)

ST = ("()=>({deck:document.body.dataset.deck, hash:location.hash,"
      " open:document.getElementById('pin').classList.contains('open'),"
      " err:document.getElementById('pinErr').textContent})")

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

    ctx = browser.new_context()
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: fails.append('PAGEERROR ' + str(e)))
    pg.goto(BASE); pg.wait_for_timeout(900)

    ok('mo mac dinh van la bo Plus', pg.evaluate(ST)['deck'] == 'plus')

    # hai bo cong khai khong bi chan
    pg.click('#toPro'); pg.wait_for_timeout(500)
    ok('bo Pro vao thang khong hoi ma', pg.evaluate(ST)['deck'] == 'pro')
    pg.click('#toPlus'); pg.wait_for_timeout(400)

    # bam nut bo noi bo -> hien o nhap ma, chua doi bo
    pg.click('#toV3'); pg.wait_for_timeout(500)
    r = pg.evaluate(ST)
    ok('bam bo noi bo thi hoi ma, chua doi bo', r['open'] and r['deck'] == 'plus', r)

    # ma sai -> bao loi, van khong vao
    pg.fill('#pinInput', '12345678')
    pg.click('#pinOk'); pg.wait_for_timeout(600)
    r = pg.evaluate(ST)
    ok('ma sai thi bao loi va van chan', r['open'] and r['deck'] == 'plus' and r['err'], r)

    # ma dung -> vao duoc
    pg.fill('#pinInput', PIN)
    pg.click('#pinOk'); pg.wait_for_timeout(900)
    r = pg.evaluate(ST)
    ok('ma dung thi mo bo noi bo', not r['open'] and r['deck'] == 'v3' and r['hash'] == '#v3-1', r)
    # mo khoa xong phai thay dung bo noi bo, luoi slide du o cho moi trang
    n = pg.evaluate('()=>DECKS.v3.slides.length')
    pg.keyboard.press('Escape'); pg.wait_for_timeout(600)
    cells = pg.evaluate('()=>document.querySelectorAll("#gb .t").length')
    ok('luoi slide bo noi bo du %d o' % n, cells == n, cells)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(400)

    # da mo roi thi chuyen qua lai tu do trong phien
    pg.keyboard.press('1'); pg.wait_for_timeout(500)
    pg.keyboard.press('3'); pg.wait_for_timeout(600)
    r = pg.evaluate(ST)
    ok('mo roi thi phim 3 vao thang', r['deck'] == 'v3' and not r['open'], r)
    ctx.close()

    # tab moi: phai nhap lai
    ctx2 = browser.new_context()
    pg2 = ctx2.new_page()
    pg2.on('pageerror', lambda e: fails.append('PAGEERROR2 ' + str(e)))
    pg2.goto(BASE + '#v3-5'); pg2.wait_for_timeout(1200)
    r = pg2.evaluate(ST)
    ok('mo link thang bo noi bo o phien moi thi hoi ma',
       r['open'] and r['deck'] == 'plus', r)
    pg2.fill('#pinInput', PIN)
    pg2.keyboard.press('Enter'); pg2.wait_for_timeout(900)
    r = pg2.evaluate(ST)
    ok('nhap ma bang phim Enter cung mo duoc', not r['open'] and r['deck'] == 'v3', r)
    ok('vao dung slide da gõ trong link', r['hash'] == '#v3-5', r['hash'])
    ok('bao loi cu duoc xoa sach', r['err'] == '', repr(r['err']))

    # tai lai tab thi phai nhap ma lan nua — ma chi nho trong bo nho trang
    pg2.reload(); pg2.wait_for_timeout(1100)
    r = pg2.evaluate(ST)
    ok('tai lai tab thi hoi ma lan nua', r['open'] and r['deck'] == 'plus', r)
    pg2.fill('#pinInput', PIN)
    pg2.keyboard.press('Enter'); pg2.wait_for_timeout(900)
    r = pg2.evaluate(ST)
    ok('nhap lai thi ve dung slide cu', r['deck'] == 'v3' and r['hash'] == '#v3-5', r)

    # bo cong khai tai lai thi khong hoi gi
    pg2.click('#toPlus'); pg2.wait_for_timeout(500)
    pg2.reload(); pg2.wait_for_timeout(900)
    r = pg2.evaluate(ST)
    ok('bo cong khai tai lai khong hoi ma', not r['open'] and r['deck'] == 'plus', r)
    ctx2.close()
    browser.close()

print('\n=> ' + ('TAT CA PASS' if not fails else 'CO LOI: ' + ', '.join(map(str, fails))))
sys.exit(1 if fails else 0)
