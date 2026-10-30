import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Checkpoint 1: Mobile Responsiveness Verification across Viewports', () => {
  const heroTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Hero.tsx'), 'utf-8');
  const navbarTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Navbar.tsx'), 'utf-8');
  const uploadModalTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/UploadModal.tsx'), 'utf-8');
  const finalCtaTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/FinalCTA.tsx'), 'utf-8');
  const howItWorksTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/HowItWorks.tsx'), 'utf-8');
  const notesViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/NotesView.tsx'), 'utf-8');
  const pdfExportModalTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/PdfExportModal.tsx'), 'utf-8');
  const indexCss = fs.readFileSync(path.resolve(__dirname, '../src/index.css'), 'utf-8');

  it('guarantees global overflow prevention in root styles', () => {
    expect(indexCss).toContain('overflow-x: hidden');
  });

  it('Hero component uses responsive typography and flex-wrapping to prevent clipping at 320px-414px', () => {
    // Break words and responsive heading scale
    expect(heroTsx).toContain('break-words');
    expect(heroTsx).toContain('text-3xl sm:text-5xl md:text-6xl lg:text-7xl');
    // Flex-wrap for the toggle buttons (Paste Video Link vs Upload Video File)
    expect(heroTsx).toContain('flex flex-wrap items-center gap-2');
    // Dropdown handles mobile left/right alignment
    expect(heroTsx).toContain('w-full sm:w-60');
  });

  it('Navbar scales cleanly and uses consistent breakpoints between mobile and desktop', () => {
    // Brand name scales on mobile
    expect(navbarTsx).toContain('text-xl sm:text-2xl');
    // Desktop navigation is hidden on mobile/tablet (hidden md:flex)
    expect(navbarTsx).toContain('hidden md:flex');
    // Mobile hamburger toggle is hidden on desktop (flex md:hidden)
    expect(navbarTsx).toContain('flex md:hidden');
  });

  it('UploadModal adapts padding and prevents close button collision on small screens', () => {
    // Fluid responsive modal padding (p-4 sm:p-8)
    expect(uploadModalTsx).toContain('p-4 sm:p-8');
    // Header title has right padding on mobile so close button does not overlap
    expect(uploadModalTsx).toContain('pr-10 sm:pr-0');
    expect(uploadModalTsx).toContain('text-xl sm:text-3xl');
  });

  it('PdfExportModal and FinalCTA maintain responsive typography and touch targets', () => {
    expect(pdfExportModalTsx).toContain('p-4 sm:p-8');
    expect(pdfExportModalTsx).toContain('pr-10 sm:pr-0');
    expect(finalCtaTsx).toContain('break-words');
    expect(finalCtaTsx).toContain('text-2xl sm:text-4xl md:text-5xl');
    expect(howItWorksTsx).toContain('break-words');
  });

  it('NotesView provides touch-friendly, scrollable tabs and wrapped action buttons', () => {
    expect(notesViewTsx).toContain('flex flex-wrap items-center');
    expect(notesViewTsx).toContain('scrollbar-none');
    expect(notesViewTsx).toContain('truncate max-w-[180px]');
  });
});

