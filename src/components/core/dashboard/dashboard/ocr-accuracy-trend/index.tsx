"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { useTranslations } from "next-intl"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { day: "Sun", accuracy: 72 },
  { day: "Mon", accuracy: 112 },
  { day: "Tue", accuracy: 88 },
  { day: "Wed", accuracy: 36 },
  { day: "Thu", accuracy: 82 },
  { day: "Fri", accuracy: 56 },
  { day: "Sat", accuracy: 80 },
]

export function OCRAccuracyTrends() {
  const t = useTranslations("dashboard.charts");
  
  const chartConfig = {
    accuracy: {
      label: t("ocrAccuracy"),
      color: "#2563EB",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <h3 className="font-bold mb-6 text-slate-900">{t("ocrAccuracyTrend")}</h3>
      <ChartContainer config={chartConfig} className="h-60 w-full">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `${value}k`}
            domain={[0, 140]}
            ticks={[0, 20, 40, 60, 80, 100, 120, 140]}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#2563EB"
            strokeWidth={2}
            dot={{
              fill: "#2563EB",
              r: 4,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: "#2563EB",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
