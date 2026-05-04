export type Phrase = {
  english: string;
  german: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  icon: string;
  phrases: Phrase[];
};

export const lessons: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings & Basics",
    description: "Essential everyday phrases",
    icon: "👋",
    phrases: [
      { english: "Hello", german: "Hallo" },
      { english: "Goodbye", german: "Auf Wiedersehen" },
      { english: "Please", german: "Bitte" },
      { english: "Thank you", german: "Danke" },
      { english: "Yes", german: "Ja" },
      { english: "No", german: "Nein" },
      { english: "Good morning", german: "Guten Morgen" },
      { english: "Good night", german: "Gute Nacht" },
      { english: "Excuse me", german: "Entschuldigung" },
      { english: "Sorry", german: "Es tut mir leid" },
    ],
  },
  {
    id: "numbers",
    title: "Numbers 1–10",
    description: "Count from one to ten",
    icon: "🔢",
    phrases: [
      { english: "One", german: "Eins" },
      { english: "Two", german: "Zwei" },
      { english: "Three", german: "Drei" },
      { english: "Four", german: "Vier" },
      { english: "Five", german: "Fünf" },
      { english: "Six", german: "Sechs" },
      { english: "Seven", german: "Sieben" },
      { english: "Eight", german: "Acht" },
      { english: "Nine", german: "Neun" },
      { english: "Ten", german: "Zehn" },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    description: "Describe the world around you",
    icon: "🎨",
    phrases: [
      { english: "Red", german: "Rot" },
      { english: "Blue", german: "Blau" },
      { english: "Green", german: "Grün" },
      { english: "Yellow", german: "Gelb" },
      { english: "Black", german: "Schwarz" },
      { english: "White", german: "Weiß" },
      { english: "Orange", german: "Orange" },
      { english: "Purple", german: "Lila" },
      { english: "Pink", german: "Rosa" },
      { english: "Brown", german: "Braun" },
    ],
  },
  {
    id: "common-phrases",
    title: "Common Phrases",
    description: "Useful sentences for daily life",
    icon: "💬",
    phrases: [
      { english: "How are you?", german: "Wie geht es Ihnen?" },
      { english: "I don't understand", german: "Ich verstehe nicht" },
      { english: "Do you speak English?", german: "Sprechen Sie Englisch?" },
      { english: "Where is the toilet?", german: "Wo ist die Toilette?" },
      { english: "How much does it cost?", german: "Wie viel kostet das?" },
      { english: "I would like a coffee", german: "Ich möchte einen Kaffee" },
      { english: "The bill, please", german: "Die Rechnung, bitte" },
      { english: "I am from England", german: "Ich komme aus England" },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
