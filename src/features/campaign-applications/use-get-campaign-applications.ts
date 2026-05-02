"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface CampaignApplicationItem {
  id: string;
  campaignName?: string;
  influencerName?: string;
  status?: string;
  appliedAt?: string;
  [key: string]: unknown;
}

export interface CampaignApplicationsApiResponse {
  success?: boolean;
  message?: string;
  applications?: CampaignApplicationItem[];
  data?: CampaignApplicationItem[];
}

export const campaignApplicationsQueryKey = [
  "campaign-applications",
  "admin",
] as const;

async function fetchCampaignApplications(): Promise<CampaignApplicationItem[]> {
  const { data } = await apiClient.get<
    CampaignApplicationsApiResponse | CampaignApplicationItem[]
  >("/admin/campaign-applications");

  if (Array.isArray(data)) {
    return data;
  }

  if (data?.success === false) {
    throw new Error(data.message ?? "Failed to load campaign applications");
  }

  return data?.applications ?? data?.data ?? [];
}

export function useGetCampaignApplications(
  options?: Omit<
    UseQueryOptions<CampaignApplicationItem[], Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...options,
    queryKey: campaignApplicationsQueryKey,
    queryFn: fetchCampaignApplications,
  });
}
