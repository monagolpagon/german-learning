import Link from "next/link";

export default function WeakWordsLayout({ children }: { children: React.ReactNode }) {
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
        <Link
          href="/weak-words"
          className="text-sm text-white/60 transition hover:text-white/80"
        >
          🔖 Weak Words
        </Link>
      </div>
      {children}
    </main>
  );
}
