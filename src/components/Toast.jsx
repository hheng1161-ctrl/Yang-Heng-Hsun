/**
 * 浮動通知（Toast）
 * 型別：success（金）／danger（紅）／info（藍）
 */
const STYLES = {
  success: { box: 'bg-gold text-ink shadow-gold/30', icon: 'fa-solid fa-circle-check' },
  danger: { box: 'bg-rose-600 text-white shadow-rose-500/20', icon: 'fa-solid fa-circle-exclamation' },
  info: { box: 'bg-slate-700 text-white shadow-slate-500/20', icon: 'fa-solid fa-circle-info' },
};

export default function Toast({ toasts, onRemove }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0 no-print">
      {toasts.map((toast) => {
        const style = STYLES[toast.type] || STYLES.info;
        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl
                        shadow-lg text-sm font-medium animate-fade-up ${style.box}`}
          >
            <div className="flex items-center gap-2.5">
              <i className={style.icon} />
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(toast.id)}
              aria-label="關閉通知"
              className="opacity-70 hover:opacity-100 text-xs px-1.5 py-0.5 rounded cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
