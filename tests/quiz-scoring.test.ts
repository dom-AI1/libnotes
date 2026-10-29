import { describe, it, expect } from 'vitest';
import { calculateQuizScore } from '../src/utils/quizScoring';
import type { QuizQuestion } from '../src/types';

describe('Checkpoints 10 & 11: Programmatic Quiz Scoring & Weak Topic Detection', () => {
  const sample10Questions: QuizQuestion[] = [
    { id: 1, question: 'Q1', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Exp1', topic: 'Thermodynamics Laws' },
    { id: 2, question: 'Q2', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Exp2', topic: 'Thermodynamics Laws' },
    { id: 3, question: 'Q3', options: ['A', 'B', 'C', 'D'], correctIndex: 2, explanation: 'Exp3', topic: 'Carnot Engine' },
    { id: 4, question: 'Q4', options: ['A', 'B', 'C', 'D'], correctIndex: 3, explanation: 'Exp4', topic: 'Carnot Engine' },
    { id: 5, question: 'Q5', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Exp5', topic: 'Isothermal Expansion' },
    { id: 6, question: 'Q6', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Exp6', topic: 'Isothermal Expansion' },
    { id: 7, question: 'Q7', options: ['A', 'B', 'C', 'D'], correctIndex: 2, explanation: 'Exp7', topic: 'Adiabatic Process' },
    { id: 8, question: 'Q8', options: ['A', 'B', 'C', 'D'], correctIndex: 3, explanation: 'Exp8', topic: 'Adiabatic Process' },
    { id: 9, question: 'Q9', options: ['A', 'B', 'C', 'D'], correctIndex: 0, explanation: 'Exp9', topic: 'State Functions' },
    { id: 10, question: 'Q10', options: ['A', 'B', 'C', 'D'], correctIndex: 1, explanation: 'Exp10', topic: 'State Functions' },
  ];

  it('correctly calculates 8 out of 10 score as 8/10 and 80%', () => {
    // 8 correct, 2 incorrect (Q3 and Q4 wrong: user picked wrong index)
    const userAnswers: Record<number, number> = {
      0: 0, // Q1 correct
      1: 1, // Q2 correct
      2: 0, // Q3 incorrect (expected 2, picked 0)
      3: 0, // Q4 incorrect (expected 3, picked 0)
      4: 0, // Q5 correct
      5: 1, // Q6 correct
      6: 2, // Q7 correct
      7: 3, // Q8 correct
      8: 0, // Q9 correct
      9: 1, // Q10 correct
    };

    const result = calculateQuizScore(sample10Questions, userAnswers);

    expect(result.score).toBe(8);
    expect(result.total).toBe(10);
    expect(result.percentage).toBe(80);
    expect(result.isPassed).toBe(true);

    // Weak topic must precisely identify "Carnot Engine"
    expect(result.weakTopics).toEqual(['Carnot Engine']);
    expect(result.weakTopics).not.toContain('Thermodynamics Laws');
    expect(result.weakTopics).not.toContain('Adiabatic Process');
  });

  it('reports zero weak topics when all answers are correct without fabricating any', () => {
    const perfectAnswers: Record<number, number> = {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 0, 5: 1, 6: 2, 7: 3, 8: 0, 9: 1,
    };

    const result = calculateQuizScore(sample10Questions, perfectAnswers);
    expect(result.score).toBe(10);
    expect(result.percentage).toBe(100);
    expect(result.weakTopics.length).toBe(0);
  });

  it('identifies multiple distinct weak topics when questions across different areas are missed', () => {
    const mixedAnswers: Record<number, number> = {
      0: 3, // Q1 wrong -> Thermodynamics Laws
      2: 0, // Q3 wrong -> Carnot Engine
      6: 0, // Q7 wrong -> Adiabatic Process
      8: 0, // Q9 correct
    };

    const result = calculateQuizScore(sample10Questions, mixedAnswers);
    expect(result.weakTopics).toContain('Thermodynamics Laws');
    expect(result.weakTopics).toContain('Carnot Engine');
    expect(result.weakTopics).toContain('Adiabatic Process');
    expect(result.weakTopics).not.toContain('State Functions');
  });
});
