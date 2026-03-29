export interface AdminBrandStatistics {
  totalBrands: number;
  activeCampaigns: number;
  pendingCampaigns: number;
  completedCampaigns: number;
  totalRevenue: number;
  totalVotes: number;
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
}

export interface AdminBrandsApiResponse {
  success: boolean;
  statistics: AdminBrandStatistics;
  brands: AdminBrand[];
}

export interface AdminBrandsData {
  brands: AdminBrand[];
  statistics: AdminBrandStatistics;
}
