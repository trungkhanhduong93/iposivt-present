/* =============================================================================
   iPOS INVENTORY — WEB PRESENT  ·  DỮ LIỆU SLIDE
   -----------------------------------------------------------------------------
   NGUỒN:  Plus ← "TRAINING IVT LITE - NHAN VIEN.pptx" (26 slide)
           Pro  ← "Demo IVT Pro.pptx" (20 slide)

   QUY ƯỚC BIÊN TẬP
     · Chữ trong file này là NGUYÊN VĂN từ PPTX (kể cả SmartArt).
     · Chỗ nào tui viết thêm thì gắn cờ  x:1  — bấm phím  X  khi trình chiếu
       để bật viền cam "BỔ SUNG", Trum duyệt xong thì xoá cờ hoặc xoá dòng.
     · "IVT Lite" đã đổi thành "iPOS Inventory Plus" theo V3.
     · **chữ đậm**  ·  ~~chữ cam nhấn~~   (bắt chước highlight đỏ trong PPTX)
     · todo: '...'  → ghi chú việc cần làm, hiện ở góc slide khi bật phím X.
   ========================================================================== */

const DECKS = {

/* ══════════════════════════════════════════════════════════════════════════
   PLUS — 26 slide
   ══════════════════════════════════════════════════════════════════════════ */
plus: {
  id: 'plus',
  name: 'iPOS Inventory Plus',
  short: 'PLUS',
  tagline: 'Quản lý kho tinh gọn cho cửa hàng F&B',
  dir: 'assets/slides/plus/',
  vdir: 'assets/video/',
  slides: [

  /* 1 ─ Bìa ------------------------------------------------------------- */
  { n:1, type:'cover', variant:'left',
    img:'anh-bia.png',
    logo:'logo-ipos.png',
    lines:['iPOS INVENTORY'],
    badge:'Plus' },        /* thẻ xanh, lấy màu từ logo-ivt-plus.png */

  /* 2 ─ Nội dung -------------------------------------------------------- */
  { n:2, type:'agenda',
    title:'Nội dung',
    items:[
      { t:'Tại sao cần quản lý kho' },
      { t:'Giới thiệu iPOS Inventory Plus' },
      { t:'Tính năng' },
      { t:'Giá trị mang lại' },
      { t:'Điểm khác biệt giữa Plus & Pro' },
      { t:'Chân dung khách hàng' },
      { t:'Hỏi đáp', x:1 }
    ] },

  /* 3 ─ Giải thích từ ngữ ----------------------------------------------- */
  { n:3, type:'cards3',
    title:'Giải thích từ ngữ',
    cards:[
      { h:'Kho',
        t:'Kho là nơi để **lưu trữ, dự trữ, bảo quản** hàng hóa hay vật tư của doanh nghiệp nhằm cung ứng hàng hóa/nguyên vật liệu cho khách hàng/hoạt động sản xuất, kinh doanh một cách nhanh chóng và tiết kiệm chi phí nhất' },
      { h:'Quản lý kho',
        t:'Quản lý kho là hoạt động liên quan trực tiếp đến công tác **tổ chức, bảo quản, quản lý số lượng** hàng hóa, vật tư nhằm đảm bảo tính liên tục của quá trình sản xuất, kinh doanh, cung cấp, phân phối hàng hóa, vật tư kịp thời cũng như góp phần giảm chi phí lưu thông và sử dụng hiệu quả cơ sở vật chất của kho' }
    ],
    formula:{ h:'Cách tính tồn kho',
              t:'Tồn kho <b>=</b> Dư đầu kỳ <b>+</b> Nhập trong kỳ <b>–</b> Xuất trong kỳ' } },

  /* 4 ─ Chuyển mục ------------------------------------------------------ */
  { n:4, type:'section',
    num:'01',
    title:'TẠI SAO CẦN<br>QUẢN LÝ KHO?',
    lead:'Quản lý kho nhà hàng gần như là bạn đã quản lý được gần 40% chi phí phát sinh — Quản lý được kho nhà hàng hiệu quả, đồng nghĩa với việc bạn đã tối ưu được lợi nhuận kinh doanh.' },

  /* 5 ─ 4 lý do --------------------------------------------------------- */
  { n:5, type:'bullets',
    title:'TẠI SAO CẦN QUẢN LÝ KHO?',
    art:'s5.png',
    items:[
      'Tránh **thất thoát** hàng hóa, nguyên vật liệu',
      'Theo dõi tồn kho chặt chẽ ➜ **Chủ động lượng hàng** cho việc bán hàng, đáp ứng nhu cầu của khách hàng, lên kế hoạch kinh doanh',
      '**Giảm chi phí**: chi phí lưu kho, mua hàng…',
      '**Tăng lợi nhuận**'
    ] },

  /* 6 ─ Giới thiệu ------------------------------------------------------ */
  /* Banner dựng bằng HTML từ 5 ảnh chụp App V3 — sửa chữ/đổi màn hình
     chỉ cần sửa ngay dưới đây, không phải ghép lại ảnh. */
  { n:6, type:'heroshots',
    num:'02',
    title:'GIỚI THIỆU',
    brand:'iPOS INVENTORY',
    badge:'Plus',
    /* Mỗi máy một nhãn, nhãn bám ngay trên đầu máy đó. Máy giữa cao nhất,
       để trống nhãn cho thoáng. Thêm/bớt máy thì khoảng cách tự tính lại. */
    shots:[
      { f:'v3-home-quantri.jpg',   t:'Giải pháp quản lý kho<br>cho ngành F&B!' },
      { f:'v3-danhmuc.jpg',        t:'Quản lý tồn kho<br>nguyên vật liệu, hàng hoá' },
      { f:'v3-home-theodoi.jpg' },
      { f:'v3-quytrinh.jpg',       t:'Quy trình nghiệp vụ<br>đơn giản, dễ hiểu' },
      { f:'v3-baocao-tonkho.jpg',  t:'Quản lý kho chính xác<br>theo thời gian thực' }
    ],
    body:'Ứng dụng quản lý kho cực kỳ đơn giản và chuyên biệt cho ngành F&B trên nền tảng **Web/App**, đáp ứng nhu cầu **quản lý tồn kho**, **phân tích hao hụt**, **kiểm soát chi phí nguyên vật liệu**. Đồng thời, cung cấp các **báo cáo, biểu đồ chỉ số** trực quan, giúp Chủ nhà hàng đưa ra quyết định quản trị kịp thời.' },

  /* 7 ─ Luồng vận hành kho (sơ đồ gốc Trum cung cấp) -------------------- */
  { n:7, type:'imagefull',
    kicker:'GIỚI THIỆU · MÔ HÌNH VỪA VÀ NHỎ',
    title:'Luồng vận hành kho tổng quan',
    img:'s7-luong.png' },

  /* 8 ─ Sơ đồ tổng thể -------------------------------------------------- */
  { n:8, type:'imagefull',
    kicker:'GIỚI THIỆU',
    title:'Bức tranh tổng thể',   titleX:1,
    img:'v3-so-do-tong-the.png' },

  /* 8 ─ Cây tính năng --------------------------------------------------- */
  { n:9, type:'modgrid',
    num:'03',
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    /* span tính trên lưới 12 cột; hi:1 = thẻ nhấn cho phân hệ không có mục con */
    groups:[
      { h:'Trang chủ', ic:'home', span:4,
        items:['Quản trị','Cần theo dõi'] },
      { h:'Quản lý kho', ic:'wh', span:4,
        items:['Nhập / Xuất / Tồn kho','Mua hàng / Trả hàng','Kiểm kê','Quản lý giá vốn'] },
      { h:'Công nợ Nhà cung cấp', ic:'cash', span:4,
        items:['Công nợ hiện tại','Lịch sử thanh toán'] },
      /* Trum bổ sung 07/09/2026: nhóm báo cáo còn nhiều hơn PPTX gốc liệt kê */
      { h:'Báo cáo chi tiết', ic:'chart', span:6,
        items:['Các báo cáo quản trị kho Nhập xuất tồn',
               'Báo cáo công nợ nhà cung cấp','Giá thành sản phẩm'] },
      { h:'Cài đặt hệ thống', ic:'cog', span:6, hi:1,
        items:['Cài đặt chứng từ','Phân quyền chức vụ',
               'Quy tắc ẩn tồn, ẩn đơn giá','Cấu hình mẫu phiếu in'] }
    ] },

  /* 9 ─ Trang chủ › Quản trị -------------------------------------------- */
  { n:10, type:'device',
    crumb:['Trang chủ','Quản trị'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    imgs:['v3-home-quantri.jpg'], frame:1,
    items:[
      { t:'Tổng giá trị tồn kho hiện tại' },
      { t:'Chi phí nguyên vật liệu tháng hiện tại' },
      { t:'Biểu đồ Tỷ lệ chi phí nguyên vật liệu' },
      { t:'Biểu đồ Hao hụt nguyên vật liệu' }
    ],
    note:'Với thông tin tại mục **Quản trị**, Merchant có thể nhanh chóng theo dõi các chỉ số phân tích quan trọng, hay những thông tin Tồn kho để ~~ra quyết định đặt hàng kịp thời~~.' },

  /* 10 ─ Trang chủ › Cần theo dõi --------------------------------------- */
  { n:11, type:'device',
    crumb:['Trang chủ','Cần theo dõi'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    imgs:['v3-home-theodoi.jpg'], frame:1,
    items:[
      { t:'Kiểm kê', s:'7 ngày qua' },
      { t:'Nhập hàng', s:'7 ngày qua' },
      { t:'Thanh toán công nợ', s:'7 ngày qua' },
      { t:'Hàng hóa có thay đổi giá', s:'3 tháng qua' },
      { t:'Đơn hàng thiếu thông tin giá', s:'3 tháng qua' }
    ],
    note:'Với thông tin tại mục **Cần theo dõi**, phần mềm cung cấp các thông tin cần thiết để theo dõi hàng ngày, ~~giảm thiểu tối đa việc bỏ quên hoặc sai sót các đầu việc quan trọng~~.' },

  /* 11 ─ Trang chủ web -------------------------------------------------- */
  { n:12, type:'video',
    crumb:['Trang chủ web'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    video:'slide11.mp4',
    note:'Quản lý setup danh mục đầu vào, Merchant có thể nhanh chóng theo dõi các chỉ số phân tích quan trọng, hay những thông tin Tồn kho để ~~ra quyết định đặt hàng kịp thời~~.' },

  /* 12 ─ Danh mục App --------------------------------------------------- */
  { n:13, type:'device',
    crumb:['Quản lý kho','Danh mục tại APP'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    imgs:['v3-danhmuc.jpg'], frame:1,
    grid:2,
    items:[
      { t:'Hàng hóa' }, { t:'Nhóm hàng' },
      { t:'Nhà cung cấp' }, { t:'Bảng giá' },
      { t:'Công thức chế biến' }, { t:'Định mức tồn kho' },
      { t:'Tài khoản nhân viên' }, { t:'Quy đổi đơn vị tính' }
    ],
    note:'Cung cấp công cụ để **Quản lý Danh mục** một cách tiện lợi.' },

  /* 13 ─ Danh mục Web --------------------------------------------------- */
  { n:14, type:'webshot',
    crumb:['Quản lý kho','Danh mục tại WEB'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    img:'slide13.png',
    note:'**Quản lý Danh mục trên Web** cũng tương tự phiên bản APP.' },

  /* 14 ─ Nghiệp vụ kho App ---------------------------------------------- */
  { n:15, type:'device',
    crumb:['Quản lý kho','Nghiệp vụ Quản lý kho'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    imgs:['slide14.jpg'], frame:1,
    items:[
      { t:'Nhập kho' }, { t:'Xuất kho' }, { t:'Kiểm kê' },
      { t:'Giá vốn' }, { t:'Tồn đầu kỳ' }
    ],
    note:'Cung cấp công cụ để ~~**Quản lý Kho hàng** đơn giản và hiệu quả~~, bao gồm đầy đủ tất cả Nghiệp vụ cơ bản phát sinh trong quy trình vận hành kho tại Nhà hàng.' },

  /* 15 ─ Nghiệp vụ kho Web ---------------------------------------------- */
  { n:16, type:'video',
    crumb:['Quản lý kho','Nghiệp vụ Quản lý kho'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    video:'slide15.mp4',
    note:'Các nghiệp vụ quản lý kho tại bản **Web** của Plus tương tự phiên bản app.' },

  /* 16 ─ Công nợ App ---------------------------------------------------- */
  { n:17, type:'device',
    crumb:['Công nợ Nhà cung cấp','Theo dõi và thanh toán công nợ'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    imgs:['slide16-1.jpg','slide16-2.jpg'], frame:1,
    items:[
      { t:'Thanh toán nợ', s:'Lịch sử thanh toán công nợ nhà cung cấp' },
      { t:'Nợ đầu kỳ',     s:'Khai báo công nợ cũ đầu kỳ' }
    ],
    note:'Cung cấp công cụ để **Theo dõi và thanh toán công nợ NCC** đơn giản và hiệu quả.' },

  /* 17 ─ Công nợ Web ---------------------------------------------------- */
  { n:18, type:'webshot',
    crumb:['Công nợ Nhà cung cấp','Theo dõi và thanh toán công nợ'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    img:'s17.png',
    note:'Cung cấp công cụ để **Theo dõi và thanh toán công nợ NCC** đơn giản và hiệu quả.' },

  /* 18 ─ Báo cáo App ---------------------------------------------------- */
  { n:19, type:'device',
    crumb:['Báo cáo chi tiết','Quản lý Nhập Xuất kho · Tồn hiện tại · Hao hụt NVL'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    imgs:['s18-1.jpg','s18-2.jpg'], frame:1,
    items:[
      { t:'Kiểm kê / Hao hụt NVL' },
      { t:'Tổng hợp / Chi tiết Nhập xuất kho' },
      { t:'Nhập xuất tồn' },
      { t:'Mua hàng / Trả hàng' },
      { t:'Tồn kho hiện tại' }
    ],
    note:'Cung cấp các **Báo cáo quản lý Kho chuyên biệt cho F&B** nhanh chóng và chính xác.' },

  /* 19 ─ Báo cáo Web ---------------------------------------------------- */
  { n:20, type:'webshot',
    crumb:['BÁO CÁO'],
    title:'TÍNH NĂNG iPOS INVENTORY {{Plus}}',
    img:'s19.png',
    note:'Cung cấp các **Báo cáo quản lý Kho chuyên biệt cho F&B** nhanh chóng và chính xác.' },

  /* 20 ─ Giá trị mang lại ----------------------------------------------- */
  { n:21, type:'pillars',
    num:'04',
    title:'GIÁ TRỊ MANG LẠI',
    items:[
      { n:'01', t:'Quản lý toàn bộ danh mục và các nghiệp vụ trên một Ứng dụng' },
      { n:'02', t:'Cung cấp các chỉ số & Báo cáo trực quan, thời gian thực' },
      { n:'03', t:'Quản trị kho hiệu quả ➜ Tối ưu chi phí, tối đa lợi nhuận' }
    ] },

  /* 21–23 ─ Chi tiết 3 giá trị ------------------------------------------ */
  { n:22, type:'value',
    title:'GIÁ TRỊ MANG LẠI',
    active:0,
    lead:'Quản lý toàn bộ danh mục và các nghiệp vụ trên một Ứng dụng',
    imgs:['v3-home-quantri.jpg','v3-danhmuc.jpg'], frame:1 },

  { n:23, type:'value',
    title:'GIÁ TRỊ MANG LẠI',
    active:1,
    lead:'Cung cấp các chỉ số & Báo cáo trực quan, thời gian thực',
    imgs:['v3-home-quantri.jpg','v3-baocao-tonkho.jpg','s18-1.jpg'], frame:1 },

  { n:24, type:'value',
    title:'GIÁ TRỊ MANG LẠI',
    active:2,
    lead:'Quản trị kho hiệu quả ➜ Tối ưu chi phí, tối đa lợi nhuận',
    imgs:['s23.png'], art:1 },

  /* 24 ─ Điểm khác biệt Plus & Pro (Trum bổ sung 08/09/2026) ------------- */
  { n:25, type:'compare',
    num:'05',
    title:'ĐIỂM KHÁC BIỆT GIỮA PLUS & PRO',
    head:'TÍNH NĂNG',
    cols:['PLUS','PRO'],
    rows:[
      { t:'Phù hợp cho vận hành kho đơn giản, nhanh chóng',      v:[1,0] },
      { t:'Dashboard cung cấp các chỉ số & biểu đồ quan trọng',  v:[1,1] },
      { t:'Quản lý danh mục trực tiếp trên App',                 v:[1,1] },
      { t:'Quy trình đặt hàng, sơ chế, chế biến, điều chuyển kho', v:[0,1] },
      { t:'Các tính năng nâng cao khác',                         v:[0,1] }
    ] },

  /* 25 ─ Chân dung khách hàng ------------------------------------------- */
  { n:26, type:'profiles',
    num:'06',
    title:'CHÂN DUNG KHÁCH HÀNG',
    img:'s25.png',
    items:[
      { t:'Mô hình kinh doanh trong ngành **F&B** có nhu cầu quản lý kho.',
        s:'Quán cafe, trà sữa, nhà hàng, quán ăn — có nguyên vật liệu cần theo dõi tồn và chi phí.', sx:1 },
      { t:'**Nhân sự ít**, hoặc chính Merchant tự nhập liệu, tự quản lý',
        s:'Không có kế toán kho riêng. Chủ quán hoặc quản lý ca tự thao tác trên điện thoại.', sx:1 },
      { t:'Mô hình **nhỏ và đơn giản** chỉ cần tính năng cơ bản quản lý kho đơn giản.',
        s:'Chưa cần đặt hàng nhiều cấp, sơ chế hay điều chuyển kho — những thứ đó dành cho bản Pro.', sx:1 }
    ] },

  /* 26 ─ Hỏi đáp -------------------------------------------------------- */
  { n:27, type:'qa',
    num:'07',
    title:'Hỏi đáp' },

  /* 27 ─ Kết thúc — dựng bằng HTML cho nét, thay ảnh chụp mờ ------------- */
  { n:28, type:'thanks',
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

/* ══════════════════════════════════════════════════════════════════════════
   PRO — 20 slide
   ══════════════════════════════════════════════════════════════════════════ */
pro: {
  id: 'pro',
  name: 'iPOS Inventory Pro',
  short: 'PRO',
  tagline: 'Quản trị chuỗi cung ứng F&B khép kín',
  dir: 'assets/slides/pro/',
  vdir: 'assets/video/',
  slides: [

  /* 1 ─ Bìa — chữ chìm + 3 thiết bị xếp lớp, dựng bằng HTML -------------- */
  { n:1, type:'cover', variant:'devices',
    logo:'logo-ipos.png',
    watermark:'iPOS IVT PRO',
    lines:['iPOS INVENTORY'],
    badge:'Pro',            /* thẻ vàng, lấy kiểu từ logo-ivt-pro.png */
    /* thứ tự: điện thoại trái · màn hình giữa · điện thoại phải */
    devices:['bia1.jpg','bia2.png','bia3.jpg'] },

  /* 2 ─ Nội dung -------------------------------------------------------- */
  { n:2, type:'cover',
    variant:'split',
    img:'anh-bia.png',
    lines:['NỘI DUNG'],
    agenda:[
      'Giới thiệu iPOS Inventory {{Pro}}',
      'Các chức năng chính',
      'Giá trị mang lại',
      'Hỏi đáp'
    ] },

  /* 2 ─ Giới thiệu ------------------------------------------------------ */
  { n:3, type:'hero',
    title:'GIỚI THIỆU',
    /* dùng lại đúng 3 ảnh của slide bìa, xếp thành dải ngang */
    devices:['bia1.jpg','bia2.png','bia3.jpg'],
    body:'**iPOS Inventory** {{Pro}} là phần mềm quản trị kho chuyên nghiệp cho ngành F&B. Phần mềm chuẩn hóa quy trình đặt hàng, quản lý kho hàng chính xác theo thời gian thực, cung cấp báo cáo quản trị kho đặc thù. Qua đó giúp tối ưu chi phí nguyên liệu, gia tăng lợi nhuận.',
    body2:'**iPOS Inventory** {{Pro}} có giao diện Web trên máy tính và App trên thiết bị di động.' },

  /* 3 ─ Nền tảng sử dụng ------------------------------------------------ */
  { n:4, type:'platform',
    title:'NỀN TẢNG SỬ DỤNG',
    badge:'App và Web',
    frame:1,
    phone:'s4-1.jpg',
    web:'s4-2.png' },

  /* 4 ─ Bộ phận sử dụng ------------------------------------------------- */
  { n:5, type:'depts',
    title:'BỘ PHẬN SỬ DỤNG',
    items:[
      { h:'BỘ PHẬN MUA HÀNG', ic:'cart', items:[
        'Có quy trình đặt hàng khép kín từ khi có nhu cầu hàng tới đặt hàng nhà cung cấp và nhập kho',
        'Cung cấp nhiều chỉ số đánh giá nhà cung cấp hiệu quả',
        'Kịp thời nhận thông tin có thay đổi giá mua' ] },
      { h:'NHÀ QUẢN LÝ', ic:'org', items:[
        'Nhiều báo cáo phân tích hỗ trợ ra quyết định',
        'Nhận thông báo tức thời các thông tin quan trọng' ] },
      { h:'BỘ PHẬN KHO TỔNG / BẾP TRUNG TÂM', ic:'chef', items:[
        'Quản lý được quá trình sơ chế nguyên liệu, tỷ lệ thu hồi',
        'Quản lý quá trình chế biến, giá thành sản phẩm',
        'Nhiều chỉ số đánh giá hiệu quả sử dụng nguyên liệu' ] },
      { h:'BỘ PHẬN VẬN HÀNH KHO', ic:'wh', items:[
        'Theo dõi tồn kho một cách tức thời',
        'Điều chuyển hàng tiện ích',
        'Phân luồng nhập xuất kho đúng đặc thù F&B' ] },
      { h:'BỘ PHẬN KẾ HOẠCH', ic:'plan', items:[
        'Dự trù kế hoạch đặt hàng khoa học từ kế hoạch bán hàng' ] }
    ] },

  /* 5 ─ Bản đồ chức năng ------------------------------------------------ */
  { n:6, type:'modgrid',
    title:'CHỨC NĂNG iPOS INVENTORY {{Pro}}',
    groups:[
      { h:'Đặt hàng', ic:'cart', span:3, c:'#1b6fe0',
        items:['Lập kế hoạch mua hàng','Yêu cầu mua hàng (RO)',
               'Đặt mua hàng (PO)','Đặt hàng nội bộ (PI)'] },
      { h:'Quản lý kho', ic:'wh', span:3, c:'#0f9d76',
        items:['Nhập / Xuất kho','Kiểm kê','Tính giá vốn',
               'Sơ chế NVL / Chế biến BTP / Điều chuyển kho'] },
      { h:'Công nợ', ic:'cash', span:3, c:'#e0673d',
        items:['Công nợ Khách hàng','Công nợ Nhà cung cấp','Công nợ nội bộ'] },
      { h:'Cấu hình chuyên sâu', ic:'cog', span:3, c:'#7b52d3',
        items:['Quản lý nhượng quyền chung và tách biệt','Trừ kho nhiều cấp',
               'Định mức biến thiên','Quản lý lô, hạn sử dụng'] },
      { h:'Trợ lý AI', ic:'swap', span:4, c:'#c2408f',
        items:['Nhập mua bằng hình ảnh','Chat với AI','Kiểm kê bằng giọng nói'] },
      { h:'Kết nối đối tác', ic:'org', span:4, c:'#1d8fb5',
        items:['Kết nối Misa Amis bản kế toán doanh nghiệp'] },
      { h:'Quản lý danh mục', ic:'list', span:4, c:'#c98a12',
        items:['Quản lý toàn bộ danh mục trên nền tảng Web / App'] }
    ] },

  /* 6 ─ Quy trình đặt hàng ---------------------------------------------- */
  { n:7, type:'orderflow',
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Đặt hàng'],
    title:'CÁC BỘ PHẬN THAM GIA ĐẶT HÀNG',
    img:'r06_1.png',
    steps:[
      { h:'Cửa hàng', c:'#2ec4a6', items:[
        'Chủ yếu sử dụng phiếu Yêu cầu mua hàng **RO**.',
        'Tùy quy trình thực tế, có thể sử dụng luôn phiếu Đặt mua hàng **PO** và Đặt hàng nội bộ **PI**' ] },
      { h:'Thu mua', c:'#ef4d4d', items:[
        'Xử lý **RO** chuyển thành Đặt mua hàng **PO** hoặc Đặt hàng nội bộ **PI**' ] },
      { h:'Kho tổng / Bếp TT', c:'#efb32e', items:[
        'Tiếp nhận Đặt hàng nội bộ **PI** và xuất điều chuyển cho CH',
        'Đặt mua hàng **PO** cho NCC' ] },
      { h:'Nhà cung cấp', c:'#4a9fe0', items:[
        'Nhận đơn Đặt mua hàng **PO** và giao hàng đến Kho CH hoặc Kho tổng / Bếp TT' ] }
    ],
    terms:[
      { k:'RO', t:'Yêu cầu mua hàng' },
      { k:'PO', t:'Đặt mua hàng — NCC ngoài' },
      { k:'PI', t:'Đặt hàng nội bộ — NCC nội bộ (kho tổng)' }
    ] },

  /* 7 ─ Sơ đồ luân chuyển ----------------------------------------------- */
  { n:8, type:'imagefull',
    kicker:'CHỨC NĂNG iPOS INVENTORY {{Pro}}',
    title:'Sơ đồ luân chuyển hàng hoá', titleX:1,
    img:'r07_1.png' },

  /* 8 ─ Nhập kho -------------------------------------------------------- */
  { n:9, type:'device',
    side:'right',
    title:'NHẬP KHO',
    imgs:['s9-1.jpg','s9-2.jpg','s9-3.jpg'], frame:1, colw:560,
    items:[
      { t:'Nhập mua hàng',      s:'Mua hàng từ NCC bên ngoài' },
      { t:'Nhập điều chuyển',   s:'Được sinh tự động khi có phiếu Xuất điều chuyển' },
      { t:'Nhập trả lại',       s:'Hàng bán bị trả lại từ Xuất bán hàng' },
      { t:'Nhập thu hồi',       s:'Nhập trả lại khi bên kho Nhận không nhận đủ hàng' },
      { t:'Nhập khác',          s:'Các lý do nhập khác' }
    ] },

  /* 9 ─ Xuất kho -------------------------------------------------------- */
  { n:10, type:'device',
    side:'right',
    title:'XUẤT KHO',
    imgs:['s10-1.jpg','s10-2.jpg','s10-3.jpg'], frame:1, colw:560,
    items:[
      { t:'Xuất bán POS',       s:'Đồng bộ tự động dữ liệu bán hàng từ POS' },
      { t:'Xuất bán hàng',      s:'Ghi nhận các thông tin bán hàng không bấm máy POS (bán từ kho tổng)' },
      { t:'Xuất điều chuyển',   s:'Liên kết trực tiếp với Nhập điều chuyển (quy trình điều chuyển nội bộ)' },
      { t:'Xuất trả lại',       s:'Trả hàng lại cho NCC' },
      { t:'Xuất hủy',           s:'Xuất hàng bị hư hỏng, hết hạn' },
      { t:'Xuất khác',          s:'Các lý do xuất khác' }
    ],
    todo:'PPTX gốc gõ nhầm "Xuât khác" — đã sửa thành "Xuất khác".' },

  /* 10 ─ Sơ chế – Chế biến ---------------------------------------------- */
  { n:11, type:'production',
    title:'SƠ CHẾ – CHẾ BIẾN',
    check:{ h:'Vận hành sản xuất', items:[
      'Có quy trình sơ chế nguyên vật liệu',
      'Có quy trình chế biến bán thành phẩm' ] },
    cols:[
      { badge:'SƠ CHẾ',   img:'r10_2.png',
        t:'**Có quản lý quy trình sơ chế nguyên liệu:** từ một nguyên liệu đầu vào thành nhiều nguyên liệu đầu ra.' },
      { badge:'CHẾ BIẾN', img:'r10_3.png',
        t:'**Có quy trình chế biến bán thành phẩm:** quản lý quy trình chế biến từ nhiều nguyên liệu ra bán thành phẩm lưu kho.' }
    ] },

  /* 11 ─ Điều chuyển nội bộ --------------------------------------------- */
  { n:12, type:'twolane',
    kicker:'LUÂN CHUYỂN NỘI BỘ',
    title:'ĐIỀU CHUYỂN NỘI BỘ GIỮA HAI KHO',
    a:{ ic:'wh',   t:'Kho A', s:'Bên xuất hàng' },
    b:{ ic:'shop', t:'Kho B', s:'Bên nhận hàng' },
    lanes:[
      { h:'Điều chuyển nội bộ', s:'Luân chuyển hàng, không phát sinh công nợ',
        c:'#1b6fe0',
        steps:[
          { t:'Xuất điều chuyển',  s:'Kho A lập phiếu xuất' },
          { t:'Hàng đi đường',     s:'Đã rời kho A, chưa vào kho B' },
          { t:'Nhập điều chuyển',  s:'Kho B kiểm đếm và xác nhận' }
        ] },
      { h:'Mua bán nội bộ', s:'Có giá bán, phát sinh công nợ giữa hai đơn vị',
        c:'#f5871f',
        steps:[
          { t:'Xuất bán nội bộ',   s:'Kho A ghi nhận bán hàng' },
          { t:'Công nợ nội bộ',    s:'Phải thu bên A — phải trả bên B' },
          { t:'Nhập mua nội bộ',   s:'Kho B ghi nhận giá vốn' }
        ] }
    ] },

  /* 12 ─ Kiểm kê -------------------------------------------------------- */
  { n:13, type:'pipeline',
    kicker:'NGHIỆP VỤ CUỐI KỲ',
    title:'QUY TRÌNH KIỂM KÊ',
    lead:{ h:'Kiểm kê thường', t:'Mã hàng có tồn, đếm trực tiếp · Đếm → so lệch → chốt điều chỉnh' },
    steps:[
      { t:'Chốt tồn sổ sách', s:'Ngừng ghi phiếu trong lúc đếm' },
      { gate:'ĐẾM THỰC TẾ', gc:'#1b6fe0', gs:'phiếu kiểm kê',
        t:'Bảng chênh lệch', s:'Sổ so với thực tế', tone:'warm' },
      { gate:'CHỐT LỆCH', gc:'#6d4bd8', gs:'thiếu / thừa',
        t:'Xuất / Nhập điều chỉnh', s:'Lúc này tồn mới đổi', tone:'cool',
        subs:[
          { t:'Xuất điều chỉnh', s:'đếm thiếu so với sổ' },
          { t:'Nhập điều chỉnh', s:'đếm thừa so với sổ' }
        ] },
      { gate:'KHỚP SỐ', gc:'#1a9c61', gs:'ghi nhận hao hụt',
        t:'Tồn kho sau điều chỉnh', s:'Bắt đầu kỳ mới', tone:'good' }
    ] },

  /* 13 ─ Tính giá vốn --------------------------------------------------- */
  { n:14, type:'costformula',
    kicker:'NGHIỆP VỤ CUỐI KỲ',
    title:'TÍNH GIÁ VỐN',
    label:'Cách tính giá',
    value:'Bình quân cuối kỳ',
    eq:'Đơn giá vốn',
    top:'Giá trị tồn đầu + Giá trị nhập trong kỳ',
    bottom:'Số lượng tồn đầu + Số lượng nhập trong kỳ' },

  /* 14 ─ Công nợ -------------------------------------------------------- */
  { n:15, type:'webgrid',
    kicker:'QUẢN TRỊ DÒNG TIỀN',
    title:'CÔNG NỢ',
    img:'s15.png',
    items:[
      'Cho phép khai báo **Công nợ đầu kỳ**',
      'Thanh toán và theo dõi **Công nợ hiện tại** từng Nhà cung cấp, chi tiết theo từng hóa đơn'
    ] },

  /* 15 ─ Nhượng quyền --------------------------------------------------- */
  { n:16, type:'webgrid', dir:'col', cols:2,
    kicker:'THIẾT LẬP NÂNG CAO',
    title:'CẤU HÌNH CHUYÊN SÂU',
    img:'s16.png',
    items:[
      'Cho phép vận hành **nhượng quyền chung** và **nhượng quyền tách biệt**',
      'Cho phép **trừ kho nhiều lớp bán thành phẩm**, tối ưu quy trình vận hành',
      '**Định mức biến thiên**, xử lý linh hoạt với rất nhiều tình huống đặc thù của ngành F&B',
      '**Quản lý lô, hạn sử dụng**: không thể thiếu nếu bạn quan tâm chi tiết từng mặt hàng giá trị cao'
    ] },

  /* 17 ─ Trợ lý iOne (Trum bổ sung 09/09/2026, nội dung từ tài liệu V3) -- */
  { n:17, type:'trio',
    kicker:'TRỢ LÝ AI',
    title:'TRỢ LÝ iOne LÀM HỘ PHẦN VIỆC TAY',
    items:[
      { f:'ione-1.jpg', t:'Quét ảnh tạo phiếu nhập mua',
        s:'Chụp hoá đơn hoặc phiếu giao hàng của nhà cung cấp, Trợ lý đọc và điền sẵn dòng hàng, số lượng, đơn giá.' },
      { f:'ione-2.jpg', t:'Chat để lập phiếu nhập mua',
        s:'Gõ yêu cầu bằng tiếng Việt tự nhiên, Trợ lý dựng phiếu nháp để bạn kiểm tra và lưu.' },
      { f:'ione-3.jpg', t:'Kiểm kê bằng giọng nói',
        s:'Đọc tên hàng và số lượng khi đang đứng trong kho — không cần rời tay khỏi hàng để nhập máy.' }
    ] },

  /* 18 ─ Kết nối đối tác (Trum bổ sung 09/09/2026) ----------------------- */
  { n:18, type:'webgrid', dir:'col',
    kicker:'MỞ RỘNG HỆ SINH THÁI',
    title:'KẾT NỐI ĐỐI TÁC',
    img:'ketnoi.png',
    items:[
      'Tiện ích mở cổng **API kết nối trực tiếp realtime** đến partner thứ ba (**Misa Amis**), thuận tiện và tối ưu quy trình thao tác, tiết kiệm thời gian.'
    ] },

  /* 16 ─ Giá trị mang lại ----------------------------------------------- */
  { n:19, type:'pillars',
    title:'GIÁ TRỊ MANG LẠI',
    items:[
      { n:'01', t:'Số hóa toàn bộ quy trình vận hành trong nhà hàng' },
      { n:'02', t:'Quản trị hiệu quả kho hàng, nguyên vật liệu, nhà cung cấp' },
      { n:'03', t:'Thông tin kịp thời giúp cho việc ra quyết định' }
    ] },

  /* 17 ─ Trụ cột 1 ------------------------------------------------------ */
  { n:20, type:'modgrid',
    kicker:'GIÁ TRỊ 01 / 03',
    title:'SỐ HÓA QUY TRÌNH VẬN HÀNH',
    groups:[
      { h:'Quy trình đặt hàng', ic:'cart', span:6, c:'#1b6fe0',
        items:['Cho phép lập kế hoạch đặt hàng theo tuần / tháng',
               'Quy trình khép kín từ khi cửa hàng có yêu cầu hàng tới Đơn hàng gửi nhà cung cấp và nhận hàng'] },
      { h:'Quy trình sơ chế nguyên liệu', ic:'chef', span:6, c:'#0f9d76',
        items:['Quản lý công thức sơ chế riêng cho từng loại nguyên liệu',
               'Quản lý nguyên liệu gốc mua của NCC, nguyên liệu sau sơ chế và tỷ lệ thu hồi'] },
      { h:'Quy trình chế biến sản xuất', ic:'swap', span:6, c:'#e0673d',
        items:['Quản lý công thức chế biến 1 hoặc nhiều cấp',
               'Tự động xuất kho nguyên liệu tương ứng số lượng sản phẩm sản xuất',
               'Quản lý giá thành và hiệu quả sản xuất'] },
      { h:'Quy trình điều chuyển kho', ic:'truck', span:6, c:'#7b52d3',
        items:['Quản lý luân chuyển hàng hóa tới từng hình thức nhập xuất',
               'Hỗ trợ điều chuyển từ kho tổng sang cửa hàng hoặc giữa các cửa hàng'] }
    ] },

  { n:21, type:'modgrid',
    kicker:'GIÁ TRỊ 02 / 03',
    title:'QUẢN TRỊ KHO HÀNG · NVL · NHÀ CUNG CẤP',
    groups:[
      { h:'Quản trị kho hàng', ic:'wh', span:6, c:'#1b6fe0',
        items:['Tồn thực tế tại kho hàng được cập nhật ngay lập tức',
               'Tự động trừ kho ngay sau khi bán hàng'] },
      { h:'Quản trị nguyên vật liệu', ic:'box', span:6, c:'#0f9d76',
        items:['Quản lý nhật ký nhập xuất tồn — Thẻ kho từng nguyên vật liệu'] },
      { h:'Quản trị bếp trung tâm', ic:'chef', span:6, c:'#e0673d',
        items:['Quản trị hiệu quả sơ chế, chế biến giữa kế hoạch và thực tế',
               'Quản trị giá thành tại bếp trung tâm'] },
      { h:'Quản trị nhà cung cấp', ic:'truck', span:6, c:'#7b52d3',
        items:['Đánh giá chất lượng cung ứng hàng từng NCC',
               'Quản lý biến động giá mua hàng ngày',
               'Quản trị tình hình mua hàng, cung ứng hàng các NCC'] }
    ] },

  { n:22, type:'pillars', cols:2,
    kicker:'GIÁ TRỊ 03 / 03',
    title:'THÔNG TIN KỊP THỜI GIÚP RA QUYẾT ĐỊNH',
    items:[
      { c:'#1b6fe0', t:'Theo dõi tồn kho **REALTIME**, giúp ra quyết định đặt hàng các mặt hàng khi hết hàng, tồn kho dưới mức cho phép, điều chuyển hàng khi có điểm thừa hàng, điểm thiếu hàng' },
      { c:'#e0673d', t:'Hệ thống **cảnh báo biến động về giá hàng** để chống gian lận về giá, giúp việc quyết định có nên dùng loại hàng hóa đó không? Có làm việc với nhà cung cấp đó nữa không' },
      { c:'#0f9d76', t:'Theo dõi **chất lượng nguyên liệu sơ chế** đánh giá và quyết định dùng loại nguyên liệu, do nhà cung cấp nào cung cấp để tối ưu được chi phí giá thành, tăng lợi nhuận.' },
      { c:'#7b52d3', t:'Ra **quyết định đặt hàng** dựa vào số lượng tồn kho và số lượng yêu cầu để đặt hàng hợp lý.' }
    ] },

  /* 20 ─ Kết thúc ------------------------------------------------------- */
  { n:23, type:'thanks',
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
}

};
