import { useMemo, useState } from "react"
import {
  ShieldAlert,
  Flag,
  Check,
  Trash2,
  UserX,
  MessageSquareWarning,
  Inbox,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import {
  reportedComments as initialReports,
  type ReportedComment,
  type ReportReason,
} from "@/lib/data"

const reasonVariant: Record<
  ReportReason,
  "muted" | "destructive" | "outline" | "secondary"
> = {
  Spam: "muted",
  Harassment: "destructive",
  "Hate Speech": "destructive",
  "Off-topic": "outline",
  Misinformation: "secondary",
}

type ActionKind = "approved" | "deleted" | "suspended"

export function ForumModeration() {
  const [reports, setReports] = useState<ReportedComment[]>(initialReports)
  const [resolved, setResolved] = useState<
    { id: string; action: ActionKind }[]
  >([])

  const resolve = (id: string, action: ActionKind) => {
    setReports((prev) => prev.filter((r) => r.id !== id))
    setResolved((prev) => [{ id, action }, ...prev])
  }

  const pendingCount = reports.length
  const totalFlags = useMemo(
    () => reports.reduce((sum, r) => sum + r.reports, 0),
    [reports],
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Mini summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Pending Review"
          value={pendingCount}
          icon={MessageSquareWarning}
          tone="primary"
        />
        <SummaryCard
          label="Total Flags"
          value={totalFlags}
          icon={Flag}
          tone="destructive"
        />
        <SummaryCard
          label="Resolved Today"
          value={resolved.length}
          icon={Check}
          tone="success"
        />
      </div>

      <Card className="gap-0 p-0">
        <CardHeader className="flex-row items-center gap-3 space-y-0 p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_oklab,var(--destructive)_12%,transparent)] text-destructive">
            <ShieldAlert className="size-5" />
          </div>
          <div className="space-y-0.5">
            <CardTitle>Reported Comments</CardTitle>
            <CardDescription>
              Review flagged content and take moderation action.
            </CardDescription>
          </div>
        </CardHeader>

        <div className="flex flex-col divide-y divide-border border-t border-border">
          {reports.map((report) => (
            <ReportItem
              key={report.id}
              report={report}
              onResolve={resolve}
            />
          ))}

          {reports.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Inbox className="size-6" />
              </div>
              <p className="text-sm font-medium">All caught up</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                There are no reported comments awaiting review right now.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

/* ------------------------- Report item ------------------------- */

function ReportItem({
  report,
  onResolve,
}: {
  report: ReportedComment
  onResolve: (id: string, action: ActionKind) => void
}) {
  return (
    <div className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-start">
      <Avatar fallback={report.initials} className="size-10" />

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold">{report.author}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="truncate text-xs text-muted-foreground">
            {report.thread}
          </span>
        </div>

        <p className="rounded-lg bg-muted/60 px-3 py-2 text-sm text-foreground">
          {report.content}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={reasonVariant[report.reason]}>
            <Flag className="size-3" />
            {report.reason}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {report.reports} reports · {report.reportedAt}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch lg:flex-row">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onResolve(report.id, "approved")}
        >
          <Check className="size-4" />
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onResolve(report.id, "deleted")}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onResolve(report.id, "suspended")}
        >
          <UserX className="size-4" />
          Suspend
        </Button>
      </div>
    </div>
  )
}

/* ------------------------- Summary card ------------------------- */

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  tone: "primary" | "success" | "destructive"
}) {
  const toneClass =
    tone === "primary"
      ? "bg-secondary text-foreground"
      : tone === "success"
        ? "bg-[color-mix(in_oklab,var(--chart-2)_18%,transparent)] text-[var(--chart-2)]"
        : "bg-[color-mix(in_oklab,var(--destructive)_12%,transparent)] text-destructive"

  return (
    <Card className="flex-row items-center gap-4 p-4">
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${toneClass}`}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-2xl font-semibold tracking-tight">
          {value}
        </p>
      </div>
    </Card>
  )
}
