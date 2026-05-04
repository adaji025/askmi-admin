"use client";

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { adminCampaignQueryKey } from "./use-get-campaign";
import type { ReviewedResponseObject } from "./types";

export interface ReviewCampaignResultImageInput {
  imageId: string;
  campaignId?: string;
  reviewStatus: "approved" | "rejected" | "pending";
  reviewedResponseObject?: ReviewedResponseObject;
  reviewNotes?: string;
}

export interface ReviewCampaignResultImageResponse {
  success?: boolean;
  message?: string;
  resultImage?: {
    id?: string;
    reviewStatus?: string;
    reviewedResponseObject?: ReviewedResponseObject;
    reviewNotes?: string | null;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

type ReviewCampaignResultImagePayload = Omit<
  ReviewCampaignResultImageInput,
  "imageId" | "campaignId"
>;

async function reviewCampaignResultImage(
  input: ReviewCampaignResultImageInput,
): Promise<ReviewCampaignResultImageResponse> {
  const { imageId, campaignId: _campaignId, ...payload } = input;
  const { data } = await apiClient.patch<ReviewCampaignResultImageResponse>(
    `/admin/campaign-result-images/${encodeURIComponent(imageId)}/review`,
    payload as ReviewCampaignResultImagePayload,
  );

  if (!data?.success) {
    throw new Error(data?.message ?? "Failed to review campaign result image");
  }

  return data;
}

export function useReviewCampaignResultImage(
  options?: Omit<
    UseMutationOptions<
      ReviewCampaignResultImageResponse,
      Error,
      ReviewCampaignResultImageInput
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: reviewCampaignResultImage,
    onSuccess: async (data, variables, onMutateResult, context) => {
      if (variables.campaignId) {
        await queryClient.invalidateQueries({
          queryKey: adminCampaignQueryKey(variables.campaignId),
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["campaign", "admin"],
        });
      }

      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
