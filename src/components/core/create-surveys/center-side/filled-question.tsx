"use client";

import LongTextQuestionCard from "./long-text-question-card";
import MultiChoiceQuestionCard from "./multi-choice-question-card";
import RatingQuestionCard from "./rating-question-card";
import ShortTextQuestionCard from "./short-text-question-card";
import YesNoQuestionCard from "./yes-no-question-card";
import { useQuestionStore } from "@/store/qustion-store";
import { useDroppable } from "@dnd-kit/core";

const FilledQuestion = () => {
  const { questions } = useQuestionStore();
  const { setNodeRef, isOver } = useDroppable({
    id: "questions-bottom-drop-zone",
  });

  const renderQuestion = (question: any) => {
    const props = {
      questionId: question.id,
      questionNumber: question.order,
    };

    switch (question.type) {
      case "multiple-choice":
        return <MultiChoiceQuestionCard key={question.id} {...props} />;
      case "yes-no":
        return <YesNoQuestionCard key={question.id} {...props} />;
      case "rating-scale":
        return <RatingQuestionCard key={question.id} {...props} />;
      case "short-text":
        return <ShortTextQuestionCard key={question.id} {...props} />;
      case "long-text":
        return <LongTextQuestionCard key={question.id} {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-8">
      {questions
        .sort((a, b) => a.order - b.order)
        .map((question) => renderQuestion(question))}
      {/* Bottom drop zone for adding questions when scrolled */}
      <div
        ref={setNodeRef}
        className={`min-h-32 transition-all duration-200 ${
          isOver
            ? "bg-blue-50/50 ring-2 ring-blue-300 ring-offset-2 rounded-lg border-2 border-dashed border-blue-300"
            : "border-2 border-dashed border-transparent"
        }`}
      />
    </div>
  );
};

export default FilledQuestion;
