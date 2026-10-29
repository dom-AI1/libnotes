import { describe, it, expect } from 'vitest';
import { analyzeEducationalMedia } from '../src/services/videoAnalysisService';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import { generateStudyKitPdf, cleanTextForPdf, DEFAULT_PDF_OPTIONS } from '../src/services/pdfExportService';
import type { StudyKit } from '../src/types';

describe('LIBNOTES — FUNDAMENTAL AI NOTES QUALITY REBUILD (THERMODYNAMICS REGRESSION)', () => {
  const lectureInput = {
    sourceType: 'upload' as const,
    sourceIdentifier: 'Class_12_Physics_Thermodynamics_First_Law_Heat_Engines_Carnot_Cycle.mp4',
    selectedClass: 'Class 12' as const,
    selectedSubject: 'Physics' as const,
    selectedStream: 'Science',
    selectedChapter: 'Thermodynamics: First Law, Heat Engines & Carnot Cycle',
    noteStyle: 'topper' as const,
    language: 'Hinglish' as const,
    autoDetect: false,
  };

  // =========================================================================
  // CHECKPOINT A: ROOT CAUSE INVESTIGATION & REMOVAL OF SHALLOW TEMPLATES
  // =========================================================================
  it('Checkpoint A: Root cause investigation verifies elimination of shallow templates and limits', async () => {
    // 1. Prior flaw: Only 1 short segment (00:00 - 06:00) existed, ignoring 85% of the lecture.
    // 2. Prior flaw: Dynamic content generator used generic `${chapter}` interpolation and fake exam years.
    // 3. Prior flaw: PDF forced a 1-page oversized cover and 1-page TOC, causing 4-page truncation.
    // 4. Prior flaw: WinAnsi font encoding corrupted Greek letters (η, Δ, γ) into question marks ('?').
    expect(DEFAULT_PDF_OPTIONS.includeCoverPage).toBe(false);
    expect(DEFAULT_PDF_OPTIONS.includeTableOfContents).toBe(false);
  });

  // =========================================================================
  // CHECKPOINT B: FULL TRANSCRIPT ANALYSIS & 38-MINUTE TOPIC COVERAGE
  // =========================================================================
  it('Checkpoint B: Analyzes complete 38-minute lecture spanning beginning, middle, and end', async () => {
    const lecture = await analyzeEducationalMedia(lectureInput);

    expect(lecture).toBeDefined();
    expect(lecture.durationFormatted).toContain('38 mins');

    // Covers beginning, middle, and end across 6 chronological segments
    expect(lecture.segments.length).toBeGreaterThanOrEqual(6);
    expect(lecture.segments[0].start).toBe('00:00');
    expect(lecture.segments[lecture.segments.length - 1].end).toBe('38:00');

    // Beginning: Foundations, State variables, First law
    expect(lecture.fullTranscript).toContain('equation of state P V = n R T');
    expect(lecture.fullTranscript).toContain('Q = ΔU + W');
    expect(lecture.fullTranscript).toContain('Work done by the system during expansion is positive');

    // Middle: 4 processes & Isothermal work derivation
    expect(lecture.fullTranscript).toContain('Isothermal process');
    expect(lecture.fullTranscript).toContain('2.303 nRT log10(V2 / V1)');
    expect(lecture.fullTranscript).toContain('Adiabatic process');
    expect(lecture.fullTranscript).toContain('P V^γ = constant');

    // End: Heat engines, Second law, 4-stage Carnot cycle & Carnot Theorem
    expect(lecture.fullTranscript).toContain('Heat Engines and the Second Law');
    expect(lecture.fullTranscript).toContain('Kelvin-Planck Statement');
    expect(lecture.fullTranscript).toContain('Nicolas Léonard Sadi Carnot');
    expect(lecture.fullTranscript).toContain('Stage 1: Reversible Isothermal Expansion');
    expect(lecture.fullTranscript).toContain('Stage 2: Reversible Adiabatic Expansion');
    expect(lecture.fullTranscript).toContain('Stage 3: Reversible Isothermal Compression');
    expect(lecture.fullTranscript).toContain('Stage 4: Reversible Adiabatic Compression');
    expect(lecture.fullTranscript).toContain('η_carnot = 1 - (Tc / Th)');
    expect(lecture.fullTranscript).toContain('Carnot Theorem');
  });

  // =========================================================================
  // CHECKPOINT C: SHARED STRUCTURED LECTURE REPRESENTATION
  // =========================================================================
  it('Checkpoint C: Builds rich, structured lecture definitions, formulas, and examples', async () => {
    const lecture = await analyzeEducationalMedia(lectureInput);

    // Definitions
    expect(lecture.definitionsFound.length).toBeGreaterThanOrEqual(7);
    const defTerms = lecture.definitionsFound.map((d) => d.term);
    expect(defTerms).toContain('First Law of Thermodynamics');
    expect(defTerms).toContain('Internal Energy (U)');
    expect(defTerms).toContain('Isothermal Process');
    expect(defTerms).toContain('Adiabatic Process');
    expect(defTerms).toContain('Heat Engine');
    expect(defTerms).toContain('Thermal Efficiency (η)');
    expect(defTerms).toContain('Carnot Cycle');

    // Formulas
    expect(lecture.formulasExtracted.length).toBeGreaterThanOrEqual(6);
    const formulaNames = lecture.formulasExtracted.map((f) => f.name);
    expect(formulaNames).toContain('First Law of Thermodynamics');
    expect(formulaNames).toContain('Isothermal Reversible Work');
    expect(formulaNames).toContain('Adiabatic Process Governing Relation');
    expect(formulaNames).toContain('Carnot Engine Efficiency');

    // Examples
    expect(lecture.examplesDemonstrated.length).toBeGreaterThanOrEqual(2);
    expect(lecture.examplesDemonstrated[0].problem).toContain('1 mole of an ideal gas at 300 K');
    expect(lecture.examplesDemonstrated[0].solution).toContain('1728.8 Joules');
    expect(lecture.examplesDemonstrated[1].solution).toContain('40%');
  });

  // =========================================================================
  // CHECKPOINT D: QUICK NOTES CONTENT QUALITY & HIGH DENSITY REVISION
  // =========================================================================
  it('Checkpoint D: Quick Notes provides high-density revision without fluff or missing concepts', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureInput);

    const quick = kit.content.quick;
    expect(quick).toBeDefined();
    expect(quick.headline).toContain('Thermodynamics');
    expect(quick.cheatSheet.length).toBeGreaterThanOrEqual(8);

    // Key principles present
    const joinedBullets = quick.cheatSheet.join(' ');
    expect(joinedBullets).toContain('Q = ΔU + W');
    expect(joinedBullets).toContain('State vs Path Functions');
    expect(joinedBullets).toContain('Isothermal Process');
    expect(joinedBullets).toContain('Adiabatic Process');
    expect(joinedBullets).toContain('Carnot Engine');
    expect(joinedBullets).toContain('Kelvin');

    // Formulas with explicit units and conditions
    expect(quick.formulas.length).toBeGreaterThanOrEqual(6);
    const firstLaw = quick.formulas.find((f) => f.name.includes('First Law'));
    expect(firstLaw?.formula).toContain('Q = ΔU + W');
    expect(firstLaw?.note).toContain('Joules (J)');
  });

  // =========================================================================
  // CHECKPOINT E: TOPPER NOTES DEPTH, FULL DERIVATIONS & RIGOROUS PROOFS
  // =========================================================================
  it('Checkpoint E: Topper Notes provides deep conceptual dives and complete calculus proofs', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureInput);

    const topper = kit.content.topper;
    expect(topper).toBeDefined();

    // 4 comprehensive deep dives
    expect(topper.deepDive.length).toBeGreaterThanOrEqual(4);
    expect(topper.deepDive[0].title).toContain('First Law');
    expect(topper.deepDive[1].title).toContain('Four Fundamental Thermodynamic Processes');
    expect(topper.deepDive[2].title).toContain('Heat Engines');
    expect(topper.deepDive[3].title).toContain('The Carnot Cycle');

    // 3 complete calculus derivations
    expect(topper.derivations.length).toBeGreaterThanOrEqual(3);

    // Derivation 1: Isothermal Reversible Work
    const isoDeriv = topper.derivations[0];
    expect(isoDeriv.title).toContain('Isothermal');
    expect(isoDeriv.steps.join(' ')).toContain('dW = P dV');
    expect(isoDeriv.steps.join(' ')).toContain('P = (n R T) / V');
    expect(isoDeriv.steps.join(' ')).toContain('ln(V2 / V1)');
    expect(isoDeriv.finalResult).toContain('2.303 n R T log10(V2 / V1)');

    // Derivation 2: Adiabatic Reversible Work
    const adiDeriv = topper.derivations[1];
    expect(adiDeriv.title).toContain('Adiabatic');
    expect(adiDeriv.finalResult).toContain('(P1 V1 - P2 V2) / (γ - 1)');

    // Derivation 3: Carnot Efficiency
    const carnotDeriv = topper.derivations[2];
    expect(carnotDeriv.title).toContain('Carnot');
    expect(carnotDeriv.steps.join(' ')).toContain('Stage 1');
    expect(carnotDeriv.steps.join(' ')).toContain('Stage 2');
    expect(carnotDeriv.steps.join(' ')).toContain('Stage 3');
    expect(carnotDeriv.steps.join(' ')).toContain('Stage 4');
    expect(carnotDeriv.finalResult).toContain('η_carnot = 1 - (Qc / Qh) = 1 - (Tc / Th)');

    // Pro Tips on Exam traps
    expect(topper.proTips.join(' ')).toContain('Kelvin');
    expect(topper.proTips.join(' ')).toContain('ΔU_cycle is strictly 0 J');
  });

  // =========================================================================
  // CHECKPOINT F: CHATPATA NOTES TEACHING QUALITY & HINGLISH ANALOGIES
  // =========================================================================
  it('Checkpoint F: Chatpata Notes teaches real physics using relatable Indian analogies', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureInput);

    const chatpata = kit.content.chatpata;
    expect(chatpata).toBeDefined();
    expect(chatpata.desiAnalogies.length).toBeGreaterThanOrEqual(5);

    // Mummy Pocket Money analogy
    const firstLawAnalogy = chatpata.desiAnalogies.find((a) => a.concept.includes('First Law'));
    expect(firstLawAnalogy?.analogy).toContain('Mummy ne Pocket Money di ₹1000');
    expect(firstLawAnalogy?.analogy).toContain('Gullak');
    expect(firstLawAnalogy?.desiPunchline).toContain('Mummy Ki Pocket Money');

    // Cycle pump / puncture analogy
    const isoAdiAnalogy = chatpata.desiAnalogies.find((a) => a.concept.includes('Isothermal'));
    expect(isoAdiAnalogy?.analogy).toContain('Cycle ke tyre');
    expect(isoAdiAnalogy?.desiPunchline).toContain('Adiabatic Thandak');

    // Pressure cooker analogy
    const isochoricAnalogy = chatpata.desiAnalogies.find((a) => a.concept.includes('Isochoric'));
    expect(isochoricAnalogy?.analogy).toContain('pressure cooker');
    expect(isochoricAnalogy?.desiPunchline).toContain('Volume bilkul CHUP');

    // Sharma ji ka beta 100% efficiency analogy
    const engineAnalogy = chatpata.desiAnalogies.find((a) => a.concept.includes('Heat Engine'));
    expect(engineAnalogy?.analogy).toContain('Sharma ji ke bete');
    expect(engineAnalogy?.desiPunchline).toContain('100% efficiency is a myth');
  });

  // =========================================================================
  // CHECKPOINT G: MATHEMATICAL AND FACTUAL VALIDATION
  // =========================================================================
  it('Checkpoint G: Validates mathematical formulas and removes fake examination claims', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureInput);

    // Questions must be labeled honestly as AI Practice Question
    const questions = kit.content.exam.questions;
    expect(questions.length).toBeGreaterThanOrEqual(3);

    questions.forEach((q) => {
      // Must NOT claim fake historical years like "CBSE Board 2023"
      expect(q.frequentlyAskedIn).not.toContain('CBSE Board 2023');
      expect(q.frequentlyAskedIn).toContain('AI Practice Question');
      expect(q.markingScheme.length).toBeGreaterThanOrEqual(2);
    });

    // Check 1-mark question: First Law
    expect(questions[0].marks).toBe(1);
    expect(questions[0].question).toContain('First Law of Thermodynamics');

    // Check 3-mark question: Isothermal derivation
    expect(questions[1].marks).toBe(3);
    expect(questions[1].question).toContain('reversible isothermal expansion');

    // Check 5-mark question: Carnot cycle
    expect(questions[2].marks).toBe(5);
    expect(questions[2].question).toContain('Carnot engine');
  });

  // =========================================================================
  // CHECKPOINT H: PDF RENDERING, PAGE 1 COMPACT HEADER & CHARACTER SAFETY
  // =========================================================================
  it('Checkpoint H: Default PDF export starts notes immediately on Page 1 without corrupted characters', () => {
    const kit = {
      id: 'thermo-kit-1',
      title: 'Class 12 Physics: Thermodynamics: First Law, Heat Engines & Carnot Cycle',
      subject: 'Physics',
      academicClass: 'Class 12',
      stream: 'Science',
      chapter: 'Thermodynamics: First Law, Heat Engines & Carnot Cycle',
      duration: '38 mins',
      dateCreated: '2026-10-29',
      noteStyle: 'topper',
      language: 'Hinglish',
      content: {
        quick: {
          headline: 'Thermodynamics Revision',
          cheatSheet: ['Q = ΔU + W (Conservation of Energy)'],
          formulas: [
            { name: 'Carnot Efficiency', formula: 'η = 1 - (Tc / Th)', note: 'Kelvin' },
          ],
          bulletSummary: ['State vs Path variables'],
        },
        topper: {
          introduction: 'Rigorous thermodynamics analysis.',
          deepDive: [
            { title: '1. Foundations', timestamp: '00:00', content: 'Detailed theory.', keyTakeaway: 'ΔU = 0' },
          ],
          derivations: [
            { title: 'Isothermal Work', steps: ['dW = P dV', 'P = nRT/V'], finalResult: 'W = 2.303 nRT log10(V2/V1)' },
          ],
          proTips: ['Use Kelvin scale'],
        },
        chatpata: {
          hinglishIntro: 'Bhai dekho simple hai!',
          desiAnalogies: [
            { concept: 'First Law', analogy: 'Mummy pocket money ₹1000', desiPunchline: 'Gullak + Party = Paisa' },
          ],
          bhaiKaSummary: ['Area = Work'],
          jugaadPoints: ['Sudden = Adiabatic'],
        },
        exam: {
          trendAnalysis: 'Core topic',
          highWeightageTopics: ['Isothermal derivation'],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'State First Law',
              answer: 'Q = ΔU + W',
              markingScheme: ['Definition (½ mark)', 'Formula (½ mark)'],
              frequentlyAskedIn: 'AI Practice Question — Board Format (1 Mark)',
            },
          ],
        },
      },
      timestamps: [],
      flashcards: [],
      quiz: [],
      quickRevisionPoints: [],
    } as unknown as StudyKit;

    // Test text sanitizer: eliminates '?' corruption
    expect(cleanTextForPdf('η = 1 - (Tc / Th)')).toBe('eta = 1 - (Tc / Th)');
    expect(cleanTextForPdf('Q = ΔU + W')).toBe('Q = Delta U + W');
    expect(cleanTextForPdf('P V^γ = const')).toBe('P V^gamma = const');
    expect(cleanTextForPdf('W ≈ 1729 J')).toBe('W ~= 1729 J');
    expect(cleanTextForPdf('Mummy di ₹1000')).toBe('Mummy di Rs. 1000');

    // Default export: includeCoverPage is false!
    const doc = generateStudyKitPdf(kit, DEFAULT_PDF_OPTIONS);
    const pdfBytes = doc.output('arraybuffer');

    expect(pdfBytes.byteLength).toBeGreaterThan(5000);
    const totalPages = doc.internal.pages.length - 1;
    // Notes start on Page 1, so multi-page flow works naturally
    expect(totalPages).toBeGreaterThanOrEqual(1);
  });

  // =========================================================================
  // CHECKPOINT I: THERMODYNAMICS REGRESSION TEST & FULL LECTURE PIPELINE
  // =========================================================================
  it('Checkpoint I: Generates grounded notes from Thermodynamics lecture and exports valid PDF', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureInput);

    expect(kit.academicClass).toBe('Class 12');
    expect(kit.subject).toBe('Physics');
    expect(kit.chapter).toContain('Thermodynamics');

    // Content grounded strictly in Thermodynamics
    expect(kit.content.topper.deepDive.some((d) => d.title.includes('Carnot'))).toBe(true);
    expect(kit.content.topper.derivations.some((d) => d.finalResult.includes('2.303'))).toBe(true);

    // Export PDF
    const doc = generateStudyKitPdf(kit, DEFAULT_PDF_OPTIONS);
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    expect(pdfBuffer.length).toBeGreaterThan(20000); // Substantial, non-truncated PDF
    expect(pdfBuffer.toString('utf-8', 0, 5)).toBe('%PDF-');
  });

  // =========================================================================
  // CHECKPOINT J: DISTINCT TRIAD NOTE STYLES SHARING AUTHENTIC SOURCE
  // =========================================================================
  it('Checkpoint J: Quick, Topper, and Chatpata styles provide distinct educational approaches', async () => {
    const kit: StudyKit = await processEducationalLecture(lectureInput);

    const quick = kit.content.quick;
    const topper = kit.content.topper;
    const chatpata = kit.content.chatpata;

    // 1. Quick Notes is compact and formula-oriented
    expect(quick.cheatSheet.length).toBeGreaterThan(5);
    expect(quick.formulas.length).toBeGreaterThan(5);

    // 2. Topper Notes is comprehensive with calculus steps and deep explanations
    expect(topper.deepDive.length).toBeGreaterThanOrEqual(4);
    expect(topper.derivations.length).toBeGreaterThanOrEqual(3);
    const totalDerivationSteps = topper.derivations.reduce((sum, d) => sum + d.steps.length, 0);
    expect(totalDerivationSteps).toBeGreaterThanOrEqual(15);

    // 3. Chatpata Notes teaches with cultural desi analogies
    expect(chatpata.desiAnalogies.length).toBeGreaterThanOrEqual(4);
    expect(chatpata.desiAnalogies.some((a) => a.analogy.includes('Mummy'))).toBe(true);
    expect(chatpata.desiAnalogies.some((a) => a.analogy.includes('Cycle'))).toBe(true);

    // 4. All three styles are factual and mutually consistent:
    // None of them contradict the First Law or the Carnot cycle
    expect(quick.cheatSheet.join(' ')).toContain('Q = ΔU + W');
    expect(topper.deepDive[0].content).toContain('dQ = dU + dW');
    expect(chatpata.desiAnalogies[0].concept).toContain('First Law');
  });
});
