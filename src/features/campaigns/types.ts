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
  campaignId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CampaignParty {
  id: string;
  fullName?: string;
  company?: string;
  email?: string;
}

export interface CampaignInfluencer {
  influencerId?: string;
  fullName?: string;
  email?: string;
  responses?: number;
  reviewedVotesTotal?: number;
  resultImages?: CampaignResultImage[];
}

export interface ReviewedMultiChoiceOption {
  optionText?: string;
  votes?: number;
}

export interface ReviewedResponseObjectMultiChoice {
  questionType: "multi_choice";
  options?: ReviewedMultiChoiceOption[];
}

export interface ReviewedResponseObjectYesNo {
  questionType: "yes_no";
  votesByYesOrNo?: {
    yesVotes?: number;
    noVotes?: number;
  };
}

export interface ReviewedResponseObjectRatingScale {
  questionType: "rating_scale";
  votesByRating?: Record<string, number>;
}

export type ReviewedResponseObject =
  | ReviewedResponseObjectMultiChoice
  | ReviewedResponseObjectYesNo
  | ReviewedResponseObjectRatingScale
  | {
      questionType?: string;
      [key: string]: unknown;
    };

/** Proof / result image submitted for a campaign (admin GET campaign detail). */
export interface CampaignResultImage {
  id: string;
  campaignId?: string;
  influencerId?: string;
  surveyQuestionId?: string;
  imageUrl: string;
  fileKey?: string;
  caption?: string | null;
  createdAt?: string;
  updatedAt?: string;
  reviewStatus?: "pending" | "approved" | "rejected" | string;
  reviewedVotes?: number | null;
  reviewedResponseObject?: ReviewedResponseObject;
  reviewNotes?: string | null;
  reviewedAt?: string | null;
  reviewedByAdminId?: string | null;
  reviewerName?: string | null;
  influencer?: CampaignParty;
  reviewedByAdmin?: CampaignParty;
  campaign?: {
    id?: string;
    campaignName?: string;
  };
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
  status?: "active" | "completed" | "lagging" | string;
  targetVotes?: number;
  deliveredVote?: number;
  reviewedDeliveredVote?: number;
  deviation?: number;
  ocrAccuracy?: number;
  estimatedPrice?: number;
  influencerEstimatedPrice?: number;
  /** Submitted result screenshots / proofs linked to this campaign. */
  myResultImages?: CampaignResultImage[];
  /** Alternate payload shape for campaign proof images. */
  resultImages?: CampaignResultImage[];
  influencers?: CampaignInfluencer[];
  user?: CampaignParty;
  brand?: CampaignParty;
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
  statistics?: {
    totalCampaign?: number;
    active?: number;
    lagging?: number;
    [key: string]: number | undefined;
  };
}

export interface CampaignDetailApiResponse {
  success: boolean;
  message?: string;
  campaign?: UserCampaign;
}
