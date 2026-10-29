import React from 'react';
import { NotFoundIllustration } from './SVGIcons';
import { ArrowLeft, Home, Layers, Sparkles, BookOpen } from 'lucide-react';

interface NotFoundViewProps {
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onOpenUpload: () => void;
  onOpenSampleNotes: () => void;
  isAuthenticated?: boolean;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigateHome,
  onNavigateDashboard,
  onOpenUpload,
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
    <div className="min-h-[calc(100vh-5rem)] bg-[#F7F5EF] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-xl w-full bg-[#FCFAF6] rounded-3xl border-2 border-[#141414] shadow-[6px_6px_0px_#141414] p-8 sm:p-12 text-center">
        
        {/* Large Editorial 404 Headline */}
        <div className="inline-block px-4 py-1 rounded-full bg-[#E8F2DC] border border-[#79A94A]/40 text-[#79A94A] font-mono text-xs font-bold uppercase tracking-wider mb-2">
          Error 404 • Page Not Found
        </div>

        <h1 className="font-mono-editorial text-6xl sm:text-7xl font-extrabold text-[#141414] tracking-tight">
          4<span className="text-[#79A94A]">0</span>4
        </h1>

        {/* Hand-Drawn Editorial Illustration */}
        <div className="my-4 flex justify-center">
          <NotFoundIllustration className="w-full max-w-[280px] h-auto" />
        </div>

        <h2 className="font-mono-editorial text-2xl sm:text-3xl font-bold text-[#141414]">
          Looks like this page skipped class.
        </h2>

        <p className="mt-3 font-body text-xs sm:text-sm text-[#5E5D57] leading-relaxed max-w-md mx-auto">
          The lecture, note, or study resource you are looking for doesn't exist, was renamed, or has moved to another shelf in our library.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="btn-primary-green px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_#141414]"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={onNavigateDashboard}
              className="btn-secondary-outline px-5 py-2.5 text-xs sm:text-sm font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_#141414]"
            >
              <Layers className="w-4 h-4 text-[#79A94A]" />
              <span>Go to Dashboard</span>
            </button>
          )}

          <button
            onClick={handleGoBack}
            className="px-4 py-2.5 rounded-xl border border-[#141414]/25 bg-transparent hover:bg-[#FAF8F2] text-xs font-mono font-semibold text-[#141414] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Shortcut Suggestions */}
        <div className="mt-8 pt-6 border-t border-[#141414]/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#5E5D57] block mb-3">
            Looking for something specific?
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <button
              onClick={onOpenUpload}
              className="px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#141414]/20 hover:border-[#79A94A] hover:text-[#79A94A] text-[#141414] flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#79A94A]" />
              <span>Create New Notes</span>
            </button>
            <button
              onClick={onOpenSampleNotes}
              className="px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#141414]/20 hover:border-[#79A94A] hover:text-[#79A94A] text-[#141414] flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#79A94A]" />
              <span>View Thermodynamics Sample</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

