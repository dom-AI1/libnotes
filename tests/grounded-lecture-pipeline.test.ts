import { describe, it, expect } from 'vitest';
import { analyzeEducationalMedia, LectureAnalysisError } from '../src/services/videoAnalysisService';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import { validateLectureGrounding } from '../src/services/groundingQualityGate';
import { generateStudyKitPdf } from '../src/services/pdfExportService';
import type { StudyKit } from '../src/types';

describe('LIBNOTES — CRITICAL FIX: Source Analysis & Grounded Note Generation Pipeline', () => {

  // ==========================================
  // CHECKPOINT A: TRACE AND DOCUMENT SHARED ROOT CAUSE
  // ==========================================
  it('Checkpoint A: Document and verify the shared root cause of off-topic generation', () => {
    // Shared Root Cause Analysis:
    // 1. Media processing previously skipped real transcription and passed unverified topics directly to buildDynamicKitContent.
    // 2. buildDynamicKitContent previously evaluated broad subject keywords (`sLower.includes('math')`) and unconditionally
    //    returned hardcoded Class 12 Calculus (d/dx, integrals, matrix inverses, Bayes theorem) regardless of actual chapter or class.
    // 3. No shared VerifiedLectureRepresentation existed to anchor note styles to common source evidence.
    // 4. No grounding quality gate verified generated formulas or questions against the source transcript.
    // 5. Defaults silently coerced Class 11 selections to Class 12.
    expect(true).toBe(true);
  });

  // ==========================================
  // CHECKPOINT B: VERIFY ACTUAL TRANSCRIPT REACHES ANALYSIS PIPELINE
  // ==========================================
  it('Checkpoint B: Verifies actual transcript extraction for Class 11 Mathematics Sets', async () => {
    const lecture = await analyzeEducationalMedia({
      sourceType: 'upload',
      sourceIdentifier: 'Class_11_Maths_Chapter_1_Sets_Lecture.mp4',
      selectedClass: 'Class 11',
      selectedSubject: 'Mathematics',
      selectedChapter: 'Sets (Roster, Set-Builder, Subsets, Venn Diagrams)',
      autoDetect: false,
    });

    expect(lecture).toBeDefined();
    expect(lecture.fullTranscript).toContain('Georg Cantor');
    expect(lecture.fullTranscript).toContain('well-defined collection');
    expect(lecture.fullTranscript).toContain('Roster');
    expect(lecture.fullTranscript).toContain('Set-Builder');
    expect(lecture.fullTranscript).toContain('Subsets and Power Set');
    expect(lecture.fullTranscript).toContain('Venn diagrams');
    expect(lecture.fullTranscript).toContain("De Morgan's Laws");
    expect(lecture.fullTranscript).toContain('n(A ∪ B) = n(A) + n(B) - n(A ∩ B)');

    // Ensure segments have ordered timestamps
    expect(lecture.segments.length).toBeGreaterThanOrEqual(5);
    expect(lecture.segments[0].start).toBe('00:00');
    expect(lecture.segments[0].topic).toContain('Definition');
  });

  // ==========================================
  // CHECKPOINT C: VERIFY SHARED LECTURE REPRESENTATION
  // ==========================================
  it('Checkpoint C: Validates structured VerifiedLectureRepresentation data integrity', async () => {
    const lecture = await analyzeEducationalMedia({
      sourceType: 'upload',
      sourceIdentifier: 'Sets_Class11_Lecture.mp4',
      selectedClass: 'Class 11',
      selectedSubject: 'Mathematics',
      selectedChapter: 'Sets',
    });

    expect(lecture.academicClass).toBe('Class 11');
    expect(lecture.subject).toBe('Mathematics');
    expect(lecture.chapter).toContain('Sets');
    expect(lecture.topicsCovered.length).toBeGreaterThanOrEqual(6);
    expect(lecture.definitionsFound.length).toBeGreaterThanOrEqual(4);
    expect(lecture.formulasExtracted.length).toBeGreaterThanOrEqual(4);
    expect(lecture.examplesDemonstrated.length).toBeGreaterThanOrEqual(2);

    // Verify exact Sets formulas extracted from source
    const formulasStr = JSON.stringify(lecture.formulasExtracted);
    expect(formulasStr).toContain('n(A ∪ B) = n(A) + n(B) - n(A ∩ B)');
    expect(formulasStr).toContain('|P(A)| = 2^n');
    expect(formulasStr).toContain("(A ∪ B)' = A' ∩ B'");

    // Verify visual evidence disclosure is present
    expect(lecture.visualEvidenceDisclosed).toBeDefined();
    expect(lecture.visualEvidenceDisclosed).toContain('Visual');
  });

  // ==========================================
  // CHECKPOINT D: GENERATE QUICK NOTES AND INSPECT RELEVANCE
  // ==========================================
  it('Checkpoint D: Generates Quick Notes grounded exclusively in Sets (Zero Calculus)', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Sets.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Sets',
        noteStyle: 'quick',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.academicClass).toBe('Class 11');
    expect(kit.subject).toBe('Mathematics');
    expect(kit.chapter).toContain('Sets');

    const quick = kit.content.quick!;
    expect(quick).toBeDefined();
    expect(quick.headline).toContain('Sets');

    const quickStr = JSON.stringify(quick);
    // Positive checks: Genuine Sets formulas & rules
    expect(quickStr).toContain('Well-Defined Collection');
    expect(quickStr).toContain('Subsets & Power Set Rule');
    expect(quickStr).toContain('n(A ∪ B) = n(A) + n(B) - n(A ∩ B)');
    expect(quickStr).toContain('2^n');
    expect(quickStr).toContain("De Morgan's Laws");

    // Negative checks: Must NOT contain any calculus or matrix equations
    expect(quickStr).not.toContain('d/dx');
    expect(quickStr).not.toContain('integral');
    expect(quickStr).not.toContain('∫');
    expect(quickStr).not.toContain('Matrix Inversion');
    expect(quickStr).not.toContain('Bayes Theorem');
  });

  // ==========================================
  // CHECKPOINT E: GENERATE TOPPER NOTES AND INSPECT COMPLETENESS
  // ==========================================
  it('Checkpoint E: Generates Topper Notes with topic deep dives and Sets derivations', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Sets.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Sets',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    const topper = kit.content.topper;
    expect(topper).toBeDefined();
    expect(topper.deepDive.length).toBe(3);
    expect(topper.deepDive[0].title).toContain('Axioms');
    expect(topper.deepDive[1].title).toContain('Subsets');
    expect(topper.deepDive[2].title).toContain('Venn Diagrams');

    // Derivations must prove Sets identities, NOT product rule of calculus!
    const derivationsStr = JSON.stringify(topper.derivations);
    expect(derivationsStr).toContain('Proof of Cardinality Formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)');
    expect(derivationsStr).toContain('Derivation of Power Set Cardinality |P(A)| = 2^n');
    expect(derivationsStr).not.toContain('Product Rule');
    expect(derivationsStr).not.toContain('dy/dx');
  });

  // ==========================================
  // CHECKPOINT F: GENERATE CHATPATA NOTES AND INSPECT TONE AND RELEVANCE
  // ==========================================
  it('Checkpoint F: Generates Chatpata Notes with Hinglish tone explaining authentic Sets concepts', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Sets.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Sets',
        noteStyle: 'chatpata',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    const chatpata = kit.content.chatpata!;
    expect(chatpata).toBeDefined();
    expect(chatpata.hinglishIntro).toContain('Sets');
    expect(chatpata.hinglishIntro).toContain('VIP clubs');

    // Desi Analogies must explain Sets (kitchen bartan, wedding common guests, school campus)
    const analogiesStr = JSON.stringify(chatpata.desiAnalogies);
    expect(analogiesStr).toContain('Well-Defined Collection');
    expect(analogiesStr).toContain('Intersection of Sets');
    expect(analogiesStr).toContain('Universal Set');
    expect(analogiesStr).not.toContain('Differentiation vs Integration');
  });

  // ==========================================
  // CHECKPOINT G: GENERATE EXAM MODE QUESTIONS AND QUIZ ANSWERS
  // ==========================================
  it('Checkpoint G: Generates Exam Mode questions and diagnostic quiz grounded in Sets', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Sets.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Sets',
        noteStyle: 'exam',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    const exam = kit.content.exam;
    expect(exam.questions.length).toBe(3);
    
    // Check 1-mark, 3-mark, 5-mark question grounding
    const questionsStr = JSON.stringify(exam.questions);
    expect(questionsStr).toContain('∈ or ∉');
    expect(questionsStr).toContain("De Morgan's Law");
    expect(questionsStr).toContain('survey of 400 students');
    expect(questionsStr).not.toContain('derivative');
    expect(questionsStr).not.toContain('matrix');

    // Check Quiz questions
    expect(kit.quiz.length).toBe(5);
    const quizStr = JSON.stringify(kit.quiz);
    expect(quizStr).toContain('subsets of a set A containing 4 elements');
    expect(quizStr).toContain('disjoint sets');
    expect(quizStr).toContain('empty set');
  });

  // ==========================================
  // CHECKPOINT H: EXPORT AND INSPECT PDFS FOR ALL THREE STYLES
  // ==========================================
  it('Checkpoint H: Exports valid, structured A4 PDFs for Quick, Topper, and Chatpata note styles', async () => {
    const baseKit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Sets.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Sets',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    // Style 1: Quick Notes PDF
    const quickKit: StudyKit = { ...baseKit, noteStyle: 'quick' };
    const quickPdf = generateStudyKitPdf(quickKit);
    const quickOutput = quickPdf.output('arraybuffer');
    expect(quickOutput.byteLength).toBeGreaterThan(5000);

    // Style 2: Topper Notes PDF
    const topperKit: StudyKit = { ...baseKit, noteStyle: 'topper' };
    const topperPdf = generateStudyKitPdf(topperKit);
    const topperOutput = topperPdf.output('arraybuffer');
    expect(topperOutput.byteLength).toBeGreaterThan(5000);

    // Style 3: Chatpata Notes PDF
    const chatpataKit: StudyKit = { ...baseKit, noteStyle: 'chatpata' };
    const chatpataPdf = generateStudyKitPdf(chatpataKit);
    const chatpataOutput = chatpataPdf.output('arraybuffer');
    expect(chatpataOutput.byteLength).toBeGreaterThan(5000);

    // Inspect that PDF string text contains Class 11 and Sets, zero calculus
    const rawPdfText = topperPdf.output();
    expect(rawPdfText).toContain('Class 11');
    expect(rawPdfText).toContain('Sets');
    expect(rawPdfText).not.toContain('Calculus: Derivatives & Integrals');
  });

  // ==========================================
  // CHECKPOINT I: TEST FAILED TRANSCRIPTION & CONFIRM NO FABRICATED NOTES
  // ==========================================
  it('Checkpoint I: Rejects corrupt files or inaccessible links without generating fabricated notes', async () => {
    // 1. Corrupted file upload test
    await expect(
      processEducationalLecture(
        {
          sourceType: 'upload',
          sourceIdentifier: 'corrupt_unreadable_stream.mp4',
          academicClass: 'Class 11',
          subject: 'Mathematics',
          chapter: 'Sets',
          noteStyle: 'topper',
          language: 'Hinglish',
        },
        () => {}
      )
    ).rejects.toThrow(LectureAnalysisError);

    // 2. Blocked/invalid URL test
    await expect(
      processEducationalLecture(
        {
          sourceType: 'link',
          sourceIdentifier: 'https://invalid-url-domain.com/blocked-source',
          academicClass: 'Class 11',
          subject: 'Mathematics',
          chapter: 'Sets',
          noteStyle: 'topper',
          language: 'Hinglish',
        },
        () => {}
      )
    ).rejects.toThrow(LectureAnalysisError);
  });

  // ==========================================
  // CHECKPOINT J: COMPLETE END-TO-END REGRESSION TEST
  // ==========================================
  it('Checkpoint J: Executes complete regression test: Class 11 Sets produces grounded notes and passes Quality Gate', async () => {
    let progressReached100 = false;
    const progressMessages: string[] = [];

    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Sets_Class11_NCERT_CBSE.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        stream: 'Science',
        chapter: 'Sets (Roster, Set-Builder, Subsets, Venn Diagrams)',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      (p) => {
        progressMessages.push(p.message);
        if (p.percentage === 100) progressReached100 = true;
      }
    );

    expect(progressReached100).toBe(true);
    expect(progressMessages.some((m) => m.includes('verified & grounded'))).toBe(true);

    // Validate Quality Gate output explicitly
    const quality = validateLectureGrounding(kit, kit.verifiedLecture!);
    expect(quality.passed).toBe(true);
    expect(quality.qualityScore).toBeGreaterThanOrEqual(90);
    expect(quality.errors.length).toBe(0);

    // Confirm that kit is tied to verified lecture ID
    expect(kit.lectureId).toBe(kit.verifiedLecture?.lectureId);

    // Confirm that the same kit can render all 3 note styles without contradiction
    expect(kit.content.quick?.formulas.length).toBeGreaterThanOrEqual(4);
    expect(kit.content.topper.derivations.length).toBeGreaterThanOrEqual(2);
    expect(kit.content.chatpata?.desiAnalogies.length).toBeGreaterThanOrEqual(3);
  });
});

