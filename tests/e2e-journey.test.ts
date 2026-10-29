import { describe, it, expect } from 'vitest';
import { processEducationalLecture, ProcessingProgressEvent } from '../src/services/aiProcessingService';
import { validateEducationalFile } from '../src/utils/fileValidation';
import { validateLectureUrl } from '../src/utils/urlValidation';
import { calculateQuizScore } from '../src/utils/quizScoring';
import { saveKitsToStorage, loadSavedKits, saveQuizAttempt, loadQuizAttempts } from '../src/services/storageService';
import type { StudyKit } from '../src/types';

describe('Checkpoint 15: Final End-to-End Acceptance Journey', () => {
  it('executes full educational user journey successfully step-by-step', async () => {
    // 1. Initial State
    const initialKits = loadSavedKits();
    expect(initialKits.length).toBeGreaterThanOrEqual(3);

    // 2. Select and Validate Supported Video File
    const sampleVideoFile = new File(['binary video stream'], 'Class12_Thermodynamics_Lecture.mp4', {
      type: 'video/mp4',
    });
    const fileCheck = validateEducationalFile(sampleVideoFile);
    expect(fileCheck.valid).toBe(true);

    // 3. Select Parameters & Generate Study Material through Pipeline
    const progressLog: ProcessingProgressEvent[] = [];
    const generatedKit = await processEducationalLecture(
      {
        title: 'Physics: Laws of Heat Engines',
        subject: 'Physics',
        academicClass: 'Class 12',
        chapter: 'Laws of Heat Engines',
        noteStyle: 'topper',
        language: 'Hinglish',
        sourceType: 'upload',
        sourceIdentifier: sampleVideoFile.name,
        fileSizeFormatted: fileCheck.formattedSize,
      },
      (p) => progressLog.push(p)
    );

    // 4. Verify Pipeline Steps and Progress
    expect(progressLog.length).toBeGreaterThanOrEqual(4);
    expect(progressLog[progressLog.length - 1].percentage).toBe(100);
    expect(generatedKit.content.topper.deepDive.length).toBeGreaterThan(0);

    // 5. Save Lecture into Storage
    saveKitsToStorage([generatedKit, ...initialKits]);
    const storedKits = loadSavedKits();
    expect(storedKits[0].id).toBe(generatedKit.id);

    // 6. Switch to Exam Mode
    expect(generatedKit.content.exam.questions.length).toBeGreaterThan(0);
    expect(generatedKit.content.exam.questions[0].marks).toBeDefined();

    // 7. Answer Quiz Questions and Verify Programmatic Score (e.g. 2 of 3 correct)
    const userAnswers: Record<number, number> = {
      0: generatedKit.quiz[0].correctIndex, // Correct
      1: (generatedKit.quiz[1].correctIndex + 1) % 4, // Incorrect on purpose
      2: generatedKit.quiz[2].correctIndex, // Correct
    };

    const quizScoreResult = calculateQuizScore(generatedKit.quiz, userAnswers);
    expect(quizScoreResult.score).toBe(2);
    expect(quizScoreResult.total).toBe(3);
    expect(quizScoreResult.percentage).toBe(67);
    expect(quizScoreResult.weakTopics).toEqual([generatedKit.quiz[1].topic]);

    // 8. Record Quiz Attempt
    saveQuizAttempt({
      id: `attempt-${Date.now()}`,
      kitId: generatedKit.id,
      kitTitle: generatedKit.title,
      timestamp: '5:15 PM',
      score: quizScoreResult.score,
      total: quizScoreResult.total,
      percentage: quizScoreResult.percentage,
      weakTopics: quizScoreResult.weakTopics,
    });

    const recordedAttempts = loadQuizAttempts();
    expect(recordedAttempts.some(a => a.kitId === generatedKit.id)).toBe(true);

    // 9. Verify Smart Timestamps Mapping
    expect(generatedKit.timestamps.length).toBeGreaterThanOrEqual(3);
    const firstStamp = generatedKit.timestamps[0];
    expect(firstStamp.seconds).toBe(90);
    expect(firstStamp.time).toBe('01:30');

    // 10. Failure Scenario: Invalid file rejected
    const badFile = new File(['text'], 'homework.pdf', { type: 'application/pdf' });
    const badCheck = validateEducationalFile(badFile);
    expect(badCheck.valid).toBe(false);

    // 11. Failure Scenario: Unsafe internal SSRF URL rejected
    const badUrl = validateLectureUrl('http://192.168.1.1/internal-lecture');
    expect(badUrl.valid).toBe(false);
  });
});
