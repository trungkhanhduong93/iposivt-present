# iPOS Inventory — Web Present (Plus & Pro)

Bộ trình chiếu web thay cho 2 file PowerPoint. Khung 16:9 cố định 1280×720, tự
scale vừa màn hình, **không bao giờ có thanh cuộn**.

Mở: bấm đúp `index.html`. Hoặc gửi 1 file duy nhất: xem mục *Xuất 1 file* bên dưới.

---

## Nội dung lấy từ đâu

| Bộ | Số slide | Nguồn |
|---|---|---|
| **Plus** | 27 | `TRAINING IVT LITE - NHAN VIEN.pptx` + slide so sánh Plus/Pro Trum bổ sung |
| **Pro** | 21 | `Demo IVT Pro.pptx` + slide bìa V3 |

Chữ trong `js/slides-data.js` là **nguyên văn từ PPTX**, kể cả chữ nằm trong
SmartArt (33 khối SmartArt đã bóc ra dựng lại bằng HTML nên zoom vẫn nét).
Tên "IVT Lite" đã đổi thành "iPOS Inventory Plus" theo V3.

Ảnh đặt tên theo nguồn: `v3-*` / `slide*` là ảnh chụp V3 Trum cung cấp;
`p##_#` / `r##_#` là ảnh trích thẳng từ PPTX theo đúng slide (`r06_1.png` =
slide 6 của Pro, ảnh thứ 1).

---

## Sửa nội dung

Chỉ cần sửa **`js/slides-data.js`** — không đụng CSS/JS. Cú pháp trong chuỗi:

| Viết | Ra |
|---|---|
| `**chữ**` | **chữ đậm** |
| `~~chữ~~` | chữ cam nhấn (thay cho highlight đỏ trong PPTX) |
| `x:1` trên một item | đánh dấu "nội dung bổ sung do Tukudu viết thêm" |
| `frame:1` trên một slide | ảnh chụp thô, CSS vẽ thêm khung máy trắng bo góc |
| `art:1` trên slide `value` | tranh minh hoạ nền trong suốt, bỏ khung và đổ bóng |
| `todo:'...'` trên một slide | ghi chú việc cần làm, hiện ở góc slide |

Bấm phím **X** khi trình chiếu để bật/tắt viền cam đánh dấu chỗ bổ sung và các
ghi chú `todo`. Duyệt xong thì xoá cờ `x:1` / xoá dòng `todo`.

### Thay ảnh V3

1. Bỏ ảnh mới vào `assets/slides/plus/` hoặc `assets/slides/pro/`.
2. Sửa tên file trong `slides-data.js` (`img:` hoặc `imgs:[...]`).
3. Ctrl+F5 lại trình duyệt.

Deck **Plus** đã thay hết sang ảnh/video V3 — không còn file nào của bản Lite cũ.
Deck **Pro** mới có slide bìa V3 (slide 1, dựng bằng HTML từ 3 ảnh chụp
`bia1/bia2/bia3`); 20 slide còn lại vẫn là ảnh trích từ PPTX 2025.
`v3-bia.jpg` chỉ là ảnh mẫu tham chiếu, không dùng trong slide.

### Video

Video chạy như ảnh động: **tự chạy, lặp vô hạn, tắt tiếng, không có thanh điều
khiển**. Bấm vào video để tạm dừng / chạy tiếp.

### Banner slide Plus 06 (type `heroshots`)

Banner này **không phải ảnh ghép** — dựng 100% bằng HTML từ ảnh chụp App V3.
Trong `slides-data.js` sửa được ngay:

```js
shots:[
  { f:'v3-home-quantri.jpg', t:'Giải pháp quản lý kho<br>cho ngành F&B!' },
  { f:'v3-home-theodoi.jpg' },          // không có t = không có nhãn
]
```

Mỗi máy một dòng: `f` là file ảnh, `t` là nhãn bám ngay trên đầu máy đó
(bỏ `t` thì máy không có nhãn). Thêm/bớt máy thì khoảng cách, độ nghiêng và
vòng cung tự tính lại. Ảnh chụp để nguyên full màn điện thoại, không cần khung
viền — khung trắng và đổ bóng do CSS vẽ.

---

## Phím tắt

| Phím | Việc |
|---|---|
| `→` `Space` `PageDown` | slide sau |
| `←` `PageUp` | slide trước |
| `Home` `End` | slide đầu / cuối |
| `Esc` | mở/đóng lưới slide |
| `F` | toàn màn hình |
| `X` | hiện đánh dấu nội dung bổ sung + ghi chú |
| `1` `2` | chuyển bộ Plus / Pro |
| `?` | bảng phím tắt |

Bấm vào ảnh trong slide để phóng to. Địa chỉ có dạng `...index.html#pro-6` —
gửi link là mở đúng slide đó.

---

## Xuất 1 file để gửi

```bash
python build_bundle.py
```

Ra `iPOS-Inventory-Present.html` (~28 MB) — tự chứa font, ảnh, video, gửi
Telegram/Zalo/mail là mở được ngay, không cần internet, không cần thư mục assets.

Tuỳ chọn khác:

```bash
python build_bundle.py --no-video
```

```bash
python build_bundle.py --deck pro -o "D:\gui-khach-Pro.html"
```

---

## Cấu trúc

```
index.html            khung ứng dụng
css/style.css         thiết kế — token màu ở :root, mỗi loại slide 1 khối CSS
js/slides-data.js     TOÀN BỘ nội dung (chỗ duy nhất cần sửa khi đổi nội dung)
js/app.js             bộ dựng slide + auto-fit chống tràn chữ
assets/slides/        ảnh trích từ PPTX, đặt tên theo slide
assets/video/         video demo của bản Plus
assets/fonts/         Be Vietnam Pro nhúng sẵn (chạy offline)
build_bundle.py       gộp thành 1 file .html tự chứa
```

Thêm một loại bố cục mới: viết hàm dựng trong `T = {...}` ở `app.js` rồi thêm
khối CSS cùng tên. Auto-fit tự lo phần chống tràn.

---

## Ghi chú

`iPOS-Inventory-Present.html` là **file xuất ra**, không phải file nguồn —
chạy lại `build_bundle.py` là có bản mới. Xoá thoải mái.

Rác của bản Gemini cũ (`assets/img/` 23 MB, `edit.js`, mấy file `*_crop.*`) đã
dọn ngày 07/09/2026. Cần ảnh gốc lúc nào thì trích lại từ 2 file PPTX.
