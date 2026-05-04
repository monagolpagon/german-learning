import { notFound } from "next/navigation";
import Link from "next/link";
import { getLessonById, lessons } from "@/data/lessons";
import QuizGame from "@/components/QuizGame";

export function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);

  if (!lesson) notFound();

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/"
          className="text-sm text-white/40 transition hover:text-white/70"
        >
          ← All lessons
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-sm text-white/60">
          {lesson.icon} {lesson.title}
        </span>
      </div>
      <QuizGame lesson={lesson} />
    </main>
  );
}
