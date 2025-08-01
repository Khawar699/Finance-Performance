"use client"

import { EmployeePerformance } from "@/components/employee-performance"

interface Employee {
  id: number
  name: string
  position: string
  department: string
  performance: number
  attendance: number
  tasksCompleted: number
  totalTasks: number
  lateComings: number
}

interface PerformanceTabProps {
  employees: Employee[]
  period: string
}

export function PerformanceTab({ employees, period }: PerformanceTabProps) {
  return <EmployeePerformance employees={employees} period={period} />
}
