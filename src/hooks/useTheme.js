import { useState, useEffect, useCallback } from 'react';
import { SITE } from '../data/site.js';

/**
 * 深淺色主題
 * 與 index.html 裡的預先套用腳本共用同一個 localStorage key，
 * 所以重新整理不會閃白。
 */
export function useTheme() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !isLight);
    try {
      localStorage.setItem(SITE.themeStorageKey, isLight ? 'light' : 'dark');
    } catch {
      /* 隱私模式下 localStorage 可能不可用，忽略 */
    }
  }, [isLight]);

  const toggle = useCallback(() => setIsLight((v) => !v), []);

  return { isLight, toggle };
}
