import { Check } from "lucide-react";
import React from "react";

interface IProps {
  verificationStatus: {
    label: string;
    status: string;
    verified: boolean;
  }[];
}
const VerificationStatus = ({ verificationStatus }: IProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0]">
      <h3 className="font-bold text-foreground mb-6 border-b border-[#E2E8F0] py-4  px-5 lg:px-6">
        Verification Status
      </h3>
      <div className="space-y-4 p-5 lg:p-6">
        {verificationStatus.map((item, index) => (
          <div
            key={index}
            className="bg-[#F5F5F5] rounded-lg p-4 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-foreground">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              {item.verified && (
                <>
                  <Check className="h-5 w-5 text-[#10B981]" />
                  <span className="text-sm font-medium text-[#10B981]">
                    {item.status}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStatus;
