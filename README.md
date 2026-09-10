# iPOS Inventory — Web Present (Plus · Pro · So sánh · V3)

Bộ trình chiếu web thay cho các file PowerPoint. Khung 16:9 cố định **1280×720**,
tự scale vừa màn hình, **không bao giờ sinh thanh cuộn**.

| |
|---|---|
| Bản chạy | **https://iposivt-present.pages.dev** |
| Repo | https://github.com/trungkhanhduong93/iposivt-present |
| Số slide | Plus **28** · Pro **23** · So sánh tính năng **18** · Cập nhật Inventory V3 **23** |
| Mở tại máy | bấm đúp `index.html` |

Gửi kèm số slide được: `iposivt-present.pages.dev/#pro-13` mở thẳng slide Quy trình kiểm kê.

---

## 1. Nội dung lấy từ đâu

| Bộ | Nguồn gốc |
|---|---|
| **Plus** | `TRAINING IVT LITE - NHAN VIEN.pptx` (26 slide) + phần Trum bổ sung |
| **Pro** | `Demo IVT Pro.pptx` (20 slide) + phần Trum bổ sung |
| **So sánh tính năng** | `assets/So-sanh-IVT-Standard-Plus-Pro.html` — bảng đối chiếu 99 tính năng. Sửa số liệu thì sửa mảng `DATA` trong file đó, cả bộ slide lẫn bản gốc đều đọc từ đấy |
| **Cập nhật Inventory V3** | bài giới thiệu nội bộ `IVT V3 Introduction` (09/04/2026), bổ sung nội dung từ bản `iPOS-Inventory-3.0` của sếp (10/09/2026) |

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

### Dòng dẫn đầu slide

Mọi slide nội dung đều mở đầu bằng một dòng dẫn theo đúng một mẫu:

```
TÊN PHÂN HỆ iPOS INVENTORY {{Plus}} › Nhóm nghiệp vụ › Nền tảng
```

Khai bằng `crumb` dạng mảng, mục đầu **luôn** là tên phân hệ kèm thẻ sản phẩm:

```js
crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Quản lý kho','Tại App'],
title:'DANH MỤC',
```

Tiêu đề là **tên nghiệp vụ của riêng slide đó**, không lặp lại tên sản phẩm —
tên sản phẩm đã nằm ở dòng dẫn rồi. Hai slide cùng nghiệp vụ mà khác nền tảng
thì trùng tiêu đề, phân biệt bằng mục cuối `Tại App` / `Tại Web`.

Đừng để mục cuối của dòng dẫn trùng tiêu đề. Gặp ca đó thì lấy tên nhóm rộng
hơn: slide Công nợ dùng `Quản trị dòng tiền`, slide Cấu hình chuyên sâu dùng
`Thiết lập nâng cao`.

Hàm `kick()` trong `app.js` dựng dòng dẫn cho **mọi** kiểu slide theo thứ tự ưu
tiên: `crumb` mảng, rồi `kicker` một dòng, cuối cùng là nhãn mặc định của kiểu
slide. Thêm kiểu mới thì gọi `kick(s, 'nhãn mặc định')`, đừng viết chuỗi cứng.

Ba loại slide đứng ngoài mẫu này vì không thuộc nhánh chức năng nào: slide
chuyển mục và slide mở đầu phần dùng `PHẦN 0X`, slide chi tiết giá trị dùng
`GIÁ TRỊ 0X / 03`, còn bìa và trang cảm ơn không có dòng dẫn.

### Thay ảnh

1. Bỏ ảnh vào `assets/slides/plus/` hoặc `assets/slides/pro/`
2. Sửa tên file trong `slides-data.js` (`img:` / `imgs:[...]` / `shots:[...]`)
3. Ctrl+F5 lại trình duyệt

**Ảnh chụp điện thoại phải nén trước khi commit** — xem mục 9.

---

## 3. Các kiểu bố cục slide

Mỗi slide có `type`, ứng với một hàm dựng trong `T = {...}` ở `js/app.js` và một
khối CSS cùng tên trong `css/style.css`.

### Đang dùng

| type | Dùng cho | Trường chính |
|---|---|---|
| `cover` | Bìa. 5 biến thể: `left` (nền tranh, chữ trái), `devices` (chữ chìm + 3 thiết bị), `split` (chữ trái, tranh phải), `pro` (ảnh trên, mục lục dưới), `matrix` (chữ trái, ba thẻ gói phải, không dùng ảnh) | `variant` `img` `lines` `badge` `packs` |
| `matrix` | Bảng đối chiếu tính năng ba gói, có dòng tên phân hệ xen giữa | `rows[{c,t,d,v}]` `rows[{g}]` `note` |
| `mxsum` | Ba thẻ gói kèm thanh độ phủ, dùng cho trang mở và trang chọn gói | `packs` `total` `legend` |
| `agenda` | Mục lục dạng lưới 2 cột | `items[{t,x}]` |
| `cards3` | Thẻ định nghĩa + dải công thức | `cards` `formula` |
| `section` | Slide chuyển mục nền gradient, số cỡ lớn | `num` `title` `lead` |
| `bullets` | Tiêu đề trái + gạch đầu dòng phải, kèm tranh nếu có | `items` `art` `small` |
| `hero` | Ảnh banner trên, chữ dưới | `img` `body` `items` `devices` `frame` |
| `heroshots` | Banner dựng bằng HTML từ nhiều ảnh máy | `shots[{f,t}]` `brand` `badge` |
| `imagefull` | Một ảnh chiếm cả slide | `img` |
| `modgrid` | Lưới thẻ phân hệ, span trên 12 cột, mỗi thẻ một màu | `groups[{h,ic,span,c,items}]` |
| `device` | Ảnh máy + danh sách mục + ghi chú | `imgs` `items` `note` `side` `colw` `grid` |
| `video` | Video chạy như ảnh động | `video` `poster` `note` |
| `webshot` | Ảnh chụp màn Web nằm ngang + ghi chú phải | `img` `items` `note` `frame` |
| `packs` | Ba thẻ gói kèm logo sản phẩm + hai thẻ lưu ý bên dưới | `packs[{logo,from,to,c}]` `notes[{h,ic,items}]` |
| `intro` | Mở đầu một phần: chữ trái, ảnh lệch phải trên nền màu | `kicker` `title` `lead` `chips` `note` `img` |
| `webgrid` | Khung trình duyệt + điểm nhấn (`dir:'row'` hoặc `'col'`) | `img` `items` `dir` `cols` |
| `pillars` | Thẻ số lớn, số cột linh hoạt | `items[{n,t,c}]` `cols` `fit` |
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

### Ảnh ngang thì đừng nhét vào khung dọc

`webgrid dir:'col'` xếp ảnh trên, điểm nhấn dưới. Ảnh chụp màn Web tỉ lệ khoảng
2:1 vào đó sẽ co lại rất nhỏ và để trống hẳn hai bên — đã phải sửa bốn slide vì
lỗi này. Ảnh ngang thì dùng `webshot frame:1`: ảnh chiếm cột trái rộng, ghi chú
dồn cột phải 320px.

`webgrid dir:'col'` chỉ hợp khi ảnh **cao** hoặc gần vuông.

### Ảnh chụp màn Web thì bọc khung trình duyệt

`frame:1` trên `hero`, `webshot` hay dùng `webgrid` sẽ bọc ảnh trong khung
`.brw` — thanh ba chấm tròn ở trên, bo góc, đổ bóng. Ảnh chụp thô dán thẳng vào
slide trông như ảnh minh hoạ tạm; qua khung thì ra dáng sản phẩm.

Trong khung, ảnh phải để **flex co vừa** phần còn lại:

```css
.wg.col .brw{display:flex;flex-direction:column;min-height:0}
.wg.col .brw img{flex:1;min-height:0;object-fit:contain}
```

`max-height` theo phần trăm không ăn ở đây, ảnh sẽ phóng full bề ngang rồi bị
khung cắt mất đáy — đã dính một lần ở slide Quay lại bản cũ.

### Thêm kiểu mới

1. Viết hàm dựng trong `T = {...}` ở `app.js`
2. Thêm khối CSS **có tiền tố riêng** (xem bẫy ở mục 10)
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
| `1` `2` `3` `4` | chuyển bộ Plus / Pro / So sánh / Cập nhật Inventory V3 |
| `P` | bản in dạng cuộn dọc, mỗi slide một trang |
| `P` | mở bản gốc dạng cuộn dọc (chỉ có ở bộ So sánh) |
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

| |
|---|---|
| Khung mỗi trang | tỉ lệ 16:9, rộng bằng bề ngang màn |
| Tỉ lệ thu nhỏ | biến `--ms` = `innerWidth / 1280`, đặt vào `zoom`, `app.js` cập nhật mỗi lần đổi cỡ |
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

## 7. Bộ Cập nhật Inventory V3

Bộ thứ tư dựng từ bài giới thiệu nội bộ về phiên bản V3. Nó **có cả phần chính
sách bán hàng, KPI và hoa hồng**.

### Đã gỡ cổng mã — 10/09/2026

Trước đây bộ này khoá bằng mã PIN: cờ `gated: 1` trên bộ, băm SHA-256 trong
`app.js`, hộp nhập mã `#pin`, và `tools/check_gate.py`. **Đã gỡ sạch cả bốn thứ.**

Lý do Trum chốt: đã có nút PDF, sale xuất file gửi khách chứ không gửi link ra
ngoài, nên không cần cổng chặn nữa.

**Hệ quả phải nhớ:** `iposivt-present.pages.dev` là trang công khai. Ai có link
đều mở được bộ V3 kèm phần chính sách sale. Không có gì chặn nữa.

Muốn khoá lại thì **đừng dựng lại cổng mã** — web tĩnh nên toàn bộ nội dung nằm
trong `js/slides-data.js`, ai xem mã nguồn cũng đọc được, cổng mã chỉ chặn người
xem tình cờ. Bật **Cloudflare Access** (Zero Trust, bản free 50 user) cho cả
trang mới là chặn thật.

### Nội dung lấy từ bản của sếp — 10/09/2026

Bản `iPOS-Inventory-3.0` của sếp có 18 slide, cùng nội dung nhưng bố cục theo
`2.1 … 2.11`. Đã đối chiếu và lấy sang mười nội dung bộ này chưa có, **viết lại
bằng giọng văn của bộ này**, giữ nguyên theme, icon, màu và chuyển động:

| Nội dung lấy sang | Nằm ở slide nào |
|---|---|
| Vì sao có bản này: gom một sản phẩm, bắt kịp đối thủ, đưa AI vào | slide mới `VÌ SAO CÓ BẢN NÀY` |
| Ba gói có gì, kèm số tính năng | slide mới `BA GÓI CÓ GÌ` |
| Standard miễn phí, 30 ngày thử Pro, hết hạn về Standard | slide mới `HẾT HẠN THÌ VỀ STANDARD` |
| Mua và gia hạn nhiều điểm, ghi nhận KPI theo email giới thiệu | slide mới `MUA VÀ GIA HẠN NGAY TRÊN HỆ THỐNG` |
| Sửa danh mục trên App | slide mới `SỬA DANH MỤC NGAY TRÊN APP` |
| Phí triển khai khi lên Pro | thêm dòng vào slide mua, nâng, hạ gói |
| Mốc `10/10/2026` hết hạn quay lại bản cũ | tiêu đề và ghi chú slide quay lại bản cũ |
| Menu gom thành chín nhóm nghiệp vụ | ghi chú slide menu điều hướng |
| Phải có quyền `Kho & Cung ứng` mới thấy menu Kho trên FABi | ghi chú slide FABi |
| Trợ lý dò nhà cung cấp, kho, hàng hoá trong danh mục | mô tả thẻ quét ảnh |

**Màu gói Standard trong bản gốc phải là xám, không phải đen.** Bản gốc để
`--std-dark:#111827` gần như đen, in ra PDF nhìn nặng. Nay lấy đúng dải xám của
bộ trình chiếu: đặc `#5b6675`, dải `#5b6675` sang `#8b95a6`, nền `#f3f5f8`.

**Số Standard chốt là 28, không phải 34.** Bản của sếp còn tick Standard cho cả
phân hệ Thiết lập; bộ này đã bỏ theo yêu cầu ngày 10/09/2026.

Cả hai slide mới đã có ảnh: `SỬA DANH MỤC NGAY TRÊN APP` dùng `danh-muc-app.webp`
với bố cục `device`, `MUA VÀ GIA HẠN NGAY TRÊN HỆ THỐNG` dùng `gia-han.webp` với
bố cục `webshot`.

`gia-han.webp` bản đầu chỉ rộng 640px, khung vẽ ra 875px nên bị phóng 1.37 lần
và nhoè. Đã thay bằng bản 1117px, vẽ ra 1106px trên màn 1920 nên ~~không còn
phóng~~.

**Lưới `modgrid` chỉ vừa hai hàng.** Đã thử tách Kiểm kê và Công nợ thành chín ô:
lưới thành ba hàng, cao quá khung 500px, chữ trong ô bị cắt mất dòng cuối. Giữ
tám ô, ô cuối gọi tên cả hai nhóm.

### Đợt hai: lấy thêm văn và bố cục lại — 10/09/2026

| Slide | Đổi gì |
|---|---|
| `VÌ SAO CÓ BẢN NÀY` | văn theo slide 3 bản của sếp, ba thẻ chỉnh cho dài bằng nhau |
| `BA GÓI CÓ GÌ` | thêm tính năng theo slide 5 bản của sếp, logo to hơn và **thêm thẻ chữ tên gói** |
| `ĐỔI GÓI LÚC NÀO CŨNG ĐƯỢC` | gộp slide chính sách gói với slide mua, nâng, hạ làm một |
| `MUA VÀ GIA HẠN` | khai `imgw` để cột ảnh hết thừa hai dải trắng, văn theo slide 11 bản của sếp |
| `MỖI NGHIỆP VỤ CÓ THÊM PHẦN QUY TRÌNH` | ảnh mới, và mọi nhóm nghiệp vụ đều đã có quy trình chứ không riêng sản xuất |
| `ỨNG DỤNG AI — TRỢ LÝ iONE` | đổi tiêu đề |
| `SỬA DANH MỤC NGAY TRÊN APP` | bọc khung điện thoại |
| `DANH SÁCH BÁO CÁO TỔ CHỨC LẠI` | đổi sang `webgrid dir:'col'` cho ảnh trải hết bề ngang |
| `TỚI 10/10/2026 VẪN QUAY LẠI BẢN CŨ ĐƯỢC` | hai ảnh Web và App, kiểu `twoshot` |
| `Hỏi đáp` | slide mới, đặt ngay trước slide cảm ơn |

**Chữ tên gói phải viết riêng.** Logo `logo-ivt-*.png` đã có sẵn chữ Standard,
Plus, Pro nhưng bé xíu, phóng logo lên vẫn đọc không ra. Nay `mxsum` in thêm một
thẻ chữ, tên lấy từ bảng `PK_NAME` theo mã gói.

**Hai ảnh khác tỉ lệ đứng cạnh nhau thì phải chia chỗ theo đúng tỉ lệ.** Ảnh Web
ngang 2.47 và ảnh App dọc 0.65 mà chia đôi bề ngang thì ảnh dọc bị ép thấp hẳn
xuống, nhìn như bị cắt. Đã thử `device` chia theo tỉ lệ rồi canh chân, và thử
`trio` hai cột bằng nhau — cả hai đều lệch.

Cách chạy được là kiểu `twoshot`: chia bề ngang theo đúng tỉ lệ hai ảnh, ở đây là
`3.8 : 1`, nên hai ảnh cao bằng nhau; chú thích xuống hai thẻ bên dưới thay vì
nhét dưới từng ảnh. Thêm ảnh mới thì tính lại tỉ lệ đó ở `.tsh .a0` và `.tsh .a1`.

### Đợt ba — 10/09/2026

| Slide | Đổi gì |
|---|---|
| `CHUYỂN ĐỔI TỰ ĐỘNG` | logo ba gói to hơn, `148×86` thay cho `112×64` |
| `BA GÓI CÓ GÌ` | thêm **thẻ nhấn mạnh** của từng gói và đủ tính năng như slide 5 bản của sếp |
| `ĐỔI GÓI LÚC NÀO CŨNG ĐƯỢC` | nhấn Standard miễn phí không giới hạn thời gian |
| `MUA VÀ GIA HẠN` | bóng khung trình duyệt đậm hơn |
| `GỌN VÀ NHANH HƠN` | đổi mục cuối sang cấu hình tham số lọc |
| `ỨNG DỤNG AI — TRỢ LÝ iOne` | tên viết đúng chữ i thường |
| `V3 CÓ LỢI GÌ CHO NGƯỜI DÙNG` | tiêu đề và ba ý mới |
| `Hỏi đáp` | đổi câu dẫn |

**Tên riêng có chữ thường phải bọc `<b>`.** Tiêu đề và dòng dẫn đều có
`text-transform:uppercase`, nên `iOne` viết trần sẽ ra `IONE`. Bọc `<b>iOne</b>`
thì hai luật `.s-title b` và `.kicker b` trả lại chữ thường mà không in đậm.

**Ảnh chụp màn nào cũng nên có khung giả lập.** Hàm `mock(f, dir, k)` bọc ảnh vào
khung điện thoại `'ph'` hoặc khung trình duyệt `'brw'`; để trống thì ảnh trần.
Khai bằng `mock:['ph','brw']` trên slide `device` và `twoshot`, hoặc `k:'ph'`
trên từng thẻ của `trio`. Cờ `frame:1` cũ vẫn chạy, nghĩa là bọc điện thoại hết.

### Ảnh hộp thoại nổi thì cắt bo góc trong suốt

Ảnh chụp một hộp thoại nổi luôn dính bốn góc nền mờ phía sau, chuyển sang RGB
là bốn góc thành xám đen. `gia-han.webp` đã cắt bo góc bán kính **21px** thành
trong suốt, lưu WebP giữ kênh alpha.

Có alpha rồi thì bật `shadow:1` trên slide `webshot`: ảnh nhận
`filter:drop-shadow`, bóng bám đúng đường bo góc nên hộp thoại nổi hẳn lên trong
khung trình duyệt. Luật này cũng chừa đệm quanh ảnh, thiếu đệm thì `.brw` có
`overflow:hidden` cắt mất bóng.

### Màu nhận diện

Mỗi bộ một màu, đổi qua biến `--acc` theo `body[data-deck="…"]`: Plus xanh
dương, Pro cam, So sánh **xanh than** `#3f5573`, V3 **xanh ngọc** `#12988c`. Thẻ
`{{V3}}` trong chữ dùng gradient cùng tông. Nhãn nút trên thanh công cụ có phần
rút gọn được: `<i>IVT </i>Plus`, phần trong `<i>` bị ẩn khi màn hẹp.

Riêng bộ So sánh thì bảng nói về cả ba gói cùng lúc nên **không** lấy `--acc`:
màu cột là màu của gói, cố định ở `--st` xám, `--pl` xanh, `--pr` vàng.

---


## 7b. Bộ So sánh tính năng — sinh tự động

Bộ này **không viết tay**. `tools/gen_compare.py` đọc thẳng
`../So-sanh-IVT-Standard-Plus-Pro.html`, bóc mảng `DATA` (99 tính năng, 12 phân
hệ, 8 nhóm báo cáo) rồi ghi phần `cmp:` vào `js/slides-data.js`.

```bash
python tools/gen_compare.py
python tools/gen_pdfview.py
```

Sửa nội dung thì sửa ở script rồi chạy lại, **đừng sửa tay trong
`slides-data.js`** — lần chạy sau sẽ ghi đè.

Script tự cắt slide theo chiều cao ước lượng: dòng thường 34px, thêm 17px cho
mỗi hàng chữ mô tả bị xuống dòng, ngân sách 442px cho vùng bảng. Khối nào vượt
thì cắt thành "phần 1, phần 2" và **chia đều** — hạ dần ngưỡng tới mức thấp nhất
mà vẫn giữ nguyên số slide. Cắt tham lam không thôi thì slide cuối còn trơ một
dòng.

Bộ này công khai, không có `gated` nên không hỏi mã.

### Nút PDF — bản gốc dạng cuộn dọc

Cạnh nút Lưới có nút **PDF**. Bộ nào cũng có, nhưng mở ra hai thứ khác nhau —
cờ `page: 1` của bộ quyết định:

| Bộ | Nút PDF mở ra |
|---|---|
| So sánh (`page: 1`) | bản gốc cuộn dọc, **nguyên văn từng ký tự**, nhúng trong iframe |
| Plus · Pro · V3 | chính slide của bộ đó xếp dọc, **mỗi slide đúng một trang giấy** |

Màn hẹp dưới 900px thì giấu nút: ở đó vốn đã là xấp trang cuộn dọc rồi, mà thêm
nút nữa là thanh công cụ tràn ngang.

Nút xuất PDF chỉ có **một** — nút "Xuất PDF" sẵn có trong thanh của bản gốc.
Thanh tiêu đề của khung xem cố tình không thêm nút thứ hai cùng việc.

Bốn điểm bắt buộc, đổi cái nào là hỏng cái đó:

1. **Phải là `iframe`.** File gốc có luật CSS cho chính `body`, `h1`, `.head`,
   `.wrap`. Đặt thẳng vào trang thì nó đè lên toàn bộ giao diện trình chiếu.
2. **Phải là `srcdoc`, không phải `src`.** Trỏ `src` vào file `.html` thì khi
   Trum bấm đúp mở `index.html` (giao thức `file://`), Chrome coi khung nhúng là
   khác nguồn và chặn `contentWindow.print()` — nút Lưu PDF chết lặng. Nội dung
   nằm trong `srcdoc` thì khung nhúng cùng nguồn với trang cha. Bản gộp một file
   cũng nhờ đó mà chạy được, vì không còn thư mục `assets` để trỏ tới.
   Nội dung lấy từ `js/compare-page.js`, do `tools/gen_pdfview.py` sinh ra.
3. **Chrome không cho khung con tự gọi `print()`.** Bấm nút "Xuất PDF" của bản
   gốc lúc nó nằm trong khung nhúng thì tuyệt đối không có gì xảy ra, cũng không
   báo lỗi — đã đo, sự kiện `beforeprint` không hề bắn. Nên `app.js` đấu lại
   `contentWindow.print` sang `printPdf()`: mở đúng tài liệu đó ra một **tab
   riêng** rồi in ở đó, vì tab riêng là trang cấp cao nhất nên in đủ trang.
4. **Tài liệu tạm ở tab đó phải tự gọi lệnh in**, đừng để tab cha gọi hộ. Mở bộ
   trình chiếu bằng `file://` thì blob mang nguồn `null`, tab cha vừa đụng vào
   là bị chặn, vòng chờ treo mãi mà không bao giờ in. `printPdf()` chèn một câu
   `print()` vào chính tài liệu tạm — chỉ tài liệu tạm, file gốc không đổi.

Bấm hay cuộn trong khung nhúng là tiêu điểm bàn phím chuyển vào đó, phím `Esc`
của trang cha không nhận được nữa. Nên có thêm một tai nghe `keydown` đặt ngay
trong khung, và lúc đóng thì gọi `blur()` để trả tiêu điểm về trang cha.

`gen_pdfview.py` chỉ thoát ba thứ khi gói vào chuỗi: dấu `\`, dấu backtick và
`${`. Thêm một chỗ nữa là `</` phải đổi thành `<\/` — không thì lúc
`build_bundle.py` nhét file này thẳng vào `index.html`, chữ `</script>` nằm
trong chuỗi sẽ đóng sớm thẻ `<script>` và cả trang chết.

In ra khổ A4 được **4 trang**. Nhớ bật "Đồ họa nền / Background graphics" trong
hộp thoại in, không bật thì mất hết màu nền của bảng.

**Số slide không cố định.** Thêm tính năng vào file gốc là số slide đổi theo, nên
đừng ghi cứng con số ở chỗ khác.

---

### Bản in của bộ slide

`buildPrint()` dựng lại toàn bộ slide vào `#prntBody`, mỗi slide một `.pg` giữ
nguyên khung 1280×720, thu nhỏ cho vừa cửa sổ bằng `--ps` (lại là `zoom`, không
phải `transform`). Dựng một lần cho mỗi bộ rồi giữ luôn.

Luật in nằm sau `body.prnt-on`, **không** dùng `:has()`. Lý do: `@media print`
phải giấu cả giao diện trình chiếu, mà giấu vô điều kiện thì bấm `Ctrl+P` lúc
đang trình chiếu là ra giấy trắng.

Ba chi tiết đã trả giá khi làm bản in:

| Chi tiết | Không làm thì sao |
|---|---|
| `@page{size:1280px 720px;margin:0}` | trang giấy A4 không khớp 16:9, mỗi slide đẻ thêm một trang trắng |
| `loading="eager"` cho mọi ảnh | ảnh chưa từng lọt tầm nhìn thì in ra trang trắng |
| video tua tới giây 0.1 rồi dừng | không có ảnh nền nên in ra là một ô đen |

Đã đo bằng `page.pdf(prefer_css_page_size=True)`: Plus 28 slide ra **28 trang**,
Pro 23 ra **23**, V3 18 ra **18**, khung giấy 960×540 pt đúng tỉ lệ 16:9.

---
## 8. Cấu trúc và kiến trúc

```
index.html            khung ứng dụng: thanh công cụ, sân khấu, lưới slide, lightbox
css/style.css         thiết kế — token màu ở :root, mỗi kiểu slide một khối CSS
js/slides-data.js     TOÀN BỘ nội dung — chỗ duy nhất cần sửa khi đổi nội dung
js/app.js             bộ dựng slide + điều hướng + auto-fit chống tràn
assets/slides/plus/   ảnh bộ Plus        assets/slides/pro/  ảnh bộ Pro
assets/slides/v3/     ảnh bộ Cập nhật Inventory V3 (WebP)
                      bộ So sánh không có ảnh riêng — dựng thẳng bằng HTML
assets/So-sanh-IVT-Standard-Plus-Pro.html   bản gốc, nguồn của cả bộ So sánh
js/compare-page.js    bản gốc gói thành chuỗi cho nút PDF (sinh tự động)
assets/video/         video demo         assets/fonts/       Be Vietnam Pro nhúng sẵn
build_bundle.py       gộp thành một file .html tự chứa
tools/                script kiểm tra bằng Playwright
tools/gen_compare.py  sinh lại bộ So sánh từ file HTML gốc
tools/gen_pdfview.py  gói bản gốc thành js/compare-page.js cho nút PDF
```

### Cách khung hình hoạt động

`.stage` là hộp cứng **1280×720**. `app.js` tính `scale = min(vw/1280, vh/720)` rồi
đặt vào biến `--sc`, CSS đọc biến đó qua **`zoom`**. Mọi toạ độ trong CSS đều là số
tuyệt đối trên khung 1280×720, không phải đơn vị co giãn — nên bố cục giống hệt
nhau ở mọi màn hình.

**Phải là `zoom`, không được dùng `transform: scale()`** — xem bẫy ở mục 9. Nhờ
`zoom` mà `.stage` chiếm chỗ thật nên canh giữa bằng flex là đủ.

`.s-body` có chiều cao trống thật là **500px** (hằng số `COL_H` trong `app.js`) sau
khi trừ tiêu đề và padding. Con số này dùng để tính chiều cao khung ảnh.

### Auto-fit

Sau mỗi lần render, `app.js` đo `scrollHeight` của `.s-body` và các phần tử
`[data-fit]`. Nếu tràn thì thu nhỏ dần bằng `zoom` (tối đa 12 bước, mỗi bước 4%).

**Đo trước, chạy hiệu ứng sau.** Slide dựng xong bị đặt `visibility:hidden`, đo
xong mới bỏ ẩn và gắn lớp `.in`. Lý do: mọi phép dịch chuyển đều cộng vào vùng
tràn của cha, đo giữa lúc đang chuyển động thì slide vừa khít cũng bị thu nhỏ oan.

Ba mốc đo, không mốc nào rơi vào lúc đang chuyển động:

| Mốc | Khi nào |
|---|---|
| 1 | ngay lúc dựng, hiệu ứng chưa chạy |
| 2 | `document.fonts.ready` — **chỉ chạy nếu lớp `.in` chưa gắn** |
| 3 | `ANIM_END` = 1600ms, sau khi mọi chuyển động đã dừng hẳn |

Mốc 2 phải có điều kiện vì hàm đo gắn lớp `.measuring` để ghim phần tử về đúng
chỗ, mà lớp đó đặt `transition:none`. Đặt giữa chừng là trình duyệt **huỷ**
transition đang chạy và chốt luôn giá trị cuối — nội dung nhảy phịch ra thay vì
trôi lên. Đã đo được: độ mờ nhảy 0 → 1 ở mốc 213ms trong khi độ trễ đặt 380ms.

**Slide bị auto-fit thu nhỏ là dấu hiệu bố cục sai, không phải giải pháp.** Thấy
`zoom=0.xx` trong kết quả kiểm tra thì sửa bố cục cho vừa, đừng để auto-fit gánh.

### Chuyển động

Một thang nhịp duy nhất cho cả ba bộ, khai báo ở `:root` trong `style.css`. Sửa
nhịp thì sửa ở bảng biến đó, **đừng rải số vào từng chỗ**.

Thứ tự vào bám đúng thứ tự mắt đọc. Ảnh vào sau cùng vì nó nặng mắt nhất, cho
vào trước là kéo mắt rời khỏi tiêu đề khi người trình bày còn đang dẫn đề.

| Lớp | Biến | Độ trễ | Thời lượng |
|---|---|---|---|
| Nền trang trí | — | 100ms | 1000ms |
| Dòng dẫn | `--t-kick` | 70ms | `--d-fast` 460ms |
| Tiêu đề | `--t-title` | 160ms | `--d-base` 560ms |
| Gạch cam vẽ từ trái | `--t-rule` | 280ms | 560ms |
| Dòng phụ | `--t-sub` | 320ms | 560ms |
| Chữ số cỡ lớn | `--t-body` | 400ms | `--d-slow` 680ms |
| Ảnh, khung máy, khung trình duyệt | `--t-art` | 460ms | 680ms |
| Phần hiện dần | `RV_LEAD` trong `app.js` | 380ms + 80ms mỗi phần, trần 560ms | 560ms |

Đường cong đều là ease-out đầy đặn (`--ease`), bung nhanh ở đầu rồi hãm êm.
**Không nảy ngược** — ảnh chụp màn hình mà nảy thì nhìn rẻ tiền.

`RV_LEAD` giữ cho nội dung không tranh chỗ với tiêu đề: bấm mũi tên sang slide
thì nội dung chờ khung chữ vào xong mới tới lượt. Bấm `Space` từng bước thì độ
trễ về 0, không bắt người xem đợi.

Số đo thật (mốc 0 = lúc đổi slide, đo bằng `timing.py`): dòng dẫn 114ms, tiêu đề
204ms, nội dung 400–470ms, ảnh 510–550ms, mọi thứ đứng yên trước 1.3 giây.

Chỗ nào cha đã nằm trong bảng `RV` thì con **không** thêm chuyển động riêng —
nó chạy lúc cha còn đang ẩn nên người xem không thấy gì.

Máy người xem bật giảm chuyển động thì tắt hết, chỉ giữ mờ dần 140ms — và phải
đè `transition-delay:0s !important`, vì độ trễ do JS đặt thẳng vào thẻ.

### Cỡ chữ và khoảng trống

Deck này để chiếu cho khách xem từ xa, nên chữ phải to hơn chữ đọc trên màn hình
gần. Mức đang dùng trên khung 1280×720:

| Loại chữ | Cỡ |
|---|---|
| Tiêu đề slide | 34px |
| Mục chính trong danh sách | 15–18.5px |
| Dòng phụ dưới mục chính | 13–14.6px |
| Dòng dẫn `.kicker` và chân slide | 11.5px — chữ phụ, để nhỏ là cố ý |

**Đừng đặt chữ nội dung dưới 14px.** Nếu phải hạ xuống mới vừa khung thì bố cục
đang quá tải, bớt nội dung hoặc tách slide chứ đừng thu chữ.

Khoảng trống thì lấp bằng cách cho khối **giãn đầy khung rồi căn giữa nội dung
bên trong**, không phải bằng cách nhồi thêm chữ:

```css
.defs { align-self: stretch }          /* thay vì center */
.defs .row { flex: 1 }
.defs .c { justify-content: center }   /* chữ vẫn nằm giữa thẻ */
```

Cẩn thận liều lượng. Cho `.pipe .row` giãn đầy chiều cao thì bốn ô cao 490px với
mỗi ô hai dòng chữ — trông rỗng ruột, tệ hơn lúc còn trống. Chỉ cần
`align-items: stretch` để các ô cao bằng ô cao nhất là đủ.

Hiện tỉ lệ lấp đầy trung bình **84%** trên 42 slide có khung nội dung, chỉ còn
hai slide dưới 65% và cả hai đều là slide ít nội dung theo bản chất.

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

## 9. Ảnh và dung lượng

### Nén ảnh chụp điện thoại trước khi commit

Ảnh gốc 1272×2772 nặng 500–750 KB mỗi cái. Chuẩn dùng trong dự án:

| |
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

| |
|---|---|
| `assets/slides/pro` | 7.5 MB |
| `assets/slides/plus` | 4.8 MB |
| `assets/video` | 3.7 MB |
| Tổng repo | ~17 MB, 74 file |

---

## 10. Bẫy đã trả giá — đọc trước khi sửa CSS

### Trùng tên class — dính 5 lần

Không báo lỗi gì hết, chỉ sai hiển thị nên rất khó lần ra.

| Class | Đụng phải | Hậu quả |
|---|---|---|
| `.lb` | lightbox (`display:none`) | nhãn biến mất không dấu vết |
| `.bar` | thanh công cụ (`flex:0 0 46px`) | gạch phân số dày 46px, thanh độ phủ dày 46px |
| `.pks` | ba thẻ gói (`flex-direction:column`) | ba thẻ bìa xếp dọc, tràn hết slide |
| `.pl` `.tl` | class có sẵn | cả slide render đen thui |

**Luôn grep tên trong `style.css` trước khi đặt.** Mỗi kiểu slide mới phải có tiền
tố riêng: `.twol`, `.pipe`, `.cfm`, `.mgrid`, `.brw`…


### Tên bộ ghi cứng ở ba chỗ — link chết lặng lẽ

Thêm bộ thứ tư xong, mở `#cmp-1` vẫn ra bộ Plus, **không lỗi, không cảnh báo**.
Regex đọc hash trong `readHash()` ghi cứng `(plus|pro|v3)`, không khớp thì hàm
`return` sớm rồi `writeHash()` ghi đè lại hash cũ.

Nay cả ba chỗ đều sinh từ `Object.keys(DECKS)`: regex đọc hash, phím số chọn bộ,
và vòng lặp của script kiểm tra. Thêm bộ mới chỉ cần khai báo trong `DECKS` và
thêm một nút trong `index.html`.

### Khung trình duyệt lấy bề ngang theo ảnh gốc, không theo cột — dính 1 lần

`.vid .fr.shot.brwrap .brw` là **flex item**, nên bề ngang của nó tính từ bề
ngang tự nhiên của ảnh bên trong, không phải từ bề ngang cột.

Ảnh 640px thì khung chỉ rộng 640px, vừa khít. Thay bằng ảnh **cùng tỉ lệ** nhưng
rộng 1117px thì khung nở tới hết cột, chiều cao tính ra 586px trong khung 500px,
và `.fr{overflow:hidden}` **cắt mất chân ảnh** — mất luôn hai nút bấm ở đáy hộp
thoại. Không lỗi, không cảnh báo, auto-fit cũng không kêu vì đo `.side` chứ
không đo `.fr`.

Nay ảnh tự co vừa cả hai chiều: khung là flex dọc có `min-height:0`, ảnh để
`height:auto` kèm `max-height:100%`. Ảnh ngang rộng vẫn vẽ y như cũ vì bề ngang
mới là ràng buộc, chỉ ảnh cao mới co lại.

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

Sửa vòng một bằng toạ độ: `.stage` đặt `left:50%; top:50%` rồi ghép
`translate(-50%,-50%)` vào trước `scale`. Vòng hai chuyển hẳn sang `zoom` (bẫy
ngay dưới) thì `.stage` chiếm chỗ thật, canh giữa bằng flex là xong, không còn
phụ thuộc quy tắc alignment nào. Đã thêm cỡ màn `1024×768` vào `check_app.py`.

### `transform: scale()` phóng khung slide làm nhoè hết ảnh

Triệu chứng: mọi hình trên slide trông mềm và rít, bấm vào phóng to thì nét —
vì ảnh trong lightbox không nằm trong lớp bị kéo giãn.

`transform` không bố trí lại, nó **kéo giãn lớp đã vẽ xong**. Ảnh được vẽ ở kích
thước bố cục rồi mới phóng theo tỉ lệ khung, nên mất chi tiết. Chữ ít lộ hơn vì
trình duyệt thường vẽ lại chữ, ảnh thì không.

Đo bằng phương sai Laplacian trên cùng một vùng ảnh máy:

| Màn | `transform` | `zoom` | Chênh |
|---|---|---|---|
| 1920×1080 | 1442 | 1922 | **+33%** |
| 2560×1440 | 1508 | 1629 | +8% |

Cách sửa: dùng `zoom` cho cả khung slide máy tính (`--sc`) lẫn trang trên điện
thoại (`--ms`). `zoom` là thuộc tính bố cục, trình duyệt tính lại kích thước thật
rồi mới vẽ nên ảnh giữ nguyên độ nét. Nó cũng đơn giản hoá phần canh giữa.

Trên Safari iOS lỗi này nặng hơn máy tính nhiều: lớp có `transform` bị vẽ ở tỉ lệ
thấp rồi phóng theo mật độ điểm ảnh của máy. Playwright không tái hiện được, phải
mở bằng máy thật mà xem.

### Đổi chế độ xem thì thứ tự ba bước là bắt buộc

Đổi lớp chế độ → đặt tỉ lệ thu nhỏ → dựng lại. Dựng trước khi có tỉ lệ thì mỗi
trang còn cao nguyên 720px, `scrollIntoView` nhắm đúng trang nhưng tỉ lệ áp xong
là trang co lại, chỗ đang cuộn hoá ra trang khác — nhảy từ trang 2 sang trang 8.

Cùng chỗ đó phải xoá `step` và `nsteps`: chế độ xấp trang không chia bước, giữ số
cũ thì thanh công cụ còn hiện thẻ cam "1/7" của slide vừa xem ở chế độ kia.

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

## 11. Kiểm tra trước khi push

Thư mục `tools/` có 2 script Playwright. Cài một lần:

```bash
pip install playwright
```

Không cần `playwright install` — script dùng Chrome sẵn có trong máy.

| Lệnh | Kiểm gì |
|---|---|
| `python tools/check_slides.py` | render toàn bộ 87 slide, báo slide nào tràn khung, slide nào bị auto-fit thu nhỏ, lỗi console |
| `python tools/check_app.py` | điều hướng, lưới ESC, lightbox, chuyển bộ, phím X, hiện dần từng phần, **không sinh thanh cuộn ở 6 cỡ màn hình**, và không bộ nào còn hỏi mã |
| `python tools/check_mobile.py` | chế độ xấp trang khổ iPhone 14: đủ số trang, tỉ lệ 16:9, không tràn ngang, số trang chạy đúng khi cuộn, ảnh hỏng |
| `python tools/check_pdfview.py` | nút PDF: nội dung nhúng giống bản gốc từng ký tự, cùng nguồn, Lưu PDF in đúng khung nhúng, chạy cả trên bản gộp một file |

Ảnh chụp từng slide lưu vào `tools/shots/`, xem lại để soi bố cục. Bộ điện thoại
chụp khi thêm tham số: `python tools/check_mobile.py shot` — ảnh vào
`tools/shots-mobile/`.

**Đây là chốt duy nhất giữa code sửa và trang chạy thật.** Các lỗi trong mục 10 đều
do 2 script này bắt được, không phải nhìn mắt thường mà thấy.

---

## 12. Đưa lên mạng

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

## 13. Xuất một file để gửi rời

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
