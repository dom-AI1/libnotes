import { useState, useEffect } from 'react';
import type { StudyKit, NoteStyle } from '../types';
import { 
  ArrowLeft, Copy, Printer, Check, Clock, Sparkles, BookOpen, 
  HelpCircle, Award, GraduationCap, ChevronRight, Play, Bookmark, Coffee, Search, X, Download 
} from 'lucide-react';
import { QuizComponent } from './QuizComponent';
import { PdfExportModal } from './PdfExportModal';

export interface SubjectTheme {
  name: string;
  primary: string;
  textDark: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  pillActive: string;
  accentBorder: string;
  bgLight: string;
}

export function getSubjectTheme(subject?: string): SubjectTheme {
  const s = (subject || '').toLowerCase();
  if (s.includes('account') || s.includes('commerce') || s.includes('business')) {
    return {
      name: 'Accountancy & Commerce',
      primary: '#059669', // Emerald
      textDark: '#064E3B',
      badgeBg: '#ECFDF5',
      badgeText: '#065F46',
      badgeBorder: '#A7F3D0',
      pillActive: 'bg-emerald-600 text-white',
      accentBorder: 'border-l-emerald-500',
      bgLight: '#F0FDF4',
    };
  }
  if (s.includes('physic')) {
    return {
      name: 'Physics',
      primary: '#2563EB', // Royal Blue
      textDark: '#1E3A8A',
      badgeBg: '#EFF6FF',
      badgeText: '#1E40AF',
      badgeBorder: '#BFDBFE',
      pillActive: 'bg-blue-600 text-white',
      accentBorder: 'border-l-blue-500',
      bgLight: '#F0F9FF',
    };
  }
  if (s.includes('chem')) {
    return {
      name: 'Chemistry',
      primary: '#7C3AED', // Violet / Purple
      textDark: '#4C1D95',
      badgeBg: '#F5F3FF',
      badgeText: '#5B21B6',
      badgeBorder: '#DDD6FE',
      pillActive: 'bg-purple-600 text-white',
      accentBorder: 'border-l-purple-500',
      bgLight: '#FAF5FF',
    };
  }
  if (s.includes('bio')) {
    return {
      name: 'Biology',
      primary: '#16A34A', // Leaf Green
      textDark: '#14532D',
      badgeBg: '#F0FDF4',
      badgeText: '#166534',
      badgeBorder: '#BBF7D0',
      pillActive: 'bg-green-600 text-white',
      accentBorder: 'border-l-green-500',
      bgLight: '#F7FEE7',
    };
  }
  if (s.includes('math')) {
    return {
      name: 'Mathematics',
      primary: '#4F46E5', // Indigo
      textDark: '#312E81',
      badgeBg: '#EEF2FF',
      badgeText: '#3730A3',
      badgeBorder: '#C7D2FE',
      pillActive: 'bg-indigo-600 text-white',
      accentBorder: 'border-l-indigo-500',
      bgLight: '#F8FAFC',
    };
  }
  if (s.includes('econo')) {
    return {
      name: 'Economics',
      primary: '#0D9488', // Teal
      textDark: '#134E4A',
      badgeBg: '#F0FDFA',
      badgeText: '#115E59',
      badgeBorder: '#99F6E4',
      pillActive: 'bg-teal-600 text-white',
      accentBorder: 'border-l-teal-500',
      bgLight: '#F0FDFA',
    };
  }
  return {
    name: subject || 'General',
    primary: '#059669',
    textDark: '#064E3B',
    badgeBg: '#ECFDF5',
    badgeText: '#065F46',
    badgeBorder: '#A7F3D0',
    pillActive: 'bg-emerald-600 text-white',
    accentBorder: 'border-l-emerald-500',
    bgLight: '#F8FAFC',
  };
}

export function formatCleanTopicTitle(rawTitle?: string, subject?: string): string {
  if (!rawTitle) return subject ? `${subject} Revision Notes` : 'Lecture Notes';
  let clean = rawTitle;
  clean = clean.replace(/\b(viddsave\.com|y2mate(\.is|\.tools)?|yt1s(\.com)?|ssyoutube|savefrom)\b/gi, '');
  clean = clean.replace(/\b(720p|1080p|480p|360p|hd|hq)\b/gi, '');
  clean = clean.replace(/\.(mp4|mkv|webm|mp3|wav|m4a|aac)$/gi, '');
  clean = clean.replace(/[_\-]+/g, ' ');

  // Split by pipe or bullet if YouTube title is padded with syllabus keywords
  const pipeParts = clean.split(/[|•]/).map(p => p.trim()).filter(Boolean);
  if (pipeParts.length > 0) {
    clean = pipeParts[0];
  }

  // Remove CBSE exam boilerplate
  clean = clean.replace(/\b(CBSE|ISC|ICSE)\s+\d{4}(-\d{2})?\s*(Exam|Paper)?/gi, '');
  clean = clean.replace(/\s{2,}/g, ' ').trim();

  return clean.length > 3 ? clean : rawTitle;
}

function formatCleanIntro(intro?: string, _title?: string, subject?: string): string {
  if (!intro) return `High-retention study notes and conceptual framework for ${subject || 'this lecture'}.`;
  if (intro.includes('Comprehensive analytical lecture synthesis for') || intro.includes('Structured in alignment with CBSE')) {
    return `Core academic concepts, governing equations, step-by-step problem frameworks, and high-yield exam takeaways synthesized from this lecture.`;
  }
  return intro;
}

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

  const theme = getSubjectTheme(kit.subject);
  const cleanTitle = formatCleanTopicTitle(kit.title, kit.subject);
  const cleanIntro = formatCleanIntro(kit.content?.topper?.introduction, kit.title, kit.subject);

  const handleCopy = () => {
    const formulasText = quickContent?.formulas?.map(f => `${f.name}: ${f.formula} (${f.note})`).join('\n') || '';
    const revisionPts = (kit.quickRevisionPoints || []).join('\n');
    const textToCopy = `LIBNOTES STUDY KIT: ${cleanTitle}\nSubject: ${kit.subject || ''} | Class: ${kit.academicClass || ''}\n\n` +
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
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-[#0F172A]">
      
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs no-print">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          
          {/* Back & Breadcrumb */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] hover:bg-[#F1F5F9] shadow-xs transition-all cursor-pointer"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4 text-[#0F172A]" />
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#64748B]">
                {kit.autoDetected && (
                  <>
                    <span 
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-2xs"
                      style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                    >
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
                    <span className="text-[#0F172A] font-medium">{kit.stream}</span>
                  </>
                )}
                <span>•</span>
                <span className="font-semibold" style={{ color: theme.primary }}>{kit.subject}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold" style={{ color: theme.primary }}>
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
              <h1 className="font-mono-editorial text-sm sm:text-base font-bold text-[#0F172A] truncate max-w-[180px] xs:max-w-xs sm:max-w-md md:max-w-lg">
                {cleanTitle}
              </h1>
            </div>
          </div>

          {/* Action Bar: Style Switcher & Export Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            
            {/* Note Style Switcher Pills */}
            <div className="hidden md:flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full p-1 shadow-2xs">
              {(['quick', 'topper', 'chatpata', 'exam'] as NoteStyle[]).map((st) => (
                <button
                  key={st}
                  onClick={() => onStyleChange(st)}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeStyleKey === st
                      ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs font-semibold'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFFFFF]'
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
              className="md:hidden text-xs font-mono border border-[#CBD5E1] bg-[#FFFFFF] text-[#0F172A] rounded-lg px-2 py-1.5 focus:outline-none"
            >
              <option value="quick">Quick Notes</option>
              <option value="topper">Topper Notes</option>
              <option value="chatpata">Chatpata Notes</option>
              <option value="exam">Exam Mode</option>
            </select>

            {/* Bookmark button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                bookmarked ? 'bg-[#ECFDF5] border-[#10B981] text-[#059669]' : 'border-[#CBD5E1] bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#64748B]'
              } shadow-xs`}
              title="Bookmark kit"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-full border border-[#CBD5E1] bg-[#FFFFFF] hover:bg-[#F8FAFC] text-xs font-mono font-semibold text-[#0F172A] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="btn-primary-green px-3.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              title="Configure and download real structured A4 PDF notes"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="btn-secondary-outline px-3 py-1.5 text-xs font-mono font-semibold flex items-center gap-1.5 hidden sm:flex cursor-pointer"
              title="Browser print sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-[#E2E8F0] pt-2 pb-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('full')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'full'
                ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Full Notes ({styleNames[activeStyleKey]})</span>
          </button>

          <button
            onClick={() => setActiveTab('revision')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'revision'
                ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
            }`}
          >
            <Sparkles className="w-4 h-4" style={{ color: theme.primary }} />
            <span>Quick Revision</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'exam'
                ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Exam Mode (Practice & Rubrics)</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Questions & Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-[#059669] text-[#FFFFFF] shadow-xs'
                : 'text-[#065F46] font-semibold bg-[#ECFDF5] hover:bg-[#D1FAE5]'
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
          <div className="mb-6 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#0F172A] min-w-0 max-w-full">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
              <span className="font-bold shrink-0">Verified Source Grounded:</span>
              <span className="text-[#64748B] truncate max-w-[180px] xs:max-w-xs sm:max-w-[240px] md:max-w-md">
                {kit.verifiedLecture.sourceIdentifier}
              </span>
            </div>
            {kit.verifiedLecture.visualEvidenceDisclosed && (
              <span 
                className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-full border w-fit max-w-full text-left break-words shrink-0"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
              >
                ✓ {kit.verifiedLecture.visualEvidenceDisclosed.includes('Visual') || kit.verifiedLecture.visualEvidenceDisclosed.length > 45
                  ? 'Audio transcript & source verified'
                  : kit.verifiedLecture.visualEvidenceDisclosed}
              </span>
            )}
          </div>
        )}
        
        {/* In-Page Keyword Search */}
        <div className="mb-6 relative no-print">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, formulas or questions within this lecture..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-xs font-body text-[#0F172A] focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Active Filter Pill */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-mono text-[#065F46] no-print animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Filtering notes for concept: <strong className="font-bold underline decoration-[#10B981]">"{searchQuery}"</strong></span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#065F46] hover:text-[#047857] underline font-mono ml-2 shrink-0 cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Timestamp Concept Popup Modal / Alert */}
        {activeTimestamp && (
          <div className="mb-6 p-4 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] shadow-sm flex items-start justify-between gap-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                style={{ backgroundColor: theme.badgeBg, borderColor: theme.badgeBorder, color: theme.primary }}
              >
                <Play className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                    style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                  >
                    {activeTimestamp.time} ({activeTimestamp.seconds}s)
                  </span>
                  <span className="font-mono-editorial text-sm font-bold text-[#0F172A]">
                    {activeTimestamp.title}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] font-body mt-1">
                  {activeTimestamp.summary}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTimestamp(null)}
              className="text-xs font-mono text-[#94A3B8] hover:text-[#0F172A] border border-[#E2E8F0] px-2 py-1 rounded cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: FULL NOTES (STYLE DEPENDENT) */}
        {/* ======================================================== */}
        {activeTab === 'full' && (
          <div className="space-y-6">
            
            {/* Title & High-Retention Student Overview Card */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
              
              {/* Dynamic Subject Accent Glow Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: theme.primary }}
              />

              <div className="flex flex-wrap items-center gap-2 mb-3 pt-1">
                <span 
                  className="text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-2xs"
                  style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                >
                  {kit.subject ? kit.subject.toUpperCase() : 'STUDY KIT'} • {kit.academicClass || 'CLASS 11/12'}
                </span>
                <span className="text-xs font-mono font-semibold text-[#0F172A] bg-[#F1F5F9] px-3 py-1 rounded-full border border-[#E2E8F0]">
                  Style: {styleNames[activeStyleKey]}
                </span>
                <span className="text-xs font-mono text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                  Audio: {kit.language}
                </span>
              </div>

              {/* Clean Human Title */}
              <h2 className="font-mono-editorial text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] leading-tight">
                {cleanTitle}
              </h2>

              {/* Student Friendly Intro (Removes robot text) */}
              <p className="font-body text-sm sm:text-base text-[#475569] mt-3 leading-relaxed max-w-3xl">
                {activeStyleKey === 'chatpata'
                  ? chatpataContent?.hinglishIntro || 'Conversational summary of this lecture.'
                  : cleanIntro}
              </p>

              {/* Student "What to Read First" Navigator (Eliminates feeling of wordy clutter) */}
              <div className="mt-5 pt-4 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: theme.badgeBg, color: theme.primary }}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase">Deep Dive Sections</div>
                    <div className="text-xs font-bold text-[#0F172A]">
                      {kit.content?.topper?.deepDive?.length || 3} Core Concepts
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: theme.badgeBg, color: theme.primary }}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase">Formulas & Rules</div>
                    <div className="text-xs font-bold text-[#0F172A]">
                      {quickContent?.formulas?.length || 4} Verified Equations
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: theme.badgeBg, color: theme.primary }}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] uppercase">Practice Quiz</div>
                    <div className="text-xs font-bold text-[#0F172A]">
                      {kit.quiz?.length || 5} Questions Ready
                    </div>
                  </div>
                </div>
              </div>
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
                      className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0"
                            style={{ backgroundColor: theme.badgeBg, color: theme.primary }}
                          >
                            {idx + 1}
                          </span>
                          <h3 className="font-mono-editorial text-lg sm:text-xl font-bold text-[#0F172A]">
                            {section.title}
                          </h3>
                        </div>
                        <button
                          onClick={() =>
                            setActiveTimestamp({
                              time: section.timestamp,
                              seconds: 195,
                              title: section.title,
                              summary: section.keyTakeaway,
                            })
                          }
                          className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all self-start sm:self-auto cursor-pointer"
                          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                        >
                          <Clock className="w-3 h-3" />
                          <span>[{section.timestamp}]</span>
                        </button>
                      </div>

                      <p className="font-body text-sm sm:text-base text-[#334155] leading-relaxed">
                        {section.content}
                      </p>

                      <div 
                        className="mt-4 p-3.5 rounded-xl border text-xs font-body"
                        style={{ backgroundColor: theme.bgLight, borderColor: theme.badgeBorder }}
                      >
                        <span className="font-mono font-bold mr-1.5" style={{ color: theme.primary }}>
                          💡 KEY TAKEAWAY:
                        </span>
                        <span className="text-[#0F172A] font-medium">{section.keyTakeaway}</span>
                      </div>
                    </div>
                  ))}

                {/* Derivations */}
                {(kit.content?.topper?.derivations || []).length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs">
                    <h3 className="font-mono-editorial text-lg sm:text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" style={{ color: theme.primary }} />
                      Mathematical Derivations & Analytical Proofs
                    </h3>
                    <div className="space-y-4">
                      {(kit.content?.topper?.derivations || []).map((d, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                          <div className="font-mono-editorial font-bold text-sm text-[#0F172A] mb-2">
                            {d.title}
                          </div>
                          <div className="space-y-1.5 pl-3 border-l-2 my-3 font-mono text-xs text-[#334155]" style={{ borderColor: theme.primary }}>
                            {(d.steps || []).map((st, sIdx) => (
                              <div key={sIdx}>{st}</div>
                            ))}
                          </div>
                          <div 
                            className="mt-2 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border inline-block"
                            style={{ backgroundColor: theme.badgeBg, color: theme.textDark, borderColor: theme.badgeBorder }}
                          >
                            Final Result: {d.finalResult}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topper Pro Tips */}
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                  <h3 className="font-mono-editorial text-base font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" style={{ color: theme.primary }} />
                    Topper Pro Tips & Common Traps
                  </h3>
                  <ul className="space-y-2">
                    {(kit.content?.topper?.proTips || []).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-body text-[#334155]">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: theme.primary }} />
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
                        className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-2 font-mono-editorial text-base font-bold text-[#0F172A]">
                          <Coffee className="w-4 h-4 text-[#D97706]" />
                          {item.concept}
                        </div>

                        <p className="font-body text-sm sm:text-base text-[#334155] leading-relaxed whitespace-pre-line">
                          {item.analogy}
                        </p>

                        <div className="mt-4 p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs font-mono font-bold text-[#92400E]">
                          💡 Desi Punchline: {item.desiPunchline}
                        </div>
                      </div>
                    ))}
                </div>

                {chatpataContent?.bhaiKaSummary && chatpataContent.bhaiKaSummary.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                    <h3 className="font-mono-editorial text-base font-bold text-[#0F172A] mb-3">
                      Bhai Ka 2-Minute Quick Summary:
                    </h3>
                    <div className="space-y-2">
                      {chatpataContent.bhaiKaSummary.map((sum, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-body text-[#334155]">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
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
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs">
                  <h3 className="font-mono-editorial text-lg font-bold text-[#0F172A] mb-4">
                    High-Yield Bullet Formula & Concept Cards
                  </h3>
                  <div className="space-y-3">
                    {(quickContent?.cheatSheet || [])
                      .filter(sheet => !searchQuery || (typeof sheet === 'string' && sheet.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map((sheet, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs sm:text-sm font-body text-[#1E293B] flex items-start gap-2.5">
                          <span 
                            className="w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5 border"
                            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                          >
                            {i + 1}
                          </span>
                          <span>{sheet}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                  <h3 className="font-mono-editorial text-base font-bold text-[#0F172A] mb-3">
                    Essential Exam Formulae
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(quickContent?.formulas || [])
                      .filter(f => !searchQuery || (f.name && f.name.toLowerCase().includes(searchQuery.toLowerCase())) || (f.formula && f.formula.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map((f, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xs">
                          <div className="text-xs font-mono font-bold text-[#64748B] uppercase">{f.name}</div>
                          <div 
                            className="font-mono text-sm font-bold my-1 px-2.5 py-1 rounded border inline-block"
                            style={{ backgroundColor: theme.badgeBg, color: theme.textDark, borderColor: theme.badgeBorder }}
                          >
                            {f.formula}
                          </div>
                          <div className="text-[11px] font-body text-[#94A3B8]">{f.note}</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* RENDER EXAM MODE */}
            {activeStyleKey === 'exam' && (
              <div className="space-y-6">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                  <span 
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                    style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                  >
                    EXAM ANALYSIS & RUBRICS
                  </span>
                  <h3 className="font-mono-editorial text-lg font-bold text-[#0F172A] mt-2">
                    Board Marking Scheme & Question Blueprints
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-[#475569] mt-1 leading-relaxed">
                    {kit.content?.exam?.trendAnalysis || 'Practice high-weightage questions with step-by-step marking rubrics.'}
                  </p>
                </div>

                {/* Exam Questions List */}
                <div className="space-y-4">
                  {(kit.content?.exam?.questions || [])
                    .filter(q => !searchQuery || (q.question && q.question.toLowerCase().includes(searchQuery.toLowerCase())) || (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())))
                    .map((q, i) => (
                      <div key={i} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border"
                            style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                          >
                            {q.marks || 3} Marks Question
                          </span>
                          <span className="text-[11px] font-mono text-[#94A3B8]">
                            {q.frequentlyAskedIn || 'Curriculum Practice'}
                          </span>
                        </div>
                        <h4 className="font-mono-editorial text-sm sm:text-base font-bold text-[#0F172A] mb-2">
                          Q{i + 1}: {q.question}
                        </h4>
                        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-body text-xs sm:text-sm text-[#334155] leading-relaxed">
                          <span className="font-bold text-[#0F172A] block mb-1">Model Solution & Marking Rubric:</span>
                          {q.answer}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Lecture Timestamps Index */}
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
              <h3 className="font-mono-editorial text-base font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: theme.primary }} />
                Lecture Timestamps Index
              </h3>
              <div className="divide-y divide-[#E2E8F0]">
                {(kit.timestamps || []).map((t, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveTimestamp(t)}
                    className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] px-2 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span 
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                        style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                      >
                        {t.time}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#1E293B] group-hover:text-[#0F172A]">
                        {t.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0F172A]" />
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
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div>
                <span 
                  className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                  style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                >
                  ONE-PAGE REVISION
                </span>
                <h3 className="font-mono-editorial text-xl sm:text-2xl font-bold text-[#0F172A] mt-2">
                  High-Yield Revision Sheet
                </h3>
              </div>
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#0F172A] transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Revision Sheet</span>
              </button>
            </div>

            <div className="space-y-3">
              {(kit.quickRevisionPoints || []).map((pt, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] flex items-start gap-3">
                  <span 
                    className="w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 border"
                    style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-body text-[#334155] leading-relaxed">{pt}</p>
                </div>
              ))}
            </div>

            {/* Formulas Box */}
            <div 
              className="p-5 rounded-xl border"
              style={{ backgroundColor: theme.bgLight, borderColor: theme.badgeBorder }}
            >
              <div className="font-mono-editorial font-bold text-sm text-[#0F172A] mb-3">
                Key Formulas at a Glance:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {quickContent?.formulas?.map((f, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg border border-[#E2E8F0]">
                    <span className="font-bold text-[#0F172A]">{f.name}: </span>
                    <span className="font-bold" style={{ color: theme.primary }}>{f.formula}</span>
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
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
              <span 
                className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
              >
                SYLLABUS & EXAM PRACTICE
              </span>
              <h3 className="font-mono-editorial text-xl sm:text-2xl font-bold text-[#0F172A] mt-2">
                Curriculum Practice Questions & Step Marking Schemes
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                Syllabus-aligned practice questions structured by standard weightage (1, 3, 5 marks) with transparent step-by-step evaluation rubrics.
              </p>
              <div className="mt-3.5 inline-flex items-center gap-2 text-xs font-mono text-[#64748B] bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <span>Source Grounded: Practice material algorithmically synthesized from verified lecture concepts.</span>
              </div>
            </div>

            {(kit.content?.exam?.questions || []).map((q) => (
              <div key={q.id} className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="font-mono text-xs font-bold px-3 py-1 rounded-full border"
                    style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                  >
                    {q.marks} Mark Question
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">
                    {q.frequentlyAskedIn}
                  </span>
                </div>

                <h4 className="font-mono-editorial text-base sm:text-lg font-bold text-[#0F172A] mb-3">
                  Q: {q.question}
                </h4>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs sm:text-sm font-body text-[#334155] whitespace-pre-line leading-relaxed mb-3">
                  <span className="font-mono font-bold block mb-1" style={{ color: theme.primary }}>Model Answer:</span>
                  {q.answer}
                </div>

                <div 
                  className="p-3.5 rounded-lg border text-xs font-body"
                  style={{ backgroundColor: theme.bgLight, borderColor: theme.badgeBorder }}
                >
                  <span className="font-mono font-bold text-[#0F172A] block mb-1">Examiner Rubric:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-[#334155]">
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
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
              <span 
                className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
              >
                ACTIVE RECALL FLASHCARDS
              </span>
              <h3 className="font-mono-editorial text-xl sm:text-2xl font-bold text-[#0F172A] mt-2">
                Click any card to reveal the answer
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
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
                    className={`min-h-[170px] p-6 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isFlipped
                        ? 'border-[#0F172A] shadow-md'
                        : 'bg-[#FFFFFF] border-[#E2E8F0] shadow-xs hover:border-[#CBD5E1] hover:shadow-sm'
                    }`}
                    style={isFlipped ? { backgroundColor: theme.bgLight } : undefined}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border"
                          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
                        >
                          {card.concept}
                        </span>
                        <span className="text-[11px] font-mono text-[#94A3B8]">
                          {isFlipped ? 'Answer' : 'Tap to flip'}
                        </span>
                      </div>

                      <div className="font-mono-editorial text-sm sm:text-base font-bold text-[#0F172A] mt-2">
                        {isFlipped ? card.back : card.front}
                      </div>
                    </div>

                    <div 
                      className="text-[11px] font-mono font-semibold mt-4"
                      style={{ color: theme.primary }}
                    >
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
            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
              <span 
                className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText, borderColor: theme.badgeBorder }}
              >
                TOPIC MASTERY
              </span>
              <h3 className="font-mono-editorial text-xl sm:text-2xl font-bold text-[#0F172A] mt-2">
                Instant Diagnostic Assessment
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
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
