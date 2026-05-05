"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type { AdminInfluencer, InstagramDemographics } from "./use-get-influencers";

export const adminInfluencerQueryKey = (id: string) =>
  ["admin", "influencers", id] as const;

function normalizeInfluencerPayload(raw: Record<string, unknown>): AdminInfluencer {
  const igRaw = raw.instagramDemographics ?? raw.instagram_demographics;
  const instagramDemographics =
    igRaw !== null &&
    igRaw !== undefined &&
    typeof igRaw === "object" &&
    !Array.isArray(igRaw)
      ? (igRaw as InstagramDemographics)
      : undefined;

  return {
    ...(raw as AdminInfluencer),
    instagramDemographics,
  };
}

async function fetchAdminInfluencer(id: string): Promise<AdminInfluencer> {
  const { data } = await apiClient.get<unknown>(
    `/admin/influencers/${encodeURIComponent(id)}`,
  );

  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Failed to load influencer");
  }

  const record = data as Record<string, unknown>;

  const nested = record.influencer;
  if (
    nested !== null &&
    typeof nested === "object" &&
    !Array.isArray(nested) &&
    typeof (nested as { id?: unknown }).id === "string"
  ) {
    if (record.success === false) {
      throw new Error(
        typeof record.message === "string" ? record.message : "Failed to load influencer",
      );
    }
    return normalizeInfluencerPayload(nested as Record<string, unknown>);
  }

  if (
    typeof record.id === "string" &&
    (typeof record.email === "string" || typeof record.fullName === "string")
  ) {
    if (record.success === false) {
      throw new Error(
        typeof record.message === "string" ? record.message : "Failed to load influencer",
      );
    }
    return normalizeInfluencerPayload(record);
  }

  throw new Error("Failed to load influencer");
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
