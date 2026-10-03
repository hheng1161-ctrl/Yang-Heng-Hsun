import { useEffect, useState } from 'react';
import { SITE } from '../data/site.js';

/** 頁尾 */
export function Footer() {
  return (
    <footer className="border-t border-paper-line dark:border-ink-line">
      <div className="max-w-5xl mx-auto px-5 py-10 text-center space-y-2">
        <p className="font-serif tracking-wide">
          {SITE.name} {SITE.nameEn} ｜ 個人線上 CV
        </p>
        <p className="text-xs text-ink/50 dark:text-paper/50">
          本站資料依個人學經歷文件與聘書正本建置，內容以本人提供之確認版本為準。
        </p>
        <p className="text-xs text-ink/50 dark:text-paper/50">
          本頁為課程作業展示用，內容僅供教學參考，請勿轉用、再散布或作為其他用途。
        </p>
        <p className="text-[11px] text-ink/35 dark:text-paper/35 pt-3 no-print">
          Built with React · Vite · Tailwind CSS · Font Awesome · Google Fonts
        </p>
      </div>
    </footer>
  );
}

/** 回到頂端按鈕（捲過一定距離才出現） */
export function ToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="toTop"
      type="button"
      aria-label="回到頂端"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 w-11 h-11 rounded-full bg-gold text-ink shadow-lg
                  grid place-items-center transition-opacity duration-300 hover:bg-gold-light no-print
                  ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}
