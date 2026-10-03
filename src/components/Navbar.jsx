import { useState } from 'react';
import { NAV_ITEMS, SITE } from '../data/site.js';
import VisitorCounter from './VisitorCounter.jsx';

/**
 * 導覽列：品牌、桌面選單、主題切換、手機選單、到訪人次
 */
export default function Navbar({ isLight, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-paper/85 dark:bg-ink/85 border-b border-paper-line dark:border-ink-line">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href="#top" className="font-serif font-bold text-lg tracking-wide">
            {SITE.name}
            <span className="text-gold">.</span>
          </a>
          <VisitorCounter />
        </div>

        {/* 桌面選單 */}
        <div className="hidden md:flex items-center gap-7 text-sm text-ink/70 dark:text-paper/70">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-gold transition-colors duration-200"
            >
              <i className={`${item.icon} mr-1.5`} />
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="切換深淺色主題"
            className="w-10 h-10 rounded-full grid place-items-center border border-paper-line dark:border-ink-line
                       hover:border-gold hover:text-gold transition-colors duration-200"
          >
            <i className={isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun'} />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="開啟選單"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            className="md:hidden w-10 h-10 rounded-full grid place-items-center border border-paper-line dark:border-ink-line
                       hover:border-gold hover:text-gold transition-colors duration-200"
          >
            <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} />
          </button>
        </div>
      </div>

      {/* 手機選單 */}
      <div
        id="mobileMenu"
        className={`md:hidden overflow-hidden bg-paper/95 dark:bg-ink/95 backdrop-blur
                    transition-[max-height] duration-300 ease-out
                    ${menuOpen ? 'max-h-96 border-t border-paper-line dark:border-ink-line' : 'max-h-0'}`}
      >
        <div className="px-5 py-3 flex flex-col gap-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 hover:text-gold transition-colors duration-200"
            >
              <i className={`${item.icon} mr-2 text-gold`} />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
