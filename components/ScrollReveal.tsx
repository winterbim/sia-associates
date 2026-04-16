"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Animation = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

function getStyles(animation: Animation, revealed: boolean): CSSProperties {
  const base: CSSProperties = {
    transition: "all cubic-bezier(0.22, 1, 0.36, 1)",
  };

  if (animation === "fade-up") {
    return {
      ...base,
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : "translateY(32px)",
    };
  }
  if (animation === "fade-left") {
    return {
      ...base,
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateX(0)" : "translateX(-32px)",
    };
  }
  if (animation === "fade-right") {
    return {
      ...base,
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateX(0)" : "translateX(32px)",
    };
  }
  if (animation === "scale") {
    return {
      ...base,
      opacity: revealed ? 1 : 0,
      transform: revealed ? "scale(1)" : "scale(0.92)",
    };
  }
  // blur
  return {
    ...base,
    opacity: revealed ? 1 : 0,
    filter: revealed ? "blur(0)" : "blur(6px)",
  };
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const styles = getStyles(animation, revealed);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        ...styles,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
