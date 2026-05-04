"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Lesson, Phrase } from "@/data/lessons";
import CompletionScreen from "./CompletionScreen";

type Feedback = "correct" | "incorrect" | null;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

export default function QuizGame({ lesson }: { lesson: Lesson }) {
  const total = lesson.phrases.length;

  const buildQueue = useCallback(
    () => shuffle(lesson.phrases),
    [lesson.phrases]
  );

  const [queue, setQueue] = useState<Phrase[]>(() => buildQueue());
  const [correctCount, setCorrectCount] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = queue[0];

  // Focus input on mount and after each advance
  useEffect(() => {
    if (!completed && !feedback) {
      inputRef.current?.focus();
    }
  }, [feedback, completed]);

  function handleRestart() {
    setQueue(buildQueue());
    setCorrectCount(0);
    setInput("");
    setFeedback(null);
    setCompleted(false);
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (feedback || !current) return;

    const isCorrect =
      input.trim().toLowerCase() === current.german.toLowerCase();

    setFeedback(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      setFeedback(null);
      setInput("");

      if (isCorrect) {
        const next = queue.slice(1);
        if (next.length === 0) {
          setCompleted(true);
        } else {
          setQueue(next);
          setCorrectCount((c) => c + 1);
        }
      } else {
        // Move current to end of queue
        setQueue((q) => [...q.slice(1), q[0]]);
      }
    }, isCorrect ? 1000 : 1600);
  }

  const progress = Math.round((correctCount / total) * 100);

  if (completed) {
    return (
      <CompletionScreen
        lessonTitle={lesson.title}
        total={total}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div>
        <div className="mb-1 flex justify-between text-xs text-white/40">
          <span>{correctCount} / {total} correct</span>
          <span>{queue.length} remaining</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
          Translate to German
        </p>

        <div className="mb-8 flex items-center gap-3">
          <p className="text-3xl font-bold text-white">{current.english}</p>
          <button
            type="button"
            onClick={() => speak(current.english)}
            title="Listen"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
          >
            🔊
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type German translation…"
            disabled={!!feedback}
            className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-indigo-400 focus:bg-white/15 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || !!feedback}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
          >
            Check
          </button>
        </form>

        {/* Feedback banner */}
        {feedback === "correct" && (
          <div className="mt-4 rounded-xl bg-green-500/20 px-4 py-3 text-green-300">
            Correct! ✓
          </div>
        )}
        {feedback === "incorrect" && (
          <div className="mt-4 rounded-xl bg-red-500/20 px-4 py-3 text-red-300">
            Not quite — the answer is:{" "}
            <span className="font-semibold text-white">{current.german}</span>
          </div>
        )}
      </div>
    </div>
  );
}
