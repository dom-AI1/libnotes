import { UploadCloud, Link as LinkIcon, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenUpload: (source: 'upload' | 'link') => void;
  isAuthenticated?: boolean;
  onRequireAuth?: (pendingData?: { source: 'upload' | 'link'; linkUrl: string; style: 'topper' }) => void;
}

export const FinalCTA = ({ onOpenUpload, isAuthenticated = false, onRequireAuth }: FinalCTAProps) => {
  return (
    <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-3xl p-6 sm:p-14 shadow-xs text-center relative overflow-hidden transition-colors">
        
        {/* Subtle accent badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] text-xs font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
          <span>START REVISING SMARTER TODAY</span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-bold text-[#24332D] dark:text-[#E8EEE9] tracking-tight max-w-3xl mx-auto leading-tight break-words">
          Turn your next lecture into an <span className="selection-box font-medium">exam-ready</span> study kit.
        </h2>

        <p className="font-body text-sm sm:text-lg text-[#647168] dark:text-[#B2BDB5] max-w-xl mx-auto mt-4 leading-relaxed">
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
            className="w-full sm:w-auto btn-primary-green px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
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
            className="w-full sm:w-auto btn-secondary-outline px-7 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <LinkIcon className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
            <span>Paste Video Link</span>
          </button>
        </div>

        {/* Trust caption */}
        <p className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] mt-6">
          Free educational tier • No software installation required • Supports English, Hinglish & Hindi
        </p>
      </div>
    </section>
  );
};
