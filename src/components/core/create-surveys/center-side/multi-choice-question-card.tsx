"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MultiChoiceSVG, SmallMultiChoiceSVG } from "../../dashboard/svg";
import { useQuestionStore } from "@/store/qustion-store";
import { useMemo } from "react";

interface MultiChoiceCardProps {
  questionId: string;
  questionNumber?: number;
}

const MultiChoiceQuestionCard = ({
  questionId,
  questionNumber = 1,
}: MultiChoiceCardProps) => {
  const question = useQuestionStore((state) =>
    state.questions.find((q) => q.id === questionId)
  );
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);

  const questionData = useMemo(() => {
    if (!question) {
      return {
        title: "",
        options: [
          { id: 1, text: "" },
          { id: 2, text: "" },
          { id: 3, text: "" },
          { id: 4, text: "" },
        ],
        required: false,
      };
    }
    return {
      title: question.title || "",
      options: question.options || [
        { id: 1, text: "" },
        { id: 2, text: "" },
        { id: 3, text: "" },
        { id: 4, text: "" },
      ],
      required: question.required || false,
    };
  }, [question]);

  const handleTitleChange = (title: string) => {
    updateQuestion(questionId, { title });
  };

  const handleAnswerChange = (id: number, text: string) => {
    const updatedOptions = questionData.options.map((option) =>
      option.id === id ? { ...option, text } : option
    );
    updateQuestion(questionId, { options: updatedOptions });
  };

  return (
    <div className="relative max-w-100 w-full mx-auto mt-5">
      {/* Question Tab */}

      <div className="absolute -top-7 left-4 z-10 flex gap-1 items-end">
        <SmallMultiChoiceSVG />
        <div className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-t-xl text-xs font-medium">
          Question {questionNumber}
        </div>
      </div>
      {/* Required Tab */}
      {questionData.required && (
        <div className="absolute -top-7 right-6 z-10">
          <div className="text-[#8B5CF6] bg-[#2563EB26] border border-b-0 border-[#2563EB4D] px-4 py-1.5 rounded-xl text-xs font-medium">
            Required
          </div>
        </div>
      )}

      {/* Main Card */}
      <Card className="relative border-[#8B5CF6] border rounded-2xl shadow-sm bg-white p-4">
        {/* Question Input */}
        <div onClick={(e) => e.stopPropagation()}>
          <Input
            type="text"
            placeholder="Type your question"
            value={questionData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full h-9 text-xs placeholder:text-xs"
          />
        </div>

        {/* Answer Options Grid */}
        {/* <div className="grid grid-cols-2 gap-4">
          {questionData.options.map((option) => (
            <div
              key={option.id}
              className="flex items-center gap-3 rounded-md hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                id={`option-${questionId}-${option.id}`}
                name={`answer-${questionId}`}
                value={option.id.toString()}
                className="w-4 h-4  text-[#2563EB] border-gray-300 focus:ring-[#2563EB] focus:ring-2"
                readOnly
              />
              <label
                htmlFor={`option-${questionId}-${option.id}`}
                className="flex-1 text-xs cursor-pointer"
              >
                <Input
                  type="text"
                  placeholder={`Option ${option.id}`}
                  value={option.text}
                  onChange={(e) =>
                    handleAnswerChange(option.id, e.target.value)
                  }
                  className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                />
              </label>
            </div>
          ))}
        </div> */}
      </Card>
    </div>
  );
};

export default MultiChoiceQuestionCard;
