import { notFound } from "next/navigation";
import { getLessonById, lessons } from "@/data/lessons";
import MultipleChoiceGame from "@/components/MultipleChoiceGame";

export function generateStaticParams() {
  return lessons.map((l) => ({ id: l.id }));
}

export default async function MultipleChoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return <MultipleChoiceGame lesson={lesson} />;
}
