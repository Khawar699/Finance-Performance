"use client"

import { useState } from "react"
import { OverviewTab } from "@/components/tabs/overview-tab"
import { PerformanceTab } from "@/components/tabs/performance-tab"
import { AttendanceTab } from "@/components/tabs/attendance-tab"
import { TasksTab } from "@/components/tabs/tasks-tab"
import { DailyWorkTab } from "@/components/tabs/daily-work-tab"
import { EmployeesTab } from "@/components/tabs/employees-tab"

interface Employee {
  id: number
  name: string
  position: string
  department: string
  email: string
  avatar: string
  performance: number
  attendance: number
  tasksCompleted: number
  totalTasks: number
  lateComings: number
  status: string
}

interface DashboardContentProps {
  activeTab: string
  employees: Employee[]
  onEmployeeSelect: (employeeId: number) => void
}

export function DashboardContent({ activeTab, employees, onEmployeeSelect }: DashboardContentProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab employees={employees} onEmployeeSelect={onEmployeeSelect} />
      case "performance":
        return <PerformanceTab employees={employees} period={selectedPeriod} />
      case "attendance":
        return <AttendanceTab employees={employees} period={selectedPeriod} />
      case "tasks":
        return <TasksTab employees={employees} />
      case "daily-work":
        return <DailyWorkTab employees={employees} />
      case "employees":
        return <EmployeesTab employees={employees} onEmployeeSelect={onEmployeeSelect} />
      default:
        return <OverviewTab employees={employees} onEmployeeSelect={onEmployeeSelect} />
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
    </div>
  )
}
