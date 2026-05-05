import Link from "next/link";
import { UNIT_META, type Lesson } from "@/data/lessons";
import { UNIT_COLOR_MAP } from "@/lib/utils";
import LessonProgressBadges from "./LessonProgressBadges";

// Build a lookup from unit number → color key
const UNIT_COLOR: Record<string, string> = {};
for (const u of UNIT_META) {
  UNIT_COLOR[u.number] = u.color;
}

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const unitNum = lesson.number.split(".")[0];
  const colorKey = UNIT_COLOR[unitNum] ?? "indigo";
  const accent = UNIT_COLOR_MAP[colorKey];

  return (
    <Link
      href={`/lesson/${lesson.id}`}
      className={`group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:scale-[1.015] hover:shadow-2xl ${accent.border} ${accent.glow}`}
    >
      {/* Lesson number badge */}
      <div
        className={`relative flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl ${accent.badge} shadow-lg font-black text-white text-lg leading-none`}
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
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/40">
            {lesson.phrases.length} words
          </span>
          <span className={`rounded-full border ${accent.ring} ${accent.bg} px-2.5 py-0.5 text-xs font-semibold ${accent.text}`}>
            A1
          </span>
        </div>
        <LessonProgressBadges lessonId={lesson.id} />
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
