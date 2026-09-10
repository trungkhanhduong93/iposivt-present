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
    crumb:['GIỚI THIỆU iPOS INVENTORY {{Plus}}','Mô hình vừa và nhỏ'],
    title:'Luồng vận hành kho tổng quan',
    img:'s7-luong.png' },

  /* 8 ─ Sơ đồ tổng thể -------------------------------------------------- */
  { n:8, type:'imagefull',
    crumb:['GIỚI THIỆU iPOS INVENTORY {{Plus}}'],
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
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Trang chủ','Tại App'],
    title:'QUẢN TRỊ',
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
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Trang chủ','Tại App'],
    title:'CẦN THEO DÕI',
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
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Trang chủ','Tại Web'],
    title:'TRANG CHỦ',
    video:'slide12plus.mp4',
    note:'Quản lý setup danh mục đầu vào, Merchant có thể nhanh chóng theo dõi các chỉ số phân tích quan trọng, hay những thông tin Tồn kho để ~~ra quyết định đặt hàng kịp thời~~.' },

  /* 12 ─ Danh mục App --------------------------------------------------- */
  { n:13, type:'device',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Quản lý kho','Tại App'],
    title:'DANH MỤC',
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
  { n:14, type:'video',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Quản lý kho','Tại Web'],
    title:'DANH MỤC',
    video:'slide11.mp4',
    note:'**Quản lý Danh mục trên Web** cũng tương tự phiên bản APP.' },

  /* 14 ─ Nghiệp vụ kho App ---------------------------------------------- */
  { n:15, type:'device',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Quản lý kho','Tại App'],
    title:'NGHIỆP VỤ QUẢN LÝ KHO',
    imgs:['slide14.jpg'], frame:1,
    items:[
      { t:'Nhập kho' }, { t:'Xuất kho' }, { t:'Kiểm kê' },
      { t:'Giá vốn' }, { t:'Tồn đầu kỳ' }
    ],
    note:'Cung cấp công cụ để ~~**Quản lý Kho hàng** đơn giản và hiệu quả~~, bao gồm đầy đủ tất cả Nghiệp vụ cơ bản phát sinh trong quy trình vận hành kho tại Nhà hàng.' },

  /* 15 ─ Nghiệp vụ kho Web ---------------------------------------------- */
  { n:16, type:'video',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Quản lý kho','Tại Web'],
    title:'NGHIỆP VỤ QUẢN LÝ KHO',
    video:'slide15.mp4',
    note:'Các nghiệp vụ quản lý kho tại bản **Web** của Plus tương tự phiên bản app.' },

  /* 16 ─ Công nợ App ---------------------------------------------------- */
  { n:17, type:'device',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Công nợ nhà cung cấp','Tại App'],
    title:'THEO DÕI VÀ THANH TOÁN CÔNG NỢ',
    imgs:['slide16-1.jpg','slide16-2.jpg'], frame:1,
    items:[
      { t:'Thanh toán nợ', s:'Lịch sử thanh toán công nợ nhà cung cấp' },
      { t:'Nợ đầu kỳ',     s:'Khai báo công nợ cũ đầu kỳ' }
    ],
    note:'Cung cấp công cụ để **Theo dõi và thanh toán công nợ NCC** đơn giản và hiệu quả.' },

  /* 17 ─ Công nợ Web ---------------------------------------------------- */
  { n:18, type:'webshot',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Công nợ nhà cung cấp','Tại Web'],
    title:'THEO DÕI VÀ THANH TOÁN CÔNG NỢ',
    img:'s17.png',
    note:'Cung cấp công cụ để **Theo dõi và thanh toán công nợ NCC** đơn giản và hiệu quả.' },

  /* 18 ─ Báo cáo App ---------------------------------------------------- */
  { n:19, type:'device',
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Báo cáo chi tiết','Tại App'],
    title:'BÁO CÁO QUẢN LÝ KHO',
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
    crumb:['TÍNH NĂNG iPOS INVENTORY {{Plus}}','Báo cáo chi tiết','Tại Web'],
    title:'BÁO CÁO QUẢN LÝ KHO',
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
    cols:['Plus','Pro'],
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
    crumb:['GIỚI THIỆU iPOS INVENTORY {{Pro}}'],
    title:'NỀN TẢNG SỬ DỤNG',
    badge:'App và Web',
    frame:1,
    phone:'s4-1.jpg',
    web:'s4-2.png' },

  /* 4 ─ Bộ phận sử dụng ------------------------------------------------- */
  { n:5, type:'depts',
    crumb:['GIỚI THIỆU iPOS INVENTORY {{Pro}}','Đối tượng sử dụng'],
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
    kicker:'Các chức năng chính',
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Quản lý kho'],
    title:'Sơ đồ luân chuyển hàng hoá', titleX:1,
    img:'r07_1.png' },

  /* 8 ─ Nhập kho -------------------------------------------------------- */
  { n:9, type:'device',
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Quản lý kho'],
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Quản lý kho'],
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Bếp trung tâm'],
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Luân chuyển nội bộ'],
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Nghiệp vụ cuối kỳ'],
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Nghiệp vụ cuối kỳ'],
    title:'TÍNH GIÁ VỐN',
    label:'Cách tính giá',
    value:'Bình quân cuối kỳ',
    eq:'Đơn giá vốn',
    top:'Giá trị tồn đầu + Giá trị nhập trong kỳ',
    bottom:'Số lượng tồn đầu + Số lượng nhập trong kỳ' },

  /* 14 ─ Công nợ -------------------------------------------------------- */
  { n:15, type:'webgrid',
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Quản trị dòng tiền'],
    title:'CÔNG NỢ',
    img:'s15.png',
    items:[
      'Cho phép khai báo **Công nợ đầu kỳ**',
      'Thanh toán và theo dõi **Công nợ hiện tại** từng Nhà cung cấp, chi tiết theo từng hóa đơn'
    ] },

  /* 15 ─ Nhượng quyền --------------------------------------------------- */
  { n:16, type:'webgrid', dir:'col', cols:2,
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Thiết lập nâng cao'],
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Trợ lý AI'],
    title:'TRỢ LÝ <b>iONE</b> HỖ TRỢ NHẬP LIỆU',
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
    crumb:['CHỨC NĂNG iPOS INVENTORY {{Pro}}','Kết nối đối tác'],
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
},
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
      { k:'st', logo:'logo-ivt-standard.png', n:'28',
        t:'Nghiệp vụ kho cơ bản: mua hàng, bán POS, kiểm kê' },
      { k:'pl', logo:'logo-ivt-plus.png',     n:'46',
        t:'Mở rộng: công thức chế biến, giá thành, hao hụt' },
      { k:'pr', logo:'logo-ivt-pro.png',      n:'99',
        t:'Đầy đủ toàn bộ phân hệ và báo cáo' }
    ] },

  /* 2 ─ Ba gói dành cho ai, kèm cách đọc bảng ---------------------------- */
  { n:2, type:'mxsum',
    crumb:['SO SÁNH TÍNH NĂNG','Ba gói'],
    title:'BA GÓI, MỘT PHẦN MỀM',
    sub:'Cùng một hệ thống, khác nhau ở số phân hệ được mở.',
    total:'99 tính năng',
    packs:[
      { k:'st', logo:'logo-ivt-standard.png', n:'28',
        t:'Nghiệp vụ kho cơ bản: mua hàng, bán POS, kiểm kê.',
        li:['Đủ chứng từ nhập, xuất, kiểm kê nền tảng',
            'Mười lăm báo cáo quản trị kho và đối soát',
            'Đối soát KTV và iACC ngay từ gói thấp nhất'] },
      { k:'pl', logo:'logo-ivt-plus.png', n:'46',
        t:'Mở rộng: công thức chế biến, giá thành, hao hụt nguyên vật liệu.',
        li:['Thêm 18 tính năng so với Standard',
            'Công thức chế biến, bảng giá, quy đổi đơn vị',
            'Báo cáo hao hụt, tỷ lệ trả hàng, giá thành'] },
      { k:'pr', logo:'logo-ivt-pro.png', n:'99',
        t:'Đầy đủ toàn bộ phân hệ và báo cáo.',
        li:['Thêm 53 tính năng so với Plus',
            'Đặt hàng, sơ chế, chế biến, điều chuyển, nhượng quyền',
            'Trọn 37 báo cáo của tám nhóm'] }
    ],
    legend:[
      { k:'st', t:'Cột xám là gói **Standard**' },
      { k:'pl', t:'Cột xanh là gói **Plus**' },
      { k:'pr', t:'Cột vàng là gói **Pro**' },
      { k:'no', t:'Dấu tích là có, gạch ngang là không có' }
    ] },

  /* 3 ─ Thiết lập — phần 1 */
  { n:3, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Thiết lập — phần 1'],
    title:'THIẾT LẬP — PHẦN 1',
    rows:[
      { g:'1 · Thiết lập' },
      { c:'1.01', t:'Tồn đầu kỳ', v:[0,1,1] },
      { c:'1.02', t:'Nợ đầu kỳ nhà cung cấp', v:[0,1,1] },
      { c:'1.03', t:'Nợ đầu kỳ khách hàng', v:[0,0,1] },
      { c:'1.04', t:'Nợ đầu kỳ nội bộ', v:[0,0,1] },
      { c:'1.05', t:'Quy tắc giá vốn', v:[0,1,1] },
      { c:'1.06', t:'Định mức tồn kho', v:[0,1,1] }
    ],
    note:'Gói {{Standard}} không mở phân hệ Thiết lập. Sáu mục đầu có từ {{Plus}}; nợ đầu kỳ khách hàng, nợ đầu kỳ nội bộ, nhân viên, chức vụ và kế hoạch tự động là phần riêng của {{Pro}}.' },

  /* 4 ─ Thiết lập — phần 2 */
  { n:4, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Thiết lập — phần 2'],
    title:'THIẾT LẬP — PHẦN 2',
    rows:[
      { g:'1 · Thiết lập' },
      { c:'1.07', t:'Hệ thống', d:'Khai báo cấu hình hệ thống · Đặt lại hệ thống: xóa dữ liệu phát sinh, xóa danh mục và khai báo tồn đầu kỳ', v:[0,1,1] },
      { c:'1.08', t:'Chứng từ', d:'Cấu hình hàng hóa trong chứng từ · Khai báo cấu trúc số phiếu từng loại chứng từ · Khai báo quy tắc gợi ý giá · Cấu hình ẩn giá tiền và ẩn tồn hệ thống · Chỉnh sửa mẫu phiếu in', v:[0,1,1] },
      { c:'1.09', t:'Nhân viên', v:[0,0,1] },
      { c:'1.10', t:'Chức vụ', v:[0,0,1] },
      { c:'1.11', t:'Kế hoạch tự động', v:[0,0,1] }
    ],
    note:'Gói {{Standard}} không mở phân hệ Thiết lập. Sáu mục đầu có từ {{Plus}}; nợ đầu kỳ khách hàng, nợ đầu kỳ nội bộ, nhân viên, chức vụ và kế hoạch tự động là phần riêng của {{Pro}}.' },

  /* 5 ─ Danh mục — phần 1 */
  { n:5, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Danh mục — phần 1'],
    title:'DANH MỤC HÀNG HOÁ VÀ CÔNG THỨC',
    rows:[
      { g:'2 · Phân hệ Danh mục' },
      { c:'2.01', t:'Danh mục hàng hóa', v:[1,1,1] },
      { c:'2.02', t:'Danh mục nhóm hàng hóa', v:[1,1,1] },
      { c:'2.03', t:'Danh mục đơn vị tính', v:[1,1,1] },
      { c:'2.04', t:'Danh mục quy đổi đơn vị tính', v:[0,1,1] },
      { c:'2.05', t:'Danh mục công thức sơ chế, chế biến bán thành phẩm', v:[0,0,1] },
      { c:'2.06', t:'Danh mục công thức chế biến', v:[0,1,1] },
      { c:'2.07', t:'Danh mục định mức biến thiên', v:[0,0,1] },
      { c:'2.08', t:'Danh mục kho hàng', v:[1,1,1] },
      { c:'2.09', t:'Danh mục cung ứng hàng hóa', v:[0,0,1] }
    ],
    note:'Công thức chế biến mở từ {{Plus}}; sơ chế bán thành phẩm và định mức biến thiên chỉ có trên {{Pro}}.' },

  /* 6 ─ Danh mục — phần 2 */
  { n:6, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Danh mục — phần 2'],
    title:'DANH MỤC ĐỐI TÁC VÀ KHO',
    rows:[
      { g:'2 · Phân hệ Danh mục' },
      { c:'2.10', t:'Danh mục khách hàng', v:[0,0,1] },
      { c:'2.11', t:'Danh mục nhà cung cấp', v:[1,1,1] },
      { c:'2.12', t:'Danh mục nhóm nhà cung cấp', v:[1,1,1] },
      { c:'2.13', t:'Danh mục bảng giá', v:[0,1,1] },
      { c:'2.14', t:'Danh mục chủ nhượng quyền', v:[0,0,1] },
      { c:'2.15', t:'Danh mục mẫu đặt hàng', v:[0,0,1] },
      { c:'2.16', t:'Danh mục lý do', v:[0,0,1] },
      { c:'2.17', t:'Danh mục lô hàng (Quản lý lô, date hàng hóa)', v:[0,0,1] }
    ],
    note:'Bảng giá mở từ {{Plus}}. Khách hàng, nhượng quyền, mẫu đặt hàng và quản lý lô date là phần riêng của {{Pro}}.' },

  /* 7 ─ Đặt hàng · Sơ chế · Chế biến — phần 1 */
  { n:7, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Đặt hàng · Sơ chế · Chế biến — phần 1'],
    title:'ĐẶT HÀNG, SƠ CHẾ VÀ CHẾ BIẾN — PHẦN 1',
    rows:[
      { g:'3 · Phân hệ đặt hàng' },
      { c:'3.01', t:'Kế hoạch đặt hàng nội bộ', v:[0,0,1] },
      { c:'3.02', t:'Yêu cầu mua hàng', v:[0,0,1] },
      { c:'3.03', t:'Đặt mua hàng', v:[0,0,1] },
      { c:'3.04', t:'Đặt hàng nội bộ', v:[0,0,1] },
      { g:'4 · Phân hệ sơ chế' },
      { c:'4.01', t:'Khai báo công thức sơ chế nguyên vật liệu', v:[0,0,1] }
    ],
    note:'Trọn ba phân hệ này chỉ có trên {{Pro}} — đây là phần khác biệt lớn nhất giữa Pro và hai gói còn lại.' },

  /* 8 ─ Đặt hàng · Sơ chế · Chế biến — phần 2 */
  { n:8, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Đặt hàng · Sơ chế · Chế biến — phần 2'],
    title:'ĐẶT HÀNG, SƠ CHẾ VÀ CHẾ BIẾN — PHẦN 2',
    rows:[
      { g:'4 · Phân hệ sơ chế' },
      { c:'4.02', t:'Xuất kho sơ chế nguyên vật liệu', v:[0,0,1] },
      { c:'4.03', t:'Nhập kho sau sơ chế', v:[0,0,1] },
      { g:'5 · Phân hệ chế biến' },
      { c:'5.01', t:'Khai báo công thức chế biến bán thành phẩm', v:[0,0,1] },
      { c:'5.02', t:'Xuất kho chế biến bán thành phẩm', v:[0,0,1] },
      { c:'5.03', t:'Nhập kho sau chế biến bán thành phẩm', v:[0,0,1] }
    ],
    note:'Trọn ba phân hệ này chỉ có trên {{Pro}} — đây là phần khác biệt lớn nhất giữa Pro và hai gói còn lại.' },

  /* 9 ─ Xuất kho */
  { n:9, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Xuất kho'],
    title:'PHÂN HỆ XUẤT KHO',
    rows:[
      { g:'6 · Phân hệ xuất kho' },
      { c:'6.01', t:'Xuất bán POS', d:'Tự động đồng bộ dữ liệu từ phần mềm bán hàng POS PC/FABi', v:[1,1,1] },
      { c:'6.02', t:'Xuất bán hàng', d:'Tự động xuất kho nguyên liệu theo công thức chế biến', v:[0,0,1] },
      { c:'6.03', t:'Xuất điều chuyển', d:'Xuất bán hàng nội bộ · Xuất điều chuyển nội bộ · Xuất trả lại nội bộ', v:[0,0,1] },
      { c:'6.04', t:'Xuất trả lại nhà cung cấp', v:[0,1,1] },
      { c:'6.05', t:'Xuất hủy', d:'Cho phép hủy nguyên liệu, thành phẩm', v:[0,1,1] },
      { c:'6.06', t:'Xuất khác', v:[0,1,1] }
    ],
    note:'Xuất bán POS có ở cả ba gói. Trả lại nhà cung cấp, xuất huỷ và xuất khác mở từ {{Plus}}; điều chuyển nội bộ thì cần {{Pro}}.' },

  /* 10 ─ Nhập kho · Kiểm kê */
  { n:10, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Nhập kho · Kiểm kê'],
    title:'NHẬP KHO VÀ KIỂM KÊ',
    rows:[
      { g:'7 · Phân hệ nhập kho' },
      { c:'7.01', t:'Nhập mua hàng', v:[1,1,1] },
      { c:'7.02', t:'Nhập điều chuyển', d:'Tự động sinh chứng từ từ Xuất điều chuyển · Nhập mua nội bộ · Nhập điều chuyển · Nhập trả lại', v:[0,0,1] },
      { c:'7.03', t:'Nhập thu hồi', d:'Nhập thu hồi từ chênh lệch điều chuyển nội bộ', v:[0,0,1] },
      { c:'7.04', t:'Nhập khác', v:[0,1,1] },
      { g:'8 · Phân hệ kiểm kê' },
      { c:'8.01', t:'Kiểm kê', v:[1,1,1] },
      { c:'8.02', t:'Xuất điều chỉnh', v:[1,1,1] },
      { c:'8.03', t:'Nhập điều chỉnh', v:[1,1,1] },
      { c:'8.04', t:'Điều chỉnh giá trị tồn kho', v:[0,1,1] },
      { c:'8.05', t:'Tình trạng hàng hoá', v:[0,0,1] }
    ],
    note:'Nhập mua hàng và kiểm kê là nghiệp vụ nền, gói nào cũng có. Nhập điều chuyển và thu hồi đi kèm phân hệ nội bộ của {{Pro}}.' },

  /* 11 ─ Công nợ · Nhượng quyền · Kế toán */
  { n:11, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Công nợ · Nhượng quyền · Kế toán'],
    title:'CÔNG NỢ, NHƯỢNG QUYỀN VÀ KẾ TOÁN',
    rows:[
      { g:'9 · Phân hệ công nợ' },
      { c:'9.01', t:'Thanh toán công nợ nội bộ', v:[0,0,1] },
      { c:'9.02', t:'Thanh toán công nợ khách hàng', v:[0,0,1] },
      { c:'9.03', t:'Thanh toán công nợ nhà cung cấp', v:[1,1,1] },
      { c:'9.04', t:'Thanh toán công nợ nhượng quyền', v:[0,0,1] },
      { g:'10 · Phân hệ nhượng quyền' },
      { c:'10.01', t:'Khai báo danh mục chủ nhượng quyền', v:[0,0,1] },
      { g:'11 · Phân hệ kế toán' },
      { c:'11.01', t:'Tính giá vốn', v:[1,1,1] },
      { c:'11.02', t:'Kiểm tra chứng từ', v:[0,0,1] },
      { c:'11.03', t:'Cập nhật giá mua', v:[0,0,1] },
      { c:'11.04', t:'Khoá sổ kho', v:[0,1,1] }
    ],
    note:'Công nợ nhà cung cấp và tính giá vốn có ở cả ba gói. Khoá sổ kho mở từ {{Plus}}.' },

  /* 12 ─ Báo cáo quản trị kho — phần 1 */
  { n:12, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Báo cáo quản trị kho — phần 1'],
    title:'BÁO CÁO QUẢN TRỊ KHO',
    rows:[
      { g:'Nhóm báo cáo quản trị kho' },
      { c:'12.01.01', t:'Báo cáo kiểm kê', v:[1,1,1] },
      { c:'12.01.02', t:'Báo cáo tổng hợp xuất', v:[1,1,1] },
      { c:'12.01.03', t:'Báo cáo chi tiết xuất', v:[1,1,1] },
      { c:'12.01.04', t:'Báo cáo tổng hợp nhập', v:[1,1,1] },
      { c:'12.01.05', t:'Báo cáo chi tiết nhập', v:[1,1,1] },
      { c:'12.01.06', t:'Báo cáo xuất nhập tồn', v:[1,1,1] },
      { c:'12.01.07', t:'Báo cáo tồn kho hiện tại', v:[1,1,1] },
      { c:'12.01.08', t:'Báo cáo hao hụt NVL', v:[0,1,1] }
    ],
    note:'Bảy báo cáo đầu là bộ tối thiểu để vận hành kho, gói nào cũng có. Báo cáo hao hụt nguyên vật liệu mở từ {{Plus}}.' },

  /* 13 ─ Báo cáo quản trị kho — phần 2 */
  { n:13, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Báo cáo quản trị kho — phần 2'],
    title:'BÁO CÁO MUA, BÁN VÀ TRẢ HÀNG',
    rows:[
      { g:'Nhóm báo cáo quản trị kho' },
      { c:'12.01.09', t:'Báo cáo tỷ lệ trả hàng', v:[0,1,1] },
      { c:'12.01.10', t:'Báo cáo tổng hợp mua hàng', v:[1,1,1] },
      { c:'12.01.11', t:'Báo cáo chi tiết mua hàng', v:[1,1,1] },
      { c:'12.01.12', t:'Báo cáo tổng hợp bán hàng', v:[0,0,1] },
      { c:'12.01.13', t:'Báo cáo chi tiết bán hàng', v:[0,0,1] },
      { c:'12.01.14', t:'Báo cáo tổng hợp trả hàng', v:[0,0,1] },
      { c:'12.01.15', t:'Báo cáo chi tiết trả hàng', v:[0,0,1] }
    ],
    note:'Báo cáo bán hàng và trả hàng đi kèm phân hệ xuất bán của {{Pro}}.' },

  /* 14 ─ Báo cáo đặt hàng · sản xuất */
  { n:14, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Báo cáo đặt hàng · sản xuất'],
    title:'BÁO CÁO ĐẶT HÀNG VÀ SẢN XUẤT',
    rows:[
      { g:'Nhóm báo cáo đặt hàng' },
      { c:'12.02.01', t:'Báo cáo tổng quan kế hoạch đặt hàng nội bộ', v:[0,0,1] },
      { c:'12.02.02', t:'Báo cáo chi tiết kế hoạch đặt hàng nội bộ', v:[0,0,1] },
      { c:'12.02.03', t:'Báo cáo yêu cầu mua hàng', v:[0,0,1] },
      { c:'12.02.04', t:'Báo cáo đặt mua hàng', v:[0,0,1] },
      { c:'12.02.05', t:'Báo cáo đặt hàng nội bộ', v:[0,0,1] },
      { g:'Nhóm báo cáo sản xuất' },
      { c:'12.03.01', t:'Báo cáo tỷ lệ thu hồi', v:[0,0,1] },
      { c:'12.03.02', t:'Báo cáo hiệu quả sơ chế', v:[0,0,1] },
      { c:'12.03.03', t:'Báo cáo hiệu quả chế biến', v:[0,0,1] }
    ],
    note:'Tám báo cáo này bám theo phân hệ đặt hàng, sơ chế và chế biến nên chỉ có trên {{Pro}}.' },

  /* 15 ─ Báo cáo giá thành · công nợ · phân tích */
  { n:15, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Báo cáo giá thành · công nợ · phân tích'],
    title:'BÁO CÁO GIÁ THÀNH, CÔNG NỢ VÀ PHÂN TÍCH',
    rows:[
      { g:'Nhóm báo cáo giá thành' },
      { c:'12.04.01', t:'Báo cáo giá thành sản phẩm', v:[0,1,1] },
      { c:'12.04.02', t:'Báo cáo giá thành chế biến', v:[0,0,1] },
      { g:'Nhóm báo cáo công nợ' },
      { c:'12.05.01', t:'Báo cáo công nợ nội bộ', v:[0,0,1] },
      { c:'12.05.02', t:'Báo cáo công nợ khách hàng', v:[0,0,1] },
      { c:'12.05.03', t:'Báo cáo công nợ nhà cung cấp', v:[1,1,1] },
      { c:'12.05.04', t:'Báo cáo công nợ nhượng quyền', v:[0,0,1] },
      { g:'Nhóm báo cáo phân tích' },
      { c:'12.06.01', t:'Báo cáo phân tích tổng quan nhà cung cấp', v:[0,0,1] },
      { c:'12.06.02', t:'Báo cáo phân tích chi tiết nhà cung cấp', v:[0,0,1] },
      { c:'12.06.03', t:'Báo cáo phân tích chi tiết nguyên vật liệu', v:[0,0,1] }
    ],
    note:'Giá thành sản phẩm và công nợ nhà cung cấp mở từ {{Plus}}. Nhóm phân tích nhà cung cấp và nguyên vật liệu là phần riêng của {{Pro}}.' },

  /* 16 ─ Báo cáo đối soát · kiểm soát */
  { n:16, type:'matrix',
    crumb:['SO SÁNH TÍNH NĂNG','Báo cáo đối soát · kiểm soát'],
    title:'BÁO CÁO ĐỐI SOÁT VÀ KIỂM SOÁT',
    rows:[
      { g:'Nhóm báo cáo đối soát' },
      { c:'12.07.01', t:'Báo cáo NVL tiêu hao KTV', d:'Đối soát nguyên vật liệu tiêu hao với KTV', v:[1,1,1] },
      { c:'12.07.02', t:'Báo cáo giá thành KTV', d:'Đối soát giá thành với KTV', v:[1,1,1] },
      { c:'12.07.03', t:'Báo cáo xuất kho iACC', d:'Đối soát chứng từ xuất kho với iACC', v:[1,1,1] },
      { c:'12.07.04', t:'Báo cáo nhập kho iACC', d:'Đối soát chứng từ nhập kho với iACC', v:[1,1,1] },
      { g:'Nhóm báo cáo kiểm soát' },
      { c:'12.08.01', t:'Báo cáo sửa chứng từ', d:'Kiểm soát lịch sử sửa chứng từ', v:[1,1,1] }
    ],
    note:'Năm báo cáo đối soát với KTV, iACC và lịch sử sửa chứng từ có ở cả ba gói.' },

  /* 17 ─ Gợi ý chọn gói ------------------------------------------------- */
  { n:17, type:'mxsum',
    crumb:['SO SÁNH TÍNH NĂNG','Chọn gói'],
    title:'CHỌN GÓI NÀO?',
    sub:'Chọn theo cách vận hành thật của cửa hàng, không chọn theo số tính năng.',
    total:'99 tính năng',
    packs:[
      { k:'st', logo:'logo-ivt-standard.png', n:'28',
        t:'Một điểm bán, mua hàng và bán POS là chính.',
        li:['Chưa cần công thức chế biến',
            'Chỉ cần biết tồn kho và giá vốn',
            'Kiểm kê định kỳ, đối soát với kế toán'] },
      { k:'pl', logo:'logo-ivt-plus.png', n:'46',
        t:'Có bếp, cần tính giá thành và theo dõi hao hụt.',
        li:['Món có công thức, cần định lượng nguyên liệu',
            'Muốn biết hao hụt và tỷ lệ trả hàng',
            'Có bảng giá riêng cho từng nhóm hàng'] },
      { k:'pr', logo:'logo-ivt-pro.png', n:'99',
        t:'Chuỗi nhiều điểm bán, có kho tổng, có nhượng quyền.',
        li:['Điều chuyển nội bộ và công nợ giữa các chi nhánh',
            'Quy trình đặt hàng, sơ chế, chế biến đầy đủ',
            'Cần trọn bộ báo cáo phân tích và đối soát'] }
    ] },

  /* 18 ─ Cảm ơn ---------------------------------------------------------- */
  { n:18, type:'thanks',
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
   V3 — 18 slide
   Nguồn: "IVT V3 Introduction" (bài giới thiệu nội bộ, 09/04/2026).
   Có cả phần chính sách sale. Trước đây khoá bằng mã, nay bỏ khoá: sale gửi
   khách bản PDF xuất từ nút PDF chứ không gửi link ra ngoài.
   ══════════════════════════════════════════════════════════════════════════ */
v3: {
  id: 'v3',
  name: 'Cập nhật Inventory V3',
  short: 'V3',
  tagline: 'Bản nâng cấp lớn nhất của iPOS Inventory',
  dir: 'assets/slides/v3/',
  vdir: 'assets/video/',
  slides: [

  /* 1 ─ Bìa: chữ chìm + ba thiết bị xếp lớp, dựng bằng HTML --------------- */
  { n:1, type:'cover', variant:'devices',
    logo:'logo-ipos.png',
    watermark:'iPOS IVT V3',
    lines:['ĐIỂM LẠI CÁC THAY ĐỔI LỚN','CỦA PHIÊN BẢN V3'],
    /* thứ tự: điện thoại trái · màn hình giữa · điện thoại phải */
    devices:['ione-quet-anh.webp','tong-quan.webp','ione-chat.webp'] },

  /* 2 ─ Nội dung ---------------------------------------------------------- */
  { n:2, type:'agenda',
    kicker:'MỤC LỤC',
    title:'Nội dung',
    items:[
      { t:'Vì sao có bản này' },
      { t:'Ba gói bản quyền mới' },
      { t:'Mua, gia hạn và đổi gói' },
      { t:'Menu gom theo nhóm nghiệp vụ' },
      { t:'Quy trình hoá nghiệp vụ' },
      { t:'Bộ lọc mới' },
      { t:'Trợ lý iOne' },
      { t:'Kho trên FABi và danh mục trên App' },
      { t:'Giao diện báo cáo mới' },
      { t:'Chuyển đổi có thời gian thích nghi' }
    ] },

  /* 2 ─ Tổng quan -------------------------------------------------------- */
  { n:3, type:'intro',
    kicker:'TỔNG QUAN',
    title:'Bản nâng cấp lớn nhất của IVT',
    img:'tong-quan.webp',
    lead:'Menu sắp lại theo dòng chảy nghiệp vụ kho, bộ lọc làm mới, gói bản quyền chuẩn hoá thành ba bậc **Standard – Plus – Pro**, và Trợ lý iOne lo phần nhập mua và kiểm kê.',
    chips:['Menu theo nghiệp vụ','Bộ lọc mới','Ba gói bản quyền','Trợ lý iOne'],
    note:'Trang chủ V3 tách bạch khu **Quản trị** và **Cần theo dõi**, số liệu kho hiển thị ngay khi mở.' },

  /* 3 ─ Vì sao có bản này ------------------------------------------------ */
  { n:4, type:'pillars', cols:3, fit:1,
    kicker:'MỞ ĐẦU',
    title:'VÌ SAO CÓ BẢN NÀY',
    items:[
      { n:'01', c:'#12988c', t:'**Gom về một sản phẩm.** Trước có hai dòng chạy song song là IVT Lite và IVT Pro. Nay chỉ còn Inventory 3.0, khách không đổi phần mềm, chỉ đổi gói bản quyền.' },
      { n:'02', c:'#1b6fe0', t:'**Bắt kịp thứ khách hay đem ra so.** Giao diện, tốc độ thao tác, bộ lọc và bộ báo cáo đều làm lại.' },
      { n:'03', c:'#6d3fd4', t:'**Đưa AI vào phần việc tay chân.** Trợ lý iOne quét ảnh lập phiếu, nhận lệnh qua chat, kiểm kê bằng giọng nói.' }
    ] },

  /* 4 ─ Bốn thay đổi lớn nhất -------------------------------------------- */
  { n:5, type:'pillars', cols:2,
    kicker:'CÓ GÌ MỚI',
    title:'BỐN THAY ĐỔI LỚN NHẤT',
    items:[
      { n:'01', c:'#12988c', t:'**Gói bản quyền** chuẩn hoá thành ba bậc Standard, Plus và Pro' },
      { n:'02', c:'#1b6fe0', t:'**Menu** gom theo nhóm nghiệp vụ thay cho danh sách phiếu dài' },
      { n:'03', c:'#e0673d', t:'**Bộ lọc** gọn lại, điều kiện thường dùng nằm ngay trên thanh công cụ' },
      { n:'04', c:'#6d3fd4', t:'**Trợ lý iOne** làm hộ phần nhập mua và kiểm kê' }
    ] },

  /* 4 ─ Gói mới · chuyển đổi tự động, kèm điều khách cũ cần lưu ý -------- */
  { n:6, type:'packs',
    crumb:['GÓI BẢN QUYỀN {{V3}}','Với khách hàng'],
    title:'CHUYỂN ĐỔI TỰ ĐỘNG, KHÔNG CẦN THAO TÁC',
    packs:[
      { logo:'logo-ivt-plus.png',     c:'#1b6fe0', from:'Đang dùng Lite',      to:'Gói Plus' },
      { logo:'logo-ivt-pro.png',      c:'#b0741f', from:'Đang dùng Pro',       to:'Gói Pro' },
      { logo:'logo-ivt-standard.png', c:'#7c8a9c', from:'Các trường hợp khác', to:'Gói Standard' }
    ],
    notes:[
      { h:'KHÁCH IVT PRO CŨ', ic:'check', items:[
        '**Giữ nguyên** link web và app đang dùng',
        '**Không cần** tải lại hay đổi đường truy cập' ] },
      { h:'KHÁCH IVT LITE CŨ', ic:'swap', items:[
        'Cần **tải app iPOS IVT Pro mới** để dùng thay app cũ',
        'Link web cũ **ivtlite.ipos.vn** ~~không dùng được~~, hệ thống điều hướng sang **ivt.ipos.vn**',
        'Khách vào từ **CMS FABi** được ~~tự chuyển~~ sang link web mới' ] }
    ] },

  /* 5 ─ Ba gói có gì ----------------------------------------------------- */
  { n:7, type:'mxsum',
    crumb:['GÓI BẢN QUYỀN {{V3}}','Ba gói'],
    title:'BA GÓI CÓ GÌ',
    sub:'Cùng một phần mềm, khác nhau ở số phân hệ được mở.',
    total:'99 tính năng',
    packs:[
      { k:'st', logo:'logo-ivt-standard.png', n:'28',
        t:'Miễn phí, không giới hạn thời gian.',
        li:['Nhập mua và công nợ nhà cung cấp',
            'Tồn kho và kiểm kê hàng bán thẳng',
            'Mười lăm báo cáo quản trị kho và đối soát'] },
      { k:'pl', logo:'logo-ivt-plus.png', n:'46',
        t:'Bằng đúng bản IVT Lite cũ.',
        li:['Trừ kho theo định lượng',
            'Quản lý giá vốn và hàng hỏng huỷ',
            'Trợ lý iOne bản cơ bản'] },
      { k:'pr', logo:'logo-ivt-pro.png', n:'99',
        t:'Bằng đúng bản IVT Pro hiện tại.',
        li:['Điều chuyển, đặt hàng, sản xuất',
            'Bán hàng, công nợ khách và nội bộ',
            'Nhượng quyền và Trợ lý iOne nâng cao'] }
    ] },

  /* 6 ─ Chính sách gói --------------------------------------------------- */
  { n:8, type:'pillars', cols:3, fit:1,
    crumb:['GÓI BẢN QUYỀN {{V3}}','Chính sách'],
    title:'HẾT HẠN THÌ VỀ STANDARD',
    items:[
      { n:'01', c:'#7c8a9c', t:'**Standard miễn phí.** Khách nào cũng dùng được, ~~không giới hạn thời gian~~.' },
      { n:'02', c:'#12988c', t:'**Khách mới được 30 ngày thử gói Pro.** Hết 30 ngày mà không mua Plus hay Pro thì về Standard.' },
      { n:'03', c:'#e0673d', t:'**Plus và Pro hết hạn không gia hạn cũng về Standard.** Dữ liệu giữ nguyên, mở lại gói là dùng tiếp.' }
    ] },

  /* 7 ─ Gói mới · quy tắc mua, nâng, hạ ---------------------------------- */
  { n:9, type:'webshot', frame:1,
    crumb:['GÓI BẢN QUYỀN {{V3}}','Với khách hàng'],
    title:'MUA MỚI, NÂNG VÀ HẠ GÓI',
    img:'goi-ban-quyen.webp',
    items:[
      { t:'Khách mới mặc định gói Standard', s:'30 ngày đầu mở full tính năng gói Pro' },
      { t:'Mua mới gói Pro ngay trên sản phẩm', s:'Hệ thống tự tạo phiếu triển khai cho iAcc' },
      { t:'Nâng bất cứ lúc nào, hạ khi còn dưới 60 ngày', s:'Ngày còn lại quy ra tiền, cộng sang gói mới' },
      { t:'Lên Pro còn có phí triển khai', s:'Áp cho mô hình kho tổng và kho cửa hàng' }
    ] },

  /* 8 ─ Mua và gia hạn ngay trên hệ thống -------------------------------- */
  { n:10, type:'webshot', frame:1,
    crumb:['GÓI BẢN QUYỀN {{V3}}','Mua và gia hạn'],
    title:'MUA VÀ GIA HẠN NGAY TRÊN HỆ THỐNG',
    img:'gia-han.webp',
    items:[
      { t:'Mua mới ngay trên hệ thống', s:'Gói Pro thanh toán xong là có phiếu triển khai' },
      { t:'Mua và gia hạn nhiều điểm một lần', s:'Ảnh bên là gia hạn tám cửa hàng' },
      { t:'Ưu đãi giữ như đang chạy', s:'Gia hạn càng dài quà càng lớn' }
    ],
    note:'Khách mua online điền email giới thiệu **@ipos.vn** thì sale hoặc CS đó được ghi nhận ~~KPI và doanh số~~.' },

  /* 7 ─ Gói mới · với sale ----------------------------------------------- */
  { n:11, type:'pillars', cols:2, fit:1,
    crumb:['GÓI BẢN QUYỀN {{V3}}','Với sale'],
    title:'THAY ĐỔI KHI BÁN HÀNG',
    items:[
      { n:'01', c:'#12988c', t:'**Chính sách bán hàng giữ nguyên.** Không thay đổi gì so với chính sách hiện hành đang áp dụng cho sale, hoa hồng tương ứng gói mới.' },
      { n:'02', c:'#e0673d', t:'**Chuyển đổi gói theo logic gia hạn** và ~~không tính KPI~~. Trước đây là 2 sản phẩm nên tính mua mới và có KPI.' }
    ] },

  /* 8 ─ Menu · bảng nhóm nghiệp vụ --------------------------------------- */
  { n:12, type:'modgrid',
    crumb:['MENU {{V3}}','Gom theo nhóm nghiệp vụ'],
    title:'CHỨC NĂNG GOM VỀ ĐÚNG NHÓM',
    groups:[
      { h:'Đặt hàng', ic:'cart', span:3, c:'#12988c',
        items:['Giữ nguyên như bản cũ'] },
      { h:'Mua hàng', ic:'truck', span:3, c:'#1b6fe0',
        items:['Nhập mua','Xuất trả','Công nợ NCC'] },
      { h:'Bán hàng', ic:'shop', span:3, c:'#e0673d',
        items:['Xuất bán Pos','Xuất bán','Nhập trả','Công nợ KH'] },
      { h:'Điều chuyển', ic:'swap', span:3, c:'#6d3fd4',
        items:['Xuất điều chuyển','Nhập điều chuyển','Nhập thu hồi'] },
      { h:'Sản xuất', ic:'chef', span:3, c:'#c2408f',
        items:['Xuất sơ chế','Nhập sơ chế','Xuất chế biến','Nhập chế biến'] },
      { h:'Hỏng huỷ', ic:'trash', span:3, c:'#c9391f',
        items:['Xuất huỷ'] },
      { h:'Nhập xuất khác', ic:'box', span:3, c:'#1d8fb5',
        items:['Xuất khác','Nhập khác'] },
      /* Kiểm kê và Công nợ là hai nhóm riêng, gộp chung một ô vì chín ô thì
         lưới thành ba hàng, cao quá khung 500px và chữ bị cắt. */
      { h:'Kiểm kê · Công nợ', ic:'clip', span:3, c:'#c98a12',
        items:['Kiểm kê giữ nguyên','Công nợ NCC · KH · nội bộ'] }
    ] },

  /* 9 ─ Menu · ảnh và các thay đổi khác ---------------------------------- */
  { n:13, type:'device',
    crumb:['MENU {{V3}}','Gom theo nhóm nghiệp vụ'],
    title:'MENU ĐIỀU HƯỚNG MỚI',
    imgs:['menu.webp'], colw:330,
    items:[
      { t:'Bỏ menu Giá vốn', s:'Tính giá vốn chuyển về menu Kế toán' },
      { t:'Cài đặt ➜ Thiết lập quy về một nơi', s:'Công nợ đầu kỳ, Quy tắc giá vốn, Định mức tồn kho, Nhân viên (trước là Tài khoản), Kế hoạch tự động' },
      { t:'Thêm menu Kết nối', s:'Mở đầu với kết nối Misa Amis để đồng bộ dữ liệu sang phần mềm kế toán' }
    ],
    note:'Menu gom thành **chín nhóm nghiệp vụ**. Tìm nhanh hơn, và ~~nhân viên mới học nhanh hơn~~ vì chức năng nằm đúng chỗ người ta nghĩ tới.' },

  /* 10 ─ Quy trình hoá nghiệp vụ ----------------------------------------- */
  { n:14, type:'webshot',
    crumb:['QUY TRÌNH HOÁ {{V3}}','Nghiệp vụ sản xuất'],
    title:'MỖI NGHIỆP VỤ CÓ THÊM PHẦN QUY TRÌNH',
    img:'quy-trinh-san-xuat.webp', frame:1,
    items:[
      { t:'Bắt đầu với nghiệp vụ Sản xuất', s:'Luồng nhiều bước và dễ nhầm nhất: sơ chế, chế biến, thành phẩm' },
      { t:'Các nghiệp vụ còn lại làm dần', s:'Quy trình hoá tiếp trong các bản cập nhật sau' }
    ],
    note:'Popup **Quy trình sản xuất** cho thấy toàn cảnh luồng Nguyên liệu ➜ Sơ chế ➜ Bán thành phẩm ➜ Chế biến ➜ Món bán, kèm giải thích khi nào dùng Sơ chế, khi nào dùng Chế biến.' },

  /* 11 ─ Bộ lọc · bản cũ ------------------------------------------------- */
  { n:15, type:'webshot', frame:1,
    crumb:['BỘ LỌC {{V3}}','Trước — bản cũ'],
    title:'MỌI ĐIỀU KIỆN BÀY HẾT RA ĐẦU TRANG',
    img:'bo-loc-cu.webp',
    items:[
      { t:'Chiếm ba hàng đầu trang', s:'Phải cuộn qua hết mới nhìn thấy dữ liệu' },
      { t:'Điều kiện nào cũng bày ra', s:'Dùng hay không dùng đều chiếm chỗ như nhau' }
    ] },

  /* 12 ─ Bộ lọc · V3 ----------------------------------------------------- */
  { n:16, type:'webshot', frame:1,
    crumb:['BỘ LỌC {{V3}}','Sau — V3'],
    title:'GỌN VÀ NHANH HƠN',
    img:'s13.png',
    items:[
      { t:'Điều kiện thường dùng ra ngoài', s:'Nằm ngay trên thanh công cụ' },
      { t:'Điều kiện nâng cao thu một chỗ', s:'Mở ra khi cần dùng tới' },
      { t:'Ít click hơn', s:'Ra đúng dữ liệu muốn xem nhanh hơn' },
      { t:'Trạng thái lọc luôn hiện rõ', s:'Không còn bị xem thiếu dữ liệu' }
    ] },

  /* 13 ─ Trợ lý iOne ----------------------------------------------------- */
  { n:17, type:'trio',
    crumb:['TRỢ LÝ {{V3}}','iOne'],
    title:'TRỢ LÝ iOne LÀM HỘ PHẦN VIỆC TAY',
    items:[
      { f:'ione-quet-anh.webp', t:'Quét ảnh tạo phiếu nhập mua',
        s:'Chụp hoá đơn hoặc phiếu giao hàng, Trợ lý đọc và điền sẵn dòng hàng, số lượng, đơn giá. Nhà cung cấp, kho và hàng hoá được dò trong danh mục, thiếu thì tạo mới ngay tại chỗ.' },
      { f:'ione-chat.webp', t:'Chat để lập phiếu nhập mua',
        s:'Gõ yêu cầu bằng tiếng Việt tự nhiên, Trợ lý dựng phiếu nháp để bạn kiểm tra và lưu.' },
      { f:'ione-giong-noi.webp', t:'Kiểm kê bằng giọng nói',
        s:'Đọc tên hàng và số lượng khi đang đứng trong kho — không cần rời tay khỏi hàng để nhập máy.' }
    ] },

  /* 14 ─ Kho trên FABi --------------------------------------------------- */
  { n:18, type:'device',
    crumb:['MỞ RỘNG {{V3}}','App Manager và CMS FABi'],
    title:'DÙNG KHO NGAY TRÊN FABi',
    imgs:['fabi-app.webp','fabi-cms.webp'], colw:440,
    items:[
      { t:'Trên app FABi Manager', s:'Vào Ứng dụng ➜ Kho & Cung ứng' },
      { t:'Trên CMS FABi', s:'Vào thẳng menu Kho & Cung ứng trên thanh menu chung' }
    ],
    note:'Đầy đủ như App và Web IVT riêng lẻ, ~~không cần đăng nhập hệ thống khác~~. Tài khoản phải được phân quyền **Kho & Cung ứng** mới thấy menu này.' },

  /* Danh mục sửa được ngay trên App -------------------------------------- */
  { n:19, type:'device',
    crumb:['MỞ RỘNG {{V3}}','Danh mục trên App'],
    title:'SỬA DANH MỤC NGAY TRÊN APP',
    imgs:['danh-muc-app.webp'], colw:340,
    items:[
      { t:'Bản cũ chỉ sửa được trên Web', s:'Đổi tên hàng hay thêm một đơn vị tính cũng phải mở máy tính lên' },
      { t:'Từ bản này làm thẳng trên App', s:'Xem, thêm, sửa, xoá ngay trên điện thoại' },
      { t:'Đủ danh mục thường dùng', s:'Hàng hoá, nhóm hàng, đơn vị tính, quy đổi, công thức sơ chế và chế biến, kho hàng, khách hàng, nhà cung cấp' }
    ],
    note:'Vào ở mục **Khác ➜ Danh mục**. Mỗi dòng hiện luôn tổng số đã khai, ~~không cần mở ra mới biết~~.' },

  /* 15 ─ Báo cáo mới ----------------------------------------------------- */
  { n:20, type:'webshot',
    crumb:['BÁO CÁO {{V3}}','Giao diện mới trên Web'],
    title:'DANH SÁCH BÁO CÁO TỔ CHỨC LẠI',
    img:'bao-cao.webp', frame:1,
    items:[
      { t:'Nhóm theo đúng tính chất và mối tương quan', s:'Quản trị kho, đặt hàng, sản xuất, giá thành, công nợ, phân tích, đối soát, kiểm soát' },
      { t:'Trải báo cáo theo chiều ngang', s:'Kèm một dòng giải thích ý nghĩa từng báo cáo' }
    ],
    note:'Các nhóm báo cáo **A–H** nằm trên một hàng tab, báo cáo trong nhóm trải ngang theo mã A01, A02…' },

  /* 16 ─ Chuyển đổi có thời gian thích nghi ------------------------------ */
  { n:21, type:'webshot', frame:1,
    crumb:['CHUYỂN ĐỔI {{V3}}','Thời gian thích nghi'],
    title:'TỚI 10/10/2026 VẪN QUAY LẠI BẢN CŨ ĐƯỢC',
    img:'quay-lai-ban-cu.webp',
    items:[
      { t:'Quay lại bản cũ bất cứ lúc nào', s:'Trước 10/10/2026, nếu đội ngũ cần thêm thời gian làm quen' },
      { t:'Dữ liệu dùng chung', s:'Không mất mát khi chuyển qua lại hai bản' },
      { t:'Hai lối quay lại', s:'Menu tài khoản ➜ Quay lại giao diện v2, hoặc nút trong popup Có gì mới' }
    ],
    note:'Sau **10/10/2026** toàn bộ giao diện chuyển hẳn sang bản mới, ~~không quay lại được nữa~~.' },

  /* 17 ─ Chốt lại -------------------------------------------------------- */
  { n:22, type:'pillars',
    kicker:'CHỐT LẠI',
    title:'V3 ĐỔI GÌ CHO NGƯỜI DÙNG',
    items:[
      { n:'01', c:'#12988c', t:'Tìm chức năng nhanh hơn vì menu theo đúng dòng chảy nghiệp vụ' },
      { n:'02', c:'#1b6fe0', t:'Ít thao tác hơn để ra đúng dữ liệu cần xem' },
      { n:'03', c:'#6d3fd4', t:'Bớt việc nhập tay nhờ Trợ lý iOne và quy trình có hướng dẫn' }
    ] },

  /* 18 ─ Hỗ trợ ---------------------------------------------------------- */
  { n:23, type:'thanks',
    title:'Cần hỗ trợ?',
    sub:'Chuyển đổi gói hoặc đào tạo nhân sự trên V3 — liên hệ chuyên viên phụ trách, hoặc mở mục Hỗ trợ ngay trên thanh công cụ.',
    company:'iPOS.vn Joint Stock Company',
    contact:['Tel: 1900 4766','www.iPOS.vn'],
    offices:[
      { city:'TP Hà Nội',      addr:'Tầng 11, Tòa tháp Hòa Bình, 106 Hoàng Quốc Việt, P. Nghĩa Đô, Q. Cầu Giấy' },
      { city:'TP Đà Nẵng',     addr:'Số 80 Núi Thành, phường Hòa Thuận Đông, quận Hải Châu, Thành phố Đà Nẵng' },
      { city:'TP Hồ Chí Minh', addr:'Tầng 12, Tòa nhà Lottery Tower, 77 Trần Nhân Tôn, Phường 9, Quận 5' }
    ],
    more:{ h:'Tài liệu nội bộ:',
           t:'Bản này giữ cả phần chính sách sale nên chỉ dùng để đào tạo nội bộ iPOS' } }

  ]
}

};
