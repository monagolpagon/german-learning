"use client";

import { useWeakWords } from "@/hooks/useWeakWords";

export default function WeakWordToggle({
  lessonId,
  english,
  german,
}: {
  lessonId: string;
  english: string;
  german: string;
}) {
  const { isWeak, addWord, removeWord } = useWeakWords();
  const weak = isWeak(english, german);

  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    if (weak) {
      removeWord(english, german);
    } else {
      addWord({ lessonId, english, german });
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={weak ? "Remove from weak words" : "Add to weak words"}
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
        weak
          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/10"
          : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60"
      }`}
    >
      <span>{weak ? "🔖" : "🔖"}</span>
      <span>{weak ? "In weak words" : "Add to weak words"}</span>
    </button>
  );
}
