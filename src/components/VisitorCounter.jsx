import { useEffect, useState } from 'react';
import { CONTACT_ENDPOINT, VISIT_SEED } from '../data/site.js';

const SESSION_FLAG = 'yhx-visit-counted';
const LAST_SHOWN = 'yhx-visit-count';
const TIMEOUT_MS = 5000;

function safeGet(store, key) {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(store, key, value) {
  try {
    store.setItem(key, value);
  } catch {
    /* 隱私模式忽略 */
  }
}

function fetchWithTimeout(url, options = {}, ms = TIMEOUT_MS) {
  if (typeof AbortController === 'undefined') return fetch(url, options);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

/**
 * 到訪人次計數器
 *
 * 計數規則（session 去重）：
 *   - 同一個分頁工作階段只加一次 → 重新整理不會重複加
 *   - 關掉分頁再開 = 新的一次到訪 → 會再加一次
 *   - 顯示的數字會記在 localStorage，所以自己的數字會逐次累積
 *
 * 連不上後端時：維持上次記住的數字，不顯示假數字、也不顯示錯誤。
 */
export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (!CONTACT_ENDPOINT || !CONTACT_ENDPOINT.includes('script.google.com')) return;

    // 先顯示上次記住的數字，避免空白
    const cached = Number(safeGet(localStorage, LAST_SHOWN));
    if (Number.isFinite(cached) && cached > 0) setCount(cached);

    const isNewSession = !safeGet(sessionStorage, SESSION_FLAG);
    const stamp = Date.now();

    const readCount = () =>
      fetchWithTimeout(`${CONTACT_ENDPOINT}?action=read&t=${stamp}`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'omit',
      })
        .then((r) => r.text())
        .then((t) => parseInt(String(t).trim(), 10))
        .catch(() => null);

    let cancelled = false;

    (async () => {
      let value = null;

      if (isNewSession) {
        // 新的一次到訪：先 +1（fire-and-forget，no-cors 讀不到回應），再讀權威數字
        try {
          await fetchWithTimeout(`${CONTACT_ENDPOINT}?action=hit&t=${stamp}`, {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store',
            credentials: 'omit',
          });
          safeSet(sessionStorage, SESSION_FLAG, '1');
        } catch {
          /* 加不到就不記 session，下次再試 */
        }
      }

      value = await readCount();
      if (cancelled) return;

      if (Number.isFinite(value) && value > 0) {
        const prev = Number(safeGet(localStorage, LAST_SHOWN));
        safeSet(localStorage, LAST_SHOWN, String(value));
        setCount(value);
        if (Number.isFinite(prev) && value > prev) {
          setBump(true);
          setTimeout(() => setBump(false), 260);
        }
      } else if (!Number.isFinite(cached)) {
        // 後端沒回應、也沒有快取 → 至少顯示底數，不留空白
        setCount(VISIT_SEED);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!count) return null;

  return (
    <span
      role="status"
      aria-live="polite"
      title="累計到訪人次"
      className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-full border text-xs
                 border-paper-line dark:border-ink-line text-ink/70 dark:text-paper/70
                 hover:border-gold hover:text-gold transition-all duration-200"
      style={{ transform: bump ? 'scale(1.12)' : 'scale(1)', transition: 'transform .22s ease, color .2s, border-color .2s' }}
    >
      <i className="fa-regular fa-eye" />
      <span>{count.toLocaleString('en-US')}</span>
    </span>
  );
}
