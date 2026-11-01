import React from 'react';
import { NotFoundIllustration } from './SVGIcons';
import { ArrowLeft, Home, Layers, BookOpen } from 'lucide-react';

interface NotFoundViewProps {
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onOpenUpload?: () => void;
  onOpenSampleNotes: () => void;
  isAuthenticated?: boolean;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigateHome,
  onNavigateDashboard,
  onOpenUpload: _onOpenUpload,
  onOpenSampleNotes,
  isAuthenticated = false,
}) => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigateHome();
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#F4F5F2] dark:bg-[#171C1A] flex items-center justify-center py-12 px-4 sm:px-6 transition-colors">
      <div className="max-w-xl w-full bg-[#FFFFFF] dark:bg-[#242D28] rounded-3xl border border-[#E2E7E1] dark:border-[#354139] shadow-xs p-8 sm:p-12 text-center">
        
        {/* Large Editorial 404 Headline */}
        <div className="inline-block px-4 py-1 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] text-[#486B54] dark:text-[#A8C5AD] font-mono text-xs font-bold uppercase tracking-wider mb-2">
          Error 404 • Page Not Found
        </div>

        <h1 className="font-editorial text-6xl sm:text-7xl font-extrabold text-[#24332D] dark:text-[#E8EEE9] tracking-tight">
          4<span className="text-[#486B54] dark:text-[#A8C5AD]">0</span>4
        </h1>

        {/* Hand-Drawn Illustration */}
        <div className="my-4 flex justify-center">
          <NotFoundIllustration className="w-full max-w-[260px] h-auto drop-shadow-xs" />
        </div>

        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
          Looks like this page skipped class.
        </h2>

        <p className="mt-3 font-body text-xs sm:text-sm text-[#647168] dark:text-[#B2BDB5] leading-relaxed max-w-md mx-auto">
          The lecture, note, or study resource you are looking for doesn't exist, was renamed, or has moved to another shelf in our library.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="btn-primary-green px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={onNavigateDashboard}
              className="btn-secondary-outline px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
              <span>Go to Dashboard</span>
            </button>
          ) : (
            <button
              onClick={_onOpenUpload || onOpenSampleNotes}
              className="btn-secondary-outline px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
              <span>Create New Notes</span>
            </button>
          )}

          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-mono text-[#647168] dark:text-[#B2BDB5] hover:text-[#24332D] dark:hover:text-[#E8EEE9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
