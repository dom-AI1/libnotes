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
        className="relative w-full max-w-4xl bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#24332D] dark:text-[#E8EEE9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close Button */}
        <div className="px-4 py-3 bg-[#F4F5F2] dark:bg-[#1F2622] border-b border-[#E2E7E1] dark:border-[#354139] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#486B54] dark:bg-[#A8C5AD] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase text-[#24332D] dark:text-[#E8EEE9]">
              Libnotes Interactive Video Guide
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-[#24332D] dark:text-[#E8EEE9] hover:text-[#DC2626] transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Embedded */}
        <div className="overflow-y-auto p-2 sm:p-4 bg-[#FFFFFF] dark:bg-[#242D28]">
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
