# -*- coding: utf-8 -*-
"""
Gộp toàn bộ web-present thành MỘT file .html tự chứa — gửi Telegram / Zalo / mail
là mở được ngay, không cần internet, không cần thư mục assets đi kèm.

    python build_bundle.py                    -> iPOS-Inventory-Present.html (co video)
    python build_bundle.py --no-video         -> nhe hon ~5MB, bo 2 video demo
    python build_bundle.py --deck plus        -> chi bo Plus
    python build_bundle.py --deck pro         -> chi bo Pro
    python build_bundle.py -o D:\\gui-khach.html

Cách hoạt động: đọc index.html rồi thay mọi <link>, <script src>, url(...) trong CSS
và mọi đường dẫn ảnh/video trong slides-data.js bằng data URI base64.
"""
import os, re, sys, base64, argparse, io

ROOT = os.path.dirname(os.path.abspath(__file__))

MIME = {
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
    '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.ico': 'image/x-icon',
}

def read(path, binary=False):
    return open(path, 'rb').read() if binary else io.open(path, encoding='utf-8').read()

def datauri(rel, quiet=False):
    """rel: đường dẫn tương đối so với thư mục web-present."""
    path = os.path.normpath(os.path.join(ROOT, rel))
    if not os.path.isfile(path):
        if not quiet:
            print('  ! thieu file:', rel)
        return None
    ext = os.path.splitext(path)[1].lower()
    mime = MIME.get(ext, 'application/octet-stream')
    return 'data:%s;base64,%s' % (mime, base64.b64encode(read(path, True)).decode('ascii'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('-o', '--out', default=os.path.join(ROOT, 'iPOS-Inventory-Present.html'))
    ap.add_argument('--no-video', action='store_true', help='bo 2 video demo cho nhe file')
    ap.add_argument('--deck', choices=['plus', 'pro', 'v3'], help='chi giu mot bo')
    a = ap.parse_args()

    html = read(os.path.join(ROOT, 'index.html'))
    css  = read(os.path.join(ROOT, 'css', 'style.css'))
    data = read(os.path.join(ROOT, 'js', 'slides-data.js'))
    app  = read(os.path.join(ROOT, 'js', 'app.js'))

    # ── CSS: url(../assets/...) -> data URI ──────────────────────────────────
    def css_url(m):
        raw = m.group(1).strip('\'"')
        if raw.startswith('data:'):
            return m.group(0)
        rel = raw[3:] if raw.startswith('../') else raw
        uri = datauri(rel)
        return 'url(%s)' % uri if uri else m.group(0)
    css = re.sub(r'url\(([^)]+)\)', css_url, css)

    # ── slides-data.js + app.js: 'assets/...' -> data URI ────────────────────
    cache, skipped = {}, []
    def js_asset(m):
        q, rel = m.group(1), m.group(2)
        if a.no_video and rel.lower().endswith(('.mp4', '.mov')):
            skipped.append(rel)
            return q + q                       # chuoi rong -> app tu bo qua
        if rel not in cache:
            cache[rel] = datauri(rel)
        return (q + cache[rel] + q) if cache[rel] else m.group(0)

    # đường dẫn nguyên vẹn trong app.js, vd 'assets/logo-ipos.png'
    pat_full = re.compile(r"(['\"])(assets/[^'\"$`]+?\.[A-Za-z0-9]{2,5})\1")
    app  = pat_full.sub(js_asset, app)
    data = pat_full.sub(js_asset, data)

    # Bảng tra cứu: tên file -> data URI, để app.js tự ghép lúc chạy.
    lookup, total = {}, 0
    # logo và ảnh nằm thẳng trong assets/ — được ghép động kiểu `assets/${s.logo}`
    for fn in sorted(os.listdir(os.path.join(ROOT, 'assets'))):
        if os.path.splitext(fn)[1].lower() in ('.png', '.jpg', '.jpeg', '.svg', '.webp'):
            uri = datauri('assets/' + fn, quiet=True)
            if uri:
                lookup['assets/' + fn] = uri
                total += os.path.getsize(os.path.join(ROOT, 'assets', fn))
    # tự bắt mọi thư mục ảnh trong assets/slides — thêm bộ mới không phải sửa
    sl = os.path.join(ROOT, 'assets', 'slides')
    slide_dirs = sorted('assets/slides/' + d for d in os.listdir(sl)
                        if os.path.isdir(os.path.join(sl, d)))
    for deck_dir in slide_dirs + ['assets/video']:
        d = os.path.join(ROOT, deck_dir.replace('/', os.sep))
        if not os.path.isdir(d):
            continue
        for fn in sorted(os.listdir(d)):
            rel = deck_dir + '/' + fn
            if a.no_video and fn.lower().endswith(('.mp4', '.mov')):
                skipped.append(rel)
                continue
            uri = datauri(rel, quiet=True)
            if uri:
                lookup[rel] = uri
                total += os.path.getsize(os.path.join(d, fn))

    if a.deck:
        drops = [d for d in ('plus', 'pro', 'v3') if d != a.deck]
        lookup = {k: v for k, v in lookup.items()
                  if not any(('/%s/' % d) in k for d in drops)}
        for d in drops:
            data += "\ndelete DECKS['%s'];\n" % d

    import json
    shim = ('<script>window.__ASSETS__=' + json.dumps(lookup) + ';</script>')

    # app.js: mọi src="${X}${Y}" -> tra bảng trước khi dùng. Phải bắt cả dạng ghép
    # trong hàm dựng phụ (framed dùng ${dir}${f}), không riêng ${d.dir}${s.img} —
    # sót dạng đó thì 10 slide có khung máy mất sạch ảnh trong bản gộp.
    app = app.replace(
        "const $  = (s, r) => (r || document).querySelector(s);",
        "const A = window.__ASSETS__ || null;\n"
        "const U = p => (A && A[p]) ? A[p] : p;\n"
        "const $  = (s, r) => (r || document).querySelector(s);")
    app = re.sub(r'(src|poster)="\$\{([A-Za-z_$][\w.$]*)\}\$\{([^}]+)\}"',
                 r'\1="${U(\2 + \3)}"', app)
    app = re.sub(r"d\.dir \+ (s\.imgs\[0\]|s\.img\b)", r"U(d.dir + \1)", app)
    # đường dẫn ghép động trong template literal, vd  src="assets/${s.logo}"
    app = re.sub(r'assets/\$\{([^}]+)\}', r"${U('assets/' + \1)}", app)

    # ── ráp file ─────────────────────────────────────────────────────────────
    html = html.replace('<link rel="stylesheet" href="css/style.css">',
                        '<style>\n' + css + '\n</style>')
    m = re.search(r'<link rel="icon"[^>]*href="(assets/[^"]+)"', html)
    if m:
        fav = datauri(m.group(1), quiet=True)
        if fav:
            html = html.replace('href="%s"' % m.group(1), 'href="%s"' % fav)
    html = html.replace('<script src="js/slides-data.js"></script>',
                        shim + '\n<script>\n' + data + '\n</script>')
    html = html.replace('<script src="js/app.js"></script>',
                        '<script>\n' + app + '\n</script>')

    with io.open(a.out, 'w', encoding='utf-8', newline='') as f:
        f.write(html)

    mb = os.path.getsize(a.out) / 1048576
    print('Da tao: %s  (%.1f MB)' % (a.out, mb))
    print('  - %d file media da nhung, %.1f MB goc' % (len(lookup), total / 1048576))
    if skipped:
        print('  - bo qua %d video (--no-video)' % len(set(skipped)))
    if a.deck:
        print('  - chi giu bo: %s' % a.deck.upper())


if __name__ == '__main__':
    main()
