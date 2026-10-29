import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { StudyKit } from '../types';
import type { QuizAttemptRecord } from './storageService';

export interface SupabaseStudyKitRow {
  id: string;
  user_id?: string | null;
  title: string;
  subject: string;
  academic_class: string;
  chapter: string;
  duration: string;
  video_url: string | null;
  file_name: string | null;
  file_size: string | null;
  date_created: string;
  note_style: string;
  language: string;
  content: any;
  timestamps: any;
  flashcards: any;
  quiz: any;
  quick_revision_points: any;
  created_at?: string;
}

export interface SupabaseQuizAttemptRow {
  id: string;
  user_id?: string | null;
  kit_id: string;
  kit_title: string;
  timestamp: string;
  score: number;
  total: number;
  percentage: number;
  weak_topics: string[];
  created_at?: string;
}

// Convert StudyKit to Supabase Row
export function mapKitToSupabaseRow(kit: StudyKit, userId?: string | null): SupabaseStudyKitRow {
  return {
    id: kit.id,
    user_id: userId || kit.userId || null,
    title: kit.title,
    subject: kit.subject,
    academic_class: kit.academicClass,
    chapter: kit.chapter,
    duration: kit.duration,
    video_url: kit.videoUrl || null,
    file_name: kit.fileName || null,
    file_size: kit.fileSize || null,
    date_created: kit.dateCreated,
    note_style: kit.noteStyle,
    language: kit.language,
    content: kit.content,
    timestamps: kit.timestamps,
    flashcards: kit.flashcards,
    quiz: kit.quiz,
    quick_revision_points: kit.quickRevisionPoints,
  };
}

// Convert Supabase Row to StudyKit
export function mapSupabaseRowToKit(row: SupabaseStudyKitRow): StudyKit {
  return {
    id: row.id,
    userId: row.user_id || undefined,
    title: row.title,
    subject: row.subject as any,
    academicClass: row.academic_class as any,
    chapter: row.chapter,
    duration: row.duration,
    videoUrl: row.video_url || undefined,
    fileName: row.file_name || undefined,
    fileSize: row.file_size || undefined,
    dateCreated: row.date_created,
    noteStyle: row.note_style as any,
    language: row.language as any,
    content: row.content,
    timestamps: row.timestamps || [],
    flashcards: row.flashcards || [],
    quiz: row.quiz || [],
    quickRevisionPoints: row.quick_revision_points || [],
  };
}

// Fetch all Study Kits from Supabase
export async function fetchStudyKitsFromSupabase(): Promise<{ data: StudyKit[] | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('study_kits')
      .select('*')
      .order('date_created', { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    if (!data || data.length === 0) {
      return { data: [], error: null };
    }

    const kits: StudyKit[] = data.map(mapSupabaseRowToKit);
    return { data: kits, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error('Failed to fetch from Supabase') };
  }
}

// Upsert a StudyKit to Supabase
export async function syncStudyKitToSupabase(kit: StudyKit, userId?: string | null): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    let effectiveUserId: string | null | undefined = userId || kit.userId;
    if (!effectiveUserId) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        effectiveUserId = authData?.user?.id || undefined;
      } catch {
        effectiveUserId = undefined;
      }
    }

    const row = mapKitToSupabaseRow(kit, effectiveUserId);
    const { error } = await supabase
      .from('study_kits')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.warn('[Libnotes Supabase] Upsert error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn('[Libnotes Supabase] Network error syncing kit:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// Fetch Quiz Attempts from Supabase
export async function fetchQuizAttemptsFromSupabase(): Promise<{ data: QuizAttemptRecord[] | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    if (!data || data.length === 0) {
      return { data: [], error: null };
    }

    const attempts: QuizAttemptRecord[] = data.map((row: SupabaseQuizAttemptRow) => ({
      id: row.id,
      kitId: row.kit_id,
      kitTitle: row.kit_title,
      timestamp: row.timestamp,
      score: row.score,
      total: row.total,
      percentage: row.percentage,
      weakTopics: row.weak_topics || [],
    }));

    return { data: attempts, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error('Failed to fetch quiz attempts') };
  }
}

// Save Quiz Attempt to Supabase
export async function syncQuizAttemptToSupabase(attempt: QuizAttemptRecord, userId?: string | null): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    let effectiveUserId = userId;
    if (!effectiveUserId) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        effectiveUserId = authData?.user?.id || null;
      } catch {
        effectiveUserId = null;
      }
    }

    const row: SupabaseQuizAttemptRow = {
      id: attempt.id,
      user_id: effectiveUserId,
      kit_id: attempt.kitId,
      kit_title: attempt.kitTitle,
      timestamp: attempt.timestamp,
      score: attempt.score,
      total: attempt.total,
      percentage: attempt.percentage,
      weak_topics: attempt.weakTopics,
    };

    const { error } = await supabase
      .from('quiz_attempts')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.warn('[Libnotes Supabase] Quiz attempt sync error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn('[Libnotes Supabase] Network error syncing quiz attempt:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

