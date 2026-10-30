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
        sourceIdentifier: 'gemini_generated_video_3d9252f1.mp4',
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
        sourceIdentifier: 'gemini_generated_video_3d9252f1.mp4',
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
});

