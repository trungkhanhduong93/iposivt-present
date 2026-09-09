# -*- coding: utf-8 -*-
"""Khung xem ban goc (nut PDF): dung noi dung, cung nguon, in dung cua so.

    python tools/check_pdfview.py

Chay ca tren ban thu muc va ban gop mot file — hai moi truong nay khac nhau o
cho quan trong nhat: ban gop khong con thu muc assets de tro toi.
"""
import io, sys, pathlib
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
R = pathlib.Path(__file__).resolve().parent.parent
ok_all = True


def ok(name, cond, note=''):
    global ok_all
    if not cond:
        ok_all = False
    print('  %s   %s   %s' % ('OK ' if cond else 'HONG', name, note))


def run(url, label):
    print('-- %s --' % label)
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome')
        pg = b.new_page(viewport={'width': 1500, 'height': 900})
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url); pg.wait_for_timeout(1000)

        ok('bo Plus khong hien nut PDF', not pg.is_visible('#pdfBtn'))
        pg.click('#toCmp'); pg.wait_for_timeout(600)
        ok('bo So sanh hien nut PDF', pg.is_visible('#pdfBtn'))

        pg.click('#pdfBtn'); pg.wait_for_timeout(1400)
        ok('khung xem mo ra', pg.is_visible('#pdfv'))
        h1 = pg.frame_locator('#pdfFrame').locator('h1').first.inner_text()
        ok('dung tieu de ban goc', 'So sánh tính năng' in h1,
           h1.replace('\n', ' ')[:46])

        info = pg.evaluate("""()=>{const f=document.getElementById('pdfFrame');
          const d=f.contentDocument;
          return {same:!!d, h:d?d.body.scrollHeight:0,
                  wrap:d?!!d.querySelector('.wrap'):false,
                  btn:d?!!d.querySelector('.btn'):false};}""")
        ok('cung nguon nen goi duoc lenh in', info['same'])
        ok('noi dung day du, cuon doc duoc', info['h'] > 3000, '%d px' % info['h'])
        ok('giu nguyen khung .wrap cua ban goc', info['wrap'])
        ok('giu nguyen nut Xuat PDF cua ban goc', info['btn'])

        pg.keyboard.press('Escape'); pg.wait_for_timeout(400)
        ok('Esc dong khung xem', not pg.is_visible('#pdfv'))
        pg.keyboard.press('p'); pg.wait_for_timeout(900)
        ok('phim P mo lai', pg.is_visible('#pdfv'))
        pg.click('#pdfClose'); pg.wait_for_timeout(300)
        ok('nut Dong hoat dong', not pg.is_visible('#pdfv'))

        pg.click('#pdfBtn'); pg.wait_for_timeout(600)
        pg.evaluate("()=>App.setDeck('pro')"); pg.wait_for_timeout(600)
        ok('doi bo thi khung xem tu dong', not pg.is_visible('#pdfv'))
        ok('khong loi js', not errs, str(errs[:2]))
        b.close()


run(R.joinpath('index.html').as_uri(), 'ban thu muc')

# Ban gop mot file khong nam trong git, chay build_bundle.py moi co.
bundle = R / 'iPOS-Inventory-Present.html'
if bundle.is_file():
    run(bundle.as_uri(), 'ban gop mot file')
else:
    print('-- ban gop mot file: chua build, bo qua --')

print('-- doi chieu voi ban goc --')
src = io.open(R / 'assets' / 'So-sanh-IVT-Standard-Plus-Pro.html',
              encoding='utf-8').read()
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': 1400, 'height': 900})
    pg.goto(R.joinpath('index.html').as_uri()); pg.wait_for_timeout(900)
    pg.click('#toCmp'); pg.wait_for_timeout(500)
    pg.click('#pdfBtn'); pg.wait_for_timeout(1200)
    got = pg.evaluate("()=>document.getElementById('pdfFrame').getAttribute('srcdoc')")
    ok('nhung nguyen van, giong tung ky tu', got == src,
       '%d/%d ky tu' % (len(got or ''), len(src)))
    who = pg.evaluate("""()=>{const f=document.getElementById('pdfFrame');let w='';
      f.contentWindow.print=()=>{w='khung nhung'};window.print=()=>{w='trang cha'};
      document.getElementById('pdfSave').click();return w;}""")
    ok('nut Luu PDF in khung nhung, khong in trang cha', who == 'khung nhung', who)
    b.close()

print('\n=> %s' % ('TAT CA PASS' if ok_all else 'CO LOI'))
sys.exit(0 if ok_all else 1)
