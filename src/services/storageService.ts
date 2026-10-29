import type { StudyKit } from '../types';
import { SAMPLE_STUDY_KITS } from '../data/mockData';
import { syncStudyKitToSupabase, syncQuizAttemptToSupabase } from './supabaseService';

const STORAGE_KEY_KITS = 'libnotes_study_kits_v2';
const LEGACY_STORAGE_KEY_KITS = 'noteai_study_kits_v2';
const STORAGE_KEY_QUIZZES = 'libnotes_quiz_attempts_v2';
const LEGACY_STORAGE_KEY_QUIZZES = 'noteai_quiz_attempts_v2';

export interface QuizAttemptRecord {
  id: string;
  kitId: string;
  kitTitle: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  weakTopics: string[];
}

export function loadSavedKits(): StudyKit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_KITS) || localStorage.getItem(LEGACY_STORAGE_KEY_KITS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Libnotes Storage] Failed to load kits from localStorage, using memory default', err);
  }
  return SAMPLE_STUDY_KITS;
}

export function saveKitsToStorage(kits: StudyKit[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_KITS, JSON.stringify(kits));
    // Asynchronously sync latest kit to Supabase
    if (kits.length > 0) {
      syncStudyKitToSupabase(kits[0]).catch((err) => {
        console.warn('[Libnotes Storage] Supabase sync deferred:', err);
      });
    }
    return true;
  } catch (err) {
    console.error('[Libnotes Storage] Failed to persist kits to localStorage', err);
    return false;
  }
}

export function loadQuizAttempts(): QuizAttemptRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUIZZES) || localStorage.getItem(LEGACY_STORAGE_KEY_QUIZZES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('[Libnotes Storage] Failed to load quiz attempts', err);
  }
  return [
    {
      id: 'attempt-init-1',
      kitId: 'kit-thermodynamics',
      kitTitle: 'Thermodynamics: First Law & Carnot Cycle',
      timestamp: 'Today at 3:45 PM',
      score: 4,
      total: 5,
      percentage: 80,
      weakTopics: ['Second Law of Thermodynamics'],
    },
  ];
}

export function saveQuizAttempt(attempt: QuizAttemptRecord): boolean {
  try {
    const existing = loadQuizAttempts();
    const updated = [attempt, ...existing];
    localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(updated));
    // Asynchronously sync attempt to Supabase
    syncQuizAttemptToSupabase(attempt).catch((err) => {
      console.warn('[Libnotes Storage] Supabase quiz attempt sync deferred:', err);
    });
    return true;
  } catch (err) {
    console.error('[Libnotes Storage] Failed to save quiz attempt', err);
    return false;
  }
}

