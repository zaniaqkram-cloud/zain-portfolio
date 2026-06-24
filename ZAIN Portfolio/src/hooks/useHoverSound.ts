import { useRef, useCallback } from "react";

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function useHoverSound() {
  const lastPlayed = useRef(0);

  const play = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayed.current < 80) return;
    lastPlayed.current = now;

    try {
      const ctx = getContext();
      const t = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.04, t);
      master.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
      master.connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.02);
      osc.connect(master);
      osc.start(t);
      osc.stop(t + 0.03);
    } catch {
      /* AudioContext unavailable */
    }
  }, []);

  return play;
}
