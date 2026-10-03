import { useEffect, useRef } from 'react';

const SKILLS = [
  { name: '工程專案管理', note: '監造 · 審標 · 協調', width: 92 },
  { name: '品質與職業安全衛生', note: '甲種業務主管 · PCC QCE', width: 88 },
  { name: '機械製圖與設計', note: 'AutoCAD · Inventor · SolidWorks', width: 90 },
  { name: '設備規範與技術審查', note: '轉動機械 · 套裝設備', width: 85 },
  { name: '通路與業務管理', note: '銷售企畫 · 團隊督導', width: 82 },
  { name: '健康產業經營管理', note: '碩士專班 · 2026 畢業', width: 80 },
];

/** 技能條：捲到畫面才填滿 */
function SkillBar({ width }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const fill = entry.target.querySelector('i');
          if (fill) {
            fill.style.transition = 'width 1.1s cubic-bezier(.2,.8,.2,1)';
            fill.style.width = entry.target.dataset.w + '%';
          }
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={barRef}
      data-w={width}
      className="skill-bar h-1.5 bg-paper-line dark:bg-ink-line rounded-full overflow-hidden"
    >
      <i style={{ width: 0 }} />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-5 py-3 md:py-4">
      <div className="glass rounded-[2rem] p-6 md:p-10">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-medium">01 — About</p>
        <h2 className="section-title font-serif text-3xl md:text-4xl font-bold mt-3 mb-10">
          二十年的專業養成，同一條線
        </h2>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="space-y-5 text-ink/80 dark:text-paper/80 leading-loose">
            <p>
              我的職涯起點是<b className="text-ink dark:text-paper">機械製圖與自動化</b>。東南技術學院自動化工程系畢業後，進入東南科技大學機電整合研究所，碩士期間投入 DAQ 訊號擷取與 LabVIEW 虛擬量測系統，建立自動化量測的實作經驗——那是我第一次理解「數據要可信，量測必須先可靠」。
            </p>
            <p>
              2011 年進入產業後，我在<b className="text-ink dark:text-paper">亞通能源</b>負責轉動機械與套裝設備的規範審標、請購書與技術文件審查。接著在<b className="text-ink dark:text-paper">泰興工程顧問</b>（美商貝泰 Bechtel 台灣合資子公司）擔任專案機械工程師，參與中龍鋼鐵二階建廠、核四龍門工程、沙烏地阿拉伯利雅德捷運機廠設計，以及 Google 彰濱廠的 HVAC 與消防監造。
            </p>
            <blockquote className="border-l-2 border-gold pl-5 py-1 font-serif text-lg text-gold">
              工程教我的第一課是
              <br />
              品質不是驗出來的，是從源頭設計出來的。
            </blockquote>
            <p>
              2017 年起轉入<b className="text-ink dark:text-paper">益福和生醫科技</b>擔任經理，負責商品銷售與服務督導、宣傳活動規劃與銷售企畫。產業從重工業換到保養品與精油，但核心沒有變——原料到消費者手上的每一個環節都要嚴格把關。
            </p>
            <p>
              為補上管理與法規知識體系，我進入<b className="text-ink dark:text-paper">中山醫學大學國際健康產業經營管理碩士在職專班</b>（乙組職業安全衛生），已於 2026 年 8 月畢業。
            </p>
            <p>
              工作之外，我練拳超過二十年，入門師承陳添白老師與陳寶玉老師，專攻<b className="text-ink dark:text-paper">八極拳</b>，也擔任多項武術協會職務與賽事裁判。武術給我的不只是體能，而是紀律、耐性，以及面對壓力時保持穩定的能力。
            </p>
          </div>

          <div className="bg-paper-soft dark:bg-ink-soft rounded-2xl p-7 border border-paper-line dark:border-ink-line h-fit">
            <h3 className="font-serif text-lg font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-chart-simple text-gold" />
              專業能力
            </h3>
            <div className="space-y-5">
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <b>{skill.name}</b>
                    <span className="text-ink/50 dark:text-paper/50 text-xs">{skill.note}</span>
                  </div>
                  <SkillBar width={skill.width} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
