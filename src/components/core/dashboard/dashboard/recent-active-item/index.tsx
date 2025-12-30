import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText } from "lucide-react"

interface ActivityItemProps {
  title: string
  metric: number
  timeAgo: string
}

export function ActivityItem({ title, metric, timeAgo }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Avatar className="h-10 w-10 rounded-md bg-muted border border-border">
        <AvatarFallback className="bg-muted">
          <FileText className="h-5 w-5 text-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">{title}</span>{" "}
          <span className="font-normal">reached {metric.toLocaleString()} responses</span>
        </p>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
    </div>
  )
}
