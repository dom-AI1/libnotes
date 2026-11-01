import { describe, it, expect } from 'vitest';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import { buildMethodologyGroundedKit, detectSubjectDomain } from '../src/services/noteMethodologyEngine';
import { analyzeEducationalMedia } from '../src/services/videoAnalysisService';
import { validateLectureGrounding } from '../src/services/groundingQualityGate';

describe('LIBNOTES — AI NOTE-MAKING METHODOLOGY ENGINE TEST SUITE', () => {

  // =========================================================================
  // 1. DOMAIN DETECTION & METHODOLOGY ROUTING
  // =========================================================================
  it('correctly maps target subjects and chapters to pedagogical domains', () => {
    expect(detectSubjectDomain('Accountancy', 'Journal Entries')).toBe('accountancy');
    expect(detectSubjectDomain('Mathematics', 'Quadratic Equations')).toBe('mathematics');
    expect(detectSubjectDomain('Physics', 'Laws of Motion')).toBe('physics');
    expect(detectSubjectDomain('Biology', 'Photosynthesis in Higher Plants')).toBe('biology');
    expect(detectSubjectDomain('Economics', 'National Income Accounting')).toBe('economics');
    expect(detectSubjectDomain('Chemistry', 'Chemical Bonding and Molecular Structure')).toBe('chemistry');
    expect(detectSubjectDomain('Environmental Science', 'Atmospheric Cycles')).toBe('general');
  });

  // =========================================================================
  // 2. TARGET 1: CLASS 11 ACCOUNTANCY — JOURNAL ENTRIES
  // =========================================================================
  it('Target 1: Generates comprehensive methodology notes for Class 11 Accountancy (Journal Entries)', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Accounts_Journal_Entries_One_Shot.mp4',
        academicClass: 'Class 11',
        subject: 'Accountancy',
        chapter: 'Journal Entries & Rules of Debit and Credit',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.academicClass).toBe('Class 11');
    expect(kit.subject).toBe('Accountancy');
    expect(kit.chapter).toContain('Journal');

    // 1. Topper Notes: Check 4-step framework, Golden Rules vs DEAD CLIC, worked example with working notes
    const topper = kit.content.topper;
    expect(topper).toBeDefined();
    expect(topper.deepDive.length).toBeGreaterThanOrEqual(3);
    
    // Check 4-step framework and standard journal columns
    const sec1 = topper.deepDive[0];
    expect(sec1.content).toContain('4-step framework');
    expect(sec1.content).toContain('Date, Particulars, L.F., Debit');
    expect(sec1.commonMistakes).toBeDefined();
    expect(sec1.commonMistakes?.join(' ')).toContain('Being');

    // Check Golden Rules and Modern DEAD CLIC
    const sec2 = topper.deepDive[1];
    expect(sec2.content).toContain('DEAD CLIC');
    expect(sec2.comparisonTable).toBeDefined();
    expect(sec2.comparisonTable?.headers).toContain('Traditional Golden Rule');

    // Check Solved compound entry with Working Notes
    const sec3 = topper.deepDive[2];
    expect(sec3.workedExample).toBeDefined();
    expect(sec3.workedExample?.problem).toContain('Mohan');
    expect(sec3.workedExample?.solution).toContain('Discount Received');
    expect(sec3.workedExample?.workingNotes).toContain('Trade Discount');
    expect(sec3.workedExample?.workingNotes).toContain('Net Cheque Paid');
    expect(sec3.workedExample?.whyItWorks).toBeDefined();

    // Derivations & Pro-tips
    expect(topper.derivations[0].finalResult).toContain('Purchases A/c Dr');
    expect(topper.proTips.join(' ')).toContain('narration');

    // 2. Quick Notes: Check high-density cheat sheet and formulas
    const quick = kit.content.quick;
    expect(quick).toBeDefined();
    expect(quick?.cheatSheet.join(' ')).toContain('Trade Discount vs Cash Discount');
    const formulaNames = quick?.formulas.map(f => f.name);
    expect(formulaNames).toContain('Accounting Equation');
    expect(formulaNames).toContain('Net Invoice Value');

    // 3. Chatpata Notes: Check witty Hinglish analogies and desi punchlines
    const chatpata = kit.content.chatpata;
    expect(chatpata).toBeDefined();
    expect(chatpata?.hinglishIntro).toContain('Journal entry');
    expect(chatpata?.desiAnalogies.length).toBeGreaterThanOrEqual(3);
    const analogiesStr = JSON.stringify(chatpata?.desiAnalogies);
    expect(analogiesStr).toContain('sabzi mandi');
    expect(analogiesStr).toContain('Drawings');

    // 4. Exam Mode: Check 1, 3, 5 marks questions with marking schemes
    const exam = kit.content.exam;
    expect(exam).toBeDefined();
    expect(exam.questions.length).toBe(3);
    expect(exam.questions[0].marks).toBe(1);
    expect(exam.questions[1].marks).toBe(3);
    expect(exam.questions[2].marks).toBe(5);
    expect(exam.questions[2].answer).toContain('Working Notes');
    expect(exam.questions[2].markingScheme.length).toBeGreaterThanOrEqual(4);
  });

  // =========================================================================
  // 3. TARGET 2: CLASS 11 MATHEMATICS — QUADRATIC EQUATIONS
  // =========================================================================
  it('Target 2: Generates comprehensive methodology notes for Class 11 Mathematics (Quadratic Equations)', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Quadratic_Equations.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Quadratic Equations (Roots, Discriminant & Solutions)',
        noteStyle: 'topper',
        language: 'English',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.subject).toBe('Mathematics');
    expect(kit.chapter).toContain('Quadratic');

    // 1. Topper Notes: Check standard form a ≠ 0, Discriminant D, completing square derivation
    const topper = kit.content.topper;
    expect(topper.deepDive[0].content).toContain('a ≠ 0');
    expect(topper.deepDive[1].comparisonTable).toBeDefined();
    expect(topper.deepDive[1].comparisonTable?.headers).toContain('Condition on D');
    
    // Check solved example with alternative methods (factorisation & quadratic formula)
    const worked = topper.deepDive[2].workedExample;
    expect(worked).toBeDefined();
    expect(worked?.solution).toContain('Method (a) - Factorisation');
    expect(worked?.solution).toContain('Method (b) - Quadratic Formula');
    expect(worked?.solution).toContain('x = 3 or x = 1/2');

    // Check step-by-step derivation by completing the square
    const deriv = topper.derivations[0];
    expect(deriv.title).toContain('Completing the Square');
    expect(deriv.steps.join(' ')).toContain('b² / (4a²)');
    expect(deriv.finalResult).toContain('x = [-b ± √(b² - 4ac)] / (2a)');

    // 2. Quick Notes: Discriminant formulas and Vieta relations
    const quick = kit.content.quick;
    const formulasStr = JSON.stringify(quick?.formulas);
    expect(formulasStr).toContain('D = b² - 4ac');
    expect(formulasStr).toContain('α + β = -b/a');

    // 3. Chatpata Notes: Relatable analogies
    const chatpata = kit.content.chatpata;
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('X-Ray Machine');

    // 4. Exam Mode: k-value question and speed-distance upstream/downstream
    const exam = kit.content.exam;
    expect(exam.questions[1].question).toContain('k - 12');
    expect(exam.questions[1].answer).toContain('k = 12 is rejected');
    expect(exam.questions[2].question).toContain('motor boat');
    expect(exam.questions[2].answer).toContain('6 km/h');
  });

  // =========================================================================
  // 4. TARGET 3: CLASS 11 PHYSICS — LAWS OF MOTION
  // =========================================================================
  it('Target 3: Generates comprehensive methodology notes for Class 11 Physics (Laws of Motion)', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Physics_Laws_of_Motion.mp4',
        academicClass: 'Class 11',
        subject: 'Physics',
        chapter: 'Laws of Motion (Newton\'s Laws, Friction & Momentum)',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.subject).toBe('Physics');
    expect(kit.chapter).toContain('Laws of Motion');

    // 1. Topper Notes: Check physical laws, SI units, FBD diagrams, banking derivation
    const topper = kit.content.topper;
    expect(topper.deepDive[0].content).toContain('[M¹ L¹ T⁻²]');
    expect(topper.deepDive[0].content).toContain('F⃗_AB = -F⃗_BA');
    
    // Check Free Body Diagram description and rules
    const fbdSection = topper.deepDive[1];
    expect(fbdSection.diagramDescription).toBeDefined();
    expect(fbdSection.diagramDescription?.visualLayout).toContain('Normal Reaction');
    expect(fbdSection.diagramDescription?.visualLayout).toContain('mg');

    // Check solved numerical: Cricket ball catch impulse
    const numSection = topper.deepDive[2];
    expect(numSection.workedExample?.problem).toContain('cricket ball');
    expect(numSection.workedExample?.solution).toContain('3.0 N·s');
    expect(numSection.workedExample?.solution).toContain('30 N');

    // Check derivations: Banking of Roads and F = ma
    expect(topper.derivations.length).toBeGreaterThanOrEqual(2);
    expect(topper.derivations[0].finalResult).toContain('v_max = √');
    expect(topper.derivations[1].finalResult).toContain('F = m · a');

    // 2. Quick Notes:
    const quick = kit.content.quick;
    const formulasStr = JSON.stringify(quick?.formulas);
    expect(formulasStr).toContain('p = m · v');
    expect(formulasStr).toContain('J = F_avg · Δt = Δp');
    expect(formulasStr).toContain('v_opt = √(r · g · tan θ)');

    // 3. Chatpata Notes:
    const chatpata = kit.content.chatpata;
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('Aalaspana');
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('Rohit Sharma');

    // 4. Exam Mode:
    const exam = kit.content.exam;
    expect(exam.questions[0].answer).toContain('μ_s > μ_k');
    expect(exam.questions[1].answer).toContain('F = ma');
    expect(exam.questions[2].question).toContain('banking of roads');
  });

  // =========================================================================
  // 5. TARGET 4: CLASS 11 BIOLOGY — PHOTOSYNTHESIS
  // =========================================================================
  it('Target 4: Generates comprehensive methodology notes for Class 11 Biology (Photosynthesis)', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Biology_Photosynthesis_in_Higher_Plants.mp4',
        academicClass: 'Class 11',
        subject: 'Biology',
        chapter: 'Photosynthesis in Higher Plants (Light Reactions & Calvin Cycle)',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.subject).toBe('Biology');
    expect(kit.chapter).toContain('Photosynthesis');

    // 1. Topper Notes: Chloroplast ultrastructure, Z-scheme, Calvin cycle stoichiometry
    const topper = kit.content.topper;
    expect(topper.deepDive[0].diagramDescription).toBeDefined();
    expect(topper.deepDive[0].diagramDescription?.visualLayout).toContain('STROMA');
    expect(topper.deepDive[0].diagramDescription?.visualLayout).toContain('GRANA');

    // Check cyclic vs non-cyclic comparison table
    const sec2 = topper.deepDive[1];
    expect(sec2.comparisonTable).toBeDefined();
    expect(sec2.comparisonTable?.rows.some(r => r[0].includes('Photolysis of Water'))).toBe(true);

    // Check Calvin cycle solved example: 2 sucrose molecules
    const sec3 = topper.deepDive[2];
    expect(sec3.workedExample?.problem).toContain('sucrose');
    expect(sec3.workedExample?.solution).toContain('72 ATP and 48 NADPH');

    // Check Calvin cycle derivation
    const deriv = topper.derivations[0];
    expect(deriv.finalResult).toContain('18 ATP + 12 NADPH');

    // 2. Quick Notes: Master equation and photolysis reaction
    const quick = kit.content.quick;
    const formulasStr = JSON.stringify(quick?.formulas);
    expect(formulasStr).toContain('CO₂');
    expect(formulasStr).toContain('2 H₂O → 4 H⁺ + 4 e⁻ + O₂');

    // 3. Chatpata Notes:
    const chatpata = kit.content.chatpata;
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('RuBisCO');
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('solar power plant');

    // 4. Exam Mode:
    const exam = kit.content.exam;
    expect(exam.questions[0].answer).toContain('Ribulose-1,5-bisphosphate');
    expect(exam.questions[1].question).toContain('Cyclic and Non-Cyclic');
    expect(exam.questions[2].answer).toContain('18 ATP and 12 NADPH');
  });

  // =========================================================================
  // 6. TARGET 5: CLASS 11/12 ECONOMICS — NATIONAL INCOME
  // =========================================================================
  it('Target 5: Generates comprehensive methodology notes for Class 11/12 Economics (National Income)', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_12_Economics_National_Income_Accounting.mp4',
        academicClass: 'Class 12',
        subject: 'Economics',
        chapter: 'National Income Accounting (GDP, GNP, NNP & Measurement Methods)',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.subject).toBe('Economics');
    expect(kit.chapter).toContain('National Income');

    // 1. Topper Notes: Circular flow, 3 golden rules, solved numerical with ₹ Crores
    const topper = kit.content.topper;
    expect(topper.deepDive[0].diagramDescription).toBeDefined();
    expect(topper.deepDive[0].diagramDescription?.visualLayout).toContain('HOUSEHOLDS');
    expect(topper.deepDive[0].diagramDescription?.visualLayout).toContain('FIRMS');

    // Check comparison table: Gross/Net, Domestic/National, MP/FC
    const sec2 = topper.deepDive[1];
    expect(sec2.comparisonTable).toBeDefined();
    expect(sec2.comparisonTable?.rows.some(r => r[0].includes('Foreign Income'))).toBe(true);

    // Check solved numerical
    const sec3 = topper.deepDive[2];
    expect(sec3.workedExample?.problem).toContain('GDP_MP');
    expect(sec3.workedExample?.solution).toContain('₹10,100 Crores');
    expect(sec3.workedExample?.workingNotes).toContain('NFIA is negative');

    // Check derivation: NNP_FC = GDP_MP - Dep + NFIA - NIT
    expect(topper.derivations[0].finalResult).toContain('NNP_FC = GDP_MP - Depreciation + NFIA - (Indirect Taxes - Subsidies)');

    // 2. Quick Notes: Master conversion equation
    const quick = kit.content.quick;
    const formulasStr = JSON.stringify(quick?.formulas);
    expect(formulasStr).toContain('NNP_FC = GDP_MP - Depreciation + NFIA - NIT');
    expect(formulasStr).toContain('Operating Surplus');

    // 3. Chatpata Notes:
    const chatpata = kit.content.chatpata;
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('Transfer Payments');
    expect(JSON.stringify(chatpata?.desiAnalogies)).toContain('Purani Maruti 800');

    // 4. Exam Mode:
    const exam = kit.content.exam;
    expect(exam.questions[0].answer).toContain('unilateral transfer payments');
    expect(exam.questions[2].answer).toContain('₹5,200 Crores');
  });

  // =========================================================================
  // 7. UNFAMILIAR TOPIC TEST (Adaptive General Domain Engine)
  // =========================================================================
  it('Target 6: Dynamically constructs complete methodology notes for unfamiliar arbitrary topics', async () => {
    // Arbitrary unhardcoded topic: Class 11 Chemistry — Chemical Thermodynamics & Enthalpy
    const kit = await processEducationalLecture(
      {
        sourceType: 'link',
        sourceIdentifier: 'https://www.youtube.com/watch?v=unfamiliarChemistry999',
        customTopic: 'Chemical Bonding & Hybridization (sp, sp2, sp3 & VSEPR Theory)',
        academicClass: 'Class 11',
        subject: 'Chemistry',
        noteStyle: 'topper',
        language: 'English',
        autoDetect: false,
      },
      () => {}
    );

    expect(kit.subject).toBe('Chemistry');
    expect(kit.chapter).toContain('Chemical Bonding');

    // Verify complete 4 note styles exist and are well-formed
    expect(kit.content.topper).toBeDefined();
    expect(kit.content.topper.deepDive.length).toBeGreaterThanOrEqual(3);
    expect(kit.content.topper.derivations.length).toBeGreaterThanOrEqual(1);

    expect(kit.content.quick).toBeDefined();
    expect(kit.content.quick?.formulas.length).toBeGreaterThanOrEqual(1);
    expect(kit.content.quick?.cheatSheet.length).toBeGreaterThanOrEqual(3);

    expect(kit.content.chatpata).toBeDefined();
    expect(kit.content.chatpata?.desiAnalogies.length).toBeGreaterThanOrEqual(1);

    expect(kit.content.exam).toBeDefined();
    expect(kit.content.exam.questions.length).toBeGreaterThanOrEqual(3);

    // Verify Grounding Quality Gate passes with flying colors (>= 80/100)
    const qualityReport = validateLectureGrounding(kit, kit.verifiedLecture!);
    expect(qualityReport.passed).toBe(true);
    expect(qualityReport.qualityScore).toBeGreaterThanOrEqual(80);
  });

  // =========================================================================
  // 8. COMPARISON OF ALL FOUR FINISHED NOTE STYLES
  // =========================================================================
  it('Target 7: Verifies that all 4 note styles serve distinctly different educational purposes', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'upload',
        sourceIdentifier: 'Class_11_Maths_Quadratic_Equations.mp4',
        academicClass: 'Class 11',
        subject: 'Mathematics',
        chapter: 'Quadratic Equations',
        noteStyle: 'topper',
        language: 'Hinglish',
        autoDetect: false,
      },
      () => {}
    );

    // Style 1: Topper Notes — Detailed academic depth, derivations, proofs
    expect(kit.content.topper.deepDive[0].content.length).toBeGreaterThan(200);
    expect(kit.content.topper.derivations.length).toBeGreaterThanOrEqual(1);

    // Style 2: Quick Notes — High-density, concise bullets, equations
    expect(kit.content.quick?.cheatSheet.length).toBeGreaterThanOrEqual(4);
    expect(kit.content.quick?.formulas.length).toBeGreaterThanOrEqual(3);

    // Style 3: Chatpata Notes — Relatable analogies, desi punchlines, memory tricks
    expect(kit.content.chatpata?.desiAnalogies.length).toBeGreaterThanOrEqual(2);
    expect(kit.content.chatpata?.desiAnalogies[0].desiPunchline).toBeDefined();

    // Style 4: Exam Mode — Step-marking schemes, 1/3/5 mark questions
    expect(kit.content.exam.questions.length).toBe(3);
    expect(kit.content.exam.questions[0].markingScheme.length).toBeGreaterThanOrEqual(1);
    expect(kit.content.exam.questions[2].markingScheme.length).toBeGreaterThanOrEqual(3);
  });
});
