"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface AdminInfluencer {
  id: string;
  [key: string]: unknown;
}

interface AdminInfluencersApiResponse {
  success?: boolean;
  influencers?: AdminInfluencer[];
}

export const adminInfluencersQueryKey = ["admin", "influencers"] as const;

async function fetchAdminInfluencers(): Promise<AdminInfluencer[]> {
  const { data } = await apiClient.get<
    AdminInfluencersApiResponse | AdminInfluencer[]
  >("/admin/influencers");

  if (Array.isArray(data)) {
    return data;
  }

  if (!data?.success) {
    throw new Error("Failed to load influencers");
  }

  return data.influencers ?? [];
}

export function useGetInfluencers(
  options?: Omit<
    UseQueryOptions<AdminInfluencer[], Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: adminInfluencersQueryKey,
    queryFn: fetchAdminInfluencers,
    ...options,
  });
}
