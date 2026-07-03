import { useEffect, useMemo, useRef, useState } from "react"
import {
  Search,
  ListFilter,
  Plus,
  Pencil,
  Eye,
  MoreHorizontal,
  Check,
  ChevronDown,
  GraduationCap,
  Users2,
  UserCheck,
  UserX,
  Star,
} from "lucide-react"
import { Card } from "@/components/ui/card"
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
import { students, teachers, type ManagedUser, type UserStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

type TabKey = "student" | "teacher"
type StatusFilter = "all" | UserStatus

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
]

export function UserManagementPage() {
  const [tab, setTab] = useState<TabKey>("student")
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")

  const source = tab === "student" ? students : teachers

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return source.filter((u) => {
      const matchesStatus = status === "all" || u.status === status
      const matchesQuery =
        q === "" ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [source, query, status])

  const activeCount = source.filter((u) => u.status === "active").length
  const suspendedCount = source.filter((u) => u.status === "suspended").length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            User Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage student and instructor accounts, statuses, and permissions.
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Add {tab === "student" ? "Student" : "Instructor"}
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label={tab === "student" ? "Total Students" : "Total Instructors"}
          value={source.length}
          icon={tab === "student" ? GraduationCap : Users2}
          tone="primary"
        />
        <StatCard
          label="Active Accounts"
          value={activeCount}
          icon={UserCheck}
          tone="success"
        />
        <StatCard
          label="Suspended"
          value={suspendedCount}
          icon={UserX}
          tone="destructive"
        />
      </div>

      <Card className="gap-0 overflow-hidden p-0">
        {/* Tabs */}
        <div className="border-b border-border px-4 pt-4">
          <div className="inline-flex gap-1 rounded-lg bg-muted p-1">
            <TabButton
              active={tab === "student"}
              onClick={() => setTab("student")}
            >
              <GraduationCap className="size-4" />
              Students
              <span className="ml-1 rounded-md bg-background px-1.5 py-0.5 text-xs font-semibold text-foreground">
                {students.length}
              </span>
            </TabButton>
            <TabButton
              active={tab === "teacher"}
              onClick={() => setTab("teacher")}
            >
              <Users2 className="size-4" />
              Instructors
              <span className="ml-1 rounded-md bg-background px-1.5 py-0.5 text-xs font-semibold text-foreground">
                {teachers.length}
              </span>
            </TabButton>
          </div>
        </div>

        {/* Toolbar: search + filters */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, or ID..."
              className="pl-9"
              aria-label="Search users"
            />
          </div>
          <FilterMenu status={status} onChange={setStatus} />
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">
                {tab === "student" ? "Student" : "Instructor"}
              </TableHead>
              <TableHead>ID</TableHead>
              {tab === "student" ? (
                <>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Completed</TableHead>
                </>
              ) : (
                <>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Rating</TableHead>
                </>
              )}
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={user.initials} className="size-9" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {user.id}
                </TableCell>

                {tab === "student" ? (
                  <>
                    <TableCell className="text-sm">{user.enrolled}</TableCell>
                    <TableCell className="text-sm">{user.completed}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <Badge variant="secondary">{user.expertise}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{user.courses}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="size-3.5 fill-[var(--chart-4)] text-[var(--chart-4)]" />
                        {user.rating}
                      </span>
                    </TableCell>
                  </>
                )}

                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell className="pr-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" size="sm">
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="size-3.5" />
                      Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-1 py-14 text-center">
            <p className="text-sm font-medium">No users found</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Try adjusting your search or filter to find who you&apos;re
              looking for.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{source.length}</span>{" "}
            {tab === "student" ? "students" : "instructors"}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <Badge variant={status === "active" ? "success" : "destructive"}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "active"
            ? "bg-[var(--chart-2)]"
            : "bg-destructive",
        )}
      />
      {status === "active" ? "Active" : "Suspended"}
    </Badge>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string
  value: number
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

function FilterMenu({
  status,
  onChange,
}: {
  status: StatusFilter
  onChange: (status: StatusFilter) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => setOpen(false))

  const activeLabel = statusOptions.find((o) => o.value === status)?.label

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((o) => !o)}
        className="h-9"
      >
        <ListFilter className="size-4" />
        {activeLabel}
        <ChevronDown className="size-4 text-muted-foreground" />
      </Button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                status === option.value && "font-medium",
              )}
            >
              {option.label}
              {status === option.value && <Check className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  const savedHandler = useRef(handler)
  savedHandler.current = handler

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      savedHandler.current()
    }
    document.addEventListener("mousedown", listener)
    return () => document.removeEventListener("mousedown", listener)
  }, [ref])
}
