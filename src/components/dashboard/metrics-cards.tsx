import { Users, DollarSign, BookOpen, GraduationCap, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { revenueSparkline } from "@/lib/data"
import { cn } from "@/lib/utils"

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium",
        positive
          ? "bg-[color-mix(in_oklab,var(--chart-2)_16%,transparent)] text-[var(--chart-2)]"
          : "bg-[color-mix(in_oklab,var(--destructive)_12%,transparent)] text-destructive",
      )}
    >
      {positive ? (
        <ArrowUpRight className="size-3" />
      ) : (
        <ArrowDownRight className="size-3" />
      )}
      {positive ? "+" : ""}
      {value}%
    </span>
  )
}

function IconBox({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
      {children}
    </div>
  )
}

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Total Users */}
      <Card className="gap-4 p-5">
        <div className="flex items-start justify-between">
          <IconBox>
            <Users className="size-5" />
          </IconBox>
          <TrendBadge value={12.5} />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-semibold tracking-tight">48,271</p>
          <p className="text-xs text-muted-foreground">
            41,208 students · 7,063 teachers
          </p>
        </div>
      </Card>

      {/* Revenue with sparkline */}
      <Card className="gap-4 p-5">
        <div className="flex items-start justify-between">
          <IconBox>
            <DollarSign className="size-5" />
          </IconBox>
          <TrendBadge value={8.2} />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          <p className="text-2xl font-semibold tracking-tight">$52,480</p>
        </div>
        <div className="h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueSparkline}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Active Courses */}
      <Card className="gap-4 p-5">
        <div className="flex items-start justify-between">
          <IconBox>
            <BookOpen className="size-5" />
          </IconBox>
          <TrendBadge value={3.1} />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Active Courses</p>
          <p className="text-2xl font-semibold tracking-tight">1,284</p>
          <p className="text-xs text-muted-foreground">96 added this month</p>
        </div>
      </Card>

      {/* Completion Rate */}
      <Card className="gap-4 p-5">
        <div className="flex items-start justify-between">
          <IconBox>
            <GraduationCap className="size-5" />
          </IconBox>
          <TrendBadge value={-1.4} />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className="text-2xl font-semibold tracking-tight">73.6%</p>
          <Progress value={73.6} indicatorClassName="bg-[var(--chart-1)]" />
        </div>
      </Card>
    </div>
  )
}
