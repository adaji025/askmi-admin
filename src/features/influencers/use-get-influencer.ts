"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type { AdminInfluencer } from "./use-get-influencers";

interface AdminInfluencerDetailApiResponse {
  success?: boolean;
  influencer?: AdminInfluencer;
}

export const adminInfluencerQueryKey = (id: string) =>
  ["admin", "influencers", id] as const;

async function fetchAdminInfluencer(id: string): Promise<AdminInfluencer> {
  const { data } = await apiClient.get<
    AdminInfluencerDetailApiResponse | AdminInfluencer
  >(`/admin/influencers/${encodeURIComponent(id)}`);

  if (data && !Array.isArray(data) && "id" in data) {
    return data as AdminInfluencer;
  }

  const responseData = data as AdminInfluencerDetailApiResponse;

  if (!responseData?.success || !responseData.influencer) {
    throw new Error("Failed to load influencer");
  }

  return responseData.influencer;
}

export function useGetInfluencer(
  id: string | undefined,
  options?: Omit<
    UseQueryOptions<AdminInfluencer, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    ...options,
    queryKey: id
      ? adminInfluencerQueryKey(id)
      : ["admin", "influencers", "__none"],
    queryFn: () => fetchAdminInfluencer(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}
