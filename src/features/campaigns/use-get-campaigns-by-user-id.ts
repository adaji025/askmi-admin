"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type { CampaignsByUserApiResponse, UserCampaign } from "./types";

export const campaignsByUserQueryKey = (userId: string) =>
  ["campaign", "user", userId] as const;

async function fetchCampaignsByUserId(userId: string): Promise<UserCampaign[]> {
  const { data } = await apiClient.get<
    CampaignsByUserApiResponse | UserCampaign[]
  >(`/campaign/user/${encodeURIComponent(userId)}`);

  if (Array.isArray(data)) {
    return data;
  }

  if (!data?.success) {
    throw new Error("Failed to load campaigns");
  }

  return data.campaigns ?? [];
}

export function useGetCampaignsByUserId(
  userId: string | undefined,
  options?: Omit<
    UseQueryOptions<UserCampaign[], Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...options,
    queryKey: userId
      ? campaignsByUserQueryKey(userId)
      : ["campaign", "user", "__none"],
    queryFn: () => fetchCampaignsByUserId(userId!),
    enabled: Boolean(userId) && (options?.enabled ?? true),
  });
}
