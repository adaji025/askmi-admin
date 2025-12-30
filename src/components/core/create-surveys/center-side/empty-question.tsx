"use client";

import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";

const EmptyQuestions = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "empty-questions-drop-zone",
  });

  return (
    <div className="text-center mt-12 mb-8">
      <p className="text-base text-muted-foreground mb-5">
        Add or drag your first survey question here.
      </p>
      <div
        ref={setNodeRef}
        className={`border-2 border-dashed rounded-lg p-4 bg-white max-w-71.5 mx-auto transition-all duration-200 ${
          isOver
            ? "border-[#2563EB] bg-blue-50/50 ring-2 ring-blue-300 ring-offset-2 scale-105"
            : "border-[#E2E8F0]"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
          <p className="text-sm font-medium text-foreground">Drag here</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyQuestions;
