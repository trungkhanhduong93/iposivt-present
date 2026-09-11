# -*- coding: utf-8 -*-
"""Sinh bo slide 'So sanh tinh nang' tu file HTML goc, chen vao slides-data.js."""
import io, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

# Ban goc de trong repo de chay lai duoc o may khac, khong tro ra Desktop.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'So-sanh-IVT-Standard-Plus-Pro.html')
DST = os.path.join(ROOT, 'js', 'slides-data.js')

# ── Đọc dữ liệu gốc ──────────────────────────────────────────────────────
src = io.open(SRC, encoding='utf-8').read()
blk = src[src.index('const DATA = ['):]
blk = blk[:blk.index('\n];')]

flat = []
for ln in blk.splitlines():
    ln = ln.strip()
    if not ln.startswith('{t:'):
        continue
    t = re.search(r"t:'(\w)'", ln).group(1)
    name = re.search(r"name:'(.*?)'\s*,\s*(?:d:|st:)|name:'(.*?)'\s*\}", ln)
    name = (name.group(1) or name.group(2)) if name else \
        re.search(r"name:'(.*?)'", ln).group(1)
    code = re.search(r"c:'([^']*)'", ln)
    code = code.group(1) if code else ''
    if t == 's':
        flat.append({'k': 's', 'no': re.search(r"no:'([^']*)'", ln).group(1), 'name': name})
    elif t == 'g':
        flat.append({'k': 'g', 'c': code, 'name': name})
    else:
        d = re.search(r"d:\[(.*?)\]", ln)
        det = [x.strip().strip("'") for x in d.group(1).split("','")] if d else []
        v = [int(re.search(k + r':(\d)', ln).group(1)) for k in ('st', 'pl', 'pr')]
        flat.append({'k': 'i', 'c': code, 'name': name, 'd': det, 'v': v})

# ── Gắn mỗi mục với phân hệ và nhóm con của nó ───────────────────────────
sec = grp = None
for r in flat:
    if r['k'] == 's':
        sec = r; grp = None
    elif r['k'] == 'g':
        grp = r
    else:
        r['sec'] = sec; r['grp'] = grp

items = [r for r in flat if r['k'] == 'i']
byc = {r['c']: r for r in items}


def pick(*specs):
    """Chọn mục theo tiền tố mã hoặc khoảng mã, giữ nguyên thứ tự gốc."""
    out = []
    for r in items:
        for sp in specs:
            if isinstance(sp, tuple):
                if sp[0] <= r['c'] <= sp[1]:
                    out.append(r); break
            elif r['c'].startswith(sp):
                out.append(r); break
    return out


def esc(t):
    return t.replace('\\', '\\\\').replace("'", "\\'")


def rows_js(rows, ind='      '):
    out, last = [], None
    for r in rows:
        g = r['grp'] or r['sec']
        if g is not last:
            last = g
            lbl = ('%s · %s' % (g['no'], g['name'])) if g['k'] == 's' else g['name']
            out.append("%s{ g:'%s' }," % (ind, esc(lbl)))
        d = ' · '.join(r['d'])
        out.append("%s{ c:'%s', t:'%s',%s v:[%s] }," % (
            ind, r['c'], esc(r['name']),
            (" d:'%s'," % esc(d)) if d else '',
            ','.join(str(x) for x in r['v'])))
    return '\n'.join(out).rstrip(',')


# ── Chia slide: mỗi slide một khối nghiệp vụ đọc liền mạch ───────────────
TABLES = [
    ('Thiết lập', 'THIẾT LẬP', ['1.'],
     'Gói {{Standard}} không mở phân hệ Thiết lập. Sáu mục đầu có từ {{Plus}}; nợ đầu kỳ khách hàng, nợ đầu kỳ nội bộ, nhân viên, chức vụ và kế hoạch tự động là phần riêng của {{Pro}}.'),
    ('Danh mục — phần 1', 'DANH MỤC HÀNG HOÁ VÀ CÔNG THỨC', [('2.01', '2.09')],
     'Công thức chế biến mở từ {{Plus}}; sơ chế bán thành phẩm và định mức biến thiên chỉ có trên {{Pro}}.'),
    ('Danh mục — phần 2', 'DANH MỤC ĐỐI TÁC VÀ KHO', [('2.10', '2.17')],
     'Bảng giá mở từ {{Plus}}. Khách hàng, nhượng quyền, mẫu đặt hàng và quản lý lô date là phần riêng của {{Pro}}.'),
    ('Đặt hàng · Sơ chế · Chế biến', 'ĐẶT HÀNG, SƠ CHẾ VÀ CHẾ BIẾN', ['3.', '4.', '5.'],
     'Trọn ba phân hệ này chỉ có trên {{Pro}} — đây là phần khác biệt lớn nhất giữa Pro và hai gói còn lại.'),
    ('Xuất kho', 'PHÂN HỆ XUẤT KHO', ['6.'],
     'Xuất bán POS có ở cả ba gói. Trả lại nhà cung cấp, xuất huỷ và xuất khác mở từ {{Plus}}; điều chuyển nội bộ thì cần {{Pro}}.'),
    ('Nhập kho · Kiểm kê', 'NHẬP KHO VÀ KIỂM KÊ', ['7.', '8.'],
     'Nhập mua hàng và kiểm kê là nghiệp vụ nền, gói nào cũng có. Nhập điều chuyển và thu hồi đi kèm phân hệ nội bộ của {{Pro}}.'),
    ('Công nợ · Nhượng quyền · Kế toán', 'CÔNG NỢ, NHƯỢNG QUYỀN VÀ KẾ TOÁN', ['9.', '10.', '11.'],
     'Công nợ nhà cung cấp và tính giá vốn có ở cả ba gói. Khoá sổ kho mở từ {{Plus}}.'),
    ('Báo cáo quản trị kho — phần 1', 'BÁO CÁO QUẢN TRỊ KHO', [('12.01.01', '12.01.08')],
     'Bảy báo cáo đầu là bộ tối thiểu để vận hành kho, gói nào cũng có. Báo cáo hao hụt nguyên vật liệu mở từ {{Plus}}.'),
    ('Báo cáo quản trị kho — phần 2', 'BÁO CÁO MUA, BÁN VÀ TRẢ HÀNG', [('12.01.09', '12.01.15')],
     'Báo cáo bán hàng và trả hàng đi kèm phân hệ xuất bán của {{Pro}}.'),
    ('Báo cáo đặt hàng · sản xuất', 'BÁO CÁO ĐẶT HÀNG VÀ SẢN XUẤT', ['12.02', '12.03'],
     'Tám báo cáo này bám theo phân hệ đặt hàng, sơ chế và chế biến nên chỉ có trên {{Pro}}.'),
    ('Báo cáo giá thành · công nợ · phân tích', 'BÁO CÁO GIÁ THÀNH, CÔNG NỢ VÀ PHÂN TÍCH',
     ['12.04', '12.05', '12.06'],
     'Giá thành sản phẩm và công nợ nhà cung cấp mở từ {{Plus}}. Nhóm phân tích nhà cung cấp và nguyên vật liệu là phần riêng của {{Pro}}.'),
    ('Báo cáo đối soát · kiểm soát', 'BÁO CÁO ĐỐI SOÁT VÀ KIỂM SOÁT', ['12.07', '12.08'],
     'Năm báo cáo đối soát với KTV, iACC và lịch sử sửa chứng từ có ở cả ba gói.'),
]

# kiểm mọi mục đều được xếp vào đúng một slide
seen = {}
for _, _, sp, _ in TABLES:
    for r in pick(*sp):
        seen[r['c']] = seen.get(r['c'], 0) + 1
miss = [r['c'] for r in items if seen.get(r['c'], 0) != 1]
if miss:
    raise SystemExit('mục bị sót hoặc lặp: %s' % miss)

tot = {i: sum(r['v'][i] for r in items) for i in range(3)}
print('tong %d muc — Standard %d, Plus %d, Pro %d' % (len(items), tot[0], tot[1], tot[2]))

# ── Dựng chuỗi JS ────────────────────────────────────────────────────────
out = ["""
/* ══════════════════════════════════════════════════════════════════════════
   SO SÁNH TÍNH NĂNG — công khai, không cần mã
   Nguồn: "So-sanh-IVT-Standard-Plus-Pro.html" (bảng đối chiếu 99 tính năng).
   FILE NÀY SINH TỰ ĐỘNG phần bộ so sánh — sửa nội dung thì sửa ở
   tools/gen_compare.py rồi chạy lại, đừng sửa tay ở đây.
   Chia slide theo khối nghiệp vụ; khối nào cao quá khung 500px thì bộ sinh tự
   cắt tiếp thành "phần 1, phần 2" để chữ khỏi bị auto-fit thu nhỏ.
   ══════════════════════════════════════════════════════════════════════════ */
cmp: {
  id: 'cmp',
  name: 'So sánh tính năng',
  short: 'SO SÁNH',
  tagline: 'Standard · Plus · Pro — 99 tính năng theo từng phân hệ',
  /* Bộ này có bản gốc dạng cuộn dọc — cờ này bật nút PDF trên thanh công cụ */
  page: 1,
  dir: 'assets/slides/plus/',
  vdir: 'assets/video/',
  slides: [

  /* 1 ─ Bìa: dựng bằng HTML, không dùng ảnh chụp ------------------------- */
  { n:1, type:'cover', variant:'matrix',
    kicker:'BẢNG SO SÁNH TÍNH NĂNG',
    lines:['SO SÁNH TÍNH NĂNG','STANDARD · PLUS · PRO'],
    lead:'Danh sách đầy đủ tính năng theo từng phân hệ của phần mềm iPOS Inventory.',
    packs:[
      { k:'st', logo:'logo-ivt-standard.png', n:'%d',
        t:'Nghiệp vụ kho cơ bản: mua hàng, bán POS, kiểm kê' },
      { k:'pl', logo:'logo-ivt-plus.png',     n:'%d',
        t:'Mở rộng: công thức chế biến, giá thành, hao hụt' },
      { k:'pr', logo:'logo-ivt-pro.png',      n:'%d',
        t:'Đầy đủ toàn bộ phân hệ và báo cáo' }
    ] },

  /* 2 ─ Ba gói có gì, kèm cách đọc bảng ---------------------------------- */
  { n:2, type:'mxsum',
    crumb:['SO SÁNH TÍNH NĂNG','Ba gói'],
    title:'BA GÓI, MỘT PHẦN MỀM',
    sub:'Cùng một hệ thống, khác nhau ở số phân hệ được mở.',
    total:'%d tính năng',
    packs:[
      { k:'st', logo:'logo-ivt-standard.png', n:'%d',
        tag:'TÍNH NĂNG KHO **FREE**',
        t:'Miễn phí cho toàn bộ khách hàng.',
        li:['Nhập mua',
            'Công nợ nhà cung cấp',
            'Kho hàng bán thẳng: tồn kho, kiểm kê'] },
      { k:'pl', logo:'logo-ivt-plus.png', n:'%d',
        tag:'BAO GỒM TÍNH NĂNG **IVT Lite** CŨ',
        t:'Gồm trọn gói Standard, cộng thêm %d tính năng:',
        li:['Trừ kho theo định lượng',
            'Kho nguyên liệu và hàng hoá',
            'Quản lý giá vốn',
            'Quản lý hàng hỏng huỷ',
            'Trợ lý iOne bản cơ bản'] },
      { k:'pr', logo:'logo-ivt-pro.png', n:'%d',
        tag:'BAO GỒM TÍNH NĂNG **IVT Pro** HIỆN TẠI',
        t:'Gồm trọn gói Plus, cộng thêm %d tính năng:',
        li:['Điều chuyển hàng giữa các kho',
            'Đặt hàng nhà cung cấp, kho tổng, bếp trung tâm',
            'Quản lý sản xuất: sơ chế và chế biến',
            'Bán hàng và công nợ khách hàng, nội bộ',
            'Vận hành nhượng quyền',
            'Trợ lý iOne bản nâng cao'] }
    ],
    legend:[
      { k:'st', t:'Cột xám là gói **Standard**' },
      { k:'pl', t:'Cột xanh là gói **Plus**' },
      { k:'pr', t:'Cột vàng là gói **Pro**' },
      { k:'no', t:'Dấu tích là có, gạch ngang là không có' }
    ] },
"""
      # Thứ tự phải khớp đúng từng %d trong khuôn ở trên: ba số ở bìa, tổng số
      # mục, rồi từng thẻ gói — số tính năng của gói đứng TRƯỚC dòng chênh lệch.
      % (tot[0], tot[1], tot[2], len(items),
         tot[0],
         tot[1], tot[1] - tot[0],
         tot[2], tot[2] - tot[1])]

# Chiều cao ước lượng của một dòng, khớp với style.css: dòng thường 34px,
# thêm 17px cho mỗi dòng mô tả bị xuống hàng (một hàng chứa ~95 ký tự).
BUDGET = 442          # 500px trống trừ dòng ghi chú cuối slide
HD, GR = 42, 30


def row_h(r):
    d = ' · '.join(r['d'])
    return 34 + (17 * (len(d) // 95 + 1) if d else 0)


def pack(rows, limit):
    """Xếp dòng vào slide theo thứ tự, đầy tới ngưỡng thì sang slide mới."""
    out, cur, h, grp = [], [], HD, None
    for r in rows:
        g = r['grp'] or r['sec']
        add = row_h(r) + (GR if g is not grp else 0)
        if cur and h + add > limit:
            out.append(cur); cur, h, grp = [], HD, None
            add = row_h(r) + GR
        cur.append(r); h += add; grp = g
    if cur:
        out.append(cur)
    return out


def chunk(rows):
    """Cắt thành slide không tràn khung, và chia đều thay vì dồn hết lên đầu.

    Xếp tham lam cho ra số slide tối thiểu, nhưng slide cuối hay còn trơ một
    hai dòng. Nên sau đó hạ dần ngưỡng: ngưỡng thấp nhất mà vẫn giữ nguyên số
    slide chính là cách chia đều nhất.
    """
    parts = pack(rows, BUDGET)
    k = len(parts)
    for limit in range(BUDGET - 4, HD, -4):
        p = pack(rows, limit)
        if len(p) != k:
            break
        parts = p
    return parts


n = 2
for crumb2, title, sp, note in TABLES:
    parts = chunk(pick(*sp))
    for k, rows in enumerate(parts, 1):
        n += 1
        sfx = (' — phần %d' % k) if len(parts) > 1 else ''
        SFX = (' — PHẦN %d' % k) if len(parts) > 1 else ''
        out.append("""
  /* %d ─ %s */
  { n:%d, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','%s'],
    title:'%s',
    rows:[
%s
    ],
    note:'%s' },
""" % (n, crumb2 + sfx, n, esc(crumb2 + sfx), esc(title + SFX),
       rows_js(rows), esc(note)))

n += 1
out.append("""
  /* %d ─ Gợi ý chọn gói ------------------------------------------------- */
  { n:%d, type:'mxsum',
    crumb:['SO SÁNH TÍNH NĂNG','Chọn gói'],
    title:'CHỌN GÓI NÀO?',
    sub:'Chọn theo cách vận hành thật của cửa hàng, không chọn theo số tính năng.',
    total:'%d tính năng',
    packs:[
      { k:'st', logo:'logo-ivt-standard.png', n:'%d',
        t:'Một điểm bán, mua hàng và bán POS là chính.',
        li:['Chưa cần công thức chế biến',
            'Chỉ cần biết tồn kho và giá vốn',
            'Kiểm kê định kỳ, đối soát với kế toán'] },
      { k:'pl', logo:'logo-ivt-plus.png', n:'%d',
        t:'Có bếp, cần tính giá thành và theo dõi hao hụt.',
        li:['Món có công thức, cần định lượng nguyên liệu',
            'Muốn biết hao hụt và tỷ lệ trả hàng',
            'Có bảng giá riêng cho từng nhóm hàng'] },
      { k:'pr', logo:'logo-ivt-pro.png', n:'%d',
        t:'Chuỗi nhiều điểm bán, có kho tổng, có nhượng quyền.',
        li:['Điều chuyển nội bộ và công nợ giữa các chi nhánh',
            'Quy trình đặt hàng, sơ chế, chế biến đầy đủ',
            'Cần trọn bộ báo cáo phân tích và đối soát'] }
    ] },
""" % (n, n, len(items), tot[0], tot[1], tot[2]))

n += 1
out.append("""
  /* %d ─ Cảm ơn ---------------------------------------------------------- */
  { n:%d, type:'thanks',
    title:'Thank you!',
    company:'iPOS.vn Joint Stock Company',
    contact:['Tel: 1900 4766','www.iPOS.vn'],
    offices:[
      { city:'TP Hà Nội',      addr:'Tầng 11, Tòa tháp Hòa Bình, 106 Hoàng Quốc Việt, P. Nghĩa Đô, Q. Cầu Giấy' },
      { city:'TP Đà Nẵng',     addr:'Số 80 Núi Thành, phường Hòa Thuận Đông, quận Hải Châu, Thành phố Đà Nẵng' },
      { city:'TP Hồ Chí Minh', addr:'Tầng 12, Tòa nhà Lottery Tower, 77 Trần Nhân Tôn, Phường 9, Quận 5' }
    ],
    more:{ h:'iPOS.vn Offices:',
           t:'Quang Ninh, Hai Phong, Bac Ninh, Thanh Hoa, Nghe An, Hue, Khanh Hoa, Dak Lak, Dong Nai, Binh Duong, Vung Tau, Can Tho' } }

  ]
},
""" % (n, n))

deck = ''.join(out)
print('so slide: %d' % n)

# ── Chèn vào giữa bộ Pro và bộ V3 ────────────────────────────────────────
dst = io.open(DST, encoding='utf-8').read()
# Cho chen la ngay truoc khoi chu thich cua bo V3. Bam vao TEN BO chu dung bam
# vao dong chu thich: sua mot chu trong chu thich la script gay ngay.
BAR = '/* \u2550\u2550\u2550'


def truoc_bo(txt, ten):
    """Vi tri dau khoi chu thich dung ngay truoc `ten: {`."""
    k = txt.index('\n%s: {' % ten)
    m = txt.rfind(BAR, 0, k)
    assert m > 0, 'khong thay khoi chu thich cua bo ' + ten
    return m


# Chay lai lan hai phai xoa ban cu di, khong thi DECKS co hai khoi cmp chong nhau.
if '\ncmp: {' in dst:
    dst = dst[:truoc_bo(dst, 'cmp')] + dst[truoc_bo(dst, 'v3'):]
    print('da xoa ban cmp cu')

k = truoc_bo(dst, 'v3')
dst = dst[:k] + deck.lstrip('\n') + '\n' + dst[k:]
io.open(DST, 'w', encoding='utf-8', newline='').write(dst)
print('slides-data.js: chen bo so sanh truoc bo V3')
