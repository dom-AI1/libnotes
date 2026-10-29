import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { loadQuizAttempts, saveQuizAttempt } from '../src/services/storageService';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';

describe('Feature Enhancements: Polish & Edge Cases', () => {
  const uploadModalSrc = fs.readFileSync(path.resolve(__dirname, '../src/components/UploadModal.tsx'), 'utf-8');
  const heroSrc = fs.readFileSync(path.resolve(__dirname, '../src/components/Hero.tsx'), 'utf-8');
  const notesViewSrc = fs.readFileSync(path.resolve(__dirname, '../src/components/NotesView.tsx'), 'utf-8');
  const dashboardViewSrc = fs.readFileSync(path.resolve(__dirname, '../src/components/DashboardView.tsx'), 'utf-8');
  const appSrc = fs.readFileSync(path.resolve(__dirname, '../src/App.tsx'), 'utf-8');

  it('attaches drag-and-drop event handlers to the upload modal dropzone', () => {
    expect(uploadModalSrc).toContain('onDragOver={handleDragOver}');
    expect(uploadModalSrc).toContain('onDragLeave={handleDragLeave}');
    expect(uploadModalSrc).toContain('onDrop={handleDrop}');
    expect(uploadModalSrc).toContain('isDragging');
  });

  it('supports outside-click dismissal on the hero note style dropdown', () => {
    expect(heroSrc).toContain('fixed inset-0');
    expect(heroSrc).toContain('setIsStyleDropdownOpen(false)');
  });

  it('connects quiz review to keyword filtering in notes view', () => {
    expect(notesViewSrc).toContain('onReviewTopic={(topic) => {');
    expect(notesViewSrc).toContain('setSearchQuery(topic)');
    expect(notesViewSrc).toContain('Filtering notes for concept');
  });

  it('computes real dynamic metrics for dashboard from quiz attempts', () => {
    expect(dashboardViewSrc).toContain('loadQuizAttempts');
    expect(dashboardViewSrc).toContain('uniqueWeakTopics');
    expect(dashboardViewSrc).toContain('availableSubjects');

    const attempts = loadQuizAttempts();
    expect(attempts.length).toBeGreaterThanOrEqual(1);

    const testAttempt = {
      id: 'test-attempt-polish',
      kitId: 'kit-thermodynamics',
      kitTitle: 'Thermodynamics',
      timestamp: 'Just now',
      score: 5,
      total: 5,
      percentage: 100,
      weakTopics: [],
    };
    saveQuizAttempt(testAttempt);
    const updatedAttempts = loadQuizAttempts();
    expect(updatedAttempts.some((a) => a.id === 'test-attempt-polish')).toBe(true);
  });

  it('supports tab deep-linking in hash routing in App.tsx', () => {
    expect(appSrc).toContain("urlParams.get('tab')");
    expect(appSrc).toContain('setNotesActiveTab');
    expect(appSrc).toContain('initialTab={notesActiveTab}');
  });

  it('handles empty search state in dashboard with a reset button', () => {
    expect(dashboardViewSrc).toContain('No study kits found');
    expect(dashboardViewSrc).toContain('Reset Filters');
  });

  it('allows user to close the upload modal via outside click, Escape key, or Cancel button', () => {
    // Backdrop click-outside dismissal
    expect(uploadModalSrc).toContain('e.target === e.currentTarget');
    expect(uploadModalSrc).toContain('e.stopPropagation()');

    // Keyboard Escape dismissal
    expect(uploadModalSrc).toContain("e.key === 'Escape'");

    // Prominent Cancel buttons (both in form and during pipeline generation)
    expect(uploadModalSrc).toContain('Cancel & Close');
    expect(uploadModalSrc).toContain('Cancel');

    // Layout uses items-start/min-h-full to prevent clipping top close button on small viewports
    expect(uploadModalSrc).toContain('min-h-full flex items-start');
  });
});

