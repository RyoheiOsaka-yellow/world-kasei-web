// 録画中のページに注入する演出レイヤー（テロップ・カーソル・ハイライト・章タイトル）。
// Playwright の addInitScript で読み込まれ、window.__demo から操作する。
(() => {
  if (window.top !== window || window.__demo) return;

  const NAVY = '#003366';
  const ORANGE = '#F5A623';
  const Z = 2147483000;

  const css = `
  .dm-root, .dm-root * { box-sizing: border-box; font-family: 'Noto Sans JP', sans-serif; }
  .dm-root { position: fixed; inset: 0; pointer-events: none; z-index: ${Z}; }
  .dm-dim { position: fixed; inset: 0; width: 100%; height: 100%; opacity: 0; transition: opacity .45s ease; z-index: ${Z}; }
  .dm-dim.on { opacity: 1; }

  .dm-hl { position: fixed; border: 3px solid ${ORANGE}; border-radius: 14px; z-index: ${Z + 10};
    box-shadow: 0 0 0 5px rgba(245,166,35,.22), 0 10px 30px rgba(0,0,0,.18);
    opacity: 0; transform: scale(1.04); transition: opacity .35s ease, transform .35s ease; }
  .dm-hl.on { opacity: 1; transform: scale(1); animation: dm-pulse 1.8s ease-in-out .4s infinite; }
  @keyframes dm-pulse { 0%,100% { box-shadow: 0 0 0 5px rgba(245,166,35,.22), 0 10px 30px rgba(0,0,0,.18); }
                        50% { box-shadow: 0 0 0 11px rgba(245,166,35,.10), 0 10px 30px rgba(0,0,0,.18); } }
  .dm-badge { position: absolute; top: -17px; left: -17px; width: 34px; height: 34px; border-radius: 50%;
    background: ${ORANGE}; color: #fff; font-weight: 700; font-size: 17px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 3px 10px rgba(0,0,0,.25); border: 2px solid #fff; }
  .dm-tag { position: absolute; white-space: nowrap; background: ${ORANGE}; color: #fff; font-weight: 700; font-size: 15px;
    padding: 6px 14px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,.22); letter-spacing: .02em; }
  .dm-tag::after { content: ''; position: absolute; border: 7px solid transparent; }
  .dm-tag.top { bottom: calc(100% + 12px); left: 12px; }
  .dm-tag.top::after { top: 100%; left: 18px; border-top-color: ${ORANGE}; }
  .dm-tag.bottom { top: calc(100% + 12px); left: 12px; }
  .dm-tag.bottom::after { bottom: 100%; left: 18px; border-bottom-color: ${ORANGE}; }
  .dm-tag.right { left: calc(100% + 14px); top: 50%; transform: translateY(-50%); }
  .dm-tag.right::after { right: 100%; top: 50%; margin-top: -7px; border-right-color: ${ORANGE}; }
  .dm-tag.left { right: calc(100% + 14px); top: 50%; transform: translateY(-50%); }
  .dm-tag.left::after { left: 100%; top: 50%; margin-top: -7px; border-left-color: ${ORANGE}; }
  .dm-tag.inside { top: 10px; right: 10px; }

  .dm-telop { position: fixed; left: 50%; bottom: 26px; width: min(1040px, calc(100vw - 80px)); z-index: ${Z + 20};
    transform: translate(-50%, 24px); opacity: 0; transition: opacity .35s ease, transform .35s ease;
    background: rgba(0, 30, 62, .94); border-left: 6px solid ${ORANGE}; border-radius: 12px;
    padding: 13px 28px 15px; color: #fff; box-shadow: 0 14px 40px rgba(0,0,0,.35); backdrop-filter: blur(6px); }
  .dm-telop.on { opacity: 1; transform: translate(-50%, 0); }
  .dm-telop-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
  .dm-telop-label { font-size: 13px; font-weight: 700; color: ${ORANGE}; letter-spacing: .12em; }
  .dm-pips { display: flex; gap: 6px; }
  .dm-pip { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.22); transition: background .3s; }
  .dm-pip.done { background: rgba(245,166,35,.55); }
  .dm-pip.now { background: ${ORANGE}; box-shadow: 0 0 0 3px rgba(245,166,35,.25); }
  .dm-telop-body { position: relative; min-height: 36px; }
  .dm-telop-text { font-size: 24px; font-weight: 700; line-height: 1.5; letter-spacing: .02em; animation: dm-in .4s ease both; }
  .dm-telop-text small { display: block; font-size: 15px; font-weight: 400; color: #bcd3ee; margin-top: 2px; }
  .dm-telop-text em { font-style: normal; color: #FFC75A; }
  @keyframes dm-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

  .dm-card { position: fixed; inset: 0; z-index: ${Z + 30}; opacity: 0; transition: opacity .3s ease;
    background: radial-gradient(1200px 600px at 75% 20%, rgba(0,123,255,.35), transparent 60%),
                radial-gradient(900px 500px at 10% 100%, rgba(245,166,35,.16), transparent 60%),
                linear-gradient(135deg, ${NAVY}, #001a33 70%);
    display: flex; align-items: center; justify-content: center; color: #fff; }
  .dm-card::before { content: ''; position: absolute; inset: 0;
    background-image: linear-gradient(rgba(0,123,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,123,255,.10) 1px, transparent 1px);
    background-size: 48px 48px; mask-image: radial-gradient(circle at 50% 50%, #000 30%, transparent 75%); }
  .dm-card.on { opacity: 1; }
  .dm-card-inner { position: relative; text-align: center; }
  .dm-card.on .dm-card-inner > * { animation: dm-in .6s ease both; }
  .dm-card.on .dm-card-inner > *:nth-child(2) { animation-delay: .08s; }
  .dm-card.on .dm-card-inner > *:nth-child(3) { animation-delay: .16s; }
  .dm-card.on .dm-card-inner > *:nth-child(4) { animation-delay: .24s; }
  .dm-card.instant .dm-card-inner > * { animation: none !important; }
  .dm-card-kicker { font-size: 15px; letter-spacing: .4em; color: ${ORANGE}; font-weight: 700; margin-bottom: 22px; }
  .dm-card-num { font-size: 96px; font-weight: 700; line-height: 1; color: ${ORANGE}; letter-spacing: .02em; margin-bottom: 14px; }
  .dm-card-title { font-size: 56px; font-weight: 700; letter-spacing: .04em; line-height: 1.3; }
  .dm-card-sub { font-size: 22px; color: #bcd3ee; margin-top: 16px; font-weight: 400; letter-spacing: .08em; }
  .dm-card-rule { width: 64px; height: 3px; background: ${ORANGE}; margin: 30px auto 0; border-radius: 2px; }
  .dm-card-foot { margin-top: 26px; font-size: 16px; color: rgba(255,255,255,.7); letter-spacing: .2em; }

  .dm-cursor { position: fixed; left: 0; top: 0; z-index: ${Z + 40}; transition: opacity .25s ease; will-change: transform; }
  .dm-cursor.hidden { opacity: 0; }
  .dm-cursor svg { display: block; transform-origin: 4px 2px; transition: transform .12s ease; filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
  .dm-cursor.down svg { transform: scale(.86); }
  .dm-cursor .dm-touch { display: none; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%;
    background: rgba(255,255,255,.55); border: 2px solid rgba(0,30,62,.45); box-shadow: 0 4px 14px rgba(0,0,0,.3); transition: transform .12s ease; }
  .dm-cursor.touch svg { display: none; }
  .dm-cursor.touch .dm-touch { display: block; }
  .dm-cursor.touch.down .dm-touch { transform: scale(.8); background: rgba(245,166,35,.6); }
  .dm-ripple { position: fixed; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; border: 3px solid ${ORANGE};
    z-index: ${Z + 39}; animation: dm-ripple .65s ease-out forwards; }
  @keyframes dm-ripple { from { transform: scale(1); opacity: 1; } to { transform: scale(4.2); opacity: 0; } }

  .dm-select { position: fixed; z-index: ${Z + 15}; background: #fff; border: 1px solid #94a3b8; border-radius: 6px;
    box-shadow: 0 12px 28px rgba(0,0,0,.22); overflow: hidden; animation: dm-in .18s ease both; }
  .dm-select div { padding: 9px 14px; font-size: 15px; color: #1e293b; font-weight: 700; }
  .dm-select div.cur { background: #e2e8f0; }
  .dm-select div.hover { background: #007BFF; color: #fff; }
  `;

  let timeScale = 1; // 録画時のスローモーション倍率（CSSアニメと setTimeout の同期用）
  const later = (fn, ms) => setTimeout(fn, ms * timeScale);
  // 演出用の時計（完成動画の時間）。rAF のタイムスタンプは再生速度の変更に影響されるため使わない
  const clock = () => performance.now() / timeScale;
  let root, dimSvg, holes, telop, telopLabel, telopPips, telopBody, card, cursorEl;
  const highlights = [];
  let selectBox = null;

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function ensure() {
    if (root) return;
    const style = el('style', null, css);
    document.head.appendChild(style);
    root = el('div', 'dm-root');
    root.innerHTML = `
      <svg class="dm-dim"><defs><mask id="dm-mask"><rect width="100%" height="100%" fill="white"/><g class="dm-holes"></g></mask></defs>
      <rect width="100%" height="100%" fill="rgba(0,18,40,0.58)" mask="url(#dm-mask)"/></svg>`;
    dimSvg = root.querySelector('.dm-dim');
    holes = root.querySelector('.dm-holes');
    telop = el('div', 'dm-telop', `<div class="dm-telop-head"><div class="dm-telop-label"></div><div class="dm-pips"></div></div><div class="dm-telop-body"></div>`);
    telopLabel = telop.querySelector('.dm-telop-label');
    telopPips = telop.querySelector('.dm-pips');
    telopBody = telop.querySelector('.dm-telop-body');
    card = el('div', 'dm-card', '<div class="dm-card-inner"></div>');
    cursorEl = el('div', 'dm-cursor hidden', `
      <svg width="30" height="30" viewBox="0 0 28 28"><path d="M4 2 L4 22.5 L9.4 17.4 L12.9 25.4 L16.6 23.8 L13.1 15.9 L20.6 15.9 Z"
        fill="#111827" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/></svg><div class="dm-touch"></div>`);
    root.append(telop, card, cursorEl);
    document.documentElement.appendChild(root);
    requestAnimationFrame(tick);
  }

  // 複数要素を渡した場合はそれらを包む矩形
  function rectOf(target) {
    if (!Array.isArray(target)) return target.getBoundingClientRect();
    const rs = target.map((t) => t.getBoundingClientRect());
    const left = Math.min(...rs.map((r) => r.left)), top = Math.min(...rs.map((r) => r.top));
    const right = Math.max(...rs.map((r) => r.right)), bottom = Math.max(...rs.map((r) => r.bottom));
    return { left, top, right, bottom, width: right - left, height: bottom - top };
  }

  // ハイライト枠を毎フレーム対象要素に追従させる（スクロール中もずれない）
  function tick() {
    let holesHtml = '';
    let spot = false;
    for (const h of highlights) {
      const r = rectOf(h.target);
      const p = h.pad;
      const x = r.left - p, y = r.top - p, w = r.width + p * 2, hh = r.height + p * 2;
      h.box.style.left = x + 'px';
      h.box.style.top = y + 'px';
      h.box.style.width = w + 'px';
      h.box.style.height = hh + 'px';
      if (h.spot && !h.leaving) {
        spot = true;
        holesHtml += `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="14" fill="black"/>`;
      }
    }
    if (holes.innerHTML !== holesHtml) holes.innerHTML = holesHtml;
    dimSvg.classList.toggle('on', spot);
    requestAnimationFrame(tick);
  }

  function autoTagPos(target) {
    const r = rectOf(target);
    if (r.top > 150) return 'top';
    if (r.bottom < window.innerHeight - 220) return 'bottom';
    return 'inside';
  }

  const api = {
    caption({ label = '', text = '', chapter = null, total = 6 } = {}) {
      ensure();
      telopLabel.textContent = label;
      telopPips.innerHTML = chapter == null ? '' : Array.from({ length: total }, (_, i) =>
        `<span class="dm-pip ${i + 1 < chapter ? 'done' : i + 1 === chapter ? 'now' : ''}"></span>`).join('');
      telopBody.innerHTML = '';
      telopBody.appendChild(el('div', 'dm-telop-text', text));
      telop.classList.add('on');
    },
    hideCaption() { ensure(); telop.classList.remove('on'); },

    highlight(target, { num = null, label = null, pos = null, pad = 8, spot = true } = {}) {
      ensure();
      const box = el('div', 'dm-hl');
      if (num != null) box.appendChild(el('div', 'dm-badge', String(num)));
      if (label) box.appendChild(el('div', `dm-tag ${pos || autoTagPos(target)}`, label));
      root.appendChild(box);
      const h = { target, box, pad, spot, leaving: false };
      highlights.push(h);
      requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('on')));
    },
    clearHighlights() {
      for (const h of highlights.splice(0)) {
        h.leaving = true;
        h.box.classList.remove('on');
        later(() => h.box.remove(), 400);
      }
      dimSvg && dimSvg.classList.remove('on');
      holes && (holes.innerHTML = '');
    },

    // タイトル／章扉カード
    card({ kicker = '', num = '', title = '', sub = '', foot = '', instant = false } = {}) {
      ensure();
      card.classList.toggle('instant', instant);
      const inner = card.querySelector('.dm-card-inner');
      inner.innerHTML =
        (kicker ? `<div class="dm-card-kicker">${kicker}</div>` : '') +
        (num ? `<div class="dm-card-num">${num}</div>` : '') +
        `<div class="dm-card-title">${title}</div>` +
        (sub ? `<div class="dm-card-sub">${sub}</div>` : '') +
        `<div class="dm-card-rule"></div>` +
        (foot ? `<div class="dm-card-foot">${foot}</div>` : '');
      card.classList.remove('on');
      void card.offsetWidth;
      card.classList.add('on');
      cursorEl.classList.add('hidden');
      telop.classList.remove('on');
    },
    hideCard() { ensure(); card.classList.remove('on'); },
    // 次の画面遷移（pushState）の瞬間に章扉を出す。クリックした直後に新ページが一瞬見えるのを防ぐ。
    cardOnNextNavigation(opts) {
      ensure();
      const orig = history.pushState;
      history.pushState = function (...args) {
        history.pushState = orig;
        card.style.transition = 'none';
        api.card(opts);
        void card.offsetWidth;
        card.style.transition = '';
        return orig.apply(this, args);
      };
    },

    setTimeScale(k) { timeScale = k; },
    // カーソルをページ内の rAF で滑らかに移動（弧を描くイージング）
    animateCursor(sx, sy, x, y, ms, bend) {
      ensure();
      const dist = Math.hypot(x - sx, y - sy) || 1;
      const nx = -(y - sy) / dist, ny = (x - sx) / dist;
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      return new Promise((res) => {
        const t0 = clock();
        const f = () => {
          const k = Math.min(1, (clock() - t0) / ms);
          const e = ease(k), arc = Math.sin(Math.PI * e) * bend;
          api.cursor(sx + (x - sx) * e + nx * arc, sy + (y - sy) * e + ny * arc);
          k < 1 ? requestAnimationFrame(f) : res();
        };
        requestAnimationFrame(f);
      });
    },
    cursor(x, y) {
      ensure();
      cursorEl.style.transform = `translate(${x - 4}px, ${y - 2}px)`;
      cursorEl.classList.remove('hidden');
      if (selectBox) {
        for (const row of selectBox.children) {
          const r = row.getBoundingClientRect();
          row.classList.toggle('hover', x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
        }
      }
    },
    cursorMode(mode) { ensure(); cursorEl.classList.toggle('touch', mode === 'touch'); },
    hideCursor() { ensure(); cursorEl.classList.add('hidden'); },
    press(x, y) {
      ensure();
      cursorEl.classList.add('down');
      const r = el('div', 'dm-ripple');
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      root.appendChild(r);
      later(() => r.remove(), 700);
    },
    release() { ensure(); cursorEl.classList.remove('down'); },

    // ヘッドレスではネイティブのプルダウンが描画されないため、見た目だけ再現する
    openSelect(select) {
      ensure();
      const r = select.getBoundingClientRect();
      selectBox = el('div', 'dm-select');
      selectBox.style.left = r.left + 'px';
      selectBox.style.top = r.bottom + 4 + 'px';
      selectBox.style.width = r.width + 'px';
      for (const o of select.options) selectBox.appendChild(el('div', o.selected ? 'cur' : '', o.textContent));
      root.appendChild(selectBox);
      return [...selectBox.children].map((c) => {
        const b = c.getBoundingClientRect();
        return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
      });
    },
    closeSelect() { if (selectBox) { selectBox.remove(); selectBox = null; } },

    smoothScroll(y, ms) {
      const sy = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ty = Math.max(0, Math.min(max, y));
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      return new Promise((res) => {
        const t0 = clock();
        const f = () => {
          const k = Math.min(1, (clock() - t0) / ms);
          window.scrollTo(0, sy + (ty - sy) * ease(k));
          k < 1 ? requestAnimationFrame(f) : res();
        };
        requestAnimationFrame(f);
      });
    },
  };

  window.__demo = api;

  const initialCard = new URLSearchParams(location.search).get('dmcard');
  if (initialCard) {
    const show = () => {
      ensure();
      card.style.transition = 'none';
      api.card({ ...JSON.parse(initialCard), instant: true });
      void card.offsetWidth;
      card.style.transition = '';
    };
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', show) : show();
  }
})();
