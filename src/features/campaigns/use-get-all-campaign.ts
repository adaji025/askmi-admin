"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type { AllCampaignsApiResponse, UserCampaign } from "./types";

export const allCampaignsQueryKey = ["campaign", "all"] as const;

async function fetchAllCampaigns(): Promise<AllCampaignsApiResponse> {
  const { data } = await apiClient.get<AllCampaignsApiResponse | UserCampaign[]>(
    "/admin/campaigns",
  );

  if (Array.isArray(data)) {
    return {
      success: true,
      campaigns: data,
      count: data.length,
      statistics: {},
    };
  }

  if (!data?.success) {
    throw new Error("Failed to load campaigns");
  }

  return {
    success: true,
    message: data.message,
    campaigns: data.campaigns ?? [],
    count: data.count ?? data.campaigns?.length ?? 0,
    statistics: data.statistics ?? {},
  };
}

export function useGetAllCampaign(
  options?: Omit<
    UseQueryOptions<AllCampaignsApiResponse, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...options,
    queryKey: allCampaignsQueryKey,
    queryFn: fetchAllCampaigns,
  });
}
