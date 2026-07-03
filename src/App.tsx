import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { UserManagementPage } from "@/components/users/user-management-page"
import { ReportsPage } from "@/components/reports/reports-page"
import { FinancePage } from "@/components/finance/finance-page"
import { CommunicationPage } from "@/components/communication/communication-page"
import { SettingsPage } from "@/components/settings/settings-page"
import { navItems } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("dashboard")

  const activeLabel =
    navItems.find((item) => item.id === activeItem)?.label ?? "Main Page"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        activeItem={activeItem}
        onSelectItem={setActiveItem}
      />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding] duration-300 ease-in-out",
          collapsed ? "lg:pl-[76px]" : "lg:pl-64",
        )}
      >
        <Topbar onOpenMobile={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-6">
          {activeItem === "dashboard" ? (
            <DashboardPage />
          ) : activeItem === "users" ? (
            <UserManagementPage />
          ) : activeItem === "reports" ? (
            <ReportsPage />
          ) : activeItem === "finance" ? (
            <FinancePage />
          ) : activeItem === "communication" ? (
            <CommunicationPage />
          ) : activeItem === "settings" ? (
            <SettingsPage />
          ) : (
            <PlaceholderPage title={activeLabel} />
          )}
        </main>
      </div>
    </div>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        This section is coming next. The layout, theme, and navigation are ready
        to host the {title.toLowerCase()} module.
      </p>
    </div>
  )
}
