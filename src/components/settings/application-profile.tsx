import { useState } from "react"
import { Upload, Building2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ApplicationProfile() {
  const [name, setName] = useState("Chive Academy")
  const [email, setEmail] = useState("admin@chiveacademy.com")
  const [description, setDescription] = useState(
    "A modern learning platform helping students master in-demand tech skills through hands-on courses.",
  )

  return (
    <Card className="gap-0 p-0">
      <div className="border-b border-border p-6">
        <h2 className="text-base font-semibold text-foreground">Application Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage how your LMS appears to students and instructors.
        </p>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Logo */}
        <div className="flex flex-col gap-2">
          <Label>Logo</Label>
          <div className="flex items-center gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
              <Building2 className="size-7 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Button type="button" variant="outline" size="sm" className="w-fit">
                <Upload className="size-4" />
                Upload logo
              </Button>
              <p className="text-xs text-muted-foreground">
                PNG or SVG, recommended 256×256px. Max 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* LMS Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="lms-name">LMS Name</Label>
          <Input id="lms-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Admin email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="admin-email">Admin Contact Email</Label>
          <Input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Used for system notifications and student support replies.
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="lms-description">Description</Label>
          <Textarea
            id="lms-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </Card>
  )
}
