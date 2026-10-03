/** Tailwind CSS 設定｜沿用現有網站的設計 tokens（gold / ink / paper） */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:  { DEFAULT: '#c9a35e', light: '#e0c894', dark: '#a8843f' },
        ink:   { DEFAULT: '#141210', soft: '#1d1a17', card: '#232019', line: '#332e27' },
        paper: { DEFAULT: '#faf8f4', soft: '#f2eee7', line: '#e2dcd1' },
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'Georgia', 'serif'],
        sans:  ['"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '64rem', // 對應原網站的 max-w-5xl
      },
    },
  },
  plugins: [],
};
