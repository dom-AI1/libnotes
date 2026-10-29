import { Video, FileText, CheckCircle, Brain, BookOpen } from 'lucide-react';

export const HowItWorks = () => {
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
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#141414]/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#79A94A] bg-[#E8F2DC] px-3 py-1 rounded-full border border-[#79A94A]/30">
            HOW IT WORKS
          </span>
          <h2 className="font-mono-editorial text-3xl sm:text-4xl font-bold text-[#141414] mt-3 tracking-tight">
            From lecture video to retention in 3 minutes.
          </h2>
        </div>
        <p className="text-[#5E5D57] font-body text-sm sm:text-base max-w-md">
          No more pausing every 30 seconds to scribble illegible notebook pages. NoteAI extracts the meat of the lecture automatically.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-7 shadow-[3px_3px_0px_#141414] relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-editorial text-3xl font-bold text-[#79A94A]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#E8F2DC] border border-[#141414] flex items-center justify-center text-[#141414]">
                    <Icon className="w-5 h-5 text-[#141414]" />
                  </div>
                </div>

                <h3 className="font-mono-editorial text-xl font-bold text-[#141414] mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[#4A4944] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DFDBCF] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#5E5D57] uppercase tracking-wider">
                  {item.tag}
                </span>
                <CheckCircle className="w-4 h-4 text-[#79A94A]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* About Us / Philosophy section */}
      <div id="about" className="mt-16 bg-[#FAF9F5] border-2 border-[#141414] rounded-2xl p-8 sm:p-12 shadow-[4px_4px_0px_#141414]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#79A94A] bg-[#E8F2DC] px-3 py-1 rounded-full border border-[#79A94A]/30">
              OUR MANIFESTO
            </span>
            <h3 className="font-mono-editorial text-2xl sm:text-3xl font-bold text-[#141414] mt-3">
              We believe students shouldn't spend 80% of their study time pausing videos.
            </h3>
            <p className="font-body text-base text-[#4A4944] mt-4 leading-relaxed">
              Every college student and board exam aspirant knows the pain: watching a 2-hour recording at 1.75x speed while frantically trying to copy down diagrams. NoteAI was built as a calm, editorial study workspace that distills what actually appears in exams, letting you focus on understanding and practice.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-[#141414]">
              <span className="px-3 py-1.5 rounded-lg bg-[#FCFAF6] border border-[#141414] shadow-[1.5px_1.5px_0px_#141414]">
                ✓ Made for Indian curricula (CBSE, ISC, JEE, NEET)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FCFAF6] border border-[#141414] shadow-[1.5px_1.5px_0px_#141414]">
                ✓ Hinglish audio comprehension
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#FCFAF6] border border-[#141414] shadow-[1.5px_1.5px_0px_#141414]">
                ✓ 100% human-readable printable notes
              </span>
            </div>
          </div>
          
          <div className="lg:col-span-4 bg-[#FCFAF6] border-2 border-[#141414] rounded-xl p-6 shadow-[3px_3px_0px_#141414] text-center">
            <div className="w-12 h-12 rounded-full bg-[#E8F2DC] border border-[#141414] flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-[#79A94A]" />
            </div>
            <div className="font-mono-editorial font-bold text-xl text-[#141414]">
              4 Distinct Styles
            </div>
            <p className="text-xs text-[#5E5D57] mt-1 font-body">
              Because a formula sheet isn't what you need when you're learning a concept for the first time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
