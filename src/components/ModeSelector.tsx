"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import type { Lesson } from "@/data/lessons";

const MODES = [
  {
    key: "flashcard" as const,
    href: (id: string) => `/lesson/${id}/flashcard`,
    icon: "🃏",
    title: "Flashcard",
    description: "See German, flip to reveal English. Build your memory.",
    difficulty: "Easy",
    difficultyColor: "text-green-400",
  },
  {
    key: "multipleChoice" as const,
    href: (id: string) => `/lesson/${id}/multiple-choice`,
    icon: "🎯",
    title: "Multiple Choice",
    description: "See English, pick the right German from four options.",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
  },
  {
    key: "quiz" as const,
    href: (id: string) => `/lesson/${id}/quiz`,
    icon: "⌨️",
    title: "Type Quiz",
    description: "See English, type the full German from memory.",
    difficulty: "Hard",
    difficultyColor: "text-rose-400",
  },
];

export default function ModeSelector({ lesson }: { lesson: Lesson }) {
  const { isComplete } = useProgress();
  const anyComplete = MODES.some((m) => isComplete(lesson.id, m.key));

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <p className="text-xs uppercase tracking-widest text-white/30">Choose a mode</p>
        <h2 className="mt-1 text-xl font-bold text-white">
          {lesson.icon} {lesson.title}
        </h2>
        <p className="text-sm text-white/50">{lesson.phrases.length} words</p>
      </div>

      {MODES.map((mode, i) => {
        const done = isComplete(lesson.id, mode.key);
        const isFirst = i === 0 && !anyComplete;

        return (
          <Link
            key={mode.key}
            href={mode.href(lesson.id)}
            className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all duration-200 hover:scale-[1.01] ${
              done
                ? "border-green-500/30 bg-green-500/10 hover:bg-green-500/15"
                : "border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20"
            }`}
          >
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
              {mode.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{mode.title}</span>
                <span className={`text-xs font-medium ${mode.difficultyColor}`}>
                  {mode.difficulty}
                </span>
                {isFirst && (
                  <span className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 text-xs font-semibold text-indigo-400">
                    Start here ↓
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-white/50">{mode.description}</p>
            </div>
            <div className="flex-shrink-0">
              {done ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                  ✓
                </span>
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/30 transition group-hover:border-white/20 group-hover:text-white/60">
                  →
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
