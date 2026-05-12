"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface DashboardUsersStats {
  totalUsers: number;
  brands: number;
  influencers: number;
}

export interface DashboardCampaignsStats {
  activeCampaigns: number;
  pendingCampaigns: number;
  completedCampaigns: number;
}

export interface DashboardVotesStats {
  totalVotes: number;
  totalVoteTarget: number;
  voteDelivery: number;
}

export interface DashboardOCRStats {
  reviewedCount: number;
  approvedCount: number;
  rejectedCount: number;
  ocrAccuracy: number;
}

export interface DashboardStats {
  users: DashboardUsersStats;
  campaigns: DashboardCampaignsStats;
  votes: DashboardVotesStats;
  ocr: DashboardOCRStats;
}

export interface VoteCollectionOverTimeItem {
  month: string;
  monthIndex: number;
  year: number;
  voteCount: number;
}

export interface OCRQueueStats {
  processedToday: number;
  autoVerified: number;
  pendingReview: number;
  flaggedFraud: number;
}

export interface OCRAccuracyTrendItem {
  day: string;
  date: string;
  reviewedCount: number;
  ocrAccuracy: number;
}

export interface DashboardPerformer {
  influencerId: string;
  fullName: string;
  handle: string;
  totalVotes: number;
  deviationPercent: number;
}

export interface DashboardStatsApiResponse {
  success?: boolean;
  message?: string;
  stats?: Partial<DashboardStats>;
  voteCollectionOverTime?: VoteCollectionOverTimeItem[];
  ocrQueue?: Partial<OCRQueueStats>;
  ocrAccuracyTrend?: OCRAccuracyTrendItem[];
  topPerformers?: DashboardPerformer[];
  underPerformingInfluencers?: DashboardPerformer[];
}

export interface DashboardStatsData {
  stats: DashboardStats;
  voteCollectionOverTime: VoteCollectionOverTimeItem[];
  ocrQueue: OCRQueueStats;
  ocrAccuracyTrend: OCRAccuracyTrendItem[];
  topPerformers: DashboardPerformer[];
  underPerformingInfluencers: DashboardPerformer[];
}

export const dashboardStatsQueryKey = ["admin", "dashboard", "stats"] as const;

const defaultDashboardStats: DashboardStats = {
  users: { totalUsers: 0, brands: 0, influencers: 0 },
  campaigns: { activeCampaigns: 0, pendingCampaigns: 0, completedCampaigns: 0 },
  votes: { totalVotes: 0, totalVoteTarget: 0, voteDelivery: 0 },
  ocr: { reviewedCount: 0, approvedCount: 0, rejectedCount: 0, ocrAccuracy: 0 },
};

const defaultOCRQueue: OCRQueueStats = {
  processedToday: 0,
  autoVerified: 0,
  pendingReview: 0,
  flaggedFraud: 0,
};

async function fetchDashboardStats(): Promise<DashboardStatsData> {
  const { data } = await apiClient.get<DashboardStatsApiResponse>(
    "/api/admin/dashboard/stats",
  );

  if (!data?.success) {
    throw new Error(data?.message ?? "Failed to load dashboard statistics");
  }

  return {
    stats: {
      users: {
        totalUsers: data.stats?.users?.totalUsers ?? 0,
        brands: data.stats?.users?.brands ?? 0,
        influencers: data.stats?.users?.influencers ?? 0,
      },
      campaigns: {
        activeCampaigns: data.stats?.campaigns?.activeCampaigns ?? 0,
        pendingCampaigns: data.stats?.campaigns?.pendingCampaigns ?? 0,
        completedCampaigns: data.stats?.campaigns?.completedCampaigns ?? 0,
      },
      votes: {
        totalVotes: data.stats?.votes?.totalVotes ?? 0,
        totalVoteTarget: data.stats?.votes?.totalVoteTarget ?? 0,
        voteDelivery: data.stats?.votes?.voteDelivery ?? 0,
      },
      ocr: {
        reviewedCount: data.stats?.ocr?.reviewedCount ?? 0,
        approvedCount: data.stats?.ocr?.approvedCount ?? 0,
        rejectedCount: data.stats?.ocr?.rejectedCount ?? 0,
        ocrAccuracy: data.stats?.ocr?.ocrAccuracy ?? 0,
      },
    },
    voteCollectionOverTime: data.voteCollectionOverTime ?? [],
    ocrQueue: {
      processedToday: data.ocrQueue?.processedToday ?? 0,
      autoVerified: data.ocrQueue?.autoVerified ?? 0,
      pendingReview: data.ocrQueue?.pendingReview ?? 0,
      flaggedFraud: data.ocrQueue?.flaggedFraud ?? 0,
    },
    ocrAccuracyTrend: data.ocrAccuracyTrend ?? [],
    topPerformers: data.topPerformers ?? [],
    underPerformingInfluencers: data.underPerformingInfluencers ?? [],
  };
}

export function useGetDashboardStats(
  options?: Omit<UseQueryOptions<DashboardStatsData, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: dashboardStatsQueryKey,
    queryFn: fetchDashboardStats,
    placeholderData: {
      stats: defaultDashboardStats,
      voteCollectionOverTime: [],
      ocrQueue: defaultOCRQueue,
      ocrAccuracyTrend: [],
      topPerformers: [],
      underPerformingInfluencers: [],
    },
    ...options,
  });
}
