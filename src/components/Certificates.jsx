// ?inline → 保證被打包進 HTML（單一檔案版才不會漏圖）
import certGangdu from '../assets/certificates/cert-2026-gangdu-cup-chief-judge.jpg?inline';
import certTaipei from '../assets/certificates/cert-2025-taipei-edu-cup-senior.jpg?inline';
import certYunlin from '../assets/certificates/cert-2026-yunlin-spring-cup.jpg?inline';

const LICENSES = [
  { icon: 'fa-solid fa-helmet-safety', name: '甲種職業安全衛生業務主管', group: '職業安全衛生' },
  { icon: 'fa-solid fa-helmet-safety', name: '營造業甲種職業安全衛生業務主管', group: '職業安全衛生' },
  { icon: 'fa-solid fa-compass-drafting', name: '乙級電腦輔助機械製圖技術士', group: '機械製圖設計' },
  { icon: 'fa-solid fa-compass-drafting', name: '乙級電腦輔助設計製圖技術士', group: '機械製圖設計' },
  { icon: 'fa-solid fa-compass-drafting', name: '丙級電腦輔助立體製圖', group: '機械製圖設計' },
  { icon: 'fa-solid fa-compass-drafting', name: '初級機械設計工程師', group: '機械製圖設計' },
  { icon: 'fa-solid fa-clipboard-check', name: '公共工程品質管理人員（PCC QCE）', group: '品管安規與作業主管' },
  { icon: 'fa-solid fa-clipboard-check', name: '特定化學物質作業主管', group: '品管安規與作業主管' },
  { icon: 'fa-solid fa-clipboard-check', name: '施工架組配作業主管', group: '品管安規與作業主管' },
  { icon: 'fa-solid fa-clipboard-check', name: '臺灣學術倫理教育資源中心證書（6 小時）', group: '品管安規與作業主管' },
];

const JUDGE_CERTS = [
  { src: certGangdu, alt: '第 22 屆全國港都盃裁判聘書', title: '第 22 屆全國港都盃', note: '115 年 · 南北派套路主任裁判', w: 400, h: 473 },
  { src: certTaipei, alt: '台北市教育盃裁判聘書', title: '台北市教育盃中等學校', note: '114 學年度 · 裁判員', w: 400, h: 491 },
  { src: certYunlin, alt: '雲林縣春季縣長盃裁判聘書', title: '雲林縣春季縣長盃', note: '115 年 · 裁判', w: 400, h: 454 },
];

export default function Certificates() {
  return (
    <section id="certs" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">04 — Licenses</p>
        <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3 mb-10">
          專業證照 <span className="text-gold text-2xl">10 張</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LICENSES.map((lic) => (
            <div key={lic.name} className="info-card">
              <i className={`${lic.icon} text-gold text-lg`} />
              <div className="mt-3 font-bold text-sm leading-relaxed">{lic.name}</div>
              <div className="mt-1.5 text-xs text-ink/50 dark:text-paper/50">{lic.group}</div>
            </div>
          ))}
        </div>

        <h3 className="font-serif text-xl font-bold mt-14 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-stamp text-gold" />
          裁判聘書（精選 3 份）
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {JUDGE_CERTS.map((cert) => (
            <figure
              key={cert.src}
              className="group border border-paper-line dark:border-ink-line rounded-xl overflow-hidden
                         hover:border-gold transition-colors duration-200"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                width={cert.w}
                height={cert.h}
                loading="lazy"
                decoding="async"
                className="w-full group-hover:scale-105 transition-transform duration-300"
              />
              <figcaption className="p-3 text-xs">
                <b className="block">{cert.title}</b>
                <span className="text-ink/55 dark:text-paper/55">{cert.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-xs text-ink/50 dark:text-paper/50 mt-4">
          <i className="fa-solid fa-circle-info mr-1" />
          為保護個人資料，正本已縮圖並加註浮水印，公文文號不公開。
        </p>
      </div>
    </section>
  );
}
