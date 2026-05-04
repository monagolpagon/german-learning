import Link from "next/link";
import type { Lesson } from "@/data/lessons";

const UNIT_ACCENTS = [
  {
    number: "bg-indigo-500 shadow-indigo-500/40",
    glow: "hover:shadow-indigo-500/20",
    border: "hover:border-indigo-500/40",
    text: "text-indigo-400",
    label: "text-indigo-400/60",
  },
  {
    number: "bg-emerald-500 shadow-emerald-500/40",
    glow: "hover:shadow-emerald-500/20",
    border: "hover:border-emerald-500/40",
    text: "text-emerald-400",
    label: "text-emerald-400/60",
  },
  {
    number: "bg-amber-500 shadow-amber-500/40",
    glow: "hover:shadow-amber-500/20",
    border: "hover:border-amber-500/40",
    text: "text-amber-400",
    label: "text-amber-400/60",
  },
  {
    number: "bg-rose-500 shadow-rose-500/40",
    glow: "hover:shadow-rose-500/20",
    border: "hover:border-rose-500/40",
    text: "text-rose-400",
    label: "text-rose-400/60",
  },
];

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const unitIndex = (parseInt(lesson.number.split(".")[0]) - 1) % UNIT_ACCENTS.length;
  const accent = UNIT_ACCENTS[unitIndex];

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className={`group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.015] hover:shadow-2xl ${accent.border} ${accent.glow}`}
    >
      {/* Lesson number badge */}
      <div
        className={`relative flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl ${accent.number} shadow-lg font-black text-white text-lg leading-none`}
      >
        {lesson.number}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xl leading-none">{lesson.icon}</span>
          <h2 className="font-bold text-white text-base leading-tight truncate">
            {lesson.title}
          </h2>
        </div>
        <p className="text-sm text-white/40 truncate">{lesson.description}</p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/40">
            {lesson.phrases.length} words
          </span>
          <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
            A1
          </span>
        </div>
      </div>

      {/* Play button */}
      <div
        className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 ${accent.text} transition-all duration-200 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/10`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-0.5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </Link>
  );
}
