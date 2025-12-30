import { create } from "zustand";

export interface QuestionOption {
  id: number;
  text: string;
}

export interface Question {
  id: string;
  type: "multiple-choice" | "yes-no" | "rating-scale" | "short-text" | "long-text";
  title: string;
  required: boolean;
  options?: QuestionOption[];
  order: number;
}

interface QuestionStore {
  questions: Question[];
  addQuestion: (question: Omit<Question, "id" | "order">) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  reorderQuestions: (questions: Question[]) => void;
  getQuestion: (id: string) => Question | undefined;
  clearQuestions: () => void;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questions: [],

  addQuestion: (question) => {
    const currentQuestions = get().questions;
    const newOrder = currentQuestions.length > 0 
      ? Math.max(...currentQuestions.map(q => q.order)) + 1 
      : 1;
    
    const newQuestion: Question = {
      ...question,
      id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      order: newOrder,
    };

    set((state) => ({
      questions: [...state.questions, newQuestion],
    }));
  },

  updateQuestion: (id, updates) => {
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === id ? { ...question, ...updates } : question
      ),
    }));
  },

  deleteQuestion: (id) => {
    set((state) => ({
      questions: state.questions
        .filter((question) => question.id !== id)
        .map((question, index) => ({ ...question, order: index + 1 })),
    }));
  },

  reorderQuestions: (questions) => {
    set({ questions });
  },

  getQuestion: (id) => {
    return get().questions.find((question) => question.id === id);
  },

  clearQuestions: () => {
    set({ questions: [] });
  },
}));

