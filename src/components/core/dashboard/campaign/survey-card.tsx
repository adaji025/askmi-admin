import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SurveyCardProps {
  title: string;
  description: string;
  status: "active" | "paused";
  daysAgo: number;
  influencers: number;
  responsesCount: number;
  totalResponses: number;
  completionPercentage: number;
  daysLeft: number;
}

export function SurveyCard({
  title,
  description,
  status,
  daysAgo,
  influencers,
  responsesCount,
  totalResponses,
  completionPercentage,
  daysLeft,
}: SurveyCardProps) {
  return (
    <Link href="/dashboard/campaigns/1">
      <Card className="flex-1 cursor-pointer rounded-sm shadow-none border-[#E2E8F0] transition-all hover:shadow-md">
        <CardHeader>
          <div className="flex flex-row items-start justify-between space-y-0">
            <h3 className="font-bold tracking-tight text-zinc-900">{title}</h3>
            <Badge
              variant="outline"
              className={cn(
                "rounded border-[#4AC36026] border px-2.5 py-0.5 text-[10px] font-medium",
                status === "active"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-orange-50 text-orange-600"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          <p className="line-clamp-2 text-sm text-zinc-500 leading-relaxed">
            {description}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-zinc-600">
              <Calendar className="h-4 w-4 text-zinc-400" />
              <span className="text-sm font-bold">
                {daysAgo} days <span className="font-normal">ago</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Users className="h-4 w-4 text-zinc-400" />
              <span className="text-sm font-bold">
                {influencers} <span className="font-normal">influencers</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-end">
              <span className="text-xs font-medium text-zinc-900">
                {responsesCount} of {totalResponses} responses
              </span>
            </div>
            <Progress
              value={(responsesCount / totalResponses) * 100}
              className="h-1.5 bg-zinc-100"
            />
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-2 p-0 pt-2 pb-6">
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="text-xl font-bold text-zinc-900">
              {completionPercentage}%
            </span>
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Complete
            </span>
          </div>
          <div className="relative flex flex-col items-center justify-center space-y-1">
            <Separator
              orientation="vertical"
              className="absolute left-0 h-12 bg-zinc-100"
            />
            <span className="text-xl font-bold text-zinc-900">
              {daysLeft} days
            </span>
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Left
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
