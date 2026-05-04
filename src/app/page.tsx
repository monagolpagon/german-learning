import { lessons } from "@/data/lessons";
import LessonCard from "@/components/LessonCard";

export default function Home() {
  const totalWords = lessons.reduce((acc, l) => acc + l.phrases.length, 0);

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
            A1 — Beginner
          </span>
        </div>

        <h1 className="mb-3 text-6xl font-black tracking-tight text-white">
          Deutsch<br />
          <span className="text-white/30">Lernen</span>
        </h1>

        <p className="text-sm text-white/40">
          Master German, one lesson at a time
        </p>

        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-black text-white">{lessons.length}</p>
            <p className="text-xs uppercase tracking-widest text-white/30">Lessons</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">{totalWords}</p>
            <p className="text-xs uppercase tracking-widest text-white/30">Words</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-black text-indigo-400">A1</p>
            <p className="text-xs uppercase tracking-widest text-white/30">Level</p>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-white/25">
          Lesson path
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Lesson list */}
      <div className="flex flex-col gap-3">
        {lessons.map((lesson, index) => (
          <LessonCard key={lesson.id} lesson={lesson} lessonNumber={index + 1} />
        ))}
      </div>
    </main>
  );
}
