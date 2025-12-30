import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CampaignCardProps {
  title: string
  responses: number
  totalResponses: number
  status: "active" | "inactive"
}

export function CampaignCard({
  title,
  responses,
  totalResponses,
  status,
}: CampaignCardProps) {
  const percentage = (responses / totalResponses) * 100

  return (
    <Card className="border border-[#E2E8F0] shadow-none rounded-sm">
      <CardHeader className="pb-1 px-3 sm:px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
            <h3 className="text-xs sm:text-sm font-bold">{title}</h3>
          </div>
          <Badge
            variant="secondary"
            className="bg-[#DCFCE7] text-[10px]! rounded border border-[#4AC36026] text-[#16A34A] hover:bg-[#DCFCE7] font-medium"
          >
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-4">
        <div className="space-y-2">
          <p className="text-xs text-[#8E8E8E] text-right">
            {responses} of {totalResponses} responses
          </p>
          <Progress value={percentage} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  )
}
