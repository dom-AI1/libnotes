import { describe, it, expect, beforeEach } from 'vitest';
import { loadSavedKits, saveKitsToStorage, loadQuizAttempts, saveQuizAttempt } from '../src/services/storageService';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';
import fs from 'fs';
import path from 'path';

describe('Checkpoint 13: Local Persistence & Security Controls', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default sample study kits when storage is uninitialized', () => {
    const kits = loadSavedKits();
    expect(kits.length).toBeGreaterThanOrEqual(3);
    expect(kits[0].id).toBe('kit-thermodynamics');
  });

  it('persists newly generated study kits into local storage and retrieves them', () => {
    const customKit = {
      ...SAMPLE_STUDY_KITS[0],
      id: 'kit-custom-test-123',
      title: 'Chemistry: Thermodynamics in Reactions',
    };

    saveKitsToStorage([customKit, ...SAMPLE_STUDY_KITS]);
    const reloaded = loadSavedKits();
    expect(reloaded.length).toBe(SAMPLE_STUDY_KITS.length + 1);
    expect(reloaded[0].id).toBe('kit-custom-test-123');
  });

  it('persists quiz attempts with score, percentage and weak topics', () => {
    const attempt = {
      id: 'attempt-test-1',
      kitId: 'kit-thermodynamics',
      kitTitle: 'Thermodynamics Laws',
      timestamp: '5:00 PM',
      score: 5,
      total: 5,
      percentage: 100,
      weakTopics: [],
    };

    saveQuizAttempt(attempt);
    const attempts = loadQuizAttempts();
    expect(attempts.some(a => a.id === 'attempt-test-1')).toBe(true);
  });

  it('verifies no plaintext API keys or private secrets are committed in source files', () => {
    const srcDir = path.resolve(__dirname, '../src');
    const allFiles = fs.readdirSync(srcDir, { recursive: true }) as string[];

    allFiles.forEach((file) => {
      const fullPath = path.join(srcDir, file);
      if (fs.statSync(fullPath).isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        expect(content).not.toContain('AIzaSy'); // Google API key prefix
        expect(content).not.toContain('sk-'); // OpenAI API key prefix
        expect(content).not.toContain('super_secret');
      }
    });
  });
});

