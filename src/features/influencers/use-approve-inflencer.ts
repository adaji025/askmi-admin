"use client";

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { adminInfluencersQueryKey } from "./use-get-influencers";

export interface ApproveInfluencerResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

async function approveInfluencer(influencerId: string): Promise<ApproveInfluencerResponse> {
  const { data } = await apiClient.post<ApproveInfluencerResponse>(
    `/admin/approve-influencer/${encodeURIComponent(influencerId)}`,
  );

  if (!data?.success) {
    throw new Error(data?.message ?? "Failed to approve influencer");
  }

  return data;
}

export function useApproveInfluencer(
  options?: Omit<
    UseMutationOptions<ApproveInfluencerResponse, Error, string>,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: approveInfluencer,
    onSuccess: async (data, variables, context, mutation) => {
      await queryClient.invalidateQueries({ queryKey: adminInfluencersQueryKey });
      await options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}
