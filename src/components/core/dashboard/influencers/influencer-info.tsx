import React from "react";
interface IProps {
  influencerInfo: {
    fullName: string;
    instagramHandle: string;
    followers: string;
    following: string;
    email: string;
    accountCreated: string;
    location: string;
  };
}
const InfluencerInfo = ({influencerInfo}: IProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0]">
      <h3 className="font-bold text-foreground mb-6 border-b border-[#E2E8F0] py-4  px-5 lg:px-6">
        Influencer Information
      </h3>
      <div className="space-y-5 grid grid-cols-2 p-5 lg:p-6">
        <div>
          <p className="text-xs text-muted-foreground mb-1">FULL NAME</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.fullName}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">INSTAGRAM HANDLE</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.instagramHandle}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">FOLLOWERS</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.followers}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">FOLLOWING</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.following}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">EMAIL ADDRESS</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.email}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">ACCOUNT CREATED</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.accountCreated}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">LOCATION</p>
          <p className="text-sm font-semibold text-foreground">
            {influencerInfo.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfluencerInfo;
