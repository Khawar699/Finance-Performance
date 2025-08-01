"use client"

import { useState } from "react"
import { OverviewTab } from "@/components/tabs/overview-tab"
import { PerformanceTab } from "@/components/tabs/performance-tab"
import { AttendanceTab } from "@/components/tabs/attendance-tab"
import { TasksTab } from "@/components/tabs/tasks-tab"
import { DailyWorkTab } from "@/components/tabs/daily-work-tab"
import { EmployeesTab } from "@/components/tabs/employees-tab"
import { DailyAttendanceTab } from "@/components/tabs/daily-attendance-tab"

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

interface AttendanceEntry {
  id: string
  employeeId: number
  date: string
  status: "present" | "late" | "absent"
  timeIn: string
  timeOut: string
  notes?: string
}

interface DashboardContentProps {
  activeTab: string
  employees: Employee[]
  onEmployeeSelect: (employeeId: number) => void
  onEmployeeEdit?: (employee: Employee) => void
  onEmployeeAdd?: (employee: Employee) => void
  attendanceRecords?: AttendanceEntry[]
  onAddAttendance?: (entry: AttendanceEntry) => void
  onUpdateAttendance?: (entry: AttendanceEntry) => void
}

export function DashboardContent({
  activeTab,
  employees,
  onEmployeeSelect,
  onEmployeeEdit,
  onEmployeeAdd,
  attendanceRecords,
  onAddAttendance,
  onUpdateAttendance,
}: DashboardContentProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            employees={employees}
            onEmployeeSelect={onEmployeeSelect}
            onEmployeeEdit={onEmployeeEdit}
            onEmployeeAdd={() => {
              /* Navigate to employees tab */
            }}
          />
        )
      case "performance":
        return <PerformanceTab employees={employees} period={selectedPeriod} />
      case "attendance":
        return (
          <AttendanceTab employees={employees} period={selectedPeriod} attendanceRecords={attendanceRecords || []} />
        )
      case "tasks":
        return <TasksTab employees={employees} />
      case "daily-work":
        return <DailyWorkTab employees={employees} />
      case "employees":
        return (
          <EmployeesTab
            employees={employees}
            onEmployeeSelect={onEmployeeSelect}
            onEmployeeEdit={onEmployeeEdit}
            onEmployeeAdd={onEmployeeAdd}
          />
        )
      case "daily-attendance":
        return (
          <DailyAttendanceTab
            employees={employees}
            attendanceRecords={attendanceRecords || []}
            onAddAttendance={onAddAttendance}
            onUpdateAttendance={onUpdateAttendance}
          />
        )
      default:
        return (
          <OverviewTab
            employees={employees}
            onEmployeeSelect={onEmployeeSelect}
            onEmployeeEdit={onEmployeeEdit}
            onEmployeeAdd={() => {
              /* Navigate to employees tab */
            }}
          />
        )
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">{renderTabContent()}</div>
    </div>
  )
}
