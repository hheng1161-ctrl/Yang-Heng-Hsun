import { useState, useEffect, useCallback } from 'react';

/**
 * Toast 通知佇列
 * 用法：const { toasts, push, remove } = useToast();
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = 'info', duration = 3600) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      window.setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  return { toasts, push, remove };
}

/** 用於元件內的自動關閉（保留給需要自訂時序的場合） */
export function useAutoDismiss(callback, delay, deps = []) {
  useEffect(() => {
    if (!delay) return undefined;
    const timer = window.setTimeout(callback, delay);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
