import type { StudyKit } from '../types';
import { SAMPLE_STUDY_KITS } from '../data/mockData';
import { syncQuizAttemptToSupabase } from './supabaseService';

const STORAGE_KEY_KITS = 'libnotes_study_kits_v2';
const LEGACY_STORAGE_KEY_KITS = 'noteai_study_kits_v2';
const STORAGE_KEY_QUIZZES = 'libnotes_quiz_attempts_v2';
const LEGACY_STORAGE_KEY_QUIZZES = 'noteai_quiz_attempts_v2';

export interface QuizAttemptRecord {
  id: string;
  userId?: string;
  kitId: string;
  kitTitle: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  weakTopics: string[];
}

export function loadSavedKits(userId?: string): StudyKit[] {
  try {
    if (userId) {
      const userKey = `${STORAGE_KEY_KITS}_${userId}`;
      const rawUser = localStorage.getItem(userKey);
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (Array.isArray(parsed)) return parsed;
      }

      // Check general storage filtered by userId
      const raw = localStorage.getItem(STORAGE_KEY_KITS) || localStorage.getItem(LEGACY_STORAGE_KEY_KITS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const matching = parsed.filter((k: StudyKit) => k.userId === userId);
          return matching;
        }
      }

      // Fresh authenticated user has 0 kits
      return [];
    }

    // Guest / unauthenticated visitor loads sample kits
    const raw = localStorage.getItem(STORAGE_KEY_KITS) || localStorage.getItem(LEGACY_STORAGE_KEY_KITS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Libnotes Storage] Failed to load kits from localStorage', err);
  }
  return SAMPLE_STUDY_KITS;
}

export function saveKitsToStorage(kits: StudyKit[], userId?: string): boolean {
  try {
    if (userId) {
      const userKey = `${STORAGE_KEY_KITS}_${userId}`;
      const userKits = kits.filter((k) => !k.userId || k.userId === userId);
      localStorage.setItem(userKey, JSON.stringify(userKits));
    }
    localStorage.setItem(STORAGE_KEY_KITS, JSON.stringify(kits));
    return true;
  } catch (err) {
    console.error('[Libnotes Storage] Failed to persist kits to localStorage', err);
    return false;
  }
}

export function loadQuizAttempts(userId?: string): QuizAttemptRecord[] {
  try {
    if (userId) {
      const userKey = `${STORAGE_KEY_QUIZZES}_${userId}`;
      const rawUser = localStorage.getItem(userKey);
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (Array.isArray(parsed)) return parsed;
      }

      const raw = localStorage.getItem(STORAGE_KEY_QUIZZES) || localStorage.getItem(LEGACY_STORAGE_KEY_QUIZZES);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((a: QuizAttemptRecord) => a.userId === userId);
        }
      }
      return [];
    }

    const raw = localStorage.getItem(STORAGE_KEY_QUIZZES) || localStorage.getItem(LEGACY_STORAGE_KEY_QUIZZES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('[Libnotes Storage] Failed to load quiz attempts', err);
  }

  // Only return sample mock for unauthenticated visitors
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

export function saveQuizAttempt(attempt: QuizAttemptRecord, userId?: string): boolean {
  try {
    const effectiveUserId = userId || attempt.userId;
    const attemptWithUser = { ...attempt, userId: effectiveUserId };

    if (effectiveUserId) {
      const userKey = `${STORAGE_KEY_QUIZZES}_${effectiveUserId}`;
      const userExisting = loadQuizAttempts(effectiveUserId);
      const updatedUser = [attemptWithUser, ...userExisting];
      localStorage.setItem(userKey, JSON.stringify(updatedUser));
    }

    const existing = loadQuizAttempts();
    const updated = [attemptWithUser, ...existing.filter((a) => a.id !== attempt.id)];
    localStorage.setItem(STORAGE_KEY_QUIZZES, JSON.stringify(updated));

    // Asynchronously sync attempt to Supabase
    syncQuizAttemptToSupabase(attemptWithUser, effectiveUserId).catch((err) => {
      console.warn('[Libnotes Storage] Supabase quiz attempt sync deferred:', err);
    });
    return true;
  } catch (err) {
    console.error('[Libnotes Storage] Failed to save quiz attempt', err);
    return false;
  }
}
