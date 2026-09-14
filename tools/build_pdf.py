# -*- coding: utf-8 -*-
"""
Dựng sẵn file PDF khổ ngang 16:9 cho các bộ slide (Plus, Pro, V3) vào thư mục pdf/.

    python tools/build_pdf.py            # dựng lại bộ nào nội dung đã đổi
    python tools/build_pdf.py --force    # dựng lại tất cả
    python tools/build_pdf.py --check    # chỉ kiểm PDF có cũ hơn nội dung không (exit 1 nếu cũ)

Vì sao phải làm sẵn: hộp thoại in của điện thoại và Safari trên Mac bỏ qua @page size
1280×720, ép slide vào giữa trang A4 dọc (Trum báo 14/09/2026). Chrome máy tính giữ đúng
khổ, nên dựng bằng Chrome ở đây rồi cho người xem tải file về.

Ba việc làm cho file nhẹ và ổn định:
  · Ảnh WebP không trong suốt được phục vụ dưới dạng JPEG lúc dựng. Chrome nhúng thẳng
    JPEG vào PDF; để WebP thì nó giải nén rồi nén lại không mất dữ liệu — Plus 10,5 MB
    thay vì 5,9 MB. Ảnh trong suốt giữ nguyên.
  · Video được thay bằng khung hình JPEG làm poster, không thì Chrome nhúng khung hình thô.
  · Ngày tạo trong PDF ghim cố định và tắt mọi chuyển động: nội dung không đổi thì dựng
    lại ra đúng từng byte, git không phình.

Bộ nào cũ được xét bằng dấu vân tay đầu vào ghi trong pdf/manifest.json: khối slide của bộ
trong slides-data.js, style.css, app.js, index.html, cả thư mục assets/, và chính script này.
Script còn sinh js/pdf-files.js cho app.js biết đường dẫn và dung lượng từng file.
"""
import io, re, sys, json, hashlib, pathlib, threading, functools, unicodedata
import http.server, socketserver

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUTDIR = ROOT / 'pdf'
MANIFEST = OUTDIR / 'manifest.json'
JSFILE = ROOT / 'js' / 'pdf-files.js'
JPEG_Q = 88
FIXED_DATE = b"D:20260101000000+00'00'"
TEXT_EXT = {'.js', '.css', '.html', '.json', '.py', '.md', '.svg', '.txt'}


def deck_blocks():
    data = (ROOT / 'js' / 'slides-data.js').read_text(encoding='utf-8').replace('\r\n', '\n')
    keys = re.findall(r'^([a-z0-9]+): \{$', data, re.M)
    out = {}
    for i, k in enumerate(keys):
        a = data.index('\n%s: {' % k)
        b = data.index('\n%s: {' % keys[i + 1]) if i + 1 < len(keys) else len(data)
        out[k] = data[a:b]
    return out


def page_decks():
    """Các bộ slide cần PDF làm sẵn. Bộ có page:1 (So sánh) in bản gốc khổ dọc riêng."""
    res = {}
    for k, blk in deck_blocks().items():
        if re.search(r'^\s*page:\s*1', blk, re.M):
            continue
        res[k] = {'name': re.search(r"^\s*name:\s*'([^']+)'", blk, re.M).group(1),
                  'pages': len(re.findall(r'\{ n:\d+,', blk)), 'block': blk}
    return res


def _read_norm(p):
    b = p.read_bytes()
    return b.replace(b'\r\n', b'\n') if p.suffix.lower() in TEXT_EXT else b


def fingerprints():
    h = hashlib.sha256()
    files = [ROOT / 'css' / 'style.css', ROOT / 'js' / 'app.js', ROOT / 'index.html',
             pathlib.Path(__file__).resolve()]
    files += sorted(p for p in (ROOT / 'assets').rglob('*')
                    if p.is_file() and not p.name.startswith('So-sanh'))
    for p in files:
        h.update(p.relative_to(ROOT).as_posix().encode() + b'\0' + _read_norm(p) + b'\0')
    common = h.hexdigest()
    return {k: hashlib.sha256((common + v['block']).encode('utf-8')).hexdigest()[:16]
            for k, v in page_decks().items()}


def slug(name):
    s = unicodedata.normalize('NFKD', name.replace('đ', 'd').replace('Đ', 'D'))
    s = ''.join(ch for ch in s if not unicodedata.combining(ch))
    return re.sub(r'[^A-Za-z0-9]+', '-', s).strip('-')


def load_manifest():
    try:
        return json.loads(MANIFEST.read_text(encoding='utf-8'))
    except FileNotFoundError:
        return {}


def stale():
    """Danh sách bộ có PDF làm sẵn cũ hơn nội dung hoặc thiếu file. Rỗng là khớp."""
    man, bad = load_manifest(), []
    for k, h in fingerprints().items():
        m = man.get(k)
        f = ROOT / m['file'] if m else None
        if not m or m.get('hash') != h or not f.is_file() or f.stat().st_size != m.get('size'):
            bad.append(k)
    return bad


def pdf_info(raw):
    pages = len(re.findall(rb'/Type\s*/Page\b', raw))
    boxes = set(re.findall(rb'/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)\s*\]', raw))
    return pages, boxes


# ── Dựng ─────────────────────────────────────────────────────────────────────
NO_ANIM = '*,*::before,*::after{animation:none!important;transition:none!important}'

OPEN = r"""(k) => {
  for (const d in DECKS) if (DECKS[d].gated) App.gate[d] = true;
  App.setDeck(k);
  document.title = DECKS[k].name;            // thành /Title của file PDF
  App.togglePrint(true);
  return App.key === k ? document.getElementById('prntBody').children.length : -1;
}"""

# Video: lấy đúng khung hình bản in vẫn dùng (giây 0.1) vẽ ra JPEG, gắn làm poster rồi
# gỡ nguồn — thẻ video giữ nguyên nên mọi luật CSS của nó vẫn áp, chỉ đổi thứ được vẽ.
VIDEO = r"""async () => {
  const vs = [...document.querySelectorAll('#prntBody video')];
  for (const v of vs) {
    if (v.readyState < 2) await new Promise(r => { v.addEventListener('loadeddata', r, {once: true}); setTimeout(r, 8000); });
    if (Math.abs(v.currentTime - 0.1) > 0.01) {
      v.currentTime = 0.1;
      await new Promise(r => { v.addEventListener('seeked', r, {once: true}); setTimeout(r, 3000); });
    }
    const c = document.createElement('canvas');
    c.width = v.videoWidth; c.height = v.videoHeight;
    if (!c.width) throw new Error('video khong tai duoc: ' + v.currentSrc);
    c.getContext('2d').drawImage(v, 0, 0);
    v.poster = c.toDataURL('image/jpeg', 0.88);
    v.removeAttribute('src'); v.load();
  }
  return vs.length;
}"""

WAIT = r"""async () => {
  await document.fonts.ready;
  const imgs = [...document.querySelectorAll('#prntBody img')];
  await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  return imgs.filter(i => !i.naturalWidth).map(i => i.getAttribute('src'));
}"""


def serve():
    from PIL import Image
    cache = {}

    class H(http.server.SimpleHTTPRequestHandler):
        extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                          '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
                          '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html'}

        def log_message(self, *a):
            pass

        def do_GET(self):
            path = self.translate_path(self.path.split('?')[0].split('#')[0])
            if path.lower().endswith('.webp') and pathlib.Path(path).is_file():
                if path not in cache:
                    im = Image.open(path)
                    alpha = im.mode in ('RGBA', 'LA', 'PA') or 'transparency' in im.info
                    if alpha and im.convert('RGBA').getchannel('A').getextrema()[0] < 250:
                        cache[path] = None                     # ảnh trong suốt: giữ WebP
                    else:
                        b = io.BytesIO()
                        im.convert('RGB').save(b, 'JPEG', quality=JPEG_Q, optimize=True)
                        cache[path] = b.getvalue()
                if cache[path] is not None:
                    data = cache[path]
                    self.send_response(200)
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', str(len(data)))
                    self.end_headers()
                    self.wfile.write(data)
                    return
            return super().do_GET()

    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(H, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def build(keys, fp, decks, man):
    from playwright.sync_api import sync_playwright
    srv = serve()
    url = 'http://127.0.0.1:%d/index.html' % srv.server_address[1]
    OUTDIR.mkdir(exist_ok=True)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(channel='chrome')
            for k in keys:
                pg = b.new_page(viewport={'width': 1500, 'height': 900})
                errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                pg.goto(url)
                pg.wait_for_timeout(800)
                pg.add_style_tag(content=NO_ANIM)
                n = pg.evaluate(OPEN, k)
                if n != decks[k]['pages']:
                    sys.exit('bo %s: ban in co %s trang, du lieu co %d slide' % (k, n, decks[k]['pages']))
                pg.wait_for_timeout(600)
                nv = pg.evaluate(VIDEO)
                broken = pg.evaluate(WAIT)
                pg.wait_for_timeout(600)
                if broken or errs:
                    sys.exit('bo %s: anh hong %s, loi js %s' % (k, broken[:3], errs[:2]))
                raw = pg.pdf(prefer_css_page_size=True, print_background=True)
                pg.close()

                raw, nd = re.subn(rb"(/(?:CreationDate|ModDate) \()D:\d{14}[^)]*(\))",
                                  lambda m: m.group(1) + FIXED_DATE + m.group(2), raw)
                pages, boxes = pdf_info(raw)
                if pages != decks[k]['pages'] or boxes != {(b'960', b'540')}:
                    sys.exit('bo %s: PDF ra %d trang, kho %s' % (k, pages, boxes))

                f = OUTDIR / (slug(decks[k]['name']) + '.pdf')
                old = man.get(k, {}).get('file')
                if old and old != 'pdf/' + f.name:
                    (ROOT / old).unlink(missing_ok=True)       # đổi tên bộ: bỏ file tên cũ
                same = f.is_file() and f.read_bytes() == raw
                if not same:
                    f.write_bytes(raw)
                man[k] = {'file': 'pdf/' + f.name, 'hash': fp[k], 'pages': pages, 'size': len(raw)}
                print('  %-5s %-28s %2d trang  %.1f MB  video %d  ngay ghim %d  %s' % (
                    k, f.name, pages, len(raw) / 1048576, nv, nd,
                    'giong het ban cu' if same else 'da ghi'))
            b.close()
    finally:
        srv.shutdown()


def write_outputs(man, decks):
    MANIFEST.write_text(json.dumps({k: man[k] for k in decks if k in man}, indent=2,
                                   ensure_ascii=False) + '\n', encoding='utf-8', newline='\n')
    rows = ['  %s: { file: %s, size: %d, pages: %d }' % (
        k, json.dumps(man[k]['file']), man[k]['size'], man[k]['pages']) for k in decks if k in man]
    js = ('/* SINH TỰ ĐỘNG bởi tools/build_pdf.py — đừng sửa tay.\n'
          '   PDF làm sẵn khổ ngang 16:9 của từng bộ slide: nút PDF trên điện thoại và nút\n'
          '   Xuất PDF trong bản in tải thẳng file này. Bộ So sánh không có — bộ đó in bản\n'
          '   gốc khổ dọc. Bản gộp một file bỏ script này nên quay về hộp thoại in. */\n'
          'const PDF_FILES = {\n' + ',\n'.join(rows) + '\n};\n')
    if not JSFILE.is_file() or JSFILE.read_text(encoding='utf-8') != js:
        JSFILE.write_text(js, encoding='utf-8', newline='\n')


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    args = sys.argv[1:]
    if '--check' in args:
        cu = stale()
        print('PDF lam san:', ('CU (%s) -> chay python tools/build_pdf.py' % ', '.join(cu)) if cu
              else 'khop noi dung')
        sys.exit(1 if cu else 0)
    decks, fp, man = page_decks(), fingerprints(), load_manifest()
    for k in [k for k in man if k not in decks]:               # bộ đã bỏ khỏi DECKS
        (ROOT / man.pop(k)['file']).unlink(missing_ok=True)
    todo = list(decks) if '--force' in args else stale()
    if todo:
        print('dung PDF:', ', '.join(todo))
        build(todo, fp, decks, man)
    else:
        print('PDF lam san da khop noi dung, khong phai dung lai')
    write_outputs(man, decks)
    cu = stale()
    print('=> ' + ('XONG' if not cu else 'VAN CON CU: ' + ', '.join(cu)))
    sys.exit(1 if cu else 0)


if __name__ == '__main__':
    main()
