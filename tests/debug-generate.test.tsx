import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

describe('Debug Generate Notes Flow', () => {
  it('renders App without throwing when clicking Generate Notes as guest', async () => {
    window.location.hash = '#/home';

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    const generateButtons = screen.getAllByRole('button', { name: /generate notes/i });
    expect(generateButtons.length).toBeGreaterThan(0);

    fireEvent.click(generateButtons[0]);

    expect(screen.queryByText(/Something went wrong/i)).toBeNull();
  });

  it('renders NotesView without crashing for all 4 note styles with generated kit', async () => {
    const { processEducationalLecture } = await import('../src/services/aiProcessingService');
    const { NotesView } = await import('../src/components/NotesView');

    const kit = await processEducationalLecture({
      title: 'Chemistry: SN1 vs SN2',
      subject: 'Chemistry',
      academicClass: 'Class 12',
      chapter: 'Haloalkanes and Haloarenes',
      noteStyle: 'topper',
      language: 'Hinglish',
      sourceType: 'link',
      sourceIdentifier: 'https://www.youtube.com/watch?v=sample-chem',
    });

    const styles: Array<'topper' | 'quick' | 'chatpata' | 'exam'> = ['topper', 'quick', 'chatpata', 'exam'];
    const tabs: Array<'full' | 'revision' | 'exam' | 'cards' | 'quiz'> = ['full', 'revision', 'exam', 'cards', 'quiz'];

    for (const style of styles) {
      for (const tab of tabs) {
        const testKit = { ...kit, noteStyle: style };
        const { unmount } = render(
          <ErrorBoundary>
            <NotesView
              kit={testKit}
              onBack={() => {}}
              onStyleChange={() => {}}
              initialTab={tab}
            />
          </ErrorBoundary>
        );

        expect(screen.queryByText(/Something went wrong/i)).toBeNull();
        unmount();
      }
    }
  });
});
