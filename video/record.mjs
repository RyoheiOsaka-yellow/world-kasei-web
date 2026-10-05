// プロトタイプ説明動画の自動収録スクリプト。
// アプリを起動 → Playwright で操作シナリオを実行 → CDP スクリーンキャストを ffmpeg で 1080p/30fps の MP4 に書き出す。
//   node record.mjs            … 収録して out/ に MP4・字幕(SRT)・チャプター一覧を出力
//   APP_URL=http://... node record.mjs  … 起動済みのアプリを使う
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeExternalAssets } from './assets.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.resolve(ROOT, '../world-kasei---wintec-pos');
const OUT_DIR = path.resolve(ROOT, 'out');
const W = 1440, H = 810;            // レイアウト上の画面サイズ（デスクトップ表示）
const OUT_W = 1920, OUT_H = 1080;   // 出力解像度（deviceScaleFactor で高精細に描画）
const FPS = 30;
const PORT = 5179;

// スローモーション収録：ページ内の時間（CSSアニメ・演出）を 1/SLOWMO 倍速で進めて収録し、書き出し時に元の速さへ戻す。
// 1080p の取り込みは 25fps 程度が上限のため、こうすることで 30fps でも滑らかになる。
const SLOWMO = Number(process.env.SLOWMO ?? 2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const wait = (ms) => sleep(ms * SLOWMO); // シナリオ上の時間（完成動画での時間）で待つ
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// ---------------------------------------------------------------- アプリ起動
async function waitForHttp(url, timeoutMs = 30000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    const ok = await new Promise((res) => {
      http.get(url, (r) => { r.resume(); res(r.statusCode === 200); }).on('error', () => res(false));
    });
    if (ok) return;
    await sleep(300);
  }
  throw new Error('app did not start: ' + url);
}

async function startApp() {
  if (process.env.APP_URL) return { url: process.env.APP_URL.replace(/\/$/, ''), stop() {} };
  const proc = spawn('npx', ['vite', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
    cwd: APP_DIR, stdio: 'ignore', detached: true,
  });
  const url = `http://127.0.0.1:${PORT}`;
  await waitForHttp(url + '/');
  return { url, stop: () => { try { process.kill(-proc.pid); } catch {} } };
}

// ---------------------------------------------------------------- 収録（スクリーンキャスト → ffmpeg）
class Recorder {
  constructor(page, file) {
    this.page = page;
    this.file = file;
    this.prev = null;
    this.nextTick = null;
    this.t0 = null;
  }
  async start() {
    this.ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '14', '-pix_fmt', 'yuv420p', this.file], { stdio: ['pipe', 'inherit', 'inherit'] });
    this.done = new Promise((res) => this.ffmpeg.on('close', res));
    this.cdp = await this.page.context().newCDPSession(this.page);
    this.cdp.on('Page.screencastFrame', (f) => this.onFrame(f));
    await this.cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: OUT_W, maxHeight: OUT_H });
    while (this.t0 === null) await sleep(10);
  }
  // 可変フレームレートで届く画像を、直前フレームの複製で埋めて固定 30fps にする
  onFrame(f) {
    this.cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
    const t = f.metadata.timestamp;
    const buf = Buffer.from(f.data, 'base64');
    if (this.t0 === null) { this.t0 = t; this.nextTick = t; }
    if (this.prev) this.fill(t);
    this.prev = buf;
  }
  fill(until) {
    while (this.nextTick < until) {
      this.ffmpeg.stdin.write(this.prev);
      this.nextTick += SLOWMO / FPS;
    }
  }
  now() { return this.t0 === null ? 0 : (Date.now() / 1000 - this.t0) / SLOWMO; }
  async stop() {
    this.fill(Date.now() / 1000 + SLOWMO / FPS);
    await this.cdp.send('Page.stopScreencast').catch(() => {});
    this.ffmpeg.stdin.end();
    await this.done;
    return this.now();
  }
}

// ---------------------------------------------------------------- 演出ヘルパー
function createDirector(page, rec) {
  const cur = { x: W * 0.62, y: H * 0.55 };
  const log = [];
  let open = null;
  let frame = null; // スマホ画面（iframe）を操作中ならその Frame

  const demo = (fn, arg) => page.evaluate(fn, arg);
  const closeCaption = () => { if (open) { open.end = rec.now(); log.push(open); open = null; } };

  const d = {
    log,
    useFrame(f) { frame = f; },
    readMs(html) {
      const chars = html.replace(/<[^>]+>/g, '').length;
      return 900 + chars * 115;
    },
    async caption(label, text, chapter = null) {
      closeCaption();
      open = { start: rec.now(), label, text };
      await demo(([label, text, chapter]) => __demo.caption({ label, text, chapter }), [label, text, chapter]);
    },
    async say(label, text, chapter = null, extra = 0) {
      await d.caption(label, text, chapter);
      await wait(Math.max(2200, d.readMs(text) + extra));
    },
    async hideCaption() { closeCaption(); await demo(() => __demo.hideCaption()); },
    async card(opts, holdMs = 0) {
      closeCaption();
      await demo((o) => __demo.card(o), opts);
      if (holdMs) await wait(holdMs);
    },
    async hideCard() { await demo(() => __demo.hideCard()); await wait(450); },
    async hl(target, opts = {}) {
      const list = Array.isArray(target) ? target : [target];
      const handles = [];
      for (const t of list) handles.push(await t.elementHandle());
      await demo(([hs, o]) => __demo.highlight(hs.length === 1 ? hs[0] : hs, o), [handles, opts]);
    },
    async unhl(ms = 300) { await demo(() => __demo.clearHighlights()); await wait(ms); },

    // カーソル移動：見た目はページ内アニメで滑らかに、実マウスは時間に合わせて追従させホバー効果を出す
    async moveTo(x, y, ms = 700) {
      const sx = cur.x, sy = cur.y;
      const dist = Math.hypot(x - sx, y - sy);
      ms = Math.max(160, Math.min(ms, 250 + dist * 1.1));
      const bend = Math.min(60, dist * 0.08);
      const real = ms * SLOWMO;
      const anim = demo(([a, b, c, e, f, g]) => __demo.animateCursor(a, b, c, e, f, g), [sx, sy, x, y, ms, bend]);
      const nx = -(y - sy) / (dist || 1), ny = (x - sx) / (dist || 1);
      const t0 = Date.now();
      for (;;) {
        const k = Math.min(1, (Date.now() - t0) / real);
        if (k >= 1) break;
        const e = easeInOut(k), arc = Math.sin(Math.PI * e) * bend;
        await page.mouse.move(sx + (x - sx) * e + nx * arc, sy + (y - sy) * e + ny * arc);
        await sleep(25);
      }
      await anim;
      await page.mouse.move(x, y);
      cur.x = x; cur.y = y;
    },
    async boxOf(locator) {
      const b = await locator.boundingBox();
      if (!b) throw new Error('element not visible: ' + locator);
      return b;
    },
    async moveToEl(locator, { dx = 0.5, dy = 0.5, ms } = {}) {
      const b = await d.boxOf(locator);
      await d.moveTo(b.x + b.width * dx, b.y + b.height * dy, ms);
    },
    async click(x, y) {
      if (x != null) await d.moveTo(x, y);
      await wait(140);
      await demo(([x, y]) => __demo.press(x, y), [cur.x, cur.y]);
      await page.mouse.down();
      await wait(110);
      await page.mouse.up();
      await demo(() => __demo.release());
      await wait(200);
    },
    async clickEl(locator, opts) { await d.moveToEl(locator, opts); await d.click(); },
    // 見た目だけのクリック（ネイティブのプルダウンを開かせたくない場合）
    async fakeClick() {
      await wait(140);
      await demo(([x, y]) => __demo.press(x, y), [cur.x, cur.y]);
      await wait(110);
      await demo(() => __demo.release());
      await wait(200);
    },
    async type(text, delay = 70) { await page.keyboard.type(text, { delay: delay * SLOWMO }); },
    async drag(toX, toY, ms = 1400) {
      await demo(([x, y]) => __demo.press(x, y), [cur.x, cur.y]);
      await page.mouse.down();
      await wait(150);
      await d.moveTo(toX, toY, ms);
      await wait(150);
      await page.mouse.up();
      await demo(() => __demo.release());
    },

    // スクロール（イージング付き）。frame 指定中は iframe 内をスクロール
    async scrollTo(y, ms = 1200) {
      if (frame) {
        await frame.evaluate(([y, ms]) => new Promise((res) => {
          const sy = scrollY, ty = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, y));
          const e = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
          const t0 = performance.now();
          const f = () => { const k = Math.min(1, (performance.now() - t0) / ms); scrollTo(0, sy + (ty - sy) * e(k)); k < 1 ? requestAnimationFrame(f) : res(); };
          requestAnimationFrame(f);
        }), [y, ms * SLOWMO]);
      } else {
        await demo(([y, ms]) => __demo.smoothScroll(y, ms), [y, ms]);
      }
    },
    // 要素の上端が画面上 top px の位置に来るようにスクロール
    async scrollToEl(locator, top = 96, ms = 1200) {
      const y = await locator.evaluate((el, top) => el.getBoundingClientRect().top + window.scrollY - top, top);
      await d.scrollTo(y, ms);
    },
    finish() { closeCaption(); },
  };
  return d;
}

// ---------------------------------------------------------------- シナリオ
async function scenario(page, d, appUrl) {
  const nav = (name) => page.locator('nav a', { hasText: name }).first();
  const C = { intro: 'はじめに', home: '01 ｜ トップページ', sim: '01 ｜ トップページ ▶ 操作説明：コスト・シミュレーター',
    products: '02 ｜ 製品情報', solutions: '03 ｜ ソリューション', tech: '04 ｜ テクノロジー', support: '05 ｜ サポート・お問い合わせ' };

  // ===== オープニング（収録開始前にタイトルを表示済み）
  await wait(3600);
  await d.hideCard();

  // ===== はじめに
  await d.say(C.intro, 'WINTEC POS 日本正規代理店・ワールド化成の<em>企業サイト（プロトタイプ）</em>です');
  await d.hl(page.locator('nav a', { hasText: 'ホーム' }).first().locator('..'), { label: '全5ページ', pad: 10 });
  await d.caption(C.intro, 'ページは全部で5つ。<em>画面上部のメニュー</em>から移動できます');
  for (const name of ['ホーム', '製品情報', 'ソリューション', 'テクノロジー', 'サポート']) {
    await d.moveToEl(nav(name), { ms: 450 });
    await wait(380);
  }
  await wait(1400);
  await d.unhl();

  // ===== 01 トップページ
  await d.hl(page.locator('h1').locator('..'), { label: 'キャッチコピー', pad: 14 });
  await d.say(C.home, 'ファーストビューで「信頼性」と「先進性」を<em>ひと目で</em>伝えます', 1);
  await d.unhl();
  const heroCta = page.locator('a', { hasText: 'お問い合わせ・資料請求' }).first();
  await d.hl(heroCta.locator('..'), { label: '主要ボタン', pad: 10 });
  await d.caption(C.home, 'オレンジのボタンから<em>お問い合わせ・資料請求</em>へ進めます', 1);
  await d.moveToEl(heroCta);
  await wait(3200);
  await d.unhl();
  await d.hl(page.locator('img[alt="AnyPOS High-End Model"]'), { label: '仮画像', pad: 0, pos: 'inside' });
  await d.say(C.home, '右側の製品画像は<em>仮素材</em>です<small>※プロトタイプのため、サイト内の画像はすべてプレースホルダーです</small>', 1, -1500);
  await d.unhl();

  const usp = page.locator('section', { has: page.locator('h2', { hasText: '選ばれる3つの理由' }) });
  await d.scrollToEl(usp, -16, 1400);
  await d.caption(C.home, '「WINTECが選ばれる3つの理由」を<em>3枚のカード</em>で紹介<small>マウスを乗せるとアイコンが色付きで強調されます</small>', 1);
  for (let i = 0; i < 3; i++) {
    await d.moveToEl(usp.locator('.grid > div').nth(i), { dy: 0.4, ms: 600 });
    await wait(1300);
  }
  await wait(600);

  const table = page.locator('div.grid-cols-4').first();
  await d.scrollToEl(table, 110, 1400);
  await d.hl(table, { label: '比較表', pad: 6 });
  await d.say(C.home, '競合比較表：<em>A社（国内大手）・B社（格安海外製）</em>とWINTECを比較', 1);
  await d.unhl(150);
  await d.hl([3, 7, 11, 15].map((i) => table.locator(':scope > div').nth(i)), { label: 'WINTEC', pad: 4, pos: 'left' });
  await d.say(C.home, '品質・コスト・サポートの<em>バランスの良さ</em>をひと目で比較できます', 1);
  await d.unhl();

  // ===== 01 操作説明：導入コスト・シミュレーター
  const roi = page.locator('div.rounded-2xl', { has: page.locator('h3', { hasText: '導入コスト・シミュレーター' }) });
  await d.scrollToEl(roi, 90, 1400);
  await d.say(C.sim, '<em>導入コスト・シミュレーター</em>では、台数と年数から総コストを試算できます', 1, -800);

  const slider = page.locator('input[type=range]');
  await d.hl(slider.locator('..'), { num: 1, label: '導入台数', pad: 12 });
  await d.caption(C.sim, '① スライダーを左右にドラッグして<em>導入台数</em>を設定します', 1);
  const thumbAt = async (v) => {
    const b = await d.boxOf(slider);
    return { x: b.x + 8 + ((v - 1) / 99) * (b.width - 16), y: b.y + b.height / 2 };
  };
  let p = await thumbAt(10);
  await d.moveTo(p.x, p.y, 900);
  await wait(300);
  p = await thumbAt(50);
  await d.drag(p.x, p.y, 1800);
  await wait(900);
  await d.unhl(150);
  await d.hl(roi.locator('div.space-y-4'), { label: 'コスト比較バー', pad: 10, pos: 'top' });
  await d.say(C.sim, '台数に合わせて、3社の<em>総コストがリアルタイムに</em>変化します', 1, -500);
  await d.unhl(150);

  const select = page.locator('select').first();
  await d.hl(select, { num: 2, label: '利用年数', pad: 10 });
  await d.caption(C.sim, '② プルダウンから<em>想定利用年数</em>（3年／5年／7年）を選びます', 1);
  const pick = async (value, index) => {
    await d.moveToEl(select, { dx: 0.8 });
    await d.fakeClick();
    const rows = await select.evaluate((el) => __demo.openSelect(el));
    await wait(500);
    await d.moveTo(rows[index].x, rows[index].y, 500);
    await wait(250);
    await d.fakeClick();
    await page.evaluate(() => __demo.closeSelect());
    await select.selectOption(value);
  };
  await pick('3', 0);
  await wait(1800);
  await pick('7', 2);
  await wait(500);
  await d.unhl(150);
  await d.hl(roi.locator('div.relative.pt-2', { hasText: 'B社' }), { label: '買替コスト警告', pad: 8, pos: 'right' });
  await d.say(C.sim, '4年以上を選ぶと、B社には<em>耐久性不足による買替コスト</em>が加算されます', 1);
  await d.unhl(150);

  const saving = page.locator('div.animate-fade-in-up', { hasText: 'コスト削減' });
  await d.scrollToEl(saving, 230, 1000);
  await d.hl(saving, { num: 3, label: '削減額', pad: 8 });
  await d.say(C.sim, '③ 大手メーカー（A社）と比べた<em>削減額</em>が自動で表示されます', 1);
  await d.unhl();

  const lineup = page.locator('section', { has: page.locator('h2', { hasText: '製品ラインナップ' }) });
  await d.scrollToEl(lineup, -20, 1400);
  await d.caption(C.home, '主力3シリーズをカードで紹介。クリックで<em>製品情報ページ</em>へ移動します', 1);
  for (let i = 0; i < 3; i++) {
    await d.moveToEl(lineup.locator('.grid > a').nth(i), { dy: 0.45, ms: 600 });
    await wait(1200);
  }
  await wait(500);

  const wp = page.locator('section', { hasText: 'Free Whitepaper' });
  await d.scrollToEl(wp, 60, 1300);
  await d.hl(wp.locator('div.bg-white.text-slate-800'), { label: '資料ダウンロード', pad: 8, pos: 'top' });
  await d.say(C.home, '<em>お役立ち資料のダウンロード</em>で、見込み客の連絡先を獲得します', 1);
  await d.unhl();

  const cta = page.locator('section', { hasText: 'Ready to Upgrade?' });
  await d.scrollToEl(cta, 60, 1500);
  await d.hl(cta.locator('button', { hasText: '製品カタログをDL' }).locator('..'), { label: 'お問い合わせ導線', pad: 12 });
  await d.say(C.home, 'ページの最後にも<em>カタログDL・お見積り</em>への導線を配置しています', 1, -800);
  await d.unhl();

  // ===== 02 製品情報
  await d.caption(C.home, 'メニューは常に画面上部に表示。<em>「製品情報」</em>をクリックします', 1);
  await d.moveToEl(nav('製品情報'), { ms: 900 });
  await wait(1400);
  await page.evaluate((o) => __demo.cardOnNextNavigation(o), { num: '02', title: '製品情報', sub: 'Products & Specifications' });
  await d.click();
  d.finish();
  await wait(1900);
  await d.hideCard();

  await d.say(C.products, 'シリーズごとに<em>スペックと特長</em>を詳しく掲載しています', 2, -600);
  const anypos = page.locator('div.rounded-xl', { has: page.locator('h3', { hasText: 'AnyPOS Series' }) });
  await d.scrollToEl(anypos, 100, 1300);
  await d.hl(anypos.locator('div.grid').first(), { label: '主要スペック', pad: 8 });
  await d.say(C.products, 'AnyPOS：<em>CPU・ディスプレイ・通信・OS</em>などのスペックを一覧で表示', 2);
  await d.unhl();
  const selfpos = page.locator('div.rounded-xl', { has: page.locator('h3', { hasText: 'SelfPOS Series' }) });
  await d.scrollToEl(selfpos, 100, 1300);
  await d.hl(selfpos.locator('div.rounded-lg', { hasText: 'AI Loss Prevention System' }), { label: 'AI損失防止', pad: 8 });
  await d.say(C.products, 'SelfPOS：<em>AIによるスキャン漏れ・不正登録の検知</em>を解説', 2);
  await d.unhl();

  // ===== 03 ソリューション
  await d.caption(C.products, '続いて<em>「ソリューション」</em>ページへ', 2);
  await d.moveToEl(nav('ソリューション'), { ms: 900 });
  await wait(700);
  await page.evaluate((o) => __demo.cardOnNextNavigation(o), { num: '03', title: 'ソリューション', sub: 'Industry Solutions' });
  await d.click();
  d.finish();
  await wait(1900);
  await d.hideCard();

  await d.say(C.solutions, '<em>スーパー・飲食店・アパレル</em>の3業態別に、課題と解決策を提案', 3, -400);
  const sols = page.locator('main section');
  await d.scrollToEl(sols.nth(0), 100, 1300);
  await d.hl(sols.nth(0).locator('div.bg-slate-50'), { label: 'おすすめ製品', pad: 6 });
  await d.say(C.solutions, 'スーパー：「レジ待ち解消」と「ロス削減」を両立<small>各業態に合ったおすすめ製品も明記しています</small>', 3, -1500);
  await d.unhl();
  await d.scrollToEl(sols.nth(1), 100, 1300);
  await d.say(C.solutions, '飲食店：油・水・熱に強い<em>防水・ファンレス設計</em>をアピール', 3, -800);
  await d.scrollToEl(sols.nth(2), 100, 1300);
  await d.say(C.solutions, 'アパレル：ブランドの世界観を損なわない<em>デザイン性</em>を訴求', 3, -800);

  // ===== 04 テクノロジー
  await d.caption(C.solutions, '続いて<em>「テクノロジー」</em>ページへ', 3);
  await d.moveToEl(nav('テクノロジー'), { ms: 900 });
  await wait(700);
  await page.evaluate((o) => __demo.cardOnNextNavigation(o), { num: '04', title: 'テクノロジー', sub: 'Technology & Quality' });
  await d.click();
  d.finish();
  await wait(1900);
  await d.hideCard();

  const aiPanel = page.locator('div.rounded-2xl', { hasText: 'Target Detected' });
  await d.scrollToEl(page.locator('main section').first(), 100, 1300);
  await d.hl(aiPanel, { label: 'AI解析のイメージ', pad: 6, pos: 'inside' });
  await d.say(C.tech, 'AIが不正を見逃さない<em>「AI Loss Prevention」</em>の仕組みを図解', 4);
  await d.unhl(150);
  await d.hl(page.locator('div.rounded-lg', { hasText: '検知可能な不正パターンの例' }), { label: '検知できる不正の例', pad: 6, pos: 'right' });
  await d.say(C.tech, 'スキャン回避・バーコード偽装・かご抜けなど<em>具体例</em>を紹介', 4);
  await d.unhl();
  const tq = page.locator('section', { hasText: 'Quality Beyond Standard' });
  await d.scrollToEl(tq, 100, 1300);
  await d.caption(C.tech, '国際規格に基づく<em>3つの耐久テスト</em>で、品質の裏付けを提示', 4);
  for (let i = 0; i < 3; i++) {
    await d.moveToEl(tq.locator('div.grid > div').nth(i), { dy: 0.35, ms: 600 });
    await wait(1100);
  }
  await wait(500);

  // ===== 05 サポート・お問い合わせ
  await d.caption(C.tech, '最後に<em>「サポート」</em>ページへ', 4);
  await d.moveToEl(nav('サポート'), { ms: 900 });
  await wait(700);
  await page.evaluate((o) => __demo.cardOnNextNavigation(o), { num: '05', title: 'サポート・お問い合わせ', sub: 'Support & Contact' });
  await d.click();
  d.finish();
  await wait(1900);
  await d.hideCard();

  const steps = page.locator('div.grid', { has: page.getByText('ヒアリング') });
  await d.scrollToEl(steps, 170, 1100);
  await d.caption(C.support, 'ヒアリングから運用・保守まで、<em>導入の4ステップ</em>を図示', 5);
  for (let i = 0; i < 4; i++) {
    await d.moveToEl(steps.locator(':scope > div').nth(i), { dy: 0.35, ms: 500 });
    await wait(900);
  }
  await wait(500);
  const assure = page.locator('div.rounded-2xl', { hasText: '国内拠点があるから、安心。' });
  await d.scrollToEl(assure, 120, 1200);
  await d.hl(assure, { label: '国内サポート', pad: 6 });
  await d.say(C.support, '国内拠点による<em>日本語サポート・修理対応</em>で安心感を訴求', 5, -600);
  await d.unhl();

  const form = page.locator('form');
  await d.scrollToEl(form.locator('..'), 84, 1300);
  await d.caption(C.support, '<em>お問い合わせフォーム</em>の入力イメージです', 5);
  const fill = async (field, text) => {
    const b = await d.boxOf(field);
    if (b.y + b.height > H - 190) await d.scrollTo(await page.evaluate(() => scrollY) + (b.y + b.height - (H - 190)) + 40, 600);
    await d.clickEl(field, { dx: 0.3 });
    await d.type(text);
    await wait(250);
  };
  await fill(form.locator('input').nth(0), '株式会社サンプル商事');
  await fill(form.locator('input').nth(1), '山田 太郎');
  await fill(form.locator('input').nth(2), '03-1234-5678');
  await fill(form.locator('input').nth(3), 'yamada@example.com');
  await fill(form.locator('textarea'), 'SelfPOSのデモ機貸出を希望します。');
  const submit = form.locator('button');
  const sb = await d.boxOf(submit);
  if (sb.y + sb.height > H - 190) await d.scrollTo(await page.evaluate(() => scrollY) + (sb.y + sb.height - (H - 190)) + 30, 700);
  await d.moveToEl(submit, { dx: 0.55 });
  await d.say(C.support, '入力後、<em>「送信する」</em>で完了<small>※プロトタイプのため、送信・資料ダウンロードは未実装です</small>', 5);

  // ===== 06 スマートフォン表示
  await d.card({ num: '06', title: 'スマートフォン表示', sub: 'Responsive Design' }, 1300);
  const cardParam = encodeURIComponent(JSON.stringify({ num: '06', title: 'スマートフォン表示', sub: 'Responsive Design' }));
  await page.goto(`${appUrl}/__stage.html?src=${encodeURIComponent('/#/')}&dmcard=${cardParam}`, { waitUntil: 'networkidle' });
  const phone = page.frameLocator('#app');
  const phoneFrame = (await page.$('#app').then((h) => h.contentFrame()));
  await phoneFrame.waitForSelector('h1');
  await d.slowDown();
  await page.evaluate(() => document.fonts.ready);
  await wait(700);
  await page.evaluate(() => __demo.cursorMode('touch'));
  await d.hideCard();
  await wait(1800);

  await page.evaluate(() => __stage.step(0));
  await wait(600);
  await d.clickEl(phone.locator('nav button').first());
  await wait(1200);
  await page.evaluate(() => __stage.step(1));
  await wait(500);
  await d.clickEl(phone.locator('nav a', { hasText: '製品情報' }).last(), { dx: 0.4 });
  await wait(900);
  await page.evaluate(() => __stage.step(2));
  d.useFrame(phoneFrame);
  await d.moveTo(W * 0.27, H * 0.7, 600);
  await wait(400);
  await d.scrollTo(900, 2600);
  await wait(500);
  await d.scrollTo(1900, 2600);
  await wait(1400);
  d.useFrame(null);

  // ===== エンディング
  await d.card({ kicker: 'THANK YOU', title: 'ご視聴ありがとうございました', sub: 'ご意見・ご要望をお聞かせください', foot: 'ワールド化成株式会社 ｜ WINTEC POS 公式サイト プロトタイプ' }, 4200);
}

// ---------------------------------------------------------------- 出力（字幕・チャプター）
function fmt(t, sep = ',') {
  const ms = Math.round(t * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, s = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}${sep}${String(ms % 1000).padStart(3, '0')}`;
}
function writeSidecars(log, duration) {
  const plain = (h) => h.replace(/<small>/g, '\n').replace(/<[^>]+>/g, '');
  const srt = log.map((c, i) => `${i + 1}\n${fmt(c.start)} --> ${fmt(c.end ?? duration)}\n${plain(c.text)}\n`).join('\n');
  fs.writeFileSync(path.join(OUT_DIR, 'captions.srt'), srt);
  const chapters = [];
  for (const c of log) {
    const name = c.label.split(' ▶ ')[0];
    if (!chapters.length || chapters[chapters.length - 1].name !== name) chapters.push({ name, start: c.start });
  }
  const lines = ['00:00 オープニング', ...chapters.map((c) => `${fmt(c.start).slice(3, 8)} ${c.name}`)];
  fs.writeFileSync(path.join(OUT_DIR, 'chapters.txt'), lines.join('\n') + '\n');
}

// ---------------------------------------------------------------- main
const app = await startApp();
fs.rmSync(OUT_DIR, { recursive: true, force: true }); // 失敗時に古い出力が残らないように
fs.mkdirSync(OUT_DIR, { recursive: true });
// deviceScaleFactor のエミュレーションではスクリーンキャストが CSS ピクセル解像度になるため、
// 起動フラグで実スケールを指定して 1920x1080 で取り込む
const browser = await chromium.launch({ args: [`--force-device-scale-factor=${OUT_W / W}`, `--window-size=${W},${H}`] });
try {
  const context = await browser.newContext({ viewport: null });
  await routeExternalAssets(context, app.url);
  await context.route('**/__stage.html*', (route) =>
    route.fulfill({ body: fs.readFileSync(path.join(ROOT, 'stage.html')), contentType: 'text/html; charset=utf-8' }));
  await context.addInitScript({ path: path.join(ROOT, 'overlay.js') });
  const page = await context.newPage();
  const slowDown = async () => {
    const cdp = await context.newCDPSession(page);
    await cdp.send('Animation.enable');
    await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 / SLOWMO });
    await page.evaluate((k) => __demo.setTimeScale(k), SLOWMO);
  };
  page.on('load', () => { slowDown().catch(() => {}); });

  // 画像・フォントを事前に読み込んでおく（収録中のちらつき防止）
  for (const r of ['products', 'solutions', 'technology', 'support', '']) {
    await page.goto(`${app.url}/#/${r}`, { waitUntil: 'networkidle' });
  }
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => __demo.card({ kicker: 'PROTOTYPE WALKTHROUGH', title: 'WINTEC POS 公式サイト', sub: 'プロトタイプ ご説明ムービー', foot: 'ワールド化成株式会社' }));
  await wait(1200);

  const raw = path.join(OUT_DIR, 'raw.mp4');
  const rec = new Recorder(page, raw);
  await rec.start();
  const d = createDirector(page, rec);
  d.slowDown = slowDown;
  await scenario(page, d, app.url);
  d.finish();
  const duration = await rec.stop();
  writeSidecars(d.log, duration);
  console.log(`recorded ${duration.toFixed(1)}s -> ${raw}`);
} finally {
  await browser.close();
  app.stop();
}
