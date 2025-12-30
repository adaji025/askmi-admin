import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const ActiveInfluencerCard = () => {
  return (
    <div className="space-y-6 bg-white lg:p-6 rounded-md">
      <h2 className="text-lg font-bold text-black">Active Influencers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-[#E2E8F0] rounded-md shadow-none ">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/influencer-avatar.jpg" />
                  <AvatarFallback>YI</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm">Your Influencer</div>
                  <div className="text-[10px] text-gray-400 font-medium">
                    @41.2k
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-black leading-none">
                    140
                  </div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                    Sent
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-emerald-500 leading-none">
                    78%
                  </div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                    Completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveInfluencerCard;
