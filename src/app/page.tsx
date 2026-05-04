import { lessons } from "@/data/lessons";
import LessonCard from "@/components/LessonCard";

export default function Home() {
  const totalWords = lessons.reduce((acc, l) => acc + l.phrases.length, 0);

  // Group sub-lessons by their unit number (integer part of "1.1" → "1")
  const units = lessons.reduce<Record<string, typeof lessons>>((acc, lesson) => {
    const unit = lesson.number.split(".")[0];
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(lesson);
    return acc;
  }, {});

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
          Deutsch
          <br />
          <span className="text-white/25">Lernen</span>
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

      {/* Unit sections */}
      {Object.entries(units).map(([unit, unitLessons]) => (
        <section key={unit} className="mb-10">
          {/* Unit header */}
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-xs font-black text-white shadow-lg shadow-indigo-500/30">
                {unit}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/25">
                  Lesson {unit}
                </p>
                <p className="text-sm font-semibold text-white/60">
                  {unitLessons.length} parts · {unitLessons.reduce((a, l) => a + l.phrases.length, 0)} words
                </p>
              </div>
            </div>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sub-lesson cards */}
          <div className="flex flex-col gap-3">
            {unitLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
