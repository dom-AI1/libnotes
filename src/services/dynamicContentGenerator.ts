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

  // -1. COMMERCE / ACCOUNTANCY — CASH FLOW STATEMENTS (AS-3)
  const isCashFlow = cLower.includes('cash flow') || cLower.includes('cash_flow');
  if (isCashFlow) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Cash Flow Statement (AS-3 Revised / Ind AS 7) Key Revision`,
          cheatSheet: [
            'AS-3 Tripartite Framework: 1) Operating Activities (principal revenue-earning), 2) Investing Activities (fixed assets and investments), 3) Financing Activities (capital, debentures, loans, dividends paid).',
            'Indirect Method for Operating Activities (CFO): Net Profit Before Tax + Non-Cash/Non-Operating Expenses (Depreciation, Amortization) - Non-Operating Incomes (Dividend/Interest received) ± Working Capital adjustments - Direct Taxes Paid.',
            'Working Capital Rules: Increase in Current Asset = Cash Outflow (-); Decrease in Current Asset = Cash Inflow (+). Increase in Current Liability = Cash Inflow (+); Decrease in Current Liability = Cash Outflow (-).',
            'Financing Rules: Dividend paid is ALWAYS a Financing Cash Outflow. Bank Overdraft / Cash Credit are Financing short-term borrowings, NOT cash equivalents.',
            'Cash & Cash Equivalents: Cash in hand, bank balance, and short-term liquid investments with maturity ≤ 3 months (treasury bills, commercial papers).',
          ],
          formulas: [
            { name: 'Net Cash Flow Identity', formula: 'Net Change in Cash = CFO + CFI + CFF', note: 'Closing Cash = Opening Cash + Net Change' },
            { name: 'Operating Cash Flow (Indirect)', formula: 'CFO = Operating Profit before Working Capital Changes ± ΔWC - Tax Paid', note: 'Operating Profit = Net Profit Before Tax + Depreciation - Non-Operating Income' },
            { name: 'Working Capital Adjustment', formula: 'ΔWC = ΔCurrent Liabilities - ΔCurrent Assets', note: 'CA increase (-), CA decrease (+), CL increase (+), CL decrease (-)' },
          ],
          bulletSummary: [
            'Non-Cash Exclusion: Non-cash transactions (bonus share issue, conversion of debentures) are excluded and disclosed in footnotes.',
            'Taxation: Income tax paid is deducted in Operating Activities unless specifically identifiable with investing or financing.',
          ],
        },
        minimal: {
          headline: `${chapter} Summary`,
          cheatSheet: [
            'Three activities: Operating (CFO), Investing (CFI), Financing (CFF).',
            'Net change = CFO + CFI + CFF.',
            'Closing cash = Opening cash + Net change.',
          ],
          formulas: [
            { name: 'Net Cash Flow Identity', formula: 'Net Change = CFO + CFI + CFF', note: 'Reconciles with opening and closing cash' },
          ],
          bulletSummary: ['AS-3 tripartite classification and indirect method.'],
        },
        topper: {
          introduction: `Comprehensive professional accounting lecture synthesis for ${subject}: ${chapter}. Structured strictly in alignment with ICAI Accounting Standard 3 (AS-3 Revised) and Ind AS 7.`,
          deepDive: [
            {
              title: '1. Meaning, Objectives & AS-3 Tripartite Classification',
              timestamp: '00:00',
              content: 'A Cash Flow Statement evaluates an enterprise\'s historical ability to generate cash and cash equivalents. AS-3 classifies all cash flows into three activities: Operating (the primary revenue-generating activities), Investing (acquisition and disposal of long-term assets and investments), and Financing (activities changing the size and composition of owner\'s equity and borrowings). Cash equivalents comprise short-term, highly liquid investments convertible into known amounts of cash with insignificant risk of value change (maturity ≤ 3 months).',
              keyTakeaway: 'Bank overdrafts and cash credits are financing activities (short-term borrowings), not cash equivalents.',
            },
            {
              title: '2. Indirect Method for Cash Flow from Operating Activities (CFO)',
              timestamp: '07:30',
              content: 'The indirect method reconciles Net Profit Before Tax and Extraordinary Items into operating cash flows. Non-cash expenses (depreciation, amortization) and loss on sale of fixed assets are added back. Non-operating incomes (dividend received, gain on sale of investments) are deducted. Next, working capital adjustments are applied: an increase in current assets consumes cash (-), while an increase in current liabilities provides cash (+). Finally, actual income taxes paid are deducted to determine Net Cash from Operating Activities.',
              keyTakeaway: 'Always prepare ledger accounts for Provision for Tax and Fixed Assets to compute actual tax paid and asset purchase/sale.',
            },
            {
              title: '3. Investing & Financing Activities with Non-Cash Exclusion',
              timestamp: '16:00',
              content: 'Investing activities include capital expenditures (purchase/sale of plant, land, patents, and purchase/sale of shares in other companies). Financing activities include proceeds from issuing shares or debentures, loan repayments, and dividends paid. Transactions that do not involve cash flows (e.g. issuing shares to vendors against purchase of machinery) are strictly omitted from the statement and disclosed in schedule notes.',
              keyTakeaway: 'Dividend paid is always a financing cash outflow, whether interim or final dividend.',
            },
          ],
          derivations: [
            {
              title: 'Derivation of Net Cash Flow from Operating Activities (CFO)',
              steps: [
                'Start with Net Profit as per Statement of Profit and Loss',
                'Add back Provision for Taxation, Proposed Dividend, and Transfer to General Reserve to calculate Net Profit Before Tax',
                'Adjust for non-cash and non-operating items: Add Depreciation, Loss on Sale of Assets; Deduct Interest/Dividend Received',
                'Adjust for Working Capital changes: Add decrease in CA and increase in CL; Deduct increase in CA and decrease in CL',
                'Deduct Income Tax Paid (net of refunds) to arrive at Net Cash from Operating Activities',
              ],
              finalResult: 'Net Cash Flow from Operating Activities (CFO) determined as per AS-3 Indirect Method',
            },
          ],
          proTips: [
            'Prepare a T-account for Fixed Assets (at cost) alongside Accumulated Depreciation to find hidden purchases or sales.',
            'Remember: Proposed dividend of the previous year is paid during the current year (Financing Outflow) and added back to compute Net Profit Before Tax.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, Cash Flow Statement (AS-3) ko bilkul mast Hinglish mein samajhte hain! Profit hona alag baat hai aur jeb mein cash hona bilkul alag baat! Yeh chapter sikhata hai ki company ka paisa kahan se aaya aur kahan gaya.`,
          desiAnalogies: [
            {
              concept: '3 Activities of Cash Flow',
              analogy: 'Imagine karo apna monthly kharcha: Dukan chala ke jo rozana kamai hoti hai wo hai Operating; Dukan ke liye naya fridge ya scooter khareeda wo hai Investing; aur Papa ya bank se loan liya ya EMI bhari wo hai Financing!',
              desiPunchline: 'Dukan roz chalti hai Operating se, par balance sheet khadi hoti hai teeno ke jod se!',
            },
            {
              concept: 'Working Capital Rule',
              analogy: 'Current Assets badha matlab naya stock khareed liya ya udhari badh gayi (paisa block ho gaya -). Current Liabilities badhi matlab suppliers se udhari mil gayi (apna paisa bach gaya +)!',
              desiPunchline: 'Udhari mili toh cash bacha, stock bhara toh cash kharcha!',
            },
          ],
          bhaiKaSummary: [
            'Point 1: Teen boxes yaad rakho — Operating (CFO), Investing (CFI), Financing (CFF).',
            'Point 2: Net change mein Opening Cash jod do, exact Closing Cash balance sheet se match hona chahiye!',
          ],
          jugaadPoints: [
            'Exam jugaad: Tax paid ko Operating ke aakhri step mein minus karna mat bhoolna, warna seedhe 1 mark cut!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, Cash Flow Statement (AS-3) ko bilkul simple bhasha mein samjho!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Cash Flow Statement carries a mandatory 6 to 8 marks weightage in CBSE Class 12 Accountancy Board examinations. High-frequency questions test operating cash flow calculation with tax and depreciation adjustments.',
          highWeightageTopics: [
            'Cash Flow from Operating Activities via Indirect Method (4-6 Marks)',
            'Classification of Activities under AS-3 (1-3 Marks)',
            'Treatment of Tax Provision, Proposed Dividend & Non-Cash Items (3-5 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Define Cash Equivalents as per AS-3 (Revised).',
              answer: 'Cash equivalents are short-term, highly liquid investments that are readily convertible into known amounts of cash and which are subject to an insignificant risk of changes in value, typically having a maturity period of 3 months or less from acquisition.',
              markingScheme: ['Short-term highly liquid definition (½ mark)', 'Maturity <= 3 months condition (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Classify the following transactions into Operating, Investing, and Financing activities for a non-financial enterprise:\n(a) Proceeds from issue of 9% Debentures.\n(b) Purchase of Patents.\n(c) Dividend paid on Equity Shares.',
              answer: '(a) Proceeds from issue of 9% Debentures: Financing Activity (Inflow of capital).\n(b) Purchase of Patents: Investing Activity (Outflow for long-term intangible asset).\n(c) Dividend paid on Equity Shares: Financing Activity (Outflow of cost of capital).',
              markingScheme: ['1 mark each for correct classification and activity heading (3 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'From the following information, calculate Cash Flow from Operating Activities:\nNet Profit after tax: ₹1,50,000\nProvision for tax made during the year: ₹40,000\nDepreciation on machinery: ₹25,000\nGain on sale of investments: ₹10,000\nIncrease in Trade Receivables: ₹15,000\nDecrease in Inventories: ₹20,000\nIncrease in Trade Payables: ₹12,000\nIncome tax actually paid during the year: ₹35,000.',
              answer: '1. Net Profit before Tax = ₹1,50,000 + ₹40,000 (tax provision) = ₹1,90,000.\n2. Non-Cash & Non-Operating Adjustments:\n   Add: Depreciation on machinery = +₹25,000\n   Less: Gain on sale of investments = -₹10,000\n   Operating Profit before Working Capital Changes = ₹2,05,000.\n3. Working Capital Adjustments:\n   Add: Decrease in Inventories = +₹20,000\n   Add: Increase in Trade Payables = +₹12,000\n   Less: Increase in Trade Receivables = -₹15,000\n   Cash generated from Operations = ₹2,05,000 + ₹17,000 = ₹2,22,000.\n4. Less: Income Tax Paid = -₹35,000.\nNet Cash Flow from Operating Activities (CFO) = ₹1,87,000.',
              markingScheme: ['Net profit before tax calculation (1 mark)', 'Operating profit before working capital (1.5 marks)', 'Working capital adjustments (1.5 marks)', 'Final CFO after tax paid with ₹ unit (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Meaning & Tripartite Classification', summary: 'AS-3 structure: Operating, Investing, and Financing activities defined.' },
        { time: '07:30', seconds: 450, title: 'Operating Activities (Indirect Method)', summary: 'From Net Profit before tax to CFO, non-cash charges, and working capital.' },
        { time: '16:00', seconds: 960, title: 'Investing, Financing & Non-Cash Exclusions', summary: 'Capital expenditure, debentures, dividends, and footnote disclosures.' },
      ],
      flashcards: [
        { id: 1, front: 'What is the classification of dividend paid under AS-3?', back: 'Dividend paid is always classified as a Financing Activity cash outflow.', concept: 'AS-3 Classification' },
        { id: 2, front: 'How are non-cash transactions treated in a Cash Flow Statement?', back: 'They are strictly excluded from the statement and disclosed in schedule notes (e.g. bonus shares).', concept: 'Non-Cash Items' },
        { id: 3, front: 'What is the effect of an increase in Debtors on Operating Cash Flow?', back: 'An increase in Debtors represents a cash outflow (deducted from operating profit).', concept: 'Working Capital' },
      ],
      quiz: [
        {
          id: 1,
          topic: 'Cash Flow Statements',
          question: 'Which of the following is classified as a Cash Equivalent under AS-3?',
          options: ['Treasury bill with 60 days maturity', 'Shares in a listed company', 'Bank overdraft', 'Machinery purchased for sale'],
          correctIndex: 0,
          explanation: 'Treasury bills with maturity ≤ 3 months are highly liquid with negligible risk of value change, qualifying as Cash Equivalents.',
        },
        {
          id: 2,
          topic: 'Cash Flow Statements',
          question: 'In the indirect method, depreciation on fixed assets is:',
          options: ['Added back to Net Profit Before Tax', 'Deducted from Net Profit Before Tax', 'Shown under Investing Activities', 'Ignored completely'],
          correctIndex: 0,
          explanation: 'Depreciation is a non-cash expense that was previously deducted in the P&L; it must be added back to compute operating cash flow.',
        },
      ],
      quickRevisionPoints: [
        'AS-3 tripartite structure: Operating, Investing, and Financing activities.',
        'Net Cash Flow Identity: Net Change in Cash = CFO + CFI + CFF.',
        'Current Assets increase = Cash Outflow (-); Current Assets decrease = Cash Inflow (+).',
        'Current Liabilities increase = Cash Inflow (+); Current Liabilities decrease = Cash Outflow (-).',
        'Dividend paid is always Financing; Dividend received is Investing for non-financial companies.',
      ],
    };
  }

  // 0. COMMERCE / ACCOUNTANCY & JOURNAL ENTRIES
  const isAccountancy = 
    sLower.includes('account') || 
    cLower.includes('journal') || 
    cLower.includes('ledger') || 
    cLower.includes('debit') || 
    cLower.includes('credit') || 
    cLower.includes('trial balance') || 
    cLower.includes('balance sheet') || 
    cLower.includes('depreciation') || 
    cLower.includes('partnership') || 
    cLower.includes('cash book') || 
    cLower.includes('bookkeeping');

  if (isAccountancy) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Rules of Debit & Credit, 4-Step Journalizing & Accountancy Notes`,
          cheatSheet: [
            'The 4-Step Framework for ANY Journal Entry: 1) Identify 2+ accounts affected. 2) Classify accounts (Personal, Real, Nominal or Modern: Asset, Liability, Capital, Expense, Revenue). 3) Determine Increase or Decrease. 4) Apply Debit/Credit rule and write narration ("Being...").',
            'Golden Rules (Traditional): Personal Accounts → Debit the Receiver, Credit the Giver; Real Accounts → Debit what comes in, Credit what goes out; Nominal Accounts → Debit all expenses and losses, Credit all incomes and gains.',
            'Modern Classification (DEAD CLIC): Debit increases Expenses and Assets (DEAD); Credit increases Liabilities, Income, and Capital (CLIC).',
            'Trade Discount vs Cash Discount: Trade discount is deducted directly from list price and is NEVER recorded in ledger books. Cash discount is recorded in Discount Allowed (Dr) or Discount Received (Cr) account.',
            'Compound Journal Entry Rule: Total Debit amount must exactly equal Total Credit amount for every single transaction.',
          ],
          formulas: [
            { name: 'Accounting Equation', formula: 'Assets = Liabilities + Capital (Owner\'s Equity)', note: 'Fundamental balance sheet identity; holds true after every entry' },
            { name: 'Net Invoice Value', formula: 'Net Amount = List Price - Trade Discount', note: 'Cash discount applies only on prompt cash/cheque payment' },
            { name: 'Closing Capital Equation', formula: 'Closing Capital = Opening Capital + Additional Capital + Net Profit - Drawings', note: 'Balance sheet reconciliation formula' },
          ],
          bulletSummary: [
            'Narration Rule: Always write a brief explanation starting with "Being..." below each entry.',
            'Discount Rule: Calculate trade discount first on list price; then calculate cash discount on the cash receivable.',
            'Entity Principle: Always analyze transactions from the perspective of the business enterprise, not the owner.',
          ],
        },
        minimal: {
          headline: `${chapter} Quick Accountancy Summary`,
          cheatSheet: [
            '4-Step Framework: Identify accounts, classify type, determine increase/decrease, apply debit/credit rules.',
            'Personal: Debit receiver, Credit giver. Real: Debit in, Credit out. Nominal: Debit expenses, Credit incomes.',
            'Trade discount is never recorded in ledger accounts; cash discount is explicitly journalized.',
            'Assets = Liabilities + Capital must balance after every journal entry.',
          ],
          formulas: [
            { name: 'Accounting Equation', formula: 'Assets = Liabilities + Capital', note: 'Fundamental identity' },
          ],
          bulletSummary: [
            'Always add narrations ("Being...") for full marks.',
            'Debit what comes in, Credit what goes out.',
          ],
        },
        topper: {
          introduction: `Comprehensive analytical lecture synthesis for ${subject}: ${chapter}. Structured in alignment with CBSE, state boards, university curriculum, and professional accounting standards.`,
          deepDive: [
            {
              title: 'The 4-Step Framework for Solving ANY Journal Entry',
              timestamp: '02:15',
              content: 'To journalize any transaction without mistakes, follow the 4-step framework: Step 1: Read the transaction carefully and identify which two or more accounts are affected (e.g., Cash A/c and Sales A/c). Step 2: Classify each account under Traditional (Personal, Real, Nominal) or Modern rules (Asset, Liability, Capital, Expense, Revenue). Step 3: Determine whether the account balance is increasing or decreasing from the business\'s perspective. Step 4: Apply the Debit and Credit rules, write the journal entry with Date, Particulars, L.F., Debit (₹), and Credit (₹), and conclude with a concise narration starting with "Being...".',
              keyTakeaway: 'Always analyze transactions strictly from the viewpoint of the business enterprise, not the owner (Business Entity Concept).',
            },
            {
              title: 'Traditional Golden Rules vs Modern Classification of Accounts',
              timestamp: '07:30',
              content: 'Traditional rules classify accounts into Personal (Natural, Artificial, Representative), Real (Tangible & Intangible assets), and Nominal (Expenses, Losses, Incomes, Gains). Modern classification uses DEAD CLIC: Debit increases Expenses and Assets (DEAD), while Credit increases Liabilities, Income, and Capital (CLIC). Both methods produce identical debit and credit entries. For example, when rent is paid in cash, Rent A/c is an expense (Dr) and Cash A/c is an asset decreasing (Cr).',
              keyTakeaway: 'Personal: Debit Receiver, Credit Giver. Real: Debit In, Credit Out. Nominal: Debit Expenses/Losses, Credit Incomes/Gains.',
            },
            {
              title: 'Compound Entries, Discounts, Bad Debts, and Drawings',
              timestamp: '13:00',
              content: 'Trade discount is granted by sellers for bulk orders and is deducted directly from list price without opening a separate account. Cash discount is allowed for prompt payment and must be recorded in "Discount Allowed A/c" (nominal loss/debit) or "Discount Received A/c" (nominal gain/credit). Goods taken by the proprietor for domestic use are debited to "Drawings A/c" and credited to "Purchases A/c" at cost price. When bad debts are recovered, Cash A/c is debited and Bad Debts Recovered A/c is credited.',
              keyTakeaway: 'Never record trade discount in journal entries; only record cash discount on actual cash paid or received.',
            },
          ],
          derivations: [
            {
              title: '4-Step Solution for Compound Discount Transaction',
              steps: [
                'Transaction: Purchased goods from Mohan of list price ₹50,000 at 20% trade discount and 4% cash discount. Paid 75% immediately by cheque.',
                'Step 1: Calculate List Price = ₹50,000. Less 20% Trade Discount (₹10,000) = Net Purchase Price ₹40,000.',
                'Step 2: Determine Cash vs Credit portions: Cheque portion (75% of ₹40,000) = ₹30,000. Credit portion (25% of ₹40,000) = ₹10,000.',
                'Step 3: Calculate Cash Discount on cash portion: 4% of ₹30,000 = ₹1,200. Net Cheque Paid = ₹30,000 - ₹1,200 = ₹28,800.',
                'Step 4: Journal Entry: Purchases A/c Dr. ₹40,000; To Bank A/c ₹28,800; To Discount Received A/c ₹1,200; To Mohan ₹10,000. (Being goods purchased with trade and cash discounts).',
              ],
              finalResult: 'Purchases A/c Dr. ₹40,000 | To Bank A/c ₹28,800, To Discount Received A/c ₹1,200, To Mohan ₹10,000',
            },
          ],
          proTips: [
            'CBSE step-marking strictly awards marks for Date, Particulars, L.F., Debit (₹), Credit (₹), and Narration. Omitting narration deducts 0.5 marks per entry.',
            'Never write "To" before debit accounts; indent credit accounts by one tab space and prefix with "To".',
            'Goods given as charity, free samples, or destroyed by fire must always be credited to Purchases A/c at cost price.',
            'Trade discount is calculated before GST; cash discount is calculated on the net cash receivable.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, ${chapter} bilkul simple bhasha mein samjho! Journal entry koi rocket science nahi hai — bas ye 4 steps follow karo aur har transaction me debit aur credit pe full marks pao!`,
          desiAnalogies: [
            {
              concept: 'The 4-Step Journal Entry Mantra',
              analogy: 'Sabse pehle dekho transaction me kiska lena-dena hua (Cash, Goods, Rohit, ya Bank). Phir dekho business ke andar kya aaya aur kya gaya. Jo aaya use Debit maar, jo gaya use Credit kar!',
              desiPunchline: 'Jo aave use Debit maar, jo jaave use Credit! Simple funda, full marks!',
            },
            {
              concept: 'Trade Discount vs Cash Discount',
              analogy: 'Trade discount sabzi mandi ki bargaining hai (sabko milti hai, parchi pe alag se nahi likhte). Cash discount turant cash dene ka inam hai (isko Discount Allowed/Received account me dhoom-dhaam se likhte hain)!',
              desiPunchline: 'Trade discount chupchap ghatao, Cash discount dhoom-dhaam se ledger me dikhao!',
            },
            {
              concept: 'Drawings vs Capital',
              analogy: 'Malik ne business me paisa lagaya to Capital (Credit). Malik ne ghar ke kharche ke liye business ki tijori se paisa ya dukan se samaan nikaal liya to Drawings (Debit)! Business aur Malik alag-alag hain!',
              desiPunchline: 'Dukan ki tijori se ghar ka kharcha = Drawings Debit, Purchases/Cash Credit!',
            },
          ],
          bhaiKaSummary: [
            'Step 1: Accounts pehchano (Cash, Bank, Mohan, Purchases).',
            'Step 2: Debit/Credit rule lagao: Debit what comes in, Credit what goes out.',
            'Step 3: Trade discount bill me ghatao par entry mat banao; Cash discount ka entry banao.',
            'Step 4: Niche "Being..." likhna mat bhoolna, warna examiner aadha number kaat lega!',
          ],
          jugaadPoints: [
            'Agar transaction me kisi ka naam likha hai aur "Cash" nahi likha, to wo pakka udhaar (Credit) transaction hai!',
            'Purchases hamesha Debit hota hai (except free sample, charity, drawings ya fire, jisme Purchases Credit hota hai)!',
          ],
        },
        exam: {
          trendAnalysis: 'Class 11 & 12 Accountancy exams allocate 12 to 16 marks to Journal Entries, Compound Entries, Discounts, and Bad Debts adjustments.',
          highWeightageTopics: [
            'Compound Journal Entries with Trade Discount and Cash Discount',
            'Banking Transactions & Dishonour of Cheques',
            'Bad Debts and Bad Debts Recovered Entries',
            'Goods Used for Personal Use, Charity, and Free Samples',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Why is Trade Discount not recorded in the books of accounts?',
              answer: 'Trade discount is an allowance granted by a seller to reduce the catalog price. It is not an expense or a realized financial gain, but a pricing mechanism. Therefore, sales and purchases are recorded strictly at the net invoice price (List Price - Trade Discount).',
              markingScheme: [
                'State that it is a pricing reduction on list price (½ mark)',
                'Explain that transactions are recorded at net invoice price without opening discount account (½ mark)',
              ],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Pass journal entries for the following transactions:\n(a) Received ₹1,200 from Suresh which were written off as bad debts last year.\n(b) Goods costing ₹5,000 given away as charity.\n(c) Proprietor withdrew goods costing ₹3,000 for personal use.',
              answer: '(a) Cash / Bank A/c Dr. ₹1,200\n      To Bad Debts Recovered A/c ₹1,200\n   (Being bad debts previously written off now recovered)\n\n(b) Charity A/c Dr. ₹5,000\n      To Purchases A/c ₹5,000\n   (Being goods given away as charity at cost)\n\n(c) Drawings A/c Dr. ₹3,000\n      To Purchases A/c ₹3,000\n   (Being goods withdrawn by proprietor for personal use)',
              markingScheme: [
                'Correct Bad debts recovery entry with narration (1 mark)',
                'Correct Charity entry crediting Purchases with narration (1 mark)',
                'Correct Drawings entry crediting Purchases with narration (1 mark)',
              ],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Pass compound journal entries in the books of Sharma & Co.:\n(a) Sold goods to Rohit of list price ₹40,000 at 10% trade discount and 5% cash discount. Rohit paid 60% immediately by cheque.\n(b) Paid ₹9,800 to Mohan in full settlement of his account of ₹10,000 by cheque.',
              answer: '(a) Calculation:\nList Price = ₹40,000\nLess: 10% Trade Discount = ₹4,000\nNet Invoice Price = ₹36,000\nCheque portion (60% of ₹36,000) = ₹21,600\nCash Discount allowed (5% of ₹21,600) = ₹1,080\nNet Cheque Received = ₹21,600 - ₹1,080 = ₹20,520\nCredit portion (40% of ₹36,000) = ₹14,400\n\nJournal Entry:\nBank A/c Dr. ₹20,520\nDiscount Allowed A/c Dr. ₹1,080\nRohit A/c Dr. ₹14,400\n      To Sales A/c ₹36,000\n(Being goods sold with trade and cash discount, 60% received by cheque)\n\n(b) Mohan Dr. ₹10,000\n      To Bank A/c ₹9,800\n      To Discount Received A/c ₹200\n(Being cheque paid to Mohan in full settlement of his account)',
              markingScheme: [
                'Working notes for trade discount and cash discount calculations (1 mark)',
                'Correct compound sales journal entry with correct debit/credit values (2.5 marks)',
                'Correct settlement journal entry with discount received (1.5 marks)',
              ],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '02:15', seconds: 135, title: 'The 4-Step Framework for Any Journal Entry', summary: 'Identify accounts, classify, check balance increase/decrease, apply debit/credit rules.' },
        { time: '07:30', seconds: 450, title: 'Golden Rules vs Modern Classification', summary: 'Personal, Real, Nominal rules compared with DEAD CLIC modern accounts.' },
        { time: '13:00', seconds: 780, title: 'Trade Discount vs Cash Discount Accounting', summary: 'Net invoice recording vs Discount Allowed and Discount Received entries.' },
        { time: '18:45', seconds: 1125, title: 'Compound Journal Entries & Banking Transactions', summary: 'Cheque deposits, partial settlements, and dual aspect balancing.' },
      ],
      flashcards: [
        { id: 1, front: 'What are the 4 steps to solve ANY Journal Entry?', back: '1) Identify accounts involved. 2) Classify account type. 3) Determine increase or decrease. 4) Apply Debit/Credit rule and write narration.', concept: '4-Step Framework' },
        { id: 2, front: 'What is the Golden Rule for Nominal Accounts?', back: 'Debit all expenses and losses; Credit all incomes and gains.', concept: 'Nominal Accounts' },
        { id: 3, front: 'How is Trade Discount treated in accounting records?', back: 'Deducted directly from list price; NEVER recorded in any ledger or journal account.', concept: 'Trade Discount' },
        { id: 4, front: 'What is the modern DEAD CLIC rule?', back: 'DEAD: Debit increases Expenses & Assets. CLIC: Credit increases Liabilities, Income, Capital.', concept: 'Modern Rules' },
      ],
      quiz: [
        {
          id: 1,
          question: 'In the 4-step framework for solving journal entries, what is the first step?',
          options: ['Identify which two or more accounts are involved in the transaction', 'Write the narration', 'Calculate cash discount', 'Post to the ledger'],
          correctIndex: 0,
          explanation: 'Step 1 is identifying the specific accounts (e.g. Cash, Sales, Mohan) affected by the business transaction.',
          topic: '4-Step Framework',
        },
        {
          id: 2,
          question: 'Goods costing ₹10,000 given as charity should be credited to which account?',
          options: ['Purchases Account', 'Charity Account', 'Sales Account', 'Cash Account'],
          correctIndex: 0,
          explanation: 'When goods are taken out of business without generating revenue (charity, drawings, free sample), Purchases A/c is credited at cost price.',
          topic: 'Special Journal Entries',
        },
        {
          id: 3,
          question: 'Which of the following is true regarding Trade Discount?',
          options: ['It is deducted from list price and never recorded separately in the ledger', 'It is debited to Discount Allowed A/c', 'It is credited to Discount Received A/c', 'It is only allowed on cheque payments'],
          correctIndex: 0,
          explanation: 'Trade discount is a price adjustment deducted on the invoice and is never recorded in any separate account.',
          topic: 'Discount Rules',
        },
      ],
      quickRevisionPoints: [
        '4-Step Framework: Identify accounts → Classify type → Determine increase/decrease → Apply debit/credit.',
        'Golden Rules: Personal (Dr Receiver, Cr Giver), Real (Dr In, Cr Out), Nominal (Dr Expenses, Cr Incomes).',
        'Trade discount is never journalized; Cash discount is recorded in Discount Allowed (Dr) or Discount Received (Cr).',
        'Goods given for personal use (Drawings) or charity must strictly be credited to Purchases A/c at cost price.',
      ],
    };
  }

  // 1. COMMERCE / ECONOMICS / BUSINESS
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
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'In an economy, MPC is 0.75. If investment expenditure increases by ₹600 Crores, calculate the total increase in National Income.',
              answer: 'Investment multiplier k = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4. Total increase in National Income ΔY = k × ΔI = 4 × ₹600 Crores = ₹2,400 Crores.',
              markingScheme: ['Multiplier formula and calculation k = 4 (1.5 marks)', 'Final income computation with ₹ Crores unit (1.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
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
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: `Analyze three key factors that contributed to the mass spread of the movement in ${chapter}.`,
              answer: `1. Economic distress among farmers and workers; 2. Unified leadership and vernacular communication; 3. Use of collective cultural symbols and civil boycotts that resonated across demographic lines.`,
              markingScheme: ['Three distinct points with sub-headings (1 mark each = 3 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
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
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: "Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9}, A = {2, 4, 6, 8} and B = {2, 3, 5, 7}. Verify De Morgan's Law: (A ∪ B)' = A' ∩ B'.",
              answer: "1. A ∪ B = {2, 3, 4, 5, 6, 7, 8}.\n2. LHS: (A ∪ B)' = U - (A ∪ B) = {1, 9}.\n3. A' = U - A = {1, 3, 5, 7, 9} and B' = U - B = {1, 4, 6, 8, 9}.\n4. RHS: A' ∩ B' = {1, 9}.\nSince LHS = RHS = {1, 9}, De Morgan's Law is verified.",
              markingScheme: ['Finding A ∪ B and LHS complement (1 mark)', "Finding individual complements A' and B' (1 mark)", 'Taking intersection and proving equality (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT Exemplar Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'In a survey of 400 students in a school, 100 were listed as taking apple juice, 150 as taking orange juice, and 75 were listed as taking both apple and orange juice. Find how many students were taking neither apple juice nor orange juice.',
              answer: 'Let U be the set of surveyed students: n(U) = 400.\nLet A = students taking apple juice: n(A) = 100.\nLet B = students taking orange juice: n(B) = 150.\nStudents taking both: n(A ∩ B) = 75.\nApplying cardinality formula:\nn(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 100 + 150 - 75 = 175.\nNumber of students taking neither apple nor orange juice = n((A ∪ B)\') = n(U) - n(A ∪ B) = 400 - 175 = 225.',
              markingScheme: ['Definition of sets and statement of n(U), n(A), n(B), n(A ∩ B) (1 mark)', 'Application of union formula n(A ∪ B) = 175 (2 marks)', 'Complement calculation n(neither) = 400 - 175 = 225 (2 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
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

  // 2.8 MATHEMATICS — QUADRATIC EQUATIONS
  const isQuadratic = 
    cLower.includes('quadratic') || 
    cLower.includes('discriminant') || 
    (cLower.includes('root') && (cLower.includes('equation') || sLower.includes('math')));

  if (isQuadratic) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Standard Form, Nature of Roots & Quadratic Formulas`,
          cheatSheet: [
            'Standard Form: ax² + bx + c = 0 where a, b, c ∈ ℝ and leading coefficient a ≠ 0.',
            'Quadratic Formula (Sridharacharya): x = (-b ± √D) / (2a) where D = b² - 4ac is the Discriminant.',
            'Nature of Roots: If D > 0, two distinct real roots; if D = 0, two equal real roots (-b/2a); if D < 0, two complex conjugate roots (no real roots).',
            'Relations between Roots & Coefficients: Sum of roots α + β = -b/a; Product of roots αβ = c/a.',
            'Reconstructing Quadratic Equation: x² - (Sum of Roots)x + (Product of Roots) = 0.',
          ],
          formulas: [
            { name: 'Standard Quadratic Form', formula: 'ax² + bx + c = 0 (a ≠ 0)', note: 'Parabolic curve y = ax² + bx + c with vertex at (-b/2a, -D/4a)' },
            { name: 'Discriminant Formula', formula: 'D = b² - 4ac', note: 'Determines root multiplicity and real vs non-real character' },
            { name: 'Sridharacharya Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / (2a)', note: 'Universal solution derived via completing the square' },
            { name: 'Sum and Product of Roots', formula: 'α + β = -b/a,  αβ = c/a', note: 'Fundamental Vieta relations for degree-2 polynomials' },
          ],
          bulletSummary: [
            'Condition a ≠ 0 is mandatory; otherwise the equation is linear, not quadratic.',
            'When D is a perfect square and coefficients are rational, roots are rational; otherwise irrational in conjugate pairs (p ± √q).',
            'For equal roots, set D = 0 to solve for unknown coefficients like k.',
          ],
        },
        minimal: {
          headline: `${chapter} Quick Formula Card`,
          cheatSheet: [
            'ax² + bx + c = 0 (a ≠ 0).',
            'D = b² - 4ac (D > 0: two distinct real roots; D = 0: equal real roots; D < 0: no real roots).',
            'x = (-b ± √D) / (2a).',
            'α + β = -b/a and αβ = c/a.',
          ],
          formulas: [
            { name: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / (2a)', note: 'Universal roots formula' },
            { name: 'Discriminant', formula: 'D = b² - 4ac', note: 'Determines nature of roots' },
          ],
          bulletSummary: [
            'Set D = 0 when problem mentions equal roots.',
            'Reconstruct equation via x² - (α + β)x + αβ = 0.',
          ],
        },
        topper: {
          introduction: `Comprehensive analytical lecture synthesis for ${subject}: ${chapter}. Structured in alignment with CBSE, state boards, university curriculum, and competitive examination standards.`,
          deepDive: [
            {
              title: 'Standard Form & Derivation of Sridharacharya Quadratic Formula',
              timestamp: '02:00',
              content: 'A quadratic equation in one variable x is of the form ax² + bx + c = 0 with a ≠ 0. To derive the quadratic formula via completing the square: divide throughout by a to obtain x² + (b/a)x + c/a = 0. Transpose constant term: x² + (b/a)x = -c/a. Add (b/2a)² = b²/(4a²) to both sides: x² + 2(b/2a)x + (b/2a)² = (b² - 4ac)/(4a²). The left side is a perfect square: (x + b/2a)² = (b² - 4ac)/(4a²). Taking the square root of both sides gives x + b/2a = ±√(b² - 4ac) / (2a). Subtracting b/2a yields the celebrated formula: x = (-b ± √(b² - 4ac)) / (2a).',
              keyTakeaway: 'The derivation relies strictly on completing the square by adding (b/2a)² to both sides.',
            },
            {
              title: 'Discriminant Analysis & Precise Classification of Roots',
              timestamp: '08:30',
              content: 'The quantity D = b² - 4ac governs the nature of the roots. Case 1: D > 0 yields two distinct real roots. When a, b, c are rational and D is a perfect square, roots are rational; if D is not a perfect square, roots are irrational and occur in conjugate pairs (p + √q and p - √q). Case 2: D = 0 yields two real and equal (coincident) roots, each equal to -b/(2a). In this case, ax² + bx + c is a perfect square trinomial. Case 3: D < 0 yields no real roots; roots are complex numbers with imaginary components occurring as complex conjugate pairs (p + i q and p - i q).',
              keyTakeaway: 'Exam questions asking for values of an unknown parameter k for which roots are equal require setting D = b² - 4ac = 0.',
            },
            {
              title: 'Relations Between Roots and Coefficients (Vieta\'s Formulas)',
              timestamp: '16:00',
              content: 'Let α = (-b + √D)/(2a) and β = (-b - √D)/(2a). Adding the two roots: α + β = (-b + √D - b - √D)/(2a) = -2b/(2a) = -b/a. Multiplying the two roots: αβ = [(-b)² - (√D)²] / (4a²) = (b² - (b² - 4ac)) / (4a²) = 4ac / (4a²) = c/a. Thus, sum of roots = -(coefficient of x)/(coefficient of x²) and product of roots = (constant term)/(coefficient of x²). Given roots α and β, the quadratic equation is x² - (α + β)x + αβ = 0.',
              keyTakeaway: 'Symmetric expressions of roots such as α² + β² = (α + β)² - 2αβ and 1/α + 1/β = (α + β)/αβ can be evaluated directly without solving for individual roots.',
            },
          ],
          derivations: [
            {
              title: 'Proof of the Quadratic Formula by Completing the Square',
              steps: [
                'Given standard quadratic equation: ax² + bx + c = 0 where a ≠ 0.',
                'Divide the entire equation by leading coefficient a: x² + (b/a)x + c/a = 0.',
                'Shift the constant term to the right-hand side: x² + (b/a)x = -c/a.',
                'Add the square of half the coefficient of x, which is (b / 2a)² = b² / (4a²), to both sides: x² + (b/a)x + b²/(4a²) = b²/(4a²) - c/a.',
                'Factor the left side into a binomial square: (x + b / (2a))² = (b² - 4ac) / (4a²).',
                'Take square root on both sides: x + b / (2a) = ± √(b² - 4ac) / (2a).',
                'Isolate x: x = -b / (2a) ± √(b² - 4ac) / (2a) = (-b ± √(b² - 4ac)) / (2a). (Q.E.D.)',
              ],
              finalResult: 'x = (-b ± √(b² - 4ac)) / (2a)',
            },
          ],
          proTips: [
            'Always check leading coefficient a ≠ 0 before applying quadratic formulas.',
            'For equal roots, set D = b² - 4ac = 0 to evaluate parameter k directly.',
          ],
        },
        chatpata: {
          hinglishIntro: 'Bhai suno, Quadratic equation (ax² + bx + c = 0) class 10/11 ka sabse scoring topic hai!',
          desiAnalogies: [
            {
              concept: 'Discriminant as Courtroom Judge',
              analogy: 'D = b² - 4ac ko samjho courtroom ka judge: agar D > 0 hai toh do alag alag real answers milenge, agar D = 0 hai toh dono roots judwa bhai jaise same to same (-b/2a) honge, aur agar D < 0 hai toh real world me koi answer nahi milega (imaginary roots)!',
              desiPunchline: 'D = 0 dekhte hi samajh jao roots identical hain boss!',
            },
            {
              concept: 'Leading Coefficient Rule (a ≠ 0)',
              analogy: 'Socho agar cricket team ka captain hi ground se bhaag jaye toh match cancel — waise hi agar a = 0 ho gaya toh quadratic equation linear ban jayegi!',
              desiPunchline: 'a ≠ 0 condition likhna board exam me mandatory hai!',
            },
          ],
          bhaiKaSummary: [
            'D = b² - 4ac (D > 0: two distinct real; D = 0: two equal real; D < 0: no real roots).',
            'Sum of roots α + β = -b/a aur Product αβ = c/a.',
            'Sridharacharya Formula: x = (-b ± √D) / (2a).',
          ],
          jugaadPoints: [
            'Speed and distance ke word problems me hamesha negative root ko reject karte waqt reason likho: "Speed cannot be negative" — CBSE me iska aadha mark hota hai!',
          ],
        },
        chatpate: {
          hinglishIntro: 'Bhai suno, Quadratic equation bilkul simple scoring topic hai!',
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Quadratic Equations accounts for 6 to 8 marks in CBSE Class 10/11 Board examinations. High-frequency questions test solving via quadratic formula, finding parameter k for equal roots, and word problems on speed/time.',
          highWeightageTopics: [
            'Solving via Sridharacharya Quadratic Formula (3 Marks)',
            'Condition for Equal Roots D = b² - 4ac = 0 (3-5 Marks)',
            'Speed, Distance and Geometry Word Problems (5 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Find the discriminant of the quadratic equation 2x² - 4x + 3 = 0 and hence state the nature of its roots.',
              answer: 'For 2x² - 4x + 3 = 0, a = 2, b = -4, c = 3. Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, the given equation has no real roots (roots are complex conjugate numbers).',
              markingScheme: ['Correct evaluation of D = -8 (½ mark)', 'Stating no real roots (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Find the values of k for which the quadratic equation (k - 12)x² + 2(k - 12)x + 2 = 0 has equal roots.',
              answer: 'Here a = (k - 12), b = 2(k - 12), c = 2. For equal roots, D = b² - 4ac = 0. Therefore: [2(k - 12)]² - 4(k - 12)(2) = 0 => 4(k - 12)² - 8(k - 12) = 0 => 4(k - 12)(k - 14) = 0. This gives k = 12 or k = 14. But if k = 12, then a = k - 12 = 0, which violates the quadratic condition a ≠ 0. Hence, k = 12 is rejected. The only valid value is k = 14.',
              markingScheme: ['Condition D = 0 statement (1 mark)', 'Factoring to k = 12, 14 (1 mark)', 'Rejecting k = 12 with a ≠ 0 reasoning (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'An express train takes 1 hour less than a passenger train to travel 132 km between Mysore and Bangalore. If the average speed of the express train is 11 km/h more than that of the passenger train, find the average speed of the two trains.',
              answer: 'Let average speed of passenger train be x km/h. Then speed of express train = (x + 11) km/h. Time by passenger train = 132 / x; time by express train = 132 / (x + 11). Given: 132/x - 132/(x + 11) = 1 => 132[11 / (x² + 11x)] = 1 => x² + 11x - 1452 = 0. Factoring: (x + 44)(x - 33) = 0 => x = 33 (since speed > 0). Speed of passenger train = 33 km/h; speed of express train = 44 km/h.',
              markingScheme: ['Variable definition and equation setup (1.5 marks)', 'Forming quadratic equation x² + 11x - 1452 = 0 (1.5 marks)', 'Factoring and finding x = 33 km/h (1 mark)', 'Final statement of both train speeds (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT Exemplar Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Introduction & Standard Form', summary: 'Standard form ax² + bx + c = 0 with condition a ≠ 0 and geometric parabolic interpretation.' },
        { time: '06:15', seconds: 375, title: 'Quadratic Formula Proof', summary: 'Derivation of Sridharacharya formula x = (-b ± √D) / (2a) by completing the square.' },
        { time: '14:30', seconds: 870, title: 'Nature of Roots & Discriminant', summary: 'Detailed classification of roots according to D > 0, D = 0, and D < 0.' },
        { time: '22:45', seconds: 1365, title: 'Relations of Roots & Coefficients', summary: 'Vieta formulas: sum α + β = -b/a and product αβ = c/a with equation reconstruction.' },
      ],
      flashcards: [
        { id: 1, front: 'What is the Discriminant of a quadratic equation ax² + bx + c = 0?', back: 'D = b² - 4ac. It determines whether roots are real & distinct (D > 0), real & equal (D = 0), or complex (D < 0).', concept: 'Discriminant' },
        { id: 2, front: 'State Sridharacharya\'s Quadratic Formula.', back: 'x = (-b ± √(b² - 4ac)) / (2a)', concept: 'Quadratic Formula' },
        { id: 3, front: 'What is the condition for real and equal roots?', back: 'The discriminant must be zero: D = b² - 4ac = 0. Both roots equal -b / (2a).', concept: 'Equal Roots Condition' },
        { id: 4, front: 'If α and β are the roots, what is α + β and αβ?', back: 'Sum of roots α + β = -b/a; Product of roots αβ = c/a.', concept: 'Vieta Relations' },
      ],
      quiz: [
        {
          id: 1,
          question: 'What is the nature of the roots of 3x² - 2x + 1/3 = 0?',
          options: ['Two distinct real roots', 'Two equal real roots', 'No real roots', 'Infinite roots'],
          correctIndex: 1,
          explanation: 'D = b² - 4ac = (-2)² - 4(3)(1/3) = 4 - 4 = 0. When D = 0, the equation has two equal real roots.',
          topic: 'Nature of Roots',
        },
        {
          id: 2,
          question: 'If the sum of roots is 5 and product of roots is 6, what is the quadratic equation?',
          options: ['x² + 5x + 6 = 0', 'x² - 5x + 6 = 0', 'x² - 5x - 6 = 0', 'x² + 5x - 6 = 0'],
          correctIndex: 1,
          explanation: 'Formula: x² - (Sum)x + (Product) = 0 => x² - 5x + 6 = 0.',
          topic: 'Formation of Quadratic Equations',
        },
        {
          id: 3,
          question: 'For what value of k does 2x² + kx + 3 = 0 have two equal roots?',
          options: ['k = ±2√6', 'k = ±6', 'k = ±4', 'k = ±8'],
          correctIndex: 0,
          explanation: 'D = k² - 4(2)(3) = k² - 24 = 0 => k² = 24 => k = ±√24 = ±2√6.',
          topic: 'Discriminant Applications',
        },
      ],
      quickRevisionPoints: [
        'Standard form: ax² + bx + c = 0 with a ≠ 0.',
        'Discriminant D = b² - 4ac.',
        'D > 0: Two distinct real roots; D = 0: Two equal real roots; D < 0: No real roots.',
        'Sridharacharya Formula: x = (-b ± √D) / (2a).',
        'Sum of roots α + β = -b/a; Product of roots αβ = c/a.',
        'Equation with given roots: x² - (α + β)x + αβ = 0.',
        'For equal roots problems, set D = b² - 4ac = 0.',
      ],
    };
  }

  // 2.5. MATHEMATICS — PROBABILITY & BAYES' THEOREM
  const isProbability = cLower.includes('probab') || cLower.includes('bayes') || cLower.includes('random variable');
  if (isProbability) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Probability, Conditional Probability & Bayes' Theorem Essentials`,
          cheatSheet: [
            'Axiomatic Foundations: 0 ≤ P(E) ≤ 1 for any event E, P(S) = 1, and P(∅) = 0. For mutually exclusive events, P(A ∪ B) = P(A) + P(B).',
            'Addition Theorem: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Subtract intersection to eliminate double-counting.',
            'Conditional Probability: P(A|B) = P(A ∩ B) / P(B) for P(B) > 0. Probability of A occurring given B has already occurred.',
            'Independent Events: P(A ∩ B) = P(A) · P(B). Events A and B do not influence each other. Mutually exclusive events with non-zero probability can NEVER be independent!',
            'Bayes\' Theorem: Calculates posterior probability P(Ek|A) = [P(Ek) · P(A|Ek)] / [Σ P(Ei) · P(A|Ei)] after observing symptom or evidence A.',
            'Random Variables & Probability Distributions: Σ P(X = xi) = 1. Mathematical Expectation (Mean) E[X] = Σ xi · P(X = xi).',
          ],
          formulas: [
            { name: 'Addition Theorem of Probability', formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)', note: 'Reduces to P(A) + P(B) when events are mutually exclusive (A ∩ B = ∅)' },
            { name: 'Conditional Probability', formula: 'P(A|B) = P(A ∩ B) / P(B)', note: 'Valid strictly when P(B) > 0' },
            { name: 'Bayes\' Theorem Formulation', formula: 'P(Ek|A) = [P(Ek) · P(A|Ek)] / [Σ P(Ei) · P(A|Ei)]', note: 'Posterior probability of cause Ek given evidence A' },
            { name: 'Mathematical Expectation (Mean)', formula: 'E[X] = Σ xi · P(X = xi)', note: 'Expected value of discrete random variable X' },
          ],
          bulletSummary: [
            'Total Probability Rule: P(A) = Σ P(Ei) · P(A|Ei) across a mutually exclusive, exhaustive partition of sample space S.',
            'Variance Formula: Var(X) = E[X²] - (E[X])².',
          ],
        },
        minimal: {
          headline: `${chapter} Summary`,
          cheatSheet: [
            'P(A|B) = P(A ∩ B) / P(B).',
            'Bayes Theorem computes posterior probability given observed evidence.',
            'E[X] = Σ xi P(X = xi).',
          ],
          formulas: [
            { name: 'Conditional Probability', formula: 'P(A|B) = P(A ∩ B) / P(B)', note: 'Fundamental conditioning rule' },
          ],
          bulletSummary: ['Axioms, conditional probability, Bayes theorem, and expectation.'],
        },
        topper: {
          introduction: `Rigorous mathematical lecture analysis for ${subject}: ${chapter}. Examines Kolmogorov axiomatic probability, conditional probability spaces, Bayes' theorem, and discrete random variable distributions.`,
          deepDive: [
            {
              title: '1. Axiomatic Probability, Sample Space Partitions & Addition Theorem',
              timestamp: '00:00',
              content: 'Probability is defined on a sample space S of all mutually exclusive elementary outcomes. Kolmogorov axioms establish that P(E) ∈ [0, 1], P(S) = 1, and for countable disjoint events, the probability of their union equals the sum of their probabilities. The general addition theorem P(A ∪ B) = P(A) + P(B) - P(A ∩ B) follows from the principle of inclusion-exclusion.',
              keyTakeaway: 'Complementary event rule: P(A\') = 1 - P(A).',
            },
            {
              title: '2. Conditional Probability, Multiplication Theorem & Statistical Independence',
              timestamp: '07:30',
              content: 'Conditioning on event B restricts the effective sample space to B: P(A|B) = P(A ∩ B) / P(B). The multiplication theorem gives P(A ∩ B) = P(B) · P(A|B) = P(A) · P(B|A). Two events are statistically independent if P(A ∩ B) = P(A) · P(B). Crucial conceptual distinction: Mutually exclusive events cannot occur simultaneously (A ∩ B = ∅), whereas independent events can occur simultaneously but provide zero information about each other.',
              keyTakeaway: 'If P(A) > 0 and P(B) > 0, mutually exclusive events can NEVER be independent.',
            },
            {
              title: '3. Theorem of Total Probability & Bayes\' Inverse Probability Theorem',
              timestamp: '16:00',
              content: 'Let E1, E2, ..., En be a partition of sample space S (mutually exclusive and exhaustive, Σ P(Ei) = 1). The Theorem of Total Probability states: P(A) = Σ P(Ei) · P(A|Ei). When an event A is observed, Bayes\' Theorem calculates the posterior probability that it originated from cause Ek: P(Ek|A) = [P(Ek) · P(A|Ek)] / [Σ P(Ei) · P(A|Ei)]. P(Ek) is the prior probability, P(A|Ek) is the likelihood, and P(Ek|A) is the updated posterior probability.',
              keyTakeaway: 'Always verify that partition probabilities sum to exactly 1: Σ P(Ei) = 1.',
            },
          ],
          derivations: [
            {
              title: 'Derivation of Bayes\' Theorem from Conditional Probability Axioms',
              steps: [
                'State definition of conditional probability: P(Ek|A) = P(Ek ∩ A) / P(A)',
                'Apply multiplication theorem to numerator: P(Ek ∩ A) = P(Ek) · P(A|Ek)',
                'Apply Theorem of Total Probability to denominator: P(A) = Σ_{i=1}^n P(Ei) · P(A|Ei)',
                'Substitute numerator and denominator expressions: P(Ek|A) = [P(Ek) · P(A|Ek)] / [Σ_{i=1}^n P(Ei) · P(A|Ei)]',
                'Verify validity: holds for any non-null event A (P(A) > 0) and partition {Ei}',
              ],
              finalResult: 'Bayes\' Theorem formulation established from axiomatic foundations',
            },
          ],
          proTips: [
            'In tree diagrams, branch probabilities originating from a single node must sum to 1.',
            'For independent events A and B, their complements A\' and B\' are also strictly independent.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, Probability aur Bayes\' Theorem ko bilkul mast Hinglish mein samajhte hain! Probability matlab kismat ka mathematical hisaab-kitaab — coin toss se lekar factory defects aur doctor ke diagnosis tak sab probability pe chalta hai!`,
          desiAnalogies: [
            {
              concept: 'Bayes\' Theorem',
              analogy: 'Socho gaadi mein se aawaz aayi (Event A). Ab mechanic socta hai: Aawaz tyre puncture hone se aayi ya engine kharab hone se? Pehle se pata chances (Priors) aur naye evidence ko mila kar asli vajah dhoondna hi Bayes\' Theorem hai!',
              desiPunchline: 'Symptom dekh ke bimari ka pata lagana hi Bayes\' Theorem hai!',
            },
            {
              concept: 'Mutually Exclusive vs Independent',
              analogy: 'Mutually exclusive matlab ek time pe do alag shaadiyon mein hona (ek jagah gaye toh dusri jagah zero chance). Independent matlab do doston ka alag-alag paper likhna (dono pass ho sakte hain, ek ka result dusre ko effect nahi karta)!',
              desiPunchline: 'Saath nahi ho sakte toh mutually exclusive, ek dusre se matlab nahi toh independent!',
            },
          ],
          bhaiKaSummary: [
            'Point 1: P(A|B) = P(A ∩ B) / P(B).',
            'Point 2: Bayes Theorem = [Prior × Likelihood] / Total Probability.',
          ],
          jugaadPoints: [
            'Exam trick: Bayes question mein hamesha pehle partition E1, E2 define karo aur check karo P(E1) + P(E2) = 1 aata hai ya nahi!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, Probability bilkul simple topic hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Probability carries 8 marks in CBSE Class 12 Mathematics (typically one 4-mark case study on Bayes\' Theorem and one 2-mark or 1-mark question on conditional probability). High-frequency questions involve diagnostic accuracy and factory production defect identification.',
          highWeightageTopics: [
            'Bayes\' Theorem Case Studies & Reverse Probability (4-5 Marks)',
            'Conditional Probability & Independent Events Verification (2-3 Marks)',
            'Discrete Probability Distribution, Mean & Variance (3-4 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'If P(A) = 0.6, P(B) = 0.3, and P(A ∩ B) = 0.2, calculate P(A|B).',
              answer: 'By conditional probability formula: P(A|B) = P(A ∩ B) / P(B) = 0.2 / 0.3 = 2/3 ≈ 0.667.',
              markingScheme: ['Formula statement (½ mark)', 'Evaluation to 2/3 (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Two events A and B are such that P(A) = 1/4, P(B) = 1/2, and P(A ∪ B) = 5/8. Determine whether events A and B are independent.',
              answer: '1. By addition theorem: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) => 5/8 = 1/4 + 1/2 - P(A ∩ B) => 5/8 = 6/8 - P(A ∩ B) => P(A ∩ B) = 6/8 - 5/8 = 1/8.\n2. Check product: P(A) · P(B) = (1/4) · (1/2) = 1/8.\n3. Since P(A ∩ B) = P(A) · P(B) = 1/8, events A and B are statistically independent.',
              markingScheme: ['Finding P(A ∩ B) = 1/8 (1.5 marks)', 'Checking P(A) · P(B) and independence conclusion (1.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'A doctor is to visit a patient. From past experience, probabilities that he comes by cab, bus, train or other means of transport are 0.3, 0.2, 0.1, and 0.4 respectively. Probabilities that he will be late are 0.25, 0.3, 0.35, and 0.1 respectively. When he arrives, he is late. What is the probability that he came by cab?',
              answer: 'Let E1 = by cab, E2 = by bus, E3 = by train, E4 = by other transport.\nPrior probabilities: P(E1) = 0.3, P(E2) = 0.2, P(E3) = 0.1, P(E4) = 0.4. (Sum = 1.0).\nLet L = event that doctor is late.\nLikelihoods: P(L|E1) = 0.25, P(L|E2) = 0.3, P(L|E3) = 0.35, P(L|E4) = 0.1.\nBy Total Probability Theorem:\nP(L) = (0.3 × 0.25) + (0.2 × 0.3) + (0.1 × 0.35) + (0.4 × 0.1) = 0.075 + 0.060 + 0.035 + 0.040 = 0.210.\nBy Bayes\' Theorem:\nP(E1|L) = [P(E1) · P(L|E1)] / P(L) = 0.075 / 0.210 = 75 / 210 = 5 / 14 ≈ 0.357 (35.7%).',
              markingScheme: ['Defining partition and events (1 mark)', 'Total probability calculation P(L) = 0.21 (2 marks)', 'Bayes formula substitution and final result 5/14 (2 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Axioms & Addition Theorem', summary: 'Sample space, Kolmogorov axioms, and addition rule for non-disjoint events.' },
        { time: '07:30', seconds: 450, title: 'Conditional Probability & Independence', summary: 'Conditioning formula P(A|B) and multiplication theorem for independent events.' },
        { time: '16:00', seconds: 960, title: 'Bayes\' Theorem & Posterior Evaluation', summary: 'Sample space partition, total probability law, and reverse probability derivation.' },
      ],
      flashcards: [
        { id: 1, front: 'What is the condition for events A and B to be independent?', back: 'P(A ∩ B) = P(A) · P(B), or equivalently P(A|B) = P(A).', concept: 'Independence' },
        { id: 2, front: 'Can mutually exclusive events with non-zero probability be independent?', back: 'No, because if they are mutually exclusive P(A ∩ B) = 0, but P(A) · P(B) > 0.', concept: 'Probability Axioms' },
        { id: 3, front: 'What does Bayes\' Theorem calculate?', back: 'It calculates the posterior probability of a cause given that an effect or evidence has occurred.', concept: 'Bayes Theorem' },
      ],
      quiz: [
        {
          id: 1,
          topic: 'Probability & Distributions',
          question: 'If A and B are independent events with P(A) = 0.4 and P(B) = 0.5, then P(A ∪ B) is:',
          options: ['0.70', '0.90', '0.20', '0.80'],
          correctIndex: 0,
          explanation: 'P(A ∩ B) = 0.4 × 0.5 = 0.2. P(A ∪ B) = 0.4 + 0.5 - 0.2 = 0.70.',
        },
        {
          id: 2,
          topic: 'Probability & Distributions',
          question: 'In Bayes\' Theorem, P(Ek) is known as:',
          options: ['Prior probability', 'Posterior probability', 'Likelihood', 'Marginal likelihood'],
          correctIndex: 0,
          explanation: 'P(Ek) is the prior probability of hypothesis Ek assessed before taking into account conditioning evidence.',
        },
      ],
      quickRevisionPoints: [
        'Axioms: 0 ≤ P(E) ≤ 1, P(S) = 1; P(A ∪ B) = P(A) + P(B) - P(A ∩ B).',
        'Conditional probability: P(A|B) = P(A ∩ B) / P(B) for P(B) > 0.',
        'Independent events: P(A ∩ B) = P(A) · P(B); independent events can happen together.',
        'Bayes\' Theorem: P(Ek|A) = [P(Ek)P(A|Ek)] / [Σ P(Ei)P(A|Ei)].',
        'Discrete Random Variable: Σ P(X = xi) = 1; Expected value E[X] = Σ xi P(X = xi).',
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
              frequentlyAskedIn: 'Curriculum Practice Question (Higher Secondary Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Evaluate ∫ x · e^x dx using integration by parts.',
              answer: 'Using ILATE rule, let u = x and dv = e^x dx => du = dx, v = e^x. Applying formula: ∫ x e^x dx = x e^x - ∫ e^x dx = x e^x - e^x + C = e^x (x - 1) + C.',
              markingScheme: ['Correct choice of u and v (1 mark)', 'Formula substitution (1 mark)', 'Final result with + C (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (Higher Secondary Syllabus Aligned — 3 Marks)',
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

  // 3.8 BIOLOGY — PHOTOSYNTHESIS IN HIGHER PLANTS (LIGHT REACTIONS & CALVIN CYCLE)
  const isPhotosynthesis = 
    cLower.includes('photo') || 
    cLower.includes('chloroplast') || 
    cLower.includes('calvin') || 
    cLower.includes('thylakoid') || 
    cLower.includes('light reaction') ||
    cLower.includes('z-scheme');

  if (isPhotosynthesis) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Chloroplast Anatomy, Z-Scheme & Calvin Cycle Notes`,
          cheatSheet: [
            'Site of Photosynthesis: Light reactions occur in the Thylakoid membranes (Grana); Dark reactions (Calvin Cycle) occur in the Stroma.',
            'Photolysis of Water (Hill Reaction): 2 H₂O → 4 H⁺ + 4 e⁻ + O₂ occurs on the luminal side of PS II; proves oxygen comes from water, NOT CO₂.',
            'Light Reaction (Z-Scheme): PS II (P680) and PS I (P700) drive non-cyclic photophosphorylation, producing ATP and NADPH.',
            'Calvin Cycle (C₃ Pathway): 3 steps — Carboxylation (catalyzed by RuBisCO), Reduction (uses 2 ATP + 2 NADPH), Regeneration of RuBP (uses 1 ATP).',
            'Net Energy Balance for Glucose: Synthesis of 1 glucose molecule requires 6 turns of Calvin cycle, consuming 18 ATP and 12 NADPH.',
          ],
          formulas: [
            { name: 'Overall Photosynthetic Equation', formula: '6 CO₂ + 12 H₂O ──(Light & Chlorophyll)──► C₆H₁₂O₆ + 6 O₂ + 6 H₂O', note: 'Endergonic anabolic reduction of carbon dioxide' },
            { name: 'Photolysis of Water', formula: '2 H₂O ──► 4 H⁺ + 4 e⁻ + O₂', note: 'Oxygen-evolving complex (OEC) requires Mn²⁺ and Cl⁻ ions' },
            { name: 'Calvin Cycle Energetic Cost', formula: '6 CO₂ + 18 ATP + 12 NADPH ──► 1 Glucose + 18 ADP + 12 NADP⁺ + 18 Pi', note: '3 ATP + 2 NADPH consumed per CO₂ molecule fixed' },
            { name: 'Blackman’s Law of Limiting Factors', formula: 'Rate = f(Factor at minimum value)', note: 'Formulated by F.F. Blackman in 1905' },
          ],
          bulletSummary: [
            'RuBisCO is the most abundant enzyme/protein in the biosphere with dual carboxylase and oxygenase activity.',
            'Chlorophyll a is the primary reaction center pigment; accessory pigments (chlorophyll b, carotenoids) prevent photo-oxidation.',
            'CO₂ concentration (0.03% - 0.04%) is the major limiting factor for photosynthesis in the atmosphere.',
          ],
        },
        minimal: {
          headline: `${chapter} Summary Card`,
          cheatSheet: [
            'Light reactions in Thylakoids: Produce ATP + NADPH + O₂ (from water).',
            'Dark reactions in Stroma: Calvin cycle fixes CO₂ using RuBisCO.',
            '1 Glucose = 6 CO₂ + 18 ATP + 12 NADPH.',
            'Blackman\'s Law: Process rate is limited by factor closest to minimum.',
          ],
          formulas: [
            { name: 'Photosynthesis Equation', formula: '6 CO₂ + 12 H₂O → C₆H₁₂O₆ + 6 O₂ + 6 H₂O', note: 'Net reaction' },
            { name: 'Photolysis', formula: '2 H₂O → 4 H⁺ + 4 e⁻ + O₂', note: 'Source of oxygen' },
          ],
          bulletSummary: [
            'Oxygen comes from H₂O, not CO₂.',
            'RuBisCO catalyzes the carboxylation of RuBP.',
          ],
        },
        topper: {
          introduction: `Comprehensive analytical lecture synthesis for ${subject}: ${chapter}. Structured in alignment with NCERT, CBSE, NEET, and university biology curriculum.`,
          deepDive: [
            {
              title: 'Chloroplast Architecture & Photosynthetic Pigment Complexes',
              timestamp: '01:45',
              content: 'Photosynthesis is compartmentalized within the chloroplast, an endosymbiotic double-membraned organelle. The internal space contains a proteinaceous matrix called the stroma and a membranous network of flattened sacs called thylakoids, stacked into grana connected by stroma lamellae. The thylakoid membranes contain light-harvesting complexes (LHC) composed of hundreds of pigment molecules bound to proteins. Chlorophyll a acts as the primary reaction center, while chlorophyll b, xanthophylls, and carotenoids form antenna complexes that absorb photons across 400–700 nm (Photosynthetically Active Radiation, PAR) and funnel excitation energy to the reaction center while shielding it from photo-oxidative degradation.',
              keyTakeaway: 'Photochemical light reactions occur exclusively in thylakoid membranes; biochemical enzymatic carbon assimilation occurs in the stroma.',
            },
            {
              title: 'Light-Dependent Reactions: Z-Scheme & Chemiosmotic ATP Synthesis',
              timestamp: '08:30',
              content: 'In non-cyclic photophosphorylation, Photosystem II (P680) absorbs 680 nm light, ejecting high-energy electrons that pass through pheophytin, plastoquinone (PQ), cytochrome b6f complex, and plastocyanin (PC) to Photosystem I (P700). Electrons lost from PS II are replenished by the photolysis of water on the luminal surface: 2 H₂O → 4 H⁺ + 4 e⁻ + O₂, catalyzed by the oxygen-evolving complex with Mn²⁺ and Cl⁻ cofactors. Excited electrons from PS I pass through ferredoxin to NADP⁺ reductase, forming NADPH. Concurrently, protons accumulate inside the thylakoid lumen due to water splitting and PQ proton pumping, creating a proton motive force across the membrane. Protons exit through the CF₀-CF₁ ATP synthase complex into the stroma, driving chemiosmotic synthesis of ATP (Peter Mitchell hypothesis).',
              keyTakeaway: 'The non-cyclic Z-scheme generates both ATP and NADPH alongside molecular oxygen.',
            },
            {
              title: 'The Calvin Cycle (C₃ Pathway) & RuBisCO Enzymatic Regulation',
              timestamp: '17:00',
              content: 'Melvin Calvin used radioactive ¹⁴C in green algae to trace the path of carbon. The Calvin cycle proceeds in three phases: 1. Carboxylation: RuBisCO catalyzes the addition of CO₂ to 5-carbon Ribulose 1,5-bisphosphate (RuBP), yielding an unstable 6-carbon intermediate that immediately cleaves into two molecules of 3-phosphoglyceric acid (3-PGA). 2. Reduction: 3-PGA is phosphorylated by ATP and reduced by NADPH to form glyceraldehyde 3-phosphate (triose phosphate). Fixing 1 molecule of CO₂ consumes 2 ATP and 2 NADPH. 3. Regeneration: RuBP is regenerated from triose phosphate, consuming 1 ATP. To form 1 molecule of glucose (C₆H₁₂O₆), 6 turns of the cycle are required, consuming a total of 18 ATP and 12 NADPH.',
              keyTakeaway: 'Carboxylation is the most crucial step of the Calvin cycle; fixing 1 CO₂ requires 3 ATP and 2 NADPH.',
            },
          ],
          derivations: [
            {
              title: 'Stoichiometric Energy Balance of the Calvin Cycle for Glucose Synthesis',
              steps: [
                '1 molecule of Glucose (C₆H₁₂O₆) contains 6 carbon atoms; hence 6 molecules of CO₂ must be fixed.',
                'Carboxylation Phase: 6 RuBP (5C) + 6 CO₂ ──(RuBisCO)──► 12 molecules of 3-PGA (3C).',
                'Reduction Phase: 12 molecules of 3-PGA are converted to 12 Triose Phosphate (G3P) consuming 12 ATP and 12 NADPH (2 ATP + 2 NADPH per CO₂ fixed).',
                'Sugar Output: 2 out of 12 Triose Phosphate molecules exit the cycle to synthesize 1 net molecule of Glucose.',
                'Regeneration Phase: The remaining 10 Triose Phosphate molecules (10 × 3 = 30 carbons) are rearranged into 6 RuBP molecules (6 × 5 = 30 carbons), consuming 6 ATP (1 ATP per CO₂ fixed).',
                'Total Energy Input per Glucose: (12 ATP in reduction) + (6 ATP in regeneration) = 18 ATP, plus 12 NADPH.',
                'Net Equation: 6 CO₂ + 18 ATP + 12 NADPH + 12 H₂O ──► C₆H₁₂O₆ + 18 ADP + 18 Pi + 12 NADP⁺. (Verified)',
              ],
              finalResult: 'Net Glucose Cost = 18 ATP + 12 NADPH per C₆H₁₂O₆',
            },
          ],
          proTips: [
            'Oxygen evolved during photosynthesis originates strictly from water (H₂O), not from CO₂.',
            'In chemiosmosis, protons accumulate inside the thylakoid lumen, driving ATP synthase as they exit into the stroma.',
          ],
        },
        chatpata: {
          hinglishIntro: 'Bhai suno, plants bina kitchen ke poori duniya ko khana khilate hain — Photosynthesis ka asli funda!',
          desiAnalogies: [
            {
              concept: 'Thylakoid vs Stroma Kitchen',
              analogy: 'Samajh lo chloroplast ek restaurant hai. Thylakoids iska kitchen counter hai jahan dhoop aate hi water photolysis hota hai aur ATP power bank banta hai. Stroma dining hall hai jahan Calvin cycle khana serve karta hai!',
              desiPunchline: 'Light reaction kitchen me, dark reaction stroma dining hall me!',
            },
            {
              concept: 'Photolysis of Water',
              analogy: 'Paani ka tootna (2 H₂O → 4 H⁺ + 4 e⁻ + O₂) waise hi hai jaise coconut todkar paani aur prasad nikaalna — oxygen bonus me milta hai!',
              desiPunchline: 'Oxygen paani se nikalta hai, carbon dioxide se nahi!',
            },
          ],
          bhaiKaSummary: [
            'Light reaction (Thylakoids) → ATP + NADPH + O₂ produce karta hai.',
            'Dark reaction (Stroma) → Calvin cycle me 1 glucose ke liye 18 ATP + 12 NADPH lagte hain.',
            'RuBisCO enzyme duniya ka sabse abundant protein hai!',
          ],
          jugaadPoints: [
            'Calvin cycle ke 3 steps ka order: Carboxylation → Reduction → Regeneration (CRR rule)!',
          ],
        },
        chatpate: {
          hinglishIntro: 'Bhai suno, Photosynthesis bilkul visual conceptual topic hai!',
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Photosynthesis in Higher Plants carries 5 to 7 marks in CBSE Class 11 and NEET examinations. Highly recurrent questions focus on the Z-scheme, photolysis of water, Calvin cycle stoichiometry, and photorespiration differences.',
          highWeightageTopics: [
            'Calvin Cycle Stoichiometric Yield (18 ATP + 12 NADPH) (5 Marks)',
            'Non-cyclic vs Cyclic Photophosphorylation (3 Marks)',
            'Photolysis of Water and Oxygen Origin (1-2 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Name the enzyme responsible for initial carbon fixation in C3 plants and state its location in the chloroplast.',
              answer: 'The enzyme is RuBisCO (Ribulose 1,5-bisphosphate carboxylase-oxygenase). It is located in the stroma of the chloroplast.',
              markingScheme: ['RuBisCO identification (½ mark)', 'Stroma location (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Differentiate between cyclic and non-cyclic photophosphorylation on the basis of: (a) photosystems involved, (b) photolysis of water and oxygen evolution, and (c) end products formed.',
              answer: '(a) Photosystems: Non-cyclic involves both PS II and PS I; cyclic involves only PS I.\n(b) Photolysis & O₂: Non-cyclic involves photolysis of water and evolution of O₂; cyclic has no water splitting and zero O₂ release.\n(c) End Products: Non-cyclic produces both ATP and NADPH; cyclic produces ATP only.',
              markingScheme: ['1 mark for photosystem comparison', '1 mark for photolysis/O₂ comparison', '1 mark for end products comparison'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Explain the three stages of the Calvin cycle (C3 pathway) with a schematic representation. Calculate the total number of ATP and NADPH molecules required to produce one mole of hexose sugar.',
              answer: '1. Carboxylation: CO₂ is fixed with RuBP catalyzed by RuBisCO to form two molecules of 3-PGA.\n2. Reduction: Series of reactions utilizing 2 ATP and 2 NADPH per CO₂ fixed to convert 3-PGA into triose phosphate.\n3. Regeneration: RuBP is regenerated from triose phosphate consuming 1 ATP per turn.\nStoichiometry: For 1 hexose (6-carbon glucose), 6 CO₂ are fixed. ATP required = (6 × 2 in reduction) + (6 × 1 in regeneration) = 18 ATP. NADPH required = 6 × 2 = 12 NADPH. Net requirement = 18 ATP and 12 NADPH.',
              markingScheme: ['Carboxylation, reduction, regeneration descriptions (3 marks)', 'Calculations for 18 ATP and 12 NADPH (2 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT Exemplar Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Chloroplast Anatomy & Pigments', summary: 'Thylakoid structure, stroma, reaction center chlorophyll a, and accessory pigments.' },
        { time: '07:30', seconds: 450, title: 'Photolysis & Z-Scheme', summary: 'Water splitting, electron transport chain, and non-cyclic photophosphorylation.' },
        { time: '16:00', seconds: 960, title: 'Calvin Cycle & RuBisCO', summary: 'Carboxylation, reduction, and regeneration steps with 18 ATP + 12 NADPH balance.' },
        { time: '24:30', seconds: 1470, title: 'Limiting Factors of Photosynthesis', summary: 'Blackman law of limiting factors, light saturation, and carbon dioxide response curves.' },
      ],
      flashcards: [
        { id: 1, front: 'Where does the photolysis of water occur during photosynthesis?', back: 'On the luminal surface of the thylakoid membrane, associated with Photosystem II (PS II).', concept: 'Light Reactions' },
        { id: 2, front: 'How many ATP and NADPH are consumed to fix one molecule of CO₂ in the Calvin cycle?', back: '3 ATP (2 in reduction, 1 in regeneration) and 2 NADPH (in reduction).', concept: 'Calvin Cycle' },
        { id: 3, front: 'What is Blackman\'s Law of Limiting Factors?', back: 'When a process is conditioned by several factors, its rate is governed by the slowest factor nearest its minimal value.', concept: 'Limiting Factors' },
        { id: 4, front: 'What is the primary carboxylating enzyme in C3 plants?', back: 'RuBisCO (Ribulose 1,5-bisphosphate carboxylase-oxygenase), located in the stroma.', concept: 'Calvin Cycle' },
      ],
      quiz: [
        {
          id: 1,
          question: 'During photosynthesis, oxygen is evolved from:',
          options: ['Carbon dioxide (CO₂)', 'Water (H₂O)', 'Glucose (C₆H₁₂O₆)', 'Ribulose 1,5-bisphosphate (RuBP)'],
          correctIndex: 1,
          explanation: 'Oxygen liberated during photosynthesis originates from the photolysis of water (2 H₂O → 4 H⁺ + 4 e⁻ + O₂).',
          topic: 'Light Reactions',
        },
        {
          id: 2,
          question: 'How many turns of the Calvin cycle are required to synthesize one molecule of glucose?',
          options: ['1 turn', '3 turns', '6 turns', '12 turns'],
          correctIndex: 2,
          explanation: 'Each turn fixes 1 carbon atom from CO₂. Since glucose has 6 carbons, exactly 6 turns are required.',
          topic: 'Calvin Cycle Stoichiometry',
        },
        {
          id: 3,
          question: 'Which of the following is synthesized during cyclic photophosphorylation?',
          options: ['ATP only', 'ATP and NADPH', 'NADPH only', 'ATP, NADPH, and O₂'],
          correctIndex: 0,
          explanation: 'Cyclic photophosphorylation involves only Photosystem I and synthesizes ATP only, with zero NADPH or O₂ production.',
          topic: 'Photophosphorylation',
        },
      ],
      quickRevisionPoints: [
        'Light reactions occur in Thylakoids; dark reactions (Calvin cycle) occur in Stroma.',
        'Photolysis of water (2 H₂O → 4 H⁺ + 4 e⁻ + O₂) liberates oxygen at PS II.',
        'Non-cyclic Z-scheme generates both ATP and NADPH.',
        'Calvin cycle phases: Carboxylation → Reduction → Regeneration.',
        'Synthesis of 1 Glucose requires 6 CO₂, 18 ATP, and 12 NADPH.',
        'RuBisCO is the most abundant protein on Earth with dual carboxylase and oxygenase activity.',
        'Blackman Law: Rate is governed by the factor present in least amount.',
      ],
    };
  }

  // 3.5. BIOLOGY — HUMAN RESPIRATION & EXCHANGE OF GASES
  const isRespiration = cLower.includes('respirat') || cLower.includes('breathing') || cLower.includes('vital capacity') || cLower.includes('alveol');
  if (isRespiration) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Human Respiration & Gas Exchange Revision Essentials`,
          cheatSheet: [
            'Respiratory Volumes: Tidal Volume (TV ~500 mL), Inspiratory Reserve Volume (IRV ~2500-3000 mL), Expiratory Reserve Volume (ERV ~1000-1100 mL), Residual Volume (RV ~1100-1200 mL).',
            'Pulmonary Capacities: Vital Capacity VC = ERV + TV + IRV (~4000-4600 mL); Total Lung Capacity TLC = VC + RV (~5800 mL). RV cannot be measured by simple spirometer.',
            'Alveolar Diffusion Membrane: Composed of 3 layers: 1) simple squamous epithelium of alveoli, 2) capillary endothelium, 3) thin intervening basement substance (total thickness < 1 mm).',
            'Gas Partial Pressures: Alveolar pO2 = 104 mmHg, pCO2 = 40 mmHg; Deoxygenated blood pO2 = 40 mmHg, pCO2 = 45 mmHg. O2 diffuses down 64 mmHg gradient; CO2 diffuses rapidly down 5 mmHg gradient due to 20-25x higher solubility.',
            'Oxyhemoglobin Dissociation Curve: Sigmoid curve. High pCO2, low pH (high H+), and high temperature shift curve to the right (the Bohr Effect), accelerating O2 unloading in active tissues.',
          ],
          formulas: [
            { name: 'Vital Capacity Formula', formula: 'VC = ERV + TV + IRV', note: 'Maximal volume of air inspired after forced expiration (~4000 to 4600 mL)' },
            { name: 'Total Lung Capacity', formula: 'TLC = VC + RV', note: 'Total air volume in lungs after forced inspiration (~5800 mL)' },
            { name: 'Functional Residual Capacity', formula: 'FRC = ERV + RV', note: 'Air volume in lungs after normal expiration (~2200 mL)' },
          ],
          bulletSummary: [
            'Inspiration is active (diaphragm and external intercostal contraction); expiration is passive at rest.',
            'CO2 Transport: 70% as bicarbonate (HCO3⁻) via carbonic anhydrase, 20-25% as carbaminohemoglobin, 7% dissolved in plasma.',
          ],
        },
        minimal: {
          headline: `${chapter} Summary`,
          cheatSheet: [
            'VC = ERV + TV + IRV (~4200 mL).',
            'TLC = VC + RV (~5800 mL).',
            'Alveolar pO2 = 104 mmHg, pCO2 = 40 mmHg.',
          ],
          formulas: [
            { name: 'Vital Capacity', formula: 'VC = ERV + TV + IRV', note: 'Standard clinical pulmonary capacity' },
          ],
          bulletSummary: ['Pulmonary volumes, alveolar diffusion, and Bohr effect.'],
        },
        topper: {
          introduction: `Detailed physiological lecture synthesis for ${subject}: ${chapter}. Structured in alignment with NCERT Class 11 Biology, NEET, and pre-medical entrance standards.`,
          deepDive: [
            {
              title: '1. Mechanics of Pulmonary Ventilation & Muscular Dynamics',
              timestamp: '00:00',
              content: 'Breathing involves inspiration (active) and expiration (passive at rest). Contraction of the dome-shaped diaphragm increases thoracic volume in the antero-posterior axis, while contraction of external intercostal muscles lifts the ribs and sternum, increasing volume in the dorso-ventral axis. This creates negative intra-pulmonary pressure relative to the atmosphere, drawing air into the lungs. Forced expiration recruits internal intercostals and abdominal muscles.',
              keyTakeaway: 'The normal respiratory rate in a healthy human adult is 12 to 16 breaths per minute.',
            },
            {
              title: '2. Spirometric Volumes, Capacities & Clinical Limits',
              timestamp: '07:30',
              content: 'Tidal volume (TV) is 500 mL. Inspiratory reserve volume (IRV) is 2500-3000 mL. Expiratory reserve volume (ERV) is 1000-1100 mL. Residual volume (RV ~1100-1200 mL) remains in alveoli even after maximal forced expiration. Vital Capacity (VC) is the maximum air volume breathed in after a forced expiration: VC = ERV + TV + IRV. Capacities containing RV (namely FRC and TLC) cannot be measured using simple spirometry and require helium dilution or body plethysmography.',
              keyTakeaway: 'Residual volume prevents lungs from collapsing and maintains continuous alveolar gas exchange between breaths.',
            },
            {
              title: '3. Alveolar Gas Exchange, Partial Pressures & The Bohr Effect',
              timestamp: '16:00',
              content: 'Gas exchange at alveoli is driven by partial pressure gradients across the thin three-layered diffusion membrane. In alveoli, pO2 is 104 mmHg and pCO2 is 40 mmHg; incoming venous blood has pO2 of 40 mmHg and pCO2 of 45 mmHg. Oxygen binds reversibly with hemoglobin in a cooperative sigmoidal relationship: Hb4 + 4 O2 ⇌ Hb4O8. Under elevated pCO2, lower pH, and elevated temperature in exercising tissues, hemoglobin\'s oxygen affinity decreases, shifting the dissociation curve to the right (the Bohr Effect) to enhance oxygen delivery.',
              keyTakeaway: 'CO2 solubility is 20-25 times higher than O2, allowing rapid diffusion despite a modest 5 mmHg gradient.',
            },
          ],
          derivations: [
            {
              title: 'Derivation and Partitioning of Pulmonary Capacities',
              steps: [
                'Identify fundamental spirometric volumes: TV, IRV, ERV, RV',
                'Define Inspiratory Capacity: IC = TV + IRV (~3500 mL)',
                'Define Expiratory Capacity: EC = TV + ERV (~1600 mL)',
                'Define Functional Residual Capacity: FRC = ERV + RV (~2200 mL)',
                'Derive Vital Capacity: VC = ERV + TV + IRV (~4100-4600 mL)',
                'Derive Total Lung Capacity: TLC = VC + RV = TV + IRV + ERV + RV (~5800 mL)',
              ],
              finalResult: 'Complete spirometric lung volume identity TLC = VC + RV validated',
            },
          ],
          proTips: [
            'In competitive exams, remember that Residual Volume (RV) cannot be exhaled; hence FRC and TLC cannot be measured by simple spirometer.',
            'Notice that 100 mL of oxygenated blood delivers approximately 5 mL of O2 to tissues under normal physiological conditions.',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, Human Respiration ko bilkul simple bhasha mein samjho! Saans lena sirf hawa andar-bahar karna nahi hai — yeh pure body cells ko oxygen deliver karne ka express network hai!`,
          desiAnalogies: [
            {
              concept: 'Bohr Effect',
              analogy: 'Hemoglobin ek auto-driver hai jo oxygen passengers ko baitha ke le jaata hai. Jahan tissues mein mehnat zyada hoti hai (high CO2, high garmi), wahan auto-driver turant passenger ko utaar deta hai! Is right shift ko Bohr effect bolte hain.',
              desiPunchline: 'Jahan mehnat zyada, wahan oxygen delivery double!',
            },
            {
              concept: 'CO2 Solubility vs O2',
              analogy: 'CO2 paani mein cheeni ki tarah turant ghul jaati hai (20-25 times zyada soluble), isliye chhota sa 5 mmHg ka dhakka bhi bohot hai usse baha le jaane ke liye!',
              desiPunchline: 'CO2 super-fast swimmer hai, thoda gradient bhi kaafi hai!',
            },
          ],
          bhaiKaSummary: [
            'Point 1: VC = ERV + TV + IRV (lagbhag 4200 mL).',
            'Point 2: Alveoli mein pO2 = 104, pCO2 = 40 mmHg.',
          ],
          jugaadPoints: [
            'Exam trick: Carbonic anhydrase enzyme RBCs mein super-fast kaam karta hai CO2 ko bicarbonate mein badalne ke liye!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, Human Respiration bilkul simple topic hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Breathing and Exchange of Gases carries 2 to 3 questions regularly in NEET and 4 to 5 marks in CBSE Class 11 Biology exams. High-frequency questions test respiratory capacities calculation, oxygen dissociation curve shifts, and CO2 transport modes.',
          highWeightageTopics: [
            'Respiratory Volumes & Capacities Numerical Problems (3 Marks)',
            'Oxygen Dissociation Curve & Factors Causing Shift (Bohr Effect) (3 Marks)',
            'Transport of CO2 as Bicarbonate Ions (2-3 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Why cannot Functional Residual Capacity (FRC) be measured using a simple spirometer?',
              answer: 'FRC includes Residual Volume (RV), which is the volume of air that cannot be expelled from the lungs even after maximal forced expiration. Since a spirometer only measures the volume of air moved in or out of the lungs, RV and any capacity containing RV (like FRC and TLC) cannot be directly measured by simple spirometry.',
              markingScheme: ['Identification that FRC contains Residual Volume (½ mark)', 'Statement that RV cannot be voluntarily expired (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'State three physiological conditions that shift the oxygen-hemoglobin dissociation curve to the right.',
              answer: '1. High partial pressure of carbon dioxide (high pCO2).\n2. Higher hydrogen ion concentration (lower pH / acidosis).\n3. Elevated body temperature.\n(These conditions in metabolically active tissues decrease hemoglobin affinity for O2, promoting oxygen release via the Bohr effect).',
              markingScheme: ['High pCO2 (1 mark)', 'Low pH / high H+ (1 mark)', 'High temperature (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Explain the mechanism of transport of carbon dioxide (CO2) in human blood under three distinct modes. Mention the role of carbonic anhydrase.',
              answer: 'Carbon dioxide is transported by blood in three modes:\n1. In Dissolved State (7%): About 7% of CO2 is carried physically dissolved in blood plasma.\n2. As Carbamino-hemoglobin (20-25%): CO2 binds directly with the amino group of hemoglobin to form carbaminohemoglobin (HbCO2). This binding is favored by high pCO2 in tissues and reversed at alveoli.\n3. As Bicarbonate Ions (70%): The major mode. RBCs contain a high concentration of the enzyme Carbonic Anhydrase. In tissue capillaries, CO2 diffuses into RBCs and reacts with water: CO2 + H2O ⇌ H2CO3 ⇌ HCO3⁻ + H⁺. Bicarbonate diffuses out into plasma in exchange for chloride ions (Chloride Shift). At alveoli, the reaction reverses to release free CO2 into alveolar air.',
              markingScheme: ['Dissolved state 7% (1 mark)', 'Carbaminohemoglobin 20-25% (1.5 marks)', 'Bicarbonate 70% with carbonic anhydrase reaction (2.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Ventilation Mechanics & Muscles', summary: 'Diaphragm and intercostal contractions establishing negative intra-thoracic pressure.' },
        { time: '07:30', seconds: 450, title: 'Spirometric Volumes & Capacities', summary: 'TV, IRV, ERV, RV, Vital Capacity, and Total Lung Capacity definitions.' },
        { time: '16:00', seconds: 960, title: 'Alveolar Gas Exchange & Bohr Effect', summary: 'Partial pressure gradients, diffusion membrane, and sigmoid dissociation curve.' },
      ],
      flashcards: [
        { id: 1, front: 'What is the value of Vital Capacity (VC) in a normal adult?', back: 'Approximately 4000 to 4600 mL (VC = ERV + TV + IRV).', concept: 'Pulmonary Capacities' },
        { id: 2, front: 'What causes the Bohr Effect?', back: 'High pCO2, low pH (high H+), and high temperature decreasing hemoglobin affinity for O2, shifting curve to the right.', concept: 'Gas Transport' },
        { id: 3, front: 'What enzyme facilitates CO2 transport as bicarbonate in RBCs?', back: 'Carbonic Anhydrase, which catalyzes CO2 + H2O ⇌ H2CO3 ⇌ HCO3⁻ + H⁺.', concept: 'Biochemical Enzymes' },
      ],
      quiz: [
        {
          id: 1,
          topic: 'Human Respiration',
          question: 'What is the partial pressure of oxygen (pO2) in human alveolar air?',
          options: ['104 mmHg', '40 mmHg', '45 mmHg', '159 mmHg'],
          correctIndex: 0,
          explanation: 'In alveoli, pO2 is 104 mmHg, creating a 64 mmHg gradient against deoxygenated blood (40 mmHg) to drive oxygen diffusion.',
        },
        {
          id: 2,
          topic: 'Human Respiration',
          question: 'The major fraction of CO2 (approx 70%) is transported in blood as:',
          options: ['Bicarbonate ions (HCO3⁻)', 'Carbaminohemoglobin', 'Dissolved CO2 gas in plasma', 'Carbon monoxide'],
          correctIndex: 0,
          explanation: 'Approximately 70% of CO2 is transported as bicarbonate ions in plasma formed through carbonic anhydrase in RBCs.',
        },
      ],
      quickRevisionPoints: [
        'Vital Capacity VC = ERV + TV + IRV (~4100-4600 mL); TLC = VC + RV (~5800 mL).',
        'Residual Volume (RV ~1100-1200 mL) cannot be measured with a simple spirometer.',
        'Alveolar pO2 = 104 mmHg, pCO2 = 40 mmHg; Blood pO2 = 40 mmHg, pCO2 = 45 mmHg.',
        'Bohr effect: curve shifts right under high pCO2, low pH, high temperature.',
        '70% CO2 transported as bicarbonate via carbonic anhydrase; 20-25% as carbamino-Hb; 7% dissolved.',
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
              frequentlyAskedIn: 'Curriculum Practice Question (Senior Secondary Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Differentiate between leading and lagging strands during DNA replication.',
              answer: '1. Leading strand is synthesized continuously in 5\'→3\' direction towards fork; Lagging strand is synthesized discontinuously away from fork. 2. Leading strand requires only one RNA primer; Lagging strand requires multiple primers for Okazaki fragments. 3. DNA ligase is heavily required on lagging strand to join fragments.',
              markingScheme: ['Three valid contrasting points (1 mark each = 3 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (Senior Secondary Syllabus Aligned — 3 Marks)',
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

  // 4.6. CHEMISTRY — CHEMICAL BONDING & MOLECULAR STRUCTURE
  const isChemicalBonding = cLower.includes('bonding') || cLower.includes('vsepr') || cLower.includes('hybridization') || cLower.includes('molecular orbital');
  if (isChemicalBonding) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Chemical Bonding, VSEPR & Molecular Structure Revision`,
          cheatSheet: [
            'VSEPR Repulsion Order: Lone Pair - Lone Pair > Lone Pair - Bond Pair > Bond Pair - Bond Pair. Repulsion compresses bond angles: NH3 has 1 lone pair (107°), H2O has 2 lone pairs (104.5°) compared to ideal tetrahedral 109.5°.',
            'Valence Bond Theory: Sigma (σ) bonds are formed by head-on axial overlap of atomic orbitals (stronger); Pi (π) bonds are formed by sideways lateral overlap (weaker).',
            'Hybridization Rules: Intermixing of atomic orbitals of comparable energy. sp = linear (180°, e.g. BeCl2, C2H2), sp2 = trigonal planar (120°, e.g. BF3, C2H4), sp3 = tetrahedral (109.5°, e.g. CH4), sp3d = trigonal bipyramidal (e.g. PCl5).',
            'Molecular Orbital Theory (MOT): Linear Combination of Atomic Orbitals (LCAO). Bond Order = ½ (Nb - Na). Stable molecule if Nb > Na.',
            'Oxygen Paramagnetism: MOT electronic configuration for O2 (16 electrons) places 2 unpaired electrons in degenerate antibonding π* 2px and π* 2py orbitals, proving paramagnetism.',
            'Dipole Moment (μ = q × d): Vector quantity directed from positive to negative pole. Symmetric molecules (CO2, BF3, CCl4) have μ = 0 despite polar bonds.',
          ],
          formulas: [
            { name: 'Bond Order Formula', formula: 'Bond Order = ½ (Nb - Na)', note: 'Nb = bonding electrons, Na = antibonding electrons' },
            { name: 'Electric Dipole Moment', formula: 'μ = q × d', note: '1 Debye (D) = 3.336 × 10^-30 C·m; vector quantity' },
            { name: 'Formal Charge on Atom', formula: 'FC = V - L - ½ S', note: 'V = valence electrons, L = lone pair electrons, S = shared bonding electrons' },
          ],
          bulletSummary: [
            'Octet rule exceptions: Incomplete octet (BF3, BeCl2), odd electron molecules (NO, NO2), expanded octet (PCl5, SF6).',
            'Hydrogen Bonding: Dipole-dipole attraction when H is bonded to high electronegativity atoms (F, O, N). Explains anomalously high boiling point of water.',
          ],
        },
        minimal: {
          headline: `${chapter} Summary`,
          cheatSheet: [
            'VSEPR: Lone pair repulsion compresses bond angles.',
            'Bond Order = ½ (Nb - Na).',
            'O2 is paramagnetic with 2 unpaired electrons in π* orbitals.',
          ],
          formulas: [
            { name: 'Bond Order', formula: 'B.O. = ½ (Nb - Na)', note: 'Molecular stability criterion' },
          ],
          bulletSummary: ['VSEPR geometries, hybridization, and Molecular Orbital Theory.'],
        },
        topper: {
          introduction: `Advanced physical chemical lecture analysis for ${subject}: ${chapter}. Synthesizes Kossel-Lewis octet theory, Gillespie-Nyholm VSEPR geometries, Pauling valence bond hybridization, and Hund-Mulliken Molecular Orbital Theory.`,
          deepDive: [
            {
              title: '1. VSEPR Theory, Electron Pair Repulsions & Molecular Geometries',
              timestamp: '00:00',
              content: 'VSEPR theory posits that electron pairs in the valence shell of a central atom adopt spatial orientations that minimize mutual electrostatic repulsion. Lone pairs occupy greater angular volume than bonding pairs because they are attracted to only one atomic nucleus. Repulsion strengths follow: LP-LP > LP-BP > BP-BP. In AB3E molecules like ammonia (NH3), the single lone pair compresses the tetrahedral angle from 109.5° to 107° (trigonal pyramidal). In AB2E2 molecules like water (H2O), two lone pairs compress the angle to 104.5° (bent V-shape).',
              keyTakeaway: 'Geometry considers only nuclear positions (atomic layout), while electron pair arrangement includes lone pairs.',
            },
            {
              title: '2. Valence Bond Theory, Orbital Overlap & Hybridization',
              timestamp: '07:30',
              content: 'Covalent bonds arise from overlapping half-filled atomic orbitals with opposite electron spins. Axial overlap along the internuclear axis produces cylindrical symmetric sigma (σ) bonds with maximum electron density between nuclei. Lateral sideways overlap of parallel unhybridized p-orbitals produces pi (π) bonds with electron density above and below the axis. Hybridization involves the mixing of atomic orbitals of comparable energy (s, p, d) to produce equivalent directional hybrid orbitals that form stronger directional sigma bonds.',
              keyTakeaway: 'Single bonds are always sigma; double bonds comprise 1 sigma + 1 pi; triple bonds comprise 1 sigma + 2 pi.',
            },
            {
              title: '3. Molecular Orbital Theory (MOT), Bond Order & O2 Paramagnetism',
              timestamp: '16:00',
              content: 'Molecular Orbital Theory treats electrons as delocalized across the entire molecule. When atomic orbitals combine in-phase (constructive interference), bonding molecular orbitals (σ, π) are formed with lower energy. Out-of-phase combination (destructive interference) produces antibonding orbitals (σ*, π*) with a nodal plane between nuclei. Bond Order is given by ½(Nb - Na). For oxygen (O2, 16 electrons): σ1s² σ*1s² σ2s² σ*2s² σ2pz² (π2px² = π2py²) (π*2px¹ = π*2py¹). The two unpaired electrons in antibonding π* orbitals rigorously explain oxygen\'s paramagnetic behavior.',
              keyTakeaway: 'Bond Order is proportional to bond strength and inversely proportional to bond length.',
            },
          ],
          derivations: [
            {
              title: 'Linear Combination of Atomic Orbitals (LCAO) Derivation of Molecular Orbitals',
              steps: [
                'Consider two atomic wavefunctions ΨA and ΨB for interacting hydrogen atoms',
                'Construct linear combination wavefunctions: Ψ_bonding = ΨA + ΨB and Ψ_antibonding = ΨA - ΨB',
                'Evaluate electron probability density: |Ψ_bonding|² = |ΨA|² + |ΨB|² + 2 ΨA ΨB (enhanced electron density in internuclear region)',
                'Evaluate antibonding density: |Ψ_antibonding|² = |ΨA|² + |ΨB|² - 2 ΨA ΨB (depleted density with nodal plane)',
                'Derive Bond Order: B.O. = ½(Nb - Na) establishing bond stability when Nb > Na',
              ],
              finalResult: 'Bonding stabilization and antibonding destabilization verified via LCAO wave mechanics',
            },
          ],
          proTips: [
            'For homonuclear diatomics up to N2 (Z ≤ 7), the energy level of π2px = π2py is lower than σ2pz due to 2s-2p mixing. For O2 and F2 (Z > 7), σ2pz is lower than π2px = π2py.',
            'Molecules with zero net dipole moment can still have polar individual bonds if dipole vectors symmetrically cancel (e.g. linear CO2, tetrahedral CH4).',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, Chemical Bonding ko bilkul simple Hinglish mein samajhte hain! Atoms akelapan door karne aur stable hone ke liye bond banate hain — octet rule, VSEPR aur MOT iske 3 bade villains aur heroes hain!`,
          desiAnalogies: [
            {
              concept: 'VSEPR Lone Pair Bullying',
              analogy: 'Socho auto rickshaw mein 3 seedhe-sadhe dost baithe hain (bond pairs). Achanak ek mota pahalwan (lone pair) aa ke baith gaya — wo sabse zyada jagah le leta hai aur baaki doston ko kone mein dabakar unka angle chhota kar deta hai!',
              desiPunchline: 'Lone pair ka dabdaba zyada, bond angle chhota!',
            },
            {
              concept: 'Sigma vs Pi Bond',
              analogy: 'Sigma bond matlab aamne-saamne aakar pakka gale milna (head-on overlap, super strong). Pi bond matlab dur khade hoke haath milana (sideways overlap, weak, pehle tootega)!',
              desiPunchline: 'Pehle Sigma banega dosti ka, phir Pi banega bas show ke liye!',
            },
          ],
          bhaiKaSummary: [
            'Point 1: Bond Order = (Bonding - Antibonding) / 2.',
            'Point 2: O2 paramagnetism sirf MOT explain kar sakti hai, Lewis fail ho gaya tha!',
          ],
          jugaadPoints: [
            'Exam trick: Hybridization nikalne ke liye: Central atom ke sigma bonds count karo + lone pairs jodo. Total 2 = sp, 3 = sp2, 4 = sp3, 5 = sp3d.',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, Chemical Bonding bilkul simple topic hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Chemical Bonding is a cornerstone chapter carrying 6 to 8 marks in CBSE Class 11 and 2 to 3 direct questions in JEE/NEET. High-yield exam questions focus on VSEPR geometry anomalies, MOT electronic configurations and bond orders, and hybridization proofs.',
          highWeightageTopics: [
            'Molecular Orbital Theory: Configuration, Bond Order & Magnetic Nature (3-5 Marks)',
            'VSEPR Theory: Molecular Geometry and Bond Angle Deviations (3 Marks)',
            'Hybridization of Central Atoms and Sigma/Pi Bond Calculations (2-3 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Calculate the formal charge on the central oxygen atom in the ozone (O3) molecule.',
              answer: 'For the central oxygen in O3: Valence electrons V = 6; Non-bonding lone pair electrons L = 2; Shared bonding electrons S = 6 (one single bond, one double bond). Formal Charge = V - L - ½ S = 6 - 2 - ½(6) = 6 - 2 - 3 = +1.',
              markingScheme: ['Formal charge formula statement (½ mark)', 'Correct numerical calculation FC = +1 (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Using Molecular Orbital Theory, explain why the oxygen molecule (O2) is paramagnetic while the nitrogen molecule (N2) is diamagnetic.',
              answer: '1. O2 (16 electrons): Filling order places two electrons into the degenerate antibonding orbitals π* 2px and π* 2py as single unpaired electrons (Hund\'s rule). Since it possesses unpaired electrons, O2 is paramagnetic.\n2. N2 (14 electrons): Filling order completely pairs all 14 electrons up to σ 2pz². Since there are zero unpaired electrons, N2 is diamagnetic.',
              markingScheme: ['O2 configuration showing unpaired π* electrons (1.5 marks)', 'N2 configuration showing all paired electrons (1.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Compare the molecular geometry, hybridization, and bond angles of CH4, NH3, and H2O. Explain why their bond angles decrease from 109.5° to 107° to 104.5° despite having identical sp3 hybridization at the central atom.',
              answer: '1. In all three molecules, the central atom has steric number = 4 (sp3 hybridized with tetrahedral electron pair geometry).\n2. CH4: Carbon has 4 bond pairs and 0 lone pairs. Repulsions are strictly BP-BP, maintaining ideal tetrahedral angle of 109.5°.\n3. NH3: Nitrogen has 3 bond pairs and 1 lone pair. According to VSEPR theory, LP-BP repulsion is stronger than BP-BP repulsion. The lone pair repels the three N-H bond pairs inward, reducing the bond angle from 109.5° to 107° (trigonal pyramidal geometry).\n4. H2O: Oxygen has 2 bond pairs and 2 lone pairs. LP-LP repulsion is the strongest of all electron repulsions. The two lone pairs repel each other strongly and push the two O-H bond pairs even closer together, compressing the bond angle to 104.5° (bent/V-shaped geometry).',
              markingScheme: ['Identification of sp3 hybridization in all three (1 mark)', 'CH4 geometry and 109.5° explanation (1 mark)', 'NH3 LP-BP repulsion and 107° explanation (1.5 marks)', 'H2O LP-LP repulsion and 104.5° explanation (1.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Octet Limitations & VSEPR Geometry', summary: 'Electron pair repulsion hierarchy and bond angle compression in NH3 and H2O.' },
        { time: '07:30', seconds: 450, title: 'Orbital Overlap & Hybridization', summary: 'Sigma vs pi overlap, sp/sp2/sp3 mixing, and directional covalent bonds.' },
        { time: '16:00', seconds: 960, title: 'Molecular Orbital Theory & O2 Paramagnetism', summary: 'LCAO, bonding vs antibonding orbitals, and bond order calculations.' },
      ],
      flashcards: [
        { id: 1, front: 'What is the bond order of N2 and O2?', back: 'N2 bond order = 3 (triple bond, diamagnetic); O2 bond order = 2 (double bond, paramagnetic).', concept: 'Molecular Orbital Theory' },
        { id: 2, front: 'Why is the bond angle in H2O smaller than in NH3?', back: 'H2O has two lone pairs exerting strong LP-LP repulsion, compressing the angle to 104.5° compared to 107° in NH3 (one lone pair).', concept: 'VSEPR Theory' },
        { id: 3, front: 'Why does CO2 have zero dipole moment despite polar C=O bonds?', back: 'CO2 is linear (180°), so the two equal bond dipole moments point in opposite directions and cancel out vectorially.', concept: 'Dipole Moment' },
      ],
      quiz: [
        {
          id: 1,
          topic: 'Chemical Bonding',
          question: 'According to VSEPR theory, which electron pair repulsion is the strongest?',
          options: ['Lone Pair - Lone Pair', 'Lone Pair - Bond Pair', 'Bond Pair - Bond Pair', 'All repulsions are equal'],
          correctIndex: 0,
          explanation: 'Lone pairs are attracted to only one nucleus and occupy greater angular volume, exerting the strongest mutual repulsion.',
        },
        {
          id: 2,
          topic: 'Chemical Bonding',
          question: 'The bond order of the oxygen molecule (O2) calculated using Molecular Orbital Theory is:',
          options: ['2.0', '1.0', '2.5', '3.0'],
          correctIndex: 0,
          explanation: 'Bond order = ½ (Nb - Na) = ½ (10 - 6) = 2.0, corresponding to a stable diatomic double bond.',
        },
      ],
      quickRevisionPoints: [
        'VSEPR Repulsion Order: LP-LP > LP-BP > BP-BP; compresses bond angles from ideal geometry.',
        'Hybridization: sp (180° linear), sp2 (120° trigonal planar), sp3 (109.5° tetrahedral).',
        'Sigma (σ) bonds are head-on and stronger; Pi (π) bonds are sideways and weaker.',
        'Bond Order = ½ (Nb - Na); positive bond order indicates a stable molecule.',
        'O2 is paramagnetic with 2 unpaired electrons in degenerate π* antibonding orbitals.',
      ],
    };
  }

  // 4.8. CHEMISTRY — ORGANIC CHEMISTRY: ISOMERISM & STEREOCHEMISTRY
  const isIsomerism = cLower.includes('isomer') || cLower.includes('stereochem') || cLower.includes('enantiomer') || cLower.includes('chiral');
  if (isIsomerism) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Structural & Stereoisomerism Key Revision`,
          cheatSheet: [
            'Classification of Isomerism: 1) Structural Isomerism (Chain, Position, Functional, Metamerism, Tautomerism); 2) Stereoisomerism (Geometrical and Optical).',
            'Geometrical Isomerism: Requires restricted rotation (C=C double bond or ring) with two distinct groups on each carbon. Cis-isomer (same side) has higher dipole moment and boiling point; Trans-isomer (opposite sides) has higher melting point due to superior crystal packing symmetry.',
            'Optical Activity & Chirality: Molecule must lack an internal plane of symmetry (non-superimposable mirror image). Chiral carbon is bonded to 4 distinct groups.',
            'Enantiomers vs Diastereomers: Enantiomers are non-superimposable mirror images with identical physical properties except opposite direction of optical rotation (+/-). Diastereomers are not mirror images and possess different physical and chemical properties.',
            'Meso Compounds & Racemic Mixtures: Meso compound contains multiple chiral carbons and an internal plane of symmetry; optically inactive due to internal compensation. Racemic mixture [dl or (±)] is an equimolar mixture optically inactive due to external compensation.',
          ],
          formulas: [
            { name: 'Maximum Number of Stereoisomers', formula: 'Maximum Isomers = 2^n', note: 'n = number of distinct asymmetric chiral carbons without internal symmetry' },
            { name: 'Specific Optical Rotation', formula: '[α]_λ^T = α / (l × c)', note: 'α = observed rotation (°), l = path length (dm), c = concentration (g/mL)' },
          ],
          bulletSummary: [
            'E-Z Nomenclature: Uses Cahn-Ingold-Prelog (CIP) priority rules based on atomic number. Z = together (high priority on same side); E = opposite.',
            'Tautomerism: Dynamic equilibrium between functional isomers involving migration of an acidic proton (e.g. keto-enol equilibrium).',
          ],
        },
        minimal: {
          headline: `${chapter} Summary`,
          cheatSheet: [
            'Structural vs Stereoisomerism (Geometrical & Optical).',
            'Enantiomers rotate light in opposite directions; Meso compounds are internally compensated.',
            'Max stereoisomers = 2^n.',
          ],
          formulas: [
            { name: 'Stereoisomers Formula', formula: 'N = 2^n', note: 'n distinct chiral centers' },
          ],
          bulletSummary: ['Chiral centers, enantiomers, diastereomers, and meso forms.'],
        },
        topper: {
          introduction: `Comprehensive organic chemical lecture analysis for ${subject}: ${chapter}. Examines constitutional connectivity isomers, restricted rotation geometrical isomers, and stereochemical optical activity.`,
          deepDive: [
            {
              title: '1. Structural Isomerism: Constitutional Variants & Mechanisms',
              timestamp: '00:00',
              content: 'Structural isomers possess identical molecular formulas but distinct atom-to-atom connectivity. Chain isomers differ in the branching of the carbon backbone (e.g., n-butane and isobutane). Position isomers maintain the skeleton but vary the placement of a functional group or substituent (e.g., propan-1-ol and propan-2-ol). Functional isomers belong to distinct homologous series with different functional groups (e.g., ethanol and dimethyl ether). Metamers differ in the distribution of alkyl groups on either side of a polyvalent heteroatom (e.g., diethyl ether and methyl propyl ether). Tautomerism involves rapid equilibrium migration of a hydrogen atom between a carbon and a heteroatom.',
              keyTakeaway: 'Functional isomers have radically different chemical properties, boiling points, and reaction profiles.',
            },
            {
              title: '2. Geometrical Isomerism: Restricted Rotation & Physical Anomalies',
              timestamp: '07:30',
              content: 'Geometrical isomerism arises when rotation around a chemical bond is prevented by a pi bond or ring system. Each unsaturated carbon must be attached to two different groups: abC=Cab or abC=Ccd. The cis-isomer features like groups on the same side of the reference plane; trans has them on opposite sides. Cis-but-2-ene has a net dipole moment (μ = 0.33 D) and boiling point 3.7°C. Trans-but-2-ene has opposing bond dipoles that cancel vectorially (μ = 0 D) and boiling point 0.9°C, but its symmetric shape allows more compact crystal packing, yielding a higher melting point (-105.6°C vs -138.9°C for cis).',
              keyTakeaway: 'Trans-isomers generally exhibit higher melting points and lower dipole moments than corresponding cis-isomers.',
            },
            {
              title: '3. Optical Isomerism, Molecular Chirality & Stereocenters',
              timestamp: '16:00',
              content: 'A molecule is chiral if it cannot be superimposed on its mirror image, which occurs in the absence of a plane of symmetry (σ) and center of inversion (i). An sp3 carbon bonded to four distinct substituents is an asymmetric stereocenter. Enantiomers rotate plane-polarized light in equal and opposite directions: dextrorotatory (d or +) rotates clockwise; levorotatory (l or -) rotates counter-clockwise. Diastereomers are non-mirror image stereoisomers having different melting points, solubilities, and specific rotations. Meso compounds contain two or more chiral carbons but possess an internal plane of symmetry (e.g., meso-tartaric acid), making them optically inactive via internal compensation.',
              keyTakeaway: 'A racemic mixture can be chemically resolved into enantiomers, whereas a meso compound cannot be resolved.',
            },
          ],
          derivations: [
            {
              title: 'Determination of Stereoisomeric Variants for Tartaric Acid',
              steps: [
                'State structural formula: HOOC-CH(OH)-CH(OH)-COOH with 2 chiral carbons',
                'Identify substituent equivalence: Both chiral carbons carry identical sets (-H, -OH, -COOH)',
                'Apply symmetry test: (2R, 3S) configuration exhibits horizontal plane of symmetry between C2 and C3',
                'Evaluate optical rotations: Upper half rotation (+θ) is cancelled by lower half (-θ) within same molecule',
                'Deduce stereoisomeric total: d-tartaric acid, l-tartaric acid, and 1 achiral meso compound (Total = 3 isomers)',
              ],
              finalResult: 'Internal compensation in meso-tartaric acid demonstrated; total stereoisomers = 3',
            },
          ],
          proTips: [
            'In CIP E-Z nomenclature, assign priorities to the two groups on EACH unsaturated carbon by atomic number: highest atomic number gets priority 1. If both priority 1 groups are on the same side, it is (Z); if opposite, it is (E).',
            'Remember: Optical activity is an experimental property measured with a polarimeter; R/S configuration is a theoretical paper-based convention. R does NOT automatically mean dextrorotatory (+).',
          ],
        },
        chatpata: {
          hinglishIntro: `Bhai dekho, Organic Chemistry Isomerism ko bilkul simple bhasha mein samjho! Formula ek hi hai, par chehre alag-alag — jaise Shaktimaan aur Gangadhar ek hi insaan hain par roop alag hai!`,
          desiAnalogies: [
            {
              concept: 'Enantiomers vs Diastereomers',
              analogy: 'Enantiomers aapke dono haath hain — mirror image hain par ek ke upar dusra rakhoge toh ungliyan match nahi karengi! Diastereomers do alag bhai hain jo mirror image bhi nahi hain aur shakal bhi thodi alag hai!',
              desiPunchline: 'Dono haath enantiomer, dost-yaar diastereomer!',
            },
            {
              concept: 'Meso Inactivity',
              analogy: 'Meso compound ek aisi gaadi hai jisme aage ka driver right modta hai aur peeche ka driver utne hi zor se left modta hai — gaadi bilkul seedhi chalti hai (net rotation zero)! Isse internal compensation bolte hain.',
              desiPunchline: 'Andar hi andar ladke zero ho gaya!',
            },
          ],
          bhaiKaSummary: [
            'Point 1: Chiral carbon matlab 4 alag-alag groups.',
            'Point 2: Meso compound optically inactive hota hai internal symmetry ki wajah se.',
          ],
          jugaadPoints: [
            'Exam trick: Unsymmetrical molecule mein agar n chiral carbons hain toh seedhe 2^n isomers formula lagao!',
          ],
        },
        chatpate: {
          hinglishIntro: `Bhai dekho, Organic Isomerism bilkul simple topic hai!`,
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Isomerism carries 4 to 6 marks in Class 11 and Class 12 Chemistry board examinations and is a frequent trap in competitive entrance tests. Questions test identifying chiral centers, distinguishing enantiomers from diastereomers, and explaining meso optical inactivity.',
          highWeightageTopics: [
            'Optical Activity, Chiral Centers & Meso Compounds (3-5 Marks)',
            'Geometrical Isomerism: Cis-Trans vs E-Z Nomenclature (2-3 Marks)',
            'Structural Isomer Drawing for Given Molecular Formula (2-3 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Why is meso-tartaric acid optically inactive even though it contains two chiral carbon atoms?',
              answer: 'Meso-tartaric acid possesses an internal plane of symmetry. The optical rotation caused by one half of the molecule is exactly balanced and cancelled by the equal and opposite optical rotation caused by the other half (internal compensation), rendering the molecule achiral and optically inactive.',
              markingScheme: ['Internal plane of symmetry mention (½ mark)', 'Internal compensation explanation (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Draw the structures of cis-but-2-ene and trans-but-2-ene. Compare their dipole moments, boiling points, and melting points with scientific reasoning.',
              answer: '1. Cis-but-2-ene: Both methyl groups are on the same side. Their bond dipole moments reinforce each other, giving a net dipole moment (μ = 0.33 D). Stronger dipole-dipole attractions lead to a higher boiling point (3.7°C).\n2. Trans-but-2-ene: Methyl groups are on opposite sides. The opposing bond dipoles cancel out vectorially, giving zero net dipole moment (μ = 0 D) and a lower boiling point (0.9°C).\n3. Melting Point: Trans-but-2-ene has a higher melting point (-105.6°C vs -138.9°C for cis) because its symmetric shape allows more compact and stable packing within the crystal lattice.',
              markingScheme: ['Structures of cis and trans (1 mark)', 'Dipole moment and boiling point comparison (1 mark)', 'Melting point crystal packing explanation (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Differentiate between the following pairs with suitable chemical examples:\n(a) Enantiomers and Diastereomers\n(b) Racemic Mixture and Meso Compound.',
              answer: '(a) Enantiomers vs Diastereomers:\n- Enantiomers are stereoisomers that are non-superimposable mirror images of each other (e.g. d-lactic acid and l-lactic acid). They have identical physical properties (m.p., b.p., density) and rotate plane-polarized light by equal angles in opposite directions.\n- Diastereomers are stereoisomers that are not mirror images of each other (e.g. cis-but-2-ene and trans-but-2-ene). They have different physical properties and different chemical reactivities.\n\n(b) Racemic Mixture vs Meso Compound:\n- Racemic mixture is an equimolar (50:50) mixture of two enantiomers. It is optically inactive due to external compensation (rotation of one enantiomer cancels the other). It can be resolved into optically active components.\n- Meso compound is a single chemical substance containing multiple chiral centers and an internal plane of symmetry. It is optically inactive due to internal compensation and cannot be separated into active enantiomers.',
              markingScheme: ['Enantiomers vs Diastereomers contrasting points with example (2.5 marks)', 'Racemic vs Meso contrasting points with compensation explanation (2.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Structural Isomerism & Connectivity', summary: 'Chain, position, functional, metamerism, and tautomeric equilibria.' },
        { time: '07:30', seconds: 450, title: 'Geometrical Isomerism & Dipoles', summary: 'Cis-trans restricted rotation, CIP E-Z rules, and melting/boiling anomalies.' },
        { time: '16:00', seconds: 960, title: 'Optical Isomerism & Meso Compounds', summary: 'Chiral centers, enantiomers, diastereomers, and internal compensation in meso forms.' },
      ],
      flashcards: [
        { id: 1, front: 'What is the condition for a molecule to show optical activity?', back: 'The molecule must be chiral, lacking a plane of symmetry (non-superimposable on mirror image).', concept: 'Stereochemistry' },
        { id: 2, front: 'Why does trans-but-2-ene have a higher melting point than cis-but-2-ene?', back: 'The symmetrical linear shape of the trans isomer allows tighter, more stable packing in the crystal lattice.', concept: 'Physical Properties' },
        { id: 3, front: 'What is the difference between internal and external compensation?', back: 'Internal compensation occurs within a single meso molecule; external compensation occurs between equimolar mixtures of two enantiomers.', concept: 'Optical Inactivity' },
      ],
      quiz: [
        {
          id: 1,
          topic: 'Organic Isomerism',
          question: 'How many optical stereoisomers exist for an unsymmetrical molecule containing 3 distinct chiral carbons?',
          options: ['8', '6', '4', '16'],
          correctIndex: 0,
          explanation: 'For n distinct chiral centers without symmetry, number of stereoisomers = 2^n = 2^3 = 8.',
        },
        {
          id: 2,
          topic: 'Organic Isomerism',
          question: 'Which of the following isomer pairs can be separated by fractional distillation due to different boiling points?',
          options: ['Diastereomers', 'Enantiomers', 'Racemic mixture components', 'Identical conformers'],
          correctIndex: 0,
          explanation: 'Diastereomers have different physical properties including boiling points and can be separated by fractional distillation.',
        },
      ],
      quickRevisionPoints: [
        'Structural isomers have different connectivity; stereoisomers have different 3D spatial arrangement.',
        'Geometrical isomerism requires restricted rotation (C=C or ring) with 2 different groups on each carbon.',
        'Trans isomers have higher melting points due to symmetric crystal packing; cis isomers have higher boiling points due to dipole moment.',
        'Enantiomers are non-superimposable mirror images with opposite optical rotation (+/-).',
        'Meso compounds have internal planes of symmetry and are optically inactive due to internal compensation.',
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
              frequentlyAskedIn: 'Curriculum Practice Question (Senior Secondary Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'A first-order reaction has a rate constant of 1.15 × 10⁻³ s⁻¹. How long will 5.0 g of this reactant take to reduce to 3.0 g?',
              answer: 'Using first-order equation: t = (2.303 / k) · log10([A]0 / [A]) = (2.303 / 1.15 × 10⁻³) · log10(5.0 / 3.0) = 2002.6 · log10(1.667) = 2002.6 · 0.2219 = 444.4 seconds.',
              markingScheme: ['Formula setup (1 mark)', 'Logarithm evaluation (1 mark)', 'Final answer with seconds unit (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (Senior Secondary Syllabus Aligned — 3 Marks)',
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
              frequentlyAskedIn: 'Curriculum Practice Question (Computer Science Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'Explain the difference between Dynamic Programming and Divide & Conquer approaches.',
              answer: '1. Divide & Conquer divides a problem into independent subproblems (e.g. MergeSort); Dynamic Programming solves problems with overlapping subproblems. 2. DP stores results in a memoization table/array to avoid redundant recomputations; D&C recomputes subproblems independently. 3. DP applies when optimal substructure and overlapping subproblems both exist.',
              markingScheme: ['Three clear contrasting points (1 mark each = 3 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (Computer Science Syllabus Aligned — 3 Marks)',
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

  // 6.8 PHYSICS — LAWS OF MOTION & NEWTONIAN DYNAMICS
  const isLawsOfMotion = 
    cLower.includes('motion') || 
    cLower.includes('newton') || 
    cLower.includes('inertia') || 
    cLower.includes('momentum') || 
    cLower.includes('friction') ||
    cLower.includes('banking');

  if (isLawsOfMotion) {
    return {
      content: {
        quick: {
          headline: `${chapter} — Newton's Laws, Momentum, Friction & Banking Formula Sheet`,
          cheatSheet: [
            'Newton\'s 1st Law (Inertia): A body remains at rest or in uniform motion unless acted upon by a net external force; mass is the measure of inertia.',
            'Newton\'s 2nd Law (Force): Net force equals time rate of change of momentum: F = dp/dt = m(dv/dt) = ma (for constant mass m).',
            'Newton\'s 3rd Law (Action-Reaction): Every action has an equal and opposite reaction (F_AB = -F_BA); they act on two different bodies and never cancel.',
            'Impulse-Momentum Theorem: J = ∫ F dt = F_avg · Δt = Δp = m(v - u); area under F-t graph equals impulse.',
            'Friction Laws: Static friction is self-adjusting (0 ≤ fs ≤ μs N); Kinetic friction opposes sliding (fk = μk N); μk < μs.',
            'Road Banking: Optimum speed without friction v = √(rg tan θ); maximum speed with friction v_max = √[rg(μs + tan θ) / (1 - μs tan θ)].',
          ],
          formulas: [
            { name: 'Newton\'s Second Law', formula: 'F = dp/dt = m a', note: 'SI unit is Newton (N) = kg·m/s²; vector formulation' },
            { name: 'Linear Momentum', formula: 'p = m v', note: 'Vector in direction of velocity; conserved when F_ext = 0' },
            { name: 'Impulse of a Force', formula: 'J = F_avg · Δt = Δp = m v - m u', note: 'Area under Force-time curve gives impulse' },
            { name: 'Limiting Static Friction', formula: 'fs_max = μs · N', note: 'N = normal reaction; independent of apparent contact area' },
            { name: 'Kinetic Friction', formula: 'fk = μk · N', note: 'Constant opposing force during relative sliding' },
            { name: 'Optimum Road Banking Angle', formula: 'tan θ = v² / (r g) => v_opt = √(r g tan θ)', note: 'Zero lateral friction wear on tires at design speed' },
          ],
          bulletSummary: [
            'Newton\'s 2nd law is the fundamental law of motion (1st and 3rd laws can be derived from it).',
            'Action and reaction never act on the same body.',
            'Friction depends on roughness of surfaces and normal reaction, NOT on apparent contact area.',
          ],
        },
        minimal: {
          headline: `${chapter} Summary Card`,
          cheatSheet: [
            'F = ma (Newton\'s 2nd law).',
            'J = F · Δt = Δp (Impulse = Change in momentum).',
            'Action = -Reaction (Act on different bodies).',
            'fs ≤ μs N (Static friction) and fk = μk N (Kinetic friction).',
            'tan θ = v² / (rg) (Road banking angle).',
          ],
          formulas: [
            { name: 'Force Equation', formula: 'F = m a', note: 'Second law' },
            { name: 'Impulse Formula', formula: 'J = Δp', note: 'Impulse-momentum' },
          ],
          bulletSummary: [
            'Inertia depends strictly on mass.',
            'Momentum is conserved when net external force is zero.',
          ],
        },
        topper: {
          introduction: `Comprehensive analytical lecture synthesis for ${subject}: ${chapter}. Structured in alignment with CBSE, state boards, JEE Main, and university physics curriculum.`,
          deepDive: [
            {
              title: 'Galileo\'s Inertia Principle & Newton\'s First and Second Laws',
              timestamp: '02:00',
              content: 'Galileo deduced through double inclined plane experiments that a body in motion on a frictionless horizontal plane continues indefinitely without an external force, dismantling Aristotle\'s fallacy. Newton formalized this as the First Law of Motion: Inertia is the natural property of matter resisting changes in velocity. Newton\'s Second Law defines force quantitatively: Net external force equals the time rate of change of linear momentum: F = dp/dt. Since p = mv: F = d(mv)/dt = m(dv/dt) + v(dm/dt). For systems of constant mass (dm/dt = 0), this simplifies to F = ma. In SI units, 1 Newton is defined as the force which accelerates a 1 kg mass by 1 m/s².',
              keyTakeaway: 'Force is not required to maintain motion, but to CHANGE velocity; Second Law is a vector equation holding component-wise: Fx = m ax, Fy = m ay, Fz = m az.',
            },
            {
              title: 'Impulse, Third Law, and Conservation of Linear Momentum',
              timestamp: '11:00',
              content: 'When a large force acts for a brief duration Δt, the product F_avg · Δt is called Impulse J. Integrating Newton\'s second law: J = ∫ F dt = Δp = mv - mu. Newton\'s Third Law states that forces in nature always occur in matched action-reaction pairs: F_AB = -F_BA. Action and reaction occur simultaneously on two distinct interacting bodies. From the Second and Third Laws, in an isolated two-body system: F_12 = dp1/dt and F_21 = dp2/dt. Since F_12 + F_21 = 0: d(p1 + p2)/dt = 0, proving that total linear momentum is strictly conserved whenever net external force is zero.',
              keyTakeaway: 'Action and reaction forces can never cancel each other out because they act on different bodies.',
            },
            {
              title: 'Friction Mechanics & Circular Motion on Banked Curved Tracks',
              timestamp: '19:30',
              content: 'Friction arises from microscopic interlocking and intermolecular bonding between contacting surfaces. Static friction fs is self-adjusting in magnitude and direction up to the limiting friction value fs_max = μs N, where μs is the static friction coefficient. Once relative sliding commences, kinetic friction fk = μk N opposes motion (with μk < μs). When a vehicle negotiates a curve of radius r at velocity v, a centripetal force mv²/r directed toward the center of curvature is required. On a flat unbanked road, this force is provided solely by static friction: mv²/r ≤ μs mg, giving v_max = √(μs r g). To avoid tire wear and skidding, the outer edge of the road is banked by angle θ. Resolving normal reaction: N sin θ provides centripetal acceleration, while N cos θ balances vehicle weight mg. Dividing gives: tan θ = v² / (rg), yielding the ideal banking design speed v_opt = √(rg tan θ).',
              keyTakeaway: 'At the optimum banking speed v = √(rg tan θ), the vehicle can round the curve safely even if the road is completely frictionless (ice).',
            },
          ],
          derivations: [
            {
              title: 'Derivation of Optimum Road Banking Angle & Maximum Safe Speed',
              steps: [
                'Consider a vehicle of mass m negotiating a curve of radius r banked at angle θ to the horizontal.',
                'The forces acting on the vehicle are: (1) Weight mg acting vertically downward, (2) Normal reaction N perpendicular to the inclined banked surface, and (3) Friction force f directed along the inclined surface.',
                'Resolve Normal reaction into components: N cos θ vertically upward, and N sin θ horizontally toward the center of the curve.',
                'Resolve Friction f into components: f cos θ horizontally toward the center, and f sin θ vertically downward.',
                'Vertical equilibrium condition: N cos θ = mg + f sin θ => mg = N cos θ - f sin θ.',
                'Centripetal horizontal force condition: N sin θ + f cos θ = m v² / r.',
                'Case 1: At optimum design speed v_opt, no lateral frictional force is called into play (f = 0). Thus: N cos θ = mg and N sin θ = m v² / r.',
                'Dividing the two equations: (N sin θ) / (N cos θ) = (m v² / r) / (mg) => tan θ = v² / (r g).',
                'Therefore, optimum banking speed: v_opt = √(r g tan θ).',
                'Case 2: For maximum safe speed v_max before outward skidding, friction reaches its limiting value f = μs N. Dividing equations yields: v_max = √[ r g (μs + tan θ) / (1 - μs tan θ) ]. (Q.E.D.)',
              ],
              finalResult: 'tan θ = v² / (r g)  and  v_max = √[ r g (μs + tan θ) / (1 - μs tan θ) ]',
            },
          ],
          proTips: [
            'Newton\'s Second Law is the fundamental law of motion from which both 1st and 3rd laws can be derived.',
            'Action and reaction forces act on TWO DIFFERENT bodies simultaneously and never cancel.',
          ],
        },
        chatpata: {
          hinglishIntro: 'Bhai suno, Physics me Newton Baba ke teen niyam poori duniya ko govern karte hain — Laws of Motion ka asli desi funda!',
          desiAnalogies: [
            {
              concept: 'Inertia of Rest & Motion',
              analogy: 'Socho Sunday ki subah rajai ke andar sona — bina mummy ki daant (external force) ke koi hilna nahi chahta! Wahi hai Inertia of Rest!',
              desiPunchline: 'Alas hi Inertia hai boss!',
            },
            {
              concept: 'Impulse of a Force (Catching a Ball)',
              analogy: 'Cricket fielder catch pakadte waqt haath peeche kheenchta hai taaki contact time Δt badh jaye aur haath pe jhatka (force F = Δp/Δt) kam lage!',
              desiPunchline: 'Time badhao, chot kam khao!',
            },
          ],
          bhaiKaSummary: [
            'F = ma (Newton ka 2nd law).',
            'Action = -Reaction (Alag alag bodies par lagte hain).',
            'Impulse J = F · Δt = Δp.',
          ],
          jugaadPoints: [
            'Elevator upar jaye toh N = m(g + a), neeche jaye toh N = m(g - a)!',
          ],
        },
        chatpate: {
          hinglishIntro: 'Bhai suno, Laws of Motion bilkul dynamic scoring chapter hai!',
          desiAnalogies: [],
          bhaiKaSummary: [],
          jugaadPoints: [],
        },
        exam: {
          trendAnalysis: 'Laws of Motion carries 7 to 9 marks in CBSE Class 11 and JEE examinations. Critical topics include Free Body Diagrams (FBD), apparent weight in elevators, impulse-momentum theorem, and banked curves.',
          highWeightageTopics: [
            'Derivation of Optimum Banking of Curved Road (5 Marks)',
            'Impulse-Momentum Theorem & Cricket Catch Application (3 Marks)',
            'Apparent Weight in Elevator Problems (3 Marks)',
          ],
          questions: [
            {
              id: 1,
              marks: 1,
              question: 'Why does a cricket player draw his hands backwards while catching a fast-moving cricket ball?',
              answer: 'According to the Impulse-Momentum Theorem, Impulse J = F_avg · Δt = Δp. By drawing hands backwards, the player increases the time of contact Δt required to bring the ball to rest. Since the momentum change Δp is constant, increasing Δt significantly reduces the average impulsive force F exerted on the hands, preventing pain or injury.',
              markingScheme: ['Impulse formula / statement (½ mark)', 'Explanation of increasing time reduces force (½ mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
            },
            {
              id: 2,
              marks: 3,
              question: 'A body of mass 10 kg is placed on a rough horizontal surface having coefficient of static friction μs = 0.4 and coefficient of kinetic friction μk = 0.3. A horizontal force of 30 N is applied on the body. Determine: (a) limiting static friction, (b) actual friction force acting on the body, and (c) acceleration of the body (take g = 10 m/s²).',
              answer: '(a) Limiting static friction fs_max = μs N = μs (mg) = 0.4 × (10 × 10) = 40 N.\n(b) Since the applied horizontal force F = 30 N is less than fs_max (40 N), the body does not move. Static friction is self-adjusting; hence the actual friction force equals the applied force: fs = 30 N.\n(c) Since the body remains at rest in static equilibrium, its acceleration is strictly zero (a = 0 m/s²).',
              markingScheme: ['Limiting friction calculation fs = 40 N (1 mark)', 'Self-adjusting friction fs = 30 N (1 mark)', 'Zero acceleration deduction (1 mark)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT Exemplar Aligned — 3 Marks)',
            },
            {
              id: 3,
              marks: 5,
              question: 'Derive an expression for the optimum banking speed and maximum safe speed of a car on a curved road of radius r banked at angle θ having coefficient of friction μs. What happens when the banking speed is exceeded on a frictionless road?',
              answer: 'Resolving forces: N cos θ = mg + f sin θ and N sin θ + f cos θ = mv²/r.\nAt optimum speed v_opt, friction f = 0. Dividing gives: tan θ = v_opt² / (rg) => v_opt = √(rg tan θ).\nFor maximum safe speed, f = μs N. Dividing equations yields v_max = √[rg(μs + tan θ) / (1 - μs tan θ)].\nOn a frictionless road (μs = 0), if speed exceeds v_opt, N sin θ becomes insufficient to provide the necessary centripetal force mv²/r, causing the car to skid upward and outward over the banked road.',
              markingScheme: ['Diagram and force resolution (2 marks)', 'Derivation of optimum speed (1.5 marks)', 'Derivation of maximum safe speed (1.5 marks)'],
              frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
            },
          ],
        },
      },
      timestamps: [
        { time: '00:00', seconds: 0, title: 'Galileo\'s Inertia & First Law', summary: 'Galileo inclined plane experiments, definition of inertia, mass as measure of inertia, and Newton\'s First Law.' },
        { time: '07:15', seconds: 435, title: 'Second Law & Impulse Theorem', summary: 'Derivation of F = ma from F = dp/dt and impulse-momentum theorem with cricket catch application.' },
        { time: '15:45', seconds: 945, title: 'Third Law & Momentum Conservation', summary: 'Action-reaction pairs on two different bodies and proof of conservation of linear momentum.' },
        { time: '23:30', seconds: 1410, title: 'Friction & Banked Road Dynamics', summary: 'Static vs kinetic friction, free body diagrams, and derivation of optimum banking angle tan θ = v²/(rg).' },
      ],
      flashcards: [
        { id: 1, front: 'State Newton\'s Second Law of Motion in mathematical form.', back: 'F = dp/dt = d(mv)/dt = ma (for constant mass m). Net external force equals the rate of change of momentum.', concept: 'Laws of Motion' },
        { id: 2, front: 'Why do action and reaction forces not cancel each other out?', back: 'Because action and reaction forces act simultaneously on TWO DIFFERENT bodies, never on the same body.', concept: 'Third Law' },
        { id: 3, front: 'What is the formula for the optimum banking angle of a curved road?', back: 'tan θ = v² / (r g), giving optimum speed v = √(r g tan θ) where tire friction is zero.', concept: 'Circular Motion' },
        { id: 4, front: 'What is the reading of a spring balance for a person of mass m in an elevator ascending with acceleration a?', back: 'N = m(g + a). Apparent weight increases due to upward inertial reaction.', concept: 'Elevator Dynamics' },
      ],
      quiz: [
        {
          id: 1,
          question: 'A force of 5 N acts on a body of mass 2 kg at rest for 4 seconds. What is the final momentum of the body?',
          options: ['10 kg·m/s', '20 kg·m/s', '40 kg·m/s', '80 kg·m/s'],
          correctIndex: 1,
          explanation: 'Impulse J = F · Δt = 5 N × 4 s = 20 N·s = 20 kg·m/s. Since initial momentum is 0, final momentum = 20 kg·m/s.',
          topic: 'Impulse and Momentum',
        },
        {
          id: 2,
          question: 'Action and reaction forces:',
          options: ['Act on the same body', 'Act on different bodies', 'Act along different directions at an angle', 'Cancel each other to produce equilibrium'],
          correctIndex: 1,
          explanation: 'Newton\'s Third Law explicitly specifies that action and reaction act on two different bodies simultaneously.',
          topic: 'Newton\'s Third Law',
        },
        {
          id: 3,
          question: 'What is the maximum safe speed for a car rounding an unbanked circular curve of radius 40 m if μs = 0.4 (g = 10 m/s²)?',
          options: ['12.6 m/s', '16 m/s', '4 m/s', '8 m/s'],
          correctIndex: 0,
          explanation: 'v_max = √(μs · r · g) = √(0.4 × 40 × 10) = √160 ≈ 12.65 m/s.',
          topic: 'Circular Motion on Flat Roads',
        },
      ],
      quickRevisionPoints: [
        'Inertia resists changes in state of motion; mass is the measure of inertia.',
        'F = dp/dt = ma (Newton\'s 2nd law).',
        'Impulse J = F_avg · Δt = Δp = m(v - u).',
        'Action = -Reaction (Act simultaneously on different bodies).',
        'Static friction fs is self-adjusting: 0 ≤ fs ≤ μs N; Kinetic friction fk = μk N.',
        'Road banking angle: tan θ = v² / (rg); optimum speed v = √(rg tan θ).',
        'Elevator apparent weight: N = m(g + a) ascending; N = m(g - a) descending.',
      ],
    };
  }

  // 7. PHYSICS & THERMODYNAMICS (Strictly for Thermodynamics, Heat Engines, Carnot Cycle)
  const isThermodynamics = 
    cLower.includes('thermo') || 
    cLower.includes('carnot') || 
    cLower.includes('heat engine') ||
    cLower.includes('first law of thermo') ||
    cLower.includes('calorimetr');

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

  // 8. DYNAMIC GENERAL SYLLABUS SYNTHESIZER
  const disciplineFormulas = sLower.includes('phys') ? [
    { name: `${chapter} Conservation & Force Balance`, formula: 'Σ F_ext = dP/dt | W_net = ΔK', note: 'SI Units: Force [N], Energy [J]; verify inertial frame reference' },
    { name: 'Conservation of Total Mechanical Energy', formula: 'E_total = K + U = constant', note: 'Holds in isolated systems under conservative forces' },
    { name: 'Wave & Frequency Relation', formula: 'v = f · λ', note: 'Wave velocity = frequency × wavelength' },
  ] : sLower.includes('chem') ? [
    { name: `${chapter} Equilibrium Quotient`, formula: 'Q = [Products]^c / [Reactants]^d', note: 'Concentrations in mol/L; compare Q with K_eq for reaction direction' },
    { name: 'Gibbs Free Energy & Spontaneity', formula: 'ΔG = ΔH - T ΔS', note: 'Reaction is spontaneous when ΔG < 0 at temperature T in Kelvin' },
    { name: 'Ideal Gas State Relation', formula: 'P V = n R T', note: 'Universal gas constant R = 8.314 J/(mol·K)' },
  ] : sLower.includes('math') ? [
    { name: `${chapter} Governing Functional Relation`, formula: 'y = f(x) subject to domain constraints and boundary conditions', note: 'Verify existence, continuity, and boundary constraints' },
    { name: 'Fundamental Limit Definition of Derivative', formula: "lim_{h→0} [f(x+h) - f(x)] / h = f'(x)", note: 'Defines instantaneous rate of change and tangent slope' },
    { name: 'Mathematical Domain Validity Identity', formula: 'Domain: {x ∈ ℝ | f(x) is defined and real}', note: 'Preserves mathematical real-valued constraints' },
  ] : (sLower.includes('account') || sLower.includes('econo') || sLower.includes('commerc')) ? [
    { name: 'Fundamental Accounting Balance Equation', formula: "Assets = Liabilities + Owner's Equity (Capital)", note: 'Dual-aspect accounting convention holds across every transaction' },
    { name: 'National Income Aggregate Expenditure Identity', formula: 'Y = C + I + G + (X - M)', note: 'Expenditure approach to macroeconomic national output' },
    { name: 'Operating Margin Formulation', formula: 'Operating Profit = Net Revenue - Operating Expenses', note: 'Measures core earnings efficiency' },
  ] : sLower.includes('bio') ? [
    { name: 'Physiological Balance Relation', formula: 'Total Functional Capacity = Σ (Component Functional Volumes)', note: 'Homeostatic balance under standard physiological conditions' },
    { name: 'Michaelis-Menten Enzymatic Rate', formula: 'v = (Vmax · [S]) / (Km + [S])', note: 'Relates substrate concentration [S] to reaction velocity v' },
  ] : [
    { name: 'Fundamental Conservation Balance', formula: 'Inflow + Generation = Outflow + Accumulation', note: 'Universal balance equation across system boundaries' },
    { name: 'Steady-State Equilibrium Condition', formula: 'd(State Variable) / dt = 0', note: 'Defines steady state with time-invariant properties' },
  ];

  return {
    content: {
      quick: {
        headline: `${subject}: ${chapter} — Key Revision & Exam Essentials`,
        cheatSheet: [
          `Fundamental Premise: Master the primary definitions, governing principles, and analytical rules of ${chapter}.`,
          `System Boundaries: Always verify baseline conditions, initial states, and contextual limits before computing solutions.`,
          `High-Yield Marking Criteria: State full definitions, cite standard theorems, and preserve step-by-step logic.`,
          `High-Frequency Trap: Never omit proper dimensional units or skip defining variable notations used in derivations.`,
        ],
        formulas: disciplineFormulas,
        bulletSummary: [
          `Core concepts in ${chapter} form the prerequisite foundation for advanced exam questions.`,
          'Always illustrate your written answers with clean, labeled diagrams and explicit formula statements.',
        ],
      },
      minimal: {
        headline: `${chapter} Summary`,
        cheatSheet: [
          `Key concept: Core governing rules in ${chapter}.`,
          'Standard definitions and analytical limits.',
        ],
        formulas: disciplineFormulas.slice(0, 2),
        bulletSummary: [`Essential conceptual takeaways for ${chapter}.`],
      },
      topper: {
        introduction: `Comprehensive analytical lecture synthesis for ${subject}: ${chapter}. Structured in alignment with CBSE, university curriculum, and competitive entrance examination standards.`,
        deepDive: [
          {
            title: `1. Foundational Theory & Conceptual Scope of ${chapter}`,
            timestamp: '02:15',
            content: `The lecture develops foundational principles, definitions, and boundary limits governing ${chapter}. Students are introduced to core mechanisms, qualitative reasoning models, and rigorous conceptual hierarchies.`,
            keyTakeaway: 'Always define core terminology clearly and establish baseline assumptions before setting up mathematical or logical steps.',
          },
          {
            title: `2. Systematic Formulation & Detailed Analysis in ${chapter}`,
            timestamp: '14:30',
            content: `Detailed examination of governing relationships, derivations, and step-by-step analytical methods. Connects fundamental theory with practical problem-solving strategies and exam rubrics.`,
            keyTakeaway: 'Organize derivations with clear step headers, highlighting final expressions in boxed format to secure full presentation marks.',
          },
        ],
        derivations: [
          {
            title: `Systematic Derivation of Governing Relations in ${chapter}`,
            steps: [
              `State baseline governing equation and foundational definitions for ${chapter}`,
              'Establish system boundary conditions and constraint equations',
              'Perform step-by-step algebraic/calculus transformation to eliminate intermediate variables',
              'Verify dimensional consistency and state final governing result',
            ],
            finalResult: `Core analytical theorem for ${chapter} established with dimensional consistency`,
          },
        ],
        proTips: [
          'In descriptive questions, begin with an unambiguous two-line definition and cite the governing law explicitly.',
          'Always double-check units, signs, and physical or logical consistency in final calculated results.',
        ],
      },
      chatpata: {
        hinglishIntro: `Bhai dekho, ${subject} mein ${chapter} ko bilkul simple Hinglish mein samajhte hain! Yeh super-important topic hai aur iske fundamentals ek baar dimaag mein fit ho gaye toh marks pakke hain.`,
        desiAnalogies: [
          {
            concept: `${chapter} Core Foundation`,
            analogy: `Jaise daily life mein balance aur clear rules hote hain, waise hi ${subject} mein ${chapter} exact relationships follow karta hai. Bas step-by-step concepts yaad rakho!`,
            desiPunchline: `Fundamentals strong toh exam tension zero!`,
          },
          {
            concept: `Exam Trap in ${chapter}`,
            analogy: `Examiner hamesha boundary values aur units mein ghumane ki koshish karta hai — jaise bowling mein yorker aati hai. Question ko dhyan se padho aur basics se solve karo.`,
            desiPunchline: `Hadhbadi mein gadbadi mat karna!`,
          },
        ],
        bhaiKaSummary: [
          `Point 1: ${chapter} ki main definitions aur formulas ko tips pe rakho.`,
          `Point 2: Step-by-step derivation mein har step ka reason likhna mat bhoolna.`,
        ],
        jugaadPoints: [
          `Exam mein full marks ke liye definition ke saath labeled diagram zaroor draw karna!`,
        ],
      },
      chatpate: {
        hinglishIntro: `Bhai dekho, ${chapter} bilkul simple hai! Yeh ${subject} ka essential topic hai.`,
        desiAnalogies: [],
        bhaiKaSummary: [],
        jugaadPoints: [],
      },
      exam: {
        trendAnalysis: `Comprehensive syllabus analysis for ${subject}: ${chapter}. Identifies high-weightage topics, recurring question patterns, and marking schemes.`,
        highWeightageTopics: [
          `Core definitions and conceptual principles of ${chapter} (2 Marks)`,
          `Step-by-step derivation and formulation proof (3-5 Marks)`,
          `Practical application and numerical evaluation (3 Marks)`,
        ],
        questions: [
          {
            id: 1,
            marks: 1,
            question: `State the primary governing principle of ${chapter} and mention its fundamental significance.`,
            answer: `The primary principle establishes the fundamental relationship governing systems in ${chapter}, serving as the baseline for quantitative evaluation.`,
            markingScheme: ['Accurate definition (½ mark)', 'Statement of significance/units (½ mark)'],
            frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 1 Mark)',
          },
          {
            id: 2,
            marks: 3,
            question: `Explain the core mechanism or derivation of ${chapter} with suitable mathematical expressions and boundary conditions.`,
            answer: `State the governing relation, apply boundary constraints, integrate or transform the expressions across the designated range, and state the final result with proper units.`,
            markingScheme: ['Setup & initial conditions (1 mark)', 'Intermediate transformation steps (1 mark)', 'Final expression & units (1 mark)'],
            frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 3 Marks)',
          },
          {
            id: 3,
            marks: 5,
            question: `Provide a detailed analytical evaluation of ${chapter}, deriving the governing relationship and discussing its boundary conditions and practical applications.`,
            answer: `Develop the complete step-by-step formulation starting from foundational definitions, apply system constraints, prove the governing result, and state practical applications with dimensional verification.`,
            markingScheme: ['Foundational setup & definitions (1.5 marks)', 'Step-by-step mathematical/analytical development (2 marks)', 'Boundary conditions & application analysis (1.5 marks)'],
            frequentlyAskedIn: 'Curriculum Practice Question (NCERT / Board Syllabus Aligned — 5 Marks)',
          },
        ],
      },
    },
    timestamps: [
      { time: '01:30', seconds: 90, title: 'Introduction & Core Terminology', summary: `Foundational definitions and concepts of ${chapter}.` },
      { time: '12:15', seconds: 735, title: 'Mathematical Formulation & Proof', summary: 'Step-by-step derivation and analytical structure.' },
      { time: '24:40', seconds: 1480, title: 'Common Traps & Examination Rubric', summary: 'Scoring strategies, model answers, and examiner rubrics.' },
    ],
    flashcards: [
      { id: 1, front: `What is the core premise of ${chapter}?`, back: `The fundamental relationships, governing equations, and principles that define ${chapter} in ${subject}.`, concept: 'Core Principle' },
      { id: 2, front: 'What mistake do students most often make in this topic?', back: 'Skipping intermediate derivation steps and omitting proper units/dimensions in final solutions.', concept: 'Exam Trap' },
      { id: 3, front: `How should you structure answers for ${chapter} in exams?`, back: 'Start with a precise definition, provide the governing formula, sketch a clean diagram, and state units.', concept: 'Exam Strategy' },
    ],
    quiz: [
      {
        id: 1,
        question: `In ${chapter}, what is the essential prerequisite before applying governing mathematical formulations?`,
        options: ['Verifying initial system boundary conditions and assumptions', 'Ignoring intermediate variable definitions', 'Skipping units and dimensions', 'Assuming zero resistance'],
        correctIndex: 0,
        explanation: 'All governing formulations require explicit verification of baseline boundary conditions and system assumptions.',
        topic: `${chapter} Fundamentals`,
      },
      {
        id: 2,
        question: 'What is the primary factor that causes deduction in step-marking for this topic?',
        options: ['Missing physical units or incomplete intermediate steps', 'Using blue ink', 'Writing too fast', 'Double underlining'],
        correctIndex: 0,
        explanation: 'Examiner rubrics allocate dedicated marks for intermediate steps, dimensional consistency, and final units.',
        topic: 'Exam Presentation',
      },
      {
        id: 3,
        question: `How does understanding the core theory of ${chapter} benefit problem-solving?`,
        options: ['It allows direct setup of governing equations from first principles', 'It replaces the need to practice numericals', 'It eliminates boundary condition constraints', 'It guarantees zero errors without checking'],
        correctIndex: 0,
        explanation: 'Grounded comprehension of foundational theory allows students to set up problems from first principles without memorizing edge cases.',
        topic: 'Conceptual Mastery',
      },
    ],
    quickRevisionPoints: [
      `Governing principle: Foundational formulations define the core relationships in ${chapter}.`,
      'Step-marking rule: Always show full algebraic/calculus setups with units.',
      'Examination tip: Highlight final boxed answers with explicit dimensional units.',
    ],
  };
}
