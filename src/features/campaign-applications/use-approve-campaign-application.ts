"use client";

import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { campaignApplicationsQueryKey } from "./use-get-campaign-applications";

export interface ApproveCampaignApplicationResponse {
  success?: boolean;
  message?: string;
  application?: {
    id?: string;
    status?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

async function approveCampaignApplication(
  applicationId: string,
): Promise<ApproveCampaignApplicationResponse> {
  const { data } = await apiClient.patch<ApproveCampaignApplicationResponse>(
    `/admin/campaign-applications/${encodeURIComponent(applicationId)}/approve`,
  );

  if (!data?.success) {
    throw new Error(data?.message ?? "Failed to approve campaign application");
  }

  return data;
}

export function useApproveCampaignApplication(
  options?: Omit<
    UseMutationOptions<ApproveCampaignApplicationResponse, Error, string>,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: approveCampaignApplication,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: campaignApplicationsQueryKey });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
