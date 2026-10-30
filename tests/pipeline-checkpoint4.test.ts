import { describe, it, expect } from 'vitest';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import { analyzeEducationalMedia, LectureAnalysisError } from '../src/services/videoAnalysisService';

describe('LIBNOTES — CHECKPOINT 4: Complete Video, Audio & Link Processing Pipeline Audit', () => {
  // =========================================================================
  // PHASE 3: REAL MEDIA PROCESSING TESTS (RECORDING A, B, C)
  // =========================================================================
  describe('Phase 3: Real Media Subject Relevance & Differentiation', () => {
    it('Recording A (Physics): analyzes Laws of Motion and generates grounded Newtonian dynamics notes', async () => {
      const kitA = await processEducationalLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Physics_Laws_of_Motion_Lecture.mp4',
        customTopic: 'Laws of Motion',
        noteStyle: 'topper',
        language: 'English',
        fileSizeFormatted: '45.2 MB',
      });

      expect(kitA.subject).toBe('Physics');
      expect(kitA.academicClass).toBe('Class 11');
      expect(kitA.title).toContain('Laws of Motion');

      // Transcript verification
      const transcript = kitA.verifiedLecture?.fullTranscript || '';
      expect(transcript.toLowerCase()).toContain('newton');
      expect(transcript.toLowerCase()).toContain('inertia');
      expect(transcript.toLowerCase()).toContain('momentum');
      expect(transcript.toLowerCase()).toContain('friction');

      // Formula verification
      const formulas = kitA.verifiedLecture?.formulasExtracted || [];
      const formulaNames = formulas.map((f) => f.name.toLowerCase()).join(' ');
      expect(formulaNames).toContain('second law');
      expect(formulaNames).toContain('friction');

      // Note content verification: Must NOT contain Thermodynamics or generic placeholders
      expect(JSON.stringify(kitA.content)).not.toContain('Carnot');
      expect(JSON.stringify(kitA.content)).not.toContain('R = f(X, Y, Z)');
      expect(JSON.stringify(kitA.content)).toContain('F = dp/dt');
    });

    it('Recording B (Biology): analyzes Photosynthesis and generates genuine chloroplast & Calvin cycle notes', async () => {
      const kitB = await processEducationalLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Biology_Photosynthesis_Light_Reactions_Calvin_Cycle.mp4',
        customTopic: 'Photosynthesis',
        noteStyle: 'topper',
        language: 'English',
        fileSizeFormatted: '62.1 MB',
      });

      expect(kitB.subject).toBe('Biology');
      expect(kitB.title).toContain('Photosynthesis');

      // Transcript verification
      const transcript = kitB.verifiedLecture?.fullTranscript || '';
      expect(transcript.toLowerCase()).toContain('chloroplast');
      expect(transcript.toLowerCase()).toContain('calvin');
      expect(transcript.toLowerCase()).toContain('rubisco');
      expect(transcript.toLowerCase()).toContain('thylakoid');

      // Formula verification
      const formulas = kitB.verifiedLecture?.formulasExtracted || [];
      const formulaNames = formulas.map((f) => f.name.toLowerCase()).join(' ');
      expect(formulaNames).toContain('photolysis');
      expect(formulaNames).toContain('calvin');

      // Note content verification: Must NOT contain DNA replication or Central Dogma
      expect(JSON.stringify(kitB.content)).not.toContain('Meselson');
      expect(JSON.stringify(kitB.content)).toContain('RuBisCO');
      expect(JSON.stringify(kitB.content)).toContain('18 ATP');
    });

    it('Recording C (Mathematics): analyzes Quadratic Equations and generates standard form & discriminant notes', async () => {
      const kitC = await processEducationalLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Math_Class10_Quadratic_Equations_Roots.mp4',
        customTopic: 'Quadratic Equations',
        noteStyle: 'topper',
        language: 'English',
        fileSizeFormatted: '38.4 MB',
      });

      expect(kitC.subject).toBe('Mathematics');
      expect(kitC.academicClass).toBe('Class 10');
      expect(kitC.title).toContain('Quadratic Equations');

      // Transcript verification
      const transcript = kitC.verifiedLecture?.fullTranscript || '';
      expect(transcript.toLowerCase()).toContain('quadratic');
      expect(transcript.toLowerCase()).toContain('discriminant');
      expect(transcript.toLowerCase()).toContain('sridharacharya');
      expect(transcript.toLowerCase()).toContain('roots');

      // Formula verification
      const formulas = kitC.verifiedLecture?.formulasExtracted || [];
      const formulaNames = formulas.map((f) => f.name.toLowerCase()).join(' ');
      expect(formulaNames).toContain('discriminant');
      expect(formulaNames).toContain('quadratic solution');

      // Note content verification: Must NOT contain Calculus or Integrals
      expect(JSON.stringify(kitC.content)).not.toContain('d/dx');
      expect(JSON.stringify(kitC.content)).toContain('b² - 4ac');
      expect(JSON.stringify(kitC.content)).toContain('Sridharacharya');
    });

    it('Phase 2 & 3 Comparison: Confirms distinct transcripts, definitions, and zero cross-contamination', async () => {
      const [kitPhysics, kitBio, kitMath] = await Promise.all([
        processEducationalLecture({
          sourceType: 'upload',
          sourceIdentifier: 'Physics_Newton_Laws.mp4',
          customTopic: 'Laws of Motion',
          noteStyle: 'quick',
          language: 'English',
        }),
        processEducationalLecture({
          sourceType: 'upload',
          sourceIdentifier: 'Bio_Photosynthesis_Lecture.mp4',
          customTopic: 'Photosynthesis',
          noteStyle: 'quick',
          language: 'English',
        }),
        processEducationalLecture({
          sourceType: 'upload',
          sourceIdentifier: 'Math_Quadratic_Lecture.mp4',
          customTopic: 'Quadratic Equations',
          noteStyle: 'quick',
          language: 'English',
        }),
      ]);

      // All three lecture IDs and kit IDs must be strictly unique
      expect(kitPhysics.id).not.toBe(kitBio.id);
      expect(kitBio.id).not.toBe(kitMath.id);
      expect(kitPhysics.lectureId).not.toBe(kitBio.lectureId);
      expect(kitBio.lectureId).not.toBe(kitMath.lectureId);

      // Transcripts must be completely distinct
      expect(kitPhysics.verifiedLecture?.fullTranscript).not.toBe(kitBio.verifiedLecture?.fullTranscript);
      expect(kitBio.verifiedLecture?.fullTranscript).not.toBe(kitMath.verifiedLecture?.fullTranscript);

      // Topic checks
      expect(kitPhysics.verifiedLecture?.topicsCovered[0]).toContain('Inertia');
      expect(kitBio.verifiedLecture?.topicsCovered[0]).toContain('Chloroplast');
      expect(kitMath.verifiedLecture?.topicsCovered[0]).toContain('Quadratic');
    });
  });

  // =========================================================================
  // PHASE 5: HONEST DISCLOSURE WITHOUT FALSE VISUAL CLAIMS
  // =========================================================================
  describe('Phase 5: Visual Content & Honest Disclosure', () => {
    it('discloses audio transcript verification without falsely claiming blackboard inspection', async () => {
      const verified = await analyzeEducationalMedia({
        sourceType: 'upload',
        sourceIdentifier: 'Physics_Laws_of_Motion.mp4',
        customTopic: 'Laws of Motion',
      });

      expect(verified.visualEvidenceDisclosed).toBe('Audio speech-to-text transcript verified');
      expect(verified.visualEvidenceDisclosed).not.toContain('Visual blackboard');
    });

    it('discloses link stream audio transcript verification honestly', async () => {
      const verified = await analyzeEducationalMedia({
        sourceType: 'link',
        sourceIdentifier: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        customTopic: 'Photosynthesis',
      });

      expect(verified.visualEvidenceDisclosed).toBe('Audio transcript & verified lecture source grounded');
      expect(verified.visualEvidenceDisclosed).not.toContain('Visual inspection active');
    });
  });

  // =========================================================================
  // PHASE 6 & 8: FAILURE HANDLING & EDUCATIONAL LINK VALIDATION
  // =========================================================================
  describe('Phase 6 & 8: Educational Link Processing & Failure Handling', () => {
    it('rejects empty or whitespace-only source identifier', async () => {
      await expect(
        analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: '   ',
        })
      ).rejects.toThrowError(LectureAnalysisError);
    });

    it('rejects corrupted or undecodable media files', async () => {
      await expect(
        analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: 'corrupt_stream_lecture_unreadable.mp4',
        })
      ).rejects.toThrowError(/Audio extraction failed/);
    });

    it('rejects unsupported or offline streaming URLs', async () => {
      await expect(
        analyzeEducationalMedia({
          sourceType: 'link',
          sourceIdentifier: 'https://blocked-source.stream.com/live',
        })
      ).rejects.toThrowError(/offline, private, or unsupported/);
    });

    it('rejects non-study gaming or entertainment files with danger rejection', async () => {
      await expect(
        analyzeEducationalMedia({
          sourceType: 'upload',
          sourceIdentifier: 'GTA_5_gameplay_walkthrough_part1.mp4',
        })
      ).rejects.toThrow(/not study material/i);
    });
  });

  // =========================================================================
  // PHASE 9: DATABASE AND JOB INTEGRITY
  // =========================================================================
  describe('Phase 9: Database & Job Integrity', () => {
    it('generates unique collision-free job and kit IDs for concurrent requests', async () => {
      const jobs = await Promise.all([
        processEducationalLecture({
          sourceType: 'upload',
          sourceIdentifier: 'Lecture_A.mp4',
          customTopic: 'Laws of Motion',
          noteStyle: 'topper',
          language: 'English',
        }),
        processEducationalLecture({
          sourceType: 'upload',
          sourceIdentifier: 'Lecture_B.mp4',
          customTopic: 'Laws of Motion',
          noteStyle: 'topper',
          language: 'English',
        }),
        processEducationalLecture({
          sourceType: 'upload',
          sourceIdentifier: 'Lecture_C.mp4',
          customTopic: 'Laws of Motion',
          noteStyle: 'topper',
          language: 'English',
        }),
      ]);

      const kitIds = new Set(jobs.map((j) => j.id));
      const lectureIds = new Set(jobs.map((j) => j.lectureId));

      expect(kitIds.size).toBe(3);
      expect(lectureIds.size).toBe(3);
    });
  });
});
