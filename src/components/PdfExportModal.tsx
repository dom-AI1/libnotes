import { useState, useEffect } from 'react';
import type { StudyKit, NoteStyle } from '../types';
import { 
  X, FileText, Download, CheckSquare, Square, Sparkles, 
  BookOpen, Award, Coffee, GraduationCap, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { 
  DEFAULT_PDF_OPTIONS, 
  formatPdfFilename, 
  generateStudyKitPdf, 
  type PdfExportOptions,
  type ExportStyleMode 
} from '../services/pdfExportService';
import { checkAndConsumePdfQuota } from '../services/quotaService';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  kit: StudyKit;
  initialMode?: NoteStyle | 'full' | 'revision' | 'exam' | 'cards' | 'quiz' | ExportStyleMode;
  onExportSuccess?: (filename: string) => void;
  userId?: string | null;
}

export const PdfExportModal = ({
  isOpen,
  onClose,
  kit,
  initialMode,
  onExportSuccess,
  userId,
}: PdfExportModalProps) => {
  // Map NoteStyle / Tab to ExportStyleMode
  const getInitialExportMode = (style?: string): ExportStyleMode => {
    if (!style || style === 'full') {
      if (kit.noteStyle === 'chatpata' || kit.noteStyle === 'chatpate') return 'chatpata';
      if (kit.noteStyle === 'quick' || kit.noteStyle === 'minimal') return 'quick';
      if (kit.noteStyle === 'topper') return 'topper';
      if (kit.noteStyle === 'exam') return 'exam';
      return 'all';
    }
    if (style === 'chatpata' || style === 'chatpate') return 'chatpata';
    if (style === 'quick' || style === 'minimal' || style === 'revision') return 'quick';
    if (style === 'topper') return 'topper';
    if (style === 'exam' || style === 'quiz') return 'exam';
    if (style === 'all') return 'all';
    return 'all';
  };

  const [selectedMode, setSelectedMode] = useState<ExportStyleMode>(() => getInitialExportMode(initialMode));
  const [options, setOptions] = useState<PdfExportOptions>(() => ({
    ...DEFAULT_PDF_OPTIONS,
    exportMode: getInitialExportMode(initialMode),
  }));
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [quotaNotice, setQuotaNotice] = useState<string | null>(null);
  const [quotaExceededError, setQuotaExceededError] = useState<string | null>(null);

  const applyPresetMode = (mode: ExportStyleMode) => {
    setSelectedMode(mode);
    if (mode === 'chatpata') {
      setOptions({
        exportMode: 'chatpata',
        includeCoverPage: false,
        includeTableOfContents: false,
        includeQuickNotes: false,
        includeTopperNotes: false,
        includeChatpataNotes: true,
        includeDefinitions: true,
        includeFormulas: true,
        includeExamQuestions: false,
        includeQuizAndAnswerKey: false,
        includeQuizResults: false,
        includeTimestamps: true,
      });
    } else if (mode === 'quick') {
      setOptions({
        exportMode: 'quick',
        includeCoverPage: false,
        includeTableOfContents: false,
        includeQuickNotes: true,
        includeTopperNotes: false,
        includeChatpataNotes: false,
        includeDefinitions: true,
        includeFormulas: true,
        includeExamQuestions: false,
        includeQuizAndAnswerKey: false,
        includeQuizResults: false,
        includeTimestamps: true,
      });
    } else if (mode === 'topper') {
      setOptions({
        exportMode: 'topper',
        includeCoverPage: false,
        includeTableOfContents: false,
        includeQuickNotes: false,
        includeTopperNotes: true,
        includeChatpataNotes: false,
        includeDefinitions: true,
        includeFormulas: true,
        includeExamQuestions: false,
        includeQuizAndAnswerKey: false,
        includeQuizResults: false,
        includeTimestamps: true,
      });
    } else if (mode === 'exam') {
      setOptions({
        exportMode: 'exam',
        includeCoverPage: false,
        includeTableOfContents: false,
        includeQuickNotes: false,
        includeTopperNotes: false,
        includeChatpataNotes: false,
        includeDefinitions: false,
        includeFormulas: false,
        includeExamQuestions: true,
        includeQuizAndAnswerKey: true,
        includeQuizResults: true,
        includeTimestamps: true,
      });
    } else {
      setOptions({
        ...DEFAULT_PDF_OPTIONS,
        exportMode: 'all',
      });
    }
  };

  useEffect(() => {
    if (initialMode) {
      const m = getInitialExportMode(initialMode);
      setSelectedMode(m);
      applyPresetMode(m);
    }
    setQuotaExceededError(null);
    setQuotaNotice(null);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isGenerating) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isGenerating, onClose]);

  const targetFilename = formatPdfFilename(kit.subject, kit.chapter, options.exportMode);

  const toggleOption = (key: keyof PdfExportOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = (select: boolean) => {
    setOptions({
      exportMode: 'all',
      includeCoverPage: select,
      includeTableOfContents: select,
      includeQuickNotes: select,
      includeTopperNotes: select,
      includeChatpataNotes: select,
      includeDefinitions: select,
      includeFormulas: select,
      includeExamQuestions: select,
      includeQuizAndAnswerKey: select,
      includeQuizResults: select,
      includeTimestamps: select,
    });
    setSelectedMode('all');
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    setDownloadCompleted(false);
    setQuotaExceededError(null);
    setQuotaNotice(null);

    try {
      // Phase 9: Enforce Free-Plan PDF Generation Quota (Atomic Check & Deduplication)
      const quotaCheck = await checkAndConsumePdfQuota(userId, kit.id, options.exportMode);
      if (!quotaCheck.allowed) {
        setIsGenerating(false);
        setQuotaExceededError(quotaCheck.message);
        return;
      }

      if (quotaCheck.isRedownload) {
        setQuotaNotice('Re-downloading previously generated notes (Free Plan quota preserved).');
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const doc = generateStudyKitPdf(kit, options);
      doc.save(targetFilename);

      setIsGenerating(false);
      setDownloadCompleted(true);
      if (onExportSuccess) {
        onExportSuccess(targetFilename);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('[Libnotes PDF Export] Generation error:', err);
      setIsGenerating(false);
      alert('An error occurred during PDF generation. Please ensure your browser allows downloads.');
    }
  };

  const exportItems = [
    {
      key: 'includeChatpataNotes' as const,
      label: 'Chatpata Hinglish Analogies & Memory Tricks',
      desc: 'Creative conversational analogies, real-world examples, and punchlines.',
      icon: Coffee,
      available: !!(kit.content.chatpata?.desiAnalogies?.length || kit.content.chatpate?.desiAnalogies?.length),
    },
    {
      key: 'includeQuickNotes' as const,
      label: 'Quick Revision & High-Yield Bullets',
      desc: 'Concise notebook summaries, core principles & 10-minute recap bullets.',
      icon: Sparkles,
      available: !!(kit.content.quick || kit.content.minimal),
    },
    {
      key: 'includeFormulas' as const,
      label: 'Key Formulas & Governing Equations Table',
      desc: 'Formatted mathematical formulas with variable units and exam notes.',
      icon: BookOpen,
      available: !!(kit.content.quick?.formulas || kit.content.minimal?.formulas),
    },
    {
      key: 'includeTopperNotes' as const,
      label: 'Topper Notes: Detailed Proofs & Deep Dive',
      desc: 'Complete calculus derivations, P-V indicators, and examiner pro-tips.',
      icon: Award,
      available: !!kit.content.topper,
    },
    {
      key: 'includeExamQuestions' as const,
      label: 'Practice Questions & Evaluation Rubrics',
      desc: '1M, 3M, 5M syllabus questions with step-by-step model answers.',
      icon: GraduationCap,
      available: !!kit.content.exam?.questions?.length,
    },
    {
      key: 'includeQuizAndAnswerKey' as const,
      label: 'Diagnostic Assessment & Answer Key',
      desc: 'Multiple choice questions with detailed explanation for each option.',
      icon: CheckCircle2,
      available: !!kit.quiz?.length,
    },
    {
      key: 'includeCoverPage' as const,
      label: 'Formal Binder Cover Page (Optional)',
      desc: 'Adds a full-page front cover. Left off by default so notes begin on Page 1.',
      icon: FileText,
      available: true,
    },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#141414]/65 backdrop-blur-sm p-3 sm:p-6 no-print"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isGenerating) {
          onClose();
        }
      }}
    >
      <div 
        className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8"
        onClick={(e) => {
          if (e.target === e.currentTarget && !isGenerating) {
            onClose();
          }
        }}
      >
        <div 
          className="relative w-full max-w-2xl bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl shadow-[6px_6px_0px_#141414] p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            disabled={isGenerating}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-xl border-2 border-[#141414] bg-[#FFFFFF] hover:bg-[#FDEDE8] hover:border-[#E05B49] hover:scale-105 active:scale-95 shadow-[2px_2px_0px_#141414] transition-all cursor-pointer text-[#141414]"
            aria-label="Close export options"
            title="Close (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#141414]" />
          </button>

          {/* Modal Header */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F2DC] border border-[#79A94A]/30 text-xs font-mono font-bold text-[#79A94A] mb-2">
              <Download className="w-3.5 h-3.5" />
              <span>PRINT & PDF EXPORT</span>
            </div>

            <h2 className="font-mono-editorial text-xl sm:text-2xl font-bold text-[#141414] pr-10 sm:pr-0">
              Export Study Notes to PDF
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#5E5D57] mt-1">
              Select your preferred note style preset or customize individual sections.
            </p>
          </div>

          {/* Quota Exceeded Alert */}
          {quotaExceededError && (
            <div className="mb-4 p-4 rounded-xl border-2 border-[#E05B49] bg-[#FDEDE8] text-xs font-body text-[#141414] animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-[#E05B49] shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono font-bold text-[#E05B49] uppercase">Daily Limit Reached (Free Plan)</div>
                  <div className="mt-1 text-[#4A4944] leading-relaxed">{quotaExceededError}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#8A8880]">
                    <Clock className="w-3.5 h-3.5 text-[#E05B49]" />
                    <span>Free quota resets at 00:00 UTC daily. All previously generated PDFs remain free to re-download anytime.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Free Re-Download Notice */}
          {quotaNotice && !quotaExceededError && (
            <div className="mb-4 p-3 rounded-xl border border-[#79A94A] bg-[#F1F7EA] text-xs font-mono text-[#141414] flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#79A94A] shrink-0" />
              <span>{quotaNotice}</span>
            </div>
          )}

          {/* Style Presets Selector */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-[#8A8880] uppercase tracking-wider block mb-2">
              Choose Note Style Preset
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => applyPresetMode('chatpata')}
                className={`p-2 rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                  selectedMode === 'chatpata'
                    ? 'border-[#141414] bg-[#FAF8F2] font-bold shadow-[2px_2px_0px_#141414]'
                    : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/50'
                }`}
              >
                <Coffee className="w-4 h-4 text-[#E05B49]" />
                <span>Chatpata</span>
              </button>

              <button
                type="button"
                onClick={() => applyPresetMode('quick')}
                className={`p-2 rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                  selectedMode === 'quick'
                    ? 'border-[#141414] bg-[#FAF8F2] font-bold shadow-[2px_2px_0px_#141414]'
                    : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#79A94A]" />
                <span>Quick</span>
              </button>

              <button
                type="button"
                onClick={() => applyPresetMode('topper')}
                className={`p-2 rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                  selectedMode === 'topper'
                    ? 'border-[#141414] bg-[#FAF8F2] font-bold shadow-[2px_2px_0px_#141414]'
                    : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/50'
                }`}
              >
                <Award className="w-4 h-4 text-[#3B82F6]" />
                <span>Topper</span>
              </button>

              <button
                type="button"
                onClick={() => applyPresetMode('exam')}
                className={`p-2 rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                  selectedMode === 'exam'
                    ? 'border-[#141414] bg-[#FAF8F2] font-bold shadow-[2px_2px_0px_#141414]'
                    : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/50'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
                <span>Exam Mode</span>
              </button>

              <button
                type="button"
                onClick={() => applyPresetMode('all')}
                className={`p-2 rounded-xl border transition-all text-center flex flex-col items-center gap-1 col-span-2 sm:col-span-1 ${
                  selectedMode === 'all'
                    ? 'border-[#141414] bg-[#FAF8F2] font-bold shadow-[2px_2px_0px_#141414]'
                    : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#141414]" />
                <span>All Sections</span>
              </button>
            </div>
          </div>

          {/* Target Document Details */}
          <div className="p-3 rounded-xl border border-[#141414] bg-[#FAF9F5] mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div>
              <span className="text-[#8A8880] block text-[10px] uppercase">Output Filename</span>
              <span className="font-bold text-[#141414]">{targetFilename}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectAll(true)}
                className="text-[#79A94A] hover:underline font-bold"
              >
                Select All
              </button>
              <span className="text-[#DFDBCF]">•</span>
              <button
                type="button"
                onClick={() => handleSelectAll(false)}
                className="text-[#5E5D57] hover:underline"
              >
                Deselect All
              </button>
            </div>
          </div>

          {/* Section Options Checkboxes */}
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
            {exportItems.map((item) => {
              const Icon = item.icon;
              const isChecked = options[item.key];
              const isAvailable = item.available;

              return (
                <div
                  key={item.key}
                  onClick={() => isAvailable && toggleOption(item.key)}
                  className={`p-2.5 rounded-xl border-2 transition-all flex items-start justify-between cursor-pointer ${
                    !isAvailable
                      ? 'opacity-40 border-[#DFDBCF] bg-[#FAF9F5] cursor-not-allowed'
                      : isChecked
                      ? 'border-[#141414] bg-[#E8F2DC] shadow-[2px_2px_0px_#141414]'
                      : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 text-[#141414]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#141414]">
                        {item.label}
                      </h4>
                      <p className="text-[11px] font-body text-[#5E5D57] mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-0.5 shrink-0 text-[#141414]">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#79A94A]" />
                    ) : (
                      <Square className="w-4 h-4 text-[#8A8880]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-5 pt-4 border-t border-[#DFDBCF] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#5E5D57]">
              Notes start directly on Page 1 • 100% Free Core Feature
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isGenerating}
                className="btn-secondary-white text-xs px-4 py-2 font-mono"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="btn-primary-green text-xs px-5 py-2.5 font-mono flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-[#141414] border-t-transparent rounded-full animate-spin" />
                    <span>Rendering PDF...</span>
                  </>
                ) : downloadCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
