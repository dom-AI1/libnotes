import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Film,
  Zap,
  LogIn,
  MessageSquare
} from 'lucide-react';

export type VideoType = 'about' | 'tutorial';

interface AIVideoSectionProps {
  onOpenUpload?: () => void;
  onNavigateLogin?: () => void;
  initialVideo?: VideoType;
  isModal?: boolean;
  onClose?: () => void;
}

interface VideoScene {
  time: number; // in seconds
  duration: number;
  badge: string;
  title: string;
  subtitle: string;
  narration: string;
  visualType: 'problem' | 'ai_magic' | 'four_styles' | 'mission' | 'login' | 'input' | 'analyzing' | 'chatbot_notes' | 'quiz_pdf';
  highlights: string[];
}

const ABOUT_US_SCENES: VideoScene[] = [
  {
    time: 0,
    duration: 5,
    badge: 'SCENE 1 · THE PAIN POINT',
    title: 'Students spend 80% of study time pausing videos',
    subtitle: 'Frantically copying diagrams and equations at 1.75x speed leads to exhaustion, not understanding.',
    narration: 'Every college and board exam student knows the struggle: watching hours of lectures while frantically copying notes instead of learning.',
    visualType: 'problem',
    highlights: ['2-hour noisy lectures', 'Endless pausing every 30s', 'Messy illegible notebooks'],
  },
  {
    time: 5,
    duration: 6,
    badge: 'SCENE 2 · THE LIBNOTES ENGINE',
    title: 'Instant AI Video-to-Notes in 3 Minutes',
    subtitle: 'Upload any lecture or paste a link. Libnotes listens in English & Hinglish and extracts true academic meat.',
    narration: 'Libnotes solves this completely. Our AI engine transcribes bilingual audio, extracts on-screen blackboard concepts, and synthesizes grounded study notes.',
    visualType: 'ai_magic',
    highlights: ['English & Hinglish audio support', 'Zero hallucination grounding', 'Automatic subject & chapter detection'],
  },
  {
    time: 11,
    duration: 6,
    badge: 'SCENE 3 · 4 ADAPTIVE NOTE STYLES',
    title: 'From Quick Cheat Sheets to Chatpata Chatbot Notes',
    subtitle: 'One size never fits all. Choose between Rapid Recap, Topper Derivations, Exam PYQs, or Fun Hinglish analogies.',
    narration: 'You get four distinct note styles from the same lecture: Quick revision cards, Topper academic proofs, Exam practice rubrics, and Chatpata conversational notes.',
    visualType: 'four_styles',
    highlights: ['Chatpata Notes (Chatbot vibe)', 'Topper Notes (Calculus & Proofs)', 'Quick Sheets (Formulas & Traps)', 'Exam Mode (Marking Schemes)'],
  },
  {
    time: 17,
    duration: 5,
    badge: 'SCENE 4 · 100% FREE & ACCESSIBLE',
    title: 'Built with Zero Paywalls for Indian Students',
    subtitle: 'Aligned with CBSE, ISC, JEE, NEET and university standards — completely free forever.',
    narration: 'Libnotes is built for real students on a zero budget. No subscriptions, no hidden paywalls, just high-retention learning.',
    visualType: 'mission',
    highlights: ['₹0 Budget & 100% Free', 'CBSE, JEE & NEET aligned', 'Exportable editorial A4 PDFs'],
  },
];

const TUTORIAL_SCENES: VideoScene[] = [
  {
    time: 0,
    duration: 5,
    badge: 'STEP 1 · 1-CLICK AUTH',
    title: 'Log in with Google or Email in 5 Seconds',
    subtitle: 'Save your study kits, track weak quiz topics, and access your notes from any device seamlessly.',
    narration: 'Step one: Click Sign In. Use Google One-Tap or your email. Your personalized dashboard stores all your generated study kits safely.',
    visualType: 'login',
    highlights: ['Google 1-Tap Sign In', 'Zero password hassle', 'Personal notes dashboard'],
  },
  {
    time: 5,
    duration: 6,
    badge: 'STEP 2 · FEED ANY LECTURE',
    title: 'Paste a YouTube Link or Upload MP4 / MP3',
    subtitle: 'Drop your lecture video or paste a link. Libnotes AI automatically identifies the subject and chapter.',
    narration: 'Step two: Click New Notes. Paste any YouTube lecture URL or drop your recorded video or audio file. You do not even need to pick subjects manually.',
    visualType: 'input',
    highlights: ['YouTube, Zoom & Drive links', 'MP4, WebM & MP3 uploads', 'AI Auto-Analysis active'],
  },
  {
    time: 11,
    duration: 6,
    badge: 'STEP 3 · SOURCE VERIFICATION',
    title: 'AI Transcribes & Verifies Academic Concepts',
    subtitle: 'Every formula, definition, and concept is checked against real lecture audio with zero fake information.',
    narration: 'Step three: In under a minute, the AI processes the speech, verifies every formula, and prepares your comprehensive study workspace.',
    visualType: 'analyzing',
    highlights: ['Audio speech recognition', 'Zero cross-subject mixing', 'Source-grounded quality gate'],
  },
  {
    time: 17,
    duration: 6,
    badge: 'STEP 4 · GET CHATBOT NOTES READY',
    title: 'Switch to Chatpata Notes for Chatbot-Style Learning',
    subtitle: 'Complex physics and accounts taught through friendly desi analogies, conversational banter, and punchlines!',
    narration: 'Step four: Click on Chatpata Notes! The AI speaks like a knowledgeable senior friend, breaking down hard topics like inertia or journal entries using hilarious analogies.',
    visualType: 'chatbot_notes',
    highlights: ['Conversational chatbot tone', 'Relatable desi analogies', 'Jugaad exam memory tricks'],
  },
  {
    time: 23,
    duration: 5,
    badge: 'STEP 5 · PRACTICE & EXPORT PDF',
    title: 'Test Weak Spots with Quizzes & Download A4 PDF',
    subtitle: 'Flip flashcards, take 5-question diagnostic tests, and print publication-grade notes with 1 click.',
    narration: 'Finally, test your knowledge with interactive diagnostic quizzes and download clean, formatted A4 PDF notes for offline exam revision!',
    visualType: 'quiz_pdf',
    highlights: ['5-Question diagnostic quiz', 'Instant weak-spot analysis', 'Clean, ad-free A4 PDF downloads'],
  },
];

export const AIVideoSection: React.FC<AIVideoSectionProps> = ({
  onOpenUpload,
  onNavigateLogin,
  initialVideo = 'about',
  isModal = false,
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoType>(initialVideo);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true); // browser autoplay policies prefer muted default
  const [hasVoiceSupport, setHasVoiceSupport] = useState<boolean>(false);

  const scenes = activeVideo === 'about' ? ABOUT_US_SCENES : TUTORIAL_SCENES;
  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasVoiceSupport(true);
    }
  }, []);

  // Determine current active scene
  let accumulatedTime = 0;
  let currentScene = scenes[0];
  let currentSceneIndex = 0;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    if (currentTime >= accumulatedTime && currentTime < accumulatedTime + scene.duration) {
      currentScene = scene;
      currentSceneIndex = i;
      break;
    }
    accumulatedTime += scene.duration;
  }
  if (currentTime >= totalDuration) {
    currentScene = scenes[scenes.length - 1];
    currentSceneIndex = scenes.length - 1;
  }

  // Animation / Timer interval
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 100;
    const step = (intervalMs / 1000) * playbackSpeed;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev + step >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, totalDuration, playbackSpeed]);

  // Voice narration effect using Web Speech API
  const lastSpokenSceneRef = useRef<number>(-1);
  useEffect(() => {
    if (isMuted || !isPlaying || !hasVoiceSupport) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (lastSpokenSceneRef.current !== currentSceneIndex) {
      lastSpokenSceneRef.current = currentSceneIndex;
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentScene.narration);
        utterance.rate = playbackSpeed * 1.05;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [currentSceneIndex, isMuted, isPlaying, hasVoiceSupport, playbackSpeed, currentScene]);

  // Switch video tab
  const handleSwitchVideo = (type: VideoType) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    lastSpokenSceneRef.current = -1;
    setActiveVideo(type);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    lastSpokenSceneRef.current = -1;
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (!isPlaying && currentTime >= totalDuration) {
      handleRestart();
      return;
    }
    if (isPlaying && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      // Trigger voice for current scene immediately
      lastSpokenSceneRef.current = -1;
    } else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  return (
    <section className={`w-full ${isModal ? 'p-0' : 'py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'}`}>
      
      {/* Outer Card with Retro Editorial Border */}
      <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl sm:rounded-3xl shadow-[5px_5px_0px_#141414] overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-[#FAF9F5] border-b-2 border-[#141414] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Title & Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8F2DC] border border-[#141414] flex items-center justify-center text-[#141414] shadow-[1px_1px_0px_#141414]">
              <Film className="w-4 h-4 text-[#79A94A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#141414]">
                  Libnotes AI Video Studio
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8F2DC] text-[#446A1D] border border-[#79A94A]/40 font-semibold">
                  INTERACTIVE EXPLAINER
                </span>
              </div>
              <p className="text-[11px] text-[#5E5D57] font-body hidden sm:block">
                Watch in under 2 minutes instead of scrolling long text walls.
              </p>
            </div>
          </div>

          {/* Video Mode Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-xl border border-[#141414] shadow-[1.5px_1.5px_0px_#141414]">
            <button
              onClick={() => handleSwitchVideo('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVideo === 'about'
                  ? 'bg-[#141414] text-[#FFFFFF]'
                  : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#79A94A]" />
              <span>1. About Us Video</span>
            </button>
            <button
              onClick={() => handleSwitchVideo('tutorial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVideo === 'tutorial'
                  ? 'bg-[#141414] text-[#FFFFFF]'
                  : 'text-[#5E5D57] hover:text-[#141414] hover:bg-[#EFECE1]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#79A94A]" />
              <span>2. Login & Chatbot Notes</span>
            </button>
          </div>
        </div>

        {/* Video Canvas / Stage */}
        <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[420px] bg-[#141414] flex flex-col justify-between p-4 sm:p-8 text-[#FFFFFF] overflow-hidden select-none">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          {/* Top Stage Bar: Scene badge & time */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/10 backdrop-blur-md border border-[#FFFFFF]/20 text-[11px] font-mono font-semibold tracking-wider text-[#A8D37E]">
              <span className="w-2 h-2 rounded-full bg-[#79A94A] animate-pulse" />
              {currentScene.badge}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#FFFFFF]/70 bg-[#000000]/40 px-2.5 py-1 rounded-md border border-[#FFFFFF]/10">
                {Math.floor(currentTime)}s / {totalDuration}s
              </span>
            </div>
          </div>

          {/* Center Stage: Dynamic Visual Walkthrough */}
          <div className="relative z-10 my-auto max-w-3xl mx-auto w-full text-center py-2 sm:py-6">
            
            {/* Visual Icon / Representation for Scene */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-[#FFFFFF]/10 border-2 border-[#FFFFFF]/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-300 transform scale-100 hover:scale-105">
              {currentScene.visualType === 'problem' && (
                <div className="text-center font-mono font-bold text-2xl text-[#E05B49]">1.75x</div>
              )}
              {currentScene.visualType === 'ai_magic' && (
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#79A94A] animate-pulse" />
              )}
              {currentScene.visualType === 'four_styles' && (
                <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-[#79A94A]" />
              )}
              {currentScene.visualType === 'mission' && (
                <div className="text-center font-mono font-bold text-2xl text-[#79A94A]">₹0</div>
              )}
              {currentScene.visualType === 'login' && (
                <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-[#79A94A]" />
              )}
              {currentScene.visualType === 'input' && (
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#F4B400]" />
              )}
              {currentScene.visualType === 'analyzing' && (
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#79A94A] animate-bounce" />
              )}
              {currentScene.visualType === 'chatbot_notes' && (
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#A8D37E]" />
              )}
              {currentScene.visualType === 'quiz_pdf' && (
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#79A94A]" />
              )}
            </div>

            {/* Scene Headline */}
            <h3 className="font-mono-editorial text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-md px-2">
              {currentScene.title}
            </h3>

            {/* Scene Subtitle / Description */}
            <p className="font-body text-xs sm:text-base text-[#FFFFFF]/80 mt-2 sm:mt-3 max-w-xl mx-auto leading-relaxed px-2">
              {currentScene.subtitle}
            </p>

            {/* Key Interactive Bullet Pills */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 px-2">
              {currentScene.highlights.map((h, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#FFFFFF]/10 border border-[#FFFFFF]/15 text-[11px] sm:text-xs font-mono text-[#E8F2DC] shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#79A94A]" />
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitles Bar (Live captions for narration) */}
          <div className="relative z-10 bg-[#000000]/70 backdrop-blur-md border border-[#FFFFFF]/15 rounded-xl px-4 py-2.5 max-w-2xl mx-auto w-full text-center mb-3">
            <span className="text-[10px] font-mono text-[#A8D37E] uppercase tracking-wider block mb-0.5">
              AI Voice Caption:
            </span>
            <p className="text-xs sm:text-sm font-body text-[#FFFFFF] italic">
              "{currentScene.narration}"
            </p>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="relative z-10 pt-2 border-t border-[#FFFFFF]/10 flex flex-col gap-2">
            
            {/* Scrubber Progress Bar */}
            <div 
              className="w-full h-1.5 bg-[#FFFFFF]/20 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                setCurrentTime(ratio * totalDuration);
                lastSpokenSceneRef.current = -1;
              }}
            >
              <div 
                className="h-full bg-[#79A94A] transition-all duration-100 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="p-2 rounded-lg bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#FFFFFF] transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#79A94A]" />}
                </button>
                <button
                  onClick={handleRestart}
                  className="p-2 rounded-lg bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#FFFFFF]/80 hover:text-[#FFFFFF] transition-colors cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggleMute}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    isMuted 
                      ? 'bg-[#FFFFFF]/10 text-[#FFFFFF]/70 hover:text-[#FFFFFF]' 
                      : 'bg-[#79A94A]/30 text-[#A8D37E] border border-[#79A94A]/50'
                  }`}
                  title={isMuted ? 'Turn Sound On (Voice Narration)' : 'Mute Voice'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="text-[10px] hidden sm:inline">
                    {isMuted ? 'Muted' : 'Voice ON'}
                  </span>
                </button>
              </div>

              {/* Speed Controller & Direct CTA */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#FFFFFF]/10 rounded-lg p-0.5 border border-[#FFFFFF]/10">
                  {[1, 1.25, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-[#79A94A] text-[#141414] font-bold'
                          : 'text-[#FFFFFF]/70 hover:text-[#FFFFFF]'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {onOpenUpload && (
                  <button
                    onClick={onOpenUpload}
                    className="btn-primary-green text-xs px-3 py-1.5 h-auto hidden sm:inline-flex items-center gap-1.5"
                  >
                    <span>Try It Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick-Start Action Row */}
        <div className="p-4 sm:p-5 bg-[#FAF9F5] border-t-2 border-[#141414] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#4A4944] text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#79A94A] shrink-0" />
            <span>
              {activeVideo === 'about'
                ? 'Libnotes is 100% free with no credit card or subscription needed.'
                : 'Ready to try Chatpata Notes? Drop any YouTube link or video recording.'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {activeVideo === 'tutorial' && onNavigateLogin && (
              <button
                onClick={onNavigateLogin}
                className="px-4 py-2 rounded-xl border border-[#141414] bg-[#FFFFFF] hover:bg-[#EFECE1] text-xs font-mono font-bold text-[#141414] transition-all shadow-[1.5px_1.5px_0px_#141414] flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#79A94A]" />
                <span>Log In First</span>
              </button>
            )}

            {onOpenUpload && (
              <button
                onClick={onOpenUpload}
                className="btn-primary-green text-xs px-4 py-2 h-auto flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Make My Notes</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
