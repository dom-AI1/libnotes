import { useState, useEffect } from 'react';
import type { StudyKit, NoteStyle } from '../types';
import { 
  ArrowLeft, Copy, Printer, Check, Clock, Sparkles, BookOpen, 
  HelpCircle, Award, GraduationCap, ChevronRight, Play, Bookmark, Coffee, Search, X, Download 
} from 'lucide-react';
import { QuizComponent } from './QuizComponent';
import { PdfExportModal } from './PdfExportModal';

interface NotesViewProps {
  kit: StudyKit;
  onBack: () => void;
  onStyleChange: (newStyle: NoteStyle) => void;
  initialTab?: 'full' | 'revision' | 'exam' | 'cards' | 'quiz';
  userId?: string | null;
}

export const NotesView = ({ kit, onBack, onStyleChange, initialTab, userId }: NotesViewProps) => {
  const [activeTab, setActiveTab] = useState<'full' | 'revision' | 'exam' | 'cards' | 'quiz'>(initialTab || 'full');
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTimestamp, setActiveTimestamp] = useState<{ time: string; seconds: number; title: string; summary: string } | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!kit) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414] text-center">
          <BookOpen className="w-10 h-10 text-[#79A94A] mx-auto mb-3" />
          <h2 className="font-mono-editorial text-xl font-bold text-[#141414] mb-2">Study Kit Loading...</h2>
          <p className="text-xs font-body text-[#5E5D57] mb-4">Please wait while your study material is being prepared, or return to home.</p>
          <button onClick={onBack} className="btn-primary-green px-4 py-2 text-xs font-mono font-bold">Return to Home</button>
        </div>
      </div>
    );
  }

  const quickContent = kit.content?.quick || kit.content?.minimal || {
    headline: kit.chapter || kit.title || 'Revision Notes',
    cheatSheet: kit.quickRevisionPoints || [],
    formulas: [],
    bulletSummary: kit.quickRevisionPoints || [],
  };
  const chatpataContent = kit.content?.chatpata || kit.content?.chatpate;

  const handleCopy = () => {
    const formulasText = quickContent?.formulas?.map(f => `${f.name}: ${f.formula} (${f.note})`).join('\n') || '';
    const revisionPts = (kit.quickRevisionPoints || []).join('\n');
    const textToCopy = `LIBNOTES STUDY KIT: ${kit.title || 'Notes'}\nSubject: ${kit.subject || ''} | Class: ${kit.academicClass || ''}\n\n` +
      `REVISION POINTS:\n` + revisionPts + `\n\n` +
      `KEY FORMULAE:\n` + formulasText;
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleCardFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const styleNames: Record<NoteStyle, string> = {
    quick: 'Quick Notes',
    minimal: 'Quick Notes',
    topper: 'Topper Notes',
    chatpata: 'Chatpata Notes',
    chatpate: 'Chatpata Notes',
    exam: 'Exam Mode',
  };

  const activeStyleKey: NoteStyle = 
    kit.noteStyle === 'minimal' ? 'quick' : kit.noteStyle === 'chatpate' ? 'chatpata' : (kit.noteStyle || 'topper');

  return (
    <div className="min-h-screen bg-[#F7F5EF] pb-24">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#141414]/15 no-print">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-[#141414] bg-[#FCFAF6] hover:bg-[#EFECE1] shadow-[2px_2px_0px_#141414] transition-all"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4 text-[#141414]" />
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#5E5D57]">
                {kit.autoDetected && (
                  <>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded-full border border-[#79A94A]/30">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI ANALYZED
                    </span>
                    <span>•</span>
                  </>
                )}
                <span>{kit.academicClass}</span>
                {kit.stream && (
                  <>
                    <span>•</span>
                    <span className="text-[#141414] font-medium">{kit.stream}</span>
                  </>
                )}
                <span>•</span>
                <span>{kit.subject}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#79A94A] font-semibold">
                  <Clock className="w-3 h-3" />
                  {kit.duration}
                </span>
                {kit.fileSize && (
                  <>
                    <span>•</span>
                    <span>{kit.fileSize}</span>
                  </>
                )}
              </div>
              <h1 className="font-mono-editorial text-sm sm:text-base font-bold text-[#141414] truncate max-w-[180px] xs:max-w-xs sm:max-w-md md:max-w-lg">
                {kit.title}
              </h1>
            </div>
          </div>

          {/* Action Bar: Style Switcher & Export Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            
            {/* Note Style Switcher Pills */}
            <div className="hidden md:flex items-center bg-[#FAF9F5] border border-[#141414] rounded-full p-1 shadow-[1.5px_1.5px_0px_#141414]">
              {(['quick', 'topper', 'chatpata', 'exam'] as NoteStyle[]).map((st) => (
                <button
                  key={st}
                  onClick={() => onStyleChange(st)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    activeStyleKey === st
                      ? 'bg-[#141414] text-[#FFFFFF]'
                      : 'text-[#5E5D57] hover:text-[#141414]'
                  }`}
                >
                  {styleNames[st]}
                </button>
              ))}
            </div>

            {/* Mobile Style Select */}
            <select
              value={activeStyleKey}
              onChange={(e) => onStyleChange(e.target.value as NoteStyle)}
              className="md:hidden text-xs font-mono border border-[#141414] bg-[#FCFAF6] rounded-lg px-2 py-1.5"
            >
              <option value="quick">Quick Notes</option>
              <option value="topper">Topper Notes</option>
              <option value="chatpata">Chatpata Notes</option>
              <option value="exam">Exam Mode</option>
            </select>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border border-[#141414] transition-all ${
                bookmarked ? 'bg-[#E8F2DC] text-[#79A94A]' : 'bg-[#FCFAF6] hover:bg-[#EFECE1]'
              } shadow-[2px_2px_0px_#141414]`}
              title="Bookmark kit"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="btn-secondary-outline px-3 py-1.5 text-xs font-mono font-semibold flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#79A94A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="btn-primary-green px-3.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5"
              title="Configure and download real structured A4 PDF notes"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="btn-secondary-outline px-3 py-1.5 text-xs font-mono font-semibold flex items-center gap-1.5 hidden sm:flex"
              title="Browser print sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-[#DFDBCF] pt-2 pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('full')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'full'
                ? 'bg-[#141414] text-[#FFFFFF] shadow-[2px_2px_0px_#79A94A]'
                : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Full Notes ({styleNames[activeStyleKey]})</span>
          </button>

          <button
            onClick={() => setActiveTab('revision')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'revision'
                ? 'bg-[#141414] text-[#FFFFFF] shadow-[2px_2px_0px_#79A94A]'
                : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#79A94A]" />
            <span>Quick Revision</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'exam'
                ? 'bg-[#141414] text-[#FFFFFF] shadow-[2px_2px_0px_#79A94A]'
                : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Exam Mode (PYQs)</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'cards'
                ? 'bg-[#141414] text-[#FFFFFF] shadow-[2px_2px_0px_#79A94A]'
                : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Questions & Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-[#79A94A] text-[#FFFFFF] shadow-[2px_2px_0px_#141414]'
                : 'text-[#141414] font-semibold bg-[#E8F2DC]/60 hover:bg-[#E8F2DC]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Diagnostic Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Spacious Reading Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Source Evidence & Grounding Disclosure Banner */}
        {kit.verifiedLecture && (
          <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-[#FCFAF6] border border-[#141414]/15 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 text-xs font-mono overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 text-[#141414] min-w-0 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#79A94A] shrink-0" />
              <span className="font-bold shrink-0">Verified Source Grounded:</span>
              <span className="text-[#5E5D57] truncate max-w-[200px] xs:max-w-xs sm:max-w-sm">
                {kit.verifiedLecture.sourceIdentifier}
              </span>
            </div>
            {kit.verifiedLecture.visualEvidenceDisclosed && (
              <span className="text-[11px] text-[#79A94A] bg-[#E8F2DC] px-2.5 py-1 rounded-full border border-[#79A94A]/30 break-words max-w-full shrink">
                {kit.verifiedLecture.visualEvidenceDisclosed.length > 55
                  ? 'Visual inspection & lecture audio verified'
                  : kit.verifiedLecture.visualEvidenceDisclosed}
              </span>
            )}
          </div>
        )}
        
        {/* In-Page Keyword Search */}
        <div className="mb-6 relative no-print">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8880]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, formulas or questions within this lecture..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8880] hover:text-[#141414]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Filter Pill */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#E8F2DC] border border-[#79A94A] text-xs font-mono text-[#141414] no-print animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#79A94A]" />
              <span>Filtering notes for concept: <strong className="font-bold underline decoration-[#79A94A]">"{searchQuery}"</strong></span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#141414] hover:text-[#79A94A] underline font-mono ml-2 shrink-0"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Timestamp Concept Popup Modal / Alert */}
        {activeTimestamp && (
          <div className="mb-6 p-4 rounded-xl border-2 border-[#141414] bg-[#FAF9F5] shadow-[3px_3px_0px_#141414] flex items-start justify-between gap-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8F2DC] border border-[#141414] flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 text-[#79A94A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#79A94A] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#141414]/20">
                    {activeTimestamp.time} ({activeTimestamp.seconds}s)
                  </span>
                  <span className="font-mono-editorial text-sm font-bold text-[#141414]">
                    {activeTimestamp.title}
                  </span>
                </div>
                <p className="text-xs text-[#5E5D57] font-body mt-1">
                  {activeTimestamp.summary}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTimestamp(null)}
              className="text-xs font-mono text-[#8A8880] hover:text-[#141414] border border-[#141414]/20 px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: FULL NOTES (STYLE DEPENDENT) */}
        {/* ======================================================== */}
        {activeTab === 'full' && (
          <div className="space-y-8">
            
            {/* Title & Metadata Card */}
            <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#141414]">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-1 rounded-full border border-[#79A94A]/30">
                  {styleNames[activeStyleKey].toUpperCase()}
                </span>
                <span className="text-xs font-mono text-[#5E5D57] bg-[#EFECE1] px-2.5 py-1 rounded-full">
                  Language: {kit.language}
                </span>
                <span className="text-xs font-mono text-[#5E5D57] bg-[#EFECE1] px-2.5 py-1 rounded-full">
                  Source: {kit.fileName ? kit.fileName : kit.videoUrl ? 'Video Stream' : 'Lecture Recording'}
                </span>
              </div>

              <h2 className="font-mono-editorial text-2xl sm:text-3xl font-bold text-[#141414] leading-tight">
                {kit.title}
              </h2>

              <p className="font-body text-sm sm:text-base text-[#4A4944] mt-3 leading-relaxed">
                {activeStyleKey === 'chatpata'
                  ? chatpataContent?.hinglishIntro || 'Conversational summary of this lecture.'
                  : activeStyleKey === 'topper'
                  ? kit.content?.topper?.introduction || 'Comprehensive analytical notes.'
                  : quickContent?.headline || 'High-yield revision notes.'}
              </p>
            </div>

            {/* RENDER TOPPER NOTES */}
            {activeStyleKey === 'topper' && (
              <div className="space-y-6">
                {/* Deep Dive Sections with Timestamps */}
                {(kit.content?.topper?.deepDive || [])
                  .filter(sec => !searchQuery || (sec.title && sec.title.toLowerCase().includes(searchQuery.toLowerCase())) || (sec.content && sec.content.toLowerCase().includes(searchQuery.toLowerCase())))
                  .map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[3px_3px_0px_#141414]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-mono-editorial text-lg sm:text-xl font-bold text-[#141414]">
                          {section.title}
                        </h3>
                        <button
                          onClick={() =>
                            setActiveTimestamp({
                              time: section.timestamp,
                              seconds: 195,
                              title: section.title,
                              summary: section.keyTakeaway,
                            })
                          }
                          className="text-xs font-mono font-semibold text-[#79A94A] bg-[#E8F2DC] hover:bg-[#D6E8C5] px-2.5 py-1 rounded-lg border border-[#79A94A] flex items-center gap-1 transition-all"
                        >
                          <Clock className="w-3 h-3" />
                          <span>[{section.timestamp}]</span>
                        </button>
                      </div>

                      <p className="font-body text-sm sm:text-base text-[#2E2E2E] leading-relaxed">
                        {section.content}
                      </p>

                      <div className="mt-4 p-3.5 rounded-xl bg-[#F1F7EA] border border-[#79A94A] text-xs font-body text-[#141414]">
                        <span className="font-mono font-bold text-[#79A94A] mr-1.5">KEY TAKEAWAY:</span>
                        {section.keyTakeaway}
                      </div>
                    </div>
                  ))}

                {/* Derivations */}
                {(kit.content?.topper?.derivations || []).length > 0 && (
                  <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[3px_3px_0px_#141414]">
                    <h3 className="font-mono-editorial text-lg sm:text-xl font-bold text-[#141414] mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#79A94A]" />
                      Mathematical Derivations for Board Exams
                    </h3>
                    <div className="space-y-4">
                      {(kit.content?.topper?.derivations || []).map((d, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-[#141414] bg-[#FAF9F5]">
                          <div className="font-mono-editorial font-bold text-sm text-[#141414] mb-2">
                            {d.title}
                          </div>
                          <div className="space-y-1.5 pl-3 border-l-2 border-[#79A94A] my-3 font-mono text-xs text-[#333333]">
                            {(d.steps || []).map((st, sIdx) => (
                              <div key={sIdx}>{st}</div>
                            ))}
                          </div>
                          <div className="mt-2 text-xs font-mono font-bold text-[#141414] bg-[#E8F2DC] px-3 py-1.5 rounded-lg border border-[#79A94A] inline-block">
                            Final Result: {d.finalResult}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topper Pro Tips */}
                <div className="bg-[#FAF9F5] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]">
                  <h3 className="font-mono-editorial text-base font-bold text-[#141414] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#79A94A]" />
                    Topper Pro Tips & Common Traps
                  </h3>
                  <ul className="space-y-2">
                    {(kit.content?.topper?.proTips || []).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-body text-[#333333]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#79A94A] mt-2 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* RENDER CHATPATA HINGLISH NOTES */}
            {activeStyleKey === 'chatpata' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {(chatpataContent?.desiAnalogies || [])
                    .filter(a => !searchQuery || (a.concept && a.concept.toLowerCase().includes(searchQuery.toLowerCase())) || (a.analogy && a.analogy.toLowerCase().includes(searchQuery.toLowerCase())))
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]"
                      >
                        <div className="flex items-center gap-2 mb-2 font-mono-editorial text-base font-bold text-[#141414]">
                          <Coffee className="w-4 h-4 text-[#79A94A]" />
                          {item.concept}
                        </div>

                        <p className="font-body text-sm sm:text-base text-[#2E2E2E] leading-relaxed whitespace-pre-line">
                          {item.analogy}
                        </p>

                        <div className="mt-4 p-3 rounded-xl bg-[#E8F2DC] border border-[#79A94A] text-xs font-mono font-bold text-[#141414]">
                          💡 Punchline: {item.desiPunchline}
                        </div>
                      </div>
                    ))}
                </div>

                {chatpataContent?.bhaiKaSummary && chatpataContent.bhaiKaSummary.length > 0 && (
                  <div className="bg-[#FAF9F5] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]">
                    <h3 className="font-mono-editorial text-base font-bold text-[#141414] mb-3">
                      Bhai Ka 2-Minute Quick Summary:
                    </h3>
                    <div className="space-y-2">
                      {chatpataContent.bhaiKaSummary.map((sum, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-body text-[#333333]">
                          <span className="w-2 h-2 rounded-full bg-[#79A94A] shrink-0" />
                          <span>{sum}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* RENDER QUICK NOTES */}
            {activeStyleKey === 'quick' && (
              <div className="space-y-6">
                <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[3px_3px_0px_#141414]">
                  <h3 className="font-mono-editorial text-lg font-bold text-[#141414] mb-4">
                    High-Yield Bullet Formula & Concept Cards
                  </h3>
                  <div className="space-y-3">
                    {(quickContent?.cheatSheet || [])
                      .filter(sheet => !searchQuery || (typeof sheet === 'string' && sheet.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map((sheet, i) => (
                        <div key={i} className="p-3 rounded-xl border border-[#141414] bg-[#FAF9F5] text-xs sm:text-sm font-body text-[#222222] flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-[#E8F2DC] border border-[#79A94A] flex items-center justify-center font-mono text-[10px] font-bold text-[#79A94A] shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{sheet}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]">
                  <h3 className="font-mono-editorial text-base font-bold text-[#141414] mb-3">
                    Essential Exam Formulae
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(quickContent?.formulas || [])
                      .filter(f => !searchQuery || (f.name && f.name.toLowerCase().includes(searchQuery.toLowerCase())) || (f.formula && f.formula.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map((f, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-[#141414] bg-[#FFFFFF]">
                          <div className="text-xs font-mono font-bold text-[#5E5D57] uppercase">{f.name}</div>
                          <div className="font-mono text-sm font-bold text-[#141414] my-1 bg-[#E8F2DC]/60 px-2 py-1 rounded border border-[#79A94A]/30 inline-block">
                            {f.formula}
                          </div>
                          <div className="text-[11px] font-body text-[#8A8880]">{f.note}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* RENDER EXAM MODE */}
            {activeStyleKey === 'exam' && (
              <div className="space-y-6">
                <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]">
                  <span className="text-xs font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                    EXAM ANALYSIS
                  </span>
                  <h3 className="font-mono-editorial text-xl font-bold text-[#141414] mt-2">
                    Board & Competitive Question Forecast
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#4A4944] mt-1">
                    {kit.content?.exam?.trendAnalysis || 'Analysis of high-weightage topics.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {(kit.content?.exam?.questions || [])
                    .filter(q => !searchQuery || (q.question && q.question.toLowerCase().includes(searchQuery.toLowerCase())))
                    .map((q) => (
                      <div key={q.id} className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#141414] text-[#FFFFFF]">
                            {q.marks} Mark Question
                          </span>
                          <span className="text-xs font-mono text-[#5E5D57]">
                            Frequently in {q.frequentlyAskedIn}
                          </span>
                        </div>

                        <h4 className="font-mono-editorial text-base font-bold text-[#141414] mb-3">
                          Q: {q.question}
                        </h4>

                        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#141414] text-xs sm:text-sm font-body text-[#222222] whitespace-pre-line leading-relaxed mb-3">
                          <span className="font-mono font-bold text-[#79A94A] block mb-1">Model Answer:</span>
                          {q.answer}
                        </div>

                        <div className="p-3 rounded-lg bg-[#F1F7EA] border border-[#79A94A] text-xs font-body">
                          <span className="font-mono font-bold text-[#141414] block mb-1">Marking Scheme Rubric:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-[#333333]">
                            {(q.markingScheme || []).map((item, mIdx) => (
                              <li key={mIdx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Lecture Timestamps Index */}
            <div className="bg-[#FAF9F5] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414]">
              <h3 className="font-mono-editorial text-base font-bold text-[#141414] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#79A94A]" />
                Lecture Timestamps Index
              </h3>
              <div className="divide-y divide-[#DFDBCF]">
                {(kit.timestamps || []).map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveTimestamp(t)}
                    className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#E8F2DC]/40 px-2 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#79A94A] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#141414]/20 group-hover:border-[#79A94A]">
                        {t.time}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#141414]">
                        {t.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8A8880] group-hover:text-[#141414]" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: QUICK REVISION SHEET */}
        {/* ======================================================== */}
        {activeTab === 'revision' && (
          <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#DFDBCF]">
              <div>
                <span className="text-xs font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                  ONE-PAGE REVISION
                </span>
                <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] mt-2">
                  High-Yield Revision Sheet
                </h3>
              </div>
              <button
                onClick={handlePrint}
                className="btn-secondary-outline px-3.5 py-1.5 text-xs font-mono flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Revision Sheet</span>
              </button>
            </div>

            <div className="space-y-3">
              {(kit.quickRevisionPoints || []).map((pt, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-[#141414] bg-[#FFFFFF] flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#141414] text-[#FFFFFF] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm font-body text-[#141414] leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>

            {/* Formulas Box */}
            <div className="p-5 rounded-xl border-2 border-[#141414] bg-[#F1F7EA]">
              <div className="font-mono-editorial font-bold text-sm text-[#141414] mb-3">
                Key Formulas at a Glance:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {quickContent?.formulas?.map((f, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg border border-[#79A94A]/40">
                    <span className="font-bold text-[#141414]">{f.name}: </span>
                    <span className="text-[#79A94A] font-bold">{f.formula}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: EXAM MODE (PYQs) */}
        {/* ======================================================== */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414]">
              <span className="text-xs font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                BOARD & EXAM QUESTIONS
              </span>
              <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] mt-2">
                Frequently Asked Exam Questions & Marking Schemes
              </h3>
              <p className="font-body text-sm text-[#5E5D57] mt-1">
                Study exact answers graded by official board guidelines with deduction traps highlighted.
              </p>
            </div>

            {(kit.content?.exam?.questions || []).map((q) => (
              <div key={q.id} className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[3px_3px_0px_#141414]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#141414] text-[#FFFFFF]">
                    {q.marks} Mark Question
                  </span>
                  <span className="text-xs font-mono text-[#5E5D57]">
                    {q.frequentlyAskedIn}
                  </span>
                </div>

                <h4 className="font-mono-editorial text-lg font-bold text-[#141414] mb-3">
                  Q: {q.question}
                </h4>

                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#141414] text-xs sm:text-sm font-body text-[#222222] whitespace-pre-line leading-relaxed mb-3">
                  <span className="font-mono font-bold text-[#79A94A] block mb-1">Model Answer:</span>
                  {q.answer}
                </div>

                <div className="p-3.5 rounded-lg bg-[#F1F7EA] border border-[#79A94A] text-xs font-body">
                  <span className="font-mono font-bold text-[#141414] block mb-1">Examiner Rubric:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[#333333]">
                    {(q.markingScheme || []).map((item, mIdx) => (
                      <li key={mIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: QUESTIONS & RECALL FLASHCARDS */}
        {/* ======================================================== */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414]">
              <span className="text-xs font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                ACTIVE RECALL FLASHCARDS
              </span>
              <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] mt-2">
                Click any card to reveal the answer
              </h3>
              <p className="font-body text-sm text-[#5E5D57] mt-1">
                Test your conceptual memory before attempting the scored diagnostic quiz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(kit.flashcards || []).map((card) => {
                const isFlipped = !!flippedCards[card.id];
                return (
                  <div
                    key={card.id}
                    onClick={() => toggleCardFlip(card.id)}
                    className={`min-h-[170px] p-6 rounded-2xl border-2 border-[#141414] cursor-pointer transition-all flex flex-col justify-between ${
                      isFlipped
                        ? 'bg-[#E8F2DC] shadow-[4px_4px_0px_#79A94A]'
                        : 'bg-[#FCFAF6] shadow-[3px_3px_0px_#141414] hover:shadow-[5px_5px_0px_#141414]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#5E5D57] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#141414]/20">
                          {card.concept}
                        </span>
                        <span className="text-[11px] font-mono text-[#8A8880]">
                          {isFlipped ? 'Answer' : 'Tap to flip'}
                        </span>
                      </div>

                      <div className="font-mono-editorial text-base font-bold text-[#141414] mt-2">
                        {isFlipped ? card.back : card.front}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[#79A94A] font-semibold mt-4">
                      {isFlipped ? '✓ Got it!' : 'Question • Reveal concept →'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: DIAGNOSTIC QUIZ */}
        {/* ======================================================== */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414]">
              <span className="text-xs font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                TOPIC MASTERY
              </span>
              <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] mt-2">
                Instant Diagnostic Assessment
              </h3>
              <p className="font-body text-sm text-[#5E5D57] mt-1">
                Answer each question to pinpoint which lecture concepts need a quick 5-minute re-read.
              </p>
            </div>

            <QuizComponent
              kitId={kit.id}
              kitTitle={kit.title}
              questions={kit.quiz || []}
              onReviewTopic={(topic) => {
                setActiveTab('full');
                setSearchQuery(topic);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

      </div>

      {/* PDF Export Configuration Modal */}
      {isPdfModalOpen && (
        <PdfExportModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          kit={kit}
          initialMode={activeTab}
          userId={userId}
        />
      )}
    </div>
  );
};
