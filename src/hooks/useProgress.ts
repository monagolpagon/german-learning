"use client";

import { useState, useCallback } from "react";

export type ModeKey = "flashcard" | "multipleChoice" | "quiz";
export type LessonProgress = Partial<Record<ModeKey, "completed">>;
type ProgressStore = Record<string, LessonProgress>;

const STORAGE_KEY = "german-progress";

function loadStore(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressStore) : {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>(() => loadStore());

  const getLesson = useCallback(
    (id: string): LessonProgress => store[id] ?? {},
    [store]
  );

  const markComplete = useCallback((id: string, mode: ModeKey) => {
    setStore((prev) => {
      const next: ProgressStore = {
        ...prev,
        [id]: { ...prev[id], [mode]: "completed" as const },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable
      }
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (id: string, mode: ModeKey): boolean => store[id]?.[mode] === "completed",
    [store]
  );

  return { getLesson, markComplete, isComplete };
}
