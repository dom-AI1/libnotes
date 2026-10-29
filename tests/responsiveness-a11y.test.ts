import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Checkpoint 14: Responsiveness & Accessibility (A11y)', () => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
  const indexCss = fs.readFileSync(path.resolve(__dirname, '../src/index.css'), 'utf-8');
  const navbarTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Navbar.tsx'), 'utf-8');
  const uploadModalTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/UploadModal.tsx'), 'utf-8');
  const notesViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/NotesView.tsx'), 'utf-8');

  it('declares mobile-responsive viewport meta tag in index.html', () => {
    expect(indexHtml).toContain('name="viewport"');
    expect(indexHtml).toContain('width=device-width, initial-scale=1.0');
  });

  it('prevents unwanted horizontal scrollbar overflow in index.css', () => {
    expect(indexCss).toContain('overflow-x: hidden');
  });

  it('provides accessible aria-label attributes on icon-only and interactive buttons', () => {
    expect(navbarTsx).toContain('aria-label="NoteAI Home"');
    expect(navbarTsx).toContain('aria-label="Toggle menu"');
    expect(uploadModalTsx).toContain('aria-label="Close modal"');
    expect(notesViewTsx).toContain('aria-label="Back to home"');
  });

  it('ensures visible accessible focus rings on inputs and buttons', () => {
    expect(uploadModalTsx).toContain('focus:ring-[#79A94A]');
    expect(uploadModalTsx).toContain('focus:outline-none');
  });

  it('uses responsive grid reflows (grid-cols-1 md:grid-cols-3) to prevent horizontal overflow', () => {
    const featureCardsTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/FeatureCards.tsx'), 'utf-8');
    expect(featureCardsTsx).toContain('grid-cols-1 md:grid-cols-3');
  });
});
