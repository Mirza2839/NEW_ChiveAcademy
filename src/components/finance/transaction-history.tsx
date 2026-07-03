import { useMemo, useRef, useState, useEffect } from "react"
import {
  Wallet,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  ChevronDown,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  transactions,
  financeSummary,
  type Transaction,
  type TransactionStatus,
} from "@/lib/data"
import { cn } from "@/lib/utils"

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function TransactionHistory() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q === "") return transactions
    return transactions.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.student.toLowerCase().includes(q) ||
        t.course.toLowerCase().includes(q) ||
        t.method.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex flex-col gap-6">
      {/* Mini summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Net Revenue"
          value={formatIDR(financeSummary.netRevenue)}
          icon={Wallet}
          tone="primary"
        />
        <SummaryCard
          label="Successful Transactions"
          value={financeSummary.successfulCount.toLocaleString("id-ID")}
          icon={CheckCircle2}
          tone="success"
        />
        <SummaryCard
          label="Refund / Failed"
          value={financeSummary.refundFailedCount.toLocaleString("id-ID")}
          icon={XCircle}
          tone="destructive"
        />
      </div>

      {/* Transaction table */}
      <Card className="gap-0 overflow-hidden p-0">
        <CardHeader className="flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-0.5">
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Detailed record of all course payments
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search invoice, student, course..."
                className="pl-9"
                aria-label="Search transactions"
              />
            </div>
            <ExportMenu rows={filtered} />
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-4">Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="pr-4 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="pl-4 font-mono text-xs text-muted-foreground">
                    {t.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={t.initials} className="size-8" />
                      <span className="whitespace-nowrap text-sm font-medium">
                        {t.student}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {t.course}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{t.method}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                    {t.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right text-sm font-semibold tabular-nums">
                    {formatIDR(t.amount)}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <StatusBadge status={t.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-1 py-14 text-center">
            <p className="text-sm font-medium">No transactions found</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Try adjusting your search to find the transaction you&apos;re
              looking for.
            </p>
          </div>
        )}

        <div className="border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            of {transactions.length} transactions
          </p>
        </div>
      </Card>
    </div>
  )
}

/* ------------------------- Status badge ------------------------- */

function StatusBadge({ status }: { status: TransactionStatus }) {
  const config: Record<
    TransactionStatus,
    { label: string; variant: "success" | "muted" | "destructive"; dot: string }
  > = {
    paid: { label: "Paid", variant: "success", dot: "bg-[var(--chart-2)]" },
    pending: { label: "Pending", variant: "muted", dot: "bg-[var(--chart-4)]" },
    failed: { label: "Failed", variant: "destructive", dot: "bg-destructive" },
  }
  const { label, variant, dot } = config[status]
  return (
    <Badge variant={variant}>
      <span className={cn("size-1.5 rounded-full", dot)} />
      {label}
    </Badge>
  )
}

/* ------------------------- Export menu ------------------------- */

function ExportMenu({ rows }: { rows: Transaction[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [open])

  const exportCSV = () => {
    const headers = [
      "Invoice ID",
      "Student",
      "Course",
      "Payment Method",
      "Date",
      "Amount",
      "Status",
    ]
    const lines = rows.map((r) =>
      [r.id, r.student, r.course, r.method, r.date, r.amount, r.status]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    )
    const csv = [headers.join(","), ...lines].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const exportPDF = () => {
    window.print()
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => setOpen((o) => !o)}
      >
        <Download className="size-4" />
        Export
        <ChevronDown className="size-4 text-muted-foreground" />
      </Button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md">
          <button
            onClick={exportCSV}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <FileSpreadsheet className="size-4" />
            Export to CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="size-4" />
            Export to PDF
          </button>
        </div>
      )}
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
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate text-2xl font-semibold tracking-tight">
          {value}
        </p>
      </div>
    </Card>
  )
}
