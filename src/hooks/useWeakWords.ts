"use client";

import { useState, useCallback } from "react";

export type WeakWord = {
  lessonId: string;
  english: string;
  german: string;
};

const STORAGE_KEY = "german-weak-words";

function wordKey(english: string, german: string) {
  return `${english}||${german}`;
}

function loadWords(): Map<string, WeakWord> {
  if (typeof window === "undefined") return new Map();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const arr = JSON.parse(raw) as WeakWord[];
    return new Map(arr.map((w) => [wordKey(w.english, w.german), w]));
  } catch {
    return new Map();
  }
}

function saveWords(map: Map<string, WeakWord>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...map.values()]));
  } catch {
    // storage unavailable
  }
}

export function useWeakWords() {
  const [words, setWords] = useState<Map<string, WeakWord>>(() => loadWords());

  const addWord = useCallback((word: WeakWord) => {
    setWords((prev) => {
      const key = wordKey(word.english, word.german);
      if (prev.has(key)) return prev;
      const next = new Map(prev);
      next.set(key, word);
      saveWords(next);
      return next;
    });
  }, []);

  const removeWord = useCallback((english: string, german: string) => {
    setWords((prev) => {
      const key = wordKey(english, german);
      if (!prev.has(key)) return prev;
      const next = new Map(prev);
      next.delete(key);
      saveWords(next);
      return next;
    });
  }, []);

  const isWeak = useCallback(
    (english: string, german: string) => words.has(wordKey(english, german)),
    [words]
  );

  return { words: [...words.values()], addWord, removeWord, isWeak };
}
