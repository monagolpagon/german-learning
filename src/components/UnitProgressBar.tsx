"use client";

import { useProgress } from "@/hooks/useProgress";
import type { Lesson } from "@/data/lessons";
import type { ModeKey } from "@/hooks/useProgress";

const ALL_MODES: ModeKey[] = ["flashcard", "multipleChoice", "quiz"];

export default function UnitProgressBar({ lessons }: { lessons: Lesson[] }) {
  const { isComplete } = useProgress();

  const total = lessons.length * ALL_MODES.length;
  const done = lessons.reduce(
    (acc, l) => acc + ALL_MODES.filter((m) => isComplete(l.id, m)).length,
    0
  );

  if (done === 0) return null;

  const pct = Math.round((done / total) * 100);

  return (
    <div className="mt-3">
      <div className="mb-1 flex justify-between text-xs text-white/30">
        <span>{pct}% complete</span>
        <span>{done}/{total} modes</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-indigo-500/60 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
