"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type { AdminBrandsApiResponse, AdminBrandsData } from "./types";

export const adminBrandsQueryKey = ["admin", "brands"] as const;

async function fetchAdminBrands(): Promise<AdminBrandsData> {
  const { data } = await apiClient.get<AdminBrandsApiResponse>("/admin/brands");

  if (!data?.success) {
    throw new Error("Failed to load brands");
  }

  const emptyStats = {
    totalBrands: 0,
    activeCampaigns: 0,
    pendingCampaigns: 0,
    completedCampaigns: 0,
    totalRevenue: 0,
    totalVotes: 0,
  };

  return {
    brands: data.brands ?? [],
    statistics: data.statistics ?? emptyStats,
  };
}

export function useGetBrands(
  options?: Omit<
    UseQueryOptions<AdminBrandsData, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminBrandsQueryKey,
    queryFn: fetchAdminBrands,
    ...options,
  });
}
