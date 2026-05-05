"use client";

import { useState, useMemo, useCallback } from "react";
import type { Lesson, Phrase } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { useWeakWords } from "@/hooks/useWeakWords";
import { shuffle } from "@/lib/utils";
import CompletionScreen from "./CompletionScreen";
import WeakWordToggle from "./WeakWordToggle";

export default function MultipleChoiceGame({ lesson }: { lesson: Lesson }) {
  const total = lesson.phrases.length;
  const { markComplete } = useProgress();
  const { addWord } = useWeakWords();

  const buildQueue = useCallback(() => shuffle(lesson.phrases), [lesson.phrases]);

  const [queue, setQueue] = useState<Phrase[]>(() => buildQueue());
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const current = queue[0];

  // Build 4 options: 1 correct + 3 random distractors
  const options = useMemo(() => {
    if (!current) return [];
    const others = lesson.phrases
      .filter((p) => p.german !== current.german)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.german);
    return shuffle([current.german, ...others]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.german]);

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);

    const isCorrect = option === current.german;

    if (!isCorrect) {
      // Auto-add wrong answers to weak words
      addWord({ lessonId: lesson.id, english: current.english, german: current.german });
    }

    setTimeout(() => {
      if (isCorrect) {
        // Remove from queue — word mastered
        const next = queue.slice(1);
        if (next.length === 0) {
          markComplete(lesson.id, "multipleChoice");
          setCompleted(true);
        } else {
          setCorrectCount((c) => c + 1);
          setQueue(next);
          setSelected(null);
        }
      } else {
        // Re-queue at end — word not yet mastered
        setQueue((q) => [...q.slice(1), q[0]]);
        setSelected(null);
      }
    }, isCorrect ? 700 : 1400);
  }

  function handleRestart() {
    setQueue(buildQueue());
    setCorrectCount(0);
    setSelected(null);
    setCompleted(false);
  }

  const progress = Math.round((correctCount / total) * 100);

  if (completed) {
    return (
      <CompletionScreen
        lessonTitle={lesson.title}
        total={total}
        lessonId={lesson.id}
        mode="multipleChoice"
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div>
        <div className="mb-1 flex justify-between text-xs text-white/40">
          <span>{correctCount} / {total} mastered</span>
          <span>{queue.length} in queue</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-white/40">
            Choose the German translation
          </p>
          <WeakWordToggle
            lessonId={lesson.id}
            english={current.english}
            german={current.german}
          />
        </div>

        <p className="mb-8 text-3xl font-bold text-white">{current.english}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const isCorrect = option === current.german;
            const isSelected = option === selected;

            let style =
              "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left font-medium text-white transition";

            if (!selected) {
              style += " hover:bg-white/10 hover:border-white/30 cursor-pointer";
            } else if (isCorrect) {
              style = "w-full rounded-xl border border-green-500/60 bg-green-500/20 px-4 py-3 text-left font-medium text-green-300";
            } else if (isSelected) {
              style = "w-full rounded-xl border border-red-500/60 bg-red-500/20 px-4 py-3 text-left font-medium text-red-300 line-through";
            } else {
              style += " opacity-40";
            }

            return (
              <button
                key={option}
                type="button"
                className={style}
                onClick={() => handleSelect(option)}
                disabled={!!selected}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected && selected !== current.german && (
          <p className="mt-4 text-xs text-amber-400/80">
            Wrong answer added to your weak words — keep going!
          </p>
        )}
      </div>
    </div>
  );
}
