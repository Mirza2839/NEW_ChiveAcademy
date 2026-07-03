import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileBarChart,
  Wallet,
  MessagesSquare,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: "dashboard", label: "Main Page", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "courses", label: "Course Management", icon: BookOpen },
  { id: "reports", label: "Reports & Logs", icon: FileBarChart },
  { id: "finance", label: "Finance & Transactions", icon: Wallet },
  { id: "communication", label: "Communication & Interaction", icon: MessagesSquare },
  { id: "settings", label: "General Settings", icon: Settings },
]
