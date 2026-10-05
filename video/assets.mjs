// 外部アセット（Tailwind CDN / Google Fonts / 画像）を curl で取得してローカルにキャッシュし、
// Playwright のリクエスト横取りで配信する。録画のたびにネットワーク状況で見た目が変わらないようにするため。
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const CACHE_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), '.cache');

function fetchToCache(url, userAgent) {
  const key = createHash('sha1').update(url).digest('hex');
  const body = path.join(CACHE_DIR, key + '.body');
  const meta = path.join(CACHE_DIR, key + '.json');
  if (fs.existsSync(body) && fs.existsSync(meta)) {
    return { body: fs.readFileSync(body), ...JSON.parse(fs.readFileSync(meta, 'utf8')) };
  }
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const headersFile = body + '.headers';
  execFileSync('curl', ['-sSL', '--max-time', '60', '-A', userAgent, '-D', headersFile, '-o', body, url]);
  const headers = fs.readFileSync(headersFile, 'utf8');
  fs.unlinkSync(headersFile);
  // リダイレクトを辿った場合は最後のレスポンスを採用
  const blocks = headers.trim().split(/\r?\n\r?\n/);
  const last = blocks[blocks.length - 1];
  const status = Number(last.match(/^HTTP\/[\d.]+ (\d+)/)?.[1] ?? 200);
  const contentType = last.match(/^content-type:\s*(.+)$/im)?.[1]?.trim() ?? 'application/octet-stream';
  fs.writeFileSync(meta, JSON.stringify({ status, contentType }));
  return { body: fs.readFileSync(body), status, contentType };
}

export async function routeExternalAssets(context, appOrigin) {
  const userAgent = await (async () => {
    const p = await context.newPage();
    const ua = await p.evaluate(() => navigator.userAgent);
    await p.close();
    return ua;
  })();
  await context.route('**/*', async (route) => {
    const url = route.request().url();
    if (url.startsWith(appOrigin) || url.startsWith('data:')) return route.continue();
    try {
      const { body, status, contentType } = fetchToCache(url, userAgent);
      await route.fulfill({
        status,
        body,
        headers: { 'content-type': contentType, 'access-control-allow-origin': '*' },
      });
    } catch (e) {
      console.warn('[assets] failed:', url, e.message);
      await route.abort();
    }
  });
}
