"use client";

import { useSyncExternalStore } from "react";
import type { DownloadOption } from "@/lib/data/types";

function detectOS(): DownloadOption["os"] | null {
  const platform = `${navigator.userAgent} ${navigator.platform ?? ""}`.toLowerCase();
  if (platform.includes("mac")) return "macOS";
  if (platform.includes("linux") && !platform.includes("android")) return "Linux";
  if (platform.includes("win")) return "Windows";
  return null;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

export function useDetectedOS() {
  return useSyncExternalStore(subscribe, detectOS, getServerSnapshot);
}
