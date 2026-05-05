"use client";

import Link from "next/link";
import { useWeakWords } from "@/hooks/useWeakWords";

export default function WeakWordsEntry() {
  const { words } = useWeakWords();
  if (words.length === 0) return null;

  return (
    <Link
      href="/weak-words"
      className="group mb-10 flex items-center gap-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-amber-500/15 hover:border-amber-500/50 hover:scale-[1.01]"
    >
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-2xl shadow-lg shadow-amber-500/20">
        🔖
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-amber-300 text-base">Weak Words</h2>
        <p className="text-sm text-amber-400/60">
          {words.length} word{words.length !== 1 ? "s" : ""} to review
        </p>
      </div>
      <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 transition-all duration-200 group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-0.5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </Link>
  );
}
