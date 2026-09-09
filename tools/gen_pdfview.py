# -*- coding: utf-8 -*-
"""Goi nguyen van file HTML so sanh thanh mot chuoi JS de nhung vao khung xem.

Vi sao khong tro thang iframe src vao file .html:
  · Mo index.html bang cach bam dup (file://) thi Chrome coi iframe file:// la
    khac nguon, goi contentWindow.print() bi chan -> nut Luu PDF chet.
  · Ban gop mot file (build_bundle.py) khong con thu muc assets de tro toi.
Dat noi dung vao srcdoc thi khung nhung dung nguon voi trang cha, in duoc o ca
hai truong hop, va noi dung van la NGUYEN VAN file goc, khong sua mot chu.
"""
import io, os, sys
sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'assets', 'So-sanh-IVT-Standard-Plus-Pro.html')
DST = os.path.join(ROOT, 'js', 'compare-page.js')

html = io.open(SRC, encoding='utf-8').read()

# Chuoi template JS: chi thoat 3 thu, con lai giu nguyen tung ky tu.
esc = (html.replace('\\', '\\\\')
           .replace('`', '\\`')
           .replace('${', '\\${')
           # </script> nam trong chuoi se dong som the <script> khi build_bundle
           # nhet file nay thang vao index.html.
           .replace('</', '<\\/'))

out = '''/* =============================================================================
   BẢN GỐC "So sánh tính năng Standard · Plus · Pro" — NGUYÊN VĂN

   File này SINH TỰ ĐỘNG bằng tools/gen_pdfview.py từ
   assets/So-sanh-IVT-Standard-Plus-Pro.html. Đừng sửa tay.

   Dùng cho nút PDF trên thanh công cụ: nội dung được nhét vào srcdoc của một
   iframe nên hiển thị y hệt lúc mở file gốc, mà vẫn cùng nguồn với trang cha
   để nút "Lưu PDF" gọi được lệnh in của chính khung đó.
   ========================================================================== */
const COMPARE_PAGE = `%s`;
''' % esc

io.open(DST, 'w', encoding='utf-8', newline='').write(out)
print('js/compare-page.js: %d KB' % (len(out) // 1024))
