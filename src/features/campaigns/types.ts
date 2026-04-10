/** Single campaign in GET /api/campaign/user/:userId — extend when the contract is fixed. */
export interface UserCampaign {
  id: string;
  name?: string;
  campaignName?: string;
}

export interface CampaignsByUserApiResponse {
  success: boolean;
  campaigns: UserCampaign[];
}
