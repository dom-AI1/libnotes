import { useState } from 'react';
import { UploadCloud, Link as LinkIcon, Sparkles, ChevronDown, CheckCircle2, PlayCircle, Film, BookOpen } from 'lucide-react';
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
    quick: { label: 'Quick Notes', tag: 'High-yield revision points' },
    minimal: { label: 'Quick Notes', tag: 'High-yield revision points' },
    topper: { label: 'Topper Notes', tag: 'In-depth proofs & numericals' },
    chatpata: { label: 'Chatpata Notes', tag: 'Intuitive analogies & tricks' },
    chatpate: { label: 'Chatpata Notes', tag: 'Intuitive analogies & tricks' },
    exam: { label: 'Exam Mode', tag: 'Marking rubrics & PYQ blueprints' },
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
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">

      {/* Editorial Academic Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] shadow-xs mb-6 text-xs font-mono font-medium text-[#647168] dark:text-[#B2BDB5]">
        <span className="w-2 h-2 rounded-full bg-[#486B54] dark:bg-[#A8C5AD]" />
        <span>ACADEMIC NOTE-MAKING METHODOLOGY • CBSE & UNIVERSITY ALIGNED</span>
      </div>

      {/* Primary Headline */}
      <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#24332D] dark:text-[#E8EEE9] tracking-tight leading-[1.15] sm:leading-[1.1] max-w-4xl mx-auto mb-4 sm:mb-6 break-words">
        Your lectures, organised for learning.
      </h1>

      {/* Supporting Text — Preserving test phrase 'Turn educational videos into exam-ready' */}
      <p className="font-body text-base sm:text-lg md:text-xl text-[#647168] dark:text-[#B2BDB5] max-w-2xl mx-auto leading-relaxed mb-8 px-2 sm:px-0">
        Turn educational videos into{' '}
        <span className="selection-box font-medium inline-block">
          exam-ready
        </span>{' '}
        structured notes, explanations, and revision material.
      </p>

      {/* Central Action Card */}
      <div className="max-w-3xl mx-auto bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl shadow-sm p-3.5 sm:p-5 text-left transition-colors">

        {/* Toggle Mode: Upload vs Link */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-[#E2E7E1] dark:border-[#354139]">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'link'
                ? 'bg-[#E5EDE5] dark:bg-[#2D3A32] text-[#24332D] dark:text-[#E8EEE9] border border-[#486B54] dark:border-[#A8C5AD]'
                : 'text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622]'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
            Paste Video Link
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-[#E5EDE5] dark:bg-[#2D3A32] text-[#24332D] dark:text-[#E8EEE9] border border-[#486B54] dark:border-[#A8C5AD]'
                : 'text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622]'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
            Upload Video File
          </button>
          <span className="text-[11px] text-[#647168] dark:text-[#B2BDB5] font-mono hidden sm:inline-block ml-auto">
            YouTube, MP4, Audio, or Class Recording
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
                className="w-full h-12 px-4 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] text-sm font-body text-[#24332D] dark:text-[#E8EEE9] placeholder:text-[#647168] dark:placeholder:text-[#B2BDB5] focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD]"
              />
            </div>
          ) : (
            <div
              onClick={handleGenerate}
              className="relative flex-1 flex items-center justify-center px-4 py-2.5 border border-dashed border-[#E2E7E1] dark:border-[#354139] rounded-xl bg-[#F4F5F2] dark:bg-[#171C1A] text-xs font-mono text-[#647168] dark:text-[#B2BDB5] cursor-pointer hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] transition-colors"
            >
              <UploadCloud className="w-4 h-4 mr-2 text-[#486B54] dark:text-[#A8C5AD]" />
              <span>Drag & drop lecture video or browse file (MP4, MKV, MP3 up to 500MB)</span>
            </div>
          )}

          {/* Style Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
              className="w-full md:w-48 h-12 px-3.5 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-between text-xs font-body hover:border-[#486B54] dark:hover:border-[#A8C5AD] transition-all cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#647168] dark:text-[#B2BDB5] font-mono uppercase tracking-wider">Style</span>
                <span className="font-semibold text-[#24332D] dark:text-[#E8EEE9] truncate">{styleLabels[selectedStyle].label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#647168] dark:text-[#B2BDB5]" />
            </button>

            {isStyleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20 cursor-default"
                  onClick={() => setIsStyleDropdownOpen(false)}
                />
                <div className="absolute left-0 sm:left-auto right-0 mt-1.5 w-full sm:w-60 bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl shadow-lg p-1.5 z-30 space-y-1">
                  {(Object.keys(styleLabels) as NoteStyle[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setSelectedStyle(st);
                        setIsStyleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-body transition-colors flex items-center justify-between cursor-pointer ${
                        selectedStyle === st
                          ? 'bg-[#E5EDE5] dark:bg-[#2D3A32] text-[#24332D] dark:text-[#E8EEE9] font-semibold'
                          : 'hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622] text-[#647168] dark:text-[#B2BDB5]'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-[#24332D] dark:text-[#E8EEE9]">{styleLabels[st].label}</div>
                        <div className="text-[10px] text-[#647168] dark:text-[#B2BDB5]">{styleLabels[st].tag}</div>
                      </div>
                      {selectedStyle === st && <CheckCircle2 className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            className="btn-primary-green h-12 px-6 flex items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Notes</span>
          </button>
        </form>
      </div>

      {/* Honest Pedagogical Highlights */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
          Direct audio & video transcript grounding
        </span>
        <span className="hidden sm:inline-block text-[#E2E7E1] dark:text-[#354139]">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
          Zero hallucinated quotes or citations
        </span>
        <span className="hidden sm:inline-block text-[#E2E7E1] dark:text-[#354139]">•</span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
          Ready-to-print 1-page revision sheets
        </span>
      </div>

      {/* Quick Sample Selector */}
      <div className="mt-8 pt-6 border-t border-[#E2E7E1] dark:border-[#354139] max-w-2xl mx-auto flex flex-col items-center">
        {onWatchVideo && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => onWatchVideo('tutorial')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#486B54] dark:border-[#A8C5AD] text-xs font-mono font-bold text-[#24332D] dark:text-[#E8EEE9] hover:opacity-90 transition-all cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
              <span>▶ Watch 60s Guide: Login to Chatbot Notes</span>
            </button>
            <button
              type="button"
              onClick={() => onWatchVideo('about')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] text-xs font-mono font-medium text-[#24332D] dark:text-[#E8EEE9] hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622] transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
              <span>About Us Story</span>
            </button>
          </div>
        )}

        <p className="text-xs font-mono uppercase tracking-wider text-[#647168] dark:text-[#B2BDB5] mb-3">
          Or explore an authentic verified sample kit:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => onSelectSample('kit-thermodynamics')}
            className="px-3 py-1.5 rounded-full border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-xs font-medium text-[#24332D] dark:text-[#E8EEE9] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
            Physics: Thermodynamics (Class 12)
          </button>
          <button
            onClick={() => onSelectSample('kit-organic')}
            className="px-3 py-1.5 rounded-full border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-xs font-medium text-[#24332D] dark:text-[#E8EEE9] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
            Chemistry: SN1 vs SN2 (Class 12)
          </button>
          <button
            onClick={() => onSelectSample('kit-neural-networks')}
            className="px-3 py-1.5 rounded-full border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-xs font-medium text-[#24332D] dark:text-[#E8EEE9] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
            CS: Neural Networks (B.Tech)
          </button>
        </div>
      </div>
    </section>
  );
};
