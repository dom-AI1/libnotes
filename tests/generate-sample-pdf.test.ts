import { describe, it, expect } from 'vitest';
import { generateStudyKitPdf, DEFAULT_PDF_OPTIONS } from '../src/services/pdfExportService';
import { processEducationalLecture } from '../src/services/aiProcessingService';
import fs from 'fs';
import path from 'path';

describe('PDF File Generation on Disk', () => {
  it('generates a physical PDF file that can be opened and inspected on disk', async () => {
    const kit = await processEducationalLecture({
      sourceType: 'upload',
      sourceIdentifier: 'Class_12_Physics_Thermodynamics_First_Law_Heat_Engines_Carnot_Cycle.mp4',
      selectedClass: 'Class 12',
      selectedSubject: 'Physics',
      selectedStream: 'Science',
      selectedChapter: 'Thermodynamics: First Law, Heat Engines & Carnot Cycle',
      noteStyle: 'topper',
      language: 'Hinglish',
      autoDetect: false,
    });

    const doc = generateStudyKitPdf(kit, DEFAULT_PDF_OPTIONS);
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    const outputPath = path.resolve(__dirname, '../Physics_Thermodynamics_Sample.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);

    expect(fs.existsSync(outputPath)).toBe(true);
    const stats = fs.statSync(outputPath);
    expect(stats.size).toBeGreaterThan(20000); // Expect substantial real PDF > 20KB

    // Read magic header
    const fileContent = fs.readFileSync(outputPath);
    expect(fileContent.toString('utf-8', 0, 5)).toBe('%PDF-');

    // Read end of file trailer
    const trailer = fileContent.toString('utf-8', fileContent.length - 30);
    expect(trailer).toContain('%%EOF');

    console.log(`Generated physical PDF: ${outputPath} (${(stats.size / 1024).toFixed(1)} KB, ${doc.internal.pages.length - 1} pages)`);
  });
});
