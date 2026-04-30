"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type { CampaignDetailApiResponse, UserCampaign } from "./types";

export const adminCampaignQueryKey = (id: string) =>
  ["campaign", "admin", id] as const;

async function fetchAdminCampaign(id: string): Promise<UserCampaign> {
  const { data } = await apiClient.get<
    CampaignDetailApiResponse | UserCampaign
  >(
    `/admin/campaigns/${encodeURIComponent(id)}`,
  );

  if (data && !Array.isArray(data) && "id" in data) {
    return data as UserCampaign;
  }

  const responseData = data as CampaignDetailApiResponse;
  if (!responseData?.success || !responseData.campaign) {
    throw new Error("Failed to load campaign");
  }

  return responseData.campaign;
}

export function useGetCampaign(
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<UserCampaign, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...options,
    queryKey: id ? adminCampaignQueryKey(id) : ["campaign", "admin", "__none"],
    queryFn: () => fetchAdminCampaign(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}
