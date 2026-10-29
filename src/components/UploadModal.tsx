import React, { useState } from 'react';
import { 
  X, UploadCloud, Link as LinkIcon, Sparkles, BookOpen, Award, Coffee, 
  GraduationCap, CheckCircle2, AlertCircle, FileVideo, Trash2 
} from 'lucide-react';
import type { AcademicClass, Language, NoteStyle, Subject, StudyKit } from '../types';
import { validateEducationalFile, formatFileSize } from '../utils/fileValidation';
import { validateLectureUrl } from '../utils/urlValidation';
import { processEducationalLecture, type ProcessingProgressEvent } from '../services/aiProcessingService';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (generatedKit: StudyKit) => void;
  initialLink?: string;
  initialStyle?: NoteStyle;
}

export const UploadModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialLink = '',
  initialStyle = 'topper',
}: UploadModalProps) => {
  const [sourceType, setSourceType] = useState<'upload' | 'link'>(initialLink ? 'link' : 'link');
  const [videoLink, setVideoLink] = useState(initialLink || 'https://www.youtube.com/watch?v=cbse-phys-thermo');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileValidationMessage, setFileValidationMessage] = useState<string | null>(null);
  const [urlValidationMessage, setUrlValidationMessage] = useState<string | null>(null);
  const [urlNotice, setUrlNotice] = useState<string | null>(null);

  const [academicClass, setAcademicClass] = useState<AcademicClass>('Class 12');
  const [subject, setSubject] = useState<Subject>('Physics');
  const [chapter, setChapter] = useState('Thermodynamics & Heat Engines');
  const [language, setLanguage] = useState<Language>('Hinglish');
  const [noteStyle, setNoteStyle] = useState<NoteStyle>(
    initialStyle === 'minimal' ? 'quick' : initialStyle === 'chatpate' ? 'chatpata' : initialStyle
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressEvent, setProgressEvent] = useState<ProcessingProgressEvent>({
    step: 'audio',
    message: '',
    percentage: 0,
  });

  if (!isOpen) return null;

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
    }
  };

  const handleUrlBlur = () => {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const generatedKit = await processEducationalLecture(
        {
          title: `${subject}: ${chapter}`,
          subject,
          academicClass,
          chapter,
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
      alert('An error occurred during note generation. Please try again.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141414]/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl shadow-[6px_6px_0px_#141414] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-5 right-5 p-2 rounded-xl border border-[#141414] bg-[#FFFFFF] hover:bg-[#EFECE1] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-[#141414]" />
        </button>

        {isProcessing ? (
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
          </div>
        ) : (
          /* Upload Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                CREATE NEW STUDY KIT
              </span>
              <h2 className="font-mono-editorial text-2xl sm:text-3xl font-bold text-[#141414] mt-2">
                Upload lecture video or paste link
              </h2>
              <p className="text-[#5E5D57] font-body text-sm mt-1">
                Customize syllabus parameters and choose your preferred note style.
              </p>
            </div>

            {/* Source Toggle */}
            <div className="flex rounded-xl border border-[#141414] p-1 bg-[#FAF9F5] max-w-sm">
              <button
                type="button"
                onClick={() => setSourceType('link')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                  sourceType === 'link'
                    ? 'bg-[#141414] text-[#FFFFFF]'
                    : 'text-[#5E5D57] hover:text-[#141414]'
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
                    ? 'bg-[#141414] text-[#FFFFFF]'
                    : 'text-[#5E5D57] hover:text-[#141414]'
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
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-[#141414] uppercase">
                  Select Video or Audio File
                </label>

                {!selectedFile ? (
                  <div className="border-2 border-dashed border-[#141414]/40 rounded-xl p-6 text-center bg-[#FAF9F5] hover:bg-[#E8F2DC]/30 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="video/mp4,video/mkv,video/quicktime,video/webm,audio/mp3,audio/wav,audio/m4a"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-8 h-8 text-[#79A94A] mx-auto mb-2" />
                    <p className="text-sm font-medium text-[#141414]">
                      Click to browse or drop lecture recording
                    </p>
                    <p className="text-xs text-[#8A8880] mt-1 font-mono">
                      MP4, MKV, MOV, WebM or MP3 (Max 500 MB limit)
                    </p>
                  </div>
                ) : (
                  /* File Selected Display with Size and Remove Option */
                  <div className="p-4 rounded-xl border-2 border-[#141414] bg-[#FFFFFF] shadow-[2px_2px_0px_#141414] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E8F2DC] border border-[#141414] flex items-center justify-center">
                        <FileVideo className="w-5 h-5 text-[#79A94A]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold font-mono text-[#141414] truncate max-w-sm">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs font-mono text-[#5E5D57]">
                          Size: {formatFileSize(selectedFile.size)} • Ready for extraction
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="p-2 text-[#E05B49] hover:bg-[#FDEDE8] rounded-lg transition-colors border border-transparent hover:border-[#E05B49]"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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

            {/* Class, Subject, Chapter, Language Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                  Target Class
                </label>
                <select
                  value={academicClass}
                  onChange={(e) => setAcademicClass(e.target.value as AcademicClass)}
                  className="w-full h-10 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A]"
                >
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="College / B.Tech">College / B.Tech</option>
                  <option value="Competitive (JEE/NEET)">Competitive (JEE/NEET)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as Subject)}
                  className="w-full h-10 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A]"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

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

              <div>
                <label className="block text-xs font-mono font-semibold text-[#141414] mb-1 uppercase">
                  Language Mode
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full h-10 px-2.5 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A]"
                >
                  <option value="English">English</option>
                  <option value="Hinglish">Hinglish (Recommended)</option>
                  <option value="Hindi">Pure Hindi</option>
                </select>
              </div>
            </div>

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
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#141414] bg-[#E8F2DC] shadow-[3px_3px_0px_#141414]'
                          : 'border-[#141414]/20 bg-[#FFFFFF] hover:border-[#141414]/60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg border border-[#141414] ${isSelected ? 'bg-[#79A94A] text-white' : 'bg-[#FCFAF6] text-[#141414]'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-mono-editorial font-bold text-sm text-[#141414]">
                            {opt.title}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#79A94A]" />}
                      </div>
                      <p className="text-xs text-[#5E5D57] mt-2 font-body leading-relaxed">
                        {opt.desc}
                      </p>
                      <div className="mt-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#141414] font-semibold bg-[#FCFAF6] px-2 py-0.5 rounded border border-[#141414]/20">
                          {opt.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prominent Primary Green Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary-green py-3.5 text-base font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Study Kit</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
