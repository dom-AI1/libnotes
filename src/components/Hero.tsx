import { useState } from 'react';
import { UploadCloud, Link as LinkIcon, Sparkles, ChevronDown, CheckCircle2, PlayCircle, Film } from 'lucide-react';
import type { NoteStyle } from '../types';

interface HeroProps {
  onStartGeneration: (source: 'upload' | 'link', linkUrl: string, style: NoteStyle) => void;
  onSelectSample: (sampleId: string) => void;
  isAuthenticated?: boolean;
  onRequireAuth?: (pendingData: { source: 'upload' | 'link'; linkUrl: string; style: NoteStyle }) => void;
  onWatchVideo?: (videoType?: 'about' | 'tutorial') => void;
}

export const Hero = ({ onStartGeneration, onSelectSample, isAuthenticated = false, onRequireAuth, onWatchVideo }: HeroProps) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'link'>('link');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<NoteStyle>('topper');
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);

  const styleLabels: Record<NoteStyle, { label: string; tag: string }> = {
    quick: { label: 'Quick Notes', tag: 'High-yield bullets' },
    minimal: { label: 'Quick Notes', tag: 'High-yield bullets' },
    topper: { label: 'Topper Notes', tag: 'Detailed + proofs' },
    chatpata: { label: 'Chatpata Notes', tag: 'Fun Hinglish vibe' },
    chatpate: { label: 'Chatpata Notes', tag: 'Fun Hinglish vibe' },
    exam: { label: 'Exam Mode', tag: 'PYQs & 1/3/5 marks' },
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated && onRequireAuth) {
      onRequireAuth({ source: activeTab, linkUrl: videoUrl, style: selectedStyle });
      return;
    }
    onStartGeneration(activeTab, videoUrl, selectedStyle);
  };

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">

      {/* Editorial Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFAF6] border border-[#141414] shadow-[2px_2px_0px_#141414] mb-8 text-xs font-mono font-medium tracking-wide">
        <span className="w-2 h-2 rounded-full bg-[#79A94A]" />
        <span>V2.4 • MULTI-STYLE AI LECTURE DIGEST</span>
      </div>

      {/* Hero Headline */}
      <h1 className="font-mono-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#141414] tracking-tight leading-[1.18] sm:leading-[1.12] max-w-4xl mx-auto mb-5 sm:mb-6 break-words">
        Turn educational videos into{' '}
        <span className="selection-box text-[#141414] transition-all hover:scale-105 inline-block">
          exam-ready
        </span>{' '}
        notes.
      </h1>

      {/* Supporting Text */}
      <p className="font-body text-sm sm:text-xl md:text-2xl text-[#4A4944] max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-10 px-1 sm:px-0">
        Your lectures, transformed into notes, revision sheets and quizzes — in minutes.
      </p>

      {/* Compact Horizontal Action Bar */}
      <div className="max-w-3xl mx-auto bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl shadow-[4px_4px_0px_#141414] p-3 sm:p-4 text-left transition-all">

        {/* Toggle Mode: Upload vs Link */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-[#DFDBCF]">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'link'
              ? 'bg-[#E8F2DC] text-[#141414] border border-[#79A94A]'
              : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
              }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-[#79A94A]" />
            Paste Video Link
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'upload'
              ? 'bg-[#E8F2DC] text-[#141414] border border-[#79A94A]'
              : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
              }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#79A94A]" />
            Upload Video File
          </button>
          <span className="text-[11px] text-[#8A8880] font-mono hidden sm:inline-block ml-auto">
            YouTube, MP4, MKV or Audio
          </span>
        </div>

        {/* Input & Form */}
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row items-stretch gap-2.5">
          {activeTab === 'link' ? (
            <div className="relative flex-1">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste YouTube or lecture URL (e.g. youtube.com/watch?v=...)"
                className="w-full h-12 px-4 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-sm font-body text-[#141414] placeholder:text-[#8A8880] focus:outline-none focus:ring-2 focus:ring-[#79A94A] focus:border-[#79A94A]"
              />
            </div>
          ) : (
            <div
              onClick={handleGenerate}
              className="relative flex-1 flex items-center justify-center px-4 py-2.5 border border-dashed border-[#141414]/40 rounded-xl bg-[#FAF9F5] text-xs font-mono text-[#5E5D57] cursor-pointer hover:bg-[#E8F2DC]/40 hover:border-[#79A94A] transition-colors"
            >
              <UploadCloud className="w-4 h-4 mr-2 text-[#79A94A]" />
              <span>Drag & drop lecture video or browse file (up to 500MB)</span>
            </div>
          )}

          {/* Style Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
              className="w-full md:w-48 h-12 px-3.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] flex items-center justify-between text-xs font-body hover:border-[#141414] transition-all"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#8A8880] font-mono uppercase tracking-wider">Style</span>
                <span className="font-semibold text-[#141414] truncate">{styleLabels[selectedStyle].label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#5E5D57]" />
            </button>

            {isStyleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20 cursor-default"
                  onClick={() => setIsStyleDropdownOpen(false)}
                />
                <div className="absolute left-0 sm:left-auto right-0 mt-1.5 w-full sm:w-60 bg-[#FCFAF6] border-2 border-[#141414] rounded-xl shadow-[3px_3px_0px_#141414] p-1.5 z-30 space-y-1">
                  {(Object.keys(styleLabels) as NoteStyle[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(st);
                        setIsStyleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-body transition-colors flex items-center justify-between ${selectedStyle === st ? 'bg-[#E8F2DC] text-[#141414] font-semibold' : 'hover:bg-[#EFECE1]'
                        }`}
                    >
                      <div>
                        <div className="font-medium text-[#141414]">{styleLabels[st].label}</div>
                        <div className="text-[10px] text-[#5E5D57]">{styleLabels[st].tag}</div>
                      </div>
                      {selectedStyle === st && <CheckCircle2 className="w-3.5 h-3.5 text-[#79A94A]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="btn-primary-green h-12 px-6 flex items-center justify-center gap-2 text-sm whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Notes</span>
          </button>
        </form>
      </div>

      {/* Trust-oriented Caption Beneath Actions */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] sm:text-xs font-mono text-[#5E5D57]">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#79A94A]" />
          Accurate English & Hinglish transcription
        </span>
        <span className="hidden sm:inline-block text-[#DFDBCF]">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#79A94A]" />
          Instant chapter breakdowns & timestamp links
        </span>
        <span className="hidden sm:inline-block text-[#DFDBCF]">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#79A94A]" />
          Board & university syllabus aligned
        </span>
      </div>

      {/* Watch Video & Quick Sample Selector */}
      <div className="mt-8 pt-6 border-t border-[#141414]/10 max-w-2xl mx-auto flex flex-col items-center">
        {onWatchVideo && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => onWatchVideo('tutorial')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F2DC] border-2 border-[#141414] shadow-[2px_2px_0px_#141414] hover:shadow-[3px_3px_0px_#141414] text-xs font-mono font-bold text-[#141414] hover:bg-[#D5E8C0] transition-all cursor-pointer active:translate-y-0.5"
            >
              <Film className="w-3.5 h-3.5 text-[#79A94A]" />
              <span>▶ Watch 60s Guide: Login to Chatbot Notes</span>
            </button>
            <button
              type="button"
              onClick={() => onWatchVideo('about')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FCFAF6] border border-[#141414] shadow-[1.5px_1.5px_0px_#141414] hover:bg-[#EFECE1] text-xs font-mono font-medium text-[#141414] transition-all cursor-pointer active:translate-y-0.5"
            >
              <span>🎬 About Us Video</span>
            </button>
          </div>
        )}

        <p className="text-xs font-mono uppercase tracking-wider text-[#8A8880] mb-3">
          Or explore an instant sample study kit:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => onSelectSample('kit-thermodynamics')}
            className="px-3 py-1.5 rounded-full border border-[#141414] bg-[#FFFFFF] hover:bg-[#E8F2DC] text-xs font-medium text-[#141414] transition-all flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#141414]"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#79A94A]" />
            Physics: Thermodynamics (Class 12)
          </button>
          <button
            onClick={() => onSelectSample('kit-organic')}
            className="px-3 py-1.5 rounded-full border border-[#141414] bg-[#FFFFFF] hover:bg-[#E8F2DC] text-xs font-medium text-[#141414] transition-all flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#141414]"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#79A94A]" />
            Chemistry: SN1 vs SN2 (Class 12)
          </button>
          <button
            onClick={() => onSelectSample('kit-neural-networks')}
            className="px-3 py-1.5 rounded-full border border-[#141414] bg-[#FFFFFF] hover:bg-[#E8F2DC] text-xs font-medium text-[#141414] transition-all flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#141414]"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#79A94A]" />
            CS: Neural Networks (B.Tech)
          </button>
        </div>
      </div>
    </section>
  );
};
