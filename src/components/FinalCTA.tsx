import { UploadCloud, Link as LinkIcon, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenUpload: (source: 'upload' | 'link') => void;
  isAuthenticated?: boolean;
  onRequireAuth?: (pendingData?: { source: 'upload' | 'link'; linkUrl: string; style: 'topper' }) => void;
}

export const FinalCTA = ({ onOpenUpload, isAuthenticated = false, onRequireAuth }: FinalCTAProps) => {
  return (
    <section className="py-12 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-[#FAF9F5] border-2 border-[#141414] rounded-3xl p-5 sm:p-14 shadow-[6px_6px_0px_#141414] text-center relative overflow-hidden">
        
        {/* Subtle accent badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F2DC] border border-[#79A94A]/40 text-xs font-mono font-bold text-[#141414] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#79A94A]" />
          <span>START REVISING SMARTER TODAY</span>
        </div>

        <h2 className="font-mono-editorial text-2xl sm:text-4xl md:text-5xl font-bold text-[#141414] tracking-tight max-w-3xl mx-auto leading-tight break-words">
          Turn your next lecture into an <span className="selection-box">exam-ready</span> study kit.
        </h2>

        <p className="font-body text-sm sm:text-lg text-[#5E5D57] max-w-xl mx-auto mt-4 leading-relaxed">
          Drop any educational MP4 recording or paste a lecture link. Get concise formulas, topper derivations, Hinglish memory tricks, and self-quizzes in minutes.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={() => {
              if (!isAuthenticated && onRequireAuth) {
                onRequireAuth({ source: 'upload', linkUrl: '', style: 'topper' });
              } else {
                onOpenUpload('upload');
              }
            }}
            className="w-full sm:w-auto btn-primary-green px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Video File</span>
          </button>
          
          <button
            onClick={() => {
              if (!isAuthenticated && onRequireAuth) {
                onRequireAuth({ source: 'link', linkUrl: '', style: 'topper' });
              } else {
                onOpenUpload('link');
              }
            }}
            className="w-full sm:w-auto btn-secondary-outline px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 bg-[#FFFFFF]"
          >
            <LinkIcon className="w-4 h-4 text-[#79A94A]" />
            <span>Paste Video Link</span>
          </button>
        </div>

        {/* Trust caption */}
        <p className="text-xs font-mono text-[#8A8880] mt-6">
          Free educational tier • No software installation required • Supports English, Hinglish & Hindi
        </p>
      </div>
    </section>
  );
};

