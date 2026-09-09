/* =============================================================================
   iPOS INVENTORY — WEB PRESENT · bộ dựng slide
   Khung 1280×720 cố định, scale vừa màn hình. Có auto-fit chống tràn chữ.
   ========================================================================== */
(function () {
'use strict';

const W = 1280, H = 720;
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [].slice.call((r || document).querySelectorAll(s));

/* ── Icon ────────────────────────────────────────────────────────────────── */
const P = a => `<svg viewBox="0 0 24 24">${a}</svg>`;
const IC = {
  info : P('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
  check: P('<path d="M20 6 9 17l-5-5"/>'),
  left : P('<path d="M15 18 9 12l6-6"/>'),
  right: P('<path d="m9 18 6-6-6-6"/>'),
  gridi: P('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),
  full : P('<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>'),
  x    : P('<path d="M18 6 6 18M6 6l12 12"/>'),
  flag : P('<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>'),
  help : P('<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>'),
  cart : P('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>'),
  org  : P('<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-2h14v2"/>'),
  chef : P('<path d="M6 13.9A4 4 0 1 1 9.5 7a4.5 4.5 0 0 1 8.6 1.3A3.5 3.5 0 0 1 18 14.9V21H6z"/><path d="M6 17h12"/>'),
  wh   : P('<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-7h6v7"/><path d="M3 21h18"/>'),
  plan : P('<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 2v4M15 2v4M4 10h16M9 15h6"/>'),
  shop : P('<path d="M3 9V4h18v5"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M9 21v-6h6v6"/>'),
  user : P('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  box  : P('<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'),
  list : P('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h7M9 12h7M9 16h4"/><path d="M6 8h.01M6 12h.01M6 16h.01"/>'),
  truck: P('<path d="M1 4h13v11H1z"/><path d="M14 8h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'),
  undo : P('<path d="M3 7v6h6"/><path d="M3.5 13a9 9 0 1 0 2.1-6.4L3 9"/>'),
  swap : P('<path d="M7 3v13"/><path d="m3 7 4-4 4 4"/><path d="M17 21V8"/><path d="m13 17 4 4 4-4"/>'),
  trash: P('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/>'),
  clip : P('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.5h6V4"/><path d="m9 12 2 2 4-4"/>'),
  home : P('<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'),
  cash : P('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>'),
  chart: P('<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="7"/><rect x="13" y="7" width="3" height="11"/><rect x="19" y="14" width="1" height="4"/>'),
  cog  : P('<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>')
};

/* ── Chữ ─────────────────────────────────────────────────────────────────── */
const esc = s => String(s == null ? '' : s)
  .replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* **đậm**  ~~cam nhấn~~  (giữ lại thẻ <b> viết sẵn trong data) */
function md (s) {
  if (s == null) return '';
  return String(s)
    .replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;')
    .replace(/<(?!\/?(b|br)>)/g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/~~(.+?)~~/g, '<em class="hl">$1</em>')
    /* {{Plus}} / {{Pro}} -> thẻ badge, lấy màu từ logo sản phẩm */
    .replace(/\{\{(Plus|Pro)\}\}/g,
      (m, g) => '<span class="tbdg ' + g.toLowerCase() + '">' + g + '</span>');
}
const xf = o => (o && o.x ? ' xflag' : '');

/* Nhiều ảnh chụp máy xếp ngang trong một cột thì phải hạ chiều cao khung,
   không thì tổng bề ngang vượt cột và tràn ra ngoài slide.
   Stage cố định 1280×720 nên tính thẳng bằng số được. */
const SHOT_R = 1272 / 2772;
const COL_H = 500;          // chiều cao trống thật của .s-body ở slide có tiêu đề
const PAD   = 12;           // viền trắng của khung máy (.pf padding 6px hai bên)
/* Ngưỡng đổi sang chế độ xấp trang — phải khớp @media trong style.css. */
const MOB_W = 900;
const isMob = () => innerWidth < MOB_W;
function frameH (n, colW, colH, gap) {
  if (n < 2) return '';
  const w = (colW - (n - 1) * gap) / n;      // bề ngang tối đa cho một khung
  const h = (w - PAD) / SHOT_R + PAD;        // PAD là viền trắng, phải trừ ra rồi cộng lại
  // Cao hơn chỗ trống thì đừng ép — để CSS height:100% lo, không thì tràn mất đầu ảnh.
  return h < colH ? ` style="height:${h.toFixed(0)}px"` : '';
}
const framed = (files, dir, fs) => files.map(f =>
  `<div class="pf"${fs}><img src="${dir}${f}" alt="" data-zoom></div>`).join('');

/* ── Bộ dựng từng loại slide ─────────────────────────────────────────────── */
const head = (kicker, title, sub, cls) => `
  <div class="s-head">
    ${kicker ? `<div class="kicker">${kicker}</div>` : ''}
    <h1 class="s-title ${cls || ''}">${md(title)}</h1>
    <div class="rule"></div>
    ${sub ? `<div class="s-sub">${md(sub)}</div>` : ''}
  </div>`;

const crumb = a => (a || []).map((s, i) =>
  (i ? '<span class="sep">›</span>' : '') + `<span>${md(s)}</span>`).join('');

const T = {

cover (s, d) {
  /* Bìa nền tranh, chữ dồn về khoảng trống bên trái */
  if (s.variant === 'left') {
    return `<div class="cvl nodeco">
      <img class="bg" src="${d.dir}${s.img}" alt="">
      <div class="tx">
        <img class="lg" src="assets/${s.logo || 'logo-ipos.png'}" alt="iPOS.vn">
        <h1>${s.lines.map(t => esc(t)).join('<br>')}${
          s.badge ? `<span class="bdg">${esc(s.badge)}</span>` : ''}</h1>
        <div class="rule"></div>
      </div>
    </div>`;
  }
  /* Bìa Pro: chữ chìm cỡ lớn + 3 thiết bị xếp lớp (điện thoại · màn hình · điện thoại) */
  if (s.variant === 'devices') {
    const [l, mid, r] = s.devices;
    return `<div class="cvd nodeco">
      <span class="wm">${esc(s.watermark)}</span>
      <div class="hd">
        <img class="lg" src="assets/${s.logo || 'logo-ipos.png'}" alt="iPOS.vn">
        <h1>${s.lines.map(t => esc(t)).join('<br>')}${
          s.badge ? `<span class="pro">${esc(s.badge)}</span>` : ''}</h1>
        <div class="rule"></div>
      </div>
      <div class="dv scr"><img src="${d.dir}${mid}" alt="" data-zoom></div>
      <div class="dv ph l"><img src="${d.dir}${l}" alt="" data-zoom></div>
      <div class="dv ph r"><img src="${d.dir}${r}" alt="" data-zoom></div>
    </div>`;
  }
  /* Chữ dồn trái, tranh chiếm nửa phải — dùng cho slide Nội dung */
  if (s.variant === 'split') {
    return `<div class="cvs nodeco">
      <div class="tx">
        <div><h1>${esc(s.lines[0])}</h1><div class="rule"></div></div>
        <div class="ag">${(s.agenda || []).map((t, i) =>
          `<div><i>${String(i + 1).padStart(2, '0')}</i><span>${md(t)}</span></div>`).join('')}</div>
      </div>
      <div class="art"><img src="${d.dir}${s.img}" alt=""></div>
    </div>`;
  }
  if (s.variant === 'pro') {
    return `<div class="cvp nodeco">
      <div class="ph${s.fit === 'contain' ? ' contain' : ''}"><img src="${d.dir}${s.img}" alt=""></div>
      <div class="bt">
        <div><h1>${esc(s.lines[0])}</h1><div class="rule"></div></div>
        <div class="ag">${(s.agenda || []).map((t, i) =>
          `<div><i>${String(i + 1).padStart(2, '0')}</i><span>${md(t)}</span></div>`).join('')}</div>
      </div>
    </div>`;
  }
  return `<div class="cv">
    <img src="${d.dir}${s.img}" alt="">
    <div class="cv-tx">
      ${s.lines.map((t, i) => `<b class="${i ? 'sm' : ''}">${esc(t)}</b>`).join('')}
      ${s.version ? `<span>${esc(s.version)}</span>` : ''}
    </div>
  </div>`;
},

end (s, d) { return `<div class="endimg nodeco"><img src="${d.dir}${s.img}" alt=""></div>`; },

agenda (s) {
  return head('Mục lục', s.title) + `<div class="s-body"><div class="agenda">
    ${s.items.map((it, i) => `<div class="it${xf(it)}">
      <b>${String(i + 1).padStart(2, '0')}</b><span>${md(it.t)}</span></div>`).join('')}
  </div></div>`;
},

cards3 (s) {
  return head('Nghiệp vụ nền tảng', s.title) + `<div class="s-body"><div class="defs">
    <div class="row">${s.cards.map(c =>
      `<div class="c"><h3>${esc(c.h)}</h3><p>${md(c.t)}</p></div>`).join('')}</div>
    <div class="fx"><h3>${esc(s.formula.h)}</h3><p>${md(s.formula.t)}</p></div>
  </div></div>`;
},

section (s) {
  return `<div class="sect nodeco">
    <div class="l">
      <div class="num">PHẦN ${esc(s.num)}</div>
      <h1>${md(s.title)}</h1>
      <div class="ln"></div>
      ${s.lead ? `<p class="${s.leadX ? 'xflag' : ''}">${md(s.lead)}</p>` : ''}
    </div>
    <div class="r"><i></i><i></i><b>${esc(s.num)}</b></div>
  </div>`;
},

bullets (s, d) {
  return `<div class="s-body"><div class="bl${s.small ? ' sm' : ''}${s.art ? ' hasart' : ''}">
    <div class="lft">
      ${s.num ? `<div class="num">PHẦN ${esc(s.num)}</div>` : ''}
      <h1>${md(s.title)}</h1><div class="ln"></div>
      ${s.art ? `<div class="art"><img src="${d.dir}${s.art}" alt=""></div>` : ''}
    </div>
    <ul>${s.items.map(t => `<li><i></i><span>${md(t)}</span></li>`).join('')}</ul>
  </div></div>`;
},

hero (s, d) {
  const body = s.items
    ? `<ul>${s.items.map(t => `<li><i></i><span>${md(t)}</span></li>`).join('')}</ul>`
    : `<p>${md(s.body)}</p>` + (s.body2 ? `<p>${md(s.body2)}</p>` : '');
  const pic = s.devices
    ? `<div class="pic dvb"><div class="dvband">
         <div class="dv scr"><img src="${d.dir}${s.devices[1]}" alt="" data-zoom></div>
         <div class="dv ph l"><img src="${d.dir}${s.devices[0]}" alt="" data-zoom></div>
         <div class="dv ph r"><img src="${d.dir}${s.devices[2]}" alt="" data-zoom></div>
       </div></div>`
    : `<div class="pic"><img src="${d.dir}${s.img}" alt=""></div>`;
  return `<div class="hero nodeco">
    ${pic}
    <div class="tx" data-fit>
      <div>
        ${s.num ? `<div class="num">PHẦN ${esc(s.num)}</div>` : ''}
        <h1>${md(s.title)}</h1><div class="ln"></div>
      </div>
      <div>${body}</div>
    </div>
  </div>`;
},

/* Banner hero dựng 100% bằng HTML — không phải ảnh ghép.
   Sửa chữ / thay 1 màn hình không phải làm lại cả banner. */
heroshots (s, d) {
  const N = s.shots.length;
  const H = 520;                       // chiều cao banner (khớp .bnr trong CSS)
  const W = 200, SPAN = 1000, L0 = 140;// bề ngang máy, vùng trải, lề trái
  const RATIO = 2772 / 1272;           // tỉ lệ ảnh chụp App
  const PH = (W - 10) * RATIO + 10;    // cao cả khung trắng
  const gap = N > 1 ? (SPAN - N * W) / (N - 1) : 0;
  const mid = (N - 1) / 2;

  let out = '';
  s.shots.forEach((sh, i) => {
    const left = L0 + i * (W + gap);
    const dist = Math.abs(i - mid) / (mid || 1);   // 0 ở giữa, 1 ở rìa
    const bottom = -(18 + dist * 28);              // vòng cung: máy giữa cao nhất
    const rot = ((i - mid) / (mid || 1)) * 4;      // nghiêng nhẹ ra hai bên
    const z = 10 - Math.round(dist * 4);           // máy giữa nằm lớp trên
    const top = H - PH - bottom;                   // mép trên của máy

    if (sh.t) {                                    // nhãn nằm ngay trên máy của nó
      out += `<div class="cap" style="left:${left.toFixed(1)}px;top:${(top - 58).toFixed(1)}px;
        width:${(W + Math.max(gap, 22)).toFixed(1)}px"><span>${md(sh.t)}</span></div>`;
    }
    out += `<div class="ph" style="left:${left.toFixed(1)}px;bottom:${bottom.toFixed(1)}px;
      width:${W}px;z-index:${z};transform:rotate(${rot.toFixed(1)}deg)">
      <img src="${d.dir}${sh.f}" alt="" data-zoom></div>`;
  });

  const banner = `<div class="bnr">
    <span class="orb a"></span><span class="orb b"></span>
    <span class="beam"></span><span class="wave"></span>
    <div class="brand"><span class="nm">${esc(s.brand)}</span>${
      s.badge ? `<span class="bdg">${esc(s.badge)}</span>` : ''}</div>
    ${out}
  </div>`;

  return `<div class="hero nodeco">
    <div class="pic wide">${banner}</div>
    <div class="tx" data-fit>
      <div>
        ${s.num ? `<div class="num">PHẦN ${esc(s.num)}</div>` : ''}
        <h1>${md(s.title)}</h1><div class="ln"></div>
      </div>
      <div><p>${md(s.body)}</p></div>
    </div>
  </div>`;
},

/* Sơ đồ luồng: ô là div HTML (chữ tự xuống dòng), đường nối là SVG phía sau.
   Toạ độ trong data tính trên khung 1164×480 — sửa thẳng trong slides-data.js. */
flow (s) {
  const AR = `<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7"
    markerHeight="7" orient="auto-start-reverse">
    <path d="M0,1 L9,5 L0,9 z" fill="#33507a"/></marker>`;
  return head(s.kicker ? crumb([s.kicker]) : '', s.title, s.sub, 'up') +
    `<div class="s-body"><div class="flow">
      <svg class="ln" viewBox="0 0 1164 480" preserveAspectRatio="xMidYMid meet">
        <defs>${AR}</defs>
        ${s.paths.map(p => `<path d="${p}" marker-end="url(#ah)"/>`).join('')}
        ${(s.marks || []).map(m =>
          `<text x="${m.x}" y="${m.y}" text-anchor="middle">${esc(m.t)}</text>`).join('')}
      </svg>
      ${s.nodes.map(n => `<div class="nd${n.alt ? ' alt' : ''}"
        style="left:${n.x}px;top:${n.y}px;width:${n.w || 176}px;height:${n.h || 76}px">
        <i>${IC[n.ic] || IC.box}</i><span>${esc(n.t)}</span></div>`).join('')}
    </div></div>`;
},

/* Ba thẻ: ảnh máy phía trên, tiêu đề và mô tả phía dưới */
trio (s, d) {
  return head(s.kicker || '', s.title, s.sub, 'up') + `<div class="s-body"><div class="trio">
    ${s.items.map((it, i) => `<div class="c">
      <div class="ph"><img src="${d.dir}${it.f}" alt="" data-zoom></div>
      <div class="tx"><b><i>${String(i + 1).padStart(2, '0')}</i>${esc(it.t)}</b>
        <span>${md(it.s)}</span></div>
    </div>`).join('')}
  </div></div>`;
},

/* Khung trình duyệt cỡ lớn + các điểm nhấn xếp cạnh hoặc bên dưới */
webgrid (s, d) {
  const shot = `<div class="brw"><div class="bar3"><i></i><i></i><i></i></div>
    <img src="${d.dir}${s.img}" alt="" data-zoom></div>`;
  const cards = `<div class="pts${s.cols === 2 ? ' c2' : ''}">${s.items.map((it, i) => `
    <div class="p"><b>${String(i + 1).padStart(2, '0')}</b>
      <span>${md(typeof it === 'string' ? it : it.t)}</span></div>`).join('')}</div>`;
  return head(s.kicker || '', s.title, s.sub, 'up') +
    `<div class="s-body"><div class="wg ${s.dir || 'row'}">${
      s.dir === 'col' ? shot + cards : cards + shot}</div></div>`;
},

imagefull (s, d) {
  return head(s.kicker ? crumb([s.kicker]) : '', s.title, '', 'up') +
    `<div class="s-body"><div class="imgfull${s.titleX ? ' xflag' : ''}">
      <img src="${d.dir}${s.img}" alt="" data-zoom></div></div>`;
},

/* Lưới thẻ phân hệ — thay cho kiểu cây, dùng cho slide danh sách tính năng */
modgrid (s) {
  return head(s.kicker || (s.num ? `PHẦN ${esc(s.num)}` : ''), s.title, '', 'up') +
    `<div class="s-body"><div class="mgrid${s.rows === 'auto' ? ' auto' : ''}">
      ${s.groups.map((g, i) => `<div class="m${g.hi ? ' hi' : ''}${g.span > 4 ? ' wide' : ''}"
        style="--sp:${g.span || 4}${g.c ? `;--mc:${g.c}` : ''}">
        <span class="no">${String(i + 1).padStart(2, '0')}</span>
        <div class="hd"><i>${IC[g.ic] || IC.box}</i><b>${md(g.h)}</b></div>
        ${g.items && g.items.length
          ? `<ul>${g.items.map(t => `<li><span>${md(t)}</span></li>`).join('')}</ul>` : ''}
      </div>`).join('')}
    </div></div>`;
},

tree (s) {
  return `<div class="s-body"><div class="tree">
    <div class="lft">
      ${s.num ? `<div class="num">PHẦN ${esc(s.num)}</div>` : ''}
      <h1>${md(s.title)}</h1><div class="ln"></div>
    </div>
    <div class="gs">${s.groups.map(g => `<div class="g${g.items.length ? '' : ' solo'}">
      <b>${esc(g.h)}</b>
      ${g.items.length ? `<div class="sub">${g.items.map(i => `<span>${esc(i)}</span>`).join('')}</div>` : ''}
    </div>`).join('')}</div>
  </div></div>`;
},

device (s, d) {
  /* frame:1 — ảnh chụp thô từ máy, CSS vẽ thêm khung trắng bo góc + đổ bóng.
     Nhiều máy trong một cột thì phải hạ chiều cao, không thì tràn ra ngoài cột. */
  const cw = s.colw || 400;                    // bề ngang cột ảnh, nới ra khi nhiều máy
  const fs = s.frame ? frameH(s.imgs.length, cw, COL_H, 14) : '';
  const shots = `<div class="shots">${s.frame ? framed(s.imgs, d.dir, fs)
    : s.imgs.map(i => `<img src="${d.dir}${i}" alt="" data-zoom>`).join('')}</div>`;
  const list = `<div class="lst${s.grid === 2 ? ' c2' : ''}">${s.items.map((it, i) => `
    <div class="it${xf(it)}"><b>${i + 1}</b><div class="tx">
      <span>${md(it.t)}</span>${it.s ? `<small>${md(it.s)}</small>` : ''}
    </div></div>`).join('')}</div>`;
  const side = `<div class="side" data-fit>${list}${s.note ? note(s.note) : ''}</div>`;
  return head(crumb(s.crumb), s.title, '', 'up') +
    `<div class="s-body"><div class="dev${s.side === 'right' ? ' right' : ''}"
      style="--cw:${cw}px">${s.side === 'right' ? side + shots : shots + side}</div></div>`;
},

/* Ảnh chụp màn Web nằm ngang: ảnh chiếm phần lớn slide, ghi chú dồn sang phải */
webshot (s, d) {
  return head(crumb(s.crumb), s.title, '', 'up') + `<div class="s-body"><div class="vid">
    <div class="fr shot"><img src="${d.dir}${s.img}" alt="" data-zoom></div>
    <div class="side" data-fit>
      ${s.items ? `<div class="lst">${s.items.map((it, i) => `
        <div class="it"><b>${i + 1}</b><div class="tx"><span>${md(it.t)}</span>
        ${it.s ? `<small>${md(it.s)}</small>` : ''}</div></div>`).join('')}</div>` : ''}
      ${s.note ? note(s.note) : ''}
    </div>
  </div></div>`;
},

video (s, d) {
  return head(crumb(s.crumb), s.title, '', 'up') + `<div class="s-body"><div class="vid">
    <div class="fr">
      <div class="tag"><i></i>VIDEO DEMO</div>
      <video src="${d.vdir}${s.video}" ${s.poster ? `poster="${d.dir}${s.poster}"` : ''}
             autoplay muted loop playsinline preload="auto"
             title="Bấm để tạm dừng / chạy tiếp"></video>
    </div>
    <div class="side">${note(s.note)}</div>
  </div></div>`;
},

pillars (s) {
  return head(s.kicker || (s.num ? `PHẦN ${esc(s.num)}` : ''), s.title, '', 'up') +
    `<div class="s-body"><div class="pil" style="--pc:${s.cols || s.items.length}">
      ${s.items.map((p, i) => `<div class="c"${p.c ? ` style="--mc:${p.c}"` : ''}>
        <b>${esc(p.n || String(i + 1).padStart(2, '0'))}</b><p>${md(p.t)}</p>
        ${s.items.length <= 3 ? '<span class="dot"></span>' : ''}</div>`).join('')}
    </div></div>`;
},

value (s, d, deck) {
  const rail = (deck.slides.find(x => x.type === 'pillars') || { items: [] }).items;
  const fs = s.frame ? frameH(s.imgs.length, 732, COL_H, 22) : '';
  const shots = s.imgs.length
    ? `<div class="shots${s.frame ? ' fr' : ''}${s.art ? ' art' : ''}">${s.frame ? framed(s.imgs, d.dir, fs)
        : s.imgs.map(i => `<img src="${d.dir}${i}" alt="" data-zoom>`).join('')}</div>`
    : `<div class="blank"><div><b>Chưa có ảnh minh hoạ</b>Slide gốc trong PPTX không kèm ảnh.<br>Trum cấp ảnh V3 là chèn được ngay.</div></div>`;
  const kk = `<span class="pill">GIÁ TRỊ ${String(s.active + 1).padStart(2, '0')} / ${String(rail.length).padStart(2, '0')}</span>`;
  return head(kk, s.title, '', 'up') + `<div class="s-body"><div class="val">
    <div class="rail">${rail.map((p, i) => `
      <div class="r${i === s.active ? ' on' : ''}"><b>${esc(p.n)}</b><span>${md(p.t)}</span></div>`).join('')}
    </div>${shots}
  </div></div>`;
},

profiles (s, d) {
  const ico = [IC.shop, IC.user, IC.box];
  const list = `<div class="prof">${s.items.map((it, i) => {
    const o = typeof it === 'string' ? { t: it } : it;
    return `<div class="p"><i>${ico[i % 3]}</i><div class="tx">
      <span>${md(o.t)}</span>
      ${o.s ? `<small class="${o.sx ? 'xflag' : ''}">${md(o.s)}</small>` : ''}
    </div></div>`;
  }).join('')}</div>`;
  return head(s.num ? `PHẦN ${esc(s.num)}` : '', s.title, '', 'up') +
    `<div class="s-body">${s.img
      ? `<div class="profwrap">${list}<div class="art"><img src="${d.dir}${s.img}" alt=""></div></div>`
      : list}</div>`;
},

/* Bảng so sánh Plus / Pro */
compare (s) {
  const mk = v => v
    ? `<span class="mk y">${IC.check}</span>`
    : `<span class="mk n">${IC.x}</span>`;
  return head(s.num ? `PHẦN ${esc(s.num)}` : '', s.title, '', 'up') +
    `<div class="s-body"><div class="cmp">
      <div class="hd">
        <div>${esc(s.head || 'TÍNH NĂNG')}</div>
        ${s.cols.map((c, i) => `<div class="c${i}">${esc(c)}</div>`).join('')}
      </div>
      ${s.rows.map(r => `<div class="rw">
        <div>${md(r.t)}</div>
        ${r.v.map((v, i) => `<div class="c${i}">${mk(v)}</div>`).join('')}
      </div>`).join('')}
    </div></div>`;
},

/* Trang cảm ơn — dựng bằng HTML cho nét, thay ảnh chụp mờ */
thanks (s) {
  return `<div class="thx nodeco">
    <div class="top">
      <span class="o a"></span><span class="o b"></span><span class="o c"></span>
      <div class="in">
        <img src="assets/logo-ipos.png" alt="iPOS.vn" class="lg">
        <h1>${esc(s.title || 'Thank you!')}</h1>
        ${s.sub ? `<p>${md(s.sub)}</p>` : ''}
      </div>
    </div>
    <div class="bot">
      <div class="co">
        <b>${esc(s.company)}</b>
        <div class="ct">${s.contact.map(c => `<span>${esc(c)}</span>`).join('')}</div>
      </div>
      <div class="offs">
        ${s.offices.map(o => `<div><b>${esc(o.city)}</b><span>${esc(o.addr)}</span></div>`).join('')}
      </div>
      ${s.more ? `<div class="more"><b>${esc(s.more.h)}</b><span>${esc(s.more.t)}</span></div>` : ''}
    </div>
  </div>`;
},

qa (s) {
  return `<div class="qa nodeco">
    <span class="mk">?</span><span class="mk">?</span>
    <div class="in">
      <div class="num">PHẦN ${esc(s.num)}</div>
      <h1>${esc(s.title)}</h1>
      <div class="ln"></div>
      <p>Mời đặt câu hỏi — tình huống thực tế tại cửa hàng.</p>
    </div>
  </div>`;
},

depts (s) {
  return head('Đối tượng sử dụng', s.title, '', 'up') + `<div class="s-body"><div class="dept">
    ${s.items.map(dd => `<div class="d">
      <h3><i>${IC[dd.ic] || IC.box}</i>${esc(dd.h)}</h3>
      <ul>${dd.items.map(t => `<li>${md(t)}</li>`).join('')}</ul>
    </div>`).join('')}
  </div></div>`;
},

modules (s) {
  return `<div class="s-body"><div class="mod">
    <div class="lft"><h1>${md(s.title)}</h1><div class="ln"></div></div>
    <div class="gr">${s.items.map((m, i) => `<div class="m">
      <h3><b>${i + 1}</b>${esc(m.h)}</h3>
      <ul>${m.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>`).join('')}</div>
  </div></div>`;
},

orderflow (s, d) {
  return head(crumb(s.crumb), s.title, '', 'up') + `<div class="s-body"><div class="oflow">
    <div class="pic"><img src="${d.dir}${s.img}" alt="" data-zoom></div>
    <div class="st" data-fit>${s.steps.map(st => `<div class="s">
      <span class="dot" style="background:${st.c}"></span>
      <div><h4>${esc(st.h)}</h4>
        <ul>${st.items.map(t => `<li><span>${md(t)}</span></li>`).join('')}</ul></div>
    </div>`).join('')}
      ${s.terms ? `<div class="terms">${s.terms.map(t =>
        `<div><b>${esc(t.k)}</b><span>${esc(t.t)}</span></div>`).join('')}</div>` : ''}
    </div>
  </div></div>`;
},

production (s, d) {
  return head('Bếp trung tâm', s.title, '', 'up') + `<div class="s-body"><div class="prod">
    <div class="chk">
      <h4>${esc(s.check.h)}</h4>
      <div class="row">${s.check.items.map(t =>
        `<span><i>${IC.check}</i>${esc(t)}</span>`).join('')}</div>
    </div>
    <div class="cols">${s.cols.map(c => `<div class="c">
      <span class="bd">${esc(c.badge)}</span>
      <div class="im"><img src="${d.dir}${c.img}" alt="" data-zoom></div>
      <p>${md(c.t)}</p>
    </div>`).join('')}</div>
  </div></div>`;
},

/* Hai kho hai đầu, giữa là các làn nghiệp vụ nối chúng với nhau */
twolane (s) {
  const site = w => `<div class="site">
    <i>${IC[w.ic] || IC.wh}</i><b>${esc(w.t)}</b>
    ${w.s ? `<span>${esc(w.s)}</span>` : ''}</div>`;
  return head(s.kicker || '', s.title, '', 'up') + `<div class="s-body"><div class="twol">
    ${site(s.a)}
    <div class="lanes">${s.lanes.map(l => `<div class="lane" style="--c:${l.c}">
      <div class="lhead"><b>${esc(l.h)}</b><span>${esc(l.s)}</span></div>
      <div class="stp">${l.steps.map((st, i) => `
        ${i ? '<em class="ar"></em>' : ''}
        <div class="sp"><b>${esc(st.t)}</b><small>${esc(st.s)}</small></div>`).join('')}</div>
    </div>`).join('')}</div>
    ${site(s.b)}
  </div></div>`;
},

/* Chuỗi bước ngang, giữa các bước là chip mô tả hành động */
pipeline (s) {
  return head(s.kicker || '', s.title, '', 'up') + `<div class="s-body"><div class="pipe">
    ${s.lead ? `<div class="pipe-lead"><b>${esc(s.lead.h)}</b><span>${esc(s.lead.t)}</span></div>` : ''}
    <div class="row">${s.steps.map((st, i) => `
      ${i ? `<div class="gate"><span class="chip" style="--c:${st.gc}">${esc(st.gate)}</span>
              <em class="ar"></em><small>${esc(st.gs || '')}</small></div>` : ''}
      <div class="bx${st.tone ? ' ' + st.tone : ''}">
        <b>${esc(st.t)}</b>${st.s ? `<small>${esc(st.s)}</small>` : ''}
        ${st.subs ? `<div class="subs">${st.subs.map(u =>
          `<div><b>${esc(u.t)}</b><small>${esc(u.s)}</small></div>`).join('')}</div>` : ''}
      </div>`).join('')}
    </div>
    ${s.notes ? `<div class="pipe-notes">${s.notes.map(n =>
      `<div class="${n.k}"><i>${n.k === 'tip' ? '💡' : '⚠'}</i><span>${md(n.t)}</span></div>`).join('')}</div>` : ''}
  </div></div>`;
},

/* Công thức phân số cỡ lớn */
costformula (s) {
  return head(s.kicker || '', s.title, '', 'up') + `<div class="s-body"><div class="cfm">
    <div class="lft">
      <div class="cap">${esc(s.label)}</div>
      <div class="vl">${esc(s.value)}</div>
      <div class="ln"></div>
    </div>
    <div class="fx">
      <span class="eq">${esc(s.eq)}</span>
      <span class="op">=</span>
      <div class="frac">
        <div class="num">${esc(s.top)}</div>
        <div class="fbar"></div>
        <div class="den">${esc(s.bottom)}</div>
      </div>
    </div>
  </div></div>`;
},

transfer (s, d) {
  return head('Luân chuyển nội bộ', s.title, '', 'up') + `<div class="s-body"><div class="trf">
    <div class="row">
      <div class="wh"><img src="${d.dir}${s.a.img}" alt=""><span>${esc(s.a.t)}</span></div>
      <div class="mid"><img src="${d.dir}${s.mid}" alt="" data-zoom></div>
      <div class="wh"><img src="${d.dir}${s.b.img}" alt=""><span>${esc(s.b.t)}</span></div>
    </div>
    <div class="bd">${esc(s.badge)}</div>
  </div></div>`;
},

formula (s, d) {
  return head('Nghiệp vụ cuối kỳ', s.title, '', 'up') + `<div class="s-body"><div class="frm">
    <img src="${d.dir}${s.img}" alt="">
    <div class="bx"><div class="cap">${esc(s.label)}</div>
      <div class="vl">${esc(s.value)}</div><div class="ln"></div></div>
  </div></div>`;
},

grouplist (s) {
  return `<div class="s-body"><div class="gl">
    <div class="lft">
      ${s.num ? `<div class="num">GIÁ TRỊ ${esc(s.num)}</div>` : ''}
      <h1>${md(s.title)}</h1><div class="ln"></div>
    </div>
    <div class="gs">${s.groups.map(g => `<div class="g">
      <b>${esc(g.h)}</b>
      <ul>${g.items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>`).join('')}</div>
  </div></div>`;
},

platform (s, d) {
  /* frame:1 — ảnh chụp thô: CSS vẽ khung máy cho App và khung trình duyệt cho Web */
  const ph = s.frame
    ? `<div class="box"><img src="${d.dir}${s.phone}" alt="" data-zoom></div>`
    : `<img src="${d.dir}${s.phone}" alt="" data-zoom>`;
  const wb = s.frame
    ? `<div class="box"><div class="bar3"><i></i><i></i><i></i></div>
         <img src="${d.dir}${s.web}" alt="" data-zoom></div>`
    : `<img src="${d.dir}${s.web}" alt="" data-zoom>`;
  return head('Nền tảng công nghệ', s.title, '', 'up') +
    `<div class="s-body"><div class="plat${s.frame ? ' fr' : ''}">
    <div class="bd">${esc(s.badge)}</div>
    <div class="row"><div class="ph">${ph}</div><div class="wb">${wb}</div></div>
  </div></div>`;
}
};

function note (t) { return `<div class="note"><i>${IC.info}</i><span>${md(t)}</span></div>`; }

/* ── Hiện dần từng phần khi present ──────────────────────────────────────────
   Mỗi loại slide khai một selector; các phần tử khớp hiện lần lượt theo đúng
   thứ tự trong DOM. Loại nào không có tên ở đây thì hiện trọn một lần —
   bìa, chuyển mục, ảnh toàn slide, video, hỏi đáp, cảm ơn.
   Space đi từng bước. Mũi tên phải bỏ qua các bước còn lại và sang slide sau. */
const RV = {
  agenda    : '.agenda .it',
  cards3    : '.defs .c, .defs .fx',
  bullets   : '.bl li',
  hero      : '.hero li',
  modgrid   : '.mgrid .m',
  device    : '.dev .lst .it, .dev .note',
  webshot   : '.vid .lst .it, .vid .note',
  webgrid   : '.wg .pts .p',
  pillars   : '.pil .c',
  value     : '.val .rail .r',
  compare   : '.cmp .rw',
  profiles  : '.prof .p',
  depts     : '.dept .d',
  trio      : '.trio .c',
  orderflow : '.oflow .s, .oflow .terms>div',
  production: '.prod .chk, .prod .cols .c',
  twolane   : '.twol .lane',
  pipeline  : '.pipe .row>*'
};
const RV_GAP = 45;    // ms giữa hai phần tử khi cả slide hiện trọn một lượt
const RV_CAP = 360;   // trần độ trễ, giữ tổng thời gian vào slide dưới 800ms

/* ── Ứng dụng ────────────────────────────────────────────────────────────── */
const App = {
  key: 'plus',
  i: 0,
  showx: false,
  step: 0,        // số phần đã hiện của slide đang xem
  nsteps: 0,      // tổng số phần chia được của slide đó

  get deck () { return DECKS[this.key]; },
  get slide () { return this.deck.slides[this.i]; },

  boot () {
    this.el = {
      stage : $('#stage'),
      cnt   : $('#cnt'),
      prog  : $('#prog i'),
      prev  : $('#prev'),
      next  : $('#next'),
      grid  : $('#grid'),
      gb    : $('#gb'),
      gt    : $('#gt'),
      lb    : $('#lb'),
      lbi   : $('#lb img'),
      help  : $('#help')
    };
    this.readHash();
    this.bind();
    this.resize();
    this.render('all');
  },

  bind () {
    addEventListener('resize', () => this.resize());
    $('#toPlus').onclick = () => this.setDeck('plus');
    $('#toPro').onclick  = () => this.setDeck('pro');
    this.el.prev.onclick = () => this.go(-1, 'all');
    this.el.next.onclick = () => this.go(1,  'all');
    $('#gridBtn').onclick = () => this.toggleGrid();
    $('#gclose').onclick  = () => this.toggleGrid(false);
    $('#fsBtn').onclick   = () => this.fullscreen();
    $('#helpBtn').onclick = () => this.el.help.classList.add('open');
    $('#hclose').onclick  = () => this.el.help.classList.remove('open');
    this.el.help.onclick  = e => { if (e.target === this.el.help) this.el.help.classList.remove('open'); };
    this.el.lb.onclick    = () => this.el.lb.classList.remove('open');

    addEventListener('keydown', e => {
      const t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA') return;
      if (this.el.help.classList.contains('open') && e.key !== 'Escape') return;

      switch (e.key) {
        /* Space và PageDown hiện thêm một phần — remote trình chiếu gửi PageDown */
        case ' ': case 'PageDown': e.preventDefault(); this.advance(); break;
        /* Mũi tên là lối thoát nhanh: sang thẳng slide và hiện trọn nội dung */
        case 'ArrowRight': e.preventDefault(); this.go(1,  'all'); break;
        case 'ArrowLeft':  case 'PageUp': e.preventDefault(); this.go(-1, 'all'); break;
        case 'Home':   e.preventDefault(); this.to(0, 'all'); break;
        case 'End':    e.preventDefault(); this.to(this.deck.slides.length - 1, 'all'); break;
        case 'Escape':
          if (this.el.lb.classList.contains('open'))   this.el.lb.classList.remove('open');
          else if (this.el.help.classList.contains('open')) this.el.help.classList.remove('open');
          else this.toggleGrid();
          break;
        case 'f': case 'F': this.fullscreen(); break;
        case 'x': case 'X': this.toggleX();    break;
        case '?': case '/': this.el.help.classList.add('open'); break;
        case '1': this.setDeck('plus'); break;
        case '2': this.setDeck('pro');  break;
      }
    });

    let x0 = 0;
    this.el.stage.addEventListener('touchstart', e => { x0 = e.changedTouches[0].clientX; }, { passive: true });
    this.el.stage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - x0;
      if (!this.mob && Math.abs(dx) > 55) this.go(dx < 0 ? 1 : -1, 'all');
    }, { passive: true });

    addEventListener('hashchange', () => { this.readHash(); this.render('all'); });
  },

  readHash () {
    const m = /^#(plus|pro)(?:-(\d+))?$/.exec(location.hash || '');
    if (!m) return;
    this.key = m[1];
    const n = parseInt(m[2] || '1', 10);
    this.i = Math.min(Math.max(n - 1, 0), this.deck.slides.length - 1);
  },

  writeHash () {
    const h = `#${this.key}-${this.i + 1}`;
    if (location.hash !== h) history.replaceState(null, '', h);
  },

  setDeck (k) {
    if (this.key === k) return;
    this.key = k; this.i = 0; this.render('all');
  },

  go (d, mode) { this.to(this.i + d, mode); },

  to (n, mode) {
    const max = this.deck.slides.length - 1;
    n = Math.min(Math.max(n, 0), max);
    if (n === this.i) return;
    this.dir = n > this.i ? 1 : -1;
    this.i = n;
    this.render(mode);
  },

  /* Space: hiện thêm một phần. Hết phần thì sang slide sau, để đó chờ bấm tiếp. */
  advance () {
    if (this.step < this.nsteps) {
      this.step++;
      this.paintReveal(false);
      return;
    }
    this.to(this.i + 1, 'start');
  },

  /* Bật lớp hiện cho các phần đã tới lượt. Ẩn bằng độ mờ chứ không bỏ khỏi
     luồng, để auto-fit vẫn đo được chiều cao thật của cả slide. */
  paintReveal (stagger) {
    const el = this.el.stage.firstElementChild;
    if (!el) return;
    $$('[data-rv]', el).forEach(n => {
      const k = +n.getAttribute('data-rv');
      const on = k <= this.step;
      n.style.transitionDelay = (on && stagger)
        ? Math.min((k - 1) * RV_GAP, RV_CAP) + 'ms' : '0ms';
      n.classList.toggle('rvon', on);
    });
    this.paintCount();
  },

  paintCount () {
    const d = this.deck, s = this.slide;
    const left = (this.nsteps && this.step < this.nsteps)
      ? `<u>${this.step}/${this.nsteps}</u>` : '';
    this.el.cnt.innerHTML = `${String(s.n).padStart(2, '0')}` +
      `<i> / ${String(d.slides.length).padStart(2, '0')}</i>${left}`;
  },

  /* Dựng một slide thành phần tử rời — dùng chung cho cả hai chế độ xem */
  buildSlide (s, d) {
    const build = T[s.type];
    const inner = build ? build(s, d, d)
      : `<div class="s-body"><div>Chưa có mẫu cho type "${esc(s.type)}"</div></div>`;
    const el = document.createElement('div');
    el.className = 'slide' + (/nodeco/.test(inner) ? ' nodeco' : '')
                 + (s.type === 'cover' || s.type === 'end' ? ' bare' : '');
    el.innerHTML = inner +
      (s.todo ? `<div class="todo">${esc(s.todo)}</div>` : '') + `
      <div class="s-foot">
        <span class="no">${d.name} · ${String(s.n).padStart(2, '0')} / ${String(d.slides.length).padStart(2, '0')}</span>
        <img class="lg" src="assets/logo-ipos.png" alt="iPOS.vn">
      </div>`;
    $$('[data-zoom]', el).forEach(im => {
      im.addEventListener('click', () => {
        this.el.lbi.src = im.currentSrc || im.src;
        this.el.lb.classList.add('open');
      });
    });
    $$('video', el).forEach(v => {
      v.addEventListener('click', () => { v.paused ? v.play() : v.pause(); });
    });
    return el;
  },

  /* ── Chế độ xấp trang (điện thoại) ────────────────────────────────────────
     Dựng sẵn mọi slide của bộ đang xem, mỗi cái một trang giữ nguyên khung
     1280×720 thu nhỏ vừa bề ngang, xếp dọc để cuộn liên tục như xem PDF.
     Phóng to đọc kỹ bằng hai ngón, không hiệu ứng, không chia bước. */
  renderPages () {
    const d = this.deck;
    if (this.pagesKey !== this.key) {
      this.pagesKey = this.key;
      const frag = document.createDocumentFragment();
      d.slides.forEach(s => {
        const pg = document.createElement('div');
        pg.className = 'page';
        pg.appendChild(this.buildSlide(s, d));
        frag.appendChild(pg);
      });
      this.el.stage.innerHTML = '';
      this.el.stage.appendChild(frag);
      /* Cả bộ nặng vài MB ảnh — để trình duyệt tải dần theo tầm nhìn */
      $$('img', this.el.stage).forEach(im => im.setAttribute('loading', 'lazy'));
      this.watchPages();
      const fit = () => $$('.page > .slide', this.el.stage).forEach(el => this.fitOnce(el));
      fit();
      setTimeout(fit, 500);
    }
    this.step = this.nsteps = 0;           // xấp trang không chia bước
    const pg = this.el.stage.children[this.i];
    if (pg) pg.scrollIntoView({ block: 'start' });
    this.paintCount();
    this.el.prog.style.width = ((this.i + 1) / d.slides.length * 100) + '%';
    this.writeHash();
  },

  /* Theo dõi xấp trang: video chỉ chạy khi trang của nó lọt tầm nhìn, và số
     trang bám theo trang đang chạm mép trên vùng xem. */
  watchPages () {
    this.unwatchPages();
    const pages = $$('.page', this.el.stage);

    this.io = new IntersectionObserver(es => {
      es.forEach(e => {
        const v = $('video', e.target);
        if (!v) return;
        if (e.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
        else v.pause();
      });
    }, { threshold: 0 });
    pages.forEach(p => this.io.observe(p));

    /* Màn cao chứa ba bốn trang một lúc. Phải chọn trang chạm mép trên vùng
       xem, không thì trang cuối trong tầm nhìn thắng và số trang nhảy loạn. */
    const TOP = 52;                       // chừa chỗ cho thanh công cụ dính
    let tick = false;
    this.onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        let best = 0, bd = Infinity;
        for (let k = 0; k < pages.length; k++) {
          const b = pages[k].getBoundingClientRect();
          if (b.bottom < TOP) continue;   // đã cuộn qua hẳn
          const dd = Math.abs(b.top - TOP);
          if (dd < bd) { bd = dd; best = k; }
        }
        /* Màn cao chứa gần bốn trang, nên cuộn hết cỡ vẫn còn ba trang cuối
           nằm dưới mép trên — không chốt lại thì không bao giờ tới trang cuối. */
        const doc = document.documentElement;
        if (innerHeight + scrollY >= doc.scrollHeight - 4) best = pages.length - 1;
        if (best !== this.i) {
          this.i = best;
          this.paintCount();
          this.el.prog.style.width = ((best + 1) / this.deck.slides.length * 100) + '%';
          this.writeHash();
        }
      });
    };
    addEventListener('scroll', this.onScroll, { passive: true });
  },

  unwatchPages () {
    if (this.io) { this.io.disconnect(); this.io = null; }
    if (this.onScroll) { removeEventListener('scroll', this.onScroll); this.onScroll = null; }
  },

  render (mode) {
    const d = this.deck, s = this.slide;
    document.body.dataset.deck = this.key;
    $('#toPlus').classList.toggle('on', this.key === 'plus');
    $('#toPro').classList.toggle('on', this.key === 'pro');

    if (this.mob) {
      this.renderPages();
      if (this.el.grid.classList.contains('open')) this.paintGrid();
      return;
    }

    const el = this.buildSlide(s, d);
    el.classList.add('in');
    el.style.setProperty('--dx', (this.dir === -1 ? '-18px' : '18px'));
    this.el.stage.innerHTML = '';
    this.el.stage.appendChild(el);

    /* Video chạy như ảnh động: tự chạy, lặp, tắt tiếng. Bấm để dừng/chạy tiếp. */
    $$('video', el).forEach(v => {
      const go = v.play();
      if (go && go.catch) go.catch(() => {});     // trình duyệt chặn autoplay thì bỏ qua
    });

    /* Đánh số thứ tự cho các phần chia bước được của slide này.
       Dưới một phần tử thì chia bước vô nghĩa, bỏ qua. Trên mobile cũng bỏ:
       người xem cuộn chứ không bấm. */
    const sel = isMob() ? null : RV[s.type];
    let rv = sel ? $$(sel, el) : [];
    if (rv.length < 2) rv = [];
    rv.forEach((n, k) => n.setAttribute('data-rv', k + 1));
    this.nsteps = rv.length;
    this.step = (mode === 'start' && rv.length) ? 0 : rv.length;
    /* Chờ một khung hình để trình duyệt ghi nhận trạng thái ẩn, không thì
       lớp hiện đặt cùng lúc và chuyển động không chạy. */
    requestAnimationFrame(() => this.paintReveal(mode !== 'start'));

    this.paintCount();
    this.el.prog.style.width = ((this.i + 1) / d.slides.length * 100) + '%';
    this.el.prev.disabled = this.i === 0;
    this.el.next.disabled = this.i === d.slides.length - 1;
    this.writeHash();
    this.autofit(el);
    if (this.el.grid.classList.contains('open')) this.paintGrid();
  },

  /* Một lượt đo và thu nhỏ nếu nội dung tràn khung 1280×720 */
  fitOnce (el) {
    const boxes = [];
    const body = $('.s-body', el);
    if (body && body.firstElementChild) boxes.push([body, body.firstElementChild]);
    $$('[data-fit]', el).forEach(f => { if (f.parentElement) boxes.push([f.parentElement, f]); });

    boxes.forEach(([outer, inner]) => {
      inner.style.zoom = '';
      let z = 1;
      for (let k = 0; k < 12; k++) {
        const over = outer.scrollHeight > outer.clientHeight + 1 ||
                     outer.scrollWidth  > outer.clientWidth  + 1;
        if (!over) break;
        z -= 0.04;
        inner.style.zoom = z.toFixed(2);
      }
    });
  },

  /* Thu nhỏ nội dung nếu tràn khung — bảo đảm không bao giờ có thanh cuộn */
  autofit (el) {
    const run = () => this.fitOnce(el);
    run();
    requestAnimationFrame(run);           // chạy lại sau khi ảnh/ font vào chỗ
    setTimeout(run, 260);
  },

  /* Thứ tự ba bước bắt buộc: đổi lớp chế độ → đặt tỉ lệ thu nhỏ → dựng lại.
     Dựng trước khi có tỉ lệ thì mỗi trang còn cao nguyên 720px, cuộn tới trang
     đang xem sẽ trượt sang trang khác ngay khi tỉ lệ được áp. */
  resize () {
    const mob = isMob();
    const changed = mob !== this.mob;
    if (changed) {
      this.mob = mob;
      document.body.classList.toggle('mob', mob);
      this.pagesKey = null;                 // đổi chế độ thì dựng lại từ đầu
      if (!mob) this.unwatchPages();
    }
    const root = document.documentElement.style;
    if (mob) {
      /* Mỗi trang giữ khung 1280×720 rồi thu nhỏ theo --ms cho vừa bề ngang */
      root.removeProperty('--sc');
      root.setProperty('--ms', (innerWidth / W).toFixed(5));
    } else {
      root.removeProperty('--ms');
      const wrap = $('.stagewrap');
      /* clientWidth/clientHeight của khung cha không bị zoom của .stage ảnh hưởng */
      const s = Math.min(wrap.clientWidth / (W + 96), wrap.clientHeight / (H + 34));
      root.setProperty('--sc', Math.max(s, .1).toFixed(5));
    }
    if (changed && this.el.stage.firstElementChild) this.render('all');
  },

  toggleX () {
    this.showx = !this.showx;
    document.body.classList.toggle('showx', this.showx);
  },

  toggleGrid (force) {
    const open = force === undefined ? !this.el.grid.classList.contains('open') : force;
    this.el.grid.classList.toggle('open', open);
    if (open) this.paintGrid();
  },

  paintGrid () {
    const d = this.deck;
    this.el.gt.innerHTML = `${d.name} <small>${d.slides.length} slide · ${esc(d.tagline)}</small>`;
    this.el.gb.innerHTML = d.slides.map((s, i) => {
      const img = s.img ? d.dir + s.img : (s.imgs && s.imgs[0] ? d.dir + s.imgs[0] : null);
      const lbl = (s.title || (s.lines && s.lines.join(' ')) || s.type)
        .replace(/<br\s*\/?>/g, ' ');
      return `<button class="t${i === this.i ? ' on' : ''}" data-i="${i}">
        <div class="pv">${img ? `<img src="${img}" alt="" loading="lazy">` : `<b>${String(s.n).padStart(2, '0')}</b>`}</div>
        <div class="cp"><i>SLIDE ${String(s.n).padStart(2, '0')}</i><span>${esc(lbl)}</span></div>
      </button>`;
    }).join('');
    $$('.t', this.el.gb).forEach(b => {
      b.onclick = () => { this.to(+b.dataset.i, 'all'); this.toggleGrid(false); };
    });
  },

  fullscreen () {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  }
};

document.addEventListener('DOMContentLoaded', () => App.boot());
window.App = App;
})();
