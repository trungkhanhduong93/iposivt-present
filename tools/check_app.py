# -*- coding: utf-8 -*-
"""
Kiểm chức năng: điều hướng, lưới slide, lightbox, chuyển bộ, phím X, video,
và quan trọng nhất — không sinh thanh cuộn ở 4 cỡ màn hình.

    python tools/check_app.py
"""
import re, sys, pathlib
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT.joinpath('index.html').as_uri()

data = (ROOT / 'js' / 'slides-data.js').read_text(encoding='utf-8')
seg_plus = data[data.index('plus: {'):data.index('pro: {')]
seg_pro  = data[data.index('pro: {'):]
N_PLUS = len(re.findall(r'\{ n:\d+,', seg_plus))
N_PRO  = len(re.findall(r'\{ n:\d+,', seg_pro))

fails = []
def ok(name, cond, extra=''):
    print(('  OK   ' if cond else '  FAIL ') + name + ('   ' + str(extra) if extra else ''))
    if not cond:
        fails.append(name)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    pg = b.new_page(viewport={'width': 1500, 'height': 900})
    pg.on('pageerror', lambda e: fails.append('PAGEERROR ' + str(e)))
    pg.goto(BASE); pg.wait_for_timeout(600)
    h = lambda: pg.evaluate('()=>location.hash')

    ok('mo mac dinh la bo Plus', pg.evaluate('()=>document.body.dataset.deck') == 'plus')
    pg.keyboard.press('ArrowRight'); pg.wait_for_timeout(300)
    ok('mui ten phai sang slide 2', h() == '#plus-2', h())
    pg.keyboard.press('End'); pg.wait_for_timeout(400)
    ok('End nhay toi slide cuoi', h() == '#plus-%d' % N_PLUS, h())
    pg.keyboard.press('ArrowRight'); pg.wait_for_timeout(250)
    ok('khong vuot qua slide cuoi', h() == '#plus-%d' % N_PLUS)

    pg.keyboard.press('2'); pg.wait_for_timeout(500)
    ok('phim 2 chuyen sang bo Pro',
       pg.evaluate('()=>document.body.dataset.deck') == 'pro' and h() == '#pro-1')

    pg.keyboard.press('Escape'); pg.wait_for_timeout(400)
    n = pg.evaluate('()=>document.querySelectorAll("#gb .t").length')
    ok('Esc mo luoi, du o cho moi slide',
       pg.evaluate('()=>document.getElementById("grid").classList.contains("open")') and n == N_PRO, n)
    pg.click('#gb .t:nth-child(7)'); pg.wait_for_timeout(500)
    ok('bam o thu 7 nhay dung slide', h() == '#pro-7', h())

    pg.keyboard.press('x'); pg.wait_for_timeout(250)
    ok('phim X bat che do danh dau', pg.evaluate('()=>document.body.classList.contains("showx")'))

    # video phai tu chay, lap, tat tieng, khong co thanh dieu khien
    for i in range(1, N_PLUS + 1):
        pg.goto(BASE + '#plus-%d' % i); pg.wait_for_timeout(500)
        v = pg.evaluate("""()=>{const v=document.querySelector('#stage video');
             return v?{paused:v.paused,loop:v.loop,muted:v.muted,controls:v.controls}:null;}""")
        if v:
            ok('video slide %d tu chay va lap' % i,
               not v['paused'] and v['loop'] and v['muted'] and not v['controls'], v)
            break

    # lightbox phai lot khung ca voi anh doc
    pg.goto(BASE + '#plus-10'); pg.wait_for_timeout(700)
    pg.click('#stage img[data-zoom]'); pg.wait_for_timeout(500)
    r = pg.evaluate("""()=>{const i=document.querySelector('#lb img');const b=i.getBoundingClientRect();
         return {w:Math.round(b.width),h:Math.round(b.height),
                 lot:b.width<=innerWidth-80&&b.height<=innerHeight-80};}""")
    ok('anh doc phong to van lot khung', r['lot'], '%dx%d' % (r['w'], r['h']))
    pg.keyboard.press('Escape'); pg.wait_for_timeout(300)
    ok('Esc dong lightbox',
       not pg.evaluate('()=>document.getElementById("lb").classList.contains("open")'))

    for w, hgt in [(1366, 768), (1920, 1080), (1280, 720), (2560, 1440)]:
        pg.set_viewport_size({'width': w, 'height': hgt}); pg.wait_for_timeout(350)
        sc = pg.evaluate("""()=>{const d=document.documentElement;
             return [d.scrollWidth>d.clientWidth, d.scrollHeight>d.clientHeight];}""")
        fit = pg.evaluate("""()=>{const r=document.getElementById('stage').getBoundingClientRect();
             return r.width<=innerWidth+1&&r.height<=innerHeight+1;}""")
        ok('man %dx%d khong scroll, slide lot khung' % (w, hgt), not any(sc) and fit)
    b.close()

print('\n=> ' + ('TAT CA PASS' if not fails else 'CO LOI: ' + ', '.join(map(str, fails))))
sys.exit(1 if fails else 0)
