import { useState } from 'react';
import { Clock, Sparkles, BookOpen, Award, Coffee, GraduationCap, ArrowRight } from 'lucide-react';
import type { NoteStyle } from '../types';

interface ProductPreviewProps {
  onOpenWorkspace: () => void;
}

export const ProductPreview = ({ onOpenWorkspace }: ProductPreviewProps) => {
  const [activePreviewStyle, setActivePreviewStyle] = useState<NoteStyle>('topper');

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#79A94A] bg-[#E8F2DC] px-3 py-1 rounded-full border border-[#79A94A]/30">
          PRODUCT PREVIEW
        </span>
        <h2 className="font-mono-editorial text-3xl sm:text-4xl font-bold text-[#141414] mt-3 tracking-tight">
          See what NoteAI generates from a 40-minute lecture.
        </h2>
        <p className="text-[#5E5D57] font-body text-base mt-2">
          Toggle between styles below to see how our models adapt the same physics lecture for rapid recap, deep proof comprehension, or board exam scoring.
        </p>
      </div>

      {/* Interactive Mockup Container */}
      <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl shadow-[6px_6px_0px_#141414] overflow-hidden">
        
        {/* Top Mockup Title Bar */}
        <div className="bg-[#FAF9F5] border-b-2 border-[#141414] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full border border-[#141414] bg-[#E05B49]" />
              <span className="w-3 h-3 rounded-full border border-[#141414] bg-[#F4B400]" />
              <span className="w-3 h-3 rounded-full border border-[#141414] bg-[#79A94A]" />
            </div>
            <span className="font-mono text-xs font-bold text-[#141414] truncate">
              Class 12 Physics: Thermodynamics & Heat Engines.mp4
            </span>
          </div>

          {/* Style Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#141414] rounded-xl p-1 shadow-[1.5px_1.5px_0px_#141414]">
            <button
              onClick={() => setActivePreviewStyle('quick')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activePreviewStyle === 'quick' || activePreviewStyle === 'minimal'
                  ? 'bg-[#141414] text-[#FFFFFF]'
                  : 'text-[#5E5D57] hover:text-[#141414]'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>Quick</span>
            </button>
            <button
              onClick={() => setActivePreviewStyle('topper')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activePreviewStyle === 'topper'
                  ? 'bg-[#141414] text-[#FFFFFF]'
                  : 'text-[#5E5D57] hover:text-[#141414]'
              }`}
            >
              <Award className="w-3 h-3 text-[#79A94A]" />
              <span>Topper</span>
            </button>
            <button
              onClick={() => setActivePreviewStyle('chatpata')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activePreviewStyle === 'chatpata' || activePreviewStyle === 'chatpate'
                  ? 'bg-[#141414] text-[#FFFFFF]'
                  : 'text-[#5E5D57] hover:text-[#141414]'
              }`}
            >
              <Coffee className="w-3 h-3" />
              <span>Chatpata</span>
            </button>
            <button
              onClick={() => setActivePreviewStyle('exam')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activePreviewStyle === 'exam'
                  ? 'bg-[#141414] text-[#FFFFFF]'
                  : 'text-[#5E5D57] hover:text-[#141414]'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Exam PYQ</span>
            </button>
          </div>
        </div>

        {/* Content Preview Body */}
        <div className="p-6 sm:p-8">
          
          {/* Quick Notes Preview */}
          {(activePreviewStyle === 'quick' || activePreviewStyle === 'minimal') && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFDBCF]">
                <h4 className="font-mono-editorial text-lg font-bold text-[#141414]">
                  High-Yield Revision Formulae & State Variables
                </h4>
                <span className="text-xs font-mono text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded border border-[#79A94A]/30">
                  Quick Mode
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl border border-[#141414] bg-[#FFFFFF]">
                  <span className="text-[#8A8880] block text-[10px] uppercase">First Law of Thermodynamics</span>
                  <span className="text-sm font-bold text-[#141414] block mt-1">dQ = dU + dW</span>
                  <span className="text-[11px] text-[#5E5D57] block mt-1">Where dW = P dV (work done by gas).</span>
                </div>
                <div className="p-3 rounded-xl border border-[#141414] bg-[#FFFFFF]">
                  <span className="text-[#8A8880] block text-[10px] uppercase">Carnot Engine Efficiency</span>
                  <span className="text-sm font-bold text-[#79A94A] block mt-1">η = 1 - (Tc / Th)</span>
                  <span className="text-[11px] text-[#5E5D57] block mt-1">Temperatures must be expressed in Kelvin.</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs font-body text-[#333333] pt-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79A94A] mt-1.5 shrink-0" />
                  <span><strong>State vs Path Functions:</strong> Internal energy (U), Pressure (P), Volume (V), and Temperature (T) are state functions; Work (W) and Heat (Q) are path functions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79A94A] mt-1.5 shrink-0" />
                  <span><strong>Cyclic Processes:</strong> Net change in internal energy ΔU = 0 over one full cycle. Net heat absorbed equals area enclosed by cycle on P-V curve.</span>
                </li>
              </ul>
            </div>
          )}

          {/* Topper Notes Preview */}
          {activePreviewStyle === 'topper' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFDBCF]">
                <div>
                  <h4 className="font-mono-editorial text-lg font-bold text-[#141414]">
                    1. First Law & Reversible Isothermal Expansion Proof
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs font-mono text-[#5E5D57]">
                    <span className="flex items-center gap-1 text-[#79A94A] font-bold">
                      <Clock className="w-3 h-3" />
                      [03:15 - 12:40]
                    </span>
                    <span>•</span>
                    <span>CBSE / NCERT Reference Section 12.4</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded border border-[#79A94A]/30">
                  Topper Depth
                </span>
              </div>
              <p className="font-body text-sm text-[#2E2E2E] leading-relaxed">
                The First Law of Thermodynamics is the macroscopic formulation of conservation of energy: dQ = dU + dW. For an ideal gas expanding reversibly from V1 to V2 at constant temperature T, work done is given by integrating P dV:
              </p>
              <div className="p-4 rounded-xl border border-[#141414] bg-[#FAF9F5] font-mono text-xs text-[#141414] space-y-1">
                <div>W = ∫ P dV = nRT ∫ (1/V) dV from V1 to V2</div>
                <div className="font-bold text-[#79A94A]">W = 2.303 nRT log10(V2 / V1)</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F1F7EA] border border-[#79A94A] text-xs font-body text-[#141414]">
                <span className="font-mono font-bold text-[#79A94A] mr-1.5">TOPPER TIP:</span>
                Always underline units and state whether work is done by the gas or on the gas before finalizing your sign convention.
              </div>
            </div>
          )}

          {/* Chatpata Notes Preview */}
          {(activePreviewStyle === 'chatpata' || activePreviewStyle === 'chatpate') && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFDBCF]">
                <h4 className="font-mono-editorial text-lg font-bold text-[#141414]">
                  Bhai Ki Desi Analogy: Mummy Ki Pocket Money
                </h4>
                <span className="text-xs font-mono text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded border border-[#79A94A]/30">
                  Hinglish Vibe
                </span>
              </div>
              <p className="font-body text-sm text-[#2E2E2E] leading-relaxed">
                Mummy ne pocket money di ₹1000 (dQ). Tumne ₹400 apni gullak mein jama kar liye (dU = Internal Energy), aur bache hue ₹600 se doston ke saath momos khaa liye (dW = External Work Done). Total barabar!
              </p>
              <div className="p-3.5 rounded-xl bg-[#E8F2DC] border border-[#79A94A] text-xs font-mono font-bold text-[#141414]">
                💡 Punchline: Gullak (dU) + Momos Party (dW) = Mummy Ki Pocket Money (dQ)!
              </div>
            </div>
          )}

          {/* Exam Mode Preview */}
          {activePreviewStyle === 'exam' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#DFDBCF]">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#141414] text-[#FFFFFF]">
                  3 Mark Question (CBSE 2024 Set 2)
                </span>
                <span className="text-xs font-mono text-[#5E5D57]">Marking Scheme Rubric</span>
              </div>
              <div className="font-mono-editorial text-sm font-bold text-[#141414]">
                Q: A Carnot engine has efficiency 40% at sink 300 K. By how much must source temperature be increased to reach 50%?
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#141414] text-xs font-mono text-[#333333]">
                <div>• Initial source T1 = 300 / 0.60 = 500 K (1 Mark)</div>
                <div>• Required source T1' = 300 / 0.50 = 600 K (1 Mark)</div>
                <div className="font-bold text-[#79A94A]">• Increase needed ΔT = 100 K (1 Mark with units)</div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Banner inside mockup */}
        <div className="bg-[#FAF9F5] border-t-2 border-[#141414] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5E5D57]">
            <Sparkles className="w-4 h-4 text-[#79A94A]" />
            <span>Interactive flashcards, 5-question diagnostic quiz & printable sheet included.</span>
          </div>

          <button
            onClick={onOpenWorkspace}
            className="btn-primary-green px-5 py-2 text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <span>Open Interactive Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
