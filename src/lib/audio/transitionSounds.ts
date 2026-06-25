"use client";

let ctx: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// Chiado de fita + nota MIDI sustentada, para a transição "rumo ao passado".
export function playPastSound() {
  const audioCtx = getContext();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 1.4, audioCtx.sampleRate);
  const channel = noiseBuffer.getChannelData(0);
  for (let i = 0; i < channel.length; i++) channel[i] = Math.random() * 2 - 1;

  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 4000;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.05, now + 0.1);
  noiseGain.gain.linearRampToValueAtTime(0, now + 1.3);
  noise.connect(noiseFilter).connect(noiseGain).connect(audioCtx.destination);
  noise.start(now);
  noise.stop(now + 1.4);

  const note = audioCtx.createOscillator();
  note.type = "triangle";
  note.frequency.value = 392;
  const noteGain = audioCtx.createGain();
  noteGain.gain.setValueAtTime(0, now);
  noteGain.gain.linearRampToValueAtTime(0.06, now + 0.4);
  noteGain.gain.linearRampToValueAtTime(0, now + 1.1);
  note.connect(noteGain).connect(audioCtx.destination);
  note.start(now + 0.3);
  note.stop(now + 1.2);
}

// Som gravitacional do buraco negro — sucção + rumble profundo.
export function playBlackHoleSound(target: "past" | "future") {
  const audioCtx = getContext();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const dur = 1.7;

  // Sub-bass rumble (descending pitch = colapso gravitacional)
  const rumble = audioCtx.createOscillator();
  rumble.type = "sawtooth";
  const baseFreq = target === "past" ? 58 : 42;
  rumble.frequency.setValueAtTime(baseFreq, now);
  rumble.frequency.exponentialRampToValueAtTime(baseFreq * 0.28, now + dur);
  const rumbleFilter = audioCtx.createBiquadFilter();
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.value = 160;
  rumbleFilter.Q.value = 1.5;
  const rumbleGain = audioCtx.createGain();
  rumbleGain.gain.setValueAtTime(0, now);
  rumbleGain.gain.linearRampToValueAtTime(0.13, now + 0.35);
  rumbleGain.gain.linearRampToValueAtTime(0.09, now + dur * 0.8);
  rumbleGain.gain.linearRampToValueAtTime(0, now + dur);
  rumble.connect(rumbleFilter).connect(rumbleGain).connect(audioCtx.destination);
  rumble.start(now); rumble.stop(now + dur);

  // Noise whoosh (sucção — filtra para baixo)
  const nBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * dur, audioCtx.sampleRate);
  const ch = nBuf.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  const noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = nBuf;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(1200, now);
  noiseFilter.frequency.exponentialRampToValueAtTime(120, now + dur);
  noiseFilter.Q.value = 2.5;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.05, now + 0.15);
  noiseGain.gain.linearRampToValueAtTime(0.09, now + dur * 0.65);
  noiseGain.gain.linearRampToValueAtTime(0, now + dur);
  noiseNode.connect(noiseFilter).connect(noiseGain).connect(audioCtx.destination);
  noiseNode.start(now); noiseNode.stop(now + dur);

  // High tone "espaguetificação" (aparece no final)
  const hiTone = audioCtx.createOscillator();
  hiTone.type = "sine";
  const hiBase = target === "past" ? 880 : 660;
  hiTone.frequency.setValueAtTime(hiBase, now + 0.7);
  hiTone.frequency.exponentialRampToValueAtTime(hiBase * 5, now + dur);
  const hiGain = audioCtx.createGain();
  hiGain.gain.setValueAtTime(0, now + 0.7);
  hiGain.gain.linearRampToValueAtTime(0.028, now + 1.1);
  hiGain.gain.linearRampToValueAtTime(0, now + dur);
  hiTone.connect(hiGain).connect(audioCtx.destination);
  hiTone.start(now + 0.7); hiTone.stop(now + dur);
}

// Whoosh ascendente, para a transição "rumo ao futuro".
export function playFutureSound() {
  const audioCtx = getContext();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const sweep = audioCtx.createOscillator();
  sweep.type = "sawtooth";
  sweep.frequency.setValueAtTime(160, now);
  sweep.frequency.exponentialRampToValueAtTime(1400, now + 1.1);

  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(4000, now + 1.1);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.2);
  gain.gain.linearRampToValueAtTime(0, now + 1.2);

  sweep.connect(filter).connect(gain).connect(audioCtx.destination);
  sweep.start(now);
  sweep.stop(now + 1.2);
}
