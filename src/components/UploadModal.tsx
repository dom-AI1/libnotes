import React, { useState, useEffect } from 'react';
import { 
  X, UploadCloud, Link as LinkIcon, Sparkles, BookOpen, Award, Coffee, 
  GraduationCap, CheckCircle2, AlertCircle, FileVideo, Trash2, Lock,
  AlertOctagon, Clock, Home
} from 'lucide-react';
import type { AcademicClass, Language, NoteStyle, Subject, StudyKit } from '../types';
import { validateEducationalFile, formatFileSize } from '../utils/fileValidation';
import { validateLectureUrl, fetchVideoTitleFromUrl } from '../utils/urlValidation';
import { 
  processEducationalLecture, 
  detectLectureMetadataFromSource, 
  type ProcessingProgressEvent 
} from '../services/aiProcessingService';
import { LectureAnalysisError } from '../services/videoAnalysisService';
import {
  ACADEMIC_CURRICULUM,
  getSubjectsForClassAndStream,
  getStreamsForClass,
} from '../constants/curriculum';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (generatedKit: StudyKit) => void;
  initialLink?: string;
  initialStyle?: NoteStyle;
  isAuthenticated?: boolean;
  onRequireAuth?: (pendingData?: { source: 'upload' | 'link'; linkUrl: string; style: NoteStyle }) => void;
}

export const UploadModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialLink = '',
  initialStyle = 'topper',
  isAuthenticated = false,
  onRequireAuth,
}: UploadModalProps) => {
  const [sourceType, setSourceType] = useState<'upload' | 'link'>(initialLink ? 'link' : 'link');
  const [videoLink, setVideoLink] = useState(initialLink || '');
  const [customTopic, setCustomTopic] = useState('');
  const [detectedTitle, setDetectedTitle] = useState<string | null>(null);
  const [isFetchingTitle, setIsFetchingTitle] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileValidationMessage, setFileValidationMessage] = useState<string | null>(null);
  const [urlValidationMessage, setUrlValidationMessage] = useState<string | null>(null);
  const [urlNotice, setUrlNotice] = useState<string | null>(null);

  const [academicClass, setAcademicClass] = useState<AcademicClass>('Class 12');
  const [stream, setStream] = useState<string>('Science');
  const [subject, setSubject] = useState<Subject>('Physics');
  const [chapter, setChapter] = useState('');
  const [language, setLanguage] = useState<Language>('Hinglish');
  const [autoDetect, setAutoDetect] = useState(true);
  const [showManualSyllabus, setShowManualSyllabus] = useState(false);
  const [noteStyle, setNoteStyle] = useState<NoteStyle>(
    initialStyle === 'minimal' ? 'quick' : initialStyle === 'chatpate' ? 'chatpata' : initialStyle
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [notStudyError, setNotStudyError] = useState<{ active: boolean; message: string; countdown: number } | null>(null);
  const [progressEvent, setProgressEvent] = useState<ProcessingProgressEvent>({
    step: 'audio',
    message: '',
    percentage: 0,
  });

  // 5-second countdown timer for non-study material rejection
  useEffect(() => {
    if (!notStudyError?.active) return;

    if (notStudyError.countdown <= 0) {
      setNotStudyError(null);
      onClose();
      window.location.hash = '#/home';
      return;
    }

    const timer = setTimeout(() => {
      setNotStudyError((prev) => (prev ? { ...prev, countdown: prev.countdown - 1 } : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [notStudyError?.active, notStudyError?.countdown, onClose]);

  const handleClassChange = (newClass: AcademicClass) => {
    setAcademicClass(newClass);
    const config = ACADEMIC_CURRICULUM[newClass] || ACADEMIC_CURRICULUM['Class 12'];
    if (config.hasStreams && config.streams) {
      const firstStream = Object.keys(config.streams)[0];
      const streamConfig = config.streams[firstStream];
      setStream(firstStream);
      setSubject(streamConfig.defaultSubject);
      setChapter(streamConfig.defaultChapter);
    } else {
      setStream('');
      setSubject(config.defaultSubject || 'Science');
      setChapter(config.defaultChapter || 'Chemical Reactions & Equations');
    }
  };

  const handleStreamChange = (newStream: string) => {
    setStream(newStream);
    const config = ACADEMIC_CURRICULUM[academicClass] || ACADEMIC_CURRICULUM['Class 12'];
    if (config.hasStreams && config.streams && config.streams[newStream]) {
      const streamConfig = config.streams[newStream];
      setSubject(streamConfig.defaultSubject);
      setChapter(streamConfig.defaultChapter);
    }
  };

  const handleSubjectChange = (newSubject: Subject) => {
    setSubject(newSubject);
    const config = ACADEMIC_CURRICULUM[academicClass] || ACADEMIC_CURRICULUM['Class 12'];
    if (config.hasStreams && config.streams && config.streams[stream]?.chapterSuggestions?.[newSubject]) {
      setChapter(config.streams[stream].chapterSuggestions![newSubject]);
    } else if (!config.hasStreams && config.chapterSuggestions?.[newSubject]) {
      setChapter(config.chapterSuggestions[newSubject]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (initialLink) {
        setSourceType('link');
        setVideoLink(initialLink);
      } else {
        setVideoLink('');
      }
      setCustomTopic('');
      setDetectedTitle(null);
      setIsFetchingTitle(false);
      if (initialStyle) {
        setNoteStyle(
          initialStyle === 'minimal' ? 'quick' : initialStyle === 'chatpate' ? 'chatpata' : initialStyle
        );
      }
      setFileValidationMessage(null);
      setUrlValidationMessage(null);
      setUrlNotice(null);
      setSelectedFile(null);
      setIsProcessing(false);
      setShowManualSyllabus(false);
      setAutoDetect(true);
    }
  }, [isOpen, initialLink, initialStyle]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const cleanFilenameToTopic = (filename: string): string => {
    if (!filename) return '';
    const withoutExt = filename.replace(/\.[^/.]+$/, '');
    const cleaned = withoutExt
      .replace(/^gemini_generated_video_[a-z0-9]+/i, '')
      .replace(/^(vidssave(\.com)?|y2mate(\.[a-z]+)?|snapsave(\.[a-z]+)?|yt1s(\.[a-z]+)?|ssstik(\.[a-z]+)?|savefrom(\.[a-z]+)?)[_\s-]*/i, '')
      .replace(/\b(720p|1080p|480p|360p|2160p|4k|hd|webrip)\b/gi, '')
      .replace(/^[a-z0-9_-]{8,}_/i, '')
      .replace(/[_-]+/g, ' ')
      .trim();
    return cleaned;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validation = validateEducationalFile(file);
      if (!validation.valid) {
        setSelectedFile(null);
        setFileValidationMessage(validation.error || 'Invalid file.');
      } else {
        setSelectedFile(file);
        setFileValidationMessage(null);
        const derived = cleanFilenameToTopic(file.name);
        if (derived && !customTopic) {
          setCustomTopic(derived);
          setChapter(derived);
          const detected = detectLectureMetadataFromSource(derived, 'upload', derived);
          if (detected.subject) setSubject(detected.subject);
          if (detected.academicClass) setAcademicClass(detected.academicClass);
          if (detected.stream) setStream(detected.stream);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateEducationalFile(file);
    if (!validation.valid) {
      setSelectedFile(null);
      setFileValidationMessage(validation.error || 'Invalid file.');
    } else {
      setSelectedFile(file);
      setFileValidationMessage(null);
      const derived = cleanFilenameToTopic(file.name);
      if (derived && !customTopic) {
        setCustomTopic(derived);
        setChapter(derived);
        const detected = detectLectureMetadataFromSource(derived, 'upload', derived);
        if (detected.subject) setSubject(detected.subject);
        if (detected.academicClass) setAcademicClass(detected.academicClass);
        if (detected.stream) setStream(detected.stream);
      }
    }
  };

  const handleUrlBlur = async () => {
    if (!videoLink.trim()) {
      setUrlValidationMessage(null);
      setUrlNotice(null);
      return;
    }
    const result = validateLectureUrl(videoLink);
    if (!result.valid) {
      setUrlValidationMessage(result.error || 'Invalid lecture URL.');
      setUrlNotice(null);
    } else {
      setUrlValidationMessage(null);
      setUrlNotice(result.notice || null);

      // Attempt to automatically extract title from YouTube / Vimeo oEmbed
      setIsFetchingTitle(true);
      try {
        const title = await fetchVideoTitleFromUrl(videoLink);
        setIsFetchingTitle(false);
        if (title) {
          setDetectedTitle(title);
          if (!customTopic) {
            setCustomTopic(title);
            setChapter(title);
          }
          // Infer subject from title
          const detected = detectLectureMetadataFromSource(videoLink, 'link', title);
          setAcademicClass(detected.academicClass);
          if (detected.stream) setStream(detected.stream);
          setSubject(detected.subject);
        }
      } catch {
        setIsFetchingTitle(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (onRequireAuth) {
        onRequireAuth({
          source: sourceType,
          linkUrl: videoLink,
          style: noteStyle,
        });
      }
      return;
    }

    if (sourceType === 'upload') {
      if (!selectedFile) {
        setFileValidationMessage('Please select a lecture video file (MP4, MKV, MOV, MP3).');
        return;
      }
      const validation = validateEducationalFile(selectedFile);
      if (!validation.valid) {
        setFileValidationMessage(validation.error || 'Invalid file.');
        return;
      }
    } else {
      const urlCheck = validateLectureUrl(videoLink);
      if (!urlCheck.valid) {
        setUrlValidationMessage(urlCheck.error || 'Invalid lecture URL.');
        return;
      }
    }

    setIsProcessing(true);

    try {
      const currentConfig = ACADEMIC_CURRICULUM[academicClass] || ACADEMIC_CURRICULUM['Class 12'];
      const isAuto = autoDetect && !showManualSyllabus;

      let resolvedTopic = customTopic.trim();
      let resolvedSubject = subject;
      let resolvedChapter = chapter.trim();

      if (sourceType === 'link') {
        if (!resolvedTopic) {
          try {
            const fetchedTitle = await fetchVideoTitleFromUrl(videoLink);
            if (fetchedTitle) {
              resolvedTopic = fetchedTitle;
              resolvedChapter = fetchedTitle;
            }
          } catch {
            // ignore title fetch failure
          }
        }
        if (isAuto || !showManualSyllabus) {
          const detected = detectLectureMetadataFromSource(videoLink, 'link', resolvedTopic);
          if (detected.subject) resolvedSubject = detected.subject;
          if (detected.academicClass) setAcademicClass(detected.academicClass);
          if (detected.stream) setStream(detected.stream);
        }
      }

      if (sourceType === 'upload' && selectedFile) {
        if (!resolvedTopic) {
          resolvedTopic = cleanFilenameToTopic(selectedFile.name);
          resolvedChapter = resolvedTopic;
        }
        if (isAuto || !showManualSyllabus) {
          const detected = detectLectureMetadataFromSource(selectedFile.name, 'upload', resolvedTopic);
          if (detected.subject) resolvedSubject = detected.subject;
          if (detected.academicClass) setAcademicClass(detected.academicClass);
          if (detected.stream) setStream(detected.stream);
        }
      }

      const effectiveChapter = resolvedTopic || resolvedChapter || 'Lecture Concept Analysis';
      const effectiveSubject = resolvedSubject || 'Physics';
      const effectiveTitle = `${effectiveSubject}: ${effectiveChapter}`;

      const generatedKit = await processEducationalLecture(
        {
          title: effectiveTitle,
          subject: effectiveSubject,
          academicClass: academicClass || 'Class 12',
          stream: currentConfig.hasStreams ? stream : undefined,
          chapter: effectiveChapter,
          customTopic: effectiveChapter,
          autoDetect: isAuto,
          noteStyle,
          language,
          sourceType,
          sourceIdentifier: sourceType === 'link' ? videoLink : selectedFile!.name,
          fileSizeFormatted: selectedFile ? formatFileSize(selectedFile.size) : undefined,
        },
        (progress) => {
          setProgressEvent(progress);
        }
      );

      setIsProcessing(false);
      onSuccess(generatedKit);
    } catch (err) {
      setIsProcessing(false);
      const isNotStudy =
        (err instanceof LectureAnalysisError && err.code === 'NOT_STUDY_MATERIAL') ||
        (err instanceof Error && (
          err.message.toLowerCase().includes('not study material') || 
          err.message.toLowerCase().includes('non-educational') ||
          err.message.toLowerCase().includes("doesn't study")
        ));

      if (isNotStudy) {
        setNotStudyError({
          active: true,
          message: 'This is not study material',
          countdown: 5,
        });
        return;
      }

      const errMsg = err instanceof Error ? err.message : 'An error occurred during note generation. Please try again.';
      if (sourceType === 'upload') {
        setFileValidationMessage(errMsg);
      } else {
        setUrlValidationMessage(errMsg);
      }
    }
  };

  const noteStyleOptions = [
    {
      id: 'quick' as NoteStyle,
      title: 'Quick Notes',
      icon: BookOpen,
      desc: 'Crisp summaries, essential definitions, key formulas, and high-yield revision bullets.',
      tag: 'Best for 10-Minute Recap',
    },
    {
      id: 'topper' as NoteStyle,
      title: 'Topper Notes',
      icon: Award,
      desc: 'Detailed topic-wise explanations, calculus proofs, definitions, examples, and exam-worthy tips.',
      tag: 'Most Comprehensive',
    },
    {
      id: 'chatpata' as NoteStyle,
      title: 'Chatpata Notes',
      icon: Coffee,
      desc: 'Conversational Hinglish explanations, relatable desi analogies, memory tricks, and concise recaps.',
      tag: 'High Conceptual Retention',
    },
    {
      id: 'exam' as NoteStyle,
      title: 'Exam Mode',
      icon: GraduationCap,
      desc: 'Expected 1-mark, 3-mark & 5-mark board questions with official marking scheme rubrics.',
      tag: 'Mark-Oriented Prep',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#141414]/65 backdrop-blur-sm p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div 
          className="relative w-full max-w-3xl bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl shadow-xl p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-[#24332D] dark:text-[#E8EEE9]"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Prominent Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#242D28] hover:bg-[#F4F5F2] dark:hover:bg-[#1F2622] hover:scale-105 active:scale-95 shadow-xs transition-all cursor-pointer text-[#24332D] dark:text-[#E8EEE9]"
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {notStudyError?.active ? (
            /* DANGER RED WARNING: NOT STUDY MATERIAL */
            <div className="py-8 sm:py-12 px-2 sm:px-6 text-center space-y-6 animate-in fade-in zoom-in-95">
              {/* Pulsing Red Danger Alert Icon */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FDEDE8] border-3 border-[#E05B49] flex items-center justify-center shadow-[5px_5px_0px_#E05B49] animate-pulse">
                <AlertOctagon className="w-10 h-10 text-[#E05B49]" />
              </div>

              {/* Danger Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest bg-[#FDEDE8] text-[#E05B49] border-2 border-[#E05B49] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#E05B49] animate-ping" />
                  AI REJECTION • NON-STUDY CONTENT
                </span>
              </div>

              {/* Primary Warning Headline */}
              <div className="space-y-3">
                <h2 className="font-mono-editorial text-3xl sm:text-4xl font-extrabold text-[#E05B49] tracking-tight">
                  This is not study material
                </h2>
                <p className="font-body text-sm sm:text-base text-[#141414] max-w-lg mx-auto leading-relaxed">
                  Our AI analyzed this video and determined it does not contain educational or academic study content. Libnotes is strictly built for lectures, syllabus topics, and exam revision. That's why we are not generating notes for this video.
                </p>
              </div>

              {/* Dangerous Red Countdown Box */}
              <div className="p-5 rounded-2xl border-2 border-[#E05B49] bg-[#FDEDE8] max-w-md mx-auto shadow-[4px_4px_0px_#E05B49]">
                <div className="flex items-center justify-center gap-2 text-[#E05B49] font-mono font-bold text-sm sm:text-base">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>
                    Returning to Home in <strong className="text-2xl font-black underline font-mono text-[#E05B49]">{notStudyError.countdown}s</strong>...
                  </span>
                </div>
                
                {/* 5-Second Animated Progress Bar */}
                <div className="w-full h-2.5 bg-[#FFFFFF] rounded-full mt-3 overflow-hidden border border-[#E05B49]/40 p-0.5">
                  <div 
                    className="h-full bg-[#E05B49] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(notStudyError.countdown / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Explicit Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setNotStudyError(null);
                    onClose();
                    window.location.hash = '#/home';
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E05B49] text-[#FFFFFF] font-mono text-xs font-bold shadow-[3px_3px_0px_#141414] hover:bg-[#C94736] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Home Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNotStudyError(null);
                    setSelectedFile(null);
                    setVideoLink('');
                    setCustomTopic('');
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-[#141414] bg-[#FFFFFF] hover:bg-[#FAF9F5] font-mono text-xs font-bold text-[#141414] shadow-[2px_2px_0px_#141414] transition-all cursor-pointer"
                >
                  Upload an Academic Lecture
                </button>
              </div>
            </div>
          ) : isProcessing ? (
            /* Processing State with Live Pipeline Progress */
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#E8F2DC] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Sparkles className="w-8 h-8 text-[#79A94A]" />
              </div>
              
              <h3 className="font-mono-editorial text-2xl font-bold text-[#141414]">
                {progressEvent.message || 'Transforming lecture into notes...'}
              </h3>

              <p className="mt-2 text-xs font-mono text-[#5E5D57]">
                Pipeline Progress: {progressEvent.percentage}%
              </p>

              {/* Real Progress Bar */}
              <div className="w-72 h-3 bg-[#DFDBCF] rounded-full mx-auto mt-6 overflow-hidden border border-[#141414] p-0.5">
                <div 
                  className="h-full bg-[#79A94A] rounded-full transition-all duration-300"
                  style={{ width: `${progressEvent.percentage}%` }}
                />
              </div>

              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#141414]/30 text-[11px] font-mono text-[#5E5D57]">
                <span className="w-2 h-2 rounded-full bg-[#79A94A] animate-ping" />
                <span>Synthesizing speech timestamps into {noteStyle.toUpperCase()} study kit</span>
              </div>

              {/* Cancel Generation Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary-outline px-5 py-2 text-xs font-mono font-bold text-[#5E5D57] hover:text-[#E05B49] hover:border-[#E05B49] transition-colors"
                >
                  Cancel & Close
                </button>
              </div>
            </div>
          ) : (
          /* Upload Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                CREATE NEW STUDY KIT
              </span>
              <h2 className="font-mono-editorial text-xl sm:text-3xl font-bold text-[#0F172A] mt-2 pr-10 sm:pr-0">
                Upload lecture video or paste link
              </h2>
              <p className="text-[#64748B] font-body text-sm mt-1">
                Customize syllabus parameters and choose your preferred note style.
              </p>
            </div>

            {/* Source Toggle */}
            <div className="flex rounded-xl border border-[#E2E8F0] p-1 bg-[#F8FAFC] max-w-sm">
              <button
                type="button"
                onClick={() => setSourceType('link')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                  sourceType === 'link'
                    ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Paste Video Link
              </button>
              <button
                type="button"
                onClick={() => setSourceType('upload')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                  sourceType === 'upload'
                    ? 'bg-[#0F172A] text-[#FFFFFF] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                Upload File
              </button>
            </div>

            {/* Input Box based on source */}
            {sourceType === 'link' ? (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-[#141414] uppercase">
                  Lecture URL
                </label>
                <input
                  type="text"
                  required
                  value={videoLink}
                  onChange={(e) => {
                    setVideoLink(e.target.value);
                    if (urlValidationMessage) setUrlValidationMessage(null);
                  }}
                  onBlur={handleUrlBlur}
                  placeholder="https://www.youtube.com/watch?v=... or Vimeo"
                  className={`w-full h-11 px-3.5 rounded-xl border bg-[#FFFFFF] text-sm font-body text-[#141414] focus:outline-none focus:ring-2 ${
                    urlValidationMessage 
                      ? 'border-[#E05B49] focus:ring-[#E05B49]' 
                      : 'border-[#141414]/30 focus:ring-[#79A94A] focus:border-[#79A94A]'
                  }`}
                />

                {urlValidationMessage && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#E05B49] bg-[#FDEDE8] p-2.5 rounded-lg border border-[#E05B49]/40">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{urlValidationMessage}</span>
                  </div>
                )}

                {urlNotice && !urlValidationMessage && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#79A94A] bg-[#F1F7EA] p-2.5 rounded-lg border border-[#79A94A]/40">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{urlNotice}</span>
                  </div>
                )}

                {/* Lecture Topic / Video Title Field */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono font-semibold text-[#141414] uppercase">
                      Lecture Topic / Chapter (Optional)
                    </label>
                    {isFetchingTitle ? (
                      <span className="text-[11px] font-mono text-[#79A94A] flex items-center gap-1 animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        Detecting title from video...
                      </span>
                    ) : detectedTitle ? (
                      <span className="text-[10px] font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded-full border border-[#79A94A]/30">
                        DETECTED FROM VIDEO
                      </span>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => {
                      setCustomTopic(e.target.value);
                      setChapter(e.target.value);
                    }}
                    placeholder="e.g. Demand & Supply, French Revolution, Photosynthesis, Binary Search"
                    className="w-full h-10 px-3.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#79A94A] focus:border-[#79A94A]"
                  />
                  <p className="text-[11px] font-mono text-[#8A8880]">
                    Auto-detected from YouTube or enter the topic so notes are custom-crafted for this video.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-[#141414] uppercase">
                  Select Video or Audio File
                </label>

                {!selectedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative ${
                      isDragging
                        ? 'border-[#79A94A] bg-[#E8F2DC]/60 ring-2 ring-[#79A94A]/40 scale-[1.01]'
                        : 'border-[#141414]/40 bg-[#FAF9F5] hover:bg-[#E8F2DC]/30'
                    }`}
                  >
                    <input
                      type="file"
                      accept="video/mp4,video/mkv,video/quicktime,video/webm,audio/mp3,audio/wav,audio/m4a"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className={`w-8 h-8 mx-auto mb-2 transition-transform duration-200 ${isDragging ? 'text-[#79A94A] scale-110 animate-bounce' : 'text-[#79A94A]'}`} />
                    <p className="text-sm font-medium text-[#141414]">
                      {isDragging ? 'Drop your lecture video here now' : 'Click to browse or drop lecture recording'}
                    </p>
                    <p className="text-xs text-[#8A8880] mt-1 font-mono">
                      MP4, MKV, MOV, WebM or MP3 (Max 500 MB limit)
                    </p>
                  </div>
                ) : (
                  /* File Selected Display with Size and Remove Option */
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                          <FileVideo className="w-5 h-5 text-[#059669]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-bold font-mono text-[#0F172A] truncate">
                            {selectedFile.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#64748B]">
                            Size: {formatFileSize(selectedFile.size)} • Ready for extraction
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="p-2 text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors border border-transparent hover:border-[#EF4444] shrink-0"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono font-semibold text-[#141414] uppercase">
                          Lecture Topic / Chapter Title
                        </label>
                        <span className="text-[10px] font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded-full border border-[#79A94A]/30">
                          CUSTOMIZE NOTES
                        </span>
                      </div>
                      <input
                        type="text"
                        value={customTopic}
                        onChange={(e) => {
                          setCustomTopic(e.target.value);
                          setChapter(e.target.value);
                        }}
                        placeholder="e.g. Wave Optics, Chemical Kinetics, Cell Division, Calculus Derivatives"
                        className="w-full h-10 px-3.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#79A94A] focus:border-[#79A94A]"
                      />
                      <p className="text-[11px] font-mono text-[#8A8880] pt-1">
                        AI will automatically detect the subject and chapter from your lecture content.
                      </p>
                    </div>
                  </div>
                )}

                {fileValidationMessage && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#E05B49] bg-[#FDEDE8] p-2.5 rounded-lg border border-[#E05B49]/40">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{fileValidationMessage}</span>
                  </div>
                )}
              </div>
            )}

            {/* Auto-Detection Banner vs Manual Syllabus Selectors */}
            {autoDetect && !showManualSyllabus ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#D1FAE5] border border-[#6EE7B7] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-5 h-5 text-[#059669]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#065F46] uppercase tracking-wide">
                          AI Auto-Analysis Active
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#059669] bg-[#FFFFFF] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                          AUTO-DETECT
                        </span>
                      </div>
                      <p className="text-xs font-body text-[#047857] mt-1 leading-relaxed">
                        {sourceType === 'upload'
                          ? 'Libnotes AI will transcribe your recording and automatically detect what the lecture is about — identifying the subject, chapter, and academic concepts. No manual syllabus selection needed!'
                          : 'Libnotes AI will analyze the lecture video and automatically identify the subject, chapter, and core concepts.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-mono font-semibold text-[#141414] uppercase">
                      Language:
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                      className="h-9 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A] cursor-pointer"
                    >
                      <option value="Hinglish">Hinglish (Recommended)</option>
                      <option value="English">English</option>
                      <option value="Hindi">Pure Hindi</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowManualSyllabus(true)}
                    className="text-xs font-mono text-[#5E5D57] hover:text-[#141414] transition-colors underline cursor-pointer text-left"
                  >
                    Want to specify class & subject manually? (Optional)
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#141414] uppercase">
                    Manual Syllabus Customization
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowManualSyllabus(false)}
                    className="text-xs font-mono text-[#79A94A] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Switch to AI Auto-Detect
                  </button>
                </div>

                {(() => {
                  const currentConfig = ACADEMIC_CURRICULUM[academicClass] || ACADEMIC_CURRICULUM['Class 12'];
                  const availableStreams = getStreamsForClass(academicClass);
                  const availableSubjects = getSubjectsForClassAndStream(academicClass, stream);

                  return (
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        currentConfig.hasStreams ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-4'
                      } gap-3`}
                    >
                      {/* 1. Target Class */}
                      <div>
                        <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                          Target Class
                        </label>
                        <select
                          value={academicClass}
                          onChange={(e) => handleClassChange(e.target.value as AcademicClass)}
                          className="w-full h-10 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A] cursor-pointer"
                        >
                          <option value="Class 10">Class 10</option>
                          <option value="Class 11">Class 11</option>
                          <option value="Class 12">Class 12</option>
                          <option value="College / B.Tech">College / B.Tech</option>
                          <option value="Competitive (JEE/NEET)">Competitive (JEE/NEET)</option>
                        </select>
                      </div>

                      {/* 2. Choose Stream / Branch (Conditional: Only for Class 11, 12, College, Competitive) */}
                      {currentConfig.hasStreams && (
                        <div className="animate-in fade-in duration-200">
                          <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase flex items-center justify-between">
                            <span>{currentConfig.streamLabel || 'Choose Stream'}</span>
                          </label>
                          <select
                            value={stream}
                            onChange={(e) => handleStreamChange(e.target.value)}
                            className="w-full h-10 px-2.5 rounded-xl border-2 border-[#79A94A] bg-[#F1F7EA] text-xs font-body font-semibold text-[#141414] focus:outline-none focus:ring-1 focus:ring-[#79A94A] cursor-pointer"
                          >
                            {availableStreams.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* 3. Subject (Dynamic based on Class & Stream) */}
                      <div>
                        <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                          Subject
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => handleSubjectChange(e.target.value as Subject)}
                          className="w-full h-10 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A] cursor-pointer"
                        >
                          {availableSubjects.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 4. Chapter / Topic */}
                      <div>
                        <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                          Chapter / Topic
                        </label>
                        <input
                          type="text"
                          value={chapter}
                          onChange={(e) => setChapter(e.target.value)}
                          placeholder="e.g. Thermodynamics"
                          className="w-full h-10 px-3 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A]"
                        />
                      </div>

                      {/* 5. Language Mode */}
                      <div>
                        <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                          Language Mode
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value as Language)}
                          className="w-full h-10 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A] cursor-pointer"
                        >
                          <option value="English">English</option>
                          <option value="Hinglish">Hinglish (Recommended)</option>
                          <option value="Hindi">Pure Hindi</option>
                        </select>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Note Style Selection Cards */}
            <div>
              <label className="block text-xs font-mono font-semibold text-[#141414] mb-2 uppercase">
                Choose Note Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {noteStyleOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = noteStyle === opt.id || (opt.id === 'quick' && noteStyle === 'minimal') || (opt.id === 'chatpata' && noteStyle === 'chatpate');
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setNoteStyle(opt.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#059669] bg-[#ECFDF5] shadow-xs ring-1 ring-[#059669]'
                          : 'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg border ${isSelected ? 'bg-[#059669] border-[#059669] text-white' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-mono-editorial font-bold text-sm text-[#0F172A]">
                            {opt.title}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#059669]" />}
                      </div>
                      <p className="text-xs text-[#64748B] mt-2 font-body leading-relaxed">
                        {opt.desc}
                      </p>
                      <div className="mt-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#475569] font-semibold bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                          {opt.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Cancel + Generate */}
            <div className="pt-3 flex flex-col-reverse sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto btn-secondary-outline py-3 px-6 text-sm font-mono font-bold flex items-center justify-center transition-colors hover:bg-[#EFECE1]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 btn-primary-green py-3.5 text-base font-semibold flex items-center justify-center gap-2"
              >
                {isAuthenticated ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Study Kit</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Sign In to Generate Notes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};
