import type { 
  StudyKit, 
  Subject, 
  AcademicClass, 
  TimestampConcept, 
  Flashcard, 
  QuizQuestion 
} from '../types';

export function buildDynamicKitContent(
  subject: Subject,
  chapter: string,
  _academicClass: AcademicClass,
  _stream?: string
): {
  content: StudyKit['content'];
  timestamps: TimestampConcept[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  quickRevisionPoints: string[];
} {
  const sLower = (subject || '').toLowerCase();
  const cLower = (chapter || '').toLowerCase();

  // 1. COMMERCE / ECONOMICS / ACCOUNTANCY / BUSINESS
  if (
    sLower.includes('econo') || 
    sLower.includes('account') || 
    sLower.includes('commerce') || 
    sLower.includes('business') ||
    cLower.includes('econo') ||
    cLower.includes('gdp') ||
    cLower.includes('market') ||
    cLower.includes('demand')
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Core Economic Essentials & Formulations`,
          cheatSheet: [
            `Equilibrium Rule: Market clears where Aggregate Demand equals Aggregate Supply (AD = AS).`,
            `Elasticity Boundary: Inelastic demand (e_d < 1) indicates necessity goods with minimal price sensitivity.`,
            `Multiplier Foundation: The size of the expenditure multiplier depends directly on the Marginal Propensity to Consume (MPC).`,
            `High-Frequency Trap: Never confuse nominal GDP with real GDP; real GDP must always adjust for general price inflation.`,
          ],
          formulas: [
            { name: 'Price Elasticity of Demand', formula: 'e_d = (ΔQ / ΔP) × (P / Q)', note: 'Strictly negative by law of demand; expressed in absolute value' },
            { name: 'National Income Equilibrium', formula: 'Y = C + I + G + (X - M)', note: 'Expenditure approach to Gross Domestic Product' },
            { name: 'Investment Multiplier (k)', formula: 'k = 1 / (1 - MPC) = 1 / MPS', note: 'Higher MPC yields a exponentially larger multiplier effect' },
            { name: 'Valuation of Goodwill (Super Profit)', formula: 'Goodwill = (Actual Profit - Normal Profit) × No. of Years', note: 'Standard partnership accounting convention' },
          ],
          bulletSummary: [
            'Fiscal vs Monetary Policy: Government taxes and spendings vs Central Bank interest rates and reserve ratios.',
            'Board-Standard Presentation: Always draw labeled schedules and state the ceteris paribus assumption.',
          ],
        },
        minimal: {
          headline: `${chapter} Quick Commerce Summary`,
          cheatSheet: [
            'Market clears where Aggregate Demand equals Aggregate Supply.',
            'Investment Multiplier depends directly on MPC: k = 1 / (1 - MPC).',
          ],
          formulas: [
            { name: 'Multiplier', formula: 'k = 1 / (1 - MPC)', note: 'Dimensionless ratio' },
          ],
          bulletSummary: ['Macroeconomic equilibrium and fiscal policy tools.'],
        },
        topper: {
          introduction: `Comprehensive analytical breakdown of ${subject}: ${chapter}. Structured according to NCERT, CBSE, and undergraduate commerce curricula. Emphasizes mathematical models, market diagrams, and policy implications.`,
          deepDive: [
            {
              title: `1. Foundational Equilibrium & Behavioral Assumptions in ${chapter}`,
              timestamp: '02:30',
              content: `The lecture analyzes behavioral incentives governing market participants. Under competitive market conditions, price functions as an allocative rationing device, equating marginal consumer benefit to marginal producer cost.`,
              keyTakeaway: 'Always state the ceteris paribus condition (all other determinants held constant) before drawing shifts in curve schedules.',
            },
            {
              title: '2. Mathematical Formulation of Multiplier & National Accounting',
              timestamp: '15:10',
              content: 'Detailed derivation showing how an autonomous injection into investment cycles repeatedly through household consumption, producing a cumulative income expansion far exceeding initial outlay.',
              keyTakeaway: 'Plot Price on the vertical Y-axis and Quantity on the horizontal X-axis with clean intersect coordinates to secure full 5-mark presentation scores.',
            },
          ],
          derivations: [
            {
              title: 'Mathematical Derivation of Investment Multiplier (k)',
              steps: [
                'State baseline macroeconomic equilibrium: Y = C + I',
                'Substitute linear consumption function: C = c0 + b·Y (where b = MPC)',
                'Substitute into equilibrium equation: Y = c0 + b·Y + I',
                'Isolate Y on left-hand side: Y · (1 - b) = c0 + I',
                'Take first-order differential with respect to investment: dY / dI = 1 / (1 - b)',
              ],
              finalResult: 'k = dY / dI = 1 / (1 - MPC) = 1 / MPS',
            },
          ],
          proTips: [
            'In national income accounting, transfer payments (pensions, pocket money) are NEVER included in GDP because no productive value is generated.',
            'Always double underline final calculated values and state measurement units in ₹ Crores or metric equivalents.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple desi hisaab-kitaab hai! Market ka seedha usool hai: jitni demand utna daam, aur pocket tight toh kharcha lite!`,
          desiAnalogies: [
            {
              concept: 'Demand & Supply Equilibrium',
              analogy: 'Diwali ke week mein jab Kaju Katli ki demand achanak badhti hai, toh dukandar discount band kar deta hai! Par jaise hi festival nikalta hai, price wapas normal par aa jata hai.',
              desiPunchline: 'Demand high toh rate sky-high!',
            },
            {
              concept: 'Credit Creation by Banks',
              analogy: 'Bank bilkul society ke committee fund jaisa hai: ek member ne ₹10,000 jama kiye, bank ne usme se ₹2,000 reserve rakh kar baaki ₹8,000 dusre ko loan par de diya! Paise se paisa create ho gaya.',
              desiPunchline: 'Gullak me rakhoge toh wahi rahega, bank me ghumega toh economy chalegi!',
            },
          ],
          bhaiKaSummary: [
            'Formula trick: MPC + MPS = 1. Agar question mein MPC = 0.8 diya hai toh MPS chupchap 0.2 likh lo!',
            'Deficit budget ka seedha matlab: kamai chawanni, kharcha rupaiya!',
          ],
          jugaadPoints: [
            'Agar exam numerical mein "autonomous investment" bole, toh yaad rakhna yeh income par depend nahi karti, seedha constant value hoti hai!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Consistently tested in CBSE Senior Secondary and state board examinations. High probability of one 3-mark multiplier numerical and one 5-mark policy mechanism question.`,
          highWeightageTopics: [
            `Numerical computation of Multiplier and National Income equilibrium (3-4 Marks)`,
            'Distinction between Autonomous vs Induced expenditures (2 Marks)',
            'Central Bank monetary policy instruments: Repo Rate, CRR & Open Market Operations (5 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Define Marginal Propensity to Consume (MPC) and state its mathematical range of values.',
              answer: 'Marginal Propensity to Consume (MPC) is the ratio of change in consumption expenditure (ΔC) to change in total income (ΔY), given by MPC = ΔC / ΔY. Its value strictly lies between 0 and 1.',
              markingScheme: ['Correct definition (½ mark)', 'Stating bounds 0 ≤ MPC ≤ 1 (½ mark)'],
              frequentlyAskedIn: 'CBSE Commerce 2023, State Board 2024',
            },
            {
              id: 2,
              marks: 3,
              question: 'In an economy, MPC is 0.75. If investment expenditure increases by ₹600 Crores, calculate the total increase in National Income.',
              answer: 'Investment multiplier k = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4. Total increase in National Income ΔY = k × ΔI = 4 × ₹600 Crores = ₹2,400 Crores.',
              markingScheme: ['Multiplier formula and calculation k = 4 (1.5 marks)', 'Final income computation with ₹ Crores unit (1.5 marks)'],
              frequentlyAskedIn: 'CBSE 2024, CISCE 2023',
            },
          ],
        },
      },
      timestamps: [
        { time: '01:45', seconds: 105, title: 'Introduction & Core Market Assumptions', summary: 'Definitions of fundamental terms and equilibrium constraints.' },
        { time: '13:20', seconds: 800, title: 'Mathematical Formulation & Curve Shifts', summary: 'Step-by-step algebraic derivation of governing equations.' },
        { time: '26:10', seconds: 1570, title: 'Common Traps & Examination Rubrics', summary: 'Examiner expectations and presentation tips for full marks.' },
      ],
      flashcards: [
        { id: 1, front: `What is the core premise of ${chapter}?`, back: 'Equilibrium allocation of scarce resources where marginal benefit equals marginal cost.', concept: 'Core Principle' },
        { id: 2, front: 'Why are transfer payments excluded from GDP calculations?', back: 'Because transfer payments do not reflect current production of any new goods or services.', concept: 'National Accounting' },
        { id: 3, front: 'What is the mathematical relationship between MPC and MPS?', back: 'MPC + MPS = 1. Every rupee of additional income is either consumed or saved.', concept: 'Macroeconomic Identity' },
      ],
      quiz: [
        {
          id: 1,
          question: `In ${chapter}, what happens to the investment multiplier if MPC increases from 0.5 to 0.8?`,
          options: ['Multiplier increases from 2 to 5', 'Multiplier decreases from 5 to 2', 'Multiplier remains unchanged', 'Multiplier drops to zero'],
          correctIndex: 0,
          explanation: 'Since k = 1 / (1 - MPC), as MPC rises from 0.5 to 0.8, k rises from 1/0.5 = 2 to 1/0.2 = 5.',
          topic: `${chapter} Multiplier`,
        },
        {
          id: 2,
          question: 'Which of the following is considered an autonomous transaction in Balance of Payments?',
          options: ['Transactions undertaken for private economic motive', 'Accommodating central bank loans', 'SDR allocations', 'Foreign exchange reserve adjustments'],
          correctIndex: 0,
          explanation: 'Autonomous transactions are determined by considerations of profit or commercial motive, independent of the BoP balance state.',
          topic: 'Balance of Payments',
        },
        {
          id: 3,
          question: 'What is the primary factor that causes mark deductions in numerical questions for this subject?',
          options: ['Omitting monetary units (₹ Crores) in final answer', 'Writing too neatly', 'Using pencil for calculations', 'Using standard decimal notation'],
          correctIndex: 0,
          explanation: 'Official CBSE and university marking rubrics explicitly allocate ½ to 1 mark for explicit units of measurement.',
          topic: 'Exam Presentation',
        },
      ],
      quickRevisionPoints: [
        `Governing rule: Macroeconomic equilibrium requires Aggregate Demand to equal Aggregate Output.`,
        'Multiplier relation: k = 1 / (1 - MPC) = 1 / MPS.',
        'Policy distinction: Monetary policy is governed by the Central Bank; Fiscal policy is set by government budgets.',
        'Unit discipline: Always state answers in exact units (₹ Crores, percentage rates).',
      ],
    };
  }

  // 2. SOCIAL SCIENCE (SST) / HISTORY / POLITICAL SCIENCE / HUMANITIES
  if (
    sLower.includes('history') || 
    sLower.includes('social') || 
    sLower.includes('sst') || 
    sLower.includes('polity') ||
    sLower.includes('geography') ||
    cLower.includes('revolution') ||
    cLower.includes('civilization') ||
    cLower.includes('nationalism') ||
    cLower.includes('constitution') ||
    cLower.includes('war')
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — High-Yield Chronology & Revision Framework`,
          cheatSheet: [
            `Chronological Sequence: Trace events from initial structural grievances to legislative or institutional resolution.`,
            `Source Verification: Distinguish between primary sources (contemporary inscriptions, seals, diaries) and secondary historical accounts.`,
            `Constitutional Balance: Democratic resilience relies on checks and balances across independent institutional organs.`,
            `Exam Presentation: Structure every answer with point-wise headings, underlined historical dates, and key historical actors.`,
          ],
          formulas: [
            { name: 'Historical Causation Matrix', formula: 'Structural Causes + Immediate Trigger = Revolutionary Event', note: 'Analytical model for socio-political transformations' },
            { name: 'Constitutional Separation of Powers', formula: 'Legislature (Laws) ⇄ Executive (Implementation) ⇄ Judiciary (Review)', note: 'Democratic constitutional doctrine' },
            { name: 'Historiographical Source Reliability', formula: 'Archaeological Inscription + Epigraphy + Literary Cross-Verification', note: 'Primary evidence corroboration standard' },
          ],
          bulletSummary: [
            'Socio-Economic Drivers: Agrarian distress, taxation burdens, and denial of civil liberties drove mass mobilization.',
            'Institutional Legacy: Historical movements shaped contemporary democratic constitutional frameworks.',
          ],
        },
        minimal: {
          headline: `${chapter} Quick History Summary`,
          cheatSheet: [
            'Chronological sequence of key events and structural causes.',
            'Significance of primary archaeological and documentary evidence.',
          ],
          formulas: [
            { name: 'Causation Flow', formula: 'Causes → Movement → Constitutional Impact', note: 'Standard historical paradigm' },
          ],
          bulletSummary: ['Core events, key dates, and institutional transformations.'],
        },
        topper: {
          introduction: `Comprehensive historiographical analysis for ${subject}: ${chapter}. Synthesizes primary archival evidence, chronological sequences, and socio-political developments in alignment with NCERT and board syllabi.`,
          deepDive: [
            {
              title: `1. Socio-Political Context & Structural Grievances of ${chapter}`,
              timestamp: '02:15',
              content: `The lecture traces deep-seated economic and societal pressures that preceded the movement. Discontent among peasantry, restrictive state laws, and ideological writings created the intellectual climate for widespread transformation.`,
              keyTakeaway: 'Always distinguish underlying structural causes from the immediate catalyst when explaining historical turning points.',
            },
            {
              title: '2. Mass Mobilization, Constitutional Debates & Lasting Impact',
              timestamp: '14:40',
              content: 'Detailed evaluation of how collective identity was forged through national symbols, folklore, civil boycotts, and constitutional debates leading up to modern democratic institutions.',
              keyTakeaway: 'Underline specific years, legislative acts, and treaty names in black ink to guarantee maximum presentation score.',
            },
          ],
          derivations: [
            {
              title: `Chronological & Causal Progression of ${chapter}`,
              steps: [
                'Initial Stage: Escalation of socio-economic grievances and agrarian/civic discontent',
                'Catalytic Trigger: Introduction of oppressive legislations or immediate flashpoint event',
                'Mobilization Phase: Non-cooperation, public assembly, and circulation of nationalist literature',
                'Institutional Climax: Negotiations, drafting of foundational charters, and constitutional codification',
              ],
              finalResult: 'Establishment of Sovereign Constitutional Order and Democratic Rights',
            },
          ],
          proTips: [
            'In 5-mark historical answers, write exactly 5 distinct paragraphs, each with an underlined sub-heading.',
            'Never write history answers as one giant unbroken narrative block; examiners grade by verified thematic points.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} koi boriyat bhari kahani nahi hai! Yeh bilkul blockbuster Bollywood movie jaisa hai: ek taraf rules aur taxes ka dabav, dusri taraf aam janta ka ekjut hokar aawaz uthana!`,
          desiAnalogies: [
            {
              concept: 'Archaeological & Historical Evidence',
              analogy: 'Bina solid proofs aur seals ke history likhna bilkul WhatsApp rumors par vishwas karne jaisa hai! Real historians har date aur inscription ka carbon-dating proof mangte hain.',
              desiPunchline: 'No Proof, No History, Boss!',
            },
            {
              concept: 'Civil Resistance & Collective Identity',
              analogy: 'Jab society ke saare log milkar decide kar lein ki bina permission ke koi rule nahi manenge, toh powerful authorities ko bhi table par aakar baat karni padti hai.',
              desiPunchline: 'Ekta mein hi power hai!',
            },
          ],
          bhaiKaSummary: [
            'Timeline yaad rakhne ka cheat code: Pehle samasya (causes), fir aawaz (movement), aur aakhir me faisla (treaty/constitution).',
            'Important dates ko margin me likh kar ek baar revise kar lo, exam me recall fast hoga.',
          ],
          jugaadPoints: [
            'Map-based questions mein boundary lines aur rivers ko pehle identify karo, marks 100% full milte hain!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Consistently featured across board exams. Anticipate 1 source-based case study question (4 marks) and 1 analytical essay question (5 marks).`,
          highWeightageTopics: [
            `Detailed causes and consequences of ${chapter} (5 Marks)`,
            'Role of leaders, primary documents, and socio-religious reforms (3 Marks)',
            'Source-based interpretation and Historical Map locations (4 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: `Identify the primary historical significance or founding charter associated with ${chapter}.`,
              answer: `It established foundational civil liberties and collective constitutional principles that limited arbitrary executive power and unified public participation.`,
              markingScheme: ['Accurate historical identification (1 mark)'],
              frequentlyAskedIn: 'CBSE Social Science 2023, State Board 2024',
            },
            {
              id: 2,
              marks: 3,
              question: `Analyze three key factors that contributed to the mass spread of the movement in ${chapter}.`,
              answer: `1. Economic distress among farmers and workers; 2. Unified leadership and vernacular communication; 3. Use of collective cultural symbols and civil boycotts that resonated across demographic lines.`,
              markingScheme: ['Three distinct points with sub-headings (1 mark each = 3 marks)'],
              frequentlyAskedIn: 'CBSE Board 2024, ICSE 2023',
            },
          ],
        },
      },
      timestamps: [
        { time: '01:30', seconds: 90, title: 'Historical Background & Origins', summary: 'Socio-economic setting and initial grievances.' },
        { time: '14:15', seconds: 855, title: 'Turning Points & Mass Mobilization', summary: 'Key campaigns, legislative debates, and events.' },
        { time: '25:40', seconds: 1540, title: 'Constitutional Legacy & Exam Rubric', summary: 'Long-term historical impact and scoring strategies.' },
      ],
      flashcards: [
        { id: 1, front: `What was the primary trigger for ${chapter}?`, back: 'Accumulation of socio-political grievances coupled with an oppressive legislative or authoritarian flashpoint.', concept: 'Historical Causation' },
        { id: 2, front: 'Why are primary sources prioritized by historians?', back: 'Because they provide first-hand contemporary testimony created during the time period under study.', concept: 'Historical Methodology' },
        { id: 3, front: 'What is the most effective format for answering 5-mark history questions?', back: 'Point-wise format with 5 distinct paragraphs, each led by an underlined conceptual heading.', concept: 'Exam Technique' },
      ],
      quiz: [
        {
          id: 1,
          question: `In historical analysis of ${chapter}, which of the following constitutes primary documentary evidence?`,
          options: ['Contemporary official dispatches, inscriptions, and personal diaries', 'A modern textbook published in 2020', 'A dramatic feature film', 'An unverified internet blog'],
          correctIndex: 0,
          explanation: 'Primary sources are original materials created at the exact time under historical investigation.',
          topic: `${chapter} Historical Sources`,
        },
        {
          id: 2,
          question: 'What is the primary factor that earns full marks in CBSE Social Science / History answers?',
          options: ['Structured point-wise presentation with distinct underlined subheadings', 'Writing in poetic prose', 'Using multiple color pens', 'Filling extra answer booklets without structure'],
          correctIndex: 0,
          explanation: 'Examiner rubrics explicitly award points for discrete, clearly titled arguments addressing the prompt.',
          topic: 'Answer Writing Rubric',
        },
        {
          id: 3,
          question: 'How did collective cultural symbols aid historical mobilization?',
          options: ['By providing relatable shared visual identities across diverse linguistic groups', 'By reducing food prices', 'By creating military weapons', 'By eliminating economic taxes'],
          correctIndex: 0,
          explanation: 'National flags, songs, and icons created an imagined shared identity that unified fragmented populations.',
          topic: 'National Identity',
        },
      ],
      quickRevisionPoints: [
        `Historical causation: Always separate structural background causes from the immediate catalyst.`,
        'Source discipline: Distinguish primary inscriptions and archival documents from secondary interpretations.',
        'Answer structure: 5-mark questions require 5 discrete points with underlined headings.',
        'Chronological clarity: Keep a clear mental timeline of key milestone years.',
      ],
    };
  }

  // 2.5 CLASS 11 MATHEMATICS — SETS & RELATIONS (ROSTER, SET-BUILDER, SUBSETS, VENN DIAGRAMS)
  if (
    cLower.includes('set') || 
    cLower.includes('roster') || 
    cLower.includes('venn') ||
    cLower.includes('subset') ||
    (sLower.includes('math') && cLower.includes('sets'))
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Essential Axioms, Set Operations & Venn Diagrams`,
          cheatSheet: [
            'Well-Defined Collection: A set is a well-defined collection of distinct objects; subjective collections ("five best players") are NOT sets.',
            'Subsets & Power Set Rule: If a finite set has n elements, total number of subsets is 2^n, and number of proper subsets is 2^n - 1.',
            'Cardinality Identity: For any two finite sets A and B, n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
            "De Morgan's Laws: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'.",
            'Empty Set vs Singleton: ∅ (or {}) contains 0 elements; {∅} is a singleton set containing the empty set as an element.',
          ],
          formulas: [
            { name: 'Cardinality of Union of Two Sets', formula: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)', note: 'Subtract intersection to eliminate double counting' },
            { name: 'Power Set Cardinality', formula: '|P(A)| = 2^n', note: 'Total number of subsets for any finite set of size n' },
            { name: 'Proper Subsets Count', formula: '2^n - 1', note: 'Excludes the improper subset (the set itself)' },
            { name: "De Morgan's First Law", formula: "(A ∪ B)' = A' ∩ B'", note: 'Complement of union equals intersection of complements' },
            { name: "De Morgan's Second Law", formula: "(A ∩ B)' = A' ∪ B'", note: 'Complement of intersection equals union of complements' },
            { name: 'Difference of Sets Identity', formula: "A - B = A ∩ B'", note: 'Elements present in A but strictly not in B' },
          ],
          bulletSummary: [
            'Roster vs Set-Builder: Roster lists elements explicitly inside {a, b, c}; Set-Builder states the defining property {x : P(x)}.',
            'Disjoint Sets: Two sets A and B are disjoint if and only if A ∩ B = ∅.',
          ],
        },
        minimal: {
          headline: `${chapter} Core Set Relations`,
          cheatSheet: [
            'Well-defined collection: no ambiguity of membership.',
            'Cardinality identity: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
            'Number of subsets: 2^n.',
          ],
          formulas: [
            { name: 'Union Cardinality', formula: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)', note: 'Two-set cardinality' },
            { name: 'Subsets Count', formula: '|P(A)| = 2^n', note: 'Power set size' },
          ],
          bulletSummary: ['Core set definitions, representations, and Venn diagrams.'],
        },
        topper: {
          introduction: `Comprehensive analytical breakdown of ${subject}: ${chapter}. Grounded in CBSE Class 11 Mathematics and NCERT curriculum standards. Covers foundations of set theory, representations, algebraic operations, Venn diagrams, and cardinality proofs.`,
          deepDive: [
            {
              title: '1. Foundational Axioms, Well-Defined Membership & Representations',
              timestamp: '00:00',
              content: 'The lecture establishes Georg Cantor’s Set Theory. A set is defined as a well-defined collection of distinct objects. "Well-defined" ensures a deterministic criterion for whether any given element belongs to the collection. Representations: Roster (tabular) form lists elements between curly braces {2, 3, 5, 7}, where element order is irrelevant and duplicates are omitted. Set-builder form states the characteristic property {x : x ∈ ℕ and x < 10}.',
              keyTakeaway: 'Subjective collections like "talented poets" or "difficult chapters" are NOT sets in mathematics because membership criteria depend on personal opinion.',
            },
            {
              title: '2. Subsets, Power Sets & Interval Notation on the Real Line',
              timestamp: '14:15',
              content: 'A is a subset of B (A ⊆ B) if every element of A is also an element of B. The empty set ∅ is a subset of every set (∅ ⊆ A), and every set is a subset of itself (A ⊆ A). For a finite set with n elements, the total number of subsets in its Power Set P(A) is 2^n, and proper subsets is 2^n - 1. Real intervals: open interval (a, b) excludes endpoints; closed interval [a, b] includes endpoints.',
              keyTakeaway: 'Never write {∅} for the empty set. {∅} is a non-empty singleton set whose single element is the empty set itself.',
            },
            {
              title: '3. Venn Diagrams, Set Operations & Cardinality Relations',
              timestamp: '20:50',
              content: 'John Venn formulated geometric representations using a rectangle for the Universal set U and circles for subsets. Key operations: Union A ∪ B (elements in A or B or both), Intersection A ∩ B (common elements), Difference A - B (elements in A not in B), and Complement A\' = U - A. De Morgan’s Laws prove that (A ∪ B)\' = A\' ∩ B\' and (A ∩ B)\' = A\' ∪ B\'.',
              keyTakeaway: 'In two-set survey problems, n(A ∪ B) = n(A) + n(B) - n(A ∩ B). The subtraction compensates for counting the overlapping intersection region twice.',
            },
          ],
          derivations: [
            {
              title: 'Formal Proof of Cardinality Formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
              steps: [
                'Express the union A ∪ B as the union of three mutually disjoint sets: (A - B), (B - A), and (A ∩ B)',
                'Write the sum of elements: n(A ∪ B) = n(A - B) + n(B - A) + n(A ∩ B)',
                'From set algebra: A is the disjoint union of (A - B) and (A ∩ B), so n(A) = n(A - B) + n(A ∩ B) => n(A - B) = n(A) - n(A ∩ B)',
                'Similarly: B is the disjoint union of (B - A) and (A ∩ B), so n(B) = n(B - A) + n(A ∩ B) => n(B - A) = n(B) - n(A ∩ B)',
                'Substitute (A - B) and (B - A) into the union sum: n(A ∪ B) = [n(A) - n(A ∩ B)] + [n(B) - n(A ∩ B)] + n(A ∩ B)',
                'Simplify the algebraic terms to achieve the final relation',
              ],
              finalResult: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)',
            },
            {
              title: 'Derivation of Power Set Cardinality |P(A)| = 2^n via Binomial Theorem',
              steps: [
                'Let A be a finite set containing n elements: |A| = n',
                'Number of subsets containing exactly 0 elements is C(n, 0)',
                'Number of subsets containing exactly 1 element is C(n, 1); containing k elements is C(n, k)',
                'Total number of subsets = C(n, 0) + C(n, 1) + C(n, 2) + ... + C(n, n)',
                'Recall Binomial expansion of (1 + x)^n: (1 + x)^n = Σ C(n, k) x^k for k = 0 to n',
                'Substitute x = 1 into the binomial identity: (1 + 1)^n = 2^n = C(n, 0) + C(n, 1) + ... + C(n, n)',
              ],
              finalResult: '|P(A)| = 2^n',
            },
          ],
          proTips: [
            'Distinguish carefully between ∈ (belongs to) and ⊆ (is a subset of). For A = {1, 2}, 1 ∈ A is true, but {1} ⊆ A.',
            'In Venn diagrams, always draw the enclosing Universal rectangle U before drawing intersecting set circles.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, Class 11 Maths ka Sets chapter bilkul chill chapter hai! Sets kuch nahi bas VIP clubs hain: agar rules clear hain toh entry milegi, varna bahar khade raho!`,
          desiAnalogies: [
            {
              concept: 'Well-Defined Collection vs Personal Choice',
              analogy: 'Agar Mummy bole "kitchen ke saare steel ke bartan laao" toh ye Set hai kyunki steel ka bartan well-defined hai. Lekin agar dost bole "duniya ke 5 sabse mast cricketers batao" toh ye set nahi hai, kyunki mast har kisi ke liye alag hota hai!',
              desiPunchline: 'Jisme koi confusion ya personal opinion na ho, wahi asli Set hai boss!',
            },
            {
              concept: 'Intersection of Sets (A ∩ B)',
              analogy: 'Socho A hai dulhe ke dost aur B hai dulhan ke college mates. Jo common log dono taraf se wedding me aake gulab jamun khayenge — wahi hain A ∩ B (Intersection)!',
              desiPunchline: 'Jo dono side me common ho, wahi intersection hai!',
            },
            {
              concept: 'Universal Set (U) and Null Set (∅)',
              analogy: 'Universal Set matlab poora school building, aur Null Set matlab exam se pehle pocket money — bilkul zero, empty set!',
              desiPunchline: 'Null set me zero elements hote hain, bracket khali rakho {}!',
            },
          ],
          bhaiKaSummary: [
            'Roster form = naam lekar attendance {a, e, i, o, u}. Set-builder form = rule likhna {x : x is a vowel}.',
            'Agar n elements hain toh total 2^n subsets banenge.',
            "De Morgan's law: Union ka complement = individual complements ka intersection.",
          ],
          jugaadPoints: [
            'Survey waale 3-circle Venn diagram questions mein hamesha sabse beech waale part (A ∩ B ∩ C) se solve karna start karo, kabhi galti nahi hogi!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, Sets bilkul simple chapter hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Foundational chapter for Class 11 board exams and competitive engineering/medical foundation. Expect 1 1-mark symbol notation question, 1 3-mark De Morgan law verification, and 1 5-mark Venn diagram survey word problem.`,
          highWeightageTopics: [
            'Cardinality Formula & Practical Survey Problems (5 Marks)',
            "Verification of De Morgan's Laws (3 Marks)",
            'Roster Form and Power Set Cardinality 2^n (1-2 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'If set A = {1, 2, 3, 4, 5, 6}, insert the appropriate symbol ∈ or ∉ in the blank space: 4 ___ A and 7 ___ A.',
              answer: '4 ∈ A (4 belongs to set A) and 7 ∉ A (7 does not belong to set A).',
              markingScheme: ['Correct symbol for 4 (½ mark)', 'Correct symbol for 7 (½ mark)'],
              frequentlyAskedIn: 'CBSE Class 11 Mathematics Term 1',
            },
            {
              id: 2,
              marks: 3,
              question: "Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9}, A = {2, 4, 6, 8} and B = {2, 3, 5, 7}. Verify De Morgan's Law: (A ∪ B)' = A' ∩ B'.",
              answer: "1. A ∪ B = {2, 3, 4, 5, 6, 7, 8}.\n2. LHS: (A ∪ B)' = U - (A ∪ B) = {1, 9}.\n3. A' = U - A = {1, 3, 5, 7, 9} and B' = U - B = {1, 4, 6, 8, 9}.\n4. RHS: A' ∩ B' = {1, 9}.\nSince LHS = RHS = {1, 9}, De Morgan's Law is verified.",
              markingScheme: ['Finding A ∪ B and LHS complement (1 mark)', "Finding individual complements A' and B' (1 mark)", 'Taking intersection and proving equality (1 mark)'],
              frequentlyAskedIn: 'NCERT Exemplar, CBSE 2023 Class 11',
            },
            {
              id: 3,
              marks: 5,
              question: 'In a survey of 400 students in a school, 100 were listed as taking apple juice, 150 as taking orange juice, and 75 were listed as taking both apple and orange juice. Find how many students were taking neither apple juice nor orange juice.',
              answer: 'Let U be the set of surveyed students: n(U) = 400.\nLet A = students taking apple juice: n(A) = 100.\nLet B = students taking orange juice: n(B) = 150.\nStudents taking both: n(A ∩ B) = 75.\nApplying cardinality formula:\nn(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 100 + 150 - 75 = 175.\nNumber of students taking neither apple nor orange juice = n((A ∪ B)\') = n(U) - n(A ∪ B) = 400 - 175 = 225.',
              markingScheme: ['Definition of sets and statement of n(U), n(A), n(B), n(A ∩ B) (1 mark)', 'Application of union formula n(A ∪ B) = 175 (2 marks)', 'Complement calculation n(neither) = 400 - 175 = 225 (2 marks)'],
              frequentlyAskedIn: 'CBSE Class 11 Annual Examination Standard Paper',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Introduction & Well-Defined Collections', summary: 'Georg Cantor foundation; defining sets without ambiguity.' },
        { time: '03:45', seconds: 225, title: 'Roster vs Set-Builder Form', summary: 'Listing elements vs specifying defining properties.' },
        { time: '08:30', seconds: 510, title: 'Empty Set & Classification of Sets', summary: 'Null set ∅, singleton sets, finite and infinite sets.' },
        { time: '14:15', seconds: 855, title: 'Subsets & Power Set (2^n)', summary: 'Subset definition, proper subsets, and 2^n cardinality.' },
        { time: '20:50', seconds: 1250, title: 'Venn Diagrams & Set Operations', summary: 'Union, intersection, difference, complement, and De Morgan laws.' },
      ],
      flashcards: [
        { id: 1, front: 'What is a Set?', back: 'A well-defined collection of distinct objects with unambiguous membership.', concept: 'Set Definition' },
        { id: 2, front: 'What is the Power Set of A?', back: 'The set of all subsets of A. If |A| = n, then |P(A)| = 2^n.', concept: 'Power Set' },
        { id: 3, front: "State De Morgan's First Law", back: "(A ∪ B)' = A' ∩ B' (Complement of union equals intersection of complements).", concept: "De Morgan's Law" },
        { id: 4, front: 'What is the formula for n(A ∪ B)?', back: 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B)', concept: 'Union Cardinality' },
        { id: 5, front: 'What are Disjoint Sets?', back: 'Two sets A and B with no common elements (A ∩ B = ∅).', concept: 'Disjoint Sets' },
      ],
      quiz: [
        {
          id: 1,
          question: 'What is the total number of subsets of a set A containing 4 elements?',
          options: ['8', '16', '15', '4'],
          correctIndex: 1,
          explanation: 'The number of subsets in the power set P(A) of a set with n elements is given by 2^n. For n = 4, 2^4 = 16.',
          topic: 'Power Set Cardinality',
        },
        {
          id: 2,
          question: 'If A and B are disjoint sets, then n(A ∩ B) is equal to:',
          options: ['0', '1', 'n(A) + n(B)', 'Undefined'],
          correctIndex: 0,
          explanation: 'By definition, disjoint sets have no common elements, meaning A ∩ B = ∅ and its cardinality n(A ∩ B) is 0.',
          topic: 'Disjoint Sets',
        },
        {
          id: 3,
          question: 'Which of the following is an empty set?',
          options: ['{0}', '{∅}', '{x : x is an even prime number > 2}', '{x : x² - 4 = 0, x ∈ ℝ}'],
          correctIndex: 2,
          explanation: 'The only even prime number is 2. Therefore, no even prime number strictly greater than 2 exists, making this collection an empty set.',
          topic: 'Empty Sets',
        },
        {
          id: 4,
          question: "For any two sets A and B, (A ∪ B)' is equal to:",
          options: ["A' ∪ B'", "A' ∩ B'", 'A ∩ B', "A' - B'"],
          correctIndex: 1,
          explanation: "According to De Morgan's First Law of set complementation, the complement of a union is the intersection of the complements: (A ∪ B)' = A' ∩ B'.",
          topic: "De Morgan's Laws",
        },
        {
          id: 5,
          question: 'If n(A) = 20, n(B) = 30, and n(A ∪ B) = 40, what is the value of n(A ∩ B)?',
          options: ['10', '50', '20', '30'],
          correctIndex: 0,
          explanation: 'Using the cardinality formula n(A ∪ B) = n(A) + n(B) - n(A ∩ B), we have 40 = 20 + 30 - n(A ∩ B) => n(A ∩ B) = 50 - 40 = 10.',
          topic: 'Cardinality Formula',
        },
      ],
      quickRevisionPoints: [
        'Well-defined collections are sets; opinions or subjective groups are not.',
        'Total subsets of a set with n elements = 2^n; proper subsets = 2^n - 1.',
        'n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
        "(A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B' (De Morgan's Laws).",
      ],
    };
  }

  // 3. MATHEMATICS — CALCULUS & LINEAR ALGEBRA
  if (
    sLower.includes('math') || 
    cLower.includes('calculus') || 
    cLower.includes('algebra') || 
    cLower.includes('integral') ||
    cLower.includes('matrix') ||
    cLower.includes('trigo') ||
    cLower.includes('probability')
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Essential Mathematical Identities & Formula Sheet`,
          cheatSheet: [
            `Product & Chain Rule: d/dx[u·v] = u·v' + v·u'; apply chain rule systematically from outer function inward.`,
            `Integration Constant: Indefinite integrals ALWAYS require + C; evaluate boundary conditions for definite integrals.`,
            `Matrix Inversion: A⁻¹ exists if and only if det(A) ≠ 0; given by A⁻¹ = adj(A) / |A|.`,
            `High-Frequency Trap: Check domain and boundary continuity before differentiating or taking logarithms.`,
          ],
          formulas: [
            { name: 'Product Rule of Differentiation', formula: 'd/dx [u · v] = u · (dv/dx) + v · (du/dx)', note: 'Fundamental differential calculus identity' },
            { name: 'Integration by Parts', formula: '∫ u · v dx = u ∫ v dx - ∫ [ (du/dx) · (∫ v dx) ] dx', note: 'Choose u using ILATE rule (Inverse, Log, Algebraic, Trig, Exponential)' },
            { name: 'Bayes Theorem (Conditional Probability)', formula: 'P(A|B) = [ P(B|A) · P(A) ] / P(B)', note: 'Foundation of statistical inference and probability' },
            { name: 'Matrix Inverse Formulation', formula: 'A⁻¹ = (1 / |A|) · adj(A)', note: 'Valid strictly for non-singular square matrices' },
          ],
          bulletSummary: [
            'Differential vs Integral: Rate of change (tangent slope) vs Cumulative area under curve.',
            'Precision & Rigor: Always show intermediate substitution steps to earn full method marks.',
          ],
        },
        minimal: {
          headline: `${chapter} Core Formulas`,
          cheatSheet: [
            'd/dx [u·v] = u·v\' + v·u\' (Product Rule)',
            'Integration by Parts: ∫ u v dx = u ∫ v dx - ∫ [ u\' (∫ v dx) ] dx',
          ],
          formulas: [
            { name: 'Calculus Identity', formula: '∫ 1/x dx = ln|x| + C', note: 'Standard integral' },
          ],
          bulletSummary: ['Core algebraic and calculus relations.'],
        },
        topper: {
          introduction: `Rigorous mathematical formulation for ${subject}: ${chapter}. Adheres to standard board and engineering competitive (JEE) problem-solving frameworks.`,
          deepDive: [
            {
              title: `1. Foundational Axioms, Continuity & Domain of ${chapter}`,
              timestamp: '02:00',
              content: `The lecture establishes domain constraints, limits, and differentiability conditions for ${chapter}. Verifies continuity across piece-wise boundary intervals before evaluating derivatives.`,
              keyTakeaway: 'Always state whether the function is continuous on closed interval [a, b] and differentiable on open interval (a, b) before applying theorems.',
            },
            {
              title: '2. Step-by-Step Proof & Optimization Methods',
              timestamp: '13:45',
              content: 'Calculus optimization using first and second derivative tests to establish local extrema. Demonstrates equivalence between inflection points and concavity transition.',
              keyTakeaway: 'Show the second derivative sign test (f"(x) < 0 for maximum, f"(x) > 0 for minimum) to secure full step marks.',
            },
          ],
          derivations: [
            {
              title: `Formal Proof of Product Rule in ${chapter}`,
              steps: [
                'Let y = f(x) · g(x). By first principles: dy/dx = lim[h→0] [ f(x+h)g(x+h) - f(x)g(x) ] / h',
                'Add and subtract f(x+h)g(x) in the numerator',
                'Regroup terms: lim[h→0] [ f(x+h)·{g(x+h) - g(x)}/h + g(x)·{f(x+h) - f(x)}/h ]',
                'Apply limit product properties as h → 0 and noting f is continuous',
              ],
              finalResult: 'd/dx [f(x) · g(x)] = f(x) · g\'(x) + g(x) · f\'(x)',
            },
          ],
          proTips: [
            'In probability word problems, define events A and E explicitly with words before writing mathematical probabilities.',
            'Never cancel terms across an equation if they can equal zero; factorize instead to avoid losing valid roots.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} mein koi jadoo nahi hai! Maths bas ek puzzle hai: pehle formula ka weapon chuno, intermediate step me sambhalke chalo, aur final answer me unit ya constant mat bhulo!`,
          desiAnalogies: [
            {
              concept: 'Differentiation vs Integration',
              analogy: 'Calculus kuch nahi bas mobile camera ka zoom hai! Differentiation matlab kisi photo ko zoom in karke ek-ek pixel check karna, aur Integration matlab saare pixels ko jodkar poori HD photo banana.',
              desiPunchline: 'Todne ko Differentiation, Jodne ko Integration!',
            },
            {
              concept: 'Integration Constant (+ C)',
              analogy: 'Indefinite integration mein "+ C" bhoolna bilkul cricket mein run banakar crease par bat touch karna bhoolne jaisa hai — run out ho jaoge!',
              desiPunchline: 'Number chahiye toh "+ C" lagana padega boss!',
            },
          ],
          bhaiKaSummary: [
            'ILATE rule yaad rakho: Inverse, Log, Algebraic, Trigonometric, Exponential. Jo pehle aayega wo first function "u" banega!',
            'Determinant zero matlab inverse nikalna impossible hai.',
          ],
          jugaadPoints: [
            'MCQ mein agar answer samajh na aaye, toh x = 0 ya x = 1 substitute karke options verify karo, 80% questions jaldi solve hote hain!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Core component of Mathematics board papers. Expect 1 standard 3-mark calculus problem and 1 5-mark multi-step optimization or vector problem.`,
          highWeightageTopics: [
            `Definite Integrals and Area under Curves (5 Marks)`,
            'Applications of Derivatives: Tangents and Maxima/Minima (3-5 Marks)',
            'Matrices and System of Linear Equations using Matrix Method (5 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Find the derivative of f(x) = e^(3x) · sin(x) with respect to x.',
              answer: 'Applying product rule: f\'(x) = e^(3x) · d/dx[sin x] + sin(x) · d/dx[e^(3x)] = e^(3x) cos(x) + 3 e^(3x) sin(x) = e^(3x) [cos x + 3 sin x].',
              markingScheme: ['Product rule setup (½ mark)', 'Correct final derivative (½ mark)'],
              frequentlyAskedIn: 'CBSE Class 12 Math 2023, JEE Main 2024',
            },
            {
              id: 2,
              marks: 3,
              question: 'Evaluate ∫ x · e^x dx using integration by parts.',
              answer: 'Using ILATE rule, let u = x and dv = e^x dx => du = dx, v = e^x. Applying formula: ∫ x e^x dx = x e^x - ∫ e^x dx = x e^x - e^x + C = e^x (x - 1) + C.',
              markingScheme: ['Correct choice of u and v (1 mark)', 'Formula substitution (1 mark)', 'Final result with + C (1 mark)'],
              frequentlyAskedIn: 'CBSE 2024, ISC 2023',
            },
          ],
        },
      },
      timestamps: [
        { time: '01:15', seconds: 75, title: 'Identity & Definition Review', summary: 'Core axioms, boundary conditions, and domain limits.' },
        { time: '12:30', seconds: 750, title: 'Step-by-Step Proof & Worked Example', summary: 'Rigorous calculation and identity transformations.' },
        { time: '24:50', seconds: 1490, title: 'Examination Traps & Step Marking', summary: 'Scoring conventions and intermediate step formatting.' },
      ],
      flashcards: [
        { id: 1, front: `What is the ILATE rule in ${chapter}?`, back: 'Priority order for selecting u in integration by parts: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential.', concept: 'Integration Technique' },
        { id: 2, front: 'Under what condition does matrix inverse A⁻¹ exist?', back: 'A must be a square non-singular matrix with determinant det(A) ≠ 0.', concept: 'Linear Algebra' },
        { id: 3, front: 'What is the most common reason students lose 1 mark in indefinite integrals?', back: 'Forgetting to include the arbitrary integration constant "+ C".', concept: 'Examiner Rubric' },
      ],
      quiz: [
        {
          id: 1,
          question: `In ${chapter}, what is the derivative of ln(sec x + tan x)?`,
          options: ['sec x', 'tan x', 'sec² x', 'sec x · tan x'],
          correctIndex: 0,
          explanation: 'd/dx [ln(sec x + tan x)] = (sec x tan x + sec² x) / (sec x + tan x) = sec x (tan x + sec x) / (sec x + tan x) = sec x.',
          topic: `${chapter} Differentiation`,
        },
        {
          id: 2,
          question: 'If det(A) = 4 for a 3×3 matrix A, what is the value of det(2A)?',
          options: ['32', '8', '16', '64'],
          correctIndex: 0,
          explanation: 'For an n×n matrix, det(k A) = k^n · det(A). Here n=3, so det(2A) = 2^3 · 4 = 8 · 4 = 32.',
          topic: 'Matrix Determinants',
        },
        {
          id: 3,
          question: 'Why must "+ C" be appended to indefinite integral solutions?',
          options: ['Because the derivative of any constant is zero, representing an entire family of antiderivative curves', 'Because examiners prefer longer answers', 'To adjust for decimal rounding', 'To convert to radians'],
          correctIndex: 0,
          explanation: 'Any two antiderivatives of the same continuous function differ only by an additive constant C.',
          topic: 'Integration Theory',
        },
      ],
      quickRevisionPoints: [
        `Calculus discipline: Always state domain constraints and verify differentiability before applying derivative theorems.`,
        'Antiderivative rule: Indefinite integrals must include "+ C".',
        'ILATE rule: Choose first function in order: Inverse, Log, Algebraic, Trig, Exponential.',
        'Step scoring: Examiners allocate marks to every intermediate substitution line.',
      ],
    };
  }

  // 4. BIOLOGY / LIFE SCIENCES / MEDICAL
  if (
    sLower.includes('bio') || 
    cLower.includes('genetics') || 
    cLower.includes('cell') || 
    cLower.includes('dna') ||
    cLower.includes('reproduction') ||
    cLower.includes('photosynthesis') ||
    cLower.includes('ecology')
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — High-Yield Biological Principles & Pathways`,
          cheatSheet: [
            `Central Dogma: Genetic information flows from DNA (transcription) → mRNA (translation) → functional Protein.`,
            `Enzyme Specificity: Biological catalysts operate via substrate-active site complementary fit under strict pH and temperature bounds.`,
            `Mendelian Segregation: Alleles separate during gamete formation so each gamete carries only one allele for each gene.`,
            `Exam Diagram Rule: Neatly labeled pencil diagrams with directional indicator arrows are mandatory for all 5-mark questions.`,
          ],
          formulas: [
            { name: 'Central Dogma of Molecular Biology', formula: 'DNA ──(Transcription)──► mRNA ──(Translation)──► Polypeptide Chain', note: 'Universal paradigm of cellular gene expression' },
            { name: 'Hardy-Weinberg Equilibrium', formula: 'p² + 2pq + q² = 1  and  p + q = 1', note: 'Genotype frequencies in non-evolving populations' },
            { name: 'Photosynthetic Carbon Fixation', formula: '6 CO₂ + 12 H₂O ──(Light & Chlorophyll)──► C₆H₁₂O₆ + 6 O₂ + 6 H₂O', note: 'Calvin cycle synthesis of glucose' },
          ],
          bulletSummary: [
            'Cellular Machinery: Structural compartmentalization allows concurrent biochemical pathways.',
            'Scientific Nomenclature: Always underline binomial scientific names separately (Genus species).',
          ],
        },
        minimal: {
          headline: `${chapter} Core Biology Summary`,
          cheatSheet: [
            'DNA → mRNA → Protein (Central Dogma)',
            'Mendelian ratios and cellular organelle functions.',
          ],
          formulas: [
            { name: 'Genetic Principle', formula: 'DNA Transcription → Translation', note: 'Cellular expression' },
          ],
          bulletSummary: ['Cellular pathways, genetic inheritance, and diagnostic anatomy.'],
        },
        topper: {
          introduction: `Comprehensive biological synthesis for ${subject}: ${chapter}. Structured in alignment with NCERT, CBSE, and medical entrance (NEET) standards. Emphasizes biochemical pathways, cytological mechanisms, and anatomical diagrams.`,
          deepDive: [
            {
              title: `1. Molecular Mechanisms & Enzymatic Catalysis in ${chapter}`,
              timestamp: '02:20',
              content: `The lecture examines cellular ultrastructure and enzyme-driven reaction cascades in ${chapter}. Details how molecular recognition, hydrogen bonding, and ATP hydrolysis drive conformational changes.`,
              keyTakeaway: 'Always state the subcellular organelle location (e.g. inner mitochondrial membrane, thylakoid lumen) where the process takes place.',
            },
            {
              title: '2. Regulatory Feedback & Genetic Transmission',
              timestamp: '14:10',
              content: 'Step-by-step walkthrough of genetic replication and operon regulation. Explains how repressor proteins and promoter sequences govern cellular transcription efficiency.',
              keyTakeaway: 'In biological diagrams, keep all label leader lines parallel on the right-hand side; never cross label lines.',
            },
          ],
          derivations: [
            {
              title: `Biochemical Pathway & Replication Flow in ${chapter}`,
              steps: [
                'Initiation: Helicase unwinds double helix at specific origin sites forming replication fork',
                'Priming: RNA primase synthesizes short RNA primers to provide free 3\'-OH group',
                'Elongation: DNA Polymerase III synthesizes continuous leading strand and discontinuous Okazaki fragments on lagging strand',
                'Ligation: DNA Ligase seals phosphodiester nicks to complete continuous duplexes',
              ],
              finalResult: 'Semiconservative Generation of Two Identical Duplex DNA Molecules',
            },
          ],
          proTips: [
            'In NEET and CBSE exams, always underline Latin binomial scientific names separately (e.g., _Homo sapiens_).',
            'Write exact technical terms (e.g. "phosphodiester bond", "ribulose-1,5-bisphosphate") rather than colloquial descriptive phrases.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul body ka super-smart software hai! Har cell ke andar trillions of operations bina kisi crash ke 24/7 chal rahe hain!`,
          desiAnalogies: [
            {
              concept: 'DNA, RNA & Protein Synthesis',
              analogy: 'DNA bilkul Mummy ki secret recipe book jaisa hai jo kitchen se bahar nahi ja sakti! mRNA us recipe ki xerox copy hai jo chef (ribosome) ke paas jati hai taaki perfect dish (protein) ban sake.',
              desiPunchline: 'Secret recipe safe, dish ready!',
            },
            {
              concept: 'Mendelian Dominance',
              analogy: 'Yeh bilkul ghar ke TV remote jaisa hai: agar bada bhai (dominant allele) kamre mein hai toh channel wahi chalega, chota bhai (recessive) tabhi apna cartoon dekh payega jab bada bhai bahar ho!',
              desiPunchline: 'Dominant present, recessive silent!',
            },
          ],
          bhaiKaSummary: [
            'Replication fork trick: Leading strand continuous chalti hai, lagging strand chote-chote Okazaki fragments mein!',
            'ATP = Cell ki universal currency.',
          ],
          jugaadPoints: [
            'Diagram mein pencil sharp rakho aur labels ek hi side likho, examiner pehle diagram dekh kar hi 3 marks de deta hai!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Consistently tested in CBSE Board Biology & NEET. High probability of 1 pathway question (3 marks) and 1 detailed anatomical or molecular mechanism question (5 marks).`,
          highWeightageTopics: [
            `Molecular mechanism and enzymatic steps of ${chapter} (5 Marks)`,
            'Differences between homologous structures / processes (3 Marks)',
            'Labeled anatomical diagram with functional annotations (3-5 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'State the role of tRNA in cellular protein synthesis.',
              answer: 'tRNA acts as an adapter molecule that reads the mRNA codon sequence via its anticodon loop and brings the corresponding specific amino acid to the ribosomal site.',
              markingScheme: ['Adapter role and amino acid transport (1 mark)'],
              frequentlyAskedIn: 'CBSE Class 12 Biology 2023, NEET 2024',
            },
            {
              id: 2,
              marks: 3,
              question: 'Differentiate between leading and lagging strands during DNA replication.',
              answer: '1. Leading strand is synthesized continuously in 5\'→3\' direction towards fork; Lagging strand is synthesized discontinuously away from fork. 2. Leading strand requires only one RNA primer; Lagging strand requires multiple primers for Okazaki fragments. 3. DNA ligase is heavily required on lagging strand to join fragments.',
              markingScheme: ['Three valid contrasting points (1 mark each = 3 marks)'],
              frequentlyAskedIn: 'CBSE Board 2024, AIIMS 2022',
            },
          ],
        },
      },
      timestamps: [
        { time: '01:30', seconds: 90, title: 'Cellular Context & Terminology', summary: 'Ultrastructure, organelles, and core definitions.' },
        { time: '13:40', seconds: 820, title: 'Biochemical Pathway & Diagram Walkthrough', summary: 'Step-by-step enzymatic catalysis and molecular mechanisms.' },
        { time: '25:15', seconds: 1515, title: 'NEET Traps & Diagram Scoring Rubric', summary: 'Labeling conventions and high-yield scoring tips.' },
      ],
      flashcards: [
        { id: 1, front: `What is the function of DNA Ligase in ${chapter}?`, back: 'It catalyzes the formation of phosphodiester bonds to join Okazaki fragments on the lagging strand.', concept: 'Molecular Biology' },
        { id: 2, front: 'What is the phenotypic dihybrid ratio in Mendelian genetics?', back: '9 : 3 : 3 : 1 (Dominant/Dominant, Dominant/Recessive, Recessive/Dominant, Recessive/Recessive).', concept: 'Genetics' },
        { id: 3, front: 'What formatting rule is mandatory for biological scientific names?', back: 'Underline Genus and species separately when handwritten; capitalize Genus only.', concept: 'Taxonomy Rubric' },
      ],
      quiz: [
        {
          id: 1,
          question: `In ${chapter}, which enzyme is responsible for removing RNA primers and synthesizing replacement DNA?`,
          options: ['DNA Polymerase I', 'DNA Ligase', 'RNA Primase', 'Topoisomerase'],
          correctIndex: 0,
          explanation: 'DNA Polymerase I possesses 5\'→3\' exonuclease activity to excise RNA primers and replace them with deoxyribonucleotides.',
          topic: `${chapter} Enzymology`,
        },
        {
          id: 2,
          question: 'Which codon functions as the universal start codon in protein synthesis?',
          options: ['AUG (Methionine)', 'UAA (Stop)', 'UAG (Stop)', 'UGA (Stop)'],
          correctIndex: 0,
          explanation: 'AUG codes for Methionine in eukaryotes and formyl-methionine in prokaryotes, initiating peptide translation.',
          topic: 'Genetic Code',
        },
        {
          id: 3,
          question: 'What is the primary factor that earns full credit on biological diagram questions?',
          options: ['Clean pencil sketches with straight, non-crossing label lines and functional titles', 'Coloring with sketch pens', 'Drawing very large diagrams without labels', 'Using ink pens for drawings'],
          correctIndex: 0,
          explanation: 'Examiner rubrics explicitly award marks for proportional pencil sketches and unambiguous, parallel label lines.',
          topic: 'Exam Presentation',
        },
      ],
      quickRevisionPoints: [
        `Central Dogma: Genetic code flows from DNA to RNA to Protein.`,
        'Enzyme accuracy: State exact enzyme names and subcellular locations.',
        'Diagram standard: Clean pencil drawings with straight parallel leader lines.',
        'Nomenclature: Always underline genus and species separately in scientific names.',
      ],
    };
  }

  // 5. CHEMISTRY
  if (
    sLower.includes('chem') || 
    cLower.includes('reaction') || 
    cLower.includes('bonding') || 
    cLower.includes('organic') ||
    cLower.includes('electrochem') ||
    cLower.includes('acid')
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Core Chemical Formulations & Reaction Principles`,
          cheatSheet: [
            `Redox & Cell Potential: E°cell = E°cathode - E°anode; positive cell potential indicates thermodynamic spontaneity (ΔG° < 0).`,
            `Rate Kinetics: First-order reactions have concentration-independent half-life: t_1/2 = 0.693 / k.`,
            `Electronic Structure: Orbital filling strictly follows Aufbau principle, Hund's rule of maximum multiplicity, and Pauli exclusion.`,
            `Organic Arrow Rule: Curved arrows always originate from electron-rich centers (lone pairs/pi bonds) towards electron-deficient nuclei.`,
          ],
          formulas: [
            { name: 'Nernst Equation (at 298 K)', formula: 'E_cell = E°_cell - (0.0591 / n) · log10(Q)', note: 'Calculates non-standard electrochemical cell EMF' },
            { name: 'Arrhenius Rate Law', formula: 'k = A · e^(-Ea / RT)', note: 'Relates temperature and activation energy to reaction velocity' },
            { name: 'Gibbs Free Energy & Cell EMF', formula: 'ΔG° = -n · F · E°_cell', note: 'F = Faraday constant (96,500 C/mol)' },
            { name: 'First Order Integrated Rate Law', formula: 'k = (2.303 / t) · log10([A]0 / [A])', note: 'Standard chemical kinetics formula' },
          ],
          bulletSummary: [
            'Thermodynamics vs Kinetics: Spontaneity (ΔG < 0) vs Reaction rate (activation energy barrier Ea).',
            'State Notation: Always state physical phases (s, l, g, aq) in stoichiometric equations.',
          ],
        },
        minimal: {
          headline: `${chapter} Chemistry Summary`,
          cheatSheet: [
            'E°cell = E°cathode - E°anode (Nernst Equation)',
            'ΔG° = -n F E°cell',
          ],
          formulas: [
            { name: 'Nernst Law', formula: 'E = E° - (0.0591/n) log Q', note: 'Electrochemical EMF' },
          ],
          bulletSummary: ['Thermodynamics, kinetics, and chemical equilibrium.'],
        },
        topper: {
          introduction: `Rigorous chemical analysis for ${subject}: ${chapter}. Structured to address CBSE Board standards, JEE Advanced, and NEET. Combines physical chemical thermodynamics, electronic orbital theory, and mechanistic arrow-pushing formalism.`,
          deepDive: [
            {
              title: `1. Thermodynamic Driving Force & Electronic State in ${chapter}`,
              timestamp: '02:10',
              content: `The lecture derives equilibrium relations from electrochemical potentials and free energy gradients in ${chapter}. Establishes how orbital hybridization and steric hindrance govern reaction pathways.`,
              keyTakeaway: 'Always balance chemical redox equations by ion-electron method and verify charge neutrality on both sides.',
            },
            {
              title: '2. Reaction Mechanism & Transition State Energetics',
              timestamp: '14:20',
              content: 'In-depth analysis of transition state theory and intermediate carbocation/carbanion stability. Evaluates activation energy barriers under catalyzed and uncatalyzed profiles.',
              keyTakeaway: 'Draw reaction energy profile diagrams with clearly labeled Ea and ΔH to secure full method marks.',
            },
          ],
          derivations: [
            {
              title: `Derivation of Integrated First-Order Rate Equation in ${chapter}`,
              steps: [
                'Differential rate equation: - d[A]/dt = k · [A]',
                'Separate variables: d[A] / [A] = - k · dt',
                'Integrate both sides from initial time t=0 ([A]0) to time t ([A]): ∫ d[A]/[A] = - k ∫ dt',
                'Evaluate definite integrals: ln([A]) - ln([A]0) = - k · t',
                'Convert natural logarithm to base-10 using factor 2.303',
              ],
              finalResult: 'k = (2.303 / t) · log10( [A]0 / [A] )',
            },
          ],
          proTips: [
            'In organic mechanisms, curved arrows represent movement of an electron PAIR. Never draw arrows originating from a positive charge.',
            'Always state physical phase states (s, aq, g) in thermochemical and electrochemical equations.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} mein koi ratta maarne ki zaroorat nahi hai! Chemistry bilkul dosti aur rishton jaisi hai: jisme stability zyada hogi, bond wahi banega!`,
          desiAnalogies: [
            {
              concept: 'Electronegativity & Polar Covalent Bonds',
              analogy: 'Electronegativity matlab class ka wo topper dost jo group assignment mein saara credit (shared electrons) apni taraf kheench leta hai! Bond polar ho jata hai.',
              desiPunchline: 'Electrons kheecho, partial charge banao!',
            },
            {
              concept: 'Catalyst Function',
              analogy: 'Catalyst bilkul shaadi ke bicholiye (matchmaker) jaisa hai: do logon ko milwata hai, activation barrier kam karta hai, par khud reaction ke baad bilkul unchanged nikal aata hai!',
              desiPunchline: 'Kam mehnat mein reaction fast!',
            },
          ],
          bhaiKaSummary: [
            'Anode par hamesha Oxidation (AN OX), Cathode par hamesha Reduction (RED CAT).',
            'Gibbs energy negative matlab reaction apne aap chalegi!',
          ],
          jugaadPoints: [
            'Nernst equation numerical mein [products] / [reactants] likhte waqt pure solids aur liquids ki concentration hamesha 1 leni hai!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Core chapter across competitive and board examinations. Anticipate 1 numerical on Nernst equation or Kinetics (3 marks) and 1 mechanism question (3-5 marks).`,
          highWeightageTopics: [
            `Numerical calculation using Nernst equation or Rate Laws (3-4 Marks)`,
            'Step-by-step reaction mechanism with curved electron arrows (3 Marks)',
            'Anomalous trends and reasoning based on electronic configuration (2-3 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Define Standard Electrode Potential and state the reference electrode used to measure it.',
              answer: 'Standard Electrode Potential is the potential difference developed between a metal electrode and its ions in 1M solution at 298 K and 1 bar pressure. It is measured relative to the Standard Hydrogen Electrode (SHE), assigned 0.00 V.',
              markingScheme: ['Definition (½ mark)', 'Reference to SHE 0.00 V (½ mark)'],
              frequentlyAskedIn: 'CBSE Chemistry 2023, JEE Main 2024',
            },
            {
              id: 2,
              marks: 3,
              question: 'A first-order reaction has a rate constant of 1.15 × 10⁻³ s⁻¹. How long will 5.0 g of this reactant take to reduce to 3.0 g?',
              answer: 'Using first-order equation: t = (2.303 / k) · log10([A]0 / [A]) = (2.303 / 1.15 × 10⁻³) · log10(5.0 / 3.0) = 2002.6 · log10(1.667) = 2002.6 · 0.2219 = 444.4 seconds.',
              markingScheme: ['Formula setup (1 mark)', 'Logarithm evaluation (1 mark)', 'Final answer with seconds unit (1 mark)'],
              frequentlyAskedIn: 'CBSE Board 2024, ISC 2023',
            },
          ],
        },
      },
      timestamps: [
        { time: '01:20', seconds: 80, title: 'Electronic Structure & Equilibrium Terms', summary: 'Electrochemical potentials and fundamental definitions.' },
        { time: '13:10', seconds: 790, title: 'Integrated Proof & Rate Derivation', summary: 'Mathematical derivation of rate laws and Nernst relations.' },
        { time: '25:30', seconds: 1530, title: 'Mechanism Rubric & Scoring Traps', summary: 'Arrow-pushing conventions and numerical units.' },
      ],
      flashcards: [
        { id: 1, front: `What is the significance of positive E°cell in ${chapter}?`, back: 'Positive E°cell implies negative ΔG°, confirming the reaction is thermodynamically spontaneous.', concept: 'Electrochemistry' },
        { id: 2, front: 'What is the unit of rate constant for a first-order reaction?', back: 's⁻¹ (time⁻¹), independent of concentration units.', concept: 'Chemical Kinetics' },
        { id: 3, front: 'Why are pure solids omitted from the equilibrium reaction quotient Q?', back: 'Their activity is conventionally defined as unity (activity = 1).', concept: 'Equilibrium Rubric' },
      ],
      quiz: [
        {
          id: 1,
          question: `In ${chapter}, what happens to the half-life of a first-order reaction if the initial reactant concentration is doubled?`,
          options: ['Half-life remains unchanged', 'Half-life doubles', 'Half-life is halved', 'Half-life quadruples'],
          correctIndex: 0,
          explanation: 'For a first-order reaction t_1/2 = 0.693 / k, which is strictly independent of initial concentration [A]0.',
          topic: `${chapter} Kinetics`,
        },
        {
          id: 2,
          question: 'At which electrode does oxidation occur in an electrochemical cell?',
          options: ['Anode in both galvanic and electrolytic cells', 'Cathode in galvanic cells', 'Cathode in electrolytic cells', 'Alternates randomly'],
          correctIndex: 0,
          explanation: 'By electrochemical convention, the anode is ALWAYS the site of oxidation (loss of electrons).',
          topic: 'Electrochemistry',
        },
        {
          id: 3,
          question: 'What is the most frequent reason students lose points on organic mechanisms?',
          options: ['Drawing curved arrows in the wrong direction or originating from positive charges', 'Using blue ink', 'Writing too fast', 'Omitting catalyst names'],
          correctIndex: 0,
          explanation: 'Curved arrows strictly denote the movement of electron pairs from electron-rich to electron-poor sites.',
          topic: 'Mechanistic Conventions',
        },
      ],
      quickRevisionPoints: [
        `Spontaneity relation: Spontaneous reactions have E°cell > 0 and ΔG° < 0.`,
        'First-order kinetics: t_1/2 = 0.693 / k (independent of concentration).',
        'Redox rule: Anode = Oxidation; Cathode = Reduction.',
        'Arrow notation: Curved arrows track electron pairs, never nuclei or positive charges.',
      ],
    };
  }

  // 6. COMPUTER SCIENCE / ENGINEERING
  if (
    sLower.includes('computer') || 
    sLower.includes('algo') || 
    sLower.includes('data structure') || 
    cLower.includes('code') ||
    cLower.includes('python') ||
    cLower.includes('tree') ||
    cLower.includes('database') ||
    cLower.includes('network')
  ) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Algorithm Complexity & Engineering Essentials`,
          cheatSheet: [
            `Asymptotic Complexity: Always analyze both Time Complexity and Auxiliary Space Complexity in Big-O notation.`,
            `Recursion Guard: Base cases MUST precede recursive calls to prevent call stack overflow.`,
            `Database ACID: Atomicity, Consistency, Isolation, Durability govern reliable transactional processing.`,
            `Edge Case Defense: Always test boundary conditions: empty array, single element, duplicate values, and negative inputs.`,
          ],
          formulas: [
            { name: 'Binary Search Time Complexity', formula: 'T(n) = T(n/2) + O(1) => O(log n)', note: 'Divide and conquer on sorted collections' },
            { name: 'Master Theorem for Divide & Conquer', formula: 'T(n) = a T(n/b) + O(n^d)', note: 'Asymptotic recurrence relation solver' },
            { name: 'Relational Schema BCNF Condition', formula: 'For every functional dependency X -> Y, X must be a superkey', note: 'Highest practical normal form' },
          ],
          bulletSummary: [
            'Time-Space Tradeoff: Hash tables trade O(n) memory for O(1) average lookup speed.',
            'System Architecture: Modular decoupling improves scalability and testability.',
          ],
        },
        minimal: {
          headline: `${chapter} CS Summary`,
          cheatSheet: [
            'Binary search O(log n), MergeSort O(n log n).',
            'Recursion base conditions prevent stack overflow.',
          ],
          formulas: [
            { name: 'Complexity', formula: 'T(n) = O(n log n)', note: 'Optimal comparison sort bound' },
          ],
          bulletSummary: ['Data structures, algorithm complexity, and systems.'],
        },
        topper: {
          introduction: `Rigorous technical synthesis for ${subject}: ${chapter}. Tailored to university computer science, gate exams, and technical coding interviews. Focuses on asymptotic efficiency, invariant proofs, and implementation correctness.`,
          deepDive: [
            {
              title: `1. Invariant Properties & Data Structure Anatomy of ${chapter}`,
              timestamp: '02:00',
              content: `The lecture breaks down data organization, pointer references, and memory allocation models in ${chapter}. Details how contiguous array cache locality compares with node-based pointer traversals.`,
              keyTakeaway: 'Always analyze the worst-case space complexity, explicitly accounting for recursive call stack frames.',
            },
            {
              title: '2. Asymptotic Proofs & Optimization Strategies',
              timestamp: '14:00',
              content: 'Formal recurrence relation expansion proving asymptotic bounds. Compares iterative two-pointer techniques against memoized dynamic programming states.',
              keyTakeaway: 'State edge cases (null inputs, empty data structures, cycle detection) upfront before presenting algorithm pseudocode.',
            },
          ],
          derivations: [
            {
              title: `Proof of Logarithmic Time Complexity for Binary Search in ${chapter}`,
              steps: [
                'Let n be collection length. At each comparison step, search space is halved: n, n/2, n/4, ..., n / 2^k',
                'Search terminates when search space reduces to size 1: n / 2^k = 1',
                'Multiply both sides by 2^k: n = 2^k',
                'Take base-2 logarithm of both sides: log2(n) = k',
              ],
              finalResult: 'Number of steps k = O(log2 n)',
            },
          ],
          proTips: [
            'In coding exams and interviews, always specify both Time Complexity O(...) and Auxiliary Space Complexity O(...) at the conclusion of your solution.',
            'Check for integer overflow when computing mid indices: use `mid = low + (high - low) / 2` instead of `(low + high) / 2`.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul smart coding ka khel hai! Computer ko faltu loop mein mat ghumao, efficiently code karo aur memory bachao!`,
          desiAnalogies: [
            {
              concept: 'Binary Search vs Linear Search',
              analogy: 'Linear search matlab moti dictionary mein word dhoondne ke liye page 1 se ek-ek line padhna! Aur Binary search matlab book ko beech se kholna, check karna aage hai ya peeche, aur aadha hissa ek second mein discard kar dena!',
              desiPunchline: 'Aadha hissa gayab, speed rocket!',
            },
            {
              concept: 'Recursion & Call Stack',
              analogy: 'Recursion matlab aamne-saamne rakhe do aayno (mirrors) jaisa hai! Agar base case nahi lagaya toh infinite reflections banengi aur Stack Overflow crash ho jayega.',
              desiPunchline: 'Base case lagao, stack ko bachao!',
            },
          ],
          bhaiKaSummary: [
            'Hash table = Instant lookup O(1), par memory thodi zyada lagti hai.',
            'Sorting ka gold standard: O(n log n). Isse faster comparison sort possible nahi hai.',
          ],
          jugaadPoints: [
            'Array boundary check hamesha pehle lagao `if (i >= 0 && i < n)` warna Out of Bounds error aa jayega!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: `Core topic across Computer Science examinations and tech interviews. Anticipate 1 algorithm tracing problem (3 marks) and 1 pseudocode / complexity proof question (5 marks).`,
          highWeightageTopics: [
            `Algorithm design, pseudocode, and time/space complexity proof (5 Marks)`,
            'Data structure operations: insertion, deletion, and balancing (3 Marks)',
            'Relational schema normalization and SQL query design (4 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'State the average and worst-case time complexity of searching an element in a Hash Table.',
              answer: 'Average case time complexity is O(1) assuming uniform hashing. Worst case time complexity is O(n) when all keys collide into the same bucket chain.',
              markingScheme: ['Average O(1) (½ mark)', 'Worst O(n) (½ mark)'],
              frequentlyAskedIn: 'GATE CSE 2023, University CS 2024',
            },
            {
              id: 2,
              marks: 3,
              question: 'Explain the difference between Dynamic Programming and Divide & Conquer approaches.',
              answer: '1. Divide & Conquer divides a problem into independent subproblems (e.g. MergeSort); Dynamic Programming solves problems with overlapping subproblems. 2. DP stores results in a memoization table/array to avoid redundant recomputations; D&C recomputes subproblems independently. 3. DP applies when optimal substructure and overlapping subproblems both exist.',
              markingScheme: ['Three clear contrasting points (1 mark each = 3 marks)'],
              frequentlyAskedIn: 'University B.Tech Exam 2024',
            },
          ],
        },
      },
      timestamps: [
        { time: '01:10', seconds: 70, title: 'Data Structure Anatomy & Invariants', summary: 'Memory layout, pointers, and baseline constraints.' },
        { time: '12:50', seconds: 770, title: 'Algorithm Trace & Complexity Proof', summary: 'Step-by-step execution walkthrough and Big-O derivation.' },
        { time: '24:30', seconds: 1470, title: 'Edge Cases & Technical Interview Rubric', summary: 'Null checking, overflow defense, and scoring benchmarks.' },
      ],
      flashcards: [
        { id: 1, front: `What is the time complexity of Binary Search in ${chapter}?`, back: 'O(log n) time complexity, requiring the input collection to be pre-sorted.', concept: 'Algorithms' },
        { id: 2, front: 'What causes a StackOverflowError during recursion?', back: 'Missing or unreachable base case leading to infinite recursive calls exceeding memory stack limits.', concept: 'Runtime Systems' },
        { id: 3, front: 'What does ACID stand for in database systems?', back: 'Atomicity, Consistency, Isolation, and Durability.', concept: 'Databases' },
      ],
      quiz: [
        {
          id: 1,
          question: `In ${chapter}, what is the worst-case time complexity of QuickSort?`,
          options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
          correctIndex: 0,
          explanation: 'When the chosen pivot is repeatedly the extreme (smallest or largest) element, partitions become completely unbalanced, degrading to O(n²).',
          topic: `${chapter} Complexity`,
        },
        {
          id: 2,
          question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
          options: ['Queue', 'Stack', 'Binary Tree', 'Max Heap'],
          correctIndex: 0,
          explanation: 'A Queue enforces FIFO order where elements are enqueued at the rear and dequeued from the front.',
          topic: 'Data Structures',
        },
        {
          id: 3,
          question: 'Why should mid index be calculated as `low + (high - low) / 2`?',
          options: ['To avoid 32-bit signed integer overflow when (low + high) exceeds 2³¹ - 1', 'Because division by 2 is slower', 'To round up to odd numbers', 'To ensure pointer alignment'],
          correctIndex: 0,
          explanation: 'Direct addition (low + high) can overflow the maximum positive integer limit in languages like Java and C++.',
          topic: 'Implementation Best Practices',
        },
      ],
      quickRevisionPoints: [
        `Asymptotic notation: State both Time O(...) and Space O(...) complexity.`,
        'Binary search requirement: Input array must be sorted in monotonic order.',
        'Recursion safety: Base conditions must precede recursive invocations.',
        'Data structure tradeoffs: Hash tables provide O(1) lookups at the expense of memory overhead.',
      ],
    };
  }

  // 7. PHYSICS & THERMODYNAMICS (Includes First Law, Heat Engines, Carnot Cycle)
  const isThermodynamics = 
    chapter.toLowerCase().includes('thermo') || 
    chapter.toLowerCase().includes('heat') || 
    chapter.toLowerCase().includes('carnot') ||
    subject.toLowerCase().includes('phys');

  if (isThermodynamics) {
    return {
      content: {
        quick: {
          headline: 'Class 12 Physics: Thermodynamics, First Law, Heat Engines & Carnot Cycle Revision Notes',
          cheatSheet: [
            'First Law of Thermodynamics (Energy Conservation): Heat supplied to a system equals the increase in internal energy plus work done by the system: Q = ΔU + W (differential form: dQ = dU + P dV).',
            'Physics Sign Conventions: Heat absorbed by system Q > 0; Heat released Q < 0. Work done BY system (expansion) W > 0; Work done ON system (compression) W < 0.',
            'State vs Path Functions: Internal energy U is a state function (U depends solely on absolute temperature T in an ideal gas). In any cyclic process, ΔU_cycle = 0. Heat Q and Work W are path functions.',
            'Isothermal Process (Constant T, ΔT = 0): ΔU = 0, so Q = W. Work done: W = nRT ln(V2 / V1) = 2.303 nRT log10(V2 / V1).',
            'Adiabatic Process (Zero Heat Exchange, Q = 0): W = -ΔU. Governing relation: P V^γ = constant. Work done: W = (P1 V1 - P2 V2) / (γ - 1) = nR (T1 - T2) / (γ - 1).',
            'Isobaric Process (Constant P): Work done W = P(V2 - V1) = nR(T2 - T1). Heat added Q = n Cp ΔT.',
            'Isochoric Process (Constant V, dV = 0): Work done W = 0. Heat added Q = ΔU = n Cv ΔT.',
            'Heat Engine Efficiency: A cyclic device extracting heat Qh from source at Th, performing work W = Qh - Qc, and rejecting Qc to sink at Tc. Thermal efficiency: η = W / Qh = 1 - (Qc / Qh).',
            'Carnot Engine & Maximum Efficiency: Four-stage ideal reversible cycle (2 isothermals + 2 adiabatics). Efficiency depends solely on reservoir temperatures: η_carnot = 1 - (Tc / Th). (Temperatures strictly in Kelvin).',
            'Mayer’s Relation & Specific Heats: Cp - Cv = R; γ = Cp / Cv. For monoatomic gas γ = 5/3 ≈ 1.67; for diatomic gas γ = 7/5 = 1.40.',
          ],
          formulas: [
            { 
              name: 'First Law of Thermodynamics', 
              formula: 'Q = ΔU + W = ΔU + ∫ P dV', 
              note: 'Conservation of energy; W > 0 for expansion against surroundings, Q > 0 for heat added. Units: Joules (J).' 
            },
            { 
              name: 'Internal Energy of Ideal Gas', 
              formula: 'ΔU = n Cv ΔT = (f/2) n R ΔT', 
              note: 'f = degrees of freedom (f=3 for monoatomic, f=5 for rigid diatomic). Depends strictly on temperature T.' 
            },
            { 
              name: 'Isothermal Reversible Work', 
              formula: 'W = n R T ln(V2 / V1) = 2.303 n R T log10(V2 / V1)', 
              note: 'Valid for ideal gas at constant temperature T; if V2 > V1 (expansion), W > 0.' 
            },
            { 
              name: 'Adiabatic Process Governing Law', 
              formula: 'P V^γ = const | T V^(γ-1) = const | T^γ P^(1-γ) = const', 
              note: 'γ = Cp / Cv > 1. Steeper P-V slope than isothermal curve by factor of γ.' 
            },
            { 
              name: 'Adiabatic Reversible Work', 
              formula: 'W = (P1 V1 - P2 V2) / (γ - 1) = n R (T1 - T2) / (γ - 1)', 
              note: 'Expansion (V2 > V1) causes gas cooling (T2 < T1), with positive work delivered at expense of internal energy.' 
            },
            { 
              name: 'Heat Engine Thermal Efficiency', 
              formula: 'η = W / Qh = (Qh - Qc) / Qh = 1 - (Qc / Qh)', 
              note: 'Dimensionless ratio (0 ≤ η < 1). Qh = heat absorbed from hot reservoir; Qc = heat discharged to cold reservoir.' 
            },
            { 
              name: 'Carnot Engine Efficiency', 
              formula: 'η_carnot = 1 - (Tc / Th)', 
              note: 'Maximum possible efficiency between reservoirs at Th and Tc. Temperatures MUST be in Kelvin (K = °C + 273.15).' 
            },
            { 
              name: "Mayer's Specific Heat Relation", 
              formula: 'Cp - Cv = R (and Cp,m - Cv,m = R / M)', 
              note: 'R = 8.314 J/mol·K (universal gas constant). Difference represents external work done during isobaric expansion.' 
            },
          ],
          bulletSummary: [
            'Indicator diagram: Area enclosed by any closed thermodynamic cycle on a P-V diagram equals the net mechanical work done (clockwise = positive work, engine; counter-clockwise = negative work, refrigerator).',
            'Kelvin-Planck statement: No heat engine can be 100% efficient; some heat Qc must inevitably be discharged to a lower-temperature sink.',
            'Clausius statement: Heat cannot spontaneously flow from a colder body to a hotter body without external work input.',
          ],
        },
        minimal: {
          headline: 'Class 12 Physics: Thermodynamics Summary',
          cheatSheet: [
            'First Law: Q = ΔU + W (Conservation of Energy).',
            'Isothermal work: W = 2.303 nRT log10(V2 / V1).',
            'Adiabatic work: W = nR(T1 - T2) / (γ - 1).',
            'Carnot efficiency: η = 1 - (Tc / Th).',
          ],
          formulas: [
            { name: 'First Law', formula: 'Q = ΔU + W', note: 'Joules (J)' },
            { name: 'Isothermal Work', formula: 'W = nRT ln(V2/V1)', note: 'Constant T' },
            { name: 'Carnot Efficiency', formula: 'η = 1 - Tc/Th', note: 'Kelvin scale' },
          ],
          bulletSummary: ['State vs Path variables: U is state function; Q and W are path functions.'],
        },
        topper: {
          introduction: 'Rigorous analytical study notes for Class 12 Physics: Thermodynamics, covering the First Law, energy accounting, thermodynamic processes, calculus derivations, heat engine mechanics, Second Law statements, and the four-stage Carnot cycle.',
          deepDive: [
            {
              title: '1. Foundations of Thermodynamics, State Variables & The First Law',
              timestamp: '00:00 - 12:30',
              content: 'Thermodynamics investigates the macroscopic transformations of heat, work, and internal energy in physical systems. A thermodynamic system is characterized by macroscopic coordinates: Pressure P, Volume V, and absolute Temperature T, linked for an ideal gas by the equation of state PV = nRT. Internal energy U represents the sum of microscopic kinetic and potential energies of all molecules. In an ideal gas with zero intermolecular potential energy, Joule’s law dictates that internal energy depends exclusively on temperature: U = U(T). When a gas expands by differential volume dV against an external pressure P, the mechanical work done by the system is dW = P dV. The First Law of Thermodynamics formulates the conservation of energy: the infinitesimal heat dQ absorbed by a system is apportioned between increasing its internal energy dU and performing mechanical work dW on its surroundings: dQ = dU + dW = dU + P dV. Under the standard physics sign convention: work done BY the gas (expansion) is positive (W > 0), work done ON the gas (compression) is negative (W < 0), heat absorbed is positive (Q > 0), and heat released is negative (Q < 0). Because U is an exact differential (state function), its cyclic integral is identically zero: ∮ dU = 0. By contrast, heat Q and work W are path-dependent quantities represented by inexact differentials.',
              keyTakeaway: 'In every closed thermodynamic cycle, net change in internal energy is ZERO (ΔU_cycle = 0), meaning net heat absorbed equals net mechanical work performed: Q_net = W_net.',
            },
            {
              title: '2. The Four Fundamental Thermodynamic Processes & P-V Indicator Analysis',
              timestamp: '12:30 - 19:15',
              content: 'A thermodynamic process represents the progression of a system from an initial equilibrium state to a final equilibrium state along a defined thermodynamic path. Four classical quasi-static processes govern ideal gas behavior: (1) Isothermal Process (T = constant, ΔT = 0): Because internal energy depends solely on temperature, ΔU = 0, which implies Q = W. The process follows Boyle’s law (P V = constant). On a P-V diagram, it forms an equilateral hyperbola with slope (dP/dV)_iso = -P/V. (2) Adiabatic Process (Q = 0): The system is thermally insulated from its surroundings (or the expansion/compression occurs so rapidly that heat exchange is negligible). From the First Law, W = -ΔU: work done during adiabatic expansion is performed entirely at the expense of internal energy, causing a substantial temperature drop. The process is governed by Poisson’s relations: P V^γ = const, T V^(γ-1) = const, and T^γ P^(1-γ) = const, where γ = Cp/Cv > 1. The slope on a P-V diagram is (dP/dV)_adi = -γ (P/V) = γ × (dP/dV)_iso, proving that adiabatic curves are always steeper than isothermal curves through the same state point. (3) Isobaric Process (P = constant): The gas expands or contracts under fixed external pressure. Work done is W = P(V2 - V1) = nR(T2 - T1). Heat supplied is Q = n Cp ΔT. (4) Isochoric Process (V = constant, dV = 0): Because boundaries do not displace, boundary work is identically zero: W = 0. All absorbed heat increases the internal energy of the gas: Q = ΔU = n Cv ΔT.',
              keyTakeaway: 'The slope of an adiabatic curve on a P-V diagram is γ times steeper than an isothermal curve intersecting at the same point. Adiabatic expansion always cools the gas, whereas adiabatic compression heats it.',
            },
            {
              title: '3. Heat Engines, Energy Flow & The Second Law of Thermodynamics',
              timestamp: '19:15 - 26:00',
              content: 'A heat engine is a cyclic device that converts thermal energy into continuous mechanical work. It operates between two thermal reservoirs: a heat Source maintained at a constant high temperature Th and a heat Sink maintained at a constant low temperature Tc (Th > Tc). In each operational cycle: (a) the working substance absorbs thermal energy Qh from the hot source; (b) the working substance expands, performing external mechanical work W; (c) the working substance rejects residual waste heat Qc into the cold sink; (d) the working substance is returned to its initial thermodynamic coordinates (P1, V1, T1). Because the engine returns to its original state, net internal energy change across one complete cycle is zero: ΔU_cycle = 0. Energy conservation gives the net mechanical work delivered: W = Qh - Qc. The thermal efficiency η is defined as the fraction of absorbed heat converted into useful work: η = W / Qh = (Qh - Qc) / Qh = 1 - (Qc / Qh). The Second Law of Thermodynamics dictates that thermal efficiency can never equal 100%: Kelvin-Planck Statement: It is physically impossible to construct an engine operating in a cycle whose sole effect is to extract heat from a single thermal reservoir and convert it completely into work. Clausius Statement: It is impossible to construct a cyclic machine whose sole effect is the transfer of heat from a colder body to a hotter body without an external work input.',
              keyTakeaway: 'Every real and ideal heat engine must reject a finite quantity of heat Qc > 0 to a low-temperature sink. A 100% efficient heat engine would violate the Kelvin-Planck statement of the Second Law.',
            },
            {
              title: '4. The Carnot Cycle, Four Reversible Stages & Carnot’s Theorem',
              timestamp: '26:00 - 38:00',
              content: 'In 1824, Nicolas Léonard Sadi Carnot demonstrated that maximum thermal efficiency is achieved by an idealized, reversible cycle operating between two temperature limits Th and Tc. The Carnot Cycle consists of four successive reversible operations plotted on an indicator (P-V) diagram: Stage 1 (A → B): Reversible Isothermal Expansion at Source temperature Th. The cylinder is placed on the hot source. The gas absorbs heat Qh and expands from VA to VB doing work W1 = nR Th ln(VB / VA). Stage 2 (B → C): Reversible Adiabatic Expansion from Th to Tc. The cylinder is placed on a non-conducting stand. Gas expands thermally insulated from VB to VC, doing work W2 = nR (Th - Tc) / (γ - 1) while temperature falls from Th to Tc. Stage 3 (C → D): Reversible Isothermal Compression at Sink temperature Tc. The cylinder is placed on the cold sink. The gas is compressed from VC to VD, rejecting heat Qc = nR Tc ln(VC / VD) and doing work W3 = -nR Tc ln(VC / VD). Stage 4 (D → A): Reversible Adiabatic Compression from Tc to Th. The cylinder is placed on the insulating stand. The gas is compressed from VD to VA, absorbing work W4 = -nR (Th - Tc) / (γ - 1) and restoring the gas to state A (Th, VA). Net mechanical work per cycle is W_net = W1 + W2 + W3 + W4 = W1 + W3. Because processes B → C and D → A are adiabatic: Th VB^(γ-1) = Tc VC^(γ-1) and Th VA^(γ-1) = Tc VD^(γ-1). Dividing these two equations gives (VB / VA)^(γ-1) = (VC / VD)^(γ-1) ⇒ VB / VA = VC / VD. Substituting this ratio reveals: Qc / Qh = Tc / Th! Thus, the Carnot efficiency depends solely on reservoir absolute temperatures: η_carnot = 1 - (Tc / Th). Carnot Theorem: (1) No engine operating between two given temperatures can be more efficient than a reversible Carnot engine operating between the same two temperatures. (2) All reversible engines operating between the same two temperatures have identical efficiency, completely independent of the working substance.',
              keyTakeaway: 'Carnot efficiency η = 1 - (Tc / Th) represents the theoretical ceiling of thermal efficiency. It can reach 1.0 (100%) only if the sink is at absolute zero (Tc = 0 K), which is forbidden by the Third Law of Thermodynamics.',
            },
          ],
          derivations: [
            {
              title: 'Derivation 1: Work Done in Reversible Isothermal Expansion of an Ideal Gas',
              steps: [
                '1. Identify governing boundary conditions: Temperature T is held constant (isothermal), meaning ΔT = 0 and ΔU = 0 for an ideal gas.',
                '2. Write differential mechanical work: dW = P dV, where P is the internal pressure of the gas during quasi-static expansion.',
                '3. Substitute the ideal gas equation of state: P = (n R T) / V.',
                '4. Set up definite integral from initial volume V1 to final volume V2: W = ∫[V1 to V2] P dV = ∫[V1 to V2] (n R T / V) dV.',
                '5. Factor out constant quantities (n, R, T): W = n R T ∫[V1 to V2] (1 / V) dV.',
                '6. Evaluate the integral using standard calculus anti-derivative ∫ (1/V) dV = ln(V): W = n R T [ln(V)]_[V1 to V2] = n R T [ln(V2) - ln(V1)].',
                '7. Apply logarithmic quotient identity ln(a) - ln(b) = ln(a / b): W = n R T ln(V2 / V1).',
                '8. Convert natural logarithm (base e) to common logarithm (base 10) by multiplying by ln(10) ≈ 2.302585: W = 2.303 n R T log10(V2 / V1).',
                '9. Using Boyle’s law (P1 V1 = P2 V2 ⇒ V2 / V1 = P1 / P2), express work in terms of pressures: W = 2.303 n R T log10(P1 / P2).',
              ],
              finalResult: 'W = n R T ln(V2 / V1) = 2.303 n R T log10(V2 / V1) = 2.303 n R T log10(P1 / P2)',
            },
            {
              title: 'Derivation 2: Work Done in Reversible Adiabatic Expansion of an Ideal Gas',
              steps: [
                '1. Identify adiabatic condition: Q = 0. By First Law, dQ = dU + dW = 0 ⇒ dW = -dU.',
                '2. Express differential work: dW = -n Cv dT. Integrating between T1 and T2: W = -n Cv (T2 - T1) = n Cv (T1 - T2).',
                '3. Using Mayer’s relation Cp - Cv = R and definition of adiabatic ratio γ = Cp / Cv: Cv = R / (γ - 1).',
                '4. Substitute Cv: W = n [R / (γ - 1)] (T1 - T2) = [n R (T1 - T2)] / (γ - 1).',
                '5. Alternatively, use Poisson’s relation P V^γ = K (constant) ⇒ P = K V^(-γ).',
                '6. Set up integral: W = ∫[V1 to V2] K V^(-γ) dV = K [V^(1-γ) / (1-γ)]_[V1 to V2] = [K V2^(1-γ) - K V1^(1-γ)] / (1-γ).',
                '7. Since K = P1 V1^γ = P2 V2^γ: K V2^(1-γ) = P2 V2 and K V1^(1-γ) = P1 V1.',
                '8. Therefore: W = (P2 V2 - P1 V1) / (1-γ) = (P1 V1 - P2 V2) / (γ - 1).',
              ],
              finalResult: 'W = (P1 V1 - P2 V2) / (γ - 1) = [n R (T1 - T2)] / (γ - 1)',
            },
            {
              title: 'Derivation 3: Thermal Efficiency of the Ideal Carnot Engine Cycle',
              steps: [
                '1. Stage 1 (Isothermal expansion at Th from VA to VB): Heat absorbed Qh = W1 = n R Th ln(VB / VA).',
                '2. Stage 2 (Adiabatic expansion from Th to Tc, VB to VC): Work W2 = n R (Th - Tc) / (γ - 1). Adiabatic relation: Th VB^(γ-1) = Tc VC^(γ-1) ... (Eq. 1).',
                '3. Stage 3 (Isothermal compression at Tc from VC to VD): Heat rejected Qc = -W3 = n R Tc ln(VC / VD).',
                '4. Stage 4 (Adiabatic compression from Tc to Th, VD to VA): Work W4 = -n R (Th - Tc) / (γ - 1). Adiabatic relation: Tc VD^(γ-1) = Th VA^(γ-1) ... (Eq. 2).',
                '5. Net work per cycle: W_net = W1 + W2 + W3 + W4. Note that W2 + W4 = 0, so W_net = W1 + W3 = Qh - Qc.',
                '6. Divide Eq. 1 by Eq. 2: [Th VB^(γ-1)] / [Th VA^(γ-1)] = [Tc VC^(γ-1)] / [Tc VD^(γ-1)] ⇒ (VB / VA)^(γ-1) = (VC / VD)^(γ-1).',
                '7. Taking the (1 / (γ-1))-th power of both sides yields: VB / VA = VC / VD.',
                '8. Compute ratio of rejected heat to absorbed heat: Qc / Qh = [n R Tc ln(VC / VD)] / [n R Th ln(VB / VA)]. Since VB/VA = VC/VD, logarithms cancel: Qc / Qh = Tc / Th.',
                '9. Substitute into thermal efficiency definition η = 1 - (Qc / Qh): η_carnot = 1 - (Tc / Th).',
              ],
              finalResult: 'η_carnot = 1 - (Qc / Qh) = 1 - (Tc / Th)',
            },
          ],
          proTips: [
            'Temperature Units Trap: When using η = 1 - (Tc / Th), temperatures MUST always be converted to absolute Kelvin (K = °C + 273.15). Using Celsius will yield completely incorrect answers.',
            'Cyclic Invariance: Never calculate ΔU across a full cycle — for any cyclic operation, ΔU_cycle is strictly 0 J because internal energy is a state function.',
            'P-V Area Interpretation: The enclosed area on an indicator diagram equals net work. Clockwise cycles represent heat engines (W_net > 0); counter-clockwise cycles represent refrigerators/heat pumps (W_net < 0).',
            'Isothermal vs Adiabatic Slope: If asked to identify curves on a P-V graph, remember that the steeper curve is always adiabatic because its slope is γ times that of the isothermal curve.',
          ],
        },
        chatpata: {
          hinglishIntro: 'Bhai dekho, Thermodynamics koi rocket science nahi hai! Bas simple zindgi ke hisaab-kitab se samjho: jitni heat energy doge, thoda hissa internal energy bank balance mein jama hoga aur baki se bahar doston ke saath mechanical kaam hoga.',
          desiAnalogies: [
            {
              concept: 'First Law of Thermodynamics (Q = ΔU + W)',
              analogy: 'Mummy ne Pocket Money di ₹1000 (Heat Added, Q = +1000 J). Tumne ₹400 chupke se apni Gullak mein bacha liye (Internal Energy increase, ΔU = +400 J), aur baki ₹600 se canteen mein doston ko samose-chai ki party de di (Work Done by system, W = +600 J). Equation 100% balanced: Mummy ka paisa = Gullak + Party!',
              desiPunchline: 'Gullak (ΔU) + Canteen Party (W) = Mummy Ki Pocket Money (Q)!',
            },
            {
              concept: 'Isothermal vs Adiabatic Expansion',
              analogy: 'Cycle ke tyre mein aaram-aaram se hawa bharo toh garmi bahar nikal jaati hai aur temperature constant rehta hai (Isothermal). Lekin agar cycle ka tube achanak "THAAN!" karke phat jaye, toh gas ko heat lene ka time hi nahi milta (Q = 0). Gas apni hi internal energy kharch karke expand hoti hai, isliye tube ke valve par chhu kar dekho toh bilkul baraf jaisi thandi lagti hai (Adiabatic cooling)!',
              desiPunchline: 'Aaram se = Isothermal; Achanak Blast = Adiabatic Thandak!',
            },
            {
              concept: 'Isochoric Process (Volume Constant, W = 0)',
              analogy: 'Ghar ka pressure cooker imagine karo jiski seeti jam ho gayi hai. Steel ki body rigid hai, toh volume hil hi nahi sakta (dV = 0). Jab volume hil hi nahi sakta toh piston ka koi work nahi hoga (Work Done = 0). Jitni gas jalaoge, saari energy andar ke daal-chawal aur steam ka pressure badhane mein chali jayegi.',
              desiPunchline: 'Iso-CHORIC matlab Volume bilkul CHUP (Work = 0)!',
            },
            {
              concept: 'Heat Engine & Why 100% Efficiency Is Impossible',
              analogy: 'Yeh bilkul school ke Sharma ji ke bete jaisa hai! Chahe kitna bhi padh le, 100% full attendance aur zero mistake exam mein impossible hai. Second Law kehta hai: engine kitna bhi mehanga bana lo, thoda na thoda dhuan aur heat sink mein waste karni hi padegi. Zero waste engine banana kudrat ke khilaaf hai!',
              desiPunchline: '100% efficiency is a myth, bro! Thoda loss toh Sharma ji ke bete ka bhi hota hai!',
            },
            {
              concept: 'Carnot Engine (The Ideal Topper)',
              analogy: 'Carnot Engine physics ki duniya ka "Ideal Topper" hai jo paper par exist karta hai lekin real life mein dhundhne se bhi nahi milta! Chaar step mein ghumta hai: pehle source se heat kheecho (isothermal expansion), phir akele maze se expand karo (adiabatic expansion), phir kachra thande sink mein phenko (isothermal compression), aur wapas apni purani jagah par aa jao (adiabatic compression).',
              desiPunchline: 'Carnot engine = Theoretical Topper. Real life mein friction aur heat loss zaroor aayenge!',
            },
          ],
          bhaiKaSummary: [
            'Indicator diagram ka andar ka area = Total mechanical work done. Agar chakkar clockwise hai toh engine kaam kar raha hai (fayda); anti-clockwise hai toh refrigerator hai (bahar se bijli kharch hogi).',
            'Kelvin Scale Rule: Formula mein kabhi bhi degree Celsius mat daalna bhai, warna marks ka kalyan ho jayega! Always Kelvin = °C + 273.15.',
            'Cyclic Process Magic: Full cycle ke baad ΔU hamesha ZERO hota hai. Sawal mein cyclic dekho toh seedha ΔU = 0 likho!',
          ],
          jugaadPoints: [
            'Paper mein agar likha ho "sudden burst" ya "fast process", toh 100% Adiabatic equation (P V^γ = const) lagana!',
            'Agar likha ho "slowly conducting cylinder", toh aankh band karke Isothermal (T = const) lagana!',
            'Efficiency formula yaad rakhne ka tareeka: 1 minus (Chhota Temp / Bada Temp) in Kelvin!',
          ],
        },
        chatpate: {
          hinglishIntro: 'Bhai dekho, Thermodynamics bilkul simple hai!',
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Core high-frequency syllabus topic for Class 12 Physics. Typically features a 1-mark definition on First Law / state variables, a 3-mark calculus derivation of isothermal or adiabatic work, and a 5-mark Carnot cycle indicator diagram analysis and efficiency numerical.',
          highWeightageTopics: [
            'Calculus Derivation of Isothermal & Adiabatic Work Done (3-5 Marks)',
            'Carnot Cycle: Four Stages on P-V Diagram & Efficiency Derivation (5 Marks)',
            'First Law Sign Conventions & State vs Path Functions (1-2 Marks)',
            'Heat Engine Efficiency & Numerical Problems (3 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'State the First Law of Thermodynamics and write its mathematical equation in differential form, defining all symbols.',
              answer: 'The First Law of Thermodynamics states that energy can neither be created nor destroyed; heat supplied to a closed system equals the sum of the increase in its internal energy and the work done by the system on its surroundings.\nMathematical formulation: dQ = dU + dW = dU + P dV\nWhere: dQ = infinitesimal heat absorbed by the system (Joules), dU = infinitesimal change in internal energy (Joules), and dW = P dV = mechanical work done by the system against external pressure P (Joules).',
              markingScheme: [
                'Correct verbal statement of First Law (½ mark)',
                'Correct differential equation with explicit symbol definitions (½ mark)',
              ],
              frequentlyAskedIn: 'AI Practice Question — Board Format (1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Derive an analytical expression for the work done during the reversible isothermal expansion of n moles of an ideal gas from volume V1 to volume V2 at temperature T.',
              answer: '1. Condition: In an isothermal process, temperature T remains constant (ΔT = 0), so ΔU = 0 for an ideal gas.\n2. Work done for differential volume change dV: dW = P dV.\n3. Using the ideal gas equation of state: P = n R T / V.\n4. Integrating from initial volume V1 to final volume V2:\n   W = ∫[V1 to V2] P dV = ∫[V1 to V2] (n R T / V) dV = n R T ∫[V1 to V2] (1 / V) dV\n5. Evaluating the integral: W = n R T [ln(V)]_[V1 to V2] = n R T ln(V2 / V1).\n6. Converting to base-10 logarithm:\n   W = 2.303 n R T log10(V2 / V1).\n7. In terms of pressures (using Boyle’s law P1 V1 = P2 V2 ⇒ V2 / V1 = P1 / P2):\n   W = 2.303 n R T log10(P1 / P2).',
              markingScheme: [
                'Setting up the integral dW = P dV with ideal gas substitution P = nRT/V (1 mark)',
                'Correct integration limits and natural logarithm step nRT ln(V2/V1) (1 mark)',
                'Final formula with 2.303 conversion factor and pressure equivalence (1 mark)',
              ],
              frequentlyAskedIn: 'AI Practice Question — Board Format (3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Describe the working of a Carnot engine. Explain the four reversible stages of the Carnot cycle with the aid of a neat P-V indicator diagram, and derive the expression for its thermal efficiency η = 1 - (Tc / Th).',
              answer: 'A Carnot engine is an idealized, reversible heat engine operating between a heat source at Th and a heat sink at Tc.\nThe four successive stages on the P-V diagram are:\n1. Stage 1 (A → B): Reversible Isothermal Expansion at constant source temperature Th. Gas absorbs heat Qh from the source and expands from VA to VB. Work done: W1 = Qh = n R Th ln(VB / VA).\n2. Stage 2 (B → C): Reversible Adiabatic Expansion from Th to Tc. Gas expands without heat exchange from VB to VC, doing work W2 = n R (Th - Tc) / (γ - 1). Adiabatic relation: Th VB^(γ-1) = Tc VC^(γ-1) ... (Eq. 1).\n3. Stage 3 (C → D): Reversible Isothermal Compression at constant sink temperature Tc. Gas is compressed from VC to VD, rejecting heat Qc to the sink. Work done: W3 = -Qc = -n R Tc ln(VC / VD).\n4. Stage 4 (D → A): Reversible Adiabatic Compression from Tc to Th. Gas is compressed without heat exchange from VD to VA, restoring initial state A. Work done: W4 = -n R (Th - Tc) / (γ - 1). Adiabatic relation: Tc VD^(γ-1) = Th VA^(γ-1) ... (Eq. 2).\n\nNet Work & Efficiency Derivation:\nNet work: W_net = W1 + W2 + W3 + W4. Since W2 + W4 = 0, W_net = W1 + W3 = Qh - Qc.\nDividing Eq. 1 by Eq. 2: (VB / VA)^(γ-1) = (VC / VD)^(γ-1) ⇒ VB / VA = VC / VD.\nTherefore, the heat ratio simplifies to: Qc / Qh = [n R Tc ln(VC / VD)] / [n R Th ln(VB / VA)] = Tc / Th.\nThermal efficiency is defined as: η = W_net / Qh = (Qh - Qc) / Qh = 1 - (Qc / Qh).\nSubstituting Qc / Qh = Tc / Th:\nη_carnot = 1 - (Tc / Th).',
              markingScheme: [
                'Correct description of all four stages (A→B, B→C, C→D, D→A) with thermal contacts (2 marks)',
                'Work equations for isothermal and adiabatic stages showing W2 + W4 = 0 (1 mark)',
                'Proof of volume ratio equality (VB/VA = VC/VD) using adiabatic relations (1 mark)',
                'Final efficiency formula η = 1 - Tc/Th with Kelvin requirement stated (1 mark)',
              ],
              frequentlyAskedIn: 'AI Practice Question — Board Format (5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Foundations & State Variables (P, V, T, U)', summary: 'Equilibrium states, system boundaries, and ideal gas equation of state.' },
        { time: '05:45', seconds: 345, title: 'First Law of Thermodynamics & Sign Conventions', summary: 'Internal energy, conservation of energy (Q = ΔU + W), and work dW = P dV.' },
        { time: '12:30', seconds: 750, title: 'Thermodynamic Processes & Isothermal Work Derivation', summary: 'Isothermal, adiabatic, isobaric, and isochoric paths with calculus derivations.' },
        { time: '19:15', seconds: 1155, title: 'Heat Engines & The Second Law of Thermodynamics', summary: 'Working substance, source/sink reservoirs, thermal efficiency, and Kelvin-Planck & Clausius statements.' },
        { time: '26:00', seconds: 1560, title: 'The Carnot Cycle: Four Reversible Operations', summary: 'P-V indicator analysis, 2 isothermals + 2 adiabatics, and net work calculation.' },
        { time: '33:20', seconds: 2000, title: 'Carnot Theorem, Reversibility & Numerical Application', summary: 'Maximum theoretical efficiency (η = 1 - Tc/Th) and step-by-step 500K-300K numerical.' },
      ],
      flashcards: [
        { id: 1, front: 'State the First Law of Thermodynamics in differential form.', back: 'dQ = dU + dW = dU + P dV (Heat added = Internal energy change + Work done by system).', concept: 'First Law' },
        { id: 2, front: 'Why is internal energy U called a state function while Work W is a path function?', back: 'U depends purely on initial and final equilibrium temperature coordinates (ΔU_cycle = 0), whereas W depends on the specific path taken on the P-V diagram.', concept: 'State vs Path' },
        { id: 3, front: 'What is the work done during an isochoric process?', back: 'Zero (W = 0), because volume does not change (dV = 0), meaning all heat directly changes internal energy (Q = ΔU).', concept: 'Isochoric Process' },
        { id: 4, front: 'What is the formula for work done during reversible isothermal expansion of an ideal gas?', back: 'W = nRT ln(V2 / V1) = 2.303 nRT log10(V2 / V1).', concept: 'Isothermal Work' },
        { id: 5, front: 'What is the thermal efficiency of a Carnot engine operating between temperatures Th and Tc?', back: 'η = 1 - (Tc / Th), where Th and Tc must strictly be in Kelvin.', concept: 'Carnot Efficiency' },
        { id: 6, front: 'Why can the efficiency of a heat engine never equal 100%?', back: 'By the Kelvin-Planck statement of the Second Law, an engine cannot operate without discharging waste heat Qc to a cold sink (requires Tc = 0 K, which is unattainable).', concept: 'Second Law' },
      ],
      quiz: [
        {
          id: 1,
          question: 'In any closed cyclic thermodynamic process, what is the net change in internal energy (ΔU_cycle)?',
          options: ['Zero (ΔU = 0)', 'Equal to the work done (ΔU = W)', 'Equal to total heat absorbed (ΔU = Qh)', 'Depends on the working substance'],
          correctIndex: 0,
          explanation: 'Because internal energy U is a state function that depends only on equilibrium temperature, a system returning to its initial state has ΔU_cycle = 0.',
          topic: 'First Law & State Functions',
        },
        {
          id: 2,
          question: 'During reversible adiabatic expansion of an ideal gas, work is performed by the gas at the expense of what?',
          options: ['Its own internal energy (causing temperature to decrease)', 'External heat supplied from the surroundings', 'Gravitational potential energy', 'Atmospheric friction'],
          correctIndex: 0,
          explanation: 'In an adiabatic process Q = 0, so by the First Law W = -ΔU. Work done by the gas reduces its internal energy, resulting in a temperature drop.',
          topic: 'Adiabatic Process',
        },
        {
          id: 3,
          question: 'A Carnot engine operates between a source at 500 K and a sink at 300 K. What is its thermal efficiency?',
          options: ['40% (0.40)', '60% (0.60)', '20% (0.20)', '100% (1.00)'],
          correctIndex: 0,
          explanation: 'Efficiency η = 1 - (Tc / Th) = 1 - (300 / 500) = 1 - 0.60 = 0.40, which equals 40%.',
          topic: 'Carnot Cycle Efficiency',
        },
        {
          id: 4,
          question: 'Which statement correctly compares the slopes of adiabatic and isothermal curves passing through the same state on a P-V diagram?',
          options: ['The adiabatic curve is steeper by a factor of γ (Cp/Cv)', 'The isothermal curve is steeper by a factor of γ', 'Both curves have identical slopes', 'The adiabatic curve is horizontal'],
          correctIndex: 0,
          explanation: 'The slope of an isothermal curve is dP/dV = -P/V, while for an adiabatic curve dP/dV = -γ(P/V). Because γ > 1, the adiabatic curve is γ times steeper.',
          topic: 'Indicator Diagram Slopes',
        },
        {
          id: 5,
          question: 'Under the standard Physics sign convention, what is the sign of work done when a gas is compressed by external force?',
          options: ['Negative (W < 0)', 'Positive (W > 0)', 'Zero (W = 0)', 'Infinite'],
          correctIndex: 0,
          explanation: 'In Physics, work done BY the gas during expansion (dV > 0) is positive; work done ON the gas during compression (dV < 0) is negative.',
          topic: 'Sign Conventions',
        },
      ],
      quickRevisionPoints: [
        'First Law of Thermodynamics: Q = ΔU + W (Conservation of energy; W > 0 for expansion by the system).',
        'State vs Path Functions: Internal energy U is a state function (ΔU_cycle = 0); Heat Q and Work W are path functions.',
        'Isothermal Work (Constant T): W = 2.303 nRT log10(V2 / V1) = 2.303 nRT log10(P1 / P2).',
        'Adiabatic Work (Q = 0): W = [nR(T1 - T2)] / (γ - 1) = (P1 V1 - P2 V2) / (γ - 1).',
        'Heat Engine Efficiency: η = W / Qh = 1 - (Qc / Qh).',
        'Carnot Engine Efficiency: η_carnot = 1 - (Tc / Th) with temperatures strictly in Kelvin (K = °C + 273.15).',
        'Indicator Diagram Area: Net work done per cycle equals the enclosed area on the P-V diagram (clockwise = positive work).',
      ],
    };
  }

  // 8. DEFAULT / GENERAL FALLBACK
  return {
    content: {
      quick: {
        headline: `${chapter} Core Exam Essentials & Revision Formulae`,
        cheatSheet: [
          `Key principle: Conservation and governing relations in ${chapter}.`,
          `State boundary condition: Apply initial limits before solving derivatives.`,
          `Standard sign convention: Positive work indicates expansion against external constraints.`,
          `High-frequency trap: Verify SI units and temperature scales (always use Kelvin for thermodynamic laws).`,
        ],
        formulas: [
          { name: 'Primary Governing Relation', formula: 'dE = dU + dW', note: 'Standard SI metric units apply' },
          { name: 'Efficiency Ratio', formula: 'η = 1 - (Q_out / Q_in)', note: 'Dimensionless coefficient' },
          { name: 'Governed Work Equation', formula: 'W = 2.303 n R T log10(V2 / V1)', note: 'Reversible isothermal expansion of ideal system' },
        ],
        bulletSummary: [
          'State vs Path functions: Thermodynamic properties depend purely on equilibrium states.',
          'Board-standard marking: Always state definitions and sketch indicator diagrams.',
        ],
      },
      minimal: {
        headline: `${chapter} Core Exam Essentials`,
        cheatSheet: [
          `Key principle in ${chapter}.`,
          `Standard sign convention.`,
        ],
        formulas: [
          { name: 'Relation', formula: 'dE = dU + dW', note: 'SI units' },
        ],
        bulletSummary: ['State vs Path variables.'],
      },
      topper: {
        introduction: `Comprehensive lecture synthesis for ${subject}: ${chapter}. Structured in alignment with NCERT, CBSE, and competitive examination standards.`,
        deepDive: [
          {
            title: `1. Foundational Theory & Boundary Conditions of ${chapter}`,
            timestamp: '02:15',
            content: `The lecture establishes core physical assumptions, boundary limits, and mathematical models governing ${chapter}. Microscopic fluctuations average out to steady macroscopic state variables.`,
            keyTakeaway: 'Verify that initial and final boundary constraints are properly satisfied before applying algebraic expressions.',
          },
          {
            title: '2. Mathematical Formulation & Step-by-Step Proof',
            timestamp: '14:30',
            content: 'Detailed calculus derivation integrating differential work elements across equilibrium paths. Demonstrates equivalence between indicator curve area and mechanical energy output.',
            keyTakeaway: 'Draw clear P-V schematic diagrams with directional arrows to secure full 5-mark presentation score.',
          },
        ],
        derivations: [
          {
            title: `Derivation of Governed Work in ${chapter}`,
            steps: [
              'State baseline differential equation: dW = P dV',
              'Substitute equation of state under isothermal equilibrium',
              'Integrate across boundary volumes V1 to V2',
              'Convert natural logarithm to base-10 with factor 2.303',
            ],
            finalResult: 'W = 2.303 n R T log10(V2 / V1)',
          },
        ],
        proTips: [
          'Always state the physical dimensions and SI units of intermediate constants.',
          'In cyclic questions, net internal energy change ΔU is always ZERO. Never compute ΔU separately for closed cycles.',
        ],
      },
      chatpata: {
        hinglishIntro: `Bhai dekho, ${chapter} ko bilkul simple Hinglish mein samajhte hain! Yeh ${subject} ka super-scoring chapter hai aur iske concepts ek baar dimaag mein baith gaye toh exam mein marks pakke hain.`,
        desiAnalogies: [
          {
            concept: `${chapter} Core Foundation`,
            analogy: `Jaise daily life mein balance aur rules hote hain, waise hi ${subject} mein ${chapter} exact relationships follow karta hai. Bas inputs aur outputs ka hisaab theek rakho!`,
            desiPunchline: `Fundamentals clear toh full marks guaranteed!`,
          },
          {
            concept: `Exam Scoring Trap in ${chapter}`,
            analogy: `Examiner hamesha boundary values aur units mein ghumane ki koshish karta hai — jaise traffic police rule book check karti hai, waise hi har step pe formula aur dimensions verify karo.`,
            desiPunchline: `Units aur steps hamesha dhyan se likho!`,
          },
        ],
        bhaiKaSummary: [
          `Key concept 1: ${chapter} ke core formulas ko direct step-by-step apply karo.`,
          `Key concept 2: Numerical problems mein given parameters aur final units verify karna mat bhoolna.`,
        ],
        jugaadPoints: [
          `Board exam mein full marks ke liye definition ke saath formal diagram aur formula zaroor likhna!`,
        ],
      },
      chatpate: {
        hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai! Yeh ${subject} ka essential topic hai.`,
        desiAnalogies: [],
        bhaiKaSummary: [],
        jugaadPoints: [],
      },
      exam: {
        trendAnalysis: `Syllabus review for ${chapter}. Includes high-yield conceptual derivations and analytical practice questions.`,
        highWeightageTopics: [
          `Derivations of governing relations in ${chapter} (3 Marks)`,
          'Sign convention reasoning and State function definitions (1-2 Marks)',
          'Numerical computation with unit conversions (3 Marks)',
        ],
        questions: [
          {
            id: 1,
            marks: 1,
            question: `Define the primary governing state function in ${chapter} and state its SI unit.`,
            answer: `The primary state function depends only on initial and final thermodynamic equilibrium states and is independent of path. Its SI unit is Joule (J).`,
            markingScheme: ['Correct definition (½ mark)', 'Correct SI unit (½ mark)'],
            frequentlyAskedIn: 'AI Practice Question (1 Mark)',
          },
          {
            id: 2,
            marks: 3,
            question: `Derive the expression for work done in ${chapter} during an isothermal reversible process.`,
            answer: `Starting with dW = P dV and ideal state relation P = nRT/V. Integrating from V1 to V2 yields W = nRT ln(V2/V1) = 2.303 nRT log10(V2/V1).`,
            markingScheme: ['Integral setup with limits (1 mark)', 'Variable substitution (1 mark)', 'Final log10 relation (1 mark)'],
            frequentlyAskedIn: 'AI Practice Question (3 Marks)',
          },
        ],
      },
    },
    timestamps: [
      { time: '01:30', seconds: 90, title: 'Introduction & Core Terminology', summary: 'Definitions and state variables.' },
      { time: '12:15', seconds: 735, title: 'Mathematical Proof & Derivation', summary: 'Step-by-step calculus derivation.' },
      { time: '24:40', seconds: 1480, title: 'Common Traps & Examination Rubric', summary: 'Scoring tips and examiner expectations.' },
    ],
    flashcards: [
      { id: 1, front: `What is the core premise of ${chapter}?`, back: 'Conservation of energy and reversible state transformations under boundary constraints.', concept: 'Core Principle' },
      { id: 2, front: 'What mistake do students most often make in this topic?', back: 'Failing to convert temperatures to the absolute Kelvin scale before computation.', concept: 'Exam Trap' },
      { id: 3, front: 'Why is internal energy (U) called a state function?', back: 'Because its value depends strictly on the current thermodynamic state (temperature), independent of the path taken.', concept: 'State Function' },
    ],
    quiz: [
      {
        id: 1,
        question: `In ${chapter}, which property remains invariant across a cyclic process?`,
        options: ['Net internal energy change (ΔU = 0)', 'Work done (W = 0)', 'Heat absorbed (Q = 0)', 'Pressure at all points'],
        correctIndex: 0,
        explanation: 'Because internal energy is a state function, a system returning to its initial state experiences zero net internal energy change (ΔU = 0).',
        topic: `${chapter} Fundamentals`,
      },
      {
        id: 2,
        question: 'What is the primary factor that causes deduction in step-marking for this topic?',
        options: ['Missing physical units in final answer', 'Using blue ink', 'Writing too fast', 'Double underlining'],
        correctIndex: 0,
        explanation: 'Examiner rubrics explicitly allocate ½ to 1 mark for physical units (Joules, Kelvin, Pascals).',
        topic: 'Exam Presentation',
      },
      {
        id: 3,
        question: 'Under adiabatic expansion without heat exchange, work is done at the expense of what?',
        options: ['Internal energy of the gas', 'External heater', 'Atmospheric gravity', 'Intermolecular friction'],
        correctIndex: 0,
        explanation: 'In an adiabatic process dQ = 0, so dW = -dU. The gas does work by expending its own internal energy, lowering its temperature.',
        topic: 'Adiabatic Processes',
      },
    ],
    quickRevisionPoints: [
      `Governing principle: First law applies conservation of energy to ${chapter}.`,
      'Indicator diagram: Clockwise cycle yields positive work output.',
      'Sign convention: Work done by gas is positive; work done on gas is negative.',
      'Conversion rule: Always express temperatures in Kelvin (T_K = T_C + 273.15).',
    ],
  };
}
