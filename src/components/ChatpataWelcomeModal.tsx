import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, BookOpen, Award, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import type { UserProfile } from '../services/authService';

interface ChatpataWelcomeModalProps {
  isOpen: boolean;
  user: UserProfile | null;
  onProceed?: () => void;
  onDismiss?: () => void;
}

const CHATPATA_MESSAGES = [
  {
    heading: "Arre wah! 🎉 You're officially a Libnotes learner!",
    subheading: "Ab lectures ka load kam, smart notes ka scene on! Your smarter study journey starts right here.",
  },
  {
    heading: "Badhai ho! Your study glow-up starts now. ✨",
    subheading: "Turn hours of recorded lectures into crisp, exam-ready notes in minutes.",
  },
  {
    heading: "Welcome aboard! Ab padhai hogi thodi smarter, thodi chatpati. 🚀",
    subheading: "No more boring textbooks. Learn your way with Topper depth or Chatpata analogies.",
  },
];

export const ChatpataWelcomeModal: React.FC<ChatpataWelcomeModalProps> = ({
  isOpen,
  user,
  onProceed,
  onDismiss,
}) => {
  const handleProceed = onProceed || onDismiss || (() => {});
  const [selectedMessage] = useState(() => CHATPATA_MESSAGES[0]);

  useEffect(() => {
    if (isOpen) {
      // Fire celebratory confetti burst with Libnotes palette
      try {
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#79A94A', '#141414', '#E8F2DC', '#FCFAF6', '#F7B731'],
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#79A94A', '#E8F2DC', '#141414'],
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#79A94A', '#E8F2DC', '#141414'],
          });
        }, 300);

        return () => clearTimeout(timer);
      } catch (err) {
        // Confetti non-fatal in headless/test environments
        console.debug('[Libnotes Confetti] Skipped in headless environment');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayName = user?.display_name || 'Learner';
  const avatarUrl = user?.avatar_url;

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-heading"
        className="max-w-lg w-full bg-[#FCFAF6] rounded-3xl border-2 border-[#141414] shadow-[8px_8px_0px_#141414] p-6 sm:p-8 text-center relative overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Subtle decorative top banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#79A94A]" />

        {/* Student Badge with Avatar / Initials */}
        <div className="relative inline-block mt-2 mb-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-20 h-20 rounded-full border-2 border-[#141414] shadow-[3px_3px_0px_#141414] mx-auto object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#E8F2DC] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto text-[#79A94A] font-mono-editorial text-2xl font-bold">
              {getInitials(displayName)}
            </div>
          )}
          <div 
            title="Verified Libnotes Student"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#79A94A] text-white border-2 border-[#141414] flex items-center justify-center shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F2DC] border border-[#79A94A]/40 text-[#79A94A] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Student Welcome</span>
        </div>

        {/* Primary Celebratory Heading */}
        <h2
          id="welcome-modal-heading"
          className="font-mono-editorial text-2xl sm:text-3xl font-extrabold text-[#141414] leading-tight"
        >
          {selectedMessage.heading}
        </h2>

        {/* Supporting Copy */}
        <p className="mt-3 font-body text-xs sm:text-sm text-[#5E5D57] leading-relaxed max-w-md mx-auto">
          {selectedMessage.subheading}
        </p>

        {/* Quick Student Perks Card */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FAF8F2] border border-[#141414]/15 text-left space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#141414]">
            <BookOpen className="w-4 h-4 text-[#79A94A] shrink-0" />
            <span>Multi-format notes: Quick, Topper & Chatpata styles</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#141414]">
            <Award className="w-4 h-4 text-[#79A94A] shrink-0" />
            <span>Marking scheme rubrics & diagnostic quizzes included</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#141414]">
            <ShieldCheck className="w-4 h-4 text-[#79A94A] shrink-0" />
            <span>100% Free core student workspace (₹0 forever)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleProceed}
            className="w-full btn-primary-green py-3.5 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_#141414] hover:shadow-[1px_1px_0px_#141414] transition-all cursor-pointer"
          >
            <span>Let's Get Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-3 text-[11px] font-mono text-[#5E5D57] flex items-center justify-center gap-1">
          <span>Made for learners who dream big</span>
          <Heart className="w-3 h-3 text-[#E05B49] fill-current" />
        </p>
      </div>
    </div>
  );
};

