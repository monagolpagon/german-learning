"use client";

import Link from "next/link";
import { useWeakWords } from "@/hooks/useWeakWords";

const MODES = [
  {
    href: "/weak-words/flashcard",
    icon: "🃏",
    title: "Flashcard",
    description: "See German, flip to reveal English.",
    difficulty: "Easy",
    difficultyColor: "text-green-400",
  },
  {
    href: "/weak-words/multiple-choice",
    icon: "🎯",
    title: "Multiple Choice",
    description: "Pick the right German from four options.",
    difficulty: "Medium",
    difficultyColor: "text-amber-400",
  },
  {
    href: "/weak-words/quiz",
    icon: "⌨️",
    title: "Type Quiz",
    description: "Type the full German from memory.",
    difficulty: "Hard",
    difficultyColor: "text-rose-400",
  },
];

export default function WeakWordsPage() {
  const { words, removeWord } = useWeakWords();

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm">
        <div className="text-5xl">🔖</div>
        <h2 className="text-xl font-bold text-white">No weak words yet</h2>
        <p className="text-sm text-white/50">
          Words you answer incorrectly — or mark manually — will appear here.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-500"
        >
          Start learning
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white">🔖 Weak Words</h2>
        <p className="mt-1 text-sm text-white/50">
          {words.length} word{words.length !== 1 ? "s" : ""} to practise
        </p>
      </div>

      {/* Practice modes */}
      <div className="flex flex-col gap-3">
        {MODES.map((mode) => (
          <Link
            key={mode.href}
            href={mode.href}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:scale-[1.01] hover:bg-white/[0.08] hover:border-white/20"
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
              </div>
              <p className="mt-0.5 text-sm text-white/50">{mode.description}</p>
            </div>
            <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/30 transition group-hover:border-white/20 group-hover:text-white/60">
              →
            </span>
          </Link>
        ))}
      </div>

      {/* Word list */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/30">
          Your weak words
        </h3>
        <div className="flex flex-col gap-2">
          {words.map((word) => (
            <div
              key={`${word.english}||${word.german}`}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white">{word.german}</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="text-white/50">{word.english}</span>
              </div>
              <button
                type="button"
                onClick={() => removeWord(word.english, word.german)}
                title="Remove from weak words"
                className="flex-shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium text-white/30 transition hover:bg-red-500/20 hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
