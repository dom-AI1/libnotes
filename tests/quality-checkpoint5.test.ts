import { describe, it, expect } from 'vitest';
import { verifyAndExtractLecture } from '../src/services/videoAnalysisService';
import { buildDynamicKitContent } from '../src/services/dynamicContentGenerator';
import { validateLectureGrounding } from '../src/services/groundingQualityGate';
import { generateStudyKitFromLecture } from '../src/services/aiProcessingService';
import type { StudyKit } from '../src/types';

describe('LIBNOTES — CHECKPOINT 5: AI Analysis, Academic Accuracy & Note Quality Audit', () => {

  // =========================================================================
  // PHASE 1 & 2: ARCHITECTURE, DATA FLOW & DETECTING HARDCODED/UNFAMILIAR TOPICS
  // =========================================================================
  describe('Phase 1 & 2: Architecture Data-Flow & Unfamiliar Topic Processing', () => {
    it('processes an unfamiliar novel topic without crashing or outputting dummy equations (R = f(X, Y, Z))', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Civil_Engineering_Geotechnical_Soil_Mechanics.mp4',
        selectedSubject: 'Physics',
        selectedClass: 'College / B.Tech',
        selectedChapter: 'Geotechnical Soil Mechanics & Darcy Law',
      });

      expect(lecture.subject).toBe('Physics');
      expect(lecture.chapter).toContain('Soil Mechanics');
      expect(lecture.fullTranscript.length).toBeGreaterThan(50);

      // Verify formulas do NOT contain fake placeholders like "R = f(X, Y, Z)"
      const formulasString = JSON.stringify(lecture.formulasExtracted);
      expect(formulasString).not.toContain('R = f(X, Y, Z)');
      expect(formulasString).not.toContain('Governing relation under equilibrium');

      // Verify dynamic content generation for novel topic
      const dynamicContent = buildDynamicKitContent(
        lecture.subject,
        lecture.chapter,
        lecture.academicClass
      );

      expect(dynamicContent.content.quick?.formulas.length).toBeGreaterThan(0);
      const quickFormulasStr = JSON.stringify(dynamicContent.content.quick?.formulas);
      expect(quickFormulasStr).not.toContain('R = f(X, Y, Z)');
      expect(quickFormulasStr).not.toContain('Governing relation under equilibrium');
    });

    it('honestly discloses audio transcript verification in visualEvidenceDisclosed without claiming visual OCR', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Physics_Newton_Laws.mp4',
      });

      expect(lecture.visualEvidenceDisclosed).toBe('Audio speech-to-text transcript verified');
      expect(lecture.visualEvidenceDisclosed).not.toContain('Visual blackboard inspection active');
    });
  });

  // =========================================================================
  // PHASE 3: ACADEMIC ACCURACY ACROSS 5 CORE SUBJECTS
  // =========================================================================
  describe('Phase 3: Academic Accuracy across 5 Core Disciplines', () => {
    
    // Topic 1: Physics — Laws of Motion
    it('verifies Physics: Laws of Motion (Newton laws, impulse, friction, banking angle)', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Physics_Laws_of_Motion_Friction.mp4',
      });

      expect(lecture.subject).toBe('Physics');
      expect(lecture.academicClass).toBe('Class 11');
      expect(lecture.chapter).toContain('Laws of Motion');

      const kitContent = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const quick = kitContent.content.quick;
      const topper = kitContent.content.topper;

      // Verify formulas: F = dp/dt = ma, Impulse J = Δp, Friction fs ≤ μs N, Banking tan θ = v²/(rg)
      const formulaNames = quick?.formulas.map((f) => f.name).join(' ') || '';
      const formulaExps = quick?.formulas.map((f) => f.formula).join(' ') || '';
      expect(formulaExps).toContain('F = dp/dt');
      expect(formulaExps).toContain('Δp');
      expect(formulaExps).toContain('μs · N');
      expect(formulaExps).toContain('tan θ = v² / (r g)');

      // Verify numerical and conceptual accuracy in Topper derivations and deepDive
      expect(topper.derivations[0].title).toContain('Banking');
      expect(topper.derivations[0].finalResult).toContain('tan θ = v² / (r g)');
      expect(topper.deepDive[0].title).toContain('Newton');
      expect(topper.deepDive[0].content).toContain('F = ma');

      // Zero dimensional mistakes: check units
      expect(JSON.stringify(quick?.formulas)).toContain('Newton (N)');
      expect(JSON.stringify(quick?.formulas)).toContain('kg·m/s');
    });

    // Topic 2: Biology — Photosynthesis
    it('verifies Biology: Photosynthesis (Chloroplast, Z-Scheme, Calvin Cycle, RuBisCO)', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Biology_Photosynthesis_Calvin_Cycle.mp4',
      });

      expect(lecture.subject).toBe('Biology');
      expect(lecture.chapter).toContain('Photosynthesis');

      const kitContent = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const quick = kitContent.content.quick;

      // Photolysis stoichiometry: 2 H2O -> 4 H+ + 4 e- + O2
      const formulaExps = quick?.formulas.map((f) => f.formula).join(' ') || '';
      expect(formulaExps).toContain('2 H₂O');
      expect(formulaExps).toContain('4 H⁺');
      expect(formulaExps).toContain('18 ATP + 12 NADPH');

      // Verify RuBisCO enzyme dual activity and location
      expect(JSON.stringify(kitContent.content)).toContain('RuBisCO');
      expect(JSON.stringify(kitContent.content)).toContain('thylakoid');
      expect(JSON.stringify(kitContent.content)).toContain('stroma');
    });

    // Topic 3: Mathematics — Quadratic Equations
    it('verifies Mathematics: Quadratic Equations (Roots, Discriminant, Sridharacharya)', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class10_Math_Quadratic_Equations_Roots.mp4',
      });

      expect(lecture.subject).toBe('Mathematics');
      expect(lecture.chapter).toContain('Quadratic Equations');

      const kitContent = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const formulas = kitContent.content.quick?.formulas || [];
      const formulaExps = formulas.map((f) => f.formula).join(' ');

      // Standard form and Discriminant D = b² - 4ac
      expect(formulaExps).toContain('ax² + bx + c = 0');
      expect(formulaExps).toContain('b² - 4ac');
      expect(formulaExps).toContain('(-b ±');
      expect(formulaExps).toContain('/ (2a)');
      expect(formulaExps).toContain('-b/a');
      expect(formulaExps).toContain('c/a');
    });

    // Topic 4: Chemistry — Chemical Bonding
    it('verifies Chemistry: Chemical Bonding (VSEPR, Hybridization, MOT, Bond Order, O2 Paramagnetism)', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Chemistry_Chemical_Bonding_VSEPR_MOT.mp4',
      });

      expect(lecture.subject).toBe('Chemistry');
      expect(lecture.chapter).toContain('Chemical Bonding');

      const kitContent = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const formulas = kitContent.content.quick?.formulas || [];
      const formulaExps = formulas.map((f) => f.formula).join(' ');

      // Bond Order = ½(Nb - Na), Dipole Moment μ = q × d, Formal Charge
      expect(formulaExps).toContain('½ (Nb - Na)');
      expect(formulaExps).toContain('μ = q × d');
      expect(formulaExps).toContain('FC = V - L - ½ S');

      // Conceptual verification: VSEPR bond angles NH3 (107°) and H2O (104.5°)
      expect(JSON.stringify(kitContent.content)).toContain('107°');
      expect(JSON.stringify(kitContent.content)).toContain('104.5°');
      expect(JSON.stringify(kitContent.content)).toContain('paramagnetic');
    });

    // Topic 5: Commerce — Accountancy Journal Entries
    it('verifies Commerce: Accountancy Journal Entries (Golden rules, DEAD CLIC, 4-step framework)', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Accountancy_Journal_Entries_Debit_Credit.mp4',
      });

      expect(lecture.subject).toBe('Accountancy');
      expect(lecture.chapter).toContain('Journal Entries');

      const kitContent = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const cheatSheet = kitContent.content.quick?.cheatSheet || [];

      // Golden rules and modern DEAD CLIC verification
      const cheatStr = cheatSheet.join(' ');
      expect(cheatStr).toContain('Debit the Receiver, Credit the Giver');
      expect(cheatStr).toContain('Debit what comes in, Credit what goes out');
      expect(cheatStr).toContain('DEAD CLIC');
      expect(cheatStr).toContain('Trade Discount vs Cash Discount');
    });
  });

  // =========================================================================
  // PHASE 4: VERIFY ALL FOUR NOTE STYLES & EXAM MODE HONESTY
  // =========================================================================
  describe('Phase 4: Four Note Styles & Exam Mode Transparency', () => {
    it('generates all 4 distinct note styles with authentic tone and proper depth', () => {
      const kitContent = buildDynamicKitContent('Physics', 'Laws of Motion', 'Class 11');

      // Style 1: Quick Notes
      expect(kitContent.content.quick).toBeDefined();
      expect(kitContent.content.quick?.headline).toContain('Laws of Motion');
      expect(kitContent.content.quick?.cheatSheet.length).toBeGreaterThanOrEqual(4);
      expect(kitContent.content.quick?.formulas.length).toBeGreaterThanOrEqual(3);

      // Style 2: Topper Notes
      expect(kitContent.content.topper).toBeDefined();
      expect(kitContent.content.topper.deepDive.length).toBeGreaterThanOrEqual(2);
      expect(kitContent.content.topper.derivations.length).toBeGreaterThanOrEqual(1);
      expect(kitContent.content.topper.proTips.length).toBeGreaterThanOrEqual(2);

      // Style 3: Chatpata Notes
      expect(kitContent.content.chatpata).toBeDefined();
      expect(kitContent.content.chatpata?.hinglishIntro).toMatch(/Bhai (dekho|suno)/);
      expect(kitContent.content.chatpata?.desiAnalogies.length).toBeGreaterThanOrEqual(2);
      expect(kitContent.content.chatpata?.bhaiKaSummary.length).toBeGreaterThanOrEqual(2);

      // Style 4: Exam Mode
      expect(kitContent.content.exam).toBeDefined();
      expect(kitContent.content.exam.questions.length).toBeGreaterThanOrEqual(3);
      expect(kitContent.content.exam.highWeightageTopics.length).toBeGreaterThanOrEqual(2);
    });

    it('NEVER fabricates past-year exam dates (e.g. CBSE 2024, JEE Main 2024) in question attribution', () => {
      const subjects: Array<{ subject: any; chapter: string }> = [
        { subject: 'Physics', chapter: 'Laws of Motion' },
        { subject: 'Biology', chapter: 'Photosynthesis in Higher Plants' },
        { subject: 'Mathematics', chapter: 'Quadratic Equations' },
        { subject: 'Accountancy', chapter: 'Journal Entries & Debit Credit' },
        { subject: 'Chemistry', chapter: 'Chemical Kinetics & Reactions' },
        { subject: 'Economics', chapter: 'National Income Accounting' },
      ];

      for (const item of subjects) {
        const kitContent = buildDynamicKitContent(item.subject, item.chapter, 'Class 12');
        const questions = kitContent.content.exam.questions;

        for (const q of questions) {
          // Strictly forbid fabricated specific past-year claims
          expect(q.frequentlyAskedIn).not.toMatch(/CBSE\s+(2022|2023|2024)/i);
          expect(q.frequentlyAskedIn).not.toMatch(/JEE\s+Main\s+(2022|2023|2024)/i);
          expect(q.frequentlyAskedIn).not.toMatch(/NEET\s+(2022|2023|2024)/i);
          expect(q.frequentlyAskedIn).not.toMatch(/GATE\s+(2022|2023|2024)/i);
          expect(q.frequentlyAskedIn).not.toMatch(/guaranteed/i);

          // Must be transparent curriculum-aligned practice questions
          expect(q.frequentlyAskedIn).toMatch(/(Curriculum Practice Question|NCERT|Practice Question)/i);
        }
      }
    });
  });

  // =========================================================================
  // PHASE 7: UNKNOWN AND UNUSUAL TOPICS TESTING
  // =========================================================================
  describe('Phase 7: Testing Unknown and Unusual Topics Beyond Predefined Examples', () => {
    
    // Topic 1: Organic Chemistry — Isomerism
    it('handles Organic Chemistry — Isomerism accurately', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Organic_Chemistry_Isomerism_Stereochemistry_Chirality.mp4',
      });

      expect(lecture.subject).toBe('Chemistry');
      expect(lecture.chapter).toContain('Isomerism');

      const kit = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      expect(JSON.stringify(kit.content)).toContain('Enantiomer');
      expect(JSON.stringify(kit.content)).toContain('Chiral');
      expect(JSON.stringify(kit.content)).toContain('Meso');
      expect(JSON.stringify(kit.content)).toContain('2^n');
    });

    // Topic 2: Biology — Human Respiration
    it('handles Biology — Human Respiration (pulmonary volumes, Bohr effect) accurately', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Human_Respiration_Breathing_Exchange_Gases.mp4',
      });

      expect(lecture.subject).toBe('Biology');
      expect(lecture.chapter).toContain('Respiration');

      const kit = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      expect(JSON.stringify(kit.content)).toContain('VC = ERV + TV + IRV');
      expect(JSON.stringify(kit.content)).toContain('Bohr Effect');
      expect(JSON.stringify(kit.content)).toContain('pO2 = 104');
    });

    // Topic 3: Economics — National Income
    it('handles Economics — National Income Accounting accurately', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Economics_National_Income_Accounting_GDP.mp4',
      });

      expect(lecture.subject).toBe('Economics');
      expect(lecture.chapter).toContain('National Income');

      const kit = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      expect(JSON.stringify(kit.content)).toContain('Y = C + I + G + (X - M)');
      expect(JSON.stringify(kit.content)).toContain('Multiplier');
    });

    // Topic 4: Accountancy — Cash Flow Statements
    it('handles Accountancy — Cash Flow Statements (AS-3) accurately', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class12_Accountancy_Cash_Flow_Statements_AS3.mp4',
      });

      expect(lecture.subject).toBe('Accountancy');
      expect(lecture.chapter).toContain('Cash Flow');

      const kit = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      expect(JSON.stringify(kit.content)).toContain('Operating Activities');
      expect(JSON.stringify(kit.content)).toContain('Investing Activities');
      expect(JSON.stringify(kit.content)).toContain('Financing Activities');
      expect(JSON.stringify(kit.content)).toContain('Net Change in Cash = CFO + CFI + CFF');
    });

    // Topic 5: Mathematics — Probability
    it('handles Mathematics — Probability & Bayes Theorem accurately', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class12_Mathematics_Probability_Bayes_Theorem.mp4',
      });

      expect(lecture.subject).toBe('Mathematics');
      expect(lecture.chapter).toContain('Probability');

      const kit = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      expect(JSON.stringify(kit.content)).toContain('P(A|B) = P(A ∩ B) / P(B)');
      expect(JSON.stringify(kit.content)).toContain('Bayes');
      expect(JSON.stringify(kit.content)).toContain('E[X]');
    });
  });

  // =========================================================================
  // PHASE 8: QUALITY GATE DETERMINISTIC SCORING AUDIT
  // =========================================================================
  describe('Phase 8: Quality Gate Deterministic Scoring & Error Detection', () => {
    it('scores 100/100 and passes all 10 checks for an authentic, well-formed kit', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Physics_Laws_of_Motion.mp4',
      });

      const dynamic = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const studyKit: StudyKit = {
        id: 'kit-test-1',
        lectureId: lecture.lectureId,
        title: `${lecture.subject}: ${lecture.chapter}`,
        subject: lecture.subject,
        academicClass: lecture.academicClass,
        chapter: lecture.chapter,
        duration: lecture.durationFormatted,
        dateCreated: 'Today',
        content: dynamic.content,
        timestamps: dynamic.timestamps,
        flashcards: dynamic.flashcards,
        quiz: dynamic.quiz,
        quickRevisionPoints: dynamic.quickRevisionPoints,
        verifiedLecture: lecture,
      };

      const result = validateLectureGrounding(studyKit, lecture);
      expect(result.passed).toBe(true);
      expect(result.qualityScore).toBe(100);
      expect(result.checks.length).toBe(10);
      expect(result.checks.every((c) => c.passed)).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('immediately rejects and penalizes a study kit contaminated with cross-discipline content', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class11_Physics_Laws_of_Motion.mp4',
      });

      const dynamic = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      
      // Deliberately contaminate physics kit with biology photosynthesis terms
      const contaminatedContent = JSON.parse(JSON.stringify(dynamic.content));
      contaminatedContent.quick.cheatSheet.push('Photosystem II absorbs light and photolysis occurs in chloroplasts');

      const contaminatedKit: StudyKit = {
        id: 'kit-test-contaminated',
        lectureId: lecture.lectureId,
        title: `${lecture.subject}: ${lecture.chapter}`,
        subject: lecture.subject,
        academicClass: lecture.academicClass,
        chapter: lecture.chapter,
        duration: lecture.durationFormatted,
        dateCreated: 'Today',
        content: contaminatedContent,
        timestamps: dynamic.timestamps,
        flashcards: dynamic.flashcards,
        quiz: dynamic.quiz,
        quickRevisionPoints: dynamic.quickRevisionPoints,
        verifiedLecture: lecture,
      };

      const result = validateLectureGrounding(contaminatedKit, lecture);
      expect(result.passed).toBe(false);
      expect(result.qualityScore).toBeLessThan(80);
      expect(result.errors.some((e) => e.includes('contaminated'))).toBe(true);
    });

    it('rejects a kit with mismatched lecture ID or mismatched academic class/subject', async () => {
      const lecture = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'Class10_Math_Quadratic_Equations.mp4',
      });

      const dynamic = buildDynamicKitContent(lecture.subject, lecture.chapter, lecture.academicClass);
      const mismatchedKit: StudyKit = {
        id: 'kit-mismatched',
        lectureId: 'wrong-lecture-id-999',
        title: `${lecture.subject}: ${lecture.chapter}`,
        subject: 'Biology' as any, // Mismatched subject
        academicClass: 'Class 12', // Mismatched class
        chapter: lecture.chapter,
        duration: lecture.durationFormatted,
        dateCreated: 'Today',
        content: dynamic.content,
        timestamps: dynamic.timestamps,
        flashcards: dynamic.flashcards,
        quiz: dynamic.quiz,
        quickRevisionPoints: dynamic.quickRevisionPoints,
      };

      const result = validateLectureGrounding(mismatchedKit, lecture);
      expect(result.passed).toBe(false);
      expect(result.errors.some((e) => e.includes('ID mismatch'))).toBe(true);
      expect(result.errors.some((e) => e.includes('Metadata mismatch'))).toBe(true);
    });
  });

  // =========================================================================
  // UI VERIFICATION: BADGE OVERFLOW PREVENTION
  // =========================================================================
  describe('UI Integrity: Verified Source Badge Layout', () => {
    it('ensures visualEvidenceDisclosed badge text is concise and sanitized', async () => {
      const lectureUpload = await verifyAndExtractLecture({
        sourceType: 'upload',
        sourceIdentifier: 'vidssave.com 4 Steps to Solve ANY Journal Entry Class 11 Accountancy 720P.mp4',
      });
      expect(lectureUpload.visualEvidenceDisclosed.length).toBeLessThan(50);

      const lectureLink = await verifyAndExtractLecture({
        sourceType: 'link',
        sourceIdentifier: 'https://youtu.be/fPMvT6f_pn8?si=ytgy_example',
      });
      expect(lectureLink.visualEvidenceDisclosed.length).toBeLessThan(60);
    });
  });
});
