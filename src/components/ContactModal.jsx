import { useState, useEffect, useRef } from 'react';
import { CONTACT_ENDPOINT, getEmail } from '../data/site.js';
import { getInquiryCount } from '../api/endpoint.js';

const SUBJECTS = ['工程技術', '品質安全', '健康產業', '其他合作'];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  subject: '',
  message: '',
  website: '', // 蜜罐
};

/**
 * 聯絡表單彈窗
 *
 * ⚠ 誠實回報原則：後端是 Google Apps Script，送出後的轉址不帶 CORS 標頭，
 *   瀏覽器讀不到回應。因此不做「假的成功」——先嘗試讀回應：
 *     · 讀得到且有 success → 確定成功
 *     · 讀不到（CORS 阻擋）→ 誠實告知「無法自動確認」，並提供 Email 備援
 *   另外會在送出前後比對試算表的洽詢筆數，作為可用的客觀線索。
 */
export default function ContactModal({ isOpen, onClose, onToast }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null); // { ok, verified }
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  // ESC 關閉 + 背景捲動鎖定
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.subject || !form.message.trim()) {
      setError('請填寫姓名、Email、洽詢主旨與訊息內容。');
      return;
    }

    setSending(true);
    setResult(null);

    try {
      const before = await getInquiryCount();

      const body = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        organization: form.organization.trim(),
        subject: form.subject,
        message: form.message.trim(),
        website: form.website,
      });

      let verified = false;
      try {
        const res = await fetch(CONTACT_ENDPOINT, { method: 'POST', body });
        const data = await res.json().catch(() => null);
        verified = Boolean(data && data.success);
      } catch {
        // CORS 阻擋：無法從回應確認，稍後用筆數比對
      }

      if (!verified) {
        const after = await getInquiryCount();
        if (before !== null && after !== null && after > before) verified = true;
      }

      setResult({ ok: true, verified });
      setForm(EMPTY_FORM);
      onToast?.(
        verified ? '訊息已送出，謝謝你的聯絡。' : '已送出，但無法自動確認，建議留意回覆。',
        verified ? 'success' : 'info'
      );
    } catch (err) {
      setResult({ ok: false, verified: false });
      onToast?.('送出失敗，請改用 Email 聯絡。', 'danger');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contactFormTitle"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm no-print"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl dark:bg-ink-card"
      >
        <div className="flex items-center justify-between border-b border-paper-line px-5 py-4 dark:border-ink-line">
          <div>
            <p className="text-xs tracking-[0.2em] text-gold">CONTACT FORM</p>
            <h2 id="contactFormTitle" className="font-serif text-xl font-bold">留下訊息</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉聯絡表單"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper-line
                       hover:border-gold hover:text-gold dark:border-ink-line"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {result?.ok ? (
          <div className="px-6 py-12 text-center">
            <i className="fa-solid fa-circle-check text-4xl text-gold" />
            <p className="mt-4 font-serif text-lg font-bold">
              {result.verified ? '訊息已送出' : '訊息已送出（未經自動確認）'}
            </p>
            <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
              {result.verified
                ? '我已收到，會盡快回覆你。'
                : '後端沒有回報可讀取的結果，但送出請求已發出。若一週內沒有回覆，歡迎直接寄信。'}
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <button type="button" onClick={onClose} className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-ink hover:bg-gold-light">
                關閉
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-6 text-left md:px-7" noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                姓名 <span className="text-gold">*</span>
                <input
                  ref={firstFieldRef}
                  name="name"
                  required
                  autoComplete="name"
                  className="field"
                  placeholder="請輸入姓名"
                  value={form.name}
                  onChange={update('name')}
                />
              </label>

              <label className="text-sm font-medium">
                Email <span className="text-gold">*</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={update('email')}
                />
              </label>

              <label className="text-sm font-medium">
                電話
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="field"
                  placeholder="方便聯絡的電話"
                  value={form.phone}
                  onChange={update('phone')}
                />
              </label>

              <label className="text-sm font-medium">
                公司／單位
                <input
                  name="organization"
                  autoComplete="organization"
                  className="field"
                  placeholder="公司、學校或組織名稱"
                  value={form.organization}
                  onChange={update('organization')}
                />
              </label>

              <label className="text-sm font-medium md:col-span-2">
                洽詢主旨 <span className="text-gold">*</span>
                <select name="subject" required className="field" value={form.subject} onChange={update('subject')}>
                  <option value="">請選擇洽詢主旨</option>
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-medium md:col-span-2">
                訊息內容 <span className="text-gold">*</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="field resize-y"
                  placeholder="請簡述想討論的內容"
                  value={form.message}
                  onChange={update('message')}
                />
              </label>
            </div>

            {/* 蜜罐欄位：正常使用者看不到 */}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px]"
              value={form.website}
              onChange={update('website')}
            />

            {error && (
              <p role="alert" className="mt-4 text-sm text-rose-600 dark:text-rose-400">
                <i className="fa-solid fa-triangle-exclamation mr-1" />
                {error}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-paper-line px-5 py-2.5 text-sm hover:border-gold hover:text-gold dark:border-ink-line"
              >
                稍後再填
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 font-medium text-ink
                           shadow-lg shadow-gold/20 transition hover:bg-gold-light disabled:opacity-60"
              >
                <i className={sending ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-paper-plane'} />
                {sending ? '送出中…' : '送出訊息'}
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink/50 dark:text-paper/50">
              送出後會直接寫入我的洽詢紀錄。若送出失敗，也可以直接寄到{' '}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(getEmail()).then(
                    () => onToast?.('Email 已複製', 'success'),
                    () => onToast?.('無法自動複製，請手動記下', 'danger')
                  );
                }}
                className="text-gold underline"
              >
                點此複製 Email
              </button>
              。
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
