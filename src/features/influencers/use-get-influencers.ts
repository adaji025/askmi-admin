"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface AdminInfluencer {
  id: string;
  fullName?: string;
  email?: string;
  isApproved?: boolean;
  totalCampaign?: number;
  averageVote?: number;
  performanceScore?: number;
  deviationTrend?: string | number;
  ocrAccuracy?: number;
  [key: string]: unknown;
}

interface TopPerformer {
  id: string;
  fullName: string;
  email: string;
  totalSurveys: number;
}

interface InfluencerStatistics {
  totalInfluencers: number;
  pendingApprovals: number;
  flaggedRisk: number;
  topPerformer: TopPerformer | null;
}

export interface AdminInfluencersApiResponse {
  success?: boolean;
  statistics?: InfluencerStatistics;
  influencers?: AdminInfluencer[];
}

export const adminInfluencersQueryKey = ["admin", "influencers"] as const;

async function fetchAdminInfluencers(): Promise<AdminInfluencersApiResponse> {
  const { data } = await apiClient.get<
    AdminInfluencersApiResponse | AdminInfluencer[]
  >("/admin/influencers");

  if (Array.isArray(data)) {
    return {
      success: true,
      statistics: {
        totalInfluencers: data.length,
        pendingApprovals: data.filter((item) => item.isApproved === false).length,
        flaggedRisk: 0,
        topPerformer: null,
      },
      influencers: data,
    };
  }

  if (!data?.success) {
    throw new Error("Failed to load influencers");
  }

  return {
    success: true,
    statistics: {
      totalInfluencers: data.statistics?.totalInfluencers ?? data.influencers?.length ?? 0,
      pendingApprovals: data.statistics?.pendingApprovals ?? 0,
      flaggedRisk: data.statistics?.flaggedRisk ?? 0,
      topPerformer: data.statistics?.topPerformer ?? null,
    },
    influencers: data.influencers ?? [],
  };
}

export function useGetInfluencers(
  options?: Omit<
    UseQueryOptions<AdminInfluencersApiResponse, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminInfluencersQueryKey,
    queryFn: fetchAdminInfluencers,
    ...options,
  });
}
