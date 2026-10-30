import { describe, it, expect, beforeEach } from 'vitest';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import { loadSavedKits, saveKitsToStorage } from '../src/services/storageService';
import type { StudyKit } from '../src/types';

describe('User Audit Fixes Verification', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('Bug Fix 1: Eradication of "Science: Core Lecture Concepts" and dummy fallback', () => {
    it('analyzes uploaded video with Gemini file name and custom topic without defaulting to Core Lecture Concepts', async () => {
      const kit = await processEducationalLecture({
        title: 'Chemistry: Chemical Kinetics & Rate Laws',
        subject: 'Chemistry',
        academicClass: 'Class 12',
        chapter: 'Chemical Kinetics & Rate Laws',
        customTopic: 'Chemical Kinetics & Rate Laws',
        noteStyle: 'chatpata',
        language: 'Hinglish',
        sourceType: 'upload',
        sourceIdentifier: 'chemistry_kinetics_lecture.mp4',
        fileSizeFormatted: '7.6 MB',
      });

      expect(kit.subject).toBe('Chemistry');
      expect(kit.chapter).toContain('Chemical Kinetics');
      expect(kit.title).not.toContain('Core Lecture Concepts');

      const chatpata = kit.content.chatpata;
      expect(chatpata).toBeDefined();
      expect(chatpata?.hinglishIntro).not.toContain('Core Lecture Concepts bilkul rocket science nahi hai');
      expect(chatpata?.hinglishIntro).not.toContain('Mummy ne Pocket Money di (dQ = ₹1000)');
    });

    it('generates authentic, grounded Biology notes from uploaded lecture file', async () => {
      const kit = await processEducationalLecture({
        title: 'Biology: Molecular Basis of Inheritance',
        subject: 'Biology',
        academicClass: 'Class 12',
        chapter: 'Molecular Basis of Inheritance & DNA Replication',
        customTopic: 'DNA Replication',
        noteStyle: 'topper',
        language: 'English',
        sourceType: 'upload',
        sourceIdentifier: 'lecture_video_biology_ch6.mp4',
        fileSizeFormatted: '12.4 MB',
      });

      expect(kit.subject).toBe('Biology');
      expect(kit.title).not.toContain('Core Lecture Concepts');
      expect(kit.content.topper).toBeDefined();
      const contentStr = JSON.stringify(kit.content);
      expect(contentStr).toContain('DNA');
      expect(contentStr).not.toContain('Carnot Cycle');
    });

    it('handles generic custom topic dynamically without falling into Thermodynamics', async () => {
      const kit = await processEducationalLecture({
        title: 'Computer Science: Binary Search Trees',
        subject: 'Data Structures & Algorithms',
        academicClass: 'College / B.Tech',
        chapter: 'Binary Search Trees & Traversal',
        customTopic: 'Binary Search Trees & Traversal',
        noteStyle: 'quick',
        language: 'English',
        sourceType: 'upload',
        sourceIdentifier: 'cs_binary_search_lecture.mp4',
        fileSizeFormatted: '15.2 MB',
      });

      expect(kit.subject).toBe('Data Structures & Algorithms');
      expect(kit.chapter).toContain('Binary Search');
      expect(kit.title).not.toContain('Core Lecture Concepts');
      const contentStr = JSON.stringify(kit.content);
      expect(contentStr).not.toContain('dQ = dU + dW');
    });
  });

  describe('Bug Fix 2: User Dashboard Data Isolation and Accurate Count', () => {
    it('returns empty array for a freshly registered user with 0 converted kits', () => {
      const freshUserId = 'user_abdul_wajid_fresh';
      const userKits = loadSavedKits(freshUserId);

      expect(userKits).toEqual([]);
      expect(userKits.length).toBe(0);
    });

    it('does not leak unowned or guest kits into user storage', () => {
      const guestKit: StudyKit = {
        id: 'guest-kit-1',
        title: 'Guest Note',
        subject: 'Physics',
        academicClass: 'Class 12',
        chapter: 'Kinematics',
        duration: '20 mins',
        dateCreated: '2026-10-30',
        noteStyle: 'quick',
        language: 'English',
        content: {} as any,
        timestamps: [],
        flashcards: [],
        quiz: [],
        quickRevisionPoints: [],
      };

      const userKit: StudyKit = {
        ...guestKit,
        id: 'user-kit-1',
        userId: 'user_abdul_wajid',
        title: 'Abdul Lecture Note',
      };

      // Save mixed kits with userId
      saveKitsToStorage([guestKit, userKit], 'user_abdul_wajid');

      // Loading for this user should ONLY return userKit
      const loaded = loadSavedKits('user_abdul_wajid');
      expect(loaded.length).toBe(1);
      expect(loaded[0].id).toBe('user-kit-1');
      expect(loaded[0].title).toBe('Abdul Lecture Note');

      // Loading for another user should return empty
      const otherUserLoaded = loadSavedKits('user_other_123');
      expect(otherUserLoaded.length).toBe(0);
    });
  });

  describe('Bug Fix 3: Resilience against Undefined Properties & Non-Thermodynamics Physics', () => {
    it('formatPdfFilename handles undefined/null subject or chapter without throwing', async () => {
      const { formatPdfFilename } = await import('../src/services/pdfExportService');
      expect(() => formatPdfFilename(undefined as any, undefined as any)).not.toThrow();
      expect(formatPdfFilename(undefined as any, undefined as any)).toBe('Study_Notes.pdf');
      expect(formatPdfFilename(null as any, null as any, 'topper')).toBe('Study_Notes_TOPPER.pdf');
    });

    it('mapSupabaseRowToKit populates robust fallbacks for null row properties', async () => {
      const { mapSupabaseRowToKit } = await import('../src/services/supabaseService');
      const mapped = mapSupabaseRowToKit({
        id: 'test-row-1',
        title: null as any,
        subject: null as any,
        academic_class: null as any,
        chapter: null as any,
        duration: null as any,
        video_url: null,
        file_name: null,
        file_size: null,
        date_created: '2026-10-30',
        note_style: null as any,
        language: null as any,
        content: null,
        timestamps: null,
        flashcards: null,
        quiz: null,
        quick_revision_points: null,
      });

      expect(mapped.title).toBe('Untitled Lecture');
      expect(mapped.subject).toBe('General');
      expect(mapped.chapter).toBe('Lecture Notes');
      expect(mapped.content).toEqual({});
      expect(mapped.timestamps).toEqual([]);
      expect(mapped.quiz).toEqual([]);
    });

    it('generates authentic Ray Optics notes for Physics without injecting Thermodynamics', async () => {
      const kit = await processEducationalLecture({
        title: 'Physics: Ray Optics & Snell Law',
        subject: 'Physics',
        academicClass: 'Class 12',
        chapter: 'Ray Optics & Snell Law',
        customTopic: 'Ray Optics & Snell Law',
        noteStyle: 'topper',
        language: 'English',
        sourceType: 'upload',
        sourceIdentifier: 'physics_ray_optics_lecture.mp4',
        fileSizeFormatted: '8.4 MB',
      });

      expect(kit.subject).toBe('Physics');
      expect(kit.chapter).toBe('Ray Optics & Snell Law');
      const contentStr = JSON.stringify(kit.content);
      expect(contentStr).not.toContain('Carnot Cycle');
      expect(contentStr).not.toContain('Kelvin-Planck');
      expect(contentStr).not.toContain('dQ = dU + dW');
    });
  });

  describe('Bug Fix 4: AI Non-Study Content Rejection Gate', () => {
    it('detects gaming video as non-study material and throws NOT_STUDY_MATERIAL error', async () => {
      const { analyzeEducationalMedia, LectureAnalysisError } = await import('../src/services/videoAnalysisService');
      
      await expect(
        analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: 'gta_5_gameplay_funny_moments.mp4',
        })
      ).rejects.toThrowError(LectureAnalysisError);

      try {
        await analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: 'minecraft_survival_walkthrough.mp4',
        });
      } catch (err: any) {
        expect(err.code).toBe('NOT_STUDY_MATERIAL');
        expect(err.message).toContain('This is not study material');
      }
    });

    it('detects music video and movie trailer as non-study material', async () => {
      const { analyzeEducationalMedia } = await import('../src/services/videoAnalysisService');

      await expect(
        analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: 'taylor_swift_official_music_video.mp4',
        })
      ).rejects.toThrow('This is not study material');

      await expect(
        analyzeEducationalMedia({
          sourceType: 'link',
          sourceIdentifier: 'https://www.youtube.com/watch?v=movie_official_trailer_2026',
        })
      ).rejects.toThrow('This is not study material');
    });

    it('does NOT reject academic topics that contain words like game theory or music theory', async () => {
      const { analyzeEducationalMedia } = await import('../src/services/videoAnalysisService');

      const result = await analyzeEducationalMedia({
        sourceType: 'upload',
        sourceIdentifier: 'economics_lecture_game_theory_nash_equilibrium.mp4',
        customTopic: 'Game Theory & Nash Equilibrium',
      });

      expect(result).toBeDefined();
      expect(result.subject).toBe('Economics');
    });

    it('detects gemini_generated_video as non-study material and rejects it', async () => {
      const { analyzeEducationalMedia } = await import('../src/services/videoAnalysisService');

      await expect(
        analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: 'gemini_generated_video_3d9252f1.mp4',
        })
      ).rejects.toThrow('This is not study material');
    });
  });

  describe('Bug Fix 5: Automatic Accountancy Subject & Journal Entries Detection', () => {
    it('analyzes Class 11 Accountancy Journal Entry video and produces genuine Accountancy notes', async () => {
      const kit = await processEducationalLecture({
        title: 'Accountancy: 4 Steps to Solve ANY Journal Entry Class 11 Accountancy',
        subject: 'Accountancy',
        academicClass: 'Class 11',
        stream: 'Commerce',
        chapter: '4 Steps to Solve ANY Journal Entry Class 11 Accountancy',
        customTopic: '4 Steps to Solve ANY Journal Entry Class 11 Accountancy',
        noteStyle: 'topper',
        language: 'Hinglish',
        sourceType: 'upload',
        sourceIdentifier: 'vidssave.com 4 Steps to Solve ANY Journal Entry Class 11 Accountancy 720P.mp4',
        fileSizeFormatted: '10.9 MB',
      });

      expect(kit.subject).toBe('Accountancy');
      expect(kit.academicClass).toBe('Class 11');
      expect(kit.stream).toBe('Commerce');

      const contentStr = JSON.stringify(kit.content);
      // Must contain authentic Accountancy concepts
      expect(contentStr).toContain('Journal Entry');
      expect(contentStr).toContain('Debit');
      expect(contentStr).toContain('Credit');
      expect(contentStr).toContain('Golden Rules');
      expect(contentStr).toContain('Trade Discount');

      // Must NOT contain Physics, Thermodynamics, or Economics
      expect(contentStr).not.toContain('Thermodynamics');
      expect(contentStr).not.toContain('Carnot');
      expect(contentStr).not.toContain('Marginal Propensity to Consume');
      expect(contentStr).not.toContain('Aggregate Demand');
    });

    it('detects Accountancy and Class 11 automatically from source filename', async () => {
      const { detectLectureMetadataFromSource } = await import('../src/services/aiProcessingService');
      const meta = detectLectureMetadataFromSource(
        'vidssave.com 4 Steps to Solve ANY Journal Entry Class 11 Accountancy 720P.mp4',
        'upload',
        'vidssave.com 4 Steps to Solve ANY Journal Entry Class 11 Accountancy 720P'
      );

      expect(meta.subject).toBe('Accountancy');
      expect(meta.academicClass).toBe('Class 11');
      expect(meta.stream).toBe('Commerce');
    });
  });
});


