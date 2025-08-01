"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  TrendingUp,
  Calendar,
  CheckSquare,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Dashboard overview",
  },
  {
    id: "performance",
    label: "Performance",
    icon: TrendingUp,
    description: "Employee performance metrics",
  },
  {
    id: "daily-attendance",
    label: "Daily Entry",
    icon: Calendar,
    description: "Mark daily attendance",
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: Calendar,
    description: "Attendance reports",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
    description: "Task management",
  },
  {
    id: "daily-work",
    label: "Daily Work",
    icon: FileText,
    description: "Daily work entries",
  },
  {
    id: "employees",
    label: "Employees",
    icon: Users,
    description: "Employee directory",
  },
]

export function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Performance</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8 hover:bg-gray-100">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-12 px-3",
                collapsed ? "px-2" : "px-3",
                isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
              onClick={() => onTabChange(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && (
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs opacity-75">{item.description}</span>
                </div>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn("w-full justify-start h-12 px-3 text-gray-700 hover:bg-gray-100", collapsed ? "px-2" : "px-3")}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  )
}
