"use client";

import { useEffect } from "react";

let _audio: HTMLAudioElement | null = null;
let _started = false;

export function stopAmbientMusic() {
  if (!_audio) return;
  _audio.pause();
  _started = false;
}

export function useAmbientMusic(src: string, muted: boolean) {
  // Sync muted state whenever it changes (works even before first interaction)
  useEffect(() => {
    if (_audio) _audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    // Singleton — create only once per app lifetime
    if (!_audio) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.35;
      audio.preload = "none"; // don't fetch until play() is called
      _audio = audio;
    }

    // Sync muted immediately after creation
    _audio.muted = muted;

    if (_started) return; // already playing from a previous mount

    const tryPlay = () => {
      if (!_audio || _started) return;
      _audio.play().then(() => {
        _started = true;
      }).catch(() => {
        // autoplay blocked — will retry on next interaction
      });
    };

    // Try immediately (works if user already interacted before, e.g. navigating back)
    tryPlay();

    // Fallback: wait for first interaction on this page
    const onInteraction = () => {
      tryPlay();
    };
    window.addEventListener("pointerdown", onInteraction, { once: true });
    window.addEventListener("keydown", onInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      // Never destroy _audio — it must persist across route changes
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
}
