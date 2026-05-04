"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { CampaignResultImage, ReviewedResponseObject } from "@/features/campaigns/types";

type ResultReviewDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: CampaignResultImage | null;
  isSubmitting?: boolean;
  onSubmit: (input: {
    reviewStatus: "approved" | "rejected" | "pending";
    reviewedResponseObject: ReviewedResponseObject;
    reviewNotes?: string;
  }) => Promise<void> | void;
};

export default function ResultReviewDrawer({
  open,
  onOpenChange,
  image,
  isSubmitting = false,
  onSubmit,
}: ResultReviewDrawerProps) {
  const [reviewStatus, setReviewStatus] = useState<"approved" | "rejected" | "pending">("approved");
  const [questionType, setQuestionType] = useState<"multi_choice" | "rating_scale" | "yes_no">(
    "multi_choice",
  );
  const [reviewNotesInput, setReviewNotesInput] = useState("");
  const [optionsInput, setOptionsInput] = useState<
    Array<{ optionText: string; votes: string }>
  >([{ optionText: "", votes: "" }]);
  const [votesByRatingInput, setVotesByRatingInput] = useState<Record<string, string>>({
    "1": "0",
    "2": "0",
    "3": "0",
    "4": "0",
    "5": "0",
  });
  const [yesVotesInput, setYesVotesInput] = useState("0");
  const [noVotesInput, setNoVotesInput] = useState("0");

  useEffect(() => {
    if (!image || !open) return;

    setReviewStatus(
      image.reviewStatus === "approved" ||
        image.reviewStatus === "rejected" ||
        image.reviewStatus === "pending"
        ? image.reviewStatus
        : "approved",
    );
    setReviewNotesInput(image.reviewNotes ?? "");

    const existing = image.reviewedResponseObject;
    if (!existing || typeof existing !== "object") {
      setQuestionType("multi_choice");
      setOptionsInput([{ optionText: "", votes: "" }]);
      setVotesByRatingInput({ "1": "0", "2": "0", "3": "0", "4": "0", "5": "0" });
      setYesVotesInput("0");
      setNoVotesInput("0");
      return;
    }

    const payload = existing as Record<string, unknown>;
    const existingQuestionType = String(payload.questionType ?? "multi_choice").toLowerCase();

    if (existingQuestionType === "rating_scale") {
      setQuestionType("rating_scale");
      const votesMap = (payload.votesByRating ?? {}) as Record<string, number>;
      const nextVotes: Record<string, string> = { "1": "0", "2": "0", "3": "0", "4": "0", "5": "0" };
      Object.entries(votesMap).forEach(([key, value]) => {
        nextVotes[key] = String(Number(value ?? 0));
      });
      setVotesByRatingInput(nextVotes);
      return;
    }

    if (existingQuestionType === "yes_no") {
      setQuestionType("yes_no");
      const yesNoVotes = payload.votesByYesOrNo as
        | { yesVotes?: number; noVotes?: number }
        | undefined;
      setYesVotesInput(String(Number(yesNoVotes?.yesVotes ?? payload.yesVotes ?? 0)));
      setNoVotesInput(String(Number(yesNoVotes?.noVotes ?? payload.noVotes ?? 0)));
      return;
    }

    setQuestionType("multi_choice");
    const existingOptions = Array.isArray(payload.options) ? payload.options : [];
    setOptionsInput(
      existingOptions.length > 0
        ? existingOptions.map((option) => {
            const normalized = option as {
              optionText?: string;
              votes?: number;
            };
            return {
              optionText: normalized.optionText ?? "",
              votes: String(Number(normalized.votes ?? 0)),
            };
          })
        : [{ optionText: "", votes: "" }],
    );
  }, [image, open]);

  const handleAddOptionRow = () => {
    setOptionsInput((prev) => [...prev, { optionText: "", votes: "" }]);
  };

  const handleUpdateOptionRow = (
    index: number,
    key: "optionText" | "votes",
    value: string,
  ) => {
    setOptionsInput((prev) =>
      prev.map((option, optionIndex) =>
        optionIndex === index ? { ...option, [key]: value } : option,
      ),
    );
  };

  const buildReviewedResponseObject = (): ReviewedResponseObject => {
    if (questionType === "yes_no") {
      return {
        questionType: "yes_no",
        votesByYesOrNo: {
          yesVotes: Number(yesVotesInput || 0),
          noVotes: Number(noVotesInput || 0),
        },
      } as ReviewedResponseObject;
    }

    if (questionType === "rating_scale") {
      const votesByRating: Record<string, number> = {};
      Object.entries(votesByRatingInput).forEach(([rating, votes]) => {
        votesByRating[rating] = Number(votes || 0);
      });
      return {
        questionType: "rating_scale",
        votesByRating,
      } as ReviewedResponseObject;
    }

    return {
      questionType: "multi_choice",
      options: optionsInput
        .filter((option) => option.optionText.trim().length > 0)
        .map((option, index) => ({
          optionText: option.optionText.trim() || `Option ${index + 1}`,
          votes: Number(option.votes || 0),
        })),
    } as ReviewedResponseObject;
  };

  const handleSubmit = async () => {
    await onSubmit({
      reviewStatus,
      reviewedResponseObject: buildReviewedResponseObject(),
      reviewNotes: reviewNotesInput.trim() || undefined,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add result from screenshot</SheetTitle>
          <SheetDescription>
            Provide review status, question type, and vote breakdown for the selected screenshot.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Review status</label>
            <Select
              value={reviewStatus}
              onValueChange={(value) =>
                setReviewStatus(value as "approved" | "rejected" | "pending")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">approved</SelectItem>
                <SelectItem value="rejected">rejected</SelectItem>
                <SelectItem value="pending">pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Question type</label>
            <Select
              value={questionType}
              onValueChange={(value) =>
                setQuestionType(value as "multi_choice" | "rating_scale" | "yes_no")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multi_choice">multi_choice</SelectItem>
                <SelectItem value="rating_scale">rating_scale</SelectItem>
                <SelectItem value="yes_no">yes_no</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {questionType === "multi_choice" && (
            <div className="space-y-3 rounded-md border border-[#E2E8F0] p-3">
              <p className="text-sm font-medium text-foreground">Options</p>
              {optionsInput.map((option, index) => (
                <div key={`option-row-${index}`} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Input
                    placeholder="optionText"
                    value={option.optionText}
                    onChange={(e) => handleUpdateOptionRow(index, "optionText", e.target.value)}
                  />
                  <Input
                    type="number"
                    min={0}
                    placeholder="votes"
                    value={option.votes}
                    onChange={(e) => handleUpdateOptionRow(index, "votes", e.target.value)}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={handleAddOptionRow}>
                Add option
              </Button>
            </div>
          )}

          {questionType === "rating_scale" && (
            <div className="space-y-3 rounded-md border border-[#E2E8F0] p-3">
              <p className="text-sm font-medium text-foreground">Votes by rating</p>
              {["1", "2", "3", "4", "5"].map((rating) => {
                const key = String(rating);
                return (
                  <div key={`rating-${key}`} className="grid grid-cols-[1fr_2fr] items-center gap-2">
                    <p className="text-xs text-muted-foreground">Rating {key}</p>
                    <Input
                      type="number"
                      min={0}
                      value={votesByRatingInput[key] ?? "0"}
                      onChange={(e) =>
                        setVotesByRatingInput((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}

          {questionType === "yes_no" && (
            <div className="space-y-3 rounded-md border border-[#E2E8F0] p-3">
              <p className="text-sm font-medium text-foreground">Votes by yes/no</p>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  min={0}
                  placeholder="yesVotes"
                  value={yesVotesInput}
                  onChange={(e) => setYesVotesInput(e.target.value)}
                />
                <Input
                  type="number"
                  min={0}
                  placeholder="noVotes"
                  value={noVotesInput}
                  onChange={(e) => setNoVotesInput(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Review notes</label>
            <Textarea
              value={reviewNotesInput}
              onChange={(e) => setReviewNotesInput(e.target.value)}
              placeholder="Optional notes"
            />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={() => void handleSubmit()} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save result"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
