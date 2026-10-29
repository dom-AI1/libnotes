import { useState } from 'react';
import type { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RotateCcw, AlertTriangle, ArrowRight, Award, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateQuizScore } from '../utils/quizScoring';
import { saveQuizAttempt } from '../services/storageService';

interface QuizComponentProps {
  questions: QuizQuestion[];
  kitId?: string;
  kitTitle?: string;
  onReviewTopic?: (topic: string) => void;
}

export const QuizComponent = ({ questions, kitId, kitTitle, onReviewTopic }: QuizComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<Record<number, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-8 text-center shadow-[3px_3px_0px_#141414]">
        <p className="text-sm font-mono text-[#5E5D57]">No quiz questions available for this chapter yet.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const hasSelected = selectedOptions[currentIndex] !== undefined;
  const isCurrentSubmitted = !!isSubmitted[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isCurrentSubmitted) return;
    setSelectedOptions((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleCheckAnswer = () => {
    setIsSubmitted((prev) => ({ ...prev, [currentIndex]: true }));
  };

  // Programmatic scoring computation
  const summary = calculateQuizScore(questions, selectedOptions);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);

      // Persist attempt to storage once
      if (!hasRecordedResult && kitId && kitTitle) {
        saveQuizAttempt({
          id: `attempt-${Date.now()}`,
          kitId,
          kitTitle,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          score: summary.score,
          total: summary.total,
          percentage: summary.percentage,
          weakTopics: summary.weakTopics,
        });
        setHasRecordedResult(true);
      }

      // Trigger celebration if passed
      if (summary.percentage >= 60) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#79A94A', '#141414', '#E8F2DC'],
          });
        } catch {
          // ignore in headless
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptions({});
    setIsSubmitted({});
    setShowSummary(false);
    setHasRecordedResult(false);
  };

  return (
    <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414]">
      {!showSummary ? (
        <div>
          {/* Top Progress & Topic Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#DFDBCF]">
            <div className="flex items-center gap-2">
              <span className="font-mono-editorial text-sm font-bold text-[#141414]">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-xs font-mono text-[#79A94A] bg-[#E8F2DC] px-2 py-0.5 rounded border border-[#79A94A]/30">
                {currentQ.topic}
              </span>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full border border-[#141414] transition-all ${
                    idx === currentIndex
                      ? 'bg-[#79A94A] ring-2 ring-[#79A94A]/40'
                      : isSubmitted[idx]
                      ? selectedOptions[idx] === questions[idx].correctIndex
                        ? 'bg-[#79A94A]'
                        : 'bg-[#E05B49]'
                      : 'bg-[#FFFFFF]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h3 className="font-mono-editorial text-lg sm:text-xl font-bold text-[#141414] mb-6 leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOptions[currentIndex] === optIdx;
              const isCorrect = currentQ.correctIndex === optIdx;

              let optionStyle = 'border-[#141414]/30 bg-[#FFFFFF] hover:border-[#141414]';
              if (isCurrentSubmitted) {
                if (isCorrect) {
                  optionStyle = 'border-[#79A94A] bg-[#E8F2DC] text-[#141414] font-semibold';
                } else if (isSelected) {
                  optionStyle = 'border-[#E05B49] bg-[#FDEDE8] text-[#141414] line-through';
                } else {
                  optionStyle = 'border-[#DFDBCF] opacity-50 bg-[#FAF9F5]';
                }
              } else if (isSelected) {
                optionStyle = 'border-[#141414] bg-[#EFECE1] shadow-[2px_2px_0px_#141414] font-semibold';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isCurrentSubmitted}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between text-sm font-body ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md border border-[#141414] flex items-center justify-center font-mono text-xs font-bold bg-[#FAF9F5]">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isCurrentSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#79A94A]" />
                  )}
                  {isCurrentSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-[#E05B49]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (when checked) */}
          {isCurrentSubmitted && (
            <div className="mb-6 p-4 rounded-xl border-2 border-[#141414] bg-[#F1F7EA] animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs font-bold text-[#141414]">
                <Sparkles className="w-4 h-4 text-[#79A94A]" />
                CONCEPT EXPLANATION & EXAM INSIGHT
              </div>
              <p className="text-xs sm:text-sm font-body text-[#333333] leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#DFDBCF]">
            <span className="text-xs font-mono text-[#8A8880]">
              {isCurrentSubmitted ? 'Concept checked' : 'Choose an answer to verify'}
            </span>

            {!isCurrentSubmitted ? (
              <button
                type="button"
                disabled={!hasSelected}
                onClick={handleCheckAnswer}
                className={`btn-primary-green px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                  !hasSelected ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <span>Check Answer</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary-green px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Diagnostic Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Summary & Weak Spots Diagnostic */
        <div className="space-y-6">
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E8F2DC] border-2 border-[#141414] shadow-[3px_3px_0px_#141414] flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#79A94A]" />
            </div>
            <h3 className="font-mono-editorial text-3xl font-bold text-[#141414]">
              {summary.percentage >= 80 ? 'Exam Ready! Outstanding.' : summary.percentage >= 50 ? 'Good Effort! Targeted Revision Advised.' : 'Needs Targeted Revision'}
            </h3>
            <p className="text-sm font-mono text-[#5E5D57] mt-1">
              You scored {summary.score} out of {summary.total} ({summary.percentage}%)
            </p>
          </div>

          {/* Diagnostic Weak Spots Panel */}
          <div className="bg-[#FAF9F5] border-2 border-[#141414] rounded-xl p-5 shadow-[2px_2px_0px_#141414]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-editorial text-sm font-bold text-[#141414] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#79A94A]" />
                Diagnostic Topic Breakdown
              </span>
              <span className="text-[11px] font-mono text-[#5E5D57]">
                {summary.weakTopics.length === 0 ? 'Zero weak spots detected!' : `${summary.weakTopics.length} weak topics identified`}
              </span>
            </div>

            {summary.weakTopics.length > 0 ? (
              <div className="space-y-2 mt-3">
                <p className="text-xs text-[#5E5D57] font-body mb-2">
                  Based on your responses, we recommend reviewing these specific lecture topics before your test:
                </p>
                {summary.weakTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-[#141414] bg-[#FFFFFF] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-[#141414]">
                      <span className="w-2 h-2 rounded-full bg-[#E05B49]" />
                      <span>{topic}</span>
                    </div>
                    {onReviewTopic && (
                      <button
                        onClick={() => onReviewTopic(topic)}
                        className="text-xs font-mono font-semibold text-[#79A94A] hover:underline flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Re-read Topic Notes
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-[#E8F2DC] border border-[#79A94A] text-xs font-mono text-[#141414]">
                🎉 Flawless conceptual mastery! You correctly answered every question in this set.
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#DFDBCF]">
            <button
              onClick={handleRestart}
              className="btn-secondary-outline px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            {summary.weakTopics.length > 0 && onReviewTopic && (
              <button
                onClick={() => onReviewTopic(summary.weakTopics[0])}
                className="btn-primary-green px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <BookOpen className="w-4 h-4" />
                <span>Practise Weak Topics</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
