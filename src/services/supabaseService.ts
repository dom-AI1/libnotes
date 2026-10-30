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
    title: row.title || 'Untitled Lecture',
    subject: (row.subject || 'General') as any,
    academicClass: (row.academic_class || 'Class 12') as any,
    chapter: row.chapter || 'Lecture Notes',
    duration: row.duration || '30 mins',
    videoUrl: row.video_url || undefined,
    fileName: row.file_name || undefined,
    fileSize: row.file_size || undefined,
    dateCreated: row.date_created || new Date().toISOString(),
    noteStyle: (row.note_style || 'topper') as any,
    language: (row.language || 'English') as any,
    content: row.content || {},
    timestamps: Array.isArray(row.timestamps) ? row.timestamps : [],
    flashcards: Array.isArray(row.flashcards) ? row.flashcards : [],
    quiz: Array.isArray(row.quiz) ? row.quiz : [],
    quickRevisionPoints: Array.isArray(row.quick_revision_points) ? row.quick_revision_points : [],
  };
}

// Fetch Study Kits from Supabase (scoped to user when provided)
export async function fetchStudyKitsFromSupabase(userId?: string): Promise<{ data: StudyKit[] | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  try {
    let query = supabase
      .from('study_kits')
      .select('*')
      .order('date_created', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

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
      // Backward compatibility: If remote Supabase schema has not run user_id migration yet, retry without user_id
      if (error.message && error.message.includes('user_id') && error.message.includes('schema cache')) {
        const fallbackRow = { ...row };
        delete (fallbackRow as any).user_id;
        const { error: retryError } = await supabase
          .from('study_kits')
          .upsert(fallbackRow, { onConflict: 'id' });
        if (!retryError) {
          return { success: true };
        }
      }
      console.warn('[Libnotes Supabase] Upsert error:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn('[Libnotes Supabase] Network error syncing kit:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// Fetch Quiz Attempts from Supabase (scoped to user when provided)
export async function fetchQuizAttemptsFromSupabase(userId?: string): Promise<{ data: QuizAttemptRecord[] | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase is not configured') };
  }

  try {
    let query = supabase
      .from('quiz_attempts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    if (!data || data.length === 0) {
      return { data: [], error: null };
    }

    const attempts: QuizAttemptRecord[] = data.map((row: SupabaseQuizAttemptRow) => ({
      id: row.id,
      userId: row.user_id || undefined,
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
    let effectiveUserId: string | null | undefined = userId || attempt.userId;
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
