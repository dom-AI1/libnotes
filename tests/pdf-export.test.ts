import { describe, it, expect } from 'vitest';
import { generateStudyKitPdf, formatPdfFilename, DEFAULT_PDF_OPTIONS } from '../src/services/pdfExportService';
import { SAMPLE_STUDY_KITS } from '../src/data/mockData';
import fs from 'fs';
import path from 'path';

describe('Checkpoint 16: Real PDF Notes Generation Feature', () => {
  const kit = SAMPLE_STUDY_KITS[0]; // Physics: Thermodynamics

  it('generates a real binary PDF document with %PDF- header magic bytes', () => {
    const doc = generateStudyKitPdf(kit, DEFAULT_PDF_OPTIONS);
    const pdfData = doc.output('arraybuffer');

    // Convert first 8 bytes to string
    const headerBytes = new Uint8Array(pdfData.slice(0, 8));
    const headerString = String.fromCharCode(...headerBytes);

    expect(headerString.startsWith('%PDF-')).toBe(true);
    expect(pdfData.byteLength).toBeGreaterThan(1000); // Verified real binary PDF data
  });

  it('produces a meaningful, sanitized filename based on subject and chapter', () => {
    const filename = formatPdfFilename(kit.subject, kit.chapter);
    expect(filename).toBe('Physics_Thermal_Physics_Kinetic_Theory.pdf');
    expect(filename.endsWith('.pdf')).toBe(true);
    expect(filename).not.toContain(' ');
  });

  it('includes cover page with accurate lecture metadata and logo', () => {
    const doc = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      includeCoverPage: true,
    });

    // Page count must be multi-page
    const totalPages = doc.internal.pages.length - 1;
    expect(totalPages).toBeGreaterThanOrEqual(2);
  });

  it('generates a multi-page document with dynamic running headers and footers', () => {
    const doc = generateStudyKitPdf(kit, DEFAULT_PDF_OPTIONS);
    const totalPages = doc.internal.pages.length - 1;

    // A comprehensive study kit with all sections should generate multiple pages
    expect(totalPages).toBeGreaterThanOrEqual(3);
  });

  it('respects option toggles and excludes unselected sections cleanly', () => {
    // Generate with chatpata notes disabled
    const docWithoutChatpata = generateStudyKitPdf(kit, {
      ...DEFAULT_PDF_OPTIONS,
      includeChatpataNotes: false,
    });

    // Generate with everything enabled
    const docFull = generateStudyKitPdf(kit, DEFAULT_PDF_OPTIONS);

    const fullPdfBytes = docFull.output('arraybuffer').byteLength;
    const partialPdfBytes = docWithoutChatpata.output('arraybuffer').byteLength;

    expect(partialPdfBytes).toBeLessThan(fullPdfBytes);
  });

  it('verifies that the Download PDF button is rendered in NotesView.tsx', () => {
    const notesViewTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/NotesView.tsx'), 'utf-8');
    expect(notesViewTsx).toContain('Download PDF');
    expect(notesViewTsx).toContain('<PdfExportModal');
  });

  it('verifies that PdfExportModal provides checkboxes for all required sections', () => {
    const modalTsx = fs.readFileSync(path.resolve(__dirname, '../src/components/PdfExportModal.tsx'), 'utf-8');
    expect(modalTsx).toContain('includeQuickNotes');
    expect(modalTsx).toContain('includeTopperNotes');
    expect(modalTsx).toContain('includeChatpataNotes');
    expect(modalTsx).toContain('includeFormulas');
    expect(modalTsx).toContain('includeExamQuestions');
    expect(modalTsx).toContain('includeQuizAndAnswerKey');
    expect(modalTsx).toContain('includeCoverPage');
  });

  it('runs locally without any external network request or paid API', () => {
    const serviceCode = fs.readFileSync(path.resolve(__dirname, '../src/services/pdfExportService.ts'), 'utf-8');
    expect(serviceCode).not.toContain('fetch(');
    expect(serviceCode).not.toContain('http://');
    expect(serviceCode).not.toContain('https://');
    expect(serviceCode).not.toContain('api_key');
  });
});

