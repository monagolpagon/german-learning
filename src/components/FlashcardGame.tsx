"use client";

import { useState, useCallback, useEffect } from "react";
import type { Lesson, Phrase } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { shuffle, speak } from "@/lib/utils";
import CompletionScreen from "./CompletionScreen";

export default function FlashcardGame({ lesson }: { lesson: Lesson }) {
  const total = lesson.phrases.length;
  const { markComplete } = useProgress();

  const buildDeck = useCallback(() => shuffle(lesson.phrases), [lesson.phrases]);

  const [deck, setDeck] = useState<Phrase[]>(() => buildDeck());
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const remaining = deck.length;
  const current = deck[0];

  // Space bar to flip
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === " " || e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        if (e.key === " ") setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleGotIt() {
    const next = deck.slice(1);
    if (next.length === 0) {
      markComplete(lesson.id, "flashcard");
      setCompleted(true);
    } else {
      setDeck(next);
      setFlipped(false);
    }
  }

  function handleTryAgain() {
    setDeck((d) => [...d.slice(1), d[0]]);
    setFlipped(false);
  }

  function handleRestart() {
    setDeck(buildDeck());
    setFlipped(false);
    setCompleted(false);
  }

  if (completed) {
    return (
      <CompletionScreen
        lessonTitle={lesson.title}
        total={total}
        lessonId={lesson.id}
        mode="flashcard"
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div>
        <div className="mb-1 flex justify-between text-xs text-white/40">
          <span>{total - remaining} / {total} cards seen</span>
          <span>{remaining} remaining</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${Math.round(((total - remaining) / total) * 100)}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="relative h-64 cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className="relative h-full w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front — German */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-white/30">German</p>
            <p className="text-center text-4xl font-black text-white">{current.german}</p>
            <p className="mt-6 text-xs text-white/20">tap or press space to flip</p>
          </div>

          {/* Back — English */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8 backdrop-blur-sm"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-indigo-400/60">English</p>
            <p className="text-center text-3xl font-bold text-white">{current.english}</p>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); speak(current.german); }}
              className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
              title="Hear pronunciation"
            >
              🔊
            </button>
          </div>
        </div>
      </div>

      {/* Action buttons — only shown when flipped */}
      <div
        className={`flex gap-3 transition-opacity duration-300 ${flipped ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          onClick={handleTryAgain}
          className="flex-1 rounded-xl border border-white/20 py-3 font-semibold text-white/70 transition hover:bg-white/10"
        >
          Try again ↺
        </button>
        <button
          onClick={handleGotIt}
          className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-500"
        >
          Got it ✓
        </button>
      </div>

      <p className="text-center text-xs text-white/20">
        Tap card to flip · Got it removes the card · Try again keeps it in the deck
      </p>
    </div>
  );
}
