"use client";

import { useState, useCallback } from "react";

export type ModeKey = "flashcard" | "multipleChoice" | "quiz";
export type LessonProgress = Partial<Record<ModeKey, "completed">>;
type ProgressStore = Record<string, LessonProgress>;

const COOKIE_NAME = "german-progress";
const COOKIE_DAYS = 365;

function readCookie(): ProgressStore {
  if (typeof document === "undefined") return {};
  try {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(COOKIE_NAME + "="));
    if (!match) return {};
    return JSON.parse(decodeURIComponent(match.slice(COOKIE_NAME.length + 1))) as ProgressStore;
  } catch {
    return {};
  }
}

function writeCookie(store: ProgressStore) {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_DAYS);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(store))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>(() => readCookie());

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
        writeCookie(next);
      } catch {
        // cookies unavailable
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
