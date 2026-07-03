import { useState } from "react"
import { Building2, CreditCard, ShieldCheck, Check, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ApplicationProfile } from "./application-profile"
import { PaymentGateway } from "./payment-gateway"
import { SecuritySystems } from "./security-systems"

type SettingsTab = {
  id: string
  label: string
  description: string
  icon: LucideIcon
}

const tabs: SettingsTab[] = [
  { id: "profile", label: "Application Profile", description: "Name, logo & contact", icon: Building2 },
  { id: "payment", label: "Payment Gateway", description: "Midtrans, Xendit, Stripe", icon: CreditCard },
  { id: "security", label: "Security & Systems", description: "Access & policies", icon: ShieldCheck },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">General Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your LMS profile, payment integrations, and system policies.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Vertical settings navigation */}
        <nav className="flex gap-2 overflow-x-auto lg:w-64 lg:shrink-0 lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors lg:w-full",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{tab.label}</span>
                  <span
                    className={cn(
                      "hidden text-xs lg:block",
                      isActive ? "text-primary/70" : "text-muted-foreground",
                    )}
                  >
                    {tab.description}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>

        {/* Content form + sticky save bar */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {activeTab === "profile" ? (
            <ApplicationProfile />
          ) : activeTab === "payment" ? (
            <PaymentGateway />
          ) : (
            <SecuritySystems />
          )}

          <div className="sticky bottom-0 z-10 flex items-center justify-end gap-3 rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur">
            {saved ? (
              <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--chart-2)]">
                <Check className="size-4" />
                Changes saved
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Unsaved changes</span>
            )}
            <Button type="button" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
