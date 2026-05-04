import Link from "next/link";

export default function CompletionScreen({
  lessonTitle,
  total,
  onRestart,
}: {
  lessonTitle: string;
  total: number;
  onRestart: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
      <div className="text-6xl">🎉</div>
      <div>
        <h2 className="mb-2 text-2xl font-bold text-white">Lesson Complete!</h2>
        <p className="text-white/60">
          You mastered all {total} words in <span className="text-white">{lessonTitle}</span>.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
        >
          Restart lesson
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white/80 transition hover:bg-white/10"
        >
          All lessons
        </Link>
      </div>
    </div>
  );
}
