"use client";

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { adminCampaignQueryKey } from "./use-get-campaign";
import { allCampaignsQueryKey } from "./use-get-all-campaign";

export interface ExtendCampaignEndDateInput {
  id: string;
  endDate: string;
}

export interface ExtendCampaignEndDateResponse {
  success?: boolean;
  message?: string;
  campaign?: {
    id?: string;
    endDate?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

async function extendCampaignEndDate(
  input: ExtendCampaignEndDateInput,
): Promise<ExtendCampaignEndDateResponse> {
  const { data } = await apiClient.patch<ExtendCampaignEndDateResponse>(
    `/admin/campaigns/${encodeURIComponent(input.id)}/extend-end-date`,
    { endDate: input.endDate },
  );

  if (!data?.success) {
    throw new Error(data?.message ?? "Failed to extend campaign end date");
  }

  return data;
}

export function useExtendCampaignEndDate(
  options?: Omit<
    UseMutationOptions<ExtendCampaignEndDateResponse, Error, ExtendCampaignEndDateInput>,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: extendCampaignEndDate,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: adminCampaignQueryKey(variables.id),
        }),
        queryClient.invalidateQueries({
          queryKey: allCampaignsQueryKey,
        }),
      ]);

      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
