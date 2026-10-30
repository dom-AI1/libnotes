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
        className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Close Button */}
        <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase text-[#0F172A]">
              Libnotes Interactive Video Guide
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#0F172A] hover:text-[#DC2626] transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Embedded */}
        <div className="overflow-y-auto p-2 sm:p-4 bg-[#FFFFFF]">
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
