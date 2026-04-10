"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import type {
  AdminBrand,
  AdminBrandDetailApiResponse,
  AdminBrandDetailPayload,
} from "./types";

export const adminBrandQueryKey = (id: string) =>
  ["admin", "brands", id] as const;

function normalizeAdminBrand(raw: AdminBrandDetailPayload): AdminBrand {
  const { campaigns, ...rest } = raw;
  return {
    ...rest,
    campaigns: campaigns?.map((c) => ({
      id: c.id,
      name: c.campaignName,
    })),
  };
}

async function fetchAdminBrand(id: string): Promise<AdminBrand> {
  const { data } = await apiClient.get<AdminBrandDetailApiResponse>(
    `/admin/brands/${encodeURIComponent(id)}`,
  );

  if (!data?.success || !data.brand) {
    throw new Error("Failed to load brand");
  }

  return normalizeAdminBrand(data.brand);
}

export function useGetBrand(
  id: string | undefined,
  options?: Omit<UseQueryOptions<AdminBrand, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    ...options,
    queryKey: id ? adminBrandQueryKey(id) : ["admin", "brands", "__none"],
    queryFn: () => fetchAdminBrand(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}
