"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SceneId } from "@/public/data/musicband/ensembles";

/**
 * Backing music for a stage.
 *
 * Each ensemble can ship a looping track at
 * `public/audio/musicband/<ensembleId>.mp3` (see the README there). When that
 * file is missing the hook falls back to a Web Audio theme synthesised on the
 * fly — the same approach the beatmaster tool uses — so every ensemble has
 * sound even before the audio assets land.
 */
interface ThemeVoice {
  /** Semitone offsets from the root, played as a slow arpeggio. */
  notes: number[];
  root: number;
  wave: OscillatorType;
  /** Seconds between notes. */
  step: number;
  gain: number;
}

const THEMES: Record<SceneId, ThemeVoice> = {
  // Swung minor-seventh figure for the jazz club.
  jazz: { notes: [0, 3, 7, 10, 14, 10, 7, 3], root: 220.0, wave: "sine", step: 0.55, gain: 0.075 },
  // Driving power-chord pulse for the pop/rock stage.
  string: { notes: [0, 5, 7, 10, 7, 5], root: 146.83, wave: "square", step: 0.42, gain: 0.035 },
  // Same drive with a brighter horn-like edge.
  stringcombo: { notes: [0, 4, 7, 10, 12, 10, 7, 4], root: 164.81, wave: "sawtooth", step: 0.48, gain: 0.03 },
  // Gentle major arpeggio for the acoustic café.
  folk: { notes: [0, 4, 7, 12, 7, 4], root: 293.66, wave: "triangle", step: 0.7, gain: 0.07 },
  // Slow, sweet line for the classical chamber hall.
  chamber: { notes: [0, 4, 7, 11, 7, 4], root: 261.63, wave: "triangle", step: 1.1, gain: 0.07 },
  // Wide, stately intervals for the concert hall.
  orchestra: { notes: [0, 7, 12, 16, 12, 7], root: 174.61, wave: "sawtooth", step: 0.9, gain: 0.045 },
};

const TRACK_DIR = "/audio/musicband";
const TRACK_VOLUME = 0.5;

const semitone = (root: number, steps: number) => root * Math.pow(2, steps / 12);

export function useBandAudio(scene: SceneId) {
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const stopSynth = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    masterRef.current?.gain.setTargetAtTime(
      0,
      ctxRef.current?.currentTime ?? 0,
      0.1
    );
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    stopSynth();
    setPlaying(false);
  }, [stopSynth]);

  /** Synthesised fallback, used when the ensemble has no audio file. */
  const startSynth = useCallback(() => {
    const theme = THEMES[scene];
    try {
      if (!ctxRef.current) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctor) {
          setBlocked(true);
          return;
        }
        ctxRef.current = new Ctor();
        masterRef.current = ctxRef.current.createGain();
        masterRef.current.connect(ctxRef.current.destination);
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();
      if (ctx.state !== "running") {
        setBlocked(true);
        return;
      }

      masterRef.current!.gain.setTargetAtTime(1, ctx.currentTime, 0.15);
      setBlocked(false);
      setPlaying(true);

      const playNote = () => {
        const current = ctxRef.current;
        const master = masterRef.current;
        if (!current || !master) return;
        const freq = semitone(
          theme.root,
          theme.notes[stepRef.current % theme.notes.length]
        );
        stepRef.current += 1;

        const osc = current.createOscillator();
        const env = current.createGain();
        osc.type = theme.wave;
        osc.frequency.value = freq;
        const now = current.currentTime;
        env.gain.setValueAtTime(0, now);
        env.gain.linearRampToValueAtTime(theme.gain, now + 0.08);
        env.gain.exponentialRampToValueAtTime(0.0001, now + theme.step * 1.6);
        osc.connect(env);
        env.connect(master);
        osc.start(now);
        osc.stop(now + theme.step * 1.7);
      };

      playNote();
      timerRef.current = window.setInterval(playNote, theme.step * 1000);
    } catch {
      setBlocked(true);
      setPlaying(false);
    }
  }, [scene]);

  const start = useCallback(async () => {
    // Prefer the ensemble's own track; fall back to the synth if it is absent.
    const audio =
      audioRef.current ?? new Audio(`${TRACK_DIR}/${scene}.mp3`);
    audio.loop = true;
    audio.volume = TRACK_VOLUME;
    audioRef.current = audio;

    // play() can resolve before the browser has finished fetching, so a missing
    // file resolves happily and only reports the failure later via `error`.
    // Wait for whichever of playing/error actually settles.
    const settled = new Promise<"playing" | "failed">((resolve) => {
      let done = false;
      const finish = (result: "playing" | "failed") => {
        if (done) return;
        done = true;
        audio.removeEventListener("playing", onPlaying);
        audio.removeEventListener("error", onError);
        window.clearTimeout(guard);
        resolve(result);
      };
      const onPlaying = () => finish("playing");
      const onError = () => finish("failed");
      audio.addEventListener("playing", onPlaying);
      audio.addEventListener("error", onError);
      // Neither event is guaranteed on every browser; decide from state.
      const guard = window.setTimeout(
        () => finish(audio.error === null && audio.readyState >= 3 ? "playing" : "failed"),
        2500
      );
    });

    let refused = false;
    try {
      // Called synchronously off the user's click so the gesture still counts.
      await audio.play();
    } catch {
      // Autoplay refusal rejects immediately and never fires `error`.
      refused = audio.error === null;
    }

    if (refused) {
      setBlocked(true);
      setPlaying(false);
      return;
    }

    if ((await settled) === "playing") {
      setBlocked(false);
      setPlaying(true);
      return;
    }

    // No usable track for this ensemble — synthesise one instead.
    audio.pause();
    audio.removeAttribute("src");
    audioRef.current = null;
    startSynth();
  }, [scene, startSynth]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else void start();
  }, [playing, start, stop]);

  // Switching ensembles (or leaving the stage) must not leave audio running.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        audioRef.current = null;
      }
      void ctxRef.current?.close();
      ctxRef.current = null;
      masterRef.current = null;
    };
  }, [scene]);

  return { playing, blocked, toggle, start, stop };
}
