export interface CampaignAudienceSegment {
  type?: string;
  values?: string[];
}

export interface CampaignTargetAudience {
  age?: CampaignAudienceSegment;
  city?: CampaignAudienceSegment;
  region?: CampaignAudienceSegment;
  interest?: CampaignAudienceSegment;
}

export interface CampaignQuestionOption {
  id: number;
  text: string;
}

export interface CampaignQuestion {
  id: string;
  type: string;
  order: number;
  title: string;
  options?: CampaignQuestionOption[];
  required?: boolean;
}

export interface CampaignSurvey {
  id: string;
  title: string;
  questions?: CampaignQuestion[];
}

/** Campaign item used by campaign list/detail APIs. */
export interface UserCampaign {
  id: string;
  name?: string;
  campaignName?: string;
  description?: string;
  surveySource?: string;
  targetAudience?: CampaignTargetAudience;
  totalVoteNeeded?: number;
  numberOfQuestions?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  isCompleted?: boolean;
  numberOfInfluencer?: number;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  surveys?: CampaignSurvey[];
  response?: number;
  totalQuestions?: number;
}

export interface CampaignsByUserApiResponse {
  success: boolean;
  campaigns: UserCampaign[];
}

export interface AllCampaignsApiResponse {
  success: boolean;
  message?: string;
  campaigns: UserCampaign[];
  count?: number;
  statistics?: Record<string, number>;
}

export interface CampaignDetailApiResponse {
  success: boolean;
  message?: string;
  campaign?: UserCampaign;
}
