import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type ToggleSetting = {
  id: string
  title: string
  description: string
  defaultOn: boolean
}

const settings: ToggleSetting[] = [
  {
    id: "maintenance",
    title: "Maintenance Mode",
    description: "Temporarily take the platform offline for students while you perform updates.",
    defaultOn: false,
  },
  {
    id: "registration",
    title: "New Student Registration",
    description: "Allow new students to sign up. Turn off to close enrollment.",
    defaultOn: true,
  },
  {
    id: "twofa",
    title: "Two-Factor Password Policy (2FA)",
    description: "Require all admins and instructors to verify logins with a second factor.",
    defaultOn: true,
  },
]

export function SecuritySystems() {
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(settings.map((s) => [s.id, s.defaultOn])),
  )

  return (
    <Card className="gap-0 p-0">
      <div className="border-b border-border p-6">
        <h2 className="text-base font-semibold text-foreground">Security &amp; Systems</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Control platform availability and account security policies.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between gap-4 p-6">
            <div className="flex flex-col gap-1">
              <Label htmlFor={setting.id} className="cursor-pointer">
                {setting.title}
              </Label>
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <Switch
              id={setting.id}
              checked={state[setting.id]}
              onCheckedChange={(checked) =>
                setState((prev) => ({ ...prev, [setting.id]: checked }))
              }
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
