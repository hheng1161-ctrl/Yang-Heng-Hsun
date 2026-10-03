import { CONTACT_ENDPOINT } from '../data/site.js';

/**
 * 讀取後端資訊（`?action=info`）
 *
 * 為什麼需要：表單送出後的轉址不帶 CORS 標頭，瀏覽器讀不到回應。
 * 因此改用「送出前後比對洽詢筆數」作為客觀佐證——這一招能繞過限制，
 * 因為我們比對的是自己兩次讀到的數字，而不是去讀 POST 的回應。
 */
export async function getEndpointInfo(timeoutMs = 6000) {
  try {
    const url = `${CONTACT_ENDPOINT}?action=info&t=${Date.now()}`;
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
      ...(controller ? { signal: controller.signal } : {}),
    });
    if (timer) clearTimeout(timer);

    const text = await res.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** 讀取目前已記錄的洽詢筆數；失敗回 null（不誤導使用者） */
export async function getInquiryCount() {
  const info = await getEndpointInfo();
  const value = info && typeof info.inquiries === 'number' ? info.inquiries : null;
  return value;
}
