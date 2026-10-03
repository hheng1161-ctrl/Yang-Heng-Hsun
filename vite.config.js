import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 相對路徑：讓 dist/ 可以直接丟到任何免費空間的子目錄底下
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    open: false,
    watch: {
      // 忽略編輯器／工具的原子寫入暫存目錄。
      // 沒有這條的話，某些工具（會先寫 .xxx.tmpdir/ 再改名）會讓 Vite 的
      // 檔案監看器撞上 EBUSY，整個 dev server 會直接當掉。
      ignored: [
        '**/.*.tmpdir/**',
        '**/*.tmpdir/**',
        '**/.git/**',
        '**/dist/**',
        '**/dist-single/**',
      ],
    },
  },
});
