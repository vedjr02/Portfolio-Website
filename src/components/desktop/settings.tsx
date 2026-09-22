"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";
import { SETTINGS_KEY as KEY } from "@/components/desktop/themeBoot";

/**
 * What Control Center switches. Stored per visitor in localStorage, which is
 * only a convenience: every read and write is guarded and the page renders
 * the defaults when storage is unavailable.
 */

export type Appearance = "light" | "dark" | "auto";
export type WallpaperId = "golden-gate" | "kildare";

type Settings = {
  appearance: Appearance;
  wallpaper: WallpaperId;
  /** 0–60, percent of black laid over the wallpaper */
  dim: number;
  icons: boolean;
  focus: boolean;
};

const DEFAULTS: Settings = { appearance: "dark", wallpaper: "golden-gate", dim: 30, icons: true, focus: false };

type Ctx = Settings & {
  dark: boolean;
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
};

const SettingsContext = createContext<Ctx | null>(null);

function load(): Settings {
  try {
    return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

function subscribeDark(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}


export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);
  const systemDark = useSyncExternalStore(
    subscribeDark,
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false
  );

  // Pick up stored settings after hydration
  useEffect(() => {
    const stored = load();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of an external store after hydration
    setSettings(stored);
    setLoaded(true);
  }, []);

  const dark = settings.appearance === "dark" || (settings.appearance === "auto" && systemDark);

  useEffect(() => {
    if (loaded) document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark, loaded]);

  const set = useCallback<Ctx["set"]>((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ ...settings, dark, set }), [settings, dark, set]);

  return (
    <SettingsContext.Provider value={value}>
      <MotionConfig reducedMotion={settings.focus ? "always" : "user"}>{children}</MotionConfig>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
