import { Video, FileText, CheckCircle, Brain, ShieldCheck } from 'lucide-react';
import { AIVideoSection } from './AIVideoSection';

interface HowItWorksProps {
  onOpenUpload?: () => void;
  onNavigateLogin?: () => void;
}

export const HowItWorks = ({ onOpenUpload, onNavigateLogin }: HowItWorksProps = {}) => {
  const steps = [
    {
      step: '01',
      title: 'Feed Any Lecture',
      desc: 'Drop an MP4 video or paste a link from YouTube, Zoom, or Google Drive. We support bilingual English & Hindi audio.',
      icon: Video,
      tag: 'Multi-lingual input',
    },
    {
      step: '02',
      title: 'Choose Note Format',
      desc: 'Pick your vibe: concise 1-page Minimal sheets, comprehensive Topper proofs, fun Hinglish Chatpate notes, or Exam PYQs.',
      icon: FileText,
      tag: 'Zero fluff generation',
    },
    {
      step: '03',
      title: 'Test & Conquer Weak Spots',
      desc: 'Revise with timestamped concepts, flip through flashcards, and run quick self-assessments that pin down your weak topics.',
      icon: Brain,
      tag: 'Instant diagnostic feedback',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2E7E1] dark:border-[#354139]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-3.5 py-1 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
            HOW IT WORKS
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-3 tracking-tight break-words">
            From lecture video to retention in 3 minutes.
          </h2>
        </div>
        <p className="text-[#647168] dark:text-[#B2BDB5] font-body text-sm sm:text-base max-w-md leading-relaxed">
          No more pausing every 30 seconds to scribble illegible notebook pages. Libnotes extracts the meat of the lecture automatically.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-6 sm:p-7 shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-editorial text-3xl font-bold text-[#486B54] dark:text-[#A8C5AD]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] flex items-center justify-center text-[#24332D] dark:text-[#E8EEE9]">
                    <Icon className="w-5 h-5 text-[#486B54] dark:text-[#A8C5AD]" />
                  </div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#24332D] dark:text-[#E8EEE9] mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E7E1] dark:border-[#354139] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#647168] dark:text-[#B2BDB5] uppercase tracking-wider">
                  {item.tag}
                </span>
                <CheckCircle className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Transparency Architecture Box */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#E5EDE5] dark:bg-[#2D3A32] flex items-center justify-center text-[#486B54] dark:text-[#A8C5AD] border border-[#E2E7E1] dark:border-[#354139]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#486B54] dark:text-[#A8C5AD]">
              ACADEMIC HONESTY & TRANSPARENCY
            </span>
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
              How Libnotes ensures your notes are grounded in truth
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm font-body text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
          <div className="p-4 rounded-xl bg-[#F4F5F2] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139]">
            <strong className="block text-[#24332D] dark:text-[#E8EEE9] font-semibold mb-1">
              1. Audio-Transcript Verification
            </strong>
            Concepts, formulas and numericals are extracted directly from spoken dialogue and timestamps, not from generic internet summaries.
          </div>
          <div className="p-4 rounded-xl bg-[#F4F5F2] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139]">
            <strong className="block text-[#24332D] dark:text-[#E8EEE9] font-semibold mb-1">
              2. Explicit Attribution Badging
            </strong>
            When our AI enriches a topic with a step-by-step working note or exam warning, it is clearly labelled so you always know what was taught vs enriched.
          </div>
          <div className="p-4 rounded-xl bg-[#F4F5F2] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139]">
            <strong className="block text-[#24332D] dark:text-[#E8EEE9] font-semibold mb-1">
              3. Zero Fabricated Claims
            </strong>
            We never fabricate teacher statements, predict leaked exam questions, or claim 100% test accuracy. Everything is designed to help you verify and learn.
          </div>
        </div>
      </div>

      {/* About Us & Video Studio */}
      <div id="about" className="mt-14">
        <div className="mb-6 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-3.5 py-1 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
            ABOUT US · OUR MANIFESTO
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-2">
            Watch our story instead of reading walls of text.
          </h3>
        </div>

        <AIVideoSection
          onOpenUpload={onOpenUpload}
          onNavigateLogin={onNavigateLogin}
          initialVideo="about"
        />
      </div>

      {/* Resources & Curricula Hub */}
      <div id="resources" className="mt-14 pt-10 border-t border-[#E2E7E1] dark:border-[#354139]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-3.5 py-1 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
            STUDENT RESOURCES & CURRICULA
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-3 tracking-tight">
            Curriculum blueprints & offline study resources.
          </h3>
          <p className="text-[#647168] dark:text-[#B2BDB5] font-body text-sm mt-2">
            Aligned with official board marking schemes and competitive examination syllabi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] uppercase mb-1">CBSE Class 10 & 12</div>
              <h4 className="font-editorial text-base font-bold text-[#24332D] dark:text-[#E8EEE9]">Board Blueprint Packs</h4>
              <p className="text-xs text-[#647168] dark:text-[#B2BDB5] font-body mt-2 leading-relaxed">
                Unit-wise marks weightage, NCERT exemplar derivations, and past 5-year question trends.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] text-[11px] font-mono text-[#24332D] dark:text-[#E8EEE9] font-semibold">
              ✓ Physics, Chem, Maths & Bio
            </div>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] uppercase mb-1">JEE Main & Advanced</div>
              <h4 className="font-editorial text-base font-bold text-[#24332D] dark:text-[#E8EEE9]">Formula & Proof Maps</h4>
              <p className="text-xs text-[#647168] dark:text-[#B2BDB5] font-body mt-2 leading-relaxed">
                High-yield formula cheat sheets with edge-case assumptions and boundary condition traps.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] text-[11px] font-mono text-[#24332D] dark:text-[#E8EEE9] font-semibold">
              ✓ 100% Derivation Coverage
            </div>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] uppercase mb-1">NEET UG Aspirants</div>
              <h4 className="font-editorial text-base font-bold text-[#24332D] dark:text-[#E8EEE9]">Diagrammatic Recall</h4>
              <p className="text-xs text-[#647168] dark:text-[#B2BDB5] font-body mt-2 leading-relaxed">
                Rapid memory aids and concept flashcards covering high-frequency human physiology & organic mechanisms.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] text-[11px] font-mono text-[#24332D] dark:text-[#E8EEE9] font-semibold">
              ✓ NCERT Line-by-Line Key
            </div>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] uppercase mb-1">College & B.Tech</div>
              <h4 className="font-editorial text-base font-bold text-[#24332D] dark:text-[#E8EEE9]">Engineering Digests</h4>
              <p className="text-xs text-[#647168] dark:text-[#B2BDB5] font-body mt-2 leading-relaxed">
                Computer Science algorithms, Neural Networks, Differential Equations and Applied Physics lecture kits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E7E1] dark:border-[#354139] text-[11px] font-mono text-[#24332D] dark:text-[#E8EEE9] font-semibold">
              ✓ University Syllabus Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
