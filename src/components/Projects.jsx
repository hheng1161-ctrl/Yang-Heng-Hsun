const PROJECTS = [
  { icon: 'fa-solid fa-industry', title: '中龍鋼鐵二階建廠', desc: '中鋼建廠 V23 借調機械工程師，廠房設備安裝工程監工、監督統包商與下包商、竣工報告書整理。' },
  { icon: 'fa-solid fa-atom', title: '核四龍門工程', desc: '協助廠商現場測繪及文書事項。' },
  { icon: 'fa-solid fa-train-subway', title: '沙烏地阿拉伯利雅德捷運機廠', desc: '空調分析與圖面繪製。' },
  { icon: 'fa-brands fa-google', title: 'Google 彰濱廠', desc: 'HVAC 與消防監造。' },
  { icon: 'fa-solid fa-file-signature', title: '亞通能源設備審標', desc: '轉動機械與套裝設備規範審標、請購書與審標書、廠商技術文件審查。' },
  { icon: 'fa-solid fa-gears', title: '210A 抽水泵設計', desc: '系統分解圖、BOM 表與設計動作說明；渦輪交錯齒設計產生渦漩。' },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">03 — Projects</p>
        <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3 mb-3">工程實績</h2>
        <p className="text-ink/60 dark:text-paper/60 mb-10">
          在泰興工程顧問（美商貝泰 Bechtel 台灣合資子公司）期間參與的國內外專案。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <article key={p.title} className="info-card">
              <i className={`${p.icon} text-2xl text-gold`} />
              <h3 className="font-bold text-lg mt-4">{p.title}</h3>
              <p className="text-sm text-ink/70 dark:text-paper/70 mt-2 leading-relaxed">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
