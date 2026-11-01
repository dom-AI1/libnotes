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
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-3.5 py-1 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
          STUDY WORKFLOW
        </span>
        <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-3 tracking-tight break-words">
          Designed for high-retention learning.
        </h2>
        <p className="text-[#647168] dark:text-[#B2BDB5] font-body text-base mt-2">
          From a lengthy lecture to concise notes and practice questions you can review whenever you need.
        </p>
      </div>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
        
        {/* Card 1 — Learn Your Way */}
        <div 
          onClick={() => onCardClick('learn')}
          className="group relative bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#647168] dark:text-[#B2BDB5] tracking-wider uppercase">
              METHOD 01
            </span>
            <div className="w-8 h-8 rounded-full border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-center group-hover:bg-[#E5EDE5] dark:group-hover:bg-[#2D3A32] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#24332D] dark:text-[#E8EEE9]" />
            </div>
          </div>

          {/* Line Illustration */}
          <div className="py-2 flex items-center justify-center">
            <NotebookIllustration className="w-full h-36 max-h-40 object-contain" />
          </div>

          {/* Text Content */}
          <div className="mt-5">
            <h3 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9] tracking-tight group-hover:text-[#486B54] dark:group-hover:text-[#A8C5AD] transition-colors">
              Learn Your Way
            </h3>
            <p className="font-body text-sm sm:text-base text-[#647168] dark:text-[#B2BDB5] mt-2 leading-relaxed">
              Choose short notes, detailed notes or easy Hinglish explanations.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="mt-5 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] flex items-center gap-2 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD]" />
            <span>4 distinct study modes</span>
          </div>
        </div>

        {/* Card 2 — Ready for Exams */}
        <div 
          onClick={() => onCardClick('exam')}
          className="group relative bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#647168] dark:text-[#B2BDB5] tracking-wider uppercase">
              METHOD 02
            </span>
            <div className="w-8 h-8 rounded-full border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-center group-hover:bg-[#E5EDE5] dark:group-hover:bg-[#2D3A32] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#24332D] dark:text-[#E8EEE9]" />
            </div>
          </div>

          {/* Line Illustration */}
          <div className="py-2 flex items-center justify-center">
            <ExamIllustration className="w-full h-36 max-h-40 object-contain" />
          </div>

          {/* Text Content */}
          <div className="mt-5">
            <h3 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9] tracking-tight group-hover:text-[#486B54] dark:group-hover:text-[#A8C5AD] transition-colors">
              Ready for Exams
            </h3>
            <p className="font-body text-sm sm:text-base text-[#647168] dark:text-[#B2BDB5] mt-2 leading-relaxed">
              Turn lectures into important questions, definitions and MCQs.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="mt-5 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] flex items-center gap-2 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD]" />
            <span>Marking schemes & PYQs</span>
          </div>
        </div>

        {/* Card 3 — Understand Your Weak Spots */}
        <div 
          onClick={() => onCardClick('quiz')}
          className="group relative bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-[#647168] dark:text-[#B2BDB5] tracking-wider uppercase">
              METHOD 03
            </span>
            <div className="w-8 h-8 rounded-full border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-center group-hover:bg-[#E5EDE5] dark:group-hover:bg-[#2D3A32] transition-colors">
              <ArrowUpRight className="w-4 h-4 text-[#24332D] dark:text-[#E8EEE9]" />
            </div>
          </div>

          {/* Line Illustration */}
          <div className="py-2 flex items-center justify-center">
            <WeakSpotsIllustration className="w-full h-36 max-h-40 object-contain" />
          </div>

          {/* Text Content */}
          <div className="mt-5">
            <h3 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9] tracking-tight group-hover:text-[#486B54] dark:group-hover:text-[#A8C5AD] transition-colors">
              Understand Your Weak Spots
            </h3>
            <p className="font-body text-sm sm:text-base text-[#647168] dark:text-[#B2BDB5] mt-2 leading-relaxed">
              Take a quiz, see your results and practise topics that need revision.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="mt-5 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] flex items-center gap-2 text-xs font-mono text-[#647168] dark:text-[#B2BDB5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD]" />
            <span>Diagnostic topic insights</span>
          </div>
        </div>

      </div>
    </section>
  );
};
