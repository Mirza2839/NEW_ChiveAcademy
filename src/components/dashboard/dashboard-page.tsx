import { Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MetricsCards } from "./metrics-cards"
import { EnrollmentChart } from "./enrollment-chart"
import { RecentActivity } from "./recent-activity"
import { PopularCourses } from "./popular-courses"

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, Ayu. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            New Course
          </Button>
        </div>
      </div>

      <MetricsCards />
      <EnrollmentChart />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        <PopularCourses />
      </div>
    </div>
  )
}
