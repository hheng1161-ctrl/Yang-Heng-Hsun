import { SITE } from '../data/site.js';
// ?inline → 保證被打包進 HTML（單一檔案版才不會漏圖）
import portraitUrl from '../assets/portrait.jpg?inline';

const STATS = [
  { value: 15, unit: '年', label: '產業實務經驗' },
  { value: 10, unit: '張', label: '專業證照' },
  { value: 4, unit: '項', label: '大型工程專案' },
  { value: 21, unit: '項', label: '武術賽事裁判聘任' },
];

export default function Hero() {
  return (
    <header id="top" className="max-w-5xl mx-auto px-5 py-6 md:py-8">
      <div className="glass rounded-[2rem] p-6 md:p-12">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold font-medium">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              個人線上 CV
            </span>

            <h1 className="font-serif font-black text-5xl md:text-6xl mt-5 leading-tight">
              {SITE.name}
              <span className="text-gold">.</span>
            </h1>

            <p className="font-serif text-lg md:text-xl text-gold mt-3 tracking-wide">
              {SITE.tagline.map((word, i) => (
                <span key={word}>
                  {i > 0 && <span className="text-ink/30 dark:text-paper/30"> · </span>}
                  {word}
                </span>
              ))}
            </p>

            <p className="mt-6 max-w-xl text-ink/75 dark:text-paper/75 leading-relaxed">
              從工地到生技廠，我做的始終是同一件事：
              <b className="text-ink dark:text-paper">把關品質</b>。<br />
              機械工程出身，走過國際工程專案與大型廠房監造，如今把同一套嚴謹，用在健康產業的產品與管理上。
            </p>

            <div className="mt-8 flex flex-wrap gap-3 no-print">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-ink font-medium
                           hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-gold/20"
              >
                <i className="fa-solid fa-paper-plane" />
                與我聯絡
              </a>
              <a
                href="#career"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-paper-line dark:border-ink-line
                           hover:border-gold hover:text-gold transition-colors duration-200"
              >
                <i className="fa-solid fa-arrow-down" />
                看學經歷
              </a>
            </div>
          </div>

          <div className="justify-self-center md:justify-self-end text-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-1 bg-gradient-to-br from-gold/60 to-transparent">
              <img
                src={portraitUrl}
                alt={SITE.name}
                width="600"
                height="720"
                decoding="async"
                className="w-full h-full object-cover rounded-full border-4 border-paper dark:border-ink"
              />
            </div>
            <p className="mt-4 text-sm tracking-widest text-ink/50 dark:text-paper/50 font-serif">
              {SITE.nameEn}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16 pt-10 border-t border-paper-line dark:border-ink-line">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt className="font-serif text-3xl font-bold text-gold">
                {s.value}
                <i className="text-sm font-sans font-normal ml-1 not-italic">{s.unit}</i>
              </dt>
              <dd className="text-xs text-ink/55 dark:text-paper/55 mt-1">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
