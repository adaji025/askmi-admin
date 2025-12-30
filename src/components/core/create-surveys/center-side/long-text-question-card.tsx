"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LongTextSVG } from "../../dashboard/svg";
import { useQuestionStore } from "@/store/qustion-store";
import { useMemo } from "react";

interface LongTextQuestionCardProps {
  questionId: string;
  questionNumber?: number;
}

const LongTextQuestionCard = ({ questionId, questionNumber = 5 }: LongTextQuestionCardProps) => {
  const question = useQuestionStore((state) =>
    state.questions.find((q) => q.id === questionId)
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);

  const questionData = useMemo(() => {
    if (!question) {
      return { title: "", required: false };
    }
    return {
      title: question.title || "",
      required: question.required || false,
    };
  }, [question]);

  const handleTitleChange = (title: string) => {
    updateQuestion(questionId, { title });
  };

  return (
    <div className="relative max-w-100 w-full mx-auto mt-5">
      {/* Question Type Indicator and Tab */}
      <div className="absolute -top-7 left-4 z-10 flex gap-1 items-end">
        {/* Blue Tab with Thumbs Up Icon */}
        <div className="bg-[#2563EB]/20 text-white px-3 h-6 rounded-t-xl flex items-center justify-center">
          <LongTextSVG />
        </div>
        {/* Purple Tab with Question Number */}
        <div className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-t-xl text-xs font-medium">
          Question {questionNumber}
        </div>
      </div>

      {/* Main Card */}
      <Card className="relative border-[#8B5CF6] border rounded-2xl shadow-sm bg-white p-4">
        {/* Question Input */}
        <div className="">
          <Input
            type="text"
            placeholder="Type your question"
            value={questionData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full h-9 text-base"
          />
        </div>
      </Card>
    </div>
  );
};

export default LongTextQuestionCard;
