export type NoteStyle = 'quick' | 'topper' | 'chatpata' | 'exam' | 'minimal' | 'chatpate';

export type AcademicClass = 'Class 10' | 'Class 11' | 'Class 12' | 'College / B.Tech' | 'Competitive (JEE/NEET)';

export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'Computer Science';

export type Language = 'English' | 'Hinglish' | 'Hindi';

export interface TimestampConcept {
  time: string;
  seconds: number;
  title: string;
  summary: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface ExamQuestion {
  id: number;
  marks: 1 | 3 | 5;
  question: string;
  answer: string;
  markingScheme: string[];
  frequentlyAskedIn: string;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  concept: string;
}

export interface QuickNotesContent {
  headline: string;
  cheatSheet: string[];
  formulas: { name: string; formula: string; note: string }[];
  bulletSummary: string[];
}

export interface TopperNotesContent {
  introduction: string;
  deepDive: { title: string; timestamp: string; content: string; keyTakeaway: string }[];
  derivations: { title: string; steps: string[]; finalResult: string }[];
  proTips: string[];
}

export interface ChatpataNotesContent {
  hinglishIntro: string;
  desiAnalogies: { concept: string; analogy: string; desiPunchline: string }[];
  bhaiKaSummary: string[];
  jugaadPoints: string[];
}

export interface ExamNotesContent {
  trendAnalysis: string;
  highWeightageTopics: string[];
  questions: ExamQuestion[];
}

export interface StudyKit {
  id: string;
  title: string;
  subject: Subject;
  academicClass: AcademicClass;
  chapter: string;
  duration: string;
  videoUrl?: string;
  fileName?: string;
  fileSize?: string;
  dateCreated: string;
  noteStyle: NoteStyle;
  language: Language;
  
  // Style-specific content
  content: {
    quick?: QuickNotesContent;
    minimal?: QuickNotesContent;
    topper: TopperNotesContent;
    chatpata?: ChatpataNotesContent;
    chatpate?: ChatpataNotesContent;
    exam: ExamNotesContent;
  };

  timestamps: TimestampConcept[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  quickRevisionPoints: string[];
}
