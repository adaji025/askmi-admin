import React from "react";
import {
  LongTextSVG,
  MultiChoiceSVG,
  RatingQSVG,
  ShortTextSVG,
  YesNoSVG,
} from "../../dashboard/svg";
import QuestionCard from "./question-card";

interface QuestionType {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "choice" | "rating" | "text";
}
const questionTypes: QuestionType[] = [
  {
    id: "multiple-choice",
    title: "Multiple Choice",
    subtitle: "Single selection",
    icon: MultiChoiceSVG,
    category: "choice",
  },
  {
    id: "yes-no",
    title: "Yes or No",
    subtitle: "Binary choice",
    icon: YesNoSVG,
    category: "choice",
  },
  {
    id: "rating-scale",
    title: "Rating Scale",
    subtitle: "1-10",
    icon: RatingQSVG,
    category: "rating",
  },
  {
    id: "short-text",
    title: "Short Text",
    subtitle: "Single line response",
    icon: ShortTextSVG,
    category: "text",
  },
  {
    id: "long-text",
    title: "Long Text",
    subtitle: "Single line response",
    icon: LongTextSVG,
    category: "text",
  },
];
const SideNav = () => {
  const choiceQuestions = questionTypes.filter((q) => q.category === "choice");
  const ratingQuestions = questionTypes.filter((q) => q.category === "rating");
  const textQuestions = questionTypes.filter((q) => q.category === "text");
  return (
    <div className="w-80 bg-white border-r border-[#E2E8F0] p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Choice Questions */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
            Choice Questions
          </h3>
          <div className="space-y-3">
            {choiceQuestions.map((question) => {
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>

        {/* Ratings Questions */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
            Ratings Questions
          </h3>
          <div className="space-y-3">
            {ratingQuestions.map((question) => {
              const Icon = question.icon;
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>

        {/* Text Questions */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">
            Text Questions
          </h3>
          <div className="space-y-3">
            {textQuestions.map((question) => {
              const Icon = question.icon;
              return <QuestionCard key={question.id} question={question} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
