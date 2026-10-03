import { useState } from 'react';
import { SITE, getEmail } from '../data/site.js';

export default function Contact({ onOpenForm, onToast }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const addr = getEmail();
    try {
      await navigator.clipboard.writeText(addr);
      setCopied(true);
      onToast?.('Email 已複製到剪貼簿', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // 剪貼簿不可用（例如非 HTTPS）：退回手動提示
      setCopied(false);
      onToast?.('無法自動複製，請手動記下信箱', 'danger');
    }
  };

  return (
    <section id="contact" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <div className="py-20 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">06 — Contact</p>
          <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3">歡迎與我聯絡</h2>
          <p className="text-ink/65 dark:text-paper/65 mt-4 max-w-xl mx-auto leading-relaxed">
            無論是工程技術、品質安全管理，或健康產業的經營合作，都歡迎交流。
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 no-print">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-ink font-medium
                         hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-gold/20"
            >
              <i className="fa-regular fa-envelope" />
              <span>{copied ? '已複製！' : '點此複製 Email'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenForm}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gold text-gold
                         hover:bg-gold hover:text-ink transition-all duration-200"
            >
              <i className="fa-solid fa-message" />
              填寫聯絡表單
            </button>

            <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-paper-line dark:border-ink-line text-ink/70 dark:text-paper/70">
              <i className="fa-solid fa-location-dot text-gold" />
              {SITE.location}
            </span>
          </div>

          <p className="text-xs text-ink/45 dark:text-paper/45 mt-5">
            <i className="fa-solid fa-shield-halved mr-1" />
            為避免信箱被自動蒐集，本站不以明文顯示地址。
          </p>
        </div>
      </div>
    </section>
  );
}
