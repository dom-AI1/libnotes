import { describe, it, expect } from 'vitest';
import { supabase, isSupabaseConfigured } from '../src/services/supabaseClient';
import { mapKitToSupabaseRow, mapSupabaseRowToKit } from '../src/services/supabaseService';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';

describe('Checkpoint 19: Supabase Cloud Database Integration', () => {
  it('initializes Supabase client with user project URL and publishable key', () => {
    expect(isSupabaseConfigured()).toBe(true);
    expect(supabase).toBeDefined();
    // @ts-expect-error - internal url check
    const clientUrl = supabase.supabaseUrl;
    expect(clientUrl).toBe('https://vidbiyemknmkfswiucsr.supabase.co');
  });

  it('correctly maps StudyKit domain model to and from Supabase table rows', () => {
    const originalKit = SAMPLE_STUDY_KITS[0];
    const row = mapKitToSupabaseRow(originalKit);

    expect(row.id).toBe(originalKit.id);
    expect(row.title).toBe(originalKit.title);
    expect(row.subject).toBe(originalKit.subject);
    expect(row.academic_class).toBe(originalKit.academicClass);
    expect(row.note_style).toBe(originalKit.noteStyle);
    expect(row.content).toBeDefined();

    // Reconstruct kit from row
    const restoredKit = mapSupabaseRowToKit(row);
    expect(restoredKit.id).toBe(originalKit.id);
    expect(restoredKit.chapter).toBe(originalKit.chapter);
    expect(restoredKit.subject).toBe(originalKit.subject);
    expect(restoredKit.quickRevisionPoints.length).toBe(originalKit.quickRevisionPoints.length);
  });
});

