export type NoteStyle = 'quick' | 'topper' | 'chatpata' | 'exam' | 'minimal' | 'chatpate';

export type AcademicClass = 'Class 10' | 'Class 11' | 'Class 12' | 'College / B.Tech' | 'Competitive (JEE/NEET)';

export type AcademicStream =
  | 'General'
  | 'Science'
  | 'Commerce'
  | 'Arts / Humanities'
  | 'Computer Science & Engineering'
  | 'Mechanical Engineering'
  | 'Electrical & Electronics'
  | 'Management / Business'
  | 'JEE (Engineering)'
  | 'NEET (Medical)';

export type Subject =
  // Class 10 Subjects (No separate PCB, single Science & SST)
  | 'Science'
  | 'Social Science (SST)'
  | 'Mathematics'
  | 'English'
  | 'Hindi'
  | 'Information Technology'
  // Class 11 & 12 Science / Competitive
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Computer Science'
  | 'Physical Education'
  // Class 11 & 12 Commerce
  | 'Accountancy'
  | 'Business Studies'
  | 'Economics'
  | 'Applied Mathematics'
  | 'Informatics Practices'
  | 'English Core'
  // Class 11 & 12 Arts / Humanities
  | 'History'
  | 'Political Science'
  | 'Geography'
  | 'Psychology'
  | 'Sociology'
  // College / B.Tech Engineering & Management
  | 'Data Structures & Algorithms'
  | 'Operating Systems'
  | 'Database Management (DBMS)'
  | 'Computer Networks'
  | 'Machine Learning / AI'
  | 'Engineering Mathematics'
  | 'Fluid Mechanics'
  | 'Financial Management'
  | string;

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

export interface TranscriptSegment {
  id: number;
  start: string;
  end: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
  topic?: string;
}

export interface LectureDefinition {
  term: string;
  definition: string;
  timestamp?: string;
  context?: string;
}

export interface LectureFormula {
  name: string;
  formula: string;
  note: string;
  sourceTimestamp?: string;
  verifiedTopic: string;
}

export interface LectureExample {
  title: string;
  problem: string;
  solution: string;
  timestamp?: string;
}

export interface VerifiedLectureRepresentation {
  lectureId: string;
  originalTitle: string;
  academicClass: AcademicClass;
  subject: Subject;
  stream?: string;
  chapter: string;
  sourceType: 'upload' | 'link';
  sourceIdentifier: string;
  durationFormatted: string;
  fullTranscript: string;
  segments: TranscriptSegment[];
  topicsCovered: string[];
  definitionsFound: LectureDefinition[];
  formulasExtracted: LectureFormula[];
  examplesDemonstrated: LectureExample[];
  importantExplanations: string[];
  visualEvidenceDisclosed?: string;
  missingOrUnclearSections?: string[];
  verifiedAt: string;
  qualityScore?: number;
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
  userId?: string;
  lectureId?: string;
  title: string;
  subject: Subject;
  academicClass: AcademicClass;
  stream?: string;
  autoDetected?: boolean;
  chapter: string;
  duration: string;
  videoUrl?: string;
  fileName?: string;
  fileSize?: string;
  dateCreated: string;
  noteStyle: NoteStyle;
  language: Language;
  verifiedLecture?: VerifiedLectureRepresentation;
  
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
