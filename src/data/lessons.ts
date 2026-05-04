export type Phrase = {
  english: string;
  german: string;
};

export type Lesson = {
  id: string;
  number: string; // e.g. "1.1", "1.2", "2.1"
  title: string;
  description: string;
  icon: string;
  phrases: Phrase[];
};

export const lessons: Lesson[] = [
  // ─── LESSON 1 ────────────────────────────────────────────────────────────────

  {
    id: "1-1",
    number: "1.1",
    title: "First Greetings",
    description: "The first words out of your mouth",
    icon: "👋",
    phrases: [
      { english: "Hello", german: "Hallo" },
      { english: "Hey!", german: "Hey!" },
      { english: "Hi!", german: "Hi!" },
      { english: "Good morning", german: "Guten Morgen" },
      { english: "Good day / Hello", german: "Guten Tag" },
      { english: "Good evening", german: "Guten Abend" },
      { english: "Mr", german: "Herr" },
      { english: "Ms / Mrs", german: "Frau" },
    ],
  },

  {
    id: "1-2",
    number: "1.2",
    title: "How Are You?",
    description: "Master small talk in German",
    icon: "🙂",
    phrases: [
      { english: "How are you? (informal)", german: "Wie geht es dir?" },
      { english: "How are you? (formal)", german: "Wie geht es Ihnen?" },
      { english: "I'm doing well.", german: "Es geht mir gut." },
      { english: "Good / well", german: "gut" },
      { english: "Very good", german: "sehr gut" },
      { english: "Not so good", german: "nicht so gut" },
      { english: "Super / great", german: "super" },
      { english: "Nice / beautiful", german: "schön" },
      { english: "And you? (informal)", german: "Und dir?" },
      { english: "And you? (formal)", german: "Und Ihnen?" },
    ],
  },

  {
    id: "1-3",
    number: "1.3",
    title: "Building Blocks",
    description: "Tiny words that make big sentences",
    icon: "🧱",
    phrases: [
      { english: "Yes", german: "ja" },
      { english: "No", german: "nein" },
      { english: "Please", german: "bitte" },
      { english: "Thanks", german: "danke" },
      { english: "Thank you!", german: "danke schön" },
      { english: "And", german: "und" },
      { english: "Or", german: "oder" },
      { english: "Not", german: "nicht" },
      { english: "Also / too", german: "auch" },
      { english: "Okay", german: "okay" },
    ],
  },

  {
    id: "1-4",
    number: "1.4",
    title: "Goodbye",
    description: "Leave every conversation on a high note",
    icon: "🚪",
    phrases: [
      { english: "Goodbye", german: "Auf Wiedersehen" },
      { english: "Bye", german: "Tschüss" },
      { english: "See you soon", german: "Bis bald" },
      { english: "Take care!", german: "Mach's gut!" },
      { english: "Have a good trip", german: "Gute Reise" },
      { english: "Many thanks!", german: "Vielen Dank!" },
      { english: "No problem", german: "Kein Problem" },
    ],
  },

  {
    id: "1-5",
    number: "1.5",
    title: "Words You Already Know",
    description: "International words — just say them German!",
    icon: "🌍",
    phrases: [
      { english: "hotel", german: "das Hotel" },
      { english: "restaurant", german: "das Restaurant" },
      { english: "taxi", german: "das Taxi" },
      { english: "bus", german: "der Bus" },
      { english: "coffee", german: "der Kaffee" },
      { english: "pizza", german: "die Pizza" },
      { english: "music", german: "die Musik" },
      { english: "computer", german: "der Computer" },
      { english: "email", german: "die E-Mail" },
      { english: "telephone", german: "das Telefon" },
    ],
  },

  {
    id: "1-6",
    number: "1.6",
    title: "Around Town",
    description: "Navigate any German city with confidence",
    icon: "🏙️",
    phrases: [
      { english: "airport", german: "der Flughafen" },
      { english: "bank", german: "die Bank" },
      { english: "office", german: "das Büro" },
      { english: "movie theater", german: "das Kino" },
      { english: "museum", german: "das Museum" },
      { english: "theater", german: "das Theater" },
      { english: "supermarket", german: "der Supermarkt" },
      { english: "university", german: "die Universität" },
      { english: "city center / downtown", german: "das Zentrum" },
      { english: "information", german: "die Information" },
    ],
  },

  {
    id: "1-7",
    number: "1.7",
    title: "People & Jobs",
    description: "Describe the people around you",
    icon: "👥",
    phrases: [
      { english: "man", german: "der Mann" },
      { english: "woman", german: "die Frau" },
      { english: "family", german: "die Familie" },
      { english: "mom", german: "die Mama" },
      { english: "aunt", german: "die Tante" },
      { english: "student (male)", german: "der Student" },
      { english: "student (female)", german: "die Studentin" },
      { english: "pilot (male)", german: "der Pilot" },
      { english: "pilot (female)", german: "die Pilotin" },
      { english: "to study (at university)", german: "studieren" },
    ],
  },

  {
    id: "1-8",
    number: "1.8",
    title: "What's Your Name?",
    description: "Introduce yourself with confidence",
    icon: "🪪",
    phrases: [
      { english: "name", german: "der Name" },
      { english: "My name is...", german: "Mein Name ist..." },
      { english: "What is your name? (informal)", german: "Wie ist dein Name?" },
      { english: "What is your name? (formal)", german: "Wie ist Ihr Name?" },
      { english: "letter (of the alphabet)", german: "der Buchstabe" },
      { english: "to spell", german: "buchstabieren" },
      { english: "Again, please.", german: "Noch einmal bitte." },
      { english: "Slowly, please.", german: "Langsam bitte." },
    ],
  },

  {
    id: "1-9",
    number: "1.9",
    title: "Address & Details",
    description: "Share where you live and ask for details",
    icon: "📍",
    phrases: [
      { english: "address", german: "die Adresse" },
      { english: "street / road", german: "die Straße" },
      { english: "house number", german: "die Hausnummer" },
      { english: "to look for / to search for", german: "suchen" },
      { english: "to fly", german: "fliegen" },
      { english: "bag", german: "die Tasche" },
      { english: "help", german: "die Hilfe" },
      { english: "How do you write/spell that?", german: "Wie schreibt man das?" },
    ],
  },

  {
    id: "1-10",
    number: "1.10",
    title: "Life & Hobbies",
    description: "Talk about what you love doing",
    icon: "🎯",
    phrases: [
      { english: "hobby", german: "das Hobby" },
      { english: "sports / exercise", german: "der Sport" },
      { english: "guitar", german: "die Gitarre" },
      { english: "concert", german: "das Konzert" },
      { english: "culture", german: "die Kultur" },
      { english: "spaghetti", german: "die Spaghetti" },
      { english: "toilet", german: "die Toilette" },
      { english: "example", german: "das Beispiel" },
      { english: "problem", german: "das Problem" },
      { english: "o'clock (time)", german: "Uhr" },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}
