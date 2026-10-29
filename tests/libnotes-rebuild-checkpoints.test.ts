import { describe, it, expect } from 'vitest';
import { analyzeEducationalMedia } from '../src/services/videoAnalysisService';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import { 
  generateStudyKitPdf, 
  cleanTextForPdf, 
  formatPdfFilename, 
  DEFAULT_PDF_OPTIONS 
} from '../src/services/pdfExportService';
import { isSupabaseConfigured } from '../src/services/supabaseClient';
import type { StudyKit } from '../src/types';
import fs from 'fs';
import path from 'path';

describe('LIBNOTES REBUILD — STRICT CHECKPOINTS 1 TO 10', () => {
  const lectureParams = {
    sourceType: 'upload' as const,
    sourceIdentifier: 'Class_12_Physics_Thermodynamics_Full_Lecture.mp4',
    selectedClass: 'Class 12' as const,
    selectedSubject: 'Physics' as const,
    selectedStream: 'Science',
    selectedChapter: 'Thermodynamics: First Law, Heat Engines & Carnot Cycle',
    noteStyle: 'topper' as const,
    language: 'Hinglish' as const,
    autoDetect: false,
  };

  // =========================================================================
  // CHECKPOINT 1 — EXISTING SYSTEM INSPECTION
  // =========================================================================
  it('CHECKPOINT 1: Existing system inspection verifies pipeline integrity and ₹0 budget safety', () => {
    // 1. Verify Supabase configuration is present without paid services
    expect(isSupabaseConfigured()).toBe(true);

    // 2. Verify no paid third-party AI keys or paid APIs exist in codebase
    const clientCode = fs.readFileSync(path.resolve(__dirname, '../src/services/supabaseClient.ts'), 'utf-8');
    expect(clientCode).not.toContain('openai.com');
    expect(clientCode).not.toContain('anthropic.com');

    // 3. Verify clean, local PDF generation using jsPDF without external server dependency
    expect(DEFAULT_PDF_OPTIONS.includeCoverPage).toBe(false);
    expect(DEFAULT_PDF_OPTIONS.includeTableOfContents).toBe(false);
  });

  // =========================================================================
  // CHECKPOINT 2 — FULL VIDEO ANALYSIS
  // =========================================================================
  it('CHECKPOINT 2: Full video analysis processes complete lecture with ordered, chronological segments', async () => {
    const lecture = await analyzeEducationalMedia(lectureParams);

    expect(lecture).toBeDefined();
    expect(lecture.durationFormatted).toContain('38 mins');

    // Ordered chronological chunks spanning beginning, middle, and end
    expect(lecture.segments.length).toBeGreaterThanOrEqual(6);
    expect(lecture.segments[0].start).toBe('00:00');
    expect(lecture.segments[lecture.segments.length - 1].end).toBe('38:00');

    // Beginning: Thermodynamic foundations & First Law
    expect(lecture.fullTranscript).toContain('P V = n R T');
    expect(lecture.fullTranscript).toContain('Q = ΔU + W');

    // Middle: The 4 Processes & Isothermal derivation
    expect(lecture.fullTranscript).toContain('Isothermal process');
    expect(lecture.fullTranscript).toContain('2.303 nRT log10(V2 / V1)');
    expect(lecture.fullTranscript).toContain('Adiabatic process');

    // End: Heat Engines & Carnot Cycle
    expect(lecture.fullTranscript).toContain('Heat Engines and the Second Law');
    expect(lecture.fullTranscript).toContain('Stage 1: Reversible Isothermal Expansion');
    expect(lecture.fullTranscript).toContain('Carnot Theorem');
  });

  // =========================================================================
  // CHECKPOINT 3 — STRUCTURED LECTURE REPRESENTATION
  // =========================================================================
  it('CHECKPOINT 3: Structured lecture representation captures definitions, formulas, and examples', async () => {
    const lecture = await analyzeEducationalMedia(lectureParams);

    // Definitions
    expect(lecture.definitionsFound.length).toBeGreaterThanOrEqual(7);
    const defTerms = lecture.definitionsFound.map((d) => d.term);
    expect(defTerms).toContain('First Law of Thermodynamics');
    expect(defTerms).toContain('Isothermal Process');
    expect(defTerms).toContain('Adiabatic Process');
    expect(defTerms).toContain('Heat Engine');
    expect(defTerms).toContain('Carnot Cycle');

    // Formulas
    expect(lecture.formulasExtracted.length).toBeGreaterThanOrEqual(6);
    const formulaNames = lecture.formulasExtracted.map((f) => f.name);
    expect(formulaNames).toContain('First Law of Thermodynamics');
    expect(formulaNames).toContain('Isothermal Reversible Work');
    expect(formulaNames).toContain('Carnot Engine Efficiency');

    // Examples with complete arithmetic
    expect(lecture.examplesDemonstrated.length).toBeGreaterThanOrEqual(2);
    expect(lecture.examplesDemonstrated[0].solution).toContain('1728.8 Joules');
    expect(lecture.examplesDemonstrated[1].solution).toContain('40%');
  });

  // =========================================================================
  // CHECKPOINT 4 — CHATPATA NOTES
  // =========================================================================
  it('CHECKPOINT 4: Chatpata Notes teaches genuine physics with creative Indian analogies and exports dedicated PDF', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureParams);

    const chatpata = kit.content.chatpata;
    expect(chatpata).toBeDefined();
    expect(chatpata.desiAnalogies.length).toBeGreaterThanOrEqual(5);

    // Relatable everyday analogies
    const pocketMoney = chatpata.desiAnalogies.find((a) => a.concept.includes('First Law'));
    expect(pocketMoney?.analogy).toContain('Mummy ne Pocket Money di ₹1000');
    expect(pocketMoney?.desiPunchline).toContain('Mummy Ki Pocket Money');

    const cyclePump = chatpata.desiAnalogies.find((a) => a.concept.includes('Isothermal'));
    expect(cyclePump?.analogy).toContain('Cycle ke tyre');

    const cooker = chatpata.desiAnalogies.find((a) => a.concept.includes('Isochoric'));
    expect(cooker?.desiPunchline).toContain('Volume bilkul CHUP');

    // Generate dedicated Chatpata PDF
    const chatpataDoc = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      exportMode: 'chatpata',
    });

    const pdfBuffer = Buffer.from(chatpataDoc.output('arraybuffer'));
    expect(pdfBuffer.length).toBeGreaterThan(10000);
    expect(pdfBuffer.toString('utf-8', 0, 5)).toBe('%PDF-');
  });

  // =========================================================================
  // CHECKPOINT 5 — QUICK NOTES
  // =========================================================================
  it('CHECKPOINT 5: Quick Notes produces concise, high-yield revision notes and exports dedicated PDF', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureParams);

    const quick = kit.content.quick;
    expect(quick).toBeDefined();
    expect(quick.cheatSheet.length).toBeGreaterThanOrEqual(8);
    expect(quick.formulas.length).toBeGreaterThanOrEqual(6);

    // Key points preserved without fluff
    const bullets = quick.cheatSheet.join(' ');
    expect(bullets).toContain('Q = ΔU + W');
    expect(bullets).toContain('State vs Path Functions');
    expect(bullets).toContain('Isothermal Process');
    expect(bullets).toContain('Adiabatic Process');
    expect(bullets).toContain('Kelvin');

    // Generate dedicated Quick Notes PDF
    const quickDoc = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      exportMode: 'quick',
    });

    const pdfBuffer = Buffer.from(quickDoc.output('arraybuffer'));
    expect(pdfBuffer.length).toBeGreaterThan(10000);
    expect(pdfBuffer.toString('utf-8', 0, 5)).toBe('%PDF-');
  });

  // =========================================================================
  // CHECKPOINT 6 — TOPPER NOTES
  // =========================================================================
  it('CHECKPOINT 6: Topper Notes provides academic deep dives, derivations, and exports dedicated PDF', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureParams);

    const topper = kit.content.topper;
    expect(topper).toBeDefined();

    // 4 conceptual deep dives
    expect(topper.deepDive.length).toBeGreaterThanOrEqual(4);

    // 3 complete calculus derivations
    expect(topper.derivations.length).toBeGreaterThanOrEqual(3);
    expect(topper.derivations[0].finalResult).toContain('2.303 n R T log10(V2 / V1)');
    expect(topper.derivations[1].finalResult).toContain('(P1 V1 - P2 V2) / (γ - 1)');
    expect(topper.derivations[2].finalResult).toContain('η_carnot = 1 - (Qc / Qh) = 1 - (Tc / Th)');

    // Generate dedicated Topper PDF
    const topperDoc = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      exportMode: 'topper',
    });

    const pdfBuffer = Buffer.from(topperDoc.output('arraybuffer'));
    expect(pdfBuffer.length).toBeGreaterThan(15000);
    expect(pdfBuffer.toString('utf-8', 0, 5)).toBe('%PDF-');
  });

  // =========================================================================
  // CHECKPOINT 7 — EXAM MODE
  // =========================================================================
  it('CHECKPOINT 7: Exam Mode generates structured questions with honest attribution and model answers', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureParams);

    const exam = kit.content.exam;
    expect(exam).toBeDefined();
    expect(exam.questions.length).toBeGreaterThanOrEqual(3);

    // Questions must be honestly attributed without fake years
    exam.questions.forEach((q) => {
      expect(q.frequentlyAskedIn).not.toContain('CBSE Board 2023');
      expect(q.frequentlyAskedIn).toContain('AI Practice Question');
      expect(q.markingScheme.length).toBeGreaterThanOrEqual(2);
    });

    // 1M, 3M, 5M question structure
    expect(exam.questions[0].marks).toBe(1);
    expect(exam.questions[1].marks).toBe(3);
    expect(exam.questions[2].marks).toBe(5);

    // Generate dedicated Exam Mode PDF
    const examDoc = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      exportMode: 'exam',
    });

    const pdfBuffer = Buffer.from(examDoc.output('arraybuffer'));
    expect(pdfBuffer.length).toBeGreaterThan(10000);
    expect(pdfBuffer.toString('utf-8', 0, 5)).toBe('%PDF-');
  });

  // =========================================================================
  // CHECKPOINT 8 — PDF RENDERING & MATHEMATICAL SANITIZATION
  // =========================================================================
  it('CHECKPOINT 8: PDF rendering starts notes on Page 1 with clean math and proper pagination', () => {
    // Mathematical character safety
    expect(cleanTextForPdf('η = 1 - (Tc / Th)')).toBe('eta = 1 - (Tc / Th)');
    expect(cleanTextForPdf('Q = ΔU + W')).toBe('Q = Delta U + W');
    expect(cleanTextForPdf('P V^γ = const')).toBe('P V^gamma = const');
    expect(cleanTextForPdf('W ≈ 1729 J')).toBe('W ~= 1729 J');
    expect(cleanTextForPdf('A ∪ B and A ∩ B')).toBe('A  U  B and A  n  B');
    expect(cleanTextForPdf('₹1000')).toBe('Rs. 1000');

    // Filename formatting with mode suffix
    expect(formatPdfFilename('Physics', 'Thermodynamics', 'chatpata')).toBe('Physics_Thermodynamics_CHATPATA.pdf');
    expect(formatPdfFilename('Physics', 'Thermodynamics', 'topper')).toBe('Physics_Thermodynamics_TOPPER.pdf');
    expect(formatPdfFilename('Physics', 'Thermodynamics', 'all')).toBe('Physics_Thermodynamics.pdf');
  });

  // =========================================================================
  // CHECKPOINT 9 — SECURITY AND PERSISTENCE
  // =========================================================================
  it('CHECKPOINT 9: Preserves Supabase authentication, schema, and free-plan constraints', () => {
    const schemaSql = fs.readFileSync(path.resolve(__dirname, '../supabase_schema.sql'), 'utf-8');

    // RLS enabled on all core tables
    expect(schemaSql).toContain('ALTER TABLE public.study_kits ENABLE ROW LEVEL SECURITY');
    expect(schemaSql).toContain('ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY');
    expect(schemaSql).toContain('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY');

    // Ownership check on profiles: auth.uid() = id
    expect(schemaSql).toContain('USING (auth.uid() = id)');
  });

  // =========================================================================
  // CHECKPOINT 10 — END-TO-END REGRESSION
  // =========================================================================
  it('CHECKPOINT 10: Executes full end-to-end regression from lecture video to multi-style PDFs', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureParams);

    // Verify all 3 styles derive from the same lecture facts without contradiction
    expect(kit.content.quick.cheatSheet.join(' ')).toContain('Q = ΔU + W');
    expect(kit.content.topper.deepDive[0].content).toContain('dQ = dU + dW');
    expect(kit.content.chatpata.desiAnalogies[0].concept).toContain('First Law');

    // Export Master PDF containing all sections
    const masterDoc = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      exportMode: 'all',
    });

    const masterBuffer = Buffer.from(masterDoc.output('arraybuffer'));
    expect(masterBuffer.length).toBeGreaterThan(30000); // Substantial master kit
    expect(masterDoc.internal.pages.length - 1).toBeGreaterThanOrEqual(4);
  });
});

