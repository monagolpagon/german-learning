"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Lesson, Phrase } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { useWeakWords } from "@/hooks/useWeakWords";
import { shuffle, speak } from "@/lib/utils";
import CompletionScreen from "./CompletionScreen";
import WeakWordToggle from "./WeakWordToggle";

type Feedback = "correct" | "incorrect" | null;

export default function QuizGame({ lesson }: { lesson: Lesson }) {
  const total = lesson.phrases.length;
  const { markComplete } = useProgress();
  const { addWord } = useWeakWords();

  const buildQueue = useCallback(() => shuffle(lesson.phrases), [lesson.phrases]);

  const [queue, setQueue] = useState<Phrase[]>(() => buildQueue());
  const [correctCount, setCorrectCount] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [waitingForContinue, setWaitingForContinue] = useState(false);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = queue[0];

  useEffect(() => {
    if (!completed && !feedback) {
      inputRef.current?.focus();
    }
  }, [feedback, completed]);

  useEffect(() => {
    if (!waitingForContinue) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter") advance();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingForContinue]);

  function advance() {
    setFeedback(null);
    setInput("");
    setWaitingForContinue(false);
    // Re-queue at end
    setQueue((q) => [...q.slice(1), q[0]]);
  }

  function handleRestart() {
    setQueue(buildQueue());
    setCorrectCount(0);
    setInput("");
    setFeedback(null);
    setWaitingForContinue(false);
    setCompleted(false);
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (feedback || !current) return;

    const isCorrect =
      input.trim().toLowerCase() === current.german.toLowerCase();

    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        setInput("");
        const next = queue.slice(1);
        if (next.length === 0) {
          markComplete(lesson.id, "quiz");
          setCompleted(true);
        } else {
          setQueue(next);
          setCorrectCount((c) => c + 1);
        }
      }, 1000);
    } else {
      // Auto-add wrong answers to weak words
      addWord({ lessonId: lesson.id, english: current.english, german: current.german });
      setWaitingForContinue(true);
    }
  }

  const progress = Math.round((correctCount / total) * 100);

  if (completed) {
    return (
      <CompletionScreen
        lessonTitle={lesson.title}
        total={total}
        lessonId={lesson.id}
        mode="quiz"
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
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-white/40">
            Translate to German
          </p>
          <WeakWordToggle
            lessonId={lesson.id}
            english={current.english}
            german={current.german}
          />
        </div>

        <div className="mb-8 flex items-center gap-3">
          <p className="text-3xl font-bold text-white">{current.english}</p>
          <button
            type="button"
            onClick={() => speak(current.english, "en-US")}
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

        {feedback === "correct" && (
          <div className="mt-4 rounded-xl bg-green-500/20 px-4 py-3 text-green-300">
            Correct! ✓
          </div>
        )}
        {feedback === "incorrect" && (
          <div className="mt-4 rounded-xl bg-red-500/20 px-4 py-3 text-red-300">
            <div className="mb-3">
              Not quite — the answer is:{" "}
              <span className="font-semibold text-white">{current.german}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-400/70">click enter to proceed</span>
              <button
                type="button"
                onClick={advance}
                className="rounded-lg bg-red-500/20 px-3 py-1 text-sm font-medium text-red-200 transition hover:bg-red-500/40"
              >
                Continue →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
