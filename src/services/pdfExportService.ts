import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { StudyKit } from '../types';

export type ExportStyleMode = 'all' | 'chatpata' | 'quick' | 'topper' | 'exam';

export interface PdfExportOptions {
  exportMode?: ExportStyleMode;
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includeQuickNotes: boolean;
  includeTopperNotes: boolean;
  includeChatpataNotes: boolean;
  includeDefinitions: boolean;
  includeFormulas: boolean;
  includeExamQuestions: boolean;
  includeQuizAndAnswerKey: boolean;
  includeQuizResults: boolean;
  includeTimestamps: boolean;
}

export const DEFAULT_PDF_OPTIONS: PdfExportOptions = {
  exportMode: 'all',
  includeCoverPage: false,
  includeTableOfContents: false,
  includeQuickNotes: true,
  includeTopperNotes: true,
  includeChatpataNotes: true,
  includeDefinitions: true,
  includeFormulas: true,
  includeExamQuestions: true,
  includeQuizAndAnswerKey: true,
  includeQuizResults: true,
  includeTimestamps: true,
};

/**
 * Sanitizes Unicode mathematical notations, Greek characters, and emojis
 * into legible ASCII / standard Latin characters so jsPDF standard fonts
 * (Helvetica, Courier) do not corrupt them into question marks ('?').
 */
export function cleanTextForPdf(str: string): string {
  if (!str) return '';
  return str
    .replace(/η/g, 'eta')
    .replace(/Δ/g, 'Delta ')
    .replace(/γ/g, 'gamma')
    .replace(/∪/g, ' U ')
    .replace(/∩/g, ' n ')
    .replace(/∈/g, ' in ')
    .replace(/∉/g, ' not in ')
    .replace(/⊆/g, ' subset of ')
    .replace(/∅/g, 'phi (empty set)')
    .replace(/∫/g, 'Integral ')
    .replace(/≈/g, '~=')
    .replace(/≠/g, '!=')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/→/g, '->')
    .replace(/₹/g, 'Rs. ')
    .replace(/💡/g, '[Tip] ')
    .replace(/🎉/g, '')
    .replace(/✨/g, '')
    .replace(/•/g, '-')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/×/g, 'x');
}

export function formatPdfFilename(subject: string, chapter: string, mode?: ExportStyleMode): string {
  const sanitize = (str: string) =>
    (str || '')
      .replace(/[^a-zA-Z0-9_\-\s]/g, '')
      .trim()
      .replace(/\s+/g, '_');
  
  const sub = sanitize(subject) || 'Study';
  const chap = sanitize(chapter) || 'Notes';
  const modeSuffix = mode && mode !== 'all' ? `_${mode.toUpperCase()}` : '';
  return `${sub}_${chap}${modeSuffix}.pdf`;
}

/**
 * Generates a structured, print-friendly, multi-page PDF document
 * with distinct layout rules and typography tailored for Chatpata, Quick,
 * Topper, Exam, or Complete Study Kit modes.
 */
export function generateStudyKitPdf(
  kit: StudyKit,
  options: PdfExportOptions = DEFAULT_PDF_OPTIONS
): jsPDF {
  // Initialize A4 document (portrait, millimeters)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const marginX = 18;
  const contentWidth = pageWidth - marginX * 2; // 174mm

  let currentY = 20;

  // Libnotes Color Palette
  const COLOR_PRIMARY = [121, 169, 74]; // #79A94A Botanical Green
  const COLOR_TEXT_DARK = [20, 20, 20]; // #141414 Dark Charcoal
  const COLOR_MUTED = [94, 93, 87]; // #5E5D57 Muted Secondary
  const COLOR_BG_TINT = [232, 242, 220]; // #E8F2DC Soft Green Tint
  const COLOR_CARD_BG = [250, 248, 242]; // #FAF8F2 Warm Editorial Tint
  const COLOR_BORDER = [215, 213, 202]; // #D7D5CA Border

  const mode = options.exportMode || 'all';
  const tocItems: { title: string; page: number }[] = [];

  // Helper to ensure page bounds
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 22;
      return true;
    }
    return false;
  };

  // Helper to render section title with colored accent bar
  const renderSectionHeader = (title: string, accentColor = COLOR_PRIMARY, addToToc = true) => {
    checkPageBreak(22);
    if (addToToc) {
      tocItems.push({ title: cleanTextForPdf(title), page: doc.internal.pages.length - 1 });
    }

    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(marginX, currentY, 4, 7.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text(cleanTextForPdf(title), marginX + 7, currentY + 6);

    currentY += 12;
  };

  // Helper to render compact top header on Page 1 when cover page is disabled
  const renderCompactHeader = (modeLabel: string, tagline: string) => {
    // Top primary accent bar
    doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.rect(marginX, 14, contentWidth, 2, 'F');

    // Libnotes brand badge
    doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.roundedRect(marginX, 19, 22, 6, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('Libnotes', marginX + 3.5, 23.2);

    // Style mode badge
    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(modeLabel.toUpperCase(), marginX + 25, 23.2);

    // Lecture Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    const cleanTitle = cleanTextForPdf(kit.title);
    const splitTitle = doc.splitTextToSize(cleanTitle, contentWidth);
    doc.text(splitTitle, marginX, 31);
    const titleOffset = splitTitle.length * 5.5;

    // Tagline / Pedagogical description
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(tagline, marginX, 32 + titleOffset);

    // Metadata line
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const streamMeta = kit.stream ? ` (${kit.stream})` : '';
    const metaLine = `${kit.academicClass}${streamMeta} • Subject: ${kit.subject} • Chapter: ${cleanTextForPdf(kit.chapter)} • Duration: ${kit.duration}`;
    doc.text(metaLine, marginX, 37 + titleOffset);

    // Thin hairline divider
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, 40 + titleOffset, pageWidth - marginX, 40 + titleOffset);

    currentY = 46 + titleOffset;
  };

  // ==========================================
  // 1. OPTIONAL FULL COVER PAGE
  // ==========================================
  if (options.includeCoverPage) {
    doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.rect(marginX, 20, contentWidth, 3, 'F');

    doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.roundedRect(marginX, 32, 10, 10, 2, 2, 'F');
    doc.setFont('courier', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text('L', marginX + 3.2, 38.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text('Libnotes', marginX + 13, 39);

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text('EDUCATIONAL STUDY MATERIAL', marginX + 13, 44);

    doc.setFillColor(COLOR_BG_TINT[0], COLOR_BG_TINT[1], COLOR_BG_TINT[2]);
    doc.roundedRect(marginX, 60, contentWidth, 54, 4, 4, 'F');
    doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(marginX, 60, contentWidth, 54, 4, 4, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    const splitTitle = doc.splitTextToSize(cleanTextForPdf(kit.title), contentWidth - 14);
    doc.text(splitTitle, marginX + 7, 72);

    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    const streamMeta = kit.stream ? ` • ${kit.stream.toUpperCase()}` : '';
    doc.text(`${kit.academicClass.toUpperCase()}${streamMeta} • ${kit.subject.toUpperCase()}`, marginX + 7, 104);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`Duration: ${kit.duration} | Language: ${kit.language}`, marginX + 7, 109);

    autoTable(doc, {
      startY: 126,
      margin: { left: marginX, right: marginX },
      theme: 'grid',
      head: [['Specification', 'Document Value']],
      body: [
        ['Curriculum Level', `${kit.academicClass}${kit.stream ? ` (${kit.stream})` : ''}`],
        ['Subject & Chapter', `${kit.subject}: ${cleanTextForPdf(kit.chapter)}`],
        ['Selected Note Style', (options.exportMode || kit.noteStyle).toUpperCase()],
        ['Grounding Status', kit.verifiedLecture ? 'Verified Lecture Source' : 'Curriculum Syllabus Notes'],
        ['Compiled Date', kit.dateCreated || new Date().toLocaleDateString()],
        ['Document Format', 'A4 Pedagogical Study Notes'],
      ],
      headStyles: {
        fillColor: [20, 20, 20],
        textColor: [255, 255, 255],
        font: 'helvetica',
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 8.5,
        textColor: [40, 40, 40],
      },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold' },
      },
    });

    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text('Generated by Libnotes. Study notes compiled for revision.', marginX, pageHeight - 16);

    doc.addPage();
    currentY = 22;
  } else {
    // Mode-specific Page 1 Header
    if (mode === 'chatpata') {
      renderCompactHeader('Chatpata Notes', 'Creative Hinglish analogies, relatable real-world models & memorable revision tricks');
    } else if (mode === 'quick') {
      renderCompactHeader('Quick Notes', 'Notebook-style high-yield revision bullets, core equations & 10-minute recap');
    } else if (mode === 'topper') {
      renderCompactHeader('Topper Notes', 'In-depth conceptual analysis, calculus derivations, P-V indicator proofs & pro-tips');
    } else if (mode === 'exam') {
      renderCompactHeader('Exam Mode', 'Syllabus-aligned practice questions, step-by-step model answers & evaluation rubrics');
    } else {
      renderCompactHeader('Complete Study Kit', 'Comprehensive revision notes: Quick, Topper, Chatpata & Practice Questions');
    }
  }

  // ==========================================
  // SECTION RENDERERS
  // ==========================================

  // --- A. CHATPATA NOTES RENDERER ---
  const renderChatpataContent = () => {
    const chatpata = kit.content.chatpata || kit.content.chatpate;
    if (!chatpata) return;

    renderSectionHeader(mode === 'chatpata' ? 'Creative Desi Analogies & Memory Tricks' : 'Chatpata Hinglish Analogies & Memory Tricks');

    // Hinglish intro card
    if (chatpata.hinglishIntro) {
      checkPageBreak(20);
      doc.setFillColor(COLOR_CARD_BG[0], COLOR_CARD_BG[1], COLOR_CARD_BG[2]);
      doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      doc.setLineWidth(0.4);

      const introText = cleanTextForPdf(chatpata.hinglishIntro);
      const introLines = doc.splitTextToSize(introText, contentWidth - 10);
      const cardHeight = introLines.length * 4.5 + 8;
      doc.roundedRect(marginX, currentY, contentWidth, cardHeight, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.text(introLines, marginX + 5, currentY + 5.5);
      currentY += cardHeight + 8;
    }

    // Desi Analogies
    if (chatpata.desiAnalogies && chatpata.desiAnalogies.length > 0) {
      chatpata.desiAnalogies.forEach((item) => {
        checkPageBreak(30);

        // Analogy Box
        doc.setFillColor(254, 252, 247);
        doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.setLineWidth(0.4);

        const cleanConcept = cleanTextForPdf(item.concept);
        const cleanAnalogy = cleanTextForPdf(item.analogy);
        const cleanPunchline = cleanTextForPdf(item.desiPunchline);

        const analogyLines = doc.splitTextToSize(cleanAnalogy, contentWidth - 10);
        const punchlineLines = doc.splitTextToSize(`[Tip] Punchline: ${cleanPunchline}`, contentWidth - 12);
        const totalBoxHeight = 10 + analogyLines.length * 4.2 + punchlineLines.length * 4.2 + 8;

        doc.roundedRect(marginX, currentY, contentWidth, totalBoxHeight, 2, 2, 'FD');

        // Concept Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        doc.text(`Concept: ${cleanConcept}`, marginX + 5, currentY + 6);

        // Analogy Narrative
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(50, 50, 50);
        doc.text(analogyLines, marginX + 5, currentY + 11);

        // Highlighted Punchline Box
        const punchlineY = currentY + 12 + analogyLines.length * 4.2;
        doc.setFillColor(COLOR_BG_TINT[0], COLOR_BG_TINT[1], COLOR_BG_TINT[2]);
        doc.roundedRect(marginX + 4, punchlineY - 2, contentWidth - 8, punchlineLines.length * 4.2 + 4, 1.5, 1.5, 'F');

        doc.setFont('courier', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.text(punchlineLines, marginX + 6, punchlineY + 2);

        currentY += totalBoxHeight + 6;
      });
    }

    // Bhai Ka Summary & Jugaad
    if (chatpata.bhaiKaSummary && chatpata.bhaiKaSummary.length > 0) {
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.text('Key Desi Takeaways (Bhai Ka Summary)', marginX, currentY);
      currentY += 5;

      chatpata.bhaiKaSummary.forEach((point) => {
        checkPageBreak(12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        const ptLines = doc.splitTextToSize(`-> ${cleanTextForPdf(point)}`, contentWidth - 4);
        doc.text(ptLines, marginX + 2, currentY);
        currentY += ptLines.length * 4.2 + 2;
      });
      currentY += 4;
    }

    if (chatpata.jugaadPoints && chatpata.jugaadPoints.length > 0) {
      checkPageBreak(25);
      doc.setFont('courier', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text('Fast Exam Recognition (Jugaad Points):', marginX, currentY);
      currentY += 5;

      chatpata.jugaadPoints.forEach((jugaad) => {
        checkPageBreak(12);
        doc.setFont('courier', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        const jLines = doc.splitTextToSize(`* ${cleanTextForPdf(jugaad)}`, contentWidth - 4);
        doc.text(jLines, marginX + 2, currentY);
        currentY += jLines.length * 4 + 2;
      });
      currentY += 6;
    }
  };

  // --- B. QUICK NOTES RENDERER ---
  const renderQuickContent = () => {
    const quick = kit.content.quick || kit.content.minimal;
    if (!quick) return;

    renderSectionHeader(mode === 'quick' ? 'High-Yield Revision Bullets' : 'Quick Revision & High-Yield Bullets');

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const subHeadline = doc.splitTextToSize(cleanTextForPdf(quick.headline), contentWidth);
    doc.text(subHeadline, marginX, currentY);
    currentY += subHeadline.length * 4.8 + 4;

    // Revision Bullets with Circular Badges
    quick.cheatSheet.forEach((bullet, bIdx) => {
      checkPageBreak(14);

      doc.setFillColor(COLOR_BG_TINT[0], COLOR_BG_TINT[1], COLOR_BG_TINT[2]);
      doc.circle(marginX + 2.5, currentY - 1.2, 2.5, 'F');
      doc.setFont('courier', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(`${bIdx + 1}`, marginX + 1.6, currentY - 0.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      const lines = doc.splitTextToSize(cleanTextForPdf(bullet), contentWidth - 10);
      doc.text(lines, marginX + 8, currentY);
      currentY += lines.length * 4.5 + 3.5;
    });

    currentY += 4;
  };

  // --- C. FORMULAS TABLE RENDERER ---
  const renderFormulasContent = () => {
    const quick = kit.content.quick || kit.content.minimal;
    if (!quick || !quick.formulas || quick.formulas.length === 0) return;

    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text('Key Formulas & Governing Equations Table', marginX, currentY);
    currentY += 4;

    const formulaRows = quick.formulas.map((f) => [
      cleanTextForPdf(f.name),
      cleanTextForPdf(f.formula),
      cleanTextForPdf(f.note),
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: marginX, right: marginX },
      theme: 'striped',
      head: [['Formula Name', 'Mathematical Expression', 'Units & Applicability Notes']],
      body: formulaRows,
      headStyles: {
        fillColor: [30, 30, 30],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
      },
      bodyStyles: {
        fontSize: 8,
      },
      columnStyles: {
        0: { cellWidth: 45, fontStyle: 'bold' },
        1: { cellWidth: 55, textColor: [30, 100, 30], font: 'courier', fontStyle: 'bold' },
        2: { cellWidth: 74 },
      },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 10;
  };

  // --- D. TOPPER NOTES RENDERER ---
  const renderTopperContent = () => {
    const topper = kit.content.topper;
    if (!topper) return;

    renderSectionHeader(mode === 'topper' ? 'Academic Proofs & Conceptual Deep Dive' : 'Topper Detailed Proofs & Deep Dive');

    if (topper.introduction) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      const introLines = doc.splitTextToSize(cleanTextForPdf(topper.introduction), contentWidth);
      doc.text(introLines, marginX, currentY);
      currentY += introLines.length * 4.5 + 6;
    }

    // Deep Dives
    topper.deepDive.forEach((sec) => {
      checkPageBreak(28);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.text(`${cleanTextForPdf(sec.title)} [${sec.timestamp}]`, marginX, currentY);
      currentY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const textLines = doc.splitTextToSize(cleanTextForPdf(sec.content), contentWidth);
      doc.text(textLines, marginX, currentY);
      currentY += textLines.length * 4.2 + 4;

      // Key Takeaway box
      checkPageBreak(15);
      doc.setFillColor(245, 248, 240);
      doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.setLineWidth(0.4);
      const takeawayLines = doc.splitTextToSize(`Takeaway: ${cleanTextForPdf(sec.keyTakeaway)}`, contentWidth - 8);
      const boxHeight = takeawayLines.length * 4.2 + 5;
      doc.roundedRect(marginX, currentY, contentWidth, boxHeight, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.text(takeawayLines, marginX + 4, currentY + 4);
      currentY += boxHeight + 6;
    });

    // Derivations
    if (topper.derivations && topper.derivations.length > 0) {
      topper.derivations.forEach((d) => {
        checkPageBreak(32);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
        doc.text(`Mathematical Derivation: ${cleanTextForPdf(d.title)}`, marginX, currentY);
        currentY += 5;

        d.steps.forEach((st) => {
          doc.setFont('courier', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(50, 50, 50);
          const stLine = doc.splitTextToSize(`-> ${cleanTextForPdf(st)}`, contentWidth - 4);
          doc.text(stLine, marginX + 4, currentY);
          currentY += stLine.length * 3.8 + 1.2;
        });

        // Boxed Final Result
        checkPageBreak(12);
        doc.setFillColor(COLOR_BG_TINT[0], COLOR_BG_TINT[1], COLOR_BG_TINT[2]);
        doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.setLineWidth(0.5);
        doc.roundedRect(marginX + 2, currentY, contentWidth - 4, 7.5, 1, 1, 'FD');

        doc.setFont('courier', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.text(`[Final Equation]: ${cleanTextForPdf(d.finalResult)}`, marginX + 5, currentY + 5);
        currentY += 12;
      });
    }

    // Pro Tips
    if (topper.proTips && topper.proTips.length > 0) {
      checkPageBreak(25);
      doc.setFont('courier', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.text('Examiner Scoring Pro-Tips & Pitfalls:', marginX, currentY);
      currentY += 4.5;

      topper.proTips.forEach((tip) => {
        checkPageBreak(12);
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(60, 60, 60);
        const tLine = doc.splitTextToSize(`* ${cleanTextForPdf(tip)}`, contentWidth - 4);
        doc.text(tLine, marginX + 2, currentY);
        currentY += tLine.length * 3.8 + 1.5;
      });
      currentY += 6;
    }
  };

  // --- E. EXAM MODE RENDERER ---
  const renderExamContent = () => {
    const exam = kit.content.exam;
    if (!exam || !exam.questions || exam.questions.length === 0) return;

    renderSectionHeader(mode === 'exam' ? 'Syllabus Practice Questions & Evaluation Rubrics' : 'Practice Questions & Evaluation Rubrics');

    exam.questions.forEach((q) => {
      checkPageBreak(30);

      // Marks badge
      doc.setFillColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      doc.roundedRect(marginX, currentY - 4, 18, 5, 1, 1, 'F');
      doc.setFont('courier', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text(`${q.marks} MARK`, marginX + 2, currentY - 0.5);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
      doc.text(cleanTextForPdf(q.frequentlyAskedIn), marginX + 22, currentY);

      currentY += 5;

      // Question
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      const qLines = doc.splitTextToSize(`Q: ${cleanTextForPdf(q.question)}`, contentWidth);
      doc.text(qLines, marginX, currentY);
      currentY += qLines.length * 4.2 + 2.5;

      // Model Answer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const ansLines = doc.splitTextToSize(`Answer:\n${cleanTextForPdf(q.answer)}`, contentWidth - 4);
      doc.text(ansLines, marginX + 2, currentY);
      currentY += ansLines.length * 3.8 + 2.5;

      // Rubric
      doc.setFont('courier', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text('Evaluation Rubric:', marginX + 2, currentY);
      currentY += 3.5;

      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
      q.markingScheme.forEach((rubric) => {
        const rLine = doc.splitTextToSize(`- ${cleanTextForPdf(rubric)}`, contentWidth - 6);
        doc.text(rLine, marginX + 4, currentY);
        currentY += rLine.length * 3.5 + 1;
      });

      currentY += 5;
    });
  };

  // --- F. DIAGNOSTIC QUIZ RENDERER ---
  const renderQuizContent = () => {
    if (!kit.quiz || kit.quiz.length === 0) return;

    renderSectionHeader('Diagnostic Assessment & Answer Key');

    kit.quiz.forEach((qz, qIdx) => {
      checkPageBreak(25);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
      const qzLines = doc.splitTextToSize(`${qIdx + 1}. ${cleanTextForPdf(qz.question)}`, contentWidth);
      doc.text(qzLines, marginX, currentY);
      currentY += qzLines.length * 4 + 2;

      // Options
      qz.options.forEach((opt, oIdx) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        const optLetter = String.fromCharCode(65 + oIdx);
        doc.text(`(${optLetter}) ${cleanTextForPdf(opt)}`, marginX + 6, currentY);
        currentY += 3.8;
      });

      // Correct answer key & explanation
      doc.setFont('courier', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      const correctLetter = String.fromCharCode(65 + qz.correctIndex);
      doc.text(`Answer: (${correctLetter}) • Topic: ${cleanTextForPdf(qz.topic)}`, marginX + 6, currentY + 1);
      currentY += 4;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
      const expLine = doc.splitTextToSize(`Reason: ${cleanTextForPdf(qz.explanation)}`, contentWidth - 10);
      doc.text(expLine, marginX + 6, currentY);
      currentY += expLine.length * 3.2 + 4;
    });
  };

  // --- G. TIMESTAMPS ROADMAP RENDERER ---
  const renderTimestampsContent = () => {
    if (!kit.timestamps || kit.timestamps.length === 0) return;

    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(COLOR_TEXT_DARK[0], COLOR_TEXT_DARK[1], COLOR_TEXT_DARK[2]);
    doc.text('Lecture Roadmap & Smart Timestamps', marginX, currentY);
    currentY += 4;

    const stampRows = kit.timestamps.map((ts) => [
      ts.time,
      cleanTextForPdf(ts.title),
      cleanTextForPdf(ts.summary),
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: marginX, right: marginX },
      theme: 'plain',
      head: [['Timestamp', 'Lecture Segment', 'Core Concept Summary']],
      body: stampRows,
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 7.5,
      },
      bodyStyles: {
        fontSize: 7.5,
      },
      columnStyles: {
        0: { cellWidth: 22, font: 'courier', fontStyle: 'bold', textColor: [121, 169, 74] },
        1: { cellWidth: 50, fontStyle: 'bold' },
        2: { cellWidth: 102 },
      },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 10;
  };

  // ==========================================
  // DISPATCH EXECUTION BASED ON EXPORT MODE
  // ==========================================
  if (mode === 'chatpata') {
    renderChatpataContent();
    if (options.includeFormulas) renderFormulasContent();
    if (options.includeTimestamps) renderTimestampsContent();
  } else if (mode === 'quick') {
    renderQuickContent();
    if (options.includeFormulas) renderFormulasContent();
    if (options.includeTimestamps) renderTimestampsContent();
  } else if (mode === 'topper') {
    renderTopperContent();
    if (options.includeFormulas) renderFormulasContent();
    if (options.includeTimestamps) renderTimestampsContent();
  } else if (mode === 'exam') {
    renderExamContent();
    if (options.includeQuizAndAnswerKey) renderQuizContent();
    if (options.includeTimestamps) renderTimestampsContent();
  } else {
    // Mode 'all': Comprehensive Multi-Section Study Kit
    if (options.includeQuickNotes) renderQuickContent();
    if (options.includeFormulas) renderFormulasContent();
    if (options.includeTopperNotes) renderTopperContent();
    if (options.includeChatpataNotes) renderChatpataContent();
    if (options.includeExamQuestions) renderExamContent();
    if (options.includeQuizAndAnswerKey) renderQuizContent();
    if (options.includeTimestamps) renderTimestampsContent();
  }

  // ==========================================
  // RUNNING FOOTERS ("PAGE X OF Y")
  // ==========================================
  const totalPages = doc.internal.pages.length - 1;

  for (let p = 1; p <= totalPages; p++) {
    if (options.includeCoverPage && p === 1) {
      continue;
    }

    doc.setPage(p);

    // Skip running top header on page 1 if compact header is rendered there
    if (!options.includeCoverPage && p === 1) {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);
      doc.line(marginX, pageHeight - 14, pageWidth - marginX, pageHeight - 14);
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
      doc.text('Libnotes • High-Retention Revision Notes', marginX, pageHeight - 9);

      const pageCountText = `Page ${p} of ${totalPages}`;
      doc.text(pageCountText, pageWidth - marginX - doc.getTextWidth(pageCountText), pageHeight - 9);
      continue;
    }

    // Running Header (Pages 2+)
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`Libnotes — ${cleanTextForPdf(kit.subject)}: ${cleanTextForPdf(kit.chapter)}`, marginX, 12);
    doc.text(kit.academicClass, pageWidth - marginX - doc.getTextWidth(kit.academicClass), 12);

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(marginX, 14, pageWidth - marginX, 14);

    // Running Footer
    doc.line(marginX, pageHeight - 14, pageWidth - marginX, pageHeight - 14);
    doc.text('Libnotes • High-Retention Revision Notes', marginX, pageHeight - 9);

    const pageCountText = `Page ${p} of ${totalPages}`;
    doc.text(
      pageCountText,
      pageWidth - marginX - doc.getTextWidth(pageCountText),
      pageHeight - 9
    );
  }

  return doc;
}
