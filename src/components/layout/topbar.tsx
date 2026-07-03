import { useEffect, useRef, useState } from "react"
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

type TopbarProps = {
  onOpenMobile: () => void
}

export function Topbar({ onOpenMobile }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-sm md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobile}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users, courses, transactions..."
          className="pl-9"
          aria-label="Global search"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 md:gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-card" />
        </Button>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setProfileOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-accent"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
          >
            <Avatar fallback="AL" />
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium leading-tight">Ayu Lestari</p>
              <p className="text-xs text-muted-foreground leading-tight">
                Administrator
              </p>
            </div>
            <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg"
            >
              <div className="border-b border-border px-3 py-2">
                <p className="text-sm font-medium">Ayu Lestari</p>
                <p className="truncate text-xs text-muted-foreground">
                  ayu@edupanel.com
                </p>
              </div>
              <MenuItem icon={User} label="My Profile" />
              <MenuItem icon={Settings} label="Account Settings" />
              <div className="my-1 border-t border-border" />
              <MenuItem icon={LogOut} label="Sign out" destructive />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuItem({
  icon: Icon,
  label,
  destructive,
}: {
  icon: typeof User
  label: string
  destructive?: boolean
}) {
  return (
    <button
      role="menuitem"
      className={
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent " +
        (destructive ? "text-destructive" : "text-foreground")
      }
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
