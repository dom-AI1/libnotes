import type { QuizQuestion } from '../types';

export interface QuizResultSummary {
  score: number;
  total: number;
  percentage: number;
  isPassed: boolean;
  weakTopics: string[];
  breakdown: {
    questionId: number;
    topic: string;
    isCorrect: boolean;
    selectedOptionIndex?: number;
    correctOptionIndex: number;
  }[];
}

export function calculateQuizScore(
  questions: QuizQuestion[],
  userAnswers: Record<number, number>
): QuizResultSummary {
  if (!questions || questions.length === 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      isPassed: false,
      weakTopics: [],
      breakdown: [],
    };
  }

  let correctCount = 0;
  const missedTopics: string[] = [];

  const breakdown = questions.map((q, idx) => {
    const selected = userAnswers[idx];
    const isCorrect = selected === q.correctIndex;

    if (isCorrect) {
      correctCount++;
    } else if (selected !== undefined) {
      // User attempted and was incorrect
      if (q.topic) {
        missedTopics.push(q.topic);
      }
    }

    return {
      questionId: q.id,
      topic: q.topic,
      isCorrect,
      selectedOptionIndex: selected,
      correctOptionIndex: q.correctIndex,
    };
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  const isPassed = percentage >= 60;

  // Deduplicate weak topics preserving order of occurrence
  const uniqueWeakTopics = Array.from(new Set(missedTopics));

  return {
    score: correctCount,
    total: questions.length,
    percentage,
    isPassed,
    weakTopics: uniqueWeakTopics,
    breakdown,
  };
}

