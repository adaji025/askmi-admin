"use client";

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { adminInfluencerQueryKey } from "./use-get-influencer";
import {
  adminInfluencersQueryKey,
  type InstagramDemographics,
  type InstagramDemographicSlice,
  type InstagramPrimaryLocationSlice,
} from "./use-get-influencers";

export interface InstagramDemographicsPayload {
  ageRange?: InstagramDemographicSlice[];
  language?: InstagramDemographicSlice[];
  gender?: InstagramDemographicSlice[];
  primaryLocation?: InstagramPrimaryLocationSlice[];
}

export interface UpdateInfluencerInstagramDemographicsInput {
  influencerId: string;
  instagramDemographics: InstagramDemographicsPayload;
}

export interface UpdateInfluencerInstagramDemographicsResponse {
  success?: boolean;
  message?: string;
  influencer?: {
    id?: string;
    instagramDemographics?: InstagramDemographics;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

async function updateInfluencerInstagramDemographics(
  input: UpdateInfluencerInstagramDemographicsInput,
): Promise<UpdateInfluencerInstagramDemographicsResponse> {
  const { influencerId, instagramDemographics } = input;
  const { data } = await apiClient.put<UpdateInfluencerInstagramDemographicsResponse>(
    `/user/admin/influencers/${encodeURIComponent(influencerId)}/instagram-demographics`,
    instagramDemographics,
  );

  if (data?.success === false) {
    throw new Error(data?.message ?? "Failed to update Instagram demographics");
  }

  return data;
}

export function useUpdateInfluencerInstagramDemographics(
  options?: Omit<
    UseMutationOptions<
      UpdateInfluencerInstagramDemographicsResponse,
      Error,
      UpdateInfluencerInstagramDemographicsInput
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: updateInfluencerInstagramDemographics,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: adminInfluencersQueryKey });
      await queryClient.invalidateQueries({
        queryKey: adminInfluencerQueryKey(variables.influencerId),
      });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
