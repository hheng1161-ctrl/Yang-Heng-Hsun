/**
 * 個人作品
 *
 * 與「03 工程實績」的差別：
 *   工程實績 = 在泰興工程顧問期間參與的公司專案
 *   個人作品 = 從需求、規格、實作到驗收都由本人完成的獨立作品
 */

const WORKS = [
  {
    icon: 'fa-solid fa-helmet-safety',
    name: '工地危害巡檢記錄系統',
    tagline: 'HazardCheck｜解決工地紙本巡檢難以追蹤的問題',
    problem:
      '工地安衛巡檢長期以紙本進行：現場填完要回辦公室才能整理，缺失改善難以追蹤，跨工地無法彙整統計。',
    solution:
      '安衛人員在現場用手機直接記錄缺失，送出即寫入 Google Sheets，並即時顯示總記錄數、待改善件數與高嚴重度未改善件數。',
    highlights: [
      '7 個欄位、12 種檢查項目',
      '前端與後端雙層驗證，失敗不清空已填內容',
      '後端 45 項邏輯測試、A1～A10 驗收全數通過',
    ],
    tags: ['原生 HTML/CSS/JS', 'Google Apps Script', 'Google Sheets', 'GitHub Pages'],
    demo: 'https://hheng1161-ctrl.github.io/hazard-check/',
    code: 'https://github.com/hheng1161-ctrl/hazard-check',
  },
  {
    icon: 'fa-solid fa-id-card',
    name: '個人線上 CV（本網站）',
    tagline: '以真實學經歷建置的一頁式履歷',
    problem:
      '求職需要一個能讓訪客在 30 秒內看懂專業定位、且日後能自己維護的線上履歷。',
    solution:
      '資料驅動架構：內容集中在單一設定檔，改文案不必動版面；深淺色主題記憶使用者選擇，聯絡表單與到訪人次以 Google Apps Script 實作後端。',
    highlights: [
      '13 個元件、2 個自訂 Hook，GitHub Actions 自動部署',
      '無障礙標記、減少動態支援、列印樣式',
      '公開版個資最小揭露（不列手機地址、Email 防爬、聘書精選加浮水印）',
    ],
    tags: ['React 18', 'Vite 5', 'Tailwind CSS 3', 'GitHub Actions'],
    demo: '#top',
    code: 'https://github.com/hheng1161-ctrl/Yang-Heng-Hsun',
  },
];

export default function Works() {
  return (
    <section id="works" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">
          04 — Works
        </p>
        <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3 mb-3">
          個人作品
        </h2>
        <p className="text-ink/60 dark:text-paper/60 mb-10">
          以下兩件作品皆由本人從需求、規格、實作到驗收獨立完成，附可實際操作的線上網址與原始碼。
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {WORKS.map((work) => (
            <article key={work.name} className="info-card flex flex-col">
              <i className={`${work.icon} text-2xl text-gold`} />
              <h3 className="font-bold text-lg mt-4 leading-snug">{work.name}</h3>
              <p className="text-sm text-ink/55 dark:text-paper/55 mt-1">{work.tagline}</p>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] tracking-widest uppercase text-gold font-semibold">
                    解決的問題
                  </dt>
                  <dd className="text-ink/75 dark:text-paper/75 leading-relaxed mt-1">
                    {work.problem}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-widest uppercase text-gold font-semibold">
                    作法
                  </dt>
                  <dd className="text-ink/75 dark:text-paper/75 leading-relaxed mt-1">
                    {work.solution}
                  </dd>
                </div>
              </dl>

              <ul className="mt-4 space-y-1.5 text-xs text-ink/65 dark:text-paper/65">
                {work.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <i className="fa-solid fa-check text-gold mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-paper-line dark:border-ink-line
                               text-ink/60 dark:text-paper/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5 flex flex-wrap gap-2 no-print">
                <a
                  href={work.demo}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-ink
                             text-sm font-medium hover:bg-gold-light transition-colors duration-200"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                  瀏覽作品
                </a>
                <a
                  href={work.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-paper-line dark:border-ink-line
                             text-sm hover:border-gold hover:text-gold transition-colors duration-200"
                >
                  <i className="fa-brands fa-github" aria-hidden="true" />
                  原始碼
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="text-xs text-ink/50 dark:text-paper/50 mt-6">
          <i className="fa-solid fa-circle-info mr-1.5" aria-hidden="true" />
          兩件作品皆為課程作業，已完整實作並上線；規格文件、API 契約與驗收紀錄見各專案的 repository。
        </p>
      </div>
    </section>
  );
}
