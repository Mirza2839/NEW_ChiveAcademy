import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { recentActivity } from "@/lib/data"

export function RecentActivity() {
  return (
    <Card className="gap-4">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </CardHeader>

      <ul className="flex flex-col">
        {recentActivity.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 border-b border-border py-3 last:border-0 last:pb-0 first:pt-0"
          >
            <Avatar fallback={item.initials} className="size-9" />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-foreground">
                <span className="font-medium">{item.name}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
