import { useState } from "react"
import { ShieldAlert, Megaphone } from "lucide-react"
import { ForumModeration } from "@/components/communication/forum-moderation"
import { Announcements } from "@/components/communication/announcements"
import { cn } from "@/lib/utils"

type TabKey = "moderation" | "announcements"

const tabs: {
  key: TabKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { key: "moderation", label: "Forum Moderation", icon: ShieldAlert },
  { key: "announcements", label: "Announcements", icon: Megaphone },
]

export function CommunicationPage() {
  const [tab, setTab] = useState<TabKey>("moderation")

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Communication &amp; Interaction
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Moderate community discussions and broadcast announcements.
          </p>
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

      {tab === "moderation" && <ForumModeration />}
      {tab === "announcements" && <Announcements />}
    </div>
  )
}
