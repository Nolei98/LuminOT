"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "luminot-muted";
const listeners = new Set<() => void>();

function getSnapshot() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === null ? false : stored === "1";
}

function getServerSnapshot() {
  return true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setMuted(value: boolean) {
  window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  listeners.forEach((listener) => listener());
}

export function useMuted() {
  const muted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggleMuted = useCallback(() => setMuted(!getSnapshot()), []);
  return { muted, toggleMuted };
}
