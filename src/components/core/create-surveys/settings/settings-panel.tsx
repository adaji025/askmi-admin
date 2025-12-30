"use client";

import { useQuestionStore } from "@/store/qustion-store";
import EmptySettings from "./empty-settings";
import FilledSettings from "./filled-settings";

export function SettingsPanel() {
  const questions = useQuestionStore((state) => state.questions);
  const multipleChoiceQuestions = questions.filter(
    (q) => q.type === "multiple-choice"
  );

  // Show FilledSettings if there are multiple-choice questions
  if (multipleChoiceQuestions.length > 0) {
    return <FilledSettings />;
  }

  // Show EmptySettings otherwise
  return <EmptySettings />;
}