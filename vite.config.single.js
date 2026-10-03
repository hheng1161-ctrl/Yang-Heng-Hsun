/**
 * 單一檔案版建置設定
 *
 * 用途：把 JS、CSS 全部內嵌成一份 HTML，方便「只收單一檔案」的繳交方式。
 * 用法：npm run build:single
 * 產出：dist-single/index.html（可直接用瀏覽器開啟，不需伺服器）
 *
 * 注意：Google Fonts 與 Font Awesome 仍是外部 CDN，需要連網。
 *       圖片（public/assets）會自動被 inline 成 data URI。
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    outDir: 'dist-single',
    assetsDir: 'assets',
    // 單檔版不需要拆檔，關閉 CSS 分離
    cssCodeSplit: false,
    // 圖片內嵌：避免單檔版還要帶 assets 資料夾
    assetsInlineLimit: 1024 * 1024 * 4,
  },
});
