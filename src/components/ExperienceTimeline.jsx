/**
 * 學經歷時間軸
 * 桌面版左右交錯（第 1、3、5 項靠左，第 2、4、6 項靠右），
 * 手機版全部靠左並以金線串起。
 */
const ITEMS = [
  {
    side: 'left',
    period: '2024.09 – 2026.08',
    title: '國際健康產業經營管理碩士在職專班（乙組職業安全衛生）',
    org: '中山醫學大學',
    badge: '碩士（已畢業）',
    points: ['論文方向：國際健康產業經營管理與職業安全衛生', '補強管理與法規知識體系，銜接生技產業實務'],
  },
  {
    side: 'right',
    period: '2017.07 – 至今',
    title: '經理',
    org: '益福和生醫科技股份有限公司',
    badge: '現職',
    points: [
      <>指導、協調各項商品的<b>銷售與服務活動</b></>,
      '與部門領導階層商議，規劃服務宣傳活動',
      <>重新審查銷售紀錄與報告，據以提出<b>銷售企畫</b></>,
      '產業領域：保養品、精油與健康產業',
    ],
  },
  {
    side: 'left',
    period: '2012.07 – 2017.06',
    title: '專案機械工程師',
    org: '泰興工程顧問股份有限公司（美商貝泰 Bechtel 台灣合資子公司）· 5 年',
    points: [
      <><b>中龍鋼鐵二階建廠</b>：中鋼建廠 V23 借調機械工程師，負責廠房設備安裝工程監工、監督統包商與下包商、整理竣工報告書</>,
      <><b>核四龍門工程</b>：協助廠商現場測繪及文書事項</>,
      <><b>沙烏地阿拉伯利雅德捷運機廠</b>：空調分析與圖面繪製</>,
      <><b>Google 彰濱廠</b>：HVAC 與消防監造</>,
    ],
  },
  {
    side: 'right',
    period: '2011.10 – 2012.06',
    title: '機械工程師',
    org: '亞通能源 · 8 個月',
    points: [
      '工程設備規格審標：轉動機械及各種套裝設備規範、請購書、審標書準備',
      '廠商技術文件審查、聯絡廠商與設備工程監工',
      '協調業主與下包商',
    ],
  },
  {
    side: 'left',
    period: '2006.09 – 2008.07',
    title: '機電整合研究所（碩士）',
    org: '私立東南科技大學',
    points: ['實驗及實驗設備規劃、設備採買', 'DAQ 卡訊號檢測與訊號擷取', '以 LabVIEW 建立虛擬量測系統與自動化量測系統'],
  },
  {
    side: 'right',
    period: '2004.09 – 2006.07',
    title: '自動化工程系',
    org: '私立東南技術學院',
    points: ['以 Inventor 進行自動化機台設計', '立體圖繪製、零件組裝與電腦機構模擬'],
  },
];

function TimelineCard({ item }) {
  const alignClass =
    item.side === 'left'
      ? 'lg:mr-14'
      : 'lg:ml-14';

  return (
    <div className={`timeline-card ${alignClass}`}>
      <p className="font-serif text-gold font-bold text-lg">{item.period}</p>
      <h3 className="text-xl font-bold mt-1">{item.title}</h3>
      <p className="text-sm text-ink/60 dark:text-paper/60 mt-0.5">
        {item.org}
        {item.badge && (
          <>
            {' · '}
            <span className="text-gold">{item.badge}</span>
          </>
        )}
      </p>
      {item.points && (
        <ul className="mt-3 space-y-1 text-sm text-ink/75 dark:text-paper/75 list-disc list-inside">
          {item.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="career" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">02 — Career</p>
        <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3 mb-12">
          學經歷時間軸
        </h2>

        <ol className="timeline relative space-y-6 lg:space-y-10">
          {ITEMS.map((item, idx) => (
            <li key={idx} className="relative lg:grid lg:grid-cols-2 lg:gap-0">
              <span
                className="absolute left-4 lg:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gold
                           ring-4 ring-paper dark:ring-ink z-10"
                aria-hidden="true"
              />

              {item.side === 'left' ? (
                <>
                  <TimelineCard item={item} />
                  <div className="hidden lg:block" aria-hidden="true" />
                </>
              ) : (
                <>
                  <div className="hidden lg:block" aria-hidden="true" />
                  <TimelineCard item={item} />
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
