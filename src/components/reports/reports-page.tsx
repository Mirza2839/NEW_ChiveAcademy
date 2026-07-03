import { useMemo, useState } from "react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts"
import {
  GraduationCap,
  BarChart3,
  ScrollText,
  Search,
  Target,
  Award,
  AlertTriangle,
  Users2,
  Star,
  TrendingDown,
  Download,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  gradeDistribution,
  performanceSummary,
  slowLearners,
  mostEnrolled,
  bestRated,
  mostDropped,
  systemLogs,
  type TimeRange,
  type CourseStat,
  type LogStatus,
} from "@/lib/data"
import { cn } from "@/lib/utils"

type TabKey = "performance" | "popularity" | "logs"

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "performance", label: "Student Performance", icon: GraduationCap },
  { key: "popularity", label: "Course Popularity", icon: BarChart3 },
  { key: "logs", label: "System Logs", icon: ScrollText },
]

const rangeOptions: { value: TimeRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
]

export function ReportsPage() {
  const [tab, setTab] = useState<TabKey>("performance")
  const [range, setRange] = useState<TimeRange>("7d")

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Reports &amp; Logs
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyze performance, course trends, and system activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RangeToggle range={range} onChange={setRange} />
          <Button variant="outline">
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="inline-flex w-full gap-1 overflow-x-auto rounded-lg bg-muted p-1 sm:w-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors sm:flex-none",
              tab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "performance" && <PerformanceReport range={range} />}
      {tab === "popularity" && <PopularityReport />}
      {tab === "logs" && <SystemLogsReport range={range} />}
    </div>
  )
}

/* ------------------------- Time range toggle ------------------------- */

function RangeToggle({
  range,
  onChange,
}: {
  range: TimeRange
  onChange: (r: TimeRange) => void
}) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1">
      {rangeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            range === option.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

/* ------------------------- 1. Student Performance ------------------------- */

function PerformanceReport({ range }: { range: TimeRange }) {
  const summary = performanceSummary[range]
  const data = gradeDistribution[range]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Average Grade"
          value={summary.averageGrade.toFixed(1)}
          icon={Target}
          tone="primary"
        />
        <SummaryCard
          label="Pass Rate"
          value={`${summary.passRate}%`}
          icon={Award}
          tone="success"
        />
        <SummaryCard
          label="At-Risk Students"
          value={summary.atRisk}
          icon={AlertTriangle}
          tone="destructive"
        />
        <SummaryCard
          label="Total Graded"
          value={summary.totalGraded.toLocaleString()}
          icon={GraduationCap}
          tone="muted"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Grade distribution */}
        <Card className="gap-5 lg:col-span-3">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>
              Number of students per grade band
            </CardDescription>
          </CardHeader>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                />
                <XAxis
                  dataKey="range"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                  content={<GradeTooltip />}
                />
                <Bar dataKey="students" radius={[6, 6, 0, 0]} maxBarSize={64}>
                  {data.map((entry, i) => (
                    <Cell
                      key={entry.range}
                      fill={
                        i === 0
                          ? "var(--destructive)"
                          : i === 1
                            ? "var(--chart-4)"
                            : "var(--chart-1)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pass rate gauge-ish summary */}
        <Card className="gap-5 lg:col-span-2">
          <CardHeader>
            <CardTitle>Pass vs Fail</CardTitle>
            <CardDescription>Overall outcome breakdown</CardDescription>
          </CardHeader>
          <div className="flex flex-1 flex-col justify-center gap-5">
            <RateBar
              label="Passed"
              value={summary.passRate}
              color="var(--chart-2)"
            />
            <RateBar
              label="Failed"
              value={100 - summary.passRate}
              color="var(--destructive)"
            />
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {summary.atRisk} students
              </span>{" "}
              are below the passing threshold and may need intervention.
            </div>
          </div>
        </Card>
      </div>

      {/* Slowest-progressing students */}
      <Card className="gap-0 overflow-hidden p-0">
        <CardHeader className="p-4">
          <CardTitle>Slowest Progressing Students</CardTitle>
          <CardDescription>
            Prioritized for teacher intervention
          </CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="w-48">Progress</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="pr-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slowLearners.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={s.initials} className="size-9" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{s.name}</p>
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {s.id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {s.course}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={s.progress} className="h-2 w-28" />
                    <span className="text-xs font-medium tabular-nums">
                      {s.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "text-sm font-medium tabular-nums",
                      s.grade < 60 ? "text-destructive" : "text-foreground",
                    )}
                  >
                    {s.grade}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {s.lastActivity}
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <Button variant="outline" size="sm">
                    Intervene
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function GradeTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground shadow-md">
      <p className="mb-0.5 text-xs font-medium">Grade {label}</p>
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {payload[0].value.toLocaleString()}
        </span>{" "}
        students
      </p>
    </div>
  )
}

function RateBar({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

/* ------------------------- 2. Course Popularity ------------------------- */

function PopularityReport() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <LeaderboardCard
        title="Most Enrolled Courses"
        description="By total student enrollments"
        icon={Users2}
        data={mostEnrolled}
        color="var(--chart-1)"
        format={(v) => v.toLocaleString()}
      />
      <RatingCard
        title="Best Rated Courses"
        description="Highest average student rating"
        data={bestRated}
      />
      <LeaderboardCard
        title="Most Dropped Courses"
        description="Highest drop-off rate"
        icon={TrendingDown}
        data={mostDropped}
        color="var(--destructive)"
        format={(v) => `${v}%`}
        className="xl:col-span-2"
      />
    </div>
  )
}

function LeaderboardCard({
  title,
  description,
  icon: Icon,
  data,
  color,
  format,
  className,
}: {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  data: CourseStat[]
  color: string
  format: (v: number) => string
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <Card className={cn("gap-5", className)}>
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground">
          <Icon className="size-4.5" />
        </div>
        <div className="space-y-0.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-4">
        {data.map((course, i) => (
          <div key={course.id} className="flex items-center gap-3">
            <span className="w-5 shrink-0 text-center text-sm font-semibold tabular-nums text-muted-foreground">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium">{course.title}</p>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                  {format(course.value)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(course.value / max) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function RatingCard({
  title,
  description,
  data,
}: {
  title: string
  description: string
  data: CourseStat[]
}) {
  return (
    <Card className="gap-5">
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-foreground">
          <Star className="size-4.5" />
        </div>
        <div className="space-y-0.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col gap-2">
        {data.map((course, i) => (
          <div
            key={course.id + i}
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="w-5 shrink-0 text-center text-sm font-semibold tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{course.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {course.category}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0">
              <Star className="size-3 fill-[var(--chart-4)] text-[var(--chart-4)]" />
              {course.value.toFixed(1)}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ------------------------- 3. System Logs ------------------------- */

function SystemLogsReport({ range }: { range: TimeRange }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q === "") return systemLogs
    return systemLogs.filter(
      (log) =>
        log.user.toLowerCase().includes(q) ||
        log.activity.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q),
    )
  }, [query])

  const rangeLabel = rangeOptions.find((r) => r.value === range)?.label

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <CardHeader className="flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>
            System activity for {rangeLabel?.toLowerCase()}
          </CardDescription>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user, activity, or IP..."
            className="pl-9"
            aria-label="Search logs"
          />
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4">Timestamp</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead className="pr-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="pl-4 font-mono text-xs text-muted-foreground">
                {log.timestamp}
              </TableCell>
              <TableCell className="font-mono text-xs">{log.user}</TableCell>
              <TableCell>
                <span className="text-sm font-medium">{log.activity}</span>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {log.ip}
              </TableCell>
              <TableCell className="pr-4 text-right">
                <LogStatusBadge status={log.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-1 py-14 text-center">
          <p className="text-sm font-medium">No log entries found</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Try adjusting your search to find the activity you&apos;re looking
            for.
          </p>
        </div>
      )}

      <div className="border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          entries
        </p>
      </div>
    </Card>
  )
}

function LogStatusBadge({ status }: { status: LogStatus }) {
  return (
    <Badge variant={status === "success" ? "success" : "destructive"}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "success" ? "bg-[var(--chart-2)]" : "bg-destructive",
        )}
      />
      {status === "success" ? "Success" : "Failed"}
    </Badge>
  )
}

/* ------------------------- Shared summary card ------------------------- */

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  tone: "primary" | "success" | "destructive" | "muted"
}) {
  const toneClass =
    tone === "primary"
      ? "bg-secondary text-foreground"
      : tone === "success"
        ? "bg-[color-mix(in_oklab,var(--chart-2)_18%,transparent)] text-[var(--chart-2)]"
        : tone === "destructive"
          ? "bg-[color-mix(in_oklab,var(--destructive)_12%,transparent)] text-destructive"
          : "bg-muted text-muted-foreground"

  return (
    <Card className="flex-row items-center gap-4 p-4">
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-xl",
          toneClass,
        )}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </div>
    </Card>
  )
}
