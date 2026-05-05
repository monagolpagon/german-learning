import { notFound } from "next/navigation";
import { getLessonById, lessons } from "@/data/lessons";
import QuizGame from "@/components/QuizGame";

export function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return <QuizGame lesson={lesson} />;
}
