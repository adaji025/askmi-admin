"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface SettingsItemProps {
  label: string
  value: string | React.ReactNode
  description?: string
  actionLabel?: string
  onAction?: () => void
  showEdit?: boolean
}

export function SettingsItem({
  label,
  value,
  description,
  actionLabel = "Edit",
  onAction,
  showEdit = true,
}: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-[#E2E8F0] last:border-0">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground flex-1 shrink-0">
          {label}
        </span>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-bold text-foreground">{value}</span>
          {description && (
            <span className="text-xs text-muted-foreground mt-0.5">
              {description}
            </span>
          )}
        </div>
      </div>
      {showEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="h-8 px-4 text-xs font-medium bg-white border-border hover:bg-muted text-foreground shrink-0"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
