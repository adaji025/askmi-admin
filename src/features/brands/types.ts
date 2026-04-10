export interface AdminBrandStatistics {
  totalBrands: number;
  activeCampaigns: number;
  pendingCampaigns: number;
  completedCampaigns: number;
  totalRevenue: number;
  totalVotes: number;
}

/** Normalized campaign ref for UI (maps API `campaignName` → `name`). */
export interface AdminBrandCampaignRef {
  id: string;
  name: string;
}

/** Campaign item as returned by GET /api/admin/brands/:id */
export interface AdminBrandCampaignApi {
  id: string;
  campaignName: string;
}

export interface AdminBrand {
  id: string;
  email: string;
  phoneNumber: string;
  company: string;
  companyCAC: string;
  companySize: string;
  industry: string;
  fullName: string;
  countryCode: string;
  lang: string;
  role: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  totalCampaign: number;
  activeCampaign: number;
  totalSpend: number;
  campaigns?: AdminBrandCampaignRef[];
}

export type AdminBrandDetailPayload = Omit<AdminBrand, "campaigns"> & {
  campaigns?: AdminBrandCampaignApi[];
};

export interface AdminBrandsApiResponse {
  success: boolean;
  statistics: AdminBrandStatistics;
  brands: AdminBrand[];
}

export interface AdminBrandsData {
  brands: AdminBrand[];
  statistics: AdminBrandStatistics;
}

export interface AdminBrandDetailApiResponse {
  success: boolean;
  brand: AdminBrandDetailPayload;
}
