import { describe, it, expect } from 'vitest';
import {
  ACADEMIC_CURRICULUM,
  getStreamsForClass,
  getSubjectsForClassAndStream,
} from '../src/constants/curriculum';
import { processEducationalLecture, detectLectureMetadataFromSource } from '../src/services/aiProcessingService';

describe('Checkpoint 21: Indian Curriculum-Accurate Class & Stream Routing', () => {
  it('Class 10 has NO stream selection and unifies Science & SST without separate PCB', () => {
    const class10Config = ACADEMIC_CURRICULUM['Class 10'];
    expect(class10Config.hasStreams).toBe(false);

    const streams = getStreamsForClass('Class 10');
    expect(streams).toEqual([]);

    const subjects = getSubjectsForClassAndStream('Class 10');
    expect(subjects).toContain('Science');
    expect(subjects).toContain('Social Science (SST)');
    expect(subjects).toContain('Mathematics');
    expect(subjects).toContain('English');
    expect(subjects).toContain('Hindi');
    expect(subjects).toContain('Information Technology');

    // Crucial requirement: No separate Physics, Chemistry, Biology in Class 10
    expect(subjects).not.toContain('Physics');
    expect(subjects).not.toContain('Chemistry');
    expect(subjects).not.toContain('Biology');
  });

  it('Class 12 prompts for Stream: Science, Commerce, Arts / Humanities with dynamic subjects', () => {
    const class12Config = ACADEMIC_CURRICULUM['Class 12'];
    expect(class12Config.hasStreams).toBe(true);

    const streams = getStreamsForClass('Class 12');
    expect(streams).toEqual(['Science', 'Commerce', 'Arts / Humanities']);

    // 1. Science Stream
    const scienceSubjects = getSubjectsForClassAndStream('Class 12', 'Science');
    expect(scienceSubjects).toEqual([
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biology',
      'Computer Science',
      'Physical Education',
    ]);

    // 2. Commerce Stream
    const commerceSubjects = getSubjectsForClassAndStream('Class 12', 'Commerce');
    expect(commerceSubjects).toEqual([
      'Accountancy',
      'Business Studies',
      'Economics',
      'Applied Mathematics',
      'Informatics Practices',
      'English Core',
    ]);
    expect(commerceSubjects).toContain('Accountancy');
    expect(commerceSubjects).toContain('Business Studies');

    // 3. Arts / Humanities Stream
    const artsSubjects = getSubjectsForClassAndStream('Class 12', 'Arts / Humanities');
    expect(artsSubjects).toEqual([
      'History',
      'Political Science',
      'Geography',
      'Economics',
      'Psychology',
      'Sociology',
      'English Core',
    ]);
    expect(artsSubjects).toContain('History');
    expect(artsSubjects).toContain('Political Science');
  });

  it('Class 11 has identical stream choices and proper subjects', () => {
    const class11Config = ACADEMIC_CURRICULUM['Class 11'];
    expect(class11Config.hasStreams).toBe(true);

    const streams = getStreamsForClass('Class 11');
    expect(streams).toEqual(['Science', 'Commerce', 'Arts / Humanities']);

    const commerceSubjects = getSubjectsForClassAndStream('Class 11', 'Commerce');
    expect(commerceSubjects).toContain('Accountancy');
    expect(commerceSubjects).toContain('Economics');
  });

  it('College / B.Tech provides Branch / Discipline streams', () => {
    const streams = getStreamsForClass('College / B.Tech');
    expect(streams).toContain('Computer Science & Engineering');
    expect(streams).toContain('Mechanical Engineering');

    const cseSubjects = getSubjectsForClassAndStream('College / B.Tech', 'Computer Science & Engineering');
    expect(cseSubjects).toContain('Data Structures & Algorithms');
    expect(cseSubjects).toContain('Operating Systems');
  });

  it('Competitive track provides JEE and NEET targets', () => {
    const streams = getStreamsForClass('Competitive (JEE/NEET)');
    expect(streams).toEqual(['JEE (Engineering)', 'NEET (Medical)']);

    const jeeSubjects = getSubjectsForClassAndStream('Competitive (JEE/NEET)', 'JEE (Engineering)');
    expect(jeeSubjects).toContain('Mathematics');

    const neetSubjects = getSubjectsForClassAndStream('Competitive (JEE/NEET)', 'NEET (Medical)');
    expect(neetSubjects).toContain('Biology');
  });

  it('StudyKit preserves stream metadata when generated', async () => {
    const kit = await processEducationalLecture(
      {
        title: 'Accountancy: Partnership Fundamentals',
        academicClass: 'Class 12',
        stream: 'Commerce',
        subject: 'Accountancy',
        chapter: 'Partnership Fundamentals',
        noteStyle: 'topper',
        language: 'Hinglish',
        sourceType: 'link',
        sourceIdentifier: 'https://youtube.com/watch?v=sample-commerce',
      },
      () => {}
    );

    expect(kit.academicClass).toBe('Class 12');
    expect(kit.stream).toBe('Commerce');
    expect(kit.subject).toBe('Accountancy');
    expect(kit.title).toBe('Accountancy: Partnership Fundamentals');
  });

  it('AI automatically detects subject, chapter & class from uploaded voice file without asking user', async () => {
    const voiceFileName = 'WhatsApp Audio 2026-10-28 at 9.30.39 PM-esv2-50p.mp3';
    
    // User does NOT provide class, stream, subject, or chapter:
    const kit = await processEducationalLecture(
      {
        autoDetect: true,
        noteStyle: 'topper',
        language: 'Hinglish',
        sourceType: 'upload',
        sourceIdentifier: voiceFileName,
      },
      () => {}
    );

    expect(kit.autoDetected).toBe(true);
    expect(kit.subject).toBeDefined();
    expect(kit.chapter).toBeDefined();
    expect(kit.academicClass).toBeDefined();
    expect(kit.title).toContain(kit.subject);
    expect(kit.title).toContain(kit.chapter);
  });

  it('AI accurately detects specialized syllabus domains from recording metadata', () => {
    // Economics / Commerce recording
    const econMeta = detectLectureMetadataFromSource('economics_macro_lecture.mp3', 'upload');
    expect(econMeta.subject).toBe('Economics');
    expect(econMeta.stream).toBe('Commerce');
    expect(econMeta.academicClass).toBe('Class 12');

    // History recording
    const histMeta = detectLectureMetadataFromSource('harappan_civilization_history.mp3', 'upload');
    expect(histMeta.subject).toBe('History');
    expect(histMeta.stream).toBe('Arts / Humanities');

    // Class 10 SST recording (no stream)
    const class10Meta = detectLectureMetadataFromSource('Class 10 Social Science SST.mp4', 'upload');
    expect(class10Meta.academicClass).toBe('Class 10');
    expect(class10Meta.subject).toBe('Social Science (SST)');
    expect(class10Meta.stream).toBeUndefined();

    // Generic WhatsApp voice note
    const genericMeta = detectLectureMetadataFromSource('WhatsApp Audio 2026-10-28 at 9.30.39 PM-esv2-50p.mp3', 'upload');
    expect(genericMeta.subject).toBe('Physics');
    expect(genericMeta.chapter).toBe('Thermodynamics & Heat Engines');
  });
});

