import type { StudyKit } from '../types';

export const SAMPLE_STUDY_KITS: StudyKit[] = [
  {
    id: 'kit-thermodynamics',
    title: 'Thermodynamics: First Law, Heat Engines & Carnot Cycle',
    subject: 'Physics',
    academicClass: 'Class 12',
    chapter: 'Thermal Physics & Kinetic Theory',
    duration: '42 mins lecture',
    videoUrl: 'https://youtube.com/watch?v=sample-thermo',
    dateCreated: 'Today at 3:15 PM',
    noteStyle: 'topper',
    language: 'Hinglish',
    content: {
      minimal: {
        headline: 'Thermodynamics High-Yield Bullet Sheet',
        cheatSheet: [
          'ΔU is a state function: depends only on initial and final temperatures, ΔU = nCvΔT.',
          'Work done in isothermal reversible: W = 2.303 nRT log(V2/V1).',
          'Adiabatic process: PV^γ = constant, Q = 0, so W = -ΔU.',
          'Carnot Engine Efficiency: η = 1 - (T_cold / T_hot). Never 100% possible.',
          'Cyclic process: net ΔU = 0, therefore Q_net = W_net.',
        ],
        formulas: [
          { name: 'First Law of Thermodynamics', formula: 'dQ = dU + dW', note: 'Sign convention: W > 0 when gas expands (by system).' },
          { name: 'Mayer’s Relation', formula: 'Cp - Cv = R', note: 'Valid for ideal gases only.' },
          { name: 'Adiabatic Index', formula: 'γ = Cp / Cv', note: 'Monoatomic: 1.67, Diatomic: 1.40.' },
          { name: 'Carnot Engine Efficiency', formula: 'η = 1 - (T2 / T1) = (W / Q1)', note: 'T must be in Kelvin!' },
        ],
        bulletSummary: [
          'State vs Path functions: U, P, V, T are state functions; Q and W are path functions.',
          'Isothermal: ΔT = 0, ΔU = 0 → Q = W.',
          'Isochoric: ΔV = 0, W = 0 → Q = ΔU = nCvΔT.',
          'Isobaric: P = const, W = P(V2 - V1), Q = nCpΔT.',
          'Second Law: Clausius & Kelvin-Planck statements rule out perpetual motion machines.',
        ],
      },
      topper: {
        introduction: 'Thermodynamics deals with macroscopic transformations of energy between heat and mechanical work. In modern board and competitive exams, question setters test whether you understand the sign conventions, microscopic origin of internal energy, and reversible vs irreversible cycle efficiencies.',
        deepDive: [
          {
            title: '1. First Law & Sign Conventions (NCERT & JEE Standard)',
            timestamp: '03:15',
            content: 'The First Law of Thermodynamics is essentially the law of conservation of energy applied to thermodynamic systems: dQ = dU + dW. Work done dW = P dV. When a system expands against external pressure, dW > 0 (work is done BY the system). If heat is supplied TO the system, dQ > 0. Crucially, internal energy U depends purely on temperature for an ideal gas: U = (f/2) n R T.',
            keyTakeaway: 'Always check if the gas is expanding or compressing before assigning sign to work. In an indicator diagram (P-V curve), clockwise cycle = positive work, counter-clockwise = negative work.',
          },
          {
            title: '2. Four Fundamental Processes (Isothermal, Adiabatic, Isochoric, Isobaric)',
            timestamp: '12:40',
            content: 'The slope of an adiabatic curve on a P-V indicator diagram is steeper than that of an isothermal curve by a factor of γ (adiabatic index). Slope(adiabatic) = -γ (P/V), whereas Slope(isothermal) = - (P/V). Because γ > 1 for all real gases, the adiabatic expansion drops in temperature while isothermal maintains constant temperature through thermal reservoir contact.',
            keyTakeaway: 'In sudden bursting of a tyre, there is no time for heat exchange, so it is an adiabatic expansion, resulting in sudden cooling of air!',
          },
          {
            title: '3. Carnot Cycle: The Theoretical Upper Bound',
            timestamp: '25:10',
            content: 'Sadi Carnot proposed an idealized four-step reversible cycle operating between two thermal reservoirs: (1) Isothermal expansion at Th, (2) Adiabatic expansion from Th to Tc, (3) Isothermal compression at Tc, and (4) Adiabatic compression back to Th. The efficiency η = 1 - (Tc / Th). Carnot theorem proves that no heat engine working between two given temperatures can be more efficient than a reversible Carnot engine.',
            keyTakeaway: 'Efficiency depends SOLELY on the absolute temperatures of the reservoir and sink, independent of the working substance (whether ideal gas, steam, or liquid).',
          },
        ],
        derivations: [
          {
            title: 'Work Done in Reversible Isothermal Expansion',
            steps: [
              'Start with definition: W = ∫ P dV from V1 to V2',
              'For an ideal gas, P = nRT / V',
              'Substitute into integral: W = nRT ∫ (1/V) dV from V1 to V2',
              'Integrating gives: W = nRT [ln(V2) - ln(V1)] = nRT ln(V2 / V1)',
              'Converting to base 10: W = 2.303 nRT log10(V2 / V1) = 2.303 nRT log10(P1 / P2)',
            ],
            finalResult: 'W = 2.303 nRT log10(V2 / V1)',
          },
          {
            title: 'Carnot Engine Efficiency Derivation',
            steps: [
              'Step 1 (Isothermal expansion): Q1 = W1 = nR Th ln(V2 / V1)',
              'Step 2 (Adiabatic expansion): Th V2^(γ-1) = Tc V3^(γ-1) → (V3/V2) = (Th/Tc)^(1/(γ-1))',
              'Step 3 (Isothermal compression): Q2 = -W3 = nR Tc ln(V3 / V4)',
              'Step 4 (Adiabatic compression): Tc V4^(γ-1) = Th V1^(γ-1) → (V4/V1) = (Th/Tc)^(1/(γ-1))',
              'Comparing volume ratios: V2/V1 = V3/V4, hence Q2/Q1 = Tc/Th',
              'Efficiency η = (Q1 - Q2) / Q1 = 1 - (Q2 / Q1) = 1 - (Tc / Th)',
            ],
            finalResult: 'η = 1 - (T_sink / T_source)',
          },
        ],
        proTips: [
          'Whenever you see "insulated container", instantly set dQ = 0 (Adiabatic).',
          'Degrees of freedom (f): Monoatomic (He, Ar) = 3; Diatomic (O2, N2) = 5 at room temp; Triatomic non-linear (H2O) = 6.',
          'In cyclic questions, never compute ΔU. Since it returns to the same state, ΔU is always ZERO. Net heat absorbed equals area enclosed by the cycle on P-V graph.',
        ],
      },
      chatpate: {
        hinglishIntro: 'Bhai suno! Thermodynamics koi rocket science nahi hai. Bas ek simple rule hai: "Universe mein free ka khana kuch nahi milta." Jo energy tum doge, gas ya toh apna temperature badha legi ya bahar push karke kaam karegi.',
        desiAnalogies: [
          {
            concept: 'First Law of Thermodynamics (dQ = dU + dW)',
            analogy: 'Mummy ne Pocket Money di (dQ = ₹1000). Tumne ₹400 apni Gullak mein jama kar liye (dU = Internal Energy), aur bache hue ₹600 se doston ke saath momos khaa liye (dW = External Work Done). Total barabar!',
            desiPunchline: 'Gullak + Party = Mummy ki Pocket Money!',
          },
          {
            concept: 'Adiabatic Process (dQ = 0)',
            analogy: 'Imagine karo exam hall mein invigilator sir ke saamne bina ek lafz bole chupke se paper complete karna. Bahar se koi help (heat) nahi aayegi. Jo likhna hai apne dimaag ki energy kharch karke likhna hai. Tyre puncture hota hai toh hawa thandi nikalti hai kyunki gas ne apni dU kharch kar di.',
            desiPunchline: 'Jab bahar se koi support na ho, toh apna hi stamina kharch hota hai!',
          },
          {
            concept: 'Carnot Engine & Second Law',
            analogy: 'Yeh bilkul tumhare coaching institute ke batch topper jaisa hai — maximum possible marks la sakta hai, lekin 100% full attendance aur perfection phir bhi possible nahi hai. Thoda sa waste hona tay hai.',
            desiPunchline: '100% efficiency is myth, bro!',
          },
        ],
        bhaiKaSummary: [
          'P-V graph ka area = Kitna kaam hua (Work Done). Clockwise matlab paisa kamaya, Anti-clockwise matlab paisa gaya.',
          'Isothermal matlab Temperature mast cool & constant hai (T = same), toh dU = 0.',
          'Isochoric matlab volume change nahi hui (Ghar se bahar nahi gaye, toh dW = 0).',
          'Carnot efficiency mein temperature hamesha KELVIN mein daalna, Celsius mein daala toh exam mein dabba gol!',
        ],
        jugaadPoints: [
          'MCQ Trick: Agar question mein "sudden process" likha ho, aankh band karke ADIABATIC tick karna.',
          'Formula short-code: MAYER ka rule = Cp - Cv = R. Yaad rakho: "Captain - Vice captain = Referee".',
        ],
      },
      exam: {
        trendAnalysis: 'Appeared in CBSE 2024 (Set 1 & 3), JEE Main 2024 Jan Session (12 shifts). High probability of 3-mark derivation on Isothermal Work Done or 2-mark Carnot numerical.',
        highWeightageTopics: [
          'Derivation of Isothermal Work Done (3 Marks)',
          'Carnot Engine Numerical on Efficiency & Heat Rejection (2-3 Marks)',
          'First Law Sign Convention & State Function reasoning (1-2 Marks)',
          'P-V Cycle Area calculation (Assertion-Reasoning)',
        ],
        questions: [
          {
            id: 1,
            marks: 1,
            question: 'Why is the internal energy of an ideal gas purely a function of temperature?',
            answer: 'In an ideal gas, intermolecular attractive forces are assumed to be zero. Consequently, potential energy is zero, and internal energy comprises solely kinetic energy of molecules, which depends directly on absolute temperature (U ∝ T).',
            markingScheme: ['Mentioning zero intermolecular forces (½ mark)', 'Kinetic energy dependence on absolute temperature (½ mark)'],
            frequentlyAskedIn: 'CBSE 2023, 2021',
          },
          {
            id: 2,
            marks: 3,
            question: 'A Carnot engine has an efficiency of 40% when sink temperature is 300 K. By how much must the source temperature be increased to achieve an efficiency of 50%?',
            answer: 'Case 1: η1 = 1 - (T2/T1) → 0.40 = 1 - (300/T1) → 300/T1 = 0.60 → T1 = 500 K.\nCase 2: η2 = 0.50 with same sink T2 = 300 K → 0.50 = 1 - (300/T1\') → 300/T1\' = 0.50 → T1\' = 600 K.\nRequired increase in source temperature = T1\' - T1 = 600 K - 500 K = 100 K (or 100 °C).',
            markingScheme: [
              'Correct formula & substitution for initial source temperature T1 = 500 K (1 mark)',
              'Calculation of new source temperature T1\' = 600 K (1 mark)',
              'Final difference ΔT = 100 K with correct units (1 mark)',
            ],
            frequentlyAskedIn: 'CBSE Board 2024, JEE Main 2023',
          },
          {
            id: 3,
            marks: 5,
            question: 'State the First Law of Thermodynamics. Derive an expression for the work done during an isothermal reversible expansion of an ideal gas. Show this process on a P-V indicator diagram.',
            answer: '1. Statement: Energy can neither be created nor destroyed; heat dQ given to a system equals sum of increase in internal energy dU and work done dW: dQ = dU + dW.\n2. Derivation: Consider n moles of ideal gas expanding reversibly from V1 to V2 at constant T. Work dW = P dV. Since PV = nRT, P = nRT/V. Total work W = ∫(V1 to V2) (nRT/V) dV = nRT [ln V] from V1 to V2 = nRT ln(V2/V1) = 2.303 nRT log10(V2/V1).\n3. Diagram: Draw smooth downward hyperbola from (P1, V1) to (P2, V2) with shaded area under curve representing work done.',
            markingScheme: [
              'Statement and equation of First Law (1 mark)',
              'Mathematical integration steps with ideal gas substitution (2.5 marks)',
              'Final formula in terms of log10 (0.5 mark)',
              'Neat P-V diagram with labelled axes and shaded work area (1 mark)',
            ],
            frequentlyAskedIn: 'CBSE Sample Paper 2024, Delhi Board 2022',
          },
        ],
      },
    },
    timestamps: [
      { time: '01:10', seconds: 70, title: 'Thermodynamic Systems & State Variables', summary: 'Distinction between open, closed, and isolated systems. Concept of state vs path functions.' },
      { time: '05:45', seconds: 345, title: 'First Law of Thermodynamics (Sign Conventions)', summary: 'dQ = dU + dW. Why work by gas is positive in physics but negative in chemistry.' },
      { time: '14:20', seconds: 860, title: 'Isothermal vs Adiabatic Indicator Diagram', summary: 'Why adiabatic slope is γ times steeper than isothermal slope. Graphical proof.' },
      { time: '23:30', seconds: 1410, title: 'Carnot Engine & Second Law Principles', summary: 'Step-by-step 4-stroke cycle and maximum theoretical efficiency η = 1 - (Tc/Th).' },
      { time: '36:15', seconds: 2175, title: 'PYQ Problem Solving & High-Yield Traps', summary: 'Solving recent board numericals and avoiding common temperature unit mistakes.' },
    ],
    flashcards: [
      { id: 1, front: 'State Mayer’s relation for an ideal gas.', back: 'Cp - Cv = R (where Cp and Cv are molar specific heat capacities).', concept: 'Specific Heat' },
      { id: 2, front: 'What is the net change in internal energy (ΔU) over a complete cyclic process?', back: 'Zero (ΔU = 0), because U is a state function and the system returns to its initial state.', concept: 'Cyclic Process' },
      { id: 3, front: 'Why does the temperature of air decrease during sudden expansion from a nozzle?', back: 'It is an adiabatic expansion (dQ = 0). The gas does work at the expense of its own internal energy (W = -ΔU), lowering temperature.', concept: 'Adiabatic Cooling' },
      { id: 4, front: 'What is the efficiency of a Carnot engine operating between 0°C and 100°C?', back: 'η = 1 - (273/373) = 1 - 0.732 = 0.268 or 26.8%. (Remember to convert to Kelvin!)', concept: 'Carnot Efficiency' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Which of the following is NOT a state function in thermodynamics?',
        options: ['Internal Energy (U)', 'Work Done (W)', 'Temperature (T)', 'Pressure (P)'],
        correctIndex: 1,
        explanation: 'Work (W) and Heat (Q) depend on the thermodynamic path taken between states, making them path functions. U, P, V, and T are state functions.',
        topic: 'State Functions & First Law',
      },
      {
        id: 2,
        question: 'During an isothermal expansion of an ideal gas, what is the value of change in internal energy (ΔU)?',
        options: ['ΔU > 0', 'ΔU < 0', 'ΔU = 0', 'Depends on gas volume'],
        correctIndex: 2,
        explanation: 'For an ideal gas, internal energy depends solely on temperature: U = (f/2)nRT. Since temperature is constant in an isothermal process (ΔT = 0), ΔU = 0.',
        topic: 'Isothermal Processes',
      },
      {
        id: 3,
        question: 'The slope of an adiabatic curve on a P-V diagram is related to the isothermal slope by which factor?',
        options: ['Same slope', 'γ times the isothermal slope', '1/γ times the isothermal slope', 'γ² times the isothermal slope'],
        correctIndex: 1,
        explanation: 'Differentiating PV^γ = const gives (dP/dV)_ad = -γ(P/V). For isothermal, (dP/dV)_iso = -(P/V). Hence, adiabatic slope = γ × isothermal slope.',
        topic: 'P-V Indicator Curves',
      },
      {
        id: 4,
        question: 'A Carnot engine operates between reservoirs at 500 K and 300 K. What is its maximum theoretical efficiency?',
        options: ['60%', '40%', '20%', '100%'],
        correctIndex: 1,
        explanation: 'η = 1 - (T_cold / T_hot) = 1 - (300 / 500) = 1 - 0.60 = 0.40 or 40%.',
        topic: 'Carnot Engine Efficiency',
      },
      {
        id: 5,
        question: 'Why can a domestic refrigerator NOT cool a room if left running with its door open?',
        options: [
          'It consumes too much electricity.',
          'The heat released by the condenser coils into the room exceeds the heat absorbed from inside the fridge.',
          'The compressor stops running when door is open.',
          'Air circulation freezes the room thermostat.',
        ],
        correctIndex: 1,
        explanation: 'A refrigerator is a heat pump. It absorbs heat Q2 from inside and dumps Q1 = Q2 + W into the room. Net heat added to the room = W (electrical work), so the room warms up!',
        topic: 'Second Law of Thermodynamics',
      },
    ],
    quickRevisionPoints: [
      'First Law: dQ = dU + dW (Conservation of energy).',
      'Ideal gas internal energy: U = (f/2) n R T.',
      'Work in Isothermal: W = 2.303 n R T log10(V2 / V1).',
      'Work in Adiabatic: W = (P1 V1 - P2 V2) / (γ - 1) = n R (T1 - T2) / (γ - 1).',
      'Carnot Efficiency: η = 1 - (Tc / Th). Maximum possible efficiency between two reservoirs.',
      'Cyclic process: Net ΔU = 0 over one full cycle. Work done = Enclosed area on P-V diagram.',
    ],
  },
  {
    id: 'kit-organic',
    title: 'Organic Chemistry: SN1 vs SN2 Nucleophilic Substitution',
    subject: 'Chemistry',
    academicClass: 'Class 12',
    chapter: 'Haloalkanes and Haloarenes',
    duration: '35 mins lecture',
    videoUrl: 'https://youtube.com/watch?v=sample-organic',
    dateCreated: 'Yesterday at 5:40 PM',
    noteStyle: 'minimal',
    language: 'English',
    content: {
      minimal: {
        headline: 'SN1 vs SN2 Quick Comparison Matrix',
        cheatSheet: [
          'SN1: 2-step mechanism, Carbocation intermediate, Racemization, Favoured by 3° > 2° > 1°, Polar protic solvent.',
          'SN2: 1-step concerted, Pentavalent transition state, Walden inversion, Favoured by 1° > 2° > 3°, Polar aprotic solvent.',
          'Rate law: SN1 rate = k[Substrate], SN2 rate = k[Substrate][Nu:-].',
          'Allylic and benzylic halides undergo BOTH SN1 (resonance stabilized carbocation) and SN2 at high rates.',
        ],
        formulas: [
          { name: 'SN1 Rate Law', formula: 'Rate = k [R-X]', note: 'Unimolecular, zero order with respect to nucleophile concentration.' },
          { name: 'SN2 Rate Law', formula: 'Rate = k [R-X] [Nu:-]', note: 'Bimolecular, second order overall.' },
        ],
        bulletSummary: [
          'Stereochemistry: SN1 gives partial racemization (retention + inversion); SN2 gives 100% Walden inversion.',
          'Leaving group ability: I⁻ > Br⁻ > Cl⁻ > F⁻ (better leaving group speeds up both SN1 and SN2).',
          'Solvents: Water/Ethanol (protic) stabilizes carbocations (SN1); Acetone/DMF/DMSO (aprotic) leaves nucleophiles naked (SN2).',
        ],
      },
      topper: {
        introduction: 'Nucleophilic substitution at sp3 hybridized carbon atoms is one of the most heavily tested reaction classes in organic chemistry. Understanding the orbital interactions during backside attack and carbocation rearrangements guarantees full marks.',
        deepDive: [
          {
            title: 'Transition State vs Intermediate',
            timestamp: '04:10',
            content: 'In SN2, nucleophile attacks the σ* C-X antibonding orbital simultaneously as the leaving group departs. There is NO carbocation intermediate, only an activated complex with partial bonds.',
            keyTakeaway: 'Bulky alkyl groups create steric hindrance that physically blocks backside approach, making 3° halides completely inert to SN2.',
          },
        ],
        derivations: [],
        proTips: ['Watch out for hydride or methyl shifts in SN1 if a secondary carbocation can rearrange to tertiary.'],
      },
      chatpate: {
        hinglishIntro: 'SN1 aur SN2 ki ladai ekdum Bollywood movie jaisi hai. Ek mein pehle breakup hota hai phir naya dost banta hai, doosre mein peeche se aakar replace kar diya jaata hai!',
        desiAnalogies: [
          {
            concept: 'SN1 vs SN2 Mechanism',
            analogy: 'SN1: Pehle purana boyfriend chhod ke gaya (Carbocation banna), fir ladki single ho gayi, ab aage se ya peeche se naya friend aa sakta hai (Racemization).\nSN2: Front gate pe purana dost khada hai, naya dost back gate se aaya aur ek hi second mein purane wale ko dhakka maar ke bahar nikal diya (Walden Inversion)!',
            desiPunchline: 'SN1 = Breakup then Patchup. SN2 = Direct Replacement from behind!',
          },
        ],
        bhaiKaSummary: ['1° carbon hai toh direct SN2 lagao.', '3° carbon hai toh carbocation bana ke SN1 lagao.'],
        jugaadPoints: ['Solvent trick: DMSO ya Acetone dikhe toh SN2, H2O ya Alcohol dikhe toh SN1.'],
      },
      exam: {
        trendAnalysis: 'Mandatory 3-mark question in Section C of Board Exam.',
        highWeightageTopics: ['Comparison table of SN1 vs SN2', 'Carbocation stability and rearrangement', 'Optical activity changes'],
        questions: [],
      },
    },
    timestamps: [
      { time: '02:00', seconds: 120, title: 'Introduction to Nucleophilic Attack', summary: 'Kinetics, substrate structure, and orbital overlap fundamentals.' },
      { time: '11:15', seconds: 675, title: 'SN2 Mechanism & Walden Inversion', summary: 'Backside attack and proof with chiral secondary halides.' },
    ],
    flashcards: [
      { id: 1, front: 'What is Walden Inversion?', back: 'The complete stereochemical inversion of configuration at an asymmetric carbon during an SN2 reaction.', concept: 'Stereochemistry' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Which alkyl halide is most reactive towards SN2 substitution?',
        options: ['(CH3)3C-Br (tert-butyl bromide)', '(CH3)2CH-Br (isopropyl bromide)', 'CH3CH2-Br (ethyl bromide)', 'CH3-Br (methyl bromide)'],
        correctIndex: 3,
        explanation: 'SN2 reaction rate is dominated by steric hindrance. Methyl bromide offers the least steric hindrance for backside attack by the incoming nucleophile.',
        topic: 'Steric Hindrance in SN2',
      },
    ],
    quickRevisionPoints: [
      'SN1: 3° > 2° > 1° (Carbocation stability order).',
      'SN2: Methyl > 1° > 2° > 3° (Steric hindrance order).',
      'Protic solvent favors SN1; Aprotic solvent favors SN2.',
    ],
  },
  {
    id: 'kit-neural-networks',
    title: 'Computer Science: Neural Networks & Backpropagation from Scratch',
    subject: 'Computer Science',
    academicClass: 'College / B.Tech',
    chapter: 'Deep Learning & Artificial Intelligence',
    duration: '58 mins lecture',
    videoUrl: 'https://youtube.com/watch?v=sample-nn',
    dateCreated: '3 days ago',
    noteStyle: 'chatpate',
    language: 'English',
    content: {
      minimal: {
        headline: 'Neural Network Architecture & Gradient Descent',
        cheatSheet: [
          'Forward pass: Z^[l] = W^[l] A^[l-1] + b^[l], A^[l] = g^[l](Z^[l]).',
          'Loss functions: Cross-entropy for classification, MSE for regression.',
          'Chain Rule: dL/dw = (dL/da) * (da/dz) * (dz/dw).',
          'Activations: ReLU = max(0, z), Sigmoid = 1/(1 + e^-z), Softmax = e^z / Σe^z.',
        ],
        formulas: [
          { name: 'Weight Update Rule', formula: 'W = W - α * (∂L/∂W)', note: 'α is the learning rate.' },
        ],
        bulletSummary: ['Forward pass computes predictions; backward pass distributes error gradients via chain rule.'],
      },
      topper: {
        introduction: 'Backpropagation is the mathematical engine of modern deep learning, allowing parameterized neural networks to adjust millions of weights efficiently using the multivariable chain rule of calculus.',
        deepDive: [
          {
            title: 'Multivariable Chain Rule in Matrix Form',
            timestamp: '18:30',
            content: 'Rather than computing individual scalar partial derivatives, we compute Jacobians and gradient tensors. For a layer l, dW^[l] = (1/m) dZ^[l] (A^[l-1])^T, where dZ^[l] = dA^[l] * g\'^[l](Z^[l]).',
            keyTakeaway: 'Maintaining matching matrix dimensions during transpose multiplication is the #1 debugger for manual neural network implementations.',
          },
        ],
        derivations: [],
        proTips: ['Always initialize weights with He or Xavier initialization to prevent vanishing/exploding gradients.'],
      },
      chatpate: {
        hinglishIntro: 'AI aur Machine Learning koi magic nahi hai boss! Yeh bas 11th-12th class ki differentiation aur graph plotting hai jisme computer hazaron baar try-and-error karta hai.',
        desiAnalogies: [
          {
            concept: 'Gradient Descent & Learning Rate',
            analogy: 'Imagine karo tum andheri raat mein pahad se neeche aana chahte ho bina torch ke. Har step pe pair rakh ke check karte ho ki dhalaan kidhar hai. Agar chhota step loge (low learning rate), subah ho jayegi. Agar bahut bada jump laga doge (high learning rate), sidha khaayi mein gir jaoge!',
            desiPunchline: 'Step size (learning rate) hamesha perfect balance hona chahiye!',
          },
        ],
        bhaiKaSummary: ['Forward pass = Homework submit kiya.', 'Loss calculation = Teacher ne red pen se galtiyan batai.', 'Backpropagation = Agli baar ke liye marks sudharne ki strategy.'],
        jugaadPoints: ['Hidden layers mein hamesha ReLU use karo, Sigmoid use kiya toh model so jayega (vanishing gradient).'],
      },
      exam: {
        trendAnalysis: 'Standard 10-mark University exam question with matrix numerical.',
        highWeightageTopics: ['Derivation of Backpropagation for 2-layer MLP', 'Vanishing Gradient Problem & Remedies'],
        questions: [],
      },
    },
    timestamps: [
      { time: '04:00', seconds: 240, title: 'Perceptrons & Linear Separability', summary: 'Why single layer perceptrons fail XOR without non-linear activation.' },
      { time: '22:15', seconds: 1335, title: 'The Chain Rule and Error Propagation', summary: 'Tracing the gradient backwards layer by layer.' },
    ],
    flashcards: [
      { id: 1, front: 'What causes the Vanishing Gradient problem?', back: 'When using activations like Sigmoid where the derivative maxes out at 0.25, repeated multiplication through deep layers pushes gradients exponentially towards zero.', concept: 'Activations' },
    ],
    quiz: [
      {
        id: 1,
        question: 'Which activation function is most resistant to the vanishing gradient problem in deep hidden layers?',
        options: ['Sigmoid', 'Tanh', 'Rectified Linear Unit (ReLU)', 'Step function'],
        correctIndex: 2,
        explanation: 'For positive inputs (z > 0), the gradient of ReLU is always 1, preventing the gradient from decaying exponentially across many hidden layers.',
        topic: 'Activation Functions',
      },
    ],
    quickRevisionPoints: [
      'Weights update: W := W - α ∇W.',
      'Softmax normalizes logits into valid probability distributions summing to 1.',
      'Batch size controls gradient variance and computational parallelism.',
    ],
  },
];

SAMPLE_STUDY_KITS.forEach((k) => {
  if (k.content.minimal && !k.content.quick) k.content.quick = k.content.minimal;
  if (k.content.quick && !k.content.minimal) k.content.minimal = k.content.quick;
  if (k.content.chatpate && !k.content.chatpata) k.content.chatpata = k.content.chatpate;
  if (k.content.chatpata && !k.content.chatpate) k.content.chatpate = k.content.chatpata;
});
