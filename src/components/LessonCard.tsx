import Link from "next/link";
import type { Lesson } from "@/data/lessons";

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="mb-3 text-4xl">{lesson.icon}</div>
      <h2 className="mb-1 text-xl font-semibold text-white">{lesson.title}</h2>
      <p className="mb-4 text-sm text-white/60">{lesson.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">
          {lesson.phrases.length} words
        </span>
        <span className="text-sm font-medium text-indigo-400 group-hover:text-indigo-300">
          Start →
        </span>
      </div>
    </Link>
  );
}
