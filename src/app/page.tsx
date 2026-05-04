import { lessons } from "@/data/lessons";
import LessonCard from "@/components/LessonCard";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold text-white">Deutsch Lernen</h1>
        <p className="text-white/50">Pick a lesson and start translating</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </main>
  );
}
