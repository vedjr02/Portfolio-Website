"use client";

import { useEffect, useState } from "react";

/** True on a mouse or trackpad screen at least `minWidth` wide. */
export function useFinePointer(minWidth = 640) {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(hover: hover) and (pointer: fine) and (min-width: ${minWidth}px)`);
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [minWidth]);
  return fine;
}
