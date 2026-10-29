import { describe, it, expect } from 'vitest';
import { processEducationalLecture, detectLectureMetadataFromSource } from '../src/services/aiProcessingService';
import { buildDynamicKitContent } from '../src/services/dynamicContentGenerator';
import { fetchVideoTitleFromUrl } from '../src/utils/urlValidation';

describe('Checkpoint 23: Dynamic Subject Content & External Video Link Routing', () => {
  it('generates genuine Economics notes (not Physics) when posting an Economics YouTube link', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'link',
        sourceIdentifier: 'https://www.youtube.com/watch?v=mockEcon123',
        customTopic: 'Demand and Supply Elasticity',
        autoDetect: true,
        noteStyle: 'topper',
        language: 'Hinglish',
      },
      () => {}
    );

    expect(kit.subject).toBe('Economics');
    expect(kit.stream).toBe('Commerce');
    expect(kit.title).toContain('Economics');
    
    // Crucial check: Must NOT contain hardcoded Physics thermodynamics content!
    const contentStr = JSON.stringify(kit.content);
    expect(contentStr).not.toContain('dQ = dU + dW');
    expect(contentStr).not.toContain('Carnot Engine');
    expect(contentStr).not.toContain('W = 2.303 n R T log10(V2 / V1)');

    // Must contain real Economics formulas and concepts
    expect(contentStr).toContain('Elasticity');
    expect(contentStr).toContain('Aggregate Demand');
    expect(contentStr).toContain('Investment Multiplier');
  });

  it('generates genuine History notes (not Physics) when posting a History YouTube link', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'link',
        sourceIdentifier: 'https://www.youtube.com/watch?v=mockHist456',
        customTopic: 'French Revolution and National Assembly',
        autoDetect: true,
        noteStyle: 'topper',
        language: 'English',
      },
      () => {}
    );

    expect(kit.subject).toBe('History');
    expect(kit.stream).toBe('Arts / Humanities');

    const contentStr = JSON.stringify(kit.content);
    expect(contentStr).not.toContain('dQ = dU + dW');
    expect(contentStr).toContain('Historiographical');
    expect(contentStr).toContain('Chronological');
  });

  it('generates genuine Biology notes (not Physics) when posting a Biology YouTube link', async () => {
    const kit = await processEducationalLecture(
      {
        sourceType: 'link',
        sourceIdentifier: 'https://www.youtube.com/watch?v=mockBio789',
        customTopic: 'DNA Replication & Genetics',
        autoDetect: true,
        noteStyle: 'quick',
        language: 'English',
      },
      () => {}
    );

    expect(kit.subject).toBe('Biology');
    expect(kit.stream).toBe('Science');

    const contentStr = JSON.stringify(kit.content);
    expect(contentStr).not.toContain('dQ = dU + dW');
    expect(contentStr).toContain('DNA');
    expect(contentStr).toContain('Polymerase');
  });

  it('generates genuine Computer Science notes for CS videos', () => {
    const dynamic = buildDynamicKitContent(
      'Data Structures & Algorithms',
      'Binary Search & Recursion',
      'College / B.Tech',
      'Computer Science & Engineering'
    );

    const contentStr = JSON.stringify(dynamic.content);
    expect(contentStr).not.toContain('dQ = dU + dW');
    expect(contentStr).toContain('Binary Search');
    expect(contentStr).toContain('Recursion');
    expect(contentStr).toContain('O(log n)');
  });

  it('generates genuine Mathematics notes for Math videos', () => {
    const dynamic = buildDynamicKitContent(
      'Mathematics',
      'Differential Calculus & Integration',
      'Class 12',
      'Science'
    );

    const contentStr = JSON.stringify(dynamic.content);
    expect(contentStr).not.toContain('dQ = dU + dW');
    expect(contentStr).toContain('Product Rule');
    expect(contentStr).toContain('Integration by Parts');
  });

  it('detects lecture metadata from URL query parameters or slugs', () => {
    const detectedFromQuery = detectLectureMetadataFromSource(
      'https://www.youtube.com/watch?v=abc&title=Class%2010%20Science%20Chemical%20Reactions',
      'link'
    );
    expect(detectedFromQuery.academicClass).toBe('Class 10');
    expect(detectedFromQuery.subject).toBe('Science');

    const detectedFromSlug = detectLectureMetadataFromSource(
      'https://vimeo.com/123456/photosynthesis-light-reaction',
      'link'
    );
    expect(detectedFromSlug.subject).toBe('Biology');
  });

  it('fetchVideoTitleFromUrl extracts clean query topics from URLs', async () => {
    const title = await fetchVideoTitleFromUrl('https://www.youtube.com/watch?v=xyz&topic=Macroeconomics%20GDP');
    expect(title).toBe('Macroeconomics GDP');
  });
});

