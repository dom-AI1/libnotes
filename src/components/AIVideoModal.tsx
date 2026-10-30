import React from 'react';
import { X } from 'lucide-react';
import { AIVideoSection } from './AIVideoSection';
import type { VideoType } from './AIVideoSection';

interface AIVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideo?: VideoType;
  onOpenUpload?: () => void;
  onNavigateLogin?: () => void;
}

export const AIVideoModal: React.FC<AIVideoModalProps> = ({
  isOpen,
  onClose,
  initialVideo = 'tutorial',
  onOpenUpload,
  onNavigateLogin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141414]/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl sm:rounded-3xl shadow-[8px_8px_0px_#141414] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close Button */}
        <div className="px-4 py-3 bg-[#FAF9F5] border-b-2 border-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#79A94A] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase text-[#141414]">
              Libnotes Interactive Video Guide
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#141414] bg-[#FFFFFF] hover:bg-[#FDEDE8] hover:border-[#E05B49] text-[#141414] hover:text-[#E05B49] transition-colors flex items-center justify-center cursor-pointer shadow-[1px_1px_0px_#141414]"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Embedded */}
        <div className="overflow-y-auto p-2 sm:p-4 bg-[#FCFAF6]">
          <AIVideoSection
            isModal={true}
            initialVideo={initialVideo}
            onOpenUpload={() => {
              onClose();
              onOpenUpload?.();
            }}
            onNavigateLogin={() => {
              onClose();
              onNavigateLogin?.();
            }}
          />
        </div>
      </div>
    </div>
  );
};
