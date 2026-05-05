"use client";

import { useProgress } from "@/hooks/useProgress";

const MODES = [
  { key: "flashcard" as const, label: "🃏", title: "Flashcard" },
  { key: "multipleChoice" as const, label: "🎯", title: "Multiple Choice" },
  { key: "quiz" as const, label: "⌨️", title: "Type Quiz" },
];

export default function LessonProgressBadges({ lessonId }: { lessonId: string }) {
  const { isComplete } = useProgress();

  const completedCount = MODES.filter((m) => isComplete(lessonId, m.key)).length;
  if (completedCount === 0) return null;

  return (
    <div className="mt-2 flex items-center gap-1">
      {MODES.map((m) => (
        <span
          key={m.key}
          title={m.title}
          className={`text-sm transition-opacity ${isComplete(lessonId, m.key) ? "opacity-100" : "opacity-20"}`}
        >
          {m.label}
        </span>
      ))}
    </div>
  );
}
