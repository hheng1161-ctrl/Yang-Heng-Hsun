/**
 * 網站設定｜改這裡就能調整全站行為，不用動元件程式碼
 */
export const SITE = {
  name: '楊恒煦',
  nameEn: 'Yang Heng-Hsun',
  title: '楊恒煦 Yang Heng-Hsun｜個人線上 CV',
  tagline: ['工程', '品質安全', '健康產業'],
  location: '台中 · 彰化地區',

  // Email 不以明文出現在 HTML（避免被爬蟲收集）
  emailUser: 'hheng1161',
  emailDomain: 'gmail.com',

  // 主題儲存的 localStorage key（與 index.html 的預先套用腳本共用）
  themeStorageKey: 'yhx-theme',
};

/**
 * Google Apps Script 後端網址
 * 同一個部署同時提供：表單送出（POST）與到訪人次（GET ?action=read|hit）
 */
export const CONTACT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyZnKxQt4n7MeNMXbnk3-nhYoZfLn8oB5iKgY8viQ1V8xHGI-Fl25gi3WEefebKs6Th/exec';

/** 到訪人次的初始底數（後端還沒回應前顯示用，與 GAS 的 SEED_COUNT 一致） */
export const VISIT_SEED = 1280;

export const NAV_ITEMS = [
  { href: '#about', label: '關於', icon: 'fa-solid fa-user' },
  { href: '#career', label: '學經歷', icon: 'fa-solid fa-timeline' },
  { href: '#projects', label: '工程實績', icon: 'fa-solid fa-helmet-safety' },
  { href: '#certs', label: '證照', icon: 'fa-solid fa-certificate' },
  { href: '#martial', label: '武術', icon: 'fa-solid fa-hand-fist' },
  { href: '#contact', label: '聯絡', icon: 'fa-solid fa-envelope' },
];

export const getEmail = () => `${SITE.emailUser}@${SITE.emailDomain}`;
