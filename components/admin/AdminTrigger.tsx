"use client";

// Hidden admin gate — the SIA logo in the header (any element marked
// data-admin-trigger="logo") opens the login modal after 5 clicks
// within 2 seconds. The component renders nothing visible; it just
// installs a delegated click listener on document and manages the
// counter + modal state.

import { useEffect, useState } from "react";
import { LoginModal } from "./LoginModal";

const REQUIRED_CLICKS = 5;
const WINDOW_MS = 2000;

export function AdminTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const taps: number[] = [];

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest("[data-admin-trigger]");
      if (!trigger) return;

      const now = Date.now();
      taps.push(now);
      // Drop everything older than the rolling window so the count
      // reflects only recent clicks.
      while (taps.length > 0 && now - taps[0]! > WINDOW_MS) {
        taps.shift();
      }
      if (taps.length >= REQUIRED_CLICKS) {
        taps.length = 0;
        setOpen(true);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!open) return null;
  return <LoginModal onClose={() => setOpen(false)} />;
}
