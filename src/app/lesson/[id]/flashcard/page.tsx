import { notFound } from "next/navigation";
import { getLessonById, lessons } from "@/data/lessons";
import FlashcardGame from "@/components/FlashcardGame";

export function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default async function FlashcardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return <FlashcardGame lesson={lesson} />;
}
