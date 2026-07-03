import { useState } from "react"
import {
  Plus,
  Megaphone,
  Info,
  Wrench,
  CalendarDays,
  Users,
  GraduationCap,
  Presentation,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  announcements as initialAnnouncements,
  type Announcement,
  type AnnouncementCategory,
  type AnnouncementTarget,
} from "@/lib/data"

const categoryConfig: Record<
  AnnouncementCategory,
  { icon: React.ComponentType<{ className?: string }>; variant: "muted" | "secondary" | "success" }
> = {
  Info: { icon: Info, variant: "muted" },
  Maintenance: { icon: Wrench, variant: "secondary" },
  Event: { icon: CalendarDays, variant: "success" },
}

const targetConfig: Record<
  AnnouncementTarget,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  All: { icon: Users, label: "Everyone" },
  "Students Only": { icon: GraduationCap, label: "Students" },
  "Teachers Only": { icon: Presentation, label: "Teachers" },
}

export function Announcements() {
  const [items, setItems] = useState<Announcement[]>(initialAnnouncements)
  const [open, setOpen] = useState(false)

  const handleCreate = (announcement: Announcement) => {
    setItems((prev) => [announcement, ...prev])
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <h2 className="text-lg font-semibold tracking-tight">
            Broadcast Announcements
          </h2>
          <p className="text-sm text-muted-foreground">
            Messages sent to students and teachers across the platform.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          Create New Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <AnnouncementCard key={item.id} item={item} />
        ))}
      </div>

      <CreateAnnouncementDialog
        open={open}
        onOpenChange={setOpen}
        onCreate={handleCreate}
      />
    </div>
  )
}

/* ------------------------- Announcement card ------------------------- */

function AnnouncementCard({ item }: { item: Announcement }) {
  const { icon: CatIcon, variant } = categoryConfig[item.category]
  const { icon: TargetIcon, label: targetLabel } = targetConfig[item.target]

  return (
    <Card className="gap-3">
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
            <Megaphone className="size-5" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base leading-snug text-pretty">
              {item.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {item.author} · {item.publishedAt}
            </CardDescription>
          </div>
        </div>
        <Badge variant={variant}>
          <CatIcon className="size-3" />
          {item.category}
        </Badge>
      </CardHeader>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {item.content}
      </p>

      <div className="flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
        <TargetIcon className="size-3.5" />
        Sent to
        <span className="font-medium text-foreground">{targetLabel}</span>
      </div>
    </Card>
  )
}

/* ------------------------- Create announcement dialog ------------------------- */

function CreateAnnouncementDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (announcement: Announcement) => void
}) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<AnnouncementCategory>("Info")
  const [target, setTarget] = useState<AnnouncementTarget>("All")
  const [content, setContent] = useState("")

  const reset = () => {
    setTitle("")
    setCategory("Info")
    setTarget("All")
    setContent("")
  }

  const close = () => {
    onOpenChange(false)
    reset()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate({
      id: `A-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      category,
      target,
      author: "Academy Team",
      publishedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    })
    reset()
  }

  const valid = title.trim() !== "" && content.trim() !== ""

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent onClose={close}>
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogDescription>
            Compose a broadcast message for your audience.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ann-title">Title</Label>
            <Input
              id="ann-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Platform Update v2.0"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ann-category">Category</Label>
              <Select
                id="ann-category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as AnnouncementCategory)
                }
              >
                <option value="Info">Info</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Event">Event</option>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ann-target">Target</Label>
              <Select
                id="ann-target"
                value={target}
                onChange={(e) =>
                  setTarget(e.target.value as AnnouncementTarget)
                }
              >
                <option value="All">All</option>
                <option value="Students Only">Students Only</option>
                <option value="Teachers Only">Teachers Only</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ann-content">Announcement Content</Label>
            <Textarea
              id="ann-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-28"
            />
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={!valid}>
              <Megaphone className="size-4" />
              Publish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
