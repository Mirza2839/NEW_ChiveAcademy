import { Star, TrendingUp, TrendingDown, Users } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { popularCourses } from "@/lib/data"
import { cn } from "@/lib/utils"

export function PopularCourses() {
  return (
    <Card className="gap-4">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Popular Courses</CardTitle>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </CardHeader>

      <ul className="flex flex-col">
        {popularCourses.map((course, index) => (
          <li
            key={course.id}
            className="flex items-center gap-3 border-b border-border py-3 last:border-0 last:pb-0 first:pt-0"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{course.title}</p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-3" />
                  {course.students.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="size-3 fill-[var(--chart-4)] text-[var(--chart-4)]" />
                  {course.rating}
                </span>
              </div>
            </div>
            <Badge variant={course.trend >= 0 ? "success" : "destructive"}>
              {course.trend >= 0 ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              <span className={cn(course.trend >= 0 ? "" : "")}>
                {course.trend >= 0 ? "+" : ""}
                {course.trend}%
              </span>
            </Badge>
          </li>
        ))}
      </ul>
    </Card>
  )
}
