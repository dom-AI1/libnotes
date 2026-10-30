import { NotebookIllustration, ExamIllustration, WeakSpotsIllustration } from './SVGIcons';
import { ArrowUpRight } from 'lucide-react';

interface FeatureCardsProps {
  onCardClick: (cardType: 'learn' | 'exam' | 'quiz') => void;
}

export const FeatureCards = ({ onCardClick }: FeatureCardsProps) => {
  return (
    <section id="features" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#79A94A] bg-[#E8F2DC] px-3 py-1 rounded-full border border-[#79A94A]/30">
          STUDY WORKFLOW
        </span>
        <h2 className="font-mono-editorial text-2xl sm:text-4xl font-bold text-[#141414] mt-3 tracking-tight break-words">
          Designed for high-retention learning.
        </h2>
        <p className="text-[#5E5D57] font-body text-base mt-2">
          From a 1-hour noisy recording to concise notes you can actually revise the night before the exam.
        </p>
      </div>

      {/* Staggered & Lightly Overlapping Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
        
        {/* Card 1 — Learn Your Way */}
        <div 
          onClick={() => onCardClick('learn')}
          className="group relative bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[4px_4px_0px_#141414] hover:shadow-[7px_7px_0px_#141414] transition-all duration-300 md:-rotate-1 hover:rotate-0 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#5E5D57] tracking-wider uppercase">
              CARD 01
            </span>
            <div className="w-8 h-8 rounded-full border border-[#141414] bg-[#FFFFFF] flex items-center justify-center group-hover:bg-[#E8F2DC] group-hover:text-[#141414] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#141414]" />
            </div>
          </div>

          {/* Simple Monochrome Line Illustration */}
          <div className="py-2 flex items-center justify-center">
            <NotebookIllustration className="w-full h-40 max-h-44 object-contain" />
          </div>

          {/* Text Content */}
          <div className="mt-5">
            <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] tracking-tight group-hover:text-[#79A94A] transition-colors">
              Learn Your Way
            </h3>
            <p className="font-body text-sm sm:text-base text-[#4A4944] mt-2 leading-relaxed">
              Choose short notes, detailed notes or easy Hinglish explanations.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="mt-5 pt-3 border-t border-[#DFDBCF] flex items-center gap-2 text-xs font-mono text-[#5E5D57]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#79A94A]" />
            <span>4 distinct study modes</span>
          </div>
        </div>

        {/* Card 2 — Ready for Exams */}
        <div 
          onClick={() => onCardClick('exam')}
          className="group relative bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[4px_4px_0px_#141414] hover:shadow-[7px_7px_0px_#141414] transition-all duration-300 md:translate-y-2 hover:translate-y-0 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#5E5D57] tracking-wider uppercase">
              CARD 02
            </span>
            <div className="w-8 h-8 rounded-full border border-[#141414] bg-[#FFFFFF] flex items-center justify-center group-hover:bg-[#E8F2DC] group-hover:text-[#141414] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#141414]" />
            </div>
          </div>

          {/* Simple Monochrome Line Illustration */}
          <div className="py-2 flex items-center justify-center">
            <ExamIllustration className="w-full h-40 max-h-44 object-contain" />
          </div>

          {/* Text Content */}
          <div className="mt-5">
            <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] tracking-tight group-hover:text-[#79A94A] transition-colors">
              Ready for Exams
            </h3>
            <p className="font-body text-sm sm:text-base text-[#4A4944] mt-2 leading-relaxed">
              Turn lectures into important questions, definitions and MCQs.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="mt-5 pt-3 border-t border-[#DFDBCF] flex items-center gap-2 text-xs font-mono text-[#5E5D57]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#79A94A]" />
            <span>Marking schemes & PYQs</span>
          </div>
        </div>

        {/* Card 3 — Understand Your Weak Spots */}
        <div 
          onClick={() => onCardClick('quiz')}
          className="group relative bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-7 shadow-[4px_4px_0px_#141414] hover:shadow-[7px_7px_0px_#141414] transition-all duration-300 md:rotate-1 hover:rotate-0 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#5E5D57] tracking-wider uppercase">
              CARD 03
            </span>
            <div className="w-8 h-8 rounded-full border border-[#141414] bg-[#FFFFFF] flex items-center justify-center group-hover:bg-[#E8F2DC] group-hover:text-[#141414] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#141414]" />
            </div>
          </div>

          {/* Simple Monochrome Line Illustration */}
          <div className="py-2 flex items-center justify-center">
            <WeakSpotsIllustration className="w-full h-40 max-h-44 object-contain" />
          </div>

          {/* Text Content */}
          <div className="mt-5">
            <h3 className="font-mono-editorial text-2xl font-bold text-[#141414] tracking-tight group-hover:text-[#79A94A] transition-colors">
              Understand Your Weak Spots
            </h3>
            <p className="font-body text-sm sm:text-base text-[#4A4944] mt-2 leading-relaxed">
              Take a quiz, see your results and practise topics that need revision.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="mt-5 pt-3 border-t border-[#DFDBCF] flex items-center gap-2 text-xs font-mono text-[#5E5D57]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#79A94A]" />
            <span>Diagnostic topic insights</span>
          </div>
        </div>

      </div>
    </section>
  );
};
