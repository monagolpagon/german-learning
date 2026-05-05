export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function speak(text: string, lang = "de-DE") {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

export type UnitAccent = {
  badge: string;
  glow: string;
  border: string;
  text: string;
  label: string;
  bg: string;
  ring: string;
};

export const UNIT_COLOR_MAP: Record<string, UnitAccent> = {
  indigo: {
    badge: "bg-indigo-500 shadow-indigo-500/40",
    glow: "hover:shadow-indigo-500/20",
    border: "hover:border-indigo-500/40",
    text: "text-indigo-400",
    label: "text-indigo-400/60",
    bg: "bg-indigo-500/10",
    ring: "border-indigo-500/40",
  },
  emerald: {
    badge: "bg-emerald-500 shadow-emerald-500/40",
    glow: "hover:shadow-emerald-500/20",
    border: "hover:border-emerald-500/40",
    text: "text-emerald-400",
    label: "text-emerald-400/60",
    bg: "bg-emerald-500/10",
    ring: "border-emerald-500/40",
  },
  amber: {
    badge: "bg-amber-500 shadow-amber-500/40",
    glow: "hover:shadow-amber-500/20",
    border: "hover:border-amber-500/40",
    text: "text-amber-400",
    label: "text-amber-400/60",
    bg: "bg-amber-500/10",
    ring: "border-amber-500/40",
  },
  rose: {
    badge: "bg-rose-500 shadow-rose-500/40",
    glow: "hover:shadow-rose-500/20",
    border: "hover:border-rose-500/40",
    text: "text-rose-400",
    label: "text-rose-400/60",
    bg: "bg-rose-500/10",
    ring: "border-rose-500/40",
  },
  cyan: {
    badge: "bg-cyan-500 shadow-cyan-500/40",
    glow: "hover:shadow-cyan-500/20",
    border: "hover:border-cyan-500/40",
    text: "text-cyan-400",
    label: "text-cyan-400/60",
    bg: "bg-cyan-500/10",
    ring: "border-cyan-500/40",
  },
  violet: {
    badge: "bg-violet-500 shadow-violet-500/40",
    glow: "hover:shadow-violet-500/20",
    border: "hover:border-violet-500/40",
    text: "text-violet-400",
    label: "text-violet-400/60",
    bg: "bg-violet-500/10",
    ring: "border-violet-500/40",
  },
  teal: {
    badge: "bg-teal-500 shadow-teal-500/40",
    glow: "hover:shadow-teal-500/20",
    border: "hover:border-teal-500/40",
    text: "text-teal-400",
    label: "text-teal-400/60",
    bg: "bg-teal-500/10",
    ring: "border-teal-500/40",
  },
  orange: {
    badge: "bg-orange-500 shadow-orange-500/40",
    glow: "hover:shadow-orange-500/20",
    border: "hover:border-orange-500/40",
    text: "text-orange-400",
    label: "text-orange-400/60",
    bg: "bg-orange-500/10",
    ring: "border-orange-500/40",
  },
  pink: {
    badge: "bg-pink-500 shadow-pink-500/40",
    glow: "hover:shadow-pink-500/20",
    border: "hover:border-pink-500/40",
    text: "text-pink-400",
    label: "text-pink-400/60",
    bg: "bg-pink-500/10",
    ring: "border-pink-500/40",
  },
  sky: {
    badge: "bg-sky-500 shadow-sky-500/40",
    glow: "hover:shadow-sky-500/20",
    border: "hover:border-sky-500/40",
    text: "text-sky-400",
    label: "text-sky-400/60",
    bg: "bg-sky-500/10",
    ring: "border-sky-500/40",
  },
  lime: {
    badge: "bg-lime-500 shadow-lime-500/40",
    glow: "hover:shadow-lime-500/20",
    border: "hover:border-lime-500/40",
    text: "text-lime-400",
    label: "text-lime-400/60",
    bg: "bg-lime-500/10",
    ring: "border-lime-500/40",
  },
  fuchsia: {
    badge: "bg-fuchsia-500 shadow-fuchsia-500/40",
    glow: "hover:shadow-fuchsia-500/20",
    border: "hover:border-fuchsia-500/40",
    text: "text-fuchsia-400",
    label: "text-fuchsia-400/60",
    bg: "bg-fuchsia-500/10",
    ring: "border-fuchsia-500/40",
  },
};
