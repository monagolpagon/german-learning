"use client";

import Link from "next/link";
import { useWeakWords } from "@/hooks/useWeakWords";
import MultipleChoiceGame from "@/components/MultipleChoiceGame";

export default function WeakWordsMultipleChoicePage() {
  const { words } = useWeakWords();

  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
        <p className="text-white/60">No weak words to practise.</p>
        <Link href="/weak-words" className="text-sm text-indigo-400 hover:text-indigo-300">
          ← Back
        </Link>
      </div>
    );
  }

  // Multiple choice needs ≥4 phrases for distractors; pad with blanks if needed
  const phrases = words.map((w) => ({ english: w.english, german: w.german }));
  const lesson = {
    id: "weak-words",
    number: "★",
    title: "Weak Words",
    description: "Words you struggle with",
    icon: "🔖",
    phrases,
  };

  if (phrases.length < 4) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
        <p className="text-white/60">
          You need at least 4 weak words for multiple choice.{" "}
          <span className="text-white/40">({phrases.length} so far)</span>
        </p>
        <Link href="/weak-words/quiz" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
          Try Type Quiz instead →
        </Link>
      </div>
    );
  }

  return <MultipleChoiceGame lesson={lesson} />;
}
