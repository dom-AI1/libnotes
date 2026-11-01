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
      try {
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#486B54', '#24332D', '#E5EDE5', '#A8C5AD', '#F59E0B'],
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#486B54', '#E5EDE5', '#24332D'],
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#486B54', '#E5EDE5', '#24332D'],
          });
        }, 300);

        return () => clearTimeout(timer);
      } catch (err) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171C1A]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-heading"
        className="max-w-lg w-full bg-[#FFFFFF] dark:bg-[#242D28] rounded-3xl border border-[#E2E7E1] dark:border-[#354139] shadow-xl p-6 sm:p-8 text-center relative overflow-hidden animate-in zoom-in-95 duration-200 transition-colors"
      >
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#486B54] dark:bg-[#A8C5AD]" />

        {/* Student Badge with Avatar / Initials */}
        <div className="relative inline-block mt-2 mb-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-20 h-20 rounded-full border-2 border-[#E2E7E1] dark:border-[#354139] shadow-xs mx-auto object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border-2 border-[#486B54] dark:border-[#A8C5AD] shadow-xs flex items-center justify-center mx-auto text-[#486B54] dark:text-[#A8C5AD] font-editorial text-2xl font-bold">
              {getInitials(displayName)}
            </div>
          )}
          <div 
            title="Verified Libnotes Student"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#486B54] dark:bg-[#A8C5AD] text-white dark:text-[#171C1A] border-2 border-[#FFFFFF] dark:border-[#242D28] flex items-center justify-center shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] text-[#486B54] dark:text-[#A8C5AD] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Student Welcome</span>
        </div>

        {/* Primary Celebratory Heading */}
        <h2
          id="welcome-modal-heading"
          className="font-editorial text-2xl sm:text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9] leading-tight"
        >
          {selectedMessage.heading}
        </h2>

        {/* Supporting Copy */}
        <p className="mt-3 font-body text-xs sm:text-sm text-[#647168] dark:text-[#B2BDB5] leading-relaxed max-w-md mx-auto">
          {selectedMessage.subheading}
        </p>

        {/* Quick Student Perks Card */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F4F5F2] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-left space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#24332D] dark:text-[#E8EEE9]">
            <BookOpen className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD] shrink-0" />
            <span>Multi-format notes: Quick, Topper & Chatpata styles</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#24332D] dark:text-[#E8EEE9]">
            <Award className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD] shrink-0" />
            <span>Marking scheme rubrics & diagnostic quizzes included</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#24332D] dark:text-[#E8EEE9]">
            <ShieldCheck className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD] shrink-0" />
            <span>100% Free core student workspace (₹0 forever)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={handleProceed}
            className="w-full btn-primary-green py-3.5 text-xs sm:text-sm font-mono font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>Let's Get Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-3 text-[11px] font-mono text-[#647168] dark:text-[#B2BDB5] flex items-center justify-center gap-1">
          <span>Made for learners who dream big</span>
          <Heart className="w-3 h-3 text-[#DC2626] fill-current" />
        </p>
      </div>
    </div>
  );
};
