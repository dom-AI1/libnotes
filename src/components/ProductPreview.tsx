import { useState } from 'react';
import { Clock, Sparkles, BookOpen, Award, Coffee, GraduationCap, ArrowRight } from 'lucide-react';
import type { NoteStyle } from '../types';

interface ProductPreviewProps {
  onOpenWorkspace: () => void;
}

export const ProductPreview = ({ onOpenWorkspace }: ProductPreviewProps) => {
  const [activePreviewStyle, setActivePreviewStyle] = useState<NoteStyle>('topper');

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-3.5 py-1 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
          PRODUCT PREVIEW
        </span>
        <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-3 tracking-tight break-words">
          See what Libnotes generates from a 40-minute lecture.
        </h2>
        <p className="text-[#647168] dark:text-[#B2BDB5] font-body text-base mt-2">
          Toggle between styles below to see how our models adapt the same physics lecture for rapid recap, deep proof comprehension, or board exam scoring.
        </p>
      </div>

      {/* Interactive Mockup Container */}
      <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl shadow-xs overflow-hidden">
        
        {/* Top Mockup Title Bar */}
        <div className="bg-[#F4F5F2] dark:bg-[#1F2622] border-b border-[#E2E7E1] dark:border-[#354139] px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 max-w-full">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#24332D] dark:text-[#E8EEE9] truncate">
              Class 12 Physics: Thermodynamics & Heat Engines.mp4
            </span>
          </div>

          {/* Style Selector Tabs */}
          <div className="w-full sm:w-auto grid grid-cols-4 sm:flex sm:items-center gap-1 sm:gap-1.5 bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setActivePreviewStyle('quick')}
              className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                activePreviewStyle === 'quick' || activePreviewStyle === 'minimal'
                  ? 'bg-[#24332D] dark:bg-[#E8EEE9] text-[#FFFFFF] dark:text-[#171C1A]'
                  : 'text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9]'
              }`}
            >
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Quick</span>
            </button>
            <button
              onClick={() => setActivePreviewStyle('topper')}
              className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                activePreviewStyle === 'topper'
                  ? 'bg-[#24332D] dark:bg-[#E8EEE9] text-[#FFFFFF] dark:text-[#171C1A]'
                  : 'text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9]'
              }`}
            >
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#486B54] dark:text-[#A8C5AD] shrink-0" />
              <span className="text-[11px] sm:text-xs">Topper</span>
            </button>
            <button
              onClick={() => setActivePreviewStyle('chatpata')}
              className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                activePreviewStyle === 'chatpata' || activePreviewStyle === 'chatpate'
                  ? 'bg-[#24332D] dark:bg-[#E8EEE9] text-[#FFFFFF] dark:text-[#171C1A]'
                  : 'text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9]'
              }`}
            >
              <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Chatpata</span>
            </button>
            <button
              onClick={() => setActivePreviewStyle('exam')}
              className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap cursor-pointer ${
                activePreviewStyle === 'exam'
                  ? 'bg-[#24332D] dark:bg-[#E8EEE9] text-[#FFFFFF] dark:text-[#171C1A]'
                  : 'text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9]'
              }`}
            >
              <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="text-[11px] sm:text-xs">Exam<span className="hidden sm:inline">&nbsp;PYQ</span></span>
            </button>
          </div>
        </div>

        {/* Content Preview Body */}
        <div className="p-4 sm:p-8">
          
          {/* Quick Notes Preview */}
          {(activePreviewStyle === 'quick' || activePreviewStyle === 'minimal') && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E7E1] dark:border-[#354139] gap-2">
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#24332D] dark:text-[#E8EEE9]">
                  High-Yield Revision Formulae & State Variables
                </h4>
                <span className="self-start sm:self-auto text-xs font-mono text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-2.5 py-0.5 rounded-full border border-[#E2E7E1] dark:border-[#354139] shrink-0 whitespace-nowrap">
                  Quick Mode
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A]">
                  <span className="text-[#647168] dark:text-[#B2BDB5] block text-[10px] uppercase">First Law of Thermodynamics</span>
                  <span className="text-sm font-bold text-[#24332D] dark:text-[#E8EEE9] block mt-1">dQ = dU + dW</span>
                  <span className="text-[11px] text-[#647168] dark:text-[#B2BDB5] block mt-1">Where dW = P dV (work done by gas).</span>
                </div>
                <div className="p-3.5 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A]">
                  <span className="text-[#647168] dark:text-[#B2BDB5] block text-[10px] uppercase">Carnot Engine Efficiency</span>
                  <span className="text-sm font-bold text-[#486B54] dark:text-[#A8C5AD] block mt-1">η = 1 - (Tc / Th)</span>
                  <span className="text-[11px] text-[#647168] dark:text-[#B2BDB5] block mt-1">Temperatures must be expressed in Kelvin.</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs font-body text-[#647168] dark:text-[#B2BDB5] pt-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD] mt-1.5 shrink-0" />
                  <span><strong className="text-[#24332D] dark:text-[#E8EEE9]">State vs Path Functions:</strong> Internal energy (U), Pressure (P), Volume (V), and Temperature (T) are state functions; Work (W) and Heat (Q) are path functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD] mt-1.5 shrink-0" />
                  <span><strong className="text-[#24332D] dark:text-[#E8EEE9]">Cyclic Processes:</strong> Net change in internal energy ΔU = 0 over one full cycle. Net heat absorbed equals area enclosed by cycle on P-V curve.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Topper Notes Preview */}
          {activePreviewStyle === 'topper' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E7E1] dark:border-[#354139] gap-2">
                <div>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-[#24332D] dark:text-[#E8EEE9] leading-snug">
                    1. First Law & Reversible Isothermal Expansion Proof
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
                    <span className="flex items-center gap-1 text-[#486B54] dark:text-[#A8C5AD] font-bold whitespace-nowrap shrink-0">
                      <Clock className="w-3 h-3 shrink-0" />
                      [03:15 - 12:40]
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-[11px] sm:text-xs">CBSE / NCERT Reference Section 12.4</span>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-xs font-mono text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-2.5 py-0.5 rounded-full border border-[#E2E7E1] dark:border-[#354139] shrink-0 whitespace-nowrap">
                  Topper Depth
                </span>
              </div>
              <p className="font-body text-sm text-[#24332D] dark:text-[#E8EEE9] leading-relaxed">
                The First Law of Thermodynamics is the macroscopic formulation of conservation of energy: dQ = dU + dW. For an ideal gas expanding reversibly from V1 to V2 at constant temperature T, work done is given by integrating P dV:
              </p>
              <div className="p-3.5 sm:p-4 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] font-mono text-xs sm:text-sm text-[#24332D] dark:text-[#E8EEE9] space-y-1 overflow-x-auto">
                <div className="whitespace-nowrap">W = ∫ P dV = nRT ∫ (1/V) dV from V1 to V2</div>
                <div className="font-bold text-[#486B54] dark:text-[#A8C5AD] whitespace-nowrap">W = 2.303 nRT log10(V2 / V1)</div>
              </div>
              <div className="p-3 rounded-xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#486B54] dark:border-[#A8C5AD] text-xs font-body text-[#24332D] dark:text-[#E8EEE9]">
                <span className="font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] mr-1.5">TOPPER TIP:</span>
                Always underline units and state whether work is done by the gas or on the gas before finalizing your sign convention.
              </div>
            </div>
          )}

          {/* Chatpata Notes Preview */}
          {(activePreviewStyle === 'chatpata' || activePreviewStyle === 'chatpate') && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E7E1] dark:border-[#354139] gap-2">
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#24332D] dark:text-[#E8EEE9] leading-snug">
                  Bhai Ki Desi Analogy: Mummy Ki Pocket Money
                </h4>
                <span className="self-start sm:self-auto text-xs font-mono text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-2.5 py-0.5 rounded-full border border-[#E2E7E1] dark:border-[#354139] shrink-0 whitespace-nowrap">
                  Hinglish Vibe
                </span>
              </div>
              <p className="font-body text-sm text-[#24332D] dark:text-[#E8EEE9] leading-relaxed">
                Mummy ne pocket money di ₹1000 (dQ). Tumne ₹400 apni gullak mein jama kar liye (dU = Internal Energy), aur bache hue ₹600 se doston ke saath momos khaa liye (dW = External Work Done). Total barabar!
              </p>
              <div className="p-3.5 rounded-xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#486B54] dark:border-[#A8C5AD] text-xs font-mono font-bold text-[#24332D] dark:text-[#E8EEE9]">
                💡 Punchline: Gullak (dU) + Momos Party (dW) = Mummy Ki Pocket Money (dQ)!
              </div>
            </div>
          )}

          {/* Exam Mode Preview */}
          {activePreviewStyle === 'exam' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E2E7E1] dark:border-[#354139] gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#24332D] dark:bg-[#E8EEE9] text-[#FFFFFF] dark:text-[#171C1A] shrink-0">
                  3 Mark Question (CBSE 2024 Set 2)
                </span>
                <span className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] whitespace-nowrap">Marking Scheme Rubric</span>
              </div>
              <div className="font-editorial text-sm font-bold text-[#24332D] dark:text-[#E8EEE9]">
                Q: A Carnot engine has efficiency 40% at sink 300 K. By how much must source temperature be increased to reach 50%?
              </div>
              <div className="p-3.5 rounded-xl bg-[#F4F5F2] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-xs font-mono text-[#647168] dark:text-[#B2BDB5] overflow-x-auto">
                <div className="whitespace-nowrap">• Initial source T1 = 300 / 0.60 = 500 K (1 Mark)</div>
                <div className="whitespace-nowrap">• Required source T1' = 300 / 0.50 = 600 K (1 Mark)</div>
                <div className="font-bold text-[#486B54] dark:text-[#A8C5AD] whitespace-nowrap">• Increase needed ΔT = 100 K (1 Mark with units)</div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Banner inside mockup */}
        <div className="bg-[#F4F5F2] dark:bg-[#1F2622] border-t border-[#E2E7E1] dark:border-[#354139] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
            <Sparkles className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD] shrink-0" />
            <span>Interactive flashcards, 5-question diagnostic quiz & printable sheet included.</span>
          </div>

          <button
            onClick={onOpenWorkspace}
            className="w-full sm:w-auto justify-center btn-primary-green px-5 py-2.5 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Open Interactive Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
