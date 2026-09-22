"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";

type Note = { id: number; title: string; body?: string };

type ToastContextValue = {
  toast: (title: string, body?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

/** Feedback arrives as a macOS notification banner, top right. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [note, setNote] = useState<Note | null>(null);
  const seq = useRef(0);

  const toast = useCallback((title: string, body?: string) => {
    const id = ++seq.current;
    setNote({ id, title, body });
    window.setTimeout(() => {
      setNote((current) => (current?.id === id ? null : current));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed top-[calc(env(safe-area-inset-top)+2.75rem)] right-3 left-3 z-[90] flex justify-end sm:left-auto"
      >
        <AnimatePresence>
          {note && (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="vibrant flex w-full items-start gap-3 rounded-[16px] p-3 shadow-menu sm:w-[22rem]"
            >
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-ink text-[11px] font-bold text-window"
              >
                VA
              </span>
              <span className="min-w-0 text-[13px] leading-snug">
                <span className="block font-semibold">{note.title}</span>
                {note.body && <span className="block truncate text-ink-2">{note.body}</span>}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
