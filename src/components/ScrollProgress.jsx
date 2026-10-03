import { useEffect, useRef } from 'react';

/**
 * 捲動進度條（頁面最上方那條金色細線）
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      id="progress"
      ref={barRef}
      className="fixed top-0 left-0 z-[60] h-0.5 w-0 bg-gold"
    />
  );
}
