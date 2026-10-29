import type { AcademicClass, Subject } from '../types';

export interface StreamCurriculum {
  subjects: Subject[];
  defaultSubject: Subject;
  defaultChapter: string;
  chapterSuggestions?: Record<string, string>;
}

export interface ClassCurriculum {
  hasStreams: boolean;
  streamLabel?: string;
  streams?: Record<string, StreamCurriculum>;
  subjects?: Subject[];
  defaultSubject?: Subject;
  defaultChapter?: string;
  chapterSuggestions?: Record<string, string>;
}

export const ACADEMIC_CURRICULUM: Record<AcademicClass, ClassCurriculum> = {
  'Class 10': {
    hasStreams: false,
    subjects: [
      'Science',
      'Social Science (SST)',
      'Mathematics',
      'English',
      'Hindi',
      'Information Technology',
    ],
    defaultSubject: 'Science',
    defaultChapter: 'Chemical Reactions & Equations',
    chapterSuggestions: {
      'Science': 'Chemical Reactions & Equations',
      'Social Science (SST)': 'Nationalism in Europe & India',
      'Mathematics': 'Quadratic Equations & Arithmetic Progressions',
      'English': 'First Flight - A Letter to God',
      'Hindi': 'Kshitij - Netaji Ka Chashma',
      'Information Technology': 'Digital Documentation & Spreadsheets',
    },
  },
  'Class 11': {
    hasStreams: true,
    streamLabel: 'Choose Stream',
    streams: {
      'Science': {
        subjects: [
          'Physics',
          'Chemistry',
          'Mathematics',
          'Biology',
          'Computer Science',
          'Physical Education',
        ],
        defaultSubject: 'Physics',
        defaultChapter: 'Kinematics & Laws of Motion',
        chapterSuggestions: {
          'Physics': 'Kinematics & Laws of Motion',
          'Chemistry': 'Structure of Atom & Periodic Classification',
          'Mathematics': 'Trigonometric Functions & Complex Numbers',
          'Biology': 'Cell: The Unit of Life',
          'Computer Science': 'Python Fundamentals & Functions',
          'Physical Education': 'Changing Trends & Career in Physical Education',
        },
      },
      'Commerce': {
        subjects: [
          'Accountancy',
          'Business Studies',
          'Economics',
          'Applied Mathematics',
          'Informatics Practices',
          'English Core',
        ],
        defaultSubject: 'Accountancy',
        defaultChapter: 'Introduction to Accounting & Journal Entries',
        chapterSuggestions: {
          'Accountancy': 'Introduction to Accounting & Journal Entries',
          'Business Studies': 'Nature and Purpose of Business',
          'Economics': 'Statistics for Economics & Demand Analysis',
          'Applied Mathematics': 'Numbers, Quantification & Numerical Applications',
          'Informatics Practices': 'Introduction to Computer System & Python Basics',
          'English Core': 'The Portrait of a Lady & Hornbill Prose',
        },
      },
      'Arts / Humanities': {
        subjects: [
          'History',
          'Political Science',
          'Geography',
          'Economics',
          'Psychology',
          'Sociology',
          'English Core',
        ],
        defaultSubject: 'History',
        defaultChapter: 'Writing and City Life (Early Mesopotamia)',
        chapterSuggestions: {
          'History': 'Writing and City Life (Early Mesopotamia)',
          'Political Science': 'Constitution: Why and How? & Rights in Indian Constitution',
          'Geography': 'Geography as a Discipline & Earth Evolution',
          'Economics': 'Indian Economic Development: Pre-Independence to 1990',
          'Psychology': 'What is Psychology? & Methods of Enquiry',
          'Sociology': 'Sociology and Society & Social Institutions',
          'English Core': 'Discovering Tut: The Saga Continues',
        },
      },
    },
  },
  'Class 12': {
    hasStreams: true,
    streamLabel: 'Choose Stream',
    streams: {
      'Science': {
        subjects: [
          'Physics',
          'Chemistry',
          'Mathematics',
          'Biology',
          'Computer Science',
          'Physical Education',
        ],
        defaultSubject: 'Physics',
        defaultChapter: 'Thermodynamics & Heat Engines',
        chapterSuggestions: {
          'Physics': 'Thermodynamics & Heat Engines',
          'Chemistry': 'Electrochemistry & Chemical Kinetics',
          'Mathematics': 'Calculus, Integrals & Differential Equations',
          'Biology': 'Molecular Basis of Inheritance',
          'Computer Science': 'Data File Handling & SQL Connectivity in Python',
          'Physical Education': 'Management of Sporting Events & Biomechanics',
        },
      },
      'Commerce': {
        subjects: [
          'Accountancy',
          'Business Studies',
          'Economics',
          'Applied Mathematics',
          'Informatics Practices',
          'English Core',
        ],
        defaultSubject: 'Accountancy',
        defaultChapter: 'Partnership Fundamentals & Goodwill Valuation',
        chapterSuggestions: {
          'Accountancy': 'Partnership Fundamentals & Goodwill Valuation',
          'Business Studies': 'Principles & Functions of Management',
          'Economics': 'National Income Accounting & Government Budget',
          'Applied Mathematics': 'Matrices, Calculus & Linear Programming',
          'Informatics Practices': 'Data Handling with Pandas & SQL Joins',
          'English Core': 'The Last Lesson & Flamingo Prose',
        },
      },
      'Arts / Humanities': {
        subjects: [
          'History',
          'Political Science',
          'Geography',
          'Economics',
          'Psychology',
          'Sociology',
          'English Core',
        ],
        defaultSubject: 'History',
        defaultChapter: 'Bricks, Beads and Bones (Harappan Archaeology)',
        chapterSuggestions: {
          'History': 'Bricks, Beads and Bones (Harappan Archaeology)',
          'Political Science': 'Contemporary World Politics & Era of One-Party Dominance',
          'Geography': 'Human Geography: Nature and Scope & Population Dynamics',
          'Economics': 'Macroeconomics & Open Economy Models',
          'Psychology': 'Variations in Psychological Attributes & Self and Personality',
          'Sociology': 'The Demographic Structure of the Indian Society',
          'English Core': 'My Mother at Sixty-Six & Deep Water',
        },
      },
    },
  },
  'College / B.Tech': {
    hasStreams: true,
    streamLabel: 'Choose Branch / Discipline',
    streams: {
      'Computer Science & Engineering': {
        subjects: [
          'Data Structures & Algorithms',
          'Operating Systems',
          'Database Management (DBMS)',
          'Computer Networks',
          'Machine Learning / AI',
        ],
        defaultSubject: 'Data Structures & Algorithms',
        defaultChapter: 'Graph Traversal & Dynamic Programming',
        chapterSuggestions: {
          'Data Structures & Algorithms': 'Graph Traversal & Dynamic Programming',
          'Operating Systems': 'Process Scheduling, Mutex & Memory Virtualization',
          'Database Management (DBMS)': 'Relational Schema Normalization & ACID Transactions',
          'Computer Networks': 'TCP Congestion Control & OSI Architecture',
          'Machine Learning / AI': 'Gradient Descent & Backpropagation in Neural Networks',
        },
      },
      'Mechanical Engineering': {
        subjects: [
          'Fluid Mechanics',
          'Thermodynamics',
          'Strength of Materials',
          'Manufacturing Processes',
        ],
        defaultSubject: 'Fluid Mechanics',
        defaultChapter: 'Bernoulli Equation & Boundary Layer Theory',
      },
      'Electrical & Electronics': {
        subjects: [
          'Circuit Theory',
          'Digital Electronics',
          'Signals & Systems',
          'Control Systems',
        ],
        defaultSubject: 'Circuit Theory',
        defaultChapter: 'RLC Transients & Laplace Transform Analysis',
      },
      'Management / Business': {
        subjects: [
          'Financial Management',
          'Marketing Management',
          'Organizational Behavior',
          'Business Analytics',
        ],
        defaultSubject: 'Financial Management',
        defaultChapter: 'Capital Budgeting & Discounted Cash Flows',
      },
    },
  },
  'Competitive (JEE/NEET)': {
    hasStreams: true,
    streamLabel: 'Target Exam Track',
    streams: {
      'JEE (Engineering)': {
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        defaultSubject: 'Physics',
        defaultChapter: 'Rotational Dynamics & Torque Equilibrium',
      },
      'NEET (Medical)': {
        subjects: ['Biology', 'Physics', 'Chemistry'],
        defaultSubject: 'Biology',
        defaultChapter: 'Human Physiology & Neural Control',
      },
    },
  },
};

/**
 * Get available subjects for a given class and selected stream.
 */
export function getSubjectsForClassAndStream(
  academicClass: AcademicClass,
  stream?: string
): Subject[] {
  const config = ACADEMIC_CURRICULUM[academicClass];
  if (!config) return [];

  if (config.hasStreams && config.streams) {
    const selectedStream = stream && config.streams[stream] ? stream : Object.keys(config.streams)[0];
    return config.streams[selectedStream]?.subjects || [];
  }

  return config.subjects || [];
}

/**
 * Get available streams for a given class.
 */
export function getStreamsForClass(academicClass: AcademicClass): string[] {
  const config = ACADEMIC_CURRICULUM[academicClass];
  if (config?.hasStreams && config.streams) {
    return Object.keys(config.streams);
  }
  return [];
}

