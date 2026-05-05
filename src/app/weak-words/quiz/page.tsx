"use client";

import Link from "next/link";
import { useWeakWords } from "@/hooks/useWeakWords";
import QuizGame from "@/components/QuizGame";

export default function WeakWordsQuizPage() {
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

  const lesson = {
    id: "weak-words",
    number: "★",
    title: "Weak Words",
    description: "Words you struggle with",
    icon: "🔖",
    phrases: words.map((w) => ({ english: w.english, german: w.german })),
  };

  return <QuizGame lesson={lesson} />;
}
