# 楊恒煦 個人線上 CV｜React 版

> 產出：2026-10-03　｜　技術棧：React 18 ＋ Vite 5 ＋ Tailwind CSS 3
> 前身：`demo/交付-Tailwind版-含表單/`（單檔 HTML ＋ CDN 版，仍保留可上線）

---

## 一、這個版本做了什麼

把原本的單檔 HTML 網站**重構成元件化的 React 應用**，外觀一比一保留，
並補上原本沒有的「後端資料」與「可維護性」。

| 面向 | 舊版（單檔 HTML） | 本版（React） |
|---|---|---|
| 程式組織 | 一個 789 行的 `index.html` | 13 個元件 ＋ 2 個自訂 Hook ＋ 資料層 |
| Tailwind | 預先編譯的 `assets/tailwind.css` | **建置時編譯**（只打包用到的 class） |
| 深色模式 | 原生 JS 切 class | `useTheme` Hook（載入前先套用，**不閃白**） |
| 技能條動畫 | 原生 `IntersectionObserver` | `SkillBar` 元件封裝 |
| 表單 | 開啟 Email 或送 Google 表單 | **React 受控表單 ＋ 真實回報結果** |
| 通知 | 無 | `Toast` 元件（成功／失敗／提示三型） |
| 到訪人次 | 無 | `VisitorCounter`（session 去重） |
| 部署 | 上傳資料夾 | `npm run build` → 上傳 `dist/` |

---

## 二、專案結構

```text
personalCV/
├── index.html                    # 進入點（含 Google Fonts、Font Awesome、主題預先套用）
├── package.json                  # 相依套件與指令
├── vite.config.js                # Vite 設定（base: './' 可放子目錄）
├── vite.config.single.js         # 單一檔案版設定（npm run build:single）
├── tailwind.config.js            # 設計 tokens：gold / ink / paper ＋ 字型
├── postcss.config.js
├── 啟動.bat                      # Windows 一鍵啟動（自動 npm install ＋ 開 dev server）
├── src/
│   ├── assets/                   # 大頭照 ＋ 3 張裁判聘書（用 import 載入，可被內嵌）
│   ├── main.jsx                  # React 進入點
│   ├── App.jsx                   # 組裝所有區塊
│   ├── index.css                 # Tailwind 指令 ＋ 共用小元件樣式
│   ├── styles/custom.css         # .glass / .section-title / .timeline / .skill-bar
│   ├── data/
│   │   └── site.js               # ⭐ 網站設定與後端網址（改這裡最快）
│   ├── api/
│   │   └── endpoint.js           # 後端讀取（洽詢筆數、端點資訊）
│   ├── hooks/
│   │   ├── useTheme.js           # 深淺色主題
│   │   └── useToast.js           # 通知佇列
│   └── components/
│       ├── ScrollProgress.jsx    # 頂部捲動進度條
│       ├── Navbar.jsx            # 導覽列（含手機選單、主題切換）
│       ├── VisitorCounter.jsx    # 到訪人次（session 去重）
│       ├── Hero.jsx              # 主視覺 ＋ 關鍵數據
│       ├── About.jsx             # 關於 ＋ 專業能力技能條
│       ├── ExperienceTimeline.jsx# 學經歷時間軸（左右交錯）
│       ├── Projects.jsx          # 工程實績
│       ├── Certificates.jsx      # 專業證照 ＋ 裁判聘書
│       ├── Martial.jsx           # 武術（協會職務、證照、成績）
│       ├── Contact.jsx           # 聯絡區塊
│       ├── ContactModal.jsx      # 聯絡表單彈窗
│       ├── Toast.jsx             # 浮動通知
│       └── Chrome.jsx            # 頁尾 ＋ 回頂端按鈕
```

---

## 三、怎麼跑起來

### 第一次（只需做一次）

```bash
npm install
```

### 開發模式（改程式碼會即時更新）

```bash
npm run dev
```

然後開 http://localhost:5173

### 產生可上線的檔案

```bash
npm run build
```

產出在 `dist/`，把**整個 `dist/` 資料夾**上傳即可。

### 產生單一檔案版（繳交用）

```bash
npm run build:single
```

產出 `dist-single/index.html`——**JS、CSS、四張圖片全部內嵌成一個檔案**（約 372 KB），
不需要任何資料夾，可以直接交件或單獨上傳。

> 外部依賴只剩 Font Awesome 與 Google Fonts 兩個 CDN（需要連網）。
> 若也要離線可用，把兩者改為自架字型檔即可，但目前沒有做。

### 本機預覽建置結果

```bash
npm run preview
```

> Windows 使用者可直接雙擊 `啟動.bat`，會自動安裝並開啟開發模式。

---

## 五、日常維護：以後要改網站怎麼做

### ⚠ 先搞懂「兩個資料夾」

這個專案在電腦上有兩份，**用途不同**：

| 位置 | 用途 | 有 `node_modules` |
|---|---|---|
| `C:\Users\USER\Desktop\cv-github\Yang-Heng-Hsun` | ⭐ **主要工作地點**（連著 GitHub，可 push） | ✅ 有 |
| `C:\Users\USER\Aisha-Agent\personalCV` | 備份／存檔用 | ✅ 有 |

**建議：以後都在桌面那份改**，這樣「改完 → 推上去」在同一個地方完成。

### 改網站的完整流程

```powershell
cd C:\Users\USER\Desktop\cv-github\Yang-Heng-Hsun

# 1. 先開本機預覽，邊改邊看
npm run dev          # 然後開 http://localhost:5173

# 2. 改檔案（內容在哪個檔案，見第六節的對照表）

# 3. 改完推上去
git add .
git commit -m "說明你改了什麼"
git push

# 4. 等約 1 分鐘 → 網站自動更新
```

改完後可以看這個網址確認部署狀態：

```
https://github.com/hheng1161-ctrl/Yang-Heng-Hsun/actions
```

### ⚠ 三個絕對不要做的事

| 不要 | 為什麼 |
|---|---|
| **不要把 `dist/` 推上去** | `.gitignore` 已經擋掉了。`dist/` 是由 GitHub Actions 在雲端自動產生，你推上去只會造成混亂 |
| **不要手動改 repo 根目錄的 `index.html`** | 那是 Vite 的**開發入口**（指向 `/src/main.jsx`），不是給 GitHub Pages 用的。真正上線的 `index.html` 是建置時產生的 |
| **不要把 Pages 的 Source 改回「Deploy from a branch」** | 那樣它會去讀原始碼而不是建置產物 → **網站會變成空白**（2026-10-04 實際發生過一次，已修正） |

### 部署原理（為什麼要這樣設定）

```
你 push 原始碼
    ↓
GitHub Actions 收到通知（.github/workflows/deploy.yml）
    ↓
在雲端執行 npm ci → npm run build
    ↓
產生 dist/（建置後的成品）
    ↓
把 dist/ 發佈到 GitHub Pages
    ↓
網站更新（約 1 分鐘）
```

**Pages 的 Source 必須是「GitHub Actions」**，因為我們推上去的是原始碼，
需要有人先把它編譯成瀏覽器看得懂的檔案。

---

## 六、交付方式：GitHub Pages（老師指定的方式）

### 一次性設定（約 3 分鐘）

1. **建 repo 並推上去**

   ```bash
   git init
   git add .
   git commit -m "個人 CV 網站（React 版）"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/<repo 名稱>.git
   git push -u origin main
   ```

2. **開啟 GitHub Pages**
   - 到 repo → **Settings** → 左側 **Pages**
   - **Source** 選「**GitHub Actions**」（⚠ 不要選 Deploy from a branch）

3. **完成**——之後每次 `git push` 到 `main`，會自動建置並部署（約 1 分鐘）

### 部署後的網址

```
https://<你的帳號>.github.io/<repo 名稱>/
```

**交作業就把這個網址給老師。**

> ✅ 本專案已附 `.github/workflows/deploy.yml`，推上去就會自動部署。
> ✅ `vite.config.js` 的 `base: './'` 用相對路徑，所以「專案型 Pages」
> （網址後面帶 repo 名稱）也能正常運作，**不需要改成 repo 名稱**。

### 部署前檢查

- [ ] repo 是 **Public**（私有 repo 的 Pages 需要付費方案；若必須私有，改用下方方式 2）
- [ ] `.gitignore` 有生效（`node_modules/`、`dist/` 不該進版控）
- [ ] 沒有把含個資的原始文件推上去

### 方式 2：手動上傳（不想用 Actions 的話）

```bash
npm run build
```

把 `dist/` 裡的檔案推到 `gh-pages` 分支，或在 Pages 設定裡選「Deploy from a branch」。
但**老師要求的是 GitHub Pages 網址**，用方式 1 最省事。

### 方式 3：單一檔案備援

若老師另外接受單一檔案，或你想留一份可離線打開的版本：

```bash
npm run build:single
```

產出 `dist-single/index.html`——**JS、CSS、四張圖片全部內嵌**（約 372 KB），
雙擊即可開啟，不需要伺服器。

> ⚠ 外部依賴只剩 Font Awesome 與 Google Fonts 兩個 CDN（需要連網）。

---

## 五、改內容要改哪裡

| 想改什麼 | 改哪個檔案 |
|---|---|
| 姓名、標題、副標、地區 | `src/data/site.js` |
| 導覽列項目 | `src/data/site.js` 的 `NAV_ITEMS` |
| 後端網址（Google Apps Script） | `src/data/site.js` 的 `CONTACT_ENDPOINT` |
| Hero 的四個關鍵數字 | `src/components/Hero.jsx` 的 `STATS` |
| 關於我的段落、技能條 | `src/components/About.jsx` |
| 學經歷時間軸 | `src/components/ExperienceTimeline.jsx` 的 `ITEMS` |
| 工程實績 | `src/components/Projects.jsx` 的 `PROJECTS` |
| 證照清單 | `src/components/Certificates.jsx` 的 `LICENSES` |
| 武術資料 | `src/components/Martial.jsx` |
| 配色、字型 | `tailwind.config.js` |
| 毛玻璃、金線等裝飾 | `src/styles/custom.css` |

**多數內容都抽成檔案上方或 `data/` 的常數陣列**，改資料不用動 JSX 結構。

---

## 六、後端（Google Apps Script）

表單與到訪人次共用**同一個部署網址**：

| 端點 | 用途 |
|---|---|
| `POST` 本體帶表單欄位 | 寫入試算表 `Inquiries` 分頁 |
| `GET ?action=read` | 讀目前累計人次 |
| `GET ?action=hit` | 人次 +1 |
| `GET ?action=info` | 讀端點狀態與洽詢筆數（前端用來驗證送出是否成功） |

後端程式碼：`demo/交付-Tailwind版-含表單/Google試算表後端-老師格式版.gs`

### ⚠ 一個誠實的限制

Google Apps Script 送出後的轉址不帶 CORS 標頭，**瀏覽器讀不到 POST 的回應**。
本版因此不假裝成功：

1. 先嘗試讀回應 → 讀得到就確定成功
2. 讀不到 → **比對送出前後的洽詢筆數**（這一招能繞過限制，因為是比對自己兩次讀到的數字）
3. 兩者都失敗 → 誠實顯示「未經自動確認」，並提供複製 Email 的備援

---

## 七、驗收檢查清單

- [ ] 開啟後版面正常（金色主色、襯線標題）
- [ ] 右上角可切換深淺色，**重新整理不閃白**
- [ ] 導覽列可平滑捲動到各區塊
- [ ] 卡片滑過會浮起、邊框變金色
- [ ] 捲到「專業能力」時六條技能條依序填滿
- [ ] 導覽列顯示到訪人次（`👁 1,28x`）
- [ ] 重新整理後人次**不變**；關掉分頁再開才 +1
- [ ] 「06 聯絡」可複製 Email（會跳 Toast 通知）
- [ ] 聯絡表單：必填驗證、ESC 關閉、背景鎖定、送出後有結果畫面
- [ ] 手機版：選單收合、時間軸變單欄、卡片變一欄
- [ ] F12 → Console 無紅色錯誤

---

## 八、技術實作摘要

- **元件化**：13 個元件，每個區塊獨立；資料以常數陣列抽離
- **自訂 Hook**：`useTheme`（主題 ＋ localStorage）、`useToast`（通知佇列 ＋ 自動移除）
- **無閃白主題**：`index.html` 內 `head` 先讀 localStorage 套用 `dark` class，React 接手後同步
- **響應式**：手機（單欄）／平板（2 欄）／桌機（3 欄、時間軸左右交錯）
- **無障礙**：按鈕皆有 `aria-label`、彈窗有 `role="dialog"` ＋ `aria-modal`、通知有 `aria-live`
- **減少動態**：`prefers-reduced-motion` 時關閉動畫
- **列印樣式**：`@media print` 隱藏導覽列與按鈕、去毛玻璃、白底黑字
- **建置體積**：CSS 25 KB（gzip 5.4 KB）、JS 177 KB（gzip 58 KB）

---

## 九、與舊版的關係

- 舊版（`demo/交付-Tailwind版-含表單/`）**完全保留、未被修改**，仍可直接上線
- 本版是獨立專案，兩者不互相依賴
- 舊版的三個 CDN（Tailwind Play CDN、Font Awesome、Google Fonts）中，
  **Tailwind 改為建置時編譯**（不再需要 `cdn.tailwindcss.com`，Console 不會再出現
  「should not be used in production」提醒）；Font Awesome 與 Google Fonts 仍為 CDN。
