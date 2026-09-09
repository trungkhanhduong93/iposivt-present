# iPOS Inventory — Web Present (Plus & Pro)

Bộ trình chiếu web thay cho 2 file PowerPoint. Khung 16:9 cố định **1280×720**,
tự scale vừa màn hình, **không bao giờ sinh thanh cuộn**.

| | |
|---|---|
| Bản chạy | **https://iposivt-present.pages.dev** |
| Repo | https://github.com/trungkhanhduong93/iposivt-present |
| Số slide | Plus **28** · Pro **23** |
| Mở tại máy | bấm đúp `index.html` |

Gửi kèm số slide được: `iposivt-present.pages.dev/#pro-13` mở thẳng slide Quy trình kiểm kê.

---

## 1. Nội dung lấy từ đâu

| Bộ | Nguồn gốc |
|---|---|
| **Plus** | `TRAINING IVT LITE - NHAN VIEN.pptx` (26 slide) + phần Trum bổ sung |
| **Pro** | `Demo IVT Pro.pptx` (20 slide) + phần Trum bổ sung |

Chữ trong `js/slides-data.js` là **nguyên văn từ PPTX**, kể cả chữ nằm trong
SmartArt — 33 khối SmartArt đã bóc ra và dựng lại bằng HTML nên zoom vẫn nét.
Tên "IVT Lite" đã đổi thành "iPOS Inventory Plus" theo V3.

**Nguồn tra cứu khi cần đối chiếu nghiệp vụ:**

- Khác biệt Standard / Plus / Pro: file `So-sanh-IVT-Standard-Plus-Pro.html` ở thư mục
  cha. Dữ liệu nằm trong `const DATA = [...]` ngay trong file — 12 phân hệ, ~130 dòng
  tính năng, cờ `st/pl/pr`. **Gitbook không có trang so sánh này.**
- Gitbook Plus (tên cũ Lite): https://iposvni.gitbook.io/ipos-ivt-lite
- Gitbook Pro: https://iposvni.gitbook.io/inventory
- Lấy nguyên văn bằng `curl` vào `<url>/llms.txt` hoặc `<url>/<trang>.md`.
  Đừng dùng công cụ tóm tắt — nó cắt mất chi tiết.

**Nguyên tắc bất di bất dịch:** không tự chế nội dung. Bản do Gemini dựng trước
đây đã bịa 4 câu FAQ, bịa 3 chân dung khách hàng, bịa con số "giảm 2–5% chi phí
NVL", bịa công thức giá vốn — nên phải bỏ hẳn và viết lại từ đầu.

---

## 2. Sửa nội dung

Chỉ đụng **`js/slides-data.js`**. Không cần sửa CSS hay JS.

### Cú pháp trong chuỗi

| Viết | Ra |
|---|---|
| `**chữ**` | **chữ đậm** |
| `~~chữ~~` | chữ cam nhấn (thay cho highlight đỏ trong PPTX) |
| `{{Plus}}` `{{Pro}}` | thẻ badge màu, lấy đúng màu từ logo sản phẩm |
| `<br>` | xuống dòng |

### Cờ đánh dấu

| Cờ | Nghĩa |
|---|---|
| `x:1` trên một item | nội dung do Tukudu viết thêm, chưa có trong PPTX |
| `todo:'...'` trên một slide | ghi chú việc còn phải làm |
| `frame:1` | ảnh chụp thô — CSS vẽ thêm khung máy trắng bo góc |
| `art:1` (slide `value`) | tranh minh hoạ nền trong suốt, bỏ khung và đổ bóng |

Bấm phím **X** khi trình chiếu để hiện viền cam đánh dấu chỗ bổ sung và các ghi
chú `todo`. Duyệt xong thì xoá cờ.

### Thay ảnh

1. Bỏ ảnh vào `assets/slides/plus/` hoặc `assets/slides/pro/`
2. Sửa tên file trong `slides-data.js` (`img:` / `imgs:[...]` / `shots:[...]`)
3. Ctrl+F5 lại trình duyệt

**Ảnh chụp điện thoại phải nén trước khi commit** — xem mục 8.

---

## 3. Các kiểu bố cục slide

Mỗi slide có `type`, ứng với một hàm dựng trong `T = {...}` ở `js/app.js` và một
khối CSS cùng tên trong `css/style.css`.

### Đang dùng

| type | Dùng cho | Trường chính |
|---|---|---|
| `cover` | Bìa. 4 biến thể: `left` (nền tranh, chữ trái), `devices` (chữ chìm + 3 thiết bị), `split` (chữ trái, tranh phải), `pro` (ảnh trên, mục lục dưới) | `variant` `img` `lines` `badge` |
| `agenda` | Mục lục dạng lưới 2 cột | `items[{t,x}]` |
| `cards3` | Thẻ định nghĩa + dải công thức | `cards` `formula` |
| `section` | Slide chuyển mục nền gradient, số cỡ lớn | `num` `title` `lead` |
| `bullets` | Tiêu đề trái + gạch đầu dòng phải, kèm tranh nếu có | `items` `art` `small` |
| `hero` | Ảnh banner trên, chữ dưới | `img` `body` `items` `devices` |
| `heroshots` | Banner dựng bằng HTML từ nhiều ảnh máy | `shots[{f,t}]` `brand` `badge` |
| `imagefull` | Một ảnh chiếm cả slide | `img` |
| `modgrid` | Lưới thẻ phân hệ, span trên 12 cột, mỗi thẻ một màu | `groups[{h,ic,span,c,items}]` |
| `device` | Ảnh máy + danh sách mục + ghi chú | `imgs` `items` `note` `side` `colw` `grid` |
| `video` | Video chạy như ảnh động | `video` `poster` `note` |
| `webshot` | Ảnh chụp màn Web nằm ngang + ghi chú phải | `img` `items` `note` |
| `webgrid` | Khung trình duyệt + điểm nhấn (`dir:'row'` hoặc `'col'`) | `img` `items` `dir` `cols` |
| `pillars` | Thẻ số lớn, số cột linh hoạt | `items[{n,t,c}]` `cols` |
| `value` | Rail 3 giá trị + ảnh minh hoạ | `active` `imgs` `frame` `art` |
| `compare` | Bảng so sánh có tick / x | `cols` `rows[{t,v}]` |
| `profiles` | Chân dung khách hàng + tranh | `items[{t,s,sx}]` `img` |
| `depts` | Lưới bộ phận sử dụng | `items[{h,ic,items}]` |
| `platform` | Máy + khung trình duyệt cạnh nhau | `phone` `web` `badge` `frame` |
| `orderflow` | Sơ đồ tròn + các bước + dải thuật ngữ | `img` `steps` `terms` |
| `production` | Sơ chế / chế biến, 2 cột ảnh | `check` `cols` |
| `twolane` | Hai kho hai đầu, các làn nghiệp vụ ở giữa | `a` `b` `lanes[{h,s,c,steps}]` |
| `pipeline` | Chuỗi bước ngang, giữa các bước có chip | `steps[{t,s,gate,gc,subs}]` `lead` `notes` |
| `costformula` | Công thức phân số cỡ lớn | `label` `value` `eq` `top` `bottom` |
| `trio` | Ba thẻ ảnh máy + mô tả | `items[{f,t,s}]` |
| `qa` | Slide hỏi đáp nền gradient | `num` `title` |
| `thanks` | Trang cảm ơn dựng bằng HTML | `company` `contact` `offices` `more` |

### Còn trong code nhưng deck hiện không dùng

`end` · `flow` · `formula` · `grouplist` · `modules` · `transfer` · `tree`

Giữ lại vì có thể tái dùng. Muốn dọn thì xoá cả hàm dựng trong `app.js` lẫn khối
CSS cùng tên.

### Thêm kiểu mới

1. Viết hàm dựng trong `T = {...}` ở `app.js`
2. Thêm khối CSS **có tiền tố riêng** (xem bẫy ở mục 9)
3. Auto-fit tự lo phần chống tràn

---

## 4. Phím tắt

| Phím | Việc |
|---|---|
| `Space` `PageDown` | hiện thêm một phần; hết phần thì sang slide sau |
| `→` | sang thẳng slide sau, hiện trọn nội dung |
| `←` `PageUp` | slide trước |
| `Home` `End` | slide đầu / cuối |
| `Esc` | mở / đóng lưới slide |
| `F` | toàn màn hình |
| `X` | hiện đánh dấu nội dung bổ sung + ghi chú |
| `1` `2` | chuyển bộ Plus / Pro |
| `?` | bảng phím tắt |

Phím tắt chỉ dùng ở chế độ một slide một màn. Dưới 900px là chế độ xấp trang,
điều hướng bằng cuộn.

Bấm vào ảnh trong slide để phóng to. Bấm vào video để dừng / chạy tiếp.

---

## 5. Hiện dần từng phần khi present

Bấm `Space` để hiện thêm một phần của slide, giống build trong PowerPoint. Hết
phần thì `Space` sang slide sau và dừng ở trạng thái chưa hiện gì, chờ bấm tiếp.
Remote trình chiếu gửi `PageDown` nên cũng đi từng bước.

`→` là lối thoát: nhảy thẳng sang slide sau và hiện trọn nội dung. Mở link, nhảy
từ lưới ESC, đổi bộ, hay lùi bằng `←` cũng hiện trọn — khách tự mở link không bao
giờ thấy slide trống.

Số phần còn lại nằm trong thẻ cam cạnh số slide trên thanh công cụ.

### Slide nào được chia phần

Bảng `RV` trong `js/app.js` khai mỗi loại slide một selector CSS. Các phần tử
khớp selector sẽ hiện lần lượt theo đúng thứ tự trong DOM. Loại không có tên
trong bảng thì hiện trọn một lần: bìa, chuyển mục, ảnh toàn slide, video, hỏi
đáp, cảm ơn, công thức giá vốn, nền tảng.

Hiện có **31 slide** chia phần — Plus 16, Pro 15. Slide chỉ khớp một phần tử thì
bỏ qua, chia phần cho đúng một mục là vô nghĩa.

Muốn kiểu slide mới cũng chia phần thì thêm một dòng vào `RV`, không phải sửa
hàm dựng.

### Ẩn bằng độ mờ, không phải `display:none`

Phần chưa tới lượt vẫn chiếm chỗ trong luồng, chỉ `opacity:0`. Bỏ hẳn khỏi luồng
thì auto-fit đo chiều cao lúc slide còn trống, tưởng vừa khung, tới lúc hiện nốt
là tràn.

`opacity` phải để `!important` — vài selector sẵn có đặc hiệu cao hơn, ví dụ
`.val .rail .r` vốn đặt `opacity:.5` cho mục chưa tới lượt.

---

## 6. Xem trên điện thoại

Dưới **900px** bề ngang, trang chuyển sang **chế độ xấp trang**, xem như trình
đọc PDF: cả bộ dựng sẵn thành trang xếp dọc, mỗi trang giữ nguyên khung
1280×720 thu nhỏ vừa bề ngang màn, cuộn liên tục từ trang đầu tới trang cuối.

Bố cục từng slide **không đổi gì** so với bản máy tính — không dồn cột, không
đổi cỡ chữ. Chữ nhỏ là đúng như xem PDF; muốn đọc kỹ thì phóng bằng hai ngón.

| | |
|---|---|
| Khung mỗi trang | tỉ lệ 16:9, rộng bằng bề ngang màn |
| Tỉ lệ thu nhỏ | biến `--ms` = `innerWidth / 1280`, `app.js` đặt mỗi lần đổi cỡ |
| Ảnh | `loading="lazy"`, tải dần theo tầm nhìn — cả bộ nặng vài MB |
| Hiệu ứng | tắt hết. Không chia phần, không chuyển động, không trượt slide |
| Vuốt ngang | tắt, để không nhầm với cuộn |

`renderPages()` trong `app.js` dựng cả bộ một lần rồi nhớ trong `pagesKey`; đổi
bộ hay đổi chế độ mới dựng lại.

### Trang nào đang đọc

Màn cao chứa gần bốn trang cùng lúc, nên không thể lấy trang nào "đang hiển thị"
— phải lấy trang **chạm mép trên vùng xem**. Bộ theo dõi nằm trong `watchPages()`:
một trình quan sát lo bật tắt video theo tầm nhìn, một trình nghe cuộn cập nhật
số trang, thanh tiến độ và địa chỉ.

Cuộn hết cỡ vẫn còn ba trang cuối nằm dưới mép trên, nên có thêm một nhánh: chạm
đáy tài liệu thì chốt luôn trang cuối, không thì không bao giờ tới được trang 28.

Đây là chỗ duy nhất trong `style.css` được phép sinh thanh cuộn.

---

## 7. Cấu trúc và kiến trúc

```
index.html            khung ứng dụng: thanh công cụ, sân khấu, lưới slide, lightbox
css/style.css         thiết kế — token màu ở :root, mỗi kiểu slide một khối CSS
js/slides-data.js     TOÀN BỘ nội dung — chỗ duy nhất cần sửa khi đổi nội dung
js/app.js             bộ dựng slide + điều hướng + auto-fit chống tràn
assets/slides/plus/   ảnh bộ Plus        assets/slides/pro/  ảnh bộ Pro
assets/video/         video demo         assets/fonts/       Be Vietnam Pro nhúng sẵn
build_bundle.py       gộp thành một file .html tự chứa
tools/                script kiểm tra bằng Playwright
```

### Cách khung hình hoạt động

`.stage` là hộp cứng **1280×720**. `app.js` tính `scale = min(vw/1280, vh/720)` rồi
đặt vào `transform`. Mọi toạ độ trong CSS đều là số tuyệt đối trên khung 1280×720,
không phải đơn vị co giãn — nên bố cục giống hệt nhau ở mọi màn hình.

`.s-body` có chiều cao trống thật là **500px** (hằng số `COL_H` trong `app.js`) sau
khi trừ tiêu đề và padding. Con số này dùng để tính chiều cao khung ảnh.

### Auto-fit

Sau mỗi lần render, `app.js` đo `scrollHeight` của `.s-body` và các phần tử
`[data-fit]`. Nếu tràn thì thu nhỏ dần bằng `zoom` (tối đa 12 bước, mỗi bước 4%).
Chạy 3 lần: ngay lập tức, sau `requestAnimationFrame`, và sau 260ms — để chờ ảnh
với font vào chỗ.

**Slide bị auto-fit thu nhỏ là dấu hiệu bố cục sai, không phải giải pháp.** Thấy
`zoom=0.xx` trong kết quả kiểm tra thì sửa bố cục cho vừa, đừng để auto-fit gánh.

### Chuyển động

Ba lớp chồng lên nhau, tổng một slide dưới 800ms:

1. Cả slide trượt vào — `@keyframes sl`, 340ms, hướng theo biến `--dx`.
2. Điểm nhấn trong khung tự chạy — gạch cam vẽ ra từ trái, ảnh máy và khung
   trình duyệt nảy nhẹ vào chỗ, tiêu đề trồi lên sau một nhịp ngắn.
3. Các phần nội dung hiện dần theo `Space` (mục 5), cách nhau 45ms, trần tổng
   độ trễ 360ms.

Chỗ nào cha đã nằm trong bảng `RV` thì con **không** thêm chuyển động riêng —
nó chạy lúc cha còn đang ẩn nên người xem không thấy gì.

Máy người xem bật giảm chuyển động thì tắt hết, chỉ giữ mờ dần 120ms.

### Khung ảnh chụp máy

Ảnh chụp điện thoại tỉ lệ cố định `1272/2772` (hằng số `SHOT_R`). Hàm `frameH()`
tính chiều cao khung khi có nhiều máy xếp ngang trong một cột:

```
w = (bề ngang cột - (n-1) × gap) / n
h = (w - PAD) / SHOT_R + PAD          // PAD = 12, là viền trắng của khung
```

Nếu `h` lớn hơn chiều cao trống thì **không ép** — để CSS `height:100%` lo, ép vào
sẽ tràn mất phần đầu ảnh.

---

## 8. Ảnh và dung lượng

### Nén ảnh chụp điện thoại trước khi commit

Ảnh gốc 1272×2772 nặng 500–750 KB mỗi cái. Chuẩn dùng trong dự án:

| | |
|---|---|
| Kích thước | **826×1800** |
| Định dạng | JPEG, quality **86**, progressive |
| Kết quả | ~100 KB mỗi ảnh, giảm **80%** |

Vì sao 1800px: trình chiếu toàn màn hình 4K thì stage phóng 3×, ảnh máy cao nhất
trong slide là 488px → cần 1464px. 1800 còn dư.

```python
from PIL import Image
im = Image.open(p).convert('RGB')
w, h = im.size
im.resize((round(w*1800/h), 1800), Image.LANCZOS).save(
    p, quality=86, optimize=True, progressive=True)
```

**Ảnh chụp màn Web giữ nguyên** — độ phân giải gốc (~1813×847) vốn đã sát ngưỡng.

### Dung lượng hiện tại

| | |
|---|---|
| `assets/slides/pro` | 7.5 MB |
| `assets/slides/plus` | 4.8 MB |
| `assets/video` | 3.7 MB |
| Tổng repo | ~17 MB, 74 file |

---

## 9. Bẫy đã trả giá — đọc trước khi sửa CSS

### Trùng tên class — dính 3 lần

Không báo lỗi gì hết, chỉ sai hiển thị nên rất khó lần ra.

| Class | Đụng phải | Hậu quả |
|---|---|---|
| `.lb` | lightbox (`display:none`) | nhãn biến mất không dấu vết |
| `.bar` | thanh công cụ (`flex:0 0 46px`) | gạch phân số dày 46px thay vì 2.5px |
| `.pl` `.tl` | class có sẵn | cả slide render đen thui |

**Luôn grep tên trong `style.css` trước khi đặt.** Mỗi kiểu slide mới phải có tiền
tố riêng: `.twol`, `.pipe`, `.cfm`, `.mgrid`, `.brw`…

### Grid hàng `auto` làm `max-height:100%` của ảnh vô tác dụng — dính 2 lần

Hộp chứa ảnh dùng `display:grid` mà hàng để `auto` thì chiều cao phụ thuộc chính
nội dung → phần trăm không giải được → ảnh tràn ra ngoài. Ảnh ngang thường không
lộ vì bị `max-width` chặn trước, chỉ **ảnh dọc** mới phơi ra.

Sửa: dùng `flex`, hoặc grid có hàng `minmax(0,1fr)`, hoặc đặt `height:100%` rõ ràng.
Ca thứ hai là chính cái lightbox — ảnh điện thoại phóng to tràn khỏi màn hình.

### Chữ hoa tiếng Việt bị cắt dấu chân

`line-height` dưới ~1.2 làm mất dấu nặng và dấu hỏi dưới chân chữ hoa
("TẠI" thành "TAI"). **Tiêu đề in hoa để `line-height` ≥ 1.22** và thêm
`padding-bottom: 2–4px`.

### Badge trong chữ in hoa

`.s-title` có `text-transform:uppercase` biến badge "Plus" thành "PLUS", trong khi
logo là "Plus". Phải đặt `text-transform:none` cho `.tbdg`.

Badge cũng cần cỡ riêng theo ngữ cảnh: `.62em` hợp với tiêu đề lớn, nhưng trong
kicker 11.5px thì teo còn 7px, còn trong đoạn văn thì phá nhịp dòng.

### Khung ảnh nhiều máy phải trừ padding

Công thức tính chiều cao khung mà quên trừ 12px viền trắng thì tổng bề ngang vượt
cột, tràn ngang vài pixel — nhìn rất khó nhận ra.

### Đánh số slide khi chèn slide mới

Đổi `n:X` bằng vòng lặp dễ đụng trúng cả slide vừa thêm, làm số nhảy loạn. Cách
chắc ăn là **gán lại tuần tự theo thứ tự thật trong mảng**:

```python
cnt = [0]
def f(m):
    cnt[0] += 1
    return "{ n:%d," % cnt[0]
txt = re.sub(r"\{ n:\d+,", f, txt)
```

### Grid tự bỏ canh giữa khi item rộng hơn khung — cắt mất 80px

`.stagewrap` từng dùng `place-items:center` với `.stage` cứng 1280px. Cửa sổ hẹp
hơn 1280 thì trình duyệt tự bỏ canh giữa và đẩy item về mép trái, slide lệch sang
phải rồi bị `overflow:hidden` xén. Không báo lỗi, không sinh thanh cuộn, chỉ mất
một dải bên phải.

Dính ở **mọi bề ngang 820–1279px**: iPad dọc, điện thoại xoay ngang, cửa sổ
laptop thu nhỏ. Bộ kiểm cũ chỉ chạy 1280 trở lên nên không bắt được.

Sửa bằng toạ độ thay vì trông vào alignment: `.stage` đặt `position:absolute;
left:50%; top:50%`, còn `app.js` ghép `translate(-50%,-50%)` vào trước `scale`.
Đã thêm cỡ màn `1024×768` vào `check_app.py`.

### Bản gộp mất ảnh vì regex chỉ bắt một dạng ghép đường dẫn

`build_bundle.py` đổi `${d.dir}${s.img}` thành tra bảng, nhưng hàm `framed()`
ghép bằng `${dir}${f}` — biến cục bộ, không phải `d.dir`. Regex trượt, nên **10
slide có khung máy** mất sạch ảnh trong bản gửi rời, còn bản web thì vẫn đủ.

Giờ regex bắt theo thuộc tính `src="${X}${Y}"` và `poster=` nên phủ mọi dạng
ghép. Thêm hàm dựng mới thì không phải nhớ sửa lại.

Bài học: sửa xong nội dung phải **build bản gộp rồi mở thử**, đừng tin bản web
chạy được là bản gộp cũng chạy được.

### Selector con trực tiếp bắt luôn chân slide

`.slide.bare>div` áp cho cả `<div class="s-foot">`, làm chân slide hiện lên ở
trang bìa và bị `flex:1` kéo giãn ra giữa trang. Mọi selector `>div` trên
`.slide` phải loại trừ: `:not(.s-foot):not(.todo)`.

### `complete` của ảnh không đáng tin khi có `loading="lazy"`

Ảnh nằm trong phần tử `display:none` — logo ở chân trang bìa — thì trình duyệt
không tải, `complete` mãi là `false` dù `naturalWidth` đã có. Bộ kiểm bắt theo
`!complete` sẽ báo ảnh hỏng ở trang bìa, tốn một vòng truy tìm.

Tiêu chí đúng: chỉ xét ảnh đang hiện, `offsetWidth > 0 && !naturalWidth`.

### Chụp ảnh kiểm tra đừng dùng `full_page`

Trang có thanh công cụ `position:sticky`. Ảnh `full_page` của Playwright ra
trắng nửa trên, nhìn cứ tưởng slide hỏng — mất một vòng truy tìm vô ích. Chụp
thẳng phần tử: `pg.locator('#stage').screenshot(...)`.

### PowerShell nuốt dấu ngoặc kép

`gh api ... --jq '"..."'` hỏng vì PowerShell ăn mất dấu nháy. Dùng
`ConvertFrom-Json` với pipeline của PowerShell thay cho `--jq`.

---

## 10. Kiểm tra trước khi push

Thư mục `tools/` có 2 script Playwright. Cài một lần:

```bash
pip install playwright
```

Không cần `playwright install` — script dùng Chrome sẵn có trong máy.

| Lệnh | Kiểm gì |
|---|---|
| `python tools/check_slides.py` | render toàn bộ 51 slide, báo slide nào tràn khung, slide nào bị auto-fit thu nhỏ, lỗi console |
| `python tools/check_app.py` | điều hướng, lưới ESC, lightbox, chuyển bộ, phím X, hiện dần từng phần, và **không sinh thanh cuộn ở 6 cỡ màn hình** |
| `python tools/check_mobile.py` | chế độ xấp trang khổ iPhone 14: đủ số trang, tỉ lệ 16:9, không tràn ngang, số trang chạy đúng khi cuộn, ảnh hỏng |

Ảnh chụp từng slide lưu vào `tools/shots/`, xem lại để soi bố cục. Bộ điện thoại
chụp khi thêm tham số: `python tools/check_mobile.py shot` — ảnh vào
`tools/shots-mobile/`.

**Đây là chốt duy nhất giữa code sửa và trang chạy thật.** Các lỗi trong mục 9 đều
do 2 script này bắt được, không phải nhìn mắt thường mà thấy.

---

## 11. Đưa lên mạng

Cloudflare Pages đã nối sẵn với repo. Sửa xong chỉ cần push, khoảng một phút sau
trang tự cập nhật:

```bash
cd "C:\Users\trung.duong\Desktop\IVT\present IVT\web-present"
git add -A && git commit -m "cap nhat noi dung" && git push
```

Ba điều cần nhớ:

- **Chỉ nhánh `main` mới lên link chính.** Nhánh khác ra bản xem trước ở URL riêng.
- **Ctrl+F5 lần đầu mở lại**, không thì trình duyệt còn giữ bản cũ trong cache.
- **Trang là public.** Ai có link đều xem được, Google index được. Muốn chặn thì
  bật Cloudflare Access (Zero Trust, bản free cho 50 user).

### Rà trước khi push nội dung mới

Repo public nghĩa là ảnh nằm trên internet vĩnh viễn. Ảnh chụp màn hình hay lộ
email, số điện thoại, tên khách thật. Ba ảnh Trợ lý iOne từng hiện email cá nhân ở
đầu màn hình, đã che thành "Demo Pro" trước khi push.

Cấu hình Pages nếu phải tạo lại: Framework preset **None**, Build command **để
trống**, Build output directory **`/`**. Cloudflare gộp Workers với Pages làm một
chỗ và đẩy mặc định sang luồng Workers — luồng Workers có ô "Deploy command", còn
luồng Pages đúng thì có ô "Build output directory".

---

## 12. Xuất một file để gửi rời

Dùng khi người nhận không có mạng. Có link web rồi thì gửi link tiện hơn.

```bash
python build_bundle.py
```

Ra `iPOS-Inventory-Present.html` (~22 MB) — nhúng cả font, ảnh, video dưới dạng
base64, mở là chạy, không cần thư mục `assets`.

```bash
python build_bundle.py --no-video          # nhẹ hơn nhiều, bỏ 2 video demo
python build_bundle.py --deck pro          # chỉ xuất bộ Pro
python build_bundle.py -o "D:\gui-khach.html"
```

File này **không đi theo git** (`.gitignore` loại nó) vì mỗi lần build là một bản
22 MB mới, commit vào sẽ phình repo rất nhanh. Nó cũng là bản chụp tại thời điểm
build, sửa nội dung xong phải chạy lại.
