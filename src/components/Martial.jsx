const ASSOCIATIONS = [
  '上海民間武術 副會長',
  '中華五祖明熙武術協會 秘書長',
  '台北市體育總會國術協會 理事',
  '台中市體育總會國術委員會 委員',
  '台北市國術會 理事',
  '中華民國國武術競技總會 理事',
  '冠登領強身訓練中心 召集人',
];

const CERT_BADGES = [
  { text: '武術五段（中華五祖明熙武術協會）', highlight: true },
  { text: '武術五段（台灣武術協會）', highlight: true },
  { text: '國際教練 A 級', highlight: true },
  { text: '國際裁判 A 級', highlight: true },
  { text: '國武術國家 B 級教練', highlight: false },
  { text: '國武術國家 B 級裁判', highlight: false },
  { text: '國術乙級教練／裁判', highlight: false },
  { text: '國術丙級教練／裁判', highlight: false },
  { text: '國術 C 級教練／裁判', highlight: false },
  { text: '太極拳丙級教練／裁判', highlight: false },
];

export default function Martial() {
  return (
    <section id="martial" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">05 — Martial Arts</p>
        <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3 mb-10">
          武術 <span className="text-gold text-2xl">八極拳</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-bold text-gold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-user-tie" />
              現任協會職務（7 項）
            </h3>
            <ul className="space-y-2 text-sm text-ink/80 dark:text-paper/80">
              {ASSOCIATIONS.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-angle-right text-gold mr-2" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-gold mt-8 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-hand-fist" />
              入門師承
            </h3>
            <p className="text-sm text-ink/80 dark:text-paper/80 leading-relaxed">
              陳添白老師（高中拜入門下，習中央國術館八極拳系）、陳寶玉老師（深圳，已列名於陳寶玉老師傳承譜）。
            </p>

            <h3 className="font-bold text-gold mt-8 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-list-check" />
              專攻拳術
            </h3>
            <p className="text-sm text-ink/80 dark:text-paper/80 leading-relaxed">
              八極拳為主：大八極、小八極、八極連環、八極鞭桿、五祖拳、晉卿八極拳、連步拳、少林一路、六合虎風刀、洪拳、楊氏太極拳、陳氏太極拳。
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-medal" />
              武術證照 13 張
            </h3>
            <div className="flex flex-wrap gap-2">
              {CERT_BADGES.map((badge) => (
                <span
                  key={badge.text}
                  className={
                    badge.highlight
                      ? 'px-3 py-1.5 rounded-full text-xs bg-gold/15 text-gold border border-gold/30'
                      : 'px-3 py-1.5 rounded-full text-xs border border-paper-line dark:border-ink-line'
                  }
                >
                  {badge.text}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-paper-soft dark:bg-ink-soft border border-paper-line dark:border-ink-line rounded-xl p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold">26</p>
                <p className="text-xs text-ink/60 dark:text-paper/60 mt-1">
                  競賽成績記錄
                  <br />
                  <span className="text-[10px]">2016–2023</span>
                </p>
              </div>
              <div className="bg-paper-soft dark:bg-ink-soft border border-paper-line dark:border-ink-line rounded-xl p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold">21</p>
                <p className="text-xs text-ink/60 dark:text-paper/60 mt-1">
                  裁判聘任項數
                  <br />
                  <span className="text-[10px]">2018–2026</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-ink/70 dark:text-paper/70 mt-6 leading-relaxed">
              多次於台灣世界盃、中正盃國際、孫逸仙盃全球、廈門國際、貴州武林菁英賽等賽事獲獎，多為八極拳第一名；
              2023 年受邀至北京市武術協會交流。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
