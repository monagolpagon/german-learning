import Link from "next/link";
import type { ModeKey } from "@/hooks/useProgress";

const NEXT: Record<ModeKey, { label: string; path: (id: string) => string } | null> = {
  flashcard: { label: "Try Multiple Choice →", path: (id) => `/lesson/${id}/multiple-choice` },
  multipleChoice: { label: "Try Type Quiz →", path: (id) => `/lesson/${id}/quiz` },
  quiz: null,
};

export default function CompletionScreen({
  lessonTitle,
  total,
  lessonId,
  mode,
  onRestart,
}: {
  lessonTitle: string;
  total: number;
  lessonId: string;
  mode: ModeKey;
  onRestart: () => void;
}) {
  const next = NEXT[mode];

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
      <div className="text-6xl">🎉</div>
      <div>
        <h2 className="mb-2 text-2xl font-bold text-white">
          {mode === "flashcard" ? "Deck Complete!" : mode === "multipleChoice" ? "Quiz Complete!" : "Lesson Complete!"}
        </h2>
        <p className="text-white/60">
          You went through all {total} words in{" "}
          <span className="text-white">{lessonTitle}</span>.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onRestart}
          className="rounded-xl border border-white/20 px-5 py-2.5 font-semibold text-white/80 transition hover:bg-white/10"
        >
          Restart
        </button>
        {next ? (
          <Link
            href={next.path(lessonId)}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-500"
          >
            {next.label}
          </Link>
        ) : (
          <Link
            href={`/lesson/${lessonId}`}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-500"
          >
            Back to lesson →
          </Link>
        )}
      </div>
    </div>
  );
}
