"use client";

import { createContext, useContext } from "react";

export type TransitionTarget = "past" | "future";

export type TransitionContextValue = {
  startTransition: (target: TransitionTarget) => void;
};

export const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("useTransitionNavigate must be used within TransitionProvider");
  }
  return ctx.startTransition;
}
